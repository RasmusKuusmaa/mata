import { arvVaartus } from "@/generators/nice";
import { pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "06-valistavad-ja-mittevalistavad-sundmused";

// (pa/qa, pb/qb) pairs that are valid probabilities of exclusive events
// (sum ≤ 1) and whose combined denominator stays nice.
const PROBABILITY_PAIRS = [
  [1, 2, 1, 3],
  [1, 2, 1, 4],
  [1, 3, 1, 3],
  [1, 3, 1, 4],
  [1, 4, 1, 4],
  [1, 4, 1, 2],
  [1, 6, 1, 2],
  [1, 6, 1, 3],
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: () => {
      return {
        seed: 1,
        kysimus: `\\text{Täringut visates olgu } A\\text{: "saadi arv 2" ja } B\\text{: "saadi arv 5". Kas } A \\text{ ja } B \\text{ välistavad teineteist?}`,
        vastus: { tuup: "valik", oige: "jah", eksitajad: ["ei"] },
        lahendus: [
          `\\text{Sündmused } A \\text{ ja } B \\text{ ei saa korraga toimuda (üks vise annab ühe tulemuse), seega välistavad nad teineteist.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: () => {
      return {
        seed: 2,
        kysimus: `\\text{Täringut visates olgu } A\\text{: "saadi paarisarv" ja } B\\text{: "saadi arv, mis on suurem kui 3". Kas } A \\text{ ja } B \\text{ välistavad teineteist?}`,
        vastus: { tuup: "valik", oige: "ei", eksitajad: ["jah"] },
        lahendus: [
          `\\text{Arv } 4 \\text{ ja } 6 \\text{ on korraga paarisarvud ja suuremad kui 3, seega sündmustel on ühisosa — nad ei välista teineteist.}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const [pa, qa, pb, qb] = pick(rng, PROBABILITY_PAIRS);

      return {
        seed: 3,
        kysimus: `\\text{Sündmused } A \\text{ ja } B \\text{ välistavad teineteist, } P(A)=\\dfrac{${pa}}{${qa}} \\text{ ja } P(B)=\\dfrac{${pb}}{${qb}}\\text{. Leia } P(A \\cup B)\\text{.}`,
        vastus: { tuup: "arv", ...arvVaartus(pa * qb + pb * qa, qa * qb) },
        lahendus: [
          `\\text{Välistavate sündmuste korral: } P(A\\cup B) = P(A)+P(B) = \\dfrac{${pa}}{${qa}}+\\dfrac{${pb}}{${qb}} = \\dfrac{${pa * qb}+${pb * qa}}{${qa * qb}} = \\dfrac{${pa * qb + pb * qa}}{${qa * qb}}`,
        ],
      };
    },
  },
];
