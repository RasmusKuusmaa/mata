import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { userStats } from "@/lib/db/schema";
import { jargmiseTasemeniXp, tasemeleXp, xpTasemeAlguseks } from "@/lib/gamification/level";
import { t } from "@/lib/i18n";
import { getCurrentUserId } from "@/lib/session/user";

/** Compact level/xp/streak readout for a signed-in user — rendered under
 * `AccountStatus` in the nav. Renders nothing for a guest (no gamification
 * state exists to show) or a brand-new account with no `user_stats` row
 * yet (shows as level 1 with no streak instead of erroring). */
export async function GamificationBadge() {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const rows = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId));
  const stats = rows[0] ?? { xp: 0, streakCurrent: 0 };

  const tase = tasemeleXp(stats.xp);
  const taseAlgus = xpTasemeAlguseks(tase);
  const jargmiseni = jargmiseTasemeniXp(stats.xp);
  const taseVahemik = jargmiseni + (stats.xp - taseAlgus);
  const progressPct =
    taseVahemik > 0
      ? Math.round(((stats.xp - taseAlgus) / taseVahemik) * 100)
      : 100;

  return (
    <div className="px-3 py-2 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-medium">
          {t("gamifikatsioon.tase")} {tase}
        </span>
        {stats.streakCurrent > 0 && (
          <span title={t("gamifikatsioon.streak")}>
            🔥 {stats.streakCurrent}
          </span>
        )}
      </div>
      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-accent"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}
