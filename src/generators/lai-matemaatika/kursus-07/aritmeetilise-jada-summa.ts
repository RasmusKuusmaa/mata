import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-aritmeetilise-jada-summa";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a1 = int(rng, -9, 9);
      const d = nonZeroInt(rng, -9, 9);
      const n = int(rng, 2, 15);
      const sumNumerator = n * (2 * a1 + (n - 1) * d);

      return {
        seed: 1,
        kysimus: `\\text{Aritmeetilise jada esimene liige on } a_1 = ${a1} \\text{ ja vahe } d = ${d}\\text{. Leia esimese } ${n} \\text{ liikme summa.}`,
        vastus: { tuup: "arv", ...arvVaartus(sumNumerator, 2) },
        lahendus: [
          `S_n = \\dfrac{n\\left(2a_1+(n-1)d\\right)}{2}`,
          `S_{${n}} = \\dfrac{${n}\\left(2\\cdot ${a1}+(${n}-1)\\cdot ${d}\\right)}{2} = \\dfrac{${sumNumerator}}{2}`,
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
      const n = int(rng, 2, 15);
      const an = a1 + (n - 1) * d;
      const sumNumerator = n * (a1 + an);

      return {
        seed: 2,
        kysimus: `\\text{Aritmeetilise jada korral } a_1 = ${a1} \\text{ ja } a_{${n}} = ${an}\\text{. Leia esimese } ${n} \\text{ liikme summa.}`,
        vastus: { tuup: "arv", ...arvVaartus(sumNumerator, 2) },
        lahendus: [
          `S_n = \\dfrac{n(a_1+a_n)}{2}`,
          `S_{${n}} = \\dfrac{${n}(${a1}+${an})}{2} = \\dfrac{${sumNumerator}}{2}`,
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
      const n = int(rng, 2, 15);
      const sn = n * (2 * a1 + (n - 1) * d) / 2;

      return {
        seed: 3,
        kysimus: `\\text{Aritmeetilise jada vahe on } d = ${d} \\text{ ja esimese } ${n} \\text{ liikme summa } S_{${n}} = ${sn}\\text{. Leia jada esimene liige } a_1\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a1 },
        lahendus: [
          `S_n = \\dfrac{n\\left(2a_1+(n-1)d\\right)}{2} \\quad \\Rightarrow \\quad 2S_n = n\\left(2a_1+(n-1)d\\right)`,
          `2 \\cdot ${sn} = ${n}\\left(2a_1 + ${n - 1}\\cdot ${d}\\right) \\quad \\Rightarrow \\quad a_1 = ${a1}`,
        ],
      };
    },
  },
];
