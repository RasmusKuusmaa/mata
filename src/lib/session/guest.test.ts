import { describe, expect, it } from "vitest";
import {
  generateGuestId,
  signGuestId,
  verifyGuestCookie,
} from "./guest";

describe("signGuestId / verifyGuestCookie", () => {
  it("round-trips a freshly generated id", async () => {
    const id = generateGuestId();
    expect(await verifyGuestCookie(await signGuestId(id))).toBe(id);
  });

  it("rejects a missing cookie", async () => {
    expect(await verifyGuestCookie(undefined)).toBeNull();
    expect(await verifyGuestCookie(null)).toBeNull();
    expect(await verifyGuestCookie("")).toBeNull();
  });

  it("rejects a cookie with no signature", async () => {
    expect(await verifyGuestCookie(generateGuestId())).toBeNull();
  });

  it("rejects a tampered id with a stale signature", async () => {
    const signed = await signGuestId(generateGuestId());
    const [, signature] = signed.split(".");
    const tampered = `${generateGuestId()}.${signature}`;
    expect(await verifyGuestCookie(tampered)).toBeNull();
  });

  it("rejects a tampered signature", async () => {
    const signed = await signGuestId(generateGuestId());
    const [id] = signed.split(".");
    expect(await verifyGuestCookie(`${id}.not-the-real-signature`)).toBeNull();
  });
});

describe("generateGuestId", () => {
  it("produces distinct ids", () => {
    expect(generateGuestId()).not.toBe(generateGuestId());
  });
});
