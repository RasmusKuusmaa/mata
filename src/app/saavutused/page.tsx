import { getUnlockedAchievementIds } from "@/lib/db/achievements";
import { SAAVUTUSED } from "@/lib/gamification/achievements";
import { t } from "@/lib/i18n";
import { getCurrentUserId } from "@/lib/session/user";

export const dynamic = "force-dynamic";

export default async function SaavutusedPage() {
  const userId = await getCurrentUserId();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("saavutused.pealkiri")}
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        {t("saavutused.selgitus")}
      </p>

      {!userId ? (
        <p className="mt-6 text-sm text-foreground/70">
          {t("saavutused.logiSisseKoht")}
        </p>
      ) : (
        <SaavutusteList userId={userId} />
      )}
    </div>
  );
}

async function SaavutusteList({ userId }: { userId: string }) {
  const avatud = await getUnlockedAchievementIds(userId);

  return (
    <ul className="mt-6 space-y-2">
      {SAAVUTUSED.map((saavutus) => {
        const onAvatud = avatud.has(saavutus.id);
        return (
          <li
            key={saavutus.id}
            className={`rounded-md border p-3 ${
              onAvatud
                ? "border-accent bg-accent/10"
                : "border-border bg-surface opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{saavutus.nimi}</p>
              <span className="text-xs text-foreground/50">
                {onAvatud ? t("saavutused.avatud") : t("saavutused.suletud")}
              </span>
            </div>
            <p className="mt-1 text-xs text-foreground/60">
              {saavutus.kirjeldus}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
