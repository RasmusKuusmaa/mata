import { describe, expect, it } from "vitest";
import { checkUlesanne } from "./niceness";
import type { Ulesanne } from "./types";

function baseUlesanne(overrides: Partial<Ulesanne> = {}): Ulesanne {
  return {
    seed: 1,
    kysimus: "Arvuta \\sqrt{9}.",
    vastus: { tuup: "arv", kuju: "taisarv", vaartus: 3 },
    lahendus: ["\\sqrt{9} = 3"],
    ...overrides,
  };
}

describe("checkUlesanne", () => {
  it("passes a well-formed question", () => {
    expect(checkUlesanne(baseUlesanne())).toEqual([]);
  });

  it("flags an answer that isn't nice", () => {
    const problems = checkUlesanne(
      baseUlesanne({
        vastus: { tuup: "arv", kuju: "murd", lugeja: 1, nimetaja: 17 },
      }),
    );
    expect(problems.some((p) => p.includes("not nice"))).toBe(true);
  });

  it("flags an empty question", () => {
    const problems = checkUlesanne(baseUlesanne({ kysimus: "" }));
    expect(problems.some((p) => p.includes("kysimus is empty"))).toBe(true);
  });

  it("flags an empty lahendus array", () => {
    const problems = checkUlesanne(baseUlesanne({ lahendus: [] }));
    expect(problems.some((p) => p.includes("lahendus is empty"))).toBe(true);
  });

  it("flags an empty lahendus step", () => {
    const problems = checkUlesanne(baseUlesanne({ lahendus: [""] }));
    expect(problems.some((p) => p.includes("lahendus[0] is empty"))).toBe(
      true,
    );
  });

  it.each(["NaN", "Infinity", "undefined"])(
    "flags %s appearing in rendered text",
    (token) => {
      const problems = checkUlesanne(
        baseUlesanne({ kysimus: `Vastus on ${token}.` }),
      );
      expect(problems.some((p) => p.includes(token))).toBe(true);
    },
  );

  it("flags a raw negative zero", () => {
    const problems = checkUlesanne(baseUlesanne({ kysimus: "x = -0" }));
    expect(problems.some((p) => p.includes("-0"))).toBe(true);
  });

  it("does not flag a legitimate negative decimal as negative zero", () => {
    const problems = checkUlesanne(
      baseUlesanne({ kysimus: "x = -0,5", lahendus: ["x = -0,5"] }),
    );
    expect(problems.some((p) => p.includes("raw \"-0\""))).toBe(false);
  });

  it("flags a raw decimal point", () => {
    const problems = checkUlesanne(baseUlesanne({ kysimus: "x = 2.5" }));
    expect(problems.some((p) => p.includes("decimal point"))).toBe(true);
  });

  it("does not flag the estonian comma decimal", () => {
    const problems = checkUlesanne(baseUlesanne({ kysimus: "x = 2,5" }));
    expect(problems.some((p) => p.includes("decimal point"))).toBe(false);
  });

  it("flags invalid latex", () => {
    const problems = checkUlesanne(
      baseUlesanne({ kysimus: "\\frac{1}{2" }),
    );
    expect(problems.some((p) => p.includes("not valid LaTeX"))).toBe(true);
  });

  it("accepts the estonian tangent macros", () => {
    expect(
      checkUlesanne(
        baseUlesanne({
          kysimus: "Arvuta \\tg 45°.",
          lahendus: ["\\tg 45° = 1"],
        }),
      ),
    ).toEqual([]);
  });

  it("checks the optional vihje too", () => {
    const problems = checkUlesanne(
      baseUlesanne({ vihje: "See on NaN vihje." }),
    );
    expect(problems.some((p) => p.includes("vihje"))).toBe(true);
  });

  describe("valik answers", () => {
    it("passes unique distractors that exclude the correct answer", () => {
      const problems = checkUlesanne(
        baseUlesanne({
          vastus: { tuup: "valik", oige: "3", eksitajad: ["2", "4"] },
        }),
      );
      expect(problems).toEqual([]);
    });

    it("flags a distractor equal to the correct answer", () => {
      const problems = checkUlesanne(
        baseUlesanne({
          vastus: { tuup: "valik", oige: "3", eksitajad: ["3", "4"] },
        }),
      );
      expect(problems.some((p) => p.includes("correct answer"))).toBe(true);
    });

    it("flags duplicate distractors", () => {
      const problems = checkUlesanne(
        baseUlesanne({
          vastus: { tuup: "valik", oige: "3", eksitajad: ["2", "2"] },
        }),
      );
      expect(problems.some((p) => p.includes("not unique"))).toBe(true);
    });
  });
});
