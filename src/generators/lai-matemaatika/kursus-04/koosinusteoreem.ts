import { arvVaartus } from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-koosinusteoreem";

/** Triples `(a, b, c)` where `c` is opposite a `60°` angle: `c² = a²+b²-ab`. */
const TRIPLES_60: readonly [number, number, number][] = [
  [3, 8, 7],
  [5, 8, 7],
  [7, 15, 13],
  [5, 21, 19],
  [16, 21, 19],
  [7, 40, 37],
];

/** Triples `(a, b, c)` where `c` is opposite a `120°` angle: `c² = a²+b²+ab`. */
const TRIPLES_120: readonly [number, number, number][] = [
  [3, 5, 7],
  [7, 8, 13],
  [5, 16, 19],
  [7, 33, 37],
];

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [a, b, c] = pick(rng, TRIPLES_60);

      return {
        seed: 1,
        kysimus: `\\text{Kolmnurga küljed on } a = ${a} \\text{ ja } b = ${b}\\text{, nendevaheline nurk } C = 60^\\circ\\text{. Leia külg } c \\text{ koosinusteoreemi abil.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: c },
        lahendus: [
          `c^2 = a^2 + b^2 - 2ab\\cos C = ${a}^2 + ${b}^2 - 2 \\cdot ${a} \\cdot ${b} \\cdot \\dfrac{1}{2}`,
          `c^2 = ${a * a} + ${b * b} - ${a * b} = ${c * c} \\quad \\Rightarrow \\quad c = ${c}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [a, b, c] = pick(rng, TRIPLES_120);

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurga küljed on } a = ${a} \\text{ ja } b = ${b}\\text{, nendevaheline nurk } C = 120^\\circ\\text{. Leia külg } c \\text{ koosinusteoreemi abil.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: c },
        lahendus: [
          `c^2 = a^2 + b^2 - 2ab\\cos C = ${a}^2 + ${b}^2 - 2 \\cdot ${a} \\cdot ${b} \\cdot \\left(-\\dfrac{1}{2}\\right)`,
          `c^2 = ${a * a} + ${b * b} + ${a * b} = ${c * c} \\quad \\Rightarrow \\quad c = ${c}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const family = pick(rng, ["60", "120"] as const);
      const [a, b, c] = pick(rng, family === "60" ? TRIPLES_60 : TRIPLES_120);
      const cosCNumerator = family === "60" ? 1 : -1;

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurga küljed on } a = ${a}\\text{, } b = ${b} \\text{ ja } c = ${c}\\text{. Leia küljele } c \\text{ vastasnurga } C \\text{ koosinus koosinusteoreemi abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(cosCNumerator, 2) },
        lahendus: [
          `\\cos C = \\dfrac{a^2+b^2-c^2}{2ab} = \\dfrac{${a * a} + ${b * b} - ${c * c}}{2 \\cdot ${a} \\cdot ${b}}`,
          `\\cos C = \\dfrac{${a * a + b * b - c * c}}{${2 * a * b}} = \\dfrac{${cosCNumerator}}{2}`,
        ],
      };
    },
  },
];
