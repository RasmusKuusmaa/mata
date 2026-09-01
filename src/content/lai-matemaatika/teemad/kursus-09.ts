import { makeTeemaFactory } from "./helpers";

/**
 * IX kursus "Trigonomeetrilised funktsioonid. Funktsiooni piirväärtus ja
 * tuletis" — docs/ainekava-2025.pdf lk 11-12.
 */
const opitulemused = [
  "selgitab funktsiooni perioodilisuse mõistet ning leiab siinus-, koosinus- ja tangensfunktsiooni perioodi",
  "joonestab nii paberil kui ka tarkvaraliste lahenduste abil siinus-, koosinus- ja tangensfunktsiooni graafikuid ning loeb graafikutelt nende funktsioonide omadusi",
  "leiab algebraliselt lihtsamate trigonomeetriliste võrrandite erilahendid etteantud piirkonnas, kasutades üldlahendi valemit või funktsiooni graafikut",
  "selgitab funktsiooni piirväärtuse ja tuletise mõistet ning tuletise füüsikalist ja geomeetrilist tähendust",
  "esitab liitfunktsiooni lihtsamate funktsioonide kaudu",
  "rakendab funktsioonide summa, vahe, korrutise ja jagatise tuletise leidmise eeskirja, leiab funktsiooni esimese ja teise tuletise ning liitfunktsiooni tuletise, kasutades etteantud tuletiste tabelit",
];

const teema = makeTeemaFactory("09", opitulemused);

export const teemad = [
  teema(
    "09-funktsiooni-perioodilisus",
    "Funktsiooni perioodilisus",
    "Perioodilise funktsiooni mõiste ja perioodi leidmine.",
  ),
  teema(
    "09-siinusfunktsiooni-graafik",
    "Siinusfunktsiooni graafik ja omadused",
    "Funktsiooni y = sin x graafik ja omadused.",
  ),
  teema(
    "09-koosinusfunktsiooni-graafik",
    "Koosinusfunktsiooni graafik ja omadused",
    "Funktsiooni y = cos x graafik ja omadused.",
  ),
  teema(
    "09-tangensfunktsiooni-graafik",
    "Tangensfunktsiooni graafik ja omadused",
    "Funktsiooni y = tg x graafik ja omadused.",
  ),
  teema(
    "09-arcsin-arccos-arctan",
    "arcsin, arccos, arctg",
    "Pöördtrigonomeetrilised funktsioonid.",
  ),
  teema(
    "09-lihtsamad-trigonomeetrilised-vorrandid",
    "Lihtsamad trigonomeetrilised võrrandid",
    "Põhikujul trigonomeetrilised võrrandid.",
  ),
  teema(
    "09-uldlahend-ja-erilahendid",
    "Trigonomeetriliste võrrandite üldlahend ja erilahendid",
    "Üldlahendi valem ja erilahendite leidmine etteantud piirkonnas.",
  ),
  teema(
    "09-lihtsamad-trigonomeetrilised-vorratused",
    "Lihtsamad trigonomeetrilised võrratused",
    "Trigonomeetriliste võrratuste lahendamine graafiku abil.",
  ),
  teema(
    "09-funktsiooni-piirvaartus",
    "Funktsiooni piirväärtus",
    "Piirväärtuse mõiste funktsiooni argumendi lähenemisel.",
  ),
  teema(
    "09-funktsiooni-pidevus",
    "Funktsiooni pidevus",
    "Pidevuse mõiste piirväärtuse kaudu.",
  ),
  teema(
    "09-argumendi-muut-ja-funktsiooni-muut",
    "Argumendi muut ja funktsiooni muut",
    "Muutude mõiste tuletise definitsiooni ettevalmistuseks.",
  ),
  teema(
    "09-hetkkiirus",
    "Hetkkiirus",
    "Hetkkiiruse mõiste tuletise füüsikalise tähendusena.",
  ),
  teema("09-puutuja-tous", "Puutuja tõus", "Puutuja tõusu seos tuletisega."),
  teema(
    "09-tuletise-moiste",
    "Tuletise mõiste",
    "Tuletise definitsioon piirväärtuse kaudu.",
  ),
  teema(
    "09-tuletise-geomeetriline-tahendus",
    "Tuletise geomeetriline tähendus",
    "Tuletis kui puutuja tõus.",
  ),
  teema(
    "09-tuletise-fuusikaline-tahendus",
    "Tuletise füüsikaline tähendus",
    "Tuletis kui hetkkiirus.",
  ),
  teema(
    "09-summa-ja-vahe-tuletis",
    "Summa ja vahe tuletis",
    "Tuletamise reegel liitmisel ja lahutamisel.",
  ),
  teema(
    "09-korrutise-tuletis",
    "Korrutise tuletis",
    "Tuletamise reegel korrutisele.",
  ),
  teema(
    "09-jagatise-tuletis",
    "Jagatise tuletis",
    "Tuletamise reegel jagatisele.",
  ),
  teema(
    "09-astmefunktsiooni-tuletis",
    "Astmefunktsiooni tuletis",
    "Kuju y = xⁿ funktsiooni tuletis.",
  ),
  teema(
    "09-liitfunktsioon",
    "Liitfunktsioon",
    "Liitfunktsiooni mõiste ja esitus.",
  ),
  teema(
    "09-liitfunktsiooni-tuletis",
    "Liitfunktsiooni tuletis",
    "Ahelreegel liitfunktsiooni tuletamiseks.",
  ),
  teema(
    "09-trigonomeetriliste-funktsioonide-tuletised",
    "Trigonomeetriliste funktsioonide tuletised",
    "Siinuse, koosinuse ja tangensi tuletised.",
  ),
  teema(
    "09-eksponentfunktsiooni-tuletis",
    "Eksponentfunktsiooni tuletis",
    "Funktsioonide aˣ ja eˣ tuletised.",
  ),
  teema(
    "09-logaritmfunktsiooni-tuletis",
    "Logaritmfunktsiooni tuletis",
    "Funktsioonide logₐx ja ln x tuletised.",
  ),
  teema("09-teine-tuletis", "Teine tuletis", "Tuletise tuletis."),
  teema(
    "09-tuletiste-tabel",
    "Tuletiste tabel",
    "Põhifunktsioonide tuletiste koondtabel.",
  ),
];
