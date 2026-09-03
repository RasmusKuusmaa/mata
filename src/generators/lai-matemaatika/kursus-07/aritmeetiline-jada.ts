import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-aritmeetiline-jada";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a1 = int(rng, -9, 9);
      const d = nonZeroInt(rng, -9, 9);
      const n = int(rng, 2, 15);
      const value = a1 + (n - 1) * d;

      return {
        seed: 1,
        kysimus: `\\text{Aritmeetilise jada esimene liige on } a_1 = ${a1} \\text{ ja vahe } d = ${d}\\text{. Leia } a_{${n}}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `a_n = a_1 + (n-1)d`,
          `a_{${n}} = ${a1} + (${n}-1)\\cdot ${d} = ${a1} + ${n - 1} \\cdot ${d} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a1 = int(rng, -9, 9);
      const d = nonZeroInt(rng, -9, 9);
      const k = int(rng, 2, 12);
      const ak = a1 + (k - 1) * d;

      return {
        seed: 2,
        kysimus: `\\text{Aritmeetilise jada esimene liige on } a_1 = ${a1} \\text{ ja } a_{${k}} = ${ak}\\text{. Leia jada vahe } d\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: d },
        lahendus: [
          `a_{${k}} = a_1 + (${k}-1)d \\quad \\Rightarrow \\quad ${ak} = ${a1} + ${k - 1}d`,
          `d = \\dfrac{${ak} - ${a1}}{${k - 1}} = ${d}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a1 = int(rng, -9, 9);
      const d = nonZeroInt(rng, -9, 9);
      const m = int(rng, 2, 8);
      let k = int(rng, 2, 12);
      while (k === m) k = int(rng, 2, 12);
      const am = a1 + (m - 1) * d;
      const ak = a1 + (k - 1) * d;

      return {
        seed: 3,
        kysimus: `\\text{Aritmeetilise jada korral } a_{${m}} = ${am} \\text{ ja } a_{${k}} = ${ak}\\text{. Leia jada esimene liige } a_1\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a1 },
        lahendus: [
          `d = \\dfrac{a_{${k}} - a_{${m}}}{${k} - ${m}} = \\dfrac{${ak} - ${am}}{${k - m}} = ${d}`,
          `a_1 = a_{${m}} - (${m}-1)d = ${am} - ${m - 1} \\cdot ${d} = ${a1}`,
        ],
      };
    },
  },
];
