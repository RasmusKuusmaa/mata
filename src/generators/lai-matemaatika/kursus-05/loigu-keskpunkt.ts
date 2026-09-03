import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-loigu-keskpunkt";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x1 = int(rng, -9, 9);
      const y1 = int(rng, -9, 9);
      const x2 = int(rng, -9, 9);
      const y2 = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Leia lõigu } AB \\text{ keskpunkti esimene koordinaat, kui } A(${x1}, ${y1}) \\text{ ja } B(${x2}, ${y2})\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(x1 + x2, 2) },
        lahendus: [
          `x_K = \\dfrac{x_A+x_B}{2} = \\dfrac{${x1}+${x2}}{2} = \\dfrac{${x1 + x2}}{2}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const kx = int(rng, -9, 9);
      const ky = int(rng, -9, 9);
      const x1 = int(rng, -9, 9);
      const y1 = int(rng, -9, 9);
      const x2 = 2 * kx - x1;

      return {
        seed: 2,
        kysimus: `\\text{Lõigu } AB \\text{ keskpunkt on } K(${kx}, ${ky}) \\text{ ja } A(${x1}, ${y1})\\text{. Leia punkti } B \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x2 },
        lahendus: [
          `x_B = 2x_K - x_A = 2\\cdot${kx} - ${x1} = ${x2}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x1 = int(rng, -9, 9);
      const y1 = int(rng, -9, 9);
      const x2 = int(rng, -9, 9);
      const y2 = int(rng, -9, 9);
      const x3 = int(rng, -9, 9);
      const y3 = int(rng, -9, 9);
      const centroidNumerator = x1 + x2 + x3;

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurga tipud on } A(${x1}, ${y1})\\text{, } B(${x2}, ${y2}) \\text{ ja } C(${x3}, ${y3})\\text{. Leia raskuskeskme esimene koordinaat (} x=\\frac{x_A+x_B+x_C}{3}\\text{).}`,
        vastus: { tuup: "arv", ...arvVaartus(centroidNumerator, 3) },
        lahendus: [
          `x = \\dfrac{${x1}+${x2}+${x3}}{3} = \\dfrac{${centroidNumerator}}{3}`,
        ],
      };
    },
  },
];
