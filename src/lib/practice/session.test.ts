import { fileURLToPath } from "node:url";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { alustaSeeria, kontrolliVastust } from "./session";
import { mulberry32 } from "@/generators/rng";

const FIXTURES_ROOT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "generators",
  "__fixtures__",
);

const TEEMA = "99-fixture-teema";

describe("alustaSeeria", () => {
  it("returns the requested number of questions", async () => {
    const seeria = await alustaSeeria(TEEMA, "kerge", 3, {
      root: FIXTURES_ROOT,
      rng: mulberry32(1),
    });
    expect(seeria.ulesanded).toHaveLength(3);
  });

  it("never includes the answer or the worked solution in the client payload", async () => {
    const seeria = await alustaSeeria(TEEMA, "kerge", 5, {
      root: FIXTURES_ROOT,
      rng: mulberry32(1),
    });
    for (const ulesanne of seeria.ulesanded) {
      expect(ulesanne).not.toHaveProperty("vastus");
      expect(ulesanne).not.toHaveProperty("lahendus");
    }
  });

  it("throws for a topic/difficulty with no registered generator", async () => {
    await expect(
      alustaSeeria(TEEMA, "kerge", 1, {
        root: path.join(FIXTURES_ROOT, "does-not-exist"),
      }),
    ).rejects.toThrow();
  });
});

describe("kontrolliVastust", () => {
  it("grades a correct answer and returns the full solution", async () => {
    const seeria = await alustaSeeria(TEEMA, "kerge", 1, {
      root: FIXTURES_ROOT,
      rng: mulberry32(1),
    });
    expect(seeria.ulesanded[0].kysimus).toBe("1 + 1 = ?");

    const tulemus = await kontrolliVastust(seeria.token, 0, "2", {
      root: FIXTURES_ROOT,
    });
    expect(tulemus.oige).toBe(true);
    expect(tulemus.vastus).toEqual({
      tuup: "arv",
      kuju: "taisarv",
      vaartus: 2,
    });
    expect(tulemus.lahendus).toEqual(["1 + 1 = 2"]);
  });

  it("grades an incorrect answer as wrong while still returning the solution", async () => {
    const seeria = await alustaSeeria(TEEMA, "kerge", 1, {
      root: FIXTURES_ROOT,
      rng: mulberry32(1),
    });
    const tulemus = await kontrolliVastust(seeria.token, 0, "3", {
      root: FIXTURES_ROOT,
    });
    expect(tulemus.oige).toBe(false);
    expect(tulemus.lahendus).toEqual(["1 + 1 = 2"]);
  });

  it("throws for an index outside the series", async () => {
    const seeria = await alustaSeeria(TEEMA, "kerge", 1, {
      root: FIXTURES_ROOT,
      rng: mulberry32(1),
    });
    await expect(
      kontrolliVastust(seeria.token, 1, "2", { root: FIXTURES_ROOT }),
    ).rejects.toThrow();
  });

  it("regenerates the same question the client saw, per index, across a multi-question series", async () => {
    const seeria = await alustaSeeria(TEEMA, "keskmine", 1, {
      root: FIXTURES_ROOT,
      rng: mulberry32(7),
    });
    expect(seeria.ulesanded[0].kysimus).toBe("2 + 2 = ?");

    const tulemus = await kontrolliVastust(seeria.token, 0, "4", {
      root: FIXTURES_ROOT,
    });
    expect(tulemus.oige).toBe(true);
  });
});
