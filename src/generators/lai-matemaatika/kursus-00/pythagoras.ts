import { pick } from "@/generators/rng";
import { arvVaartus, niceTriangle, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-pythagorase-teoreem";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { sides } = niceTriangle(rng);
      const [a, b, c] = sides;

      return {
        seed: 1,
        kysimus: `\\text{Täisnurkse kolmnurga kaatetid on } ${a} \\text{ ja } ${b}\\text{. Leia hüpotenuus.}`,
        vastus: { tuup: "arv", ...arvVaartus(c) },
        lahendus: [
          `\\text{Pythagorase teoreemi järgi: } c = \\sqrt{a^2 + b^2}\\text{.}`,
          `c = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a} + ${b * b}} = \\sqrt{${a * a + b * b}} = ${c}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { sides } = niceTriangle(rng);
      const [a, b, c] = sides;

      return {
        seed: 2,
        kysimus: `\\text{Täisnurkse kolmnurga hüpotenuus on } ${c} \\text{ ja üks kaatet } ${a}\\text{. Leia teine kaatet.}`,
        vastus: { tuup: "arv", ...arvVaartus(b) },
        lahendus: [
          `\\text{Pythagorase teoreemi järgi: } b = \\sqrt{c^2 - a^2}\\text{.}`,
          `b = \\sqrt{${c}^2 - ${a}^2} = \\sqrt{${c * c} - ${a * a}} = \\sqrt{${c * c - a * a}} = ${b}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { onTaisnurkne, p, q, r } = redrawUntilNice((rr) => {
        const { sides } = niceTriangle(rr);
        const onTaisnurkne = pick(rr, [true, false]);
        if (onTaisnurkne) {
          return { onTaisnurkne, p: sides[0], q: sides[1], r: sides[2] };
        }
        // Perturb the hypotenuse by 1 — verify this doesn't accidentally
        // land on another right triangle.
        const rNew = sides[2] + 1;
        const ehtne = sides[0] * sides[0] + sides[1] * sides[1] === rNew * rNew;
        return ehtne ? null : { onTaisnurkne, p: sides[0], q: sides[1], r: rNew };
      }, rng);

      const oige = onTaisnurkne ? "Jah" : "Ei";

      return {
        seed: 3,
        kysimus: `\\text{Kas kolmnurk külgedega } ${p}\\text{, } ${q} \\text{ ja } ${r} \\text{ on täisnurkne?}`,
        vastus: { tuup: "valik", oige, eksitajad: [oige === "Jah" ? "Ei" : "Jah"] },
        lahendus: [
          `\\text{Kontrollime, kas suurima külje ruut võrdub teiste ruutude summaga:}`,
          `${p}^2 + ${q}^2 = ${p * p + q * q} \\quad ${onTaisnurkne ? "=" : "\\ne"} \\quad ${r}^2 = ${r * r}`,
          `\\text{Vastus: } ${oige}`,
        ],
      };
    },
  },
];
