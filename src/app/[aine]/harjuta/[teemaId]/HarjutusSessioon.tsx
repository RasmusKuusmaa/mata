"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { Math as Valem } from "@/components/math/Math";
import { MathBlock } from "@/components/math/MathBlock";
import { t } from "@/lib/i18n";
import { kontrolliVastust } from "@/lib/practice/actions";
import type { KlientUlesanne, KontrolliTulemus } from "@/lib/practice/session";

type Props = {
  aine: string;
  teemaId: string;
  token: string;
  ulesanded: KlientUlesanne[];
};

/**
 * One question at a time, server-graded, keyboard-first: Enter submits the
 * current answer, and — once graded — Enter again advances to the next
 * question (todo.md Ship 1.6).
 */
export function HarjutusSessioon({ aine, teemaId, token, ulesanded }: Props) {
  const [indeks, setIndeks] = useState(0);
  const [sisend, setSisend] = useState("");
  const [tulemus, setTulemus] = useState<KontrolliTulemus | null>(null);
  const [vihjeNahtav, setVihjeNahtav] = useState(false);
  const [oigeidKokku, setOigeidKokku] = useState(0);
  const [esitamisel, alustaEsitust] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const lopetatud = indeks >= ulesanded.length;
  const ulesanne = lopetatud ? undefined : ulesanded[indeks];

  useEffect(() => {
    inputRef.current?.focus();
  }, [indeks]);

  const esita = useCallback(() => {
    if (!ulesanne || tulemus !== null || sisend.trim().length === 0) return;
    alustaEsitust(async () => {
      const vastus = await kontrolliVastust(token, indeks, sisend);
      setTulemus(vastus);
      if (vastus.oige) setOigeidKokku((n) => n + 1);
    });
  }, [ulesanne, tulemus, sisend, token, indeks]);

  const jargmine = useCallback(() => {
    setIndeks((i) => i + 1);
    setSisend("");
    setTulemus(null);
    setVihjeNahtav(false);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Enter" || lopetatud || esitamisel) return;
      event.preventDefault();
      if (tulemus === null) {
        esita();
      } else {
        jargmine();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [tulemus, lopetatud, esitamisel, esita, jargmine]);

  if (lopetatud) {
    return (
      <div className="mt-8">
        <p className="font-display text-lg font-semibold">
          {t("harjuta.lopetatud")}
        </p>
        <p className="mt-2 text-sm text-foreground/70">
          {t("harjuta.tulemusSilt")}: {oigeidKokku} / {ulesanded.length}
        </p>
        <Link
          href={`/${aine}/teemad/${teemaId}`}
          className="mt-6 inline-block text-sm text-accent hover:underline"
        >
          {t("harjuta.tagasiTeemaJuurde")}
        </Link>
      </div>
    );
  }

  const vastuseTuup = ulesanne!.vastuseTuup;
  const progressPct = Math.round((indeks / ulesanded.length) * 100);

  return (
    <div className="mt-6">
      <div
        role="progressbar"
        aria-valuenow={indeks + 1}
        aria-valuemin={1}
        aria-valuemax={ulesanded.length}
        className="h-1.5 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full bg-accent transition-[width]"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-foreground/60">
        {indeks + 1} / {ulesanded.length}
      </p>

      <div className="prose-math mt-6">
        <MathBlock>{ulesanne!.kysimus}</MathBlock>
      </div>

      {ulesanne!.vihje !== undefined && (
        <div className="mt-2">
          {vihjeNahtav ? (
            <p className="text-sm text-foreground/70">
              {t("harjuta.vihjeSilt")}: <Valem>{ulesanne!.vihje}</Valem>
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setVihjeNahtav(true)}
              className="text-xs text-accent hover:underline"
            >
              {t("harjuta.naitaVihjet")}
            </button>
          )}
        </div>
      )}

      <div className="mt-6">
        {vastuseTuup.tuup === "valik" ? (
          <div className="flex flex-col gap-2">
            {vastuseTuup.valikud.map((valik) => {
              const onOigeVastus =
                tulemus !== null &&
                tulemus.vastus.tuup === "valik" &&
                tulemus.vastus.oige === valik;
              return (
                <button
                  key={valik}
                  type="button"
                  disabled={tulemus !== null}
                  onClick={() => setSisend(valik)}
                  className={`rounded-md border px-3 py-2 text-left text-sm ${
                    onOigeVastus
                      ? "border-accent bg-accent/10"
                      : sisend === valik
                        ? "border-foreground/40"
                        : "border-border bg-surface"
                  }`}
                >
                  {valik}
                </button>
              );
            })}
          </div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            inputMode={vastuseTuup.tuup === "hulk" ? "text" : "decimal"}
            value={sisend}
            disabled={tulemus !== null}
            onChange={(event) => setSisend(event.target.value)}
            placeholder={
              vastuseTuup.tuup === "hulk"
                ? t("harjuta.hulgiKoht")
                : t("harjuta.sisendKoht")
            }
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
          />
        )}
      </div>

      {tulemus === null ? (
        <button
          type="button"
          onClick={esita}
          disabled={esitamisel || sisend.trim().length === 0}
          className="mt-4 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-50"
        >
          {t("harjuta.kontrolli")}
        </button>
      ) : (
        <div className="mt-4">
          <p className="font-medium">
            {tulemus.oige ? t("harjuta.oige") : t("harjuta.vale")}
          </p>
          <div className="prose-math mt-3">
            <h2 className="text-sm font-semibold">
              {t("harjuta.lahenduskaik")}
            </h2>
            {tulemus.lahendus.map((samm, i) => (
              <MathBlock key={i}>{samm}</MathBlock>
            ))}
          </div>
          <button
            type="button"
            onClick={jargmine}
            className="mt-4 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            {t("harjuta.jargmine")}
          </button>
        </div>
      )}
    </div>
  );
}
