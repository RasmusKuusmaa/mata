import { notFound } from "next/navigation";
import Link from "next/link";
import { alustaSeeria } from "@/lib/practice/session";
import { t } from "@/lib/i18n";
import { findTeema } from "../../teemad/[teemaId]/lookup";
import { HarjutusSessioon } from "./HarjutusSessioon";

/** Each visit generates a fresh random series (Ship 1.6) — this route must
 * never be statically cached, unlike the topic pages. */
export const dynamic = "force-dynamic";

const VAIKIMISI_RASKUS = "keskmine" as const;
const KUSIMUSTE_ARV = 10;

export default async function HarjutaPage({
  params,
}: {
  params: Promise<{ aine: string; teemaId: string }>;
}) {
  const { aine, teemaId } = await params;
  const teema = findTeema(aine, teemaId);
  if (!teema) notFound();

  let seeria;
  try {
    seeria = await alustaSeeria(teema.id, VAIKIMISI_RASKUS, KUSIMUSTE_ARV);
  } catch {
    seeria = null;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">{teema.nimi}</h1>

      {seeria === null ? (
        <>
          <p className="mt-4 text-sm text-foreground/70">
            {t("harjuta.puudub")}
          </p>
          <Link
            href={`/${teema.aine}/teemad/${teema.id}`}
            className="mt-6 inline-block text-sm text-accent hover:underline"
          >
            {t("harjuta.tagasiTeemaJuurde")}
          </Link>
        </>
      ) : (
        <HarjutusSessioon
          tagasiHref={`/${teema.aine}/teemad/${teema.id}`}
          token={seeria.token}
          ulesanded={seeria.ulesanded}
        />
      )}
    </div>
  );
}
