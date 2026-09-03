import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-pindala-maaratud-integraaliga";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const b = int(rng, 1, 8);

      return {
        seed: 1,
        kysimus: `\\text{Leia funktsiooni } f(x)=x^2 \\text{ graafiku, x-telje ja sirgete } x=0\\text{, } x=${b} \\text{ vahele jääva pinnatüki pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(b * b * b, 3) },
        lahendus: [
          `S = \\displaystyle\\int_0^{${b}} x^2\\,dx = \\left[\\dfrac{x^3}{3}\\right]_0^{${b}} = \\dfrac{${b}^3}{3} = \\dfrac{${b * b * b}}{3}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const c = nonZeroInt(rng, 1, 9);
      const b = int(rng, 1, 8);
      const numerator = b * b * b + 3 * c * b;

      return {
        seed: 2,
        kysimus: `\\text{Leia funktsiooni } f(x)=x^2+${c} \\text{ graafiku, x-telje ja sirgete } x=0\\text{, } x=${b} \\text{ vahele jääva pinnatüki pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(numerator, 3) },
        lahendus: [
          `S = \\displaystyle\\int_0^{${b}} (x^2+${c})\\,dx = \\left[\\dfrac{x^3}{3}+${c}x\\right]_0^{${b}} = \\dfrac{${b}^3}{3}+${c}\\cdot${b} = \\dfrac{${numerator}}{3}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, 1, 4);
      const a = int(rng, 1, 4);
      const b = a + int(rng, 1, 5);
      const numerator = k * (b * b * b - a * a * a);

      return {
        seed: 3,
        kysimus: `\\text{Leia funktsiooni } f(x)=${k}x^2 \\text{ graafiku, x-telje ja sirgete } x=${a}\\text{, } x=${b} \\text{ vahele jääva pinnatüki pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(numerator, 3) },
        lahendus: [
          `S = \\displaystyle\\int_{${a}}^{${b}} ${k}x^2\\,dx = \\left[\\dfrac{${k}x^3}{3}\\right]_{${a}}^{${b}} = \\dfrac{${k}\\cdot${b}^3-${k}\\cdot${a}^3}{3} = \\dfrac{${numerator}}{3}`,
        ],
      };
    },
  },
];
