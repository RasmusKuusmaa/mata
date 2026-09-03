import { and, eq, sql } from "drizzle-orm";
import type { Raskus, TeemaId } from "@/content/types";
import { db } from "@/lib/db/client";
import { dailyStats, userStats } from "@/lib/db/schema";
import { markeeriTegevus, TYHI_STREAK, type StreakSeis } from "./streak";
import { arvutaXp } from "./xp";

/** `YYYY-MM-DD` in the given timezone offset — kept trivial (UTC calendar
 * day) rather than per-user timezone-aware, matching `daily_stats.date`'s
 * existing convention elsewhere in this codebase. */
function tanaKuupaev(now: Date): string {
  return now.toISOString().slice(0, 10);
}

/**
 * Rolls one graded attempt into a signed-in user's gamification state:
 * `daily_stats` (today's question count, correct count, xp) and
 * `user_stats` (cumulative xp, streak). Not yet called from
 * `kontrolliVastust` — this is the standalone unit the practice flow wires
 * in once that file's own in-flight work (the custom test builder) settles;
 * see `QUESTIONS.md`. Guest sessions never reach this — only real accounts
 * accumulate gamification state.
 *
 * `korduseNr` approximates "how many times already today" by
 * teemaId+raskus (not by exact generator — the caller doesn't track that
 * yet) — a reasonable proxy: repeatedly drilling one topic/difficulty pair
 * should earn less than spreading practice across topics, same intent as
 * the exact-generator version described in todo.md 4.8.
 */
export async function rakendaKatseTulemus(
  userId: string,
  katse: { teemaId: TeemaId; raskus: Raskus; oige: boolean },
  now: Date = new Date(),
): Promise<void> {
  const tana = tanaKuupaev(now);

  const varasemadTana = await db
    .select({ kysimusi: dailyStats.kysimusi })
    .from(dailyStats)
    .where(and(eq(dailyStats.userId, userId), eq(dailyStats.date, tana)));
  const korduseNr = varasemadTana[0]?.kysimusi ?? 0;

  const teenitudXp = arvutaXp(katse.raskus, katse.oige, korduseNr);

  await db
    .insert(dailyStats)
    .values({
      userId,
      date: tana,
      kysimusi: 1,
      oigeid: katse.oige ? 1 : 0,
      xp: teenitudXp,
    })
    .onConflictDoUpdate({
      target: [dailyStats.userId, dailyStats.date],
      set: {
        kysimusi: sql`${dailyStats.kysimusi} + 1`,
        oigeid: sql`${dailyStats.oigeid} + ${katse.oige ? 1 : 0}`,
        xp: sql`${dailyStats.xp} + ${teenitudXp}`,
      },
    });

  const olemasolev = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId));

  const praegune: StreakSeis = olemasolev[0]
    ? {
        streakCurrent: olemasolev[0].streakCurrent,
        streakLongest: olemasolev[0].streakLongest,
        streakFreezesLeft: olemasolev[0].streakFreezesLeft,
        lastActiveDate: olemasolev[0].lastActiveDate,
      }
    : TYHI_STREAK;
  const uusStreak = markeeriTegevus(praegune, tana);
  const uusXpKokku = (olemasolev[0]?.xp ?? 0) + teenitudXp;

  await db
    .insert(userStats)
    .values({
      userId,
      xp: uusXpKokku,
      streakCurrent: uusStreak.streakCurrent,
      streakLongest: uusStreak.streakLongest,
      streakFreezesLeft: uusStreak.streakFreezesLeft,
      lastActiveDate: uusStreak.lastActiveDate,
    })
    .onConflictDoUpdate({
      target: userStats.userId,
      set: {
        xp: uusXpKokku,
        streakCurrent: uusStreak.streakCurrent,
        streakLongest: uusStreak.streakLongest,
        streakFreezesLeft: uusStreak.streakFreezesLeft,
        lastActiveDate: uusStreak.lastActiveDate,
      },
    });
}
