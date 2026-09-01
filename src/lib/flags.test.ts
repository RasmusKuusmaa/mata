import { afterEach, describe, expect, it } from "vitest";
import { getFlag } from "./flags";

const ENV_KEY = "NEXT_PUBLIC_FLAG_KALENDER";

describe("getFlag", () => {
  afterEach(() => {
    delete process.env[ENV_KEY];
  });

  it("defaults to false when unset", () => {
    expect(getFlag("kalender")).toBe(false);
  });

  it("reads true from the env var", () => {
    process.env[ENV_KEY] = "true";
    expect(getFlag("kalender")).toBe(true);
  });

  it("reads 1 as true", () => {
    process.env[ENV_KEY] = "1";
    expect(getFlag("kalender")).toBe(true);
  });

  it("treats any other value as false", () => {
    process.env[ENV_KEY] = "nope";
    expect(getFlag("kalender")).toBe(false);
  });
});
