import { describe, expect, it } from "vitest";
import {
  int,
  mulberry32,
  nonZeroInt,
  pick,
  pickWeighted,
  shuffle,
  sign,
} from "./rng";

describe("mulberry32", () => {
  it("produces the same sequence for the same seed", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    const seqA = Array.from({ length: 20 }, () => a());
    const seqB = Array.from({ length: 20 }, () => b());
    expect(seqA).toEqual(seqB);
  });

  it("produces different sequences for different seeds", () => {
    const a = mulberry32(1);
    const b = mulberry32(2);
    const seqA = Array.from({ length: 10 }, () => a());
    const seqB = Array.from({ length: 10 }, () => b());
    expect(seqA).not.toEqual(seqB);
  });

  it("always returns a value in [0, 1)", () => {
    const rng = mulberry32(7);
    for (let i = 0; i < 1000; i++) {
      const value = rng();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("int", () => {
  it("stays within [min, max] inclusive", () => {
    const rng = mulberry32(11);
    for (let i = 0; i < 500; i++) {
      const value = int(rng, -5, 5);
      expect(value).toBeGreaterThanOrEqual(-5);
      expect(value).toBeLessThanOrEqual(5);
      expect(Number.isInteger(value)).toBe(true);
    }
  });

  it("is deterministic for a given seed", () => {
    expect(int(mulberry32(99), 1, 100)).toBe(int(mulberry32(99), 1, 100));
  });

  it("returns the only value when min equals max", () => {
    const rng = mulberry32(3);
    expect(int(rng, 4, 4)).toBe(4);
  });
});

describe("nonZeroInt", () => {
  it("never returns 0 across a range spanning zero", () => {
    const rng = mulberry32(23);
    for (let i = 0; i < 500; i++) {
      expect(nonZeroInt(rng, -3, 3)).not.toBe(0);
    }
  });

  it("stays within [min, max]", () => {
    const rng = mulberry32(24);
    for (let i = 0; i < 500; i++) {
      const value = nonZeroInt(rng, -4, 6);
      expect(value).toBeGreaterThanOrEqual(-4);
      expect(value).toBeLessThanOrEqual(6);
    }
  });

  it("draws normally when the range excludes zero", () => {
    const rng = mulberry32(25);
    for (let i = 0; i < 100; i++) {
      const value = nonZeroInt(rng, 2, 8);
      expect(value).toBeGreaterThanOrEqual(2);
      expect(value).toBeLessThanOrEqual(8);
    }
  });
});

describe("sign", () => {
  it("only ever returns 1 or -1", () => {
    const rng = mulberry32(5);
    const values = new Set<number>();
    for (let i = 0; i < 200; i++) values.add(sign(rng));
    expect([...values].sort()).toEqual([-1, 1]);
  });
});

describe("pick", () => {
  it("returns an element from the list", () => {
    const rng = mulberry32(6);
    const items = ["a", "b", "c", "d"];
    for (let i = 0; i < 100; i++) {
      expect(items).toContain(pick(rng, items));
    }
  });

  it("throws on an empty list", () => {
    expect(() => pick(mulberry32(1), [])).toThrow();
  });

  it("is deterministic for a given seed", () => {
    const items = [1, 2, 3, 4, 5];
    expect(pick(mulberry32(77), items)).toBe(pick(mulberry32(77), items));
  });
});

describe("pickWeighted", () => {
  it("only ever picks a heavily-weighted item over many draws", () => {
    const rng = mulberry32(8);
    const items = [
      { value: "common", weight: 1000 },
      { value: "rare", weight: 0.001 },
    ];
    const counts = { common: 0, rare: 0 };
    for (let i = 0; i < 200; i++) counts[pickWeighted(rng, items)]++;
    expect(counts.common).toBeGreaterThan(counts.rare);
  });

  it("throws on an empty list", () => {
    expect(() => pickWeighted(mulberry32(1), [])).toThrow();
  });

  it("throws when total weight is not positive", () => {
    expect(() =>
      pickWeighted(mulberry32(1), [{ value: "x", weight: 0 }]),
    ).toThrow();
  });
});

describe("shuffle", () => {
  it("returns a permutation of the input", () => {
    const rng = mulberry32(9);
    const items = [1, 2, 3, 4, 5, 6];
    const result = shuffle(rng, items);
    expect([...result].sort()).toEqual([...items].sort());
  });

  it("does not mutate the input", () => {
    const rng = mulberry32(10);
    const items = [1, 2, 3];
    const original = [...items];
    shuffle(rng, items);
    expect(items).toEqual(original);
  });

  it("is deterministic for a given seed", () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];
    expect(shuffle(mulberry32(55), items)).toEqual(
      shuffle(mulberry32(55), items),
    );
  });
});
