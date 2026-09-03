import Link from "next/link";
import { teemad as kursuseTeemad } from "@/content/lai-matemaatika/teemad";
import { teemad as eeldusteemad } from "@/content/lai-matemaatika/teemad/eeldused";
import { selgitused } from "@/content/lai-matemaatika/selgitused";
import { t } from "@/lib/i18n";

/**
 * Deliberately avoids `@/content/coverage` here: that module's generator
 * count walks the real filesystem (Ship 1.8's registry), which has no
 * business running inside a live app route. `selgitused`'s key count is a
 * safe, honest-enough proxy — Ship 1.8+ always authors a topic's
 * explanation and its generators together.
 */
function valminudTeemasid(): { valminud: number; kokku: number } {
  const kokku = kursuseTeemad.length + eeldusteemad.length;
  const valminud = Object.keys(selgitused).length;
  return { valminud, kokku };
}

export default function Home() {
  const { valminud, kokku } = valminudTeemasid();
  const protsent = Math.round((valminud / kokku) * 100);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-medium text-accent">{t("kodu.silt")}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
        {t("kodu.pealkiri")}
      </h1>
      <p className="mt-4 max-w-2xl text-foreground/80">{t("kodu.selgitus")}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/lai-matemaatika/teemad"
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90"
        >
          {t("kodu.prooviIlmaKontota")}
        </Link>
        <Link
          href="/lai-matemaatika/harjuta"
          className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
        >
          {t("kodu.koostaTest")}
        </Link>
        <Link
          href="/lai-matemaatika/teemad"
          className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
        >
          {t("kodu.vaataTeemasid")}
        </Link>
      </div>

      <section className="mt-16 grid gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-border bg-surface p-5">
          <h2 className="font-display text-base font-semibold">
            {t("kodu.tunnusLahendusSilt")}
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            {t("kodu.tunnusLahendusSelgitus")}
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface p-5">
          <h2 className="font-display text-base font-semibold">
            {t("kodu.tunnusTestSilt")}
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            {t("kodu.tunnusTestSelgitus")}
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface p-5">
          <h2 className="font-display text-base font-semibold">
            {t("kodu.tunnusValemilehtSilt")}
          </h2>
          <p className="mt-2 text-sm text-foreground/70">
            {t("kodu.tunnusValemilehtSelgitus")}
          </p>
          <Link
            href="/valemileht"
            className="mt-3 inline-block text-sm text-accent hover:underline"
          >
            {t("nav.valemileht")}
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-xl font-semibold">{t("kodu.miksSilt")}</h2>
        <p className="mt-3 text-foreground/80">{t("kodu.miksSelgitus")}</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/80">
          <li>{t("kodu.miksKoik")}</li>
          <li>{t("kodu.miksIlmaKontota")}</li>
        </ul>
      </section>

      <section className="mt-16 rounded-md border border-border bg-surface p-6">
        <h2 className="font-display text-lg font-semibold">
          {t("kodu.edenemineSilt")}
        </h2>
        <p className="mt-2 text-sm text-foreground/70">{t("kodu.edenemineAus")}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-accent"
              style={{ width: `${protsent}%` }}
            />
          </div>
          <span className="whitespace-nowrap text-sm font-medium">
            {valminud} / {kokku} ({protsent}%)
          </span>
        </div>
      </section>
    </div>
  );
}
