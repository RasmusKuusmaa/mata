import { describe, expect, it } from "vitest";
import { db } from "@/lib/db/client";
import { attempts, users } from "@/lib/db/schema";
import { getKuuAndmed, getPaevaTeemad, salvestaPeegeldus } from "./calendar";

async function looKasutaja(): Promise<string> {
  const [row] = await db
    .insert(users)
    .values({ email: `${crypto.randomUUID()}@example.test` })
    .returning({ id: users.id });
  return row.id;
}

describe("getKuuAndmed", () => {
  it("returns only days within the requested month, keyed by date", async () => {
    const userId = await looKasutaja();
    await salvestaPeegeldus(userId, "2027-03-05", "Hea päev");
    await salvestaPeegeldus(userId, "2027-04-01", "Teine kuu");

    const march = await getKuuAndmed(userId, 2027, 3);
    expect(march.has("2027-03-05")).toBe(true);
    expect(march.has("2027-04-01")).toBe(false);
    expect(march.get("2027-03-05")?.peegeldus).toBe("Hea päev");
  });
});

describe("salvestaPeegeldus", () => {
  it("creates the day's row with zeroed counters if none existed", async () => {
    const userId = await looKasutaja();
    await salvestaPeegeldus(userId, "2027-03-05", "Esimene märge");
    const march = await getKuuAndmed(userId, 2027, 3);
    expect(march.get("2027-03-05")).toMatchObject({
      kysimusi: 0,
      peegeldus: "Esimene märge",
    });
  });

  it("overwrites without touching other days", async () => {
    const userId = await looKasutaja();
    await salvestaPeegeldus(userId, "2027-03-05", "Esimene");
    await salvestaPeegeldus(userId, "2027-03-05", "Teine");
    const march = await getKuuAndmed(userId, 2027, 3);
    expect(march.get("2027-03-05")?.peegeldus).toBe("Teine");
  });
});

describe("getPaevaTeemad", () => {
  it("groups a day's attempts by topic with per-topic accuracy", async () => {
    const userId = await looKasutaja();
    const day = new Date("2027-03-05T10:00:00Z");
    await db.insert(attempts).values([
      { userId, teemaId: "01-a", raskus: "kerge", oige: true, createdAt: day },
      { userId, teemaId: "01-a", raskus: "kerge", oige: false, createdAt: day },
      { userId, teemaId: "02-b", raskus: "raske", oige: true, createdAt: day },
    ]);

    const teemad = await getPaevaTeemad(userId, "2027-03-05");
    const byId = new Map(teemad.map((t) => [t.teemaId, t]));
    expect(byId.get("01-a")).toEqual({ teemaId: "01-a", kokku: 2, oigeid: 1 });
    expect(byId.get("02-b")).toEqual({ teemaId: "02-b", kokku: 1, oigeid: 1 });
  });

  it("excludes attempts from other days", async () => {
    const userId = await looKasutaja();
    await db.insert(attempts).values({
      userId,
      teemaId: "01-a",
      raskus: "kerge",
      oige: true,
      createdAt: new Date("2027-03-06T10:00:00Z"),
    });
    expect(await getPaevaTeemad(userId, "2027-03-05")).toEqual([]);
  });
});
