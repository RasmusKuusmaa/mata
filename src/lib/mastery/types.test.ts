import { describe, expect, it } from "vitest";
import { rollingAccuracyMastery, type Katse } from "./types";

function katse(oige: boolean): Katse {
  return { oige, raskus: "kerge", toimus: new Date("2027-01-01") };
}

describe("rollingAccuracyMastery", () => {
  it("reports alustamata for no attempts", () => {
    expect(rollingAccuracyMastery.arvuta([])).toEqual({
      skoor: 0,
      tase: "alustamata",
    });
  });

  it("reports kindel for all-correct attempts", () => {
    const result = rollingAccuracyMastery.arvuta([
      katse(true),
      katse(true),
      katse(true),
    ]);
    expect(result.skoor).toBe(100);
    expect(result.tase).toBe("kindel");
  });

  it("reports algaja (not alustamata) for all-wrong attempts", () => {
    const result = rollingAccuracyMastery.arvuta([katse(false), katse(false)]);
    expect(result.skoor).toBe(0);
    expect(result.tase).toBe("algaja");
  });

  it("computes a rounded percentage for mixed attempts", () => {
    const result = rollingAccuracyMastery.arvuta([
      katse(true),
      katse(true),
      katse(false),
    ]);
    expect(result.skoor).toBe(67);
    expect(result.tase).toBe("hea");
  });

  it.each([
    [24, "algaja"],
    [25, "edeneb"],
    [49, "edeneb"],
    [50, "hea"],
    [79, "hea"],
    [80, "kindel"],
  ] as const)("bands score %i as %s", (skoor, tase) => {
    const total = 100;
    const oigeid = skoor;
    const katsed = [
      ...Array.from({ length: oigeid }, () => katse(true)),
      ...Array.from({ length: total - oigeid }, () => katse(false)),
    ];
    expect(rollingAccuracyMastery.arvuta(katsed).tase).toBe(tase);
  });
});
