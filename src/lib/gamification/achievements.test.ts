import { describe, expect, it } from "vitest";
import { SAAVUTUSED, uuedSaavutused, type SaavutusteKontekst } from "./achievements";

function tuhiKontekst(): SaavutusteKontekst {
  return {
    masteryByTeema: {},
    kursusedAlustatud: new Set(),
    koikKursused: ["01", "02"],
    eeldusteTeemad: ["E-murrud"],
    labitudEksameid: 0,
    streakLongest: 0,
    taastusKatkenudStreakist: false,
  };
}

describe("uuedSaavutused", () => {
  it("unlocks nothing from an empty context", () => {
    expect(uuedSaavutused(tuhiKontekst(), new Set())).toEqual([]);
  });

  it("unlocks the first-kindel-topic achievement once any topic reaches kindel", () => {
    const kontekst = {
      ...tuhiKontekst(),
      masteryByTeema: { "01-a": "kindel" as const },
    };
    expect(uuedSaavutused(kontekst, new Set())).toContain(
      "esimene-kindel-teema",
    );
  });

  it("never re-reports an already-unlocked achievement", () => {
    const kontekst = {
      ...tuhiKontekst(),
      masteryByTeema: { "01-a": "kindel" as const },
    };
    expect(
      uuedSaavutused(kontekst, new Set(["esimene-kindel-teema"])),
    ).not.toContain("esimene-kindel-teema");
  });

  it("requires every prerequisite topic at hea-or-above for eeldused-labitud", () => {
    const partial = {
      ...tuhiKontekst(),
      eeldusteTeemad: ["E-a", "E-b"],
      masteryByTeema: { "E-a": "kindel" as const, "E-b": "edeneb" as const },
    };
    expect(uuedSaavutused(partial, new Set())).not.toContain(
      "eeldused-labitud",
    );

    const complete = {
      ...partial,
      masteryByTeema: { "E-a": "kindel" as const, "E-b": "hea" as const },
    };
    expect(uuedSaavutused(complete, new Set())).toContain(
      "eeldused-labitud",
    );
  });

  it("requires every mandatory course started for koik-kursused-alustatud", () => {
    const some = {
      ...tuhiKontekst(),
      kursusedAlustatud: new Set(["01"]),
    };
    expect(uuedSaavutused(some, new Set())).not.toContain(
      "koik-kursused-alustatud",
    );

    const all = { ...tuhiKontekst(), kursusedAlustatud: new Set(["01", "02"]) };
    expect(uuedSaavutused(all, new Set())).toContain(
      "koik-kursused-alustatud",
    );
  });

  it("unlocks esimene-eksam only after a completed exam run", () => {
    expect(uuedSaavutused(tuhiKontekst(), new Set())).not.toContain(
      "esimene-eksam",
    );
    expect(
      uuedSaavutused({ ...tuhiKontekst(), labitudEksameid: 1 }, new Set()),
    ).toContain("esimene-eksam");
  });

  it("unlocks nadalane-streak at seven days and tagasituleku-kangelane on the comeback flag", () => {
    expect(
      uuedSaavutused({ ...tuhiKontekst(), streakLongest: 7 }, new Set()),
    ).toContain("nadalane-streak");
    expect(
      uuedSaavutused(
        { ...tuhiKontekst(), taastusKatkenudStreakist: true },
        new Set(),
      ),
    ).toContain("tagasituleku-kangelane");
  });

  it("has a unique id for every catalogue entry", () => {
    const ids = SAAVUTUSED.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
