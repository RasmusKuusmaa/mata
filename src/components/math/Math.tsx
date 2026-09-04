import katex from "katex";
import { MACROS } from "./macros";

type Props = {
  children: string;
  /**
   * A plain-Estonian reading of the math, for a screen reader that doesn't
   * speak KaTeX's MathML output well (todo.md Ship 6.1). Optional and
   * additive — KaTeX already emits real MathML by default (verified: every
   * `<Math>`/`<MathBlock>` render includes a `<math>` tree, not just the
   * visual HTML), which many screen readers already read meaningfully on
   * their own. Hand-authoring an Estonian gloss for every one of the
   * thousands of procedurally-generated question/solution strings isn't
   * practical or reliably more correct than that native MathML reading, so
   * this is reserved for the handful of call sites — mostly static
   * explanation text — where a curated label is worth the effort.
   */
  label?: string;
};

/** Inline math, e.g. within a sentence. Server-rendered. */
export function Math({ children, label }: Props) {
  const html = katex.renderToString(children, {
    throwOnError: true,
    displayMode: false,
    macros: MACROS,
  });
  return (
    <span
      aria-label={label}
      role={label ? "img" : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
