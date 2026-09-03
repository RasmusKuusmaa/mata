import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "04-nurga-moiste-uldistamine";

/** Angles strictly inside a quadrant (never on an axis), one per quadrant. */
const QUADRANT_ANGLES: readonly [number, "I" | "II" | "III" | "IV"][] = [
  [40, "I"],
  [70, "I"],
  [110, "II"],
  [160, "II"],
  [200, "III"],
  [250, "III"],
  [290, "IV"],
  [340, "IV"],
];
const QUADRANTS = ["I", "II", "III", "IV"] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const base = int(rng, 1, 90);
      const k = int(rng, 1, 3);
      const raw = base + 360 * k;

      return {
        seed: 1,
        kysimus: `\\text{Nurk } ${raw}^\\circ \\text{ on täispöördega samaväärne mõne nurgaga vahemikus } [0^\\circ, 360^\\circ)\\text{. Leia see nurk.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: base },
        lahendus: [
          `\\text{Lahutame täispöörded (} 360^\\circ \\text{) nurgast:}`,
          `${raw}^\\circ - ${k} \\cdot 360^\\circ = ${base}^\\circ`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const base = int(rng, 1, 359);
      const raw = -base;
      const result = 360 - base;

      return {
        seed: 2,
        kysimus: `\\text{Nurk on } ${raw}^\\circ \\text{ (negatiivne, ehk kellaosuti liikumise suunas mõõdetud). Leia samaväärne nurk vahemikus } [0^\\circ, 360^\\circ)\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: result },
        lahendus: [
          `\\text{Liidame ühe täispöörde:}`,
          `${raw}^\\circ + 360^\\circ = ${result}^\\circ`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [angle, quadrant] = pick(rng, QUADRANT_ANGLES);
      const k = int(rng, 1, 2);
      const sign = pick(rng, [1, -1] as const);
      const raw = sign === 1 ? angle + 360 * k : angle - 360 * k;
      const eksitajad = QUADRANTS.filter((q) => q !== quadrant);

      return {
        seed: 3,
        kysimus: `\\text{Millises veerandis asub nurk } ${raw}^\\circ\\text{?}`,
        vastus: { tuup: "valik", oige: quadrant, eksitajad },
        lahendus: [
          `\\text{Taandame nurga vahemikku } [0^\\circ, 360^\\circ)\\text{:}`,
          `${raw}^\\circ \\to ${angle}^\\circ`,
          `${angle}^\\circ \\text{ jääb veerandisse } ${quadrant}\\text{.}`,
        ],
      };
    },
  },
];
