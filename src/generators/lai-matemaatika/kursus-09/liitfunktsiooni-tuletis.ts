import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-liitfunktsiooni-tuletis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const b = int(rng, -9, 9);
      const x0 = int(rng, -5, 5);
      const inner = a * x0 + b;
      const value = 2 * inner * a;

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } h(x) = (${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)})^2\\text{. Leia } h'(${x0}) \\text{ ahelreegli abil.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `h'(x) = 2(${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}) \\cdot ${a}`,
          `h'(${x0}) = 2\\cdot(${inner}) \\cdot ${a} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -4, 4);
      const b = int(rng, -6, 6);
      const x0 = int(rng, -4, 4);
      const inner = a * x0 + b;
      const value = 3 * inner * inner * a;

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } h(x) = (${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)})^3\\text{. Leia } h'(${x0}) \\text{ ahelreegli abil.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `h'(x) = 3(${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)})^2 \\cdot ${a}`,
          `h'(${x0}) = 3\\cdot(${inner})^2 \\cdot ${a} = ${value}`,
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
      const root = pick(rng, [1, 2, 3] as const);
      const innerValue = root * root;
      const x0 = int(rng, -5, 5);
      const b = innerValue - a * x0;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } h(x) = \\sqrt{${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}}\\text{. Leia } h'(${x0}) \\text{ ahelreegli abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(a, 2 * root) },
        lahendus: [
          `h'(x) = \\dfrac{${a}}{2\\sqrt{${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}}}`,
          `${a}\\cdot${x0} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${innerValue}`,
          `h'(${x0}) = \\dfrac{${a}}{2\\sqrt{${innerValue}}} = \\dfrac{${a}}{2\\cdot${root}} = \\dfrac{${a}}{${2 * root}}`,
        ],
      };
    },
  },
];
