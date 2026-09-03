import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-normaaljaotus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const mean = int(rng, 50, 100);
      const sigma = int(rng, 2, 10);

      return {
        seed: 1,
        kysimus: `\\text{Normaaljaotusega tunnuse keskväärtus on } \\mu=${mean} \\text{ ja standardhälve } \\sigma=${sigma}\\text{. Ligikaudu 68\\% väärtustest jääb vahemikku } [\\mu-\\sigma, \\mu+\\sigma]\\text{. Leia selle vahemiku ülempiir.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: mean + sigma },
        lahendus: [`\\mu+\\sigma = ${mean}+${sigma} = ${mean + sigma}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const mean = int(rng, 50, 100);
      const sigma = int(rng, 2, 10);

      return {
        seed: 2,
        kysimus: `\\text{Normaaljaotusega tunnuse keskväärtus on } \\mu=${mean} \\text{ ja standardhälve } \\sigma=${sigma}\\text{. Ligikaudu 95\\% väärtustest jääb vahemikku } [\\mu-2\\sigma, \\mu+2\\sigma]\\text{. Leia selle vahemiku alampiir.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: mean - 2 * sigma },
        lahendus: [`\\mu-2\\sigma = ${mean}-2\\cdot${sigma} = ${mean - 2 * sigma}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const mean = int(rng, 50, 100);
      const sigma = int(rng, 2, 10);

      return {
        seed: 3,
        kysimus: `\\text{Normaaljaotusega tunnuse keskväärtus on } \\mu=${mean} \\text{ ja standardhälve } \\sigma=${sigma}\\text{. Ligikaudu 99{,}7\\% väärtustest jääb vahemikku } [\\mu-3\\sigma, \\mu+3\\sigma]\\text{. Leia selle vahemiku pikkus (ülempiir miinus alampiir).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 6 * sigma },
        lahendus: [
          `(\\mu+3\\sigma) - (\\mu-3\\sigma) = 6\\sigma = 6\\cdot${sigma} = ${6 * sigma}`,
        ],
      };
    },
  },
];
