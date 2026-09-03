import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "14-rakendused-loodusteaduses";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const h0 = int(rng, 20, 80);
      const t = pick(rng, [1, 2, 3] as const);
      const h = h0 - 5 * t * t;

      return {
        seed: 1,
        kysimus: `\\text{Keha vabalt langemise mudel on } h(t)=${h0}-5t^2 \\text{ (m, lihtsustatud, } g=10\\text{). Leia kõrgus hetkel } t=${t}\\text{.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: h },
        lahendus: [
          `h(${t}) = ${h0}-5\\cdot${t}^2 = ${h0}-${5 * t * t} = ${h}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const n = int(rng, 1, 3);
      const base = int(rng, 2, 10);
      const m0 = base * 2 ** n;
      const m = base;

      return {
        seed: 2,
        kysimus: `\\text{Radioaktiivse aine kogus poolestusajaga } T \\text{ mudeldub valemiga } m(t)=m_0\\cdot(0{,}5)^{t/T}\\text{. Alguses on ainet } ${m0} \\text{ grammi. Leia järelejäänud kogus, kui on möödunud } ${n} \\text{ poolestusaega.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: m },
        lahendus: [
          `m = ${m0}\\cdot(0{,}5)^${n} = \\dfrac{${m0}}{2^${n}} = ${m}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const y0 = int(rng, 100, 500);
      const t = int(rng, 1, 4);
      const kordaja = pick(rng, [2, 3] as const);

      return {
        seed: 3,
        kysimus: `\\text{Populatsiooni kasvumudel on } y(t)=${y0}\\cdot${kordaja}^t\\text{. Mitu korda suureneb populatsioon, kui } t \\text{ suureneb } ${t} \\text{ ühiku võrra (leia kordaja).}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: kordaja ** t },
        lahendus: [
          `\\dfrac{y(t+${t})}{y(t)} = ${kordaja}^${t} = ${kordaja ** t}`,
        ],
      };
    },
  },
];
