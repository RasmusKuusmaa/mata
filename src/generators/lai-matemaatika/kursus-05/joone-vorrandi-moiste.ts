import { int, nonZeroInt, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "05-joone-vorrandi-moiste";

/** Formats `varName - a` with correct signs, e.g. `("y", -9)` gives `y+9`. */
function minusTerm(varName: string, a: number): string {
  return a === 0 ? varName : a > 0 ? `${varName}-${a}` : `${varName}+${-a}`;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const k = nonZeroInt(rng, -6, 6);
      const b = int(rng, -9, 9);
      const x = int(rng, -9, 9);
      const onLine = pick(rng, [true, false]);
      const y = onLine ? k * x + b : k * x + b + nonZeroInt(rng, 1, 4);

      return {
        seed: 1,
        kysimus: `\\text{Kas punkt } (${x}, ${y}) \\text{ asub sirgel } y=${k}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}\\text{?}`,
        vastus: { tuup: "valik", oige: onLine ? "jah" : "ei", eksitajad: [onLine ? "ei" : "jah"] },
        lahendus: [
          `${k}\\cdot${x} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${k * x + b}${onLine ? `\\text{, mis võrdub } ${y}\\text{-ga (punkt asub sirgel).}` : `\\text{, mis ei võrdu } ${y}\\text{-ga (punkt ei asu sirgel).}`}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, -6, 6);
      const b = int(rng, -6, 6);
      const r = int(rng, 2, 10);
      const onCircle = pick(rng, [true, false]);
      const x = onCircle ? a + r : a + r + int(rng, 1, 3);
      const y = b;

      return {
        seed: 2,
        kysimus: `\\text{Kas punkt } (${x}, ${y}) \\text{ asub ringjoonel } (${minusTerm("x", a)})^2+(${minusTerm("y", b)})^2=${r * r}\\text{?}`,
        vastus: { tuup: "valik", oige: onCircle ? "jah" : "ei", eksitajad: [onCircle ? "ei" : "jah"] },
        lahendus: [
          `(${minusTerm(`${x}`, a)})^2+(${minusTerm(`${y}`, b)})^2 = ${(x - a) ** 2 + (y - b) ** 2}${onCircle ? `\\text{, mis võrdub } ${r * r}\\text{-ga (punkt asub ringjoonel).}` : `\\text{, mis ei võrdu } ${r * r}\\text{-ga (punkt ei asu ringjoonel).}`}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -6, 6);
      const y = int(rng, -9, 9);
      const k = nonZeroInt(rng, -6, 6);
      const kx = k * x;

      return {
        seed: 3,
        kysimus: `\\text{Leia parameetri } m \\text{ väärtus, mille korral asub punkt } (${x}, ${y}) \\text{ sirgel } y=${k}x+m\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: y - kx },
        lahendus: [
          `${y} = ${kx}+m \\quad \\Rightarrow \\quad m = ${minusTerm(`${y}`, kx)} = ${y - kx}`,
        ],
      };
    },
  },
];
