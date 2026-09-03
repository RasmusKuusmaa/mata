import { int, nonZeroInt, pick, shuffle } from "@/generators/rng";
import type { Generaator, Rng } from "@/generators/types";

const TEEMA_ID = "01-arvuhulgad";
const KOIK_HULGAD = ["N", "Z", "Q", "I", "R"];

function buildValik(rng: Rng, oige: string) {
  const valikud = shuffle(rng, KOIK_HULGAD);
  return {
    oige,
    eksitajad: valikud.filter((v) => v !== oige).slice(0, 3),
  };
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const positiivne = pick(rng, [true, false]);
      const n = positiivne ? int(rng, 1, 50) : -int(rng, 1, 50);
      const oige = positiivne ? "N" : "Z";
      const { eksitajad } = buildValik(rng, oige);

      return {
        seed: 1,
        kysimus: `\\text{Millisesse arvuhulka kuulub arv } ${n} \\text{ kitsaimalt?}`,
        vastus: { tuup: "valik", oige, eksitajad },
        lahendus: [
          positiivne
            ? `\\text{Arv } ${n} \\text{ on positiivne täisarv, seega kuulub naturaalarvude hulka } N\\text{.}`
            : `\\text{Arv } ${n} \\text{ on negatiivne täisarv — see ei kuulu } N \\text{ hulka, aga kuulub täisarvude hulka } Z\\text{.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const lugeja = nonZeroInt(rng, -20, 20);
      const nimetaja = int(rng, 2, 9);
      const oige = "Q";
      const { eksitajad } = buildValik(rng, oige);

      return {
        seed: 2,
        kysimus: `\\text{Millisesse arvuhulka kuulub arv } \\dfrac{${lugeja}}{${nimetaja}} \\text{ kitsaimalt?}`,
        vastus: { tuup: "valik", oige, eksitajad },
        lahendus: [
          `\\text{Arv on esitatav kahe täisarvu jagatisena, seega on see ratsionaalarv (hulk } Q\\text{), aga mitte täisarv.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      // A non-perfect-square radicand keeps the root genuinely irrational.
      const MITTE_TAISRUUDUD = [2, 3, 5, 6, 7, 8, 10, 11, 12, 13];
      const n = pick(rng, MITTE_TAISRUUDUD);
      const oige = "I";
      const { eksitajad } = buildValik(rng, oige);

      return {
        seed: 3,
        kysimus: `\\text{Millisesse arvuhulka kuulub arv } \\sqrt{${n}} \\text{ kitsaimalt?}`,
        vastus: { tuup: "valik", oige, eksitajad },
        lahendus: [
          `${n} \\text{ ei ole täisruut, seega } \\sqrt{${n}} \\text{ on lõpmatu mitteperioodiline kümnendmurd — irratsionaalarv (hulk } I\\text{).}`,
        ],
      };
    },
  },
];
