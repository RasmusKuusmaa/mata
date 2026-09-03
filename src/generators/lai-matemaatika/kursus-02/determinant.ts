import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "02-determinant";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, -9, 9);
      const b = int(rng, -9, 9);
      const c = int(rng, -9, 9);
      const d = int(rng, -9, 9);
      const tulemus = a * d - b * c;

      return {
        seed: 1,
        kysimus: `\\text{Arvuta determinant: } \\begin{vmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{vmatrix}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc`,
          `${a} \\cdot ${d} - ${b} \\cdot ${c} = ${a * d} - ${b * c} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const m = Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => int(rng, -5, 5)),
      );
      const [[a, b, c], [d, e, f], [g, h, i]] = m;
      const tulemus =
        a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;

      return {
        seed: 2,
        kysimus: `\\text{Arvuta determinant (Sarruse reegel): } \\begin{vmatrix} ${a} & ${b} & ${c} \\\\ ${d} & ${e} & ${f} \\\\ ${g} & ${h} & ${i} \\end{vmatrix}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Sarruse reegel: } aei + bfg + cdh - ceg - bdi - afh`,
          `${a}\\cdot${e}\\cdot${i} + ${b}\\cdot${f}\\cdot${g} + ${c}\\cdot${d}\\cdot${h} - ${c}\\cdot${e}\\cdot${g} - ${b}\\cdot${d}\\cdot${i} - ${a}\\cdot${f}\\cdot${h} = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -8, 8);
      const y = nonZeroInt(rng, -8, 8);
      const a1 = nonZeroInt(rng, 1, 6);
      const b1 = nonZeroInt(rng, 1, 6);
      const a2 = nonZeroInt(rng, 1, 6);
      const b2 = nonZeroInt(rng, 1, 6);
      const c1 = a1 * x + b1 * y;
      const c2 = a2 * x - b2 * y;
      const D = a1 * -b2 - b1 * a2;
      const Dx = c1 * -b2 - b1 * c2;

      return {
        seed: 3,
        kysimus: `\\text{Leia Crameri valemiga } x \\text{, kui:} \\begin{cases} ${a1}x + ${b1}y = ${c1} \\\\ ${a2}x - ${b2}y = ${c2} \\end{cases}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `D = \\begin{vmatrix} ${a1} & ${b1} \\\\ ${a2} & ${-b2} \\end{vmatrix} = ${D}`,
          `D_x = \\begin{vmatrix} ${c1} & ${b1} \\\\ ${c2} & ${-b2} \\end{vmatrix} = ${Dx}`,
          `x = \\dfrac{D_x}{D} = \\dfrac{${Dx}}{${D}} = ${x}`,
        ],
      };
    },
  },
];
