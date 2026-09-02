import { fileURLToPath } from "node:url";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildRegistry,
  discoverGenerators,
  forDifficulty,
  forTeema,
  indexGenerators,
} from "./registry";

const FIXTURES_ROOT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "__fixtures__",
);

describe("discoverGenerators", () => {
  it("finds generators exported directly and via an array export", async () => {
    const found = await discoverGenerators(FIXTURES_ROOT);
    const seeds = found.map((g) => g.genereeri(() => 0).seed).sort();
    expect(seeds).toEqual([1, 2, 3]);
  });

  it("skips .test.ts files", async () => {
    const found = await discoverGenerators(FIXTURES_ROOT);
    expect(found.some((g) => g.genereeri(() => 0).seed === 99)).toBe(false);
  });

  it("only walks kursus-NN directories", async () => {
    const found = await discoverGenerators(FIXTURES_ROOT);
    expect(found.some((g) => g.genereeri(() => 0).seed === 98)).toBe(false);
  });

  it("returns an empty array for a root that doesn't exist", async () => {
    const found = await discoverGenerators(
      path.join(FIXTURES_ROOT, "does-not-exist"),
    );
    expect(found).toEqual([]);
  });
});

describe("indexGenerators / forTeema / forDifficulty", () => {
  it("indexes discovered generators by topic and by topic+difficulty", async () => {
    const found = await discoverGenerators(FIXTURES_ROOT);
    const registry = indexGenerators(found);

    expect(forTeema(registry, "99-fixture-teema")).toHaveLength(3);
    expect(forTeema(registry, "no-such-teema")).toEqual([]);

    expect(forDifficulty(registry, "99-fixture-teema", "kerge")).toHaveLength(
      1,
    );
    expect(
      forDifficulty(registry, "99-fixture-teema", "keskmine"),
    ).toHaveLength(1);
    expect(forDifficulty(registry, "99-fixture-teema", "raske")).toHaveLength(
      1,
    );
  });
});

describe("buildRegistry", () => {
  it("discovers and indexes in one call", async () => {
    const registry = await buildRegistry(FIXTURES_ROOT);
    expect(registry.generators).toHaveLength(3);
    expect(forTeema(registry, "99-fixture-teema")).toHaveLength(3);
  });
});
