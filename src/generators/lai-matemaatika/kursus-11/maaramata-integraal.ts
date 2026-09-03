import { alus } from "@/generators/nice";
import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-maaramata-integraal";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, -5, 5);
      const n = pick(rng, [1, 2, 3] as const);
      const fCoeff = k * (n + 1);
      const c = int(rng, -9, 9);
      const x0 = int(rng, -3, 3);
      const value = k * x0 ** (n + 1) + c;

      return {
        seed: 1,
        kysimus: `\\text{Leia } \\displaystyle\\int ${fCoeff}x^{${n}}\\,dx \\text{, kus konstant } C=${c}\\text{, kohal } x=${x0}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\displaystyle\\int ${fCoeff}x^{${n}}\\,dx = ${k}x^{${n + 1}} + C`,
          `${k}\\cdot${alus(x0)}^{${n + 1}} + ${c} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = int(rng, -9, 9);
      const c = int(rng, -9, 9);
      const x0 = int(rng, -4, 4);
      const halfA = a;
      const value = halfA * x0 * x0 + b * x0 + c;

      return {
        seed: 2,
        kysimus: `\\text{Leia } \\displaystyle\\int (${2 * a}x + ${b})\\,dx \\text{, kus konstant } C=${c}\\text{, kohal } x=${x0}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\displaystyle\\int (${2 * a}x + ${b})\\,dx = ${a}x^2 + ${b}x + C`,
          `${a}\\cdot${alus(x0)}^2 + ${b}\\cdot${x0} + ${c} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -4, 4);
      const b = nonZeroInt(rng, -4, 4);
      const c = int(rng, -9, 9);
      const x0 = int(rng, -3, 3);
      const value = a * x0 ** 3 + b * x0 * x0 + c;

      return {
        seed: 3,
        kysimus: `\\text{Leia } \\displaystyle\\int (${3 * a}x^2 + ${2 * b}x)\\,dx \\text{, kus konstant } C=${c}\\text{, kohal } x=${x0}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\displaystyle\\int (${3 * a}x^2 + ${2 * b}x)\\,dx = ${a}x^3 + ${b}x^2 + C`,
          `${a}\\cdot${alus(x0)}^3 + ${b}\\cdot${alus(x0)}^2 + ${c} = ${value}`,
        ],
      };
    },
  },
];
