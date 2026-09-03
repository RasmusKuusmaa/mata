import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "01-reaalarvude-piirkonnad-arvteljel";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, -10, 0);
      const b = int(rng, a + 3, 10);
      const x = pick(rng, [a, b, Math.round((a + b) / 2)]);
      const oige = x >= a && x <= b ? "Jah" : "Ei";

      return {
        seed: 1,
        kysimus: `\\text{Kas arv } ${x} \\text{ kuulub piirkonda } [${a}; ${b}]\\text{?}`,
        vastus: { tuup: "valik", oige, eksitajad: [oige === "Jah" ? "Ei" : "Jah"] },
        lahendus: [
          `\\text{Kinnine piirkond } [${a}; ${b}] \\text{ sisaldab mõlemat otspunkti ja kõiki vahepealseid arve.}`,
          `${a} \\le ${x} \\le ${b} \\text{ on } ${oige === "Jah" ? "tõene" : "väär"}\\text{, seega vastus on } ${oige}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, -10, 0);
      const b = int(rng, a + 3, 10);
      const x = pick(rng, [a, b, Math.round((a + b) / 2)]);
      const oige = x > a && x < b ? "Jah" : "Ei";

      return {
        seed: 2,
        kysimus: `\\text{Kas arv } ${x} \\text{ kuulub piirkonda } (${a}; ${b})\\text{?}`,
        vastus: { tuup: "valik", oige, eksitajad: [oige === "Jah" ? "Ei" : "Jah"] },
        lahendus: [
          `\\text{Lahtine piirkond } (${a}; ${b}) \\text{ ei sisalda otspunkte } ${a} \\text{ ja } ${b}\\text{, ainult nendevahelisi arve.}`,
          `\\text{Vastus: } ${oige}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, -10, 0);
      const b = int(rng, a + 3, 10);
      const parempoolneKinnine = pick(rng, [true, false]);
      const piirkond = parempoolneKinnine ? `(${a}; ${b}]` : `[${a}; ${b})`;
      const x = pick(rng, [a, b, Math.round((a + b) / 2)]);
      const oige = parempoolneKinnine
        ? x > a && x <= b
          ? "Jah"
          : "Ei"
        : x >= a && x < b
          ? "Jah"
          : "Ei";

      return {
        seed: 3,
        kysimus: `\\text{Kas arv } ${x} \\text{ kuulub piirkonda } ${piirkond}\\text{?}`,
        vastus: { tuup: "valik", oige, eksitajad: [oige === "Jah" ? "Ei" : "Jah"] },
        lahendus: [
          parempoolneKinnine
            ? `\\text{Piirkond } ${piirkond} \\text{ ei sisalda vasakut otspunkti } ${a}\\text{, aga sisaldab parempoolset otspunkti } ${b}\\text{.}`
            : `\\text{Piirkond } ${piirkond} \\text{ sisaldab vasakut otspunkti } ${a}\\text{, aga ei sisalda parempoolset otspunkti } ${b}\\text{.}`,
          `\\text{Vastus: } ${oige}`,
        ],
      };
    },
  },
];
