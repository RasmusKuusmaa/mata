import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 11 (Integraal. Planimeetria). One entry per topic.
 * Re-exported from `selgitused/index.ts`. No bare `$...$` math delimiters —
 * see `eeldused.ts`'s header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "11-algfunktsioon": {
    definitsioon: `
Funktsioon <Math>{"F"}</Math> on funktsiooni <Math>{"f"}</Math>
**algfunktsioon**, kui <Math>{"F'(x)=f(x)"}</Math> iga <Math>{"x"}</Math>
korral. Algfunktsioon on tuletamise pöördtehe.
`,
    naide: `
Kui <Math>{"f(x)=2x"}</Math>, siis <Math>{"F(x)=x^2"}</Math> on algfunktsioon,
sest <Math>{"F'(x)=2x=f(x)"}</Math>.
`,
  },
  "11-maaramata-integraal": {
    definitsioon: `
**Määramata integraal** <Math>{"\\\\int f(x)\\\\,dx"}</Math> on kõigi
funktsiooni <Math>{"f"}</Math> algfunktsioonide hulk, mida tähistatakse
<Math>{"F(x)+C"}</Math>, kus <Math>{"C"}</Math> on suvaline konstant.
`,
    naide: `
<Math>{"\\\\int 2x\\\\,dx = x^2+C"}</Math>.
`,
  },
  "11-integraali-omadused": {
    definitsioon: `
Integreerimine on **lineaarne**: summa/vahe integraal on integraalide
summa/vahe, konstantse teguri saab integraali märgi eest välja tuua.
<MathBlock>{"\\\\int (f\\\\pm g)\\\\,dx = \\\\int f\\\\,dx \\\\pm \\\\int g\\\\,dx \\\\qquad \\\\int kf\\\\,dx = k\\\\int f\\\\,dx"}</MathBlock>
`,
    naide: `
Kui <Math>{"F(a)=3"}</Math> ja <Math>{"G(a)=5"}</Math>, siis funktsiooni
<Math>{"f+g"}</Math> algfunktsiooni väärtus kohal <Math>{"a"}</Math> on
<Math>{"8"}</Math>.
`,
  },
  "11-pohiintegraalide-tabel": {
    definitsioon: `
Sagedasemate funktsioonide algfunktsioonid:
<MathBlock>{"\\\\int x^n\\\\,dx=\\\\dfrac{x^{n+1}}{n+1}+C \\\\qquad \\\\int\\\\sin x\\\\,dx=-\\\\cos x+C \\\\qquad \\\\int\\\\cos x\\\\,dx=\\\\sin x+C"}</MathBlock>
<MathBlock>{"\\\\int e^x\\\\,dx=e^x+C \\\\qquad \\\\int\\\\dfrac1x\\\\,dx=\\\\ln|x|+C"}</MathBlock>
`,
    naide: `
<Math>{"\\\\int \\\\cos x\\\\,dx = \\\\sin x + C"}</Math>.
`,
  },
  "11-kovertrapets": {
    definitsioon: `
**Kõvertrapets** on kujund, mida piiravad funktsiooni graafik, x-telg ning
kaks vertikaalset sirget <Math>{"x=a"}</Math> ja <Math>{"x=b"}</Math>. Kui
funktsioon on lineaarne, on kõvertrapets tavaline trapets, ristkülik või
kolmnurk.
`,
    naide: `
Funktsiooni <Math>{"f(x)=2x"}</Math> kõvertrapets lõigul <Math>{"[0,5]"}</Math>
on kolmnurk, mille pindala on <Math>{"\\\\frac12\\\\cdot5\\\\cdot10=25"}</Math>.
`,
  },
  "11-maaratud-integraal": {
    definitsioon: `
Määratud integraali omadused:
<MathBlock>{"\\\\int_a^a f(x)\\\\,dx=0 \\\\qquad \\\\int_b^a f(x)\\\\,dx=-\\\\int_a^b f(x)\\\\,dx \\\\qquad \\\\int_a^c f\\\\,dx=\\\\int_a^b f\\\\,dx+\\\\int_b^c f\\\\,dx"}</MathBlock>
`,
    naide: `
Kui <Math>{"\\\\int_1^4 f\\\\,dx=7"}</Math>, siis
<Math>{"\\\\int_4^1 f\\\\,dx=-7"}</Math>.
`,
  },
  "11-newtoni-leibnizi-valem": {
    definitsioon: `
**Newtoni-Leibnizi valem** arvutab määratud integraali algfunktsiooni abil:
<MathBlock>{"\\\\int_a^b f(x)\\\\,dx = F(b)-F(a)"}</MathBlock>
`,
    naide: `
<Math>{"\\\\int_0^2 2x\\\\,dx = \\\\left[x^2\\\\right]_0^2 = 4-0=4"}</Math>.
`,
  },
  "11-pindala-maaratud-integraaliga": {
    definitsioon: `
Kui <Math>{"f(x)\\\\ge0"}</Math> lõigul <Math>{"[a,b]"}</Math>, on funktsiooni
graafiku ja x-telje vahele jääva kõvertrapetsi pindala:
<MathBlock>{"S = \\\\int_a^b f(x)\\\\,dx"}</MathBlock>
`,
    naide: `
<Math>{"S=\\\\int_0^3 x^2\\\\,dx = \\\\dfrac{27}{3}=9"}</Math>.
`,
  },
  "11-mitmest-osast-koosneva-pinnatuki-pindala": {
    definitsioon: `
Kui funktsioon vahetab lõigul märki, tuleb pindala arvutamiseks jagada lõik
osadeks (nullkohtade järgi) ning liita kokku iga osa pindala **absoluutväärtus**
— muidu tühistaksid positiivne ja negatiivne osa üksteist.
`,
    naide: `
<Math>{"f(x)=x"}</Math> lõigul <Math>{"[-2,2]"}</Math>: kogupindala on
<Math>{"2+2=4"}</Math>, mitte <Math>{"0"}</Math> (mis oleks lihtsalt
<Math>{"\\\\int_{-2}^2 x\\\\,dx"}</Math> väärtus).
`,
  },
  "11-kahe-koveraga-piiratud-pinnatuki-pindala": {
    definitsioon: `
Kahe kõvera <Math>{"f"}</Math> (ülemine) ja <Math>{"g"}</Math> (alumine)
vahele jääva pinnatüki pindala lõikepunktide vahel:
<MathBlock>{"S = \\\\int_a^b \\\\left(f(x)-g(x)\\\\right)\\\\,dx"}</MathBlock>
`,
    naide: `
Parabooli <Math>{"y=x^2"}</Math> ja sirge <Math>{"y=2x"}</Math> vahele jääv
pindala (lõikepunktid <Math>{"x=0,2"}</Math>) on
<Math>{"\\\\int_0^2(2x-x^2)\\\\,dx=\\\\frac{2^3}{6}=\\\\frac43"}</Math>.
`,
  },
  "11-poordkeha-ruumala": {
    definitsioon: `
Kui funktsiooni <Math>{"f"}</Math> graafik pöörleb ümber x-telje lõigul
<Math>{"[a,b]"}</Math>, on tekkiva pöördkeha ruumala:
<MathBlock>{"V = \\\\pi\\\\int_a^b f(x)^2\\\\,dx"}</MathBlock>
`,
    naide: `
<Math>{"f(x)=x"}</Math> lõigul <Math>{"[0,3]"}</Math> annab koonuse ruumalaga
<Math>{"V=\\\\pi\\\\cdot\\\\frac{27}{3}=9\\\\pi"}</Math>.
`,
  },
  "11-too-arvutamine-integraaliga": {
    definitsioon: `
Kui jõud <Math>{"F(x)"}</Math> sõltub asukohast, on jõu tehtud töö keha
liigutamisel punktist <Math>{"a"}</Math> punkti <Math>{"b"}</Math>:
<MathBlock>{"A = \\\\int_a^b F(x)\\\\,dx"}</MathBlock>
`,
    naide: `
Vedru jõud <Math>{"F(x)=5x"}</Math>: venitamiseks <Math>{"2"}</Math> m võrra
kulub töö <Math>{"A=\\\\int_0^2 5x\\\\,dx=10"}</Math> J.
`,
  },
  "11-kolmnurga-sise-ja-valisnurk": {
    definitsioon: `
Kolmnurga **välisnurk** on kõrvutise sisenurga täiendnurk
(<Math>{"180^\\\\circ"}</Math>ni). Välisnurk võrdub alati kahe
mittekülgneva sisenurga **summaga**.
`,
    naide: `
Kui kaks sisenurka on <Math>{"50^\\\\circ"}</Math> ja
<Math>{"60^\\\\circ"}</Math>, on kolmandale tipule vastav välisnurk
<Math>{"110^\\\\circ"}</Math>.
`,
  },
  "11-nurgapoolitaja": {
    definitsioon: `
Kolmnurga nurgapoolitaja jagab vastaskülje lõikudeks, mis on **võrdelised**
lähiskülgedega:
<MathBlock>{"\\\\dfrac{BD}{DC} = \\\\dfrac{AB}{AC}"}</MathBlock>
`,
    naide: `
Kui <Math>{"AB=6"}</Math>, <Math>{"AC=4"}</Math>, siis
<Math>{"BD{:}DC = 6{:}4 = 3{:}2"}</Math>.
`,
  },
  "11-siseringjoon": {
    definitsioon: `
Kolmnurga **siseringjoon** puutub kõiki kolme külge seestpoolt. Selle
raadius <Math>{"r=\\\\dfrac{S}{s}"}</Math>, kus <Math>{"S"}</Math> on pindala
ja <Math>{"s"}</Math> poolümbermõõt. Täisnurkse kolmnurga korral
<Math>{"r=\\\\dfrac{a+b-c}{2}"}</Math>.
`,
    naide: `
Kolmnurgas <Math>{"3,4,5"}</Math>: <Math>{"r=\\\\dfrac{3+4-5}{2}=1"}</Math>.
`,
  },
  "11-umberringjoon": {
    definitsioon: `
Kolmnurga **ümberringjoon** läbib kõiki kolme tippu. Täisnurkse kolmnurga
korral on selle raadius pool hüpotenuusist; üldiselt
<Math>{"2R=\\\\dfrac{a}{\\\\sin A}"}</Math> (siinusteoreem).
`,
    naide: `
Täisnurkses kolmnurgas hüpotenuusiga <Math>{"10"}</Math> on ümberringjoone
raadius <Math>{"5"}</Math>.
`,
  },
  "11-mediaan-ja-omadus": {
    definitsioon: `
Kolmnurga kolm **mediaani** (tipust vastaskülje keskpunktini) lõikuvad
ühes punktis — **raskuskeskmes**, mis jagab iga mediaani suhtes
<Math>{"2{:}1"}</Math> tipust arvates.
`,
    naide: `
Kui mediaan on <Math>{"9"}</Math>, on tipu ja raskuskeskme vahe
<Math>{"6"}</Math>, raskuskeskme ja külje keskpunkti vahe <Math>{"3"}</Math>.
`,
  },
  "11-kesklõik": {
    definitsioon: `
Kolmnurga **kesklõik** ühendab kahe külje keskpunkte. See on paralleelne
kolmanda küljega ja **poole** lühem sellest.
`,
    naide: `
Kui külg on <Math>{"12"}</Math>, on sellega paralleelne kesklõik
<Math>{"6"}</Math>.
`,
  },
  "11-meetrilised-seosed-taisnurkses-kolmnurgas": {
    definitsioon: `
Täisnurkses kolmnurgas hüpotenuusile tõmmatud kõrgus <Math>{"h"}</Math>
jagab hüpotenuuse lõikudeks <Math>{"p"}</Math> ja <Math>{"q"}</Math>:
<MathBlock>{"h^2=pq \\\\qquad a^2=pc \\\\qquad b^2=qc"}</MathBlock>
`,
    naide: `
Kui <Math>{"p=9"}</Math> ja <Math>{"q=16"}</Math>, on
<Math>{"h=\\\\sqrt{144}=12"}</Math>.
`,
  },
  "11-hulknurk-ja-liigid": {
    definitsioon: `
**Hulknurk** on tasandiline kujund, mida piiravad murdjoone lõigud.
Kumeral hulknurgal, mille tippude arv on <Math>{"n"}</Math>, on diagonaalide
arv <Math>{"\\\\dfrac{n(n-3)}{2}"}</Math>.
`,
    naide: `
Kuusnurgal (<Math>{"n=6"}</Math>) on <Math>{"\\\\dfrac{6\\\\cdot3}{2}=9"}</Math>
diagonaali.
`,
  },
  "11-kumera-hulknurga-sisenurkade-summa": {
    definitsioon: `
Kumera <Math>{"n"}</Math>-nurga sisenurkade summa:
<MathBlock>{"(n-2)\\\\cdot180^\\\\circ"}</MathBlock>
`,
    naide: `
Viisnurga (<Math>{"n=5"}</Math>) sisenurkade summa on
<Math>{"3\\\\cdot180^\\\\circ=540^\\\\circ"}</Math>.
`,
  },
  "11-hulknurkade-sarnasus": {
    definitsioon: `
Kaks hulknurka on **sarnased**, kui vastavad nurgad on võrdsed ja vastavad
küljed võrdelised. Võrdeteguri nimi on **sarnasustegur** <Math>{"k"}</Math>.
`,
    naide: `
Kui <Math>{"k=3"}</Math> ja väiksema hulknurga külg on <Math>{"4"}</Math>,
on suurema vastav külg <Math>{"12"}</Math>.
`,
  },
  "11-sarnaste-hulknurkade-suhted": {
    definitsioon: `
Sarnaste hulknurkade korral: **ümbermõõtude suhe** võrdub sarnasusteguriga
<Math>{"k"}</Math>, **pindalade suhe** võrdub <Math>{"k^2"}</Math>-ga.
`,
    naide: `
Kui <Math>{"k=2"}</Math>, on pindalade suhe <Math>{"4"}</Math>.
`,
  },
  "11-hulknurga-sise-ja-umberringjoon": {
    definitsioon: `
Korrapärase hulknurga **ümberringjoon** läbib kõiki tippe, **siseringjoon**
(apoteem) puutub kõiki külgi. Korrapärase kuusnurga korral võrdub külg
ümberringjoone raadiusega.
`,
    naide: `
Korrapärase kuusnurga ümberringjoone raadius <Math>{"R"}</Math> korral on
külg <Math>{"R"}</Math> ja apoteem <Math>{"\\\\frac{R\\\\sqrt3}{2}"}</Math>.
`,
  },
  "11-roopkulik-ja-eriliigid": {
    definitsioon: `
**Rööpküliku** pindala on <Math>{"S=a\\\\cdot h"}</Math>, diagonaalid
poolitavad teineteist. Erijuhud: ristkülik (nurgad täisnurgad), romb
(küljed võrdsed, pindala <Math>{"S=\\\\frac{d_1d_2}{2}"}</Math>), ruut
(mõlemad).
`,
    naide: `
Rombi diagonaalid <Math>{"6"}</Math> ja <Math>{"8"}</Math>: pindala
<Math>{"\\\\frac{6\\\\cdot8}{2}=24"}</Math>.
`,
  },
  "11-trapets-ja-liigid": {
    definitsioon: `
**Trapetsi** pindala:
<MathBlock>{"S = \\\\dfrac{(a+b)h}{2}"}</MathBlock>
Võrdhaarses trapetsis on jalad võrdsed ja alusnurgad võrdsed.
`,
    naide: `
Alused <Math>{"5"}</Math> ja <Math>{"9"}</Math>, kõrgus <Math>{"4"}</Math>:
<Math>{"S=\\\\frac{14\\\\cdot4}{2}=28"}</Math>.
`,
  },
  "11-trapetsi-kesklois": {
    definitsioon: `
Trapetsi **kesklõik** ühendab jalgade keskpunkte, on paralleelne alustega
ja võrdub nende **keskmisega**:
<MathBlock>{"m = \\\\dfrac{a+b}{2}"}</MathBlock>
`,
    naide: `
Alused <Math>{"5"}</Math> ja <Math>{"11"}</Math>: kesklõik
<Math>{"\\\\frac{5+11}{2}=8"}</Math>.
`,
  },
  "11-kesknurk-ja-piirdenurk": {
    definitsioon: `
Sama kaare **piirdenurk** (tipp ringjoonel) on alati pool **kesknurgast**
(tipp ringjoone keskpunktis):
<MathBlock>{"\\\\text{piirdenurk} = \\\\dfrac{\\\\text{kesknurk}}{2}"}</MathBlock>
`,
    naide: `
Kesknurk <Math>{"80^\\\\circ"}</Math> korral on piirdenurk
<Math>{"40^\\\\circ"}</Math>.
`,
  },
  "11-thalese-teoreem": {
    definitsioon: `
**Thalese teoreem**: kui kolmnurga tipp asub ringjoonel ja vastaskülg on
läbimõõt, on tipu nurk **täisnurk**. Ja vastupidi: täisnurkse kolmnurga
hüpotenuus on alati ümberringjoone läbimõõt.
`,
    naide: `
Täisnurkne kolmnurk kaatetitega <Math>{"3"}</Math> ja <Math>{"4"}</Math>:
hüpotenuus <Math>{"5"}</Math> on ümberringjoone läbimõõt.
`,
  },
  "11-loikaja-ja-puutuja": {
    definitsioon: `
Punktist väljaspool ringjoont tõmmatud **puutuja** <Math>{"t"}</Math> ja
**lõikaja** (väline osa <Math>{"e"}</Math>, täispikkus <Math>{"w"}</Math>)
vahel kehtib seos:
<MathBlock>{"t^2 = e\\\\cdot w"}</MathBlock>
`,
    naide: `
Kui <Math>{"e=2"}</Math> ja <Math>{"w=8"}</Math>, on
<Math>{"t=\\\\sqrt{16}=4"}</Math>.
`,
  },
  "11-koolhulknurk": {
    definitsioon: `
**Kõõlhulknurk** on ringjoonesse joonistatud hulknurk (kõik tipud
ringjoonel). Kõõlnelinurga vastasnurkade summa on alati
<Math>{"180^\\\\circ"}</Math>.
`,
    naide: `
Kui üks nurk on <Math>{"70^\\\\circ"}</Math>, on vastasnurk
<Math>{"110^\\\\circ"}</Math>.
`,
  },
  "11-puutujahulknurk": {
    definitsioon: `
**Puutujahulknurk** on ringjoonele ümber joonistatud hulknurk (kõik küljed
puutuvad ringjoont). Puutujanelinurga korral on vastaskülgede summad
võrdsed: <Math>{"a+c=b+d"}</Math>.
`,
    naide: `
Kui <Math>{"a=5"}</Math>, <Math>{"b=4"}</Math>, <Math>{"c=7"}</Math>, on
<Math>{"d=5+7-4=8"}</Math>.
`,
  },
  "11-kolmnurga-pindala-valemid": {
    definitsioon: `
Kolmnurga pindala saab arvutada mitmel viisil: **Heroni valemiga**
<Math>{"S=\\\\sqrt{s(s-a)(s-b)(s-c)}"}</Math>, siseringjoone kaudu
<Math>{"S=rs"}</Math>, või ümberringjoone kaudu
<Math>{"S=\\\\dfrac{abc}{4R}"}</Math>.
`,
    naide: `
Kolmnurgas <Math>{"3,4,5"}</Math> (<Math>{"s=6"}</Math>):
<Math>{"S=\\\\sqrt{6\\\\cdot3\\\\cdot2\\\\cdot1}=6"}</Math>.
`,
  },
  "11-rakenduslikud-planimeetriaulesanded": {
    definitsioon: `
Paljud reaalelulised probleemid (redeli kõrgus, puu kõrguse mõõtmine varju
järgi, maatüki pindala) lahenevad Pythagorase teoreemi, sarnaste
kolmnurkade või pindalavalemite abil.
`,
    naide: `
Inimese pikkus <Math>{"1{,}8"}</Math> m, vari <Math>{"2"}</Math> m; puu
vari <Math>{"10"}</Math> m — sarnaste kolmnurkade abil on puu kõrgus
<Math>{"9"}</Math> m.
`,
  },
};
