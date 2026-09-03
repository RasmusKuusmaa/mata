import { arvVaartus, niceTrigTriangle } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-sama-nurga-funktsioonide-seosed";

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
        kysimus: `\\text{Nurk } \\alpha \\text{ on II veerandi nurk ja } \\sin\\alpha = \\dfrac{${a}}{${c}}\\text{. Leia } \\cos\\alpha \\text{ põhiseose } \\sin^2\\alpha + \\cos^2\\alpha = 1 \\text{ abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(-b, c) },
        lahendus: [
          `\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\dfrac{${a * a}}{${c * c}} = \\dfrac{${b * b}}{${c * c}}`,
          `\\cos\\alpha = -\\dfrac{${b}}{${c}} \\text{ (negatiivne, sest } \\alpha \\text{ on II veerandis)}`,
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
        kysimus: `\\text{Nurk } \\alpha \\text{ on III veerandi nurk ja } \\cos\\alpha = -\\dfrac{${b}}{${c}}\\text{. Leia } \\sin\\alpha \\text{ põhiseose } \\sin^2\\alpha + \\cos^2\\alpha = 1 \\text{ abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(-a, c) },
        lahendus: [
          `\\sin^2\\alpha = 1 - \\cos^2\\alpha = 1 - \\dfrac{${b * b}}{${c * c}} = \\dfrac{${a * a}}{${c * c}}`,
          `\\sin\\alpha = -\\dfrac{${a}}{${c}} \\text{ (negatiivne, sest } \\alpha \\text{ on III veerandis)}`,
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
      const [a, b, c] = sides;

      return {
        seed: 3,
        kysimus: `\\text{Nurk } \\alpha \\text{ on IV veerandi nurk ja } \\tg\\,\\alpha = -\\dfrac{${a}}{${b}}\\text{. Leia } \\sin\\alpha \\text{ seose } \\tg\\,\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} \\text{ ning } \\sin^2\\alpha + \\cos^2\\alpha = 1 \\text{ abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(-a, c) },
        lahendus: [
          `\\text{Tangensist näeme, et kaatetite suhe on } ${a}:${b}\\text{, hüpotenuus on } ${c}\\text{ (Pythagorase kolmik).}`,
          `\\text{IV veerandis on koosinus positiivne ja siinus negatiivne:}`,
          `\\sin\\alpha = -\\dfrac{${a}}{${c}}`,
        ],
      };
    },
  },
];
