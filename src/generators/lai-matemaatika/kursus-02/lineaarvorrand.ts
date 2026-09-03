import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "02-lineaarvorrand";

function bracket(a: number, p: number): string {
  const sign = p >= 0 ? "+" : "-";
  return `${a}(x ${sign} ${Math.abs(p)})`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 2, 8);
      const p = int(rng, -9, 9);
      const x = int(rng, -9, 9);
      const c = a * (x + p);

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrrand: } ${bracket(a, p)} = ${c}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Avame sulud ja lahendame:}`,
          `${a}x ${a * p >= 0 ? "+" : "-"} ${Math.abs(a * p)} = ${c}`,
          `x = \\dfrac{${c} - (${a * p})}{${a}} = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      // a(x+p) = c(x+q) → x = (cq - ap) / (a - c). Pick everything except
      // x, then solve for x and keep only draws where it lands on an
      // integer — computing x this way (rather than picking x and
      // rounding some derived q) guarantees the shown equation's real
      // solution is exactly the answer we grade against.
      const { a, c, p, q, x } = redrawUntilNice((r) => {
        let a: number, c: number;
        do {
          a = nonZeroInt(r, -6, 6);
          c = nonZeroInt(r, -6, 6);
        } while (a === c);
        const p = int(r, -8, 8);
        const q = int(r, -8, 8);
        const x = (c * q - a * p) / (a - c);
        return Number.isInteger(x) ? { a, c, p, q, x } : null;
      }, rng);

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrrand: } ${bracket(a, p)} = ${bracket(c, q)}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Avame mõlemad sulud ja koondame tundmatuga liikmed:}`,
          `${a}x ${a * p >= 0 ? "+" : "-"} ${Math.abs(a * p)} = ${c}x ${c * q >= 0 ? "+" : "-"} ${Math.abs(c * q)}`,
          `x = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 2, 6);
      const b = int(rng, -9, 9);
      // A multiple of a keeps x/a — and so the right-hand side — an integer.
      const x = a * int(rng, -6, 6);
      const c = x / a + b;

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrrand: } \\dfrac{x}{${a}} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${c}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Korrutame kogu võrrandi arvuga } ${a}\\text{:}`,
          `x ${a * b >= 0 ? "+" : "-"} ${Math.abs(a * b)} = ${a * c}`,
          `x = ${a * c} - (${a * b}) = ${x}`,
        ],
      };
    },
  },
];
