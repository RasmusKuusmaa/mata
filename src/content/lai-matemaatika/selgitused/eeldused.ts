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
};
