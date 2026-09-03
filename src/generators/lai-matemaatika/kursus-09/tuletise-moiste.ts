import { nicelyDifferentiable } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-tuletise-moiste";

/** `Σ coefficients[i]·xⁱ` as a KaTeX-ready string, highest power first. */
function polynomialLatex(coefficients: number[]): string {
  const terms: string[] = [];
  for (let power = coefficients.length - 1; power >= 0; power--) {
    const c = coefficients[power];
    if (c === 0) continue;
    const abs = Math.abs(c);
    const sign = terms.length === 0 ? (c < 0 ? "-" : "") : c < 0 ? " - " : " + ";
    const coeffStr = power === 0 ? `${abs}` : abs === 1 ? "" : `${abs}`;
    const varStr = power === 0 ? "" : power === 1 ? "x" : `x^{${power}}`;
    terms.push(`${sign}${coeffStr}${varStr}`);
  }
  return terms.length === 0 ? "0" : terms.join("");
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const n = int(rng, 2, 4);
      const x0 = int(rng, -3, 3);
      const value = n * a * x0 ** (n - 1);

      const aCoeff = a === 1 ? "" : a === -1 ? "-" : `${a}`;

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = ${aCoeff}x^{${n}}\\text{. Leia astendaja reegli abil } f'(${x0})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `f'(x) = ${n}\\cdot(${a})x^{${n - 1}} = ${n * a}x^{${n - 1}}`,
          `f'(${x0}) = ${n * a} \\cdot ${x0}^{${n - 1}} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const b = int(rng, -9, 9);
      const x0 = int(rng, -4, 4);
      const value = 2 * a * x0 + b;

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x) = ${polynomialLatex([0, b, a])}\\text{. Leia } f'(${x0})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `f'(x) = ${polynomialLatex([b, 2 * a])}`,
          `f'(${x0}) = ${2 * a} \\cdot ${x0} + ${b} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { coefficients, x0, derivativeAtX0 } = nicelyDifferentiable(rng);
      const derivativeCoefficients = coefficients
        .map((c, power) => c * power)
        .slice(1);

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = ${polynomialLatex(coefficients)}\\text{. Leia } f'(${x0})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: derivativeAtX0 },
        lahendus: [
          `f'(x) = ${polynomialLatex(derivativeCoefficients)}`,
          `f'(${x0}) = ${derivativeAtX0}`,
        ],
      };
    },
  },
];
