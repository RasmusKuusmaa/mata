import { makeTeemaFactory, withSequentialEeldused } from "./helpers";

/** V kursus "Vektor tasandil. Joone võrrand" — docs/ainekava-2025.pdf lk 10. */
const opitulemused = [
  "selgitab mõisteid vektor, ühik-, null- ja vastandvektor, vektori koordinaadid, kahe vektori vaheline nurk",
  "liidab ja lahutab vektoreid ning korrutab vektorit arvuga nii geomeetriliselt kui ka koordinaatkujul",
  "leiab vektori pikkuse, lõigu keskpunkti koordinaadid, kahe vektori skalaarkorrutise ning rakendab neid geomeetriaprobleemide lahendamisel",
  "kasutab vektorite ristseisu ja kollineaarsuse tunnuseid geomeetriaprobleemide lahendamisel",
  "koostab sirge võrrandi (kui sirge on määratud punkti ja sihivektoriga, punkti ja tõusuga, tõusu ja algordinaadiga, kahe punktiga) ning teisendab selle üldvõrrandiks, kontrollib tehtud arvutis",
  "määrab kahe sirge vastastikuse asendi tasandil, lõikuvate sirgete korral leiab sirgete lõikepunkti ja sirgete vahelise nurga, kontrollib tehtut arvutis",
  "koostab hüperbooli, parabooli ja ringjoone võrrandi; joonestab ainekavas esitatud jooni nende võrrandite järgi nii paberil kui ka arvutis; leiab kahe joone lõikepunktid, kontrollib tehtut arvutis",
];

const teema = makeTeemaFactory("05", opitulemused);

export const teemad = withSequentialEeldused(
  [
  teema(
    "05-kahe-punkti-vaheline-kaugus",
    "Kahe punkti vaheline kaugus",
    "Punktidevahelise kauguse valem tasandil.",
  ),
  teema(
    "05-vektori-moiste-ja-liigid",
    "Vektori mõiste ja liigid",
    "Vektor, ühik-, null- ja vastandvektor.",
  ),
  teema(
    "05-vektori-koordinaadid",
    "Vektori koordinaadid",
    "Vektori esitamine koordinaatidega.",
  ),
  teema(
    "05-vektori-pikkus",
    "Vektori pikkus",
    "Vektori pikkuse arvutamine koordinaatidest.",
  ),
  teema(
    "05-vektorite-liitmine-ja-lahutamine",
    "Vektorite liitmine ja lahutamine",
    "Geomeetriline ja koordinaatkujul liitmine-lahutamine.",
  ),
  teema(
    "05-vektori-korrutamine-arvuga",
    "Vektori korrutamine arvuga",
    "Skalaariga korrutamise geomeetriline tähendus.",
  ),
  teema(
    "05-loigu-keskpunkt",
    "Lõigu keskpunkt",
    "Keskpunkti koordinaatide valem.",
  ),
  teema(
    "05-kahe-vektori-vaheline-nurk",
    "Kahe vektori vaheline nurk",
    "Nurga leidmine skalaarkorrutise abil.",
  ),
  teema(
    "05-vektorite-kollinearsus",
    "Vektorite kollineaarsus",
    "Kollineaarsuse tunnus koordinaatide kaudu.",
  ),
  teema(
    "05-skalaarkorrutis",
    "Skalaarkorrutis",
    "Skalaarkorrutise definitsioon ja omadused.",
  ),
  teema(
    "05-vektorite-ristseis",
    "Vektorite ristseis",
    "Ristseisu tunnus skalaarkorrutise kaudu.",
  ),
  teema(
    "05-kolmnurga-lahendamine-vektoritega",
    "Kolmnurga lahendamine vektoritega",
    "Vektorite rakendamine kolmnurgaülesannetes.",
  ),
  teema(
    "05-sirge-punkti-ja-sihivektoriga",
    "Sirge võrrand punkti ja sihivektoriga",
    "Sirge parameetriline esitus.",
  ),
  teema(
    "05-sirge-punkti-ja-tousuga",
    "Sirge võrrand punkti ja tõusuga",
    "Sirge võrrand kuju y − y₀ = k(x − x₀).",
  ),
  teema(
    "05-sirge-tous-ja-algordinaat",
    "Sirge tõus ja algordinaat",
    "Sirge võrrand kuju y = kx + b.",
  ),
  teema(
    "05-sirge-kahe-punktiga",
    "Sirge kahe punktiga",
    "Sirge võrrand kahe punkti järgi.",
  ),
  teema(
    "05-sirge-uldvorrand",
    "Sirge üldvõrrand",
    "Sirge esitus kujul ax + by + c = 0.",
  ),
  teema(
    "05-kahe-sirge-vastastikune-asend",
    "Kahe sirge vastastikune asend",
    "Paralleelsed, ristuvad ja lõikuvad sirged.",
  ),
  teema(
    "05-nurk-kahe-sirge-vahel",
    "Nurk kahe sirge vahel",
    "Sirgetevahelise nurga arvutamine tõusude kaudu.",
  ),
  teema(
    "05-ringjoone-vorrand",
    "Ringjoone võrrand",
    "Ringjoone võrrand keskpunkti ja raadiuse järgi.",
  ),
  teema("05-parabool", "Parabool", "Parabooli võrrand ja graafik."),
  teema("05-hyperbool", "Hüperbool", "Hüperbooli võrrand ja graafik."),
  teema(
    "05-joone-vorrandi-moiste",
    "Joone võrrandi mõiste",
    "Mis teeb võrrandist joone võrrandi.",
  ),
  teema(
    "05-kahe-joone-loikepunkt",
    "Kahe joone lõikepunkt",
    "Lõikepunktide leidmine võrrandisüsteemi lahendades.",
  ),
  ],
  ["04-trigonomeetria-rakendusulesanded"],
);
