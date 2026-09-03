import { describe, expect, it } from "vitest";
import { rankWeakestTopics, type TeemaSeis } from "./weakest";

const NOW = new Date("2026-09-04T12:00:00Z");

function seis(overrides: Partial<TeemaSeis> & { teemaId: string }): TeemaSeis {
  return {
    masteryScore: 80,
    masteryTase: "hea",
    manualReview: false,
    lastSeenAt: NOW,
    ...overrides,
  };
}

describe("rankWeakestTopics", () => {
  it("ranks lower mastery above higher mastery", () => {
    const [first, second] = rankWeakestTopics(
      [
        seis({ teemaId: "high", masteryScore: 90 }),
        seis({ teemaId: "low", masteryScore: 20 }),
      ],
      NOW,
    );
    expect(first.teemaId).toBe("low");
    expect(second.teemaId).toBe("high");
  });

  it("ranks a manually-flagged topic above an equally-scored unflagged one", () => {
    const [first, second] = rankWeakestTopics(
      [
        seis({ teemaId: "unflagged", masteryScore: 70 }),
        seis({ teemaId: "flagged", masteryScore: 70, manualReview: true }),
      ],
      NOW,
    );
    expect(first.teemaId).toBe("flagged");
    expect(second.teemaId).toBe("unflagged");
  });

  it("ranks a stale topic above an equally-scored recently-seen one", () => {
    const longAgo = new Date(NOW);
    longAgo.setUTCDate(longAgo.getUTCDate() - 60);

    const [first, second] = rankWeakestTopics(
      [
        seis({ teemaId: "fresh", masteryScore: 70, lastSeenAt: NOW }),
        seis({ teemaId: "stale", masteryScore: 70, lastSeenAt: longAgo }),
      ],
      NOW,
    );
    expect(first.teemaId).toBe("stale");
    expect(second.teemaId).toBe("fresh");
  });

  it("never lets staleness alone outrank a genuinely low score", () => {
    const veryLongAgo = new Date(NOW);
    veryLongAgo.setUTCDate(veryLongAgo.getUTCDate() - 3650);

    const [first] = rankWeakestTopics(
      [
        seis({ teemaId: "stale-but-strong", masteryScore: 95, lastSeenAt: veryLongAgo }),
        seis({ teemaId: "weak", masteryScore: 10, lastSeenAt: NOW }),
      ],
      NOW,
    );
    expect(first.teemaId).toBe("weak");
  });

  it("treats a topic with no lastSeenAt as not stale", () => {
    const result = rankWeakestTopics(
      [seis({ teemaId: "never-seen", masteryScore: 50, lastSeenAt: null })],
      NOW,
    );
    expect(result[0].prioriteet).toBe(50);
  });
});
