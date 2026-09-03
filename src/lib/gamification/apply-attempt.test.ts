import { and, eq } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import { db } from "@/lib/db/client";
import { dailyStats, userStats, users } from "@/lib/db/schema";
import { rakendaKatseTulemus } from "./apply-attempt";

async function looKasutaja(): Promise<string> {
  const [row] = await db
    .insert(users)
    .values({ email: `${crypto.randomUUID()}@example.test` })
    .returning({ id: users.id });
  return row.id;
}

describe("rakendaKatseTulemus", () => {
  it("creates today's daily stats row on the first attempt", async () => {
    const userId = await looKasutaja();
    const now = new Date("2027-03-01T10:00:00Z");

    await rakendaKatseTulemus(
      userId,
      { teemaId: "01-arvuhulgad", raskus: "kerge", oige: true },
      now,
    );

    const [row] = await db
      .select()
      .from(dailyStats)
      .where(and(eq(dailyStats.userId, userId), eq(dailyStats.date, "2027-03-01")));
    expect(row).toMatchObject({ kysimusi: 1, oigeid: 1, xp: 10 });
  });

  it("accumulates across several attempts the same day and reduces xp for repeats", async () => {
    const userId = await looKasutaja();
    const now = new Date("2027-03-01T10:00:00Z");

    await rakendaKatseTulemus(
      userId,
      { teemaId: "01-arvuhulgad", raskus: "kerge", oige: true },
      now,
    );
    await rakendaKatseTulemus(
      userId,
      { teemaId: "01-arvuhulgad", raskus: "kerge", oige: true },
      now,
    );
    await rakendaKatseTulemus(
      userId,
      { teemaId: "01-arvuhulgad", raskus: "kerge", oige: false },
      now,
    );

    const [row] = await db
      .select()
      .from(dailyStats)
      .where(and(eq(dailyStats.userId, userId), eq(dailyStats.date, "2027-03-01")));
    expect(row.kysimusi).toBe(3);
    expect(row.oigeid).toBe(2);
    expect(row.xp).toBe(10 + 5); // first at full, second halved, third wrong
  });

  it("starts and extends a streak across consecutive days", async () => {
    const userId = await looKasutaja();
    await rakendaKatseTulemus(
      userId,
      { teemaId: "01-a", raskus: "kerge", oige: true },
      new Date("2027-03-01T10:00:00Z"),
    );
    await rakendaKatseTulemus(
      userId,
      { teemaId: "01-a", raskus: "kerge", oige: true },
      new Date("2027-03-02T10:00:00Z"),
    );

    const [row] = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, userId));
    expect(row.streakCurrent).toBe(2);
    expect(row.xp).toBe(20);
  });

  it("never records gamification state for a topic/user with no rows yet", async () => {
    const userId = await looKasutaja();
    const before = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, userId));
    expect(before).toHaveLength(0);
  });
});
