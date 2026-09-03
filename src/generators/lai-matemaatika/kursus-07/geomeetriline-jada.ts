import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-geomeetriline-jada";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a1 = nonZeroInt(rng, -5, 5);
      const q = pick(rng, [2, 3, -2, -3] as const);
      const n = int(rng, 2, 5);
      const value = a1 * q ** (n - 1);

      return {
        seed: 1,
        kysimus: `\\text{Geomeetrilise jada esimene liige on } a_1 = ${a1} \\text{ ja tegur } q = ${q}\\text{. Leia } a_{${n}}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `a_n = a_1 \\cdot q^{n-1}`,
          `a_{${n}} = ${a1} \\cdot ${q}^{${n - 1}} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a1 = nonZeroInt(rng, -5, 5);
      const q = pick(rng, [2, 3, 4, -2, -3, -4] as const);
      const a2 = a1 * q;

      return {
        seed: 2,
        kysimus: `\\text{Geomeetrilise jada esimene liige on } a_1 = ${a1} \\text{ ja teine liige } a_2 = ${a2}\\text{. Leia jada tegur } q\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: q },
        lahendus: [
          `q = \\dfrac{a_2}{a_1} = \\dfrac{${a2}}{${a1}} = ${q}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a1 = pick(rng, [1, 2, -1, -2] as const);
      const q = pick(rng, [2, 3, -2, -3] as const);
      const n = int(rng, 5, 7);
      const value = a1 * q ** (n - 1);

      return {
        seed: 3,
        kysimus: `\\text{Geomeetrilise jada esimene liige on } a_1 = ${a1} \\text{ ja tegur } q = ${q}\\text{. Leia } a_{${n}}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `a_n = a_1 \\cdot q^{n-1}`,
          `a_{${n}} = ${a1} \\cdot ${q}^{${n - 1}} = ${value}`,
        ],
      };
    },
  },
];
