import type { Generaator } from "@/generators/types";

/**
 * Fixture proving discoverGenerators skips `.test.ts` files. If this ever
 * gets picked up, registry.test.ts's exclusion assertion fails.
 */
export const shouldBeIgnored: Generaator = {
  aine: "lai-matemaatika",
  teemaId: "99-fixture-teema",
  raskus: "kerge",
  genereeri: (_rng) => ({
    seed: 99,
    kysimus: "should never be discovered",
    vastus: { tuup: "arv", kuju: "taisarv", vaartus: 0 },
    lahendus: ["n/a"],
  }),
};
