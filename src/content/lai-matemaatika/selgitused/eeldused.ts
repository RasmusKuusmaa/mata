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
};
