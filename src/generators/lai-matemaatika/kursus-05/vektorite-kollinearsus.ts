import { nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-vektorite-kollinearsus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -9, 9);
      const y = nonZeroInt(rng, -9, 9);
      const k = nonZeroInt(rng, -4, 4);

      return {
        seed: 1,
        kysimus: `\\text{Vektor } \\vec{a}=(${x}, ${y})\\text{. Leia } \\vec{a} \\text{-ga kollineaarse vektori } \\vec{b}=(${k * x}, m) \\text{ teine koordinaat } m\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k * y },
        lahendus: [
          `\\text{Kollineaarsed vektorid on võrdelised: } \\vec{b}=${k}\\vec{a}\\text{, seega } m=${k}\\cdot${y}=${k * y}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -6, 6);
      const y = nonZeroInt(rng, -6, 6);
      const k = nonZeroInt(rng, -4, 4);
      const bx = k * x;

      return {
        seed: 2,
        kysimus: `\\text{Vektorid } \\vec{a}=(${x}, ${y}) \\text{ ja } \\vec{b}=(n, ${k * y}) \\text{ on kollineaarsed. Leia } n\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: bx },
        lahendus: [
          `\\text{Kollineaarsuse tunnus: } x_a y_b - x_b y_a = 0 \\quad \\Rightarrow \\quad ${x}\\cdot${k * y} - n\\cdot${y} = 0`,
          `n = ${k}\\cdot${x} = ${bx}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -6, 6);
      const y = nonZeroInt(rng, -6, 6);
      const isCollinear = pick(rng, [true, false]);
      const k = nonZeroInt(rng, -3, 3);
      const [bx, by] = isCollinear ? [k * x, k * y] : [k * x, k * y + nonZeroInt(rng, 1, 3)];

      return {
        seed: 3,
        kysimus: `\\text{Kas vektorid } \\vec{a}=(${x}, ${y}) \\text{ ja } \\vec{b}=(${bx}, ${by}) \\text{ on kollineaarsed?}`,
        vastus: { tuup: "valik", oige: isCollinear ? "jah" : "ei", eksitajad: [isCollinear ? "ei" : "jah"] },
        lahendus: [
          `x_a y_b - x_b y_a = ${x}\\cdot${by} - ${bx}\\cdot${y} = ${x * by - bx * y}${isCollinear ? " = 0 \\text{ (kollineaarsed)}" : " \\ne 0 \\text{ (ei ole kollineaarsed)}"}`,
        ],
      };
    },
  },
];
