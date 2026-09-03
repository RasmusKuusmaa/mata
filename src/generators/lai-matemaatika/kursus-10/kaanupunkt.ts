import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "10-kaanupunkt";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const h = int(rng, -9, 9);
      const term = h === 0 ? "x" : h > 0 ? `(x - ${h})` : `(x + ${-h})`;

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = ${term}^3\\text{. Leia funktsiooni graafiku käänupunkti } x\\text{-koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: h },
        lahendus: [
          `f''(x) = 6${term} = 0 \\quad \\Rightarrow \\quad x = ${h}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const m = nonZeroInt(rng, -9, 9);
      const b = 3 * m;
      const c = int(rng, -9, 9);
      const x0 = -m;

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x) = x^3 + ${b}x^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}x\\text{. Leia funktsiooni graafiku käänupunkti } x\\text{-koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: x0 },
        lahendus: [
          `f''(x) = 6x + ${2 * b} = 0 \\quad \\Rightarrow \\quad x = -\\dfrac{${2 * b}}{6} = ${x0}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const m = nonZeroInt(rng, -9, 9);
      const b = -3 * a * m;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^3 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x^2\\text{. Leia funktsiooni graafiku käänupunkti } x\\text{-koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m },
        lahendus: [
          `f''(x) = ${6 * a}x + ${2 * b} = 0 \\quad \\Rightarrow \\quad x = -\\dfrac{${2 * b}}{${6 * a}} = ${m}`,
        ],
      };
    },
  },
];
