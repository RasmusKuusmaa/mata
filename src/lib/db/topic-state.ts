import { and, eq } from "drizzle-orm";
import type { TeemaId } from "@/content/types";
import { decayingMastery } from "@/lib/mastery/types";
import { db } from "./client";
import { attempts, topicState } from "./schema";

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
 * Recomputes and persists one topic's mastery from the user's full attempt
 * history on it (`decayingMastery`, Ship 3.5) — the model existed but
 * nothing was actually calling it and writing the result into
 * `topic_state`, so every topic silently showed the column defaults
 * (`masteryScore: 0`, `masteryTase: "alustamata"`) regardless of real
 * performance. Called from the practice grading path after every attempt.
 */
export async function paivitaMasterySeis(
  userId: string,
  teemaId: TeemaId,
  now: Date = new Date(),
): Promise<void> {
  const rows = await db
    .select({ oige: attempts.oige, raskus: attempts.raskus, createdAt: attempts.createdAt })
    .from(attempts)
    .where(and(eq(attempts.userId, userId), eq(attempts.teemaId, teemaId)));

  const katsed = rows.map((row) => ({
    oige: row.oige,
    raskus: row.raskus as import("@/content/types").Raskus,
    toimus: row.createdAt,
  }));
  const { skoor, tase } = decayingMastery.arvuta(katsed, now);

  await db
    .insert(topicState)
    .values({
      userId,
      teemaId,
      masteryScore: skoor,
      masteryTase: tase,
      lastSeenAt: now,
    })
    .onConflictDoUpdate({
      target: [topicState.userId, topicState.teemaId],
      set: { masteryScore: skoor, masteryTase: tase, lastSeenAt: now },
    });
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
