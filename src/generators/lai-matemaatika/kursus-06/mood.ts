import { int, pick, shuffle } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-mood";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const mode = int(rng, 1, 9);
      const others = [int(rng, 1, 9), int(rng, 1, 9)].filter((v) => v !== mode);
      const values = shuffle(rng, [mode, mode, mode, ...others]);

      return {
        seed: 1,
        kysimus: `\\text{Andmestik: } ${values.join(", ")}\\text{. Leia mood.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: mode },
        lahendus: [
          `\\text{Kõige sagedamini esinev väärtus on } ${mode}\\text{, seega mood} = ${mode}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const mode = int(rng, 1, 9);
      let other = int(rng, 1, 9);
      while (other === mode) other = int(rng, 1, 9);
      const values = shuffle(rng, [mode, mode, mode, other, other]);

      return {
        seed: 2,
        kysimus: `\\text{Andmestik: } ${values.join(", ")}\\text{. Leia mood.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: mode },
        lahendus: [
          `\\text{Väärtus } ${mode} \\text{ esineb 3 korda, } ${other} \\text{ esineb 2 korda. Mood} = ${mode}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const modeA = int(rng, 1, 5);
      let modeB = int(rng, 1, 9);
      while (modeB === modeA) modeB = int(rng, 1, 9);
      const values = shuffle(rng, [modeA, modeA, modeB, modeB, pick(rng, [modeA, modeB])]);
      const winner = values.filter((v) => v === modeA).length > values.filter((v) => v === modeB).length ? modeA : modeB;

      return {
        seed: 3,
        kysimus: `\\text{Andmestik: } ${values.join(", ")}\\text{. Leia mood.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: winner },
        lahendus: [
          `\\text{Väärtus } ${winner} \\text{ esineb kõige sagedamini. Mood} = ${winner}`,
        ],
      };
    },
  },
];
