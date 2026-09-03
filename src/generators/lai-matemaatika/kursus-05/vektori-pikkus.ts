import { PYTHAGOREAN_TRIPLES } from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-vektori-pikkus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [x, y, len] = pick(rng, PYTHAGOREAN_TRIPLES);

      return {
        seed: 1,
        kysimus: `\\text{Leia vektori } \\vec{a}=(${x}, ${y}) \\text{ pikkus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: len },
        lahendus: [
          `|\\vec{a}| = \\sqrt{${x}^2+${y}^2} = \\sqrt{${x * x + y * y}} = ${len}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [dx, dy, len] = pick(rng, PYTHAGOREAN_TRIPLES);
      const sign1 = pick(rng, [1, -1] as const);
      const sign2 = pick(rng, [1, -1] as const);
      const x = sign1 * dx;
      const y = sign2 * dy;

      return {
        seed: 2,
        kysimus: `\\text{Leia vektori } \\vec{a}=(${x}, ${y}) \\text{ pikkus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: len },
        lahendus: [
          `|\\vec{a}| = \\sqrt{(${x})^2+(${y})^2} = \\sqrt{${x * x}+${y * y}} = ${len}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [x, y, len] = pick(rng, PYTHAGOREAN_TRIPLES);
      const [x2, y2, len2] = pick(rng, PYTHAGOREAN_TRIPLES);

      return {
        seed: 3,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${x}, ${y}) \\text{ ja } \\vec{b}=(${x2}, ${y2})\\text{. Leia } |\\vec{a}| + |\\vec{b}|\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: len + len2 },
        lahendus: [
          `|\\vec{a}| = ${len}\\text{, } |\\vec{b}| = ${len2}`,
          `|\\vec{a}|+|\\vec{b}| = ${len}+${len2} = ${len + len2}`,
        ],
      };
    },
  },
];
