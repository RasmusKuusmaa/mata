import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-uldkogum-ja-valim";

const STSENAARIUMID = [
  {
    kirjeldus: "Uuritakse kõigi Eesti 12. klassi õpilaste keskmist matemaatika hinnet, kontrollides iga õpilase hinnet.",
    liik: "üldkogum",
  },
  {
    kirjeldus: "Uuritakse 100 juhuslikult valitud 12. klassi õpilase matemaatika hindeid, et hinnata kõigi õpilaste taset.",
    liik: "valim",
  },
  {
    kirjeldus: "Tehase kõik toodetud detailid kontrollitakse läbi ilma väljajätmiseta.",
    liik: "üldkogum",
  },
  {
    kirjeldus: "Tehasest võetakse kontrollimiseks 50 juhuslikku detaili, et hinnata kogu toodangu kvaliteeti.",
    liik: "valim",
  },
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const valitud = pick(rng, STSENAARIUMID.slice(0, 2));

      return {
        seed: 1,
        kysimus: `\\text{Olukord: ${valitud.kirjeldus} Kas uuritakse üldkogumit või valimit?}`,
        vastus: { tuup: "valik", oige: valitud.liik, eksitajad: [valitud.liik === "üldkogum" ? "valim" : "üldkogum"] },
        lahendus: [`\\text{Siin on tegemist } \\textbf{${valitud.liik}}\\text{ga.}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const valitud = pick(rng, STSENAARIUMID.slice(2));

      return {
        seed: 2,
        kysimus: `\\text{Olukord: ${valitud.kirjeldus} Kas uuritakse üldkogumit või valimit?}`,
        vastus: { tuup: "valik", oige: valitud.liik, eksitajad: [valitud.liik === "üldkogum" ? "valim" : "üldkogum"] },
        lahendus: [`\\text{Siin on tegemist } \\textbf{${valitud.liik}}\\text{ga.}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const valitud = pick(rng, STSENAARIUMID);

      return {
        seed: 3,
        kysimus: `\\text{Olukord: ${valitud.kirjeldus} Kas uuritakse üldkogumit või valimit?}`,
        vastus: { tuup: "valik", oige: valitud.liik, eksitajad: [valitud.liik === "üldkogum" ? "valim" : "üldkogum"] },
        lahendus: [`\\text{Siin on tegemist } \\textbf{${valitud.liik}}\\text{ga.}`],
      };
    },
  },
];
