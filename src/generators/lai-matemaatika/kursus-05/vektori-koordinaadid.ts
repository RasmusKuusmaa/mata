import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-vektori-koordinaadid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x1 = int(rng, -9, 9);
      const y1 = int(rng, -9, 9);
      const x2 = int(rng, -9, 9);
      const y2 = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Leia vektori } \\overrightarrow{AB} \\text{ esimene koordinaat, kui } A(${x1}, ${y1}) \\text{ ja } B(${x2}, ${y2})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x2 - x1 },
        lahendus: [
          `\\overrightarrow{AB} = (x_B-x_A,\\ y_B-y_A) = (${x2}-${x1},\\ ${y2}-${y1}) = (${x2 - x1},\\ ${y2 - y1})`,
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
      const x1 = int(rng, -9, 9);
      const y1 = int(rng, -9, 9);
      const x2 = x1 + ax;

      return {
        seed: 2,
        kysimus: `\\text{Vektor } \\overrightarrow{AB} = (${ax}, ${ay})\\text{, punkt } A(${x1}, ${y1})\\text{. Leia punkti } B \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x2 },
        lahendus: [
          `x_B = x_A + ${ax} = ${x1} + ${ax} = ${x2}`,
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
      const x2 = int(rng, -9, 9);
      const y2 = int(rng, -9, 9);
      const x1 = x2 - ax;

      return {
        seed: 3,
        kysimus: `\\text{Vektor } \\overrightarrow{AB} = (${ax}, ${ay})\\text{, punkt } B(${x2}, ${y2})\\text{. Leia punkti } A \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x1 },
        lahendus: [
          `x_A = x_B - ${ax} = ${x2} - ${ax} = ${x1}`,
        ],
      };
    },
  },
];
