import { arvVaartus, niceTrigTriangle } from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-taandamisvalemid";

/** `resultOf(a, b, c)` returns `[numerator, denominator]` of the reduced
 * value, given the acute angle's `sinα = a/c`, `cosα = b/c`, `tgα = a/b`. */
type ReductionCase = {
  question: string;
  identity: string;
  resultOf: (a: number, b: number, c: number) => [number, number];
};

const FAMILY_180: ReductionCase[] = [
  {
    question: "\\sin(180^\\circ - \\alpha)",
    identity: "\\sin(180^\\circ - \\alpha) = \\sin\\alpha",
    resultOf: (a, _b, c) => [a, c],
  },
  {
    question: "\\sin(180^\\circ + \\alpha)",
    identity: "\\sin(180^\\circ + \\alpha) = -\\sin\\alpha",
    resultOf: (a, _b, c) => [-a, c],
  },
  {
    question: "\\cos(180^\\circ - \\alpha)",
    identity: "\\cos(180^\\circ - \\alpha) = -\\cos\\alpha",
    resultOf: (_a, b, c) => [-b, c],
  },
  {
    question: "\\cos(180^\\circ + \\alpha)",
    identity: "\\cos(180^\\circ + \\alpha) = -\\cos\\alpha",
    resultOf: (_a, b, c) => [-b, c],
  },
  {
    question: "\\tg\\,(180^\\circ - \\alpha)",
    identity: "\\tg\\,(180^\\circ - \\alpha) = -\\tg\\,\\alpha",
    resultOf: (a, b) => [-a, b],
  },
  {
    question: "\\tg\\,(180^\\circ + \\alpha)",
    identity: "\\tg\\,(180^\\circ + \\alpha) = \\tg\\,\\alpha",
    resultOf: (a, b) => [a, b],
  },
];

const FAMILY_90: ReductionCase[] = [
  {
    question: "\\sin(90^\\circ - \\alpha)",
    identity: "\\sin(90^\\circ - \\alpha) = \\cos\\alpha",
    resultOf: (_a, b, c) => [b, c],
  },
  {
    question: "\\sin(90^\\circ + \\alpha)",
    identity: "\\sin(90^\\circ + \\alpha) = \\cos\\alpha",
    resultOf: (_a, b, c) => [b, c],
  },
  {
    question: "\\cos(90^\\circ - \\alpha)",
    identity: "\\cos(90^\\circ - \\alpha) = \\sin\\alpha",
    resultOf: (a, _b, c) => [a, c],
  },
  {
    question: "\\cos(90^\\circ + \\alpha)",
    identity: "\\cos(90^\\circ + \\alpha) = -\\sin\\alpha",
    resultOf: (a, _b, c) => [-a, c],
  },
];

const FAMILY_270: ReductionCase[] = [
  {
    question: "\\sin(270^\\circ - \\alpha)",
    identity: "\\sin(270^\\circ - \\alpha) = -\\cos\\alpha",
    resultOf: (_a, b, c) => [-b, c],
  },
  {
    question: "\\sin(270^\\circ + \\alpha)",
    identity: "\\sin(270^\\circ + \\alpha) = -\\cos\\alpha",
    resultOf: (_a, b, c) => [-b, c],
  },
  {
    question: "\\cos(270^\\circ - \\alpha)",
    identity: "\\cos(270^\\circ - \\alpha) = -\\sin\\alpha",
    resultOf: (a, _b, c) => [-a, c],
  },
  {
    question: "\\cos(270^\\circ + \\alpha)",
    identity: "\\cos(270^\\circ + \\alpha) = \\sin\\alpha",
    resultOf: (a, _b, c) => [a, c],
  },
];

function buildGeneraator(
  raskus: "kerge" | "keskmine" | "raske",
  seed: number,
  cases: ReductionCase[],
): Generaator {
  return {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus,
    genereeri: (rng) => {
      const { sides } = niceTrigTriangle(rng);
      const [a, b, c] = sides;
      const reductionCase = pick(rng, cases);
      const [num, den] = reductionCase.resultOf(a, b, c);

      return {
        seed,
        kysimus: `\\text{Teravnurga } \\alpha \\text{ korral on } \\sin\\alpha = \\dfrac{${a}}{${c}} \\text{ ja } \\cos\\alpha = \\dfrac{${b}}{${c}}\\text{. Leia } ${reductionCase.question}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(num, den) },
        lahendus: [
          `\\text{Taandamisvalem: } ${reductionCase.identity}\\text{.}`,
          `${reductionCase.question} = \\dfrac{${num}}{${den}}`,
        ],
      };
    },
  };
}

export const generaatorid: Generaator[] = [
  buildGeneraator("kerge", 1, FAMILY_180),
  buildGeneraator("keskmine", 2, FAMILY_90),
  buildGeneraator("raske", 3, FAMILY_270),
];
