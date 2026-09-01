import katex from "katex";
import { MACROS } from "./macros";

/** Inline math, e.g. within a sentence. Server-rendered. */
export function Math({ children }: { children: string }) {
  const html = katex.renderToString(children, {
    throwOnError: true,
    displayMode: false,
    macros: MACROS,
  });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
