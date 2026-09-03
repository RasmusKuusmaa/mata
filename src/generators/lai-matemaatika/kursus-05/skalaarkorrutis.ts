import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-skalaarkorrutis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const ax = int(rng, -9, 9);
      const ay = int(rng, -9, 9);
      const bx = int(rng, -9, 9);
      const by = int(rng, -9, 9);
      const value = ax * bx + ay * by;

      return {
        seed: 1,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${ax}, ${ay}) \\text{ ja } \\vec{b}=(${bx}, ${by})\\text{. Leia skalaarkorrutis } \\vec{a}\\cdot\\vec{b}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\vec{a}\\cdot\\vec{b} = ${ax}\\cdot${bx} + ${ay}\\cdot${by} = ${ax * bx} + ${ay * by} = ${value}`,
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
      const value = ax * ax + ay * ay;

      return {
        seed: 2,
        kysimus: `\\text{Vektor on } \\vec{a}=(${ax}, ${ay})\\text{. Leia } \\vec{a}\\cdot\\vec{a}\\text{ (vektori enda skalaarkorrutis).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\vec{a}\\cdot\\vec{a} = ${ax}^2+${ay}^2 = ${value} \\text{ (see võrdub } |\\vec{a}|^2\\text{)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const ax = int(rng, -9, 9);
      const ay = int(rng, -9, 9);
      const bx = int(rng, -9, 9);
      const by = int(rng, -9, 9);
      const cx = int(rng, -9, 9);
      const cy = int(rng, -9, 9);
      const value = ax * (bx + cx) + ay * (by + cy);

      return {
        seed: 3,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${ax}, ${ay})\\text{, } \\vec{b}=(${bx}, ${by}) \\text{ ja } \\vec{c}=(${cx}, ${cy})\\text{. Leia } \\vec{a}\\cdot(\\vec{b}+\\vec{c})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\vec{b}+\\vec{c} = (${bx + cx}, ${by + cy})`,
          `\\vec{a}\\cdot(\\vec{b}+\\vec{c}) = ${ax}\\cdot${bx + cx} + ${ay}\\cdot${by + cy} = ${value}`,
        ],
      };
    },
  },
];
