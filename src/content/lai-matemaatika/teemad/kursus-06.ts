import { makeTeemaFactory } from "./helpers";

/** VI kursus "Tõenäosus, statistika" — docs/ainekava-2025.pdf lk 10-11. */
const opitulemused = [
  "eristab juhuslikku, kindlat ja võimatut sündmust; selgitab sündmuse tõenäosuse mõistet ja omadusi",
  "selgitab permutatsioonide, kombinatsioonide ja variatsioonide tähendust ning leiab nende arvu",
  "selgitab sõltuvate ja sõltumatute sündmuste korrutise ning välistavate ja mittevälistavate sündmuste summa tähendust, arvutab reaalse eluga seotud sündmuste tõenäosusi",
  "selgitab juhusliku suuruse jaotuse olemust ning juhusliku suuruse arvkarakteristikute (keskväärtus, mood, mediaan, standardhälve) tähendust; kirjeldab binoom- ja normaaljaotust",
  "selgitab valimi ja üldkogumi mõisteid ning andmete süstematiseerimise ja statistilise otsustuse usaldatavuse tähendust; teab valimi koostamise põhimõtteid",
  "arvutab valimi jaotuse arvkarakteristikuid ning teeb nende alusel järeldusi üldkogumi jaotuse või uuritava probleemi kohta",
  "selgitab valimist hinnatud üldkogumi arvkarakteristiku usalduspiirkonna mõistet, leiab üldkogumi keskväärtuse usalduspiirkonna",
  "koostab IKT vahendite abil tabeleid ja graafikuid andmete ja jaotuse visualiseerimiseks",
  "visualiseerib digivahendite abil kahe tunnuse hajuvusdiagrammi, kirjeldab sõltuvuse tugevust korrelatsioonikordaja abil",
  "püstitab uurimisküsimuse, kogub vajaliku andmestiku, analüüsib seda statistiliste vahenditega IKT abil ja hindab võimalikke statistiliste otsustustega seotud vigu",
];

const teema = makeTeemaFactory("06", opitulemused);

export const teemad = [
  teema(
    "06-permutatsioonid",
    "Permutatsioonid",
    "Elementide järjestamiste arvu leidmine.",
  ),
  teema(
    "06-variatsioonid",
    "Variatsioonid",
    "Järjestatud valikute arvu leidmine.",
  ),
  teema(
    "06-kombinatsioonid",
    "Kombinatsioonid",
    "Järjestamata valikute arvu leidmine.",
  ),
  teema(
    "06-sundmus-ja-sundmuste-liigid",
    "Sündmus ja sündmuste liigid",
    "Juhuslik, kindel ja võimatu sündmus.",
  ),
  teema(
    "06-klassikaline-toenaosus",
    "Klassikaline tõenäosus",
    "Soodsate ja kõigi võimaluste suhe.",
  ),
  teema(
    "06-suhteline-sagedus-ja-statistiline-toenaosus",
    "Suhteline sagedus ja statistiline tõenäosus",
    "Tõenäosuse hindamine katsete sageduse põhjal.",
  ),
  teema(
    "06-geomeetriline-toenaosus",
    "Geomeetriline tõenäosus",
    "Tõenäosus pindala või pikkuse suhtena.",
  ),
  teema(
    "06-soltuvad-ja-soltumatud-sundmused",
    "Sõltuvad ja sõltumatud sündmused",
    "Sündmuste vastastikuse mõju mõiste.",
  ),
  teema(
    "06-valistavad-ja-mittevalistavad-sundmused",
    "Välistavad ja mittevälistavad sündmused",
    "Sündmuste ühisosa olemasolu või puudumine.",
  ),
  teema(
    "06-toenaosuste-liitmine",
    "Tõenäosuste liitmine",
    "Sündmuste summa tõenäosuse valem.",
  ),
  teema(
    "06-toenaosuste-korrutamine",
    "Tõenäosuste korrutamine",
    "Sündmuste korrutise tõenäosuse valem.",
  ),
  teema(
    "06-bernoulli-valem",
    "Bernoulli valem",
    "Korduvate sõltumatute katsete tõenäosus.",
  ),
  teema(
    "06-diskreetne-ja-pidev-juhuslik-suurus",
    "Diskreetne ja pidev juhuslik suurus",
    "Juhusliku suuruse liigid.",
  ),
  teema(
    "06-binoomjaotus",
    "Binoomjaotus",
    "Binoomjaotuse mõiste ja rakendamine.",
  ),
  teema("06-jaotuspolygoon", "Jaotuspolügoon", "Jaotuse graafiline esitus."),
  teema(
    "06-keskvaartus",
    "Keskväärtus",
    "Juhusliku suuruse keskväärtuse arvutamine.",
  ),
  teema("06-mood", "Mood", "Kõige sagedamini esineva väärtuse leidmine."),
  teema("06-mediaan", "Mediaan", "Keskmise järgu väärtuse leidmine."),
  teema(
    "06-dispersioon-ja-standardhalve",
    "Dispersioon ja standardhälve",
    "Hajuvuse arvkarakteristikud.",
  ),
  teema(
    "06-uldkogum-ja-valim",
    "Üldkogum ja valim",
    "Valimi ja üldkogumi mõiste.",
  ),
  teema(
    "06-andmete-kogumine-ja-susteemiseerimine",
    "Andmete kogumine ja süstematiseerimine",
    "Andmestiku koostamise ja korrastamise põhimõtted.",
  ),
  teema(
    "06-statistiline-analuus-uhe-tunnuse-jargi",
    "Statistiline analüüs ühe tunnuse järgi",
    "Ühe tunnuse jaotuse kirjeldamine ja tõlgendamine.",
  ),
  teema(
    "06-korrelatsioonivali",
    "Korrelatsiooniväli",
    "Kahe tunnuse hajuvusdiagramm.",
  ),
  teema(
    "06-lineaarne-korrelatsioonikordaja",
    "Lineaarne korrelatsioonikordaja",
    "Lineaarse seose tugevuse arvkarakteristik.",
  ),
  teema(
    "06-normaaljaotus",
    "Normaaljaotus",
    "Normaaljaotuse mõiste ja omadused.",
  ),
  teema(
    "06-keskvaartuse-usaldusvahemik",
    "Keskväärtuse usaldusvahemik",
    "Üldkogumi keskväärtuse usalduspiirkonna leidmine.",
  ),
];
