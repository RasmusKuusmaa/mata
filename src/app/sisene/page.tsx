import Link from "next/link";
import { notFound } from "next/navigation";
import { konfigureeritudPakkujad } from "@/lib/auth/config";
import { getFlag } from "@/lib/flags";
import { t } from "@/lib/i18n";
import { logiSisseGoogleiga, logiSisseTestiga, saadaMagicLink } from "./actions";

export default function SisenePage() {
  if (!getFlag("kontosusteem")) notFound();

  const pakkujad = konfigureeritudPakkujad();

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="font-display text-2xl font-semibold">
        {t("sisene.pealkiri")}
      </h1>
      <p className="mt-2 text-sm text-foreground/70">{t("sisene.selgitus")}</p>

      {!pakkujad.google && !pakkujad.email && !pakkujad.test && (
        <p className="mt-6 rounded-md border border-border bg-surface p-3 text-sm text-foreground/70">
          {t("sisene.puudubPakkuja")}
        </p>
      )}

      {pakkujad.google && (
        <form action={logiSisseGoogleiga} className="mt-6">
          <button
            type="submit"
            className="w-full rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-border/50"
          >
            {t("sisene.googleiga")}
          </button>
        </form>
      )}

      {pakkujad.email && (
        <form action={saadaMagicLink} className="mt-6">
          {pakkujad.google && (
            <p className="mb-3 text-center text-xs text-foreground/50">
              {t("sisene.voiEpostiga")}
            </p>
          )}
          <input type="hidden" name="redirectTo" value="/" />
          <input
            type="email"
            name="email"
            required
            placeholder={t("sisene.epostKoht")}
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="mt-3 w-full rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            {t("sisene.saadaLink")}
          </button>
        </form>
      )}

      {pakkujad.test && (
        <form
          action={logiSisseTestiga}
          className="mt-6"
          data-testid="e2e-sisene-vorm"
        >
          <input type="hidden" name="redirectTo" value="/" />
          <input
            type="email"
            name="email"
            required
            placeholder="e2e@test.local"
            data-testid="e2e-sisene-epost"
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
          />
          <button
            type="submit"
            data-testid="e2e-sisene-nupp"
            className="mt-3 w-full rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-border/50"
          >
            {t("sisene.testiga")}
          </button>
        </form>
      )}

      <Link
        href="/"
        className="mt-8 inline-block text-sm text-accent hover:underline"
      >
        {t("sisene.avalehele")}
      </Link>
    </div>
  );
}
