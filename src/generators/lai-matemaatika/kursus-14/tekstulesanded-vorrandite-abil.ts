import { int, nonZeroInt } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "14-tekstulesanded-vorrandite-abil";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const vaiksem = int(rng, 3, 20);
      const vahe = int(rng, 2, 10);
      const summa = 2 * vaiksem + vahe;

      return {
        seed: 1,
        kysimus: `\\text{Kahe arvu summa on } ${summa} \\text{ ja üks arvudest on teisest } ${vahe} \\text{ võrra suurem. Leia väiksem arv.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: vaiksem },
        lahendus: [
          `\\text{Olgu väiksem arv } x\\text{. Siis } x+(x+${vahe})=${summa}`,
          `2x=${summa - vahe} \\quad\\Rightarrow\\quad x=${vaiksem}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const k = int(rng, 2, 3);
      const lapseTulevik = int(rng, 10, 20);
      const isaTulevik = k * lapseTulevik;
      const aastaid = int(rng, 1, Math.min(9, lapseTulevik - 1));
      const lapseVanus = lapseTulevik - aastaid;
      const isaVanus = isaTulevik - aastaid;

      return {
        seed: 2,
        kysimus: `\\text{Isa on } ${isaVanus} \\text{ aastane ja laps } ${lapseVanus} \\text{ aastane. Mitme aasta pärast on isa täpselt } ${k} \\text{ korda vanem kui laps?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: aastaid },
        lahendus: [
          `${isaVanus}+x=${k}(${lapseVanus}+x)`,
          `${isaVanus}+x=${k * lapseVanus}+${k}x \\quad\\Rightarrow\\quad x=${aastaid}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const kiirus1 = int(rng, 40, 60);
      const kiirus2 = kiirus1 + nonZeroInt(rng, 10, 30);
      const vahemaa = (kiirus1 + kiirus2) * int(rng, 1, 3);
      const aeg = vahemaa / (kiirus1 + kiirus2);

      return {
        seed: 3,
        kysimus: `\\text{Kaks autot sõidavad teineteise poole kiirustega } ${kiirus1} \\text{ km/h ja } ${kiirus2} \\text{ km/h. Vahemaa nende vahel on } ${vahemaa} \\text{ km. Mitme tunni pärast nad kohtuvad?}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: aeg },
        lahendus: [
          `(${kiirus1}+${kiirus2})t=${vahemaa}`,
          `t=\\dfrac{${vahemaa}}{${kiirus1 + kiirus2}}=${aeg}`,
        ],
      };
    },
  },
];
