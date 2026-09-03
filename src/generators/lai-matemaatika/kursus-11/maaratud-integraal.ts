import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-maaratud-integraal";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Leia } \\displaystyle\\int_{${a}}^{${a}} f(x)\\,dx\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 0 },
        lahendus: [
          `\\text{Kui ülemine ja alumine raja on võrdsed, on määratud integraal alati } 0\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, -9, 9);
      let b = int(rng, -9, 9);
      while (b === a) b = int(rng, -9, 9);
      const v = nonZeroInt(rng, -9, 9);

      return {
        seed: 2,
        kysimus: `\\text{Teame, et } \\displaystyle\\int_{${a}}^{${b}} f(x)\\,dx = ${v}\\text{. Leia } \\displaystyle\\int_{${b}}^{${a}} f(x)\\,dx\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: -v },
        lahendus: [
          `\\displaystyle\\int_{${b}}^{${a}} f(x)\\,dx = -\\int_{${a}}^{${b}} f(x)\\,dx = -${v} = ${-v}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, -9, 9);
      const b = int(rng, -9, 9);
      const c = int(rng, -9, 9);
      const v1 = int(rng, -9, 9);
      const v2 = int(rng, -9, 9);

      return {
        seed: 3,
        kysimus: `\\text{Teame, et } \\displaystyle\\int_{${a}}^{${b}} f(x)\\,dx = ${v1} \\text{ ja } \\displaystyle\\int_{${b}}^{${c}} f(x)\\,dx = ${v2}\\text{. Leia } \\displaystyle\\int_{${a}}^{${c}} f(x)\\,dx\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: v1 + v2 },
        lahendus: [
          `\\displaystyle\\int_{${a}}^{${c}} f(x)\\,dx = \\int_{${a}}^{${b}} f(x)\\,dx + \\int_{${b}}^{${c}} f(x)\\,dx = ${v1} + ${v2} = ${v1 + v2}`,
        ],
      };
    },
  },
];
