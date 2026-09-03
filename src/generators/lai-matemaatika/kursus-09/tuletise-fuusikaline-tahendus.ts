import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-tuletise-fuusikaline-tahendus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = int(rng, -9, 9);

      return {
        seed: 1,
        kysimus: `\\text{Keha asukoht ajahetkel } t \\text{ on } s(t) = ${a}t ${b >= 0 ? "+" : "-"} ${Math.abs(b)}\\text{. Leia keha kiirus (tuletis).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: a },
        lahendus: [
          `v(t) = s'(t) = ${a} \\text{ (konstantne kiirus, sest asukoht on lineaarne).}`,
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
      const t0 = int(rng, -5, 5);
      const value = 2 * a * t0 + b;

      return {
        seed: 2,
        kysimus: `\\text{Keha asukoht ajahetkel } t \\text{ on } s(t) = ${a}t^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}t\\text{. Leia keha kiirus ajahetkel } t=${t0}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: value },
        lahendus: [
          `v(t) = s'(t) = ${2 * a}t ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`,
          `v(${t0}) = ${2 * a} \\cdot ${t0} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${value}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -3, 3);
      const b = int(rng, -6, 6);
      const c = int(rng, -9, 9);
      const t0 = int(rng, -4, 4);
      const speed = 3 * a * t0 * t0 + 2 * b * t0 + c;
      const acceleration = 6 * a * t0 + 2 * b;

      return {
        seed: 3,
        kysimus: `\\text{Keha asukoht ajahetkel } t \\text{ on } s(t) = ${a}t^3 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}t^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}t\\text{. Leia keha kiirendus (teine tuletis) ajahetkel } t=${t0}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: acceleration },
        lahendus: [
          `v(t) = s'(t) = ${3 * a}t^2 ${2 * b >= 0 ? "+" : "-"} ${Math.abs(2 * b)}t ${c >= 0 ? "+" : "-"} ${Math.abs(c)} \\quad \\left(\\text{kiirus, kontrolliks: } v(${t0})=${speed}\\right)`,
          `a(t) = v'(t) = ${6 * a}t ${2 * b >= 0 ? "+" : "-"} ${Math.abs(2 * b)}`,
          `a(${t0}) = ${6 * a} \\cdot ${t0} ${2 * b >= 0 ? "+" : "-"} ${Math.abs(2 * b)} = ${acceleration}`,
        ],
      };
    },
  },
];
