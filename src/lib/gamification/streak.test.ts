import { describe, expect, it } from "vitest";
import { markeeriTegevus, TYHI_STREAK, type StreakSeis } from "./streak";

describe("markeeriTegevus", () => {
  it("starts a streak of 1 on the first-ever activity", () => {
    const result = markeeriTegevus(TYHI_STREAK, "2027-03-01");
    expect(result.streakCurrent).toBe(1);
    expect(result.streakLongest).toBe(1);
    expect(result.lastActiveDate).toBe("2027-03-01");
  });

  it("is a no-op for a second activity on the same day", () => {
    const day1 = markeeriTegevus(TYHI_STREAK, "2027-03-01");
    const again = markeeriTegevus(day1, "2027-03-01");
    expect(again).toEqual(day1);
  });

  it("extends the streak for the very next day", () => {
    const day1 = markeeriTegevus(TYHI_STREAK, "2027-03-01");
    const day2 = markeeriTegevus(day1, "2027-03-02");
    expect(day2.streakCurrent).toBe(2);
    expect(day2.streakLongest).toBe(2);
  });

  it("tracks the longest streak even after a later reset", () => {
    let seis = markeeriTegevus(TYHI_STREAK, "2027-03-01");
    seis = markeeriTegevus(seis, "2027-03-02");
    seis = markeeriTegevus(seis, "2027-03-03");
    expect(seis.streakLongest).toBe(3);

    // Burn the week's freeze bridging a missed day, then blow a second gap.
    seis = markeeriTegevus(seis, "2027-03-05");
    expect(seis.streakFreezesLeft).toBe(0);
    seis = markeeriTegevus(seis, "2027-03-09");
    expect(seis.streakCurrent).toBe(1);
    expect(seis.streakLongest).toBe(4);
  });

  it("uses the weekly freeze to bridge exactly one missed day", () => {
    const day1 = markeeriTegevus(TYHI_STREAK, "2027-03-01");
    const bridged = markeeriTegevus(day1, "2027-03-03");
    expect(bridged.streakCurrent).toBe(2);
    expect(bridged.streakFreezesLeft).toBe(0);
  });

  it("resets on a gap of two days with no freeze left", () => {
    let seis: StreakSeis = {
      streakCurrent: 5,
      streakLongest: 5,
      streakFreezesLeft: 0,
      lastActiveDate: "2027-03-01",
    };
    seis = markeeriTegevus(seis, "2027-03-03");
    expect(seis.streakCurrent).toBe(1);
    expect(seis.streakLongest).toBe(5);
  });

  it("resets on any gap of more than two days regardless of freezes", () => {
    const day1 = markeeriTegevus(TYHI_STREAK, "2027-03-01");
    const farAway = markeeriTegevus(day1, "2027-03-10");
    expect(farAway.streakCurrent).toBe(1);
  });

  it("replenishes the freeze in a new iso week", () => {
    let seis = markeeriTegevus(TYHI_STREAK, "2027-03-01"); // Monday
    seis = markeeriTegevus(seis, "2027-03-03"); // burns the freeze
    expect(seis.streakFreezesLeft).toBe(0);
    seis = markeeriTegevus(seis, "2027-03-08"); // next Monday, new week
    expect(seis.streakFreezesLeft).toBe(1);
  });
});
