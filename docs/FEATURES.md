# Feature brainstorm — the perfect study tool for students weak in math

Written 2026-09-04, after finishing the core `todo.md` plan (or getting far
enough into it that continuing to build ahead of it stops making sense).
Audience for this document: a future me, deciding what to build next on the
`feature/ambitious-additions` branch. Everything here is optional and
additive — none of it changes the non-negotiables in `todo.md` (server-side
answer generation, worked solutions, nice numbers, Estonian-only UI, one
subject-namespace-per-topic architecture).

The lens for every idea below: **this platform is for people who find math
hard**, not for people who already like it. That means the winning feature
is usually the one that reduces anxiety, shortens the gap between "stuck"
and "helped", and makes coming back tomorrow feel easy rather than
effortful — not the one that's most technically impressive.

Organized by theme, roughly in priority order within each theme (highest
value / lowest cost first). A `[base]` tag marks something that arguably
belongs in the base version rather than the ambitious branch — most
gamification is already tagged that way per Rasmus's explicit instruction.

## 1. Reducing the "I'm stuck and don't know why" moment

This is the single biggest lever for someone weak in math — the gap between
a wrong answer and understanding *why* it's wrong.

- **Step-by-step reveal instead of all-at-once solutions.** Instead of
  dumping the full `lahendus` array at once, let the learner reveal one step
  at a time, each with a "does this make sense so far?" micro-check. Much
  less overwhelming than a wall of LaTeX.
- **Mistake classification.** When an answer is wrong, diff the submitted
  value against the correct one and known common-error patterns (sign
  error, forgot to distribute, swapped numerator/denominator, off-by-a-unit
  in degrees vs radians, etc.) and name the likely mistake instead of just
  "vale". This is enormously more useful to a struggling student than a
  bare correct/incorrect.
- **"Explain differently" button.** A second, differently-worded
  explanation for the same concept (more concrete/numeric vs more abstract)
  when the first `Selgitus` didn't click. Pre-authored per topic, not
  AI-generated at runtime, to keep the no-server-side-surprises guarantee.
- **Worked-example-first mode.** For a learner at `alustamata`/`algaja`
  mastery, default to showing one fully-worked example *before* the first
  question in a session rather than after a wrong answer — reduces the
  "thrown in the deep end" feeling.
- **Undo/retry without penalty.** Let a learner immediately retry the exact
  same question (regenerate isn't the point — literally the same numbers)
  once, before moving to a fresh one, so a careless slip doesn't feel like a
  failure baked into their stats.
- **"Show me one step" instead of full hint.** Split `vihje` into
  progressive layers (nudge → partial step → full first step) rather than
  one hint blob.

## 2. Adaptive difficulty and personalized paths

- **Per-session adaptive difficulty.** If a learner nails three `kerge` in a
  row, quietly offer `keskmine` next; three wrong at any level, drop down.
  Never punitive framing ("Proovime kergemalt" not "Sa ebaõnnestusid").
- **A real "path" mode**: instead of the learner picking topics, a generated
  daily plan that sequences prerequisite → topic → review in the order that
  clears the most blockers fastest, given their current mastery map.
  Effectively a recommender on top of the existing prerequisite graph.
- **Diagnostic placement test.** A short, adaptive test a brand-new user can
  take that seeds their mastery map immediately, instead of starting every
  topic at `alustamata`. Huge for someone who already knows some of this and
  finds "start from zero" demoralizing.
- **Confidence rating alongside the answer.** Optional "how sure were you?"
  before seeing correctness — lets mastery weighting distinguish a lucky
  guess from real understanding, and is itself a known-good metacognition
  technique for weak learners.

## 3. Practice test generation (this is what Rasmus explicitly asked for)

The engine (`alustaKohandatudSeeria`) already supports mixing topics —
build the full experience around it:

- **Custom test builder** (`/koosta-test` or similar): pick courses,
  topics, difficulty mix, question count, timed or untimed. [base — this is
  literally the requested feature]
- **"Nagu eksamil" quick mode**: one tap, no configuration, generates a
  test matching the real exam's topic/difficulty distribution over
  `eksamiKate[2027]`-covered topics only. The zero-effort path for someone
  who doesn't want to think about what to configure.
- **Weak-topics test**: one tap, pulls from the weakest-topic engine
  (`src/lib/analytics/weakest.ts`) automatically — "harjuta nõrku kohti"
  everywhere the idea of "just tell me what to do" applies.
- **Printable/PDF export of a generated test.** Some learners study away
  from a screen, or a parent/tutor wants a paper copy. Render question set
  (no answers) plus a separate answer key as print-friendly HTML → PDF.
- **Shareable test links.** A generated test's seed sequence is
  deterministic — a share link that re-derives the *same* question set lets
  a study-group or teacher assign "everyone do this exact set" without a
  backend needed beyond the existing token mechanism.
- **Retake with same topics, fresh numbers.** One click to regenerate an
  equivalent test (same topic/difficulty mix, new seeds) once you've done
  a set once, for spaced re-practice of a whole exam-shaped set.

## 4. Gamification — base version (per Rasmus's explicit instruction)

Schema for all of this already exists (`user_stats`, `user_achievements`,
`friendships`). `[base]` on all of these.

- **[base] Streaks with a weekly freeze** (todo.md 4.9, already planned).
- **[base] XP and levels** (todo.md 4.8/4.10, already planned).
- **[base] Achievements tied to mastery/coverage, not volume** (todo.md
  4.10, already planned) — extend the catalogue with more granular ones:
  first `kindel` topic in each of the 14 courses, "eeldused cleared" per
  course, a "comeback" achievement for returning after a broken streak
  (celebrates resilience, not just consistency — important for someone who
  will inevitably miss days).
- **[base] Friends** (new, added per instruction) — mutual opt-in, never a
  public/global ranking (see `QUESTIONS.md`'s 2026-09-04 entry for why):
  - Add-friend by invite link or username.
  - A friend's current streak, weekly activity, and course-completion
    percentage (not raw XP — comparing XP invites unhealthy competition
    over volume; comparing *coverage* keeps the comparison about progress).
  - Optional "nudge" (one free-form-text-free, rate-limited "tere, jätka!"
    button) to a friend who's gone quiet — a gentle nudge system rather than
    a leaderboard-driven guilt mechanic.
  - Study groups: a named group of friends with a shared weekly goal
    (e.g. "500 questions this week as a group"), progress bar, no individual
    ranking shown inside it.
- **[base] Daily goal ring** (todo.md 4.8, already planned) with a
  streak-aware message tone: missing a day should say "eile jäi vahele,
  täna on uus võimalus", never anything that reads as scolding.
- **Seasonal/thematic challenges** (e.g. "eksami-eelne sprint" the last two
  weeks before the exam date) — time-boxed bonus XP multiplier on relevant
  topics, opt-in, disappears after.
- **A visible "mastery map"** — the 14-course tree rendered as a single
  glanceable graphic (not unlike a skill tree), color-coded by mastery band.
  Satisfying to look at as coverage grows — this is the "big win" gamified
  view of the same data the topic tree already carries.

## 5. Accountability and habit support beyond streaks

- **Optional weekly email/notification digest**: "see nädal: N küsimust,
  X% õigeid, kõige nõrgem teema oli Y" — opt-in, one-tap unsubscribe,
  never more than weekly.
- **Study session timer / Pomodoro mode** built into practice: a visible
  25-minute focus timer with a break prompt, for a learner who struggles
  with sitting down to study at all, not just with the math itself.
- **Parent/tutor view** (read-only, invite-link-based, opt-in per student):
  weekly progress summary, no access to raw answers or the ability to
  intervene — visibility without surveillance. Important to frame
  correctly: the student invites the viewer, not the other way around.
- **"Why this matters" framing per topic** — a one-line real-world hook per
  topic (e.g. tying compound interest to a savings account, derivatives to
  speed/acceleration) for learners who need motivation beyond "it's on the
  exam".

## 6. Content and pedagogy depth

- **Video/animated explanations** for the topics that benefit most from
  motion (function transformations, integral-as-area, vector addition) —
  short, silent-friendly (captioned), same server-authored-content
  guarantee (scripted, not live-generated).
- **Formula flashcards** — spaced-repetition flashcard mode specifically
  over the formula sheet (`/valemileht`, todo.md 5.1), separate from the
  question-practice SRS, since memorizing a formula and being able to apply
  it are different skills worth training separately.
- **Common-mistakes museum** — a browsable page of "vead, mida õpilased
  enim teevad" per topic, pulled from the `Tüüpvead` section already in
  `Selgitus`, made independently browsable/searchable (not just embedded in
  a topic's own explanation) so a learner can pattern-match against their
  own recurring mistake even outside that topic's page.
- **Glossary / mõistesõnastik** — every math term used across explanations,
  cross-linked, one-line plain-Estonian definition, searchable. Useful for
  a learner who understands the method but trips on the vocabulary.
- **Multiple worked examples per difficulty**, not just one, so "Näide"
  doesn't always look identical across visits to the same topic.
- **A "miks see valem nii on" mode** — optional derivations for the
  formulas currently given without derivation, for a curious learner, kept
  separate from the main explanation so it never adds friction for someone
  who just wants the formula.

## 7. Exam-mode depth (extending todo.md Ship 5)

- **Full proctoring-style mock exam calendar**: schedule a specific date/
  time for a mock exam in advance (calendar integration), building the habit
  of treating practice exams like the real thing.
- **Per-question timing analytics** in exam review — which questions ate
  disproportionate time relative to their point value, a real skill gap for
  students who are weak at pacing even when they know the material.
  - **Point-value-aware pacing coach**: live, unobtrusive during the mock
    exam ("sul on veel 40 min ja 12 küsimust jäänud" style, never anxiety-
    inducing countdown-per-question).
- **Marking-scheme-aware partial credit** on multi-step problems — mirror
  how Harno grades method vs. final answer, since an all-or-nothing check
  under-represents partial understanding and can be needlessly discouraging.

## 8. Accessibility and inclusivity (beyond todo.md 6.1's WCAG pass)

- **Dyscalculia-aware settings**: adjustable number formatting spacing,
  optional larger/monospaced digit rendering, a "read the question aloud"
  text-to-speech toggle for the `kysimus`/`selgitus` text.
- **Reduced-anxiety exam mode**: an alternate mock-exam mode with the timer
  hidden by default (toggle to reveal), for students whose exam anxiety is
  worse than their math gap.
- **Colorblind-safe mastery-band palette** verified with a real simulator,
  not just "looks fine to me".
- **Low-bandwidth / offline mode** (PWA, service worker caching of the
  topic tree, explanations, and a bundle of pre-generated questions) — not
  everyone studying for this exam has reliable home internet.

## 9. Technical / platform ambition (lower priority than the above — these
serve the product, not the other way around)

- **Multi-subject readiness exercised for real**: actually stand up a
  second `aine` (e.g. `kitsas-matemaatika`) as a smoke test of the extension
  point already designed in, even as a near-empty skeleton — proves the
  architecture rather than just asserting it.
- **A public API / export of a user's own progress data** (JSON download) —
  respects that the data is the learner's, and is a cheap trust-builder.
  - **Ukrainian locale**, actually populated (todo.md's extension point 6)
    rather than just structurally supported — the exam itself is published
    in Ukrainian, so this isn't hypothetical for at least some of the
    audience.
  - **A "report a wrong question" button** on every generated question,
    server-logging the seed/generator/seed so a mis-generated "nice number"
    edge case that slipped past the niceness harness can actually be found
    and fixed, rather than silently eroding trust in the platform.

## Not doing (explicitly, so future-me doesn't relitigate)

- **Public/global leaderboards.** Explicitly against the grain of
  `todo.md`'s "no leaderboards anywhere" and against what makes this safe
  for someone who's anxious about being bad at math — friends-only,
  opt-in comparison is the ceiling here, not a starting point to expand from.
- **Runtime AI-generated questions or explanations.** Every non-negotiable
  in `todo.md` (nice numbers, verified worked solutions, no answer leakage)
  depends on content being authored and tested ahead of time, not generated
  live by a model at request time. Anything "AI tutor"-shaped stays out of
  scope unless that constraint is revisited on purpose, with eyes open, not
  as a feature-creep afterthought.
- **Ads or any monetization mechanic.** Out of scope for what this document
  is for; not evaluating it either way here.
