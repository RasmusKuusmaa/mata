import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-funktsiooni-piirvaartus";

/** Formats `x - a` / `x + a` with correct signs, e.g. `a=-3` gives `x + 3`. */
function xMinus(a: number): string {
  return a === 0 ? "x" : a > 0 ? `x - ${a}` : `x + ${-a}`;
}

function xPlus(a: number): string {
  return a === 0 ? "x" : a > 0 ? `x + ${a}` : `x - ${-a}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const p = nonZeroInt(rng, -9, 9);
      const q = int(rng, -9, 9);
      const a = int(rng, -9, 9);
      const value = p * a + q;

      return {
        seed: 1,
        kysimus: `\\text{Leia } \\lim_{x \\to ${a}} \\left(${p}x ${q >= 0 ? "+" : "-"} ${Math.abs(q)}\\right)\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Pideva funktsiooni piirväärtus leitakse otse asendades: }`,
          `${p} \\cdot ${a} ${q >= 0 ? "+" : "-"} ${Math.abs(q)} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const p = nonZeroInt(rng, -9, 9);
      const r = nonZeroInt(rng, -9, 9);
      const q = int(rng, 2, 8);
      const s = nonZeroInt(rng, -9, 9);

      return {
        seed: 2,
        kysimus: `\\text{Leia } \\lim_{x \\to \\infty} \\dfrac{${p}x ${r >= 0 ? "+" : "-"} ${Math.abs(r)}}{${q}x ${s >= 0 ? "+" : "-"} ${Math.abs(s)}}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(p, q) },
        lahendus: [
          `\\text{Jagame lugeja ja nimetaja suurima astmega } x\\text{:}`,
          `\\dfrac{${p} + \\frac{${r}}{x}}{${q} + \\frac{${s}}{x}} \\to \\dfrac{${p}}{${q}} \\text{, kui } x \\to \\infty`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -9, 9);
      const value = 2 * a;

      return {
        seed: 3,
        kysimus: `\\text{Leia } \\lim_{x \\to ${a}} \\dfrac{x^2 - ${a * a}}{${xMinus(a)}}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Tegurdame lugeja: } x^2 - ${a * a} = (${xMinus(a)})(${xPlus(a)})\\text{.}`,
          `\\lim_{x \\to ${a}} \\dfrac{(${xMinus(a)})(${xPlus(a)})}{${xMinus(a)}} = \\lim_{x \\to ${a}} (${xPlus(a)}) = ${value}`,
        ],
      };
    },
  },
];
