import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-lineaartehted-ruumivektoritega";

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

      return {
        seed: 1,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${ax}, ${ay}, ${az}) \\text{ ja } \\vec{b}=(${bx}, ${by}, ${bz})\\text{. Leia } \\vec{a}+\\vec{b} \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: ax + bx },
        lahendus: [`\\vec{a}+\\vec{b} = (${ax}+${bx}, ${ay}+${by}, ${az}+${bz}) = (${ax + bx}, ${ay + by}, ${az + bz})`],
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
      const bx = int(rng, -9, 9);
      const by = int(rng, -9, 9);
      const bz = int(rng, -9, 9);
      const k = nonZeroInt(rng, -4, 4);

      return {
        seed: 2,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${ax}, ${ay}, ${az}) \\text{ ja } \\vec{b}=(${bx}, ${by}, ${bz})\\text{. Leia } ${k}\\vec{a}-\\vec{b} \\text{ teine koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k * ay - by },
        lahendus: [
          `${k}\\vec{a}-\\vec{b} = (${k}\\cdot${ax}-${bx}, ${k}\\cdot${ay}-${by}, ${k}\\cdot${az}-${bz})`,
          `\\text{Teine koordinaat: } ${k}\\cdot${ay}-${by} = ${k * ay - by}`,
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

      return {
        seed: 3,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${ax}, ${ay}, ${az})\\text{, } \\vec{b}=(${bx}, ${by}, ${bz}) \\text{ ja } \\vec{c}=(${cx}, ${cy}, ${cz})\\text{. Leia } \\vec{a}+2\\vec{b}-\\vec{c} \\text{ kolmas koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: az + 2 * bz - cz },
        lahendus: [
          `\\text{Kolmas koordinaat: } ${az}+2\\cdot${bz}-(${cz}) = ${az + 2 * bz - cz}`,
        ],
      };
    },
  },
];
