import { describe, expect, it } from "vitest";
import { kursused } from "@/content/lai-matemaatika/kursused";
import { teemad } from "./index";

describe("teemad", () => {
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

  it("marks every topic as covered by the 2027 exam by default", () => {
    for (const t of teemad) {
      expect(t.eksamiKate[2027]).toBe(true);
    }
  });

  it("references a real course for every topic", () => {
    const kursusIds = new Set(kursused.map((k) => k.id));
    for (const t of teemad) {
      expect(kursusIds.has(t.kursusId)).toBe(true);
    }
  });

  it("covers all fourteen courses", () => {
    const kursusIds = new Set(teemad.map((t) => t.kursusId));
    expect(kursusIds.size).toBe(14);
  });
});
