import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-hyperbool";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -9, 9);
      const m = nonZeroInt(rng, -6, 6);
      const k = x * m;

      return {
        seed: 1,
        kysimus: `\\text{Hüperbool on } y=\\dfrac{${k}}{x}\\text{. Leia } y\\text{, kui } x=${x}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m },
        lahendus: [`y = \\dfrac{${k}}{${x}} = ${m}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 2, 12);
      const b = int(rng, 2, 12);

      return {
        seed: 2,
        kysimus: `\\text{Hüperbool on } \\dfrac{x^2}{${a * a}}-\\dfrac{y^2}{${b * b}}=1\\text{. Leia hüperbooli tipu } x\\text{-koordinaat (positiivne haru).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a },
        lahendus: [
          `\\text{Kohal } y=0\\text{: } \\dfrac{x^2}{${a * a}}=1 \\quad \\Rightarrow \\quad x=\\pm${a}\\text{, positiivne tipp on } x=${a}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 2, 12);
      const b = int(rng, 2, 12);

      return {
        seed: 3,
        kysimus: `\\text{Hüperbool on } \\dfrac{x^2}{${a * a}}-\\dfrac{y^2}{${b * b}}=1\\text{. Leia hüperbooli asümptootide tõus (positiivne).}`,
        vastus: { tuup: "arv", ...arvVaartus(b, a) },
        lahendus: [
          `\\text{Asümptoodid on } y=\\pm\\dfrac{b}{a}x = \\pm\\dfrac{${b}}{${a}}x`,
        ],
      };
    },
  },
];
