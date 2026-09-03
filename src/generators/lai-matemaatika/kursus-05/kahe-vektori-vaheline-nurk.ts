import { arvVaartus, niceTrigTriangle } from "@/generators/nice";
import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-kahe-vektori-vaheline-nurk";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const m = int(rng, 1, 9);
      const { sides } = niceTrigTriangle(rng);
      const [x, y, c] = sides;

      return {
        seed: 1,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${m}, 0) \\text{ ja } \\vec{b}=(${x}, ${y})\\text{. Leia vektoritevahelise nurga koosinus.}`,
        vastus: { tuup: "arv", ...arvVaartus(x, c) },
        lahendus: [
          `\\cos\\varphi = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|} = \\dfrac{${m}\\cdot${x}+0\\cdot${y}}{${m}\\cdot${c}} = \\dfrac{${x}}{${c}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const m = int(rng, 1, 9);
      const { sides } = niceTrigTriangle(rng);
      const [x, y, c] = sides;

      return {
        seed: 2,
        kysimus: `\\text{Vektorid on } \\vec{a}=(0, ${m}) \\text{ ja } \\vec{b}=(${x}, ${y})\\text{. Leia vektoritevahelise nurga koosinus.}`,
        vastus: { tuup: "arv", ...arvVaartus(y, c) },
        lahendus: [
          `\\cos\\varphi = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|} = \\dfrac{0\\cdot${x}+${m}\\cdot${y}}{${m}\\cdot${c}} = \\dfrac{${y}}{${c}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const m = int(rng, 1, 9);
      const { sides } = niceTrigTriangle(rng);
      const [x, y, c] = sides;

      return {
        seed: 3,
        kysimus: `\\text{Vektorid on } \\vec{a}=(-${m}, 0) \\text{ ja } \\vec{b}=(${x}, ${y})\\text{. Leia vektoritevahelise nurga koosinus.}`,
        vastus: { tuup: "arv", ...arvVaartus(-x, c) },
        lahendus: [
          `\\cos\\varphi = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|} = \\dfrac{-${m}\\cdot${x}+0\\cdot${y}}{${m}\\cdot${c}} = -\\dfrac{${x}}{${c}}`,
        ],
      };
    },
  },
];
