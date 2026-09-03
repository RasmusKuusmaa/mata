import { describe, expect, it } from "vitest";
import { decayingMastery, type Katse } from "./types";

const NOW = new Date("2026-09-04T12:00:00Z");

function katse(oige: boolean, daysAgo: number, raskus: Katse["raskus"] = "kerge"): Katse {
  const toimus = new Date(NOW);
  toimus.setUTCDate(toimus.getUTCDate() - daysAgo);
  return { oige, raskus, toimus };
}

describe("decayingMastery", () => {
  it("reports alustamata for no attempts", () => {
    expect(decayingMastery.arvuta([], NOW)).toEqual({
      skoor: 0,
      tase: "alustamata",
    });
  });

  it("reports a high score for recent all-correct attempts", () => {
    const result = decayingMastery.arvuta(
      [katse(true, 0), katse(true, 1), katse(true, 2)],
      NOW,
    );
    expect(result.skoor).toBeGreaterThanOrEqual(95);
    expect(result.tase).toBe("kindel");
  });

  it("reports algaja (not alustamata) for all-wrong recent attempts", () => {
    const result = decayingMastery.arvuta(
      [katse(false, 0), katse(false, 1)],
      NOW,
    );
    expect(result.skoor).toBe(0);
    expect(result.tase).toBe("algaja");
  });

  it("fades a topic that hasn't been touched in a long time, even if every attempt was correct", () => {
    const recent = decayingMastery.arvuta([katse(true, 0)], NOW);
    const stale = decayingMastery.arvuta([katse(true, 200)], NOW);
    expect(stale.skoor).toBeLessThan(recent.skoor);
  });

  it("weights harder correct answers more than easier ones", () => {
    const easyOnly = decayingMastery.arvuta(
      [katse(true, 0, "kerge"), katse(false, 0, "raske")],
      NOW,
    );
    const hardOnly = decayingMastery.arvuta(
      [katse(false, 0, "kerge"), katse(true, 0, "raske")],
      NOW,
    );
    expect(hardOnly.skoor).toBeGreaterThan(easyOnly.skoor);
  });

  it("weights recent attempts more than older ones within the same history", () => {
    const recentlyImproved = decayingMastery.arvuta(
      [katse(false, 20), katse(false, 15), katse(true, 1), katse(true, 0)],
      NOW,
    );
    const recentlyDeclined = decayingMastery.arvuta(
      [katse(true, 20), katse(true, 15), katse(false, 1), katse(false, 0)],
      NOW,
    );
    expect(recentlyImproved.skoor).toBeGreaterThan(recentlyDeclined.skoor);
  });

  it("rewards a longer streak of recent correct answers with a higher score", () => {
    const shortStreak = decayingMastery.arvuta(
      [katse(true, 0), katse(true, 1)],
      NOW,
    );
    const longStreak = decayingMastery.arvuta(
      [katse(true, 0), katse(true, 1), katse(true, 2), katse(true, 3), katse(true, 4)],
      NOW,
    );
    expect(longStreak.skoor).toBeGreaterThanOrEqual(shortStreak.skoor);
  });

  it.each([
    [0, "algaja"],
    [30, "edeneb"],
    [60, "hea"],
    [95, "kindel"],
  ] as const)("bands a %i%% recent same-difficulty accuracy as %s", (percentCorrect, tase) => {
    const total = 20;
    const oigeid = Math.round((percentCorrect / 100) * total);
    const katsed = [
      ...Array.from({ length: oigeid }, () => katse(true, 0)),
      ...Array.from({ length: total - oigeid }, () => katse(false, 0)),
    ];
    const result = decayingMastery.arvuta(katsed, NOW);
    expect(result.tase).toBe(tase);
  });
});
