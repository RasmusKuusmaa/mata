"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber } from "@/lib/format/number";
import { t } from "@/lib/i18n";
import type {
  KursuseStatistika,
  MasteryJaotus,
} from "@/lib/analytics/statistics";
import type { NorkTeema } from "@/lib/analytics/weakest";

function useEelistabVahendatudLiikumist(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const listener = () => setReduced(query.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);
  return reduced;
}

function protsent(oigeid: number, kokku: number): number {
  return kokku === 0 ? 0 : Math.round((oigeid / kokku) * 100);
}

const MASTERY_SILT: Record<keyof MasteryJaotus, string> = {
  alustamata: "Alustamata",
  algaja: "Algaja",
  edeneb: "Edeneb",
  hea: "Hea",
  kindel: "Kindel",
};

export type StatistikaAndmed = {
  kokku: number;
  oigeidKokku: number;
  viimane7Paeva: number;
  eelmine7Paeva: number;
  kursused: KursuseStatistika[];
  teemad: (NorkTeema & { kokku: number; oigeid: number })[];
  masteryJaotus: MasteryJaotus;
  viimasedPaevad: { date: string; kysimusi: number }[];
};

export function Statistika({ andmed }: { andmed: StatistikaAndmed }) {
  const reducedMotion = useEelistabVahendatudLiikumist();

  if (andmed.kokku === 0) {
    return <p className="mt-6 text-sm text-foreground/70">{t("statistika.tyhi")}</p>;
  }

  const trend = andmed.viimane7Paeva - andmed.eelmine7Paeva;
  const paevaGraafik = andmed.viimasedPaevad.map((p) => ({
    paev: p.date.slice(5),
    Küsimusi: p.kysimusi,
  }));
  const masteryGraafik = (Object.keys(andmed.masteryJaotus) as (keyof MasteryJaotus)[]).map(
    (tase) => ({ tase: MASTERY_SILT[tase], Teemasid: andmed.masteryJaotus[tase] }),
  );

  return (
    <div className="mt-6 space-y-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-md border border-border bg-surface p-3">
          <p className="text-xs text-foreground/60">{t("statistika.kokkuKysimusi")}</p>
          <p className="mt-1 font-display text-xl font-semibold">
            {formatNumber(andmed.kokku)}
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface p-3">
          <p className="text-xs text-foreground/60">{t("statistika.viimased7")}</p>
          <p className="mt-1 font-display text-xl font-semibold">
            {formatNumber(andmed.viimane7Paeva)}
            {trend !== 0 && (
              <span
                className={`ml-1 text-xs font-normal ${trend > 0 ? "text-accent" : "text-foreground/50"}`}
              >
                {trend > 0 ? "+" : ""}
                {formatNumber(trend)}
              </span>
            )}
          </p>
          <p className="text-[11px] text-foreground/50">{t("statistika.trendSilt")}</p>
        </div>
        <div className="col-span-2 rounded-md border border-border bg-surface p-3 sm:col-span-2">
          <p className="text-xs text-foreground/60">{t("statistika.oigsusKokku")}</p>
          <p className="mt-1 font-display text-xl font-semibold">
            {protsent(andmed.oigeidKokku, andmed.kokku)}%
          </p>
        </div>
      </div>

      <section>
        <h2 className="font-display text-base font-semibold">
          {t("statistika.viimased7GraafikSilt")}
        </h2>
        <div className="mt-3 h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paevaGraafik}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="paev" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={28} />
              <Tooltip />
              <Bar
                dataKey="Küsimusi"
                fill="var(--accent)"
                radius={[3, 3, 0, 0]}
                isAnimationActive={!reducedMotion}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h2 className="font-display text-base font-semibold">
          {t("statistika.kursusedSilt")}
        </h2>
        <ul className="mt-3 divide-y divide-border rounded-md border border-border">
          {andmed.kursused.map((kursus) => (
            <li key={kursus.kursusId}>
              <Link
                href={`/lai-matemaatika/harjuta`}
                className="flex items-center justify-between px-3 py-2 text-sm hover:bg-surface"
              >
                <span>{kursus.nimi}</span>
                <span className="text-foreground/60">
                  {`${protsent(kursus.oigeid, kursus.kokku)}% · ${kursus.kokku}`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-base font-semibold">
          {t("statistika.teemadSilt")}
        </h2>
        <ul className="mt-3 divide-y divide-border rounded-md border border-border">
          {andmed.teemad.slice(0, 10).map((teema) => (
            <li key={teema.teemaId}>
              <Link
                href={`/lai-matemaatika/harjuta/${teema.teemaId}`}
                className="flex items-center justify-between px-3 py-2 text-sm hover:bg-surface"
              >
                <span>{teema.teemaId}</span>
                <span className="text-foreground/60">
                  {MASTERY_SILT[teema.masteryTase]} ·{" "}
                  {protsent(teema.oigeid, teema.kokku)}%
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-base font-semibold">
          {t("statistika.masteryJaotusSilt")}
        </h2>
        <div className="mt-3 h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={masteryGraafik} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
              <YAxis dataKey="tase" type="category" tick={{ fontSize: 11 }} width={70} />
              <Tooltip />
              <Bar
                dataKey="Teemasid"
                fill="var(--accent)"
                radius={[0, 3, 3, 0]}
                isAnimationActive={!reducedMotion}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
