import { notFound } from "next/navigation";
import { getFlag } from "@/lib/flags";
import { t } from "@/lib/i18n";
import { EksamSessioon } from "./EksamSessioon";

/** The timed two-part mock exam (todo.md Ship 5.2) — behind the
 * `eksamirezhiim` flag until the ship gate passes. */
export const dynamic = "force-dynamic";

export default function EksamPage() {
  if (!getFlag("eksamirezhiim")) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("nav.eksamirezhiim")}
      </h1>
      <EksamSessioon />
    </div>
  );
}
