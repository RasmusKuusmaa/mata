import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-keskvaartus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 1, 5);
      const b = 6 - a;
      const x1 = int(rng, 1, 5);
      const x2 = int(rng, 1, 5);

      return {
        seed: 1,
        kysimus: `\\text{Juhuslik suurus } X \\text{ omab väärtust } ${x1} \\text{ tõenäosusega } \\dfrac{${a}}{6} \\text{ ja väärtust } ${x2} \\text{ tõenäosusega } \\dfrac{${b}}{6}\\text{. Leia keskväärtus } E(X)\\text{, korrutatud arvuga 6.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x1 * a + x2 * b },
        lahendus: [
          `E(X) = ${x1}\\cdot\\dfrac{${a}}{6} + ${x2}\\cdot\\dfrac{${b}}{6} = \\dfrac{${x1 * a}+${x2 * b}}{6} = \\dfrac{${x1 * a + x2 * b}}{6}`,
          `6\\cdot E(X) = ${x1 * a + x2 * b}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 1, 4);
      const b = int(rng, 1, 12 - a - 1);
      const c = 12 - a - b;
      const x1 = int(rng, 1, 5);
      const x2 = int(rng, 1, 5);
      const x3 = int(rng, 1, 5);
      const numerator = x1 * a + x2 * b + x3 * c;

      return {
        seed: 2,
        kysimus: `\\text{Juhuslik suurus } X \\text{ omab väärtusi } ${x1}\\text{, } ${x2}\\text{, } ${x3} \\text{ tõenäosustega vastavalt } \\dfrac{${a}}{12}\\text{, } \\dfrac{${b}}{12}\\text{, } \\dfrac{${c}}{12}\\text{. Leia keskväärtus } E(X)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(numerator, 12) },
        lahendus: [
          `E(X) = ${x1}\\cdot\\dfrac{${a}}{12}+${x2}\\cdot\\dfrac{${b}}{12}+${x3}\\cdot\\dfrac{${c}}{12} = \\dfrac{${numerator}}{12}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const n = int(rng, 4, 8);

      return {
        seed: 3,
        kysimus: `\\text{Täringut visates on iga silmaarv } 1,2,\\ldots,${n} \\text{ võrdse tõenäosusega } \\dfrac{1}{${n}}\\text{. Leia keskväärtus } E(X)\\text{, korrutatud arvuga } ${2 * n}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: n * (n + 1) },
        lahendus: [
          `E(X) = \\dfrac{1+2+\\cdots+${n}}{${n}} = \\dfrac{${(n * (n + 1)) / 2}}{${n}} = \\dfrac{${n + 1}}{2}`,
          `${2 * n}\\cdot E(X) = ${2 * n} \\cdot \\dfrac{${n + 1}}{2} = ${n * (n + 1)}`,
        ],
      };
    },
  },
];
