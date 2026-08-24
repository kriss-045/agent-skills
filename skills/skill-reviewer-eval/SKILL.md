---
name: skill-reviewer-eval
description: "Evaluates an Agent Skill and returns a structured scored report with findings and prioritized fixes. Triggers: review/score/grade/evaluate/rate this skill, or a skill folder/zip shared for feedback, thoughts, or is-this-good. Not for prompt quality, system prompts, or non-skill configs."
---

# Agent Skill Evaluator

## CRITICAL: invoke this skill immediately on trigger

When a trigger phrase from this skill's `description:` field appears in a user message, invoke this skill via the Skill tool BEFORE generating any other response about the task. Don't paraphrase or reinvent its workflow in chat. This is the SF2 invoke-on-trigger convention; the officiator weekly audit verifies this preamble is present, and a missed trigger is a flagged finding.


Evaluates Agent Skills across 72 items in 6 categories, producing a structured plain text report with scores, findings, and prioritized fixes.

Every item must be evaluated. Every finding must reference a specific location in the skill — file name, field name, or line reference. Vague findings ("the skill lacks X") are not acceptable ("Field `description` in frontmatter is 847 characters — exceeds the 600-character sweet spot defined in D2" is the standard).

This version (v7) is the 2026-08-06 fact-check pass: every rule re-verified against Anthropic's skill authoring best practices, the Agent Skills spec (agentskills.io), and the current Claude Code skills reference. See the bottom of this file for the changelog.

---

## Step 0 — Initialize

Before evaluating anything:

1. Confirm with the user that 72 items across 6 categories will be evaluated.
2. Identify what skill material has been provided: folder structure, SKILL.md content, reference files, scripts, assets.
3. Note any missing material explicitly — do not fabricate content to evaluate.
4. State: "Beginning evaluation. 72 items across 6 categories."

Do not proceed to Step 0.5 until initialization is complete.

---

## Step 0.5 — Classify Archetype

Several rules in this evaluator are archetype-conditional. Before scoring, classify the skill as one of:

- **Reference / runbook** — teaches *how to do X* with code, libraries, APIs. Code-heavy body, worked examples. Examples: `pdf`, `mcp-builder`, `huggingface/transformers-js`.
- **Aesthetic / judgment** — teaches *what good looks like* via principles and anti-patterns. Short body, strong voice. Examples: `frontend-design`, `impeccable`, `humanizer`, `taste-skill`, `caveman`.
- **Workflow / methodology** — teaches *follow this process* with phased steps and state-passing. Often phase-numbered. Examples: `superpowers`, `gsd`, `gstack`, `career-ops`, `planning-with-files`.

Hybrids exist (e.g. `skill-creator` is workflow + reference). When in doubt, classify by which rhythm dominates the body.

State the classification before proceeding. This affects:

- **Q13 (anti-pattern specificity)** — required for judgment, N/A for reference/workflow.
- **Q14 (eval discipline)** — quality bonus for all archetypes, more weight for judgment/workflow.
- **E13 (named skill handoffs)** — required for workflow orchestrators, N/A for reference/aesthetic.
- **Body length expectations** — aesthetic 60–200, reference 200–500, workflow 200–500+.
- **C11 conviction-justification check** — applies most aggressively to judgment skills where caps are common.

Do not proceed to Step 1 until the archetype is stated.

---

## Step 1 — BASICS (8 items)

Read `references/checklist-1-basics.md` in full.

Evaluate every item (B1 through B8) against the skill. For each item:
- State the item ID
- State PASS, FAIL, or N/A
- Provide specific evidence — quote the relevant content or state the specific finding

After evaluating all 8 items, output:

```
Items evaluated: B1, B2, B3, B4, B5, B6, B7, B8
BASICS: 8/8 items checked ✓
Category Score: X/Y passed (where Y = applicable items, excluding N/A)
```

**Checkpoint:** Confirm that all 8 item IDs (B1–B8) appear in your output before proceeding. If any are missing, re-evaluate that item before continuing.

---

## Step 2 — DISCOVERABILITY (13 items)

Read `references/checklist-2-discoverability.md` in full.

Evaluate every item (D1 through D13) against the skill. For each item:
- State the item ID
- State PASS, FAIL, or N/A
- Provide specific evidence — quote the relevant content or state the specific finding

After evaluating all 13 items, output:

```
Items evaluated: D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13
DISCOVERABILITY: 13/13 items checked ✓
Category Score: X/Y passed (where Y = applicable items, excluding N/A)
```

**Checkpoint:** Confirm that all 13 item IDs (D1–D13) appear in your output before proceeding. If any are missing, re-evaluate that item before continuing.

---

## Step 3 — EXECUTION (16 items)

Read `references/checklist-3-execution.md` in full.

Evaluate every item (E1 through E16) against the skill. For each item:
- State the item ID
- State PASS, FAIL, or N/A
- Provide specific evidence — quote the relevant content or state the specific finding

After evaluating all 16 items, output:

```
Items evaluated: E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16
EXECUTION: 16/16 items checked ✓
Category Score: X/Y passed (where Y = applicable items, excluding N/A)
```

**Checkpoint:** Confirm that all 16 item IDs (E1–E16) appear in your output before proceeding. If any are missing, re-evaluate that item before continuing.

---

## Step 4 — QUALITY (14 items)

Read `references/checklist-4-quality.md` in full.

Evaluate every item (Q1 through Q14) against the skill. For each item:
- State the item ID
- State PASS, FAIL, or N/A
- Provide specific evidence — quote the relevant content or state the specific finding

After evaluating all 14 items, output:

```
Items evaluated: Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q14
QUALITY: 14/14 items checked ✓
Category Score: X/Y passed (where Y = applicable items, excluding N/A)
```

**Checkpoint:** Confirm that all 14 item IDs (Q1–Q14) appear in your output before proceeding. If any are missing, re-evaluate that item before continuing.

---

## Step 5 — SAFETY (9 items)

Read `references/checklist-5-safety.md` in full.

S1 and S2 are universal — always evaluate them. S3 through S9 are optional — mark N/A if the condition does not apply (no scripts, no network activity, no data access, no file manipulation, no destructive operations, no defined error messages, no allowed-tools grant).

Evaluate every item (S1 through S9) against the skill. For each item:
- State the item ID
- State PASS, FAIL, or N/A
- Provide specific evidence — quote the relevant content or state the specific finding

After evaluating all 9 items, output:

```
Items evaluated: S1, S2, S3, S4, S5, S6, S7, S8, S9
SAFETY: 9/9 items checked ✓
Category Score: X/Y passed (where Y = applicable items, excluding N/A)
```

**Scoring note:** If only S1 and S2 are applicable (all others are N/A), report "Category Score: 2/2 passed" — N/A items are excluded from the denominator.

**Checkpoint:** Confirm that all 9 item IDs (S1–S9) appear in your output before proceeding. If any are missing, re-evaluate that item before continuing.

---

## Step 6 — CONSISTENCY (12 items)

Read `references/checklist-6-consistency.md` in full.

Evaluate every item (C1 through C12) against the skill. For each item:
- State the item ID
- State PASS, FAIL, or N/A
- Provide specific evidence — quote the relevant content or state the specific finding

Notes:
- C3 references the same caps-justification check as E2. If E2 was already evaluated, note the consistency impact without re-analyzing.
- C7 references the same description length check as D2. Same handling.

After evaluating all 12 items, output:

```
Items evaluated: C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12
CONSISTENCY: 12/12 items checked ✓
Category Score: X/Y passed (where Y = applicable items, excluding N/A)
```

**Checkpoint:** Confirm that all 12 item IDs (C1–C12) appear in your output before proceeding. If any are missing, re-evaluate that item before continuing.

---

## Step 7 — Final Verification and Report

Before producing the final report:

1. Confirm all 6 completion markers are present:
   - BASICS: 8/8 items checked ✓
   - DISCOVERABILITY: 13/13 items checked ✓
   - EXECUTION: 16/16 items checked ✓
   - QUALITY: 14/14 items checked ✓
   - SAFETY: 9/9 items checked ✓
   - CONSISTENCY: 12/12 items checked ✓

2. Confirm total items evaluated: 72/72.

3. If any category marker is missing, stop and re-evaluate that category before proceeding.

4. Produce the final report using the template below.

---

## Output Format

Use this exact template. Output must be plain text — no markdown formatting (no #, **, __, >, or backticks). Use only the structural elements shown below.

```
================================================================================
                        AGENT SKILL EVALUATION REPORT
================================================================================

Skill Name: [name from frontmatter, or "Unknown" if missing]
Archetype:  [Reference / Aesthetic / Workflow / Hybrid]
Evaluated:  [today's date]
Total Items Evaluated: 72/72 ✓

--------------------------------------------------------------------------------
SUMMARY BY CATEGORY
--------------------------------------------------------------------------------

  BASICS:          X/8 passed    [8/8 items checked]
  DISCOVERABILITY: X/13 passed   [13/13 items checked]
  EXECUTION:       X/16 passed   [16/16 items checked]
  QUALITY:         X/14 passed   [14/14 items checked]
  SAFETY:          X/Y passed    [9/9 items checked]  (Y = applicable items only)
  CONSISTENCY:     X/12 passed   [12/12 items checked]

OVERALL SCORE: XX/72 items passed (XX%)

--------------------------------------------------------------------------------
CRITICAL ISSUES (Must Fix)
--------------------------------------------------------------------------------

[List every FAIL item marked Critical severity, with specific location and finding.
If none, write: No critical issues found.]

--------------------------------------------------------------------------------
WARNINGS (Should Fix)
--------------------------------------------------------------------------------

[List every FAIL item marked Important severity, with specific location and finding.
If none, write: No warnings.]

--------------------------------------------------------------------------------
STRENGTHS
--------------------------------------------------------------------------------

[List notable things this skill does well — specific, not generic.
"Instructions are clear" is not acceptable. "The progressive disclosure structure in Steps 1–3 prevents SKILL.md bloat by routing all checklist content to reference files" is the standard.
If nothing notable, write: No notable strengths identified.]

--------------------------------------------------------------------------------
PRIORITIZED FIX LIST
--------------------------------------------------------------------------------

Priority 1 (Critical — Fix First):
[List all Critical FAIL items with specific fix instructions]

Priority 2 (Important — Fix Soon):
[List all Important FAIL items with specific fix instructions]

Priority 3 (Nice to Have):
[List all Quality FAIL items with specific fix instructions]

--------------------------------------------------------------------------------
OVERALL ASSESSMENT
--------------------------------------------------------------------------------

[PASS / PASS WITH WARNINGS / FAIL]

Reasoning: [1–2 sentences. Name the specific mechanism that makes this skill pass or fail — not "the skill has some issues" but "the overfitted instructions in E12 and the contradictory rules in C8 mean the skill will produce inconsistent output on any input that is not the exact test case used during development."]

Recommendation: [Choose one: Deploy as-is / Fix warnings then deploy / Critical fixes required before deployment]

================================================================================
```

---

## Assessment Thresholds

PASS: All Critical items pass, and fewer than 3 Important items fail.
PASS WITH WARNINGS: All Critical items pass, but 3 or more Important items fail.
FAIL: Any Critical item fails.

---

## Anti-Skip Protocol

This evaluation contains 72 items. Skipping items is a failure of the evaluation — a skipped item is an undetected problem.

If at any point a category checkpoint fails (item IDs are missing from output), stop immediately. Re-read the checklist for that category and re-evaluate. Do not proceed to the next category until the checkpoint passes.

The final verification in Step 7 is mandatory. Produce the final report only after all 6 category markers are confirmed.

---

## Evidence Standard

Every PASS, FAIL, and N/A must be supported by specific evidence:

UNACCEPTABLE: [B1] FAIL — The folder name is wrong.
REQUIRED: [B1] FAIL — Folder name is `PDF_Processor` — contains uppercase letters and an underscore. Must be fully lowercase kebab-case (e.g., `pdf-processor`).

UNACCEPTABLE: [D2] PASS — The description is a good length.
REQUIRED: [D2] PASS — Description is 347 characters (single-purpose style), within the 200–600 character sweet spot.

UNACCEPTABLE: [S3] N/A — No scripts.
REQUIRED: [S3] N/A — No scripts/ directory found. No script files present at any level of the skill folder.

Generic findings are not acceptable. Every finding must answer: where exactly is the issue, and what is the specific observation?

---

## Changelog

**v7 (2026-08-06)** — Fact-check pass. Every rule re-verified against three live sources: Anthropic's skill authoring best practices (platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices), the Agent Skills spec (agentskills.io/specification), and the Claude Code skills reference (code.claude.com/docs/en/skills).

Corrections (v6 was wrong):
- E9 — TOC threshold reverted to 100 lines. v6 claimed "the Agent Skills spec's threshold is 300 lines"; the spec sets no TOC threshold and the official best-practices doc says 100. v5 had it right.
- D9 — Rewritten. The field universe split in two: the portable spec allows exactly six fields (name, description, license, compatibility, metadata, allowed-tools) and claude.ai upload / Skills API / package_skill.py HARD-ERROR on anything else (v6's "silently ignored" claim is wrong there). Claude Code additionally documents when_to_use, argument-hint, arguments, disable-model-invocation, user-invocable, disallowed-tools, model, effort, context, agent, background, hooks, paths, shell.
- D2 / C7 — Single-purpose floor lowered from 200 to 120 chars; the 200 floor failed Anthropic's own exemplary Git Commit Helper description (~150 chars). Content test (what + when + keywords) now primary, count secondary.
- B4 — Upgraded to Critical for portable skills: the spec explicitly requires name to match the parent directory and validators reject mismatches. (Claude Code alone treats name as a display label.)
- B1 — Added spec constraints: max 64 chars, no leading/trailing hyphen, no consecutive hyphens.
- B3 / D1 — Nuanced: name+description are spec-required, but Claude Code treats all frontmatter as optional (description falls back to the body's first paragraph). Noted Claude Code's 1,536-char combined cap on description + when_to_use in the listing.
- B6 — Marked as convention, not spec (the spec permits any files in the skill directory).
- Q12 — Rescoped two-sided: house-specific context must be provided, general knowledge must NOT be re-explained ("Claude is already very smart" principle).

New items (from current official guidance):
- D13 — Invocation control matches the skill's nature (disable-model-invocation for side-effect workflows, user-invocable: false for background knowledge, paths for file-scoped skills).
- E14 — No time-sensitive information (deprecated approaches go in an "old patterns" section).
- E15 — One default, not an option menu (named anti-pattern in official docs).
- E16 — Environment assumptions explicit: fully qualified MCP tool names (Server:tool), declared package dependencies, forward-slash paths.
- S9 — allowed-tools grant is minimal and matches the body (docs warn a skill "can grant itself broad tool access").

Verified unchanged and still correct: name/description limits (64 / 1,024 chars), no XML tags, reserved words "claude"/"anthropic" (D8), third-person voice (D3; docs now also warn against second person "You can use this to..."), <500-line SKILL.md (Q5/C1; spec adds <5k tokens), one-hop references (E8), terminology consistency (Q7/C10), eval discipline (Q14; docs now say build at least three evals BEFORE writing, and test across Haiku/Sonnet/Opus).

Totals: 67 → 72 items (D 12→13, E 13→16, S 8→9).

**v6 (2026-05-24)** — Archetype-aware rating. Synthesizes findings from the AI wiki research on 159 skills.

New items:
- D10 — Description uses imperative voice + keyword variants ("pushy contextual")
- D11 — Explicit "When NOT to use" clause
- D12 — Proactive triggers based on agent state
- E13 — Workflow skills compose via named handoffs
- Q13 — Anti-patterns name specific failures (judgment archetype only)
- Q14 — Eval discipline / measurement evidence
- C11 — Conviction has inline justification (caps + why)
- C12 — Borrowed authority cited specifically

Corrections:
- D2 — Char sweet spot is style-dependent (single-purpose: 200–600; keyword-enumerating: 200–1024). The Anthropic PDF skill is ~700 chars and exemplary.
- E2 / C3 — Replaced count threshold (≤5–7 caps) with "every caps directive has an inline justification". `frontend-design` uses caps freely and is excellent; the rule is justification, not abstinence.
- Q3 — Distinguishes conviction-voice (good) from chatty filler (bad). Voice with conviction (`caveman`'s "why use many token when few token do trick") is now a strength, not a flag.
- Q4 — Scoped strictly to files inside the skill folder. A parent-repo README describing the collection is fine.

New step:
- Step 0.5 — Classify archetype (Reference / Aesthetic / Workflow / Hybrid). Several rules are archetype-conditional.

Unchanged: BASICS (B1–B8), SAFETY (S1–S8). All other items preserved with original IDs.

## House criteria (Kriss's system — score these on EVERY eval, 2026-07-02)

Add these to the rubric; each is pass/fail with a one-line finding:

- **DESC-BUDGET:** description ≤450 chars, single-line, quoted; triggers verbatim; a "not for" clause. Over budget = finding (it taxes every session). (For Claude Code-only skills, overflow trigger phrasing may move to `when_to_use`; the combined listing text is capped at 1,536 chars.)
- **DISCLOSURE:** body ≤~200 lines OR reference files carry the bulk. A 300+ line monolith = finding.
- **NO-CONTRACT-COPY:** for Claude OS skills, no copied contract numbers (ceilings, tier tables, lock timeouts) — cite the contract instead. Any copied number = finding with the drift-risk note.
- **RETIRED-TOKENS:** grep for the retired-token list (action-plan.md, review-queue.md, heartbeat.md, backlog-of-3, /morning, /end-of-day, launchd nightly, contract v0.3). Any hit = finding.
- **EVIDENCE-STANDARD (W28 fix, 2026-07-14):** every number in the report (line counts, description chars, file sizes, trigger counts) is MEASURED by running the command (`wc -l`, a python len(), grep -c), never estimated from reading. An estimated number is a finding against the eval itself.
- **OVERLAP:** name the closest-trigger existing skill and whether both descriptions disambiguate. Ambiguous pair = finding.
