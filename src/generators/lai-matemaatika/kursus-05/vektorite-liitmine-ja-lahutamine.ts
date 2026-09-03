import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-vektorite-liitmine-ja-lahutamine";

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

      return {
        seed: 1,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${ax}, ${ay}) \\text{ ja } \\vec{b}=(${bx}, ${by})\\text{. Leia summa } \\vec{a}+\\vec{b} \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: ax + bx },
        lahendus: [
          `\\vec{a}+\\vec{b} = (${ax}+${bx},\\ ${ay}+${by}) = (${ax + bx},\\ ${ay + by})`,
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

      return {
        seed: 2,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${ax}, ${ay}) \\text{ ja } \\vec{b}=(${bx}, ${by})\\text{. Leia vahe } \\vec{a}-\\vec{b} \\text{ teine koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: ay - by },
        lahendus: [
          `\\vec{a}-\\vec{b} = (${ax}-${bx},\\ ${ay}-${by}) = (${ax - bx},\\ ${ay - by})`,
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
      const rx = ax + bx - cx;

      return {
        seed: 3,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${ax}, ${ay})\\text{, } \\vec{b}=(${bx}, ${by}) \\text{ ja } \\vec{c}=(${cx}, ${cy})\\text{. Leia } \\vec{a}+\\vec{b}-\\vec{c} \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: rx },
        lahendus: [
          `\\vec{a}+\\vec{b}-\\vec{c} \\text{ esimene koordinaat} = ${ax}+${bx}-${cx} = ${rx}`,
        ],
      };
    },
  },
];
