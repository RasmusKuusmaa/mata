import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-andmete-kogumine-ja-susteemiseerimine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const f1 = int(rng, 2, 10);
      const f2 = int(rng, 2, 10);
      const f3 = int(rng, 2, 10);

      return {
        seed: 1,
        kysimus: `\\text{Sagedustabel: väärtus } 1 \\text{ esineb } ${f1} \\text{ korda, väärtus } 2 \\text{ esineb } ${f2} \\text{ korda, väärtus } 3 \\text{ esineb } ${f3} \\text{ korda. Leia andmestiku maht (vaatluste koguarv).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: f1 + f2 + f3 },
        lahendus: [`n = ${f1}+${f2}+${f3} = ${f1 + f2 + f3}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const total = int(rng, 30, 60);
      const f1 = int(rng, 5, 15);
      const f2 = int(rng, 5, 15);
      const f3 = total - f1 - f2;

      return {
        seed: 2,
        kysimus: `\\text{Andmestiku maht on } ${total}\\text{. Sagedustabelis on kaks teadaolevat sagedust } ${f1} \\text{ ja } ${f2}\\text{. Leia kolmas sagedus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: f3 },
        lahendus: [
          `f_3 = ${total} - ${f1} - ${f2} = ${f3}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      // total ∈ {20, 25, 50}: any f1 gives an exact whole-number percentage.
      const total = pick(rng, [20, 25, 50] as const);
      const f1 = int(rng, 1, total - 1);
      const percent = (100 * f1) / total;

      return {
        seed: 3,
        kysimus: `\\text{Andmestiku maht on } ${total}\\text{. Ühe väärtuse sagedus on } ${f1}\\text{. Leia selle väärtuse suhteline sagedus protsentides.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: percent },
        lahendus: [
          `\\text{Suhteline sagedus} = \\dfrac{${f1}}{${total}} \\cdot 100\\% = ${percent}\\%`,
        ],
      };
    },
  },
];
