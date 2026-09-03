import { SPECIAL_ANGLES, arvVaartus, reduceFraction } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-kolmnurga-pindala-valemid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 3, 15);
      const b = int(rng, 3, 15);

      return {
        seed: 1,
        kysimus: `\\text{Kolmnurga kaks külge on } ${a} \\text{ ja } ${b}\\text{, nendevaheline nurk on } 90^\\circ\\text{. Leia kolmnurga pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(a * b, 2) },
        lahendus: [
          `S = \\dfrac{1}{2}ab\\sin C\\text{, kus } \\sin\\,90^\\circ = 1\\text{:}`,
          `S = \\dfrac{1}{2} \\cdot ${a} \\cdot ${b} \\cdot 1 = \\dfrac{${a * b}}{2}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 3, 15);
      const b = int(rng, 3, 15);

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurga kaks külge on } ${a} \\text{ ja } ${b}\\text{, nendevaheline nurk on } 30^\\circ\\text{. Leia kolmnurga pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(a * b, 4) },
        lahendus: [
          `S = \\dfrac{1}{2}ab\\sin C\\text{, kus } \\sin\\,30^\\circ = \\dfrac{1}{2}\\text{:}`,
          `S = \\dfrac{1}{2} \\cdot ${a} \\cdot ${b} \\cdot \\dfrac{1}{2} = \\dfrac{${a * b}}{4}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 3, 15);
      const b = int(rng, 3, 15);
      const angle = pick(rng, [45, 60] as const);
      const sinC = SPECIAL_ANGLES[angle].sin;
      if (sinC.kind !== "sqrt") throw new Error("unreachable: sin 45/60 is a sqrt form");
      const [num, den] = reduceFraction(a * b * sinC.numerator, 2 * (sinC.denominator ?? 1));

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurga kaks külge on } ${a} \\text{ ja } ${b}\\text{, nendevaheline nurk on } ${angle}^\\circ\\text{. Leia kolmnurga pindala.}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "sqrt", radicand: sinC.radicand, numerator: num, denominator: den },
        },
        lahendus: [
          `S = \\dfrac{1}{2}ab\\sin C\\text{, kus } \\sin\\,${angle}^\\circ = \\dfrac{\\sqrt{${sinC.radicand}}}{2}\\text{:}`,
          `S = \\dfrac{1}{2} \\cdot ${a} \\cdot ${b} \\cdot \\dfrac{\\sqrt{${sinC.radicand}}}{2} = \\dfrac{${num}\\sqrt{${sinC.radicand}}}{${den}}`,
        ],
      };
    },
  },
];
