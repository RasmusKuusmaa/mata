import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "01-irratsionaalavaldiste-teisendamine";
const SQUAREFREE = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15];

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = int(rng, 2, 6);
      const m = pick(rng, SQUAREFREE);
      const n = k * k * m;

      return {
        seed: 1,
        kysimus: `\\text{Lihtsusta: } \\sqrt{${k * k}} \\cdot \\sqrt{${m}}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: m, numerator: k } },
        lahendus: [
          `\\text{Ühendame juurte alla ja eraldame täisruudu:}`,
          `\\sqrt{${k * k}} \\cdot \\sqrt{${m}} = \\sqrt{${n}} = ${k}\\sqrt{${m}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 1, 9);
      const b = pick(rng, SQUAREFREE);

      return {
        seed: 2,
        kysimus: `\\text{Vabasta nimetaja juurest: } \\dfrac{${a}}{\\sqrt{${b}}}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: b, numerator: a, denominator: b } },
        lahendus: [
          `\\text{Korrutame murru mõlemat poolt nimetaja juurega:}`,
          `\\dfrac{${a}}{\\sqrt{${b}}} = \\dfrac{${a}\\sqrt{${b}}}{\\sqrt{${b}} \\cdot \\sqrt{${b}}} = \\dfrac{${a}\\sqrt{${b}}}{${b}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k1 = nonZeroInt(rng, 1, 9);
      // k2 ≠ k1 rules out a subtraction landing on exactly 0 — an exact
      // form with no radical left, which the answer parser can't accept.
      const k2 = (() => {
        let v: number;
        do {
          v = nonZeroInt(rng, 1, 9);
        } while (v === k1);
        return v;
      })();
      const m = pick(rng, SQUAREFREE);
      const liitmine = pick(rng, [true, false]);
      const opSymbol = liitmine ? "+" : "-";
      const tulemus = liitmine ? k1 + k2 : k1 - k2;

      return {
        seed: 3,
        kysimus: `\\text{Lihtsusta: } ${k1}\\sqrt{${m}} ${opSymbol} ${k2}\\sqrt{${m}}`,
        vastus: { tuup: "tapne", vorm: { kind: "sqrt", radicand: m, numerator: tulemus } },
        lahendus: [
          `\\text{Sama juurealusega liikmete puhul liidetakse/lahutatakse kordajad:}`,
          `${k1}\\sqrt{${m}} ${opSymbol} ${k2}\\sqrt{${m}} = (${k1} ${opSymbol} ${k2})\\sqrt{${m}} = ${tulemus}\\sqrt{${m}}`,
        ],
      };
    },
  },
];
