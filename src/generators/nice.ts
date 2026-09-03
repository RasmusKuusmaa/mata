import type { ExactForm } from "@/lib/format/number";
import { int, nonZeroInt, pick } from "./rng";
import type { ArvVaartus, Rng, Vastus } from "./types";

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
 * Parenthesizes a negative value substituted as the base of a power in a
 * rendered LaTeX string — bare `-2^2` reads as `-(2^2)=-4` under standard
 * precedence, not the intended `(-2)^2=4`. Use whenever a possibly-negative
 * drawn value (a function input, a coordinate) is raised to a power in a
 * `lahendus` step. Positive/zero values need no parentheses.
 */
export function alus(v: number): string {
  return v < 0 ? `(${v})` : `${v}`;
}

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

function arvVaartusToNumber(value: ArvVaartus): number {
  return value.kuju === "taisarv" ? value.vaartus : value.lugeja / value.nimetaja;
}

/** Converts an `ExactValue` into the `Vastus` a generator hands back: `arv`
 * for a plain integer/fraction, `tapne` for an exact irrational form. */
export function exactValueToVastus(value: ExactValue): Vastus {
  switch (value.kind) {
    case "integer":
      return { tuup: "arv", ...arvVaartus(value.value) };
    case "fraction":
      return { tuup: "arv", ...arvVaartus(value.numerator, value.denominator) };
    case "sqrt":
      return {
        tuup: "tapne",
        vorm: {
          kind: "sqrt",
          radicand: value.radicand,
          numerator: value.numerator,
          denominator: value.denominator,
        },
      };
    case "pi":
      return {
        tuup: "tapne",
        vorm: { kind: "pi", numerator: value.numerator, denominator: value.denominator },
      };
  }
}

/** Renders an `ExactValue` as a KaTeX-ready fraction/root expression, for
 * embedding a known value (e.g. a `SPECIAL_ANGLES` entry) in a question or
 * solution step. */
export function exactValueToLatex(value: ExactValue): string {
  switch (value.kind) {
    case "integer":
      return `${value.value}`;
    case "fraction": {
      const [n, d] = reduceFraction(value.numerator, value.denominator);
      return d === 1 ? `${n}` : `\\dfrac{${n}}{${d}}`;
    }
    case "sqrt": {
      const [n, d] = reduceFraction(value.numerator, value.denominator ?? 1);
      const magnitude = Math.abs(n);
      const sign = n < 0 ? "-" : "";
      const coefficient = magnitude === 1 ? "" : `${magnitude}`;
      const body = `${sign}${coefficient}\\sqrt{${value.radicand}}`;
      return d === 1 ? body : `\\dfrac{${body}}{${d}}`;
    }
    case "pi": {
      const [n, d] = reduceFraction(value.numerator, value.denominator ?? 1);
      const magnitude = Math.abs(n);
      const sign = n < 0 ? "-" : "";
      const coefficient = magnitude === 1 ? "" : `${magnitude}`;
      const body = `${sign}${coefficient}\\pi`;
      return d === 1 ? body : `\\dfrac{${body}}{${d}}`;
    }
  }
}

/** Reduces a fraction to lowest terms with the sign on the numerator, e.g.
 * `(6, -8) -> (-3, 4)`. Generators use this to present an arithmetic
 * result (a fraction sum, product, ...) as the reduced answer a student
 * would actually write down. */
export function reduceFraction(
  numerator: number,
  denominator: number,
): [number, number] {
  const sign = numerator < 0 !== denominator < 0 ? -1 : 1;
  let n = Math.abs(numerator);
  const d = Math.abs(denominator);
  if (n === 0) return [0, 1];
  let a = n;
  let b = d;
  while (b !== 0) [a, b] = [b, a % b];
  const divisor = a || 1;
  n /= divisor;
  return [sign * n, d / divisor];
}

/** Builds a reduced `ArvVaartus` from a numerator/denominator pair —
 * `taisarv` when it reduces to a whole number, `murd` otherwise. The
 * common way generators turn an arithmetic result into an answer. */
export function arvVaartus(numerator: number, denominator = 1): ArvVaartus {
  const [n, d] = reduceFraction(numerator, denominator);
  return d === 1
    ? { kuju: "taisarv", vaartus: n }
    : { kuju: "murd", lugeja: n, nimetaja: d };
}

/**
 * Checks whether a generated `Vastus` counts as nice. `arv`/`hulk` values
 * are checked numerically via `isNice`; `tapne` (an exact irrational form)
 * and `valik` (a choice among strings) are nice by construction — there is
 * no numeric niceness question to ask of them.
 */
export function vastusIsNice(vastus: Vastus): boolean {
  switch (vastus.tuup) {
    case "arv":
      return isNice(arvVaartusToNumber(vastus));
    case "hulk":
      return vastus.vaartused.every((v) => isNice(arvVaartusToNumber(v)));
    case "tapne":
    case "valik":
      return true;
  }
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

/**
 * The only entries in `PYTHAGOREAN_TRIPLES` whose side ratios are all nice
 * fractions (denominator ≤ 12) once reduced — every other triple's
 * hypotenuse is a prime (or has a prime factor) greater than 12, e.g.
 * `5/13` from `(5, 12, 13)`. A right triangle's angle can only stand in
 * for a trig-ratio question (sin/cos/tan as a plain fraction, not an
 * evaluated decimal) when its sides come from here — `niceTriangle`'s
 * full list is for topics that only need integer side lengths, not ratios.
 */
export const NICE_TRIG_TRIPLES: readonly [number, number, number][] = [
  [3, 4, 5],
  [6, 8, 10],
  [9, 12, 15],
  [12, 16, 20],
  [15, 20, 25],
];

export function niceTrigTriangle(rng: Rng): NiceTriangle {
  const [a, b, c] = pick(rng, NICE_TRIG_TRIPLES);
  return { sides: [a, b, c] };
}

/**
 * Integer 3D vectors `(x, y, z)` whose length is itself a nice integer
 * (`x²+y²+z²` a perfect square — a "Pythagorean quadruple") — course 12's
 * (Sirge ja tasand ruumis) equivalent of `PYTHAGOREAN_TRIPLES`, used so an
 * angle-between-vectors question's cosine has a chance of reducing to a
 * nice fraction instead of an arbitrary surd.
 */
export const NICE_3D_VECTORS: readonly [number, number, number, number][] = [
  [1, 2, 2, 3],
  [2, 3, 6, 7],
  [2, 6, 9, 11],
  [1, 4, 8, 9],
  [4, 4, 7, 9],
  [6, 6, 7, 11],
  [3, 4, 12, 13],
  [2, 10, 11, 15],
];

/** One of `NICE_3D_VECTORS`' component sets, with each axis independently
 * and randomly sign-flipped — the shared magnitude is sign-independent, so
 * this multiplies the pool's variety without touching niceness. */
function signedNiceVector(rng: Rng): [number, number, number, number] {
  const [x, y, z, len] = pick(rng, NICE_3D_VECTORS);
  return [x * pick(rng, [1, -1] as const), y * pick(rng, [1, -1] as const), z * pick(rng, [1, -1] as const), len];
}

/**
 * Two `NICE_3D_VECTORS` entries (independently sign-flipped) whose angle's
 * cosine reduces to a nice fraction — rejection-sampled via
 * `redrawUntilNice` rather than curated pair-by-pair, since sign flips
 * alone already give each base pair several candidate cosines to try.
 */
export type NiceVectorAnglePair = {
  a: [number, number, number];
  b: [number, number, number];
  /** Signed dot product and the (always positive) product of magnitudes —
   * callers form `arvVaartus(dot, denom)` for a signed angle (two vectors)
   * or `arvVaartus(Math.abs(dot), denom)` for an always-acute angle (two
   * lines, or a line and a plane's normal). */
  dot: number;
  denom: number;
};

export function niceVectorAnglePair(rng: Rng): NiceVectorAnglePair {
  return redrawUntilNice((r) => {
    const [ax, ay, az, alen] = signedNiceVector(r);
    const [bx, by, bz, blen] = signedNiceVector(r);
    const dot = ax * bx + ay * by + az * bz;
    const denom = alen * blen;
    if (!isNice(dot / denom)) return null;
    return { a: [ax, ay, az], b: [bx, by, bz], dot, denom };
  }, rng);
}
