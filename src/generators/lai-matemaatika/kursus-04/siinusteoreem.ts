import { SPECIAL_ANGLES, arvVaartus, reduceFraction } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator, Vastus } from "@/generators/types";

const TEEMA_ID = "04-siinusteoreem";

/** `2R = a / sinA` for a nice angle `A`, as the `Vastus` it evaluates to. */
function circumdiameter(a: number, angle: 30 | 45 | 60 | 90): Vastus {
  const sinA = SPECIAL_ANGLES[angle].sin;
  switch (sinA.kind) {
    case "integer":
      return { tuup: "arv", ...arvVaartus(a, sinA.value) };
    case "fraction":
      return { tuup: "arv", ...arvVaartus(a * sinA.denominator, sinA.numerator) };
    case "sqrt": {
      const denominator = sinA.denominator ?? 1;
      const [num, den] = reduceFraction(a * denominator, sinA.numerator * sinA.radicand);
      return { tuup: "tapne", vorm: { kind: "sqrt", radicand: sinA.radicand, numerator: num, denominator: den } };
    }
    case "pi":
      throw new Error("unreachable: sinA is never a pi multiple");
  }
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 2, 20);

      return {
        seed: 1,
        kysimus: `\\text{Kolmnurgas on külg } a = ${a}\\text{, vastasnurk } A = 30^\\circ \\text{ ja teine nurk } B = 90^\\circ\\text{. Leia küljele } B \\text{ vastandkülg } b \\text{ siinusteoreemi abil.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 2 * a },
        lahendus: [
          `\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} \\quad \\Rightarrow \\quad b = \\dfrac{a\\sin B}{\\sin A}`,
          `b = \\dfrac{${a} \\cdot 1}{1/2} = ${2 * a}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 2, 20);

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurgas on külg } a = ${a}\\text{, vastasnurk } A = 30^\\circ \\text{ ja teine nurk } B = 60^\\circ\\text{. Leia küljele } B \\text{ vastandkülg } b \\text{ siinusteoreemi abil.}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: 3, numerator: a } },
        lahendus: [
          `\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} \\quad \\Rightarrow \\quad b = \\dfrac{a\\sin B}{\\sin A}`,
          `b = \\dfrac{${a} \\cdot \\sqrt3/2}{1/2} = ${a}\\sqrt3`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 2, 20);
      const angle = pick(rng, [30, 45, 60, 90] as const);

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurgas on külg } a = ${a} \\text{ vastasnurga all } A = ${angle}^\\circ\\text{. Leia kolmnurga ümberringjoone läbimõõt } 2R = \\dfrac{a}{\\sin A}\\text{.}`,
        vastus: circumdiameter(a, angle),
        lahendus: [
          `2R = \\dfrac{a}{\\sin A} = \\dfrac{${a}}{\\sin ${angle}^\\circ}`,
        ],
      };
    },
  },
];
