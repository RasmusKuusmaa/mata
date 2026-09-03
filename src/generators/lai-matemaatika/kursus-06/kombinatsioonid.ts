import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-kombinatsioonid";

function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function combination(n: number, r: number): number {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const n = int(rng, 5, 10);
      const r = int(rng, 2, 4);
      const value = combination(n, r);

      return {
        seed: 1,
        kysimus: `\\text{Mitmel viisil saab } ${n} \\text{ eseme hulgast valida } ${r} \\text{ eset (järjekord ei loe)?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `C_{${n}}^{${r}} = \\dfrac{${n}!}{${r}!(${n}-${r})!} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = int(rng, 6, 10);
      const r = int(rng, 2, 4);

      return {
        seed: 2,
        kysimus: `\\text{Teame, et } C_{${n}}^{${r}} = ${combination(n, r)}\\text{. Leia } C_{${n}}^{${n - r}}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: combination(n, r) },
        lahendus: [
          `C_n^r = C_n^{n-r} \\text{, seega } C_{${n}}^{${n - r}} = C_{${n}}^{${r}} = ${combination(n, r)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const boys = int(rng, 4, 7);
      const girls = int(rng, 4, 7);
      const chooseBoys = int(rng, 1, Math.min(3, boys));
      const chooseGirls = int(rng, 1, Math.min(3, girls));
      const value = combination(boys, chooseBoys) * combination(girls, chooseGirls);

      return {
        seed: 3,
        kysimus: `\\text{Klassis on } ${boys} \\text{ poissi ja } ${girls} \\text{ tüdrukut. Mitmel viisil saab moodustada komisjoni, kuhu kuulub } ${chooseBoys} \\text{ poissi ja } ${chooseGirls} \\text{ tüdrukut?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `C_{${boys}}^{${chooseBoys}} \\cdot C_{${girls}}^{${chooseGirls}} = ${combination(boys, chooseBoys)} \\cdot ${combination(girls, chooseGirls)} = ${value}`,
        ],
      };
    },
  },
];
