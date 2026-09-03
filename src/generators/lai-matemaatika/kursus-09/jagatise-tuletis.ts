import { alus, arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-jagatise-tuletis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const p = int(rng, -6, 6);
      const m = int(rng, -6, 6);
      const q = pick(rng, [1, 2, 3] as const);
      const n = int(rng, -6, 6);
      const numerator = m * q - p * n;

      return {
        seed: 1,
        kysimus: `\\text{Teame, et } f(a)=${p}\\text{, } f'(a)=${m}\\text{, } g(a)=${q} \\text{ ja } g'(a)=${n}\\text{. Leia } \\left(\\dfrac{f}{g}\\right)'(a)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(numerator, q * q) },
        lahendus: [
          `\\left(\\dfrac{f}{g}\\right)'(a) = \\dfrac{f'(a)g(a)-f(a)g'(a)}{g(a)^2}`,
          `\\left(\\dfrac{f}{g}\\right)'(a) = \\dfrac{${m}\\cdot${q} - ${p}\\cdot${n}}{${q}^2} = \\dfrac{${numerator}}{${q * q}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const q = pick(rng, [1, 2, 3] as const);
      const x0 = int(rng, -6, 6);
      const c = q - x0;
      const numerator = q - x0;

      return {
        seed: 2,
        kysimus: `\\text{Olgu } f(x)=x \\text{ ja } g(x)=x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}\\text{. Leia } \\left(\\dfrac{f}{g}\\right)'(${x0}) \\text{ jagatise tuletise valemi abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(numerator, q * q) },
        lahendus: [
          `\\left(\\dfrac{f}{g}\\right)'(x) = \\dfrac{f'(x)g(x)-f(x)g'(x)}{g(x)^2} = \\dfrac{1\\cdot g(x) - x\\cdot1}{g(x)^2}`,
          `g(${x0}) = ${x0} ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${q}`,
          `\\left(\\dfrac{f}{g}\\right)'(${x0}) = \\dfrac{${q} - ${x0}}{${q}^2} = \\dfrac{${numerator}}{${q * q}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const q = pick(rng, [1, 2, 3] as const);
      const x0 = int(rng, -6, 6);
      const c = q - x0;
      const numerator = 2 * x0 * q - x0 * x0;

      return {
        seed: 3,
        kysimus: `\\text{Olgu } f(x)=x^2 \\text{ ja } g(x)=x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}\\text{. Leia } \\left(\\dfrac{f}{g}\\right)'(${x0}) \\text{ jagatise tuletise valemi abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(numerator, q * q) },
        lahendus: [
          `\\left(\\dfrac{f}{g}\\right)'(x) = \\dfrac{f'(x)g(x)-f(x)g'(x)}{g(x)^2} = \\dfrac{2x\\cdot g(x) - x^2\\cdot1}{g(x)^2}`,
          `g(${x0}) = ${x0} ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${q}`,
          `\\left(\\dfrac{f}{g}\\right)'(${x0}) = \\dfrac{2\\cdot${x0}\\cdot${q} - ${alus(x0)}^2}{${q}^2} = \\dfrac{${numerator}}{${q * q}}`,
        ],
      };
    },
  },
];
