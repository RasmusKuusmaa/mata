import { describe, expect, it } from "vitest";
import { db } from "./client";
import { getTopicState, setManualReview } from "./topic-state";
import { topicState, users } from "./schema";

async function makeUser(): Promise<string> {
  const id = crypto.randomUUID();
  await db.insert(users).values({ id, email: `${id}@example.com` });
  return id;
}

describe("topic-state", () => {
  it("returns null for a topic never touched", async () => {
    const userId = await makeUser();
    expect(await getTopicState(userId, "01-arvuhulgad")).toBeNull();
  });

  it("creates the row on first manual-review toggle", async () => {
    const userId = await makeUser();
    await setManualReview(userId, "01-arvuhulgad", true);

    const state = await getTopicState(userId, "01-arvuhulgad");
    expect(state?.manualReview).toBe(true);
    expect(state?.masteryScore).toBe(0);
  });

  it("is independent of mastery — toggling review does not touch the score", async () => {
    const userId = await makeUser();
    await db
      .insert(topicState)
      .values({
        userId,
        teemaId: "01-arvuhulgad",
        masteryScore: 87,
        masteryTase: "kindel",
      });

    await setManualReview(userId, "01-arvuhulgad", true);

    const state = await getTopicState(userId, "01-arvuhulgad");
    expect(state?.manualReview).toBe(true);
    expect(state?.masteryScore).toBe(87);
    expect(state?.masteryTase).toBe("kindel");
  });

  it("toggling back off updates the same row rather than creating a new one", async () => {
    const userId = await makeUser();
    await setManualReview(userId, "01-arvuhulgad", true);
    await setManualReview(userId, "01-arvuhulgad", false);

    const state = await getTopicState(userId, "01-arvuhulgad");
    expect(state?.manualReview).toBe(false);
  });
});
