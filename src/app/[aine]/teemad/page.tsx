import { notFound } from "next/navigation";
import { kursused } from "@/content/lai-matemaatika/kursused";
import { teemad } from "@/content/lai-matemaatika/teemad";
import { t } from "@/lib/i18n";
import { TeemadBrowser } from "./TeemadBrowser";

export function generateStaticParams() {
  const aines = [...new Set(kursused.map((kursus) => kursus.aine))];
  return aines.map((aine) => ({ aine }));
}

export default async function TeemadPage({
  params,
}: {
  params: Promise<{ aine: string }>;
}) {
  const { aine } = await params;
  const aineKursused = kursused.filter((kursus) => kursus.aine === aine);
  if (aineKursused.length === 0) notFound();

  const aineTeemad = teemad.filter((teema) => teema.aine === aine);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("teemad.pealkiri")}
      </h1>
      <TeemadBrowser kursused={aineKursused} teemad={aineTeemad} />
    </div>
  );
}
