import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-korrutise-jagatise-astme-logaritm";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const m = int(rng, -9, 9);
      const n = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Teame, et } \\log_a x = ${m} \\text{ ja } \\log_a y = ${n}\\text{. Leia } \\log_a(xy)\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m + n },
        lahendus: [
          `\\log_a(xy) = \\log_a x + \\log_a y = ${m} + ${n} = ${m + n}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const m = int(rng, -9, 9);
      const n = int(rng, -9, 9);

      return {
        seed: 2,
        kysimus: `\\text{Teame, et } \\log_a x = ${m} \\text{ ja } \\log_a y = ${n}\\text{. Leia } \\log_a\\dfrac{x}{y}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m - n },
        lahendus: [
          `\\log_a\\dfrac{x}{y} = \\log_a x - \\log_a y = ${m} - ${n} = ${m - n}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const m = int(rng, -5, 5);
      const n = int(rng, -9, 9);
      const k = nonZeroInt(rng, -3, 3);
      const value = k * m + n;

      return {
        seed: 3,
        kysimus: `\\text{Teame, et } \\log_a x = ${m} \\text{ ja } \\log_a y = ${n}\\text{. Leia } \\log_a(x^{${k}}y)\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\log_a(x^{${k}}y) = ${k}\\log_a x + \\log_a y = ${k} \\cdot ${m} + ${n} = ${value}`,
        ],
      };
    },
  },
];
