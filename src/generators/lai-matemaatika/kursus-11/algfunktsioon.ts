import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-algfunktsioon";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, -5, 5);
      const n = pick(rng, [1, 2, 3] as const);
      const fCoeff = k * (n + 1);
      const x0 = int(rng, -3, 3);
      const value = k * x0 ** (n + 1);

      return {
        seed: 1,
        kysimus: `\\text{Funktsiooni } f(x) = ${fCoeff}x^{${n}} \\text{ algfunktsioon on } F(x)\\text{, kus } F(0)=0\\text{. Leia } F(${x0})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `F(x) = ${k}x^{${n + 1}} \\text{ (sest } F'(x)=${k}\\cdot${n + 1}x^{${n}}=${fCoeff}x^{${n}}=f(x)\\text{)}`,
          `F(${x0}) = ${k} \\cdot ${x0}^{${n + 1}} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k1 = nonZeroInt(rng, -5, 5);
      const k2 = nonZeroInt(rng, -5, 5);
      const x0 = int(rng, -3, 3);
      const value = k1 * x0 ** 2 + k2 * x0;

      return {
        seed: 2,
        kysimus: `\\text{Funktsiooni } f(x) = ${2 * k1}x + ${k2} \\text{ algfunktsioon on } F(x)\\text{, kus } F(0)=0\\text{. Leia } F(${x0})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `F(x) = ${k1}x^2 + ${k2}x \\text{ (sest } F'(x)=${2 * k1}x+${k2}=f(x)\\text{)}`,
          `F(${x0}) = ${k1}\\cdot${x0}^2 + ${k2}\\cdot${x0} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k1 = nonZeroInt(rng, -4, 4);
      const k2 = nonZeroInt(rng, -4, 4);
      const c = int(rng, -9, 9);
      const x0 = int(rng, -3, 3);
      const value = k1 * x0 ** 3 + k2 * x0 * x0 + c;

      return {
        seed: 3,
        kysimus: `\\text{Funktsiooni } f(x) = ${3 * k1}x^2 + ${2 * k2}x \\text{ algfunktsioon on } F(x)\\text{, kus } F(0)=${c}\\text{. Leia } F(${x0})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `F(x) = ${k1}x^3 + ${k2}x^2 + ${c} \\text{ (sest } F'(x)=${3 * k1}x^2+${2 * k2}x=f(x) \\text{ ja } F(0)=${c}\\text{)}`,
          `F(${x0}) = ${k1}\\cdot${x0}^3 + ${k2}\\cdot${x0}^2 + ${c} = ${value}`,
        ],
      };
    },
  },
];
