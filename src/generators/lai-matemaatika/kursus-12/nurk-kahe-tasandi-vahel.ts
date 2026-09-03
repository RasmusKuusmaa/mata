import { arvVaartus, niceVectorAnglePair } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-nurk-kahe-tasandi-vahel";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { a: n1, b: n2, dot, denom } = niceVectorAnglePair(rng);
      return {
        seed: 1,
        kysimus: `\\text{Tasandite normaalvektorid on } \\vec{n_1}=(${n1[0]}, ${n1[1]}, ${n1[2]}) \\text{ ja } \\vec{n_2}=(${n2[0]}, ${n2[1]}, ${n2[2]})\\text{. Leia tasanditevahelise nurga koosinus (kordajana).}`,
        vastus: { tuup: "arv", ...arvVaartus(Math.abs(dot), denom) },
        lahendus: [
          `\\cos\\varphi = \\dfrac{|\\vec{n_1}\\cdot\\vec{n_2}|}{|\\vec{n_1}||\\vec{n_2}|} = \\dfrac{|${dot}|}{${denom}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a: n1, b: n2, dot } = niceVectorAnglePair(rng);
      const isPerp = dot === 0;
      return {
        seed: 2,
        kysimus: `\\text{Tasandite normaalvektorid on } \\vec{n_1}=(${n1[0]}, ${n1[1]}, ${n1[2]}) \\text{ ja } \\vec{n_2}=(${n2[0]}, ${n2[1]}, ${n2[2]})\\text{. Kas tasandid on risti?}`,
        vastus: { tuup: "valik", oige: isPerp ? "jah" : "ei", eksitajad: [isPerp ? "ei" : "jah"] },
        lahendus: [
          `\\vec{n_1}\\cdot\\vec{n_2} = ${dot}${isPerp ? "\\text{ — tasandid on risti.}" : "\\ne 0\\text{ — tasandid ei ole risti.}"}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { a: n1, b: n2, denom } = niceVectorAnglePair(rng);
      return {
        seed: 3,
        kysimus: `\\text{Tasandite normaalvektorid on } \\vec{n_1}=(${n1[0]}, ${n1[1]}, ${n1[2]}) \\text{ ja } \\vec{n_2}=(${n2[0]}, ${n2[1]}, ${n2[2]})\\text{. Leia } |\\vec{n_1}||\\vec{n_2}|\\text{ (murru } \\cos\\varphi \\text{ nimetaja).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: denom },
        lahendus: [
          `|\\vec{n_1}||\\vec{n_2}| = ${denom}`,
        ],
      };
    },
  },
];
