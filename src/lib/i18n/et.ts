/**
 * Estonian copy catalogue. Flat, dot-namespaced keys so every string has one
 * canonical home — no nested objects to path through. All user-facing text
 * goes through this file (enforced for src/app and src/components by the
 * i18next/no-literal-string lint rule in eslint.config.mjs).
 */
export const et = {
  "meta.title": "Lai matemaatika",
  "meta.description": "Riigieksami ettevalmistusplatvorm",
  "nav.aria": "Peamenüü",
  "nav.teemad": "Teemad",
  "nav.harjuta": "Harjuta",
  "nav.kalender": "Kalender",
  "nav.statistika": "Statistika",
  "nav.eksamirezhiim": "Eksamirežiim",
  "nav.markmed": "Märkmed",
  "selgitus.intuitsioon": "Intuitsioon",
  "selgitus.definitsioon": "Definitsioon",
  "selgitus.naide": "Näide",
  "selgitus.tuupvead": "Tüüpvead",
  "selgitus.valemid": "Valemid",
  "teemad.pealkiri": "Teemad",
  "teemad.otsiSilt": "Otsi teemat",
  "teemad.otsiKoht": "Otsi teema nime või õpitulemuse järgi",
  "teemad.tulemusiEi": "Otsingule ei vastanud ühtegi teemat.",
  "teemad.mitteKaetud": "2027. aasta eksamil ei käsitleta",
  "teema.selgitusPuudub": "Selgitus lisatakse peagi.",
  "teema.opitulemused": "Õpitulemused",
  "teema.eeldused": "Eeldused",
  "teema.harjuta": "Harjuta seda teemat",
  "harjuta.puudub": "Selle teema harjutusi pole veel lisatud.",
  "harjuta.tagasiTeemaJuurde": "Tagasi teema juurde",
  "harjuta.sisendKoht": "Sisesta vastus",
  "harjuta.hulgiKoht": "Nt: 2, 5",
  "harjuta.kontrolli": "Kontrolli",
  "harjuta.jargmine": "Järgmine",
  "harjuta.oige": "Õige!",
  "harjuta.vale": "Vale.",
  "harjuta.lahenduskaik": "Lahenduskäik",
  "harjuta.naitaVihjet": "Näita vihjet",
  "harjuta.vihjeSilt": "Vihje",
  "harjuta.lopetatud": "Harjutus lõpetatud!",
  "harjuta.tulemusSilt": "Tulemus",
} as const;
