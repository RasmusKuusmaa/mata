import { t } from "@/lib/i18n";

/**
 * Todo.md Ship 5.4 — a curated index **linking** to Harno's published past
 * papers and marking schemes, never copying or mirroring them. Only the two
 * URLs already verified real and current in `docs/eristuskiri-2027.md` are
 * used here — no per-year deep link is fabricated, since those haven't been
 * individually confirmed to exist.
 */
export default function VarasemadEksamidPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("varasemadEksamid.pealkiri")}
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        {t("varasemadEksamid.selgitus")}
      </p>

      <ul className="mt-6 flex flex-col gap-4">
        <li className="rounded-md border border-border bg-surface p-4">
          <a
            href="https://harno.ee/riigieksamid"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent hover:underline"
          >
            {t("varasemadEksamid.harnoLink")}
          </a>
          <p className="mt-1 text-sm text-foreground/70">
            {t("varasemadEksamid.harnoSelgitus")}
          </p>
        </li>
        <li className="rounded-md border border-border bg-surface p-4">
          <a
            href="https://projektid.edu.ee/display/THO/Riigieksamite+materjalid+2027"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent hover:underline"
          >
            {t("varasemadEksamid.thoLink")}
          </a>
          <p className="mt-1 text-sm text-foreground/70">
            {t("varasemadEksamid.thoSelgitus")}
          </p>
        </li>
      </ul>
    </div>
  );
}
