import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "14-eksponentmudelid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const y0 = int(rng, 5, 50);
      const t = int(rng, 1, 5);

      return {
        seed: 1,
        kysimus: `\\text{Bakterite arv kahekordistub iga tunniga. Alguses on } ${y0} \\text{ rakku. Leia bakterite arv } ${t} \\text{ tunni pärast.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: y0 * 2 ** t },
        lahendus: [
          `y = ${y0}\\cdot2^${t} = ${y0 * 2 ** t}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const alus = pick(rng, [2, 3] as const);
      const y0 = int(rng, 2, 20);
      const t = int(rng, 1, 4);

      return {
        seed: 2,
        kysimus: `\\text{Populatsiooni suurus mudeldub valemiga } y(t)=${y0}\\cdot${alus}^t\\text{. Leia populatsiooni suurus, kui } t=${t}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: y0 * alus ** t },
        lahendus: [
          `y(${t}) = ${y0}\\cdot${alus}^${t} = ${y0 * alus ** t}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const m = int(rng, 2, 10);
      const t = int(rng, 1, 3);
      const nyydne = m * 2 ** t;

      return {
        seed: 3,
        kysimus: `\\text{Aine kogus kahaneb poole võrra iga } 1 \\text{ tunniga. Praegu on ainet } ${nyydne} \\text{ grammi. Kui palju oli ainet } ${t} \\text{ tundi tagasi?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: nyydne * 2 ** t },
        lahendus: [
          `\\text{Varasem kogus} \\cdot\\left(\\dfrac12\\right)^{${t}} = ${nyydne} \\quad\\Rightarrow\\quad \\text{varasem kogus} = ${nyydne}\\cdot2^${t} = ${nyydne * 2 ** t}`,
        ],
      };
    },
  },
];
