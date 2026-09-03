import {
  SPECIAL_ANGLES,
  arvVaartus,
  exactValueToLatex,
  exactValueToVastus,
} from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { ArvVaartus, Generaator } from "@/generators/types";

const TEEMA_ID = "04-tapsed-vaartused";

const ANGLES = Object.keys(SPECIAL_ANGLES).map(Number);
const FUNCTIONS = ["sin", "cos", "tan"] as const;
type Func = (typeof FUNCTIONS)[number];
const FUNC_LATEX: Record<Func, string> = { sin: "\\sin", cos: "\\cos", tan: "\\tg" };

const KESKMINE_EXPRESSIONS = [
  {
    latex: "\\sin\\,30^\\circ + \\cos\\,60^\\circ",
    steps: ["\\sin\\,30^\\circ + \\cos\\,60^\\circ = \\dfrac{1}{2} + \\dfrac{1}{2} = 1"],
    value: { kind: "integer", value: 1 } as const,
  },
  {
    latex: "\\cos\\,30^\\circ \\cdot \\sin\\,60^\\circ",
    steps: [
      "\\cos\\,30^\\circ \\cdot \\sin\\,60^\\circ = \\dfrac{\\sqrt3}{2} \\cdot \\dfrac{\\sqrt3}{2} = \\dfrac{3}{4}",
    ],
    value: { kind: "fraction", numerator: 3, denominator: 4 } as const,
  },
  {
    latex: "\\sin\\,45^\\circ \\cdot \\cos\\,45^\\circ",
    steps: [
      "\\sin\\,45^\\circ \\cdot \\cos\\,45^\\circ = \\dfrac{\\sqrt2}{2} \\cdot \\dfrac{\\sqrt2}{2} = \\dfrac{1}{2}",
    ],
    value: { kind: "fraction", numerator: 1, denominator: 2 } as const,
  },
  {
    latex: "\\sin\\,90^\\circ - \\cos\\,0^\\circ",
    steps: ["\\sin\\,90^\\circ - \\cos\\,0^\\circ = 1 - 1 = 0"],
    value: { kind: "integer", value: 0 } as const,
  },
  {
    latex: "\\sin\\,180^\\circ + \\cos\\,360^\\circ",
    steps: ["\\sin\\,180^\\circ + \\cos\\,360^\\circ = 0 + 1 = 1"],
    value: { kind: "integer", value: 1 } as const,
  },
  {
    latex: "2\\sin\\,30^\\circ + \\cos\\,180^\\circ",
    steps: ["2\\sin\\,30^\\circ + \\cos\\,180^\\circ = 2 \\cdot \\dfrac{1}{2} + (-1) = 0"],
    value: { kind: "integer", value: 0 } as const,
  },
  {
    latex: "\\tg\\,45^\\circ + \\sin\\,270^\\circ",
    steps: ["\\tg\\,45^\\circ + \\sin\\,270^\\circ = 1 + (-1) = 0"],
    value: { kind: "integer", value: 0 } as const,
  },
  {
    latex: "\\cos\\,60^\\circ \\cdot \\cos\\,60^\\circ",
    steps: ["\\cos\\,60^\\circ \\cdot \\cos\\,60^\\circ = \\dfrac{1}{2} \\cdot \\dfrac{1}{2} = \\dfrac{1}{4}"],
    value: { kind: "fraction", numerator: 1, denominator: 4 } as const,
  },
];

const RASKE_CONDITIONS = [
  { latex: "\\sin\\alpha = 0", matches: [0, 180, 360] },
  { latex: "\\cos\\alpha = 0", matches: [90, 270] },
  { latex: "\\tg\\,\\alpha = 0", matches: [0, 180, 360] },
];

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const angle = pick(rng, ANGLES);
      const trig = SPECIAL_ANGLES[angle];
      const definedFunctions = FUNCTIONS.filter((f) => trig[f] !== null);
      const func = pick(rng, definedFunctions);
      const value = trig[func];
      if (value === null) throw new Error("unreachable: func was filtered to be defined");

      return {
        seed: 1,
        kysimus: `\\text{Leia täpne väärtus: } ${FUNC_LATEX[func]}\\,${angle}^\\circ`,
        vastus: exactValueToVastus(value),
        lahendus: [
          `\\text{Tabeliväärtus: } ${FUNC_LATEX[func]}\\,${angle}^\\circ = ${exactValueToLatex(value)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const item = pick(rng, KESKMINE_EXPRESSIONS);

      return {
        seed: 2,
        kysimus: `\\text{Arvuta täpsete väärtuste abil: } ${item.latex}`,
        vastus: exactValueToVastus(item.value),
        lahendus: [...item.steps],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const condition = pick(rng, RASKE_CONDITIONS);
      const vaartused: ArvVaartus[] = condition.matches.map((m) => arvVaartus(m));

      return {
        seed: 3,
        kysimus: `\\text{Leia kõik nurgad } \\alpha \\in [0^\\circ, 360^\\circ]\\text{, mille korral } ${condition.latex}\\text{.}`,
        vastus: { tuup: "hulk", vaartused },
        lahendus: [
          `\\text{Tabeli järgi kehtib } ${condition.latex} \\text{ nurkade } ${condition.matches
            .map((m) => `${m}^\\circ`)
            .join(", ")} \\text{ korral.}`,
        ],
      };
    },
  },
];
