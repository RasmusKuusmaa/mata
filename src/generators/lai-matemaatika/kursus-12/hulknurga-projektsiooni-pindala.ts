import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-hulknurga-projektsiooni-pindala";

/** S' = S cos φ, φ üks tuntud nurkadest (60°, 45°, 30°), et vastus jääks
 * kas täisarv või täpne juurega kuju. Pindala S valitud jagatavaks kahega. */
export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const half = int(rng, 3, 20);
      const S = 2 * half;

      return {
        seed: 1,
        kysimus: `\\text{Tasandilise kujundi pindala on } S=${S} \\text{ ja projektsioonitasand moodustab kujundi tasandiga nurga } 60^\\circ\\text{. Leia projektsiooni pindala.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: half },
        lahendus: [
          `S' = S\\cos60^\\circ = ${S}\\cdot\\dfrac12 = ${half}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const half = int(rng, 2, 15);
      const S = 2 * half;

      return {
        seed: 2,
        kysimus: `\\text{Tasandilise kujundi pindala on } S=${S} \\text{ ja projektsioonitasand moodustab kujundi tasandiga nurga } 45^\\circ\\text{. Leia projektsiooni pindala.}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: 2, numerator: half } },
        lahendus: [
          `S' = S\\cos45^\\circ = ${S}\\cdot\\dfrac{\\sqrt2}{2} = ${half}\\sqrt2`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const half = int(rng, 2, 12);
      const S = 2 * half;

      return {
        seed: 3,
        kysimus: `\\text{Tasandilise kujundi pindala on } S=${S} \\text{ ja projektsioonitasand moodustab kujundi tasandiga nurga } 30^\\circ\\text{. Leia projektsiooni pindala.}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: 3, numerator: half } },
        lahendus: [
          `S' = S\\cos30^\\circ = ${S}\\cdot\\dfrac{\\sqrt3}{2} = ${half}\\sqrt3`,
        ],
      };
    },
  },
];
