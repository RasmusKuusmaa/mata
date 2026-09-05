"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Kursus, Teema } from "@/content/types";
import { t } from "@/lib/i18n";
import { groupTeemad } from "./group";

type Props = {
  kursused: Kursus[];
  teemad: Teema[];
};

export function TeemadBrowser({ kursused, teemad }: Props) {
  const [query, setQuery] = useState("");
  const isSearching = query.trim().length > 0;

  const ryhmad = useMemo(
    () => groupTeemad(kursused, teemad, query),
    [kursused, teemad, query],
  );

  return (
    <div className="mt-6">
      <label className="block">
        <span className="sr-only">{t("teemad.otsiSilt")}</span>
        {/* `text-base` on mobile, not `text-sm`: iOS Safari zooms the page
            in on focus for any input under 16px. */}
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("teemad.otsiKoht")}
          className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-base sm:text-sm"
        />
      </label>

      {ryhmad.length === 0 ? (
        <p className="mt-6 text-sm text-foreground/70">
          {t("teemad.tulemusiEi")}
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          {ryhmad.map(({ kursus, teemad: kursuseTeemad }) => (
            <details
              key={kursus.id}
              open={isSearching}
              className="rounded-md border border-border bg-surface"
            >
              <summary className="flex min-h-12 cursor-pointer items-center px-4 py-3 text-sm font-medium">
                {kursus.nimi}
              </summary>
              <ul className="border-t border-border">
                {kursuseTeemad.map((teema) => (
                  <li
                    key={teema.id}
                    className="border-b border-border last:border-b-0"
                  >
                    {/* The link fills the whole row so the tap target is the
                        row, not just the width of the title text. */}
                    <Link
                      href={`/${teema.aine}/teemad/${teema.id}`}
                      className="flex min-h-12 items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-border/30"
                    >
                      <span className="flex-1">{teema.nimi}</span>
                      {!teema.eksamiKate[2027] && (
                        <span className="shrink-0 rounded bg-border px-1.5 py-0.5 text-xs text-foreground/70">
                          {t("teemad.mitteKaetud")}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
