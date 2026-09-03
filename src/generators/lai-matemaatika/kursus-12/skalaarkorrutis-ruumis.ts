import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-skalaarkorrutis-ruumis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const ax = int(rng, -9, 9);
      const ay = int(rng, -9, 9);
      const az = int(rng, -9, 9);
      const bx = int(rng, -9, 9);
      const by = int(rng, -9, 9);
      const bz = int(rng, -9, 9);
      const value = ax * bx + ay * by + az * bz;

      return {
        seed: 1,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${ax}, ${ay}, ${az}) \\text{ ja } \\vec{b}=(${bx}, ${by}, ${bz})\\text{. Leia skalaarkorrutis } \\vec{a}\\cdot\\vec{b}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\vec{a}\\cdot\\vec{b} = ${ax}\\cdot${bx}+${ay}\\cdot${by}+${az}\\cdot${bz} = ${ax * bx}+${ay * by}+${az * bz} = ${value}`,
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
      const az = int(rng, -9, 9);
      const value = ax * ax + ay * ay + az * az;

      return {
        seed: 2,
        kysimus: `\\text{Vektor on } \\vec{a}=(${ax}, ${ay}, ${az})\\text{. Leia } \\vec{a}\\cdot\\vec{a}\\text{ (vektori enda skalaarkorrutis).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\vec{a}\\cdot\\vec{a} = (${ax})^2+(${ay})^2+(${az})^2 = ${value}\\text{ (see võrdub } |\\vec{a}|^2\\text{)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const ax = int(rng, -6, 6);
      const ay = int(rng, -6, 6);
      const az = int(rng, -6, 6);
      const bx = int(rng, -6, 6);
      const by = int(rng, -6, 6);
      const bz = int(rng, -6, 6);
      const cx = int(rng, -6, 6);
      const cy = int(rng, -6, 6);
      const cz = int(rng, -6, 6);
      const value = ax * (bx + cx) + ay * (by + cy) + az * (bz + cz);

      return {
        seed: 3,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${ax}, ${ay}, ${az})\\text{, } \\vec{b}=(${bx}, ${by}, ${bz}) \\text{ ja } \\vec{c}=(${cx}, ${cy}, ${cz})\\text{. Leia } \\vec{a}\\cdot(\\vec{b}+\\vec{c})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\vec{b}+\\vec{c} = (${bx + cx}, ${by + cy}, ${bz + cz})`,
          `\\vec{a}\\cdot(\\vec{b}+\\vec{c}) = ${ax}\\cdot${bx + cx}+${ay}\\cdot${by + cy}+${az}\\cdot${bz + cz} = ${value}`,
        ],
      };
    },
  },
];
