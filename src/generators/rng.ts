import type { Rng } from "./types";

/**
 * mulberry32: a small, fast, seedable PRNG. Deterministic — the same seed
 * always produces the same sequence, which is what lets a question be
 * regenerated from its seed server-side (Ship 1.5) instead of stored.
 */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Random integer in `[min, max]`, inclusive. */
export function int(rng: Rng, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

/** Random integer in `[min, max]`, inclusive, never 0. Redraws on a 0. */
export function nonZeroInt(rng: Rng, min: number, max: number): number {
  if (min > 0 || max < 0) return int(rng, min, max);
  let value = int(rng, min, max);
  while (value === 0) value = int(rng, min, max);
  return value;
}

/** `1` or `-1`, each with probability 1/2. */
export function sign(rng: Rng): 1 | -1 {
  return rng() < 0.5 ? -1 : 1;
}

/** A uniformly random element of `items`. */
export function pick<T>(rng: Rng, items: readonly T[]): T {
  if (items.length === 0) throw new Error("pick: items is empty");
  return items[int(rng, 0, items.length - 1)];
}

/** A random element of `items`, chosen with probability proportional to its weight. */
export function pickWeighted<T>(
  rng: Rng,
  items: readonly { value: T; weight: number }[],
): T {
  if (items.length === 0) throw new Error("pickWeighted: items is empty");
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  if (total <= 0) {
    throw new Error("pickWeighted: total weight must be positive");
  }
  let target = rng() * total;
  for (const item of items) {
    target -= item.weight;
    if (target < 0) return item.value;
  }
  return items[items.length - 1].value;
}

/** A shuffled copy of `items` (Fisher-Yates). Leaves `items` untouched. */
export function shuffle<T>(rng: Rng, items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = int(rng, 0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
