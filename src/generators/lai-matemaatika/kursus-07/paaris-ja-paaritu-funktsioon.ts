import { nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-paaris-ja-paaritu-funktsioon";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const c = nonZeroInt(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Kas funktsioon } f(x) = ${a}x^2 + ${c} \\text{ on paaris, paaritu või ei kumbki?}`,
        vastus: { tuup: "valik", oige: "paaris", eksitajad: ["paaritu", "ei ole kumbki"] },
        lahendus: [
          `f(-x) = ${a}(-x)^2 + ${c} = ${a}x^2 + ${c} = f(x)\\text{, seega funktsioon on paaris.}`,
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
      const b = nonZeroInt(rng, -9, 9);

      return {
        seed: 2,
        kysimus: `\\text{Kas funktsioon } f(x) = ${a}x^3 + ${b}x \\text{ on paaris, paaritu või ei kumbki?}`,
        vastus: { tuup: "valik", oige: "paaritu", eksitajad: ["paaris", "ei ole kumbki"] },
        lahendus: [
          `f(-x) = ${a}(-x)^3 + ${b}(-x) = -${a}x^3 - ${b}x = -f(x)\\text{, seega funktsioon on paaritu.}`,
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
      const b = nonZeroInt(rng, -9, 9);
      const c = nonZeroInt(rng, -9, 9);

      return {
        seed: 3,
        kysimus: `\\text{Kas funktsioon } f(x) = ${a}x^2 + ${b}x + ${c} \\text{ on paaris, paaritu või ei kumbki?}`,
        vastus: { tuup: "valik", oige: "ei ole kumbki", eksitajad: ["paaris", "paaritu"] },
        lahendus: [
          `f(-x) = ${a}x^2 - ${b}x + ${c}\\text{, mis ei võrdu ei } f(x) \\text{ ega } -f(x)\\text{-ga (liige } ${b}x \\text{ segab).}`,
          `\\text{Seega funktsioon ei ole paaris ega paaritu.}`,
        ],
      };
    },
  },
];
