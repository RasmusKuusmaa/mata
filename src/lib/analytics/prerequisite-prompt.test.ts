import { describe, expect, it } from "vitest";
import { buildIndex } from "@/content/graph";
import { suggestPrerequisite } from "./prerequisite-prompt";

const index = buildIndex([
  { id: "target", eeldused: ["prereq-a", "prereq-b"] },
  { id: "prereq-a", eeldused: [] },
  { id: "prereq-b", eeldused: [] },
  { id: "no-prereqs", eeldused: [] },
]);

describe("suggestPrerequisite", () => {
  it("suggests nothing after a single miss", () => {
    expect(suggestPrerequisite("target", [true, false], index, new Map())).toBeNull();
  });

  it("suggests nothing when the topic has no prerequisites", () => {
    expect(
      suggestPrerequisite("no-prereqs", [false, false], index, new Map()),
    ).toBeNull();
  });

  it("suggests the weakest prerequisite after two consecutive misses", () => {
    const mastery = new Map([
      ["prereq-a", 80],
      ["prereq-b", 30],
    ]);
    expect(suggestPrerequisite("target", [true, false, false], index, mastery)).toBe(
      "prereq-b",
    );
  });

  it("treats a never-attempted prerequisite as weaker than any attempted score", () => {
    const mastery = new Map([["prereq-a", 10]]);
    expect(suggestPrerequisite("target", [false, false], index, mastery)).toBe(
      "prereq-b",
    );
  });

  it("does not suggest after a miss followed by a correct answer", () => {
    expect(
      suggestPrerequisite("target", [false, false, true], index, new Map()),
    ).toBeNull();
  });
});
