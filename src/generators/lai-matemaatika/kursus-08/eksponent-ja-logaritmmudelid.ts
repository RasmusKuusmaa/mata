import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-eksponent-ja-logaritmmudelid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a0 = int(rng, 100, 1000);
      const n = int(rng, 2, 6);
      const value = a0 * 2 ** n;

      return {
        seed: 1,
        kysimus: `\\text{Baktereid on alguses } ${a0}\\text{. Populatsioon kahekordistub iga tunniga. Mitu bakterit on } ${n} \\text{ tunni pärast?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Mudel: } A(t) = A_0 \\cdot 2^t\\text{.}`,
          `A(${n}) = ${a0} \\cdot 2^{${n}} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = int(rng, 2, 4);
      const a0 = 2 ** n * int(rng, 1, 20);
      const value = a0 / 2 ** n;

      return {
        seed: 2,
        kysimus: `\\text{Radioaktiivse aine kogus poolestub iga } 1000 \\text{ aastaga. Algkogus on } ${a0} \\text{ grammi. Kui palju ainet on alles } ${n * 1000} \\text{ aasta pärast?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Mudel: } A(t) = A_0 \\cdot \\left(\\dfrac{1}{2}\\right)^n\\text{, kus } n \\text{ on poolestusaegade arv.}`,
          `A = ${a0} \\cdot \\left(\\dfrac{1}{2}\\right)^{${n}} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a0 = int(rng, 10, 100);
      const n0 = int(rng, 2, 6);
      const target = a0 * 2 ** n0;

      return {
        seed: 3,
        kysimus: `\\text{Baktereid on alguses } ${a0}\\text{. Populatsioon kahekordistub iga tunniga. Mitme tunni pärast on baktereid } ${target}\\text{?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: n0 },
        lahendus: [
          `${a0} \\cdot 2^t = ${target} \\quad \\Rightarrow \\quad 2^t = ${2 ** n0} \\quad \\Rightarrow \\quad t = \\log_2 ${2 ** n0} = ${n0}`,
        ],
      };
    },
  },
];
