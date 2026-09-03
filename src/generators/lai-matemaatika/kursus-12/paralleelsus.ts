import { nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-paralleelsus";

/** Kollineaarsed sihivektorid: kordne vektor (paralleelne) või juhuslikult
 * häiritud vektor (üldiselt mitteparalleelne). */
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
        kysimus: `\\text{Sirge } l_1 \\text{ sihivektor on } \\vec{a}=(${x}, ${y}, ${z})\\text{. Sirge } l_2 \\text{ sihivektor on } \\vec{b}=${k}\\vec{a}\\text{. Leia } \\vec{b} \\text{ esimene koordinaat.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: k * x },
        lahendus: [`\\vec{b} = ${k}\\cdot(${x}, ${y}, ${z}) = (${k * x}, ${k * y}, ${k * z})`],
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
      const isParallel = pick(rng, [true, false] as const);
      const k = pick(rng, [2, 3, -2] as const);
      const bx = isParallel ? k * x : k * x + 1;
      const by = isParallel ? k * y : k * y;
      const bz = isParallel ? k * z : k * z;

      return {
        seed: 2,
        kysimus: `\\text{Sirgete sihivektorid on } \\vec{a}=(${x}, ${y}, ${z}) \\text{ ja } \\vec{b}=(${bx}, ${by}, ${bz})\\text{. Kas sirged on paralleelsed?}`,
        vastus: { tuup: "valik", oige: isParallel ? "jah" : "ei", eksitajad: [isParallel ? "ei" : "jah"] },
        lahendus: [
          isParallel
            ? `\\vec{b} = ${k}\\vec{a}\\text{ — vektorid on kollineaarsed, sirged on paralleelsed.}`
            : `\\text{Koordinaatide suhted } \\dfrac{${bx}}{${x}}, \\dfrac{${by}}{${y}}, \\dfrac{${bz}}{${z}} \\text{ ei ole kõik võrdsed — vektorid ei ole kollineaarsed.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = nonZeroInt(rng, -6, 6);
      const c = nonZeroInt(rng, -6, 6);
      const k = pick(rng, [2, 3, -2] as const);

      return {
        seed: 3,
        kysimus: `\\text{Tasand } \\pi_1 \\text{ normaalvektor on } \\vec{n_1}=(${a}, ${b}, ${c})\\text{. Tasand } \\pi_2 \\text{ normaalvektor on } \\vec{n_2}=${k}\\vec{n_1}\\text{. Kas tasandid võivad olla paralleelsed?}`,
        vastus: { tuup: "valik", oige: "jah", eksitajad: ["ei"] },
        lahendus: [
          `\\vec{n_2}=${k}\\vec{n_1}\\text{ on kollineaarne } \\vec{n_1}\\text{-ga, seega tasandid on paralleelsed (või kokkulangevad).}`,
        ],
      };
    },
  },
];
