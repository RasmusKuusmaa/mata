import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-sirge-kahe-punktiga";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x1 = int(rng, -6, 6);
      const y1 = int(rng, -9, 9);
      const dx = nonZeroInt(rng, -5, 5);
      const dy = int(rng, -9, 9);
      const x2 = x1 + dx;
      const y2 = y1 + dy;

      return {
        seed: 1,
        kysimus: `\\text{Sirge läbib punkte } (${x1}, ${y1}) \\text{ ja } (${x2}, ${y2})\\text{. Leia sirge tõus.}`,
        vastus: { tuup: "arv", ...arvVaartus(dy, dx) },
        lahendus: [
          `k = \\dfrac{${y2}-${y1}}{${x2}-${x1}} = \\dfrac{${dy}}{${dx}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const x1 = int(rng, -6, 6);
      const y1 = int(rng, -9, 9);
      const k = nonZeroInt(rng, -6, 6);
      const dx = nonZeroInt(rng, 1, 5);
      const x2 = x1 + dx;
      const y2 = y1 + k * dx;
      const b = y1 - k * x1;

      return {
        seed: 2,
        kysimus: `\\text{Sirge läbib punkte } (${x1}, ${y1}) \\text{ ja } (${x2}, ${y2})\\text{. Leia sirge algordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: b },
        lahendus: [
          `k = \\dfrac{${y2}-${y1}}{${x2}-${x1}} = ${k}`,
          `b = y_1 - kx_1 = ${y1} - ${k}\\cdot${x1} = ${b}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x1 = int(rng, -6, 6);
      const y1 = int(rng, -9, 9);
      const k = nonZeroInt(rng, -6, 6);
      const dx = nonZeroInt(rng, 1, 5);
      const x2 = x1 + dx;
      const y2 = y1 + k * dx;
      const b = y1 - k * x1;

      return {
        seed: 3,
        kysimus: `\\text{Sirge läbib punkte } (${x1}, ${y1}) \\text{ ja } (${x2}, ${y2})\\text{. Leia sirge lõikepunkti } x\\text{-teljega } x\\text{-koordinaat.}`,
        vastus: { tuup: "arv", ...arvVaartus(-b, k) },
        lahendus: [
          `k = ${k}\\text{, } b = ${b}`,
          `0 = ${k}x + ${b} \\quad \\Rightarrow \\quad x = \\dfrac{${-b}}{${k}}`,
        ],
      };
    },
  },
];
