import type { Raskus } from "@/content/types";

/**
 * XP awarded per correct answer, before the repeat penalty. Scaled by
 * difficulty so a `raske` question is worth meaningfully more than
 * grinding `kerge` ones — todo.md Ship 4.8.
 */
const PHIS_XP: Record<Raskus, number> = {
  kerge: 10,
  keskmine: 20,
  raske: 35,
};

/** Never award less than this fraction of base XP, however many times the
 * same generator has already been seen — repetition is worth less, not
 * worthless. */
const MIN_KORDAJA = 0.2;

/**
 * XP for one answered question. `korduseNr` is how many times this exact
 * generator has already been answered in the current scoring window (0 the
 * first time) — each repeat halves the multiplier down to `MIN_KORDAJA`.
 * Wrong answers earn nothing.
 */
export function arvutaXp(
  raskus: Raskus,
  oige: boolean,
  korduseNr: number,
): number {
  if (!oige) return 0;
  const kordaja = Math.max(MIN_KORDAJA, 1 / 2 ** korduseNr);
  return Math.round(PHIS_XP[raskus] * kordaja);
}
