import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-liitfunktsioon";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const c = int(rng, -9, 9);
      const x0 = int(rng, -6, 6);
      const inner = x0 + c;
      const value = inner * inner;

      return {
        seed: 1,
        kysimus: `\\text{Olgu } f(x)=x^2 \\text{ ja } g(x)=x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}\\text{. Leia liitfunktsiooni väärtus } f(g(${x0}))\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `g(${x0}) = ${x0} ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${inner}`,
          `f(g(${x0})) = f(${inner}) = ${inner}^2 = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = int(rng, -9, 9);
      const x0 = int(rng, -5, 5);
      const inner = a * x0 + b;
      const value = inner * inner;

      return {
        seed: 2,
        kysimus: `\\text{Olgu } f(x)=${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\text{ ja } g(x)=x^2\\text{. Leia liitfunktsiooni väärtus } g(f(${x0}))\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `f(${x0}) = ${a}\\cdot${x0} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${inner}`,
          `g(f(${x0})) = g(${inner}) = ${inner}^2 = ${value}`,
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
      const b = int(rng, -6, 6);
      const x0 = int(rng, -4, 4);
      const inner = a * x0 + b;
      const value = inner * inner * inner;

      return {
        seed: 3,
        kysimus: `\\text{Liitfunktsioon on } h(x) = (${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)})^3\\text{, mis on esitatav kujul } h(x)=f(g(x))\\text{, kus } g(x)=${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\text{ (sisemine funktsioon) ja } f(x)=x^3 \\text{ (välimine funktsioon). Leia } h(${x0})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `g(${x0}) = ${a}\\cdot${x0} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${inner}`,
          `h(${x0}) = f(g(${x0})) = ${inner}^3 = ${value}`,
        ],
      };
    },
  },
];
