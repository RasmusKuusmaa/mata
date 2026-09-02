import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Selgitus } from "./Selgitus";

describe("Selgitus", () => {
  it("renders the required sections with their estonian headings", () => {
    const html = renderToStaticMarkup(
      <Selgitus
        definitsioon="Reaalarvude hulk on kõigi ratsionaal- ja irratsionaalarvude ühend."
        naide={`Näiteks arv <Math>{"\\sqrt{2}"}</Math> on irratsionaalarv.`}
      />,
    );
    expect(html).toContain("Definitsioon");
    expect(html).toContain("Näide");
  });

  it("omits optional sections that were not given", () => {
    const html = renderToStaticMarkup(
      <Selgitus definitsioon="Definitsiooni tekst." naide="Näite tekst." />,
    );
    expect(html).not.toContain("Intuitsioon");
    expect(html).not.toContain("Tüüpvead");
    expect(html).not.toContain("Valemid");
  });

  it("renders every optional section when given", () => {
    const html = renderToStaticMarkup(
      <Selgitus
        intuitsioon="Intuitiivne selgitus."
        definitsioon="Definitsiooni tekst."
        naide="Näite tekst."
        tuupvead="Levinud viga on unustada märk."
        valemid="Valem: a² + b² = c²."
      />,
    );
    expect(html).toContain("Intuitsioon");
    expect(html).toContain("Definitsioon");
    expect(html).toContain("Näide");
    expect(html).toContain("Tüüpvead");
    expect(html).toContain("Valemid");
  });

  it("renders sections in the ainekava's canonical order regardless of prop order", () => {
    const html = renderToStaticMarkup(
      <Selgitus
        valemid="Valemi tekst."
        naide="Näite tekst."
        definitsioon="Definitsiooni tekst."
        tuupvead="Tüüpvea tekst."
        intuitsioon="Intuitsiooni tekst."
      />,
    );
    const order = [
      "Intuitsioon",
      "Definitsioon",
      "Näide",
      "Tüüpvead",
      "Valemid",
    ].map((label) => html.indexOf(label));
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(order.every((i) => i >= 0)).toBe(true);
  });

  it("renders embedded inline math as katex", () => {
    const html = renderToStaticMarkup(
      <Selgitus
        definitsioon={`Arvu ruutjuur: <Math>{"\\sqrt{x}"}</Math>.`}
        naide="Näite tekst."
      />,
    );
    expect(html).toContain("katex");
  });

  it("renders embedded display math as katex", () => {
    const html = renderToStaticMarkup(
      <Selgitus
        definitsioon="Definitsiooni tekst."
        naide={`<MathBlock>{"x^2 + 1 = 0"}</MathBlock>`}
      />,
    );
    expect(html).toContain("katex-display");
  });

  it("compiles markdown prose alongside the embedded math", () => {
    const html = renderToStaticMarkup(
      <Selgitus
        definitsioon="See on **oluline** mõiste."
        naide={"- esimene samm\n- teine samm"}
      />,
    );
    expect(html).toContain("<strong>oluline</strong>");
    expect(html).toContain("<li>");
  });

  it("throws on malformed mdx rather than rendering silently", () => {
    expect(() =>
      renderToStaticMarkup(
        <Selgitus definitsioon="<Math>{unclosed" naide="Näite tekst." />,
      ),
    ).toThrow();
  });
});
