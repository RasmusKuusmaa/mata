import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-puutuja-tous";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const p = int(rng, -6, 6);
      let q = int(rng, -6, 6);
      while (q === p) q = int(rng, -6, 6);
      const value = p + q;

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = x^2\\text{. Leia lõikaja tõus punktide } (${p}, f(${p})) \\text{ ja } (${q}, f(${q})) \\text{ vahel.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Lõikaja tõus: } \\dfrac{f(${q})-f(${p})}{${q}-${p}} = \\dfrac{${q * q}-${p * p}}{${q}-${p}} = \\dfrac{(${q}-${p})(${q}+${p})}{${q}-${p}} = ${q}+${p} = ${value}`,
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
      const p = int(rng, -5, 5);
      let q = int(rng, -5, 5);
      while (q === p) q = int(rng, -5, 5);
      const value = a * (p + q) + b;

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x\\text{. Leia lõikaja tõus punktide, mille } x\\text{-koordinaadid on } ${p} \\text{ ja } ${q}\\text{, vahel.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Lõikaja tõus: } \\dfrac{f(${q})-f(${p})}{${q}-${p}} = ${a}(${p}+${q}) + ${b} = ${value}`,
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
      const b = int(rng, -9, 9);
      const x0 = int(rng, -6, 6);
      const value = 2 * a * x0 + b;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = ${a}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x\\text{. Kui lõikaja teine punkt läheneb punktile } x=${x0}\\text{, läheneb lõikaja tõus puutuja tõusule. Leia puutuja tõus kohal } x=${x0}\\text{ (tuletise abil).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Puutuja tõus on tuletis: } f'(x) = ${2 * a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`,
          `f'(${x0}) = ${2 * a} \\cdot ${x0} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${value}`,
        ],
      };
    },
  },
];
