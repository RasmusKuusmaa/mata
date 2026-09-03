import { int, shuffle } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-dispersioon-ja-standardhalve";

/** `mean + d·{-2,-1,0,1,2}` — five values with variance exactly `2d²`. */
function buildDataset(mean: number, d: number): number[] {
  return [-2, -1, 0, 1, 2].map((k) => mean + k * d);
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const mean = int(rng, 5, 20);
      const d = 1;
      const values = shuffle(rng, buildDataset(mean, d));
      const variance = 2 * d * d;

      return {
        seed: 1,
        kysimus: `\\text{Andmestik: } ${values.join(", ")} \\text{ (keskväärtus } ${mean}\\text{). Leia dispersioon.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: variance },
        lahendus: [
          `D(X) = \\dfrac{\\sum(x_i-\\bar x)^2}{n} = \\dfrac{4+1+0+1+4}{5} = \\dfrac{10}{5} = ${variance}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const mean = int(rng, 10, 30);
      const d = 2;
      const values = shuffle(rng, buildDataset(mean, d));
      const variance = 2 * d * d;

      return {
        seed: 2,
        kysimus: `\\text{Andmestik: } ${values.join(", ")} \\text{ (keskväärtus } ${mean}\\text{). Leia dispersioon.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: variance },
        lahendus: [
          `D(X) = \\dfrac{\\sum(x_i-\\bar x)^2}{n} = \\dfrac{16+4+0+4+16}{5} = \\dfrac{40}{5} = ${variance}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const mean = int(rng, 10, 30);
      const d = int(rng, 1, 5);
      const values = shuffle(rng, buildDataset(mean, d));
      const variance = 2 * d * d;

      return {
        seed: 3,
        kysimus: `\\text{Andmestik: } ${values.join(", ")} \\text{ (keskväärtus } ${mean}\\text{). Leia standardhälve (kordajana arvust } \\sqrt2\\text{).}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: 2, numerator: d } },
        lahendus: [
          `D(X) = ${variance}`,
          `\\sigma = \\sqrt{${variance}} = \\sqrt{${2 * d * d}} = ${d}\\sqrt2`,
        ],
      };
    },
  },
];
