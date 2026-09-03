import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "10-puutuja-vorrand";

/** Formats `x - a` with correct signs, e.g. `a=-3` gives `x + 3`, `a=0` gives `x`. */
function xMinus(a: number): string {
  return a === 0 ? "x" : a > 0 ? `x - ${a}` : `x + ${-a}`;
}

/** Formats `fx0 + slope(x - x0)`, avoiding double signs and `x-0`. */
function tangentLine(fx0: number, slope: number, x0: number): string {
  const slopeTerm = `${slope >= 0 ? "+" : "-"} ${Math.abs(slope)}(${xMinus(x0)})`;
  return `${fx0} ${slopeTerm}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -4, 4);
      const b = int(rng, -9, 9);
      const c = int(rng, -9, 9);
      const x0 = int(rng, -5, 5);
      const fx0 = a * x0 * x0 + b * x0 + c;
      const slope = 2 * a * x0 + b;
      const intercept = c - a * x0 * x0;

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}\\text{. Leia puutuja võrrandi vabaliige (lõikepunkt y-teljega) kohal } x=${x0}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: intercept },
        lahendus: [
          `f(${x0}) = ${fx0}\\text{, } f'(${x0}) = ${slope}`,
          `\\text{Puutuja: } y = ${tangentLine(fx0, slope, x0)}\\text{. Kohal } x=0\\text{:}`,
          `y = ${fx0} - ${slope}\\cdot${x0} = ${intercept}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -4, 4);
      const b = int(rng, -9, 9);
      const c = int(rng, -9, 9);
      const x0 = int(rng, -5, 5);
      const x1 = int(rng, -5, 5);
      const fx0 = a * x0 * x0 + b * x0 + c;
      const slope = 2 * a * x0 + b;
      const value = fx0 + slope * (x1 - x0);

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}\\text{. Leia puutuja väärtus kohal } x=${x0} \\text{ moodustatud puutuja abil, kui } x=${x1}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `f(${x0}) = ${fx0}\\text{, } f'(${x0}) = ${slope}`,
          `\\text{Puutuja: } y = ${tangentLine(fx0, slope, x0)}`,
          `y(${x1}) = ${fx0} ${slope >= 0 ? "+" : "-"} ${Math.abs(slope)}\\cdot(${xMinus(x0)}) = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const b = int(rng, -9, 9);
      const x0 = int(rng, -4, 4);
      const fx0 = x0 * x0 * x0 + b * x0;
      const slope = 3 * x0 * x0 + b;
      const intercept = -2 * x0 * x0 * x0;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = x^3 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x\\text{. Leia puutuja võrrandi vabaliige kohal } x=${x0}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: intercept },
        lahendus: [
          `f(${x0}) = ${fx0}\\text{, } f'(${x0}) = ${slope}`,
          `\\text{Puutuja: } y = ${tangentLine(fx0, slope, x0)}\\text{. Kohal } x=0\\text{:}`,
          `y = ${fx0} - ${slope}\\cdot${x0} = ${intercept}`,
        ],
      };
    },
  },
];
