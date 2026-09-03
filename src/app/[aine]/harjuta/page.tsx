import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { kursused } from "@/content/lai-matemaatika/kursused";
import { teemad } from "@/content/lai-matemaatika/teemad";
import { t } from "@/lib/i18n";
import { TestiKoostaja } from "./TestiKoostaja";

export const metadata: Metadata = { title: t("koostaTest.pealkiri") };

export function generateStaticParams() {
  const aines = [...new Set(kursused.map((kursus) => kursus.aine))];
  return aines.map((aine) => ({ aine }));
}

/** The custom test builder (Ship 5 / "koosta test"): pick any mix of
 * topics and a difficulty, then practise them as one session. */
export default async function HarjutaIndexPage({
  params,
}: {
  params: Promise<{ aine: string }>;
}) {
  const { aine } = await params;
  const aineKursused = kursused
    .filter((kursus) => kursus.aine === aine)
    .slice()
    .sort((a, b) => a.jrk - b.jrk);
  if (aineKursused.length === 0) notFound();

  const aineTeemad = teemad.filter((teema) => teema.aine === aine);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("koostaTest.pealkiri")}
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        {t("koostaTest.selgitus")}
      </p>
      <TestiKoostaja aine={aine} kursused={aineKursused} teemad={aineTeemad} />
    </div>
  );
}
