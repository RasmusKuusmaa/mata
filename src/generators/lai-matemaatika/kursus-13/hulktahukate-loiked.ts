import { int, pick } from "@/generators/rng";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "13-hulktahukate-loiked";

const LOIKE_KUJUD = [
  {
    kirjeldus:
      "Kuup lõigatakse tasandiga, mis läbib kolme serva keskpunkti ühest tipust lähtuvate servade lähedal (lõikab kolme tahku, mis kohtuvad ühes tipus).",
    oige: "kolmnurk",
    eksitajad: ["ruut", "kuusnurk", "viisnurk"],
  },
  {
    kirjeldus:
      "Kuup lõigatakse tasandiga, mis on paralleelne kahe vastastahuga.",
    oige: "ruut",
    eksitajad: ["kolmnurk", "ristkülik, mis pole ruut", "kuusnurk"],
  },
  {
    kirjeldus:
      "Kuup lõigatakse tasandiga, mis läbib kuue serva keskpunkti (kolm paari vastasservi).",
    oige: "kuusnurk",
    eksitajad: ["ruut", "kolmnurk", "viisnurk"],
  },
  {
    kirjeldus:
      "Korrapärane nelinurkne püramiid lõigatakse tasandiga, mis on paralleelne põhjaga.",
    oige: "ruut",
    eksitajad: ["kolmnurk", "kuusnurk", "ring"],
  },
] as const;

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const valik = pick(rng, LOIKE_KUJUD);

      return {
        seed: 1,
        kysimus: `\\text{${valik.kirjeldus} Mis kuju on lõikefiguur?}`,
        vastus: { tuup: "valik", oige: valik.oige, eksitajad: [...valik.eksitajad] },
        lahendus: [`\\text{Lõikefiguur on ${valik.oige}.}`],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const a = int(rng, 2, 9);
      const numerator = a * a;

      return {
        seed: 2,
        kysimus: `\\text{Kuubi serv on } a=${a}\\text{. Kuup lõigatakse tasandiga, mis läbib kaht vastasserva (diagonaallõige). Leia lõikefiguuri (ristküliku) pindala (kordajana arvust } \\sqrt2\\text{).}`,
        vastus: {
          tuup: "tapne",
          vorm: { kind: "sqrt", radicand: 2, numerator },
        },
        lahendus: [
          `\\text{Diagonaallõige on ristkülik külgedega } a \\text{ ja } a\\sqrt2 \\text{ (ruudu diagonaal).}`,
          `S = a\\cdot a\\sqrt2 = ${a}\\cdot ${a}\\sqrt2 = ${numerator}\\sqrt2`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const baasipindala = int(rng, 2, 8) * 4;
      const half = baasipindala / 4;

      return {
        seed: 3,
        kysimus: `\\text{Korrapärase püramiidi põhipindala on } S=${baasipindala}\\text{. Püramiid lõigatakse põhjaga paralleelse tasandiga täpselt tipu ja põhja vahepealt (poole kõrguse kohalt). Leia lõikefiguuri pindala.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: half },
        lahendus: [
          `\\text{Lõiketasand on põhjaga sarnane kujund, mille lineaarmõõtmed on poole väiksemad, seega pindalade suhe on } \\left(\\dfrac{1}{2}\\right)^2=\\dfrac{1}{4}\\text{.}`,
          `S_{lõige} = \\dfrac{1}{4}\\cdot ${baasipindala} = ${half}`,
        ],
      };
    },
  },
];
