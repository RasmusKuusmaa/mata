import { arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-logaritmvorratus";

/** `a^k` as plain text (for `valik` options), e.g. `(2, -2) -> "1/4"`. */
function powerText(a: number, k: number): string {
  return k >= 0 ? `${a ** k}` : `1/${a ** -k}`;
}

/** `a^k` as a KaTeX-ready fraction, e.g. `(2, -2) -> "\\dfrac{1}{4}"`. */
function powerLatex(a: number, k: number): string {
  return k >= 0 ? `${a ** k}` : `\\dfrac{1}{${a ** -k}}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const minK = a === 2 ? -3 : a === 3 ? -2 : -1;
      const k = int(rng, minK, 4);

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrratus (leia } x \\text{ alumine piir): } \\log_{${a}} x > ${k}\\text{.}`,
        vastus: k >= 0
          ? { tuup: "arv", kuju: "taisarv", vaartus: a ** k }
          : { tuup: "arv", ...arvVaartus(1, a ** -k) },
        lahendus: [
          `\\text{Kuna alus } ${a} > 1\\text{, säilib võrratuse suund: } x > ${a}^{${k}} = ${powerLatex(a, k)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = pick(rng, [2, 3] as const);
      const k = int(rng, 1, 3);
      const boundary = n ** k;
      const oige = `0 < x < 1/${boundary}`;

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrratus: } \\log_{1/${n}} x > ${k}\\text{.}`,
        vastus: {
          tuup: "valik",
          oige,
          eksitajad: [`x > 1/${boundary}`, `x < 1/${boundary}`],
        },
        lahendus: [
          `\\text{Kuna alus } 0 < \\dfrac{1}{${n}} < 1\\text{, pöördub suund: } x < \\left(\\dfrac{1}{${n}}\\right)^{${k}} = \\dfrac{1}{${boundary}}\\text{.}`,
          `\\text{Määramispiirkonna tõttu ka } x > 0\\text{, seega } 0 < x < \\dfrac{1}{${boundary}}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const k = int(rng, -1, 3);
      const boundaryText = powerText(a, k);
      const oige = `0 < x < ${boundaryText}`;

      return {
        seed: 3,
        kysimus: `\\text{Lahenda võrratus: } \\log_{${a}} x < ${k}\\text{.}`,
        vastus: {
          tuup: "valik",
          oige,
          eksitajad: [`x < ${boundaryText}`, `x > ${boundaryText}`],
        },
        lahendus: [
          `\\text{Kuna alus } ${a} > 1\\text{, säilib suund: } x < ${a}^{${k}} = ${powerLatex(a, k)}\\text{.}`,
          `\\text{Määramispiirkonna tõttu ka } x > 0\\text{, seega } 0 < x < ${powerLatex(a, k)}\\text{.}`,
        ],
      };
    },
  },
];
