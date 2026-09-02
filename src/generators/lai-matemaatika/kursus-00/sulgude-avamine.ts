import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-sulgude-avamine";

/** Formats `coef·x + konst` with correct signs, e.g. `(5, -3) -> "5x - 3"`,
 * `(1, 4) -> "x + 4"`, `(-1, -4) -> "-x - 4"`. */
function linearString(coef: number, konst: number): string {
  const xTerm =
    coef === 1 ? "x" : coef === -1 ? "-x" : `${coef}x`;
  if (konst === 0) return xTerm;
  const sign = konst > 0 ? "+" : "-";
  return `${xTerm} ${sign} ${Math.abs(konst)}`;
}

/** Formats `a(x + b)` with correct signs inside the bracket. */
function bracketString(a: number, b: number): string {
  const sign = b >= 0 ? "+" : "-";
  return `${a}(x ${sign} ${Math.abs(b)})`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = int(rng, -9, 9);
      const x = int(rng, -5, 5);
      const konst = a * b;
      const tulemus = a * x + konst;

      return {
        seed: 1,
        kysimus: `\\text{Ava sulud avaldises } ${bracketString(a, b)} \\text{ ja arvuta selle väärtus, kui } x = ${x}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Korrutame sulu ette oleva arvu sulus oleva avaldisega läbi:}`,
          `${bracketString(a, b)} = ${linearString(a, konst)}`,
          `${linearString(a, konst)} = ${a} \\cdot ${x} + ${konst} = ${tulemus}\\text{, kui } x = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const b = int(rng, -8, 8);
      const c = nonZeroInt(rng, -5, 5);
      const d = int(rng, -8, 8);
      const x = int(rng, -4, 4);
      const koefitsient = a + c;
      const konst = a * b + c * d;
      const tulemus = koefitsient * x + konst;

      return {
        seed: 2,
        kysimus: `\\text{Ava sulud ja liida sarnased liikmed: } ${bracketString(a, b)} + ${bracketString(c, d)}\\text{. Arvuta tulemuse väärtus, kui } x = ${x}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Avame mõlemad sulud ja liidame sarnased liikmed:}`,
          `${bracketString(a, b)} + ${bracketString(c, d)} = ${linearString(a, a * b)} + ${linearString(c, c * d)} = ${linearString(koefitsient, konst)}`,
          `${linearString(koefitsient, konst)} = ${tulemus}\\text{, kui } x = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { a, b, c, d } = (() => {
        let a: number, c: number;
        do {
          a = nonZeroInt(rng, -5, 5);
          c = nonZeroInt(rng, -5, 5);
        } while (a === c);
        const b = int(rng, -8, 8);
        const d = int(rng, -8, 8);
        return { a, b, c, d };
      })();
      const x = int(rng, -4, 4);
      const koefitsient = a - c;
      const konst = a * b - c * d;
      const tulemus = koefitsient * x + konst;

      return {
        seed: 3,
        kysimus: `\\text{Ava sulud ja lihtsusta: } ${bracketString(a, b)} - ${bracketString(c, d)}\\text{. Arvuta tulemuse väärtus, kui } x = ${x}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Miinusmärgiga sulu avamisel muutuvad kõik sulus olevad märgid vastupidiseks:}`,
          `${bracketString(a, b)} - ${bracketString(c, d)} = ${linearString(koefitsient, konst)}`,
          `${linearString(koefitsient, konst)} = ${tulemus}\\text{, kui } x = ${x}`,
        ],
      };
    },
  },
];
