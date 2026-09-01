import { describe, expect, it } from "vitest";
import { formatExact, formatFraction, formatNumber } from "./number";

describe("formatNumber", () => {
  it("formats zero", () => {
    expect(formatNumber(0)).toBe("0");
  });

  it("normalises negative zero to zero", () => {
    expect(formatNumber(-0)).toBe("0");
  });

  it("formats a negative integer", () => {
    expect(formatNumber(-3)).toBe("-3");
  });

  it("uses a comma for the decimal separator", () => {
    expect(formatNumber(2.5)).toBe("2,5");
  });

  it("groups thousands with a space", () => {
    expect(formatNumber(12500)).toBe("12 500");
  });

  it("groups large numbers at every three digits", () => {
    expect(formatNumber(1234567)).toBe("1 234 567");
  });

  it("groups a negative large decimal", () => {
    expect(formatNumber(-12500.25)).toBe("-12 500,25");
  });

  it("throws for non-finite input", () => {
    expect(() => formatNumber(Infinity)).toThrow();
    expect(() => formatNumber(NaN)).toThrow();
  });
});

describe("formatFraction", () => {
  it("reduces to an integer when the denominator divides evenly", () => {
    expect(formatFraction(6, 3)).toBe("2");
  });

  it("formats a positive proper fraction", () => {
    expect(formatFraction(3, 4)).toBe("3/4");
  });

  it("reduces to lowest terms", () => {
    expect(formatFraction(2, 4)).toBe("1/2");
  });

  it("keeps the sign on the numerator regardless of where it started", () => {
    expect(formatFraction(-3, 4)).toBe("-3/4");
    expect(formatFraction(3, -4)).toBe("-3/4");
    expect(formatFraction(-3, -4)).toBe("3/4");
  });

  it("formats a zero numerator as 0 regardless of denominator", () => {
    expect(formatFraction(0, 5)).toBe("0");
  });
});

describe("formatExact", () => {
  it("formats a bare radical with coefficient 1", () => {
    expect(formatExact({ kind: "sqrt", radicand: 3, numerator: 1 })).toBe("√3");
  });

  it("formats a negative bare radical", () => {
    expect(formatExact({ kind: "sqrt", radicand: 3, numerator: -1 })).toBe(
      "-√3",
    );
  });

  it("formats a scaled radical", () => {
    expect(formatExact({ kind: "sqrt", radicand: 2, numerator: 5 })).toBe(
      "5√2",
    );
  });

  it("formats a radical over a denominator, e.g. cos 30°", () => {
    expect(
      formatExact({ kind: "sqrt", radicand: 3, numerator: 1, denominator: 2 }),
    ).toBe("√3/2");
  });

  it("formats a scaled radical over a denominator", () => {
    expect(
      formatExact({ kind: "sqrt", radicand: 2, numerator: 3, denominator: 4 }),
    ).toBe("3√2/4");
  });

  it("formats zero coefficient as 0", () => {
    expect(formatExact({ kind: "sqrt", radicand: 5, numerator: 0 })).toBe("0");
  });

  it("formats a bare pi", () => {
    expect(formatExact({ kind: "pi", numerator: 1 })).toBe("π");
  });

  it("formats a scaled pi", () => {
    expect(formatExact({ kind: "pi", numerator: 4 })).toBe("4π");
  });

  it("formats a fractional pi, e.g. a common angle", () => {
    expect(formatExact({ kind: "pi", numerator: 1, denominator: 6 })).toBe(
      "π/6",
    );
    expect(formatExact({ kind: "pi", numerator: -1, denominator: 6 })).toBe(
      "-π/6",
    );
  });

  it("reduces the coefficient fraction before rendering", () => {
    expect(formatExact({ kind: "pi", numerator: 2, denominator: 4 })).toBe(
      "π/2",
    );
  });
});
