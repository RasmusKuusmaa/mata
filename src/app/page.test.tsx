import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { KulastajaKodu } from "./KulastajaKodu";

describe("KulastajaKodu", () => {
  it("renders the hero, a no-account CTA, and the topic tree link", () => {
    const html = renderToStaticMarkup(<KulastajaKodu />);
    expect(html).toContain("Lai matemaatika riigieksamiks valmistumine");
    expect(html).toContain('href="/lai-matemaatika/teemad"');
    expect(html).toContain("Proovi ilma kontota");
  });

  it("shows an honest, non-zero coverage count out of the full curriculum", () => {
    const html = renderToStaticMarkup(<KulastajaKodu />);
    // Course 1 + the E-series are fully authored (Ship 1.8) — the shown
    // count must reflect that, never claim 0% or 100%.
    expect(html).toMatch(/\d+ \/ \d+ \(\d+%\)/);
    expect(html).not.toContain("0 / ");
  });
});
