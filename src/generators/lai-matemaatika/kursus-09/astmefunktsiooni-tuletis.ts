import { alus, arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-astmefunktsiooni-tuletis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const n = int(rng, 2, 6);

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = x^{${n}}\\text{. Leia } f'(1) \\text{ astmefunktsiooni tuletise reegli } (x^n)' = nx^{n-1} \\text{ abil.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: n },
        lahendus: [
          `f'(x) = ${n}x^{${n - 1}}`,
          `f'(1) = ${n} \\cdot 1^{${n - 1}} = ${n}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const x0 = pick(rng, [-3, -2, -1, 1, 2, 3] as const);

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x) = x^{-1} = \\dfrac{1}{x}\\text{. Leia } f'(${x0}) \\text{ astmefunktsiooni tuletise reegli abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(-1, x0 * x0) },
        lahendus: [
          `f'(x) = -1\\cdot x^{-2} = -\\dfrac{1}{x^2}`,
          `f'(${x0}) = -\\dfrac{1}{${alus(x0)}^2} = -\\dfrac{1}{${x0 * x0}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const root = pick(rng, [1, 2, 3] as const);
      const x0 = root * root;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = x^{1/2} = \\sqrt{x}\\text{. Leia } f'(${x0}) \\text{ astmefunktsiooni tuletise reegli abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(1, 2 * root) },
        lahendus: [
          `f'(x) = \\dfrac12 x^{-1/2} = \\dfrac{1}{2\\sqrt{x}}`,
          `f'(${x0}) = \\dfrac{1}{2\\sqrt{${x0}}} = \\dfrac{1}{2\\cdot${root}} = \\dfrac{1}{${2 * root}}`,
        ],
      };
    },
  },
];
