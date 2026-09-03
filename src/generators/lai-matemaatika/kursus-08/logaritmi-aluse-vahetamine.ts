import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-logaritmi-aluse-vahetamine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, 2, 9);

      return {
        seed: 1,
        kysimus: `\\text{Teame, et } \\log_a b = ${k}\\text{. Leia } \\log_b a\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(1, k) },
        lahendus: [
          `\\log_b a = \\dfrac{1}{\\log_a b} = \\dfrac{1}{${k}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = int(rng, 2, 6);
      const m = int(rng, 1, 12);
      const base = 2 ** n;
      const arg = 2 ** m;

      return {
        seed: 2,
        kysimus: `\\text{Leia } \\log_{${base}} ${arg} \\text{ aluse vahetusega kahendlogaritmi } \\log_2 \\text{ kaudu.}`,
        vastus: { tuup: "arv", ...arvVaartus(m, n) },
        lahendus: [
          `\\log_{${base}} ${arg} = \\dfrac{\\log_2 ${arg}}{\\log_2 ${base}} = \\dfrac{${m}}{${n}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const m = int(rng, -6, 6);
      const n = int(rng, -6, 6);
      const value = m * n;

      return {
        seed: 3,
        kysimus: `\\text{Teame, et } \\log_a b = ${m} \\text{ ja } \\log_b c = ${n}\\text{. Leia } \\log_a c\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\log_a c = \\log_a b \\cdot \\log_b c = ${m} \\cdot ${n} = ${value}`,
        ],
      };
    },
  },
];
