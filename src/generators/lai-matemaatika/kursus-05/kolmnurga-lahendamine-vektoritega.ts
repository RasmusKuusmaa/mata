import { PYTHAGOREAN_TRIPLES } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-kolmnurga-lahendamine-vektoritega";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [dx, dy, len] = pick(rng, PYTHAGOREAN_TRIPLES);
      const x1 = int(rng, -6, 6);
      const y1 = int(rng, -6, 6);
      const x2 = x1 + dx;
      const y2 = y1 + dy;

      return {
        seed: 1,
        kysimus: `\\text{Kolmnurga tipud on } A(${x1}, ${y1}) \\text{ ja } B(${x2}, ${y2})\\text{. Leia külg } AB \\text{ vektori } \\overrightarrow{AB} \\text{ pikkuse kaudu.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: len },
        lahendus: [
          `\\overrightarrow{AB} = (${dx}, ${dy})`,
          `AB = |\\overrightarrow{AB}| = \\sqrt{${dx}^2+${dy}^2} = ${len}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [dx, dy, len] = pick(rng, PYTHAGOREAN_TRIPLES);
      const ax = int(rng, -6, 6);
      const ay = int(rng, -6, 6);
      const bx = ax + 2 * dx;
      const by = ay;
      const cx = ax;
      const cy = ay + 2 * dy;
      const midX = ax + dx;
      const midY = ay + dy;

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurga tipud on } A(${ax}, ${ay})\\text{, } B(${bx}, ${by}) \\text{ ja } C(${cx}, ${cy})\\text{. Leia mediaani } A \\text{-st külje } BC \\text{ keskpunktini pikkus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: len },
        lahendus: [
          `\\text{Külje } BC \\text{ keskpunkt: } M\\left(\\dfrac{${bx}+${cx}}{2}, \\dfrac{${by}+${cy}}{2}\\right) = (${midX}, ${midY})`,
          `\\overrightarrow{AM} = (${midX - ax}, ${midY - ay})\\text{, } AM = \\sqrt{${midX - ax}^2+${midY - ay}^2} = ${len}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const abx = int(rng, -9, 9);
      const aby = int(rng, -9, 9);
      const bcx = int(rng, -9, 9);
      const bcy = int(rng, -9, 9);
      const cax = -(abx + bcx);
      const cay = -(aby + bcy);

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurgas } ABC \\text{ on } \\overrightarrow{AB}=(${abx}, ${aby}) \\text{ ja } \\overrightarrow{BC}=(${bcx}, ${bcy})\\text{. Leia vektori } \\overrightarrow{CA} \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: cax },
        lahendus: [
          `\\text{Kolmnurga vektorite summa on null: } \\overrightarrow{AB}+\\overrightarrow{BC}+\\overrightarrow{CA}=\\vec0`,
          `\\overrightarrow{CA} = -(\\overrightarrow{AB}+\\overrightarrow{BC}) = -(${abx}+${bcx}, ${aby}+${bcy}) = (${cax}, ${cay})`,
        ],
      };
    },
  },
];
