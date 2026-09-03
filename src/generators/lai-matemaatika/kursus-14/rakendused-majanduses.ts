import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "14-rakendused-majanduses";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const yhikuhind = int(rng, 5, 15);
      const kogus = int(rng, 10, 100);

      return {
        seed: 1,
        kysimus: `\\text{Toote hind on } ${yhikuhind} \\text{ eurot ühik. Leia tulu, kui müüakse } ${kogus} \\text{ ühikut.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: yhikuhind * kogus },
        lahendus: [`T = ${yhikuhind}\\cdot${kogus} = ${yhikuhind * kogus}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const algkulu = int(rng, 200, 800);
      const yhikukulu = int(rng, 5, 15);
      const hind = yhikukulu + int(rng, 5, 25);
      const kasumMarginaal = hind - yhikukulu;
      const x = Math.ceil(algkulu / kasumMarginaal);
      const algkuluNice = kasumMarginaal * x;

      return {
        seed: 2,
        kysimus: `\\text{Firma püsikulud on } ${algkuluNice} \\text{ eurot ja muutuvkulu ühiku kohta } ${yhikukulu} \\text{ eurot. Toote müügihind on } ${hind} \\text{ eurot ühik. Mitu ühikut tuleb müüa, et jõuda tasuvuspunktini (kasum } 0\\text{)?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x },
        lahendus: [
          `${hind}x = ${algkuluNice}+${yhikukulu}x`,
          `${kasumMarginaal}x = ${algkuluNice} \\quad\\Rightarrow\\quad x = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const intress = int(rng, 2, 8);
      const base = int(rng, 5, 20);
      const hoius = base * 100;
      const tulemus = base * (100 + intress);

      return {
        seed: 3,
        kysimus: `\\text{Hoius } ${hoius} \\text{ eurot kasvab intressimääraga } ${intress}\\% \\text{ aastas. Leia hoiuse suurus } 1 \\text{ aasta pärast.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: tulemus },
        lahendus: [
          `K_1 = K_0\\left(1+\\dfrac{${intress}}{100}\\right) = ${hoius}\\cdot\\dfrac{${100 + intress}}{100} = ${tulemus}`,
        ],
      };
    },
  },
];
