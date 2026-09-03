import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-ringjoone-vorrand";

/** Formats `x - a` with correct signs, e.g. `a=-3` gives `x + 3`, `a=0` gives `x`. */
function xMinus(varName: string, a: number): string {
  return a === 0 ? varName : a > 0 ? `${varName}-${a}` : `${varName}+${-a}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, -9, 9);
      const b = int(rng, -9, 9);
      const r = int(rng, 2, 12);

      return {
        seed: 1,
        kysimus: `\\text{Ringjoone keskpunkt on } (${a}, ${b}) \\text{ ja raadius } ${r}\\text{. Leia ringjoone võrrandi parem pool (} (${xMinus("x", a)})^2+(${xMinus("y", b)})^2=? \\text{).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: r * r },
        lahendus: [
          `(${xMinus("x", a)})^2+(${xMinus("y", b)})^2 = ${r}^2 = ${r * r}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, -9, 9);
      const b = int(rng, -9, 9);
      const r = int(rng, 2, 12);

      return {
        seed: 2,
        kysimus: `\\text{Ringjoone võrrand on } (${xMinus("x", a)})^2+(${xMinus("y", b)})^2=${r * r}\\text{. Leia raadius.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: r },
        lahendus: [
          `r = \\sqrt{${r * r}} = ${r}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -9, 9);
      const b = nonZeroInt(rng, -9, 9);
      const r = int(rng, 2, 10);
      const D = -2 * a;
      const E = -2 * b;
      const F = a * a + b * b - r * r;

      return {
        seed: 3,
        kysimus: `\\text{Ringjoone üldvõrrand on } x^2+y^2 ${D >= 0 ? "+" : "-"} ${Math.abs(D)}x ${E >= 0 ? "+" : "-"} ${Math.abs(E)}y ${F >= 0 ? "+" : "-"} ${Math.abs(F)} = 0\\text{. Leia keskpunkti } x\\text{-koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a },
        lahendus: [
          `\\text{Täiendades ruuduks: } x^2 ${D >= 0 ? "+" : "-"} ${Math.abs(D)}x = (${xMinus("x", a)})^2 - ${a * a}`,
          `\\text{Keskpunkti } x\\text{-koordinaat on } ${a}`,
        ],
      };
    },
  },
];
