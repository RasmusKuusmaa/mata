import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-lineaarvorrand";

/** Formats `coef·x + konst` with correct signs, dropping a zero constant. */
function linearString(coef: number, konst: number): string {
  const xTerm = coef === 1 ? "x" : coef === -1 ? "-x" : `${coef}x`;
  if (konst === 0) return xTerm;
  const sign = konst > 0 ? "+" : "-";
  return `${xTerm} ${sign} ${Math.abs(konst)}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 2, 9);
      const x = int(rng, -9, 9);
      const b = int(rng, -9, 9);
      const c = a * x + b;

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrrand: } ${linearString(a, b)} = ${c}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Viime tundmatuga liikme ühele ja arvu teisele poole:}`,
          `${a}x = ${c} - (${b}) = ${c - b}`,
          `x = \\dfrac{${c - b}}{${a}} = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a, d } = (() => {
        let a: number, d: number;
        do {
          a = nonZeroInt(rng, -6, 6);
          d = nonZeroInt(rng, -6, 6);
        } while (a === d);
        return { a, d };
      })();
      const x = int(rng, -8, 8);
      const b = int(rng, -9, 9);
      const e = (a - d) * x + b;

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrrand: } ${linearString(a, b)} = ${linearString(d, e)}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Viime tundmatuga liikmed ühele ja arvud teisele poole:}`,
          `${a}x - ${d}x = ${e} - (${b})`,
          `${a - d}x = ${e - b}`,
          `x = \\dfrac{${e - b}}{${a - d}} = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 2, 8);
      const x = int(rng, -8, 8);
      const b = int(rng, -9, 9);
      const c = a * (x - b);
      const bSign = b >= 0 ? "-" : "+";

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrrand: } ${a}(x ${bSign} ${Math.abs(b)}) = ${c}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Avame sulud:}`,
          `${linearString(a, -a * b)} = ${c}`,
          `${a}x = ${c} + (${a * b}) = ${c + a * b}`,
          `x = \\dfrac{${c + a * b}}{${a}} = ${x}`,
        ],
      };
    },
  },
];
