import type { Metadata } from "next";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { getKuuAndmed } from "@/lib/analytics/calendar";
import { paevaEksamini } from "@/lib/gamification/countdown";
import { db } from "@/lib/db/client";
import { userStats } from "@/lib/db/schema";
import { t } from "@/lib/i18n";
import { getCurrentUserId } from "@/lib/session/user";
import { KalendriRuudustik, type PaevaAndmed } from "./KalendriRuudustik";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: t("nav.kalender") };

const KUU_NIMED = [
  "Jaanuar",
  "Veebruar",
  "Märts",
  "Aprill",
  "Mai",
  "Juuni",
  "Juuli",
  "August",
  "September",
  "Oktoober",
  "November",
  "Detsember",
];

/** Monday-first ISO weekday (1..7) for the 1st of the month, so the grid's
 * leading blanks land correctly regardless of what day the month starts. */
function isoNadalapaev(date: Date): number {
  const js = date.getUTCDay();
  return js === 0 ? 7 : js;
}

export default async function KalenderPage({
  searchParams,
}: {
  searchParams: Promise<{ aasta?: string; kuu?: string }>;
}) {
  const userId = await getCurrentUserId();
  const params = await searchParams;
  const now = new Date();
  const year = Number(params.aasta) || now.getUTCFullYear();
  const month = Number(params.kuu) || now.getUTCMonth() + 1;

  const kuuAndmed = userId ? await getKuuAndmed(userId, year, month) : new Map();

  const firstOfMonth = new Date(Date.UTC(year, month - 1, 1));
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const leadingBlanks = isoNadalapaev(firstOfMonth) - 1;

  const cells: PaevaAndmed[] = [];
  for (let i = 0; i < leadingBlanks; i++) {
    cells.push({
      date: `blank-${i}`,
      paev: 0,
      onPraeguneKuu: false,
      kysimusi: 0,
      oigeid: 0,
      peegeldus: null,
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const kirje = kuuAndmed.get(date);
    cells.push({
      date,
      paev: d,
      onPraeguneKuu: true,
      kysimusi: kirje?.kysimusi ?? 0,
      oigeid: kirje?.oigeid ?? 0,
      peegeldus: kirje?.peegeldus ?? null,
    });
  }
  while (cells.length % 7 !== 0) {
    cells.push({
      date: `blank-tail-${cells.length}`,
      paev: 0,
      onPraeguneKuu: false,
      kysimusi: 0,
      oigeid: 0,
      peegeldus: null,
    });
  }
  const nadalad: PaevaAndmed[][] = [];
  for (let i = 0; i < cells.length; i += 7) nadalad.push(cells.slice(i, i + 7));

  const eelmine = month === 1 ? { aasta: year - 1, kuu: 12 } : { aasta: year, kuu: month - 1 };
  const jargmine = month === 12 ? { aasta: year + 1, kuu: 1 } : { aasta: year, kuu: month + 1 };

  const stats = userId
    ? (await db.select().from(userStats).where(eq(userStats.userId, userId)))[0]
    : undefined;
  const eksamiPaevi = paevaEksamini(stats?.eksamiKuupaev ?? null);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">{t("nav.kalender")}</h1>
      <p className="mt-1 text-sm text-foreground/70">
        {t("kalender.eksaminiSilt")}: {eksamiPaevi} {t("kalender.paeva")}
      </p>

      {!userId ? (
        <p className="mt-6 text-sm text-foreground/70">{t("kalender.logiSisseKoht")}</p>
      ) : (
        <>
          <div className="mt-6 flex items-center justify-between">
            <Link
              href={`/kalender?aasta=${eelmine.aasta}&kuu=${eelmine.kuu}`}
              className="text-sm text-accent hover:underline"
            >
              ← {KUU_NIMED[eelmine.kuu - 1]}
            </Link>
            <span className="font-display text-sm font-semibold">
              {KUU_NIMED[month - 1]} {year}
            </span>
            <Link
              href={`/kalender?aasta=${jargmine.aasta}&kuu=${jargmine.kuu}`}
              className="text-sm text-accent hover:underline"
            >
              {KUU_NIMED[jargmine.kuu - 1]} →
            </Link>
          </div>

          <KalendriRuudustik nadalad={nadalad} />
        </>
      )}
    </div>
  );
}
