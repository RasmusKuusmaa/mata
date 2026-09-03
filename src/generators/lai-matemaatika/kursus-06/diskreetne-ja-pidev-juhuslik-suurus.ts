import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-diskreetne-ja-pidev-juhuslik-suurus";

const SUURUSED = [
  { kirjeldus: "Täringuviskel saadud silmade arv.", liik: "diskreetne" },
  { kirjeldus: "Loositud loteriipiletite arv, mis on võiduga.", liik: "diskreetne" },
  { kirjeldus: "Juhuslikult valitud õpilase pikkus.", liik: "pidev" },
  { kirjeldus: "Juhuslikult valitud õpilase kaal.", liik: "pidev" },
  { kirjeldus: "Perre sündivate laste arv.", liik: "diskreetne" },
  { kirjeldus: "Bussi ooteaeg peatuses.", liik: "pidev" },
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const valitud = pick(rng, SUURUSED.slice(0, 2));

      return {
        seed: 1,
        kysimus: `\\text{Juhuslik suurus: ${valitud.kirjeldus} Kas see on diskreetne või pidev?}`,
        vastus: { tuup: "valik", oige: valitud.liik, eksitajad: [valitud.liik === "diskreetne" ? "pidev" : "diskreetne"] },
        lahendus: [`\\text{See on } \\textbf{${valitud.liik}} \\text{ juhuslik suurus.}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const valitud = pick(rng, SUURUSED.slice(2, 4));

      return {
        seed: 2,
        kysimus: `\\text{Juhuslik suurus: ${valitud.kirjeldus} Kas see on diskreetne või pidev?}`,
        vastus: { tuup: "valik", oige: valitud.liik, eksitajad: [valitud.liik === "diskreetne" ? "pidev" : "diskreetne"] },
        lahendus: [`\\text{See on } \\textbf{${valitud.liik}} \\text{ juhuslik suurus.}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const valitud = pick(rng, SUURUSED.slice(4));

      return {
        seed: 3,
        kysimus: `\\text{Juhuslik suurus: ${valitud.kirjeldus} Kas see on diskreetne või pidev?}`,
        vastus: { tuup: "valik", oige: valitud.liik, eksitajad: [valitud.liik === "diskreetne" ? "pidev" : "diskreetne"] },
        lahendus: [`\\text{See on } \\textbf{${valitud.liik}} \\text{ juhuslik suurus.}`],
      };
    },
  },
];
