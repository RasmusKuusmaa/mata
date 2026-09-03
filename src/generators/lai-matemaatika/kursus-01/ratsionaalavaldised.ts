import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus, reduceFraction } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "01-ratsionaalavaldiste-teisendamine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      // c·x^a / d·x^b, a > b, simplifies to (c/d)·x^(a-b).
      const b = int(rng, 1, 3);
      const a = b + int(rng, 1, 3);
      const [koefC, koefD] = (() => {
        const koef1 = nonZeroInt(rng, 1, 9);
        const kordaja = int(rng, 1, 4);
        return [koef1 * kordaja, koef1];
      })();
      const [licoefN] = reduceFraction(koefC, koefD);
      const x = int(rng, -4, 4);
      const uusAstendaja = a - b;
      const tulemus = licoefN * x ** uusAstendaja;

      return {
        seed: 1,
        kysimus: `\\text{Lihtsusta avaldis } \\dfrac{${koefC}x^${a}}{${koefD}x^${b}} \\text{ ja arvuta selle väärtus, kui } x = ${x}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Jagame kordajad ja lahutame astendajad:}`,
          `\\dfrac{${koefC}x^${a}}{${koefD}x^${b}} = ${licoefN === 1 ? "" : licoefN}x^{${uusAstendaja}}`,
          `${licoefN === 1 ? "" : `${licoefN} \\cdot `}(${x})^{${uusAstendaja}} = ${tulemus}\\text{, kui } x = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      // (x² - a²) / (x - a) = x + a (difference of squares).
      const a = int(rng, 2, 9);
      const x = (() => {
        let v: number;
        do {
          v = int(rng, -6, 6);
        } while (v === a);
        return v;
      })();
      const tulemus = x + a;

      return {
        seed: 2,
        kysimus: `\\text{Lihtsusta avaldis } \\dfrac{x^2 - ${a * a}}{x - ${a}} \\text{ ja arvuta selle väärtus, kui } x = ${x}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Lugeja on kahe ruudu vahe: } x^2 - ${a * a} = (x-${a})(x+${a})\\text{.}`,
          `\\dfrac{(x-${a})(x+${a})}{x - ${a}} = x + ${a}`,
          `x + ${a} = ${x} + ${a} = ${tulemus}\\text{, kui } x = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      // Monic quadratic x² + bx + c = (x - r1)(x - r2) — hand-rolled rather
      // than factorableQuadratic, which sometimes uses a leading
      // coefficient other than 1 that this display doesn't account for.
      const r1 = nonZeroInt(rng, -9, 9);
      const r2 = (() => {
        let v: number;
        do {
          v = nonZeroInt(rng, -9, 9);
        } while (v === r1);
        return v;
      })();
      const b = -(r1 + r2);
      const c = r1 * r2;
      const x = (() => {
        let v: number;
        do {
          v = int(rng, -6, 6);
        } while (v === r1);
        return v;
      })();
      const tulemus = x - r2;
      const bSign = b >= 0 ? "+" : "-";
      const cSign = c >= 0 ? "+" : "-";
      const r1Sign = r1 >= 0 ? "-" : "+";

      return {
        seed: 3,
        kysimus: `\\text{Lihtsusta avaldis } \\dfrac{x^2 ${bSign} ${Math.abs(b)}x ${cSign} ${Math.abs(c)}}{x ${r1Sign} ${Math.abs(r1)}} \\text{ ja arvuta selle väärtus, kui } x = ${x}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Tegurdame ruutkolmliikme: selle nullkohad on } ${r1} \\text{ ja } ${r2}\\text{.}`,
          `\\dfrac{(x - ${r1})(x - ${r2})}{x - ${r1}} = x - ${r2}`,
          `x - ${r2} = ${x} - (${r2}) = ${tulemus}\\text{, kui } x = ${x}`,
        ],
      };
    },
  },
];
