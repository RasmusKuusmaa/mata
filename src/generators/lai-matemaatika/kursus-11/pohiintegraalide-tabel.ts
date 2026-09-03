import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "11-pohiintegraalide-tabel";

const TABLE_ENTRIES = [
  { funktsioon: "x^n", algfunktsioon: "\\dfrac{x^{n+1}}{n+1}+C", tekst: "x^(n+1)/(n+1) + C" },
  { funktsioon: "\\sin x", algfunktsioon: "-\\cos x+C", tekst: "-cos x + C" },
  { funktsioon: "\\cos x", algfunktsioon: "\\sin x+C", tekst: "sin x + C" },
  { funktsioon: "e^x", algfunktsioon: "e^x+C", tekst: "e^x + C" },
  { funktsioon: "\\dfrac1x", algfunktsioon: "\\ln|x|+C", tekst: "ln|x| + C" },
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const entry = pick(rng, TABLE_ENTRIES.slice(0, 3));
      const eksitajad = TABLE_ENTRIES.filter((e) => e.tekst !== entry.tekst)
        .map((e) => e.tekst)
        .slice(0, 3);

      return {
        seed: 1,
        kysimus: `\\text{Milline on funktsiooni } f(x)=${entry.funktsioon} \\text{ algfunktsioon (määramata integraal)?}`,
        vastus: { tuup: "valik", oige: entry.tekst, eksitajad },
        lahendus: [`\\displaystyle\\int ${entry.funktsioon}\\,dx = ${entry.algfunktsioon}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const entry = pick(rng, TABLE_ENTRIES.slice(3));
      const eksitajad = TABLE_ENTRIES.filter((e) => e.tekst !== entry.tekst)
        .map((e) => e.tekst)
        .slice(0, 3);

      return {
        seed: 2,
        kysimus: `\\text{Milline on funktsiooni } f(x)=${entry.funktsioon} \\text{ algfunktsioon (määramata integraal)?}`,
        vastus: { tuup: "valik", oige: entry.tekst, eksitajad },
        lahendus: [`\\displaystyle\\int ${entry.funktsioon}\\,dx = ${entry.algfunktsioon}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = pick(rng, [2, 3, 4] as const);
      const b = pick(rng, [2, 3, 4] as const);

      return {
        seed: 3,
        kysimus: `\\text{Milline on funktsiooni } f(x)=${a}\\sin x - ${b}\\cos x \\text{ algfunktsioon?}`,
        vastus: {
          tuup: "valik",
          oige: `-${a}cos x - ${b}sin x + C`,
          eksitajad: [`${a}cos x + ${b}sin x + C`, `-${a}cos x + ${b}sin x + C`, `${a}cos x - ${b}sin x + C`],
        },
        lahendus: [
          `\\displaystyle\\int (${a}\\sin x - ${b}\\cos x)\\,dx = -${a}\\cos x - ${b}\\sin x + C`,
        ],
      };
    },
  },
];
