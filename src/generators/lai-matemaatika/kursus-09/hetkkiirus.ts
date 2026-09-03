import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-hetkkiirus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const v = nonZeroInt(rng, -9, 9);
      const s0 = int(rng, -9, 9);
      const t1 = int(rng, 0, 5);
      const t2 = t1 + int(rng, 1, 5);

      return {
        seed: 1,
        kysimus: `\\text{Keha asukoht on } s(t) = ${v}t ${s0 >= 0 ? "+" : "-"} ${Math.abs(s0)}\\text{. Leia keskmine kiirus ajavahemikul } [${t1}, ${t2}]\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: v },
        lahendus: [
          `\\text{Ühtlase liikumise korral on keskmine kiirus võrdne kiirusega } v = ${v}\\text{.}`,
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
      const b = int(rng, -9, 9);
      const t1 = int(rng, 0, 4);
      const t2 = t1 + int(rng, 1, 4);
      const s1 = a * t1 * t1 + b * t1;
      const s2 = a * t2 * t2 + b * t2;
      const value = a * (t1 + t2) + b;

      return {
        seed: 2,
        kysimus: `\\text{Keha asukoht on } s(t) = ${a}t^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}t\\text{. Leia keskmine kiirus ajavahemikul } [${t1}, ${t2}]\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `v_{kesk} = \\dfrac{s(${t2})-s(${t1})}{${t2}-${t1}} = \\dfrac{${s2}-${s1}}{${t2 - t1}} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const b = int(rng, -9, 9);
      const t0 = int(rng, -5, 5);
      const value = 2 * a * t0 + b;

      return {
        seed: 3,
        kysimus: `\\text{Keha asukoht on } s(t) = ${a}t^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}t\\text{. Leia hetkkiirus (tuletis) kohal } t=${t0}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `\\text{Hetkkiirus on tuletis: } v(t) = s'(t) = ${2 * a}t ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`,
          `v(${t0}) = ${2 * a} \\cdot ${t0} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${value}`,
        ],
      };
    },
  },
];
