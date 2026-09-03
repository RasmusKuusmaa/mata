import {
  SPECIAL_ANGLES,
  exactValueToLatex,
  exactValueToVastus,
  type ExactValue,
} from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-kahekordse-nurga-valemid";

type DoubleAngleCase = {
  alpha: 30 | 45 | 60;
  sin2: ExactValue;
  cos2: ExactValue;
  tan2: ExactValue | null;
};

const CASES: DoubleAngleCase[] = [
  {
    alpha: 30,
    sin2: { kind: "sqrt", radicand: 3, numerator: 1, denominator: 2 },
    cos2: { kind: "fraction", numerator: 1, denominator: 2 },
    tan2: { kind: "sqrt", radicand: 3, numerator: 1 },
  },
  {
    alpha: 45,
    sin2: { kind: "integer", value: 1 },
    cos2: { kind: "integer", value: 0 },
    tan2: null,
  },
  {
    alpha: 60,
    sin2: { kind: "sqrt", radicand: 3, numerator: 1, denominator: 2 },
    cos2: { kind: "fraction", numerator: -1, denominator: 2 },
    tan2: { kind: "sqrt", radicand: 3, numerator: -1 },
  },
];

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const c = pick(rng, CASES);
      const { sin, cos } = SPECIAL_ANGLES[c.alpha];

      return {
        seed: 1,
        kysimus: `\\text{Teame, et } \\sin\\,${c.alpha}^\\circ = ${exactValueToLatex(sin)} \\text{ ja } \\cos\\,${c.alpha}^\\circ = ${exactValueToLatex(cos)}\\text{. Leia kahekordse nurga valemi abil } \\sin\\,${2 * c.alpha}^\\circ\\text{.}`,
        vastus: exactValueToVastus(c.sin2),
        lahendus: [
          `\\sin\\,2\\alpha = 2\\sin\\alpha\\cos\\alpha`,
          `\\sin\\,${2 * c.alpha}^\\circ = 2 \\cdot ${exactValueToLatex(sin)} \\cdot ${exactValueToLatex(cos)} = ${exactValueToLatex(c.sin2)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const c = pick(rng, [CASES[0], CASES[2]]);
      const { sin, cos } = SPECIAL_ANGLES[c.alpha];

      return {
        seed: 2,
        kysimus: `\\text{Teame, et } \\sin\\,${c.alpha}^\\circ = ${exactValueToLatex(sin)} \\text{ ja } \\cos\\,${c.alpha}^\\circ = ${exactValueToLatex(cos)}\\text{. Leia kahekordse nurga valemi abil } \\cos\\,${2 * c.alpha}^\\circ\\text{.}`,
        vastus: exactValueToVastus(c.cos2),
        lahendus: [
          `\\cos\\,2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha`,
          `\\cos\\,${2 * c.alpha}^\\circ = ${exactValueToLatex(cos)}^2 - \\left(${exactValueToLatex(sin)}\\right)^2 = ${exactValueToLatex(c.cos2)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const c = pick(rng, [CASES[0], CASES[2]]);
      const { tan } = SPECIAL_ANGLES[c.alpha];
      if (tan === null || c.tan2 === null) throw new Error("unreachable: 30/60 have a defined tan");

      return {
        seed: 3,
        kysimus: `\\text{Teame, et } \\tg\\,${c.alpha}^\\circ = ${exactValueToLatex(tan)}\\text{. Leia kahekordse nurga valemi abil } \\tg\\,${2 * c.alpha}^\\circ\\text{.}`,
        vastus: exactValueToVastus(c.tan2),
        lahendus: [
          `\\tg\\,2\\alpha = \\dfrac{2\\tg\\,\\alpha}{1-\\tg^2\\alpha}`,
          `\\tg\\,${2 * c.alpha}^\\circ = \\dfrac{2 \\cdot ${exactValueToLatex(tan)}}{1 - \\left(${exactValueToLatex(tan)}\\right)^2} = ${exactValueToLatex(c.tan2)}`,
        ],
      };
    },
  },
];
