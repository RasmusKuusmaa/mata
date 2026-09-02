import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Selgitus } from "@/components/explanation/Selgitus";
import { selgitused } from "./index";

/**
 * Every authored explanation must actually compile and render: a broken
 * MDX string (unescaped LaTeX, a stray `$...$`, unbalanced JSX) would
 * otherwise only surface when a real page renders that topic.
 */
describe("selgitused", () => {
  for (const [id, props] of Object.entries(selgitused)) {
    if (!props) continue;
    it(`renders ${id} without throwing`, () => {
      expect(() => renderToStaticMarkup(<Selgitus {...props} />)).not.toThrow();
    });
  }
});
