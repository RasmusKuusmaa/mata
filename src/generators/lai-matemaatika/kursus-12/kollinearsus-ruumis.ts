import { nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-kollinearsus-ruumis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -6, 6);
      const y = nonZeroInt(rng, -6, 6);
      const z = nonZeroInt(rng, -6, 6);
      const k = pick(rng, [2, 3, -2, -3] as const);

      return {
        seed: 1,
        kysimus: `\\text{Vektor } \\vec{a}=(${x}, ${y}, ${z}) \\text{ ja } \\vec{b}=${k}\\vec{a}\\text{. Leia } \\vec{b} \\text{ kolmas koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k * z },
        lahendus: [`\\vec{b} = (${k * x}, ${k * y}, ${k * z})`],
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
      const z = nonZeroInt(rng, -6, 6);
      const isCollinear = pick(rng, [true, false] as const);
      const k = pick(rng, [2, 3, -2] as const);
      const bx = k * x;
      const by = isCollinear ? k * y : k * y + 1;
      const bz = k * z;

      return {
        seed: 2,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${x}, ${y}, ${z}) \\text{ ja } \\vec{b}=(${bx}, ${by}, ${bz})\\text{. Kas vektorid on kollineaarsed?}`,
        vastus: { tuup: "valik", oige: isCollinear ? "jah" : "ei", eksitajad: [isCollinear ? "ei" : "jah"] },
        lahendus: [
          isCollinear
            ? `\\dfrac{${bx}}{${x}}=\\dfrac{${by}}{${y}}=\\dfrac{${bz}}{${z}}=${k}\\text{ — vektorid on kollineaarsed.}`
            : `\\text{Koordinaatide suhted ei ole kõik võrdsed — vektorid ei ole kollineaarsed.}`,
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
      const z = nonZeroInt(rng, -6, 6);
      const k = pick(rng, [2, 3, -2] as const);
      const bx = k * x;
      const by = k * y;

      return {
        seed: 3,
        kysimus: `\\text{Vektorid } \\vec{a}=(${x}, ${y}, ${z}) \\text{ ja } \\vec{b}=(${bx}, ${by}, t) \\text{ on kollineaarsed. Leia } t\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k * z },
        lahendus: [
          `\\text{Kollineaarsuse tingimusest } \\dfrac{${bx}}{${x}}=${k}\\text{, seega } t = ${k}\\cdot${z} = ${k * z}`,
        ],
      };
    },
  },
];
