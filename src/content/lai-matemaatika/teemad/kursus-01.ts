import { makeTeemaFactory, withSequentialEeldused } from "./helpers";

/** I kursus "Avaldised ja arvuhulgad" — docs/ainekava-2025.pdf lk 9. */
const opitulemused = [
  "leiab hulkade ühendi, ühisosa ja antud hulga osahulga",
  "selgitab naturaalarvude hulga N, täisarvude hulga Z, ratsionaalarvude hulga Q, irratsionaalarvude hulga I ja reaalarvude hulga R omadusi ja nende hulkade kuuluvusseoseid, märgib arvteljel reaalarvude piirkondi",
  "esitab arvu juure ratsionaalarvulise astendajaga astmena ja vastupidi",
  "sooritab tehteid astmete ning võrdsete juurijatega juurtega",
  "teisendab lihtsamaid ratsionaal- ja irratsionaalavaldisi",
  "näeb ja lahendab arvutuste ja teisenduste abil lahenduvaid reaalelulisi ja teaduslikke probleeme (sh protsentülesanded). Tõlgendab ja esitleb saadud tulemusi",
];

const teema = makeTeemaFactory("01", opitulemused);

export const teemad = withSequentialEeldused(
  [
  teema(
    "01-arvuhulgad",
    "Arvuhulgad N, Z, Q, I, R",
    "Naturaal-, täis-, ratsionaal-, irratsionaal- ja reaalarvude hulk ning nendevahelised kuuluvusseosed.",
  ),
  teema(
    "01-reaalarvude-piirkonnad-arvteljel",
    "Reaalarvude piirkonnad arvteljel",
    "Arvuvahemike ja -piirkondade märkimine arvteljel.",
  ),
  teema(
    "01-absoluutvaartus",
    "Absoluutväärtus",
    "Arvu absoluutväärtuse mõiste ja omadused.",
  ),
  teema(
    "01-arvususteemid",
    "Arvusüsteemid (kahendsüsteem)",
    "Positsioonilised arvusüsteemid, kahendsüsteemi ja kümnendsüsteemi vahel teisendamine.",
  ),
  teema(
    "01-ratsionaalavaldiste-teisendamine",
    "Ratsionaalavaldiste teisendamine",
    "Murdavaldiste lihtsustamine ja teisendamine.",
  ),
  teema(
    "01-irratsionaalavaldiste-teisendamine",
    "Irratsionaalavaldiste teisendamine",
    "Juuri sisaldavate avaldiste lihtsustamine ja teisendamine.",
  ),
  teema("01-n-es-juur", "Arvu n-es juur", "Juure mõiste ja omadused."),
  teema(
    "01-taisarvuline-astendaja",
    "Täisarvulise astendajaga aste",
    "Astendaja on täisarv, sh negatiivne ja null.",
  ),
  teema(
    "01-ratsionaalarvuline-astendaja",
    "Ratsionaalarvulise astendajaga aste",
    "Astendaja on murdarv; seos juurega.",
  ),
  teema(
    "01-tehted-astmetega",
    "Tehted astmetega",
    "Astmete korrutamine, jagamine ja astendamine.",
  ),
  teema(
    "01-tehted-juurtega",
    "Tehted juurtega",
    "Võrdse juurijaga juurte liitmine, korrutamine ja jagamine.",
  ),
  teema(
    "01-protsentulesanded",
    "Protsentülesanded",
    "Protsendi kolm põhiülesannet ja liitprotsent reaalelulistes probleemides.",
  ),
  ],
  ["E-murdarvud", "E-kumnendmurrud"],
);
