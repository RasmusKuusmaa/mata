import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "02-lahend-ja-lahendihulk";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, 2, 8);
      const tegelikLahend = int(rng, -9, 9);
      const b = int(rng, -9, 9);
      const c = a * tegelikLahend + b;
      const onLahend = pick(rng, [true, false]);
      const kandidaat = onLahend ? tegelikLahend : tegelikLahend + nonZeroInt(rng, 1, 4);
      const bSign = b >= 0 ? "+" : "-";
      const oige = onLahend ? "Jah" : "Ei";

      return {
        seed: 1,
        kysimus: `\\text{Kas } x = ${kandidaat} \\text{ on võrrandi } ${a}x ${bSign} ${Math.abs(b)} = ${c} \\text{ lahend?}`,
        vastus: { tuup: "valik", oige, eksitajad: [oige === "Jah" ? "Ei" : "Jah"] },
        lahendus: [
          `\\text{Paigutame } x = ${kandidaat} \\text{ võrrandisse:}`,
          `${a} \\cdot ${kandidaat} ${bSign} ${Math.abs(b)} = ${a * kandidaat + b}\\text{, aga peaks olema } ${c}\\text{.}`,
          `\\text{Vastus: } ${oige}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const r1 = nonZeroInt(rng, -8, 8);
      const r2 = (() => {
        let v: number;
        do {
          v = nonZeroInt(rng, -8, 8);
        } while (v === r1);
        return v;
      })();
      const kandidaat = pick(rng, [r1, r2, r1 + r2 + 1]);
      const onLahend = kandidaat === r1 || kandidaat === r2;
      const oige = onLahend ? "Jah" : "Ei";
      const r1Sign = r1 >= 0 ? "-" : "+";
      const r2Sign = r2 >= 0 ? "-" : "+";

      return {
        seed: 2,
        kysimus: `\\text{Kas } x = ${kandidaat} \\text{ kuulub võrrandi } (x ${r1Sign} ${Math.abs(r1)})(x ${r2Sign} ${Math.abs(r2)}) = 0 \\text{ lahendihulka?}`,
        vastus: { tuup: "valik", oige, eksitajad: [oige === "Jah" ? "Ei" : "Jah"] },
        lahendus: [
          `\\text{Lahendihulk on } \\{${r1}, ${r2}\\}\\text{, sest korrutis on null täpselt siis, kui üks tegur on null.}`,
          `\\text{Vastus: } ${oige}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const r1 = nonZeroInt(rng, -7, 7);
      const r2 = (() => {
        let v: number;
        do {
          v = nonZeroInt(rng, -7, 7);
        } while (v === r1);
        return v;
      })();
      const r3 = (() => {
        let v: number;
        do {
          v = nonZeroInt(rng, -7, 7);
        } while (v === r1 || v === r2);
        return v;
      })();
      const kandidaat = pick(rng, [r1, r2, r3, r1 + r2 + r3 + 1]);
      const onLahend = kandidaat === r1 || kandidaat === r2 || kandidaat === r3;
      const oige = onLahend ? "Jah" : "Ei";
      const sign = (v: number) => (v >= 0 ? "-" : "+");

      return {
        seed: 3,
        kysimus: `\\text{Kas } x = ${kandidaat} \\text{ kuulub võrrandi } (x ${sign(r1)} ${Math.abs(r1)})(x ${sign(r2)} ${Math.abs(r2)})(x ${sign(r3)} ${Math.abs(r3)}) = 0 \\text{ lahendihulka?}`,
        vastus: { tuup: "valik", oige, eksitajad: [oige === "Jah" ? "Ei" : "Jah"] },
        lahendus: [
          `\\text{Lahendihulk on } \\{${r1}, ${r2}, ${r3}\\}\\text{.}`,
          `\\text{Vastus: } ${oige}`,
        ],
      };
    },
  },
];
