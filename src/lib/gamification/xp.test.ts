import { describe, expect, it } from "vitest";
import { arvutaXp } from "./xp";

describe("arvutaXp", () => {
  it("awards nothing for a wrong answer, at any difficulty or repeat count", () => {
    expect(arvutaXp("raske", false, 0)).toBe(0);
    expect(arvutaXp("kerge", false, 3)).toBe(0);
  });

  it("scales base xp by difficulty on a first attempt", () => {
    expect(arvutaXp("kerge", true, 0)).toBe(10);
    expect(arvutaXp("keskmine", true, 0)).toBe(20);
    expect(arvutaXp("raske", true, 0)).toBe(35);
  });

  it("halves xp per repeat of the same generator", () => {
    expect(arvutaXp("keskmine", true, 1)).toBe(10);
    expect(arvutaXp("keskmine", true, 2)).toBe(5);
  });

  it("never drops below the minimum multiplier floor", () => {
    const many = arvutaXp("kerge", true, 20);
    expect(many).toBe(Math.round(10 * 0.2));
    expect(arvutaXp("kerge", true, 20)).toBe(arvutaXp("kerge", true, 8));
  });
});
