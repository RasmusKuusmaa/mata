import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-kumera-hulknurga-sisenurkade-summa";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const n = int(rng, 3, 14);
      const sum = (n - 2) * 180;

      return {
        seed: 1,
        kysimus: `\\text{Kumeral hulknurgal on } ${n} \\text{ tippu. Leia sisenurkade summa.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: sum },
        lahendus: [
          `\\text{Sisenurkade summa} = (n-2)\\cdot180^\\circ = (${n}-2)\\cdot180^\\circ = ${sum}^\\circ`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = int(rng, 3, 14);
      const sum = (n - 2) * 180;

      return {
        seed: 2,
        kysimus: `\\text{Kumera hulknurga sisenurkade summa on } ${sum}^\\circ\\text{. Leia tippude arv.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: n },
        lahendus: [
          `(n-2)\\cdot180^\\circ = ${sum}^\\circ \\quad \\Rightarrow \\quad n-2 = ${sum / 180} \\quad \\Rightarrow \\quad n = ${n}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const n = pick(rng, [3, 4, 5, 6, 8, 9, 10, 12] as const);
      const angle = ((n - 2) * 180) / n;

      return {
        seed: 3,
        kysimus: `\\text{Korrapärasel hulknurgal on } ${n} \\text{ tippu. Leia iga sisenurga suurus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: angle },
        lahendus: [
          `\\text{Üks sisenurk} = \\dfrac{(n-2)\\cdot180^\\circ}{n} = \\dfrac{(${n}-2)\\cdot180^\\circ}{${n}} = ${angle}^\\circ`,
        ],
      };
    },
  },
];
