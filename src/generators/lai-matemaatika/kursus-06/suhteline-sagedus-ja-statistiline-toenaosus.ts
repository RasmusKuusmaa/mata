import { arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-suhteline-sagedus-ja-statistiline-toenaosus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const q = int(rng, 4, 10);
      const p = int(rng, 1, q - 1);
      const scale = int(rng, 2, 5);
      const total = q * scale;
      const count = p * scale;

      return {
        seed: 1,
        kysimus: `\\text{Münti visati } ${total} \\text{ korda ja kiri tuli } ${count} \\text{ korral. Leia kirja suhteline sagedus.}`,
        vastus: { tuup: "arv", ...arvVaartus(count, total) },
        lahendus: [
          `\\text{Suhteline sagedus} = \\dfrac{\\text{soodsate katsete arv}}{\\text{katsete koguarv}} = \\dfrac{${count}}{${total}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const q = int(rng, 5, 12);
      const p = int(rng, 1, q - 1);
      const scale = int(rng, 4, 10);
      const total = q * scale;
      const count = p * scale;

      return {
        seed: 2,
        kysimus: `\\text{Toodangust kontrolliti } ${total} \\text{ eset, millest } ${count} \\text{ oli praak. Leia praagi statistiline tõenäosus.}`,
        vastus: { tuup: "arv", ...arvVaartus(count, total) },
        lahendus: [
          `P \\approx \\dfrac{${count}}{${total}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const total = 12 * int(rng, 9, 25);
      const p = int(rng, 1, 11);
      const count = (total * p) / 12;

      return {
        seed: 3,
        kysimus: `\\text{Katse viidi läbi } ${total} \\text{ korda ja sündmuse suhteline sagedus oli } \\dfrac{${p}}{12}\\text{. Mitmel korral sündmus toimus?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: count },
        lahendus: [
          `\\text{Katsete arv} = \\dfrac{${p}}{12} \\cdot ${total} = ${count}`,
        ],
      };
    },
  },
];
