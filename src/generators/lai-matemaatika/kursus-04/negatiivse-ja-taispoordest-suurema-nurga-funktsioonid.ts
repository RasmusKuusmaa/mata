import {
  SPECIAL_ANGLES,
  arvVaartus,
  exactValueToLatex,
  exactValueToVastus,
  niceTrigTriangle,
  type ExactValue,
} from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-negatiivse-ja-taispoordest-suurema-nurga-funktsioonid";

const ACUTE_ANGLES = [30, 45, 60] as const;
const FUNCTIONS = ["sin", "cos", "tan"] as const;
type Func = (typeof FUNCTIONS)[number];
const FUNC_LATEX: Record<Func, string> = { sin: "\\sin", cos: "\\cos", tan: "\\tg" };

function negate(value: ExactValue): ExactValue {
  switch (value.kind) {
    case "integer":
      return { kind: "integer", value: -value.value };
    case "fraction":
      return { kind: "fraction", numerator: -value.numerator, denominator: value.denominator };
    case "sqrt":
      return {
        kind: "sqrt",
        radicand: value.radicand,
        numerator: -value.numerator,
        denominator: value.denominator,
      };
    case "pi":
      return { kind: "pi", numerator: -value.numerator, denominator: value.denominator };
  }
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { sides } = niceTrigTriangle(rng);
      const [a, , c] = sides;

      return {
        seed: 1,
        kysimus: `\\text{Teame, et } \\sin\\alpha = \\dfrac{${a}}{${c}}\\text{. Leia } \\sin(-\\alpha)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(-a, c) },
        lahendus: [
          `\\text{Siinus on paaritu funktsioon: } \\sin(-\\alpha) = -\\sin\\alpha\\text{.}`,
          `\\sin(-\\alpha) = -\\dfrac{${a}}{${c}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { sides } = niceTrigTriangle(rng);
      const [, b, c] = sides;

      return {
        seed: 2,
        kysimus: `\\text{Teame, et } \\cos\\alpha = \\dfrac{${b}}{${c}}\\text{. Leia } \\cos(-\\alpha)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(b, c) },
        lahendus: [
          `\\text{Koosinus on paarisfunktsioon: } \\cos(-\\alpha) = \\cos\\alpha\\text{.}`,
          `\\cos(-\\alpha) = \\dfrac{${b}}{${c}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const specialAngle = pick(rng, ACUTE_ANGLES);
      const func = pick(rng, FUNCTIONS);
      const k = int(rng, 1, 2);
      const sign = pick(rng, [1, -1] as const);
      const raw = 360 * k + sign * specialAngle;

      const tableValue = SPECIAL_ANGLES[specialAngle][func];
      if (tableValue === null) throw new Error("unreachable: tan is defined for 30/45/60");
      const isOdd = func !== "cos";
      const value = sign === 1 || !isOdd ? tableValue : negate(tableValue);

      return {
        seed: 3,
        kysimus: `\\text{Leia täpne väärtus: } ${FUNC_LATEX[func]}\\,(${raw}^\\circ)`,
        vastus: exactValueToVastus(value),
        lahendus: [
          `\\text{Täispöörded ei muuda väärtust: } ${raw}^\\circ \\to ${sign === 1 ? "" : "-"}${specialAngle}^\\circ\\text{.}`,
          isOdd
            ? `${FUNC_LATEX[func]}\\,(${sign === 1 ? "" : "-"}${specialAngle}^\\circ) = ${sign === 1 ? "" : "-"}${FUNC_LATEX[func]}\\,${specialAngle}^\\circ = ${exactValueToLatex(value)}`
            : `${FUNC_LATEX[func]}\\,(${sign === 1 ? "" : "-"}${specialAngle}^\\circ) = ${FUNC_LATEX[func]}\\,${specialAngle}^\\circ = ${exactValueToLatex(value)}`,
        ],
      };
    },
  },
];
