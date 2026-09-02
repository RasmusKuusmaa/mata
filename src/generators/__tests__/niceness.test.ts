import { describe, expect, it } from "vitest";
import { checkUlesanne } from "../niceness";
import { buildRegistry } from "../registry";
import { mulberry32 } from "../rng";
import type { Generaator } from "../types";

const ITERATIONS = 500;
const DETERMINISM_SEED = 12345;

const registry = await buildRegistry();

console.log(
  `niceness harness: ${registry.generators.length} generator(s) registered under src/generators/<aine>/kursus-NN/`,
);

describe("curriculum generator niceness gate", () => {
  it("has a registry to check against (empty until Ship 1.8+ content lands)", () => {
    expect(Array.isArray(registry.generators)).toBe(true);
  });
});

function describeGenerator(generator: Generaator, index: number) {
  describe(
    `generator #${index} — ${generator.aine}/${generator.teemaId}/${generator.raskus}`,
    () => {
      it(`produces a nice Ulesanne across ${ITERATIONS} seeds`, () => {
        for (let seed = 0; seed < ITERATIONS; seed++) {
          const ulesanne = generator.genereeri(mulberry32(seed));
          const problems = checkUlesanne(ulesanne);
          expect(problems, `seed ${seed}: ${problems.join("; ")}`).toEqual(
            [],
          );
        }
      });

      it("is deterministic for a given seed", () => {
        const a = generator.genereeri(mulberry32(DETERMINISM_SEED));
        const b = generator.genereeri(mulberry32(DETERMINISM_SEED));
        expect(a).toEqual(b);
      });
    },
  );
}

registry.generators.forEach(describeGenerator);
