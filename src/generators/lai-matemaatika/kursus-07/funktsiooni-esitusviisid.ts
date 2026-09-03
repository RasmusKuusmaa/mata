import { arvVaartus } from "@/generators/nice";
import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "07-funktsiooni-esitusviisid";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -5, 5);
      const b = int(rng, -5, 5);
      const x0 = int(rng, -5, 5);
      const values = [0, 1, 2, 3].map((i) => a * (x0 + i) + b);

      return {
        seed: 1,
        kysimus: `\\text{Tabelis on antud lineaarse funktsiooni väärtused:}\\quad x=${x0}: ${values[0]}, \\quad x=${x0 + 1}: ${values[1]}, \\quad x=${x0 + 2}: ${values[2]}\\text{. Leia funktsiooni väärtus kohal } x=${x0 + 3}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: values[3] },
        lahendus: [
          `\\text{Iga järgmise } x \\text{ korral kasvab väärtus sama palju: } ${values[1]} - ${values[0]} = ${a}\\text{.}`,
          `${values[2]} + ${a} = ${values[3]}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = int(rng, -6, 6);
      const x1 = int(rng, -6, 6);
      let x2 = int(rng, -6, 6);
      while (x2 === x1) x2 = int(rng, -6, 6);
      const y1 = a * x1 + b;
      const y2 = a * x2 + b;

      return {
        seed: 2,
        kysimus: `\\text{Sirge läbib punkte } (${x1}, ${y1}) \\text{ ja } (${x2}, ${y2})\\text{. Leia sirge tõus.}`,
        vastus: { tuup: "arv", ...arvVaartus(y2 - y1, x2 - x1) },
        lahendus: [
          `\\text{Tõus} = \\dfrac{y_2-y_1}{x_2-x_1} = \\dfrac{${y2} - ${y1}}{${x2} - ${x1}} = \\dfrac{${y2 - y1}}{${x2 - x1}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -4, 4);
      const b = int(rng, -5, 5);
      const c = int(rng, -9, 9);
      const values = [0, 1, 2, 3].map((x) => a * x * x + b * x + c);

      return {
        seed: 3,
        kysimus: `\\text{Tabelis on antud funktsiooni väärtused:}\\quad x=0: ${values[0]}, \\quad x=1: ${values[1]}, \\quad x=2: ${values[2]}\\text{. Funktsioon on ruutfunktsioon. Leia väärtus kohal } x=3\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: values[3] },
        lahendus: [
          `\\text{Esimesed vahed: } ${values[1] - values[0]}, ${values[2] - values[1]}\\text{; teine vahe on konstantne (}${2 * a}\\text{), kuna tegemist on ruutfunktsiooniga.}`,
          `\\text{Järgmine esimene vahe: } ${values[2] - values[1]} + ${2 * a} = ${values[3] - values[2]} \\quad \\Rightarrow \\quad f(3) = ${values[2]} + ${values[3] - values[2]} = ${values[3]}`,
        ],
      };
    },
  },
];
