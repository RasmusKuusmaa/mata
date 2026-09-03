import { fileURLToPath } from "node:url";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { alustaEksam, EKSAMI_MAKSIMUMPUNKTID } from "./session";
import { mulberry32 } from "@/generators/rng";
import type { Teema } from "@/content/types";

const FIXTURES_ROOT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "generators",
  "__fixtures__",
);

const FIXTURE_TEEMAD: Teema[] = [
  {
    id: "99-fixture-teema",
    aine: "lai-matemaatika",
    kursusId: "99",
    nimi: "Fixture teema",
    kirjeldus: "",
    opitulemused: [],
    eeldused: [],
    allikas: ["rok2023"],
    eksamiKate: { 2027: true },
  },
];

describe("alustaEksam", () => {
  it("builds a twelve-question exam split into two parts", async () => {
    const eksam = await alustaEksam({
      root: FIXTURES_ROOT,
      teemad: FIXTURE_TEEMAD,
      rng: mulberry32(1),
    });
    expect(eksam.osaI).toHaveLength(7);
    expect(eksam.osaII).toHaveLength(5);
  });

  it("totals 100 points across every slot", () => {
    expect(EKSAMI_MAKSIMUMPUNKTID).toBe(100);
  });

  it("excludes topics not covered by the 2027 exam", async () => {
    await expect(
      alustaEksam({
        root: FIXTURES_ROOT,
        teemad: [{ ...FIXTURE_TEEMAD[0], eksamiKate: { 2027: false } }],
        rng: mulberry32(1),
      }),
    ).rejects.toThrow();
  });

  it("each question grades independently via its own token", async () => {
    const eksam = await alustaEksam({
      root: FIXTURES_ROOT,
      teemad: FIXTURE_TEEMAD,
      rng: mulberry32(1),
    });
    const tokens = new Set(
      [...eksam.osaI, ...eksam.osaII].map((k) => k.token),
    );
    expect(tokens.size).toBe(12);
  });
});
