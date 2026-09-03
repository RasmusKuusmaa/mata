import { int, pick } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "01-tehted-juurtega";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { k, a, b } = redrawUntilNice((r) => {
        const k = int(r, 3, 12);
        const a = pick(r, [2, 3, 4, 5, 6]);
        return (k * k) % a === 0 ? { k, a, b: (k * k) / a } : null;
      }, rng);

      return {
        seed: 1,
        kysimus: `\\text{Arvuta: } \\sqrt{${a}} \\cdot \\sqrt{${b}}`,
        vastus: { tuup: "arv", ...arvVaartus(k) },
        lahendus: [
          `\\text{Ühendame juurte alla: } \\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{ab}\\text{.}`,
          `\\sqrt{${a}} \\cdot \\sqrt{${b}} = \\sqrt{${a * b}} = ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = int(rng, 3, 12);
      const b = pick(rng, [2, 3, 4, 5, 6]);
      const a = k * k * b;

      return {
        seed: 2,
        kysimus: `\\text{Arvuta: } \\dfrac{\\sqrt{${a}}}{\\sqrt{${b}}}`,
        vastus: { tuup: "arv", ...arvVaartus(k) },
        lahendus: [
          `\\text{Ühendame juurte alla: } \\dfrac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\dfrac{a}{b}}\\text{.}`,
          `\\dfrac{\\sqrt{${a}}}{\\sqrt{${b}}} = \\sqrt{\\dfrac{${a}}{${b}}} = \\sqrt{${a / b}} = ${k}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { k, a, b, c } = redrawUntilNice((r) => {
        const k = int(r, 4, 12);
        const a = pick(r, [2, 3]);
        const b = pick(r, [2, 3].filter((v) => v !== a));
        return (k * k) % (a * b) === 0
          ? { k, a, b, c: (k * k) / (a * b) }
          : null;
      }, rng);

      return {
        seed: 3,
        kysimus: `\\text{Arvuta: } \\sqrt{${a}} \\cdot \\sqrt{${b}} \\cdot \\sqrt{${c}}`,
        vastus: { tuup: "arv", ...arvVaartus(k) },
        lahendus: [
          `\\text{Ühendame kõik juurealused ühe juure alla:}`,
          `\\sqrt{${a}} \\cdot \\sqrt{${b}} \\cdot \\sqrt{${c}} = \\sqrt{${a * b * c}} = ${k}`,
        ],
      };
    },
  },
];
