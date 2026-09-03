import { arvVaartus, niceTrigTriangle } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "03-trigonomeetria-pohiseosed";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { sides } = niceTrigTriangle(rng);
      const [a, b, c] = sides;

      return {
        seed: 1,
        kysimus: `\\text{Teame, et } \\sin\\alpha = \\dfrac{${a}}{${c}} \\text{ ja } \\alpha \\text{ on teravnurk. Leia } \\cos\\alpha \\text{ põhiseose } \\sin^2\\alpha + \\cos^2\\alpha = 1 \\text{ abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(b, c) },
        lahendus: [
          `\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\dfrac{${a * a}}{${c * c}} = \\dfrac{${c * c - a * a}}{${c * c}}`,
          `\\cos\\alpha = \\dfrac{${b}}{${c}} \\text{ (positiivne, sest } \\alpha \\text{ on teravnurk)}`,
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
      const [a, b, c] = sides;

      return {
        seed: 2,
        kysimus: `\\text{Teame, et } \\sin\\alpha = \\dfrac{${a}}{${c}} \\text{ ja } \\cos\\alpha = \\dfrac{${b}}{${c}}\\text{. Leia } \\tg\\,\\alpha \\text{ põhiseose } \\tg\\,\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} \\text{ abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(a, b) },
        lahendus: [
          `\\tg\\,\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = \\dfrac{${a}/${c}}{${b}/${c}} = \\dfrac{${a}}{${b}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      // sin²α itself (c·c in the denominator) is routinely *not* nice even
      // when sinα is — e.g. 3/5 is nice, 9/25 isn't. Ask for sinα, not its
      // square, so the answer stays the already-guaranteed-nice ratio.
      const { sides } = niceTrigTriangle(rng);
      const [a, b, c] = sides;

      return {
        seed: 3,
        kysimus: `\\text{Teame, et } \\cos\\alpha = \\dfrac{${b}}{${c}} \\text{ ja } \\alpha \\text{ on teravnurk. Leia } \\sin\\alpha \\text{ põhiseose } \\sin^2\\alpha + \\cos^2\\alpha = 1 \\text{ abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(a, c) },
        lahendus: [
          `\\sin^2\\alpha = 1 - \\cos^2\\alpha = 1 - \\dfrac{${b * b}}{${c * c}} = \\dfrac{${c * c - b * b}}{${c * c}}`,
          `\\sin\\alpha = \\dfrac{${a}}{${c}} \\text{ (positiivne, sest } \\alpha \\text{ on teravnurk)}`,
        ],
      };
    },
  },
];
