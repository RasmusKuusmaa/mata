import { and, eq } from "drizzle-orm";
import type { TeemaId } from "@/content/types";
import { db } from "./client";
import { topicState } from "./schema";

export type TopicState = typeof topicState.$inferSelect;

export async function getTopicState(
  userId: string,
  teemaId: TeemaId,
): Promise<TopicState | null> {
  const rows = await db
    .select()
    .from(topicState)
    .where(and(eq(topicState.userId, userId), eq(topicState.teemaId, teemaId)));
  return rows[0] ?? null;
}

export async function getAllTopicStates(userId: string): Promise<TopicState[]> {
  return db.select().from(topicState).where(eq(topicState.userId, userId));
}

/**
 * The user's own "vajab kordamist" toggle (todo.md Ship 3.6) — a separate
 * axis from computed mastery, never derived from it. Creates the row on
 * first use rather than requiring mastery to have been computed already.
 */
export async function setManualReview(
  userId: string,
  teemaId: TeemaId,
  manualReview: boolean,
): Promise<void> {
  await db
    .insert(topicState)
    .values({ userId, teemaId, manualReview })
    .onConflictDoUpdate({
      target: [topicState.userId, topicState.teemaId],
      set: { manualReview },
    });
}
