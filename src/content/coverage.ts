import { teemad as kursuseTeemad } from "@/content/lai-matemaatika/teemad";
import { teemad as eeldusteemad } from "@/content/lai-matemaatika/teemad/eeldused";
import type { TeemaId } from "@/content/types";

export type CoverageTeema = {
  id: TeemaId;
  kursusId: string;
  opitulemused: string[];
  eeldused: TeemaId[];
};

export const allTeemad: CoverageTeema[] = [...kursuseTeemad, ...eeldusteemad];
export const allTeemaIds = new Set(allTeemad.map((t) => t.id));

export const DIFFICULTIES = ["kerge", "keskmine", "raske"] as const;
export type Raskus = (typeof DIFFICULTIES)[number];

/**
 * Explanations (Ship 1.1's `<Selgitus>`) and generators (Ship 0.20-0.24's
 * registry) don't exist yet, so these always report "none". Replace their
 * bodies with real lookups once those ships land — every call site here
 * stays the same, only the answer changes, same pattern as the trivial
 * MasteryModel/ReviewScheduler in Ship 0.26.
 */
export function hasExplanation(_id: TeemaId): boolean {
  return false;
}

export function generatorCountByDifficulty(
  _id: TeemaId,
): Record<Raskus, number> {
  return { kerge: 0, keskmine: 0, raske: 0 };
}

export function hasFullGeneratorCoverage(id: TeemaId): boolean {
  const counts = generatorCountByDifficulty(id);
  const total = counts.kerge + counts.keskmine + counts.raske;
  return total >= 3 && DIFFICULTIES.every((level) => counts[level] > 0);
}

export function isFullyAuthored(id: TeemaId): boolean {
  return hasExplanation(id) && hasFullGeneratorCoverage(id);
}
