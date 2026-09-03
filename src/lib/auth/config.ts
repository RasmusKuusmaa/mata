import NextAuth, { type DefaultSession } from "next-auth";
import type { Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db/client";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/lib/db/schema";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & { id: string };
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

  return providers;
}

/** Which providers are actually configured right now — read once here and
 * reused by both the NextAuth setup below and the sign-in page, so the two
 * never drift out of sync on what counts as "configured". */
export function konfigureeritudPakkujad(): { google: boolean; email: boolean } {
  return {
    google: Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET),
    email: Boolean(process.env.EMAIL_SERVER && process.env.EMAIL_FROM),
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
  session: { strategy: "database" },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  callbacks: {
    // Database session strategy only exposes name/email/image by default —
    // every call site that needs to scope a query to "this user" needs the
    // id too.
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
