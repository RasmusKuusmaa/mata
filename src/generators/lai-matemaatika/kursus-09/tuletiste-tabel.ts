import { arvVaartus, niceTrigTriangle } from "@/generators/nice";
import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "09-tuletiste-tabel";

const TABLE_ENTRIES = [
  { funktsioon: "x^n", tuletis: "nx^{n-1}", tuletisText: "n·x^(n-1)" },
  { funktsioon: "\\sin x", tuletis: "\\cos x", tuletisText: "cos x" },
  { funktsioon: "\\cos x", tuletis: "-\\sin x", tuletisText: "-sin x" },
  { funktsioon: "\\tg\\,x", tuletis: "1+\\tg^2 x", tuletisText: "1 + tg²x" },
  { funktsioon: "e^x", tuletis: "e^x", tuletisText: "e^x" },
  { funktsioon: "\\ln x", tuletis: "\\dfrac1x", tuletisText: "1/x" },
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const entry = pick(rng, TABLE_ENTRIES.slice(0, 3));
      const eksitajad = TABLE_ENTRIES.filter((e) => e.tuletisText !== entry.tuletisText)
        .map((e) => e.tuletisText)
        .slice(0, 3);

      return {
        seed: 1,
        kysimus: `\\text{Milline on funktsiooni } f(x)=${entry.funktsioon} \\text{ tuletis?}`,
        vastus: { tuup: "valik", oige: entry.tuletisText, eksitajad },
        lahendus: [`(${entry.funktsioon})' = ${entry.tuletis}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const entry = pick(rng, TABLE_ENTRIES.slice(3));
      const eksitajad = TABLE_ENTRIES.filter((e) => e.tuletisText !== entry.tuletisText)
        .map((e) => e.tuletisText)
        .slice(0, 3);

      return {
        seed: 2,
        kysimus: `\\text{Milline on funktsiooni } f(x)=${entry.funktsioon} \\text{ tuletis?}`,
        vastus: { tuup: "valik", oige: entry.tuletisText, eksitajad },
        lahendus: [`(${entry.funktsioon})' = ${entry.tuletis}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { sides } = niceTrigTriangle(rng);
      const [a, b, c] = sides;
      const p = int(rng, 2, 5);
      const q = int(rng, 2, 5);
      const value = p * b + q * a;

      return {
        seed: 3,
        kysimus: `\\text{Funktsioon on } f(x) = ${p}\\sin x - ${q}\\cos x\\text{. Teame, et } \\sin\\alpha = \\dfrac{${a}}{${c}} \\text{ ja } \\cos\\alpha = \\dfrac{${b}}{${c}}\\text{. Leia } f'(\\alpha) \\text{ tuletiste tabeli abil.}`,
        vastus: { tuup: "arv", ...arvVaartus(value, c) },
        lahendus: [
          `f'(x) = ${p}\\cos x + ${q}\\sin x`,
          `f'(\\alpha) = ${p}\\cdot\\dfrac{${b}}{${c}} + ${q}\\cdot\\dfrac{${a}}{${c}} = \\dfrac{${p * b} + ${q * a}}{${c}} = \\dfrac{${value}}{${c}}`,
        ],
      };
    },
  },
];
