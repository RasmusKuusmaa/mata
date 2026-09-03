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
