import { int, nonZeroInt } from "@/generators/rng";
import { arvVaartus } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "01-absoluutvaartus";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const x = nonZeroInt(rng, -50, 50);
      const tulemus = Math.abs(x);

      return {
        seed: 1,
        kysimus: `\\text{Arvuta: } |${x}|`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Absoluutväärtus on arvu kaugus nullist, alati mittenegatiivne:}`,
          `|${x}| = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, -30, 30);
      const b = int(rng, -30, 30);
      const tulemus = Math.abs(a - b);

      return {
        seed: 2,
        kysimus: `\\text{Arvuta: } |${a} - (${b})|`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Leiame vahe ja seejärel selle absoluutväärtuse:}`,
          `|${a} - (${b})| = |${a - b}| = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const a = nonZeroInt(rng, -6, 6);
      const b = int(rng, -20, 20);
      const x = int(rng, -8, 8);
      const sisu = a * x + b;
      const tulemus = Math.abs(sisu);
      const bSign = b >= 0 ? "+" : "-";

      return {
        seed: 3,
        kysimus: `\\text{Arvuta avaldise } |${a}x ${bSign} ${Math.abs(b)}| \\text{ väärtus, kui } x = ${x}\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Arvutame esmalt suluses oleva avaldise väärtuse:}`,
          `${a} \\cdot ${x} ${bSign} ${Math.abs(b)} = ${sisu}`,
          `|${sisu}| = ${tulemus}`,
        ],
      };
    },
  },
];
