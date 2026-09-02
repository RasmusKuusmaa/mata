import { int, nonZeroInt, pick } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-kumnendmurrud";

/** Formats an integer count of tenths as an Estonian one-decimal LaTeX
 * string, e.g. `23 -> "2{,}3"`, `-5 -> "-0{,}5"` — `{,}` rather than a bare
 * comma keeps KaTeX from adding list-style spacing after it. */
function tenthsToString(tenths: number): string {
  const negative = tenths < 0;
  const abs = Math.abs(tenths);
  const whole = Math.floor(abs / 10);
  const decimal = abs % 10;
  return `${negative ? "-" : ""}${whole}{,}${decimal}`;
}

/** Formats an integer count of hundredths as a two-decimal LaTeX string,
 * e.g. `347 -> "3{,}47"`. */
function hundredthsToString(hundredths: number): string {
  const whole = Math.floor(hundredths / 100);
  const decimal = hundredths % 100;
  return `${whole}{,}${decimal.toString().padStart(2, "0")}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x = int(rng, 10, 99);
      const y = int(rng, 10, 99);
      const liitmine = pick(rng, [true, false]);
      // Subtraction keeps the larger value first — a "kerge" result never
      // goes negative (and never renders the forbidden "-0{,}n").
      const a = liitmine ? x : Math.max(x, y);
      const b = liitmine ? y : Math.min(x, y);
      const tulemus = liitmine ? a + b : a - b;
      const opSymbol = liitmine ? "+" : "-";

      return {
        seed: 1,
        kysimus: `\\text{Arvuta: } ${tenthsToString(a)} ${opSymbol} ${tenthsToString(b)}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus, 10) },
        lahendus: [
          `\\text{Kümnendmurde liidetakse/lahutatakse samamoodi nagu täisarve, koma alla koma:}`,
          `${tenthsToString(a)} ${opSymbol} ${tenthsToString(b)} = ${tenthsToString(tulemus)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const whole = int(rng, 1, 9);
      const tenths = int(rng, 0, 9);
      const hundredths = nonZeroInt(rng, 1, 9);
      const totalHundredths = whole * 100 + tenths * 10 + hundredths;
      const roundedTenths = Math.round(totalHundredths / 10);

      return {
        seed: 2,
        kysimus: `\\text{Ümarda arv } ${hundredthsToString(totalHundredths)} \\text{ lähima kümnendikuni.}`,
        vastus: { tuup: "arv", ...arvVaartus(roundedTenths, 10) },
        lahendus: [
          `\\text{Vaatame sajandike kohta: kui see on } 5 \\text{ või suurem, ümardame kümnendiku üles.}`,
          `${hundredthsToString(totalHundredths)} \\approx ${tenthsToString(roundedTenths)}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, 11, 99);
      const k = int(rng, 2, 9);
      const tulemus = a * k;

      return {
        seed: 3,
        kysimus: `\\text{Arvuta: } ${tenthsToString(a)} \\cdot ${k}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus, 10) },
        lahendus: [
          `\\text{Korrutame nagu täisarve ja paneme koma nii mitme koha pealt, kui palju on kordajal komakohti:}`,
          `${tenthsToString(a)} \\cdot ${k} = ${tenthsToString(tulemus)}`,
        ],
      };
    },
  },
];
