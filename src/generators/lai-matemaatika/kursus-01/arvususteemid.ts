import { int } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator, Rng } from "@/generators/types";

const TEEMA_ID = "01-arvususteemid";

function buildGeneraator(seed: number, draw: (rng: Rng) => number): Generaator["genereeri"] {
  return (rng) => {
    const kumnend = draw(rng);
    const kahend = kumnend.toString(2);

    return {
      seed,
      kysimus: `\\text{Teisenda kahendarv } ${kahend}_2 \\text{ kümnendsüsteemi.}`,
      vastus: { tuup: "arv", ...arvVaartus(kumnend) },
      lahendus: [
        `\\text{Iga kahendkoht vastab kahe astmele, alates paremalt astmest } 0\\text{:}`,
        `${kahend}_2 = ${kumnend}_{10}`,
      ],
    };
  };
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: buildGeneraator(1, (rng) => int(rng, 5, 15)),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: buildGeneraator(2, (rng) => int(rng, 16, 63)),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: buildGeneraator(3, (rng) => int(rng, 100, 255)),
  },
];
