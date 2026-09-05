import Link from "next/link";
import { notFound } from "next/navigation";
import { kursused } from "@/content/lai-matemaatika/kursused";
import { teemad } from "@/content/lai-matemaatika/teemad";
import { getAllTopicStates } from "@/lib/db/topic-state";
import { getFlag } from "@/lib/flags";
import { t } from "@/lib/i18n";
import type { MasteriaTase } from "@/lib/mastery/types";
import { getCurrentUserId } from "@/lib/session/user";
import { groupTeemad } from "../teemad/group";

const MASTERY_SILT: Record<MasteriaTase, string> = {
  alustamata: "Alustamata",
  algaja: "Algaja",
  edeneb: "Edeneb",
  hea: "Hea",
  kindel: "Kindel",
};

export function generateStaticParams() {
  const aines = [...new Set(kursused.map((kursus) => kursus.aine))];
  return aines.map((aine) => ({ aine }));
}

/**
 * The full course sequence, flowing straight down the page in the order
 * students go through it (course `jrk`, then each course's own topic
 * order — see `groupTeemad`) rather than `/teemad`'s collapsible,
 * searchable browser. Signed-in users see their mastery level per topic.
 */
export default async function TeekaartPage({
  params,
}: {
  params: Promise<{ aine: string }>;
}) {
  if (!getFlag("kontosusteem")) notFound();

  const { aine } = await params;
  const aineKursused = kursused.filter((kursus) => kursus.aine === aine);
  if (aineKursused.length === 0) notFound();

  const aineTeemad = teemad.filter((teema) => teema.aine === aine);
  const ryhmad = groupTeemad(aineKursused, aineTeemad, "");

  const userId = await getCurrentUserId();
  const seisud = userId ? await getAllTopicStates(userId) : [];
  const masteryByTeemaId = new Map(
    seisud.map((seis) => [seis.teemaId, seis.masteryTase as MasteriaTase]),
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("teekaart.pealkiri")}
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        {t("teekaart.selgitus")}
      </p>

      <ol className="mt-8 flex flex-col gap-8">
        {ryhmad.map(({ kursus, teemad: kursuseTeemad }) => (
          <li key={kursus.id}>
            <h2 className="font-display text-base font-semibold">
              {kursus.jrk}. {kursus.nimi}
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {kursuseTeemad.map((teema) => {
                const tase = masteryByTeemaId.get(teema.id);
                return (
                  <li key={teema.id}>
                    <Link
                      href={`/${teema.aine}/teemad/${teema.id}`}
                      className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-sm hover:bg-border/30"
                    >
                      <span>{teema.nimi}</span>
                      <span className="flex items-center gap-2 text-xs text-foreground/60">
                        {!teema.eksamiKate[2027] && (
                          <span className="rounded bg-border px-1.5 py-0.5">
                            {t("teemad.mitteKaetud")}
                          </span>
                        )}
                        {tase && <span>{MASTERY_SILT[tase]}</span>}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
