import { reduceFraction } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-uldlahend-ja-erilahendid";

/** `(numerator, denominator)` describing the principal solution as a
 * fraction of `π`, e.g. `arcsin(1/2) = π/6` is `(1, 6)`. */
const ARCSIN_ANGLES: readonly [number, number][] = [
  [1, 6],
  [1, 4],
  [1, 3],
];

const ARCTAN_ANGLES: readonly [number, number][] = [
  [1, 6],
  [1, 4],
  [1, 3],
];

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [pNum, pDen] = pick(rng, ARCSIN_ANGLES);
      const k = int(rng, 1, 3);
      const [num, den] = reduceFraction(pNum + 2 * k * pDen, pDen);

      return {
        seed: 1,
        kysimus: `\\text{Trigonomeetrilise võrrandi üldlahend on } x = \\dfrac{${pNum}\\pi}{${pDen}} + 2\\pi n\\text{. Leia erilahend, kui } n=${k}\\text{.}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: num, denominator: den } },
        lahendus: [
          `x = \\dfrac{${pNum}\\pi}{${pDen}} + 2\\pi \\cdot ${k} = \\dfrac{${pNum}\\pi}{${pDen}} + \\dfrac{${2 * k * pDen}\\pi}{${pDen}} = \\dfrac{${num}\\pi}{${den}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [pNum, pDen] = pick(rng, ARCSIN_ANGLES);
      const k = int(rng, 1, 3);
      // x = -arcsin(c) + 2πn (the other branch of the sine general solution).
      const [num, den] = reduceFraction(-pNum + 2 * k * pDen, pDen);

      return {
        seed: 2,
        kysimus: `\\text{Trigonomeetrilise võrrandi üldlahend on } x = -\\dfrac{${pNum}\\pi}{${pDen}} + 2\\pi n\\text{. Leia erilahend, kui } n=${k}\\text{.}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: num, denominator: den } },
        lahendus: [
          `x = -\\dfrac{${pNum}\\pi}{${pDen}} + 2\\pi \\cdot ${k} = \\dfrac{-${pNum}\\pi + ${2 * k * pDen}\\pi}{${pDen}} = \\dfrac{${num}\\pi}{${den}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [pNum, pDen] = pick(rng, ARCTAN_ANGLES);
      const k = int(rng, -2, 2);
      const [num, den] = reduceFraction(pNum + k * pDen, pDen);

      return {
        seed: 3,
        kysimus: `\\text{Trigonomeetrilise võrrandi üldlahend on } x = \\dfrac{${pNum}\\pi}{${pDen}} + \\pi n\\text{. Leia erilahend, kui } n=${k}\\text{.}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: num, denominator: den } },
        lahendus: [
          `x = \\dfrac{${pNum}\\pi}{${pDen}} + \\pi \\cdot (${k}) = \\dfrac{${pNum}\\pi + ${k * pDen}\\pi}{${pDen}} = \\dfrac{${num}\\pi}{${den}}`,
        ],
      };
    },
  },
];
