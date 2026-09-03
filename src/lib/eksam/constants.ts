import type { Raskus, TeemaId } from "@/content/types";
import type { KlientUlesanne } from "@/lib/practice/session";

/**
 * Pure exam-shape data and types — deliberately split out of `session.ts`,
 * which imports the filesystem-based `@/generators/registry` (Node-only:
 * `node:fs`/`node:path`/`node:url`) and therefore cannot be imported from
 * client code. `EksamSessioon.tsx` needs these constants at runtime (for
 * its timers and score display), so they live here where importing them
 * never drags in `registry.ts` — the exact same class of bug already
 * documented for the generator registry itself (see todo.md's Ship 0.23
 * fix and `QUESTIONS.md`). `session.ts` and `EksamSessioon.tsx` both import
 * from this file; neither of them should import the other's Node-only
 * half by accident, so nothing here re-exports from `session.ts`.
 */

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
export type EksamiSlot = { osa: 1 | 2; punktid: number; raskus: Raskus };

export const EKSAMI_SLOTID: EksamiSlot[] = [
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
  raskus: Raskus;
  /** Which topic this question was drawn from — carried through so the
   * review screen (Ship 5.3) can group results per course and build a
   * targeted "harjuta nõrku kohti" set from exactly the missed topics. */
  teemaId: TeemaId;
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

/** Maximum possible score — Osa I (4×5 + 3×10 = 50) + Osa II (5×10 = 50). */
export const EKSAMI_MAKSIMUMPUNKTID = EKSAMI_SLOTID.reduce(
  (summa, slot) => summa + slot.punktid,
  0,
);
