import type { Generaator } from "@/generators/types";

const TEEMA_ID = "14-modelleerimise-etapid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: () => ({
      seed: 1,
      kysimus: `\\text{Mis on modelleerimise esimene etapp?}`,
      vastus: {
        tuup: "valik",
        oige: "reaalse probleemi püstitus",
        eksitajad: ["mudeli lahendamine", "tulemuse tõlgendamine", "mudeli headuse hindamine"],
      },
      lahendus: [
        `\\text{Modelleerimine algab alati } \\textbf{reaalse probleemi püstitusega}\\text{ — ilma selleta ei tea, mida modelleerida.}`,
      ],
    }),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: () => ({
      seed: 2,
      kysimus: `\\text{Mis etapp järgneb matemaatilise mudeli lahendamisele?}`,
      vastus: {
        tuup: "valik",
        oige: "tulemuse tõlgendamine reaalses kontekstis",
        eksitajad: ["probleemi püstitus", "oluliste suuruste väljaselgitamine", "mudeli koostamine"],
      },
      lahendus: [
        `\\text{Pärast lahendamist tuleb } \\textbf{tõlgendada tulemust reaalses kontekstis}\\text{ — kas number annab mõtet reaalse probleemi kohta.}`,
      ],
    }),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: () => ({
      seed: 3,
      kysimus: `\\text{Kui mudeli ennustus ei sobi kokku tegelike andmetega, mis on loogiline järgmine samm?}`,
      vastus: {
        tuup: "valik",
        oige: "mudelit täpsustada",
        eksitajad: ["andmeid muuta", "probleem unustada", "tulemust ignoreerida"],
      },
      lahendus: [
        `\\text{Modelleerimine on tsükliline: kui mudel ei sobi, tuleb } \\textbf{mudelit täpsustada}\\text{ ja protsess uuesti läbida.}`,
      ],
    }),
  },
];
