import { PYTHAGOREAN_TRIPLES } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-thalese-teoreem";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const [a, b, c] = pick(rng, PYTHAGOREAN_TRIPLES);
      const t = int(rng, 1, 5);

      return {
        seed: 1,
        kysimus: `\\text{Kolmnurga tipp on ringjoonel, mille läbimõõt on } ${c * t} \\text{ (Thalese teoreemi järgi on nurk tipul täisnurk). Üks kaatetitest on } ${a * t}\\text{. Leia teine kaatet.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: b * t },
        lahendus: [
          `\\text{Hüpotenuus võrdub läbimõõduga: } c=${c * t}\\text{. Pythagorase teoreemi järgi:}`,
          `b = \\sqrt{c^2-a^2} = \\sqrt{${c * t}^2-${a * t}^2} = ${b * t}`,
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
      // Force c·t even so the radius c·t/2 is always a whole number.
      const t = int(rng, 1, 5) * (c % 2 === 0 ? 1 : 2);
      const r = (c * t) / 2;

      return {
        seed: 2,
        kysimus: `\\text{Kolmnurga tipp on ringjoonel (raadius } ${r}\\text{) läbimõõdule toetuva täisnurgaga. Üks kaatetitest on } ${b * t}\\text{. Leia teine kaatet.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a * t },
        lahendus: [
          `\\text{Hüpotenuus} = 2r = ${c * t}\\text{. Pythagorase teoreemi järgi:}`,
          `a = \\sqrt{(2r)^2-b^2} = \\sqrt{${c * t}^2-${b * t}^2} = ${a * t}`,
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
      // Force c·t even so the radius c·t/2 is always a whole number.
      const t = int(rng, 1, 5) * (c % 2 === 0 ? 1 : 2);

      return {
        seed: 3,
        kysimus: `\\text{Täisnurkne kolmnurk on ringjoonesse joonistatud nii, et hüpotenuus on läbimõõt. Kaatetid on } ${a * t} \\text{ ja } ${b * t}\\text{. Leia ringjoone raadius.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: (c * t) / 2 },
        lahendus: [
          `\\text{Hüpotenuus: } c=\\sqrt{${a * t}^2+${b * t}^2} = ${c * t}`,
          `\\text{Raadius on pool hüpotenuusist: } r = \\dfrac{${c * t}}{2} = ${(c * t) / 2}`,
        ],
      };
    },
  },
];
