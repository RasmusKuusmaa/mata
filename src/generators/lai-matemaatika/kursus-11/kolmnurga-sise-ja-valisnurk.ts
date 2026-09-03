import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-kolmnurga-sise-ja-valisnurk";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 20, 80);
      const b = int(rng, 20, 80);

      return {
        seed: 1,
        kysimus: `\\text{Kolmnurga kaks nurka on } ${a}^\\circ \\text{ ja } ${b}^\\circ\\text{. Leia kolmandale tipule vastav välisnurk.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a + b },
        lahendus: [
          `\\text{Välisnurk võrdub kahe mittekülgneva sisenurga summaga: } ${a}^\\circ + ${b}^\\circ = ${a + b}^\\circ`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const ext = int(rng, 90, 170);
      const b = int(rng, 20, ext - 20);
      const c = ext - b;

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurga tipu } A \\text{ välisnurk on } ${ext}^\\circ \\text{ ja tipu } B \\text{ sisenurk on } ${b}^\\circ\\text{. Leia tipu } C \\text{ sisenurk.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: c },
        lahendus: [
          `\\text{Tipu } A \\text{ välisnurk võrdub tippude } B \\text{ ja } C \\text{ sisenurkade summaga:}`,
          `${ext}^\\circ = ${b}^\\circ + C \\quad \\Rightarrow \\quad C = ${c}^\\circ`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const ext1 = int(rng, 100, 170);
      const ext2 = int(rng, 100, 170);
      const ext3 = 360 - ext1 - ext2;

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurga kahe tipu välisnurgad on } ${ext1}^\\circ \\text{ ja } ${ext2}^\\circ\\text{. Leia kolmanda tipu välisnurk.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: ext3 },
        lahendus: [
          `\\text{Kolmnurga kõigi välisnurkade summa on alati } 360^\\circ\\text{:}`,
          `360^\\circ - ${ext1}^\\circ - ${ext2}^\\circ = ${ext3}^\\circ`,
        ],
      };
    },
  },
];
