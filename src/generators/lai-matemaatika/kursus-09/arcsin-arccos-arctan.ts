import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";
import type { ExactForm } from "@/lib/format/number";

const TEEMA_ID = "09-arcsin-arccos-arctan";

type Entry = { valueLatex: string; angle: ExactForm };

const ARCSIN_TABLE: readonly Entry[] = [
  { valueLatex: "-\\dfrac12", angle: { kind: "pi", numerator: -1, denominator: 6 } },
  { valueLatex: "0", angle: { kind: "pi", numerator: 0 } },
  { valueLatex: "\\dfrac12", angle: { kind: "pi", numerator: 1, denominator: 6 } },
  { valueLatex: "\\dfrac{\\sqrt2}{2}", angle: { kind: "pi", numerator: 1, denominator: 4 } },
  { valueLatex: "\\dfrac{\\sqrt3}{2}", angle: { kind: "pi", numerator: 1, denominator: 3 } },
  { valueLatex: "1", angle: { kind: "pi", numerator: 1, denominator: 2 } },
];

const ARCCOS_TABLE: readonly Entry[] = [
  { valueLatex: "1", angle: { kind: "pi", numerator: 0 } },
  { valueLatex: "\\dfrac{\\sqrt3}{2}", angle: { kind: "pi", numerator: 1, denominator: 6 } },
  { valueLatex: "\\dfrac{\\sqrt2}{2}", angle: { kind: "pi", numerator: 1, denominator: 4 } },
  { valueLatex: "\\dfrac12", angle: { kind: "pi", numerator: 1, denominator: 3 } },
  { valueLatex: "0", angle: { kind: "pi", numerator: 1, denominator: 2 } },
];

const ARCTAN_TABLE: readonly Entry[] = [
  { valueLatex: "0", angle: { kind: "pi", numerator: 0 } },
  { valueLatex: "\\dfrac{\\sqrt3}{3}", angle: { kind: "pi", numerator: 1, denominator: 6 } },
  { valueLatex: "1", angle: { kind: "pi", numerator: 1, denominator: 4 } },
  { valueLatex: "\\sqrt3", angle: { kind: "pi", numerator: 1, denominator: 3 } },
];

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const entry = pick(rng, ARCSIN_TABLE);

      return {
        seed: 1,
        kysimus: `\\text{Leia } \\arcsin\\left(${entry.valueLatex}\\right)\\text{.}`,
        vastus: { tuup: "tapne", vorm: entry.angle },
        lahendus: [
          `\\arcsin\\left(${entry.valueLatex}\\right) \\text{ on nurk vahemikus } \\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]\\text{, mille siinus on } ${entry.valueLatex}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const entry = pick(rng, ARCCOS_TABLE);

      return {
        seed: 2,
        kysimus: `\\text{Leia } \\arccos\\left(${entry.valueLatex}\\right)\\text{.}`,
        vastus: { tuup: "tapne", vorm: entry.angle },
        lahendus: [
          `\\arccos\\left(${entry.valueLatex}\\right) \\text{ on nurk vahemikus } [0, \\pi]\\text{, mille koosinus on } ${entry.valueLatex}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const entry = pick(rng, ARCTAN_TABLE);

      return {
        seed: 3,
        kysimus: `\\text{Leia } \\arctg\\left(${entry.valueLatex}\\right)\\text{.}`,
        vastus: { tuup: "tapne", vorm: entry.angle },
        lahendus: [
          `\\arctg\\left(${entry.valueLatex}\\right) \\text{ on nurk vahemikus } \\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\text{, mille tangens on } ${entry.valueLatex}\\text{.}`,
        ],
      };
    },
  },
];
