import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import NextAuth, { type DefaultSession } from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db/client";
import { mergeGuestIntoUser } from "@/lib/db/guest-merge";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/lib/db/schema";
import { GUEST_COOKIE_NAME, verifyGuestCookie } from "@/lib/session/guest";

/** True only when Playwright's own `webServer` sets it (see
 * `playwright.config.ts`) — never in production or an ordinary dev
 * session. Gates a passwordless "sign in as this email" provider that
 * exists purely so Ship 6.5's e2e suite can exercise account-gated
 * features (notes, the review flag) without real Google/email
 * credentials, which this project has never had (see `docs/auth.md`). */
function e2eAuthEnabled(): boolean {
  return process.env.E2E_TEST_AUTH === "1";
}

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & { id: string };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
  }
}

/**
 * Real credentials aren't available in this environment (no Google OAuth
 * client, no SMTP/email-sending provider) — same situation as Ship 1.10's
 * Vercel/Neon blocker (see QUESTIONS.md). Each provider only registers
 * itself when its env vars are present, so a fresh clone or CI stays green
 * with zero configured providers rather than crashing at import time. See
 * `docs/auth.md` for every variable this reads.
 */
function configuredProviders(): Provider[] {
  const providers: Provider[] = [];

  if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
    providers.push(
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
    );
  }

  if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
    providers.push(
      Nodemailer({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
      }),
    );
  }

  if (e2eAuthEnabled()) {
    providers.push(
      Credentials({
        id: "e2e-test",
        credentials: { email: { type: "email" } },
        async authorize(credentials) {
          const email = credentials?.email;
          if (typeof email !== "string" || !email) return null;
          const existing = await db
            .select()
            .from(users)
            .where(eq(users.email, email));
          if (existing[0]) return existing[0];
          const [created] = await db
            .insert(users)
            .values({ email })
            .returning();
          return created;
        },
      }),
    );
  }

  return providers;
}

/** Which providers are actually configured right now — read once here and
 * reused by both the NextAuth setup below and the sign-in page, so the two
 * never drift out of sync on what counts as "configured". */
export function konfigureeritudPakkujad(): {
  google: boolean;
  email: boolean;
  test: boolean;
} {
  return {
    google: Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET),
    email: Boolean(process.env.EMAIL_SERVER && process.env.EMAIL_FROM),
    test: e2eAuthEnabled(),
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: configuredProviders(),
  // Auth.js requires the JWT strategy for a Credentials provider (confirmed
  // directly — the database strategy throws `UnsupportedStrategy` at
  // request time, not just at startup). Only e2e's own test-only provider
  // needs this, so the switch is scoped to the same flag and never changes
  // production/ordinary-dev behavior (database strategy, unchanged).
  session: { strategy: e2eAuthEnabled() ? "jwt" : "database" },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  events: {
    // Ship 3.4: every sign-in (not just the very first) transfers whatever
    // the current guest cookie owns onto the account — `mergeGuestIntoUser`
    // is idempotent (a guest id already merged, or never used, updates zero
    // rows), so there's no need to track "is this actually the first one".
    // This event exists precisely because nothing was calling this
    // otherwise-tested function — caught via Ship 6.5's e2e suite.
    async signIn({ user }) {
      if (!user.id) return;
      const store = await cookies();
      const guestId = await verifyGuestCookie(
        store.get(GUEST_COOKIE_NAME)?.value,
      );
      if (guestId) await mergeGuestIntoUser(guestId, user.id);
    },
  },
  callbacks: {
    // `user` is populated under the database strategy (from the adapter);
    // `token` is populated under the JWT strategy (e2e only) — id needs to
    // survive into `session` either way, since every call site that scopes
    // a query to "this user" needs it.
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, user, token }) {
      session.user.id = user?.id ?? (token.id as string);
      return session;
    },
  },
});
