import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "03-vorratuse-moiste-ja-omadused";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = int(rng, -9, 9);
      const x = int(rng, -9, 9);
      const suurem = pick(rng, [true, false]);
      const oige = suurem ? (x > a ? "Jah" : "Ei") : x < a ? "Jah" : "Ei";
      const sign = suurem ? ">" : "<";

      return {
        seed: 1,
        kysimus: `\\text{Kas } ${x} ${sign} ${a} \\text{ on tõene?}`,
        vastus: { tuup: "valik", oige, eksitajad: [oige === "Jah" ? "Ei" : "Jah"] },
        lahendus: [`${x} \\text{ ja } ${a} \\text{ võrdlemine annab vastuseks: } \\text{${oige}}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      // Multiplying both sides of an inequality by a negative number
      // reverses the direction — this generator tests exactly that.
      // Drawing two values and sorting them (rather than looping until a
      // second draw exceeds the first) also sidesteps an infinite loop
      // when the first draw lands on the range's maximum.
      const v1 = int(rng, -9, 9);
      const v2 = (() => {
        let v: number;
        do {
          v = int(rng, -9, 9);
        } while (v === v1);
        return v;
      })();
      const a = Math.min(v1, v2);
      const b = Math.max(v1, v2);
      const k = nonZeroInt(rng, -6, 6);
      const JAAB_SAMAKS = "Jääb samaks";
      const POORDUB = "Pöördub vastupidiseks";
      const oige = k > 0 ? JAAB_SAMAKS : POORDUB;

      return {
        seed: 2,
        kysimus: `\\text{Võrratus } ${a} < ${b} \\text{ on tõene. Korrutame mõlemat poolt arvuga } ${k}\\text{. Kas võrratusmärk jääb samaks või pöördub vastupidiseks?}`,
        vastus: {
          tuup: "valik",
          oige,
          eksitajad: [oige === JAAB_SAMAKS ? POORDUB : JAAB_SAMAKS],
        },
        lahendus: [
          k > 0
            ? `\\text{Korrutamine positiivse arvuga ei muuda võrratusmärki.}`
            : `\\text{Korrutamine negatiivse arvuga pöörab võrratusmärgi vastupidiseks.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = int(rng, -9, 9);
      const b = (() => {
        let v: number;
        do {
          v = int(rng, -9, 9);
        } while (v === a);
        return v;
      })();
      const x = int(rng, -9, 9);
      const vahemikSees = x > Math.min(a, b) && x < Math.max(a, b);
      const oige = vahemikSees ? "Jah" : "Ei";

      return {
        seed: 3,
        kysimus: `\\text{Kas arv } ${x} \\text{ rahuldab võrratussüsteemi:} \\begin{cases} x > ${Math.min(a, b)} \\\\ x < ${Math.max(a, b)} \\end{cases}`,
        vastus: { tuup: "valik", oige, eksitajad: [oige === "Jah" ? "Ei" : "Jah"] },
        lahendus: [
          `\\text{Lahendihulk on vahemik } (${Math.min(a, b)}; ${Math.max(a, b)})\\text{.}`,
          `\\text{Vastus: } \\text{${oige}}`,
        ],
      };
    },
  },
];
