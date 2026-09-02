import { nonZeroInt, pick } from "@/generators/rng";
import { arvVaartus, isNice, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

/**
 * E-series (prerequisite) generators live under `kursus-00` — the registry's
 * discovery pattern is `kursus-\d{2}`, and "00" reads naturally as "before
 * course 1", matching `KursusId: "E"`'s role in the content layer.
 */
const TEEMA_ID = "E-murdarvud";

const SAME_DENOMINATORS = [3, 4, 5, 6, 8, 9, 10, 12];
/** Pairwise LCM stays ≤ 12, so a sum/difference of fractions drawn from two
 * distinct denominators here is always nice. */
const COMMON_DENOMINATORS = [2, 3, 4, 6, 12];

function murd(n: number, d: number): string {
  return `\\dfrac{${n}}{${d}}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const d = pick(rng, SAME_DENOMINATORS);
      const n1 = nonZeroInt(rng, 1, d - 1);
      const n2 = nonZeroInt(rng, 1, d - 1);
      const opLiitmine = pick(rng, [true, false]);
      const tulemus = opLiitmine ? n1 + n2 : n1 - n2;
      const opSymbol = opLiitmine ? "+" : "-";

      return {
        seed: 1,
        kysimus: `\\text{Arvuta: } ${murd(n1, d)} ${opSymbol} ${murd(n2, d)}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus, d) },
        lahendus: [
          `\\text{Sama nimetajaga murdude puhul liidetakse/lahutatakse lugejad:}`,
          `${murd(n1, d)} ${opSymbol} ${murd(n2, d)} = ${murd(tulemus, d)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const [d1, d2] = redrawUntilNice((r) => {
        const a = pick(r, COMMON_DENOMINATORS);
        const b = pick(r, COMMON_DENOMINATORS);
        return a === b ? null : ([a, b] as [number, number]);
      }, rng);
      const n1 = nonZeroInt(rng, 1, d1 - 1);
      const n2 = nonZeroInt(rng, 1, d2 - 1);
      const opLiitmine = pick(rng, [true, false]);
      const opSymbol = opLiitmine ? "+" : "-";
      const yhisNimetaja = (d1 * d2) / gcd(d1, d2);
      const laiendus1 = yhisNimetaja / d1;
      const laiendus2 = yhisNimetaja / d2;
      const yhisLugeja1 = n1 * laiendus1;
      const yhisLugeja2 = n2 * laiendus2;
      const tulemusLugeja = opLiitmine
        ? yhisLugeja1 + yhisLugeja2
        : yhisLugeja1 - yhisLugeja2;

      return {
        seed: 2,
        kysimus: `\\text{Arvuta: } ${murd(n1, d1)} ${opSymbol} ${murd(n2, d2)}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemusLugeja, yhisNimetaja) },
        lahendus: [
          `\\text{Viime murrud ühisele nimetajale } ${yhisNimetaja}\\text{:}`,
          `${murd(n1, d1)} ${opSymbol} ${murd(n2, d2)} = ${murd(yhisLugeja1, yhisNimetaja)} ${opSymbol} ${murd(yhisLugeja2, yhisNimetaja)} = ${murd(tulemusLugeja, yhisNimetaja)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { n1, d1, n2, d2, opKorrutamine } = redrawUntilNice(
        (r) => {
          const n1 = nonZeroInt(r, 1, 8);
          const d1 = pick(r, [2, 3, 4, 5, 6]);
          const n2 = nonZeroInt(r, 1, 8);
          const d2 = pick(r, [2, 3, 4, 5, 6]);
          const opKorrutamine = pick(r, [true, false]);
          const vastusVaartus = opKorrutamine
            ? (n1 * n2) / (d1 * d2)
            : (n1 * d2) / (d1 * n2);
          return isNice(vastusVaartus)
            ? { n1, d1, n2, d2, opKorrutamine, vastusVaartus }
            : null;
        },
        rng,
      );

      const opSymbol = opKorrutamine ? "\\cdot" : ":";
      const tulemusLugeja = opKorrutamine ? n1 * n2 : n1 * d2;
      const tulemusNimetaja = opKorrutamine ? d1 * d2 : d1 * n2;
      const teineTegur = opKorrutamine ? murd(n2, d2) : murd(d2, n2);
      const selgitus = opKorrutamine
        ? "\\text{Murdude korrutamisel korrutatakse lugejad omavahel ja nimetajad omavahel:}"
        : "\\text{Murdude jagamisel korrutatakse esimene murd teise pöördarvuga:}";

      return {
        seed: 3,
        kysimus: `\\text{Arvuta: } ${murd(n1, d1)} ${opSymbol} ${murd(n2, d2)}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemusLugeja, tulemusNimetaja) },
        lahendus: [
          selgitus,
          `${murd(n1, d1)} ${opSymbol} ${murd(n2, d2)} = ${murd(n1, d1)} \\cdot ${teineTegur} = ${murd(tulemusLugeja, tulemusNimetaja)}`,
        ],
      };
    },
  },
];

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) [x, y] = [y, x % y];
  return x || 1;
}
