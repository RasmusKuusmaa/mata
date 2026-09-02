import { int } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-risttahuka-ja-kuubi-ruumala";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 2, 12);
      const tulemus = a * a * a;

      return {
        seed: 1,
        kysimus: `\\text{Kuubi serva pikkus on } ${a}\\text{. Leia kuubi ruumala.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Kuubi ruumala on } V = a^3\\text{:}`,
          `V = ${a}^3 = ${tulemus}`,
        ],
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
      const c = int(rng, 2, 12);
      const tulemus = a * b * c;

      return {
        seed: 2,
        kysimus: `\\text{Risttahuka mõõtmed on } ${a}\\text{, } ${b} \\text{ ja } ${c}\\text{. Leia risttahuka ruumala.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Risttahuka ruumala on } V = a \\cdot b \\cdot c\\text{:}`,
          `V = ${a} \\cdot ${b} \\cdot ${c} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 2, 10);
      const b = int(rng, 2, 10);
      const c = int(rng, 2, 10);
      const tulemus = 2 * (a * b + b * c + c * a);

      return {
        seed: 3,
        kysimus: `\\text{Risttahuka mõõtmed on } ${a}\\text{, } ${b} \\text{ ja } ${c}\\text{. Leia risttahuka pindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Risttahuka pindala on kuue tahu pindalade summa:}`,
          `S = 2(ab + bc + ca) = 2(${a * b} + ${b * c} + ${c * a}) = ${tulemus}`,
        ],
      };
    },
  },
];
