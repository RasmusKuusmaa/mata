import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";
import type { ExactForm } from "@/lib/format/number";

const TEEMA_ID = "09-lihtsamad-trigonomeetrilised-vorrandid";

type Entry = { valueLatex: string; principal: ExactForm; second: ExactForm };

const SIN_TABLE: readonly Entry[] = [
  {
    valueLatex: "\\dfrac12",
    principal: { kind: "pi", numerator: 1, denominator: 6 },
    second: { kind: "pi", numerator: 5, denominator: 6 },
  },
  {
    valueLatex: "\\dfrac{\\sqrt2}{2}",
    principal: { kind: "pi", numerator: 1, denominator: 4 },
    second: { kind: "pi", numerator: 3, denominator: 4 },
  },
  {
    valueLatex: "\\dfrac{\\sqrt3}{2}",
    principal: { kind: "pi", numerator: 1, denominator: 3 },
    second: { kind: "pi", numerator: 2, denominator: 3 },
  },
];

const COS_TABLE: readonly Entry[] = [
  {
    valueLatex: "\\dfrac12",
    principal: { kind: "pi", numerator: 1, denominator: 3 },
    second: { kind: "pi", numerator: 5, denominator: 3 },
  },
  {
    valueLatex: "\\dfrac{\\sqrt2}{2}",
    principal: { kind: "pi", numerator: 1, denominator: 4 },
    second: { kind: "pi", numerator: 7, denominator: 4 },
  },
  {
    valueLatex: "\\dfrac{\\sqrt3}{2}",
    principal: { kind: "pi", numerator: 1, denominator: 6 },
    second: { kind: "pi", numerator: 11, denominator: 6 },
  },
];

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const entry = pick(rng, SIN_TABLE);

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrrand } \\sin x = ${entry.valueLatex} \\text{ ja leia vähim positiivne lahend.}`,
        vastus: { tuup: "tapne", vorm: entry.principal },
        lahendus: [
          `\\text{Vähim positiivne lahend on } x = \\arcsin\\left(${entry.valueLatex}\\right)\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const entry = pick(rng, COS_TABLE);

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrrand } \\cos x = ${entry.valueLatex} \\text{ ja leia vähim positiivne lahend.}`,
        vastus: { tuup: "tapne", vorm: entry.principal },
        lahendus: [
          `\\text{Vähim positiivne lahend on } x = \\arccos\\left(${entry.valueLatex}\\right)\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const entry = pick(rng, SIN_TABLE);

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrrand } \\sin x = ${entry.valueLatex} \\text{ vahemikus } [0, 2\\pi)\\text{ ja leia suurem lahend.}`,
        vastus: { tuup: "tapne", vorm: entry.second },
        lahendus: [
          `\\text{Siinusvõrrandi teine lahend on } x = \\pi - \\arcsin\\left(${entry.valueLatex}\\right) \\text{ (sümmeetria } \\sin\\alpha=\\sin(\\pi-\\alpha) \\text{ tõttu).}`,
        ],
      };
    },
  },
];
