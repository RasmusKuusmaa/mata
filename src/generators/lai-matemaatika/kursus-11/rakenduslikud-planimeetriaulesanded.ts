import { PYTHAGOREAN_TRIPLES } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-rakenduslikud-planimeetriaulesanded";

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
        kysimus: `\\text{Redel pikkusega } ${c * t} \\text{ m on toetatud vastu seina nii, et redeli alumine ots on seinast } ${a * t} \\text{ m kaugusel. Kui kõrgele seinale ulatub redeli ülemine ots?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: b * t },
        lahendus: [
          `\\text{Redel, sein ja maapind moodustavad täisnurkse kolmnurga:}`,
          `h = \\sqrt{${c * t}^2 - ${a * t}^2} = ${b * t} \\text{ m}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const personHeight = int(rng, 1, 2);
      const personShadow = int(rng, 1, 3);
      const k = int(rng, 2, 10);
      const treeShadow = personShadow * k;
      const treeHeight = personHeight * k;

      return {
        seed: 2,
        kysimus: `\\text{Inimese pikkus on } ${personHeight} \\text{ m ja tema vari on } ${personShadow} \\text{ m. Samal ajal on puu vari } ${treeShadow} \\text{ m. Leia puu kõrgus (sarnaste kolmnurkade abil).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: treeHeight },
        lahendus: [
          `\\text{Kolmnurgad on sarnased: } \\dfrac{\\text{puu kõrgus}}{${treeShadow}} = \\dfrac{${personHeight}}{${personShadow}}`,
          `\\text{puu kõrgus} = \\dfrac{${personHeight}\\cdot${treeShadow}}{${personShadow}} = ${treeHeight} \\text{ m}`,
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
      const t = int(rng, 1, 5);
      const area = (a * t * (b * t)) / 2;

      return {
        seed: 3,
        kysimus: `\\text{Kolmnurkse maatüki küljed on } ${a * t} \\text{ m, } ${b * t} \\text{ m ja } ${c * t} \\text{ m (täisnurkne kolmnurk). Leia maatüki pindala.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: area },
        lahendus: [
          `\\text{Täisnurkse kolmnurga pindala on kaatetite korrutise pool:}`,
          `S = \\dfrac{${a * t}\\cdot${b * t}}{2} = ${area} \\text{ m}^2`,
        ],
      };
    },
  },
];
