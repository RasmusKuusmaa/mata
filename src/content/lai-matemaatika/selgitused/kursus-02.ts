import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 2 (Võrrandid ja võrrandisüsteemid). One entry per
 * topic. Re-exported from `selgitused/index.ts`. No bare `$...$` math
 * delimiters — see `eeldused.ts`'s header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "02-vordus-samasus-vorrand": {
    definitsioon: `
- **Võrdus** on kaks avaldist, mis on ühendatud võrdusmärgiga.
- **Samasus** on võrdus, mis kehtib **iga** muutuja väärtuse korral (nt
  <Math>{"2(x+1) = 2x+2"}</Math>).
- **Võrrand** on võrdus, mis kehtib ainult **teatud** muutuja väärtuste
  korral — neid väärtusi nimetatakse võrrandi lahenditeks.
- Kui võrdus ei kehti **ühegi** väärtuse korral, on see **vastuoluline**
  (lahendita).
`,
    naide: `
<Math>{"x + 3 = x + 5"}</Math> on vastuoluline — lahutades mõlemalt poolt
<Math>{"x"}</Math>, saame <Math>{"3 = 5"}</Math>, mis on alati väär.
`,
  },
  "02-lahend-ja-lahendihulk": {
    definitsioon: `
Võrrandi **lahend** on muutuja väärtus, mis muudab võrrandi tõeseks
võrduseks. Kõigi lahendite hulka nimetatakse **lahendihulgaks**.
Lahendihulk võib olla tühi (lahendita võrrand), lõplik, või kõik reaalarvud
(samasus).
`,
    naide: `
Võrrandi <Math>{"(x-2)(x+3) = 0"}</Math> lahendihulk on
<Math>{"\\\\{2, -3\\\\}"}</Math>, sest korrutis on null täpselt siis, kui
üks teguritest on null.
`,
  },
  "02-samavaarsusteisendused": {
    definitsioon: `
Samaväärsusteisendus on teisendus, mis **ei muuda** võrrandi lahendihulka:

- mõlemale poolele sama arvu (või avaldise) liitmine/lahutamine,
- mõlema poole korrutamine/jagamine sama **nullist erineva** arvuga.

Mõlema poole korrutamine nulliga **pole** samaväärsusteisendus — see
hävitab info ja annab võrrandi <Math>{"0=0"}</Math>, mis kehtib alati.
`,
    naide: `
Võrrandist <Math>{"3x + 6 = 12"}</Math> lahutades mõlemalt poolt
<Math>{"6"}</Math>, saame samaväärse võrrandi
<Math>{"3x = 6"}</Math>.
`,
  },
  "02-lineaarvorrand": {
    definitsioon: `
Lineaarvõrrand taandub kujule <Math>{"ax = b"}</Math>. Kui võrrandis on
sulge, avatakse need enne tundmatuga liikmete koondamist.
`,
    naide: `
<MathBlock>{"3(x+2) = 2(x-1)"}</MathBlock>
<MathBlock>{"3x + 6 = 2x - 2"}</MathBlock>
<MathBlock>{"x = -8"}</MathBlock>
`,
  },
  "02-ruutvorrand": {
    definitsioon: `
Ruutvõrrandi <Math>{"ax^2+bx+c=0"}</Math> lahendid leitakse valemiga:
<MathBlock>{"x = \\\\dfrac{-b \\\\pm \\\\sqrt{b^2-4ac}}{2a}"}</MathBlock>

Avaldist <Math>{"D = b^2-4ac"}</Math> nimetatakse **diskriminandiks**:
- kui <Math>{"D > 0"}</Math>, on kaks reaalset lahendit,
- kui <Math>{"D = 0"}</Math>, on üks (kahekordne) lahend,
- kui <Math>{"D < 0"}</Math>, pole reaalseid lahendeid.
`,
    naide: `
<MathBlock>{"x^2 - x - 6 = 0 \\\\quad \\\\Rightarrow \\\\quad D = 1+24=25 \\\\quad \\\\Rightarrow \\\\quad x = \\\\dfrac{1 \\\\pm 5}{2}"}</MathBlock>
Lahendid on <Math>{"3"}</Math> ja <Math>{"-2"}</Math>.
`,
  },
  "02-ruutvorrandiks-taanduvad": {
    definitsioon: `
Biruutvõrrand <Math>{"ax^4+bx^2+c=0"}</Math> taandatakse ruutvõrrandiks
asendusega <Math>{"t=x^2"}</Math> (kus <Math>{"t \\\\ge 0"}</Math>):
<MathBlock>{"at^2+bt+c=0"}</MathBlock>

Iga positiivne lahend <Math>{"t"}</Math> annab kaks lahendit
<Math>{"x = \\\\pm\\\\sqrt{t}"}</Math>; negatiivne <Math>{"t"}</Math> ei
anna reaalarvulisi lahendeid.
`,
    naide: `
<MathBlock>{"x^4 - 5x^2 + 4 = 0 \\\\quad \\\\Rightarrow \\\\quad t^2-5t+4=0 \\\\quad \\\\Rightarrow \\\\quad t=1 \\\\text{ või } t=4"}</MathBlock>
Lahendid: <Math>{"x = \\\\pm 1, \\\\pm 2"}</Math>.
`,
  },
  "02-murdvorrand": {
    definitsioon: `
Murdvõrrandis on tundmatu nimetajas. Enne lahendamist tuleb kindlaks
määrata **määramispiirkond** (nimetaja ei tohi olla null) ja pärast
lahendamist kontrollida, et lahend ei riku seda piirangut.
`,
    naide: `
<MathBlock>{"\\\\dfrac{6}{x-2} = 3 \\\\quad (x \\\\neq 2) \\\\quad \\\\Rightarrow \\\\quad 6 = 3(x-2) \\\\quad \\\\Rightarrow \\\\quad x = 4"}</MathBlock>
`,
  },
  "02-juurvorrand": {
    definitsioon: `
Juurvõrrandis on tundmatu ruutjuure all. Lahendamiseks tõstetakse mõlemad
pooled ruutu — see võib tekitada **kõrvallahendeid**, seega tuleb iga
leitud lahend algsesse võrrandisse tagasi paigutades kontrollida.
`,
    naide: `
<MathBlock>{"\\\\sqrt{x+5} = 3 \\\\quad \\\\Rightarrow \\\\quad x+5=9 \\\\quad \\\\Rightarrow \\\\quad x=4"}</MathBlock>
Kontroll: <Math>{"\\\\sqrt{4+5} = \\\\sqrt{9} = 3"}</Math> ✓.
`,
  },
  "02-absoluutvaartusega-vorrand": {
    definitsioon: `
Võrrand <Math>{"|f(x)| = a"}</Math> (kus <Math>{"a \\\\ge 0"}</Math>)
jaguneb kaheks juhuks:
<MathBlock>{"f(x) = a \\\\quad \\\\text{või} \\\\quad f(x) = -a"}</MathBlock>
`,
    naide: `
<MathBlock>{"|x-3| = 5 \\\\quad \\\\Rightarrow \\\\quad x-3=5 \\\\text{ või } x-3=-5"}</MathBlock>
Lahendid: <Math>{"x=8"}</Math> või <Math>{"x=-2"}</Math>.
`,
  },
  "02-lineaarvorrandisusteem": {
    definitsioon: `
Lineaarvõrrandisüsteemi lahendamiseks kasutatakse liitmis- või
asendusmeetodit: elimineeritakse üks tundmatu, lahendatakse ülejäänud
võrrand ning leitakse tagasiasendusega teine tundmatu.
`,
    naide: `
<MathBlock>{"\\\\begin{cases} x+y=7 \\\\\\\\ x-y=1 \\\\end{cases} \\\\quad \\\\Rightarrow \\\\quad 2x=8 \\\\quad \\\\Rightarrow \\\\quad x=4,\\\\ y=3"}</MathBlock>
`,
  },
  "02-mittelineaarne-vorrandisusteem": {
    definitsioon: `
Kahe tundmatuga mittelineaarne süsteem lahendatakse tavaliselt
asendusmeetodil: väljendatakse üks tundmatu teise kaudu ühest võrrandist
ja asendatakse teise (ruut- või murd-) võrrandisse.
`,
    naide: `
<MathBlock>{"\\\\begin{cases} x+y=5 \\\\\\\\ xy=6 \\\\end{cases}"}</MathBlock>
<Math>{"x"}</Math> ja <Math>{"y"}</Math> on ruutvõrrandi
<Math>{"t^2-5t+6=0"}</Math> lahendid: <Math>{"2"}</Math> ja
<Math>{"3"}</Math>.
`,
  },
  "02-determinant": {
    definitsioon: `
Kahereline determinant:
<MathBlock>{"\\\\begin{vmatrix} a & b \\\\\\\\ c & d \\\\end{vmatrix} = ad-bc"}</MathBlock>

Kolmerealine determinant (Sarruse reegel):
<MathBlock>{"\\\\begin{vmatrix} a & b & c \\\\\\\\ d & e & f \\\\\\\\ g & h & i \\\\end{vmatrix} = aei+bfg+cdh-ceg-bdi-afh"}</MathBlock>

Crameri valem kahe tundmatuga süsteemi lahendamiseks:
<MathBlock>{"x = \\\\dfrac{D_x}{D}, \\\\quad y = \\\\dfrac{D_y}{D}"}</MathBlock>
`,
    naide: `
<MathBlock>{"\\\\begin{vmatrix} 2 & 3 \\\\\\\\ 1 & 4 \\\\end{vmatrix} = 2\\\\cdot4 - 3\\\\cdot1 = 5"}</MathBlock>
`,
  },
  "02-tekstulesanded": {
    definitsioon: `
Tekstülesande lahendamiseks võrrandi abil:

1. tähistatakse otsitav suurus muutujaga,
2. väljendatakse teised suurused selle muutuja kaudu,
3. koostatakse võrrand vastavalt ülesande tingimustele,
4. lahendatakse võrrand ja kontrollitakse tulemuse mõistlikkust.
`,
    naide: `
Kaks töömeest teevad tööd eraldi vastavalt <Math>{"6"}</Math> ja
<Math>{"3"}</Math> päevaga. Koos töötades:

<MathBlock>{"\\\\dfrac{1}{6} + \\\\dfrac{1}{3} = \\\\dfrac{1}{t} \\\\quad \\\\Rightarrow \\\\quad t = 2 \\\\text{ päeva}"}</MathBlock>
`,
  },
};
