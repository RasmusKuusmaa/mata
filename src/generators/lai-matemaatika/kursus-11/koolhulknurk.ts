import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-koolhulknurk";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 30, 150);

      return {
        seed: 1,
        kysimus: `\\text{Ringjoonesse joonistatud nelinurga üks nurk on } ${a}^\\circ\\text{. Leia sellele vastasnurk.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 180 - a },
        lahendus: [
          `\\text{Kõõlnelinurga vastasnurkade summa on } 180^\\circ\\text{:}`,
          `180^\\circ - ${a}^\\circ = ${180 - a}^\\circ`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 30, 150);
      const b = int(rng, 30, 150);
      const d = 180 - a;

      return {
        seed: 2,
        kysimus: `\\text{Ringjoonesse joonistatud nelinurga kaks kõrvutiasetsevat nurka on } ${a}^\\circ \\text{ ja } ${b}^\\circ\\text{. Leia kolmanda nurga (} ${a}^\\circ\\text{-le vastasnurga) suurus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: d },
        lahendus: [
          `\\text{Vastasnurkade summa on } 180^\\circ\\text{:}`,
          `180^\\circ - ${a}^\\circ = ${d}^\\circ`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 30, 150);
      const b = int(rng, 30, 150);
      const c = 180 - a;
      const d = 180 - b;
      const sum = a + b + c + d;

      return {
        seed: 3,
        kysimus: `\\text{Ringjoonesse joonistatud nelinurga nurgad on } ${a}^\\circ\\text{, } ${b}^\\circ\\text{, } ${c}^\\circ \\text{ ja } ${d}^\\circ\\text{. Leia kõigi nelinurga nurkade summa (kontrollina).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: sum },
        lahendus: [
          `\\text{Iga nelinurga sisenurkade summa on alati } 360^\\circ\\text{:}`,
          `${a}^\\circ+${b}^\\circ+${c}^\\circ+${d}^\\circ = ${sum}^\\circ`,
        ],
      };
    },
  },
];
