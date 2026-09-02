import { describe, expect, it } from "vitest";
import type { Kursus, Teema } from "@/content/types";
import { groupTeemad } from "./group";

function kursus(id: string, jrk: number, nimi: string): Kursus {
  return { id, aine: "lai-matemaatika", jrk, nimi };
}

function teema(id: string, kursusId: string, nimi: string, opitulemused: string[]): Teema {
  return {
    id,
    aine: "lai-matemaatika",
    kursusId,
    nimi,
    kirjeldus: "",
    opitulemused,
    eeldused: [],
    allikas: ["rok2023"],
    eksamiKate: { 2027: true },
  };
}

const kursused: Kursus[] = [
  kursus("02", 2, "Teine kursus"),
  kursus("01", 1, "Esimene kursus"),
];

const teemad: Teema[] = [
  teema("01-a", "01", "Ruutvõrrand", ["lahendab ruutvõrrandi"]),
  teema("01-b", "01", "Lineaarvõrrand", ["lahendab lineaarvõrrandi"]),
  teema("02-a", "02", "Trigonomeetria", ["arvutab siinuse ja koosinuse"]),
];

describe("groupTeemad", () => {
  it("sorts courses by jrk regardless of input order", () => {
    const ryhmad = groupTeemad(kursused, teemad, "");
    expect(ryhmad.map((r) => r.kursus.id)).toEqual(["01", "02"]);
  });

  it("groups topics under their own course only", () => {
    const ryhmad = groupTeemad(kursused, teemad, "");
    const esimene = ryhmad.find((r) => r.kursus.id === "01");
    expect(esimene?.teemad.map((t) => t.id).sort()).toEqual(["01-a", "01-b"]);
  });

  it("returns every course, even ones with no topics, when not searching", () => {
    const tuhiKursused = [...kursused, kursus("03", 3, "Kolmas kursus")];
    const ryhmad = groupTeemad(tuhiKursused, teemad, "");
    expect(ryhmad).toHaveLength(3);
    expect(ryhmad.find((r) => r.kursus.id === "03")?.teemad).toEqual([]);
  });

  it("matches a search query against the topic name, case-insensitively", () => {
    const ryhmad = groupTeemad(kursused, teemad, "RUUTvõrrand");
    expect(ryhmad).toHaveLength(1);
    expect(ryhmad[0].teemad.map((t) => t.id)).toEqual(["01-a"]);
  });

  it("matches a search query against opitulemused", () => {
    const ryhmad = groupTeemad(kursused, teemad, "koosinuse");
    expect(ryhmad).toHaveLength(1);
    expect(ryhmad[0].kursus.id).toBe("02");
  });

  it("drops a course entirely when it has no matching topics", () => {
    const ryhmad = groupTeemad(kursused, teemad, "trigonomeetria");
    expect(ryhmad.map((r) => r.kursus.id)).toEqual(["02"]);
  });

  it("returns no groups when nothing matches", () => {
    expect(groupTeemad(kursused, teemad, "ei leidu midagi")).toEqual([]);
  });

  it("treats a whitespace-only query as no search", () => {
    const ryhmad = groupTeemad(kursused, teemad, "   ");
    expect(ryhmad).toHaveLength(2);
  });
});
