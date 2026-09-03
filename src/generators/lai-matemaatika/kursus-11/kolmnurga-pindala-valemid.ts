import { PYTHAGOREAN_TRIPLES } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-kolmnurga-pindala-valemid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [a, b, c] = pick(rng, PYTHAGOREAN_TRIPLES);
      const t = int(rng, 1, 5);
      const [x, y, z] = [a * t, b * t, c * t];
      const s = (x + y + z) / 2;
      const area = (x * y) / 2;

      return {
        seed: 1,
        kysimus: `\\text{Kolmnurga küljed on } ${x}\\text{, } ${y} \\text{ ja } ${z}\\text{. Leia pindala Heroni valemiga } S=\\sqrt{s(s-a)(s-b)(s-c)}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: area },
        lahendus: [
          `s = \\dfrac{${x}+${y}+${z}}{2} = ${s}`,
          `S = \\sqrt{${s}(${s}-${x})(${s}-${y})(${s}-${z})} = \\sqrt{${s * (s - x) * (s - y) * (s - z)}} = ${area}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [a, b, c] = pick(rng, PYTHAGOREAN_TRIPLES);
      const t = int(rng, 1, 5);
      const [x, y, z] = [a * t, b * t, c * t];
      const s = (x + y + z) / 2;
      const area = (x * y) / 2;
      const r = area / s;

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurga poolümbermõõt on } ${s} \\text{ ja siseringjoone raadius on } ${r}\\text{. Leia kolmnurga pindala (} S=rs\\text{).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: area },
        lahendus: [
          `S = r \\cdot s = ${r} \\cdot ${s} = ${area}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [a, b, c] = pick(rng, PYTHAGOREAN_TRIPLES);
      // Force c·t even so the circumradius c·t/2 is always a whole number.
      const t = int(rng, 1, 4) * (c % 2 === 0 ? 1 : 2);
      const [x, y, z] = [a * t, b * t, c * t];
      const R = z / 2;
      const area = (x * y) / 2;

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurga küljed on } ${x}\\text{, } ${y} \\text{ ja } ${z}\\text{, ümberringjoone raadius on } ${R}\\text{. Leia kolmnurga pindala (} S=\\dfrac{abc}{4R}\\text{).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: area },
        lahendus: [
          `S = \\dfrac{${x}\\cdot${y}\\cdot${z}}{4\\cdot${R}} = \\dfrac{${x * y * z}}{${4 * R}} = ${area}`,
        ],
      };
    },
  },
];
