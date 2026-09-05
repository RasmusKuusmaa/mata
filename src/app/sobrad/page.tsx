import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { userStats } from "@/lib/db/schema";
import { getFlag } from "@/lib/flags";
import { kursuseKatvusProtsent } from "@/lib/gamification/context";
import { t } from "@/lib/i18n";
import { getCurrentUserId } from "@/lib/session/user";
import { getOotelKutsed, getSobrad, type Sober } from "@/lib/social/friends";
import { eemaldaVoiLoobu, kinnitaKutse, saadaKutseEpostiga } from "./actions";

export const dynamic = "force-dynamic";

export default async function SobradPage() {
  if (!getFlag("kontosusteem")) notFound();

  const userId = await getCurrentUserId();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("sobrad.pealkiri")}
      </h1>
      <p className="mt-2 text-sm text-foreground/70">{t("sobrad.selgitus")}</p>

      {!userId ? (
        <p className="mt-6 text-sm text-foreground/70">
          {t("sobrad.logiSisseKoht")}
        </p>
      ) : (
        <SobradSisu userId={userId} />
      )}
    </div>
  );
}

async function katvusJaStreak(soberId: string) {
  const [protsent, statsRows] = await Promise.all([
    kursuseKatvusProtsent(soberId),
    db.select().from(userStats).where(eq(userStats.userId, soberId)),
  ]);
  return { protsent, streak: statsRows[0]?.streakCurrent ?? 0 };
}

async function SobradSisu({ userId }: { userId: string }) {
  const [sobrad, ootelKutsed] = await Promise.all([
    getSobrad(userId),
    getOotelKutsed(userId),
  ]);

  return (
    <div className="mt-6">
      <form action={saadaKutseEpostiga} className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder={t("sobrad.epostKoht")}
          className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
        >
          {t("sobrad.saadaKutse")}
        </button>
      </form>

      {ootelKutsed.length > 0 && (
        <section className="mt-6">
          <h2 className="font-display text-sm font-semibold text-foreground/70">
            {t("sobrad.ootelKutsed")}
          </h2>
          <ul className="mt-2 space-y-2">
            {ootelKutsed.map((kutse) => (
              <li
                key={kutse.id}
                className="flex items-center justify-between rounded-md border border-border bg-surface p-3"
              >
                <span className="text-sm">{kutse.nimi ?? kutse.id}</span>
                <div className="flex gap-2">
                  <form action={kinnitaKutse.bind(null, kutse.id)}>
                    <button
                      type="submit"
                      className="text-xs font-medium text-accent hover:underline"
                    >
                      {t("sobrad.kinnita")}
                    </button>
                  </form>
                  <form action={eemaldaVoiLoobu.bind(null, kutse.id)}>
                    <button
                      type="submit"
                      className="text-xs text-foreground/50 hover:underline"
                    >
                      {t("sobrad.loobu")}
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-6">
        {sobrad.length === 0 ? (
          <p className="text-sm text-foreground/70">{t("sobrad.tyhi")}</p>
        ) : (
          <ul className="space-y-2">
            {sobrad.map((sober) => (
              <SobraRida key={sober.id} sober={sober} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

async function SobraRida({ sober }: { sober: Sober }) {
  const { protsent, streak } = await katvusJaStreak(sober.id);

  return (
    <li className="flex items-center justify-between rounded-md border border-border bg-surface p-3">
      <div>
        <p className="text-sm font-medium">{sober.nimi ?? sober.id}</p>
        <p className="mt-1 text-xs text-foreground/60">
          {streak > 0 && `🔥 ${streak} ${t("sobrad.streakSilt")} · `}
          {protsent}% {t("sobrad.kursusedSilt")}
        </p>
      </div>
      <form action={eemaldaVoiLoobu.bind(null, sober.id)}>
        <button
          type="submit"
          className="text-xs text-foreground/50 hover:underline"
        >
          {t("sobrad.eemalda")}
        </button>
      </form>
    </li>
  );
}
