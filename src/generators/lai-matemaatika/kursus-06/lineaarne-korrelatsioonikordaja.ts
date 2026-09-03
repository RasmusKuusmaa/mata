import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-lineaarne-korrelatsioonikordaja";

const LIIGID = ["tugev seos", "keskmise tugevusega seos", "nõrk seos"] as const;

function classify(absValue: number): (typeof LIIGID)[number] {
  if (absValue >= 0.7) return "tugev seos";
  if (absValue >= 0.3) return "keskmise tugevusega seos";
  return "nõrk seos";
}

// Fractions (never raw decimals, to avoid a leading "-0" in the rendered
// text) with their absolute value spelled out for the "|r| ⋛ ..." step.
const R_VALUES = [
  { latex: "\\dfrac{9}{10}", absLatex: "\\dfrac{9}{10}", absValue: 0.9 },
  { latex: "-\\dfrac{17}{20}", absLatex: "\\dfrac{17}{20}", absValue: 0.85 },
  { latex: "\\dfrac12", absLatex: "\\dfrac12", absValue: 0.5 },
  { latex: "-\\dfrac25", absLatex: "\\dfrac25", absValue: 0.4 },
  { latex: "\\dfrac{1}{10}", absLatex: "\\dfrac{1}{10}", absValue: 0.1 },
  { latex: "-\\dfrac15", absLatex: "\\dfrac15", absValue: 0.2 },
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const r = pick(rng, R_VALUES.slice(0, 2));
      const liik = classify(r.absValue);

      return {
        seed: 1,
        kysimus: `\\text{Kahe tunnuse vaheline korrelatsioonikordaja on } r=${r.latex}\\text{. Kui tugev on lineaarne seos?}`,
        vastus: { tuup: "valik", oige: liik, eksitajad: LIIGID.filter((l) => l !== liik) },
        lahendus: [`|r|=${r.absLatex} \\ge 0{,}7\\text{, seega on tegemist } \\textbf{${liik}}\\text{ga.}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const r = pick(rng, R_VALUES.slice(2, 4));
      const liik = classify(r.absValue);

      return {
        seed: 2,
        kysimus: `\\text{Kahe tunnuse vaheline korrelatsioonikordaja on } r=${r.latex}\\text{. Kui tugev on lineaarne seos?}`,
        vastus: { tuup: "valik", oige: liik, eksitajad: LIIGID.filter((l) => l !== liik) },
        lahendus: [`0{,}3 \\le |r|=${r.absLatex} < 0{,}7\\text{, seega on tegemist } \\textbf{${liik}}\\text{ga.}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const r = pick(rng, R_VALUES.slice(4));
      const liik = classify(r.absValue);

      return {
        seed: 3,
        kysimus: `\\text{Kahe tunnuse vaheline korrelatsioonikordaja on } r=${r.latex}\\text{. Kui tugev on lineaarne seos?}`,
        vastus: { tuup: "valik", oige: liik, eksitajad: LIIGID.filter((l) => l !== liik) },
        lahendus: [`|r|=${r.absLatex} < 0{,}3\\text{, seega on tegemist } \\textbf{${liik}}\\text{ga.}`],
      };
    },
  },
];
