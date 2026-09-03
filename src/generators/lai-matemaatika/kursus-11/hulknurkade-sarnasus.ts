import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-hulknurkade-sarnasus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = int(rng, 2, 5);
      const side1 = int(rng, 2, 9);
      const side2 = side1 * k;

      return {
        seed: 1,
        kysimus: `\\text{Kaks hulknurka on sarnased. Ühe hulknurga külg on } ${side1}\\text{, sellele vastav külg teisel hulknurgal on } ${side2}\\text{. Leia sarnasustegur.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `k = \\dfrac{${side2}}{${side1}} = ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, 2, 6);
      const side1 = int(rng, 2, 9);
      const side2 = side1 * k;

      return {
        seed: 2,
        kysimus: `\\text{Kaks hulknurka on sarnased sarnasusteguriga } k=${k}\\text{. Väiksema hulknurga külg on } ${side1}\\text{. Leia vastav külg suuremal hulknurgal.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: side2 },
        lahendus: [
          `${side1} \\cdot ${k} = ${side2}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = int(rng, 2, 6);
      const side1 = int(rng, 2, 9);
      const side2 = side1 * k;

      return {
        seed: 3,
        kysimus: `\\text{Kaks hulknurka on sarnased sarnasusteguriga } k=${k}\\text{. Suurema hulknurga külg on } ${side2}\\text{. Leia vastav külg väiksemal hulknurgal.}`,
        vastus: { tuup: "arv", ...arvVaartus(side2, k) },
        lahendus: [
          `\\dfrac{${side2}}{${k}} = ${side1}`,
        ],
      };
    },
  },
];
