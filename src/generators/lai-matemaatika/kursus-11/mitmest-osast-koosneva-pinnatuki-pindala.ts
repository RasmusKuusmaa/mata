import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-mitmest-osast-koosneva-pinnatuki-pindala";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 1, 9);

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x)=x\\text{. Leia funktsiooni graafiku ja x-telje vahele jääva pinnatüki pindala lõigul } [-${a}, ${a}]\\text{ (funktsioon vahetab lõigul märki).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a * a },
        lahendus: [
          `\\text{Lõigul } [-${a},0] \\text{ on funktsioon negatiivne, pindala} = \\left|\\displaystyle\\int_{-${a}}^0 x\\,dx\\right| = \\dfrac{${a}^2}{2}`,
          `\\text{Lõigul } [0,${a}] \\text{ on funktsioon positiivne, pindala} = \\displaystyle\\int_0^{${a}} x\\,dx = \\dfrac{${a}^2}{2}`,
          `\\text{Kogupindala} = \\dfrac{${a}^2}{2} + \\dfrac{${a}^2}{2} = ${a}^2 = ${a * a}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const m = nonZeroInt(rng, 2, 5);
      const a = int(rng, 1, 8);
      const value = m * a * a;

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x)=${m}x\\text{. Leia funktsiooni graafiku ja x-telje vahele jääva pinnatüki pindala lõigul } [-${a}, ${a}]\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Kummalgi poolel on pindala} = \\dfrac{${m}\\cdot${a}^2}{2}\\text{, kokku:}`,
          `2 \\cdot \\dfrac{${m}\\cdot${a}^2}{2} = ${m}\\cdot${a}^2 = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 1, 8);
      let b = int(rng, 1, 8);
      while (b === a) b = int(rng, 1, 8);
      const numerator = a * a + b * b;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x)=x\\text{. Leia funktsiooni graafiku ja x-telje vahele jääva pinnatüki pindala lõigul } [-${a}, ${b}]\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(numerator, 2) },
        lahendus: [
          `\\text{Lõigul } [-${a},0]\\text{: pindala} = \\dfrac{${a}^2}{2}\\text{. Lõigul } [0,${b}]\\text{: pindala} = \\dfrac{${b}^2}{2}\\text{.}`,
          `\\text{Kogupindala} = \\dfrac{${a}^2+${b}^2}{2} = \\dfrac{${numerator}}{2}`,
        ],
      };
    },
  },
];
