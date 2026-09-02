import { teemad as kursuseTeemad } from "@/content/lai-matemaatika/teemad";
import { teemad as eeldusteemad } from "@/content/lai-matemaatika/teemad/eeldused";
import { selgitused } from "@/content/lai-matemaatika/selgitused";
import { buildRegistry, forDifficulty } from "@/generators/registry";
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

/** Ship 1.1's `<Selgitus>` and its content registry now exist (Ship 1.4). */
export function hasExplanation(id: TeemaId): boolean {
  return id in selgitused;
}

/**
 * Discovered once at module load (Ship 1.8) — top-level await, same as the
 * niceness harness. Node-only (walks the real filesystem), which is fine:
 * every caller of this module is a test or the `coverage:content` script,
 * never app code shipped to a client.
 */
const registry = await buildRegistry();

export function generatorCountByDifficulty(id: TeemaId): Record<Raskus, number> {
  return {
    kerge: forDifficulty(registry, id, "kerge").length,
    keskmine: forDifficulty(registry, id, "keskmine").length,
    raske: forDifficulty(registry, id, "raske").length,
  };
}

export function hasFullGeneratorCoverage(id: TeemaId): boolean {
  const counts = generatorCountByDifficulty(id);
  const total = counts.kerge + counts.keskmine + counts.raske;
  return total >= 3 && DIFFICULTIES.every((level) => counts[level] > 0);
}

export function isFullyAuthored(id: TeemaId): boolean {
  return hasExplanation(id) && hasFullGeneratorCoverage(id);
}
