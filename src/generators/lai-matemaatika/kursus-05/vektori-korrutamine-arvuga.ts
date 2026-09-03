import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-vektori-korrutamine-arvuga";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x = int(rng, -9, 9);
      const y = int(rng, -9, 9);
      const k = nonZeroInt(rng, -5, 5);

      return {
        seed: 1,
        kysimus: `\\text{Vektor on } \\vec{a}=(${x}, ${y})\\text{. Leia } ${k}\\vec{a} \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k * x },
        lahendus: [
          `${k}\\vec{a} = (${k}\\cdot${x},\\ ${k}\\cdot${y}) = (${k * x},\\ ${k * y})`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const ax = int(rng, -9, 9);
      const ay = int(rng, -9, 9);
      const bx = int(rng, -9, 9);
      const by = int(rng, -9, 9);
      const k = nonZeroInt(rng, -4, 4);
      const m = nonZeroInt(rng, -4, 4);

      return {
        seed: 2,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${ax}, ${ay}) \\text{ ja } \\vec{b}=(${bx}, ${by})\\text{. Leia } ${k}\\vec{a}+${m}\\vec{b} \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k * ax + m * bx },
        lahendus: [
          `${k}\\vec{a}+${m}\\vec{b} \\text{ esimene koordinaat} = ${k}\\cdot${ax}+${m}\\cdot${bx} = ${k * ax + m * bx}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -9, 9);
      const y = nonZeroInt(rng, -9, 9);
      const k = nonZeroInt(rng, -5, 5);
      const rx = k * x;
      const ry = k * y;

      return {
        seed: 3,
        kysimus: `\\text{Vektor } \\vec{b}=(${rx}, ${ry}) \\text{ on saadud vektorist } \\vec{a}=(${x}, ${y}) \\text{ arvuga korrutamisel. Leia korrutustegur.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `k = \\dfrac{${rx}}{${x}} = ${k}`,
        ],
      };
    },
  },
];
