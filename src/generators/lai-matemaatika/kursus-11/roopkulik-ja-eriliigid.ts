import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-roopkulik-ja-eriliigid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const base = int(rng, 2, 20);
      const height = int(rng, 2, 20);

      return {
        seed: 1,
        kysimus: `\\text{Rööpküliku alus on } ${base} \\text{ ja kõrgus } ${height}\\text{. Leia rööpküliku pindala.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: base * height },
        lahendus: [`S = a \\cdot h = ${base} \\cdot ${height} = ${base * height}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const half = int(rng, 2, 20);

      return {
        seed: 2,
        kysimus: `\\text{Rööpküliku diagonaalid lõikuvad punktis, mis jagab ühe diagonaali pooleks. Üks pool on } ${half}\\text{. Leia terve diagonaal.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 2 * half },
        lahendus: [
          `\\text{Rööpküliku diagonaalid poolitavad teineteist: } 2 \\cdot ${half} = ${2 * half}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const d1 = int(rng, 2, 20);
      const d2 = int(rng, 2, 20);

      return {
        seed: 3,
        kysimus: `\\text{Rombi diagonaalid on } ${d1} \\text{ ja } ${d2}\\text{. Leia rombi pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(d1 * d2, 2) },
        lahendus: [
          `S = \\dfrac{d_1 d_2}{2} = \\dfrac{${d1}\\cdot${d2}}{2} = \\dfrac{${d1 * d2}}{2}`,
        ],
      };
    },
  },
];
