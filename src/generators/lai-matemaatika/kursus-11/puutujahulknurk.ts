import { int } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-puutujahulknurk";

/** `a`, `c` free; `b` chosen so `d = a+c-b` stays a valid positive side. */
function buildSides(rng: () => number) {
  const a = int(rng, 2, 20);
  const c = int(rng, 2, 20);
  const b = int(rng, 2, a + c - 2);
  const d = a + c - b;
  return { a, b, c, d };
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { a, b, c, d } = buildSides(rng);

      return {
        seed: 1,
        kysimus: `\\text{Ringjoonele ümber joonestatud nelinurga küljed on } a=${a}\\text{, } b=${b} \\text{ ja } c=${c}\\text{. Leia külg } d\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: d },
        lahendus: [
          `\\text{Puutujanelinurga vastaskülgede summad on võrdsed: } a+c=b+d`,
          `d = a+c-b = ${a}+${c}-${b} = ${d}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a, b, c, d } = buildSides(rng);
      const perimeter = a + b + c + d;

      return {
        seed: 2,
        kysimus: `\\text{Ringjoonele ümber joonestatud nelinurga küljed on } a=${a}\\text{, } b=${b}\\text{, } c=${c} \\text{ ja } d=${d}\\text{. Leia nelinurga ümbermõõt.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: perimeter },
        lahendus: [
          `\\text{Ümbermõõt} = a+b+c+d = ${a}+${b}+${c}+${d} = ${perimeter}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { a, b, c, d } = buildSides(rng);
      const s = a + c;
      const r = int(rng, 2, 10);
      const area = r * s;

      return {
        seed: 3,
        kysimus: `\\text{Ringjoonele ümber joonestatud nelinurga küljed on } a=${a}\\text{, } b=${b}\\text{, } c=${c} \\text{ ja } d=${d}\\text{, siseringjoone raadius on } ${r}\\text{. Leia nelinurga pindala (} S=r\\cdot s\\text{, kus } s \\text{ on poolümbermõõt).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: area },
        lahendus: [
          `s = \\dfrac{a+b+c+d}{2} = a+c = ${a}+${c} = ${s}`,
          `S = r \\cdot s = ${r} \\cdot ${s} = ${area}`,
        ],
      };
    },
  },
];
