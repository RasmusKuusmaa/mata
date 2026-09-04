"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { t } from "@/lib/i18n";

const STORAGE_KEY = "eksami-loendur-peidetud";

/** Routes where the countdown would be a distraction — an active practice
 * or exam-mode session — rather than the "every other page" chrome it's
 * meant to be. */
function peidetudSelRajal(pathname: string): boolean {
  return pathname.startsWith("/eksam") || pathname.includes("/harjuta");
}

/** Local midnight, not UTC — parsing with no `Z`/offset makes `Date.parse`
 * use the browser's own timezone, so the hour/minute readout counts down to
 * the exam day actually starting where the student is, not to UTC
 * midnight (which, east of Greenwich, is already a few hours into the
 * previous local day). */
function jaanudAeg(sihtpaev: string, nyyd: Date) {
  const diffMs = Math.max(
    0,
    Date.parse(`${sihtpaev}T00:00:00`) - nyyd.getTime(),
  );
  return {
    paevad: Math.floor(diffMs / 86_400_000),
    tunnid: Math.floor((diffMs % 86_400_000) / 3_600_000),
    minutid: Math.floor((diffMs % 3_600_000) / 60_000),
    sekundid: Math.floor((diffMs % 60_000) / 1000),
  };
}

function kahekohaline(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Persistent exam countdown, top-right on every page. Ticks live
 * client-side rather than only recomputing on page load — `sihtpaev` is
 * resolved server-side by `EksamiLoendur`, but "how much time is left"
 * keeps counting down without a refresh. Dismissal is a per-browser
 * `localStorage` flag rather than an account setting, since it has to work
 * for guests too (no account to store a preference against); a small
 * always-present button brings it back.
 */
export function EksamiLoendurClient({ sihtpaev }: { sihtpaev: string }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [peidetud, setPeidetud] = useState(false);
  const [nyyd, setNyyd] = useState(() => new Date());

  useEffect(() => {
    setMounted(true);
    try {
      setPeidetud(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // localStorage can throw in a locked-down browser context — staying
      // visible is the safer default.
    }
    const id = setInterval(() => setNyyd(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (peidetudSelRajal(pathname)) return null;
  if (!mounted) return null;

  function peida() {
    setPeidetud(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore — the in-memory state still hides it for this page view.
    }
  }

  function naita() {
    setPeidetud(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore — the in-memory state still shows it for this page view.
    }
  }

  if (peidetud) {
    return (
      <div className="flex justify-end border-b border-border px-4 py-2">
        <button
          type="button"
          onClick={naita}
          aria-label={t("kodu.loendurNaita")}
          className="rounded px-1.5 py-1 text-xs text-foreground/40 hover:text-foreground"
        >
          ⏱
        </button>
      </div>
    );
  }

  const { paevad, tunnid, minutid, sekundid } = jaanudAeg(sihtpaev, nyyd);

  return (
    <div className="flex justify-end border-b border-border px-4 py-2">
      <div className="flex items-center gap-2">
        <span
          className="font-display text-sm font-semibold tabular-nums text-danger"
          title={t("kalender.eksaminiSilt")}
        >
          {paevad} {t("kalender.paeva")} {kahekohaline(tunnid)}:
          {kahekohaline(minutid)}:{kahekohaline(sekundid)}
        </span>
        <button
          type="button"
          onClick={peida}
          aria-label={t("kodu.loendurPeida")}
          className="text-foreground/40 hover:text-foreground"
        >
          {t("kodu.loendurSulge")}
        </button>
      </div>
    </div>
  );
}
