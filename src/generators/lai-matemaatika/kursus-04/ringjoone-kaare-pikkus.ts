import { reduceFraction } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-ringjoone-kaare-pikkus";

const RADIAN_DENOMINATORS = [2, 3, 4, 6] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r = int(rng, 2, 20);
      const n = pick(rng, RADIAN_DENOMINATORS);
      const k = int(rng, 1, 2 * n - 1);
      const [num, den] = reduceFraction(r * k, n);

      return {
        seed: 1,
        kysimus: `\\text{Ringjoone raadius on } ${r} \\text{ ja kaarele vastav kesknurk on } \\dfrac{${k}\\pi}{${n}} \\text{ radiaani. Leia kaare pikkus (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: num, denominator: den } },
        lahendus: [
          `\\text{Kaare pikkus on } l = r\\theta\\text{:}`,
          `l = ${r} \\cdot \\dfrac{${k}\\pi}{${n}} = \\dfrac{${num}\\pi}{${den}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const r = int(rng, 2, 20);
      const deg = int(rng, 10, 350);
      const [num, den] = reduceFraction(r * deg, 180);

      return {
        seed: 2,
        kysimus: `\\text{Ringjoone raadius on } ${r} \\text{ ja kaarele vastav kesknurk on } ${deg}^\\circ\\text{. Leia kaare pikkus (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: num, denominator: den } },
        lahendus: [
          `\\text{Kaare pikkus on } l = \\dfrac{\\pi r n}{180^\\circ}\\text{, kus } n \\text{ on kesknurk kraadides:}`,
          `l = \\dfrac{\\pi \\cdot ${r} \\cdot ${deg}}{180} = \\dfrac{${num}\\pi}{${den}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const r = int(rng, 2, 20);
      const n = pick(rng, RADIAN_DENOMINATORS);
      const k = int(rng, 1, 2 * n - 1);
      const [num, den] = reduceFraction(r * k, n);

      return {
        seed: 3,
        kysimus: `\\text{Ringjoone kaare pikkus on } \\dfrac{${num}\\pi}{${den}} \\text{ ja kaarele vastav kesknurk on } \\dfrac{${k}\\pi}{${n}} \\text{ radiaani. Leia ringjoone raadius.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: r },
        lahendus: [
          `\\text{Kaare pikkusest } l = r\\theta \\text{ saame } r = \\dfrac{l}{\\theta}\\text{:}`,
          `r = \\dfrac{${num}\\pi/${den}}{${k}\\pi/${n}} = ${r}`,
        ],
      };
    },
  },
];
