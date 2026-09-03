import { int, pick } from "@/generators/rng";
import { arvVaartus, redrawUntilNice } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "02-tekstulesanded";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { vahe, summa, poeg } = redrawUntilNice((r) => {
        const poeg = int(r, 5, 20);
        const vahe = int(r, 15, 35);
        const isa = poeg + vahe;
        const summa = poeg + isa;
        return { vahe, summa, poeg };
      }, rng);

      return {
        seed: 1,
        kysimus: `\\text{Isa on poja vanusest } ${vahe} \\text{ aastat vanem. Nende vanuste summa on } ${summa}\\text{. Mitu aastat on poeg?}`,
        vastus: { tuup: "arv", ...arvVaartus(poeg) },
        lahendus: [
          `\\text{Olgu poja vanus } x\\text{. Siis isa vanus on } x + ${vahe}\\text{.}`,
          `x + (x + ${vahe}) = ${summa}`,
          `2x = ${summa} - ${vahe} = ${summa - vahe}`,
          `x = ${poeg}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { v1, v2, t, d } = redrawUntilNice((r) => {
        const v1 = int(r, 40, 80);
        const v2 = int(r, 40, 80);
        const t = int(r, 1, 5);
        const d = (v1 + v2) * t;
        return { v1, v2, t, d };
      }, rng);

      return {
        seed: 2,
        kysimus: `\\text{Kaks autot alustavad liikumist teineteise poole } ${d} \\text{ km kauguselt, kiirustega } ${v1} \\text{ km/h ja } ${v2} \\text{ km/h. Mitme tunni pärast nad kohtuvad?}`,
        vastus: { tuup: "arv", ...arvVaartus(t) },
        lahendus: [
          `\\text{Lähenemiskiirus on kiiruste summa: } ${v1} + ${v2} = ${v1 + v2} \\text{ km/h.}`,
          `t = \\dfrac{${d}}{${v1 + v2}} = ${t}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      // ab/(a+b) is an integer far too rarely for random a, b to be worth
      // redrawing for (≈5% of pairs) — construct it directly instead: for
      // coprime m, n and d a multiple of (m+n), a = dm, b = dn gives
      // ab/(a+b) = d·mn/(m+n), an integer whenever (m+n) | d.
      const [m, n] = pick(rng, [
        [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [1, 5],
      ] as const);
      const k = int(rng, 1, 3);
      const d = (m + n) * k;
      const a = d * m;
      const b = d * n;
      const t = k * m * n;

      return {
        seed: 3,
        kysimus: `\\text{Üks töömees teeb töö valmis } ${a} \\text{ päevaga, teine } ${b} \\text{ päevaga. Mitme päevaga saavad nad töö koos valmis?}`,
        vastus: { tuup: "arv", ...arvVaartus(t) },
        lahendus: [
          `\\text{Ühe päeva tootlikkused liidetakse: } \\dfrac{1}{${a}} + \\dfrac{1}{${b}} = \\dfrac{1}{t}\\text{.}`,
          `t = \\dfrac{${a} \\cdot ${b}}{${a} + ${b}} = \\dfrac{${a * b}}{${a + b}} = ${t}`,
        ],
      };
    },
  },
];
