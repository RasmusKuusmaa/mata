import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 7 (Funktsioonid. Arvjadad). One entry per topic.
 * Re-exported from `selgitused/index.ts`. No bare `$...$` math delimiters —
 * see `eeldused.ts`'s header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "07-funktsiooni-moiste-ja-uldtahis": {
    definitsioon: `
**Funktsioon** on eeskiri, mis seab igale määramispiirkonna elemendile
<Math>{"x"}</Math> vastavusse täpselt ühe muutumispiirkonna elemendi
<Math>{"y"}</Math>. Tähistus <Math>{"y=f(x)"}</Math> loetakse "f muutujast x".
`,
    naide: `
Kui <Math>{"f(x)=2x+1"}</Math>, siis <Math>{"f(3)=2\\\\cdot3+1=7"}</Math>.
`,
  },
  "07-funktsiooni-esitusviisid": {
    definitsioon: `
Funktsiooni saab esitada neljal viisil: **valemiga** (<Math>{"y=f(x)"}</Math>),
**graafikuga**, **tabeliga** (väärtuste loend) ja **sõnalise kirjeldusega**.
Kõik neli kirjeldavad sama seost muutujate vahel.
`,
    naide: `
Tabel <Math>{"x=1,2,3 \\\\to y=3,5,7"}</Math> vastab valemile
<Math>{"y=2x+1"}</Math>, sest iga järgmise <Math>{"x"}</Math> korral kasvab
<Math>{"y"}</Math> <Math>{"2"}</Math> võrra.
`,
  },
  "07-maaramispiirkond": {
    definitsioon: `
**Määramispiirkond** on kõigi lubatud argumendi <Math>{"x"}</Math> väärtuste
hulk. Piiranguid tekitavad murru nimetaja (ei tohi olla null) ja paarisjuure
alune avaldis (ei tohi olla negatiivne).
`,
    naide: `
Funktsiooni <Math>{"f(x)=\\\\dfrac{1}{x-3}"}</Math> määramispiirkond on kõik
arvud peale <Math>{"x=3"}</Math>.
`,
  },
  "07-muutumispiirkond": {
    definitsioon: `
**Muutumispiirkond** on kõigi funktsiooni väärtuste <Math>{"y=f(x)"}</Math>
hulk. Ruutfunktsiooni vertexikujul <Math>{"y=(x-h)^2+k"}</Math> on
muutumispiirkond <Math>{"y \\\\ge k"}</Math> (haarad üleval) või
<Math>{"y \\\\le k"}</Math> (haarad all).
`,
    naide: `
Funktsiooni <Math>{"y=(x-2)^2+5"}</Math> muutumispiirkond on
<Math>{"y \\\\ge 5"}</Math>, sest ruut ei ole kunagi negatiivne.
`,
  },
  "07-paaris-ja-paaritu-funktsioon": {
    definitsioon: `
Funktsioon on **paaris**, kui <Math>{"f(-x)=f(x)"}</Math> (graafik
sümmeetriline y-telje suhtes). Funktsioon on **paaritu**, kui
<Math>{"f(-x)=-f(x)"}</Math> (graafik sümmeetriline alguspunkti suhtes).
`,
    naide: `
<Math>{"f(x)=x^2"}</Math> on paaris, <Math>{"f(x)=x^3"}</Math> on paaritu,
<Math>{"f(x)=x^2+x"}</Math> ei ole kumbki.
`,
  },
  "07-nullkohad": {
    definitsioon: `
Funktsiooni **nullkohad** on need argumendi väärtused, mille korral
<Math>{"f(x)=0"}</Math>. Graafikul on need kohad, kus kõver lõikab
x-telge.
`,
    naide: `
Funktsiooni <Math>{"f(x)=(x-2)(x+3)"}</Math> nullkohad on
<Math>{"x=2"}</Math> ja <Math>{"x=-3"}</Math>.
`,
  },
  "07-positiivsus-ja-negatiivsuspiirkond": {
    definitsioon: `
**Positiivsuspiirkond** on argumendi väärtuste hulk, kus
<Math>{"f(x)>0"}</Math>; **negatiivsuspiirkond**, kus
<Math>{"f(x)<0"}</Math>. Piirid määravad funktsiooni nullkohad.
`,
    naide: `
Kui <Math>{"f(x)=(x-1)(x-4)"}</Math> ja haarad on üleval, on funktsioon
negatiivne vahemikus <Math>{"1<x<4"}</Math>.
`,
  },
  "07-kasvamine-ja-kahanemine": {
    definitsioon: `
Funktsioon **kasvab** vahemikus, kui suuremale <Math>{"x"}</Math>-le vastab
suurem <Math>{"f(x)"}</Math>, ja **kahaneb**, kui suuremale
<Math>{"x"}</Math>-le vastab väiksem <Math>{"f(x)"}</Math>. Parabooli korral
vahetub monotoonsus haripunktis.
`,
    naide: `
Funktsioon <Math>{"y=(x-3)^2"}</Math> kahaneb, kui <Math>{"x<3"}</Math>, ja
kasvab, kui <Math>{"x>3"}</Math>.
`,
  },
  "07-ekstreemum": {
    definitsioon: `
**Ekstreemum** on funktsiooni haripunkti väärtus: **miinimum**, kui haarad on
üleval, **maksimum**, kui haarad on all. Vertexikuju
<Math>{"y=a(x-h)^2+k"}</Math> annab ekstreemumi otse: väärtus
<Math>{"k"}</Math> kohal <Math>{"x=h"}</Math>.
`,
    naide: `
Funktsiooni <Math>{"y=-2(x-1)^2+7"}</Math> ekstreemum on maksimum
<Math>{"7"}</Math> kohal <Math>{"x=1"}</Math>.
`,
  },
  "07-astmefunktsioon": {
    definitsioon: `
**Astmefunktsioon** on kujul <Math>{"y=x^n"}</Math>. Naturaalarvulise astme
korral (<Math>{"n=2,3,4,\\\\ldots"}</Math>) on tegemist tavalise astendamisega;
negatiivse astme korral (<Math>{"n=-1,-2,\\\\ldots"}</Math>) tähendab see
pöördväärtust; murdarvulise astme korral (<Math>{"n=\\\\frac12,\\\\frac13,\\\\ldots"}</Math>)
tähendab see juurimist.
`,
    naide: `
<MathBlock>{"x^{-1} = \\\\dfrac1x \\\\qquad x^{1/2} = \\\\sqrt{x} \\\\qquad x^{3/2}=\\\\left(\\\\sqrt{x}\\\\right)^3"}</MathBlock>
`,
  },
  "07-pohifunktsioonide-graafikud": {
    definitsioon: `
Ainekava põhifunktsioonid, mille graafikuid tasub peast tunda:
**lineaarfunktsioon** (sirge), **ruutfunktsioon** (parabool),
**kuupfunktsioon**, **pöördvõrdeline funktsioon** (hüperbool),
**absoluutväärtusfunktsioon** ja **ruutjuurfunktsioon**.
`,
    naide: `
<Math>{"y=x^2"}</Math> graafik on parabool tipuga alguspunktis, harud
üleval, sümmeetriline y-telje suhtes.
`,
  },
  "07-graafiku-teisendused": {
    definitsioon: `
Graafiku <Math>{"y=f(x)"}</Math> teisendused:
<MathBlock>{"f(x)+a \\\\text{ — nihe üles/alla} \\\\qquad f(x+a) \\\\text{ — nihe vasakule/paremale}"}</MathBlock>
<MathBlock>{"a\\\\cdot f(x) \\\\text{ — venitus/kokkusurumine vertikaalselt} \\\\qquad f(ax) \\\\text{ — venitus/kokkusurumine horisontaalselt}"}</MathBlock>
`,
    naide: `
Kui <Math>{"f(2)=5"}</Math>, siis <Math>{"g(x)=3f(x)"}</Math> korral
<Math>{"g(2)=3\\\\cdot5=15"}</Math>.
`,
  },
  "07-arvjada-moiste-ja-uldliige": {
    definitsioon: `
**Arvjada** on funktsioon, mille määramispiirkond on naturaalarvud. Jada
liikmeid tähistatakse <Math>{"a_1, a_2, a_3, \\\\ldots"}</Math> ja
**üldliige** <Math>{"a_n"}</Math> annab valemi, mille abil arvutada iga
liige järjekorranumbri <Math>{"n"}</Math> järgi.
`,
    naide: `
Kui <Math>{"a_n=3n-1"}</Math>, siis <Math>{"a_5=3\\\\cdot5-1=14"}</Math>.
`,
  },
  "07-aritmeetiline-jada": {
    definitsioon: `
**Aritmeetiline jada** on jada, kus iga liige erineb eelmisest sama
konstantse vahe <Math>{"d"}</Math> võrra:
<MathBlock>{"a_n = a_1 + (n-1)d"}</MathBlock>
`,
    naide: `
Kui <Math>{"a_1=5"}</Math> ja <Math>{"d=3"}</Math>, siis
<Math>{"a_4=5+3\\\\cdot3=14"}</Math>.
`,
  },
  "07-aritmeetilise-jada-summa": {
    definitsioon: `
Aritmeetilise jada esimese <Math>{"n"}</Math> liikme summa:
<MathBlock>{"S_n = \\\\dfrac{n(2a_1+(n-1)d)}{2} = \\\\dfrac{n(a_1+a_n)}{2}"}</MathBlock>
`,
    naide: `
Kui <Math>{"a_1=1"}</Math>, <Math>{"a_{10}=19"}</Math>, siis
<Math>{"S_{10}=\\\\dfrac{10(1+19)}{2}=100"}</Math>.
`,
  },
  "07-geomeetriline-jada": {
    definitsioon: `
**Geomeetriline jada** on jada, kus iga liige saadakse eelmisest korrutamisel
konstantse teguriga <Math>{"q"}</Math>:
<MathBlock>{"a_n = a_1 \\\\cdot q^{n-1}"}</MathBlock>
`,
    naide: `
Kui <Math>{"a_1=2"}</Math> ja <Math>{"q=3"}</Math>, siis
<Math>{"a_4=2\\\\cdot3^3=54"}</Math>.
`,
  },
  "07-geomeetrilise-jada-summa": {
    definitsioon: `
Geomeetrilise jada esimese <Math>{"n"}</Math> liikme summa (kui
<Math>{"q\\\\ne1"}</Math>):
<MathBlock>{"S_n = \\\\dfrac{a_1(q^n-1)}{q-1}"}</MathBlock>
`,
    naide: `
Kui <Math>{"a_1=1"}</Math>, <Math>{"q=2"}</Math>, <Math>{"n=4"}</Math>, siis
<Math>{"S_4=\\\\dfrac{1\\\\cdot(2^4-1)}{2-1}=15"}</Math>.
`,
  },
  "07-arvjada-piirvaartus": {
    definitsioon: `
Jada **piirväärtus** kirjeldab, millisele arvule liiga jada liikmed
lähenevad, kui <Math>{"n\\\\to\\\\infty"}</Math>. Murrulise jada korral
jagatakse lugeja ja nimetaja suurima esineva astmega <Math>{"n"}</Math>.
`,
    naide: `
<MathBlock>{"\\\\lim_{n\\\\to\\\\infty}\\\\dfrac{2n+1}{3n} = \\\\lim_{n\\\\to\\\\infty}\\\\dfrac{2+\\\\frac1n}{3} = \\\\dfrac23"}</MathBlock>
`,
  },
  "07-haabuv-geomeetriline-jada": {
    definitsioon: `
**Hääbuv geomeetriline jada** on geomeetriline jada, mille teguri
absoluutväärtus on alla ühe (<Math>{"|q|<1"}</Math>). Sellise jada kõigi
liikmete summa on lõplik:
<MathBlock>{"S = \\\\dfrac{a_1}{1-q}"}</MathBlock>
`,
    naide: `
Kui <Math>{"a_1=4"}</Math> ja <Math>{"q=\\\\frac12"}</Math>, siis
<Math>{"S=\\\\dfrac{4}{1-1/2}=8"}</Math>.
`,
  },
  "07-arv-e-piirvaartusena": {
    definitsioon: `
Arv <Math>{"e\\\\approx2{,}71828"}</Math> defineeritakse piirväärtusena:
<MathBlock>{"e = \\\\lim_{n\\\\to\\\\infty}\\\\left(1+\\\\dfrac1n\\\\right)^n"}</MathBlock>
Arv <Math>{"e"}</Math> on irratsionaalarv, nagu <Math>{"\\\\pi"}</Math>.
`,
    naide: `
<Math>{"n=2"}</Math> korral: <Math>{"\\\\left(1+\\\\frac12\\\\right)^2=\\\\frac94=2{,}25"}</Math>
— juba lähedal arvule <Math>{"e"}</Math>.
`,
  },
  "07-ringjoone-pikkus-ja-pindala-piirvaartusena": {
    definitsioon: `
Ringjoonesse sisse kirjutatud korrapärase hulknurga ümbermõõt ja pindala
lähenevad ringjoone pikkusele (<Math>{"2\\\\pi r"}</Math>) ja ringi pindalale
(<Math>{"\\\\pi r^2"}</Math>) seda paremini, mida rohkem on hulknurgal külgi
— need valemid ongi hulknurkade jadade piirväärtused.
`,
    naide: `
Ringjoonesse (raadius <Math>{"r"}</Math>) sisse kirjutatud kuusnurga
ümbermõõt on <Math>{"6r"}</Math>, mis on juba üsna lähedal ringjoone
pikkusele <Math>{"2\\\\pi r\\\\approx6{,}28r"}</Math>.
`,
  },
  "07-jadade-rakendusulesanded": {
    definitsioon: `
Paljud reaalelulised protsessid (püsiva sammuga kasv, kordav kahanemine või
kasv) modelleeritakse aritmeetilise või geomeetrilise jadana. Oluline on
tuvastada, kas muutus on **liitmine** (aritmeetiline) või **korrutamine**
(geomeetriline).
`,
    naide: `
Palk kasvab igal kuul sama summa võrra — aritmeetiline jada; pangahoius
kasvab igal aastal sama teguriga — geomeetriline jada.
`,
  },
};
