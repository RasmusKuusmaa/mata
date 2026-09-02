import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { Kursus, Teema } from "@/content/types";
import { TeemadBrowser } from "./TeemadBrowser";

function kursus(id: string, jrk: number, nimi: string): Kursus {
  return { id, aine: "lai-matemaatika", jrk, nimi };
}

function teema(
  id: string,
  kursusId: string,
  nimi: string,
  eksamiKate2027 = true,
): Teema {
  return {
    id,
    aine: "lai-matemaatika",
    kursusId,
    nimi,
    kirjeldus: "",
    opitulemused: ["õpitulemus"],
    eeldused: [],
    allikas: ["rok2023"],
    eksamiKate: { 2027: eksamiKate2027 },
  };
}

describe("TeemadBrowser", () => {
  const kursused = [kursus("01", 1, "Esimene kursus")];

  it("renders every course as a collapsible section, collapsed by default", () => {
    const teemad = [teema("01-a", "01", "Ruutvõrrand")];
    const html = renderToStaticMarkup(
      <TeemadBrowser kursused={kursused} teemad={teemad} />,
    );
    expect(html).toContain("<details");
    expect(html).not.toContain("open=");
    expect(html).toContain("Esimene kursus");
    expect(html).toContain("Ruutvõrrand");
  });

  it("links each topic to its detail page", () => {
    const teemad = [teema("01-a", "01", "Ruutvõrrand")];
    const html = renderToStaticMarkup(
      <TeemadBrowser kursused={kursused} teemad={teemad} />,
    );
    expect(html).toContain('href="/lai-matemaatika/teemad/01-a"');
  });

  it("shows the exam-coverage badge only for excluded topics", () => {
    const teemad = [
      teema("01-a", "01", "Kaetud teema", true),
      teema("01-b", "01", "Katmata teema", false),
    ];
    const html = renderToStaticMarkup(
      <TeemadBrowser kursused={kursused} teemad={teemad} />,
    );
    const badgeCount = html.split("2027. aasta eksamil ei käsitleta").length - 1;
    expect(badgeCount).toBe(1);
  });

  it("shows a no-results message when the search matches nothing", () => {
    const teemad = [teema("01-a", "01", "Ruutvõrrand")];
    const html = renderToStaticMarkup(
      <TeemadBrowser kursused={kursused} teemad={teemad} />,
    );
    // Initial render has no query, so the empty state should not show yet.
    expect(html).not.toContain("Otsingule ei vastanud");
  });
});
