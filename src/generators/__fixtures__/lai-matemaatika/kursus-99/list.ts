import type { Generaator } from "@/generators/types";

/** Fixture generators for registry.test.ts — not real content. */
export const teemaGeneraatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: "99-fixture-teema",
    raskus: "keskmine",
    genereeri: (_rng) => ({
      seed: 2,
      kysimus: "2 + 2 = ?",
      vastus: { tuup: "arv", kuju: "taisarv", vaartus: 4 },
      lahendus: ["2 + 2 = 4"],
    }),
  },
  {
    aine: "lai-matemaatika",
    teemaId: "99-fixture-teema",
    raskus: "raske",
    genereeri: (_rng) => ({
      seed: 3,
      kysimus: "3 + 3 = ?",
      vastus: { tuup: "arv", kuju: "taisarv", vaartus: 6 },
      lahendus: ["3 + 3 = 6"],
    }),
  },
];
