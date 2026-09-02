import type { Raskus, TeemaId } from "@/content/types";
import { checkAnswer } from "@/lib/answer/check";
import { buildRegistry, forDifficulty } from "@/generators/registry";
import { mulberry32 } from "@/generators/rng";
import type { Rng, Ulesanne, Vastus } from "@/generators/types";

/**
 * What the client is allowed to see before submitting: everything about an
 * `Ulesanne` except its answer and worked solution (todo.md Ship 1.5's
 * non-negotiable — answers and solutions never reach the client before
 * submission).
 */
export type KlientUlesanne = Omit<Ulesanne, "vastus" | "lahendus">;

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

function toKlientUlesanne(ulesanne: Ulesanne): KlientUlesanne {
  const { vastus: _vastus, lahendus: _lahendus, ...klient } = ulesanne;
  return klient;
}

/**
 * Starts a practice series: picks `kogus` questions for `teemaId`/`raskus`
 * from the generator registry, generates each server-side, and returns the
 * client-safe form of every question plus a token that lets a later
 * `kontrolliVastust` call regenerate and grade them.
 *
 * `rng` and `root` are injection points for tests — production callers
 * (Ship 1.5's `"use server"` wrapper) leave both at their defaults.
 */
export async function alustaSeeria(
  teemaId: TeemaId,
  raskus: Raskus,
  kogus: number,
  options: { rng?: Rng; root?: string } = {},
): Promise<Seeria> {
  const rng = options.rng ?? mulberry32(Date.now());
  const registry = await buildRegistry(options.root);
  const generaatorid = forDifficulty(registry, teemaId, raskus);
  if (generaatorid.length === 0) {
    throw new Error(
      `no generators registered for ${teemaId}:${raskus}`,
    );
  }

  const kirjed: SeeriaKirje[] = [];
  const ulesanded: KlientUlesanne[] = [];

  for (let i = 0; i < kogus; i++) {
    const generaatorIndeks = Math.floor(rng() * generaatorid.length);
    const seed = Math.floor(rng() * 2 ** 31);
    const ulesanne = generaatorid[generaatorIndeks].genereeri(mulberry32(seed));

    kirjed.push({ teemaId, raskus, generaatorIndeks, seed });
    ulesanded.push(toKlientUlesanne(ulesanne));
  }

  return { token: encodeToken(kirjed), ulesanded };
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
    oige: checkAnswer(sisend, ulesanne.vastus),
    vastus: ulesanne.vastus,
    lahendus: ulesanne.lahendus,
  };
}
