import { alus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-tuletise-geomeetriline-tahendus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const x0 = int(rng, -6, 6);

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x\\text{. Leia funktsiooni graafiku puutuja tõus kohal } x=${x0}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a },
        lahendus: [
          `\\text{Sirge puutuja on sirge ise, tõus on } f'(x) = ${a} \\text{ igas punktis.}`,
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
      const value = 2 * a * x0 + b;

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x\\text{. Leia funktsiooni graafiku puutuja tõus kohal } x=${x0}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Puutuja tõus on tuletis: } f'(x) = ${2 * a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`,
          `f'(${x0}) = ${2 * a} \\cdot ${x0} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${value}`,
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
      const value = 3 * a * x0 * x0 + 2 * b * x0 + c;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^3 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}x\\text{. Leia funktsiooni graafiku puutuja tõus kohal } x=${x0}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `f'(x) = ${3 * a}x^2 ${2 * b >= 0 ? "+" : "-"} ${Math.abs(2 * b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`,
          `f'(${x0}) = ${3 * a} \\cdot ${alus(x0)}^2 ${2 * b >= 0 ? "+" : "-"} ${Math.abs(2 * b)} \\cdot ${x0} ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${value}`,
        ],
      };
    },
  },
];
