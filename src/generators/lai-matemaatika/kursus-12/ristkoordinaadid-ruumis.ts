import { alus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-ristkoordinaadid-ruumis";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [dx, dy, dist] = pick(rng, [
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
      ] as const);
      const x1 = int(rng, -8, 8);
      const y1 = int(rng, -8, 8);
      const z1 = int(rng, -8, 8);
      const x2 = x1 + dx;
      const y2 = y1 + dy;

      return {
        seed: 1,
        kysimus: `\\text{Leia punktide } A(${x1}, ${y1}, ${z1}) \\text{ ja } B(${x2}, ${y2}, ${z1}) \\text{ vaheline kaugus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: dist },
        lahendus: [
          `AB = \\sqrt{(${x2}-(${x1}))^2+(${y2}-(${y1}))^2+(${z1}-(${z1}))^2} = \\sqrt{${dx}^2+${dy}^2+0^2} = ${dist}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const dx = 3;
      const dy = 4;
      const dz = 12;
      const dist = 13;
      const x1 = int(rng, -6, 6);
      const y1 = int(rng, -6, 6);
      const z1 = int(rng, -6, 6);
      const x2 = x1 + dx;
      const y2 = y1 + dy;
      const z2 = z1 + dz;

      return {
        seed: 2,
        kysimus: `\\text{Leia punktide } A(${x1}, ${y1}, ${z1}) \\text{ ja } B(${x2}, ${y2}, ${z2}) \\text{ vaheline kaugus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: dist },
        lahendus: [
          `AB = \\sqrt{${alus(x2 - x1)}^2+${alus(y2 - y1)}^2+${alus(z2 - z1)}^2} = \\sqrt{9+16+144} = \\sqrt{169} = ${dist}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x1 = int(rng, -5, 5);
      const y1 = int(rng, -5, 5);
      const z1 = int(rng, -5, 5);
      const t = int(rng, 1, 3);
      const x2 = x1 + 3 * t;
      const y2 = y1 + 4 * t;
      const z2 = z1;

      return {
        seed: 3,
        kysimus: `\\text{Punktid on } A(${x1}, ${y1}, ${z1}) \\text{ ja } B(${x2}, ${y2}, ${z2})\\text{. Leia punktide vaheline kaugus.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: 5 * t },
        lahendus: [
          `AB = \\sqrt{(3\\cdot${t})^2+(4\\cdot${t})^2+0^2} = \\sqrt{9\\cdot${t}^2+16\\cdot${t}^2} = 5\\cdot${t} = ${5 * t}`,
        ],
      };
    },
  },
];
