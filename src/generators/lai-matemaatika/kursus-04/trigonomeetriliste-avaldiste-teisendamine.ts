import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-trigonomeetriliste-avaldiste-teisendamine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 2, 9);

      return {
        seed: 1,
        kysimus: `\\text{Lihtsusta avaldis: } ${a}(\\sin^2\\alpha + \\cos^2\\alpha)`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a },
        lahendus: [
          `\\text{Põhiseose järgi } \\sin^2\\alpha + \\cos^2\\alpha = 1\\text{:}`,
          `${a}(\\sin^2\\alpha + \\cos^2\\alpha) = ${a} \\cdot 1 = ${a}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 2, 9);
      const b = int(rng, 2, 9);

      return {
        seed: 2,
        kysimus: `\\text{Lihtsusta avaldis: } ${a}\\sin^2\\alpha + ${a}\\cos^2\\alpha + ${b}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a + b },
        lahendus: [
          `${a}\\sin^2\\alpha + ${a}\\cos^2\\alpha + ${b} = ${a}(\\sin^2\\alpha + \\cos^2\\alpha) + ${b}`,
          `\\text{Põhiseose järgi } \\sin^2\\alpha + \\cos^2\\alpha = 1\\text{:}`,
          `= ${a} \\cdot 1 + ${b} = ${a + b}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 2, 9);
      const b = int(rng, 2, 9);

      return {
        seed: 3,
        kysimus: `\\text{Lihtsusta avaldis: } ${a}\\cos^2\\alpha\\,(1 + \\tg^2\\alpha) + ${b}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a + b },
        lahendus: [
          `\\text{Kasutame seost } 1 + \\tg^2\\alpha = \\dfrac{1}{\\cos^2\\alpha}\\text{:}`,
          `${a}\\cos^2\\alpha \\cdot \\dfrac{1}{\\cos^2\\alpha} + ${b} = ${a} + ${b} = ${a + b}`,
        ],
      };
    },
  },
];
