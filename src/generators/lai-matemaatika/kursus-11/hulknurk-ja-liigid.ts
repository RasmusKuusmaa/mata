import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-hulknurk-ja-liigid";

const NIMED = [
  { n: 3, nimi: "kolmnurk" },
  { n: 4, nimi: "nelinurk" },
  { n: 5, nimi: "viisnurk" },
  { n: 6, nimi: "kuusnurk" },
  { n: 7, nimi: "seitsmenurk" },
  { n: 8, nimi: "kaheksanurk" },
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const n = int(rng, 4, 12);
      const diagonals = (n * (n - 3)) / 2;

      return {
        seed: 1,
        kysimus: `\\text{Kumeral hulknurgal on } ${n} \\text{ tippu. Leia diagonaalide arv.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: diagonals },
        lahendus: [
          `\\text{Diagonaalide arv} = \\dfrac{n(n-3)}{2} = \\dfrac{${n}\\cdot${n - 3}}{2} = ${diagonals}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = int(rng, 4, 12);
      const diagonals = (n * (n - 3)) / 2;

      return {
        seed: 2,
        kysimus: `\\text{Kumeral hulknurgal on } ${diagonals} \\text{ diagonaali. Leia tippude arv.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: n },
        lahendus: [
          `\\dfrac{n(n-3)}{2} = ${diagonals} \\quad \\Rightarrow \\quad n = ${n}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const valitud = pick(rng, NIMED);
      const eksitajad = NIMED.filter((v) => v.nimi !== valitud.nimi)
        .map((v) => v.nimi)
        .slice(0, 3);

      return {
        seed: 3,
        kysimus: `\\text{Mis nime kannab hulknurk, millel on } ${valitud.n} \\text{ tippu?}`,
        vastus: { tuup: "valik", oige: valitud.nimi, eksitajad },
        lahendus: [`${valitud.n} \\text{ tipuga hulknurga nimi on } \\textbf{${valitud.nimi}}\\text{.}`],
      };
    },
  },
];
