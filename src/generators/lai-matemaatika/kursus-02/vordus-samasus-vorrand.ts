import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "02-vordus-samasus-vorrand";
const SAMASUS = "Samasus (kehtib iga x korral)";
const VORRAND = "Võrrand (kehtib ühe kindla x korral)";
const VASTUOLU = "Vastuoluline (ei kehti ühegi x korral)";
const KOIK_VALIKUD = [SAMASUS, VORRAND, VASTUOLU];

/** Formats `coef·x + konst`, dropping a zero constant. */
function linearString(coef: number, konst: number): string {
  const xTerm = coef === 1 ? "x" : coef === -1 ? "-x" : `${coef}x`;
  if (konst === 0) return xTerm;
  const sign = konst > 0 ? "+" : "-";
  return `${xTerm} ${sign} ${Math.abs(konst)}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 2, 6);
      const b = int(rng, -9, 9);
      const samasus = pick(rng, [true, false]);
      const c = samasus ? b : b + nonZeroInt(rng, 1, 5);
      const oige = samasus ? SAMASUS : VASTUOLU;

      return {
        seed: 1,
        kysimus: `\\text{Mis liiki võrdus on: } ${linearString(a, b)} = ${linearString(a, c)}\\text{?}`,
        vastus: { tuup: "valik", oige, eksitajad: KOIK_VALIKUD.filter((v) => v !== oige) },
        lahendus: [
          samasus
            ? `\\text{Mõlemad pooled on täpselt võrdsed iga } x \\text{ korral, seega on tegu samasusega.}`
            : `\\text{Lahutades mõlemalt poolt } ${a}x\\text{, jääb } ${b} = ${c}\\text{, mis on väär — võrrandil pole lahendit.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 2, 6);
      const b = int(rng, -9, 9);
      const liik = pick(rng, [0, 1, 2]);
      let c: number, d: number, oige: string;
      if (liik === 0) {
        c = a;
        d = b;
        oige = SAMASUS;
      } else if (liik === 1) {
        c = a;
        d = b + nonZeroInt(rng, 1, 5);
        oige = VASTUOLU;
      } else {
        d = nonZeroInt(rng, -6, 6);
        while (d === a) d = nonZeroInt(rng, -6, 6);
        c = d;
        d = int(rng, -9, 9);
        oige = VORRAND;
      }

      return {
        seed: 2,
        kysimus: `\\text{Mis liiki võrdus on: } ${linearString(a, b)} = ${linearString(c, d)}\\text{?}`,
        vastus: { tuup: "valik", oige, eksitajad: KOIK_VALIKUD.filter((v) => v !== oige) },
        lahendus: [
          `\\text{Vasak ja parem pool: } ${linearString(a, b)} \\text{ ja } ${linearString(c, d)}\\text{.}`,
          oige === SAMASUS
            ? `\\text{Pooled on identsed — samasus.}`
            : oige === VASTUOLU
              ? `\\text{Tundmatuga liikmed on võrdsed, aga vabaliikmed erinevad — vastuoluline.}`
              : `\\text{Tundmatu kordajad erinevad, seega on täpselt üks lahend — võrrand.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      // Present the identity/contradiction case pre-distributed through a
      // bracket, so the classification takes an extra simplification step.
      const p = nonZeroInt(rng, 2, 5);
      const q = int(rng, -6, 6);
      const liik = pick(rng, [0, 1, 2]);
      const a = p;
      const b = p * q;
      let c: number, d: number, oige: string;
      if (liik === 0) {
        c = a;
        d = b;
        oige = SAMASUS;
      } else if (liik === 1) {
        c = a;
        d = b + nonZeroInt(rng, 1, 5);
        oige = VASTUOLU;
      } else {
        d = nonZeroInt(rng, -6, 6);
        while (d === a) d = nonZeroInt(rng, -6, 6);
        c = d;
        d = int(rng, -9, 9);
        oige = VORRAND;
      }

      return {
        seed: 3,
        kysimus: `\\text{Mis liiki võrdus on: } ${p}(x ${q >= 0 ? "+" : "-"} ${Math.abs(q)}) = ${linearString(c, d)}\\text{?}`,
        vastus: { tuup: "valik", oige, eksitajad: KOIK_VALIKUD.filter((v) => v !== oige) },
        lahendus: [
          `\\text{Avame vasakul sulud: } ${p}(x ${q >= 0 ? "+" : "-"} ${Math.abs(q)}) = ${linearString(a, b)}\\text{.}`,
          oige === SAMASUS
            ? `\\text{Pooled on identsed — samasus.}`
            : oige === VASTUOLU
              ? `\\text{Tundmatuga liikmed on võrdsed, aga vabaliikmed erinevad — vastuoluline.}`
              : `\\text{Tundmatu kordajad erinevad, seega on täpselt üks lahend — võrrand.}`,
        ],
      };
    },
  },
];
