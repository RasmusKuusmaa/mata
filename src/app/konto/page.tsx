import { AccountStatus } from "@/components/nav/AccountStatus";
import { VAIKIMISI_EKSAMI_KUUPAEV } from "@/lib/gamification/countdown";
import { t } from "@/lib/i18n";
import { getCurrentUserId } from "@/lib/session/user";
import { getEksamiKuupaev, seadistaEksamiKuupaev } from "./actions";

export const dynamic = "force-dynamic";

export default async function KontoPage() {
  const userId = await getCurrentUserId();
  const eksamiKuupaev = userId ? await getEksamiKuupaev(userId) : null;

  return (
    <div className="mx-auto max-w-sm px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("konto.pealkiri")}
      </h1>
      <div className="mt-6 rounded-md border border-border bg-surface">
        <AccountStatus />
      </div>

      {userId && (
        <div className="mt-6 rounded-md border border-border bg-surface p-4">
          <h2 className="font-display text-sm font-semibold">
            {t("konto.eksamiKuupaevSilt")}
          </h2>
          <form action={seadistaEksamiKuupaev} className="mt-2 flex gap-2">
            <input
              type="date"
              name="eksamiKuupaev"
              defaultValue={eksamiKuupaev ?? VAIKIMISI_EKSAMI_KUUPAEV}
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
            >
              {t("konto.salvesta")}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
