import { describe, expect, it } from "vitest";
import { db } from "@/lib/db/client";
import { dailyStats, users } from "@/lib/db/schema";
import { getEesmark, getTananeKysimusteArv, seadistaEesmark } from "./goal";

async function looKasutaja(): Promise<string> {
  const [row] = await db
    .insert(users)
    .values({ email: `${crypto.randomUUID()}@example.test` })
    .returning({ id: users.id });
  return row.id;
}

describe("getEesmark", () => {
  it("defaults to 15 questions/day with no row", async () => {
    const userId = await looKasutaja();
    expect(await getEesmark(userId)).toEqual({ tuup: "kysimusi", siht: 15 });
  });

  it("returns the user's configured goal after setting it", async () => {
    const userId = await looKasutaja();
    await seadistaEesmark(userId, { tuup: "kysimusi", siht: 30 });
    expect(await getEesmark(userId)).toEqual({ tuup: "kysimusi", siht: 30 });
  });
});

describe("getTananeKysimusteArv", () => {
  it("reads today's question count from daily_stats", async () => {
    const userId = await looKasutaja();
    await db.insert(dailyStats).values({ userId, date: "2027-03-01", kysimusi: 7 });
    expect(await getTananeKysimusteArv(userId, "2027-03-01")).toBe(7);
  });

  it("is zero with no row for that day", async () => {
    const userId = await looKasutaja();
    expect(await getTananeKysimusteArv(userId, "2027-03-01")).toBe(0);
  });
});
