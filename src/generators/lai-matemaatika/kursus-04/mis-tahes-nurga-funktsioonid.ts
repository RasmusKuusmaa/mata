import { arvVaartus, niceTrigTriangle } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-mis-tahes-nurga-funktsioonid";

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
        kysimus: `\\text{Nurga } \\alpha \\text{ haar lõikab ühikringjoont punktis } \\left(\\dfrac{${b}}{${c}}, \\dfrac{${a}}{${c}}\\right)\\text{, kus } \\alpha \\text{ on I veerandi nurk. Leia } \\sin\\alpha\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(a, c) },
        lahendus: [
          `\\text{Ühikringjoonel on punkti koordinaadid } (\\cos\\alpha, \\sin\\alpha)\\text{.}`,
          `\\sin\\alpha = \\dfrac{${a}}{${c}}`,
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
        kysimus: `\\text{Nurk } \\alpha \\text{ on II veerandi nurk ja } \\sin\\alpha = \\dfrac{${a}}{${c}}\\text{. Leia } \\cos\\alpha \\text{ (koos märgiga).}`,
        vastus: { tuup: "arv", ...arvVaartus(-b, c) },
        lahendus: [
          `\\text{II veerandis on siinus positiivne ja koosinus negatiivne.}`,
          `\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\dfrac{${a * a}}{${c * c}} = \\dfrac{${b * b}}{${c * c}}`,
          `\\cos\\alpha = -\\dfrac{${b}}{${c}} \\text{ (negatiivne, sest } \\alpha \\text{ on II veerandis)}`,
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
        kysimus: `\\text{Nurk } \\alpha \\text{ on IV veerandi nurk ja } \\tg\\,\\alpha = -\\dfrac{${a}}{${b}}\\text{. Leia } \\sin\\alpha \\text{ (koos märgiga).}`,
        vastus: { tuup: "arv", ...arvVaartus(-a, c) },
        lahendus: [
          `\\text{IV veerandis on koosinus positiivne ja siinus negatiivne.}`,
          `\\text{Tangensist } -\\dfrac{${a}}{${b}} \\text{ näeme, et kaatetite suhe on } ${a}:${b}\\text{, hüpotenuus on } ${c}\\text{ (Pythagorase kolmik).}`,
          `\\sin\\alpha = -\\dfrac{${a}}{${c}} \\text{ (negatiivne, sest } \\alpha \\text{ on IV veerandis)}`,
        ],
      };
    },
  },
];
