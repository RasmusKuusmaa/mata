import { MathBlock } from "@/components/math/MathBlock";
import { valemileht } from "@/content/lai-matemaatika/valemileht";
import { t } from "@/lib/i18n";

/** The browsable formula sheet (todo.md Ship 5.1) — always available, not
 * gated behind the `eksamirezhiim` flag, since a learner benefits from it
 * long before mock-exam mode is ready. */
export default function ValemilehtPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-2xl font-semibold">
        {t("valemileht.pealkiri")}
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        {t("valemileht.selgitus")}
      </p>

      <nav aria-label={t("valemileht.sisukordAria")} className="mt-6 flex flex-wrap gap-2">
        {valemileht.map((jaotis) => (
          <a
            key={jaotis.pealkiri}
            href={`#${slugify(jaotis.pealkiri)}`}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs hover:bg-border/50"
          >
            {jaotis.pealkiri}
          </a>
        ))}
      </nav>

      <div className="mt-8 flex flex-col gap-10">
        {valemileht.map((jaotis) => (
          <section key={jaotis.pealkiri} id={slugify(jaotis.pealkiri)}>
            <h2 className="font-display text-lg font-semibold">
              {jaotis.pealkiri}
            </h2>
            <div className="prose-math mt-3 flex flex-col gap-3">
              {jaotis.read.map((rida, i) => (
                <div
                  key={i}
                  className="rounded-md border border-border bg-surface px-4 py-3"
                >
                  {rida.silt !== "" && (
                    <p className="text-xs font-medium text-foreground/60">
                      {rida.silt}
                    </p>
                  )}
                  <MathBlock>{rida.valem}</MathBlock>
                  {rida.markus !== undefined && (
                    <p className="text-xs text-foreground/60">{rida.markus}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const ASENDUSED: Record<string, string> = {
  õ: "o",
  ä: "a",
  ö: "o",
  ü: "u",
  š: "s",
  ž: "z",
};

function slugify(pealkiri: string): string {
  return pealkiri
    .toLowerCase()
    .replace(/[õäöüšž]/g, (taht) => ASENDUSED[taht])
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
