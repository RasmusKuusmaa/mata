import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-sirge-uldvorrand";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = nonZeroInt(rng, -6, 6);
      const c = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Sirge üldvõrrand on } ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}y ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = 0\\text{. Leia lõikepunkti x-teljega } x\\text{-koordinaat.}`,
        vastus: { tuup: "arv", ...arvVaartus(-c, a) },
        lahendus: [
          `\\text{Kohal } y=0\\text{: } ${a}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = 0 \\quad \\Rightarrow \\quad x = \\dfrac{${-c}}{${a}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = nonZeroInt(rng, -6, 6);
      const c = int(rng, -9, 9);

      return {
        seed: 2,
        kysimus: `\\text{Sirge üldvõrrand on } ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}y ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = 0\\text{. Leia lõikepunkti y-teljega } y\\text{-koordinaat.}`,
        vastus: { tuup: "arv", ...arvVaartus(-c, b) },
        lahendus: [
          `\\text{Kohal } x=0\\text{: } ${b}y ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = 0 \\quad \\Rightarrow \\quad y = \\dfrac{${-c}}{${b}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = nonZeroInt(rng, -6, 6);
      const c = int(rng, -9, 9);

      return {
        seed: 3,
        kysimus: `\\text{Sirge üldvõrrand on } ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}y ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = 0\\text{. Leia sirge tõus.}`,
        vastus: { tuup: "arv", ...arvVaartus(-a, b) },
        lahendus: [
          `y = -\\dfrac{a}{b}x - \\dfrac{c}{b} \\quad \\Rightarrow \\quad k = -\\dfrac{a}{b} = -\\dfrac{${a}}{${b}} = \\dfrac{${-a}}{${b}}`,
        ],
      };
    },
  },
];
