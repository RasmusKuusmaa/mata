import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-arvjada-piirvaartus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const p = nonZeroInt(rng, -9, 9);
      const r = nonZeroInt(rng, -9, 9);
      const q = int(rng, 2, 8);

      return {
        seed: 1,
        kysimus: `\\text{Leia jada piirväärtus, kui } n \\to \\infty\\text{: } a_n = \\dfrac{${p}n ${r >= 0 ? "+" : "-"} ${Math.abs(r)}}{${q}n}`,
        vastus: { tuup: "arv", ...arvVaartus(p, q) },
        lahendus: [
          `\\text{Jagame lugeja ja nimetaja suurima astmega } n\\text{:}`,
          `a_n = \\dfrac{${p} + \\frac{${r}}{n}}{${q}} \\to \\dfrac{${p}}{${q}} \\text{, kui } n \\to \\infty`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const p = nonZeroInt(rng, -9, 9);
      const r = nonZeroInt(rng, -9, 9);
      const q = int(rng, 2, 8);
      const s = nonZeroInt(rng, -9, 9);

      return {
        seed: 2,
        kysimus: `\\text{Leia jada piirväärtus, kui } n \\to \\infty\\text{: } a_n = \\dfrac{${p}n ${r >= 0 ? "+" : "-"} ${Math.abs(r)}}{${q}n ${s >= 0 ? "+" : "-"} ${Math.abs(s)}}`,
        vastus: { tuup: "arv", ...arvVaartus(p, q) },
        lahendus: [
          `\\text{Jagame lugeja ja nimetaja suurima astmega } n\\text{:}`,
          `a_n = \\dfrac{${p} + \\frac{${r}}{n}}{${q} + \\frac{${s}}{n}} \\to \\dfrac{${p}}{${q}} \\text{, kui } n \\to \\infty`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const p = nonZeroInt(rng, -9, 9);
      const r = nonZeroInt(rng, -9, 9);
      const q = int(rng, 2, 8);
      const s = nonZeroInt(rng, -9, 9);

      return {
        seed: 3,
        kysimus: `\\text{Leia jada piirväärtus, kui } n \\to \\infty\\text{: } a_n = \\dfrac{${p}n^2 ${r >= 0 ? "+" : "-"} ${Math.abs(r)}n}{${q}n^2 ${s >= 0 ? "+" : "-"} ${Math.abs(s)}}`,
        vastus: { tuup: "arv", ...arvVaartus(p, q) },
        lahendus: [
          `\\text{Jagame lugeja ja nimetaja suurima astmega } n^2\\text{:}`,
          `a_n = \\dfrac{${p} + \\frac{${r}}{n}}{${q} + \\frac{${s}}{n^2}} \\to \\dfrac{${p}}{${q}} \\text{, kui } n \\to \\infty`,
        ],
      };
    },
  },
];
