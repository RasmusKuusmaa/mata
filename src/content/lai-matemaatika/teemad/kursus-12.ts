import { makeTeemaFactory, withSequentialEeldused } from "./helpers";

/** XII kursus "Sirge ja tasand ruumis" — docs/ainekava-2025.pdf lk 12. */
const opitulemused = [
  "kirjeldab ja määrab punkti asukoha ruumis koordinaatide abil",
  "selgitab ja rakendab ruumivektori mõistet, lineaartehteid vektoritega, vektorite kollineaarsuse ja komplanaarsuse tunnuseid ning vektorite skalaarkorrutist",
  "kirjeldab sirge ja tasandi vastastikuseid asendeid",
  "arvutab kahe punkti vahelise kauguse, vektori pikkuse ning kahe vektori vahelise nurga",
  "määrab kahe sirge, sirge ja tasandi, kahe tasandi vastastikuse asendi ning arvutab nendevahelise nurga stereomeetria ülesannetes",
  "tunneb ära ainealased ja -välised probleemid, mis on lahendatavad ruumigeomeetrias õpitud seoste abil. Tõlgib need matemaatika keelde, lahendab matemaatiliselt ning tõlgendab ja esitleb saadud tulemusi",
];

const teema = makeTeemaFactory("12", opitulemused);

export const teemad = withSequentialEeldused(
  [
  teema(
    "12-ruumigeomeetria-asendilaused",
    "Ruumigeomeetria asendilaused",
    "Punktide, sirgete ja tasandite vastastikuste asendite alusväited.",
  ),
  teema(
    "12-nurk-kahe-sirge-vahel",
    "Nurk kahe sirge vahel",
    "Kahe sirge vahelise nurga arvutamine ruumis.",
  ),
  teema(
    "12-nurk-sirge-ja-tasandi-vahel",
    "Nurk sirge ja tasandi vahel",
    "Sirge ja tasandi vahelise nurga arvutamine.",
  ),
  teema(
    "12-nurk-kahe-tasandi-vahel",
    "Nurk kahe tasandi vahel",
    "Kahe tasandi vahelise nurga arvutamine.",
  ),
  teema(
    "12-paralleelsus",
    "Sirgete ja tasandite paralleelsus",
    "Paralleelsuse tunnused ruumis.",
  ),
  teema(
    "12-ristseis",
    "Sirgete ja tasandite ristseis",
    "Ristseisu tunnused ruumis.",
  ),
  teema(
    "12-kolme-ristsirge-teoreem",
    "Kolme ristsirge teoreem",
    "Ristsirgete teoreem ja selle rakendused.",
  ),
  teema(
    "12-hulknurga-projektsiooni-pindala",
    "Hulknurga projektsiooni pindala",
    "Kujundi projektsiooni pindala seos algse pindalaga.",
  ),
  teema(
    "12-ristkoordinaadid-ruumis",
    "Ristkoordinaadid ruumis",
    "Punkti asukoht ruumis koordinaatide abil.",
  ),
  teema(
    "12-punkti-kohavektor",
    "Punkti kohavektor",
    "Kohavektori mõiste ruumis.",
  ),
  teema(
    "12-ruumivektori-koordinaadid-ja-pikkus",
    "Ruumivektori koordinaadid ja pikkus",
    "Vektori esitus koordinaatidega ja pikkuse arvutamine.",
  ),
  teema(
    "12-lineaartehted-ruumivektoritega",
    "Lineaartehted ruumivektoritega",
    "Ruumivektorite liitmine, lahutamine ja arvuga korrutamine.",
  ),
  teema(
    "12-kollinearsus-ruumis",
    "Vektorite kollineaarsus ruumis",
    "Kollineaarsuse tunnus ruumivektorite korral.",
  ),
  teema(
    "12-komplanaarsus",
    "Vektorite komplanaarsus",
    "Komplanaarsuse mõiste ja tunnus.",
  ),
  teema(
    "12-vektori-avaldamine-kolme-vektori-kaudu",
    "Vektori avaldamine kolme mittekomplanaarse vektori kaudu",
    "Ruumivektori lahutamine baasvektoriteks.",
  ),
  teema(
    "12-skalaarkorrutis-ruumis",
    "Skalaarkorrutis ruumis",
    "Skalaarkorrutise arvutamine ruumivektorite korral.",
  ),
  teema(
    "12-kahe-vektori-nurk-ruumis",
    "Kahe vektori vaheline nurk ruumis",
    "Nurga leidmine skalaarkorrutise abil ruumis.",
  ),
  teema(
    "12-sirge-vorrandid-ruumis",
    "Sirge võrrandid ruumis",
    "Sirge parameetriline ja kanooniline võrrand ruumis.",
  ),
  teema(
    "12-tasandi-vorrand",
    "Tasandi võrrand",
    "Tasandi üldvõrrand ja selle koostamine.",
  ),
  teema(
    "12-vastastikuse-asendi-uurimine",
    "Sirgete ja tasandite vastastikuse asendi uurimine",
    "Asendi määramine võrrandite abil.",
  ),
  teema(
    "12-sirge-ja-tasandi-loikepunkt",
    "Sirge ja tasandi lõikepunkt",
    "Lõikepunkti leidmine võrrandisüsteemi lahendades.",
  ),
  teema(
    "12-ruumigeomeetria-rakendusulesanded",
    "Ruumigeomeetria rakendusülesanded",
    "Reaalelulised probleemid, mis lahenevad ruumigeomeetria abil.",
  ),
  ],
  ["11-rakenduslikud-planimeetriaulesanded"],
  { 10: ["12-punkti-kohavektor", "05-vektori-moiste-ja-liigid"] },
);
