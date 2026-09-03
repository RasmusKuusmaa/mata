import { int } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "01-tehted-astmetega";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 2, 5);
      const m = int(rng, 1, 3);
      const n = int(rng, 1, 3);
      const p = int(rng, 0, m + n);
      const netoAstendaja = m + n - p;
      const tulemus = a ** netoAstendaja;

      return {
        seed: 1,
        kysimus: `\\text{Arvuta: } \\dfrac{${a}^${m} \\cdot ${a}^${n}}{${a}^${p}}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Liidame korrutamisel astendajad ja lahutame jagamisel:}`,
          `\\dfrac{${a}^${m} \\cdot ${a}^${n}}{${a}^${p}} = ${a}^{${m}+${n}-${p}} = ${a}^{${netoAstendaja}} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 2, 6);
      const b = int(rng, 2, 6);
      const n = int(rng, 2, 3);
      const tulemus = (a * b) ** n;

      return {
        seed: 2,
        kysimus: `\\text{Arvuta: } (${a} \\cdot ${b})^${n}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Korrutise aste on tegurite astmete korrutis: } (ab)^n = a^n \\cdot b^n\\text{.}`,
          `(${a} \\cdot ${b})^${n} = ${a}^${n} \\cdot ${b}^${n} = ${a ** n} \\cdot ${b ** n} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 2, 4);
      const m = int(rng, 2, 3);
      const n = int(rng, 2, 3);
      const p = int(rng, 0, m * n);
      const netoAstendaja = m * n - p;
      const tulemus = a ** netoAstendaja;

      return {
        seed: 3,
        kysimus: `\\text{Arvuta: } \\dfrac{(${a}^${m})^${n}}{${a}^${p}}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Astendame esmalt astme ja seejärel lahutame jagamisel astendajad:}`,
          `\\dfrac{(${a}^${m})^${n}}{${a}^${p}} = \\dfrac{${a}^{${m * n}}}{${a}^${p}} = ${a}^{${netoAstendaja}} = ${tulemus}`,
        ],
      };
    },
  },
];
