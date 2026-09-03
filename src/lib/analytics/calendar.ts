import { and, asc, eq, gte, lte } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { attempts, dailyStats } from "@/lib/db/schema";

export type PaevaKirje = {
  date: string;
  kysimusi: number;
  oigeid: number;
  peegeldus: string | null;
};

function paddedMonthRange(year: number, month: number): [string, string] {
  const mm = String(month).padStart(2, "0");
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return [`${year}-${mm}-01`, `${year}-${mm}-${String(lastDay).padStart(2, "0")}`];
}

/** One month's per-day activity (todo.md Ship 4.4), keyed by date — the
 * calendar grid reads this to shade each day's intensity. `month` is
 * 1-indexed. */
export async function getKuuAndmed(
  userId: string,
  year: number,
  month: number,
): Promise<Map<string, PaevaKirje>> {
  const [start, end] = paddedMonthRange(year, month);
  const rows = await db
    .select()
    .from(dailyStats)
    .where(
      and(
        eq(dailyStats.userId, userId),
        gte(dailyStats.date, start),
        lte(dailyStats.date, end),
      ),
    );
  return new Map(rows.map((row) => [row.date, row]));
}

export type PaevaTeema = { teemaId: string; kokku: number; oigeid: number };

/** Topics touched on one calendar day, for the tapped-day detail view. */
export async function getPaevaTeemad(
  userId: string,
  date: string,
): Promise<PaevaTeema[]> {
  const dayStart = new Date(`${date}T00:00:00.000Z`);
  const dayEnd = new Date(`${date}T23:59:59.999Z`);
  const rows = await db
    .select({
      teemaId: attempts.teemaId,
      oige: attempts.oige,
    })
    .from(attempts)
    .where(
      and(
        eq(attempts.userId, userId),
        gte(attempts.createdAt, dayStart),
        lte(attempts.createdAt, dayEnd),
      ),
    )
    .orderBy(asc(attempts.createdAt));

  const byTeema = new Map<string, PaevaTeema>();
  for (const row of rows) {
    const existing = byTeema.get(row.teemaId) ?? {
      teemaId: row.teemaId,
      kokku: 0,
      oigeid: 0,
    };
    existing.kokku += 1;
    if (row.oige) existing.oigeid += 1;
    byTeema.set(row.teemaId, existing);
  }
  return [...byTeema.values()];
}

/** Upserts the day's optional one-line reflection (todo.md Ship 4.3) —
 * genuinely optional, no blank-page pressure. Creates the day's row with
 * zeroed counters if practice hasn't touched it yet (a reflection with no
 * questions that day is a legitimate, if unusual, case). */
export async function salvestaPeegeldus(
  userId: string,
  date: string,
  tekst: string,
): Promise<void> {
  await db
    .insert(dailyStats)
    .values({ userId, date, peegeldus: tekst })
    .onConflictDoUpdate({
      target: [dailyStats.userId, dailyStats.date],
      set: { peegeldus: tekst },
    });
}
