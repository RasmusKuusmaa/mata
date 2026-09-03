import type { MasteriaTase } from "@/lib/mastery/types";

/** The subset of a `topic_state` row this ranking needs. */
export type TeemaSeis = {
  teemaId: string;
  masteryScore: number;
  masteryTase: MasteriaTase;
  manualReview: boolean;
  lastSeenAt: Date | null;
};

export type NorkTeema = TeemaSeis & {
  /** Higher means weaker/more urgent to practise. Not bounded — only its
   * ordering matters. */
  prioriteet: number;
};

const MANUAL_REVIEW_BONUS = 40;
/** One priority point per this many days since last practised — staleness
 * matters, but should never outweigh a topic that's actually low-scoring. */
const DAYS_PER_STALENESS_POINT = 3;
const MAX_STALENESS_BONUS = 30;

function daysSince(date: Date, now: Date): number {
  return Math.max(0, (now.getTime() - date.getTime()) / 86_400_000);
}

/**
 * Ranks a user's touched topics worst-first (todo.md Ship 3.8), combining
 * low mastery, staleness and the manual "vajab kordamist" flag into one
 * priority score. Powers the home page, statistics page, and mixed
 * ("weakest topics") practice sets. Topics never attempted aren't ranked
 * here — they belong to a separate "not started" surface, not a repair list.
 */
export function rankWeakestTopics(
  seisud: TeemaSeis[],
  now: Date = new Date(),
): NorkTeema[] {
  return seisud
    .map((seis) => {
      const staleness = seis.lastSeenAt
        ? Math.min(
            MAX_STALENESS_BONUS,
            daysSince(seis.lastSeenAt, now) / DAYS_PER_STALENESS_POINT,
          )
        : 0;
      const prioriteet =
        (100 - seis.masteryScore) +
        staleness +
        (seis.manualReview ? MANUAL_REVIEW_BONUS : 0);
      return { ...seis, prioriteet };
    })
    .sort((a, b) => b.prioriteet - a.prioriteet);
}
