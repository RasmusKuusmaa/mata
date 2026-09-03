# Lai matemaatika

Riigieksami ettevalmistusplatvorm laia matemaatika kursusele (eksam 2027).
Next.js 15 (App Router), TypeScript (strict), Tailwind CSS, Drizzle ORM over
Postgres. All user-facing text is Estonian; code, comments, commits, and this
file are English. See `todo.md` for the full ship-by-ship plan this project
follows and `docs/FEATURES.md` for ambitious ideas beyond it.

## Setup

Requires Node 22 (see `.nvmrc`) and a local Postgres.

```bash
nvm use              # or install Node 22 some other way
npm install
cp .env.example .env # fill in DATABASE_URL if it isn't already Docker's default
docker compose up -d # starts local Postgres on 5432
npm run db:migrate   # applies drizzle/*.sql
npm run dev
```

`npm run dev` and `npm run build` both first run `npm run generate:registry`
(see "The generator registry" below) via `predev`/`prebuild` hooks — you
don't need to run it by hand in normal use.

Useful scripts (see `package.json` for the full list):

- `npm run check` — typecheck (`tsc --noEmit`), lint, and the full test
  suite. Run this before every commit; CI runs the same command.
- `npm run coverage:content` — prints a per-course table of how many topics
  have an explanation and full generator coverage. The project's progress
  meter.
- `npm run db:seed` — populates the local database with a demo user and
  weeks of realistic attempt history, useful for building screens against
  something that looks real.

## Project shape

- `src/content/<aine>/` — the curriculum itself, as plain TypeScript data:
  course lists (`kursused.ts`), topic trees (`teemad/kursus-NN.ts`), and
  worked explanations (`selgitused/kursus-NN.ts`). No file under
  `src/content` imports from `src/app`, so content stays extractable to a
  separate package later. **The database holds only user data — never
  curriculum content.**
- `src/generators/<aine>/kursus-NN/` — one file per topic, each exporting a
  `generaatorid: Generaator[]` array (see "Adding a generator" below).
  Auto-discovered at `predev`/`prebuild`/`pretest` time — dropping a file
  here registers it, no central list to edit.
- `src/lib/` — everything else server-side: the answer checker, mastery
  model, spaced-repetition scheduler, gamification (XP/streaks/levels/
  achievements), the friends/social layer, auth, database schema and
  queries.
- `src/app/` — routes. Server actions strip `vastus`/`lahendus` from every
  question before it reaches the client (see `src/lib/practice/session.ts`)
  — a generated question's answer and worked solution never reach the
  browser before submission. This is enforced by a test, not just
  convention.
- `src/components/` — shared UI, notably `<Math>`/`<MathBlock>`
  (server-rendered KaTeX with an Estonian macro set: `\tg`, `\ctg`,
  `\arctg`) and `<Selgitus>` (renders an explanation's Intuitsioon/
  Definitsioon/Näide/Tüüpvead/Valemid sections).

## Content-authoring workflow

Authoring one topic end to end means writing three things, using an
existing course as the concrete template — `src/content/lai-matemaatika/
selgitused/kursus-13.ts` and `src/generators/lai-matemaatika/kursus-13/` are
a good, complete example to copy the shape of:

1. **The topic itself**, in `src/content/lai-matemaatika/teemad/kursus-NN.ts`
   — id, `opitulemused` (copied verbatim from the ainekava), `eeldused`
   (prerequisite topic ids), `allikas` (which curriculum(s) it's from), and
   `eksamiKate` (keyed by exam year, from `docs/eristuskiri-2027.md`'s
   exclusion list — a topic excluded from one year's exam stays in the tree
   fully authored, it just renders an "ei käsitleta" badge and sorts last).
2. **The explanation**, in `src/content/lai-matemaatika/selgitused/
   kursus-NN.ts` — a `SelgitusProps` object per topic id (`definitsioon`,
   `naide`, and optionally `intuitsioon`/`tuupvead`/`valemid`), written as
   markdown with inline `<Math>{"..."}</Math>` / `<MathBlock>{"..."}</MathBlock>`
   for KaTeX. No bare `$...$` delimiters. Register it by re-exporting from
   `selgitused/index.ts`.
3. **At least three generators per difficulty** (`kerge`/`keskmine`/
   `raske`), in `src/generators/lai-matemaatika/kursus-NN/<topic>.ts` — see
   "Adding a generator" below.

Then remove the topic's id from `TODO_ALLOWLIST` in
`src/content/__tests__/coverage.test.ts` (this is the coverage gate — it
fails the build if any non-allowlisted topic is missing an explanation,
full generator coverage, or has a dangling prerequisite/empty
`opitulemused`) and run `npm run coverage:content` to see the number move.

## Adding a generator

A generator is a plain object matching `Generaator` (`src/generators/
types.ts`):

```ts
{
  aine: "lai-matemaatika",
  teemaId: "13-kera",
  raskus: "kerge", // | "keskmine" | "raske"
  genereeri: (rng) => ({
    seed: 1,
    kysimus: `...`,       // LaTeX, no answer or solution leaked
    vastus: { tuup: "arv", ... }, // or "tapne" | "valik" | "hulk" — see Vastus
    lahendus: ["...", "..."],     // full worked solution, one string per step
    vihje: "...",                 // optional
  }),
}
```

`genereeri` must be deterministic in `rng` — the same seed always produces
the same question — and its output must be "nice": an integer, a fraction
with denominator ≤ 12, or an exact form like `k√n`/`kπ`. This is enforced
by a 500-seed niceness harness (`src/generators/__tests__/niceness.test.ts`)
run against every registered generator: it asserts the answer passes
`isNice()`, no `NaN`/`Infinity`/`undefined`/raw `-0`/raw decimal point
shows up anywhere, every KaTeX string actually parses, multiple-choice
distractors are unique and none accidentally correct, and identical seeds
produce identical output.

`src/generators/nice.ts` is the toolkit for staying inside those rules —
`PYTHAGOREAN_TRIPLES`/`NICE_TRIG_TRIPLES`, `factorableQuadratic()`,
`niceTriangle()`, `reduceFraction()`, and critically
`redrawUntilNice(fn, rng, maxAttempts)`, which re-samples until `fn`
returns a non-null "nice" candidate and **throws loudly** rather than ever
emitting an ugly number. Reach for this instead of hoping a draw happens to
come out clean. A few recurring traps worth knowing before writing a new
generator (all previously hit and fixed — see `git log` for the actual
bugs): a fraction whose denominator is the raw product of two independently
drawn numbers is not automatically nice even if each factor looks small;
building a term like `x - a` by string-concatenating a possibly
negative-or-zero `a` needs a sign-aware formatter or you'll emit `x--3` or
`x-0`; and most Pythagorean triples other than 3-4-5 (and its scalings)
give trig ratios that don't reduce to a denominator ≤ 12.

## The generator registry

`src/generators/registry.ts` discovers every generator via a filesystem
scan of `src/generators/<aine>/kursus-NN/` — but that scan uses Node's
`fs`/`path`/`url`, so it only works when actually running under Node
(scripts, tests, server actions). Next.js's bundler can't trace a raw
filesystem scan, and webpack fails outright if anything reachable from a
**client** component ends up importing `registry.ts` (directly or
transitively) — it's happened twice in this project's history, once for
the whole practice flow (fixed by generating a static import index) and
once for the exam mode (fixed by splitting a client-needed constants file
out of a server-only module). `scripts/generate-registry-index.ts` runs
before dev/build/test and writes `src/generators/generated-index.ts`, a
plain static import list Next's bundler can actually trace — this is what
production code should end up depending on transitively. If you add a
new file that a client component needs a *type* or *plain constant* from,
and that file also (even indirectly) imports `registry.ts`, split the
client-safe pieces into their own module rather than importing the mixed
file directly — `src/lib/eksam/constants.ts` next to `src/lib/eksam/
session.ts` is a worked example of the split.

## Extension points

These were designed in from Ship 0 so they're additive, not migrations:

- **A new subject** (e.g. `kitsas-matemaatika`, `füüsika`): extend the
  `Aine` union in `src/content/types.ts`, add a `src/content/<aine>/`
  content tree and a `src/generators/<aine>/kursus-NN/` generator tree in
  the same shape as `lai-matemaatika`'s. Routes are already parameterized
  as `/[aine]/teemad/...` / `/[aine]/harjuta/...`.
- **A new curriculum source**: extend the `allikas` union
  (`'rok2011' | 'rok2023'`) on `Teema`.
- **A new exam year's coverage**: `eksamiKate` is `Record<number, boolean>`
  — add a new year's key across the topic tree from that year's
  eristuskiri; never delete a topic for a year that excludes it.
- **A new answer type**: `Vastus` is a discriminated union
  (`src/generators/types.ts`) — add a new `tuup` member and a matching
  branch in `src/lib/answer/check.ts`'s checker; existing generators and
  branches are untouched.
- **A second locale**: all user-facing copy already goes through `t()`
  against a flat catalogue (`src/lib/i18n/et.ts`), enforced by a lint rule
  against inline strings in `src/app`/`src/components` — a second
  catalogue file plus locale resolution is additive, not a rewrite.
