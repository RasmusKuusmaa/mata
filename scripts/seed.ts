/**
 * Development seed data (Ship 3.2): a demo account with several weeks of
 * realistic attempt history, so screens built against real users (progress,
 * calendar, statistics, gamification) have something real-looking to render
 * against before any human has actually used the app. Idempotent — deletes
 * the demo user's previous rows first, so re-running always produces the
 * same shape of data. Dev-only; never run against production.
 */
import { eq } from "drizzle-orm";
import { teemad } from "@/content/lai-matemaatika/teemad";
import { db } from "@/lib/db/client";
import {
  attempts,
  dailyStats,
  goals,
  notes,
  topicState,
  userStats,
  users,
} from "@/lib/db/schema";
import { mulberry32 } from "@/generators/rng";

const DEMO_USER_ID = "00000000-0000-0000-0000-000000000001";
const DEMO_EMAIL = "demo@lai-matemaatika.ee";
const DAYS = 28;

const RASKUSED = ["kerge", "keskmine", "raske"] as const;

/** A spread of topics across different courses, so the demo account looks
 * like it's genuinely working through the curriculum rather than drilling
 * one topic. */
const DEMO_TEEMA_IDS = [
  "01-arvuhulgad",
  "01-protsentulesanded",
  "02-lineaarvorrand",
  "02-ruutvorrand",
  "03-ruutvorratus",
  "05-vektori-moiste-ja-liigid",
  "05-sirge-uldvorrand",
  "06-klassikaline-toenaosus",
  "07-funktsiooni-moiste-ja-uldtahis",
  "08-arvu-logaritm",
].filter((id) => teemad.some((t) => t.id === id));

function dateNDaysAgo(n: number): Date {
  const d = new Date();
  d.setUTCHours(12, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - n);
  return d;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function clearDemoUser(): Promise<void> {
  await db.delete(attempts).where(eq(attempts.userId, DEMO_USER_ID));
  await db.delete(dailyStats).where(eq(dailyStats.userId, DEMO_USER_ID));
  await db.delete(topicState).where(eq(topicState.userId, DEMO_USER_ID));
  await db.delete(notes).where(eq(notes.userId, DEMO_USER_ID));
  await db.delete(goals).where(eq(goals.userId, DEMO_USER_ID));
  await db.delete(userStats).where(eq(userStats.userId, DEMO_USER_ID));
  await db.delete(users).where(eq(users.id, DEMO_USER_ID));
}

async function seed(): Promise<void> {
  const rng = mulberry32(20260904);

  await clearDemoUser();

  await db.insert(users).values({
    id: DEMO_USER_ID,
    name: "Demo Õpilane",
    email: DEMO_EMAIL,
    emailVerified: new Date(),
  });

  const masteryByTeema = new Map<string, { correct: number; total: number }>();
  let xp = 0;
  let streak = 0;
  let longestStreak = 0;

  for (let daysAgo = DAYS - 1; daysAgo >= 0; daysAgo--) {
    const day = dateNDaysAgo(daysAgo);
    // A rest day roughly one day in five, except never on the most recent
    // two days, so the streak counter has something to show right now.
    const isRestDay = daysAgo > 1 && rng() < 0.2;
    if (isRestDay) {
      streak = 0;
      continue;
    }

    const kysimusi = 4 + Math.floor(rng() * 12);
    // Accuracy trends upward over the seed window, like a learner actually
    // improving, plus per-day noise.
    const progress = 1 - daysAgo / DAYS;
    const baseAccuracy = 0.5 + progress * 0.35;

    let oigeid = 0;
    let sekundeid = 0;

    for (let i = 0; i < kysimusi; i++) {
      const teemaId =
        DEMO_TEEMA_IDS[Math.floor(rng() * DEMO_TEEMA_IDS.length)];
      const raskus = RASKUSED[Math.floor(rng() * RASKUSED.length)];
      const oige = rng() < baseAccuracy;
      const kestusSekundeid = 20 + Math.floor(rng() * 90);

      const createdAt = new Date(day);
      createdAt.setUTCMinutes(createdAt.getUTCMinutes() + i * 7);

      await db.insert(attempts).values({
        userId: DEMO_USER_ID,
        teemaId,
        raskus,
        oige,
        createdAt,
      });

      if (oige) oigeid++;
      sekundeid += kestusSekundeid;

      const prev = masteryByTeema.get(teemaId) ?? { correct: 0, total: 0 };
      masteryByTeema.set(teemaId, {
        correct: prev.correct + (oige ? 1 : 0),
        total: prev.total + 1,
      });
    }

    const dayXp = oigeid * 10 + (kysimusi - oigeid) * 2;
    xp += dayXp;
    streak += 1;
    longestStreak = Math.max(longestStreak, streak);

    await db.insert(dailyStats).values({
      userId: DEMO_USER_ID,
      date: isoDate(day),
      kysimusi,
      oigeid,
      sekundeid,
      xp: dayXp,
    });
  }

  for (const [teemaId, { correct, total }] of masteryByTeema) {
    const skoor = Math.round((correct / total) * 100);
    const tase =
      skoor < 25 ? "algaja" : skoor < 50 ? "edeneb" : skoor < 80 ? "hea" : "kindel";
    await db.insert(topicState).values({
      userId: DEMO_USER_ID,
      teemaId,
      masteryScore: skoor,
      masteryTase: tase,
      manualReview: skoor < 50,
      lastSeenAt: dateNDaysAgo(0),
      nextReviewAt: dateNDaysAgo(-2),
      intervalDays: 2,
    });
  }

  await db.insert(userStats).values({
    userId: DEMO_USER_ID,
    xp,
    streakCurrent: streak,
    streakLongest: longestStreak,
    streakFreezesLeft: 1,
    lastActiveDate: isoDate(dateNDaysAgo(0)),
  });

  await db.insert(goals).values({
    userId: DEMO_USER_ID,
    tuup: "kysimusi",
    siht: 15,
  });

  console.log(
    `seeded demo user ${DEMO_EMAIL}: ${DAYS} days, ${masteryByTeema.size} topics touched, ${xp} xp, streak ${streak}`,
  );
}

seed()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
