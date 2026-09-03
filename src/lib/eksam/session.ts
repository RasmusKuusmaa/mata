import { teemad as PARIS_TEEMAD } from "@/content/lai-matemaatika/teemad";
import type { Raskus, Teema, TeemaId } from "@/content/types";
import { buildRegistry, forDifficulty } from "@/generators/registry";
import { mulberry32 } from "@/generators/rng";
import type { Rng } from "@/generators/types";
import {
  alustaKohandatudSeeria,
  type KlientUlesanne,
} from "@/lib/practice/session";

/** todo.md Ship 5.2's exam structure, verbatim from `docs/eristuskiri-2027.md`
 * — kept as named constants rather than magic numbers since the UI's timers
 * and the exam-review screen both need to agree with them exactly. */
export const OSA_I_MINUTID = 120;
export const VAHEAEG_MINUTID = 45;
export const OSA_II_MINUTID = 150;

/**
 * One exam slot: which part it belongs to, its point value, and the
 * thinking-level-derived difficulty it should be drawn from (I ~20% → kerge,
 * II ~30% → keskmine, III ~50% → raske, per the eristuskiri's mõtlemistasand
 * distribution). Twelve slots total — 4×5p + 3×10p in Osa I, 5×10p in Osa
 * II — mirrors the real exam's exact structure.
 */
type EksamiSlot = { osa: 1 | 2; punktid: number; raskus: Raskus };

const EKSAMI_SLOTID: EksamiSlot[] = [
  { osa: 1, punktid: 5, raskus: "kerge" },
  { osa: 1, punktid: 5, raskus: "kerge" },
  { osa: 1, punktid: 5, raskus: "keskmine" },
  { osa: 1, punktid: 5, raskus: "keskmine" },
  { osa: 1, punktid: 10, raskus: "keskmine" },
  { osa: 1, punktid: 10, raskus: "raske" },
  { osa: 1, punktid: 10, raskus: "raske" },
  { osa: 2, punktid: 10, raskus: "keskmine" },
  { osa: 2, punktid: 10, raskus: "raske" },
  { osa: 2, punktid: 10, raskus: "raske" },
  { osa: 2, punktid: 10, raskus: "raske" },
  { osa: 2, punktid: 10, raskus: "raske" },
];

export type EksamiKusimus = {
  osa: 1 | 2;
  punktid: number;
  /** Grades independently via the existing `kontrolliVastust` — an exam
   * question is not structurally different from a practice one, just
   * scheduled and scored differently by the caller. */
  token: string;
  ulesanne: KlientUlesanne;
};

export type EksamiSeeria = {
  osaI: EksamiKusimus[];
  osaII: EksamiKusimus[];
};

/**
 * Builds a full two-part mock exam: for every slot in `EKSAMI_SLOTID`, picks
 * a random topic that (a) is covered by the 2027 exam (`eksamiKate[2027]`)
 * and (b) has at least one registered generator at that slot's difficulty,
 * preferring topics not already used elsewhere in this exam for breadth.
 * Falls back to reusing a topic only if every eligible one is already
 * taken. Throws if a difficulty has no eligible topic at all — a content
 * gap, not something to silently paper over in exam mode.
 */
export async function alustaEksam(
  options: { rng?: Rng; root?: string; teemad?: Teema[] } = {},
): Promise<EksamiSeeria> {
  const rng = options.rng ?? mulberry32(Date.now());
  const registry = await buildRegistry(options.root);

  const kaetudTeemad = (options.teemad ?? PARIS_TEEMAD).filter(
    (teema) => teema.eksamiKate[2027],
  );

  const eligibleByRaskus = new Map<Raskus, TeemaId[]>();
  function eligible(raskus: Raskus): TeemaId[] {
    const cached = eligibleByRaskus.get(raskus);
    if (cached) return cached;
    const ids = kaetudTeemad
      .filter((teema) => forDifficulty(registry, teema.id, raskus).length > 0)
      .map((teema) => teema.id);
    eligibleByRaskus.set(raskus, ids);
    return ids;
  }

  const kasutatud = new Set<TeemaId>();
  const kusimused: EksamiKusimus[] = [];

  for (const slot of EKSAMI_SLOTID) {
    const kandidaadid = eligible(slot.raskus);
    if (kandidaadid.length === 0) {
      throw new Error(
        `no exam-eligible topic registered for difficulty ${slot.raskus}`,
      );
    }
    const varsked = kandidaadid.filter((id) => !kasutatud.has(id));
    const valik = varsked.length > 0 ? varsked : kandidaadid;
    const teemaId = valik[Math.floor(rng() * valik.length)];
    kasutatud.add(teemaId);

    const seeria = await alustaKohandatudSeeria(
      [{ teemaId, raskus: slot.raskus }],
      1,
      { rng, root: options.root },
    );

    kusimused.push({
      osa: slot.osa,
      punktid: slot.punktid,
      token: seeria.token,
      ulesanne: seeria.ulesanded[0],
    });
  }

  return {
    osaI: kusimused.filter((k) => k.osa === 1),
    osaII: kusimused.filter((k) => k.osa === 2),
  };
}

/** Maximum possible score — Osa I (4×5 + 3×10 = 50) + Osa II (5×10 = 50). */
export const EKSAMI_MAKSIMUMPUNKTID = EKSAMI_SLOTID.reduce(
  (summa, slot) => summa + slot.punktid,
  0,
);
