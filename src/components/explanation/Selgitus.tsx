import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { evaluateSync } from "@mdx-js/mdx";
import { Math } from "@/components/math/Math";
import { MathBlock } from "@/components/math/MathBlock";
import { t } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";

const MDX_COMPONENTS = { Math, MathBlock };

/**
 * Compiles and runs one section's MDX source, synchronously, server-side —
 * `evaluateSync` rather than `evaluate` so `<Selgitus>` stays a plain
 * synchronous component (same rendering path as `<Math>`/`<MathBlock>`,
 * testable the same way).
 */
function Mdx({ source }: { source: string }) {
  const { default: Content } = evaluateSync(source, {
    Fragment,
    jsx,
    jsxs,
    useMDXComponents: () => MDX_COMPONENTS,
  });
  return <Content />;
}

export type SelgitusProps = {
  /** Raw MDX source per section. `Math`/`MathBlock` are in scope for KaTeX. */
  intuitsioon?: string;
  definitsioon: string;
  naide: string;
  tuupvead?: string;
  valemid?: string;
};

const SECTIONS: { key: keyof SelgitusProps; label: TranslationKey }[] = [
  { key: "intuitsioon", label: "selgitus.intuitsioon" },
  { key: "definitsioon", label: "selgitus.definitsioon" },
  { key: "naide", label: "selgitus.naide" },
  { key: "tuupvead", label: "selgitus.tuupvead" },
  { key: "valemid", label: "selgitus.valemid" },
];

/**
 * A topic's explanation, in the ainekava's canonical section order.
 * `intuitsioon`, `tuupvead` and `valemid` are optional — not every topic
 * needs an intuition primer, a pitfalls list, or its own formula recap.
 */
export function Selgitus(props: SelgitusProps) {
  return (
    <div className="prose-math">
      {SECTIONS.map(({ key, label }) => {
        const source = props[key];
        if (!source) return null;
        const headingId = `selgitus-${key}`;
        return (
          <section key={key} aria-labelledby={headingId}>
            <h2 id={headingId}>{t(label)}</h2>
            <Mdx source={source} />
          </section>
        );
      })}
    </div>
  );
}
