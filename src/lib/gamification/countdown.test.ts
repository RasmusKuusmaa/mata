import { describe, expect, it } from "vitest";
import { paevaEksamini, VAIKIMISI_EKSAMI_KUUPAEV } from "./countdown";

describe("paevaEksamini", () => {
  it("counts down to the default date when none is set", () => {
    expect(paevaEksamini(null, new Date("2027-04-24T00:00:00Z"))).toBe(2);
  });

  it("counts down to a configured date", () => {
    expect(paevaEksamini("2027-05-01", new Date("2027-04-24T00:00:00Z"))).toBe(7);
  });

  it("never goes negative for a past date", () => {
    expect(paevaEksamini("2027-01-01", new Date("2027-04-24T00:00:00Z"))).toBe(0);
  });

  it("is zero on the exam day itself", () => {
    expect(
      paevaEksamini(VAIKIMISI_EKSAMI_KUUPAEV, new Date(`${VAIKIMISI_EKSAMI_KUUPAEV}T00:00:00Z`)),
    ).toBe(0);
  });
});
