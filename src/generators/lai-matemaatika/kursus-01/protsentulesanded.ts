import { int, pick } from "@/generators/rng";
import { arvVaartus, redrawUntilNice, reduceFraction } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "01-protsentulesanded";
const NICE_PERCENTS = [10, 20, 25, 50];

/**
 * `alghind · ((100 ± p) / 100)^n`, done in exact integer numerator/
 * denominator arithmetic — never floating-point `(1 + p/100) ** n`, whose
 * binary rounding (0.1, 0.2, ... aren't exact) could silently corrupt the
 * "is this a whole number" check.
 */
function liitprotsent(
  alghind: number,
  p: number,
  n: number,
  kasv: boolean,
): number | null {
  const kordajaLugeja = kasv ? 100 + p : 100 - p;
  let lugeja = alghind;
  let nimetaja = 1;
  for (let i = 0; i < n; i++) {
    lugeja *= kordajaLugeja;
    nimetaja *= 100;
  }
  const [redN, redD] = reduceFraction(lugeja, nimetaja);
  return redD === 1 ? redN : null;
}

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: (rng) => {
      const { alghind, p, kasv, uusHind } = redrawUntilNice((r) => {
        const alghind = 20 * int(r, 2, 20);
        const p = pick(r, NICE_PERCENTS);
        const kasv = pick(r, [true, false]);
        const uusHind = liitprotsent(alghind, p, 1, kasv);
        return uusHind === null ? null : { alghind, p, kasv, uusHind };
      }, rng);
      const opSymbol = kasv ? "+" : "-";

      return {
        seed: 1,
        kysimus: `\\text{Toote hind } ${alghind} \\text{ eurot } \\text{${kasv ? "tõusis" : "langes"}} \\text{ } ${p}\\%\\text{. Leia uus hind.}`,
        vastus: { tuup: "arv", ...arvVaartus(uusHind) },
        lahendus: [
          `\\text{Uus hind on } (1 ${opSymbol} \\dfrac{${p}}{100}) \\text{ kordne algsest hinnast:}`,
          `${alghind} \\cdot (1 ${opSymbol} \\dfrac{${p}}{100}) = ${uusHind}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: (rng) => {
      const { alghind, p, tulemus } = redrawUntilNice((r) => {
        const alghind = 20 * int(r, 2, 20);
        const p = pick(r, NICE_PERCENTS);
        const tulemus = liitprotsent(alghind, p, 2, true);
        return tulemus === null ? null : { alghind, p, tulemus };
      }, rng);

      return {
        seed: 2,
        kysimus: `\\text{Hoiuse suurus on } ${alghind} \\text{ eurot ja see kasvab } ${p}\\% \\text{ aastas (liitintress). Leia hoiuse suurus 2 aasta pärast.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Liitprotsendi valem: } A = A_0 \\cdot \\left(1 + \\dfrac{p}{100}\\right)^n\\text{.}`,
          `A = ${alghind} \\cdot \\left(1 + \\dfrac{${p}}{100}\\right)^2 = ${tulemus}`,
        ],
      };
    },
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: (rng) => {
      const { alghind, p, tulemus } = redrawUntilNice((r) => {
        const alghind = 20 * int(r, 2, 20);
        const p = pick(r, NICE_PERCENTS);
        const tulemus = liitprotsent(alghind, p, 3, true);
        return tulemus === null ? null : { alghind, p, tulemus };
      }, rng);

      return {
        seed: 3,
        kysimus: `\\text{Hoiuse suurus on } ${alghind} \\text{ eurot ja see kasvab } ${p}\\% \\text{ aastas (liitintress). Leia hoiuse suurus 3 aasta pärast.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Liitprotsendi valem: } A = A_0 \\cdot \\left(1 + \\dfrac{p}{100}\\right)^n\\text{.}`,
          `A = ${alghind} \\cdot \\left(1 + \\dfrac{${p}}{100}\\right)^3 = ${tulemus}`,
        ],
      };
    },
  },
];
