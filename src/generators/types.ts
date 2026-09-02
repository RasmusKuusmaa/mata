import type { Aine, Raskus, TeemaId } from "@/content/types";
import type { ExactForm } from "@/lib/format/number";

/**
 * A "nice" rational value: a plain number for a terminating decimal, or an
 * exact fraction when that's how the answer stays nice (denominator ≤ 12).
 * Shared by `arv` and `hulk` below so a set of solutions can mix both.
 */
export type ArvVaartus =
  | { kuju: "taisarv"; vaartus: number }
  | { kuju: "murd"; lugeja: number; nimetaja: number };

/**
 * A generated question's answer, one of four shapes. New answer types
 * (free expression, graph-click, ordering, ...) slot in as new union
 * members without touching existing generators or the other branches of
 * the answer checker (Ship 0.25).
 */
export type Vastus =
  | ({ tuup: "arv" } & ArvVaartus)
  | { tuup: "tapne"; vorm: ExactForm }
  | { tuup: "valik"; oige: string; eksitajad: string[] }
  | { tuup: "hulk"; vaartused: ArvVaartus[] };

/** A single generated question, already carrying its own worked solution. */
export type Ulesanne = {
  seed: number;
  kysimus: string;
  vastus: Vastus;
  lahendus: string[];
  vihje?: string;
};

/**
 * Deterministic uniform random source in `[0, 1)`. Ship 0.21 supplies
 * `mulberry32(seed): Rng` plus helpers (`int`, `pick`, `pickWeighted`,
 * `shuffle`, `nonZeroInt`, `sign`) that all take an `Rng` as their first
 * argument — the same seed must always produce the same `Ulesanne`.
 */
export type Rng = () => number;

/** Registered under `src/generators/<aine>/kursus-NN/` (Ship 0.23). */
export type Generaator = {
  aine: Aine;
  teemaId: TeemaId;
  raskus: Raskus;
  genereeri: (rng: Rng) => Ulesanne;
};
