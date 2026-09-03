import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { dailyStats, goals } from "@/lib/db/schema";

export type Eesmark = { tuup: string; siht: number };

const VAIKIMISI_EESMARK: Eesmark = { tuup: "kysimusi", siht: 15 };

/** The user's daily goal (todo.md Ship 4.8) — the schema column defaults
 * (15 questions/day) apply until they set their own, so no row needs to
 * exist yet for a brand-new account. */
export async function getEesmark(userId: string): Promise<Eesmark> {
  const rows = await db
    .select({ tuup: goals.tuup, siht: goals.siht })
    .from(goals)
    .where(eq(goals.userId, userId));
  return rows[0] ?? VAIKIMISI_EESMARK;
}

export async function seadistaEesmark(
  userId: string,
  eesmark: Eesmark,
): Promise<void> {
  await db
    .insert(goals)
    .values({ userId, ...eesmark })
    .onConflictDoUpdate({ target: goals.userId, set: eesmark });
}

/** Today's progress toward the goal, in questions answered (the only goal
 * `tuup` actually tracked today — a minutes-based goal would need session
 * timing this repo doesn't record yet). */
export async function getTananeKysimusteArv(
  userId: string,
  today: string,
): Promise<number> {
  const rows = await db
    .select({ kysimusi: dailyStats.kysimusi })
    .from(dailyStats)
    .where(and(eq(dailyStats.userId, userId), eq(dailyStats.date, today)));
  return rows[0]?.kysimusi ?? 0;
}
