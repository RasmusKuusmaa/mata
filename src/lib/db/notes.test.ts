import { describe, expect, it } from "vitest";
import { db } from "./client";
import { getAllNotes, getNote, saveNote } from "./notes";
import { users } from "./schema";

async function makeUser(): Promise<string> {
  const id = crypto.randomUUID();
  await db.insert(users).values({ id, email: `${id}@example.com` });
  return id;
}

describe("notes", () => {
  it("returns null for a topic with no note", async () => {
    const userId = await makeUser();
    expect(await getNote(userId, "01-arvuhulgad")).toBeNull();
  });

  it("creates a note on first save", async () => {
    const userId = await makeUser();
    await saveNote(userId, "01-arvuhulgad", "# Märkmed");

    const note = await getNote(userId, "01-arvuhulgad");
    expect(note?.sisu).toBe("# Märkmed");
  });

  it("updates the same row on a later save rather than creating a second one", async () => {
    const userId = await makeUser();
    await saveNote(userId, "01-arvuhulgad", "esimene versioon");
    await saveNote(userId, "01-arvuhulgad", "teine versioon");

    const note = await getNote(userId, "01-arvuhulgad");
    expect(note?.sisu).toBe("teine versioon");

    const all = await getAllNotes(userId);
    expect(all).toHaveLength(1);
  });

  it("keeps notes for different topics separate", async () => {
    const userId = await makeUser();
    await saveNote(userId, "01-arvuhulgad", "esimene teema");
    await saveNote(userId, "02-lineaarvorrand", "teine teema");

    const all = await getAllNotes(userId);
    expect(all).toHaveLength(2);
  });
});
