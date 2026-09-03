import { arvVaartus } from "@/generators/nice";
import { nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-pohifunktsioonide-graafikud";

const FUNKTSIOONI_TUUBID = [
  { latex: "y = x^2", nimi: "ruutfunktsioon" },
  { latex: "y = x^3", nimi: "kuupfunktsioon" },
  { latex: "y = \\dfrac{1}{x}", nimi: "pöördvõrdeline funktsioon" },
  { latex: "y = |x|", nimi: "absoluutväärtusfunktsioon" },
  { latex: "y = \\sqrt{x}", nimi: "ruutjuurfunktsioon" },
] as const;

const KIRJELDUSED = [
  {
    kirjeldus:
      "Graafik on sümmeetriline y-telje suhtes, mõlemad harud suunduvad üles ja graafik läbib alguspunkti.",
    nimi: "ruutfunktsioon",
  },
  {
    kirjeldus:
      "Graafik on sümmeetriline alguspunkti suhtes ning kulgeb III veerandist I veerandisse, kasvades pidevalt.",
    nimi: "kuupfunktsioon",
  },
  {
    kirjeldus:
      "Graafik koosneb kahest harust I ja III veerandis, mis lähenevad telgedele, kuid ei puuduta neid kunagi.",
    nimi: "pöördvõrdeline funktsioon",
  },
  {
    kirjeldus:
      "Graafik on nurgakujuline, sümmeetriline y-telje suhtes, tipp alguspunktis, mõlemad harud kulgevad üles.",
    nimi: "absoluutväärtusfunktsioon",
  },
] as const;

const KOIK_NIMED = FUNKTSIOONI_TUUBID.map((t) => t.nimi);

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const useAbs = pick(rng, [true, false]);
      const x = nonZeroInt(rng, -12, 12);

      if (useAbs) {
        return {
          seed: 1,
          kysimus: `\\text{Põhifunktsioon on } y = |x|\\text{. Leia väärtus kohal } x = ${x}\\text{.}`,
          vastus: { tuup: "arv", kuju: "taisarv", vaartus: Math.abs(x) },
          lahendus: [`|${x}| = ${Math.abs(x)}`],
        };
      }

      return {
        seed: 1,
        kysimus: `\\text{Põhifunktsioon on } y = \\dfrac{1}{x}\\text{. Leia väärtus kohal } x = ${x}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(1, x) },
        lahendus: [`\\dfrac{1}{${x}}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const valitud = pick(rng, FUNKTSIOONI_TUUBID);
      const eksitajad = KOIK_NIMED.filter((n) => n !== valitud.nimi).slice(0, 3);

      return {
        seed: 2,
        kysimus: `\\text{Mis nime kannab põhifunktsioon } ${valitud.latex}\\text{?}`,
        vastus: { tuup: "valik", oige: valitud.nimi, eksitajad },
        lahendus: [`\\text{Funktsioon } ${valitud.latex} \\text{ on } \\textbf{${valitud.nimi}}\\text{.}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const valitud = pick(rng, KIRJELDUSED);
      const eksitajad = KOIK_NIMED.filter((n) => n !== valitud.nimi).slice(0, 3);

      return {
        seed: 3,
        kysimus: `\\text{${valitud.kirjeldus} Millise põhifunktsiooniga on tegemist?}`,
        vastus: { tuup: "valik", oige: valitud.nimi, eksitajad },
        lahendus: [`\\text{Kirjeldus vastab funktsioonile: } \\textbf{${valitud.nimi}}\\text{.}`],
      };
    },
  },
];
