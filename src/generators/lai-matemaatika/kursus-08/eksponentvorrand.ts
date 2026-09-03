import { arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-eksponentvorrand";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const x0 = int(rng, -3, 4);

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrrand: } ${a}^x = ${a}^{${x0}}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x0 },
        lahendus: [
          `\\text{Kuna alused on võrdsed, on ka astendajad võrdsed:}`,
          `x = ${x0}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const k = int(rng, -6, 6);

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrrand: } ${a}^{2x-1} = ${a}^{${k}}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(k + 1, 2) },
        lahendus: [
          `\\text{Kuna alused on võrdsed: } 2x-1 = ${k}`,
          `x = \\dfrac{${k}+1}{2} = \\dfrac{${k + 1}}{2}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const k = int(rng, -6, 6);

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrrand: } ${a}^{3x} = ${a}^{x+${k}}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(k, 2) },
        lahendus: [
          `\\text{Kuna alused on võrdsed: } 3x = x + ${k}`,
          `2x = ${k} \\quad \\Rightarrow \\quad x = \\dfrac{${k}}{2}`,
        ],
      };
    },
  },
];
