import type { Raskus, TeemaId } from "@/content/types";
import { checkAnswer } from "@/lib/answer/check";
import { buildRegistry, forDifficulty } from "@/generators/registry";
import { mulberry32, shuffle } from "@/generators/rng";
import type { Rng, Ulesanne, Vastus } from "@/generators/types";

/**
 * The shape the practice UI (Ship 1.6) needs to pick an input widget for a
 * question, without the giveaway a full `Vastus` would carry. `valik`
 * carries every option in one shuffled, client-safe list — the correct
 * answer is in there, but which one it is isn't.
 */
export type KlientVastuseTuup =
  | { tuup: "arv" }
  | { tuup: "tapne" }
  | { tuup: "valik"; valikud: string[] }
  | { tuup: "hulk" };

/**
 * What the client is allowed to see before submitting: everything about an
 * `Ulesanne` except its answer and worked solution (todo.md Ship 1.5's
 * non-negotiable — answers and solutions never reach the client before
 * submission) — plus enough about the answer's shape to render the right
 * input widget.
 */
export type KlientUlesanne = Omit<Ulesanne, "vastus" | "lahendus"> & {
  vastuseTuup: KlientVastuseTuup;
};

type SeeriaKirje = {
  teemaId: TeemaId;
  raskus: Raskus;
  /** Position in `forDifficulty(teemaId, raskus)` at series-start time —
   * stable across the two calls because the generator directory doesn't
   * change mid-deployment. */
  generaatorIndeks: number;
  seed: number;
};

export type Seeria = {
  /** Opaque to the client: which generator and seed produced each question,
   * so `kontrolliVastust` can regenerate rather than trust anything the
   * client sends back. Not signed — tampering only changes which question
   * gets regenerated, never reveals an answer. */
  token: string;
  ulesanded: KlientUlesanne[];
};

export type KontrolliTulemus = {
  teemaId: TeemaId;
  raskus: Raskus;
  oige: boolean;
  vastus: Vastus;
  lahendus: string[];
};

function encodeToken(kirjed: SeeriaKirje[]): string {
  return Buffer.from(JSON.stringify(kirjed), "utf8").toString("base64url");
}

function decodeToken(token: string): SeeriaKirje[] {
  const parsed: unknown = JSON.parse(
    Buffer.from(token, "base64url").toString("utf8"),
  );
  if (!Array.isArray(parsed)) {
    throw new Error("invalid session token");
  }
  return parsed as SeeriaKirje[];
}

function toKlientVastuseTuup(vastus: Vastus, rng: Rng): KlientVastuseTuup {
  switch (vastus.tuup) {
    case "arv":
      return { tuup: "arv" };
    case "tapne":
      return { tuup: "tapne" };
    case "valik":
      return {
        tuup: "valik",
        valikud: shuffle(rng, [vastus.oige, ...vastus.eksitajad]),
      };
    case "hulk":
      return { tuup: "hulk" };
  }
}

/** Exported for direct unit testing — building a `KlientUlesanne` needs no
 * filesystem access, unlike `alustaSeeria`. */
export function toKlientUlesanne(ulesanne: Ulesanne, rng: Rng): KlientUlesanne {
  const { vastus, lahendus: _lahendus, ...klient } = ulesanne;
  return { ...klient, vastuseTuup: toKlientVastuseTuup(vastus, rng) };
}

/** One topic/difficulty combination a custom test may draw questions from. */
export type TeemaRaskusValik = { teemaId: TeemaId; raskus: Raskus };

/**
 * Starts a practice series drawing from any number of topic/difficulty
 * combinations, sampled uniformly per question — the engine behind both the
 * single-topic practice page (`alustaSeeria` below) and the custom test
 * builder (Ship "koosta test"), which lets a learner mix topics, courses and
 * difficulties into one session. Combinations with no registered generator
 * are silently dropped rather than failing the whole series, since a mixed
 * request naturally spans topics at very different completion levels.
 *
 * `rng` and `root` are injection points for tests — production callers
 * leave both at their defaults.
 */
export async function alustaKohandatudSeeria(
  valikud: TeemaRaskusValik[],
  kogus: number,
  options: { rng?: Rng; root?: string } = {},
): Promise<Seeria> {
  const rng = options.rng ?? mulberry32(Date.now());
  const registry = await buildRegistry(options.root);

  const saadaval = valikud.filter(
    (valik) => forDifficulty(registry, valik.teemaId, valik.raskus).length > 0,
  );
  if (saadaval.length === 0) {
    throw new Error(
      "no generators registered for any requested topic/difficulty combination",
    );
  }

  const kirjed: SeeriaKirje[] = [];
  const ulesanded: KlientUlesanne[] = [];
  /** A generator throwing (a content bug slipping past the niceness
   * harness) skips just that one draw rather than killing the whole
   * session (todo.md Ship 6.4) — bounded so a systemic failure still
   * surfaces instead of spinning forever. */
  const MAX_KATSEID_KUSIMUSE_KOHTA = 5;

  for (let i = 0; i < kogus; i++) {
    let ulesanne: Ulesanne | null = null;
    let valik: TeemaRaskusValik | null = null;
    let generaatorIndeks = -1;
    let seed = 0;

    for (let katse = 0; katse < MAX_KATSEID_KUSIMUSE_KOHTA; katse++) {
      valik = saadaval[Math.floor(rng() * saadaval.length)];
      const generaatorid = forDifficulty(registry, valik.teemaId, valik.raskus);
      generaatorIndeks = Math.floor(rng() * generaatorid.length);
      seed = Math.floor(rng() * 2 ** 31);
      try {
        ulesanne = generaatorid[generaatorIndeks].genereeri(mulberry32(seed));
        break;
      } catch (viga) {
        console.error(
          `generator failed for ${valik.teemaId}:${valik.raskus} — skipping this draw`,
          viga,
        );
      }
    }
    if (ulesanne === null || valik === null) continue;

    kirjed.push({
      teemaId: valik.teemaId,
      raskus: valik.raskus,
      generaatorIndeks,
      seed,
    });
    ulesanded.push(toKlientUlesanne(ulesanne, rng));
  }

  return { token: encodeToken(kirjed), ulesanded };
}

/**
 * Starts a single-topic practice series (todo.md Ship 1.5) — a thin
 * wrapper over `alustaKohandatudSeeria` with exactly one topic/difficulty
 * combination.
 */
export async function alustaSeeria(
  teemaId: TeemaId,
  raskus: Raskus,
  kogus: number,
  options: { rng?: Rng; root?: string } = {},
): Promise<Seeria> {
  return alustaKohandatudSeeria([{ teemaId, raskus }], kogus, options);
}

/**
 * Grades one question from a series: decodes the token, regenerates the
 * question from its recorded generator and seed (never trusting a
 * client-supplied answer), and returns correctness plus the full worked
 * solution.
 */
export async function kontrolliVastust(
  token: string,
  indeks: number,
  sisend: string,
  options: { root?: string } = {},
): Promise<KontrolliTulemus> {
  const kirjed = decodeToken(token);
  const kirje = kirjed[indeks];
  if (!kirje) {
    throw new Error(`no question at index ${indeks} in this session`);
  }

  const registry = await buildRegistry(options.root);
  const generaatorid = forDifficulty(registry, kirje.teemaId, kirje.raskus);
  const generaator = generaatorid[kirje.generaatorIndeks];
  if (!generaator) {
    throw new Error("generator no longer registered for this session");
  }

  const ulesanne = generaator.genereeri(mulberry32(kirje.seed));
  return {
    teemaId: kirje.teemaId,
    raskus: kirje.raskus,
    oige: checkAnswer(sisend, ulesanne.vastus),
    vastus: ulesanne.vastus,
    lahendus: ulesanne.lahendus,
  };
}
