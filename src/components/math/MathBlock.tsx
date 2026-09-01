import katex from "katex";
import { MACROS } from "./macros";

/** Display math on its own line, e.g. a worked-solution step. Server-rendered. */
export function MathBlock({ children }: { children: string }) {
  const html = katex.renderToString(children, {
    throwOnError: true,
    displayMode: true,
    macros: MACROS,
  });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
