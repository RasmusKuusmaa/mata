import {
  SPECIAL_ANGLES,
  arvVaartus,
  exactValueToLatex,
  exactValueToVastus,
  niceTrigTriangle,
} from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-kahe-nurga-summa-ja-vahe";

/** `(α, β)` pairs of named angles whose sum also lands on a named angle. */
const SUM_PAIRS: readonly [number, number][] = [
  [30, 60],
  [60, 30],
  [45, 45],
  [30, 30],
];

/** `(α, β)` pairs of named angles whose difference also lands on a named angle. */
const DIFFERENCE_PAIRS: readonly [number, number][] = [
  [90, 30],
  [90, 45],
  [90, 60],
  [60, 30],
];

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [alpha, beta] = pick(rng, SUM_PAIRS);
      const sum = alpha + beta;
      const value = SPECIAL_ANGLES[sum].sin;

      return {
        seed: 1,
        kysimus: `\\text{Arvuta liitmisvalemi abil } \\sin(${alpha}^\\circ + ${beta}^\\circ)\\text{.}`,
        vastus: exactValueToVastus(value),
        lahendus: [
          `\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta`,
          `${alpha}^\\circ + ${beta}^\\circ = ${sum}^\\circ`,
          `\\sin(${alpha}^\\circ + ${beta}^\\circ) = \\sin\\,${sum}^\\circ = ${exactValueToLatex(value)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [alpha, beta] = pick(rng, DIFFERENCE_PAIRS);
      const diff = alpha - beta;
      const value = SPECIAL_ANGLES[diff].cos;

      return {
        seed: 2,
        kysimus: `\\text{Arvuta lahutamisvalemi abil } \\cos(${alpha}^\\circ - ${beta}^\\circ)\\text{.}`,
        vastus: exactValueToVastus(value),
        lahendus: [
          `\\cos(\\alpha-\\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta`,
          `${alpha}^\\circ - ${beta}^\\circ = ${diff}^\\circ`,
          `\\cos(${alpha}^\\circ - ${beta}^\\circ) = \\cos\\,${diff}^\\circ = ${exactValueToLatex(value)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { sides } = niceTrigTriangle(rng);
      const [a, b, c] = sides;
      const useSin = pick(rng, [true, false]);

      if (useSin) {
        return {
          seed: 3,
          kysimus: `\\text{Teravnurga } \\alpha \\text{ korral on } \\sin\\alpha = \\dfrac{${a}}{${c}} \\text{ ja } \\cos\\alpha = \\dfrac{${b}}{${c}}\\text{. Arvuta liitmisvalemi abil } \\sin(\\alpha + 90^\\circ)\\text{.}`,
          vastus: { tuup: "arv", ...arvVaartus(b, c) },
          lahendus: [
            `\\sin(\\alpha+90^\\circ) = \\sin\\alpha\\cos\\,90^\\circ + \\cos\\alpha\\sin\\,90^\\circ = \\sin\\alpha\\cdot 0 + \\cos\\alpha\\cdot 1 = \\cos\\alpha`,
            `\\sin(\\alpha+90^\\circ) = \\cos\\alpha = \\dfrac{${b}}{${c}}`,
          ],
        };
      }

      return {
        seed: 3,
        kysimus: `\\text{Teravnurga } \\alpha \\text{ korral on } \\sin\\alpha = \\dfrac{${a}}{${c}} \\text{ ja } \\cos\\alpha = \\dfrac{${b}}{${c}}\\text{. Arvuta liitmisvalemi abil } \\cos(\\alpha + 90^\\circ)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(-a, c) },
        lahendus: [
          `\\cos(\\alpha+90^\\circ) = \\cos\\alpha\\cos\\,90^\\circ - \\sin\\alpha\\sin\\,90^\\circ = \\cos\\alpha\\cdot 0 - \\sin\\alpha\\cdot 1 = -\\sin\\alpha`,
          `\\cos(\\alpha+90^\\circ) = -\\sin\\alpha = -\\dfrac{${a}}{${c}}`,
        ],
      };
    },
  },
];
