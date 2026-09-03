import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-sirge-punkti-ja-sihivektoriga";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x0 = int(rng, -9, 9);
      const y0 = int(rng, -9, 9);
      const a = nonZeroInt(rng, -6, 6);
      const b = nonZeroInt(rng, -6, 6);
      const t = int(rng, -4, 4);

      return {
        seed: 1,
        kysimus: `\\text{Sirge on antud kujul } (x,y)=(${x0}, ${y0})+t(${a}, ${b})\\text{. Leia punkti } x\\text{-koordinaat, kui } t=${t}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x0 + t * a },
        lahendus: [
          `x = ${x0} + ${t}\\cdot${a} = ${x0 + t * a}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const x0 = int(rng, -9, 9);
      const y0 = int(rng, -9, 9);
      const a = nonZeroInt(rng, -6, 6);
      const b = nonZeroInt(rng, -6, 6);
      const t = int(rng, -4, 4);

      return {
        seed: 2,
        kysimus: `\\text{Sirge on antud kujul } (x,y)=(${x0}, ${y0})+t(${a}, ${b})\\text{. Leia punkti } y\\text{-koordinaat, kui } t=${t}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: y0 + t * b },
        lahendus: [
          `y = ${y0} + ${t}\\cdot${b} = ${y0 + t * b}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x0 = int(rng, -9, 9);
      const y0 = int(rng, -9, 9);
      const a = nonZeroInt(rng, 1, 6);
      const b = nonZeroInt(rng, -6, 6);
      const t = int(rng, -4, 4);
      const px = x0 + t * a;
      const py = y0 + t * b;

      return {
        seed: 3,
        kysimus: `\\text{Sirge on antud kujul } (x,y)=(${x0}, ${y0})+t(${a}, ${b})\\text{. Punkt } (${px}, py) \\text{ asub sellel sirgel. Leia } py\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: py },
        lahendus: [
          `${px} = ${x0} + t\\cdot${a} \\quad \\Rightarrow \\quad t = ${t}`,
          `py = ${y0} + ${t}\\cdot${b} = ${py}`,
        ],
      };
    },
  },
];
