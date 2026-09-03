import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-jaotuspolygoon";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 1, 4);
      const b = int(rng, 1, 6 - a);
      const missing = 6 - a - b;

      return {
        seed: 1,
        kysimus: `\\text{Juhusliku suuruse } X \\text{ jaotus on antud tabeliga: } P(X{=}1)=\\dfrac{${a}}{6}\\text{, } P(X{=}2)=\\dfrac{${b}}{6}\\text{, } P(X{=}3)=?\\text{. Leia } P(X{=}3) \\text{ lugeja (nimetaja 6).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: missing },
        lahendus: [
          `\\text{Kõigi tõenäosuste summa on } 1\\text{:}`,
          `\\dfrac{${a}}{6}+\\dfrac{${b}}{6}+P(X{=}3)=1 \\quad \\Rightarrow \\quad P(X{=}3)=\\dfrac{${missing}}{6}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 1, 3);
      const b = int(rng, 1, 3);
      const c = int(rng, 1, 12 - a - b - 1);
      const missing = 12 - a - b - c;

      return {
        seed: 2,
        kysimus: `\\text{Juhusliku suuruse } X \\text{ jaotus: } P(X{=}1)=\\dfrac{${a}}{12}\\text{, } P(X{=}2)=\\dfrac{${b}}{12}\\text{, } P(X{=}3)=\\dfrac{${c}}{12}\\text{, } P(X{=}4)=?\\text{. Leia } P(X{=}4) \\text{ lugeja (nimetaja 12).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: missing },
        lahendus: [
          `\\dfrac{${a}+${b}+${c}}{12}+P(X{=}4)=1 \\quad \\Rightarrow \\quad P(X{=}4)=\\dfrac{${missing}}{12}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 1, 3);
      const b = int(rng, 1, 4);
      const missingNum = 12 - a - b;

      return {
        seed: 3,
        kysimus: `\\text{Juhusliku suuruse } X \\text{ jaotus: } P(X{=}0)=\\dfrac{${a}}{12}\\text{, } P(X{=}1)=\\dfrac{${b}}{12}\\text{, } P(X{=}2)=p\\text{. Leia } E(X) = 0\\cdot P(X{=}0)+1\\cdot P(X{=}1)+2\\cdot P(X{=}2)\\text{, kui } p \\text{ täidab jaotustingimuse.}`,
        vastus: { tuup: "arv", ...arvVaartus(b + 2 * missingNum, 12) },
        lahendus: [
          `p = 1-\\dfrac{${a}}{12}-\\dfrac{${b}}{12} = \\dfrac{${missingNum}}{12}`,
          `E(X) = 0\\cdot\\dfrac{${a}}{12}+1\\cdot\\dfrac{${b}}{12}+2\\cdot\\dfrac{${missingNum}}{12} = \\dfrac{${b}+2\\cdot${missingNum}}{12} = \\dfrac{${b + 2 * missingNum}}{12}`,
        ],
      };
    },
  },
];
