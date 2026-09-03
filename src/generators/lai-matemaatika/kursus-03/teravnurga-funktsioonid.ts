import { arvVaartus, niceTrigTriangle } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "03-teravnurga-funktsioonid";

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
        kysimus: `\\text{Täisnurkse kolmnurga kaatetid on } ${a} \\text{ ja } ${b}\\text{, hüpotenuus } ${c}\\text{. Leia kaatetile } ${a} \\text{ vastandnurga siinus.}`,
        vastus: { tuup: "arv", ...arvVaartus(a, c) },
        lahendus: [
          `\\text{Siinus on vastaskaateti ja hüpotenuusi suhe:}`,
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
      const [a, b] = sides;

      return {
        seed: 2,
        kysimus: `\\text{Täisnurkse kolmnurga kaatetid on } ${a} \\text{ ja } ${b}\\text{. Leia kaatetile } ${a} \\text{ vastandnurga tangens.}`,
        vastus: { tuup: "arv", ...arvVaartus(a, b) },
        lahendus: [
          `\\text{Tangens on vastaskaateti ja lähiskaateti suhe:}`,
          `\\tg\\,\\alpha = \\dfrac{${a}}{${b}}`,
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
        kysimus: `\\text{Täisnurkses kolmnurgas on nurga } \\alpha \\text{ tangens } \\tg\\,\\alpha = \\dfrac{${a}}{${b}} \\text{ ja hüpotenuus } ${c}\\text{. Leia } \\cos\\alpha\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(b, c) },
        lahendus: [
          `\\text{Tangensist } \\dfrac{${a}}{${b}} \\text{ näeme, et kaatetid on võrdelised arvudega } ${a} \\text{ ja } ${b}\\text{, hüpotenuus } ${c}\\text{ (Pythagorase kolmik).}`,
          `\\cos\\alpha = \\dfrac{${b}}{${c}}`,
        ],
      };
    },
  },
];
