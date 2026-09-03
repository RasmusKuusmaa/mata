import { describe, expect, it } from "vitest";
import { jargmiseTasemeniXp, tasemeleXp, xpTasemeAlguseks } from "./level";

describe("tasemeleXp", () => {
  it("starts everyone at level 1 with zero xp", () => {
    expect(tasemeleXp(0)).toBe(1);
  });

  it("reaches level 2 at exactly 50 xp", () => {
    expect(tasemeleXp(49)).toBe(1);
    expect(tasemeleXp(50)).toBe(2);
  });

  it("reaches level 3 at exactly 200 xp", () => {
    expect(tasemeleXp(199)).toBe(2);
    expect(tasemeleXp(200)).toBe(3);
  });

  it("is monotonically non-decreasing in xp", () => {
    let last = tasemeleXp(0);
    for (let xp = 0; xp <= 5000; xp += 37) {
      const level = tasemeleXp(xp);
      expect(level).toBeGreaterThanOrEqual(last);
      last = level;
    }
  });
});

describe("xpTasemeAlguseks and jargmiseTasemeniXp", () => {
  it("round-trips: the xp needed to start a level maps back to that level", () => {
    for (let level = 1; level <= 10; level++) {
      expect(tasemeleXp(xpTasemeAlguseks(level))).toBe(level);
    }
  });

  it("reports zero remaining xp exactly at a level boundary minus one step", () => {
    expect(jargmiseTasemeniXp(0)).toBe(xpTasemeAlguseks(2));
    expect(jargmiseTasemeniXp(xpTasemeAlguseks(2) - 1)).toBe(1);
  });
});
