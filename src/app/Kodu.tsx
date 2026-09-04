import { eq } from "drizzle-orm";
import Link from "next/link";
import { rankWeakestTopics } from "@/lib/analytics/weakest";
import { db } from "@/lib/db/client";
import { userStats } from "@/lib/db/schema";
import { getAllTopicStates } from "@/lib/db/topic-state";
import { getEesmark, getTananeKysimusteArv } from "@/lib/gamification/goal";
import { t } from "@/lib/i18n";

/**
 * The site's home page (todo.md Ship 4.11; the guest-only marketing page
 * this replaced is gone — every visitor lands here now). A guest gets a
 * minimal welcome and two CTAs; a signed-in user gets their daily goal
 * ring, streak, and weakest topics. The exam countdown itself lives in the
 * persistent header widget (`EksamiLoendur`, in every page's layout), not
 * here, so it isn't duplicated.
 */
export async function Kodu({ userId }: { userId: string | null }) {
  if (!userId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-2xl font-semibold">
          {t("kodu.kylalaneTervitus")}
        </h1>
        <p className="mt-3 max-w-xl text-foreground/80">
          {t("kodu.kylalaneSelgitus")}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/lai-matemaatika/harjuta"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90"
          >
            {t("kodu.alustaHarjutamist")}
          </Link>
          <Link
            href="/lai-matemaatika/teekaart"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
          >
            {t("nav.teekaart")}
          </Link>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  const [eesmark, tananeArv, seisud, statsRows] = await Promise.all([
    getEesmark(userId),
    getTananeKysimusteArv(userId, today),
    getAllTopicStates(userId),
    db.select().from(userStats).where(eq(userStats.userId, userId)),
  ]);

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
      <div className="grid gap-4 sm:grid-cols-2">
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
