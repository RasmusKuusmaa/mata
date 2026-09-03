import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-kahe-koveraga-piiratud-pinnatuki-pindala";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const m = int(rng, 2, 8);

      return {
        seed: 1,
        kysimus: `\\text{Leia parabooli } f(x)=x^2 \\text{ ja sirge } g(x)=${m}x \\text{ vahele jääva pinnatüki pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(m ** 3, 6) },
        lahendus: [
          `\\text{Lõikepunktid: } x^2=${m}x \\Rightarrow x=0 \\text{ või } x=${m}\\text{.}`,
          `S = \\displaystyle\\int_0^{${m}} (${m}x - x^2)\\,dx = \\left[\\dfrac{${m}x^2}{2}-\\dfrac{x^3}{3}\\right]_0^{${m}} = \\dfrac{${m}^3}{6} = \\dfrac{${m ** 3}}{6}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const h = int(rng, -6, 6);
      const m = int(rng, 2, 8);
      const term = h === 0 ? "x" : h > 0 ? `(x-${h})` : `(x+${-h})`;

      return {
        seed: 2,
        kysimus: `\\text{Leia parabooli } f(x)=${term}^2 \\text{ ja sirge } g(x)=${m}${term} \\text{ vahele jääva pinnatüki pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(m ** 3, 6) },
        lahendus: [
          `\\text{Muutujavahetusega } u=${term} \\text{ taandub ülesanne samale kujule kui } f(u)=u^2\\text{, } g(u)=${m}u\\text{:}`,
          `S = \\dfrac{${m}^3}{6} = \\dfrac{${m ** 3}}{6}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 1, 4);
      const l = int(rng, 2, 6);
      const m = a * l;
      const numerator = a * l ** 3;

      return {
        seed: 3,
        kysimus: `\\text{Leia parabooli } f(x)=${a}x^2 \\text{ ja sirge } g(x)=${m}x \\text{ vahele jääva pinnatüki pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(numerator, 6) },
        lahendus: [
          `\\text{Lõikepunktid: } ${a}x^2=${m}x \\Rightarrow x=0 \\text{ või } x=${l}\\text{.}`,
          `S = \\displaystyle\\int_0^{${l}} (${m}x - ${a}x^2)\\,dx = \\left[\\dfrac{${m}x^2}{2}-\\dfrac{${a}x^3}{3}\\right]_0^{${l}} = \\dfrac{${numerator}}{6}`,
        ],
      };
    },
  },
];
