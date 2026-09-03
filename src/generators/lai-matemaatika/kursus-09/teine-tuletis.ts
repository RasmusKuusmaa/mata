import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-teine-tuletis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = int(rng, -9, 9);
      const c = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}\\text{. Leia teine tuletis } f''(x)\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 2 * a },
        lahendus: [
          `f'(x) = ${2 * a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`,
          `f''(x) = ${2 * a} \\text{ (konstant)}`,
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
      const b = int(rng, -9, 9);
      const x0 = int(rng, -5, 5);
      const value = 6 * a * x0 + 2 * b;

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^3 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x^2\\text{. Leia } f''(${x0})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `f'(x) = ${3 * a}x^2 ${2 * b >= 0 ? "+" : "-"} ${Math.abs(2 * b)}x`,
          `f''(x) = ${6 * a}x ${2 * b >= 0 ? "+" : "-"} ${Math.abs(2 * b)}`,
          `f''(${x0}) = ${6 * a} \\cdot ${x0} ${2 * b >= 0 ? "+" : "-"} ${Math.abs(2 * b)} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -3, 3);
      const b = int(rng, -6, 6);
      const c = int(rng, -9, 9);
      const x0 = int(rng, -4, 4);
      const value = 12 * a * x0 * x0 + 6 * b * x0 + 2 * c;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^4 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x^3 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}x^2\\text{. Leia } f''(${x0})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `f'(x) = ${4 * a}x^3 ${3 * b >= 0 ? "+" : "-"} ${Math.abs(3 * b)}x^2 ${2 * c >= 0 ? "+" : "-"} ${Math.abs(2 * c)}x`,
          `f''(x) = ${12 * a}x^2 ${6 * b >= 0 ? "+" : "-"} ${Math.abs(6 * b)}x ${2 * c >= 0 ? "+" : "-"} ${Math.abs(2 * c)}`,
          `f''(${x0}) = ${12 * a} \\cdot ${x0}^2 ${6 * b >= 0 ? "+" : "-"} ${Math.abs(6 * b)} \\cdot ${x0} ${2 * c >= 0 ? "+" : "-"} ${Math.abs(2 * c)} = ${value}`,
        ],
      };
    },
  },
];
