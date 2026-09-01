import type { Eeldusteema } from "@/content/types";

/**
 * Põhikool refresher topics (kursusId "E"). Surfaced on demand when a
 * gümnaasium topic's eeldused points here — never a browsable track of
 * their own, so unlike Teema they carry no allikas or eksamiKate.
 */
function eeldusteema(
  id: string,
  nimi: string,
  kirjeldus: string,
  opitulemused: string[],
): Eeldusteema {
  return {
    id,
    aine: "lai-matemaatika",
    kursusId: "E",
    nimi,
    kirjeldus,
    opitulemused,
    eeldused: [],
  };
}

export const teemad: Eeldusteema[] = [
  eeldusteema(
    "E-murdarvud",
    "Murdarvud ja tehted murdudega",
    "Hariliku murru mõiste ning murdude liitmine, lahutamine, korrutamine ja jagamine.",
    [
      "liidab, lahutab, korrutab ja jagab harilikke murde",
      "taandab ja laiendab murde",
    ],
  ),
  eeldusteema(
    "E-kumnendmurrud",
    "Kümnendmurrud ja ümardamine",
    "Kümnendmurdude tehted ja arvu ümardamine antud täpsuseni.",
    ["sooritab tehteid kümnendmurdudega", "ümardab arvu antud täpsuseni"],
  ),
  eeldusteema(
    "E-protsendi-pohiulesanded",
    "Protsendi kolm põhiülesannet",
    "Arvust protsendi leidmine, protsendi järgi arvu leidmine ja ühe arvu leidmine teise protsendina.",
    ["lahendab protsendi kolme põhiülesannet"],
  ),
  eeldusteema(
    "E-suhe-ja-vordeline-soltuvus",
    "Suhe ja võrdeline sõltuvus",
    "Suhte mõiste ning pöörd- ja otsese võrdelise sõltuvuse äratundmine.",
    [
      "kasutab suhet ülesannete lahendamisel",
      "eristab otsest ja pöördvõrdelist sõltuvust",
    ],
  ),
  eeldusteema(
    "E-sulgude-avamine",
    "Sulgude avamine",
    "Sulgude avamine ja distributiivsuse rakendamine avaldiste lihtsustamisel.",
    ["avab sulud ja lihtsustab avaldist"],
  ),
  eeldusteema(
    "E-uhisteguri-valja-toomine",
    "Ühisteguri sulgudest välja toomine",
    "Avaldise tegurdamine ühise teguri esiletoomise abil.",
    ["toob avaldisest ühisteguri sulgude ette"],
  ),
  eeldusteema(
    "E-abivalemid",
    "Abivalemid (a±b)² ja a²−b²",
    "Ruutude ja ruutude vahe lühendvalemid.",
    ["rakendab valemeid (a+b)², (a−b)² ja a²−b² avaldiste teisendamisel"],
  ),
  eeldusteema(
    "E-ruutkolmliikme-tegurdamine",
    "Ruutkolmliikme tegurdamine",
    "Ruutkolmliikme esitamine tegurite korrutisena.",
    ["tegurdab ruutkolmliikme"],
  ),
  eeldusteema(
    "E-lineaarvorrand",
    "Lineaarvõrrand ühe tundmatuga",
    "Ühe tundmatuga esimese astme võrrandi lahendamine.",
    ["lahendab ühe tundmatuga lineaarvõrrandi"],
  ),
  eeldusteema(
    "E-astmed-naturaalarvulise-astendajaga",
    "Astmed naturaalarvulise astendajaga",
    "Astendamise mõiste ja tehted naturaalarvulise astendajaga astmetega.",
    ["sooritab tehteid naturaalarvulise astendajaga astmetega"],
  ),
  eeldusteema("E-ruutjuur", "Ruutjuur", "Ruutjuure mõiste ja arvutamine.", [
    "arvutab arvu ruutjuure ja hindab selle suurusjärku",
  ]),
  eeldusteema(
    "E-koordinaattasand",
    "Koordinaattasand",
    "Punkti asukoha määramine koordinaattasandil.",
    [
      "kujutab punkti koordinaattasandil ja loeb punkti koordinaadid graafikult",
    ],
  ),
  eeldusteema(
    "E-kolmnurga-umbermoot-ja-pindala",
    "Kolmnurga ümbermõõt ja pindala",
    "Kolmnurga ümbermõõdu ja pindala arvutamine.",
    ["arvutab kolmnurga ümbermõõdu ja pindala"],
  ),
  eeldusteema(
    "E-pythagorase-teoreem",
    "Pythagorase teoreem",
    "Seos täisnurkse kolmnurga kaatetite ja hüpotenuusi vahel.",
    ["rakendab Pythagorase teoreemi täisnurkse kolmnurga külje leidmisel"],
  ),
  eeldusteema(
    "E-ringjoone-pikkus-ja-ringi-pindala",
    "Ringjoone pikkus ja ringi pindala",
    "Ringjoone pikkuse ja ringi pindala valemid.",
    ["arvutab ringjoone pikkuse ja ringi pindala"],
  ),
  eeldusteema(
    "E-nelinurkade-pindalad",
    "Nelinurkade pindalad",
    "Ristküliku, rombi, rööpküliku ja trapetsi pindala valemid.",
    ["arvutab nelinurkade pindalasid"],
  ),
  eeldusteema(
    "E-risttahuka-ja-kuubi-ruumala",
    "Risttahuka ja kuubi ruumala",
    "Risttahuka ja kuubi ruumala ja pindala valemid.",
    ["arvutab risttahuka ja kuubi ruumala ning pindala"],
  ),
  eeldusteema(
    "E-uhikute-teisendamine",
    "Ühikute teisendamine",
    "Pikkuse, pindala, ruumala ja aja mõõtühikute teisendamine.",
    ["teisendab mõõtühikuid üksteiseks"],
  ),
  eeldusteema(
    "E-diagrammide-lugemine",
    "Diagrammide lugemine",
    "Sektor-, tulp- ja joondiagrammidelt info lugemine.",
    ["loeb ja tõlgendab diagrammidel esitatud andmeid"],
  ),
  eeldusteema(
    "E-aritmeetiline-keskmine",
    "Aritmeetiline keskmine",
    "Arvuhulga aritmeetilise keskmise arvutamine.",
    ["arvutab arvuhulga aritmeetilise keskmise"],
  ),
];
