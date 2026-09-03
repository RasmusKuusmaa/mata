import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-kera-segment-kiht-voo-sektor";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const R = int(rng, 4, 12);
      const h = int(rng, 1, R - 1);
      const numerator = 2 * R * h;

      return {
        seed: 1,
        kysimus: `\\text{Kera raadius on } R=${R}\\text{. Leia kera vöö (segmendipinna) pindala, kui vöö kõrgus on } h=${h} \\text{ (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator } },
        lahendus: [
          `S_{\\text{vöö}} = 2\\pi Rh = 2\\pi\\cdot ${R}\\cdot ${h} = ${numerator}\\pi`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const R = int(rng, 3, 9);
      const h = int(rng, 1, R - 1);
      const numerator = 2 * R * R * h;

      return {
        seed: 2,
        kysimus: `\\text{Kera raadius on } R=${R}\\text{. Leia kerasektori ruumala, kui sektori kõrgus on } h=${h} \\text{ (kordajana arvust } \\pi\\text{).}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "pi", numerator, denominator: 3 },
        },
        lahendus: [
          `V_{\\text{sektor}} = \\dfrac{2}{3}\\pi R^2 h = \\dfrac{2}{3}\\pi\\cdot ${R}^2\\cdot ${h} = \\dfrac{${numerator}\\pi}{3}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const R = int(rng, 4, 10);
      const h = int(rng, 1, R - 1);
      const numerator = 3 * R * h * h - h * h * h;

      return {
        seed: 3,
        kysimus: `\\text{Kera raadius on } R=${R}\\text{. Leia kerasegmendi ruumala, kui segmendi kõrgus on } h=${h} \\text{ (kordajana arvust } \\pi\\text{).}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "pi", numerator, denominator: 3 },
        },
        lahendus: [
          `V_{\\text{segment}} = \\dfrac{1}{3}\\pi h^2(3R-h) = \\dfrac{1}{3}\\pi\\cdot ${h}^2\\cdot(3\\cdot ${R}-${h}) = \\dfrac{1}{3}\\pi\\cdot ${h * h}\\cdot ${3 * R - h} = \\dfrac{${numerator}\\pi}{3}`,
        ],
      };
    },
  },
];
