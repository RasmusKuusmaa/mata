"use client";

import { useEffect, useState } from "react";
import { t } from "@/lib/i18n";

/**
 * A persistent banner while the browser reports no network connection
 * (todo.md Ship 6.4) — most relevant mid-practice, where losing the
 * connection would otherwise silently break the next "submit answer" call
 * with no explanation.
 */
export function OfflineBanner() {
  const [vorguta, setVorguta] = useState(false);

  useEffect(() => {
    setVorguta(!navigator.onLine);
    function onOnline() {
      setVorguta(false);
    }
    function onOffline() {
      setVorguta(true);
    }
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (!vorguta) return null;

  return (
    <div
      role="status"
      className="bg-accent px-4 py-2 text-center text-sm font-medium text-accent-foreground"
    >
      {t("vork.puudub")}
    </div>
  );
}
