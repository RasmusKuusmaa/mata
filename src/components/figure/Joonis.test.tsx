import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Joonis } from "./Joonis";

describe("Joonis", () => {
  it("renders an svg with a computed viewBox from its elements' bounding box", () => {
    const html = renderToStaticMarkup(
      <Joonis
        elemendid={[
          { tuup: "punkt", koht: { x: 0, y: 0 } },
          { tuup: "punkt", koht: { x: 4, y: 3 } },
        ]}
        padding={1}
      />,
    );
    expect(html).toContain('viewBox="-1 -4 6 5"');
  });

  it("falls back to a small centered box for an empty figure", () => {
    const html = renderToStaticMarkup(<Joonis elemendid={[]} padding={2} />);
    expect(html).toContain('viewBox="-2 -2 4 4"');
  });

  it("flips the y-axis so math-up renders as svg-up (negative y)", () => {
    const html = renderToStaticMarkup(
      <Joonis
        elemendid={[{ tuup: "punkt", koht: { x: 0, y: 5 } }]}
        padding={1}
      />,
    );
    expect(html).toContain('cy="-5"');
  });

  it("renders a segment as a line between the two points", () => {
    const html = renderToStaticMarkup(
      <Joonis
        elemendid={[
          { tuup: "loik", a: { x: 0, y: 0 }, b: { x: 3, y: 4 } },
        ]}
      />,
    );
    expect(html).toContain('x1="0"');
    expect(html).toContain('y1="0"');
    expect(html).toContain('x2="3"');
    expect(html).toContain('y2="-4"');
  });

  it("renders a point's label offset from the point", () => {
    const html = renderToStaticMarkup(
      <Joonis
        elemendid={[{ tuup: "punkt", koht: { x: 1, y: 1 }, silt: "A" }]}
      />,
    );
    expect(html).toContain(">A<");
  });

  it("omits a point's label element when none is given", () => {
    const html = renderToStaticMarkup(
      <Joonis elemendid={[{ tuup: "punkt", koht: { x: 1, y: 1 } }]} />,
    );
    expect(html).not.toContain("<text");
  });

  it("renders a right-angle mark's exact geometry for an axis-aligned corner", () => {
    const html = renderToStaticMarkup(
      <Joonis
        elemendid={[
          {
            tuup: "taisnurk",
            tipp: { x: 0, y: 0 },
            a: { x: 2, y: 0 },
            b: { x: 0, y: 2 },
            suurus: 1,
          },
        ]}
      />,
    );
    expect(html).toContain('d="M 1 0 L 1 -1 L 0 -1"');
  });

  it("renders an angle arc's exact geometry for a right-angle corner", () => {
    const html = renderToStaticMarkup(
      <Joonis
        elemendid={[
          {
            tuup: "nurgakaar",
            tipp: { x: 0, y: 0 },
            a: { x: 2, y: 0 },
            b: { x: 0, y: 2 },
            raadius: 1,
          },
        ]}
      />,
    );
    expect(html).toContain('d="M 1 0 A 1 1 0 0 0 0 -1"');
  });

  it("renders an angle arc's label near the arc", () => {
    const html = renderToStaticMarkup(
      <Joonis
        elemendid={[
          {
            tuup: "nurgakaar",
            tipp: { x: 0, y: 0 },
            a: { x: 2, y: 0 },
            b: { x: 0, y: 2 },
            silt: "α",
          },
        ]}
      />,
    );
    expect(html).toContain(">α<");
  });

  it("renders a standalone label at its position", () => {
    const html = renderToStaticMarkup(
      <Joonis
        elemendid={[{ tuup: "silt", koht: { x: 2, y: 2 }, tekst: "5 cm" }]}
      />,
    );
    expect(html).toContain(">5 cm<");
  });

  it("throws when asked to orient a mark at two coincident points", () => {
    expect(() =>
      renderToStaticMarkup(
        <Joonis
          elemendid={[
            {
              tuup: "taisnurk",
              tipp: { x: 0, y: 0 },
              a: { x: 0, y: 0 },
              b: { x: 0, y: 2 },
            },
          ]}
        />,
      ),
    ).toThrow();
  });

  it("renders every element type together without error", () => {
    const html = renderToStaticMarkup(
      <Joonis
        elemendid={[
          { tuup: "loik", a: { x: 0, y: 0 }, b: { x: 3, y: 0 } },
          { tuup: "loik", a: { x: 3, y: 0 }, b: { x: 0, y: 4 } },
          { tuup: "loik", a: { x: 0, y: 4 }, b: { x: 0, y: 0 } },
          { tuup: "punkt", koht: { x: 0, y: 0 }, silt: "A" },
          { tuup: "punkt", koht: { x: 3, y: 0 }, silt: "B" },
          { tuup: "punkt", koht: { x: 0, y: 4 }, silt: "C" },
          {
            tuup: "taisnurk",
            tipp: { x: 0, y: 0 },
            a: { x: 3, y: 0 },
            b: { x: 0, y: 4 },
          },
          {
            tuup: "nurgakaar",
            tipp: { x: 3, y: 0 },
            a: { x: 0, y: 0 },
            b: { x: 0, y: 4 },
            silt: "β",
          },
          { tuup: "silt", koht: { x: 1.5, y: 2 }, tekst: "5" },
        ]}
      />,
    );
    expect(html).toContain("<svg");
    expect(html).toContain("<line");
    expect(html).toContain("<circle");
    expect(html).toContain("<path");
  });
});
