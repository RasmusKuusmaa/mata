import { describe, expect, it } from "vitest";
import { alwaysDueScheduler } from "./types";

describe("alwaysDueScheduler", () => {
  it("is due when never reviewed", () => {
    expect(alwaysDueScheduler.onTahtaegne(null, new Date())).toBe(true);
  });

  it("is due even when the previous review was moments ago", () => {
    const now = new Date("2027-01-01T12:00:00Z");
    const seis = { jargmineLabivaatus: now, intervallPaevades: 0 };
    expect(alwaysDueScheduler.onTahtaegne(seis, now)).toBe(true);
  });

  it("is due even when a future review date is recorded", () => {
    const now = new Date("2027-01-01T12:00:00Z");
    const future = new Date("2027-06-01T12:00:00Z");
    const seis = { jargmineLabivaatus: future, intervallPaevades: 150 };
    expect(alwaysDueScheduler.onTahtaegne(seis, now)).toBe(true);
  });

  it("jargmine sets the next review to right now with a zero interval", () => {
    const now = new Date("2027-01-01T12:00:00Z");
    expect(alwaysDueScheduler.jargmine(null, true, now)).toEqual({
      jargmineLabivaatus: now,
      intervallPaevades: 0,
    });
    expect(alwaysDueScheduler.jargmine(null, false, now)).toEqual({
      jargmineLabivaatus: now,
      intervallPaevades: 0,
    });
  });
});
