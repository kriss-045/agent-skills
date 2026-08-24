---
name: trial-review
description: "Quarterly / event-driven trial review: scores the active trial against its decisions.md criteria and recommends continue / simplify / graduate / abandon. Triggers: trial review, review the trial, graduation check, trial close-out, /trial-review. The next-due date lives in the registry cadence table."
---

# Trial Review — graduation/abandonment decision

Runs at the end of an active trial. Reads the trial's criteria (from `state/decisions.md`), scores current state against them, and produces a recommendation: continue / simplify / graduate / abandon.

## CRITICAL — invoke this skill immediately on trigger

When Kriss says "trial review" / "graduation check" / "/trial-review" → INVOKE THIS SKILL VIA THE Skill TOOL. Don't paraphrase in chat. Hook B3 verifies this preamble; missing it = drift event per rule SF2.

## Hard rules

1. **Read the active trial from decisions.md before scoring.** Don't assume the criteria from memory — they may have been superseded (the 2026-05-22 entry was superseded 2026-05-30; current active trial is the build-week tracked in BUILD-LOG.md).
2. **Read-only.** This skill never modifies the trial criteria, rules.md, skills, or any state file outside its own LOG entry. It PROPOSES; Kriss decides.
3. **No filler openers.** Lead with the trial-review heading + date range.
4. **Source-grounded.** Every claim about whether a criterion is met must cite the actual file:line evidence. "Looks like it's working" is not a finding.

## The 5 steps

### Step 1 — Identify the active trial

Read `state/decisions.md`. Find entries matching:
- Title contains "trial" (case-insensitive)
- Status NOT marked "SUPERSEDED"
- Has explicit criteria + review date

If multiple active trials exist → ask Kriss which to review.
If zero active trials → surface "No active trial in decisions.md. Nothing to review. Latest trial: <SUPERSEDED entry headline if any>."

**Current active trial (as of 2026-06-01):** "2026-06-01 — Trial: 1-week real-use of Claude OS v3" (window 2026-06-01 → 2026-06-08, review on 2026-06-08). The 2026-05-30 build-week trial closed 2026-05-31 GRADUATE. The 2026-05-22 minimal trial was SUPERSEDED.

### Step 2 — Read the trial criteria

Extract from the decisions.md entry:
- Criteria (the explicit success/failure metrics)
- Review date(s) (when this review should fire)
- Switch / graduate / abandon thresholds (if defined)
- Hard-to-reverse parts (if any — these inform the recommendation framing)

For the current real-use trial (2026-06-01 → 2026-06-08): see the 7 criteria + GRADUATE / CONTINUE / SIMPLIFY / ABANDON thresholds in the 2026-06-01 `decisions.md` entry. Evidence comes from `state/registry.md` + `observer/scan-ledger.md` (daily run cadence), `state/errors.md` (standing-job-decay count), `operator/<vault>/LOG.md` (wiki-operator cycle count), and the schedulers' run logs.

For the prior build-week trial (2026-05-30 → 2026-05-31, CLOSED GRADUATE): historical reference only, do not re-score.

### Step 3 — Score each criterion against current state

For each criterion, gather evidence + render a row:

```
| Criterion | Target | Actual | Pass/Fail | Evidence |
|---|---|---|---|---|
| <criterion> | <target spec> | <observed state> | ✅ / ⚠️ / ❌ | <file:line + one-line> |
```

Evidence-gathering pointers per criterion (general — applies to any trial that uses this skill):

- **Cadence-based criteria** (e.g., "the daily run ran X of 5 weekdays"): grep `observer/scan-ledger.md` for daily-run rows within the window; count by weekday.
- **End-of-day cadence:** check `state/now.md` `Updated:` line history (via `git log` if tracked, or `stat -f '%Sm'` on now.md) — alternative is to grep project `log.md` files for trial-window entries.
- **Capture usage:** grep across `decisions.md`, `errors.md`, `docs/IMPROVEMENTS.md`, `operator/IMPROVEMENTS.md` for `[TRIAL-WEEK]` stamps; count occurrences.
- **Wiki-operator cycles:** grep `operator/<vault>/LOG.md` for cycle entries within the trial window.
- **Sunday rituals fired:** grep `observer/LOG.md` (for `/weekly-review`) and `officiator/LOG.md` (for `/officiator-audit`); confirm one entry each on the expected Sunday.
- **`state/now.md` size:** check current `stat -f '%z'` against the cap. (Cannot retroactively verify mid-window dips without git history — best-effort current snapshot + scan-ledger rows.)
- **Standing-job-decay instances:** grep `state/errors.md` for new "standing-job-decay" entries within the trial window.

### Step 4 — Recommendation

Synthesize a one-paragraph recommendation. Choose from:

- **CONTINUE** — trial criteria broadly met; no urgent reason to switch or graduate; run another window (extend, not close)
- **SIMPLIFY** — too much complexity built; recommend cutting features / consolidating / reducing scope before continuing
- **GRADUATE** — criteria comfortably met; the system has earned its place in steady state; archive trial artifacts; promote rules to permanent
- **ABANDON** — criteria failed broadly OR the trial's premise no longer holds; surface what was learned + propose disposition of artifacts

Each recommendation includes:
- **What to do this week** (concrete next step — Kriss's first move)
- **What to defer** (items NOT urgent enough to act on now)
- **What to retire** (artifacts to archive or delete — only on GRADUATE or ABANDON)
- **What to repeat next trial** (lessons that should carry forward into any follow-up window)

### Step 5 — Write report + hand off

**Two writes: the human audit (primary) + the detailed scoring (deep-detail).**

First, write the human-facing audit (this is what Kriss reads) to `~/Kriss LLM/Claude OS/reviews/quarterly/YYYY-Qn.md`: start from `reviews/templates/quarterly.md`, run the checks in `reviews/AUDIT-SPEC.md` judged over the whole quarter (and roll up the quarter's `reviews/weekly/` reports — which boxes were chronically 🟡/🔴, which improved, which decayed), assign 🟢/🟡/🔴 per grouped line with culprit + `[[link]]` on 🟡/🔴, put the GRADUATE/CONTINUE/SIMPLIFY/ABANDON call in "The call", and fill "Flags & improvements" as a checkbox list (`- [ ]`) that OPENS by pulling every still-unchecked `- [ ]` flag from this quarter's `reviews/weekly/` reports, each linked back to its week with `[[reviews/weekly/YYYY-Wnn]]` (checked-off weekly flags are done — leave them behind), then adds quarter-level concerns. Delete the template's `<!-- FILL INSTRUCTIONS -->` block. Then update `reviews/index.md` (Latest → quarterly + prepend a row to the quarterly table).

Then append the detailed scoring (the linked deep-detail) to `~/Kriss LLM/Claude OS/observer/LOG.md`:

```markdown
## Trial Review YYYY-MM-DD — <trial title>

### Trial spec
- Source: `state/decisions.md` <entry date>
- Criteria: <one-line each>
- Review date: <YYYY-MM-DD>

### Scoring
<table from Step 3>

### Recommendation
**<CONTINUE | SIMPLIFY | GRADUATE | ABANDON>**

<one-paragraph rationale>

### What to do this week
- <concrete next step>

### What to defer
- <items not urgent>

### What to retire (on GRADUATE/ABANDON only)
- <artifacts>

### Lessons for next trial
- <carry-forward items>
```

Then surface to Kriss in chat:

```
Trial review YYYY-MM-DD complete.

Recommendation: <CONTINUE | SIMPLIFY | GRADUATE | ABANDON>
<one-sentence rationale>

Your audit → reviews/quarterly/YYYY-Qn.md (detailed scoring → observer/LOG.md). Next move: <concrete first step>.
```

If recommendation is GRADUATE or ABANDON, optionally offer to archive BUILD-LOG.md to `officiator/audit-trail/build-log-YYYY-WW.md` (per Phase 10 Step 4 in `docs/PLAN.md`) — but don't auto-archive; Kriss confirms first.

### Step 6 — Triage `[TRIAL-WEEK]`-stamped entries (when stamp convention was active)

If the trial's `decisions.md` entry uses the `[TRIAL-WEEK]` stamp convention (or any equivalent stamp), surface every stamped entry for Kriss to triage.

**Search** for the stamp across the 4 stamped files (default — but read the trial entry to confirm which stamp + which files):

```bash
grep -nH "\[TRIAL-WEEK\]" \
  ~/Desktop/Kriss\ LLM/Claude\ OS/state/decisions.md \
  ~/Desktop/Kriss\ LLM/Claude\ OS/state/errors.md \
  ~/Desktop/Kriss\ LLM/Claude\ OS/docs/IMPROVEMENTS.md \
  ~/Desktop/Kriss\ LLM/Claude\ OS/operator/IMPROVEMENTS.md
```

**Render** one table row per stamped entry — file:line, date, one-line topic.

**Triage with Kriss — one entry at a time.** For each, ask which bucket:
- **`[V1-FIX]`** — change current Claude OS this week or next. Stays in its file; update the stamp from `[TRIAL-WEEK]` to `[V1-FIX]`.
- **`[V2-VISION]`** — belongs to the larger self-improving system. MOVE the entry to `Claude OS/docs/VISION.md` under `## Refinements from trials` → new dated section. Delete the original from its source file.
- **(noise)** — looked good Tuesday, didn't survive Sunday. Delete the entry from its file.

**Apply changes only after Kriss confirms each triage decision.** Don't batch-apply; one entry at a time so Kriss can redirect.

**At the end of Step 6:**
1. Count entries in each bucket. Append the counts to the trial-review report (`observer/LOG.md`) and surface to Kriss in chat.
2. Remove the `> **Active trial window: …**` stamp-protocol block from each of the 4 stamped files (window is closed; convention no longer applies).
3. Update the trial entry in `decisions.md`: change `**Status:** ACTIVE.` → `**Status:** CLOSED <recommendation>` with the bucket counts (e.g., `CLOSED GRADUATE — 3 [V1-FIX], 2 [V2-VISION], 4 noise`).

If the active trial entry does NOT specify a stamp convention, skip Step 6 — there's nothing to triage.

## Activation — schedule skill setup (one-time, on demand)

Trial-review is **event-driven**, not weekly cron. Fire it when:
- A trial's review date in decisions.md has arrived (today >= review date)
- Phase 10 of the consolidation build completes (Kriss's cue)
- Kriss explicitly says "trial review" or `/trial-review`

For the current build-week trial: Kriss fires `/trial-review` when he marks Phase 10 complete in BUILD-LOG.md. No scheduled cron needed.

For future stable-state trials (if any): schedule via Claude Code's `schedule` skill with the trial's review date.

## Anti-patterns

- **Don't recommend GRADUATE if the trial criteria were never measured.** GRADUATE means criteria comfortably met; if you couldn't measure them, the answer is CONTINUE or ABANDON, not GRADUATE.
- **Don't auto-archive BUILD-LOG.md.** Even on GRADUATE/ABANDON, Kriss confirms before any archive move.
- **Don't run trial-review if no active trial exists.** Surface "no trial to review" + the most recent SUPERSEDED entry headline if any.
- **Don't score against a SUPERSEDED trial.** Always check `status: SUPERSEDED` or equivalent markers in decisions.md before reading criteria.
- **Don't make CONTINUE the default to avoid conflict.** If criteria failed, recommend ABANDON honestly. The trial existed to learn whether the approach works; "didn't" is a valid finding.

## Cross-references

- `~/Kriss LLM/Claude OS/state/decisions.md` — source of trial criteria + supersession markers
- `~/Kriss LLM/Claude OS/docs/BUILD-LOG.md` — evidence source for the current build-week trial
- `~/Kriss LLM/Claude OS/docs/PLAN.md` — phase status board (criterion #1 for build-week trial)
- `~/.claude/skills/weekly-review/SKILL.md` — different cadence; weekly review runs every Sunday, trial-review runs once at trial close
