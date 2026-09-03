import { and, eq, isNotNull } from "drizzle-orm";
import { kursused } from "@/content/lai-matemaatika/kursused";
import { teemad as eeldusteemad } from "@/content/lai-matemaatika/teemad/eeldused";
import type { KursusId } from "@/content/types";
import { db } from "@/lib/db/client";
import { attempts, examRuns, topicState, userStats } from "@/lib/db/schema";
import type { SaavutusteKontekst } from "./achievements";

const KOIK_KURSUSED: KursusId[] = kursused.map((k) => k.id);
const EELDUSTE_TEEMAD = eeldusteemad.map((t) => t.id);

/** Course a topic id belongs to — topic ids are always `"<kursusId>-<slug>"`
 * (or `"E-<slug>"` for the prerequisite series, which isn't in
 * `KOIK_KURSUSED` and so never counts toward "all courses started"). */
function kursusIdFromTeemaId(teemaId: string): string {
  return teemaId.split("-")[0];
}

/** Gathers everything `uuedSaavutused` needs to know about `userId` from
 * the database — kept separate from `achievements.ts` so that module stays
 * a pure, database-free function over a plain object. */
export async function koostaSaavutusteKontekst(
  userId: string,
): Promise<SaavutusteKontekst> {
  const [states, myAttempts, stats, finishedExams] = await Promise.all([
    db.select().from(topicState).where(eq(topicState.userId, userId)),
    db
      .select({ teemaId: attempts.teemaId })
      .from(attempts)
      .where(eq(attempts.userId, userId)),
    db.select().from(userStats).where(eq(userStats.userId, userId)),
    db
      .select({ id: examRuns.id })
      .from(examRuns)
      .where(and(eq(examRuns.userId, userId), isNotNull(examRuns.finishedAt))),
  ]);

  const masteryByTeema: SaavutusteKontekst["masteryByTeema"] = {};
  for (const row of states) {
    masteryByTeema[row.teemaId] = row.masteryTase as never;
  }

  const kursusedAlustatud = new Set(
    myAttempts.map((row) => kursusIdFromTeemaId(row.teemaId)),
  );

  const streakLongest = stats[0]?.streakLongest ?? 0;
  const streakCurrent = stats[0]?.streakCurrent ?? 0;

  return {
    masteryByTeema,
    kursusedAlustatud,
    koikKursused: KOIK_KURSUSED,
    eeldusteTeemad: EELDUSTE_TEEMAD,
    labitudEksameid: finishedExams.length,
    streakLongest,
    // Simplification: "just came back" is approximated as "today's streak
    // restarted at 1 but had previously reached a full week" rather than
    // tracking the exact reset moment — good enough for a feel-good
    // achievement, not something anything else depends on.
    taastusKatkenudStreakist: streakCurrent === 1 && streakLongest >= 7,
  };
}

/** Percentage of the fourteen mandatory courses with at least one attempted
 * topic — deliberately *coverage*, not raw XP or question volume, so
 * friends comparing this (`docs/FEATURES.md` section 4) compare progress
 * rather than grinding. */
export async function kursuseKatvusProtsent(userId: string): Promise<number> {
  const rows = await db
    .select({ teemaId: attempts.teemaId })
    .from(attempts)
    .where(eq(attempts.userId, userId));
  const kursusedAlustatud = new Set(
    rows.map((row) => kursusIdFromTeemaId(row.teemaId)),
  );
  const alustatudMandatuudest = KOIK_KURSUSED.filter((id) =>
    kursusedAlustatud.has(id),
  ).length;
  return Math.round((alustatudMandatuudest / KOIK_KURSUSED.length) * 100);
}
