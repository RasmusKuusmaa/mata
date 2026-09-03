import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-newtoni-leibnizi-valem";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, -5, 5);
      const a = int(rng, -3, 3);
      let b = int(rng, -3, 3);
      while (b === a) b = int(rng, -3, 3);
      const Fa = k * a * a;
      const Fb = k * b * b;
      const value = Fb - Fa;

      return {
        seed: 1,
        kysimus: `\\text{Leia } \\displaystyle\\int_{${a}}^{${b}} ${2 * k}x\\,dx \\text{ Newtoni-Leibnizi valemi abil.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Algfunktsioon: } F(x) = ${k}x^2`,
          `\\displaystyle\\int_{${a}}^{${b}} ${2 * k}x\\,dx = F(${b})-F(${a}) = ${Fb} - ${Fa} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const m = nonZeroInt(rng, -5, 5);
      const c = int(rng, -9, 9);
      const a = int(rng, -3, 3);
      let b = int(rng, -3, 3);
      while (b === a) b = int(rng, -3, 3);
      const Fa = m * a * a + c * a;
      const Fb = m * b * b + c * b;
      const value = Fb - Fa;

      return {
        seed: 2,
        kysimus: `\\text{Leia } \\displaystyle\\int_{${a}}^{${b}} (${2 * m}x + ${c})\\,dx \\text{ Newtoni-Leibnizi valemi abil.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Algfunktsioon: } F(x) = ${m}x^2 + ${c}x`,
          `\\displaystyle\\int_{${a}}^{${b}} (${2 * m}x + ${c})\\,dx = F(${b})-F(${a}) = ${Fb} - ${Fa} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const p = nonZeroInt(rng, -4, 4);
      const q = nonZeroInt(rng, -4, 4);
      const a = int(rng, -3, 3);
      let b = int(rng, -3, 3);
      while (b === a) b = int(rng, -3, 3);
      const Fa = p * a ** 3 + q * a * a;
      const Fb = p * b ** 3 + q * b * b;
      const value = Fb - Fa;

      return {
        seed: 3,
        kysimus: `\\text{Leia } \\displaystyle\\int_{${a}}^{${b}} (${3 * p}x^2 + ${2 * q}x)\\,dx \\text{ Newtoni-Leibnizi valemi abil.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Algfunktsioon: } F(x) = ${p}x^3 + ${q}x^2`,
          `\\displaystyle\\int_{${a}}^{${b}} (${3 * p}x^2 + ${2 * q}x)\\,dx = F(${b})-F(${a}) = ${Fb} - ${Fa} = ${value}`,
        ],
      };
    },
  },
];
