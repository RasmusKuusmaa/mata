import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-ringjoone-pikkus-ja-pindala-piirvaartusena";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r = int(rng, 2, 20);

      return {
        seed: 1,
        kysimus: `\\text{Ringjoonesse (raadius } ${r}\\text{) on sisse kirjutatud korrapärane kuusnurk — hulknurk, mille sisse kirjutatud külgede arvu suurendades läheneb ümbermõõt ringjoone pikkusele. Leia kuusnurga ümbermõõt (kuusnurga külg võrdub raadiusega).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 6 * r },
        lahendus: [
          `\\text{Korrapärase sisse kirjutatud kuusnurga külg võrdub raadiusega: külg} = ${r}\\text{.}`,
          `\\text{Ümbermõõt} = 6 \\cdot ${r} = ${6 * r}`,
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
        kysimus: `\\text{Ringjoonesse (raadius } ${r}\\text{) on sisse kirjutatud korrapärane kuusnurk. Leia kuusnurga pindala (kordajana arvust } \\sqrt3\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: 3, numerator: 3 * r * r, denominator: 2 } },
        lahendus: [
          `\\text{Korrapärase kuusnurga pindala raadiusega } r\\text{: } S = \\dfrac{3\\sqrt3}{2}r^2\\text{.}`,
          `S = \\dfrac{3\\sqrt3}{2} \\cdot ${r}^2 = \\dfrac{${3 * r * r}\\sqrt3}{2}`,
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
        kysimus: `\\text{Ringjoonesse (raadius } ${r}\\text{) on sisse kirjutatud ruut (nelinurk). Leia ruudu ümbermõõt (kordajana arvust } \\sqrt2\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: 2, numerator: 4 * r } },
        lahendus: [
          `\\text{Ringjoonesse sisse kirjutatud ruudu külg on } r\\sqrt2\\text{ (diagonaal} = 2r\\text{).}`,
          `\\text{Ümbermõõt} = 4 \\cdot ${r}\\sqrt2 = ${4 * r}\\sqrt2`,
        ],
      };
    },
  },
];
