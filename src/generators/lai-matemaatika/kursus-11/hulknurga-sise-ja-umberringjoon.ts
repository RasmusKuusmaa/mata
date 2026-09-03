import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-hulknurga-sise-ja-umberringjoon";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r = int(rng, 2, 20);

      return {
        seed: 1,
        kysimus: `\\text{Korrapärase kuusnurga ümberringjoone raadius on } ${r}\\text{. Leia kuusnurga külje pikkus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: r },
        lahendus: [
          `\\text{Korrapärase kuusnurga korral võrdub külg ümberringjoone raadiusega: } ${r}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const r = int(rng, 2, 20);

      return {
        seed: 2,
        kysimus: `\\text{Korrapärase kuusnurga ümberringjoone raadius on } ${r}\\text{. Leia siseringjoone raadius (kordajana arvust } \\sqrt3\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: 3, numerator: r, denominator: 2 } },
        lahendus: [
          `\\text{Siseringjoone raadius (apoteem)} = \\dfrac{R\\sqrt3}{2} = \\dfrac{${r}\\sqrt3}{2}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const r = int(rng, 2, 20);

      return {
        seed: 3,
        kysimus: `\\text{Korrapärase nelinurga (ruudu) ümberringjoone raadius on } ${r}\\text{. Leia ruudu külje pikkus (kordajana arvust } \\sqrt2\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: 2, numerator: r } },
        lahendus: [
          `\\text{Ruudu diagonaal on } 2R=${2 * r}\\text{. Külg} = \\dfrac{\\text{diagonaal}}{\\sqrt2} = \\dfrac{${2 * r}}{\\sqrt2} = ${r}\\sqrt2`,
        ],
      };
    },
  },
];
