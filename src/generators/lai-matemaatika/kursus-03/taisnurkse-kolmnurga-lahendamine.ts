import { arvVaartus, niceTrigTriangle } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "03-taisnurkse-kolmnurga-lahendamine";

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
        kysimus: `\\text{Täisnurkse kolmnurga kaatetid on } ${a} \\text{ ja } ${b}\\text{. Leia hüpotenuus.}`,
        vastus: { tuup: "arv", ...arvVaartus(c) },
        lahendus: [
          `c = \\sqrt{a^2+b^2} = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a + b * b}} = ${c}`,
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
      const [a, , c] = sides;

      return {
        seed: 2,
        kysimus: `\\text{Täisnurkse kolmnurga hüpotenuus on } ${c} \\text{ ja nurga } \\alpha \\text{ siinus on } \\sin\\alpha = \\dfrac{${a}}{${c}}\\text{. Leia nurgale } \\alpha \\text{ vastandkaatet.}`,
        vastus: { tuup: "arv", ...arvVaartus(a) },
        lahendus: [
          `\\text{Vastaskaatet leitakse valemist } a = c \\cdot \\sin\\alpha\\text{:}`,
          `a = ${c} \\cdot \\dfrac{${a}}{${c}} = ${a}`,
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
        kysimus: `\\text{Täisnurkse kolmnurga üks kaatet on } ${b} \\text{ ja lähisnurga } \\alpha \\text{ tangens on } \\tg\\,\\alpha = \\dfrac{${a}}{${b}}\\text{. Leia teine kaatet.}`,
        vastus: { tuup: "arv", ...arvVaartus(a) },
        lahendus: [
          `\\text{Vastaskaatet leitakse valemist } a = b \\cdot \\tg\\,\\alpha\\text{:}`,
          `a = ${b} \\cdot \\dfrac{${a}}{${b}} = ${a}`,
        ],
      };
    },
  },
];
