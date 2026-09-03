import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-kera-ruumala-tuletamine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const R = int(rng, 2, 8);
      const numerator = R * R;

      return {
        seed: 1,
        kysimus: `\\text{Poolringjoone } y=\\sqrt{${R}^2-x^2} \\text{ pöörlemisel ümber x-telje lõigul } [-${R}, ${R}] \\text{ tekib kera. Ristlõike pindala on } S(x)=\\pi(${R}^2-x^2)\\text{. Leia ristlõike pindala kera keskpunktis, kohal } x=0 \\text{ (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator } },
        lahendus: [
          `S(0) = \\pi(${R}^2-0^2) = \\pi\\cdot ${numerator} = ${numerator}\\pi`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const R = int(rng, 2, 8);
      const numerator = 4 * R * R * R;

      return {
        seed: 2,
        kysimus: `\\text{Poolringjoone } y=\\sqrt{${R}^2-x^2} \\text{ pöörlemisel ümber x-telje lõigul } [-${R}, ${R}] \\text{ tekib kera. Tuleta integraaliga } V=\\displaystyle\\int_{-${R}}^{${R}} \\pi(${R}^2-x^2)\\,dx \\text{ kera ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "pi", numerator, denominator: 3 },
        },
        lahendus: [
          `V = \\pi\\displaystyle\\int_{-${R}}^{${R}} (${R}^2-x^2)\\,dx = \\pi\\left[${R}^2x-\\dfrac{x^3}{3}\\right]_{-${R}}^{${R}}`,
          `= \\pi\\left(2\\cdot ${R}^3 - \\dfrac{2\\cdot ${R}^3}{3}\\right) = \\pi\\cdot\\dfrac{4${R}^3}{3} = \\dfrac{${numerator}\\pi}{3}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const R = int(rng, 2, 6);
      const numerator = 4 * R * R * R;

      return {
        seed: 3,
        kysimus: `\\text{Tuleta integraaliga kera (raadius } R=${R}\\text{) ruumala, pöörates poolringjoont } y=\\sqrt{${R}^2-x^2} \\text{ ümber x-telje lõigul } [-${R}, ${R}]\\text{, ning kontrolli tulemust valemiga } V=\\dfrac{4}{3}\\pi R^3 \\text{ (esita vastus kordajana arvust } \\pi\\text{).}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "pi", numerator, denominator: 3 },
        },
        lahendus: [
          `V = \\pi\\displaystyle\\int_{-${R}}^{${R}} (${R}^2-x^2)\\,dx = \\pi\\cdot\\dfrac{4${R}^3}{3} = \\dfrac{${numerator}\\pi}{3}`,
          `\\text{Kontroll: } \\dfrac{4}{3}\\pi R^3 = \\dfrac{4}{3}\\pi\\cdot ${R}^3 = \\dfrac{${numerator}\\pi}{3}\\text{ — tulemused ühtivad.}`,
        ],
      };
    },
  },
];
