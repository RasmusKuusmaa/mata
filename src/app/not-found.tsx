import Link from "next/link";
import { t } from "@/lib/i18n";

/** Estonian 404 (todo.md Ship 6.4) — Next.js renders this for any route
 * that calls `notFound()` or matches nothing. */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-start px-4 py-24">
      <p className="font-display text-5xl font-semibold text-accent">404</p>
      <h1 className="mt-4 font-display text-xl font-semibold">
        {t("viga.404Pealkiri")}
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        {t("viga.404Selgitus")}
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
      >
        {t("viga.tagasiKoju")}
      </Link>
    </div>
  );
}
