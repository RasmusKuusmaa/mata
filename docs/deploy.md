# Deploying (Vercel + Neon)

Ship 1.10. Production runs on Vercel with a Neon Postgres database.

## One-time setup

1. **Neon**: create a project at neon.tech. Copy its pooled connection
   string (the one ending `?sslmode=require`) — that's `DATABASE_URL`.
2. **Vercel**: import this repository as a new project. Vercel
   auto-detects Next.js; no build command override is needed — it already
   prefers the `vercel-build` script over `build` (see `package.json`),
   which runs the Drizzle migrations against `DATABASE_URL` before
   building, so the schema is always current for the code being deployed.
3. Set these environment variables in the Vercel project (Production,
   Preview, and Development as appropriate) — see `.env.example` for the
   full list and what generates each value:
   - `DATABASE_URL` — the Neon connection string from step 1.
   - `GUEST_COOKIE_SECRET` — `openssl rand -base64 32`. Required in
     production; there is a dev-only fallback everywhere else.
4. Push to the connected branch. Vercel builds and deploys automatically.

## Migrations on every deploy

`vercel-build` (`drizzle-kit migrate && next build`) means every deploy
applies any new migration in `drizzle/` before serving the new code — the
same command CI runs (`.github/workflows/ci.yml`) against its ephemeral
Postgres service before `check`/`build`, so a migration that breaks the
build fails CI first, not production.

## Local parity

`docker-compose.yml` runs the same Postgres major version locally. See the
root `README.md` for the local dev loop.
