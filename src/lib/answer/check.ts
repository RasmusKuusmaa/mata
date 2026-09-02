import type { ExactForm } from "@/lib/format/number";
import type { ArvVaartus, Vastus } from "@/generators/types";

const EPSILON = 1e-9;

/** Strips spaces used as thousands separators between two digits, e.g.
 * "12 500" → "12500". Deliberately narrow: a space next to anything but a
 * digit on both sides (a fraction's "/", a list's ",") is left alone. */
function stripThousandsSeparators(raw: string): string {
  return raw.replace(/(?<=\d) (?=\d)/g, "");
}

/**
 * Parses a plain rational number from free-text user input: integers, the
 * Estonian decimal comma (a plain "." is also tolerated, for typing
 * convenience), spaced thousands, and a simple "a/b" fraction. Mixed
 * numbers ("1 1/2") are not supported — not part of the ainekava's answer
 * conventions. Returns `null` when the input doesn't parse.
 */
export function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed.length === 0) return null;

  // Checked against the untouched input: stripping thousands separators
  // first would turn "1 1/2" into "11/2" (5.5) instead of rejecting the
  // unsupported mixed number.
  const fractionMatch = trimmed.match(/^(-?\d+)\s*\/\s*(-?\d+)$/);
  if (fractionMatch) {
    const numerator = Number(fractionMatch[1]);
    const denominator = Number(fractionMatch[2]);
    if (denominator === 0) return null;
    return numerator / denominator;
  }

  const normalised = stripThousandsSeparators(trimmed).replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(normalised)) return null;

  const value = Number(normalised);
  return Number.isFinite(value) ? value : null;
}

const EXACT_FORM_PATTERN =
  /^(-?\d+(?:[.,]\d+)?)?\s*(√\s*\d+|sqrt\(\s*\d+\s*\)|π|pi)\s*(?:\/\s*(\d+))?$/i;

/**
 * Parses an exact irrational form such as "2√3", "√3/2", "-π/6" or "2pi"
 * to its numeric value. Deliberately narrow — a fixed "coefficient · symbol
 * / denominator" shape, not a general expression grammar (no CAS). Returns
 * `null` when the input doesn't match that shape.
 */
export function parseExactForm(raw: string): number | null {
  const match = raw.trim().match(EXACT_FORM_PATTERN);
  if (!match) return null;

  const [, coefficientRaw, symbolRaw, denominatorRaw] = match;

  const coefficient = coefficientRaw
    ? Number(coefficientRaw.replace(",", "."))
    : 1;
  if (!Number.isFinite(coefficient)) return null;

  const denominator = denominatorRaw ? Number(denominatorRaw) : 1;
  if (denominator === 0) return null;

  const symbol = symbolRaw.toLowerCase().replace(/\s+/g, "");
  let symbolValue: number;
  if (symbol === "π" || symbol === "pi") {
    symbolValue = Math.PI;
  } else {
    const radicandMatch = symbol.match(/^(?:√|sqrt\()(\d+)\)?$/);
    if (!radicandMatch) return null;
    symbolValue = Math.sqrt(Number(radicandMatch[1]));
  }

  return (coefficient / denominator) * symbolValue;
}

function arvVaartusToNumber(value: ArvVaartus): number {
  return value.kuju === "taisarv" ? value.vaartus : value.lugeja / value.nimetaja;
}

function exactFormToNumber(vorm: ExactForm): number {
  const symbolValue = vorm.kind === "pi" ? Math.PI : Math.sqrt(vorm.radicand);
  return (vorm.numerator / (vorm.denominator ?? 1)) * symbolValue;
}

/** Rounds away float noise before comparing/deduping a set of values. */
function roundForSet(value: number): number {
  return Math.round(value / EPSILON) * EPSILON;
}

/** Checks free-text input against an `{ tuup: "arv" }` answer. */
function checkArv(input: string, expected: number): boolean {
  const parsed = parseNumber(input);
  return parsed !== null && Math.abs(parsed - expected) < EPSILON;
}

/**
 * Checks free-text input against a `{ tuup: "tapne" }` answer. Only exact
 * form is accepted — a typed decimal approximation is a wrong answer here,
 * on purpose: the point of asking for an exact answer is that a decimal
 * doesn't satisfy it.
 */
function checkTapne(input: string, vorm: ExactForm): boolean {
  const parsed = parseExactForm(input);
  return parsed !== null && Math.abs(parsed - exactFormToNumber(vorm)) < EPSILON;
}

/** Checks a chosen option's text against a `{ tuup: "valik" }` answer. */
function checkValik(input: string, oige: string): boolean {
  return input.trim() === oige.trim();
}

/**
 * Checks free-text input against a `{ tuup: "hulk" }` answer: a
 * comma/semicolon-separated list of numbers, compared as a set —
 * order-free, and tolerant of the user (or the answer) repeating a value.
 */
function checkHulk(input: string, expected: ArvVaartus[]): boolean {
  const parsedParts = input
    .split(/[,;]/)
    .map((part) => parseNumber(part))
    .filter((value): value is number => value !== null);
  if (parsedParts.length === 0) return false;

  const expectedSet = new Set(
    expected.map((v) => roundForSet(arvVaartusToNumber(v))),
  );
  const actualSet = new Set(parsedParts.map(roundForSet));

  if (expectedSet.size !== actualSet.size) return false;
  for (const value of expectedSet) {
    if (!actualSet.has(value)) return false;
  }
  return true;
}

/**
 * Checks free-text (or, for `valik`, chosen-option) input against a
 * generated `Vastus`, using the comparison semantics for its `tuup`.
 * Never throws on malformed input — an unparseable answer is simply wrong.
 */
export function checkAnswer(input: string, vastus: Vastus): boolean {
  switch (vastus.tuup) {
    case "arv":
      return checkArv(input, arvVaartusToNumber(vastus));
    case "tapne":
      return checkTapne(input, vastus.vorm);
    case "valik":
      return checkValik(input, vastus.oige);
    case "hulk":
      return checkHulk(input, vastus.vaartused);
  }
}
