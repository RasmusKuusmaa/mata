"use client";

import { useState } from "react";
import Link from "next/link";
import { t } from "@/lib/i18n";

export type MarkmeKirje = {
  teemaId: string;
  aine: string;
  teemaNimi: string;
  kursusNimi: string;
  katke: string;
};

export function MarkmedList({ kirjed }: { kirjed: MarkmeKirje[] }) {
  const [otsing, setOtsing] = useState("");

  const filtreeritud = kirjed.filter((kirje) => {
    const q = otsing.trim().toLowerCase();
    if (q === "") return true;
    return (
      kirje.teemaNimi.toLowerCase().includes(q) ||
      kirje.katke.toLowerCase().includes(q)
    );
  });

  const ryhmad = new Map<string, MarkmeKirje[]>();
  for (const kirje of filtreeritud) {
    const grupp = ryhmad.get(kirje.kursusNimi) ?? [];
    grupp.push(kirje);
    ryhmad.set(kirje.kursusNimi, grupp);
  }

  return (
    <div>
      <input
        type="search"
        value={otsing}
        onChange={(event) => setOtsing(event.target.value)}
        placeholder={t("markmed.otsiKoht")}
        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
      />

      {filtreeritud.length === 0 && (
        <p className="mt-6 text-sm text-foreground/70">{t("markmed.tyhi")}</p>
      )}

      {[...ryhmad.entries()].map(([kursusNimi, kirjed]) => (
        <section key={kursusNimi} className="mt-6">
          <h2 className="font-display text-sm font-semibold text-foreground/70">
            {kursusNimi}
          </h2>
          <ul className="mt-2 space-y-2">
            {kirjed.map((kirje) => (
              <li key={kirje.teemaId}>
                <Link
                  href={`/${kirje.aine}/teemad/${kirje.teemaId}`}
                  className="block rounded-md border border-border bg-surface p-3 hover:bg-border/50"
                >
                  <p className="text-sm font-medium">{kirje.teemaNimi}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-foreground/60">
                    {kirje.katke}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
