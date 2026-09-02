/**
 * Estonian number formatting: decimal comma (2,5) and a space thousands
 * separator (12 500). Never render a raw `.` decimal point to a user.
 */

function reduceFraction(
  numerator: number,
  denominator: number,
): [number, number] {
  if (!Number.isInteger(numerator) || !Number.isInteger(denominator)) {
    throw new Error(
      "reduceFraction: numerator and denominator must be integers",
    );
  }
  if (denominator === 0) {
    throw new Error("reduceFraction: denominator cannot be zero");
  }
  const sign = numerator < 0 !== denominator < 0 ? -1 : 1;
  let n = Math.abs(numerator);
  let d = Math.abs(denominator);
  if (n === 0) return [0, 1];
  let a = n;
  let b = d;
  while (b !== 0) [a, b] = [b, a % b];
  const divisor = a || 1;
  n /= divisor;
  d /= divisor;
  return [sign * n, d];
}

/** Formats a finite number the Estonian way: "12 500,5", "-3", "0". */
export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    throw new Error(`formatNumber: not a finite number: ${value}`);
  }
  // Normalise -0 to 0.
  const normalised = value === 0 ? 0 : value;
  const negative = normalised < 0;
  const abs = Math.abs(normalised);
  const [intPart, fracPart] = abs.toString().split(".");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const sign = negative ? "-" : "";
  const frac = fracPart ? `,${fracPart}` : "";
  return `${sign}${grouped}${frac}`;
}

/** Formats an integer fraction in lowest terms, e.g. "3/4", "-2", "0". */
export function formatFraction(numerator: number, denominator: number): string {
  const [n, d] = reduceFraction(numerator, denominator);
  if (d === 1) return formatNumber(n);
  return `${n < 0 ? "-" : ""}${formatNumber(Math.abs(n))}/${formatNumber(d)}`;
}

export type ExactForm =
  | { kind: "sqrt"; radicand: number; numerator: number; denominator?: number }
  | { kind: "pi"; numerator: number; denominator?: number };

/**
 * Formats an exact irrational form such as `2√3`, `√3/2` or `-π/6`.
 * `numerator`/`denominator` describe the coefficient in front of the symbol;
 * `denominator` defaults to 1.
 */
export function formatExact(form: ExactForm): string {
  const [n, d] = reduceFraction(form.numerator, form.denominator ?? 1);
  const symbol = form.kind === "pi" ? "π" : `√${formatNumber(form.radicand)}`;

  if (n === 0) return "0";

  const magnitude = Math.abs(n);
  const coefficient = magnitude === 1 ? "" : formatNumber(magnitude);
  const sign = n < 0 ? "-" : "";
  const body = `${sign}${coefficient}${symbol}`;

  return d === 1 ? body : `${body}/${formatNumber(d)}`;
}
