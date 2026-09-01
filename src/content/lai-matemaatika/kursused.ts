import type { Kursus } from "@/content/types";

/**
 * The fourteen mandatory lai matemaatika courses. Valikkursused (Loogika,
 * Arvuteooria I/II, Diskreetse matemaatika elemendid I/II, Planimeetria I/II,
 * Majandusmatemaatika elemendid) are deliberately excluded — they are not
 * exam material.
 */
export const kursused: Kursus[] = [
  {
    id: "01",
    aine: "lai-matemaatika",
    jrk: 1,
    nimi: "Avaldised ja arvuhulgad",
  },
  {
    id: "02",
    aine: "lai-matemaatika",
    jrk: 2,
    nimi: "Võrrandid ja võrrandisüsteemid",
  },
  {
    id: "03",
    aine: "lai-matemaatika",
    jrk: 3,
    nimi: "Võrratused. Trigonomeetria I",
  },
  { id: "04", aine: "lai-matemaatika", jrk: 4, nimi: "Trigonomeetria II" },
  {
    id: "05",
    aine: "lai-matemaatika",
    jrk: 5,
    nimi: "Vektor tasandil. Joone võrrand",
  },
  { id: "06", aine: "lai-matemaatika", jrk: 6, nimi: "Tõenäosus, statistika" },
  {
    id: "07",
    aine: "lai-matemaatika",
    jrk: 7,
    nimi: "Funktsioonid. Arvjadad",
  },
  {
    id: "08",
    aine: "lai-matemaatika",
    jrk: 8,
    nimi: "Eksponent- ja logaritmfunktsioon",
  },
  {
    id: "09",
    aine: "lai-matemaatika",
    jrk: 9,
    nimi: "Trigonomeetrilised funktsioonid. Funktsiooni piirväärtus ja tuletis",
  },
  { id: "10", aine: "lai-matemaatika", jrk: 10, nimi: "Tuletise rakendused" },
  {
    id: "11",
    aine: "lai-matemaatika",
    jrk: 11,
    nimi: "Integraal. Planimeetria",
  },
  {
    id: "12",
    aine: "lai-matemaatika",
    jrk: 12,
    nimi: "Sirge ja tasand ruumis",
  },
  { id: "13", aine: "lai-matemaatika", jrk: 13, nimi: "Stereomeetria" },
  {
    id: "14",
    aine: "lai-matemaatika",
    jrk: 14,
    nimi: "Matemaatika rakendused, reaalsete protsesside uurimine",
  },
];
