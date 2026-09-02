import { describe, expect, it } from "vitest";
import { findEeldused, findTeema } from "./lookup";

describe("findTeema", () => {
  it("finds a real course topic by aine and id", () => {
    const teema = findTeema("lai-matemaatika", "01-arvuhulgad");
    expect(teema?.nimi).toBe("Arvuhulgad N, Z, Q, I, R");
  });

  it("finds a real E-series prerequisite topic by aine and id", () => {
    const teema = findTeema("lai-matemaatika", "E-murdarvud");
    expect(teema?.kursusId).toBe("E");
  });

  it("returns undefined for an unknown id", () => {
    expect(findTeema("lai-matemaatika", "does-not-exist")).toBeUndefined();
  });

  it("returns undefined when the aine doesn't match", () => {
    expect(findTeema("kitsas-matemaatika", "01-arvuhulgad")).toBeUndefined();
  });
});

describe("findEeldused", () => {
  it("resolves a topic's direct prerequisites to their topics", () => {
    const teema = findTeema("lai-matemaatika", "01-arvuhulgad");
    expect(teema).toBeDefined();
    const eeldused = findEeldused(teema!);
    expect(eeldused.length).toBe(teema!.eeldused.length);
    for (const eeldus of eeldused) {
      expect(teema!.eeldused).toContain(eeldus.id);
    }
  });

  it("returns an empty array for a topic with no prerequisites", () => {
    const teema = { ...findTeema("lai-matemaatika", "01-arvuhulgad")!, eeldused: [] };
    expect(findEeldused(teema)).toEqual([]);
  });

  it("drops an id that doesn't resolve rather than throwing", () => {
    const teema = {
      ...findTeema("lai-matemaatika", "01-arvuhulgad")!,
      eeldused: ["does-not-exist"],
    };
    expect(findEeldused(teema)).toEqual([]);
  });
});
