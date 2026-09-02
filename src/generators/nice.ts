import type { ExactForm } from "@/lib/format/number";
import { int, nonZeroInt, pick } from "./rng";
import type { Rng } from "./types";

/**
 * Any value a generator is allowed to hand back as an answer or an
 * intermediate parameter: a plain integer, a fraction, or an exact
 * irrational form (`ExactForm`, shared with `Vastus.tapne`).
 */
export type ExactValue =
  | { kind: "integer"; value: number }
  | { kind: "fraction"; numerator: number; denominator: number }
  | ExactForm;

function integer(value: number): ExactValue {
  return { kind: "integer", value };
}

function fraction(numerator: number, denominator: number): ExactValue {
  return { kind: "fraction", numerator, denominator };
}

function sqrtValue(
  radicand: number,
  numerator: number,
  denominator = 1,
): ExactValue {
  return { kind: "sqrt", radicand, numerator, denominator };
}

/** Evaluates any `ExactValue` to a plain float, for sanity checks and tests. */
export function exactValueToNumber(value: ExactValue): number {
  switch (value.kind) {
    case "integer":
      return value.value;
    case "fraction":
      return value.numerator / value.denominator;
    case "sqrt":
      return (
        (value.numerator / (value.denominator ?? 1)) * Math.sqrt(value.radicand)
      );
    case "pi":
      return (value.numerator / (value.denominator ?? 1)) * Math.PI;
  }
}

/**
 * Small integer-sided right triangles (`a² + b² = c²`), primitive and
 * scaled, small enough to stay readable in a generated question.
 */
export const PYTHAGOREAN_TRIPLES: readonly [number, number, number][] = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [12, 16, 20],
  [7, 24, 25],
  [10, 24, 26],
  [20, 21, 29],
  [9, 40, 41],
  [12, 35, 37],
  [15, 20, 25],
];

/** Exact sine/cosine/tangent for the angles the ainekava names explicitly. */
export type TrigValues = {
  sin: ExactValue;
  cos: ExactValue;
  /** `null` where the tangent is undefined (90°, 270°). */
  tan: ExactValue | null;
};

export const SPECIAL_ANGLES: Readonly<Record<number, TrigValues>> = {
  0: { sin: integer(0), cos: integer(1), tan: integer(0) },
  30: { sin: fraction(1, 2), cos: sqrtValue(3, 1, 2), tan: sqrtValue(3, 1, 3) },
  45: { sin: sqrtValue(2, 1, 2), cos: sqrtValue(2, 1, 2), tan: integer(1) },
  60: { sin: sqrtValue(3, 1, 2), cos: fraction(1, 2), tan: sqrtValue(3, 1) },
  90: { sin: integer(1), cos: integer(0), tan: null },
  180: { sin: integer(0), cos: integer(-1), tan: integer(0) },
  270: { sin: integer(-1), cos: integer(0), tan: null },
  360: { sin: integer(0), cos: integer(1), tan: integer(0) },
};

/**
 * Checks whether a plain numeric answer counts as "nice": an integer, or a
 * fraction with denominator ≤ 12. Exact irrational forms are nice by
 * construction (`ExactValue`/`Vastus.tapne`) and never reach this check.
 */
export function isNice(value: number): boolean {
  if (!Number.isFinite(value)) return false;
  if (Number.isInteger(value)) return true;
  for (let denominator = 2; denominator <= 12; denominator++) {
    const numerator = value * denominator;
    if (Math.abs(numerator - Math.round(numerator)) < 1e-9) return true;
  }
  return false;
}

/**
 * Draws candidates from `fn` until one is nice (non-`null`), returning it.
 * Throws rather than ever handing back an ugly number — a redraw loop that
 * can't terminate is a bug in `fn`'s constraints, not something to paper
 * over with a bad question.
 */
export function redrawUntilNice<T>(
  fn: (rng: Rng) => T | null,
  rng: Rng,
  maxAttempts = 100,
): T {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = fn(rng);
    if (candidate !== null) return candidate;
  }
  throw new Error(
    `redrawUntilNice: no nice candidate found in ${maxAttempts} attempts`,
  );
}

/** A monic-or-small-leading-coefficient quadratic with two integer roots. */
export type FactorableQuadratic = {
  a: number;
  b: number;
  c: number;
  roots: [number, number];
};

export function factorableQuadratic(rng: Rng): FactorableQuadratic {
  const a = pick(rng, [1, 1, 1, 2, 3]);
  const r1 = nonZeroInt(rng, -9, 9);
  const r2 = nonZeroInt(rng, -9, 9);
  const b = -a * (r1 + r2);
  const c = a * r1 * r2;
  const roots: [number, number] = r1 <= r2 ? [r1, r2] : [r2, r1];
  return { a, b, c, roots };
}

/** A polynomial `Σ coefficients[i] · x^i`, and its derivative at `x0`. */
export type NicelyDifferentiable = {
  coefficients: number[];
  x0: number;
  derivativeAtX0: number;
};

/**
 * An integer-coefficient polynomial evaluated at an integer point always
 * has an integer derivative there (the power rule only multiplies and
 * subtracts integers), so this is nice by construction — no redraw needed.
 */
export function nicelyDifferentiable(rng: Rng): NicelyDifferentiable {
  const degree = int(rng, 2, 3);
  const coefficients = Array.from({ length: degree + 1 }, (_, power) =>
    power === degree ? nonZeroInt(rng, -5, 5) : int(rng, -5, 5),
  );
  const x0 = int(rng, -3, 3);
  const derivativeAtX0 = coefficients.reduce(
    (sum, c, power) => (power === 0 ? sum : sum + c * power * x0 ** (power - 1)),
    0,
  );
  return { coefficients, x0, derivativeAtX0 };
}

export type PolynomialTerm = { coefficient: number; exponent: number };

export type NicelyIntegrable = {
  terms: PolynomialTerm[];
  /** The antiderivative's terms (constant of integration omitted). */
  antiderivativeTerms: PolynomialTerm[];
};

/**
 * Builds `f(x) = Σ coefficient · x^exponent` by choosing each term's
 * *antiderivative* coefficient first (a small nonzero integer) and scaling
 * up by `exponent + 1`, so `F(x)`'s coefficients are integers by
 * construction — no redraw needed.
 */
export function nicelyIntegrable(rng: Rng): NicelyIntegrable {
  const termCount = int(rng, 1, 3);
  const exponents = new Set<number>();
  while (exponents.size < termCount) exponents.add(int(rng, 0, 4));

  const terms: PolynomialTerm[] = [];
  const antiderivativeTerms: PolynomialTerm[] = [];
  for (const exponent of exponents) {
    const antiderivativeCoefficient = nonZeroInt(rng, -4, 4);
    const coefficient = antiderivativeCoefficient * (exponent + 1);
    terms.push({ coefficient, exponent });
    antiderivativeTerms.push({
      coefficient: antiderivativeCoefficient,
      exponent: exponent + 1,
    });
  }

  return { terms, antiderivativeTerms };
}

/** Exact `root^(numerator/denominator)` for a perfect-power base. */
export type ExactPower = {
  base: number;
  exponentNumerator: number;
  exponentDenominator: number;
  value: ExactValue;
};

/**
 * Picks a small integer `root` and root degree `d` (2 or 3) so that
 * `base = root^d` is a perfect square or cube, then a rational exponent
 * `k/d` whose result `root^k` is always an exact integer or unit fraction —
 * nice by construction.
 */
export function exactPowers(rng: Rng): ExactPower {
  const root = int(rng, 2, 5);
  const degree = pick(rng, [2, 3]);
  const base = root ** degree;
  const exponentNumerator = nonZeroInt(rng, -3, 3);
  const value: ExactValue =
    exponentNumerator >= 0
      ? integer(root ** exponentNumerator)
      : fraction(1, root ** -exponentNumerator);
  return {
    base,
    exponentNumerator,
    exponentDenominator: degree,
    value,
  };
}

/** A right triangle with nice integer side lengths. */
export type NiceTriangle = {
  sides: [number, number, number];
};

const MAX_NICE_HYPOTENUSE = 100;

export function niceTriangle(rng: Rng): NiceTriangle {
  return redrawUntilNice((r) => {
    const [a, b, c] = pick(r, PYTHAGOREAN_TRIPLES);
    const scale = int(r, 1, 4);
    const sides: [number, number, number] = [a * scale, b * scale, c * scale];
    return sides[2] <= MAX_NICE_HYPOTENUSE ? { sides } : null;
  }, rng);
}
