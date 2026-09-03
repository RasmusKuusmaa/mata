import { alus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-korrutise-tuletis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const p = int(rng, -6, 6);
      const m = int(rng, -6, 6);
      const q = int(rng, -6, 6);
      const n = int(rng, -6, 6);
      const value = m * q + p * n;

      return {
        seed: 1,
        kysimus: `\\text{Teame, et } f(a)=${p}\\text{, } f'(a)=${m}\\text{, } g(a)=${q} \\text{ ja } g'(a)=${n}\\text{. Leia } (fg)'(a)\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `(fg)'(a) = f'(a)g(a) + f(a)g'(a)`,
          `(fg)'(a) = ${m}\\cdot${q} + ${p}\\cdot${n} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const b = nonZeroInt(rng, -5, 5);
      const c = int(rng, -9, 9);
      const x0 = int(rng, -5, 5);
      const value = 2 * a * b * x0 + a * c;

      return {
        seed: 2,
        kysimus: `\\text{Olgu } f(x)=${a}x \\text{ ja } g(x)=${b}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}\\text{. Leia } (fg)'(${x0}) \\text{ korrutise tuletise valemi abil.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `(fg)'(x) = f'(x)g(x) + f(x)g'(x) = ${a}(${b}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}) + ${a}x \\cdot ${b}`,
          `(fg)'(${x0}) = ${a}\\cdot(${b}\\cdot${x0} ${c >= 0 ? "+" : "-"} ${Math.abs(c)}) + ${a}\\cdot${x0}\\cdot${b} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -4, 4);
      const b = nonZeroInt(rng, -4, 4);
      const x0 = int(rng, -4, 4);
      const value = 3 * a * b * x0 * x0;

      return {
        seed: 3,
        kysimus: `\\text{Olgu } f(x)=${a}x^2 \\text{ ja } g(x)=${b}x\\text{. Leia } (fg)'(${x0}) \\text{ korrutise tuletise valemi abil.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `(fg)'(x) = f'(x)g(x) + f(x)g'(x) = ${2 * a}x \\cdot ${b}x + ${a}x^2 \\cdot ${b} = ${3 * a * b}x^2`,
          `(fg)'(${x0}) = ${3 * a * b} \\cdot ${alus(x0)}^2 = ${value}`,
        ],
      };
    },
  },
];
