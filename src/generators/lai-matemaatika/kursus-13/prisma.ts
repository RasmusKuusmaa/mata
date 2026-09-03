import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-prisma";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 2, 9);
      const h = int(rng, 2, 9);

      return {
        seed: 1,
        kysimus: `\\text{Korrapärase nelinurkse prisma põhiserv on } a=${a} \\text{ ja kõrgus } h=${h}\\text{. Leia prisma ruumala.}`,
        vastus: { tuup: "arv", ...arvVaartus(a * a * h) },
        lahendus: [
          `V = a^2 h = ${a}^2 \\cdot ${h} = ${a * a} \\cdot ${h} = ${a * a * h}`,
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
      const h = int(rng, 2, 9);
      const total = 2 * a * a + 4 * a * h;

      return {
        seed: 2,
        kysimus: `\\text{Korrapärase nelinurkse prisma põhiserv on } a=${a} \\text{ ja kõrgus } h=${h}\\text{. Leia prisma täispindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(total) },
        lahendus: [
          `S = 2a^2 + 4ah = 2\\cdot ${a}^2 + 4\\cdot ${a}\\cdot ${h} = ${2 * a * a} + ${4 * a * h} = ${total}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 2, 8);
      const h = int(rng, 2, 8);
      const numerator = a * a * h;

      return {
        seed: 3,
        kysimus: `\\text{Korrapärase kolmnurkse prisma põhiserv on } a=${a} \\text{ ja kõrgus } h=${h}\\text{. Leia prisma ruumala.}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "sqrt", radicand: 3, numerator, denominator: 4 },
        },
        lahendus: [
          `\\text{Põhi on korrapärane kolmnurk, mille pindala } S_p = \\dfrac{a^2\\sqrt3}{4} = \\dfrac{${a}^2\\sqrt3}{4} = \\dfrac{${a * a}\\sqrt3}{4}`,
          `V = S_p \\cdot h = \\dfrac{${a * a}\\sqrt3}{4}\\cdot ${h} = \\dfrac{${numerator}\\sqrt3}{4}`,
        ],
      };
    },
  },
];
