import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "14-mudeli-headuse-hindamine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: () => ({
      seed: 1,
      kysimus: `\\text{Mille järgi hinnatakse matemaatilise mudeli headust?}`,
      vastus: {
        tuup: "valik",
        oige: "kui hästi mudel kirjeldab tegelikke andmeid",
        eksitajad: ["kui keeruline on valem", "kui palju muutujaid mudelil on", "kui kaua mudeli koostamine aega võttis"],
      },
      lahendus: [
        `\\text{Mudeli headus sõltub sellest, } \\textbf{kui hästi ta kirjeldab tegelikke andmeid}\\text{ — mitte valemi keerukusest.}`,
      ],
    }),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const aasta = int(rng, 1, 5);
      const ennustus = -int(rng, 10, 100);

      return {
        seed: 2,
        kysimus: `\\text{Lineaarne mudel ennustab } ${aasta}\\text{. aastaks poe müügiks } ${ennustus} \\text{ ühikut. Kas see mudel on selles piirkonnas usutav?}`,
        vastus: { tuup: "valik", oige: "ei", eksitajad: ["jah"] },
        lahendus: [
          `\\text{Müügikogus ei saa olla negatiivne (}${ennustus}\\text{), seega mudel on selles piirkonnas} \\textbf{ebasobiv}\\text{.}`,
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
      kysimus: `\\text{Mudel, mis sobitub täpselt olemasolevate andmetega, kuid ennustab uusi andmeid halvasti, on tõenäoliselt:}`,
      vastus: {
        tuup: "valik",
        oige: "liiga keeruline (üle sobitatud)",
        eksitajad: ["liiga lihtne", "matemaatiliselt vale", "ideaalne mudel"],
      },
      lahendus: [
        `\\text{Mudel, mis sobitub olemasolevate andmetega ideaalselt, kuid ei ennusta uusi hästi, on tavaliselt } \\textbf{liiga keeruline (üle sobitatud)}\\text{.}`,
      ],
    }),
  },
];
