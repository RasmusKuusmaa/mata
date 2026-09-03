import { eq } from "drizzle-orm";
import Link from "next/link";
import { getEksamiKuupaev } from "@/app/konto/actions";
import { rankWeakestTopics } from "@/lib/analytics/weakest";
import { db } from "@/lib/db/client";
import { userStats } from "@/lib/db/schema";
import { getAllTopicStates } from "@/lib/db/topic-state";
import { getEesmark, getTananeKysimusteArv } from "@/lib/gamification/goal";
import { paevaEksamini } from "@/lib/gamification/countdown";
import { t } from "@/lib/i18n";

/** The signed-in home page (todo.md Ship 4.11): countdown, daily goal ring,
 * today's review CTA, weakest topics, current streak. Additive — the
 * signed-out marketing page in `page.tsx` is unchanged for guests. */
export async function SisseloginudKodu({ userId }: { userId: string }) {
  const today = new Date().toISOString().slice(0, 10);

  const [eksamiKuupaev, eesmark, tananeArv, seisud, statsRows] = await Promise.all([
    getEksamiKuupaev(userId),
    getEesmark(userId),
    getTananeKysimusteArv(userId, today),
    getAllTopicStates(userId),
    db.select().from(userStats).where(eq(userStats.userId, userId)),
  ]);

  const eksamiPaevi = paevaEksamini(eksamiKuupaev);
  const eesmargiProtsent = Math.min(
    100,
    Math.round((tananeArv / Math.max(1, eesmark.siht)) * 100),
  );
  const streakCurrent = statsRows[0]?.streakCurrent ?? 0;

  const norgad = rankWeakestTopics(
    seisud.map((seis) => ({
      teemaId: seis.teemaId,
      masteryScore: seis.masteryScore,
      masteryTase: seis.masteryTase as import("@/lib/mastery/types").MasteriaTase,
      manualReview: seis.manualReview,
      lastSeenAt: seis.lastSeenAt,
    })),
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-border bg-surface p-4">
          <p className="text-xs text-foreground/60">{t("kalender.eksaminiSilt")}</p>
          <p className="mt-1 font-display text-2xl font-semibold">
            {eksamiPaevi} <span className="text-sm font-normal">{t("kalender.paeva")}</span>
          </p>
        </div>

        <div className="rounded-md border border-border bg-surface p-4">
          <p className="text-xs text-foreground/60">{t("kodu.eesmarkSilt")}</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full bg-accent"
                style={{ width: `${eesmargiProtsent}%` }}
              />
            </div>
            <span className="whitespace-nowrap text-xs font-medium">
              {tananeArv}/{eesmark.siht}
            </span>
          </div>
        </div>

        {streakCurrent > 0 && (
          <div className="rounded-md border border-border bg-surface p-4">
            <p className="text-xs text-foreground/60">{t("gamifikatsioon.streak")}</p>
            <p className="mt-1 font-display text-2xl font-semibold">
              🔥 {streakCurrent}
            </p>
          </div>
        )}
      </div>

      <Link
        href="/lai-matemaatika/harjuta/kordamine"
        className="mt-6 inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90"
      >
        {t("kodu.kordamineCta")}
      </Link>

      {norgad.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold">
            {t("kodu.norgadTeemadSilt")}
          </h2>
          <ul className="mt-3 divide-y divide-border rounded-md border border-border">
            {norgad.map((teema) => (
              <li key={teema.teemaId}>
                <Link
                  href={`/lai-matemaatika/harjuta/${teema.teemaId}`}
                  className="flex items-center justify-between px-3 py-2 text-sm hover:bg-surface"
                >
                  <span>{teema.teemaId}</span>
                  <span className="text-foreground/60">{teema.masteryTase}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
