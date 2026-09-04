"use client";

import { useMemo, useState, useTransition } from "react";
import type { Kursus, Raskus, Teema } from "@/content/types";
import { t } from "@/lib/i18n";
import { koostaTest } from "@/lib/practice/actions";
import type { Seeria, TeemaRaskusValik } from "@/lib/practice/session";
import { HarjutusSessioon } from "./[teemaId]/HarjutusSessioon";

type Props = {
  aine: string;
  kursused: Kursus[];
  teemad: Teema[];
};

type RaskusValik = Raskus | "segatud";

const KOGUSED = [5, 10, 15, 20, 30];

function raskusValikud(teemaId: string, raskus: RaskusValik): TeemaRaskusValik[] {
  if (raskus !== "segatud") return [{ teemaId, raskus }];
  return (["kerge", "keskmine", "raske"] as Raskus[]).map((r) => ({
    teemaId,
    raskus: r,
  }));
}

export function TestiKoostaja({ aine, kursused, teemad }: Props) {
  const [valitud, setValitud] = useState<Set<string>>(new Set());
  const [raskus, setRaskus] = useState<RaskusValik>("segatud");
  const [kogus, setKogus] = useState(10);
  const [seeria, setSeeria] = useState<Seeria | null>(null);
  const [viga, setViga] = useState<string | null>(null);
  const [koostamisel, alustaKoostamist] = useTransition();

  const teemadKursuseJargi = useMemo(() => {
    return kursused.map((kursus) => ({
      kursus,
      teemad: teemad.filter((teema) => teema.kursusId === kursus.id),
    }));
  }, [kursused, teemad]);

  function lulita(teemaId: string) {
    setValitud((praegune) => {
      const uus = new Set(praegune);
      if (uus.has(teemaId)) uus.delete(teemaId);
      else uus.add(teemaId);
      return uus;
    });
  }

  function lulitaKursus(kursuseTeemad: Teema[]) {
    const koikValitud = kursuseTeemad.every((teema) => valitud.has(teema.id));
    setValitud((praegune) => {
      const uus = new Set(praegune);
      for (const teema of kursuseTeemad) {
        if (koikValitud) uus.delete(teema.id);
        else uus.add(teema.id);
      }
      return uus;
    });
  }

  function valiKoikTeemad() {
    setValitud(new Set(teemad.map((teema) => teema.id)));
  }

  function alusta() {
    if (valitud.size === 0) {
      setViga(t("koostaTest.valiVahemalt"));
      return;
    }
    setViga(null);
    const koik: TeemaRaskusValik[] = [...valitud].flatMap((teemaId) =>
      raskusValikud(teemaId, raskus),
    );
    alustaKoostamist(async () => {
      try {
        const uusSeeria = await koostaTest(koik, kogus);
        setSeeria(uusSeeria);
      } catch {
        setViga(t("koostaTest.viga"));
      }
    });
  }

  if (seeria !== null) {
    return (
      <HarjutusSessioon
        tagasiHref={`/${aine}/harjuta`}
        token={seeria.token}
        ulesanded={seeria.ulesanded}
      />
    );
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-medium text-foreground/60">
          {t("koostaTest.kiirvalikudSilt")}
        </span>
        <button
          type="button"
          onClick={valiKoikTeemad}
          className="rounded-full border border-border bg-surface px-3 py-1 text-xs hover:bg-border/50"
        >
          {t("koostaTest.kiirvalikKoik")}
        </button>
        <button
          type="button"
          onClick={() => setValitud(new Set())}
          className="rounded-full border border-border bg-surface px-3 py-1 text-xs hover:bg-border/50"
        >
          {t("koostaTest.tuhjenda")}
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {teemadKursuseJargi.map(({ kursus, teemad: kursuseTeemad }) => {
          const koikValitud =
            kursuseTeemad.length > 0 &&
            kursuseTeemad.every((teema) => valitud.has(teema.id));
          return (
            <details
              key={kursus.id}
              className="rounded-md border border-border bg-surface"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3 text-sm font-medium">
                <span>{kursus.nimi}</span>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    lulitaKursus(kursuseTeemad);
                  }}
                  className="shrink-0 text-xs font-normal text-accent hover:underline"
                >
                  {koikValitud
                    ? t("koostaTest.tyhistaKoikKursuses")
                    : t("koostaTest.valiKoikKursuses")}
                </button>
              </summary>
              <ul className="border-t border-border">
                {kursuseTeemad.map((teema) => (
                  <li
                    key={teema.id}
                    className="border-b border-border px-4 py-2 text-sm last:border-b-0"
                  >
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={valitud.has(teema.id)}
                        onChange={() => lulita(teema.id)}
                        className="size-4 rounded border-border accent-accent"
                      />
                      {teema.nimi}
                    </label>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        <fieldset>
          <legend className="text-xs font-medium text-foreground/60">
            {t("koostaTest.raskusSilt")}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {(
              [
                ["segatud", "koostaTest.raskusSegatud"],
                ["kerge", "koostaTest.raskusKerge"],
                ["keskmine", "koostaTest.raskusKeskmine"],
                ["raske", "koostaTest.raskusRaske"],
              ] as const
            ).map(([voimalus, voti]) => (
              <button
                key={voimalus}
                type="button"
                onClick={() => setRaskus(voimalus)}
                className={`rounded-full border px-3 py-1 text-xs ${
                  raskus === voimalus
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-surface"
                }`}
              >
                {t(voti)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-medium text-foreground/60">
            {t("koostaTest.kogusSilt")}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {KOGUSED.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setKogus(n)}
                className={`rounded-full border px-3 py-1 text-xs ${
                  kogus === n
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-surface"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="mt-4 text-xs text-foreground/60">
        {t("koostaTest.valitudSilt")}: {valitud.size}
      </p>

      {viga !== null && <p className="mt-2 text-sm text-danger">{viga}</p>}

      <button
        type="button"
        onClick={alusta}
        disabled={koostamisel}
        className="mt-4 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground disabled:opacity-50"
      >
        {koostamisel ? t("koostaTest.koostan") : t("koostaTest.alusta")}
      </button>
    </div>
  );
}
