import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "02-absoluutvaartusega-vorrand";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const p = int(rng, -9, 9);
      const b = int(rng, 1, 9);
      const suurim = p + b;
      const vahim = p - b;
      const pSign = p >= 0 ? "-" : "+";

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrrand ja leia suurem lahend: } |x ${pSign} ${Math.abs(p)}| = ${b}`,
        vastus: { tuup: "arv", ...arvVaartus(suurim) },
        lahendus: [
          `|x - ${p}| = ${b} \\Rightarrow x - ${p} = ${b} \\text{ või } x - ${p} = -${b}`,
          `x = ${suurim} \\text{ või } x = ${vahim}\\text{. Suurem lahend on } ${suurim}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a, b, c, suurim } = redrawUntilNice((r) => {
        const a = nonZeroInt(r, 2, 8);
        const b = int(r, -9, 9);
        const c = int(r, 1, 20);
        const x1 = (c - b) / a;
        const x2 = (-c - b) / a;
        if (!Number.isInteger(x1) || !Number.isInteger(x2)) return null;
        return { a, b, c, suurim: Math.max(x1, x2) };
      }, rng);
      const bSign = b >= 0 ? "+" : "-";

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrrand ja leia suurem lahend: } |${a}x ${bSign} ${Math.abs(b)}| = ${c}`,
        vastus: { tuup: "arv", ...arvVaartus(suurim) },
        lahendus: [
          `${a}x ${bSign} ${Math.abs(b)} = ${c} \\quad \\text{või} \\quad ${a}x ${bSign} ${Math.abs(b)} = -${c}`,
          `\\text{Suurem lahend on } ${suurim}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const p = int(rng, -9, 9);
      const k = int(rng, -9, 9);
      const c = (() => {
        let v: number;
        do {
          v = int(rng, 1, 15);
        } while (v - k <= 0);
        return v;
      })();
      const b = c - k;
      const suurim = p + b;
      const vahim = p - b;
      const pSign = p >= 0 ? "-" : "+";
      const kSign = k >= 0 ? "+" : "-";

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrrand ja leia suurem lahend: } |x ${pSign} ${Math.abs(p)}| ${kSign} ${Math.abs(k)} = ${c}`,
        vastus: { tuup: "arv", ...arvVaartus(suurim) },
        lahendus: [
          `|x - ${p}| = ${c} - (${k}) = ${b}`,
          `x - ${p} = ${b} \\text{ või } x - ${p} = -${b}`,
          `x = ${suurim} \\text{ või } x = ${vahim}\\text{. Suurem lahend on } ${suurim}\\text{.}`,
        ],
      };
    },
  },
];
