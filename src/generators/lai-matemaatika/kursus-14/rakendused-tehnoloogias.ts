import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "14-rakendused-tehnoloogias";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a0 = int(rng, 2, 20);
      const t = int(rng, 1, 6);
      // Andmemaht kahekordistub iga 2 aastaga: A(t) = A0 * 2^(t/2).
      const tPaaris = t % 2 === 0 ? t : t + 1;

      return {
        seed: 1,
        kysimus: `\\text{Andmemaht kahekordistub iga } 2 \\text{ aastaga, alguses } ${a0} \\text{ TB. Leia andmemaht } ${tPaaris} \\text{ aasta pärast.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a0 * 2 ** (tPaaris / 2) },
        lahendus: [
          `A(${tPaaris}) = ${a0}\\cdot2^{${tPaaris}/2} = ${a0}\\cdot2^${tPaaris / 2} = ${a0 * 2 ** (tPaaris / 2)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const A0 = int(rng, 2, 15);
      const n = int(rng, 1, 4);
      const kordaja = 3;

      return {
        seed: 2,
        kysimus: `\\text{Serveri koormus kasvab valemi } K(n)=${A0}\\cdot${kordaja}^n \\text{ järgi (} n \\text{ — kuude arv). Leia koormus, kui } n=${n}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: A0 * kordaja ** n },
        lahendus: [
          `K(${n}) = ${A0}\\cdot${kordaja}^${n} = ${A0 * kordaja ** n}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const A = int(rng, 2, 10);
      const f = int(rng, 1, 5);

      return {
        seed: 3,
        kysimus: `\\text{Signaal mudeldub valemiga } s(t)=${A}\\sin(${f}t)\\text{. Leia signaali maksimaalne väärtus (amplituud).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: A },
        lahendus: [
          `\\text{Kuna } \\sin \\text{ väärtused jäävad vahemikku } [-1,1]\\text{, on } s(t) \\text{ suurim väärtus } ${A}\\cdot1=${A}\\text{ (amplituud).}`,
        ],
      };
    },
  },
];
