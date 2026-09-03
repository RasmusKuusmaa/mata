"use client";

import { useEffect } from "react";
import { t } from "@/lib/i18n";

/**
 * Last-resort Estonian error page (todo.md Ship 6.4) for a failure in
 * `layout.tsx` itself — Next.js requires this to render its own
 * `<html>`/`<body>` since the root layout that would normally provide them
 * is exactly what failed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="et">
      <body>
        <div className="mx-auto flex max-w-md flex-col items-start px-4 py-24">
          <h1 className="text-xl font-semibold">{t("viga.500Pealkiri")}</h1>
          <p className="mt-2 text-sm text-foreground/70">
            {t("viga.500Selgitus")}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            {t("viga.prooviUuesti")}
          </button>
        </div>
      </body>
    </html>
  );
}
