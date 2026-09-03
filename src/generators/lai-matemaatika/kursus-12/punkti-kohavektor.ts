import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-punkti-kohavektor";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x = int(rng, -9, 9);
      const y = int(rng, -9, 9);
      const z = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Punkti } P \\text{ kohavektor on } \\overrightarrow{OP}=(${x}, ${y}, ${z})\\text{. Leia punkti } P \\text{ teine koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: y },
        lahendus: [
          `\\text{Kohavektori koordinaadid on ühtlasi punkti koordinaadid: } P(${x}, ${y}, ${z})\\text{.}`,
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
      const bx = int(rng, -9, 9);
      const by = int(rng, -9, 9);
      const bz = int(rng, -9, 9);

      return {
        seed: 2,
        kysimus: `\\text{Punktid on } A(${ax}, ${ay}, ${az}) \\text{ ja } B(${bx}, ${by}, ${bz})\\text{. Leia vektori } \\overrightarrow{AB} \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: bx - ax },
        lahendus: [
          `\\overrightarrow{AB} = \\overrightarrow{OB}-\\overrightarrow{OA} = (${bx}-(${ax}), ${by}-(${ay}), ${bz}-(${az})) = (${bx - ax}, ${by - ay}, ${bz - az})`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const ax = int(rng, -8, 8);
      const ay = int(rng, -8, 8);
      const az = int(rng, -8, 8);
      const mx = int(rng, -8, 8);
      const my = int(rng, -8, 8);
      const mz = int(rng, -8, 8);
      // M on lõigu AB keskpunkt: B = 2M - A.
      const bx = 2 * mx - ax;

      return {
        seed: 3,
        kysimus: `\\text{Lõigu } AB \\text{ keskpunkt on } M(${mx}, ${my}, ${mz}) \\text{ ja } A(${ax}, ${ay}, ${az})\\text{. Leia punkti } B \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: bx },
        lahendus: [
          `M = \\dfrac{A+B}{2} \\quad\\Rightarrow\\quad B = 2M-A`,
          `B_x = 2\\cdot${mx}-(${ax}) = ${bx}`,
        ],
      };
    },
  },
];
