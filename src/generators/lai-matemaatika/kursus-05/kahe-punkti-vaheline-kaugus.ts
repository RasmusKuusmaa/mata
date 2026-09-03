import { PYTHAGOREAN_TRIPLES } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-kahe-punkti-vaheline-kaugus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [dx, dy, dist] = pick(rng, PYTHAGOREAN_TRIPLES);
      const x1 = int(rng, -8, 8);
      const y1 = int(rng, -8, 8);
      const x2 = x1 + dx;
      const y2 = y1 + dy;

      return {
        seed: 1,
        kysimus: `\\text{Leia punktide } A(${x1}, ${y1}) \\text{ ja } B(${x2}, ${y2}) \\text{ vaheline kaugus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: dist },
        lahendus: [
          `AB = \\sqrt{(${x2}-${x1})^2+(${y2}-${y1})^2} = \\sqrt{${dx}^2+${dy}^2} = \\sqrt{${dx * dx + dy * dy}} = ${dist}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [dx, dy, dist] = pick(rng, PYTHAGOREAN_TRIPLES);
      const sign1 = pick(rng, [1, -1] as const);
      const sign2 = pick(rng, [1, -1] as const);
      const x1 = int(rng, -8, 8);
      const y1 = int(rng, -8, 8);
      const x2 = x1 + sign1 * dx;
      const y2 = y1 + sign2 * dy;

      return {
        seed: 2,
        kysimus: `\\text{Leia punktide } A(${x1}, ${y1}) \\text{ ja } B(${x2}, ${y2}) \\text{ vaheline kaugus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: dist },
        lahendus: [
          `AB = \\sqrt{(${x2}-(${x1}))^2+(${y2}-(${y1}))^2} = \\sqrt{${(x2 - x1) ** 2}+${(y2 - y1) ** 2}} = ${dist}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [dx, dy, dist] = pick(rng, PYTHAGOREAN_TRIPLES);
      const t = int(rng, 1, 4);
      const x1 = int(rng, -8, 8);
      const y1 = int(rng, -8, 8);
      const x2 = x1 + dx * t;
      const y2 = y1 + dy * t;

      return {
        seed: 3,
        kysimus: `\\text{Punktid } A(${x1}, ${y1})\\text{, } B(${x2}, ${y2}) \\text{ ja } C(${x1}, ${y2}) \\text{ moodustavad täisnurkse kolmnurga. Leia hüpotenuus } AB\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: dist * t },
        lahendus: [
          `AC = ${Math.abs(y2 - y1)}\\text{, } BC = ${Math.abs(x2 - x1)}`,
          `AB = \\sqrt{${Math.abs(x2 - x1)}^2+${Math.abs(y2 - y1)}^2} = ${dist * t}`,
        ],
      };
    },
  },
];
