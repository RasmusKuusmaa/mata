import { PYTHAGOREAN_TRIPLES } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-kolmnurga-lahendamine";

const TRIPLES_60: readonly [number, number, number][] = [
  [3, 8, 7],
  [5, 8, 7],
  [7, 15, 13],
  [5, 21, 19],
  [16, 21, 19],
  [7, 40, 37],
];

const TRIPLES_120: readonly [number, number, number][] = [
  [3, 5, 7],
  [7, 8, 13],
  [5, 16, 19],
  [7, 33, 37],
];

/** `(A, B)` angle pairs with `A + B < 180°`. */
const ANGLE_PAIRS: readonly [number, number][] = [
  [30, 60],
  [30, 45],
  [45, 45],
  [30, 90],
  [45, 90],
  [60, 90],
  [30, 30],
  [45, 60],
];

const NURGA_LIIGID = ["teravnurk", "täisnurk", "nürinurk"] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const angle = pick(rng, [60, 120] as const);
      const [a, b, c] = pick(rng, angle === 60 ? TRIPLES_60 : TRIPLES_120);
      const cosCTimes2 = angle === 60 ? 1 : -1;

      return {
        seed: 1,
        kysimus: `\\text{Kolmnurga küljed on } a = ${a} \\text{ ja } b = ${b}\\text{, nendevaheline nurk } C = ${angle}^\\circ\\text{. Leia kolmnurga ümbermõõt.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a + b + c },
        lahendus: [
          `\\text{Leiame küljele } c \\text{ koosinusteoreemiga: } c^2 = a^2+b^2-2ab\\cos C\\text{:}`,
          `c^2 = ${a}^2 + ${b}^2 - ${a} \\cdot ${b} \\cdot ${cosCTimes2} = ${c * c} \\quad \\Rightarrow \\quad c = ${c}`,
          `\\text{Ümbermõõt: } a+b+c = ${a}+${b}+${c} = ${a + b + c}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [A, B] = pick(rng, ANGLE_PAIRS);
      const C = 180 - A - B;

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurga kaks nurka on } A = ${A}^\\circ \\text{ ja } B = ${B}^\\circ\\text{. Leia kolmas nurk } C\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: C },
        lahendus: [
          `\\text{Kolmnurga nurkade summa on } 180^\\circ\\text{:}`,
          `C = 180^\\circ - A - B = 180^\\circ - ${A}^\\circ - ${B}^\\circ = ${C}^\\circ`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const liik = pick(rng, NURGA_LIIGID);
      let a: number;
      let b: number;
      let c: number;
      if (liik === "teravnurk") [a, b, c] = pick(rng, TRIPLES_60);
      else if (liik === "nürinurk") [a, b, c] = pick(rng, TRIPLES_120);
      else {
        const scale = int(rng, 1, 3);
        const triple = pick(rng, PYTHAGOREAN_TRIPLES);
        [a, b, c] = [triple[0] * scale, triple[1] * scale, triple[2] * scale];
      }
      const eksitajad = NURGA_LIIGID.filter((l) => l !== liik);

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurga küljed on } a = ${a}\\text{, } b = ${b} \\text{ ja } c = ${c}\\text{. Milline on küljele } c \\text{ vastasnurk } C\\text{?}`,
        vastus: { tuup: "valik", oige: liik, eksitajad },
        lahendus: [
          `\\cos C = \\dfrac{a^2+b^2-c^2}{2ab} = \\dfrac{${a * a} + ${b * b} - ${c * c}}{${2 * a * b}}`,
          liik === "teravnurk"
            ? `\\cos C > 0 \\quad \\Rightarrow \\quad C \\text{ on } \\textbf{teravnurk}`
            : liik === "nürinurk"
              ? `\\cos C < 0 \\quad \\Rightarrow \\quad C \\text{ on } \\textbf{nürinurk}`
              : `\\cos C = 0 \\quad \\Rightarrow \\quad C \\text{ on } \\textbf{täisnurk}`,
        ],
      };
    },
  },
];
