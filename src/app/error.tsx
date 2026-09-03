"use client";

import { useEffect } from "react";
import { t } from "@/lib/i18n";

/** Estonian error boundary (todo.md Ship 6.4) for any route-level render
 * failure, wrapped around `layout.tsx`'s nav shell automatically by
 * Next.js — a broken page never means a blank white screen. */
export default function ErrorBoundary({
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
    <div className="mx-auto flex max-w-md flex-col items-start px-4 py-24">
      <h1 className="font-display text-xl font-semibold">
        {t("viga.500Pealkiri")}
      </h1>
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
  );
}
