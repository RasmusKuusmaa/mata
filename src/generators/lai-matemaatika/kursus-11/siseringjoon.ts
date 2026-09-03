import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-siseringjoon";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = int(rng, 1, 8);
      const [a, b, c] = [3 * k, 4 * k, 5 * k];

      return {
        seed: 1,
        kysimus: `\\text{Täisnurkse kolmnurga kaatetid on } ${a} \\text{ ja } ${b}\\text{, hüpotenuus } ${c}\\text{. Leia siseringjoone raadius (} r=\\dfrac{S}{s}\\text{, kus } s \\text{ on poolümbermõõt).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `S = \\dfrac{${a}\\cdot${b}}{2} = ${(a * b) / 2}\\text{, } s = \\dfrac{${a}+${b}+${c}}{2} = ${(a + b + c) / 2}`,
          `r = \\dfrac{${(a * b) / 2}}{${(a + b + c) / 2}} = ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = int(rng, 1, 8);
      const [a, b, c] = [5 * k, 12 * k, 13 * k];
      const r = 2 * k;

      return {
        seed: 2,
        kysimus: `\\text{Täisnurkse kolmnurga kaatetid on } ${a} \\text{ ja } ${b}\\text{, hüpotenuus } ${c}\\text{. Leia siseringjoone raadius.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: r },
        lahendus: [
          `S = \\dfrac{${a}\\cdot${b}}{2} = ${(a * b) / 2}\\text{, } s = \\dfrac{${a}+${b}+${c}}{2} = ${(a + b + c) / 2}`,
          `r = \\dfrac{${(a * b) / 2}}{${(a + b + c) / 2}} = ${r}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const t = int(rng, 1, 6);
      const a = 3 * t;
      const b = 8 * t;
      const c = 7 * t;
      const area = 6 * t * t;
      const s = 9 * t;

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurga küljed on } ${a}\\text{, } ${b} \\text{ ja } ${c}\\text{, pindala on } ${area}\\text{. Leia siseringjoone raadius.}`,
        vastus: { tuup: "arv", ...arvVaartus(area, s) },
        lahendus: [
          `s = \\dfrac{${a}+${b}+${c}}{2} = ${s}`,
          `r = \\dfrac{S}{s} = \\dfrac{${area}}{${s}}`,
        ],
      };
    },
  },
];
