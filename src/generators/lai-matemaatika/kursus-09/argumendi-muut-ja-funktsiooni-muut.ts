import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-argumendi-muut-ja-funktsiooni-muut";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -9, 9);
      const b = int(rng, -9, 9);
      const deltaX = nonZeroInt(rng, -5, 5);
      const deltaY = a * deltaX;

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}\\text{. Argumendi muut on } \\Delta x = ${deltaX}\\text{. Leia funktsiooni muut } \\Delta y\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: deltaY },
        lahendus: [
          `\\Delta y = f(x+\\Delta x) - f(x) = ${a} \\cdot \\Delta x = ${a} \\cdot ${deltaX} = ${deltaY}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const b = int(rng, -9, 9);
      const x0 = int(rng, -5, 5);
      const deltaX = nonZeroInt(rng, -3, 3);
      const fx0 = a * x0 * x0 + b * x0;
      const fx1 = a * (x0 + deltaX) ** 2 + b * (x0 + deltaX);
      const deltaY = fx1 - fx0;

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x\\text{. Kohal } x=${x0} \\text{ on argumendi muut } \\Delta x = ${deltaX}\\text{. Leia funktsiooni muut } \\Delta y\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: deltaY },
        lahendus: [
          `\\Delta y = f(${x0}+${deltaX}) - f(${x0}) = ${fx1} - ${fx0} = ${deltaY}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const b = int(rng, -9, 9);
      const x0 = int(rng, -5, 5);
      const deltaX = nonZeroInt(rng, -3, 3);
      const value = a * (2 * x0 + deltaX) + b;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x\\text{. Kohal } x=${x0} \\text{ on argumendi muut } \\Delta x = ${deltaX}\\text{. Leia muutude suhe } \\dfrac{\\Delta y}{\\Delta x}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\dfrac{\\Delta y}{\\Delta x} = \\dfrac{f(${x0}+\\Delta x)-f(${x0})}{\\Delta x} = ${a}(2\\cdot${x0}+\\Delta x) + ${b} = ${a}(${2 * x0}+(${deltaX})) + ${b} = ${value}`,
        ],
      };
    },
  },
];
