import { SPECIAL_ANGLES, exactValueToVastus } from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-tangensfunktsiooni-graafik";

const RADIAN_ANGLES = [
  { deg: 0, latex: "0" },
  { deg: 30, latex: "\\dfrac{\\pi}{6}" },
  { deg: 45, latex: "\\dfrac{\\pi}{4}" },
  { deg: 60, latex: "\\dfrac{\\pi}{3}" },
  { deg: 180, latex: "\\pi" },
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const angle = pick(rng, RADIAN_ANGLES);
      const value = SPECIAL_ANGLES[angle.deg].tan;
      if (value === null) throw new Error("unreachable: tan is defined for every angle in RADIAN_ANGLES");

      return {
        seed: 1,
        kysimus: `\\text{Leia } \\tg\\left(${angle.latex}\\right)\\text{.}`,
        vastus: exactValueToVastus(value),
        lahendus: [`\\tg\\left(${angle.latex}\\right) = \\tg ${angle.deg}^\\circ`],
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
        kysimus: `\\text{Milline on funktsiooni } y=\\tg x \\text{ periood?}`,
        vastus: { tuup: "valik", oige: "π", eksitajad: ["2π", "π/2"] },
        lahendus: [
          `\\text{Erinevalt siinusest ja koosinusest on tangensi periood } \\pi\\text{, mitte } 2\\pi\\text{.}`,
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
        kysimus: `\\text{Millistel } x \\text{ väärtustel vahemikus } [0, 2\\pi) \\text{ ei ole funktsioon } y=\\tg x \\text{ defineeritud?}`,
        vastus: { tuup: "valik", oige: "x = π/2 ja x = 3π/2", eksitajad: ["x = 0 ja x = π", "x = π", "funktsioon on defineeritud kõikjal"] },
        lahendus: [
          `\\text{Tangens ei ole defineeritud, kui } \\cos x = 0\\text{, ehk kohtadel } x=\\dfrac{\\pi}{2} \\text{ ja } x=\\dfrac{3\\pi}{2}\\text{.}`,
        ],
      };
    },
  },
];
