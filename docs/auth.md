# Authentication (Ship 3.3)

Auth.js (`next-auth@5`) with the Drizzle adapter, storing sessions in
Postgres (`session: { strategy: "database" }`) against the
`users`/`accounts`/`sessions`/`verification_tokens` tables in
`src/lib/db/schema.ts`. Config lives in `src/lib/auth/config.ts`, mounted at
`/api/auth/[...nextauth]`.

## Providers are opt-in per environment

Neither provider is configured in this environment (no Google OAuth client,
no SMTP/email-sending account) — the same situation as Ship 1.10's
Vercel/Neon blocker. `configuredProviders()` in `src/lib/auth/config.ts`
registers a provider only when its env vars are all present, so a fresh
clone, CI, and this dev environment all stay green with **zero** providers
configured rather than crashing at import time. Signing in is unreachable
until at least one provider is configured — the sign-in page itself is a
follow-up (see QUESTIONS.md).

## Environment variables

All documented in `.env.example`:

- `AUTH_SECRET` — required once any provider is configured.
  `openssl rand -base64 32`.
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — Google OAuth client, from the
  Google Cloud Console (APIs & Services → Credentials → OAuth client ID,
  type "Web application", authorized redirect URI
  `<origin>/api/auth/callback/google`).
- `EMAIL_SERVER` — an SMTP connection string
  (`smtp://user:pass@host:port`) for the magic-link provider.
- `EMAIL_FROM` — the "from" address magic-link emails are sent as.

## Setting these up for real (manual, needs Rasmus)

1. Create the Google OAuth client (above), set `AUTH_GOOGLE_ID`/
   `AUTH_GOOGLE_SECRET`.
2. Pick an SMTP provider (e.g. Resend's SMTP endpoint, Postmark, or a
   Google Workspace account) and set `EMAIL_SERVER`/`EMAIL_FROM`.
3. Generate and set `AUTH_SECRET`.
4. Redeploy — both sign-in options appear automatically once their
   variables exist; nothing else in the code needs to change.
