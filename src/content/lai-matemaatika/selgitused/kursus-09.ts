import type { SelgitusProps } from "@/components/explanation/Selgitus";
import type { TeemaId } from "@/content/types";

/**
 * Explanations for Kursus 9 (Trigonomeetrilised funktsioonid. Funktsiooni
 * piirväärtus ja tuletis). One entry per topic. Re-exported from
 * `selgitused/index.ts`. No bare `$...$` math delimiters — see
 * `eeldused.ts`'s header comment for why.
 */
export const selgitused: Partial<Record<TeemaId, SelgitusProps>> = {
  "09-funktsiooni-perioodilisus": {
    definitsioon: `
Funktsioon on **perioodiline**, kui leidub arv <Math>{"T\\\\ne0"}</Math>, mille
korral <Math>{"f(x+T)=f(x)"}</Math> iga <Math>{"x"}</Math> korral. Väikseimat
sellist positiivset <Math>{"T"}</Math> nimetatakse **perioodiks**.
`,
    naide: `
<Math>{"\\\\sin x"}</Math> ja <Math>{"\\\\cos x"}</Math> perioodid on
<Math>{"2\\\\pi"}</Math>, <Math>{"\\\\tg\\\\,x"}</Math> periood on
<Math>{"\\\\pi"}</Math>.
`,
  },
  "09-siinusfunktsiooni-graafik": {
    definitsioon: `
Funktsiooni <Math>{"y=\\\\sin x"}</Math> graafik on **laine**, mis kõigub
vahemikus <Math>{"[-1, 1]"}</Math>, on paaritu ja perioodiga
<Math>{"2\\\\pi"}</Math>.
`,
    naide: `
<Math>{"\\\\sin\\\\dfrac{\\\\pi}{6}=\\\\dfrac12"}</Math>,
<Math>{"\\\\sin\\\\dfrac{\\\\pi}{2}=1"}</Math>.
`,
  },
  "09-koosinusfunktsiooni-graafik": {
    definitsioon: `
Funktsiooni <Math>{"y=\\\\cos x"}</Math> graafik on siinuse graafik, mis on
nihutatud <Math>{"\\\\frac{\\\\pi}{2}"}</Math> võrra vasakule. Väärtused
jäävad vahemikku <Math>{"[-1,1]"}</Math>, funktsioon on paaris.
`,
    naide: `
<Math>{"\\\\cos 0=1"}</Math>, <Math>{"\\\\cos\\\\dfrac{\\\\pi}{2}=0"}</Math>.
`,
  },
  "09-tangensfunktsiooni-graafik": {
    definitsioon: `
Funktsioon <Math>{"y=\\\\tg\\\\,x"}</Math> on perioodiga <Math>{"\\\\pi"}</Math>
ja ei ole defineeritud kohtadel, kus <Math>{"\\\\cos x=0"}</Math>, ehk
<Math>{"x=\\\\frac{\\\\pi}{2}+k\\\\pi"}</Math>.
`,
    naide: `
<Math>{"\\\\tg\\\\,0=0"}</Math>, <Math>{"\\\\tg\\\\,\\\\dfrac{\\\\pi}{4}=1"}</Math>.
`,
  },
  "09-arcsin-arccos-arctan": {
    definitsioon: `
**Pöördtrigonomeetrilised funktsioonid** annavad nurga, mille siinus, koosinus
või tangens on antud väärtus. Väärtuspiirkonnad on kitsendatud, et funktsioon
oleks üheselt määratud: <Math>{"\\\\arcsin"}</Math> annab nurga vahemikust
<Math>{"[-\\\\frac{\\\\pi}{2},\\\\frac{\\\\pi}{2}]"}</Math>,
<Math>{"\\\\arccos"}</Math> vahemikust <Math>{"[0,\\\\pi]"}</Math>.
`,
    naide: `
<Math>{"\\\\arcsin\\\\dfrac12 = \\\\dfrac{\\\\pi}{6}"}</Math>.
`,
  },
  "09-lihtsamad-trigonomeetrilised-vorrandid": {
    definitsioon: `
Lihtsaima trigonomeetrilise võrrandi <Math>{"\\\\sin x=c"}</Math>
lahendamiseks kasutatakse pöördfunktsiooni: vähim positiivne lahend on
<Math>{"x=\\\\arcsin c"}</Math> (või <Math>{"\\\\arccos c"}</Math> koosinuse
korral).
`,
    naide: `
<Math>{"\\\\sin x=\\\\frac12 \\\\Rightarrow x=\\\\frac{\\\\pi}{6}"}</Math>
(vähim positiivne lahend).
`,
  },
  "09-uldlahend-ja-erilahendid": {
    definitsioon: `
Trigonomeetrilisel võrrandil on lõpmata palju lahendeid perioodilisuse tõttu.
**Üldlahend** kirjeldab kõiki lahendeid korraga, liites täisarvkordse
perioodi; **erilahend** on üks konkreetne lahend, mis saadakse üldlahendisse
konkreetse täisarvu asendamisel.
`,
    naide: `
Üldlahend <Math>{"x=\\\\frac{\\\\pi}{6}+2\\\\pi n"}</Math>: kui
<Math>{"n=1"}</Math>, saame erilahendi <Math>{"x=\\\\frac{13\\\\pi}{6}"}</Math>.
`,
  },
  "09-lihtsamad-trigonomeetrilised-vorratused": {
    definitsioon: `
Trigonomeetrilise võrratuse lahendamiseks joonestatakse funktsiooni graafik
(või ühikringjoon) ning loetakse sealt piirkond, kus võrratus kehtib.
`,
    naide: `
<Math>{"\\\\sin x>\\\\frac12"}</Math> vahemikus <Math>{"[0,2\\\\pi)"}</Math>
kehtib, kui <Math>{"\\\\frac{\\\\pi}{6}<x<\\\\frac{5\\\\pi}{6}"}</Math>.
`,
  },
  "09-funktsiooni-piirvaartus": {
    definitsioon: `
Funktsiooni **piirväärtus** kohal <Math>{"x=a"}</Math> kirjeldab väärtust,
millele funktsioon läheneb, kui <Math>{"x"}</Math> läheneb arvule
<Math>{"a"}</Math>. Pideva funktsiooni korral saab piirväärtuse leida otse
asendades.
`,
    naide: `
<Math>{"\\\\lim_{x\\\\to2}(3x+1)=7"}</Math>.
`,
  },
  "09-funktsiooni-pidevus": {
    definitsioon: `
Funktsioon on kohal <Math>{"x=a"}</Math> **pidev**, kui piirväärtus sealt
võrdub funktsiooni väärtusega:
<MathBlock>{"\\\\lim_{x\\\\to a}f(x)=f(a)"}</MathBlock>
`,
    naide: `
Tükati määratud funktsioon on pidev "õmblus"-kohas, kui mõlema haru
väärtused sealsamas kokku langevad.
`,
  },
  "09-argumendi-muut-ja-funktsiooni-muut": {
    definitsioon: `
**Argumendi muut** <Math>{"\\\\Delta x"}</Math> on argumendi muutus;
**funktsiooni muut** <Math>{"\\\\Delta y=f(x+\\\\Delta x)-f(x)"}</Math> on
sellele vastav funktsiooni väärtuse muutus.
`,
    naide: `
Kui <Math>{"f(x)=x^2"}</Math>, <Math>{"x=2"}</Math>,
<Math>{"\\\\Delta x=1"}</Math>, siis
<Math>{"\\\\Delta y=f(3)-f(2)=9-4=5"}</Math>.
`,
  },
  "09-hetkkiirus": {
    definitsioon: `
**Keskmine kiirus** ajavahemikul on läbitud tee ja kulunud aja suhe;
**hetkkiirus** on keskmise kiiruse piirväärtus, kui ajavahemik läheneb
nullile — ehk asukoha funktsiooni tuletis.
`,
    naide: `
Kui <Math>{"s(t)=t^2"}</Math>, siis hetkkiirus kohal
<Math>{"t=3"}</Math> on <Math>{"s'(3)=6"}</Math>.
`,
  },
  "09-puutuja-tous": {
    definitsioon: `
**Lõikaja** (sirge läbi kahe graafiku punkti) tõus läheneb **puutuja**
tõusule, kui teine punkt läheneb esimesele. Puutuja tõus kohal
<Math>{"x=a"}</Math> ongi tuletis <Math>{"f'(a)"}</Math>.
`,
    naide: `
Kui <Math>{"f(x)=x^2"}</Math>, on lõikaja tõus punktide <Math>{"x=2"}</Math>
ja <Math>{"x=3"}</Math> vahel <Math>{"2+3=5"}</Math>.
`,
  },
  "09-tuletise-moiste": {
    definitsioon: `
**Tuletis** kohal <Math>{"x=a"}</Math> on funktsiooni muutu ja argumendi
muutu suhte piirväärtus, kui argumendi muut läheneb nullile:
<MathBlock>{"f'(a) = \\\\lim_{\\\\Delta x\\\\to0}\\\\dfrac{f(a+\\\\Delta x)-f(a)}{\\\\Delta x}"}</MathBlock>
Praktikas kasutatakse tuletiste tabelit ja -reegleid, mitte piirväärtuse
definitsiooni otse.
`,
    naide: `
<Math>{"f(x)=x^3 \\\\Rightarrow f'(x)=3x^2 \\\\Rightarrow f'(2)=12"}</Math>.
`,
  },
  "09-tuletise-geomeetriline-tahendus": {
    definitsioon: `
Tuletis <Math>{"f'(a)"}</Math> on funktsiooni graafiku **puutuja tõus**
kohal <Math>{"x=a"}</Math>.
`,
    naide: `
Kui <Math>{"f'(2)=5"}</Math>, on puutuja tõus kohal <Math>{"x=2"}</Math>
võrdne <Math>{"5"}</Math>.
`,
  },
  "09-tuletise-fuusikaline-tahendus": {
    definitsioon: `
Kui <Math>{"s(t)"}</Math> kirjeldab keha asukohta ajahetkel <Math>{"t"}</Math>,
siis tuletis <Math>{"s'(t)"}</Math> on keha **hetkkiirus**, ja teine tuletis
<Math>{"s''(t)"}</Math> on **kiirendus**.
`,
    naide: `
Kui <Math>{"s(t)=t^2"}</Math>, on kiirus <Math>{"v(t)=2t"}</Math> ja
kiirendus <Math>{"a(t)=2"}</Math> (konstantne).
`,
  },
  "09-summa-ja-vahe-tuletis": {
    definitsioon: `
Summa ja vahe tuletamise reegel:
<MathBlock>{"(f\\\\pm g)'(x) = f'(x) \\\\pm g'(x)"}</MathBlock>
`,
    naide: `
Kui <Math>{"f'(1)=3"}</Math> ja <Math>{"g'(1)=-2"}</Math>, siis
<Math>{"(f+g)'(1)=1"}</Math>.
`,
  },
  "09-korrutise-tuletis": {
    definitsioon: `
Korrutise tuletamise reegel:
<MathBlock>{"(fg)'(x) = f'(x)g(x) + f(x)g'(x)"}</MathBlock>
`,
    naide: `
Kui <Math>{"f(x)=x"}</Math> ja <Math>{"g(x)=x+1"}</Math>, siis
<Math>{"(fg)'(x)=1\\\\cdot(x+1)+x\\\\cdot1=2x+1"}</Math>.
`,
  },
  "09-jagatise-tuletis": {
    definitsioon: `
Jagatise tuletamise reegel:
<MathBlock>{"\\\\left(\\\\dfrac{f}{g}\\\\right)'(x) = \\\\dfrac{f'(x)g(x)-f(x)g'(x)}{g(x)^2}"}</MathBlock>
`,
    naide: `
Kui <Math>{"f(x)=x"}</Math> ja <Math>{"g(x)=x+1"}</Math>, siis
<Math>{"\\\\left(\\\\frac{f}{g}\\\\right)'(x)=\\\\dfrac{(x+1)-x}{(x+1)^2}=\\\\dfrac{1}{(x+1)^2}"}</Math>.
`,
  },
  "09-astmefunktsiooni-tuletis": {
    definitsioon: `
Astmefunktsiooni tuletamise reegel kehtib iga astendaja <Math>{"n"}</Math>
korral (täisarv, murd, negatiivne):
<MathBlock>{"(x^n)' = nx^{n-1}"}</MathBlock>
`,
    naide: `
<Math>{"(x^{-1})' = -x^{-2} = -\\\\dfrac{1}{x^2}"}</Math>,
<Math>{"(x^{1/2})' = \\\\dfrac{1}{2\\\\sqrt{x}}"}</Math>.
`,
  },
  "09-liitfunktsioon": {
    definitsioon: `
**Liitfunktsioon** <Math>{"h(x)=f(g(x))"}</Math> koosneb **sisemisest**
funktsioonist <Math>{"g"}</Math> ja **välimisest** funktsioonist
<Math>{"f"}</Math> — kõigepealt arvutatakse <Math>{"g(x)"}</Math>, seejärel
rakendatakse sellele <Math>{"f"}</Math>.
`,
    naide: `
<Math>{"h(x)=(3x+1)^2"}</Math> on liitfunktsioon, kus
<Math>{"g(x)=3x+1"}</Math> ja <Math>{"f(x)=x^2"}</Math>.
`,
  },
  "09-liitfunktsiooni-tuletis": {
    definitsioon: `
**Ahelreegel** liitfunktsiooni <Math>{"h(x)=f(g(x))"}</Math> tuletamiseks:
<MathBlock>{"h'(x) = f'(g(x)) \\\\cdot g'(x)"}</MathBlock>
`,
    naide: `
<Math>{"h(x)=(3x+1)^2 \\\\Rightarrow h'(x)=2(3x+1)\\\\cdot3=6(3x+1)"}</Math>.
`,
  },
  "09-trigonomeetriliste-funktsioonide-tuletised": {
    definitsioon: `
Trigonomeetriliste funktsioonide tuletised:
<MathBlock>{"(\\\\sin x)'=\\\\cos x \\\\qquad (\\\\cos x)'=-\\\\sin x \\\\qquad (\\\\tg\\\\,x)'=1+\\\\tg^2 x = \\\\dfrac{1}{\\\\cos^2 x}"}</MathBlock>
`,
    naide: `
Kui <Math>{"\\\\cos a=\\\\frac45"}</Math>, siis
<Math>{"(\\\\sin x)'|_{x=a}=\\\\frac45"}</Math>.
`,
  },
  "09-eksponentfunktsiooni-tuletis": {
    definitsioon: `
Eksponentfunktsiooni tuletised:
<MathBlock>{"(e^x)'=e^x \\\\qquad (a^x)'=a^x\\\\ln a"}</MathBlock>
Funktsioon <Math>{"e^x"}</Math> on ainus (nullist erineva kordajani), mille
tuletis võrdub funktsiooniga endaga.
`,
    naide: `
Kui <Math>{"e^a=4"}</Math>, siis <Math>{"(e^x)'|_{x=a}=4"}</Math>.
`,
  },
  "09-logaritmfunktsiooni-tuletis": {
    definitsioon: `
Logaritmfunktsiooni tuletised:
<MathBlock>{"(\\\\ln x)'=\\\\dfrac1x \\\\qquad (\\\\log_a x)'=\\\\dfrac{1}{x\\\\ln a}"}</MathBlock>
`,
    naide: `
<Math>{"(\\\\ln x)'|_{x=5}=\\\\dfrac15"}</Math>.
`,
  },
  "09-teine-tuletis": {
    definitsioon: `
**Teine tuletis** <Math>{"f''(x)"}</Math> on funktsiooni tuletise tuletis —
tuletatakse <Math>{"f'(x)"}</Math> veel kord.
`,
    naide: `
Kui <Math>{"f(x)=x^3"}</Math>, siis <Math>{"f'(x)=3x^2"}</Math> ja
<Math>{"f''(x)=6x"}</Math>.
`,
  },
  "09-tuletiste-tabel": {
    definitsioon: `
Põhifunktsioonide tuletiste koondtabel (astmefunktsioon, trigonomeetrilised,
eksponent- ja logaritmfunktsioonid) koos tuletamise reeglitega (summa, vahe,
korrutis, jagatis, ahelreegel) katab kõik eksamil vajaminevad tuletised.
`,
    naide: `
<Math>{"f(x)=3\\\\sin x-2\\\\cos x \\\\Rightarrow f'(x)=3\\\\cos x+2\\\\sin x"}</Math>.
`,
  },
};
