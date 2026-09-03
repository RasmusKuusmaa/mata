import type { TeemaId } from "@/content/types";
import { getPrerequisiteChain, type TeemaNode } from "@/content/graph";

/** Consecutive misses on a topic (most recent last) before a prerequisite
 * gets suggested (todo.md Ship 3.9: "after two misses"). */
const MISS_THRESHOLD = 2;

function trailingMisses(recentOutcomes: boolean[]): number {
  let count = 0;
  for (let i = recentOutcomes.length - 1; i >= 0; i--) {
    if (recentOutcomes[i]) break;
    count++;
  }
  return count;
}

/**
 * After repeated misses on a topic, suggests its weakest prerequisite as a
 * refresher — "Kas soovid korrata teemat X?" (todo.md Ship 3.9). Never
 * forced: returns `null` whenever there's nothing to suggest, and the
 * caller decides whether/how to surface it. A prerequisite never attempted
 * counts as mastery 0 — the weakest possible — since "never touched" is a
 * stronger signal to revisit than any attempted-but-low score.
 */
export function suggestPrerequisite(
  teemaId: TeemaId,
  recentOutcomes: boolean[],
  index: Map<TeemaId, TeemaNode>,
  masteryByTeema: Map<TeemaId, number>,
): TeemaId | null {
  if (trailingMisses(recentOutcomes) < MISS_THRESHOLD) return null;

  const prerequisites = getPrerequisiteChain(teemaId, index);
  if (prerequisites.length === 0) return null;

  return prerequisites.reduce((weakest, candidate) => {
    const weakestScore = masteryByTeema.get(weakest) ?? 0;
    const candidateScore = masteryByTeema.get(candidate) ?? 0;
    return candidateScore < weakestScore ? candidate : weakest;
  });
}
