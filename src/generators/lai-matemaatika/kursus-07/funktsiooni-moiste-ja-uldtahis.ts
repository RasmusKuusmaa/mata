import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-funktsiooni-moiste-ja-uldtahis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -9, 9);
      const b = int(rng, -9, 9);
      const k = int(rng, -9, 9);
      const value = a * k + b;

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on antud valemiga } f(x) = ${a}x + ${b}\\text{. Leia } f(${k})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `f(${k}) = ${a} \\cdot ${k} + ${b} = ${value}`,
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
      const b = int(rng, -5, 5);
      const c = int(rng, -9, 9);
      const k = int(rng, -5, 5);
      const value = a * k * k + b * k + c;

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on antud valemiga } f(x) = ${a}x^2 + ${b}x + ${c}\\text{. Leia } f(${k})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `f(${k}) = ${a} \\cdot ${k}^2 + ${b} \\cdot ${k} + ${c} = ${a * k * k} + ${b * k} + ${c} = ${value}`,
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
      const b = int(rng, -5, 5);
      const c = int(rng, -9, 9);
      const k = int(rng, -3, 3);
      const arg = 2 * k + 1;
      const value = a * arg * arg + b * arg + c;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on antud valemiga } f(x) = ${a}x^2 + ${b}x + ${c}\\text{. Leia } f(2 \\cdot ${k} + 1)\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `2 \\cdot ${k} + 1 = ${arg}`,
          `f(${arg}) = ${a} \\cdot ${arg}^2 + ${b} \\cdot ${arg} + ${c} = ${value}`,
        ],
      };
    },
  },
];
