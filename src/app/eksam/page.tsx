import type { Metadata } from "next";
import { t } from "@/lib/i18n";
import { EksamSessioon } from "./EksamSessioon";

/** The timed two-part mock exam (todo.md Ship 5.2). Shipped past its
 * `eksamirezhiim` flag at the Ship 6 gate (formula sheet, per-question
 * worked solutions, per-course breakdown, targeted weak-topic review, and
 * e2e coverage all in place — see `docs/FEATURES.md`/`QUESTIONS.md`). */
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: t("nav.eksamirezhiim") };

export default function EksamPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("nav.eksamirezhiim")}
      </h1>
      <EksamSessioon />
    </div>
  );
}
