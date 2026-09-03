import { arvVaartus, niceVectorAnglePair } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "12-nurk-sirge-ja-tasandi-vahel";

/** Nurk sirge ja tasandi vahel: siinus, mitte koosinus (nurk sihivektori
 * ja normaali vahel on täiendusnurk otsitavale nurgale), alati mitteneg. */
export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { a: s, b: n, dot, denom } = niceVectorAnglePair(rng);
      return {
        seed: 1,
        kysimus: `\\text{Sirge sihivektor on } \\vec{s}=(${s[0]}, ${s[1]}, ${s[2]}) \\text{ ja tasandi normaalvektor } \\vec{n}=(${n[0]}, ${n[1]}, ${n[2]})\\text{. Leia nurga siinus (kordajana).}`,
        vastus: { tuup: "arv", ...arvVaartus(Math.abs(dot), denom) },
        lahendus: [
          `\\sin\\varphi = \\dfrac{|\\vec{s}\\cdot\\vec{n}|}{|\\vec{s}||\\vec{n}|} = \\dfrac{|${dot}|}{${denom}}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { a: s, b: n, dot } = niceVectorAnglePair(rng);
      const isParallel = dot === 0;
      return {
        seed: 2,
        kysimus: `\\text{Sirge sihivektor on } \\vec{s}=(${s[0]}, ${s[1]}, ${s[2]}) \\text{ ja tasandi normaalvektor } \\vec{n}=(${n[0]}, ${n[1]}, ${n[2]})\\text{. Kas sirge on tasandiga paralleelne?}`,
        vastus: { tuup: "valik", oige: isParallel ? "jah" : "ei", eksitajad: [isParallel ? "ei" : "jah"] },
        lahendus: [
          `\\vec{s}\\cdot\\vec{n} = ${dot}${isParallel ? "\\text{ — sirge on tasandiga paralleelne.}" : "\\ne 0\\text{ — sirge ei ole tasandiga paralleelne.}"}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { a: s, b: n, dot, denom } = niceVectorAnglePair(rng);
      return {
        seed: 3,
        kysimus: `\\text{Sirge sihivektor on } \\vec{s}=(${s[0]}, ${s[1]}, ${s[2]}) \\text{ ja tasandi normaalvektor } \\vec{n}=(${n[0]}, ${n[1]}, ${n[2]})\\text{. Leia } \\vec{s}\\cdot\\vec{n}\\text{ ning nurga siinuse kordaja lugeja (murru } \\dfrac{|\\vec{s}\\cdot\\vec{n}|}{|\\vec{s}||\\vec{n}|}\\text{ lugeja).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: Math.abs(dot) },
        lahendus: [
          `\\vec{s}\\cdot\\vec{n} = ${dot}\\text{, seega lugeja on } |${dot}|=${Math.abs(dot)}\\text{ (nimetaja } ${denom}\\text{).}`,
        ],
      };
    },
  },
];
