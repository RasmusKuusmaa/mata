import { reduceFraction } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-poordkeha-ruumala";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r = int(rng, 2, 10);
      const h = int(rng, 2, 10);

      return {
        seed: 1,
        kysimus: `\\text{Funktsiooni } f(x)=${r} \\text{ graafiku pöörlemisel ümber x-telje lõigul } [0, ${h}] \\text{ tekkib silinder. Leia selle ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: r * r * h } },
        lahendus: [
          `V = \\pi \\displaystyle\\int_0^{${h}} ${r}^2\\,dx = \\pi \\cdot ${r * r} \\cdot ${h} = ${r * r * h}\\pi`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const h = int(rng, 2, 10);
      const [num, den] = reduceFraction(h ** 3, 3);

      return {
        seed: 2,
        kysimus: `\\text{Funktsiooni } f(x)=x \\text{ graafiku pöörlemisel ümber x-telje lõigul } [0, ${h}] \\text{ tekkib koonus. Leia selle ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: num, denominator: den } },
        lahendus: [
          `V = \\pi \\displaystyle\\int_0^{${h}} x^2\\,dx = \\pi \\cdot \\dfrac{${h}^3}{3} = \\dfrac{${h ** 3}\\pi}{3}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 2, 5);
      const h = int(rng, 2, 8);
      const [num, den] = reduceFraction(a * a * h ** 3, 3);

      return {
        seed: 3,
        kysimus: `\\text{Funktsiooni } f(x)=${a}x \\text{ graafiku pöörlemisel ümber x-telje lõigul } [0, ${h}] \\text{ tekkib koonus. Leia selle ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator: num, denominator: den } },
        lahendus: [
          `V = \\pi \\displaystyle\\int_0^{${h}} (${a}x)^2\\,dx = \\pi \\cdot \\dfrac{${a}^2\\cdot${h}^3}{3} = \\dfrac{${a * a * h ** 3}\\pi}{3}`,
        ],
      };
    },
  },
];
