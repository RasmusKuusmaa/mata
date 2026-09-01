import { describe, expect, it } from "vitest";
import { teemad } from "./eeldused";

describe("eeldused", () => {
  it("has no duplicate ids", () => {
    const ids = teemad.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every topic a non-empty name, description and outcomes", () => {
    for (const t of teemad) {
      expect(t.nimi.length).toBeGreaterThan(0);
      expect(t.kirjeldus.length).toBeGreaterThan(0);
      expect(t.opitulemused.length).toBeGreaterThan(0);
    }
  });

  it("tags every topic with the prerequisite course id", () => {
    for (const t of teemad) {
      expect(t.kursusId).toBe("E");
    }
  });
});
