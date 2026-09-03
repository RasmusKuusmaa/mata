import type { Generaator } from "@/generators/types";

const TEEMA_ID = "14-matemaatilise-mudeli-moiste";

export const generaatorid: Generaator[] = [
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "kerge",
    genereeri: () => ({
      seed: 1,
      kysimus: `\\text{Mis on matemaatiline mudel?}`,
      vastus: {
        tuup: "valik",
        oige: "reaalse nähtuse kirjeldus matemaatiliste vahenditega",
        eksitajad: ["ainult arvutiprogramm", "eksperimendi tulemuste tabel", "juhuslik arvude kogum"],
      },
      lahendus: [
        `\\text{Matemaatiline mudel on } \\textbf{reaalse nähtuse kirjeldus matemaatiliste vahenditega}\\text{ — valemite, võrrandite või funktsioonidega.}`,
      ],
    }),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "keskmine",
    genereeri: () => ({
      seed: 2,
      kysimus: `\\text{Miks lihtsustab matemaatiline mudel tegelikkust?}`,
      vastus: {
        tuup: "valik",
        oige: "et keskenduda olulistele seostele",
        eksitajad: ["et tulemus tuleks suurem", "et vältida arvutamist", "seadusest tulenevalt"],
      },
      lahendus: [
        `\\text{Mudel jätab kõrvale ebaolulise, } \\textbf{et keskenduda olulistele seostele}\\text{ — muidu oleks mudel liiga keeruline kasutamiseks.}`,
      ],
    }),
  },
  {
    aine: "lai-matemaatika",
    teemaId: TEEMA_ID,
    raskus: "raske",
    genereeri: () => ({
      seed: 3,
      kysimus: `\\text{Vaba langemise mudel } h(t)=h_0-\\dfrac12 gt^2 \\text{ jätab tavaliselt arvestamata:}`,
      vastus: {
        tuup: "valik",
        oige: "õhutakistuse",
        eksitajad: ["algkõrguse", "raskuskiirenduse", "aja"],
      },
      lahendus: [
        `\\text{Mudel eeldab vaakumit ja jätab } \\textbf{õhutakistuse}\\text{ arvestamata — see on lihtsustus, mis reaalsuses mõjutab tulemust.}`,
      ],
    }),
  },
];
