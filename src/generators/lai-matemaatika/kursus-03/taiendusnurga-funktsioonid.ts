import { arvVaartus, niceTrigTriangle } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "03-taiendusnurga-funktsioonid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { sides } = niceTrigTriangle(rng);
      const [a, , c] = sides;

      return {
        seed: 1,
        kysimus: `\\text{Teame, et } \\sin\\alpha = \\dfrac{${a}}{${c}}\\text{. Leia } \\cos(90^\\circ - \\alpha)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(a, c) },
        lahendus: [
          `\\text{Täiendusnurga valem: } \\cos(90^\\circ - \\alpha) = \\sin\\alpha\\text{.}`,
          `\\cos(90^\\circ - \\alpha) = \\dfrac{${a}}{${c}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { sides } = niceTrigTriangle(rng);
      const [, b, c] = sides;

      return {
        seed: 2,
        kysimus: `\\text{Teame, et } \\cos\\alpha = \\dfrac{${b}}{${c}}\\text{. Leia } \\sin(90^\\circ - \\alpha)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(b, c) },
        lahendus: [
          `\\text{Täiendusnurga valem: } \\sin(90^\\circ - \\alpha) = \\cos\\alpha\\text{.}`,
          `\\sin(90^\\circ - \\alpha) = \\dfrac{${b}}{${c}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { sides } = niceTrigTriangle(rng);
      const [a, b] = sides;

      return {
        seed: 3,
        kysimus: `\\text{Teame, et } \\tg\\,\\alpha = \\dfrac{${a}}{${b}}\\text{. Leia } \\tg\\,(90^\\circ - \\alpha)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(b, a) },
        lahendus: [
          `\\text{Täiendusnurga valem: } \\tg\\,(90^\\circ - \\alpha) = \\ctg\\,\\alpha = \\dfrac{1}{\\tg\\,\\alpha}\\text{.}`,
          `\\tg\\,(90^\\circ - \\alpha) = \\dfrac{${b}}{${a}}`,
        ],
      };
    },
  },
];
