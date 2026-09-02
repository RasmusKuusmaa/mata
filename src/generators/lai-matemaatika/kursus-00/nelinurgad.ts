import { int } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-nelinurkade-pindalad";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 3, 20);
      const b = int(rng, 3, 20);
      const tulemus = a * b;

      return {
        seed: 1,
        kysimus: `\\text{Ristküliku küljed on } ${a} \\text{ ja } ${b}\\text{. Leia ristküliku pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Ristküliku pindala on külgede korrutis:}`,
          `S = ${a} \\cdot ${b} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const d1 = int(rng, 4, 20);
      // Even d2 guarantees an integer area regardless of d1.
      const d2 = 2 * int(rng, 2, 10);
      const tulemus = (d1 * d2) / 2;

      return {
        seed: 2,
        kysimus: `\\text{Rombi diagonaalid on } ${d1} \\text{ ja } ${d2}\\text{. Leia rombi pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Rombi pindala on pool diagonaalide korrutisest:}`,
          `S = \\dfrac{${d1} \\cdot ${d2}}{2} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 4, 15);
      const b = int(rng, 4, 15);
      // Even height guarantees an integer area regardless of a + b's parity.
      const h = 2 * int(rng, 1, 8);
      const tulemus = ((a + b) * h) / 2;

      return {
        seed: 3,
        kysimus: `\\text{Trapetsi alused on } ${a} \\text{ ja } ${b}\\text{, kõrgus } ${h}\\text{. Leia trapetsi pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Trapetsi pindala on aluste poolsumma korda kõrgus:}`,
          `S = \\dfrac{${a} + ${b}}{2} \\cdot ${h} = ${tulemus}`,
        ],
      };
    },
  },
];
