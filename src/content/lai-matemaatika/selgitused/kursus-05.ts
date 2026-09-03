import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 5 (Vektor tasandil. Joone võrrand). One entry per
 * topic. Re-exported from `selgitused/index.ts`. No bare `$...$` math
 * delimiters — see `eeldused.ts`'s header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "05-kahe-punkti-vaheline-kaugus": {
    definitsioon: `
Kahe punkti <Math>{"A(x_1,y_1)"}</Math> ja <Math>{"B(x_2,y_2)"}</Math>
vaheline kaugus:
<MathBlock>{"AB = \\\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}"}</MathBlock>
`,
    naide: `
<Math>{"A(1,2)"}</Math>, <Math>{"B(4,6)"}</Math>:
<Math>{"AB=\\\\sqrt{3^2+4^2}=5"}</Math>.
`,
  },
  "05-vektori-moiste-ja-liigid": {
    definitsioon: `
**Vektor** on suunatud lõik. **Nullvektoril** on pikkus null.
**Ühikvektoril** on pikkus üks. **Vastandvektoril** on sama pikkus, aga
vastupidine suund.
`,
    naide: `
Vektori <Math>{"\\\\vec{a}=(3,4)"}</Math> vastandvektor on
<Math>{"-\\\\vec{a}=(-3,-4)"}</Math>.
`,
  },
  "05-vektori-koordinaadid": {
    definitsioon: `
Vektori <Math>{"\\\\overrightarrow{AB}"}</Math> koordinaadid saadakse
lõpp-punkti koordinaatidest algpunkti koordinaadid lahutades:
<MathBlock>{"\\\\overrightarrow{AB} = (x_B-x_A,\\\\ y_B-y_A)"}</MathBlock>
`,
    naide: `
<Math>{"A(1,2)"}</Math>, <Math>{"B(4,6)"}</Math>:
<Math>{"\\\\overrightarrow{AB}=(3,4)"}</Math>.
`,
  },
  "05-vektori-pikkus": {
    definitsioon: `
Vektori <Math>{"\\\\vec{a}=(x,y)"}</Math> pikkus:
<MathBlock>{"|\\\\vec{a}| = \\\\sqrt{x^2+y^2}"}</MathBlock>
`,
    naide: `
<Math>{"\\\\vec{a}=(3,4) \\\\Rightarrow |\\\\vec{a}|=5"}</Math>.
`,
  },
  "05-vektorite-liitmine-ja-lahutamine": {
    definitsioon: `
Vektoreid liidetakse ja lahutatakse koordinaaditi:
<MathBlock>{"\\\\vec{a}\\\\pm\\\\vec{b} = (x_a\\\\pm x_b,\\\\ y_a\\\\pm y_b)"}</MathBlock>
`,
    naide: `
<Math>{"(2,3)+(1,-5)=(3,-2)"}</Math>.
`,
  },
  "05-vektori-korrutamine-arvuga": {
    definitsioon: `
Vektorit arvuga korrutades korrutatakse mõlemad koordinaadid selle arvuga:
<MathBlock>{"k\\\\vec{a} = (kx,\\\\ ky)"}</MathBlock>
Kui <Math>{"k>0"}</Math>, jääb suund samaks; kui <Math>{"k<0"}</Math>, pöördub
suund vastupidiseks.
`,
    naide: `
<Math>{"3\\\\cdot(2,-1)=(6,-3)"}</Math>.
`,
  },
  "05-loigu-keskpunkt": {
    definitsioon: `
Lõigu <Math>{"AB"}</Math> keskpunkti koordinaadid on otspunktide
koordinaatide keskmised:
<MathBlock>{"K = \\\\left(\\\\dfrac{x_A+x_B}{2},\\\\ \\\\dfrac{y_A+y_B}{2}\\\\right)"}</MathBlock>
`,
    naide: `
<Math>{"A(1,2)"}</Math>, <Math>{"B(5,8)"}</Math>: keskpunkt
<Math>{"(3,5)"}</Math>.
`,
  },
  "05-kahe-vektori-vaheline-nurk": {
    definitsioon: `
Kahe vektori vahelise nurga koosinus skalaarkorrutise kaudu:
<MathBlock>{"\\\\cos\\\\varphi = \\\\dfrac{\\\\vec{a}\\\\cdot\\\\vec{b}}{|\\\\vec{a}||\\\\vec{b}|}"}</MathBlock>
`,
    naide: `
<Math>{"\\\\vec{a}=(1,0)"}</Math>, <Math>{"\\\\vec{b}=(3,4)"}</Math>:
<Math>{"\\\\cos\\\\varphi=\\\\dfrac{3}{5}"}</Math>.
`,
  },
  "05-vektorite-kollinearsus": {
    definitsioon: `
Kaks vektorit on **kollineaarsed** (paralleelsed), kui üks on teise
skalaarikordne. Koordinaatides kontrollitakse tunnusega:
<MathBlock>{"x_a y_b - x_b y_a = 0"}</MathBlock>
`,
    naide: `
<Math>{"(2,3)"}</Math> ja <Math>{"(4,6)"}</Math> on kollineaarsed, sest
<Math>{"(4,6)=2\\\\cdot(2,3)"}</Math>.
`,
  },
  "05-skalaarkorrutis": {
    definitsioon: `
Kahe vektori **skalaarkorrutis**:
<MathBlock>{"\\\\vec{a}\\\\cdot\\\\vec{b} = x_ax_b+y_ay_b"}</MathBlock>
Tulemus on arv (skalaar), mitte vektor.
`,
    naide: `
<Math>{"(2,3)\\\\cdot(4,-1)=8-3=5"}</Math>.
`,
  },
  "05-vektorite-ristseis": {
    definitsioon: `
Kaks vektorit on **ristseisus** (perpendikulaarsed), kui nende skalaarkorrutis
on null:
<MathBlock>{"\\\\vec{a}\\\\cdot\\\\vec{b} = 0"}</MathBlock>
`,
    naide: `
<Math>{"(2,3)"}</Math> ja <Math>{"(3,-2)"}</Math> on ristseisus, sest
<Math>{"2\\\\cdot3+3\\\\cdot(-2)=0"}</Math>.
`,
  },
  "05-kolmnurga-lahendamine-vektoritega": {
    definitsioon: `
Vektoreid saab kasutada kolmnurga külgede, mediaanide ja nurkade
leidmiseks: külg on tippude vaheline vektor, mediaan ühendab tippu vastaskülje
keskpunktiga.
`,
    naide: `
Kui <Math>{"\\\\overrightarrow{AB}"}</Math> ja
<Math>{"\\\\overrightarrow{BC}"}</Math> on teada, siis
<Math>{"\\\\overrightarrow{CA}=-(\\\\overrightarrow{AB}+\\\\overrightarrow{BC})"}</Math>.
`,
  },
  "05-sirge-punkti-ja-sihivektoriga": {
    definitsioon: `
Sirge, mis läbib punkti <Math>{"(x_0,y_0)"}</Math> sihivektoriga
<Math>{"(a,b)"}</Math>, parameetriline võrrand:
<MathBlock>{"(x,y) = (x_0,y_0) + t(a,b)"}</MathBlock>
`,
    naide: `
Kui <Math>{"(x_0,y_0)=(1,2)"}</Math>, <Math>{"(a,b)=(3,1)"}</Math>,
<Math>{"t=2"}</Math>: punkt on <Math>{"(7,4)"}</Math>.
`,
  },
  "05-sirge-punkti-ja-tousuga": {
    definitsioon: `
Sirge, mis läbib punkti <Math>{"(x_0,y_0)"}</Math> tõusuga <Math>{"k"}</Math>:
<MathBlock>{"y-y_0 = k(x-x_0)"}</MathBlock>
`,
    naide: `
Punkt <Math>{"(2,3)"}</Math>, tõus <Math>{"k=2"}</Math>:
<Math>{"y-3=2(x-2) \\\\Rightarrow y=2x-1"}</Math>.
`,
  },
  "05-sirge-tous-ja-algordinaat": {
    definitsioon: `
Sirge tõusu ja algordinaadi kuju:
<MathBlock>{"y = kx+b"}</MathBlock>
kus <Math>{"k"}</Math> on tõus ja <Math>{"b"}</Math> on lõikepunkt y-teljega
(algordinaat).
`,
    naide: `
<Math>{"y=2x+3"}</Math>: tõus <Math>{"2"}</Math>, algordinaat
<Math>{"3"}</Math>.
`,
  },
  "05-sirge-kahe-punktiga": {
    definitsioon: `
Kahe punkti kaudu antud sirge tõus:
<MathBlock>{"k = \\\\dfrac{y_2-y_1}{x_2-x_1}"}</MathBlock>
Sellest ja ühest punktist saab koostada täieliku võrrandi.
`,
    naide: `
<Math>{"(1,2)"}</Math> ja <Math>{"(3,8)"}</Math>:
<Math>{"k=\\\\dfrac{6}{2}=3"}</Math>.
`,
  },
  "05-sirge-uldvorrand": {
    definitsioon: `
Sirge **üldvõrrand**:
<MathBlock>{"ax+by+c=0"}</MathBlock>
Tõus <Math>{"k=-\\\\dfrac{a}{b}"}</Math>, lõikepunkt x-teljega
<Math>{"x=-\\\\dfrac{c}{a}"}</Math>, lõikepunkt y-teljega
<Math>{"y=-\\\\dfrac{c}{b}"}</Math>.
`,
    naide: `
<Math>{"2x+3y-6=0"}</Math>: x-lõikepunkt <Math>{"3"}</Math>, y-lõikepunkt
<Math>{"2"}</Math>.
`,
  },
  "05-kahe-sirge-vastastikune-asend": {
    definitsioon: `
Kaks sirget on **paralleelsed**, kui tõusud on võrdsed
(<Math>{"k_1=k_2"}</Math>); **risti**, kui tõusude korrutis on
<Math>{"-1"}</Math>; muidu on nad **lõikuvad**.
`,
    naide: `
<Math>{"k_1=2"}</Math>, <Math>{"k_2=-\\\\frac12"}</Math>: sirged on risti,
sest <Math>{"2\\\\cdot(-\\\\frac12)=-1"}</Math>.
`,
  },
  "05-nurk-kahe-sirge-vahel": {
    definitsioon: `
Kahe sirge (tõusudega <Math>{"k_1"}</Math> ja <Math>{"k_2"}</Math>) vahelise
nurga tangens:
<MathBlock>{"\\\\tg\\\\,\\\\varphi = \\\\dfrac{k_2-k_1}{1+k_1k_2}"}</MathBlock>
`,
    naide: `
<Math>{"k_1=0"}</Math>, <Math>{"k_2=1"}</Math>:
<Math>{"\\\\tg\\\\,\\\\varphi=1"}</Math>.
`,
  },
  "05-ringjoone-vorrand": {
    definitsioon: `
Ringjoone võrrand keskpunktiga <Math>{"(a,b)"}</Math> ja raadiusega
<Math>{"r"}</Math>:
<MathBlock>{"(x-a)^2+(y-b)^2=r^2"}</MathBlock>
`,
    naide: `
Keskpunkt <Math>{"(2,-1)"}</Math>, raadius <Math>{"3"}</Math>:
<Math>{"(x-2)^2+(y+1)^2=9"}</Math>.
`,
  },
  "05-parabool": {
    definitsioon: `
Parabooli lihtsaim võrrand tipuga alguspunktis: <Math>{"y=ax^2"}</Math>.
Tipuga <Math>{"(h,k)"}</Math>: <Math>{"y=a(x-h)^2+k"}</Math>. Standardkuju
<Math>{"y^2=2px"}</Math> avaneb x-telje suunas.
`,
    naide: `
<Math>{"y^2=8x"}</Math> korral, kui <Math>{"y=4"}</Math>, siis
<Math>{"x=\\\\dfrac{16}{8}=2"}</Math>.
`,
  },
  "05-hyperbool": {
    definitsioon: `
Hüperbooli lihtsaim kuju <Math>{"y=\\\\dfrac{k}{x}"}</Math>. Standardkuju
<Math>{"\\\\dfrac{x^2}{a^2}-\\\\dfrac{y^2}{b^2}=1"}</Math> tippudega
<Math>{"(\\\\pm a,0)"}</Math> ja asümptootidega
<Math>{"y=\\\\pm\\\\dfrac{b}{a}x"}</Math>.
`,
    naide: `
<Math>{"\\\\dfrac{x^2}{9}-\\\\dfrac{y^2}{16}=1"}</Math>: tipp
<Math>{"(3,0)"}</Math>, asümptoot <Math>{"y=\\\\dfrac{4}{3}x"}</Math>.
`,
  },
  "05-joone-vorrandi-moiste": {
    definitsioon: `
Punkt asub joonel siis ja ainult siis, kui selle koordinaadid **rahuldavad**
joone võrrandit — asendamisel saadakse tõene võrdus.
`,
    naide: `
Punkt <Math>{"(2,7)"}</Math> asub sirgel <Math>{"y=3x+1"}</Math>, sest
<Math>{"3\\\\cdot2+1=7"}</Math>.
`,
  },
  "05-kahe-joone-loikepunkt": {
    definitsioon: `
Kahe joone lõikepunkti leidmiseks lahendatakse nende võrranditest
moodustatud **võrrandisüsteem**.
`,
    naide: `
<Math>{"y=x+1"}</Math> ja <Math>{"y=-x+5"}</Math> lõikuvad, kui
<Math>{"x+1=-x+5 \\\\Rightarrow x=2,\\\\ y=3"}</Math>.
`,
  },
};
