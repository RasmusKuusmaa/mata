import { describe, expect, it } from "vitest";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import {
  eemaldaSober,
  getOotelKutsed,
  getSobrad,
  kinnitaSobrakutse,
  saadaSobrakutse,
} from "./friends";

async function looKasutaja(): Promise<string> {
  const [row] = await db
    .insert(users)
    .values({ email: `${crypto.randomUUID()}@example.test` })
    .returning({ id: users.id });
  return row.id;
}

describe("friend requests", () => {
  it("shows up as a pending request for the recipient, not yet as a friend", async () => {
    const a = await looKasutaja();
    const b = await looKasutaja();

    await saadaSobrakutse(a, b);

    const pending = await getOotelKutsed(b);
    expect(pending.map((s) => s.id)).toContain(a);
    expect(await getSobrad(a)).toHaveLength(0);
    expect(await getSobrad(b)).toHaveLength(0);
  });

  it("becomes a mutual friendship, visible from both sides, once accepted", async () => {
    const a = await looKasutaja();
    const b = await looKasutaja();

    await saadaSobrakutse(a, b);
    await kinnitaSobrakutse(b, a);

    expect((await getSobrad(a)).map((s) => s.id)).toContain(b);
    expect((await getSobrad(b)).map((s) => s.id)).toContain(a);
    expect(await getOotelKutsed(b)).toHaveLength(0);
  });

  it("is idempotent for a duplicate or reciprocal request", async () => {
    const a = await looKasutaja();
    const b = await looKasutaja();

    await saadaSobrakutse(a, b);
    await saadaSobrakutse(a, b);
    await saadaSobrakutse(b, a);

    const pending = await getOotelKutsed(b);
    expect(pending).toHaveLength(1);
  });

  it("rejects a self-request", async () => {
    const a = await looKasutaja();
    await expect(saadaSobrakutse(a, a)).rejects.toThrow();
  });

  it("throws when accepting a request that was never sent", async () => {
    const a = await looKasutaja();
    const b = await looKasutaja();
    await expect(kinnitaSobrakutse(b, a)).rejects.toThrow();
  });

  it("removes the friendship from both sides", async () => {
    const a = await looKasutaja();
    const b = await looKasutaja();

    await saadaSobrakutse(a, b);
    await kinnitaSobrakutse(b, a);
    await eemaldaSober(a, b);

    expect(await getSobrad(a)).toHaveLength(0);
    expect(await getSobrad(b)).toHaveLength(0);
  });
});
