import { arvVaartus, niceVectorAnglePair } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-kahe-vektori-nurk-ruumis";

/** Erinevalt sirgetevahelisest nurgast võib vektorite vaheline nurk olla
 * ka nüri — koosinus säilitab oma märgi, ei võeta absoluutväärtust. */
export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { a, b, dot, denom } = niceVectorAnglePair(rng);
      return {
        seed: 1,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${a[0]}, ${a[1]}, ${a[2]}) \\text{ ja } \\vec{b}=(${b[0]}, ${b[1]}, ${b[2]})\\text{. Leia vektorite vahelise nurga koosinus (kordajana).}`,
        vastus: { tuup: "arv", ...arvVaartus(dot, denom) },
        lahendus: [
          `\\cos\\varphi = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|} = \\dfrac{${dot}}{${denom}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a, b, dot } = niceVectorAnglePair(rng);
      const teravnurga = dot > 0;
      return {
        seed: 2,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${a[0]}, ${a[1]}, ${a[2]}) \\text{ ja } \\vec{b}=(${b[0]}, ${b[1]}, ${b[2]})\\text{. Kas vektorite vaheline nurk on teravnurk?}`,
        vastus: { tuup: "valik", oige: teravnurga ? "jah" : "ei", eksitajad: [teravnurga ? "ei" : "jah"] },
        lahendus: [
          `\\vec{a}\\cdot\\vec{b} = ${dot}${teravnurga ? " > 0\\text{ — nurk on teravnurk.}" : " \\le 0\\text{ — nurk ei ole teravnurk.}"}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { a, b, dot } = niceVectorAnglePair(rng);
      return {
        seed: 3,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${a[0]}, ${a[1]}, ${a[2]}) \\text{ ja } \\vec{b}=(${b[0]}, ${b[1]}, ${b[2]})\\text{. Leia } \\vec{a}\\cdot\\vec{b}\\text{ (murru } \\cos\\varphi \\text{ lugeja).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: dot },
        lahendus: [`\\vec{a}\\cdot\\vec{b} = ${dot}`],
      };
    },
  },
];
