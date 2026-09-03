import type { Metadata } from "next";
import {
  getKokkuvote,
  getKursusteStatistika,
  getTeemadeStatistika,
  getViimasedPaevad,
  jaotaMasteryTasemeteJargi,
} from "@/lib/analytics/statistics";
import type { TeemaSeis } from "@/lib/analytics/weakest";
import { getAllTopicStates } from "@/lib/db/topic-state";
import { t } from "@/lib/i18n";
import { getCurrentUserId } from "@/lib/session/user";
import { Statistika } from "./Statistika";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: t("statistika.pealkiri") };

export default async function StatistikaPage() {
  const userId = await getCurrentUserId();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("statistika.pealkiri")}
      </h1>

      {!userId ? (
        <p className="mt-6 text-sm text-foreground/70">
          {t("statistika.logiSisseKoht")}
        </p>
      ) : (
        <StatistikaAndmed userId={userId} />
      )}
    </div>
  );
}

async function StatistikaAndmed({ userId }: { userId: string }) {
  const seisud = await getAllTopicStates(userId);
  const teemaSeisud: TeemaSeis[] = seisud.map((seis) => ({
    teemaId: seis.teemaId,
    masteryScore: seis.masteryScore,
    masteryTase: seis.masteryTase as TeemaSeis["masteryTase"],
    manualReview: seis.manualReview,
    lastSeenAt: seis.lastSeenAt,
  }));

  const [kokkuvote, kursused, teemad, viimasedPaevad] = await Promise.all([
    getKokkuvote(userId),
    getKursusteStatistika(userId),
    getTeemadeStatistika(userId, teemaSeisud),
    getViimasedPaevad(userId, 7),
  ]);
  const masteryJaotus = jaotaMasteryTasemeteJargi(teemaSeisud);

  return (
    <Statistika
      andmed={{ ...kokkuvote, kursused, teemad, masteryJaotus, viimasedPaevad }}
    />
  );
}
