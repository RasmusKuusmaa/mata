import { arvVaartus } from "@/generators/nice";
import { int, shuffle } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-mediaan";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const sorted = Array.from({ length: 5 }, () => int(rng, 1, 20)).sort((a, b) => a - b);
      const values = shuffle(rng, sorted);

      return {
        seed: 1,
        kysimus: `\\text{Andmestik: } ${values.join(", ")}\\text{. Leia mediaan.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: sorted[2] },
        lahendus: [
          `\\text{Järjestatuna: } ${sorted.join(", ")}\\text{. Keskmine (kolmas) väärtus on mediaan: } ${sorted[2]}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const sorted = Array.from({ length: 6 }, () => int(rng, 1, 20)).sort((a, b) => a - b);
      const values = shuffle(rng, sorted);

      return {
        seed: 2,
        kysimus: `\\text{Andmestik: } ${values.join(", ")}\\text{. Leia mediaan.}`,
        vastus: { tuup: "arv", ...arvVaartus(sorted[2] + sorted[3], 2) },
        lahendus: [
          `\\text{Järjestatuna: } ${sorted.join(", ")}\\text{. Paarisarvu andmete korral on mediaan kahe keskmise väärtuse keskmine:}`,
          `\\dfrac{${sorted[2]}+${sorted[3]}}{2} = \\dfrac{${sorted[2] + sorted[3]}}{2}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const sorted = Array.from({ length: 7 }, () => int(rng, 1, 30)).sort((a, b) => a - b);
      const values = shuffle(rng, sorted);

      return {
        seed: 3,
        kysimus: `\\text{Andmestik: } ${values.join(", ")}\\text{. Leia mediaan.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: sorted[3] },
        lahendus: [
          `\\text{Järjestatuna: } ${sorted.join(", ")}\\text{. Neljas väärtus (keskmine 7-st) on mediaan: } ${sorted[3]}`,
        ],
      };
    },
  },
];
