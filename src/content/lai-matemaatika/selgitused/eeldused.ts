import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for the E-series (basic-school refresher) topics. One entry
 * per topic, added as Ship 1.8 authors it — never delete an entry, only add
 * or edit one. Re-exported from `selgitused/index.ts`.
 *
 * No bare `$...$` math delimiters anywhere below — `<Selgitus>`'s MDX
 * pipeline has no remark-math plugin, so only explicit `<Math>`/
 * `<MathBlock>` render as KaTeX; a bare `$a$` would show as literal text.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "E-murdarvud": {
    definitsioon: `
Harilik murd <Math>{"\\\\dfrac{a}{b}"}</Math> koosneb **lugejast**
<Math>{"a"}</Math> ja **nimetajast** <Math>{"b"}</Math>
(<Math>{"b \\\\neq 0"}</Math>), kus nimetaja näitab, mitmeks võrdseks osaks
tervik on jaotatud, ja lugeja, mitu sellist osa on võetud.

- Sama nimetajaga murdude liitmisel/lahutamisel liidetakse/lahutatakse lugejad:
  <MathBlock>{"\\\\dfrac{a}{c} \\\\pm \\\\dfrac{b}{c} = \\\\dfrac{a \\\\pm b}{c}"}</MathBlock>
- Erineva nimetajaga murrud viiakse enne ühisele nimetajale.
- Murdude korrutamisel korrutatakse lugejad ja nimetajad omavahel:
  <MathBlock>{"\\\\dfrac{a}{b} \\\\cdot \\\\dfrac{c}{d} = \\\\dfrac{ac}{bd}"}</MathBlock>
- Murdude jagamisel korrutatakse esimene murd teise **pöördarvuga**:
  <MathBlock>{"\\\\dfrac{a}{b} : \\\\dfrac{c}{d} = \\\\dfrac{a}{b} \\\\cdot \\\\dfrac{d}{c}"}</MathBlock>
`,
    naide: `
Arvutame <Math>{"\\\\dfrac{1}{3} + \\\\dfrac{1}{4}"}</Math>. Ühine nimetaja on
<Math>{"12"}</Math>:

<MathBlock>{"\\\\dfrac{1}{3} + \\\\dfrac{1}{4} = \\\\dfrac{4}{12} + \\\\dfrac{3}{12} = \\\\dfrac{7}{12}"}</MathBlock>
`,
    tuupvead: `
Levinud viga on liita murde nii, et lugejad ja nimetajad liidetakse eraldi
(nt <Math>{"\\\\dfrac{1}{3} + \\\\dfrac{1}{4} \\\\neq \\\\dfrac{2}{7}"}</Math>) —
erineva nimetajaga murrud tuleb enne viia ühisele nimetajale.
`,
  },
  "E-kumnendmurrud": {
    definitsioon: `
Kümnendmurd on murd, mille nimetaja on <Math>{"10"}</Math>,
<Math>{"100"}</Math>, <Math>{"1000"}</Math> vms. Kümnendmurdude liitmisel ja
lahutamisel kirjutatakse arvud nii, et komad on üksteise all — siis liidetakse
või lahutatakse nagu täisarve.

**Ümardamine.** Arvu ümardamisel antud kohani vaadatakse järgmist kohta:
- kui see number on <Math>{"0, 1, 2, 3, 4"}</Math>, jäetakse eelmine koht muutmata,
- kui see number on <Math>{"5, 6, 7, 8, 9"}</Math>, suurendatakse eelmist kohta ühe võrra.
`,
    naide: `
Ümardame arvu <Math>{"3,47"}</Math> lähima kümnendikuni. Sajandike kohal on
number <Math>{"7"}</Math>, mis on <Math>{"5"}</Math> või suurem, seega
kümnendik suureneb ühe võrra:

<MathBlock>{"3{,}47 \\\\approx 3{,}5"}</MathBlock>
`,
  },
  "E-protsendi-pohiulesanded": {
    definitsioon: `
Protsent tähendab sajandikku: <Math>{"1\\\\% = \\\\dfrac{1}{100}"}</Math>.
Kolm põhiülesannet:

1. **Arvust protsendi leidmine** — arvu <Math>{"a"}</Math> korrutatakse
   protsendimääraga:
   <MathBlock>{"a \\\\cdot \\\\dfrac{p}{100}"}</MathBlock>
2. **Arvu leidmine protsendi järgi** — kui teame, et <Math>{"p\\\\%"}</Math>
   arvust <Math>{"x"}</Math> on <Math>{"b"}</Math>, siis:
   <MathBlock>{"x = b : \\\\dfrac{p}{100}"}</MathBlock>
3. **Ühe arvu leidmine teise protsendina** — mitu protsenti on
   <Math>{"b"}</Math> arvust <Math>{"a"}</Math>:
   <MathBlock>{"\\\\dfrac{b}{a} \\\\cdot 100\\\\%"}</MathBlock>
`,
    naide: `
Arvu <Math>{"40"}</Math> mitu protsenti on <Math>{"8"}</Math>?

<MathBlock>{"\\\\dfrac{8}{40} \\\\cdot 100\\\\% = 20\\\\%"}</MathBlock>
`,
  },
  "E-suhe-ja-vordeline-soltuvus": {
    definitsioon: `
**Suhe** <Math>{"a : b"}</Math> võrdleb kahte suurust jagatisena; suhet
lihtsustatakse mõlema poole jagamisel nende suurima ühisteguriga.

**Otsene võrdeline sõltuvus**: kui üks suurus suureneb, suureneb teine sama
palju kordi, ja suhe jääb püsivaks:
<MathBlock>{"\\\\dfrac{y_1}{x_1} = \\\\dfrac{y_2}{x_2}"}</MathBlock>

**Pöördvõrdeline sõltuvus**: kui üks suurus suureneb, väheneb teine sama
palju kordi, ja korrutis jääb püsivaks:
<MathBlock>{"x_1 \\\\cdot y_1 = x_2 \\\\cdot y_2"}</MathBlock>
`,
    naide: `
Kui <Math>{"3"}</Math> töölist teevad töö ära <Math>{"8"}</Math> päevaga, siis
<Math>{"6"}</Math> töölist (pöördvõrdeline sõltuvus, kaks korda rohkem
töölisi) teevad sama töö poole kiiremini:

<MathBlock>{"3 \\\\cdot 8 = 6 \\\\cdot x \\\\quad\\\\Rightarrow\\\\quad x = 4"}</MathBlock>
`,
  },
  "E-sulgude-avamine": {
    definitsioon: `
Sulgude avamisel korrutatakse sulu ees olev arv (või avaldis) läbi iga sulus
oleva liikmega — **distributiivsusreegel**:
<MathBlock>{"a(b + c) = ab + ac"}</MathBlock>

Kui sulu ees on miinusmärk, muutuvad kõik sulus olevad märgid avamisel
vastupidiseks:
<MathBlock>{"-(b + c) = -b - c"}</MathBlock>

Pärast sulgude avamist liidetakse **sarnased liikmed** (samasuguse
tähtosaga liikmed) kokku.
`,
    naide: `
Avame sulud ja lihtsustame avaldise <Math>{"3(x + 2) - 2(x - 1)"}</Math>:

<MathBlock>{"3(x + 2) - 2(x - 1) = 3x + 6 - 2x + 2 = x + 8"}</MathBlock>

Pane tähele, et teise sulu ees oleva miinusmärgi tõttu muutus
<Math>{"-1"}</Math> avamisel <Math>{"+2"}</Math>-ks.
`,
  },
  "E-uhisteguri-valja-toomine": {
    definitsioon: `
Ühisteguri sulgudest välja toomine on sulgude avamise pöördtehe:
avaldise iga liige jagatakse nende **suurima ühisteguriga** ja see tegur
kirjutatakse sulu ette:
<MathBlock>{"ab + ac = a(b + c)"}</MathBlock>

Suurim ühistegur on suurim arv, mis jagub kõikide liikmete kordajatesse
täpselt.
`,
    naide: `
Teguriks avaldis <Math>{"6x + 9"}</Math>. Arvude <Math>{"6"}</Math> ja
<Math>{"9"}</Math> suurim ühistegur on <Math>{"3"}</Math>:

<MathBlock>{"6x + 9 = 3(2x + 3)"}</MathBlock>
`,
    tuupvead: `
Levinud viga on unustada jagada mõni liikmetest ühisteguriga — näiteks
kirjutada <Math>{"6x + 9"}</Math> ekslikult kujul <Math>{"3(2x + 9)"}</Math>,
kus <Math>{"9"}</Math> on jäetud kolmega jagamata.
`,
  },
  "E-abivalemid": {
    definitsioon: `
Kolm sageli kasutatavat lühendvalemit:

<MathBlock>{"(a+b)^2 = a^2 + 2ab + b^2"}</MathBlock>
<MathBlock>{"(a-b)^2 = a^2 - 2ab + b^2"}</MathBlock>
<MathBlock>{"(a-b)(a+b) = a^2 - b^2"}</MathBlock>

Need valemid kiirendavad nii avaldiste teisendamist kui ka teatud arvutuste
peastarvutamist, kui üks tegur on ümardatava arvu lähedal.
`,
    naide: `
Arvutame <Math>{"52^2"}</Math> ilma korrutamata: <Math>{"52 = 50 + 2"}</Math>,
seega

<MathBlock>{"52^2 = (50+2)^2 = 50^2 + 2 \\\\cdot 50 \\\\cdot 2 + 2^2 = 2500 + 200 + 4 = 2704"}</MathBlock>
`,
  },
  "E-ruutkolmliikme-tegurdamine": {
    definitsioon: `
Ruutkolmliiget <Math>{"x^2 + bx + c"}</Math> tegurdatakse kujule
<Math>{"(x - r_1)(x - r_2)"}</Math>, kus <Math>{"r_1"}</Math> ja
<Math>{"r_2"}</Math> on kaks arvu, mille:

- **summa** on <Math>{"-b"}</Math>,
- **korrutis** on <Math>{"c"}</Math>.
`,
    naide: `
Teguriks <Math>{"x^2 - x - 6"}</Math>. Otsime kaks arvu, mille summa on
<Math>{"1"}</Math> ja korrutis <Math>{"-6"}</Math> — need on
<Math>{"3"}</Math> ja <Math>{"-2"}</Math>:

<MathBlock>{"x^2 - x - 6 = (x - 3)(x + 2)"}</MathBlock>
`,
  },
  "E-astmed-naturaalarvulise-astendajaga": {
    definitsioon: `
Aste <Math>{"a^n"}</Math> (kus <Math>{"n"}</Math> on naturaalarv) tähendab,
et <Math>{"a"}</Math> on tegurina <Math>{"n"}</Math> korda:
<MathBlock>{"a^n = \\\\underbrace{a \\\\cdot a \\\\cdots a}_{n \\\\text{ tegurit}}"}</MathBlock>

Tehted sama alusega astmetega:
<MathBlock>{"a^m \\\\cdot a^n = a^{m+n} \\\\qquad a^m : a^n = a^{m-n} \\\\qquad (a^m)^n = a^{mn}"}</MathBlock>
`,
    naide: `
<MathBlock>{"2^3 \\\\cdot 2^4 = 2^{3+4} = 2^7 = 128"}</MathBlock>
`,
  },
  "E-ruutjuur": {
    definitsioon: `
Arvu <Math>{"a"}</Math> ruutjuur <Math>{"\\\\sqrt{a}"}</Math> (kus
<Math>{"a \\\\ge 0"}</Math>) on mittenegatiivne arv, mille ruut on
<Math>{"a"}</Math>. Kui juurealune arv pole täisruut, eraldatakse sellest
suurim täisruudust tegur:
<MathBlock>{"\\\\sqrt{k^2 \\\\cdot m} = k\\\\sqrt{m}"}</MathBlock>
`,
    naide: `
<MathBlock>{"\\\\sqrt{72} = \\\\sqrt{36 \\\\cdot 2} = \\\\sqrt{36} \\\\cdot \\\\sqrt{2} = 6\\\\sqrt{2}"}</MathBlock>
`,
  },
  "E-koordinaattasand": {
    definitsioon: `
Koordinaattasand jaguneb kahe telje — <Math>{"x"}</Math>-telje ja
<Math>{"y"}</Math>-telje — poolt neljaks **veerandiks (kvadrandiks)**.
Punkti <Math>{"(x, y)"}</Math> asukoht sõltub koordinaatide märkidest:

- I veerand: <Math>{"x > 0"}</Math>, <Math>{"y > 0"}</Math>
- II veerand: <Math>{"x < 0"}</Math>, <Math>{"y > 0"}</Math>
- III veerand: <Math>{"x < 0"}</Math>, <Math>{"y < 0"}</Math>
- IV veerand: <Math>{"x > 0"}</Math>, <Math>{"y < 0"}</Math>

Peegeldamisel <Math>{"x"}</Math>-telje suhtes muudab <Math>{"y"}</Math>
märki, <Math>{"y"}</Math>-telje suhtes muudab <Math>{"x"}</Math> märki, ja
alguspunkti suhtes muudavad mõlemad märki.
`,
    naide: `
Punkt <Math>{"(3, -5)"}</Math> asub IV veerandis (<Math>{"x > 0"}</Math>,
<Math>{"y < 0"}</Math>). Selle peegelpilt alguspunkti suhtes on
<Math>{"(-3, 5)"}</Math>.
`,
  },
  "E-kolmnurga-umbermoot-ja-pindala": {
    definitsioon: `
Kolmnurga **ümbermõõt** on kõigi külgede pikkuste summa:
<MathBlock>{"P = a + b + c"}</MathBlock>

Kolmnurga **pindala**, kui teame alust ja sellele vastavat kõrgust:
<MathBlock>{"S = \\\\dfrac{a \\\\cdot h}{2}"}</MathBlock>

Täisnurkse kolmnurga korral võib kaatetid võtta aluseks ja kõrguseks, sest
need on risti:
<MathBlock>{"S = \\\\dfrac{\\\\text{kaatet}_1 \\\\cdot \\\\text{kaatet}_2}{2}"}</MathBlock>
`,
    naide: `
Täisnurkse kolmnurga kaatetid on <Math>{"3"}</Math> ja <Math>{"4"}</Math>:

<MathBlock>{"S = \\\\dfrac{3 \\\\cdot 4}{2} = 6"}</MathBlock>
`,
  },
  "E-pythagorase-teoreem": {
    definitsioon: `
Täisnurkses kolmnurgas on **hüpotenuus** <Math>{"c"}</Math> (täisnurga
vastas olev külg) ja **kaatetid** <Math>{"a"}</Math>, <Math>{"b"}</Math>
seotud valemiga:
<MathBlock>{"a^2 + b^2 = c^2"}</MathBlock>

Seda saab kasutada nii hüpotenuusi kui ka kaateti leidmiseks, samuti
kontrollimaks, kas kolmnurk on täisnurkne.
`,
    naide: `
Kaatetid on <Math>{"6"}</Math> ja <Math>{"8"}</Math>:

<MathBlock>{"c = \\\\sqrt{6^2 + 8^2} = \\\\sqrt{36 + 64} = \\\\sqrt{100} = 10"}</MathBlock>
`,
  },
  "E-ringjoone-pikkus-ja-ringi-pindala": {
    definitsioon: `
Ringjoone pikkus ja ringi pindala raadiuse <Math>{"r"}</Math> kaudu:
<MathBlock>{"l = 2\\\\pi r \\\\qquad S = \\\\pi r^2"}</MathBlock>

Kui teada on diameeter <Math>{"d"}</Math>, siis <Math>{"r = \\\\dfrac{d}{2}"}</Math>.
`,
    naide: `
Ringi raadius on <Math>{"5"}</Math>:

<MathBlock>{"l = 2\\\\pi \\\\cdot 5 = 10\\\\pi \\\\qquad S = \\\\pi \\\\cdot 5^2 = 25\\\\pi"}</MathBlock>
`,
  },
  "E-nelinurkade-pindalad": {
    definitsioon: `
Levinumate nelinurkade pindalavalemid:

- **Ristkülik**: <Math>{"S = a \\\\cdot b"}</Math>
- **Romb**: <Math>{"S = \\\\dfrac{d_1 \\\\cdot d_2}{2}"}</Math> (diagonaalide kaudu)
- **Rööpkülik**: <Math>{"S = a \\\\cdot h"}</Math>
- **Trapets**: <Math>{"S = \\\\dfrac{a + b}{2} \\\\cdot h"}</Math>
`,
    naide: `
Trapetsi alused on <Math>{"6"}</Math> ja <Math>{"10"}</Math>, kõrgus
<Math>{"4"}</Math>:

<MathBlock>{"S = \\\\dfrac{6 + 10}{2} \\\\cdot 4 = 32"}</MathBlock>
`,
  },
  "E-risttahuka-ja-kuubi-ruumala": {
    definitsioon: `
**Kuubi** ruumala ja pindala serva <Math>{"a"}</Math> kaudu:
<MathBlock>{"V = a^3 \\\\qquad S = 6a^2"}</MathBlock>

**Risttahuka** ruumala ja pindala mõõtmete <Math>{"a, b, c"}</Math> kaudu:
<MathBlock>{"V = a \\\\cdot b \\\\cdot c \\\\qquad S = 2(ab + bc + ca)"}</MathBlock>
`,
    naide: `
Risttahuka mõõtmed on <Math>{"2"}</Math>, <Math>{"3"}</Math> ja
<Math>{"4"}</Math>:

<MathBlock>{"V = 2 \\\\cdot 3 \\\\cdot 4 = 24"}</MathBlock>
`,
  },
  "E-uhikute-teisendamine": {
    definitsioon: `
Suuremast ühikust väiksemasse teisendamisel **korrutatakse** teisendusteguriga,
väiksemast suuremasse teisendamisel **jagatakse** sellega.

Levinud teisendustegurid:
- pikkus: <Math>{"1\\\\ \\\\text{km} = 1000\\\\ \\\\text{m}"}</Math>,
  <Math>{"1\\\\ \\\\text{m} = 100\\\\ \\\\text{cm}"}</Math>
- pindala: <Math>{"1\\\\ \\\\text{m}^2 = 10\\\\,000\\\\ \\\\text{cm}^2"}</Math>
- ruumala: <Math>{"1\\\\ \\\\text{m}^3 = 1\\\\,000\\\\,000\\\\ \\\\text{cm}^3"}</Math>
`,
    naide: `
<MathBlock>{"3\\\\ \\\\text{m} = 3 \\\\cdot 100\\\\ \\\\text{cm} = 300\\\\ \\\\text{cm}"}</MathBlock>
`,
  },
  "E-diagrammide-lugemine": {
    definitsioon: `
Andmeid esitatakse sageli diagrammidena:

- **Tulpdiagramm** — iga tulba kõrgus näitab vastava kategooria väärtust.
- **Sektordiagramm** — iga sektori suurus näitab osakaalu tervikust.
- **Joondiagramm** — punktide asukoht näitab väärtuse muutumist ajas.

Diagrammilt lugemisel tuleb esmalt selgitada välja teljel/legendis näidatud
ühikud ja skaala.
`,
    naide: `
Kui tulpdiagrammil on esmaspäeval müüdud <Math>{"12"}</Math> ja teisipäeval
<Math>{"18"}</Math> toodet, siis teisipäeval müüdi <Math>{"6"}</Math>
toodet rohkem.
`,
  },
  "E-aritmeetiline-keskmine": {
    definitsioon: `
Arvuhulga aritmeetiline keskmine on kõigi arvude summa jagatud arvude
arvuga:
<MathBlock>{"\\\\bar{x} = \\\\dfrac{x_1 + x_2 + \\\\cdots + x_n}{n}"}</MathBlock>
`,
    naide: `
Arvude <Math>{"4, 7, 9"}</Math> keskmine:

<MathBlock>{"\\\\bar{x} = \\\\dfrac{4 + 7 + 9}{3} = \\\\dfrac{20}{3} \\\\approx 6{,}67"}</MathBlock>
`,
  },
  "E-lineaarvorrand": {
    definitsioon: `
Lineaarvõrrand on kujul <Math>{"ax + b = c"}</Math>. Lahendamiseks viiakse
tundmatuga liikmed võrrandi ühele poole ja arvud teisele poole, muutes märki
sammu ületamisel, ning seejärel jagatakse mõlemad pooled tundmatu
kordajaga.
`,
    naide: `
Lahendame võrrandi <Math>{"3x + 5 = 2x + 9"}</Math>:

<MathBlock>{"3x - 2x = 9 - 5"}</MathBlock>
<MathBlock>{"x = 4"}</MathBlock>
`,
  },
};
