import { eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import { generateGuestId } from "@/lib/session/guest";
import { db } from "./client";
import { ensureGuestSession, recordAttempt } from "./guest-sessions";
import { attempts, guestSessions } from "./schema";

describe("ensureGuestSession", () => {
  it("creates a guest session row", async () => {
    const guestId = generateGuestId();
    await ensureGuestSession(guestId);

    const rows = await db
      .select()
      .from(guestSessions)
      .where(eq(guestSessions.id, guestId));
    expect(rows).toHaveLength(1);
  });

  it("is idempotent for the same guest id", async () => {
    const guestId = generateGuestId();
    await ensureGuestSession(guestId);
    await ensureGuestSession(guestId);

    const rows = await db
      .select()
      .from(guestSessions)
      .where(eq(guestSessions.id, guestId));
    expect(rows).toHaveLength(1);
  });
});

describe("recordAttempt", () => {
  it("creates the guest session and the attempt row together", async () => {
    const guestId = generateGuestId();
    await recordAttempt({
      guestId,
      teemaId: "01-arvuhulgad",
      raskus: "kerge",
      oige: true,
    });

    const sessionRows = await db
      .select()
      .from(guestSessions)
      .where(eq(guestSessions.id, guestId));
    expect(sessionRows).toHaveLength(1);

    const attemptRows = await db
      .select()
      .from(attempts)
      .where(eq(attempts.guestSessionId, guestId));
    expect(attemptRows).toHaveLength(1);
    expect(attemptRows[0]).toMatchObject({
      teemaId: "01-arvuhulgad",
      raskus: "kerge",
      oige: true,
    });
  });

  it("appends a new row per attempt for a returning guest", async () => {
    const guestId = generateGuestId();
    await recordAttempt({
      guestId,
      teemaId: "01-arvuhulgad",
      raskus: "kerge",
      oige: true,
    });
    await recordAttempt({
      guestId,
      teemaId: "01-arvuhulgad",
      raskus: "raske",
      oige: false,
    });

    const attemptRows = await db
      .select()
      .from(attempts)
      .where(eq(attempts.guestSessionId, guestId));
    expect(attemptRows).toHaveLength(2);
  });
});
