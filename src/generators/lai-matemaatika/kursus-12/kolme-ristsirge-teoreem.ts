import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-kolme-ristsirge-teoreem";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: () => ({
      seed: 1,
      kysimus: `\\text{Kolme ristsirge teoreemi järgi: kui sirge } a \\text{ tasandil on risti sirge } b \\text{ projektsiooniga tasandile, siis on } a \\text{ risti ka:}`,
      vastus: {
        tuup: "valik",
        oige: "sirgega b endaga",
        eksitajad: ["tasandiga", "sirge b normaaliga", "mitte millegagi"],
      },
      lahendus: [
        `\\text{Kolme ristsirge teoreem: sirge } a \\text{ on risti } b\\text{'i projektsiooniga parajasti siis, kui ta on risti } \\textbf{sirgega } b\\textbf{ endaga}\\text{.}`,
      ],
    }),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const h = int(rng, 3, 12);
      return {
        seed: 2,
        kysimus: `\\text{Korrapärase püramiidi kõrgus on } h=${h}\\text{. Kolme ristsirge teoreemi rakendades näitab apoteemi ja põhiserva vaheline nurk, et apoteem on risti põhiserva:}`,
        vastus: { tuup: "valik", oige: "projektsiooniga", eksitajad: ["keskpunktiga", "tipuga"] },
        lahendus: [
          `\\text{Apoteem on risti põhiserva } \\textbf{projektsiooniga}\\text{ põhitasandil — sellest järeldub kolme ristsirge teoreemiga, et apoteem on risti ka põhiservaga endaga.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: () => ({
      seed: 3,
      kysimus: `\\text{Kolme ristsirge teoreem kehtib ka vastupidises suunas: kui sirge } a \\text{ tasandil on risti sirgega } b\\text{, siis on ta risti ka:}`,
      vastus: {
        tuup: "valik",
        oige: "b projektsiooniga tasandile",
        eksitajad: ["tasandi normaaliga", "sirge b iga paralleelsirgega ruumis"],
      },
      lahendus: [
        `\\text{Teoreem kehtib mõlemas suunas: } a \\perp b \\Leftrightarrow a \\perp \\textbf{b projektsiooniga tasandile}\\text{.}`,
      ],
    }),
  },
];
