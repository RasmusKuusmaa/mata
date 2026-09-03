import { fileURLToPath } from "node:url";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  alustaKohandatudSeeria,
  alustaSeeria,
  kontrolliVastust,
  toKlientUlesanne,
} from "./session";
import { mulberry32 } from "@/generators/rng";
import type { Ulesanne } from "@/generators/types";

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

  it("tells the client the answer's shape via vastuseTuup", async () => {
    const seeria = await alustaSeeria(TEEMA, "kerge", 1, {
      root: FIXTURES_ROOT,
      rng: mulberry32(1),
    });
    expect(seeria.ulesanded[0].vastuseTuup).toEqual({ tuup: "arv" });
  });

  it("throws for a topic/difficulty with no registered generator", async () => {
    await expect(
      alustaSeeria(TEEMA, "kerge", 1, {
        root: path.join(FIXTURES_ROOT, "does-not-exist"),
      }),
    ).rejects.toThrow();
  });
});

describe("alustaKohandatudSeeria", () => {
  it("draws from every requested topic/difficulty combination", async () => {
    const seeria = await alustaKohandatudSeeria(
      [
        { teemaId: TEEMA, raskus: "kerge" },
        { teemaId: TEEMA, raskus: "keskmine" },
      ],
      20,
      { root: FIXTURES_ROOT, rng: mulberry32(1) },
    );
    const kysimused = new Set(seeria.ulesanded.map((u) => u.kysimus));
    expect(kysimused.has("1 + 1 = ?")).toBe(true);
    expect(kysimused.has("2 + 2 = ?")).toBe(true);
  });

  it("drops combinations with no registered generator instead of failing the whole series", async () => {
    const seeria = await alustaKohandatudSeeria(
      [
        { teemaId: TEEMA, raskus: "kerge" },
        { teemaId: "does-not-exist", raskus: "kerge" },
      ],
      3,
      { root: FIXTURES_ROOT, rng: mulberry32(1) },
    );
    expect(seeria.ulesanded).toHaveLength(3);
  });

  it("throws when none of the requested combinations have a generator", async () => {
    await expect(
      alustaKohandatudSeeria([{ teemaId: "does-not-exist", raskus: "kerge" }], 1, {
        root: FIXTURES_ROOT,
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

describe("toKlientUlesanne", () => {
  function valikUlesanne(): Ulesanne {
    return {
      seed: 1,
      kysimus: "2 + 2 = ?",
      vastus: { tuup: "valik", oige: "4", eksitajad: ["3", "5", "6"] },
      lahendus: ["2 + 2 = 4"],
    };
  }

  it("carries every option for a valik answer without marking which is correct", () => {
    const klient = toKlientUlesanne(valikUlesanne(), mulberry32(1));
    expect(klient.vastuseTuup.tuup).toBe("valik");
    if (klient.vastuseTuup.tuup !== "valik") throw new Error("unreachable");
    expect(klient.vastuseTuup.valikud.sort()).toEqual(["3", "4", "5", "6"]);
  });

  it("never leaks vastus or lahendus regardless of answer type", () => {
    const klient = toKlientUlesanne(valikUlesanne(), mulberry32(1));
    expect(klient).not.toHaveProperty("vastus");
    expect(klient).not.toHaveProperty("lahendus");
  });
});
