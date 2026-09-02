import { describe, expect, it } from "vitest";
import { checkAnswer, parseExactForm, parseNumber } from "./check";
import type { Vastus } from "@/generators/types";

describe("parseNumber", () => {
  it("parses a plain integer", () => {
    expect(parseNumber("5")).toBe(5);
    expect(parseNumber("-5")).toBe(-5);
  });

  it("parses an estonian decimal comma", () => {
    expect(parseNumber("2,5")).toBe(2.5);
    expect(parseNumber("-0,25")).toBe(-0.25);
  });

  it("tolerates a plain decimal point too", () => {
    expect(parseNumber("2.5")).toBe(2.5);
  });

  it("strips spaced thousands separators", () => {
    expect(parseNumber("12 500")).toBe(12500);
    expect(parseNumber("1 234 567")).toBe(1234567);
  });

  it("parses a simple fraction", () => {
    expect(parseNumber("3/4")).toBe(0.75);
    expect(parseNumber("-3/4")).toBe(-0.75);
  });

  it("trims surrounding whitespace", () => {
    expect(parseNumber("  5  ")).toBe(5);
  });

  it.each([
    "",
    "   ",
    "abc",
    "1/0",
    "NaN",
    "Infinity",
    "-Infinity",
    "1.2.3",
    "1,2,3",
    "1//2",
    "<script>alert(1)</script>",
    "١٢٣", // arabic-indic digits, not supported
    "5;DROP TABLE users",
    "1 1/2", // mixed number, unsupported on purpose
  ])("rejects hostile or unsupported input %j", (input) => {
    expect(parseNumber(input)).toBeNull();
  });
});

describe("parseExactForm", () => {
  it("parses a bare symbol", () => {
    expect(parseExactForm("√3")).toBeCloseTo(Math.sqrt(3), 9);
    expect(parseExactForm("π")).toBeCloseTo(Math.PI, 9);
    expect(parseExactForm("pi")).toBeCloseTo(Math.PI, 9);
  });

  it("parses a coefficient in front of the symbol", () => {
    expect(parseExactForm("2√3")).toBeCloseTo(2 * Math.sqrt(3), 9);
    expect(parseExactForm("-2pi")).toBeCloseTo(-2 * Math.PI, 9);
  });

  it("parses a denominator after the symbol", () => {
    expect(parseExactForm("√3/2")).toBeCloseTo(Math.sqrt(3) / 2, 9);
    expect(parseExactForm("π/6")).toBeCloseTo(Math.PI / 6, 9);
  });

  it("parses sqrt(n) notation", () => {
    expect(parseExactForm("sqrt(3)")).toBeCloseTo(Math.sqrt(3), 9);
    expect(parseExactForm("2sqrt(3)")).toBeCloseTo(2 * Math.sqrt(3), 9);
  });

  it.each(["", "abc", "√", "1/0√2", "2 + √3", "√-1", "NaN√2"])(
    "rejects hostile or unsupported input %j",
    (input) => {
      expect(parseExactForm(input)).toBeNull();
    },
  );
});

describe("checkAnswer", () => {
  it("checks arv answers within floating-point tolerance", () => {
    const vastus: Vastus = { tuup: "arv", kuju: "taisarv", vaartus: 3 };
    expect(checkAnswer("3", vastus)).toBe(true);
    expect(checkAnswer("3,0", vastus)).toBe(true);
    expect(checkAnswer("4", vastus)).toBe(false);
    expect(checkAnswer("", vastus)).toBe(false);
    expect(checkAnswer("abc", vastus)).toBe(false);
  });

  it("checks arv fraction answers against an equivalent decimal", () => {
    const vastus: Vastus = {
      tuup: "arv",
      kuju: "murd",
      lugeja: 3,
      nimetaja: 4,
    };
    expect(checkAnswer("3/4", vastus)).toBe(true);
    expect(checkAnswer("0,75", vastus)).toBe(true);
    expect(checkAnswer("3/5", vastus)).toBe(false);
  });

  it("checks tapne answers, rejecting a decimal approximation", () => {
    const vastus: Vastus = {
      tuup: "tapne",
      vorm: { kind: "sqrt", radicand: 3, numerator: 2 },
    };
    expect(checkAnswer("2√3", vastus)).toBe(true);
    expect(checkAnswer("2sqrt(3)", vastus)).toBe(true);
    expect(checkAnswer("3,46", vastus)).toBe(false);
    expect(checkAnswer("2√5", vastus)).toBe(false);
  });

  it("checks valik answers by exact text match", () => {
    const vastus: Vastus = {
      tuup: "valik",
      oige: "x = 2",
      eksitajad: ["x = 3", "x = 4"],
    };
    expect(checkAnswer("x = 2", vastus)).toBe(true);
    expect(checkAnswer(" x = 2 ", vastus)).toBe(true);
    expect(checkAnswer("x = 3", vastus)).toBe(false);
  });

  it("checks hulk answers order-free", () => {
    const vastus: Vastus = {
      tuup: "hulk",
      vaartused: [
        { kuju: "taisarv", vaartus: 2 },
        { kuju: "taisarv", vaartus: 3 },
      ],
    };
    expect(checkAnswer("2, 3", vastus)).toBe(true);
    expect(checkAnswer("3, 2", vastus)).toBe(true);
    expect(checkAnswer("3;2", vastus)).toBe(true);
    expect(checkAnswer("2", vastus)).toBe(false);
    expect(checkAnswer("2, 3, 4", vastus)).toBe(false);
  });

  it("checks hulk answers duplicate-tolerantly", () => {
    const vastus: Vastus = {
      tuup: "hulk",
      vaartused: [
        { kuju: "taisarv", vaartus: 2 },
        { kuju: "taisarv", vaartus: 2 },
      ],
    };
    expect(checkAnswer("2", vastus)).toBe(true);
    expect(checkAnswer("2, 2", vastus)).toBe(true);
  });

  it("never throws on hostile input", () => {
    const vastusen: Vastus[] = [
      { tuup: "arv", kuju: "taisarv", vaartus: 1 },
      { tuup: "tapne", vorm: { kind: "pi", numerator: 1 } },
      { tuup: "valik", oige: "a", eksitajad: ["b"] },
      { tuup: "hulk", vaartused: [{ kuju: "taisarv", vaartus: 1 }] },
    ];
    const hostileInputs = [
      "",
      "   ",
      "<script>alert(1)</script>",
      "1/0",
      "NaN",
      "Infinity",
      "-0",
      "𝕏𝕐𝟚",
      "a".repeat(10000),
      "√".repeat(500),
    ];
    for (const vastus of vastusen) {
      for (const input of hostileInputs) {
        expect(() => checkAnswer(input, vastus)).not.toThrow();
      }
    }
  });
});
