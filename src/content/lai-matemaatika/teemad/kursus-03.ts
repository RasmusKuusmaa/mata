import { makeTeemaFactory } from "./helpers";

/** III kursus "Võrratused. Trigonomeetria I" — docs/ainekava-2025.pdf lk 9. */
const opitulemused = [
  "selgitab võrratuse omadusi, võrratuse ja võrratusesüsteemi lahendihulga mõistet ning kirjeldab vastavaid lahendihulki arvteljel",
  "selgitab võrratuste ning nende süsteemide lahendamisel rakendatavaid samasusteisendusi",
  "lahendab lineaar-, ruut- ja murdvõrratusi ning lihtsamaid võrratusesüsteeme, kus vähemalt üks võrratustest on lineaarne",
  "kasutab lihtsustamisülesannetes trigonomeetria põhiseoseid ja täiendusnurga trigonomeetrilisi funktsioone",
  "leiab digivahendite abil teravnurga trigonomeetriliste funktsioonide väärtused ning nende väärtuste järgi nurga suuruse",
  "lahendab täisnurkse kolmnurga",
  "tunneb ära probleemid, mis on lahendatavad täisnurkse kolmnurga geomeetria abil. Tõlgib need matemaatika keelde ning lahendab matemaatiliselt ning tõlgendab ja esitleb saadud tulemusi",
];

const teema = makeTeemaFactory("03", opitulemused);

export const teemad = [
  teema(
    "03-vorratuse-moiste-ja-omadused",
    "Võrratuse mõiste ja omadused",
    "Võrratuse ja tema lahendihulga mõiste.",
  ),
  teema(
    "03-lineaarvorratus",
    "Lineaarvõrratus",
    "Ühe tundmatuga esimese astme võrratus.",
  ),
  teema(
    "03-ruutvorratus",
    "Ruutvõrratus",
    "Ühe tundmatuga teise astme võrratus.",
  ),
  teema(
    "03-intervallmeetod",
    "Intervallmeetod",
    "Märgi uurimine avaldise nullkohtade vahel.",
  ),
  teema("03-murdvorratus", "Murdvõrratus", "Tundmatu nimetajas võrratuses."),
  teema(
    "03-vorratusesusteemid",
    "Võrratusesüsteemid",
    "Mitme võrratuse ühine lahendihulk.",
  ),
  teema(
    "03-teravnurga-funktsioonid",
    "Teravnurga siinus, koosinus, tangens",
    "Täisnurkse kolmnurga küljesuhted teravnurga puhul.",
  ),
  teema(
    "03-taiendusnurga-funktsioonid",
    "Täiendusnurga trigonomeetrilised funktsioonid",
    "Seosed nurga ja tema täiendusnurga funktsioonide vahel.",
  ),
  teema(
    "03-trigonomeetria-pohiseosed",
    "Trigonomeetria põhiseosed täisnurkses kolmnurgas",
    "Siinuse, koosinuse ja tangensi vahelised põhiseosed.",
  ),
  teema(
    "03-taisnurkse-kolmnurga-lahendamine",
    "Täisnurkse kolmnurga lahendamine",
    "Kolmnurga tundmatute külgede ja nurkade leidmine.",
  ),
];
