import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * One row per anonymous guest cookie (Ship 1.7). `id` is the guest id
 * carried (signed) in the cookie — never the raw signed cookie value
 * itself. Ship 3.4 merges these rows into a real account on first sign-in
 * rather than migrating the schema.
 */
export const guestSessions = pgTable("guest_sessions", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/**
 * Real accounts (Ship 3.1). `id` doubles as the Auth.js user id — the
 * `users`/`accounts`/`sessions`/`verification_tokens` shape below matches
 * what `@auth/drizzle-adapter` expects verbatim so Auth.js can drive it
 * directly (Ship 3.3).
 */
export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (table) => [
    primaryKey({ columns: [table.provider, table.providerAccountId] }),
  ],
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { withTimezone: true }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.identifier, table.token] })],
);

/** One answered question. `userId` is set once a guest's history is merged
 * into a real account (Ship 3.4); `guestSessionId` stays populated
 * (historical record) even after that merge. */
export const attempts = pgTable(
  "attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    guestSessionId: text("guest_session_id").references(
      () => guestSessions.id,
    ),
    userId: text("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    teemaId: text("teema_id").notNull(),
    raskus: text("raskus").notNull(),
    oige: boolean("oige").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("attempts_user_created_idx").on(table.userId, table.createdAt),
    index("attempts_user_teema_idx").on(table.userId, table.teemaId),
  ],
);

/**
 * Per-user, per-topic rollup (Ship 3.1). `masteryScore`/`masteryTase` are the
 * `MasteryModel` output cached for fast reads; `manualReview` is the user's
 * own "vajab kordamist" flag and is a **separate axis** from mastery (Ship
 * 3.6) — never derived from it. `nextReviewAt`/`intervalDays` back the
 * `ReviewScheduler` (Ship 4.1).
 */
export const topicState = pgTable(
  "topic_state",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    teemaId: text("teema_id").notNull(),
    masteryScore: integer("mastery_score").notNull().default(0),
    masteryTase: text("mastery_tase").notNull().default("alustamata"),
    manualReview: boolean("manual_review").notNull().default(false),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
    nextReviewAt: timestamp("next_review_at", { withTimezone: true }),
    intervalDays: integer("interval_days").notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.userId, table.teemaId] })],
);

/** Per-topic notes (Ship 3.10), markdown with KaTeX preview. */
export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  teemaId: text("teema_id").notNull(),
  sisu: text("sisu").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** One row per user per calendar day (Ship 4.3/4.4) — the journal and
 * calendar are both read from this rather than re-aggregating `attempts`
 * on every request. Written incrementally as attempts come in. */
export const dailyStats = pgTable(
  "daily_stats",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: text("date").notNull(),
    kysimusi: integer("kysimusi").notNull().default(0),
    oigeid: integer("oigeid").notNull().default(0),
    sekundeid: integer("sekundeid").notNull().default(0),
    xp: integer("xp").notNull().default(0),
    peegeldus: text("peegeldus"),
  },
  (table) => [primaryKey({ columns: [table.userId, table.date] })],
);

/** Configurable daily goal (Ship 4.8) — questions or minutes. */
export const goals = pgTable("goals", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  tuup: text("tuup").notNull().default("kysimusi"),
  siht: integer("siht").notNull().default(15),
});

/** Cumulative gamification state (Ship 4.8/4.9/4.10): XP total, level,
 * current/longest daily streak, and how many weekly streak-freezes are
 * still available this week. */
export const userStats = pgTable("user_stats", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  xp: integer("xp").notNull().default(0),
  streakCurrent: integer("streak_current").notNull().default(0),
  streakLongest: integer("streak_longest").notNull().default(0),
  streakFreezesLeft: integer("streak_freezes_left").notNull().default(1),
  lastActiveDate: text("last_active_date"),
  eksamiKuupaev: text("eksami_kuupaev"),
});

/** Achievements earned (Ship 4.10). The catalogue itself (id → Estonian
 * name/description/criteria) lives in code, not the database — this table
 * only records which ids a user has unlocked and when. */
export const userAchievements = pgTable(
  "user_achievements",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    achievementId: text("achievement_id").notNull(),
    unlockedAt: timestamp("unlocked_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.achievementId] })],
);

/**
 * Mutual-follow friend links (base-version gamification, added alongside
 * Ship 4 at Rasmus's request — see QUESTIONS.md's 2026-09-04 entry). A row
 * is created `pending` by the requester and flips to `accepted` when the
 * other side accepts; comparisons ("kaaslased" progress/streak view) only
 * ever surface `accepted` pairs the user explicitly added — never a public
 * or global ranking.
 */
export const friendships = pgTable(
  "friendships",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    friendId: text("friend_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: text("status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.friendId] })],
);

/** A completed or in-progress timed mock exam (Ship 5.2/5.3). `vastused`
 * holds per-question seed + submitted answer so a run can be resumed or
 * reviewed without re-deriving it from `attempts`. */
export const examRuns = pgTable("exam_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  startedAt: timestamp("started_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
  osa: integer("osa").notNull().default(1),
  vastused: text("vastused").notNull().default("[]"),
  punktid: real("punktid"),
});
