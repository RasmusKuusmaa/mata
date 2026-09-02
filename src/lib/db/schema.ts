import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

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

/** One answered question, guest-owned until Ship 3 adds real accounts. */
export const attempts = pgTable("attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  guestSessionId: text("guest_session_id")
    .notNull()
    .references(() => guestSessions.id),
  teemaId: text("teema_id").notNull(),
  raskus: text("raskus").notNull(),
  oige: boolean("oige").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
