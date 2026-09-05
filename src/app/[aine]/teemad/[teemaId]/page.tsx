import { notFound } from "next/navigation";
import Link from "next/link";
import { selgitused } from "@/content/lai-matemaatika/selgitused";
import { Selgitus } from "@/components/explanation/Selgitus";
import { getFlag } from "@/lib/flags";
import { t } from "@/lib/i18n";
import { findEeldused, findTeema, kokkuTeemad } from "./lookup";
import { TeemaKontoPaneel } from "./TeemaKontoPaneel";

export function generateStaticParams() {
  return kokkuTeemad.map((teema) => ({ aine: teema.aine, teemaId: teema.id }));
}

export default async function TeemaDetailPage({
  params,
}: {
  params: Promise<{ aine: string; teemaId: string }>;
}) {
  const { aine, teemaId } = await params;
  const teema = findTeema(aine, teemaId);
  if (!teema) notFound();

  const selgitus = selgitused[teema.id];
  const eeldused = findEeldused(teema);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">{teema.nimi}</h1>

      {selgitus ? (
        <Selgitus {...selgitus} />
      ) : (
        <p className="mt-4 text-sm text-foreground/70">
          {t("teema.selgitusPuudub")}
        </p>
      )}

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">
          {t("teema.opitulemused")}
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {teema.opitulemused.map((opitulemus) => (
            <li key={opitulemus}>{opitulemus}</li>
          ))}
        </ul>
      </section>

      {eeldused.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold">
            {t("teema.eeldused")}
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {eeldused.map((eeldus) => (
              <Link
                key={eeldus.id}
                href={`/${eeldus.aine}/teemad/${eeldus.id}`}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs hover:bg-border/50"
              >
                {eeldus.nimi}
              </Link>
            ))}
          </div>
        </section>
      )}

      {getFlag("kontosusteem") && (
        <>
          <Link
            href={`/${teema.aine}/harjuta/${teema.id}`}
            className="mt-8 inline-block rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            {t("teema.harjuta")}
          </Link>

          <TeemaKontoPaneel teemaId={teema.id} />
        </>
      )}
    </div>
  );
}
