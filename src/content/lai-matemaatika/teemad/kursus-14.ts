import { makeTeemaFactory } from "./helpers";

/**
 * XIV kursus "Matemaatika rakendused, reaalsete protsesside uurimine" —
 * docs/ainekava-2025.pdf lk 13.
 */
const opitulemused = [
  "selgitab matemaatilise modelleerimise ning selle protseduuride üldist olemust",
  "tunneb lihtsamate mudelite koostamiseks vajalikke meetodeid ja funktsioone",
  "kasutab mõningaid loodus- ja majandusteaduse olulisemaid mudeleid ning meetodeid",
  "lahendab tekstülesandeid sobivalt valitud strateegia abil",
  "märkab reaalse maailma valdkondade mõningaid matemaatikamudelitega kirjeldatavaid seaduspärasusi ja seoseid",
  "koostab kergesti modelleeritavate reaalsuse nähtuste matemaatilisi mudeleid ning kasutab neid tegelikkuse uurimiseks",
  "kasutab IKT vahendeid ainealaseid ja -väliseid probleeme lahendades",
];

const teema = makeTeemaFactory("14", opitulemused);

export const teemad = [
  teema(
    "14-matemaatilise-mudeli-moiste",
    "Matemaatilise mudeli mõiste",
    "Mudeli mõiste ja selle koht probleemi lahendamisel.",
  ),
  teema(
    "14-modelleerimise-etapid",
    "Modelleerimise etapid",
    "Reaalse probleemi tõlkimine matemaatika keelde ja tagasi.",
  ),
  teema(
    "14-mudeli-headuse-hindamine",
    "Mudeli headuse ja rakendatavuse hindamine",
    "Mudeli sobivuse ja piiride kriitiline hindamine.",
  ),
  teema(
    "14-tekstulesanded-vorrandite-abil",
    "Tekstülesanded võrrandite abil",
    "Reaalelulise probleemi lahendamine võrrandi koostamisega.",
  ),
  teema(
    "14-protsentulesanded-mudelina",
    "Protsentülesanded mudelina",
    "Protsendiarvutus kui reaalelulise protsessi mudel.",
  ),
  teema(
    "14-lineaarmudelid",
    "Lineaarmudelid",
    "Reaalsed protsessid, mida kirjeldab lineaarfunktsioon.",
  ),
  teema(
    "14-ruutmudelid",
    "Ruutmudelid",
    "Reaalsed protsessid, mida kirjeldab ruutfunktsioon.",
  ),
  teema(
    "14-eksponentmudelid",
    "Eksponentmudelid",
    "Reaalsed protsessid, mida kirjeldab eksponentfunktsioon.",
  ),
  teema(
    "14-rakendused-loodusteaduses",
    "Rakendused loodusteaduses",
    "Matemaatikamudelid loodusteaduslike nähtuste kirjeldamiseks.",
  ),
  teema(
    "14-rakendused-majanduses",
    "Rakendused majanduses",
    "Matemaatikamudelid majandusnähtuste kirjeldamiseks.",
  ),
  teema(
    "14-rakendused-tehnoloogias",
    "Rakendused tehnoloogias",
    "Matemaatikamudelid tehniliste protsesside kirjeldamiseks.",
  ),
];
