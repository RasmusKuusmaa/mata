import { and, eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import { db } from "./client";
import { attempts, users } from "./schema";
import { getTopicState, paivitaMasterySeis, setManualReview } from "./topic-state";

async function looKasutaja(): Promise<string> {
  const [row] = await db
    .insert(users)
    .values({ email: `${crypto.randomUUID()}@example.test` })
    .returning({ id: users.id });
  return row.id;
}

describe("paivitaMasterySeis", () => {
  it("creates a topic_state row reflecting real attempt history, not the column defaults", async () => {
    const userId = await looKasutaja();
    const teemaId = "01-arvuhulgad";
    const now = new Date("2027-03-01T10:00:00Z");

    await db.insert(attempts).values([
      { userId, teemaId, raskus: "kerge", oige: true, createdAt: now },
      { userId, teemaId, raskus: "kerge", oige: true, createdAt: now },
      { userId, teemaId, raskus: "kerge", oige: true, createdAt: now },
    ]);

    await paivitaMasterySeis(userId, teemaId, now);

    const seis = await getTopicState(userId, teemaId);
    expect(seis).not.toBeNull();
    expect(seis!.masteryTase).not.toBe("alustamata");
    expect(seis!.masteryScore).toBeGreaterThan(0);
    expect(seis!.lastSeenAt).toEqual(now);
  });

  it("is idempotent and updates on repeated calls without clobbering the manual review flag", async () => {
    const userId = await looKasutaja();
    const teemaId = "01-arvuhulgad";
    const now = new Date("2027-03-01T10:00:00Z");

    await setManualReview(userId, teemaId, true);
    await db
      .insert(attempts)
      .values({ userId, teemaId, raskus: "kerge", oige: true, createdAt: now });
    await paivitaMasterySeis(userId, teemaId, now);
    await paivitaMasterySeis(userId, teemaId, now);

    const seis = await getTopicState(userId, teemaId);
    expect(seis!.manualReview).toBe(true);

    const rows = await db
      .select()
      .from(attempts)
      .where(and(eq(attempts.userId, userId), eq(attempts.teemaId, teemaId)));
    expect(rows).toHaveLength(1);
  });

  it("reports alustamata with no attempts recorded", async () => {
    const userId = await looKasutaja();
    await paivitaMasterySeis(userId, "01-arvuhulgad", new Date("2027-03-01T10:00:00Z"));
    const seis = await getTopicState(userId, "01-arvuhulgad");
    expect(seis!.masteryTase).toBe("alustamata");
    expect(seis!.masteryScore).toBe(0);
  });
});
