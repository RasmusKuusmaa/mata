import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-kesklõik";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const side = int(rng, 2, 30);

      return {
        seed: 1,
        kysimus: `\\text{Kolmnurga külg on } ${side}\\text{. Leia sellega paralleelse kesklõigu pikkus.}`,
        vastus: { tuup: "arv", ...arvVaartus(side, 2) },
        lahendus: [
          `\\text{Kesklõik on pool paralleelsest küljest: } \\dfrac{${side}}{2}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const side = int(rng, 2, 15) * 2;
      const mid = side / 2;

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurga kesklõik on } ${mid}\\text{. Leia sellega paralleelne külg.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: side },
        lahendus: [
          `\\text{Külg on kaks korda pikem kui kesklõik: } 2\\cdot${mid} = ${side}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const perimeter = int(rng, 3, 60) * 2;

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurga ümbermõõt on } ${perimeter}\\text{. Kolme kesklõiguga moodustatud kolmnurga ümbermõõt on pool algse kolmnurga ümbermõõdust. Leia kesklõikude kolmnurga ümbermõõt.}`,
        vastus: { tuup: "arv", ...arvVaartus(perimeter, 2) },
        lahendus: [
          `\\text{Iga kesklõik on pool vastavast küljest, seega ka ümbermõõt on pool: } \\dfrac{${perimeter}}{2}`,
        ],
      };
    },
  },
];
