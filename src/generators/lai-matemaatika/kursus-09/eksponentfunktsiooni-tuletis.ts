import { nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-eksponentfunktsiooni-tuletis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const v = nonZeroInt(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Funktsiooni } f(x)=e^x \\text{ tuletis on } f'(x)=e^x\\text{. Teame, et } e^a = ${v}\\text{. Leia } f'(a)\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: v },
        lahendus: [`f'(a) = e^a = ${v}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const v = nonZeroInt(rng, -9, 9);
      const l = nonZeroInt(rng, -5, 5);
      const value = v * l;

      return {
        seed: 2,
        kysimus: `\\text{Funktsiooni } f(x)=a^x \\text{ tuletis on } f'(x)=a^x\\ln a\\text{. Teame, et } a^{x_0} = ${v} \\text{ ja } \\ln a = ${l}\\text{. Leia } f'(x_0)\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `f'(x_0) = a^{x_0} \\ln a = ${v} \\cdot ${l} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, -5, 5);
      const v = nonZeroInt(rng, -9, 9);
      const value = k * v;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x)=e^{${k}x}\\text{. Ahelreegli järgi } f'(x)=${k}e^{${k}x}\\text{. Teame, et } e^{${k}x_0} = ${v}\\text{. Leia } f'(x_0)\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `f'(x_0) = ${k}\\cdot e^{${k}x_0} = ${k} \\cdot ${v} = ${value}`,
        ],
      };
    },
  },
];
