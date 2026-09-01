import { makeTeemaFactory } from "./helpers";

/** II kursus "Võrrandid ja võrrandisüsteemid" — docs/ainekava-2025.pdf lk 9. */
const opitulemused = [
  "selgitab võrduse, samasuse ja võrrandi, võrrandi lahendi, võrrandisüsteemi lahendi ning lahendihulga mõistet",
  "selgitab võrrandite ning nende süsteemide lahendamisel rakendatavaid samasusteisendusi",
  "lahendab ühe tundmatuga lineaar-, ruut-, murd- ja lihtsamaid juurvõrrandeid (kuni kaks juurt) ning nendeks taanduvaid võrrandeid",
  "lahendab lihtsamaid üht absoluutväärtust sisaldavaid võrrandeid",
  "lahendab kuni kolme tundmatuga lineaarvõrrandite süsteeme ning kahe tundmatuga ruut- ja murdvõrrandite süsteeme",
  "tunneb ära õpitud võrrandite/võrrandisüsteemide abil lahenduvad reaalelulised/teaduslikud probleemid",
  "leiab või koostab sobiva võrrandi/võrrandisüsteemi probleemi lahendamiseks",
  "lahendab ainealase või reaalelulise probleemi võrrandite ja/või võrrandisüsteemide abil ning tõlgendab ja esitleb saadud tulemust",
];

const teema = makeTeemaFactory("02", opitulemused);

export const teemad = [
  teema(
    "02-vordus-samasus-vorrand",
    "Võrdus, samasus, võrrand",
    "Nende kolme mõiste erinevus ja omavaheline seos.",
  ),
  teema(
    "02-lahend-ja-lahendihulk",
    "Lahend ja lahendihulk",
    "Võrrandi lahendi ja lahendihulga mõiste.",
  ),
  teema(
    "02-samavaarsusteisendused",
    "Samaväärsusteisendused",
    "Teisendused, mis säilitavad võrrandi lahendihulga.",
  ),
  teema(
    "02-lineaarvorrand",
    "Lineaarvõrrand",
    "Ühe tundmatuga esimese astme võrrand.",
  ),
  teema("02-ruutvorrand", "Ruutvõrrand", "Ühe tundmatuga teise astme võrrand."),
  teema(
    "02-ruutvorrandiks-taanduvad",
    "Ruutvõrrandiks taanduvad võrrandid",
    "Võrrandid, mis lihtsustuvad ruutvõrrandiks.",
  ),
  teema(
    "02-murdvorrand",
    "Murdvõrrand",
    "Tundmatu nimetajas; määramispiirkonna kontroll.",
  ),
  teema(
    "02-juurvorrand",
    "Juurvõrrand",
    "Tundmatu juuremärgi all, kuni kaks juurt.",
  ),
  teema(
    "02-absoluutvaartusega-vorrand",
    "Absoluutväärtusega võrrand",
    "Ühte absoluutväärtust sisaldav võrrand.",
  ),
  teema(
    "02-lineaarvorrandisusteem",
    "Lineaarvõrrandisüsteem",
    "Kuni kolme tundmatuga lineaarvõrrandite süsteem.",
  ),
  teema(
    "02-mittelineaarne-vorrandisusteem",
    "Mittelineaarne võrrandisüsteem",
    "Kahe tundmatuga ruut- või murdvõrrandite süsteem.",
  ),
  teema(
    "02-determinant",
    "Kahe- ja kolmerealine determinant",
    "Determinandi arvutamine ja rakendamine võrrandisüsteemide lahendamisel.",
  ),
  teema(
    "02-tekstulesanded",
    "Tekstülesanded võrrandi abil",
    "Reaalelulise probleemi tõlkimine võrrandiks ja lahendamine.",
  ),
];
