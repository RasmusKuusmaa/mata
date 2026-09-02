import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-aritmeetiline-keskmine";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const m = int(rng, 5, 20);
      const d1 = nonZeroInt(rng, -4, 4);
      const d2 = nonZeroInt(rng, -4, 4);
      const d3 = nonZeroInt(rng, -4, 4);
      const d4 = -(d1 + d2 + d3);
      const vaartused = [m + d1, m + d2, m + d3, m + d4];

      return {
        seed: 1,
        kysimus: `\\text{Leia arvude } ${vaartused.join(", ")} \\text{ aritmeetiline keskmine.}`,
        vastus: { tuup: "arv", ...arvVaartus(m) },
        lahendus: [
          `\\text{Aritmeetiline keskmine on arvude summa jagatud arvude arvuga:}`,
          `\\dfrac{${vaartused.join(" + ")}}{4} = \\dfrac{${vaartused.reduce((s, v) => s + v, 0)}}{4} = ${m}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const m = int(rng, 5, 25);
      const deltad = [
        nonZeroInt(rng, -6, 6),
        nonZeroInt(rng, -6, 6),
        nonZeroInt(rng, -6, 6),
        nonZeroInt(rng, -6, 6),
      ];
      const viimaneDelta = -deltad.reduce((s, d) => s + d, 0);
      const vaartused = [...deltad, viimaneDelta].map((d) => m + d);

      return {
        seed: 2,
        kysimus: `\\text{Leia arvude } ${vaartused.join(", ")} \\text{ aritmeetiline keskmine.}`,
        vastus: { tuup: "arv", ...arvVaartus(m) },
        lahendus: [
          `\\text{Aritmeetiline keskmine on arvude summa jagatud arvude arvuga:}`,
          `\\dfrac{${vaartused.join(" + ")}}{5} = \\dfrac{${vaartused.reduce((s, v) => s + v, 0)}}{5} = ${m}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const m = int(rng, 10, 25);
      const n = int(rng, 4, 6);
      const teadaolevad = Array.from({ length: n - 1 }, () => int(rng, 1, 40));
      const teadaolevateSumma = teadaolevad.reduce((s, v) => s + v, 0);
      const puuduv = n * m - teadaolevateSumma;

      return {
        seed: 3,
        kysimus: `\\text{Arvude } ${teadaolevad.join(", ")} \\text{ ja veel ühe arvu aritmeetiline keskmine on } ${m}\\text{. Leia puuduv arv (kokku on } ${n} \\text{ arvu).}`,
        vastus: { tuup: "arv", ...arvVaartus(puuduv) },
        lahendus: [
          `\\text{Kõigi } ${n} \\text{ arvu summa on } ${n} \\cdot ${m} = ${n * m}\\text{.}`,
          `\\text{Puuduv arv} = ${n * m} - (${teadaolevad.join(" + ")}) = ${n * m} - ${teadaolevateSumma} = ${puuduv}`,
        ],
      };
    },
  },
];
