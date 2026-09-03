import { eq } from "drizzle-orm";
import { db } from "./client";
import { userAchievements } from "./schema";

export async function getUnlockedAchievementIds(
  userId: string,
): Promise<Set<string>> {
  const rows = await db
    .select({ achievementId: userAchievements.achievementId })
    .from(userAchievements)
    .where(eq(userAchievements.userId, userId));
  return new Set(rows.map((row) => row.achievementId));
}

export async function unlockAchievements(
  userId: string,
  ids: string[],
): Promise<void> {
  if (ids.length === 0) return;
  await db
    .insert(userAchievements)
    .values(ids.map((achievementId) => ({ userId, achievementId })))
    .onConflictDoNothing();
}
