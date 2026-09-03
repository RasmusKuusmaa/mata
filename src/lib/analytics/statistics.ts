import { and, eq, gte } from "drizzle-orm";
import { kursused } from "@/content/lai-matemaatika/kursused";
import { teemad } from "@/content/lai-matemaatika/teemad";
import { db } from "@/lib/db/client";
import { attempts } from "@/lib/db/schema";
import { rankWeakestTopics, type NorkTeema, type TeemaSeis } from "./weakest";

const TEEMA_KURSUS: Map<string, string> = new Map(
  teemad.map((teema) => [teema.id, teema.kursusId]),
);

export type Kokkuvote = {
  kokku: number;
  viimane7Paeva: number;
  eelmine7Paeva: number;
  oigeidKokku: number;
};

/** Total volume, last-7-day volume (and the 7 days before that, so the
 * caller can show a trend), and overall accuracy — todo.md Ship 4.6's
 * headline numbers. */
export async function getKokkuvote(userId: string): Promise<Kokkuvote> {
  const rows = await db
    .select({ oige: attempts.oige, createdAt: attempts.createdAt })
    .from(attempts)
    .where(eq(attempts.userId, userId));

  const now = Date.now();
  const DAY = 86_400_000;
  let viimane7Paeva = 0;
  let eelmine7Paeva = 0;
  let oigeidKokku = 0;

  for (const row of rows) {
    if (row.oige) oigeidKokku += 1;
    const age = (now - row.createdAt.getTime()) / DAY;
    if (age <= 7) viimane7Paeva += 1;
    else if (age <= 14) eelmine7Paeva += 1;
  }

  return { kokku: rows.length, viimane7Paeva, eelmine7Paeva, oigeidKokku };
}

export type KursuseStatistika = {
  kursusId: string;
  nimi: string;
  kokku: number;
  oigeid: number;
};

/** Accuracy and volume per course, in curriculum order — every row is
 * meant to be rendered as a clickable link into that course's practice. */
export async function getKursusteStatistika(
  userId: string,
): Promise<KursuseStatistika[]> {
  const rows = await db
    .select({ teemaId: attempts.teemaId, oige: attempts.oige })
    .from(attempts)
    .where(eq(attempts.userId, userId));

  const byKursus = new Map<string, { kokku: number; oigeid: number }>();
  for (const row of rows) {
    const kursusId = TEEMA_KURSUS.get(row.teemaId);
    if (!kursusId) continue;
    const existing = byKursus.get(kursusId) ?? { kokku: 0, oigeid: 0 };
    existing.kokku += 1;
    if (row.oige) existing.oigeid += 1;
    byKursus.set(kursusId, existing);
  }

  return kursused
    .filter((kursus) => byKursus.has(kursus.id))
    .map((kursus) => ({
      kursusId: kursus.id,
      nimi: kursus.nimi,
      ...byKursus.get(kursus.id)!,
    }));
}

export type TeemaStatistika = TeemaSeis & { kokku: number; oigeid: number };

/** Per-topic accuracy, worst-mastery-first — reuses `rankWeakestTopics`
 * (Ship 3.8) so the statistics page and the daily review set agree on what
 * "weakest" means. */
export async function getTeemadeStatistika(
  userId: string,
  seisud: TeemaSeis[],
): Promise<(NorkTeema & { kokku: number; oigeid: number })[]> {
  const rows = await db
    .select({ teemaId: attempts.teemaId, oige: attempts.oige })
    .from(attempts)
    .where(eq(attempts.userId, userId));

  const byTeema = new Map<string, { kokku: number; oigeid: number }>();
  for (const row of rows) {
    const existing = byTeema.get(row.teemaId) ?? { kokku: 0, oigeid: 0 };
    existing.kokku += 1;
    if (row.oige) existing.oigeid += 1;
    byTeema.set(row.teemaId, existing);
  }

  return rankWeakestTopics(seisud).map((teema) => ({
    ...teema,
    ...(byTeema.get(teema.teemaId) ?? { kokku: 0, oigeid: 0 }),
  }));
}

export type MasteryJaotus = Record<
  "alustamata" | "algaja" | "edeneb" | "hea" | "kindel",
  number
>;

/** How many touched topics fall in each mastery band — a coarse stand-in
 * for "mastery over time" (todo.md 4.6) since no historical snapshot of
 * mastery is stored anywhere; a true trend line would need periodic
 * snapshots this repo doesn't take yet. Documented as a known gap. */
export function jaotaMasteryTasemeteJargi(seisud: TeemaSeis[]): MasteryJaotus {
  const jaotus: MasteryJaotus = {
    alustamata: 0,
    algaja: 0,
    edeneb: 0,
    hea: 0,
    kindel: 0,
  };
  for (const seis of seisud) jaotus[seis.masteryTase] += 1;
  return jaotus;
}

/** Volume per day for the last `paevi` days, oldest first — feeds the
 * 7-day trend chart. */
export async function getViimasedPaevad(
  userId: string,
  paevi: number = 7,
): Promise<{ date: string; kysimusi: number }[]> {
  const since = new Date(Date.now() - (paevi - 1) * 86_400_000);
  since.setUTCHours(0, 0, 0, 0);
  const rows = await db
    .select({ createdAt: attempts.createdAt })
    .from(attempts)
    .where(and(eq(attempts.userId, userId), gte(attempts.createdAt, since)));

  const byDate = new Map<string, number>();
  for (let i = 0; i < paevi; i++) {
    const d = new Date(since.getTime() + i * 86_400_000);
    byDate.set(d.toISOString().slice(0, 10), 0);
  }
  for (const row of rows) {
    const key = row.createdAt.toISOString().slice(0, 10);
    if (byDate.has(key)) byDate.set(key, (byDate.get(key) ?? 0) + 1);
  }
  return [...byDate.entries()].map(([date, kysimusi]) => ({ date, kysimusi }));
}
