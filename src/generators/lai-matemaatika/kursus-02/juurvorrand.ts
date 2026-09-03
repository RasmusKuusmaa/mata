import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "02-juurvorrand";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const p = int(rng, -9, 9);
      const b = int(rng, 0, 8);
      const x = b * b - p;
      const pSign = p >= 0 ? "+" : "-";

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrrand: } \\sqrt{x ${pSign} ${Math.abs(p)}} = ${b}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Tõstame mõlemad pooled ruutu:}`,
          `x ${pSign} ${Math.abs(p)} = ${b}^2 = ${b * b}`,
          `x = ${b * b} - (${p}) = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { p, b, x } = redrawUntilNice((r) => {
        const b = int(r, 1, 9);
        const p = int(r, -9, 9);
        const x2 = b * b - p;
        return x2 > 0 && Number.isInteger(Math.sqrt(x2))
          ? { p, b, x: Math.sqrt(x2) }
          : null;
      }, rng);
      const pSign = p >= 0 ? "+" : "-";

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrrand ja leia positiivne lahend: } \\sqrt{x^2 ${pSign} ${Math.abs(p)}} = ${b}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Tõstame mõlemad pooled ruutu:}`,
          `x^2 ${pSign} ${Math.abs(p)} = ${b}^2 = ${b * b}`,
          `x^2 = ${b * b - p}\\text{, seega } x = \\pm${x}\\text{. Positiivne lahend on } ${x}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { a, c, b, d, x } = redrawUntilNice((r) => {
        let a: number, c: number;
        do {
          a = nonZeroInt(r, -6, 6);
          c = nonZeroInt(r, -6, 6);
        } while (a === c);
        const x = int(r, -8, 8);
        const k = int(r, 0, 20);
        const b = k - a * x;
        const d = k - c * x;
        return { a, c, b, d, x };
      }, rng);
      const aTerm = a === 1 ? "x" : a === -1 ? "-x" : `${a}x`;
      const cTerm = c === 1 ? "x" : c === -1 ? "-x" : `${c}x`;

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrrand: } \\sqrt{${aTerm} ${b >= 0 ? "+" : "-"} ${Math.abs(b)}} = \\sqrt{${cTerm} ${d >= 0 ? "+" : "-"} ${Math.abs(d)}}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Kui mõlemad juuremärgi all olevad avaldised on võrdsed, siis:}`,
          `${aTerm} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${cTerm} ${d >= 0 ? "+" : "-"} ${Math.abs(d)}`,
          `x = ${x}`,
        ],
      };
    },
  },
];
