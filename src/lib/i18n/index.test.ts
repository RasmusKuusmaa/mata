import { describe, expect, it } from "vitest";
import { resolveLocale, t } from "./index";

describe("t", () => {
  it("returns the estonian string for a known key", () => {
    expect(t("nav.teemad")).toBe("Teemad");
  });
});

describe("resolveLocale", () => {
  it("defaults to et when nothing is requested", () => {
    expect(resolveLocale()).toBe("et");
    expect(resolveLocale(null)).toBe("et");
  });

  it("falls back to et for an unsupported locale", () => {
    expect(resolveLocale("uk")).toBe("et");
  });

  it("accepts a supported locale", () => {
    expect(resolveLocale("et")).toBe("et");
  });
});
