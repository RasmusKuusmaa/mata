import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-poordfunktsioon";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 5] as const);
      const k = int(rng, 1, 4);
      const y = a ** k;

      return {
        seed: 1,
        kysimus: `\\text{Funktsiooni } f(x) = ${a}^x \\text{ pöördfunktsioon on } f^{-1}(x) = \\log_{${a}} x\\text{. Leia } f^{-1}(${y})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [`f^{-1}(${y}) = \\log_{${a}} ${y} = ${k}\\text{, sest } ${a}^{${k}} = ${y}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3] as const);
      const y = int(rng, 1, 4);
      const value = a ** y;

      return {
        seed: 2,
        kysimus: `\\text{Funktsiooni } g(x) = \\log_{${a}} x \\text{ pöördfunktsioon on } g^{-1}(x) = ${a}^x\\text{. Leia } g^{-1}(${y})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [`g^{-1}(${y}) = ${a}^{${y}} = ${value}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = int(rng, -9, 9);
      const v = int(rng, -9, 9);

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon } f \\text{ on pööratav ja } f(${k}) = ${v}\\text{. Leia } f^{-1}(${v})\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k },
        lahendus: [
          `\\text{Pöördfunktsiooni definitsiooni järgi: kui } f(${k})=${v}\\text{, siis } f^{-1}(${v})=${k}\\text{.}`,
        ],
      };
    },
  },
];
