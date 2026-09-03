"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { t } from "@/lib/i18n";
import { getPaevaTeemad, salvestaPeegeldus } from "./actions";
import type { PaevaTeema } from "@/lib/analytics/calendar";

export type PaevaAndmed = {
  date: string;
  paev: number;
  onPraeguneKuu: boolean;
  kysimusi: number;
  oigeid: number;
  peegeldus: string | null;
};

/** Bucketed activity intensity — empty days are always neutral grey, never
 * red (todo.md is explicit about this: a quiet day isn't a failure). */
function intensiivsusKlass(kysimusi: number): string {
  if (kysimusi === 0) return "bg-border/40";
  if (kysimusi < 5) return "bg-accent/25";
  if (kysimusi < 15) return "bg-accent/55";
  return "bg-accent";
}

const NADALAPAEVAD = ["E", "T", "K", "N", "R", "L", "P"];

export function KalendriRuudustik({ nadalad }: { nadalad: PaevaAndmed[][] }) {
  const [valitud, setValitud] = useState<PaevaAndmed | null>(null);
  const [teemad, setTeemad] = useState<PaevaTeema[] | null>(null);
  const [peegeldus, setPeegeldus] = useState("");
  const [salvestatud, setSalvestatud] = useState(true);
  const [, alustaSiiret] = useTransition();

  useEffect(() => {
    if (!valitud) return;
    setPeegeldus(valitud.peegeldus ?? "");
    setSalvestatud(true);
    setTeemad(null);
    getPaevaTeemad(valitud.date).then(setTeemad);
  }, [valitud]);

  const salvesta = useCallback(
    (tekst: string) => {
      if (!valitud) return;
      setSalvestatud(false);
      alustaSiiret(async () => {
        await salvestaPeegeldus(valitud.date, tekst);
        setSalvestatud(true);
      });
    },
    [valitud],
  );

  return (
    <div className="mt-6">
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-foreground/60">
        {NADALAPAEVAD.map((p) => (
          <div key={p}>{p}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {nadalad.flat().map((paev) => (
          <button
            key={paev.date}
            type="button"
            onClick={() => setValitud(paev)}
            disabled={!paev.onPraeguneKuu}
            className={`aspect-square rounded-md text-xs transition-colors ${
              paev.onPraeguneKuu
                ? `${intensiivsusKlass(paev.kysimusi)} hover:opacity-80`
                : "opacity-0"
            } ${valitud?.date === paev.date ? "ring-2 ring-accent" : ""}`}
          >
            {paev.onPraeguneKuu ? paev.paev : ""}
          </button>
        ))}
      </div>

      {valitud && (
        <div className="mt-6 rounded-md border border-border bg-surface p-4">
          <h2 className="font-display text-sm font-semibold">{valitud.date}</h2>
          <p className="mt-1 text-sm text-foreground/70">
            {t("kalender.kysimusiSilt")}: {valitud.kysimusi} ·{" "}
            {t("kalender.oigeidSilt")}: {valitud.oigeid}
          </p>

          {teemad === null ? null : teemad.length === 0 ? (
            <p className="mt-2 text-sm text-foreground/60">
              {t("kalender.teemasidPole")}
            </p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm">
              {teemad.map((teema) => (
                <li key={teema.teemaId}>
                  <Link
                    href={`/lai-matemaatika/teemad/${teema.teemaId}`}
                    className="text-accent hover:underline"
                  >
                    {teema.teemaId}
                  </Link>{" "}
                  — {teema.oigeid}/{teema.kokku}
                </li>
              ))}
            </ul>
          )}

          <label className="mt-4 block text-xs font-medium text-foreground/70">
            {t("kalender.peegeldusSilt")}
          </label>
          <textarea
            value={peegeldus}
            onChange={(event) => setPeegeldus(event.target.value)}
            onBlur={() => salvesta(peegeldus)}
            placeholder={t("kalender.peegeldusKoht")}
            rows={2}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-foreground/50">
            {salvestatud ? t("kalender.salvestatud") : t("kalender.salvestamine")}
          </p>
        </div>
      )}
    </div>
  );
}
