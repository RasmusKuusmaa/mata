import { nonZeroInt, pick } from "@/generators/rng";
import { redrawUntilNice, reduceFraction } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-uhisteguri-valja-toomine";

/** Formats `coef·x + konst` with correct signs, e.g. `(2, -3) -> "2x - 3"`. */
function linearString(coef: number, konst: number): string {
  const xTerm = coef === 1 ? "x" : coef === -1 ? "-x" : `${coef}x`;
  const sign = konst >= 0 ? "+" : "-";
  return `${xTerm} ${sign} ${Math.abs(konst)}`;
}

type Kysimus = {
  seed: number;
  kOpts: [number, number];
  pRange: [number, number];
  qRange: [number, number];
};

function buildGeneraator({ seed, kOpts, pRange, qRange }: Kysimus): Generaator["genereeri"] {
  return (rng) => {
    const { k, p, q, A, B, oige, eksitajad } = redrawUntilNice((r) => {
      const k = pick(r, [kOpts[0], kOpts[1]]);
      const [p, q] = redrawUntilNice((r2) => {
        const p = nonZeroInt(r2, pRange[0], pRange[1]);
        const q = nonZeroInt(r2, qRange[0], qRange[1]);
        const [redP] = reduceFraction(p, q);
        // p, q must share no further common factor, or k wouldn't be the
        // *greatest* common factor of A = k·p and B = k·q. Compare
        // magnitudes only — reduceFraction moves the sign onto the
        // numerator, so a signed comparison would reject valid coprime
        // pairs whenever exactly one of p, q is negative.
        return Math.abs(redP) === Math.abs(p) ? [p, q] : null;
      }, r);
      const A = k * p;
      const B = k * q;

      const oige = `${k}(${linearString(p, q)})`;
      const eksitajad = [
        `${p}(${linearString(k, q)})`,
        `${k}(${linearString(p, B)})`,
        `${k}(${linearString(A, q)})`,
      ];
      const koik = [oige, ...eksitajad];
      return new Set(koik).size === koik.length
        ? { k, p, q, A, B, oige, eksitajad }
        : null;
    }, rng);

    return {
      seed,
      kysimus: `\\text{Too avaldisest } ${linearString(A, B)} \\text{ ühistegur sulgude ette.}`,
      vastus: { tuup: "valik", oige, eksitajad },
      lahendus: [
        `\\text{Suurim ühistegur on } ${k}\\text{. Jagame mõlemad liikmed sellega:}`,
        `${linearString(A, B)} = ${k}(${linearString(p, q)})`,
      ],
    };
  };
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: buildGeneraator({
      seed: 1,
      kOpts: [2, 3],
      pRange: [1, 6],
      qRange: [1, 6],
    }),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: buildGeneraator({
      seed: 2,
      kOpts: [4, 5],
      pRange: [1, 8],
      qRange: [-8, -1],
    }),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: buildGeneraator({
      seed: 3,
      kOpts: [6, 7],
      pRange: [-9, -1],
      qRange: [1, 9],
    }),
  },
];
