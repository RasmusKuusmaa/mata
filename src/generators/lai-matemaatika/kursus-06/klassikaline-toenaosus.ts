import { arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-klassikaline-toenaosus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const total = int(rng, 6, 12);
      const favorable = int(rng, 1, total - 1);

      return {
        seed: 1,
        kysimus: `\\text{Kotis on } ${total} \\text{ ühesugust palli, millest } ${favorable} \\text{ on punased. Leia tõenäosus, et pimesi tõmmatud pall on punane.}`,
        vastus: { tuup: "arv", ...arvVaartus(favorable, total) },
        lahendus: [
          `P = \\dfrac{\\text{soodsad}}{\\text{kõik}} = \\dfrac{${favorable}}{${total}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = int(rng, 2, 3);

      return {
        seed: 2,
        kysimus: `\\text{Visatakse } ${n} \\text{ münti korraga. Leia tõenäosus, et kõik tulevad kirjad.}`,
        vastus: { tuup: "arv", ...arvVaartus(1, 2 ** n) },
        lahendus: [
          `\\text{Kõiki võimalusi on } 2^{${n}}=${2 ** n}\\text{, soodne on ainult üks: } P=\\dfrac{1}{${2 ** n}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      // Sums whose favourable-outcome count over 36 reduces to a nice
      // fraction (denominator ≤ 12) — most sums (e.g. 6, 8) don't.
      const target = pick(rng, [4, 5, 7, 9, 10] as const);
      // Count pairs (d1, d2) ∈ {1..6}² whose sum equals `target`.
      let favorable = 0;
      for (let d1 = 1; d1 <= 6; d1++) {
        if (target - d1 >= 1 && target - d1 <= 6) favorable++;
      }

      return {
        seed: 3,
        kysimus: `\\text{Visatakse kaks täringut. Leia tõenäosus, et silmade summa on } ${target}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(favorable, 36) },
        lahendus: [
          `\\text{Kõiki võimalusi on } 36\\text{, soodsaid on } ${favorable}\\text{:}`,
          `P = \\dfrac{${favorable}}{36}`,
        ],
      };
    },
  },
];
