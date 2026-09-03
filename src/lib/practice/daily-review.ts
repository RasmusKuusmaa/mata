import { getAllTopicStates } from "@/lib/db/topic-state";
import { rankWeakestTopics } from "@/lib/analytics/weakest";
import { alustaKohandatudSeeria } from "./session";
import type { Seeria } from "./session";

const KORDAMISE_SUURUS = 8;

/**
 * "Tänane kordamine" (todo.md Ship 4.2): a mixed set drawn from the user's
 * weakest touched topics (`rankWeakestTopics`, Ship 3.8), reusing the same
 * mixed-topic engine as the custom test builder. There's no real spaced-
 * repetition scheduler yet (todo.md Ship 4.1 — `topic_state.nextReviewAt`
 * is declared in the schema but nothing writes to it), so "due" is
 * approximated by "weakest" rather than a true SM-2 due date; revisit this
 * once Ship 4.1 lands a real scheduler. Returns `null` for a user with no
 * touched topics yet — there is nothing to review before there's history.
 */
export async function koostaTanaseKordamise(
  userId: string,
  limit: number = KORDAMISE_SUURUS,
): Promise<Seeria | null> {
  const seisud = await getAllTopicStates(userId);
  if (seisud.length === 0) return null;

  const nork = rankWeakestTopics(
    seisud.map((seis) => ({
      teemaId: seis.teemaId,
      masteryScore: seis.masteryScore,
      masteryTase: seis.masteryTase as import("@/lib/mastery/types").MasteriaTase,
      manualReview: seis.manualReview,
      lastSeenAt: seis.lastSeenAt,
    })),
  );

  const valikud = nork
    .slice(0, limit)
    .map((teema) => ({ teemaId: teema.teemaId, raskus: "keskmine" as const }));

  return alustaKohandatudSeeria(valikud, limit);
}
