import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-graafiku-teisendused";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = int(rng, -9, 9);
      const v = int(rng, -9, 9);
      const a = nonZeroInt(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Teame, et } f(${k}) = ${v}\\text{. Leia funktsiooni } g(x) = f(x) + ${a} \\text{ väärtus kohal } x = ${k}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: v + a },
        lahendus: [
          `g(${k}) = f(${k}) + ${a} = ${v} + ${a} = ${v + a}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = int(rng, -9, 9);
      const v = int(rng, -9, 9);
      const a = nonZeroInt(rng, -6, 6);

      return {
        seed: 2,
        kysimus: `\\text{Teame, et } f(${k}) = ${v}\\text{. Leia funktsiooni } g(x) = ${a} \\cdot f(x) \\text{ väärtus kohal } x = ${k}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a * v },
        lahendus: [
          `g(${k}) = ${a} \\cdot f(${k}) = ${a} \\cdot ${v} = ${a * v}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = int(rng, -9, 9);
      const v = int(rng, -9, 9);
      const a = nonZeroInt(rng, -5, 5);
      const b = int(rng, -9, 9);
      const value = a * v + b;

      return {
        seed: 3,
        kysimus: `\\text{Teame, et } f(${k}) = ${v}\\text{. Leia funktsiooni } g(x) = ${a} \\cdot f(x) ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\text{ väärtus kohal } x = ${k}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `g(${k}) = ${a} \\cdot f(${k}) ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${a} \\cdot ${v} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${value}`,
        ],
      };
    },
  },
];
