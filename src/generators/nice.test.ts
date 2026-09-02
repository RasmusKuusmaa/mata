import { describe, expect, it } from "vitest";
import { mulberry32 } from "./rng";
import {
  PYTHAGOREAN_TRIPLES,
  SPECIAL_ANGLES,
  exactPowers,
  exactValueToNumber,
  factorableQuadratic,
  isNice,
  nicelyDifferentiable,
  nicelyIntegrable,
  niceTriangle,
  redrawUntilNice,
  vastusIsNice,
} from "./nice";

describe("PYTHAGOREAN_TRIPLES", () => {
  it("every triple satisfies a² + b² = c²", () => {
    for (const [a, b, c] of PYTHAGOREAN_TRIPLES) {
      expect(a * a + b * b).toBe(c * c);
    }
  });

  it("every triple is sorted ascending", () => {
    for (const [a, b, c] of PYTHAGOREAN_TRIPLES) {
      expect(a).toBeLessThan(b);
      expect(b).toBeLessThan(c);
    }
  });
});

describe("SPECIAL_ANGLES", () => {
  it("sin² + cos² = 1 for every angle", () => {
    for (const values of Object.values(SPECIAL_ANGLES)) {
      const sin = exactValueToNumber(values.sin);
      const cos = exactValueToNumber(values.cos);
      expect(sin * sin + cos * cos).toBeCloseTo(1, 9);
    }
  });

  it("tan = sin / cos wherever tan is defined", () => {
    for (const values of Object.values(SPECIAL_ANGLES)) {
      if (values.tan === null) continue;
      const sin = exactValueToNumber(values.sin);
      const cos = exactValueToNumber(values.cos);
      const tan = exactValueToNumber(values.tan);
      expect(tan).toBeCloseTo(sin / cos, 9);
    }
  });

  it("tan is undefined exactly where cosine is zero", () => {
    for (const values of Object.values(SPECIAL_ANGLES)) {
      const cos = exactValueToNumber(values.cos);
      expect(values.tan === null).toBe(cos === 0);
    }
  });
});

describe("isNice", () => {
  it.each([0, 1, -1, 12, -100])("accepts integer value %s", (v) => {
    expect(isNice(v)).toBe(true);
  });

  it.each([
    [1, 2],
    [1, 3],
    [5, 4],
    [-7, 12],
    [11, 12],
  ])("accepts %s/%s (denominator ≤ 12)", (n, d) => {
    expect(isNice(n / d)).toBe(true);
  });

  it("rejects a value with no nice fractional representation", () => {
    expect(isNice(Math.PI)).toBe(false);
    expect(isNice(Math.SQRT2)).toBe(false);
  });

  it("rejects non-finite values", () => {
    expect(isNice(NaN)).toBe(false);
    expect(isNice(Infinity)).toBe(false);
  });
});

describe("redrawUntilNice", () => {
  it("returns the first non-null candidate", () => {
    let calls = 0;
    const result = redrawUntilNice(() => {
      calls++;
      return calls < 3 ? null : "found";
    }, mulberry32(1));
    expect(result).toBe("found");
    expect(calls).toBe(3);
  });

  it("throws after exhausting maxAttempts", () => {
    expect(() =>
      redrawUntilNice(() => null, mulberry32(1), 5),
    ).toThrow(/5 attempts/);
  });
});

describe("factorableQuadratic", () => {
  it("the roots actually satisfy a·x² + b·x + c = 0", () => {
    const rng = mulberry32(1);
    for (let i = 0; i < 200; i++) {
      const { a, b, c, roots } = factorableQuadratic(rng);
      for (const root of roots) {
        expect(a * root * root + b * root + c).toBe(0);
      }
    }
  });

  it("roots are returned ascending", () => {
    const rng = mulberry32(2);
    for (let i = 0; i < 100; i++) {
      const { roots } = factorableQuadratic(rng);
      expect(roots[0]).toBeLessThanOrEqual(roots[1]);
    }
  });
});

describe("nicelyDifferentiable", () => {
  it("derivativeAtX0 matches a numeric derivative of the polynomial", () => {
    const rng = mulberry32(3);
    const evaluate = (coefficients: number[], x: number) =>
      coefficients.reduce((sum, c, power) => sum + c * x ** power, 0);

    for (let i = 0; i < 200; i++) {
      const { coefficients, x0, derivativeAtX0 } = nicelyDifferentiable(rng);
      const h = 1e-4;
      const numeric =
        (evaluate(coefficients, x0 + h) - evaluate(coefficients, x0 - h)) /
        (2 * h);
      expect(derivativeAtX0).toBeCloseTo(numeric, 1);
      expect(Number.isInteger(derivativeAtX0)).toBe(true);
    }
  });
});

describe("nicelyIntegrable", () => {
  it("differentiating the antiderivative terms gives back the original terms", () => {
    const rng = mulberry32(4);
    for (let i = 0; i < 200; i++) {
      const { terms, antiderivativeTerms } = nicelyIntegrable(rng);
      expect(antiderivativeTerms).toHaveLength(terms.length);
      for (let j = 0; j < terms.length; j++) {
        const original = terms[j];
        const antiderivative = antiderivativeTerms[j];
        expect(antiderivative.exponent).toBe(original.exponent + 1);
        expect(antiderivative.coefficient * antiderivative.exponent).toBe(
          original.coefficient,
        );
        expect(Number.isInteger(antiderivative.coefficient)).toBe(true);
      }
    }
  });
});

describe("exactPowers", () => {
  it("root^exponentNumerator matches the reported value", () => {
    const rng = mulberry32(5);
    for (let i = 0; i < 200; i++) {
      const { base, exponentDenominator, exponentNumerator, value } =
        exactPowers(rng);
      const root = Math.round(base ** (1 / exponentDenominator));
      expect(root ** exponentDenominator).toBe(base);
      expect(exactValueToNumber(value)).toBeCloseTo(
        root ** exponentNumerator,
        9,
      );
    }
  });
});

describe("niceTriangle", () => {
  it("sides satisfy a² + b² = c² and stay within the readable bound", () => {
    const rng = mulberry32(6);
    for (let i = 0; i < 200; i++) {
      const {
        sides: [a, b, c],
      } = niceTriangle(rng);
      expect(a * a + b * b).toBe(c * c);
      expect(c).toBeLessThanOrEqual(100);
    }
  });
});

describe("vastusIsNice", () => {
  it("accepts an integer arv", () => {
    expect(vastusIsNice({ tuup: "arv", kuju: "taisarv", vaartus: 5 })).toBe(
      true,
    );
  });

  it("accepts an arv fraction with denominator ≤ 12", () => {
    expect(
      vastusIsNice({ tuup: "arv", kuju: "murd", lugeja: 5, nimetaja: 8 }),
    ).toBe(true);
  });

  it("rejects an arv fraction with denominator > 12", () => {
    expect(
      vastusIsNice({ tuup: "arv", kuju: "murd", lugeja: 5, nimetaja: 17 }),
    ).toBe(false);
  });

  it("accepts a hulk only when every member is nice", () => {
    expect(
      vastusIsNice({
        tuup: "hulk",
        vaartused: [
          { kuju: "taisarv", vaartus: 2 },
          { kuju: "murd", lugeja: 1, nimetaja: 3 },
        ],
      }),
    ).toBe(true);
    expect(
      vastusIsNice({
        tuup: "hulk",
        vaartused: [
          { kuju: "taisarv", vaartus: 2 },
          { kuju: "murd", lugeja: 1, nimetaja: 17 },
        ],
      }),
    ).toBe(false);
  });

  it("always accepts tapne and valik answers", () => {
    expect(
      vastusIsNice({ tuup: "tapne", vorm: { kind: "pi", numerator: 1 } }),
    ).toBe(true);
    expect(
      vastusIsNice({ tuup: "valik", oige: "a", eksitajad: ["b", "c"] }),
    ).toBe(true);
  });
});
