import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-kera";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r = int(rng, 2, 12);
      const numerator = 4 * r * r;

      return {
        seed: 1,
        kysimus: `\\text{Kera raadius on } r=${r}\\text{. Leia kera pindala (kordajana arvust } \\pi\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "pi", numerator } },
        lahendus: [`S = 4\\pi r^2 = 4\\pi\\cdot ${r}^2 = ${numerator}\\pi`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const r = int(rng, 2, 9);
      const numerator = 4 * r * r * r;

      return {
        seed: 2,
        kysimus: `\\text{Kera raadius on } r=${r}\\text{. Leia kera ruumala (kordajana arvust } \\pi\\text{).}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "pi", numerator, denominator: 3 },
        },
        lahendus: [
          `V = \\dfrac{4}{3}\\pi r^3 = \\dfrac{4}{3}\\pi\\cdot ${r}^3 = \\dfrac{${numerator}\\pi}{3}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = int(rng, 2, 5);
      const kubes = k * k * k;

      return {
        seed: 3,
        kysimus: `\\text{Kera raadius suurendatakse } ${k} \\text{ korda. Mitu korda suureneb kera ruumala?}`,
        vastus: { tuup: "arv", ...arvVaartus(kubes) },
        lahendus: [
          `V = \\dfrac{4}{3}\\pi r^3\\text{, seega raadiuse suurendamisel } ${k} \\text{ korda kasvab ruumala } ${k}^3=${kubes} \\text{ korda.}`,
        ],
      };
    },
  },
];
