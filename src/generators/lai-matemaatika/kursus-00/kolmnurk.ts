import { int } from "@/generators/rng";
import { arvVaartus, niceTriangle } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-kolmnurga-umbermoot-ja-pindala";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 3, 15);
      const b = int(rng, 3, 15);
      const c = int(rng, 3, 15);
      const tulemus = a + b + c;

      return {
        seed: 1,
        kysimus: `\\text{Kolmnurga küljed on } ${a}\\text{, } ${b} \\text{ ja } ${c}\\text{ (pikkusühikutes). Leia kolmnurga ümbermõõt.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Ümbermõõt on kõigi külgede summa:}`,
          `P = ${a} + ${b} + ${c} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const alus = int(rng, 4, 20);
      // Even height guarantees an integer area regardless of the base.
      const korgus = 2 * int(rng, 1, 6);
      const tulemus = (alus * korgus) / 2;

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurga alus on } ${alus} \\text{ ja kõrgus } ${korgus}\\text{. Leia kolmnurga pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Kolmnurga pindala on } S = \\dfrac{a \\cdot h}{2}\\text{:}`,
          `S = \\dfrac{${alus} \\cdot ${korgus}}{2} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { sides } = niceTriangle(rng);
      const [a, b, c] = sides;
      const tulemus = (a * b) / 2;

      return {
        seed: 3,
        kysimus: `\\text{Täisnurkse kolmnurga kaatetid on } ${a} \\text{ ja } ${b}\\text{, hüpotenuus } ${c}\\text{. Leia kolmnurga pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Täisnurkse kolmnurga pindala on pool kaatetite korrutisest:}`,
          `S = \\dfrac{${a} \\cdot ${b}}{2} = ${tulemus}`,
        ],
      };
    },
  },
];
