import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-ruumivektori-koordinaadid-ja-pikkus";

const NICE = [
  [1, 2, 2, 3],
  [2, 3, 6, 7],
  [2, 6, 9, 11],
  [3, 4, 12, 13],
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [x, y, z, len] = pick(rng, NICE);

      return {
        seed: 1,
        kysimus: `\\text{Leia vektori } \\vec{a}=(${x}, ${y}, ${z}) \\text{ pikkus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: len },
        lahendus: [
          `|\\vec{a}| = \\sqrt{${x}^2+${y}^2+${z}^2} = \\sqrt{${x * x + y * y + z * z}} = ${len}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [x0, y0, z0, len] = pick(rng, NICE);
      const sx = pick(rng, [1, -1] as const);
      const sy = pick(rng, [1, -1] as const);
      const sz = pick(rng, [1, -1] as const);
      const x = x0 * sx;
      const y = y0 * sy;
      const z = z0 * sz;

      return {
        seed: 2,
        kysimus: `\\text{Leia vektori } \\vec{a}=(${x}, ${y}, ${z}) \\text{ pikkus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: len },
        lahendus: [
          `|\\vec{a}| = \\sqrt{(${x})^2+(${y})^2+(${z})^2} = \\sqrt{${x * x}+${y * y}+${z * z}} = ${len}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [x, y, z, len] = pick(rng, NICE);
      const [x2, y2, z2, len2] = pick(rng, NICE);

      return {
        seed: 3,
        kysimus: `\\text{Vektorid on } \\vec{a}=(${x}, ${y}, ${z}) \\text{ ja } \\vec{b}=(${x2}, ${y2}, ${z2})\\text{. Leia } |\\vec{a}|+|\\vec{b}|\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: len + len2 },
        lahendus: [
          `|\\vec{a}| = ${len}\\text{, } |\\vec{b}| = ${len2}`,
          `|\\vec{a}|+|\\vec{b}| = ${len}+${len2} = ${len + len2}`,
        ],
      };
    },
  },
];
