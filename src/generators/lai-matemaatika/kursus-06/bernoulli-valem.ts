import { arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-bernoulli-valem";

function combination(n: number, r: number): number {
  let result = 1;
  for (let i = 0; i < r; i++) result = (result * (n - i)) / (i + 1);
  return Math.round(result);
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const n = int(rng, 2, 3);
      const k = int(rng, 0, n);
      const c = combination(n, k);

      return {
        seed: 1,
        kysimus: `\\text{Münti visatakse } ${n} \\text{ korda (} p=\\dfrac12 \\text{ kirja tõenäosus). Leia tõenäosus, et kiri tuleb täpselt } ${k} \\text{ korral.}`,
        vastus: { tuup: "arv", ...arvVaartus(c, 2 ** n) },
        lahendus: [
          `P(X=${k}) = C_{${n}}^{${k}} \\left(\\dfrac12\\right)^{${k}}\\left(\\dfrac12\\right)^{${n - k}} = \\dfrac{${c}}{2^{${n}}} = \\dfrac{${c}}{${2 ** n}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = 4;
      const k = pick(rng, [1, 2, 3] as const);
      const c = combination(n, k);

      return {
        seed: 2,
        kysimus: `\\text{Münti visatakse } ${n} \\text{ korda (} p=\\dfrac12 \\text{ kirja tõenäosus). Leia tõenäosus, et kiri tuleb täpselt } ${k} \\text{ korral.}`,
        vastus: { tuup: "arv", ...arvVaartus(c, 2 ** n) },
        lahendus: [
          `P(X=${k}) = C_{${n}}^{${k}} \\left(\\dfrac12\\right)^{${n}} = \\dfrac{${c}}{${2 ** n}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const n = 3;
      const k = pick(rng, [1, 2] as const);
      const c = combination(n, k);
      const num = c * 2 ** (n - k);

      return {
        seed: 3,
        kysimus: `\\text{Sündmuse tõenäosus ühel katsel on } p=\\dfrac13\\text{. Katset korratakse } ${n} \\text{ korda sõltumatult. Leia tõenäosus, et sündmus toimub täpselt } ${k} \\text{ korral.}`,
        vastus: { tuup: "arv", ...arvVaartus(num, 3 ** n) },
        lahendus: [
          `P(X=${k}) = C_{${n}}^{${k}} \\left(\\dfrac13\\right)^{${k}}\\left(\\dfrac23\\right)^{${n - k}} = \\dfrac{${c}\\cdot2^{${n - k}}}{3^{${n}}} = \\dfrac{${num}}{${3 ** n}}`,
        ],
      };
    },
  },
];
