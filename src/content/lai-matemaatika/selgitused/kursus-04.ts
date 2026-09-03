import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 4 (Trigonomeetria II). One entry per topic.
 * Re-exported from `selgitused/index.ts`. No bare `$...$` math delimiters —
 * see `eeldused.ts`'s header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "04-nurga-moiste-uldistamine": {
    definitsioon: `
**Suunatud nurk** tekib kiire pöörlemisel algasendist: positiivne, kui
pöörlemine on vastupäeva, negatiivne, kui päripäeva. Nurk võib olla ka
**täispöördest suurem** (üle <Math>{"360^\\\\circ"}</Math>). Kaks nurka on
**samatähenduslikud**, kui need erinevad täispöörete arvu võrra.
`,
    naide: `
Nurgad <Math>{"390^\\\\circ"}</Math> ja <Math>{"30^\\\\circ"}</Math> on
samatähenduslikud, sest <Math>{"390^\\\\circ - 360^\\\\circ = 30^\\\\circ"}</Math>.
`,
  },
  "04-kraadi-ja-radiaanmoot": {
    definitsioon: `
Radiaanmõõt näitab, mitu raadiuse pikkust mahub kaare peale. Täisring on
<Math>{"2\\\\pi"}</Math> radiaani ehk <Math>{"360^\\\\circ"}</Math>:
<MathBlock>{"\\\\alpha_{rad} = \\\\dfrac{\\\\alpha^\\\\circ \\\\cdot \\\\pi}{180^\\\\circ} \\\\qquad \\\\alpha^\\\\circ = \\\\dfrac{\\\\alpha_{rad} \\\\cdot 180^\\\\circ}{\\\\pi}"}</MathBlock>
`,
    naide: `
<MathBlock>{"60^\\\\circ = \\\\dfrac{60\\\\pi}{180} = \\\\dfrac{\\\\pi}{3}"}</MathBlock>
`,
  },
  "04-mis-tahes-nurga-funktsioonid": {
    definitsioon: `
Ühikringjoonel (raadius <Math>{"1"}</Math>, tsenter alguspunktis) vastab igale
nurgale <Math>{"\\\\alpha"}</Math> täpselt üks punkt. Selle punkti koordinaadid
**defineerivad** siinuse ja koosinuse iga nurga jaoks, mitte ainult teravnurga
jaoks:
<MathBlock>{"(\\\\cos\\\\alpha, \\\\sin\\\\alpha)"}</MathBlock>
Märk sõltub veerandist: I veerandis on mõlemad positiivsed, II veerandis on
siinus positiivne ja koosinus negatiivne, III veerandis on mõlemad
negatiivsed, IV veerandis on koosinus positiivne ja siinus negatiivne.
`,
    naide: `
Kui nurga <Math>{"\\\\alpha"}</Math> haar lõikab ühikringjoont punktis
<Math>{"(-0{,}6;\\\\ 0{,}8)"}</Math>, siis <Math>{"\\\\cos\\\\alpha = -0{,}6"}</Math>
ja <Math>{"\\\\sin\\\\alpha = 0{,}8"}</Math> (II veerand).
`,
  },
  "04-tapsed-vaartused": {
    definitsioon: `
Nurkade <Math>{"0^\\\\circ, 30^\\\\circ, 45^\\\\circ, 60^\\\\circ, 90^\\\\circ, 180^\\\\circ, 270^\\\\circ, 360^\\\\circ"}</Math>
täpsed trigonomeetriliste funktsioonide väärtused tasub peast teada — need
tulenevad täisnurksest kolmnurgast (poolitatud võrdkülgne, ristkülikukujuline)
ja ühikringjoonest.
`,
    naide: `
<MathBlock>{"\\\\sin\\\\,30^\\\\circ = \\\\dfrac{1}{2} \\\\qquad \\\\cos\\\\,30^\\\\circ = \\\\dfrac{\\\\sqrt3}{2} \\\\qquad \\\\tg\\\\,30^\\\\circ = \\\\dfrac{\\\\sqrt3}{3}"}</MathBlock>
`,
  },
  "04-sama-nurga-funktsioonide-seosed": {
    definitsioon: `
Põhiseosed <Math>{"\\\\sin^2\\\\alpha + \\\\cos^2\\\\alpha = 1"}</Math> ja
<Math>{"\\\\tg\\\\,\\\\alpha = \\\\dfrac{\\\\sin\\\\alpha}{\\\\cos\\\\alpha}"}</Math>
kehtivad **iga** nurga korral, mitte ainult teravnurga korral — ainult
tuleb valemi rakendamisel jälgida õiget märki vastavalt veerandile.
`,
    naide: `
Kui <Math>{"\\\\alpha"}</Math> on II veerandi nurk ja
<Math>{"\\\\sin\\\\alpha = \\\\dfrac{3}{5}"}</Math>, siis
<Math>{"\\\\cos\\\\alpha = -\\\\dfrac{4}{5}"}</Math> (negatiivne, sest II veerand).
`,
  },
  "04-taandamisvalemid": {
    definitsioon: `
**Taandamisvalemid** viivad mis tahes nurga funktsiooni tagasi teravnurga
funktsioonile. Nurkade <Math>{"180^\\\\circ \\\\pm \\\\alpha"}</Math> ja
<Math>{"360^\\\\circ \\\\pm \\\\alpha"}</Math> juures funktsioon **säilib**
(siinus jääb siinuseks), aga nurkade <Math>{"90^\\\\circ \\\\pm \\\\alpha"}</Math>
ja <Math>{"270^\\\\circ \\\\pm \\\\alpha"}</Math> juures funktsioon **vahetub**
(siinus muutub koosinuseks). Märk määratakse algse nurga veerandi järgi.
`,
    naide: `
<MathBlock>{"\\\\sin(180^\\\\circ - \\\\alpha) = \\\\sin\\\\alpha \\\\qquad \\\\cos(90^\\\\circ - \\\\alpha) = \\\\sin\\\\alpha"}</MathBlock>
`,
  },
  "04-negatiivse-ja-taispoordest-suurema-nurga-funktsioonid": {
    definitsioon: `
Siinus ja tangens on **paaritud** funktsioonid
(<Math>{"\\\\sin(-\\\\alpha) = -\\\\sin\\\\alpha"}</Math>), koosinus on
**paarisfunktsioon** (<Math>{"\\\\cos(-\\\\alpha) = \\\\cos\\\\alpha"}</Math>).
Kõik kolm on **perioodilised** perioodiga <Math>{"360^\\\\circ"}</Math>:
täispöörde võrra suurema nurga funktsioon on sama.
`,
    naide: `
<MathBlock>{"\\\\sin(750^\\\\circ) = \\\\sin(750^\\\\circ - 2\\\\cdot360^\\\\circ) = \\\\sin\\\\,30^\\\\circ = \\\\dfrac{1}{2}"}</MathBlock>
`,
  },
  "04-kahe-nurga-summa-ja-vahe": {
    definitsioon: `
Kahe nurga summa ja vahe siinuse ning koosinuse valemid:
<MathBlock>{"\\\\sin(\\\\alpha\\\\pm\\\\beta) = \\\\sin\\\\alpha\\\\cos\\\\beta \\\\pm \\\\cos\\\\alpha\\\\sin\\\\beta"}</MathBlock>
<MathBlock>{"\\\\cos(\\\\alpha\\\\pm\\\\beta) = \\\\cos\\\\alpha\\\\cos\\\\beta \\\\mp \\\\sin\\\\alpha\\\\sin\\\\beta"}</MathBlock>
`,
    naide: `
<MathBlock>{"\\\\sin(30^\\\\circ+60^\\\\circ) = \\\\sin30^\\\\circ\\\\cos60^\\\\circ+\\\\cos30^\\\\circ\\\\sin60^\\\\circ = \\\\dfrac12\\\\cdot\\\\dfrac12+\\\\dfrac{\\\\sqrt3}2\\\\cdot\\\\dfrac{\\\\sqrt3}2 = 1"}</MathBlock>
(nagu <Math>{"\\\\sin\\\\,90^\\\\circ = 1"}</Math>).
`,
  },
  "04-kahekordse-nurga-valemid": {
    definitsioon: `
Kahekordse nurga valemid saadakse summavalemist, kui <Math>{"\\\\beta=\\\\alpha"}</Math>:
<MathBlock>{"\\\\sin\\\\,2\\\\alpha = 2\\\\sin\\\\alpha\\\\cos\\\\alpha"}</MathBlock>
<MathBlock>{"\\\\cos\\\\,2\\\\alpha = \\\\cos^2\\\\alpha - \\\\sin^2\\\\alpha = 2\\\\cos^2\\\\alpha-1 = 1-2\\\\sin^2\\\\alpha"}</MathBlock>
`,
    naide: `
Kui <Math>{"\\\\alpha=30^\\\\circ"}</Math>, siis
<Math>{"\\\\sin\\\\,60^\\\\circ = 2\\\\cdot\\\\dfrac12\\\\cdot\\\\dfrac{\\\\sqrt3}2 = \\\\dfrac{\\\\sqrt3}2"}</Math>.
`,
  },
  "04-trigonomeetriliste-avaldiste-teisendamine": {
    definitsioon: `
Trigonomeetriliste avaldiste lihtsustamisel kasutatakse põhiseost
<Math>{"\\\\sin^2\\\\alpha+\\\\cos^2\\\\alpha=1"}</Math> ja sellest tuletatud
seost <Math>{"1+\\\\tg^2\\\\alpha = \\\\dfrac{1}{\\\\cos^2\\\\alpha}"}</Math>, et
kaotada avaldisest muutuja <Math>{"\\\\alpha"}</Math> täielikult.
`,
    naide: `
<MathBlock>{"5(\\\\sin^2\\\\alpha+\\\\cos^2\\\\alpha) = 5\\\\cdot1 = 5"}</MathBlock>
`,
  },
  "04-ringjoone-kaare-pikkus": {
    definitsioon: `
Ringjoone kaare pikkus, mis vastab kesknurgale <Math>{"\\\\theta"}</Math>
(radiaanides):
<MathBlock>{"l = r\\\\theta"}</MathBlock>
Kraadides antud kesknurga korral: <Math>{"l = \\\\dfrac{\\\\pi r n}{180^\\\\circ}"}</Math>.
`,
    naide: `
Raadius <Math>{"6"}</Math>, kesknurk <Math>{"\\\\dfrac{\\\\pi}{3}"}</Math>:
<Math>{"l = 6\\\\cdot\\\\dfrac{\\\\pi}{3} = 2\\\\pi"}</Math>.
`,
  },
  "04-ringi-sektori-pindala": {
    definitsioon: `
Ringi sektori pindala, mis vastab kesknurgale <Math>{"\\\\theta"}</Math>
(radiaanides):
<MathBlock>{"S = \\\\dfrac{1}{2}r^2\\\\theta"}</MathBlock>
Kraadides antud kesknurga korral: <Math>{"S = \\\\dfrac{\\\\pi r^2 n}{360^\\\\circ}"}</Math>.
`,
    naide: `
Raadius <Math>{"4"}</Math>, kesknurk <Math>{"\\\\dfrac{\\\\pi}{2}"}</Math>:
<Math>{"S = \\\\dfrac12\\\\cdot4^2\\\\cdot\\\\dfrac{\\\\pi}{2} = 4\\\\pi"}</Math>.
`,
  },
  "04-kolmnurga-pindala-valemid": {
    definitsioon: `
Suvalise kolmnurga pindala kahe külje ja nendevahelise nurga kaudu:
<MathBlock>{"S = \\\\dfrac{1}{2}ab\\\\sin C"}</MathBlock>
`,
    naide: `
Küljed <Math>{"6"}</Math> ja <Math>{"8"}</Math>, vahenurk <Math>{"30^\\\\circ"}</Math>:
<Math>{"S = \\\\dfrac12\\\\cdot6\\\\cdot8\\\\cdot\\\\dfrac12 = 12"}</Math>.
`,
  },
  "04-siinusteoreem": {
    definitsioon: `
Siinusteoreem seob kolmnurga küljed vastasnurkade siinustega ning
ümberringjoone raadiusega <Math>{"R"}</Math>:
<MathBlock>{"\\\\dfrac{a}{\\\\sin A} = \\\\dfrac{b}{\\\\sin B} = \\\\dfrac{c}{\\\\sin C} = 2R"}</MathBlock>
`,
    naide: `
Kui <Math>{"a=4"}</Math>, <Math>{"A=30^\\\\circ"}</Math>, <Math>{"B=90^\\\\circ"}</Math>,
siis <Math>{"b = \\\\dfrac{a\\\\sin B}{\\\\sin A} = \\\\dfrac{4\\\\cdot1}{1/2}=8"}</Math>.
`,
  },
  "04-koosinusteoreem": {
    definitsioon: `
Koosinusteoreem üldistab Pythagorase teoreemi suvalisele kolmnurgale:
<MathBlock>{"c^2 = a^2+b^2-2ab\\\\cos C"}</MathBlock>
Kui <Math>{"C=90^\\\\circ"}</Math>, taandub see Pythagorase teoreemiks.
`,
    naide: `
Küljed <Math>{"3"}</Math> ja <Math>{"8"}</Math>, vahenurk <Math>{"60^\\\\circ"}</Math>:
<Math>{"c^2 = 9+64-2\\\\cdot3\\\\cdot8\\\\cdot\\\\dfrac12 = 49 \\\\Rightarrow c=7"}</Math>.
`,
  },
  "04-kolmnurga-lahendamine": {
    definitsioon: `
Suvalise kolmnurga **lahendamine** tähendab kõigi külgede ja nurkade
leidmist teadaolevate algandmete põhjal: kahest küljest ja vahenurgast
kasutatakse koosinusteoreemi, kahest nurgast ja küljest siinusteoreemi
ning nurkade summast <Math>{"180^\\\\circ"}</Math>.
`,
    naide: `
Kui <Math>{"A=30^\\\\circ"}</Math> ja <Math>{"B=60^\\\\circ"}</Math>, siis
<Math>{"C = 180^\\\\circ-30^\\\\circ-60^\\\\circ = 90^\\\\circ"}</Math>.
`,
  },
  "04-trigonomeetria-rakendusulesanded": {
    definitsioon: `
Reaalelulised ülesanded (kõrgused, kaugused, ringliikumine) lahendatakse,
tõlkides olukorra kolmnurgaks või ringi sektoriks ning rakendades õpitud
valemeid: täisnurkse kolmnurga trigonomeetriat, siinus- ja koosinusteoreemi
või kaare pikkuse valemit.
`,
    naide: `
Vaatleja <Math>{"20"}</Math> m kaugusel torni jalamist näeb tippu
kõrgusnurga <Math>{"45^\\\\circ"}</Math> all: torni kõrgus on
<Math>{"20\\\\cdot\\\\tg\\\\,45^\\\\circ = 20"}</Math> m.
`,
  },
};
