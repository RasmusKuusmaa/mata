import { reduceFraction } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-funktsiooni-perioodilisus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const func = pick(rng, ["\\sin", "\\cos"] as const);

      return {
        seed: 1,
        kysimus: `\\text{Leia funktsiooni } y = ${func} x \\text{ periood.}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: 2 } },
        lahendus: [
          `\\text{Funktsioonid } \\sin x \\text{ ja } \\cos x \\text{ perioodid on } 2\\pi\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const func = pick(rng, ["\\sin", "\\cos"] as const);
      const k = int(rng, 2, 6);
      const [num, den] = reduceFraction(2, k);

      return {
        seed: 2,
        kysimus: `\\text{Leia funktsiooni } y = ${func}(${k}x) \\text{ periood.}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: num, denominator: den } },
        lahendus: [
          `\\text{Funktsiooni } y=${func}(${k}x) \\text{ periood on } T = \\dfrac{2\\pi}{${k}}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = int(rng, 2, 6);
      const [num, den] = reduceFraction(1, k);

      return {
        seed: 3,
        kysimus: `\\text{Leia funktsiooni } y = \\tg(${k}x) \\text{ periood.}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: num, denominator: den } },
        lahendus: [
          `\\text{Tangensfunktsiooni periood on } \\pi\\text{, seega } y=\\tg(${k}x) \\text{ periood on } T = \\dfrac{\\pi}{${k}}\\text{.}`,
        ],
      };
    },
  },
];
