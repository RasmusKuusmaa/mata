import { arvVaartus, niceVectorAnglePair } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-nurk-kahe-sirge-vahel";

/** Nurk kahe sirge vahel on alati teravnurk (või täisnurk) — koosinuse
 * absoluutväärtus, sõltumata sihivektorite suunast. */
export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { a, b, dot, denom } = niceVectorAnglePair(rng);
      return {
        seed: 1,
        kysimus: `\\text{Sirgete sihivektorid on } \\vec{a}=(${a[0]}, ${a[1]}, ${a[2]}) \\text{ ja } \\vec{b}=(${b[0]}, ${b[1]}, ${b[2]})\\text{. Leia nurga koosinus (kordajana).}`,
        vastus: { tuup: "arv", ...arvVaartus(Math.abs(dot), denom) },
        lahendus: [
          `\\cos\\varphi = \\dfrac{|\\vec{a}\\cdot\\vec{b}|}{|\\vec{a}||\\vec{b}|} = \\dfrac{|${dot}|}{${denom}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a, b, dot, denom } = niceVectorAnglePair(rng);
      return {
        seed: 2,
        kysimus: `\\text{Sirge } l_1 \\text{ läbib punkte suunavektoriga } \\vec{a}=(${a[0]}, ${a[1]}, ${a[2]}) \\text{ ja sirge } l_2 \\text{ suunavektoriga } \\vec{b}=(${b[0]}, ${b[1]}, ${b[2]})\\text{. Leia nurga } \\varphi \\text{ koosinus.}`,
        vastus: { tuup: "arv", ...arvVaartus(Math.abs(dot), denom) },
        lahendus: [
          `\\vec{a}\\cdot\\vec{b} = ${dot}\\text{, } |\\vec{a}||\\vec{b}| = ${denom}`,
          `\\cos\\varphi = \\dfrac{|${dot}|}{${denom}}`,
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
      const isPerp = dot === 0;
      return {
        seed: 3,
        kysimus: `\\text{Sirgete sihivektorid on } \\vec{a}=(${a[0]}, ${a[1]}, ${a[2]}) \\text{ ja } \\vec{b}=(${b[0]}, ${b[1]}, ${b[2]})\\text{. Kas sirged on ristsirged?}`,
        vastus: { tuup: "valik", oige: isPerp ? "jah" : "ei", eksitajad: [isPerp ? "ei" : "jah"] },
        lahendus: [
          `\\vec{a}\\cdot\\vec{b} = ${dot}${isPerp ? "\\text{ — sirged on ristsirged.}" : "\\ne 0\\text{ — sirged ei ole ristsirged.}"}`,
        ],
      };
    },
  },
];
