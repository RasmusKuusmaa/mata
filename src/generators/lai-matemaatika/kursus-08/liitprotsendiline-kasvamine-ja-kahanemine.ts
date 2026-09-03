import { int, pick } from "@/generators/rng";
import { arvVaartus, redrawUntilNice, reduceFraction } from "@/generators/nice";
import type { Generaator } from "@/generators/types";

const TEEMA_ID = "08-liitprotsendiline-kasvamine-ja-kahanemine";
const NICE_PERCENTS = [10, 20, 25, 50];

/** `alghind · ((100 ± p) / 100)^n`, in exact integer fraction arithmetic —
 * never floating-point `(1 ± p/100) ** n`, whose binary rounding could
 * silently corrupt the "is this a whole number" check. */
function liitprotsent(alghind: number, p: number, n: number, kasv: boolean): number | null {
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
      const { alghind, p, tulemus } = redrawUntilNice((r) => {
        const alghind = 20 * int(r, 2, 20);
        const p = pick(r, NICE_PERCENTS);
        const tulemus = liitprotsent(alghind, p, 2, false);
        return tulemus === null ? null : { alghind, p, tulemus };
      }, rng);

      return {
        seed: 1,
        kysimus: `\\text{Auto väärtus on } ${alghind} \\text{ eurot ja see kahaneb } ${p}\\% \\text{ aastas. Leia auto väärtus 2 aasta pärast.}`,
        vastus: { tuup: "arv", ...arvVaartus(tulemus) },
        lahendus: [
          `\\text{Liitprotsendi valem kahanemisel: } A = A_0 \\cdot \\left(1 - \\dfrac{p}{100}\\right)^n\\text{.}`,
          `A = ${alghind} \\cdot \\left(1 - \\dfrac{${p}}{100}\\right)^2 = ${tulemus}`,
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
        kysimus: `\\text{Hoius kasvas } ${p}\\% \\text{ aastas liitintressiga ja on 2 aasta pärast } ${tulemus} \\text{ eurot. Leia hoiuse algsuurus.}`,
        vastus: { tuup: "arv", ...arvVaartus(alghind) },
        lahendus: [
          `A = A_0 \\cdot \\left(1 + \\dfrac{p}{100}\\right)^n \\quad \\Rightarrow \\quad A_0 = \\dfrac{A}{\\left(1+\\frac{p}{100}\\right)^n}`,
          `A_0 = \\dfrac{${tulemus}}{\\left(1+\\frac{${p}}{100}\\right)^2} = ${alghind}`,
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
        const tulemus = liitprotsent(alghind, p, 2, true);
        return tulemus === null ? null : { alghind, p, tulemus };
      }, rng);

      return {
        seed: 3,
        kysimus: `\\text{Hoius kasvas 2 aastaga } ${alghind} \\text{ eurolt } ${tulemus} \\text{ eurole (liitintress). Leia aastane protsendimäär.}`,
        vastus: { tuup: "arv", kuju: "taisarv", vaartus: p },
        lahendus: [
          `\\left(1+\\dfrac{p}{100}\\right)^2 = \\dfrac{${tulemus}}{${alghind}}`,
          `\\text{Lahendades saame } p = ${p}`,
        ],
      };
    },
  },
];
