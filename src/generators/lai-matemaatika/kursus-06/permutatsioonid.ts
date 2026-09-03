import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-permutatsioonid";

function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const n = int(rng, 3, 7);

      return {
        seed: 1,
        kysimus: `\\text{Mitmel viisil saab reastada } ${n} \\text{ erinevat eset?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: factorial(n) },
        lahendus: [`P_{${n}} = ${n}! = ${factorial(n)}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = int(rng, 4, 7);
      const value = 2 * factorial(n - 1);

      return {
        seed: 2,
        kysimus: `\\text{Mitmel viisil saab reastada } ${n} \\text{ erinevat eset nii, et kaks konkreetset eset oleksid kõrvuti?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Kaks kõrvutiasetsevat eset moodustavad ühe \"paki\": } (${n}-1)! \\text{ viisi, kordades } 2 \\text{ (paki sisemine järjekord):}`,
          `2 \\cdot (${n}-1)! = 2 \\cdot ${factorial(n - 1)} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const n = int(rng, 5, 8);
      const k = int(rng, 2, 3);
      const value = factorial(n) / factorial(k);

      return {
        seed: 3,
        kysimus: `\\text{Mitmel viisil saab reastada } ${n} \\text{ eset, millest } ${k} \\text{ on omavahel eristamatud?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\dfrac{${n}!}{${k}!} = \\dfrac{${factorial(n)}}{${factorial(k)}} = ${value}`,
        ],
      };
    },
  },
];
