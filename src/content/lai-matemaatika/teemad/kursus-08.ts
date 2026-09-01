import { makeTeemaFactory } from "./helpers";

/** VIII kursus "Eksponent- ja logaritmfunktsioon" — docs/ainekava-2025.pdf lk 11. */
const opitulemused = [
  "selgitab liitprotsendilise kasvamise ja kahanemise olemust",
  "lahendab reaalelulisi liitprotsendilise kasvamise ja kahanemise probleeme, hindab kriitiliselt saadud tulemusi",
  "kirjeldab eksponentfunktsiooni, sh funktsiooni y = eˣ omadusi",
  "selgitab arvu logaritmi mõistet ja selle omadusi; logaritmib ning potentseerib lihtsamaid avaldisi, vahetab logaritmi alust",
  "kirjeldab logaritmfunktsiooni ja selle omadusi",
  "oskab leida eksponent- ja logaritmfunktsiooni pöördfunktsiooni",
  "joonestab paberil ja tarkvaraliste lahenduste abil eksponent- ja logaritmfunktsiooni graafikuid ning loeb graafikult funktsioonide omadusi",
  "lahendab lihtsamaid eksponent- ja logaritmvõrrandeid ning eksponent- ja logaritmvõrratusi",
  "tunneb ära ainealased ja reaalelulised probleemid, mis on kirjeldatavad ja lahendatavad eksponentsiaalsete ja/või logaritmiliste mudelite abil. Tõlgib need matemaatika keelde, lahendab matemaatiliselt ning tõlgendab, hindab ja esitleb saadud tulemusi",
];

const teema = makeTeemaFactory("08", opitulemused);

export const teemad = [
  teema(
    "08-liitprotsendiline-kasvamine-ja-kahanemine",
    "Liitprotsendiline kasvamine ja kahanemine",
    "Korduva protsendimuutuse mõju suuruse väärtusele.",
  ),
  teema(
    "08-eksponentfunktsioon-ja-graafik",
    "Eksponentfunktsioon ja selle graafik",
    "Kuju y = aˣ funktsioonid ja nende graafikute omadused.",
  ),
  teema(
    "08-funktsioon-e-x",
    "Funktsioon y = eˣ",
    "Naturaalse eksponentfunktsiooni omadused.",
  ),
  teema("08-arvu-logaritm", "Arvu logaritm", "Logaritmi mõiste kui astendaja."),
  teema(
    "08-korrutise-jagatise-astme-logaritm",
    "Korrutise, jagatise ja astme logaritm",
    "Logaritmi omadused tehete suhtes.",
  ),
  teema(
    "08-logaritmimine-ja-potentseerimine",
    "Logaritmimine ja potentseerimine",
    "Avaldise teisendamine logaritmi abil ja tagasi.",
  ),
  teema(
    "08-logaritmi-aluse-vahetamine",
    "Logaritmi aluse vahetamine",
    "Üleminek ühelt logaritmi aluselt teisele.",
  ),
  teema(
    "08-logaritmfunktsioon-ja-graafik",
    "Logaritmfunktsioon ja selle graafik",
    "Kuju y = logₐx funktsioonide omadused.",
  ),
  teema(
    "08-poordfunktsioon",
    "Pöördfunktsioon",
    "Eksponent- ja logaritmfunktsiooni vastastikune pöördseos.",
  ),
  teema("08-eksponentvorrand", "Eksponentvõrrand", "Tundmatu astendajas."),
  teema(
    "08-logaritmvorrand",
    "Logaritmvõrrand",
    "Tundmatu logaritmi märgi all.",
  ),
  teema(
    "08-eksponentvorratus",
    "Eksponentvõrratus",
    "Tundmatu astendajas võrratuses.",
  ),
  teema(
    "08-logaritmvorratus",
    "Logaritmvõrratus",
    "Tundmatu logaritmi märgi all võrratuses.",
  ),
  teema(
    "08-eksponent-ja-logaritmmudelid",
    "Eksponent- ja logaritmmudelid",
    "Reaalelulised protsessid, mis kirjeldatavad nende funktsioonidega.",
  ),
];
