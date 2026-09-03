"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useTransition } from "react";
import { MathBlock } from "@/components/math/MathBlock";
import { VastuseSisend } from "@/components/practice/VastuseSisend";
import {
  formatExact,
  formatFraction,
  formatNumber,
} from "@/lib/format/number";
import { t } from "@/lib/i18n";
import { alustaEksamAction } from "@/lib/eksam/actions";
import {
  OSA_I_MINUTID,
  OSA_II_MINUTID,
  VAHEAEG_MINUTID,
  EKSAMI_MAKSIMUMPUNKTID,
  type EksamiKusimus,
  type EksamiSeeria,
} from "@/lib/eksam/session";
import { kontrolliVastust } from "@/lib/practice/actions";
import type { KontrolliTulemus } from "@/lib/practice/session";
import type { ArvVaartus, Vastus } from "@/generators/types";

type Faas = "sissejuhatus" | "osaI" | "vaheaeg" | "osaII" | "labivaatus";

function arvVaartusTekst(v: ArvVaartus): string {
  return v.kuju === "taisarv"
    ? formatNumber(v.vaartus)
    : formatFraction(v.lugeja, v.nimetaja);
}

function vastuseTekst(vastus: Vastus): string {
  switch (vastus.tuup) {
    case "arv":
      return arvVaartusTekst(vastus);
    case "tapne":
      return formatExact(vastus.vorm);
    case "valik":
      return vastus.oige;
    case "hulk":
      return vastus.vaartused.map(arvVaartusTekst).join(", ");
  }
}

function formatAeg(sekundid: number): string {
  const min = Math.floor(sekundid / 60);
  const sek = sekundid % 60;
  return `${min}:${sek.toString().padStart(2, "0")}`;
}

export function EksamSessioon() {
  const [faas, setFaas] = useState<Faas>("sissejuhatus");
  const [eksam, setEksam] = useState<EksamiSeeria | null>(null);
  const [vastused, setVastused] = useState<Record<string, string>>({});
  const [indeksI, setIndeksI] = useState(0);
  const [indeksII, setIndeksII] = useState(0);
  const [aegSek, setAegSek] = useState(0);
  const [tulemused, setTulemused] = useState<
    Record<string, KontrolliTulemus>
  >({});
  const [alustamisel, alustaTransition] = useTransition();
  const [esitamisel, esitaTransition] = useTransition();

  useEffect(() => {
    if (faas !== "osaI" && faas !== "vaheaeg" && faas !== "osaII") return;
    if (aegSek <= 0) return;
    const id = window.setInterval(() => {
      setAegSek((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [faas, aegSek]);

  const esitaOsaII = useCallback(() => {
    if (!eksam) return;
    esitaTransition(async () => {
      const koik = [...eksam.osaI, ...eksam.osaII];
      const paarid = await Promise.all(
        koik.map(async (k) => {
          const tulemus = await kontrolliVastust(
            k.token,
            0,
            vastused[k.token] ?? "",
          );
          return [k.token, tulemus] as const;
        }),
      );
      setTulemused(Object.fromEntries(paarid));
      setFaas("labivaatus");
    });
  }, [eksam, vastused]);

  useEffect(() => {
    if (aegSek > 0) return;
    if (faas === "osaI") {
      setFaas("vaheaeg");
      setAegSek(VAHEAEG_MINUTID * 60);
    } else if (faas === "vaheaeg") {
      setFaas("osaII");
      setAegSek(OSA_II_MINUTID * 60);
    } else if (faas === "osaII" && !esitamisel) {
      esitaOsaII();
    }
  }, [aegSek, faas, esitamisel, esitaOsaII]);

  function alusta() {
    alustaTransition(async () => {
      const uusEksam = await alustaEksamAction();
      setEksam(uusEksam);
      setFaas("osaI");
      setAegSek(OSA_I_MINUTID * 60);
    });
  }

  if (faas === "sissejuhatus") {
    return (
      <div>
        <ul className="mt-4 flex list-disc flex-col gap-1 pl-5 text-sm text-foreground/80">
          <li>{t("eksam.struktuur1")}</li>
          <li>{t("eksam.struktuur2")}</li>
          <li>{t("eksam.struktuur3")}</li>
        </ul>
        <p className="mt-4 text-sm text-foreground/70">
          {t("eksam.abivahendid")}
        </p>
        <Link
          href="/valemileht"
          target="_blank"
          className="mt-2 inline-block text-sm text-accent hover:underline"
        >
          {t("eksam.valemilehtLink")}
        </Link>
        <div>
          <button
            type="button"
            onClick={alusta}
            disabled={alustamisel}
            className="mt-6 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-50"
          >
            {t("eksam.alusta")}
          </button>
        </div>
      </div>
    );
  }

  if (faas === "vaheaeg") {
    return (
      <div className="mt-6">
        <p className="font-display text-lg font-semibold">
          {t("eksam.vaheaegPealkiri")}
        </p>
        <p className="mt-2 text-sm text-foreground/70">
          {t("eksam.vaheaegSelgitus")}
        </p>
        <p className="mt-4 font-display text-3xl tabular-nums">
          {formatAeg(aegSek)}
        </p>
        <button
          type="button"
          onClick={() => {
            setFaas("osaII");
            setAegSek(OSA_II_MINUTID * 60);
          }}
          className="mt-6 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-border/50"
        >
          {t("eksam.jatkaKohe")}
        </button>
      </div>
    );
  }

  if (faas === "labivaatus" && eksam) {
    const koik = [...eksam.osaI, ...eksam.osaII];
    const punktidKokku = koik.reduce(
      (summa, k) => summa + (tulemused[k.token]?.oige ? k.punktid : 0),
      0,
    );

    return (
      <div className="mt-6">
        <p className="font-display text-lg font-semibold">
          {t("eksam.labivaatusPealkiri")}
        </p>
        <p className="mt-2 text-2xl font-semibold">
          {punktidKokku} / {EKSAMI_MAKSIMUMPUNKTID}
        </p>
        <Link
          href="/lai-matemaatika/harjuta"
          className="mt-3 inline-block text-sm text-accent hover:underline"
        >
          {t("eksam.harjutaNorku")}
        </Link>

        <div className="mt-8 flex flex-col gap-6">
          {koik.map((k, i) => {
            const tulemus = tulemused[k.token];
            return (
              <div
                key={k.token}
                className="rounded-md border border-border bg-surface p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-foreground/60">
                    {(k.osa === 1 ? t("eksam.osaI") : t("eksam.osaII")) +
                      ` — ${i + 1}. ${t("eksam.kusimusSilt")} (${k.punktid} ${t(
                        "eksam.punktiSilt",
                      )})`}
                  </p>
                  <span
                    className={`text-xs font-medium ${
                      tulemus?.oige ? "text-accent" : "text-red-600"
                    }`}
                  >
                    {tulemus?.oige ? t("harjuta.oige") : t("harjuta.vale")}
                  </span>
                </div>
                <div className="prose-math mt-3">
                  <MathBlock>{k.ulesanne.kysimus}</MathBlock>
                </div>
                <p className="mt-2 text-sm text-foreground/70">
                  {t("eksam.sinuVastus")}:{" "}
                  {vastused[k.token]?.trim() ? vastused[k.token] : "—"}
                </p>
                {tulemus && !tulemus.oige && (
                  <p className="text-sm text-foreground/70">
                    {t("eksam.oigeVastus")}: {vastuseTekst(tulemus.vastus)}
                  </p>
                )}
                {tulemus && (
                  <div className="prose-math mt-3">
                    <h3 className="text-xs font-semibold">
                      {t("harjuta.lahenduskaik")}
                    </h3>
                    {tulemus.lahendus.map((samm, j) => (
                      <MathBlock key={j}>{samm}</MathBlock>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if ((faas === "osaI" || faas === "osaII") && eksam) {
    const nimekiri = faas === "osaI" ? eksam.osaI : eksam.osaII;
    const indeks = faas === "osaI" ? indeksI : indeksII;
    const seaIndeks = faas === "osaI" ? setIndeksI : setIndeksII;
    const kusimus: EksamiKusimus = nimekiri[indeks];
    const viimane = indeks === nimekiri.length - 1;

    return (
      <div className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-display text-lg font-semibold">
            {faas === "osaI" ? t("eksam.osaI") : t("eksam.osaII")}
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/valemileht"
              target="_blank"
              className="text-xs text-accent hover:underline"
            >
              {t("eksam.valemilehtLink")}
            </Link>
            <p className="font-display text-lg tabular-nums">
              {formatAeg(aegSek)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {nimekiri.map((k, i) => (
            <button
              key={k.token}
              type="button"
              onClick={() => seaIndeks(i)}
              className={`size-8 rounded-full border text-xs font-medium ${
                i === indeks
                  ? "border-accent bg-accent/10 text-accent"
                  : vastused[k.token]?.trim()
                    ? "border-foreground/40 bg-surface"
                    : "border-border bg-surface"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-foreground/60">
          {kusimus.punktid} {t("eksam.punktiSilt")}
        </p>
        <div className="prose-math mt-2">
          <MathBlock>{kusimus.ulesanne.kysimus}</MathBlock>
        </div>

        <div className="mt-6">
          <VastuseSisend
            key={kusimus.token}
            vastuseTuup={kusimus.ulesanne.vastuseTuup}
            value={vastused[kusimus.token] ?? ""}
            onChange={(value) =>
              setVastused((v) => ({ ...v, [kusimus.token]: value }))
            }
          />
        </div>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => seaIndeks((i) => Math.max(0, i - 1))}
            disabled={indeks === 0}
            className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            {t("eksam.eelmine")}
          </button>
          {!viimane ? (
            <button
              type="button"
              onClick={() => seaIndeks((i) => i + 1)}
              className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-border/50"
            >
              {t("eksam.jargmine")}
            </button>
          ) : faas === "osaI" ? (
            <button
              type="button"
              onClick={() => {
                setFaas("vaheaeg");
                setAegSek(VAHEAEG_MINUTID * 60);
              }}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
            >
              {t("eksam.esitaOsaI")}
            </button>
          ) : (
            <button
              type="button"
              onClick={esitaOsaII}
              disabled={esitamisel}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-50"
            >
              {esitamisel ? t("eksam.esitamisel") : t("eksam.esitaEksam")}
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
