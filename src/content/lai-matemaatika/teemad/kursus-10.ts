import { makeTeemaFactory } from "./helpers";

/** X kursus "Tuletise rakendused" — docs/ainekava-2025.pdf lk 12. */
const opitulemused = [
  "koostab funktsiooni graafiku puutuja võrrandi etteantud kohal, kontrollib saadut tarkvaraliste lahenduste abil",
  "selgitab funktsiooni kasvamise ja kahanemise seost funktsiooni tuletise märgiga, funktsiooni ekstreemumi mõistet ning ekstreemumi leidmist",
  "leiab funktsiooni kasvamis- ja kahanemisvahemikud, ekstreemumid, funktsiooni graafiku kumerus- ja nõgususvahemikud ning käänupunkti, kontrollib saadut tarkvaraliste lahenduste abil",
  "uurib ainekavas etteantud funktsioone täielikult ja skitseerib funktsiooni leitud omaduste põhjal selle graafiku, kontrollib saadut tarkvaraliste lahenduste abil",
  "leiab funktsiooni suurima ja vähima väärtuse etteantud lõigul",
  "tunneb ära ainealased ja reaalelulised probleemid, mis on kirjeldatavad ja lahendatavad õpitud funktsioonide kui mudelite uurimise abil. Tõlgib need matemaatika keelde, lahendab matemaatiliselt ning tõlgendab, hindab ja esitleb saadud tulemusi",
];

const teema = makeTeemaFactory("10", opitulemused);

export const teemad = [
  teema(
    "10-puutuja-vorrand",
    "Puutuja võrrand",
    "Funktsiooni graafiku puutuja võrrandi koostamine antud kohal.",
  ),
  teema(
    "10-kasvamis-ja-kahanemisvahemikud",
    "Kasvamis- ja kahanemisvahemikud",
    "Monotoonsusvahemike leidmine tuletise märgi järgi.",
  ),
  teema(
    "10-ekstreemumi-tarvilik-tingimus",
    "Ekstreemumi tarvilik tingimus",
    "Tuletise nullkoht kui ekstreemumi kandidaat.",
  ),
  teema(
    "10-ekstreemumi-piisav-tingimus",
    "Ekstreemumi piisav tingimus",
    "Tuletise märgivahetus ekstreemumi kinnitamiseks.",
  ),
  teema(
    "10-suurim-ja-vahim-vaartus-loigul",
    "Suurim ja vähim väärtus lõigul",
    "Funktsiooni äärmusväärtuste leidmine etteantud lõigul.",
  ),
  teema(
    "10-kumerus-ja-nogusus",
    "Kumerus ja nõgusus",
    "Graafiku kumeruse ja nõgususe uurimine teise tuletise abil.",
  ),
  teema("10-kaanupunkt", "Käänupunkt", "Koht, kus graafiku kumerus vahetub."),
  teema(
    "10-funktsiooni-tailielik-uurimine",
    "Funktsiooni täielik uurimine",
    "Kõigi omaduste süstemaatiline uurimine graafiku skitseerimiseks.",
  ),
  teema(
    "10-graafiku-skitseerimine",
    "Graafiku skitseerimine omaduste põhjal",
    "Uuritud omaduste põhjal graafiku joonestamine.",
  ),
  teema(
    "10-rakenduslikud-ekstreemumulesanded",
    "Rakenduslikud ekstreemumülesanded",
    "Reaalelulised probleemid, mis lahenevad ekstreemumi leidmisega.",
  ),
];
