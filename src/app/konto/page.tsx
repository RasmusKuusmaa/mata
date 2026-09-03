import { AccountStatus } from "@/components/nav/AccountStatus";
import { t } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default function KontoPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("konto.pealkiri")}
      </h1>
      <div className="mt-6 rounded-md border border-border bg-surface">
        <AccountStatus />
      </div>
    </div>
  );
}
