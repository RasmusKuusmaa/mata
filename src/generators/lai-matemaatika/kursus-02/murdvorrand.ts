import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "02-murdvorrand";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const p = int(rng, -9, 9);
      const b = nonZeroInt(rng, 2, 8);
      const x = (() => {
        let v: number;
        do {
          v = int(rng, -9, 9);
        } while (v === p);
        return v;
      })();
      const a = b * (x - p);
      const pSign = p >= 0 ? "-" : "+";

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrrand: } \\dfrac{${a}}{x ${pSign} ${Math.abs(p)}} = ${b}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Määramispiirkond: } x \\neq ${p}\\text{. Korrutame mõlemat poolt nimetajaga:}`,
          `${a} = ${b}(x ${pSign} ${Math.abs(p)})`,
          `x = ${p} + \\dfrac{${a}}{${b}} = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { p, q, k, x } = redrawUntilNice((r) => {
        const q = int(r, -8, 8);
        const k = nonZeroInt(r, -5, 5);
        if (k === 1) return null;
        const p = int(r, -9, 9);
        const x = (k * q + p) / (k - 1);
        return Number.isInteger(x) && x !== q ? { p, q, k, x } : null;
      }, rng);
      const pSign = p >= 0 ? "+" : "-";
      const qSign = q >= 0 ? "-" : "+";

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrrand: } \\dfrac{x ${pSign} ${Math.abs(p)}}{x ${qSign} ${Math.abs(q)}} = ${k}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Määramispiirkond: } x \\neq ${q}\\text{. Korrutame mõlemat poolt nimetajaga:}`,
          `x ${pSign} ${Math.abs(p)} = ${k}(x ${qSign} ${Math.abs(q)})`,
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
      const { p, b, c, a, x } = redrawUntilNice((r) => {
        const p = int(r, -9, 9);
        const b = int(r, -6, 6);
        const c = nonZeroInt(r, -6, 6);
        if (c === b) return null;
        const x = int(r, -9, 9);
        if (x === p) return null;
        const a = (c - b) * (x - p);
        return { p, b, c, a, x };
      }, rng);
      const pSign = p >= 0 ? "-" : "+";
      const bSign = b >= 0 ? "+" : "-";

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrrand: } \\dfrac{${a}}{x ${pSign} ${Math.abs(p)}} ${bSign} ${Math.abs(b)} = ${c}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Määramispiirkond: } x \\neq ${p}\\text{. Viime vabaliikme teisele poole:}`,
          `\\dfrac{${a}}{x ${pSign} ${Math.abs(p)}} = ${c - b}`,
          `x = ${p} + \\dfrac{${a}}{${c - b}} = ${x}`,
        ],
      };
    },
  },
];
