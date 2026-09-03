import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-kovertrapets";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const c = int(rng, 2, 15);
      const a = int(rng, 0, 5);
      const b = a + int(rng, 1, 8);
      const value = c * (b - a);

      return {
        seed: 1,
        kysimus: `\\text{Funktsioon on } f(x) = ${c} \\text{ (konstantne). Leia kõvertrapetsi pindala lõigul } [${a}, ${b}]\\text{ (ristküliku pindalana).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Kõvertrapets on siin ristkülik: pindala} = ${c} \\cdot (${b}-${a}) = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const m = nonZeroInt(rng, 1, 5);
      const b = int(rng, 1, 8);

      return {
        seed: 2,
        kysimus: `\\text{Funktsioon on } f(x) = ${m}x\\text{. Leia kõvertrapetsi pindala lõigul } [0, ${b}]\\text{ (kolmnurga pindalana).}`,
        vastus: { tuup: "arv", ...arvVaartus(m * b * b, 2) },
        lahendus: [
          `\\text{Kõvertrapets on siin kolmnurk alusega } ${b} \\text{ ja kõrgusega } f(${b})=${m * b}\\text{:}`,
          `\\text{pindala} = \\dfrac{1}{2}\\cdot${b}\\cdot${m * b} = \\dfrac{${m * b * b}}{2}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const m = nonZeroInt(rng, 1, 4);
      const c = int(rng, 1, 9);
      const a = int(rng, 0, 4);
      const b = a + int(rng, 1, 6);
      const fa = m * a + c;
      const fb = m * b + c;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = ${m}x + ${c}\\text{. Leia kõvertrapetsi pindala lõigul } [${a}, ${b}] \\text{ (trapetsi pindala valemiga).}`,
        vastus: { tuup: "arv", ...arvVaartus((fa + fb) * (b - a), 2) },
        lahendus: [
          `f(${a})=${fa}\\text{, } f(${b})=${fb}`,
          `\\text{pindala} = \\dfrac{f(${a})+f(${b})}{2}\\cdot(${b}-${a}) = \\dfrac{${fa}+${fb}}{2}\\cdot${b - a} = \\dfrac{${(fa + fb) * (b - a)}}{2}`,
        ],
      };
    },
  },
];
