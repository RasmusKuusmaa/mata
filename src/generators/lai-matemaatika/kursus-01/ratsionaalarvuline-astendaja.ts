import { int, pick } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "01-ratsionaalarvuline-astendaja";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const juurija = pick(rng, [2, 3]);
      const k = int(rng, 2, 5);
      const a = k ** juurija;

      return {
        seed: 1,
        kysimus: `\\text{Arvuta: } ${a}^{\\frac{1}{${juurija}}}`,
        vastus: { tuup: "arv", ...arvVaartus(k) },
        lahendus: [
          `a^{\\frac{1}{n}} = \\sqrt[n]{a}\\text{:}`,
          `${a}^{\\frac{1}{${juurija}}} = \\sqrt[${juurija}]{${a}} = ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const juurija = pick(rng, [2, 3]);
      const aste = int(rng, 2, 3);
      const k = int(rng, 2, 4);
      const a = k ** juurija;
      const tulemus = k ** aste;

      return {
        seed: 2,
        kysimus: `\\text{Arvuta: } ${a}^{\\frac{${aste}}{${juurija}}}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m\\text{:}`,
          `${a}^{\\frac{${aste}}{${juurija}}} = \\left(\\sqrt[${juurija}]{${a}}\\right)^${aste} = ${k}^${aste} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { juurija, aste, k, a, nimetaja } = redrawUntilNice((r) => {
        const juurija = pick(r, [2, 3]);
        const aste = int(r, 1, 2);
        const k = int(r, 2, 4);
        const nimetaja = k ** aste;
        // Denominator must stay ≤ 12 to be nice.
        return nimetaja <= 12
          ? { juurija, aste, k, a: k ** juurija, nimetaja }
          : null;
      }, rng);

      return {
        seed: 3,
        kysimus: `\\text{Arvuta: } ${a}^{-\\frac{${aste}}{${juurija}}}`,
        vastus: { tuup: "arv", ...arvVaartus(1, nimetaja) },
        lahendus: [
          `a^{-\\frac{m}{n}} = \\dfrac{1}{\\left(\\sqrt[n]{a}\\right)^m}\\text{:}`,
          `${a}^{-\\frac{${aste}}{${juurija}}} = \\dfrac{1}{${k}^${aste}} = \\dfrac{1}{${nimetaja}}`,
        ],
      };
    },
  },
];
