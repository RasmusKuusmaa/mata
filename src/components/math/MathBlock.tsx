import katex from "katex";
import { MACROS } from "./macros";

type Props = {
  children: string;
  /** See `Math`'s `label` prop — same rationale, additive to the native
   * MathML KaTeX already emits. */
  label?: string;
};

/** Display math on its own line, e.g. a worked-solution step. Server-rendered. */
export function MathBlock({ children, label }: Props) {
  const html = katex.renderToString(children, {
    throwOnError: true,
    displayMode: true,
    macros: MACROS,
  });
  return (
    <div
      aria-label={label}
      role={label ? "img" : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
