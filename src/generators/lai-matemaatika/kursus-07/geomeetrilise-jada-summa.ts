import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-geomeetrilise-jada-summa";

/** `a1 · (qⁿ - 1) / (q - 1)`, always an integer for integer `a1`, `q ≠ 1`. */
function summa(a1: number, q: number, n: number): number {
  return (a1 * (q ** n - 1)) / (q - 1);
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a1 = nonZeroInt(rng, -5, 5);
      const q = 2;
      const n = int(rng, 2, 6);
      const sn = summa(a1, q, n);

      return {
        seed: 1,
        kysimus: `\\text{Geomeetrilise jada esimene liige on } a_1 = ${a1} \\text{ ja tegur } q = ${q}\\text{. Leia esimese } ${n} \\text{ liikme summa.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: sn },
        lahendus: [
          `S_n = \\dfrac{a_1(q^n-1)}{q-1}`,
          `S_{${n}} = \\dfrac{${a1}(${q}^{${n}}-1)}{${q}-1} = ${sn}`,
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
      const q = 3;
      const n = int(rng, 2, 5);
      const sn = summa(a1, q, n);

      return {
        seed: 2,
        kysimus: `\\text{Geomeetrilise jada esimene liige on } a_1 = ${a1} \\text{ ja tegur } q = ${q}\\text{. Leia esimese } ${n} \\text{ liikme summa.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: sn },
        lahendus: [
          `S_n = \\dfrac{a_1(q^n-1)}{q-1}`,
          `S_{${n}} = \\dfrac{${a1}(${q}^{${n}}-1)}{${q}-1} = ${sn}`,
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
      const q = pick(rng, [-2, -3] as const);
      const n = int(rng, 3, 6);
      const sn = summa(a1, q, n);

      return {
        seed: 3,
        kysimus: `\\text{Geomeetrilise jada esimene liige on } a_1 = ${a1} \\text{ ja tegur } q = ${q}\\text{. Leia esimese } ${n} \\text{ liikme summa.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: sn },
        lahendus: [
          `S_n = \\dfrac{a_1(q^n-1)}{q-1}`,
          `S_{${n}} = \\dfrac{${a1}\\left((${q})^{${n}}-1\\right)}{${q}-1} = ${sn}`,
        ],
      };
    },
  },
];
