import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "10-kasvamis-ja-kahanemisvahemikud";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      // Boundary x = -b/(2a); pick b as a multiple of 2a to keep it an integer.
      const h = int(rng, -6, 6);
      const bAdjusted = -2 * a * h;
      const oige = a > 0 ? `x > ${h}` : `x < ${h}`;
      const teine = a > 0 ? `x < ${h}` : `x > ${h}`;

      return {
        seed: 1,
        kysimus: `\\text{Funktsiooni } f(x) = ${a}x^2 ${bAdjusted >= 0 ? "+" : "-"} ${Math.abs(bAdjusted)}x \\text{ tuletis on } f'(x) = ${2 * a}x ${bAdjusted >= 0 ? "+" : "-"} ${Math.abs(bAdjusted)}\\text{. Millise } x \\text{ korral funktsioon kasvab?}`,
        vastus: { tuup: "valik", oige, eksitajad: [teine, `x = ${h}`] },
        lahendus: [
          `f'(x) = 0 \\quad \\Rightarrow \\quad x = ${h}`,
          `\\text{Kuna } f'(x) \\text{ kordaja } ${2 * a} \\text{ on } ${a > 0 ? "positiivne" : "negatiivne"}\\text{, kasvab funktsioon, kui } ${oige}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = int(rng, 2, 6);
      const oige = `-${k} < x < ${k}`;

      return {
        seed: 2,
        kysimus: `\\text{Funktsiooni } f(x) = x^3 - ${3 * k * k}x \\text{ tuletis on } f'(x) = 3x^2 - ${3 * k * k} = 3(x-${k})(x+${k})\\text{. Leia vahemik, kus funktsioon kahaneb.}`,
        vastus: {
          tuup: "valik",
          oige,
          eksitajad: [`x < -${k} või x > ${k}`, `x > ${k}`, `x < -${k}`],
        },
        lahendus: [
          `\\text{Tuletis on negatiivne, kui } -${k} < x < ${k}\\text{ (mõlemad tegurid annavad vastasmärgid), seega funktsioon kahaneb sellel vahemikul.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const k = int(rng, 2, 6);
      const oige = `x < -${k} või x > ${k}`;

      return {
        seed: 3,
        kysimus: `\\text{Funktsiooni } f(x) = x^3 - ${3 * k * k}x \\text{ tuletis on } f'(x) = 3x^2 - ${3 * k * k} = 3(x-${k})(x+${k})\\text{. Leia vahemik(ud), kus funktsioon kasvab.}`,
        vastus: {
          tuup: "valik",
          oige,
          eksitajad: [`-${k} < x < ${k}`, `x > ${k}`, `x < -${k}`],
        },
        lahendus: [
          `\\text{Tuletis on positiivne, kui mõlemad tegurid on sama märgiga, ehk } x<-${k} \\text{ või } x>${k}\\text{, seega funktsioon kasvab neil vahemikel.}`,
        ],
      };
    },
  },
];
