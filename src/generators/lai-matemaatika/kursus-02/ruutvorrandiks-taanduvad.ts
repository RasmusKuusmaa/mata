import { int, pick } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "02-ruutvorrandiks-taanduvad";

/** Formats `a·x⁴ + b·x² + c = 0` with correct signs. */
function biruutString(a: number, b: number, c: number): string {
  const aTerm = a === 1 ? "x^4" : `${a}x^4`;
  const bTerm = ` ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x^2`;
  const cTerm = ` ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`;
  return `${aTerm}${bTerm}${cTerm} = 0`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const m1 = int(rng, 1, 4);
      const m2 = (() => {
        let v: number;
        do {
          v = int(rng, 1, 4);
        } while (v === m1);
        return v;
      })();
      const t1 = m1 * m1;
      const t2 = m2 * m2;
      const b = -(t1 + t2);
      const c = t1 * t2;
      const suurim = Math.max(m1, m2);

      return {
        seed: 1,
        kysimus: `\\text{Lahenda võrrand ja leia suurim lahend: } ${biruutString(1, b, c)}`,
        vastus: { tuup: "arv", ...arvVaartus(suurim) },
        lahendus: [
          `\\text{Tähistame } t = x^2\\text{. Saame ruutvõrrandi } t^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}t ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = 0\\text{, mille lahendid on } t_1 = ${t1} \\text{ ja } t_2 = ${t2}\\text{.}`,
          `x^2 = ${t1} \\Rightarrow x = \\pm${m1}\\text{, } \\quad x^2 = ${t2} \\Rightarrow x = \\pm${m2}`,
          `\\text{Suurim lahend on } ${suurim}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3]);
      const m1 = int(rng, 1, 4);
      const m2 = (() => {
        let v: number;
        do {
          v = int(rng, 1, 4);
        } while (v === m1);
        return v;
      })();
      const t1 = m1 * m1;
      const t2 = m2 * m2;
      const b = -a * (t1 + t2);
      const c = a * t1 * t2;
      const suurim = Math.max(m1, m2);

      return {
        seed: 2,
        kysimus: `\\text{Lahenda võrrand ja leia suurim lahend: } ${biruutString(a, b, c)}`,
        vastus: { tuup: "arv", ...arvVaartus(suurim) },
        lahendus: [
          `\\text{Tähistame } t = x^2\\text{. Saame ruutvõrrandi } ${a}t^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}t ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = 0\\text{, mille lahendid on } t_1 = ${t1} \\text{ ja } t_2 = ${t2}\\text{.}`,
          `x = \\pm${m1} \\quad \\text{või} \\quad x = \\pm${m2}`,
          `\\text{Suurim lahend on } ${suurim}\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      // t2 is negative, so only x² = t1 gives real solutions.
      const m1 = int(rng, 1, 5);
      const n2 = int(rng, 1, 5);
      const t1 = m1 * m1;
      const t2 = -(n2 * n2);
      const b = -(t1 + t2);
      const c = t1 * t2;

      return {
        seed: 3,
        kysimus: `\\text{Leia võrrandi } ${biruutString(1, b, c)} \\text{ suurim reaalarvuline lahend.}`,
        vastus: { tuup: "arv", ...arvVaartus(m1) },
        lahendus: [
          `\\text{Tähistame } t = x^2\\text{. Ruutvõrrandi lahendid on } t_1 = ${t1} \\text{ ja } t_2 = ${t2}\\text{.}`,
          `t_2 = ${t2} < 0\\text{, seega } x^2 = t_2 \\text{ ei anna reaalarvulist lahendit.}`,
          `x^2 = ${t1} \\Rightarrow x = \\pm${m1}\\text{. Suurim reaalarvuline lahend on } ${m1}\\text{.}`,
        ],
      };
    },
  },
];
