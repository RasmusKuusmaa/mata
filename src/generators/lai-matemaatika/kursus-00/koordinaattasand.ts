import { nonZeroInt, shuffle } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "E-koordinaattasand";

function kvadrant(x: number, y: number): string {
  if (x > 0 && y > 0) return "I";
  if (x < 0 && y > 0) return "II";
  if (x < 0 && y < 0) return "III";
  return "IV";
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -9, 9);
      const y = nonZeroInt(rng, -9, 9);
      const oige = kvadrant(x, y);
      const valikud = shuffle(rng, ["I", "II", "III", "IV"]);

      return {
        seed: 1,
        kysimus: `\\text{Mitmendas veerandis (kvadrandis) asub punkt } (${x}, ${y})\\text{?}`,
        vastus: {
          tuup: "valik",
          oige,
          eksitajad: valikud.filter((v) => v !== oige),
        },
        lahendus: [
          `\\text{Veerand sõltub koordinaatide märkidest: } x ${x > 0 ? ">" : "<"} 0\\text{, } y ${y > 0 ? ">" : "<"} 0\\text{.}`,
          `(${x}, ${y}) \\in ${oige}\\text{. veerand}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -9, 9);
      const b = nonZeroInt(rng, -9, 9);

      return {
        seed: 2,
        kysimus: `\\text{Punkti } (${a}, ${b}) \\text{ peegelpilt } x\\text{-telje suhtes on } (${a}, y)\\text{. Leia } y\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(-b) },
        lahendus: [
          `\\text{Peegeldamisel } x\\text{-telje suhtes jääb } x\\text{-koordinaat samaks ja } y\\text{-koordinaat muudab märki:}`,
          `y = -(${b}) = ${-b}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -9, 9);
      const b = nonZeroInt(rng, -9, 9);
      const tulemus = -a - b;

      return {
        seed: 3,
        kysimus: `\\text{Punkti } (${a}, ${b}) \\text{ peegelpilt alguspunkti suhtes on } (x, y)\\text{. Leia } x + y\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Peegeldamisel alguspunkti suhtes muudavad mõlemad koordinaadid märki: } (x,y) = (${-a}, ${-b})\\text{.}`,
          `x + y = ${-a} + (${-b}) = ${tulemus}`,
        ],
      };
    },
  },
];
