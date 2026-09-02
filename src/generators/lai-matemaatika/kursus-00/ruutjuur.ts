import { int, pick } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-ruutjuur";
const SQUAREFREE_SMALL = [2, 3, 5, 6, 7, 10, 11];
const SQUAREFREE_LARGE = [13, 14, 15, 17, 19, 21, 22];

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = int(rng, 2, 15);
      const n = k * k;

      return {
        seed: 1,
        kysimus: `\\text{Arvuta: } \\sqrt{${n}}`,
        vastus: { tuup: "arv", ...arvVaartus(k) },
        lahendus: [
          `\\text{Otsime arvu, mille ruut on } ${n}\\text{:}`,
          `\\sqrt{${n}} = ${k}\\text{, sest } ${k}^2 = ${n}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = int(rng, 2, 6);
      const m = pick(rng, SQUAREFREE_SMALL);
      const n = k * k * m;

      return {
        seed: 2,
        kysimus: `\\text{Lihtsusta: } \\sqrt{${n}}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: m, numerator: k } },
        lahendus: [
          `\\text{Eraldame suurima täisruudust teguri: } ${n} = ${k * k} \\cdot ${m}\\text{.}`,
          `\\sqrt{${n}} = \\sqrt{${k * k} \\cdot ${m}} = \\sqrt{${k * k}} \\cdot \\sqrt{${m}} = ${k}\\sqrt{${m}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = int(rng, 3, 9);
      const m = pick(rng, SQUAREFREE_LARGE);
      const n = k * k * m;

      return {
        seed: 3,
        kysimus: `\\text{Lihtsusta: } \\sqrt{${n}}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: m, numerator: k } },
        lahendus: [
          `\\text{Eraldame suurima täisruudust teguri: } ${n} = ${k * k} \\cdot ${m}\\text{.}`,
          `\\sqrt{${n}} = \\sqrt{${k * k} \\cdot ${m}} = \\sqrt{${k * k}} \\cdot \\sqrt{${m}} = ${k}\\sqrt{${m}}`,
        ],
      };
    },
  },
];
