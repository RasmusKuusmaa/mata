import { reduceFraction } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-eksponentvorratus";

/** Plain-text fraction for a `valik` option, e.g. `(7, 2) -> "7/2"`, `(6, 2) -> "3"`. */
function fractionText(numerator: number, denominator: number): string {
  const [n, d] = reduceFraction(numerator, denominator);
  return d === 1 ? `${n}` : `${n}/${d}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const k = int(rng, -6, 6);
      const oige = `x > ${k}`;

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrratus: } ${a}^x > ${a}^{${k}}\\text{.}`,
        vastus: { tuup: "valik", oige, eksitajad: [`x < ${k}`, `x = ${k}`] },
        lahendus: [
          `\\text{Kuna alus } ${a} > 1\\text{, säilib võrratuse suund astendajate võrdlemisel:}`,
          `x > ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = pick(rng, [2, 3, 4, 5] as const);
      const k = int(rng, -6, 6);
      const oige = `x < ${k}`;

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrratus: } \\left(\\dfrac{1}{${n}}\\right)^x > \\left(\\dfrac{1}{${n}}\\right)^{${k}}\\text{.}`,
        vastus: { tuup: "valik", oige, eksitajad: [`x > ${k}`, `x = ${k}`] },
        lahendus: [
          `\\text{Kuna alus } 0 < \\dfrac{1}{${n}} < 1\\text{, pöördub võrratuse suund astendajate võrdlemisel:}`,
          `x < ${k}`,
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
      const boundary = fractionText(k + 1, 2);
      const oige = `x > ${boundary}`;

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrratus: } ${a}^{2x-1} > ${a}^{${k}}\\text{.}`,
        vastus: { tuup: "valik", oige, eksitajad: [`x < ${boundary}`, `x = ${boundary}`] },
        lahendus: [
          `\\text{Kuna alus } ${a} > 1\\text{, säilib suund: } 2x-1 > ${k}`,
          `x > \\dfrac{${k}+1}{2} = ${boundary}`,
        ],
      };
    },
  },
];
