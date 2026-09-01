import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Math } from "./Math";
import { MathBlock } from "./MathBlock";

describe("Math", () => {
  it("renders inline katex markup", () => {
    const html = renderToStaticMarkup(<Math>{"x^2"}</Math>);
    expect(html).toContain("katex");
    expect(html).not.toContain("katex-display");
  });

  it("expands the estonian tangent macro", () => {
    const html = renderToStaticMarkup(<Math>{"\\tg x"}</Math>);
    expect(html).toContain("tg");
  });

  it("throws on invalid latex rather than rendering silently", () => {
    expect(() =>
      renderToStaticMarkup(<Math>{"\\notarealcommand"}</Math>),
    ).toThrow();
  });
});

describe("MathBlock", () => {
  it("renders display-mode katex markup", () => {
    const html = renderToStaticMarkup(<MathBlock>{"x^2 + 1 = 0"}</MathBlock>);
    expect(html).toContain("katex-display");
  });
});
