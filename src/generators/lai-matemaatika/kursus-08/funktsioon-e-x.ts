import { nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-funktsioon-e-x";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: () => {
      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = e^x\\text{. Leia } f(0)\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 1 },
        lahendus: [`f(0) = e^0 = 1 \\text{ (iga nullist erineva aluse korral)}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: () => {
      return {
        seed: 2,
        kysimus: `\\text{Milline väide funktsiooni } f(x) = e^x \\text{ kohta on tõene?}`,
        vastus: {
          tuup: "valik",
          oige: "f(x) > 0 iga x korral",
          eksitajad: ["f(x) on kahanev", "f(x) omab nullkohta", "f(x) on paaris"],
        },
        lahendus: [
          `\\text{Funktsioon } f(x)=e^x \\text{ on alati kasvav ja positiivne, tal ei ole nullkohti.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -9, 9);

      return {
        seed: 3,
        kysimus: `\\text{Lihtsusta avaldis } e^{${a}} \\cdot e^{-${a}}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 1 },
        lahendus: [
          `e^{${a}} \\cdot e^{-${a}} = e^{${a}-${a}} = e^0 = 1`,
        ],
      };
    },
  },
];
