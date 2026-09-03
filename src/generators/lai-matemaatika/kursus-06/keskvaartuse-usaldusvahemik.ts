import { arvVaartus } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-keskvaartuse-usaldusvahemik";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const mean = int(rng, 50, 150);
      const margin = int(rng, 2, 20);

      return {
        seed: 1,
        kysimus: `\\text{Valimi keskväärtus on } \\bar{x}=${mean} \\text{ ja usaldusvahemiku veapiir on } E=${margin}\\text{. Leia usaldusvahemiku } [\\bar{x}-E,\\ \\bar{x}+E] \\text{ ülempiir.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: mean + margin },
        lahendus: [`\\bar{x}+E = ${mean}+${margin} = ${mean + margin}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const mean = int(rng, 50, 150);
      const margin = int(rng, 2, 20);

      return {
        seed: 2,
        kysimus: `\\text{Valimi keskväärtus on } \\bar{x}=${mean} \\text{ ja usaldusvahemiku veapiir on } E=${margin}\\text{. Leia usaldusvahemiku } [\\bar{x}-E,\\ \\bar{x}+E] \\text{ alampiir.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: mean - margin },
        lahendus: [`\\bar{x}-E = ${mean}-${margin} = ${mean - margin}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const lower = int(rng, 40, 100);
      const upper = lower + int(rng, 4, 20) * 2;

      return {
        seed: 3,
        kysimus: `\\text{Üldkogumi keskväärtuse usaldusvahemik on } [${lower}, ${upper}]\\text{. Leia valimi keskväärtus (usaldusvahemiku keskpunkt).}`,
        vastus: { tuup: "arv", ...arvVaartus(lower + upper, 2) },
        lahendus: [
          `\\bar{x} = \\dfrac{${lower}+${upper}}{2} = \\dfrac{${lower + upper}}{2}`,
        ],
      };
    },
  },
];
