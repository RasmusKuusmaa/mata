import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-sirge-vorrandid-ruumis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x0 = int(rng, -6, 6);
      const y0 = int(rng, -6, 6);
      const z0 = int(rng, -6, 6);
      const m = nonZeroInt(rng, -5, 5);
      const n = int(rng, -5, 5);
      const p = int(rng, -5, 5);
      const t = int(rng, 1, 4);

      return {
        seed: 1,
        kysimus: `\\text{Sirge parameetriline võrrand: } x=${x0}+${m}t,\\ y=${y0}+${n}t,\\ z=${z0}+${p}t\\text{. Leia punkti } x\\text{-koordinaat, kui } t=${t}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x0 + m * t },
        lahendus: [`x = ${x0}+${m}\\cdot${t} = ${x0 + m * t}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const x1 = int(rng, -6, 6);
      const y1 = int(rng, -6, 6);
      const z1 = int(rng, -6, 6);
      const mx = nonZeroInt(rng, -5, 5);
      const my = nonZeroInt(rng, -5, 5);
      const mz = nonZeroInt(rng, -5, 5);
      const x2 = x1 + mx;
      const y2 = y1 + my;
      const z2 = z1 + mz;

      return {
        seed: 2,
        kysimus: `\\text{Sirge läbib punkte } A(${x1}, ${y1}, ${z1}) \\text{ ja } B(${x2}, ${y2}, ${z2})\\text{. Leia sirge sihivektori teine koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: my },
        lahendus: [
          `\\vec{s} = \\overrightarrow{AB} = (${x2}-(${x1}), ${y2}-(${y1}), ${z2}-(${z1})) = (${mx}, ${my}, ${mz})`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x0 = int(rng, -5, 5);
      const y0 = int(rng, -5, 5);
      const z0 = int(rng, -5, 5);
      const m = nonZeroInt(rng, 2, 5);
      const n = nonZeroInt(rng, -5, 5);
      const p = nonZeroInt(rng, -5, 5);
      const x = x0 + m;

      return {
        seed: 3,
        kysimus: `\\text{Sirge kanooniline võrrand: } \\dfrac{x-(${x0})}{${m}}=\\dfrac{y-(${y0})}{${n}}=\\dfrac{z-(${z0})}{${p}}\\text{. Leia punkti } y\\text{-koordinaat, kui } x=${x}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: y0 + n },
        lahendus: [
          `\\dfrac{${x}-(${x0})}{${m}}=1 \\quad\\Rightarrow\\quad y = ${y0}+1\\cdot${n} = ${y0 + n}`,
        ],
      };
    },
  },
];
