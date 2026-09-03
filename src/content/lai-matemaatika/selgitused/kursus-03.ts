import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 3 (Võrratused. Trigonomeetria I). One entry per
 * topic. Re-exported from `selgitused/index.ts`. No bare `$...$` math
 * delimiters — see `eeldused.ts`'s header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "03-vorratuse-moiste-ja-omadused": {
    definitsioon: `
Võrratus võrdleb kahte avaldist märkidega <Math>{"<, >, \\\\le, \\\\ge"}</Math>.
Nagu võrrandilgi, on ka võrratusel **lahendihulk**.

Tähtis erinevus võrrandist: kui võrratuse mõlemat poolt korrutada või
jagada **negatiivse** arvuga, **pöördub võrratusmärk vastupidiseks**.
`,
    naide: `
<MathBlock>{"-2x > 6 \\\\quad \\\\Rightarrow \\\\quad x < -3"}</MathBlock>
(jagasime mõlemat poolt arvuga <Math>{"-2"}</Math>, seega märk pöördus).
`,
  },
  "03-lineaarvorratus": {
    definitsioon: `
Lineaarvõrratus lahendatakse samamoodi nagu lineaarvõrrand, kuid tuleb
jälgida võrratusmärgi pööramist negatiivse arvuga korrutamisel/jagamisel.
`,
    naide: `
<MathBlock>{"3x + 5 < 2x - 1 \\\\quad \\\\Rightarrow \\\\quad x < -6"}</MathBlock>
`,
  },
  "03-ruutvorratus": {
    definitsioon: `
Ruutvõrratuse lahendamiseks tegurdatakse ruutliige, leitakse nullkohad ja
uuritakse märki nullkohtade vahel (nt intervallmeetodiga).
`,
    naide: `
<MathBlock>{"x^2-x-6>0 \\\\quad \\\\Rightarrow \\\\quad (x-3)(x+2)>0 \\\\quad \\\\Rightarrow \\\\quad x<-2 \\\\text{ või } x>3"}</MathBlock>
`,
  },
  "03-intervallmeetod": {
    definitsioon: `
Intervallmeetod uurib tegurdatud avaldise märki nullkohtade vahel: iga
nullkoha juures, kus tegur esineb **paaritu** astmega, märk vahetub; **paaris**
astme korral (nt ruudus tegur) märk ei vaheta.
`,
    naide: `
Avaldise <Math>{"(x-1)(x+2)"}</Math> märk on positiivne, kui
<Math>{"x < -2"}</Math> või <Math>{"x > 1"}</Math>, ja negatiivne vahemikus
<Math>{"-2 < x < 1"}</Math>.
`,
  },
  "03-murdvorratus": {
    definitsioon: `
Murdvõrratuse lahendamiseks viiakse kõik liikmed ühele poole, tegurdatakse
lugeja ja nimetaja ning uuritakse märki intervallmeetodiga — nimetaja
nullkoht **ei kuulu** kunagi lahendihulka.
`,
    naide: `
<MathBlock>{"\\\\dfrac{x-1}{x+2} > 0 \\\\quad \\\\Rightarrow \\\\quad x < -2 \\\\text{ või } x > 1"}</MathBlock>
`,
  },
  "03-vorratusesusteemid": {
    definitsioon: `
Võrratusesüsteemi lahendihulk on kõigi süsteemi võrratuste lahendihulkade
**ühisosa**.
`,
    naide: `
<MathBlock>{"\\\\begin{cases} x > 1 \\\\\\\\ x < 5 \\\\end{cases} \\\\quad \\\\Rightarrow \\\\quad 1 < x < 5"}</MathBlock>
`,
  },
  "03-teravnurga-funktsioonid": {
    definitsioon: `
Täisnurkses kolmnurgas teravnurga <Math>{"\\\\alpha"}</Math> trigonomeetrilised
funktsioonid on küljesuhted:
<MathBlock>{"\\\\sin\\\\alpha = \\\\dfrac{\\\\text{vastaskaatet}}{\\\\text{hüpotenuus}} \\\\qquad \\\\cos\\\\alpha = \\\\dfrac{\\\\text{lähiskaatet}}{\\\\text{hüpotenuus}} \\\\qquad \\\\tg\\\\,\\\\alpha = \\\\dfrac{\\\\text{vastaskaatet}}{\\\\text{lähiskaatet}}"}</MathBlock>
`,
    naide: `
Kaatetid <Math>{"3"}</Math> ja <Math>{"4"}</Math>, hüpotenuus
<Math>{"5"}</Math>: kaatetile <Math>{"3"}</Math> vastandnurga siinus on
<Math>{"\\\\dfrac{3}{5}"}</Math>.
`,
  },
  "03-taiendusnurga-funktsioonid": {
    definitsioon: `
Kaks nurka on **täiendusnurgad**, kui nende summa on <Math>{"90^\\\\circ"}</Math>.
Täisnurkses kolmnurgas on kaks teravnurka alati täiendusnurgad, mistõttu:
<MathBlock>{"\\\\sin(90^\\\\circ - \\\\alpha) = \\\\cos\\\\alpha \\\\qquad \\\\cos(90^\\\\circ - \\\\alpha) = \\\\sin\\\\alpha \\\\qquad \\\\tg\\\\,(90^\\\\circ - \\\\alpha) = \\\\ctg\\\\,\\\\alpha"}</MathBlock>
`,
    naide: `
Kui <Math>{"\\\\sin\\\\alpha = 0{,}6"}</Math>, siis
<Math>{"\\\\cos(90^\\\\circ - \\\\alpha) = 0{,}6"}</Math>.
`,
  },
  "03-trigonomeetria-pohiseosed": {
    definitsioon: `
Kaks põhiseost, mis kehtivad iga nurga <Math>{"\\\\alpha"}</Math> korral:
<MathBlock>{"\\\\sin^2\\\\alpha + \\\\cos^2\\\\alpha = 1 \\\\qquad \\\\tg\\\\,\\\\alpha = \\\\dfrac{\\\\sin\\\\alpha}{\\\\cos\\\\alpha}"}</MathBlock>
`,
    naide: `
Kui <Math>{"\\\\sin\\\\alpha = \\\\dfrac{3}{5}"}</Math> ja
<Math>{"\\\\alpha"}</Math> on teravnurk, siis:

<MathBlock>{"\\\\cos^2\\\\alpha = 1 - \\\\dfrac{9}{25} = \\\\dfrac{16}{25} \\\\quad \\\\Rightarrow \\\\quad \\\\cos\\\\alpha = \\\\dfrac{4}{5}"}</MathBlock>
`,
  },
  "03-taisnurkse-kolmnurga-lahendamine": {
    definitsioon: `
Täisnurkse kolmnurga **lahendamine** tähendab kõigi külgede ja nurkade
leidmist, kui teada on piisavalt algandmeid (nt kaks külge, või üks külg ja
üks teravnurk). Kasutatakse Pythagorase teoreemi ja trigonomeetria
põhiseoseid.
`,
    naide: `
Kui hüpotenuus on <Math>{"10"}</Math> ja <Math>{"\\\\sin\\\\alpha = 0{,}6"}</Math>,
siis nurgale <Math>{"\\\\alpha"}</Math> vastandkaatet on
<Math>{"10 \\\\cdot 0{,}6 = 6"}</Math>.
`,
  },
};
