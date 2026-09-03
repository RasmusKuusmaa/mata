import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "02-samavaarsusteisendused";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const b = int(rng, -9, 9);
      const c = int(rng, -9, 9);
      const tulemus = c - b;
      const bSign = b >= 0 ? "+" : "-";

      return {
        seed: 1,
        kysimus: `\\text{Võrrandis } x ${bSign} ${Math.abs(b)} = ${c} \\text{ lahuta mõlemalt poolt } ${b}\\text{. Mis jääb paremale poole?}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Samaväärsusteisendus: mõlemalt poolt lahutatakse sama arv, lahendihulk ei muutu.}`,
          `${c} - (${b}) = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 2, 9);
      const x = int(rng, -9, 9);
      const c = a * x;

      return {
        seed: 2,
        kysimus: `\\text{Võrrandis } ${a}x = ${c} \\text{ jaga mõlemat poolt arvuga } ${a}\\text{. Mis on } x\\text{?}`,
        vastus: { tuup: "arv", ...arvVaartus(x) },
        lahendus: [
          `\\text{Samaväärsusteisendus: mõlemat poolt jagatakse sama nullist erineva arvuga.}`,
          `x = \\dfrac{${c}}{${a}} = ${x}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 2, 9);
      const b = int(rng, -9, 9);
      const c = int(rng, -9, 9);
      const kehtiv = int(rng, 0, 1) === 1;
      const k = kehtiv ? nonZeroInt(rng, 2, 5) : 0;
      const bSign = b >= 0 ? "+" : "-";
      const oige = kehtiv ? "Jah" : "Ei";

      return {
        seed: 3,
        kysimus: `\\text{Võrrand } ${a}x ${bSign} ${Math.abs(b)} = ${c} \\text{ korrutati mõlemalt poolt arvuga } ${k}\\text{. Kas tegemist on samaväärsusteisendusega (lahendihulk ei muutu)?}`,
        vastus: { tuup: "valik", oige, eksitajad: [oige === "Jah" ? "Ei" : "Jah"] },
        lahendus: kehtiv
          ? [
              `\\text{Korrutamine nullist erineva arvuga säilitab lahendihulga:}`,
              `${a * k}x ${b * k >= 0 ? "+" : "-"} ${Math.abs(b * k)} = ${c * k}`,
            ]
          : [
              `\\text{Korrutamine nulliga hävitab info: mõlemad pooled muutuvad nulliks olenemata } x\\text{-i väärtusest.}`,
              `0 = 0 \\text{ kehtib iga } x \\text{ korral — see EI ole samaväärsusteisendus.}`,
            ],
      };
    },
  },
];
