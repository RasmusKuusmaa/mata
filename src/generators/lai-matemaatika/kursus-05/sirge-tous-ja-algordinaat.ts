import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-sirge-tous-ja-algordinaat";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, -6, 6);
      const b = int(rng, -9, 9);
      const x = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Sirge on } y=${k}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}\\text{. Leia } y\\text{, kui } x=${x}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k * x + b },
        lahendus: [`y = ${k}\\cdot${x} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${k * x + b}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, -6, 6);
      const b = nonZeroInt(rng, -9, 9);

      return {
        seed: 2,
        kysimus: `\\text{Sirge on } y=${k}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}\\text{. Leia sirge ja x-telje lõikepunkti } x\\text{-koordinaat.}`,
        vastus: { tuup: "arv", ...arvVaartus(-b, k) },
        lahendus: [
          `0 = ${k}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\quad \\Rightarrow \\quad x = \\dfrac{${-b}}{${k}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, -6, 6);
      const x0 = int(rng, -6, 6);
      const y0 = int(rng, -9, 9);
      const b = y0 - k * x0;

      return {
        seed: 3,
        kysimus: `\\text{Sirge tõus on } k=${k} \\text{ ja sirge läbib punkti } (${x0}, ${y0})\\text{. Leia algordinaat } b\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: b },
        lahendus: [
          `${y0} = ${k}\\cdot${x0} + b \\quad \\Rightarrow \\quad b = ${y0} - ${k * x0} = ${b}`,
        ],
      };
    },
  },
];
