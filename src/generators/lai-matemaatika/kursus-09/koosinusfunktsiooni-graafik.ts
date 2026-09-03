import { SPECIAL_ANGLES, exactValueToVastus } from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-koosinusfunktsiooni-graafik";

const RADIAN_ANGLES = [
  { deg: 30, latex: "\\dfrac{\\pi}{6}" },
  { deg: 45, latex: "\\dfrac{\\pi}{4}" },
  { deg: 60, latex: "\\dfrac{\\pi}{3}" },
  { deg: 90, latex: "\\dfrac{\\pi}{2}" },
  { deg: 180, latex: "\\pi" },
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const angle = pick(rng, RADIAN_ANGLES);
      const value = SPECIAL_ANGLES[angle.deg].cos;

      return {
        seed: 1,
        kysimus: `\\text{Leia } \\cos\\left(${angle.latex}\\right)\\text{.}`,
        vastus: exactValueToVastus(value),
        lahendus: [`\\cos\\left(${angle.latex}\\right) = \\cos ${angle.deg}^\\circ`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: () => {
      return {
        seed: 2,
        kysimus: `\\text{Milline on funktsiooni } y=\\cos x \\text{ muutumispiirkond?}`,
        vastus: { tuup: "valik", oige: "[-1, 1]", eksitajad: ["kõik reaalarvud", "[0, 1]", "[0, 2π]"] },
        lahendus: [
          `\\text{Koosinusfunktsiooni väärtused jäävad alati vahemikku } [-1, 1]\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: () => {
      return {
        seed: 3,
        kysimus: `\\text{Kas funktsioon } y=\\cos x \\text{ on paaris või paaritu?}`,
        vastus: { tuup: "valik", oige: "paaris", eksitajad: ["paaritu"] },
        lahendus: [
          `\\cos(-x) = \\cos x\\text{, seega on } \\cos x \\text{ paarisfunktsioon.}`,
        ],
      };
    },
  },
];
