import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-kesknurk-ja-piirdenurk";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const central = 2 * int(rng, 10, 89);

      return {
        seed: 1,
        kysimus: `\\text{Ringjoone kaarele vastav kesknurk on } ${central}^\\circ\\text{. Leia samale kaarele toetuv piirdenurk.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: central / 2 },
        lahendus: [
          `\\text{Piirdenurk on pool kesknurgast: } \\dfrac{${central}^\\circ}{2} = ${central / 2}^\\circ`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const inscribed = int(rng, 10, 89);

      return {
        seed: 2,
        kysimus: `\\text{Ringjoone kaarele toetuv piirdenurk on } ${inscribed}^\\circ\\text{. Leia samale kaarele vastav kesknurk.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 2 * inscribed },
        lahendus: [
          `\\text{Kesknurk on kaks korda piirdenurgast: } 2\\cdot${inscribed}^\\circ = ${2 * inscribed}^\\circ`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const inscribed1 = int(rng, 10, 80);

      return {
        seed: 3,
        kysimus: `\\text{Ühele ja samale kaarele toetuvad piirdenurgad } \\angle A=${inscribed1}^\\circ \\text{ ja } \\angle B\\text{. Leia } \\angle B\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: inscribed1 },
        lahendus: [
          `\\text{Samale kaarele toetuvad piirdenurgad on omavahel võrdsed: } \\angle B = \\angle A = ${inscribed1}^\\circ`,
        ],
      };
    },
  },
];
