import { reduceFraction } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-ringi-sektori-pindala";

const RADIAN_DENOMINATORS = [2, 3, 4, 6] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r = int(rng, 2, 12);
      const n = pick(rng, RADIAN_DENOMINATORS);
      const k = int(rng, 1, 2 * n - 1);
      const [num, den] = reduceFraction(r * r * k, 2 * n);

      return {
        seed: 1,
        kysimus: `\\text{Ringi raadius on } ${r} \\text{ ja sektori kesknurk on } \\dfrac{${k}\\pi}{${n}} \\text{ radiaani. Leia sektori pindala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: num, denominator: den } },
        lahendus: [
          `\\text{Sektori pindala on } S = \\dfrac{1}{2}r^2\\theta\\text{:}`,
          `S = \\dfrac{1}{2} \\cdot ${r}^2 \\cdot \\dfrac{${k}\\pi}{${n}} = \\dfrac{${num}\\pi}{${den}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const r = int(rng, 2, 12);
      const deg = int(rng, 10, 350);
      const [num, den] = reduceFraction(r * r * deg, 360);

      return {
        seed: 2,
        kysimus: `\\text{Ringi raadius on } ${r} \\text{ ja sektori kesknurk on } ${deg}^\\circ\\text{. Leia sektori pindala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: num, denominator: den } },
        lahendus: [
          `\\text{Sektori pindala on } S = \\dfrac{\\pi r^2 n}{360^\\circ}\\text{, kus } n \\text{ on kesknurk kraadides:}`,
          `S = \\dfrac{\\pi \\cdot ${r}^2 \\cdot ${deg}}{360} = \\dfrac{${num}\\pi}{${den}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const r = int(rng, 2, 12);
      const n = pick(rng, RADIAN_DENOMINATORS);
      const k = int(rng, 1, 2 * n - 1);
      const [num, den] = reduceFraction(r * r * k, 2 * n);

      return {
        seed: 3,
        kysimus: `\\text{Ringi sektori pindala on } \\dfrac{${num}\\pi}{${den}} \\text{ ja sektori kesknurk on } \\dfrac{${k}\\pi}{${n}} \\text{ radiaani. Leia ringi raadius.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: r },
        lahendus: [
          `\\text{Pindala valemist } S = \\dfrac{1}{2}r^2\\theta \\text{ saame } r^2 = \\dfrac{2S}{\\theta}\\text{:}`,
          `r^2 = \\dfrac{2 \\cdot ${num}\\pi/${den}}{${k}\\pi/${n}} = ${r * r} \\quad \\Rightarrow \\quad r = ${r}`,
        ],
      };
    },
  },
];
