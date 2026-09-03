import { eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import { generateGuestId } from "@/lib/session/guest";
import { db } from "./client";
import { recordAttempt } from "./guest-sessions";
import { mergeGuestIntoUser } from "./guest-merge";
import { attempts, users } from "./schema";

async function makeUser(): Promise<string> {
  const id = crypto.randomUUID();
  await db.insert(users).values({ id, email: `${id}@example.com` });
  return id;
}

describe("mergeGuestIntoUser", () => {
  it("attaches every guest attempt to the user", async () => {
    const guestId = generateGuestId();
    const userId = await makeUser();
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

    await mergeGuestIntoUser(guestId, userId);

    const rows = await db
      .select()
      .from(attempts)
      .where(eq(attempts.userId, userId));
    expect(rows).toHaveLength(2);
    expect(rows.every((r) => r.guestSessionId === guestId)).toBe(true);
  });

  it("is idempotent — merging twice does not duplicate or fail", async () => {
    const guestId = generateGuestId();
    const userId = await makeUser();
    await recordAttempt({
      guestId,
      teemaId: "01-arvuhulgad",
      raskus: "kerge",
      oige: true,
    });

    await mergeGuestIntoUser(guestId, userId);
    await mergeGuestIntoUser(guestId, userId);

    const rows = await db
      .select()
      .from(attempts)
      .where(eq(attempts.userId, userId));
    expect(rows).toHaveLength(1);
  });

  it("leaves rows alone for a guest id with no attempts", async () => {
    const userId = await makeUser();
    await expect(
      mergeGuestIntoUser(generateGuestId(), userId),
    ).resolves.not.toThrow();
  });
});
