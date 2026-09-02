import type { Generaator } from "@/generators/types";

/** Fixture generator for registry.test.ts — not real content. */
export const kergeGeneraator: Generaator = {
  aine: "lai-matemaatika",
  teemaId: "99-fixture-teema",
  raskus: "kerge",
  genereeri: (_rng) => ({
    seed: 1,
    kysimus: "1 + 1 = ?",
    vastus: { tuup: "arv", kuju: "taisarv", vaartus: 2 },
    lahendus: ["1 + 1 = 2"],
  }),
};
