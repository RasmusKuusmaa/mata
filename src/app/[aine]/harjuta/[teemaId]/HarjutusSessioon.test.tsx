import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { HarjutusSessioon } from "./HarjutusSessioon";
import type { KlientUlesanne } from "@/lib/practice/session";

function ulesanne(overrides: Partial<KlientUlesanne> = {}): KlientUlesanne {
  return {
    seed: 1,
    kysimus: "1 + 1 = ?",
    vastuseTuup: { tuup: "arv" },
    ...overrides,
  };
}

describe("HarjutusSessioon", () => {
  it("shows the first question and a 1-based progress indicator", () => {
    const html = renderToStaticMarkup(
      <HarjutusSessioon
        tagasiHref="/lai-matemaatika/teemad/01-arvuhulgad"
        token="token"
        ulesanded={[ulesanne(), ulesanne()]}
      />,
    );
    expect(html).toContain("1 / 2");
  });

  it("renders a free-text input for an arv answer", () => {
    const html = renderToStaticMarkup(
      <HarjutusSessioon
        tagasiHref="/lai-matemaatika/teemad/01-arvuhulgad"
        token="token"
        ulesanded={[ulesanne({ vastuseTuup: { tuup: "arv" } })]}
      />,
    );
    expect(html).toContain("<input");
    expect(html).not.toContain('role="radio"');
  });

  it("renders every option as a choice for a valik answer, in the order given", () => {
    const html = renderToStaticMarkup(
      <HarjutusSessioon
        tagasiHref="/lai-matemaatika/teemad/01-arvuhulgad"
        token="token"
        ulesanded={[
          ulesanne({
            vastuseTuup: { tuup: "valik", valikud: ["4", "5", "6"] },
          }),
        ]}
      />,
    );
    expect(html).not.toContain("<input");
    expect(html).toContain(">4<");
    expect(html).toContain(">5<");
    expect(html).toContain(">6<");
  });

  it("shows a hint toggle only when the question carries a hint", () => {
    const withHint = renderToStaticMarkup(
      <HarjutusSessioon
        tagasiHref="/lai-matemaatika/teemad/01-arvuhulgad"
        token="token"
        ulesanded={[ulesanne({ vihje: "x + 1" })]}
      />,
    );
    expect(withHint).toContain("Näita vihjet");

    const withoutHint = renderToStaticMarkup(
      <HarjutusSessioon
        tagasiHref="/lai-matemaatika/teemad/01-arvuhulgad"
        token="token"
        ulesanded={[ulesanne()]}
      />,
    );
    expect(withoutHint).not.toContain("Näita vihjet");
  });

  it("uses a comma-separated placeholder for a hulk answer", () => {
    const html = renderToStaticMarkup(
      <HarjutusSessioon
        tagasiHref="/lai-matemaatika/teemad/01-arvuhulgad"
        token="token"
        ulesanded={[ulesanne({ vastuseTuup: { tuup: "hulk" } })]}
      />,
    );
    expect(html).toContain("Nt: 2, 5");
  });
});
