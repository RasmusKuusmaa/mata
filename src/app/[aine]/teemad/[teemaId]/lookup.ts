import { teemad } from "@/content/lai-matemaatika/teemad";
import { teemad as eeldusteemad } from "@/content/lai-matemaatika/teemad/eeldused";
import type { Eeldusteema, Teema } from "@/content/types";

export type MoneTeema = Teema | Eeldusteema;

/** Every browsable-or-linkable topic: the 14 courses plus the E-series
 * refreshers, which aren't in the browsable tree (Ship 1.3) but are still
 * valid link targets from a prerequisite chip. */
export const kokkuTeemad: MoneTeema[] = [...teemad, ...eeldusteemad];

export function findTeema(aine: string, teemaId: string): MoneTeema | undefined {
  return kokkuTeemad.find((teema) => teema.aine === aine && teema.id === teemaId);
}

/** Resolves a topic's direct `eeldused` ids to their topics, in order,
 * silently dropping any id that doesn't resolve (should never happen —
 * the coverage gate's dangling-reference check catches that — but a link
 * target should never crash a page over stale content). */
export function findEeldused(teema: MoneTeema): MoneTeema[] {
  return teema.eeldused
    .map((id) => kokkuTeemad.find((t) => t.id === id))
    .filter((t): t is MoneTeema => t !== undefined);
}
