import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-sirge-punkti-ja-tousuga";

/** Formats `varName - a` with correct signs, e.g. `("y", -9)` gives `y+9`. */
function minusTerm(varName: string, a: number): string {
  return a === 0 ? varName : a > 0 ? `${varName}-${a}` : `${varName}+${-a}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x0 = int(rng, -9, 9);
      const y0 = int(rng, -9, 9);
      const k = nonZeroInt(rng, -6, 6);
      const x = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Sirge läbib punkti } (${x0}, ${y0}) \\text{ tõusuga } k=${k}\\text{. Leia } y\\text{, kui } x=${x}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: y0 + k * (x - x0) },
        lahendus: [
          `${minusTerm("y", y0)} = ${k}(${minusTerm("x", x0)})`,
          `y = ${y0} + ${k}\\cdot(${minusTerm(`${x}`, x0)}) = ${y0 + k * (x - x0)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const x0 = int(rng, -9, 9);
      const y0 = int(rng, -9, 9);
      const k = nonZeroInt(rng, -6, 6);
      const dx = int(rng, 1, 5);
      const y = y0 + k * dx;

      return {
        seed: 2,
        kysimus: `\\text{Sirge läbib punkti } (${x0}, ${y0}) \\text{ tõusuga } k=${k}\\text{. Leia } x\\text{, kui } y=${y}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x0 + dx },
        lahendus: [
          `${minusTerm(`${y}`, y0)} = ${k}(${minusTerm("x", x0)}) \\quad \\Rightarrow \\quad ${minusTerm("x", x0)} = ${dx} \\quad \\Rightarrow \\quad x = ${x0 + dx}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x1 = int(rng, -6, 6);
      const y1 = int(rng, -9, 9);
      const x2 = x1 + nonZeroInt(rng, 1, 5);
      const kNum = nonZeroInt(rng, -9, 9);
      const kDen = x2 - x1;
      const y2 = y1 + kNum;

      return {
        seed: 3,
        kysimus: `\\text{Sirge läbib punkte } (${x1}, ${y1}) \\text{ ja } (${x2}, ${y2})\\text{. Leia sirge tõus.}`,
        vastus: { tuup: "arv", ...arvVaartus(kNum, kDen) },
        lahendus: [
          `k = \\dfrac{y_2-y_1}{x_2-x_1} = \\dfrac{${minusTerm(`${y2}`, y1)}}{${minusTerm(`${x2}`, x1)}} = \\dfrac{${kNum}}{${kDen}}`,
        ],
      };
    },
  },
];
