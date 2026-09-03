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
