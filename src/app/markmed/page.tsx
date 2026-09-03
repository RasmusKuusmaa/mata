import { kursused } from "@/content/lai-matemaatika/kursused";
import { kokkuTeemad } from "@/app/[aine]/teemad/[teemaId]/lookup";
import { getAllNotes } from "@/lib/db/notes";
import { t } from "@/lib/i18n";
import { getCurrentUserId } from "@/lib/session/user";
import { MarkmedList, type MarkmeKirje } from "./MarkmedList";

export const dynamic = "force-dynamic";

const KURSUSE_NIMED = new Map<string, string>([
  ...kursused.map((k): [string, string] => [k.id, k.nimi]),
  ["E", "Eeldused"],
]);

export default async function MarkmedPage() {
  const userId = await getCurrentUserId();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("markmed.pealkiri")}
      </h1>
      <p className="mt-2 text-sm text-foreground/70">{t("markmed.selgitus")}</p>

      {!userId ? (
        <p className="mt-6 text-sm text-foreground/70">
          {t("markmed.logiSisseKoht")}
        </p>
      ) : (
        <div className="mt-6">
          <MarkmedList kirjed={await koostaKirjed(userId)} />
        </div>
      )}
    </div>
  );
}

async function koostaKirjed(userId: string): Promise<MarkmeKirje[]> {
  const notes = await getAllNotes(userId);
  return notes
    .filter((note) => note.sisu.trim() !== "")
    .map((note): MarkmeKirje | null => {
      const teema = kokkuTeemad.find((t) => t.id === note.teemaId);
      if (!teema) return null;
      return {
        teemaId: teema.id,
        aine: teema.aine,
        teemaNimi: teema.nimi,
        kursusNimi: KURSUSE_NIMED.get(teema.kursusId) ?? teema.kursusId,
        katke: note.sisu.slice(0, 160),
      };
    })
    .filter((kirje): kirje is MarkmeKirje => kirje !== null);
}
