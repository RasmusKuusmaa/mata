import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 12 (Sirge ja tasand ruumis). One entry per topic.
 * Re-exported from `selgitused/index.ts`. No bare `$...$` math delimiters —
 * see `eeldused.ts`'s header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "12-ruumigeomeetria-asendilaused": {
    definitsioon: `
**Ruumigeomeetria asendilaused** kirjeldavad sirgete ja tasandite
vastastikust asendit ruumis: kaks sirget võivad olla **lõikuvad**,
**paralleelsed** või **kiivad** (ei lõiku ega ole paralleelsed, ei asu
samal tasandil). Sirge ja tasand võivad olla **lõikuvad**, sirge võib
asuda **tasandil** või olla tasandiga **paralleelne**. Kaks tasandit on kas
**lõikuvad** või **paralleelsed**.
`,
    naide: `
Kuubi kaks vastaskülgede diagonaali, mis ei asu samal tahul, on tüüpiline
näide **kiivatest sirgetest** — nad ei lõiku ega ole paralleelsed.
`,
  },
  "12-nurk-kahe-sirge-vahel": {
    definitsioon: `
**Nurk kahe sirge vahel** ruumis leitakse nende sihivektorite
<Math>{"\\\\vec{a}"}</Math> ja <Math>{"\\\\vec{b}"}</Math> vahelise nurga kaudu:
<MathBlock>{"\\\\cos\\\\varphi = \\\\dfrac{|\\\\vec{a}\\\\cdot\\\\vec{b}|}{|\\\\vec{a}||\\\\vec{b}|}"}</MathBlock>
Absoluutväärtus tagab, et sirgetevaheline nurk on alati teravnurk (või
täisnurk).
`,
    naide: `
Sirgete sihivektorid on <Math>{"\\\\vec{a}=(1,2,2)"}</Math> ja
<Math>{"\\\\vec{b}=(2,3,6)"}</Math>. Siis
<Math>{"\\\\vec{a}\\\\cdot\\\\vec{b}=2+6+12=20"}</Math>,
<Math>{"|\\\\vec{a}|=3"}</Math>, <Math>{"|\\\\vec{b}|=7"}</Math>, seega
<Math>{"\\\\cos\\\\varphi=\\\\dfrac{20}{21}"}</Math>.
`,
  },
  "12-nurk-sirge-ja-tasandi-vahel": {
    definitsioon: `
**Nurk sirge ja tasandi vahel** on nurk sirge ja tema **projektsiooni**
vahel tasandil. Kui sirge sihivektor on <Math>{"\\\\vec{s}"}</Math> ja
tasandi normaalvektor <Math>{"\\\\vec{n}"}</Math>, siis
<MathBlock>{"\\\\sin\\\\varphi = \\\\dfrac{|\\\\vec{s}\\\\cdot\\\\vec{n}|}{|\\\\vec{s}||\\\\vec{n}|}"}</MathBlock>
(siinus, mitte koosinus, kuna nurk sirge ja normaali vahel on täiendusnurk
otsitavale nurgale).
`,
    naide: `
Kui <Math>{"\\\\vec{s}\\\\cdot\\\\vec{n}=0"}</Math>, on sirge tasandiga
paralleelne (nurk 0°); kui <Math>{"\\\\vec{s}"}</Math> ja
<Math>{"\\\\vec{n}"}</Math> on kollineaarsed, on sirge tasandiga risti
(nurk 90°).
`,
  },
  "12-nurk-kahe-tasandi-vahel": {
    definitsioon: `
**Nurk kahe tasandi vahel** leitakse nende normaalvektorite
<Math>{"\\\\vec{n_1}"}</Math>, <Math>{"\\\\vec{n_2}"}</Math> vahelise nurga
kaudu:
<MathBlock>{"\\\\cos\\\\varphi = \\\\dfrac{|\\\\vec{n_1}\\\\cdot\\\\vec{n_2}|}{|\\\\vec{n_1}||\\\\vec{n_2}|}"}</MathBlock>
`,
    naide: `
Tasandite normaalvektorid on <Math>{"\\\\vec{n_1}=(1,0,0)"}</Math> ja
<Math>{"\\\\vec{n_2}=(1,1,0)"}</Math>. Siis
<Math>{"\\\\cos\\\\varphi=\\\\dfrac{1}{\\\\sqrt2}"}</Math>, ehk
<Math>{"\\\\varphi=45^\\\\circ"}</Math>.
`,
  },
  "12-paralleelsus": {
    definitsioon: `
Kaks sirget on **paralleelsed**, kui nende sihivektorid on kollineaarsed.
Sirge on tasandiga **paralleelne**, kui sirge sihivektor on risti tasandi
normaalvektoriga (<Math>{"\\\\vec{s}\\\\cdot\\\\vec{n}=0"}</Math>). Kaks tasandit
on **paralleelsed**, kui nende normaalvektorid on kollineaarsed.
`,
    naide: `
Tasandid <Math>{"x+2y-z=1"}</Math> ja <Math>{"2x+4y-2z=5"}</Math> on
paralleelsed, sest normaalvektorid <Math>{"(1,2,-1)"}</Math> ja
<Math>{"(2,4,-2)"}</Math> on kollineaarsed (teine on esimese kahekordne).
`,
  },
  "12-ristseis": {
    definitsioon: `
Kaks sirget on **ristsirged**, kui nende sihivektorite skalaarkorrutis on
null. Sirge on tasandiga risti, kui sirge sihivektor on kollineaarne
tasandi normaalvektoriga. Kaks tasandit on risti, kui nende
normaalvektorite skalaarkorrutis on null.
`,
    naide: `
Sirged sihivektoritega <Math>{"(1,2,2)"}</Math> ja <Math>{"(2,2,-3)"}</Math>
on ristsirged, sest <Math>{"1\\\\cdot2+2\\\\cdot2+2\\\\cdot(-3)=2+4-6=0"}</Math>.
`,
  },
  "12-kolme-ristsirge-teoreem": {
    definitsioon: `
**Kolme ristsirge teoreem**: kui sirge <Math>{"a"}</Math> tasandil on risti
sirge <Math>{"b"}</Math> **projektsiooniga** tasandile, siis on
<Math>{"a"}</Math> risti ka sirge <Math>{"b"}</Math> endaga (ja
vastupidi). Kasutatakse laialdaselt püramiidide ja muude ruumiliste
kujundite kõrguste ja nurkade leidmisel.
`,
    naide: `
Korrapärase püramiidi puhul kasutatakse kolme ristsirge teoreemi, et
näidata, et külgtahu apoteem on risti põhiserva ehk selle projektsiooniga
põhitasandil.
`,
  },
  "12-hulknurga-projektsiooni-pindala": {
    definitsioon: `
Kui tasandilise hulknurga pindala on <Math>{"S"}</Math> ja tema
projektsiooni tegev tasand moodustab hulknurga tasandiga nurga
<Math>{"\\\\varphi"}</Math>, siis projektsiooni pindala
<MathBlock>{"S' = S\\\\cos\\\\varphi"}</MathBlock>
`,
    naide: `
Ruudu pindala <Math>{"S=16"}</Math> ja projektsioonitasandi nurk
<Math>{"\\\\varphi=60^\\\\circ"}</Math> korral on projektsiooni pindala
<Math>{"S'=16\\\\cdot\\\\dfrac12=8"}</Math>.
`,
  },
  "12-ristkoordinaadid-ruumis": {
    definitsioon: `
**Ristkoordinaadid ruumis** — igale punktile vastab kolmik
<Math>{"(x,y,z)"}</Math> kolme üksteisega risti oleva telje suhtes. Kahe
punkti vaheline kaugus:
<MathBlock>{"d=\\\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}"}</MathBlock>
`,
    naide: `
Punktide <Math>{"A(1,2,2)"}</Math> ja <Math>{"B(4,6,2)"}</Math> vaheline
kaugus on
<Math>{"\\\\sqrt{3^2+4^2+0^2}=\\\\sqrt{25}=5"}</Math>.
`,
  },
  "12-punkti-kohavektor": {
    definitsioon: `
Punkti <Math>{"P(x,y,z)"}</Math> **kohavektor** on vektor koordinaatide
alguspunktist <Math>{"O"}</Math> punkti <Math>{"P"}</Math>:
<Math>{"\\\\overrightarrow{OP}=(x,y,z)"}</Math>. Kahe punkti
<Math>{"A"}</Math>, <Math>{"B"}</Math> vaheline vektor on nende
kohavektorite vahe:
<MathBlock>{"\\\\overrightarrow{AB}=\\\\overrightarrow{OB}-\\\\overrightarrow{OA}"}</MathBlock>
`,
    naide: `
Kui <Math>{"A(1,2,3)"}</Math> ja <Math>{"B(4,0,5)"}</Math>, siis
<Math>{"\\\\overrightarrow{AB}=(3,-2,2)"}</Math>.
`,
  },
  "12-ruumivektori-koordinaadid-ja-pikkus": {
    definitsioon: `
Ruumivektori <Math>{"\\\\vec{a}=(x,y,z)"}</Math> **pikkus**:
<MathBlock>{"|\\\\vec{a}|=\\\\sqrt{x^2+y^2+z^2}"}</MathBlock>
`,
    naide: `
Vektori <Math>{"\\\\vec{a}=(2,3,6)"}</Math> pikkus on
<Math>{"\\\\sqrt{4+9+36}=\\\\sqrt{49}=7"}</Math>.
`,
  },
  "12-lineaartehted-ruumivektoritega": {
    definitsioon: `
Ruumivektoreid **liidetakse ja lahutatakse** koordinaaditi ning
**korrutatakse arvuga** iga koordinaati eraldi korrutades:
<MathBlock>{"\\\\vec{a}\\\\pm\\\\vec{b}=(a_x\\\\pm b_x,\\\\,a_y\\\\pm b_y,\\\\,a_z\\\\pm b_z)\\\\qquad k\\\\vec{a}=(ka_x,ka_y,ka_z)"}</MathBlock>
`,
    naide: `
Kui <Math>{"\\\\vec{a}=(1,2,-3)"}</Math> ja <Math>{"\\\\vec{b}=(2,-1,4)"}</Math>,
siis <Math>{"\\\\vec{a}+\\\\vec{b}=(3,1,1)"}</Math> ja
<Math>{"2\\\\vec{a}=(2,4,-6)"}</Math>.
`,
  },
  "12-kollinearsus-ruumis": {
    definitsioon: `
Ruumivektorid <Math>{"\\\\vec{a}"}</Math> ja <Math>{"\\\\vec{b}"}</Math> on
**kollineaarsed**, kui üks on teise arvkordne:
<Math>{"\\\\vec{a}=k\\\\vec{b}"}</Math>, ehk koordinaadid on võrdelised:
<MathBlock>{"\\\\dfrac{a_x}{b_x}=\\\\dfrac{a_y}{b_y}=\\\\dfrac{a_z}{b_z}"}</MathBlock>
`,
    naide: `
Vektorid <Math>{"(2,4,6)"}</Math> ja <Math>{"(1,2,3)"}</Math> on
kollineaarsed, sest <Math>{"\\\\dfrac21=\\\\dfrac42=\\\\dfrac63=2"}</Math>.
`,
  },
  "12-komplanaarsus": {
    definitsioon: `
Kolm vektorit on **komplanaarsed**, kui nad asuvad ühel tasandil (või
paralleelsetel tasanditel) — see on samaväärne sellega, et üht neist saab
avaldada teise kahe **lineaarkombinatsioonina**, ja sellega, et nende
**segakorrutis** (kolmerealine determinant koordinaatidest) võrdub nulliga.
`,
    naide: `
Vektorid <Math>{"(1,0,0)"}</Math>, <Math>{"(0,1,0)"}</Math> ja
<Math>{"(1,1,0)"}</Math> on komplanaarsed (kõik <Math>{"z=0"}</Math>
tasandil), sest kolmas on esimese kahe summa.
`,
  },
  "12-vektori-avaldamine-kolme-vektori-kaudu": {
    definitsioon: `
Kui <Math>{"\\\\vec{a}"}</Math>, <Math>{"\\\\vec{b}"}</Math>,
<Math>{"\\\\vec{c}"}</Math> ei ole komplanaarsed, saab **iga** ruumivektori
<Math>{"\\\\vec{v}"}</Math> avaldada nende **lineaarkombinatsioonina**:
<MathBlock>{"\\\\vec{v}=x\\\\vec{a}+y\\\\vec{b}+z\\\\vec{c}"}</MathBlock>
ühesel viisil.
`,
    naide: `
Kui <Math>{"\\\\vec{a}=(1,0,0)"}</Math>, <Math>{"\\\\vec{b}=(0,1,0)"}</Math>,
<Math>{"\\\\vec{c}=(0,0,1)"}</Math> ja <Math>{"\\\\vec{v}=(2,3,4)"}</Math>, siis
<Math>{"\\\\vec{v}=2\\\\vec{a}+3\\\\vec{b}+4\\\\vec{c}"}</Math>.
`,
  },
  "12-skalaarkorrutis-ruumis": {
    definitsioon: `
Ruumivektorite <Math>{"\\\\vec{a}=(a_x,a_y,a_z)"}</Math> ja
<Math>{"\\\\vec{b}=(b_x,b_y,b_z)"}</Math> **skalaarkorrutis**:
<MathBlock>{"\\\\vec{a}\\\\cdot\\\\vec{b}=a_xb_x+a_yb_y+a_zb_z=|\\\\vec{a}||\\\\vec{b}|\\\\cos\\\\varphi"}</MathBlock>
`,
    naide: `
Kui <Math>{"\\\\vec{a}=(1,2,2)"}</Math> ja <Math>{"\\\\vec{b}=(2,3,6)"}</Math>,
siis <Math>{"\\\\vec{a}\\\\cdot\\\\vec{b}=2+6+12=20"}</Math>.
`,
  },
  "12-kahe-vektori-nurk-ruumis": {
    definitsioon: `
Kahe ruumivektori vaheline nurk:
<MathBlock>{"\\\\cos\\\\varphi=\\\\dfrac{\\\\vec{a}\\\\cdot\\\\vec{b}}{|\\\\vec{a}||\\\\vec{b}|}"}</MathBlock>
Erinevalt sirgetevahelisest nurgast (mis on alati teravnurk) võib
vektorite vaheline nurk olla ka nüri — koosinus võib olla negatiivne.
`,
    naide: `
Vektorite <Math>{"\\\\vec{a}=(1,2,2)"}</Math> ja
<Math>{"\\\\vec{b}=(2,3,6)"}</Math> vahel on
<Math>{"\\\\cos\\\\varphi=\\\\dfrac{20}{21}"}</Math>.
`,
  },
  "12-sirge-vorrandid-ruumis": {
    definitsioon: `
Sirge ruumis läbi punkti <Math>{"(x_0,y_0,z_0)"}</Math> sihivektoriga
<Math>{"(m,n,p)"}</Math> — **parameetriline võrrand**:
<MathBlock>{"x=x_0+mt,\\\\quad y=y_0+nt,\\\\quad z=z_0+pt"}</MathBlock>
ja **kanooniline kuju** (kui <Math>{"m,n,p\\\\ne0"}</Math>):
<MathBlock>{"\\\\dfrac{x-x_0}{m}=\\\\dfrac{y-y_0}{n}=\\\\dfrac{z-z_0}{p}"}</MathBlock>
`,
    naide: `
Sirge läbi <Math>{"(1,2,3)"}</Math> sihivektoriga <Math>{"(2,0,-1)"}</Math>:
<Math>{"x=1+2t,\\\\ y=2,\\\\ z=3-t"}</Math>.
`,
  },
  "12-tasandi-vorrand": {
    definitsioon: `
Tasandi **üldvõrrand**, kui normaalvektor on <Math>{"(A,B,C)"}</Math> ja
tasand läbib punkti <Math>{"(x_0,y_0,z_0)"}</Math>:
<MathBlock>{"A(x-x_0)+B(y-y_0)+C(z-z_0)=0 \\\\quad\\\\Leftrightarrow\\\\quad Ax+By+Cz+D=0"}</MathBlock>
`,
    naide: `
Tasand normaalvektoriga <Math>{"(2,-1,3)"}</Math> läbi punkti
<Math>{"(1,0,2)"}</Math>:
<Math>{"2(x-1)-1(y-0)+3(z-2)=0 \\\\Rightarrow 2x-y+3z-8=0"}</Math>.
`,
  },
  "12-vastastikuse-asendi-uurimine": {
    definitsioon: `
Sirgete ja tasandite **vastastikust asendit** uuritakse nende siha- ja
normaalvektorite abil: kollineaarsus/komplanaarsus annab paralleelsuse,
skalaarkorrutis null annab ristseisu, muul juhul lahendatakse
võrrandisüsteem, et leida, kas ja kus objektid lõikuvad.
`,
    naide: `
Kaks tasandit normaalvektoritega <Math>{"(1,1,1)"}</Math> ja
<Math>{"(2,2,2)"}</Math> on paralleelsed (kollineaarsed normaalid) — kas
kokkulangevad või mitte, otsustab, kas ka vabaliige on proportsionaalne.
`,
  },
  "12-sirge-ja-tasandi-loikepunkt": {
    definitsioon: `
Sirge <Math>{"x=x_0+mt,\\\\ y=y_0+nt,\\\\ z=z_0+pt"}</Math> ja tasandi
<Math>{"Ax+By+Cz+D=0"}</Math> **lõikepunkt** leitakse, asendades sirge
võrrandid tasandi võrrandisse ja lahendades parameetri <Math>{"t"}</Math>
suhtes.
`,
    naide: `
Sirge <Math>{"x=1+t,\\\\ y=2,\\\\ z=1-t"}</Math> ja tasand
<Math>{"x+z=4"}</Math>: <Math>{"(1+t)+(1-t)=2\\\\ne4"}</Math> — sirge on
tasandiga paralleelne (ei lõiku), sest <Math>{"t"}</Math> taandub välja.
`,
  },
  "12-ruumigeomeetria-rakendusulesanded": {
    definitsioon: `
Ruumigeomeetria rakendusülesanded ühendavad vektorite, sirgete ja
tasandite tehnikad reaalsete kujundite (kuup, prisma, püramiid) nurkade,
kauguste ja pindalade leidmiseks — sageli koordinaatide sobiva valikuga
kujundi tippudele.
`,
    naide: `
Ühikkuubi diagonaali ja põhitahu vahelise nurga leidmiseks paigutatakse
kuup koordinaatteljestikku tippudega <Math>{"(0,0,0)"}</Math> ja
<Math>{"(1,1,1)"}</Math> ning kasutatakse skalaarkorrutist.
`,
  },
};
