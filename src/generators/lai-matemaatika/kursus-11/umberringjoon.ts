import { arvVaartus, reduceFraction } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-umberringjoon";

const PYTHAGOREAN_TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [a, b, c] = pick(rng, PYTHAGOREAN_TRIPLES);
      const t = int(rng, 1, 6);

      return {
        seed: 1,
        kysimus: `\\text{Täisnurkse kolmnurga kaatetid on } ${a * t} \\text{ ja } ${b * t}\\text{, hüpotenuus } ${c * t}\\text{. Leia ümberringjoone raadius.}`,
        vastus: { tuup: "arv", ...arvVaartus(c * t, 2) },
        lahendus: [
          `\\text{Täisnurkse kolmnurga ümberringjoone raadius on pool hüpotenuusist:}`,
          `R = \\dfrac{${c * t}}{2}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const t = int(rng, 1, 8);
      const c = 7 * t;
      const [num, den] = reduceFraction(c, 3);

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurga küljele } c=${c} \\text{ vastasnurk on } C=60^\\circ\\text{. Leia ümberringjoone raadius (} 2R=\\dfrac{c}{\\sin C}\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: 3, numerator: num, denominator: den } },
        lahendus: [
          `2R = \\dfrac{c}{\\sin C} = \\dfrac{${c}}{\\sqrt3/2} = \\dfrac{2\\cdot${c}}{\\sqrt3} = \\dfrac{${2 * c}\\sqrt3}{3}`,
          `R = \\dfrac{${c}\\sqrt3}{3} = \\dfrac{${num}\\sqrt3}{${den}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const t = int(rng, 1, 8);
      const c = 13 * t;
      const [num, den] = reduceFraction(c, 3);

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurga küljele } c=${c} \\text{ vastasnurk on } C=120^\\circ\\text{. Leia ümberringjoone raadius (} 2R=\\dfrac{c}{\\sin C}\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: 3, numerator: num, denominator: den } },
        lahendus: [
          `2R = \\dfrac{c}{\\sin C} = \\dfrac{${c}}{\\sqrt3/2} = \\dfrac{2\\cdot${c}}{\\sqrt3} = \\dfrac{${2 * c}\\sqrt3}{3}`,
          `R = \\dfrac{${c}\\sqrt3}{3} = \\dfrac{${num}\\sqrt3}{${den}}`,
        ],
      };
    },
  },
];
