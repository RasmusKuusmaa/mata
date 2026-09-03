import Link from "next/link";
import { notFound } from "next/navigation";
import { koostaTanaseKordamise } from "@/lib/practice/daily-review";
import { getCurrentUserId } from "@/lib/session/user";
import { t } from "@/lib/i18n";
import { HarjutusSessioon } from "../[teemaId]/HarjutusSessioon";

export const dynamic = "force-dynamic";

/** "Tänane kordamine" (todo.md Ship 4.2) — one tap, no configuration, a
 * mixed set of the signed-in user's weakest touched topics. Signed-out
 * visitors have no history to draw from, so this route doesn't exist for
 * them. */
export default async function TananeKordaminePage({
  params,
}: {
  params: Promise<{ aine: string }>;
}) {
  const { aine } = await params;
  const userId = await getCurrentUserId();
  if (!userId) notFound();

  const seeria = await koostaTanaseKordamise(userId);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("kordamine.pealkiri")}
      </h1>

      {seeria === null ? (
        <>
          <p className="mt-4 text-sm text-foreground/70">
            {t("kordamine.tyhi")}
          </p>
          <Link
            href={`/${aine}/teemad`}
            className="mt-6 inline-block text-sm text-accent hover:underline"
          >
            {t("kordamine.vaataTeemasid")}
          </Link>
        </>
      ) : (
        <HarjutusSessioon
          tagasiHref="/"
          token={seeria.token}
          ulesanded={seeria.ulesanded}
        />
      )}
    </div>
  );
}
