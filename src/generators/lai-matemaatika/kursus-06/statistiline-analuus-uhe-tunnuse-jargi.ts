import { arvVaartus } from "@/generators/nice";
import { int, shuffle } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-statistiline-analuus-uhe-tunnuse-jargi";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const values = shuffle(rng, Array.from({ length: 6 }, () => int(rng, 1, 40)));
      const min = Math.min(...values);
      const max = Math.max(...values);

      return {
        seed: 1,
        kysimus: `\\text{Andmestik: } ${values.join(", ")}\\text{. Leia haare (suurima ja vähima väärtuse vahe).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: max - min },
        lahendus: [
          `\\text{Suurim väärtus} = ${max}\\text{, vähim väärtus} = ${min}`,
          `\\text{Haare} = ${max} - ${min} = ${max - min}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const min = int(rng, 1, 20);
      const range = int(rng, 5, 30);
      const max = min + range;

      return {
        seed: 2,
        kysimus: `\\text{Andmestiku vähim väärtus on } ${min} \\text{ ja haare on } ${range}\\text{. Leia suurim väärtus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: max },
        lahendus: [
          `\\text{Suurim} = \\text{vähim} + \\text{haare} = ${min} + ${range} = ${max}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const values = shuffle(rng, Array.from({ length: 8 }, () => int(rng, 1, 50)));
      const sum = values.reduce((a, b) => a + b, 0);
      const min = Math.min(...values);
      const max = Math.max(...values);

      return {
        seed: 3,
        kysimus: `\\text{Andmestik: } ${values.join(", ")}\\text{. Leia keskmise ja haarde summa (aritmeetiline keskmine + haare).}`,
        vastus: { tuup: "arv", ...arvVaartus(sum + 8 * (max - min), 8) },
        lahendus: [
          `\\text{Keskmine} = \\dfrac{${sum}}{8}\\text{, haare} = ${max}-${min}=${max - min}`,
        ],
      };
    },
  },
];
