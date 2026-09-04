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

  it("carries an optional plain-language aria-label without one by default", () => {
    const unlabeled = renderToStaticMarkup(<Math>{"x^2"}</Math>);
    expect(unlabeled).not.toContain("aria-label");

    const labeled = renderToStaticMarkup(
      <Math label="x ruudus">{"x^2"}</Math>,
    );
    expect(labeled).toContain('aria-label="x ruudus"');
    expect(labeled).toContain('role="img"');
  });
});

describe("MathBlock", () => {
  it("renders display-mode katex markup", () => {
    const html = renderToStaticMarkup(<MathBlock>{"x^2 + 1 = 0"}</MathBlock>);
    expect(html).toContain("katex-display");
  });

  it("carries an optional plain-language aria-label", () => {
    const html = renderToStaticMarkup(
      <MathBlock label="x ruudus pluss üks võrdub null">
        {"x^2 + 1 = 0"}
      </MathBlock>,
    );
    expect(html).toContain('aria-label="x ruudus pluss üks võrdub null"');
  });
});
