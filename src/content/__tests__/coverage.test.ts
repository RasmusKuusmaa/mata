import { describe, expect, it } from "vitest";
import { allTeemad, allTeemaIds, isFullyAuthored } from "@/content/coverage";
import type { TeemaId } from "@/content/types";

/**
 * Topics not yet fully authored: no explanation and/or fewer than three
 * generators spanning all three difficulties. Every topic starts here since
 * neither system exists yet (Ship 0.18). Remove an id in the same commit
 * that finishes its explanation and generators (Ship 1.8, 2.1-2.13) — never
 * add one back. `does not grow` below enforces that direction.
 */
const TODO_ALLOWLIST = new Set<TeemaId>([
  "05-kahe-punkti-vaheline-kaugus",
  "05-vektori-moiste-ja-liigid",
  "05-vektori-koordinaadid",
  "05-vektori-pikkus",
  "05-vektorite-liitmine-ja-lahutamine",
  "05-vektori-korrutamine-arvuga",
  "05-loigu-keskpunkt",
  "05-kahe-vektori-vaheline-nurk",
  "05-vektorite-kollinearsus",
  "05-skalaarkorrutis",
  "05-vektorite-ristseis",
  "05-kolmnurga-lahendamine-vektoritega",
  "05-sirge-punkti-ja-sihivektoriga",
  "05-sirge-punkti-ja-tousuga",
  "05-sirge-tous-ja-algordinaat",
  "05-sirge-kahe-punktiga",
  "05-sirge-uldvorrand",
  "05-kahe-sirge-vastastikune-asend",
  "05-nurk-kahe-sirge-vahel",
  "05-ringjoone-vorrand",
  "05-parabool",
  "05-hyperbool",
  "05-joone-vorrandi-moiste",
  "05-kahe-joone-loikepunkt",
  "06-permutatsioonid",
  "06-variatsioonid",
  "06-kombinatsioonid",
  "06-sundmus-ja-sundmuste-liigid",
  "06-klassikaline-toenaosus",
  "06-suhteline-sagedus-ja-statistiline-toenaosus",
  "06-geomeetriline-toenaosus",
  "06-soltuvad-ja-soltumatud-sundmused",
  "06-valistavad-ja-mittevalistavad-sundmused",
  "06-toenaosuste-liitmine",
  "06-toenaosuste-korrutamine",
  "06-bernoulli-valem",
  "06-diskreetne-ja-pidev-juhuslik-suurus",
  "06-binoomjaotus",
  "06-jaotuspolygoon",
  "06-keskvaartus",
  "06-mood",
  "06-mediaan",
  "06-dispersioon-ja-standardhalve",
  "06-uldkogum-ja-valim",
  "06-andmete-kogumine-ja-susteemiseerimine",
  "06-statistiline-analuus-uhe-tunnuse-jargi",
  "06-korrelatsioonivali",
  "06-lineaarne-korrelatsioonikordaja",
  "06-normaaljaotus",
  "06-keskvaartuse-usaldusvahemik",
  "07-funktsiooni-moiste-ja-uldtahis",
  "07-funktsiooni-esitusviisid",
  "07-maaramispiirkond",
  "07-muutumispiirkond",
  "07-paaris-ja-paaritu-funktsioon",
  "07-nullkohad",
  "07-positiivsus-ja-negatiivsuspiirkond",
  "07-kasvamine-ja-kahanemine",
  "07-ekstreemum",
  "07-astmefunktsioon",
  "07-pohifunktsioonide-graafikud",
  "07-graafiku-teisendused",
  "07-arvjada-moiste-ja-uldliige",
  "07-aritmeetiline-jada",
  "07-aritmeetilise-jada-summa",
  "07-geomeetriline-jada",
  "07-geomeetrilise-jada-summa",
  "07-arvjada-piirvaartus",
  "07-haabuv-geomeetriline-jada",
  "07-arv-e-piirvaartusena",
  "07-ringjoone-pikkus-ja-pindala-piirvaartusena",
  "07-jadade-rakendusulesanded",
  "08-liitprotsendiline-kasvamine-ja-kahanemine",
  "08-eksponentfunktsioon-ja-graafik",
  "08-funktsioon-e-x",
  "08-arvu-logaritm",
  "08-korrutise-jagatise-astme-logaritm",
  "08-logaritmimine-ja-potentseerimine",
  "08-logaritmi-aluse-vahetamine",
  "08-logaritmfunktsioon-ja-graafik",
  "08-poordfunktsioon",
  "08-eksponentvorrand",
  "08-logaritmvorrand",
  "08-eksponentvorratus",
  "08-logaritmvorratus",
  "08-eksponent-ja-logaritmmudelid",
  "09-funktsiooni-perioodilisus",
  "09-siinusfunktsiooni-graafik",
  "09-koosinusfunktsiooni-graafik",
  "09-tangensfunktsiooni-graafik",
  "09-arcsin-arccos-arctan",
  "09-lihtsamad-trigonomeetrilised-vorrandid",
  "09-uldlahend-ja-erilahendid",
  "09-lihtsamad-trigonomeetrilised-vorratused",
  "09-funktsiooni-piirvaartus",
  "09-funktsiooni-pidevus",
  "09-argumendi-muut-ja-funktsiooni-muut",
  "09-hetkkiirus",
  "09-puutuja-tous",
  "09-tuletise-moiste",
  "09-tuletise-geomeetriline-tahendus",
  "09-tuletise-fuusikaline-tahendus",
  "09-summa-ja-vahe-tuletis",
  "09-korrutise-tuletis",
  "09-jagatise-tuletis",
  "09-astmefunktsiooni-tuletis",
  "09-liitfunktsioon",
  "09-liitfunktsiooni-tuletis",
  "09-trigonomeetriliste-funktsioonide-tuletised",
  "09-eksponentfunktsiooni-tuletis",
  "09-logaritmfunktsiooni-tuletis",
  "09-teine-tuletis",
  "09-tuletiste-tabel",
  "10-puutuja-vorrand",
  "10-kasvamis-ja-kahanemisvahemikud",
  "10-ekstreemumi-tarvilik-tingimus",
  "10-ekstreemumi-piisav-tingimus",
  "10-suurim-ja-vahim-vaartus-loigul",
  "10-kumerus-ja-nogusus",
  "10-kaanupunkt",
  "10-funktsiooni-tailielik-uurimine",
  "10-graafiku-skitseerimine",
  "10-rakenduslikud-ekstreemumulesanded",
  "11-algfunktsioon",
  "11-maaramata-integraal",
  "11-integraali-omadused",
  "11-pohiintegraalide-tabel",
  "11-kovertrapets",
  "11-maaratud-integraal",
  "11-newtoni-leibnizi-valem",
  "11-pindala-maaratud-integraaliga",
  "11-mitmest-osast-koosneva-pinnatuki-pindala",
  "11-kahe-koveraga-piiratud-pinnatuki-pindala",
  "11-poordkeha-ruumala",
  "11-too-arvutamine-integraaliga",
  "11-kolmnurga-sise-ja-valisnurk",
  "11-nurgapoolitaja",
  "11-siseringjoon",
  "11-umberringjoon",
  "11-mediaan-ja-omadus",
  "11-kesklõik",
  "11-meetrilised-seosed-taisnurkses-kolmnurgas",
  "11-hulknurk-ja-liigid",
  "11-kumera-hulknurga-sisenurkade-summa",
  "11-hulknurkade-sarnasus",
  "11-sarnaste-hulknurkade-suhted",
  "11-hulknurga-sise-ja-umberringjoon",
  "11-roopkulik-ja-eriliigid",
  "11-trapets-ja-liigid",
  "11-trapetsi-kesklois",
  "11-kesknurk-ja-piirdenurk",
  "11-thalese-teoreem",
  "11-loikaja-ja-puutuja",
  "11-koolhulknurk",
  "11-puutujahulknurk",
  "11-kolmnurga-pindala-valemid",
  "11-rakenduslikud-planimeetriaulesanded",
  "12-ruumigeomeetria-asendilaused",
  "12-nurk-kahe-sirge-vahel",
  "12-nurk-sirge-ja-tasandi-vahel",
  "12-nurk-kahe-tasandi-vahel",
  "12-paralleelsus",
  "12-ristseis",
  "12-kolme-ristsirge-teoreem",
  "12-hulknurga-projektsiooni-pindala",
  "12-ristkoordinaadid-ruumis",
  "12-punkti-kohavektor",
  "12-ruumivektori-koordinaadid-ja-pikkus",
  "12-lineaartehted-ruumivektoritega",
  "12-kollinearsus-ruumis",
  "12-komplanaarsus",
  "12-vektori-avaldamine-kolme-vektori-kaudu",
  "12-skalaarkorrutis-ruumis",
  "12-kahe-vektori-nurk-ruumis",
  "12-sirge-vorrandid-ruumis",
  "12-tasandi-vorrand",
  "12-vastastikuse-asendi-uurimine",
  "12-sirge-ja-tasandi-loikepunkt",
  "12-ruumigeomeetria-rakendusulesanded",
  "13-prisma",
  "13-puramiid",
  "13-korrapaarased-hulktahukad",
  "13-silinder",
  "13-koonus",
  "13-kera",
  "13-kera-segment-kiht-voo-sektor",
  "13-silindri-ruumala-tuletamine",
  "13-koonuse-ruumala-tuletamine",
  "13-kera-ruumala-tuletamine",
  "13-hulktahukate-loiked",
  "13-poordkehade-loiked",
  "13-stereomeetria-rakendusulesanded",
  "14-matemaatilise-mudeli-moiste",
  "14-modelleerimise-etapid",
  "14-mudeli-headuse-hindamine",
  "14-tekstulesanded-vorrandite-abil",
  "14-protsentulesanded-mudelina",
  "14-lineaarmudelid",
  "14-ruutmudelid",
  "14-eksponentmudelid",
  "14-rakendused-loodusteaduses",
  "14-rakendused-majanduses",
  "14-rakendused-tehnoloogias",
]);

/** High-water mark: the allowlist may only shrink from here, never grow. */
const PREVIOUS_ALLOWLIST_SIZE = 275;

const remaining = allTeemad.length - TODO_ALLOWLIST.size;
console.log(
  `curriculum coverage: ${remaining}/${allTeemad.length} topics fully authored (explanation + ≥3 generators across all difficulties)`,
);

describe("curriculum coverage gate", () => {
  it("has no duplicate ids", () => {
    const ids = allTeemad.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has no empty opitulemused", () => {
    for (const t of allTeemad) {
      expect(t.opitulemused.length).toBeGreaterThan(0);
    }
  });

  it("has no dangling eeldused reference", () => {
    for (const t of allTeemad) {
      for (const prereqId of t.eeldused) {
        expect(allTeemaIds.has(prereqId)).toBe(true);
      }
    }
  });

  it("only allowlists ids that name a real topic", () => {
    for (const id of TODO_ALLOWLIST) {
      expect(allTeemaIds.has(id)).toBe(true);
    }
  });

  it("does not grow past its previous size", () => {
    expect(TODO_ALLOWLIST.size).toBeLessThanOrEqual(PREVIOUS_ALLOWLIST_SIZE);
  });

  it("gives every non-allowlisted topic an explanation and full generator coverage", () => {
    for (const t of allTeemad) {
      if (TODO_ALLOWLIST.has(t.id)) continue;
      expect(isFullyAuthored(t.id)).toBe(true);
    }
  });
});
