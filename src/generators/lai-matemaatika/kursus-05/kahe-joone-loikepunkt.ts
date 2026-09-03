import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-kahe-joone-loikepunkt";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x0 = int(rng, -8, 8);
      const k1 = nonZeroInt(rng, -6, 6);
      let k2 = nonZeroInt(rng, -6, 6);
      while (k2 === k1) k2 = nonZeroInt(rng, -6, 6);
      const y0 = int(rng, -9, 9);
      const b1 = y0 - k1 * x0;
      const b2 = y0 - k2 * x0;

      return {
        seed: 1,
        kysimus: `\\text{Leia sirgete } y=${k1}x ${b1 >= 0 ? "+" : "-"} ${Math.abs(b1)} \\text{ ja } y=${k2}x ${b2 >= 0 ? "+" : "-"} ${Math.abs(b2)} \\text{ lõikepunkti } x\\text{-koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x0 },
        lahendus: [
          `${k1}x ${b1 >= 0 ? "+" : "-"} ${Math.abs(b1)} = ${k2}x ${b2 >= 0 ? "+" : "-"} ${Math.abs(b2)}`,
          `(${k1}-${k2})x = ${b2}-${b1} \\quad \\Rightarrow \\quad x = ${x0}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const x0 = int(rng, -8, 8);
      const k1 = nonZeroInt(rng, -6, 6);
      let k2 = nonZeroInt(rng, -6, 6);
      while (k2 === k1) k2 = nonZeroInt(rng, -6, 6);
      const y0 = int(rng, -9, 9);
      const b1 = y0 - k1 * x0;
      const b2 = y0 - k2 * x0;

      return {
        seed: 2,
        kysimus: `\\text{Leia sirgete } y=${k1}x ${b1 >= 0 ? "+" : "-"} ${Math.abs(b1)} \\text{ ja } y=${k2}x ${b2 >= 0 ? "+" : "-"} ${Math.abs(b2)} \\text{ lõikepunkti } y\\text{-koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: y0 },
        lahendus: [
          `x=${x0} \\text{ korral: } y = ${k1}\\cdot${x0} ${b1 >= 0 ? "+" : "-"} ${Math.abs(b1)} = ${y0}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x0 = int(rng, 1, 6);
      const y0 = x0 * x0;
      // The other root is k - x0; keeping k ≤ x0 keeps it ≤ 0, so x0 is the
      // unique positive-x intersection.
      const k = nonZeroInt(rng, -6, x0);
      const b = y0 - k * x0;

      return {
        seed: 3,
        kysimus: `\\text{Leia parabooli } y=x^2 \\text{ ja sirge } y=${k}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\text{ lõikepunkti, mille } x\\text{-koordinaat on positiivne.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x0 },
        lahendus: [
          `x^2 = ${k}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\quad \\Rightarrow \\quad x^2 ${-k >= 0 ? "+" : "-"} ${Math.abs(-k)}x ${-b >= 0 ? "+" : "-"} ${Math.abs(-b)} = 0`,
          `\\text{Üks lahenditest on } x=${x0} \\text{ (positiivne).}`,
        ],
      };
    },
  },
];
