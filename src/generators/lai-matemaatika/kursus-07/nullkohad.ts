import { arvVaartus, factorableQuadratic } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { ArvVaartus, Generaator } from "@/generators/types";

const TEEMA_ID = "07-nullkohad";

/** Formats `a·x² + b·x + c` with correct signs (no ` = 0`). */
function ruutAvaldis(a: number, b: number, c: number): string {
  const aTerm = a === 1 ? "x^2" : a === -1 ? "-x^2" : `${a}x^2`;
  const bTerm = b === 0 ? "" : ` ${b > 0 ? "+" : "-"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x`;
  const cTerm = c === 0 ? "" : ` ${c > 0 ? "+" : "-"} ${Math.abs(c)}`;
  return `${aTerm}${bTerm}${cTerm}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const r = int(rng, -9, 9);
      const b = -a * r;

      return {
        seed: 1,
        kysimus: `\\text{Leia funktsiooni } f(x) = ${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\text{ nullkoht.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: r },
        lahendus: [
          `${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = 0 \\quad \\Rightarrow \\quad x = ${r}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a, b, c, roots } = factorableQuadratic(rng);
      const vaartused: ArvVaartus[] = roots.map((r) => arvVaartus(r));

      return {
        seed: 2,
        kysimus: `\\text{Leia funktsiooni } f(x) = ${ruutAvaldis(a, b, c)} \\text{ nullkohad.}`,
        vastus: { tuup: "hulk", vaartused },
        lahendus: [
          `\\text{Tegurdame: } ${ruutAvaldis(a, b, c)} = 0 \\quad \\Rightarrow \\quad x_1 = ${roots[0]}\\text{, } x_2 = ${roots[1]}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { a, b, c, roots } = factorableQuadratic(rng);
      const sum = roots[0] + roots[1];

      return {
        seed: 3,
        kysimus: `\\text{Funktsiooni } f(x) = ${ruutAvaldis(a, b, c)} \\text{ nullkohad on } x_1 \\text{ ja } x_2\\text{. Leia } x_1 + x_2 \\text{ Vieté valemi abil (ilma nullkohti eraldi leidmata).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: sum },
        lahendus: [
          `\\text{Vieté valemi järgi } x_1+x_2 = -\\dfrac{b}{a} = -\\dfrac{${b}}{${a}} = ${sum}`,
        ],
      };
    },
  },
];
