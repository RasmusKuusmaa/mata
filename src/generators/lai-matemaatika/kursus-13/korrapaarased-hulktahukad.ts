import { arvVaartus } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-korrapaarased-hulktahukad";

/** The five regular polyhedra: face, edge and vertex counts. */
const PLATON_KEHAD = [
  { nimi: "tetraeeder", f: 4, e: 6, v: 4 },
  { nimi: "kuup", f: 6, e: 12, v: 8 },
  { nimi: "oktaeeder", f: 8, e: 12, v: 6 },
  { nimi: "dodekaeeder", f: 12, e: 30, v: 20 },
  { nimi: "ikosaeeder", f: 20, e: 30, v: 12 },
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, 2, 12);
      const total = 6 * a * a;

      return {
        seed: 1,
        kysimus: `\\text{Kuubi serv on } a=${a}\\text{. Leia kuubi täispindala.}`,
        vastus: { tuup: "arv", ...arvVaartus(total) },
        lahendus: [`S = 6a^2 = 6\\cdot ${a}^2 = 6\\cdot ${a * a} = ${total}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const keha = pick(rng, PLATON_KEHAD);

      return {
        seed: 2,
        kysimus: `\\text{Korrapärasel hulktahukal (${keha.nimi}) on } ${keha.f} \\text{ tahku ja } ${keha.e} \\text{ serva. Leia Euleri valemi } V - E + F = 2 \\text{ abil tippude arv.}`,
        vastus: { tuup: "arv", ...arvVaartus(keha.v) },
        lahendus: [
          `V - E + F = 2 \\quad \\Rightarrow \\quad V = 2 + E - F = 2 + ${keha.e} - ${keha.f} = ${keha.v}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 2, 8);
      const numerator = a * a * a;

      return {
        seed: 3,
        kysimus: `\\text{Korrapärase tetraeedri serv on } a=${a}\\text{. Leia tetraeedri ruumala.}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "sqrt", radicand: 2, numerator, denominator: 12 },
        },
        lahendus: [
          `V = \\dfrac{a^3\\sqrt2}{12} = \\dfrac{${a}^3\\sqrt2}{12} = \\dfrac{${numerator}\\sqrt2}{12}`,
        ],
      };
    },
  },
];
