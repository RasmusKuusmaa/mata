import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "10-funktsiooni-tailielik-uurimine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const h = int(rng, -9, 9);
      const m = int(rng, -9, 9);
      const term = h === 0 ? "x" : h > 0 ? `(x - ${h})` : `(x + ${-h})`;

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = ${term}^3 ${m >= 0 ? "+" : "-"} ${Math.abs(m)}\\text{. Funktsiooni käänupunkti } x\\text{-koordinaat on } ${h}\\text{. Leia funktsiooni väärtus käänupunktis.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m },
        lahendus: [
          `f(${h}) = 0^3 ${m >= 0 ? "+" : "-"} ${Math.abs(m)} = ${m}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const h = int(rng, -6, 6);
      const k = nonZeroInt(rng, -9, 9);
      const m = int(rng, -9, 9);
      const term = h === 0 ? "x" : h > 0 ? `(x - ${h})` : `(x + ${-h})`;

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x) = ${term}^3 ${k >= 0 ? "+" : "-"} ${Math.abs(k)}${term} ${m >= 0 ? "+" : "-"} ${Math.abs(m)}\\text{. Funktsiooni käänupunkti } x\\text{-koordinaat on } ${h}\\text{. Leia funktsiooni väärtus käänupunktis.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m },
        lahendus: [
          `f(${h}) = 0^3 ${k >= 0 ? "+" : "-"} ${Math.abs(k)}\\cdot0 ${m >= 0 ? "+" : "-"} ${Math.abs(m)} = ${m}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const h = nonZeroInt(rng, -6, 6);
      const b = -3 * h;
      const c = nonZeroInt(rng, -9, 9);
      const d = int(rng, -9, 9);
      const value = h ** 3 + b * h * h + c * h + d;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = x^3 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}x ${d >= 0 ? "+" : "-"} ${Math.abs(d)}\\text{. Leia esmalt käänupunkti } x\\text{-koordinaat (} f''(x)=0\\text{), seejärel funktsiooni väärtus seal.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `f''(x) = 6x + ${2 * b} = 0 \\quad \\Rightarrow \\quad x = ${h}`,
          `f(${h}) = ${h}^3 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}\\cdot${h}^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}\\cdot${h} ${d >= 0 ? "+" : "-"} ${Math.abs(d)} = ${value}`,
        ],
      };
    },
  },
];
