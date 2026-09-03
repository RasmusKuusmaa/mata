import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-astmefunktsioon";

const PERFECT_SQUARES = [4, 9, 16, 25] as const;
const PERFECT_CUBES = [8, 27, 64] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const n = pick(rng, [2, 3, 4] as const);
      const x = nonZeroInt(rng, -4, 4);
      const value = x ** n;

      return {
        seed: 1,
        kysimus: `\\text{Astmefunktsioon on } f(x) = x^{${n}}\\text{. Leia } f(${x})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [`f(${x}) = ${x}^{${n}} = ${value}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const x = int(rng, 2, 12);

      return {
        seed: 2,
        kysimus: `\\text{Astmefunktsioon on } f(x) = x^{-1}\\text{. Leia } f(${x})\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(1, x) },
        lahendus: [
          `f(${x}) = ${x}^{-1} = \\dfrac{1}{${x}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const useSquare = pick(rng, [true, false]);

      if (useSquare) {
        const x = pick(rng, PERFECT_SQUARES);
        const root = Math.round(Math.sqrt(x));
        const value = root ** 3;

        return {
          seed: 3,
          kysimus: `\\text{Astmefunktsioon on } f(x) = x^{3/2}\\text{. Leia } f(${x})\\text{.}`,
          vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
          lahendus: [
            `f(${x}) = ${x}^{3/2} = \\left(\\sqrt{${x}}\\right)^3 = ${root}^3 = ${value}`,
          ],
        };
      }

      const x = pick(rng, PERFECT_CUBES);
      const root = Math.round(Math.cbrt(x));

      return {
        seed: 3,
        kysimus: `\\text{Astmefunktsioon on } f(x) = x^{1/3}\\text{. Leia } f(${x})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: root },
        lahendus: [
          `f(${x}) = ${x}^{1/3} = \\sqrt[3]{${x}} = ${root}`,
        ],
      };
    },
  },
];
