import { int, nonZeroInt, pick } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "01-n-es-juur";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = int(rng, 2, 8);
      const n = k ** 3;

      return {
        seed: 1,
        kysimus: `\\text{Arvuta: } \\sqrt[3]{${n}}`,
        vastus: { tuup: "arv", ...arvVaartus(k) },
        lahendus: [
          `\\text{Otsime arvu, mille kuup on } ${n}\\text{:}`,
          `\\sqrt[3]{${n}} = ${k}\\text{, sest } ${k}^3 = ${n}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const aste = pick(rng, [4, 5]);
      const k = int(rng, 2, 4);
      const n = k ** aste;

      return {
        seed: 2,
        kysimus: `\\text{Arvuta: } \\sqrt[${aste}]{${n}}`,
        vastus: { tuup: "arv", ...arvVaartus(k) },
        lahendus: [
          `\\text{Otsime arvu, mille aste } ${aste} \\text{ on } ${n}\\text{:}`,
          `\\sqrt[${aste}]{${n}} = ${k}\\text{, sest } ${k}^{${aste}} = ${n}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, -8, -2);
      const n = k ** 3;

      return {
        seed: 3,
        kysimus: `\\text{Arvuta: } \\sqrt[3]{${n}}`,
        vastus: { tuup: "arv", ...arvVaartus(k) },
        lahendus: [
          `\\text{Paaritu astendajaga juur on määratud ka negatiivsete arvude korral:}`,
          `\\sqrt[3]{${n}} = ${k}\\text{, sest } (${k})^3 = ${n}`,
        ],
      };
    },
  },
];
