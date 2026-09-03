import { describe, expect, it } from "vitest";
import { db } from "@/lib/db/client";
import { attempts, users } from "@/lib/db/schema";
import {
  getKokkuvote,
  getKursusteStatistika,
  getViimasedPaevad,
  jaotaMasteryTasemeteJargi,
} from "./statistics";

async function looKasutaja(): Promise<string> {
  const [row] = await db
    .insert(users)
    .values({ email: `${crypto.randomUUID()}@example.test` })
    .returning({ id: users.id });
  return row.id;
}

describe("getKokkuvote", () => {
  it("counts total, accuracy, and separates the last two 7-day windows", async () => {
    const userId = await looKasutaja();
    const now = Date.now();
    await db.insert(attempts).values([
      {
        userId,
        teemaId: "01-arvuhulgad",
        raskus: "kerge",
        oige: true,
        createdAt: new Date(now - 1 * 86_400_000),
      },
      {
        userId,
        teemaId: "01-arvuhulgad",
        raskus: "kerge",
        oige: false,
        createdAt: new Date(now - 10 * 86_400_000),
      },
    ]);

    const kokkuvote = await getKokkuvote(userId);
    expect(kokkuvote.kokku).toBe(2);
    expect(kokkuvote.oigeidKokku).toBe(1);
    expect(kokkuvote.viimane7Paeva).toBe(1);
    expect(kokkuvote.eelmine7Paeva).toBe(1);
  });
});

describe("getKursusteStatistika", () => {
  it("rolls attempts up per course, in curriculum order", async () => {
    const userId = await looKasutaja();
    await db.insert(attempts).values([
      { userId, teemaId: "02-vordus-samasus-vorrand", raskus: "kerge", oige: true },
      { userId, teemaId: "01-arvuhulgad", raskus: "kerge", oige: true },
      { userId, teemaId: "01-arvuhulgad", raskus: "kerge", oige: false },
    ]);

    const stats = await getKursusteStatistika(userId);
    expect(stats.map((s) => s.kursusId)).toEqual(["01", "02"]);
    expect(stats[0]).toMatchObject({ kursusId: "01", kokku: 2, oigeid: 1 });
    expect(stats[1]).toMatchObject({ kursusId: "02", kokku: 1, oigeid: 1 });
  });
});

describe("jaotaMasteryTasemeteJargi", () => {
  it("counts topics per mastery band", () => {
    const seisud = [
      { teemaId: "a", masteryScore: 90, masteryTase: "kindel" as const, manualReview: false, lastSeenAt: null },
      { teemaId: "b", masteryScore: 10, masteryTase: "algaja" as const, manualReview: false, lastSeenAt: null },
      { teemaId: "c", masteryScore: 95, masteryTase: "kindel" as const, manualReview: false, lastSeenAt: null },
    ];
    expect(jaotaMasteryTasemeteJargi(seisud)).toEqual({
      alustamata: 0,
      algaja: 1,
      edeneb: 0,
      hea: 0,
      kindel: 2,
    });
  });
});

describe("getViimasedPaevad", () => {
  it("returns exactly the requested number of days, zero-filled, oldest first", async () => {
    const userId = await looKasutaja();
    await db.insert(attempts).values({
      userId,
      teemaId: "01-arvuhulgad",
      raskus: "kerge",
      oige: true,
      createdAt: new Date(),
    });
    const days = await getViimasedPaevad(userId, 7);
    expect(days).toHaveLength(7);
    expect(days[6].kysimusi).toBeGreaterThanOrEqual(1);
    expect(new Date(days[0].date).getTime()).toBeLessThan(
      new Date(days[6].date).getTime(),
    );
  });
});
