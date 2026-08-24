---
name: skill-builder
description: "Builds high-quality Agent Skills with a structured process: trigger design, branching logic, progressive disclosure, reference-file architecture; validated by skill-reviewer-eval and blind-tested via skill-test. Triggers: create/build/author/design a skill, turn this workflow into a skill, help me make a skill, write a SKILL.md. Not for evaluating existing skills (skill-reviewer-eval)."
---

# Skill Builder

Most skills fail not because their instructions are wrong, but because of structural decisions made before a single instruction is written: the description buries the trigger conditions, SKILL.md becomes a monolith, optional steps are treated as universal, examples are too narrow to generalize. This skill fixes that by front-loading the decisions that determine whether a skill will be reliable, discoverable, and maintainable.

The output is a complete, ready-to-install skill folder — SKILL.md plus any reference files, organized correctly. Not a draft. Not a scaffold. A skill that passes a `skill-reviewer-eval` review.

---

## CRITICAL — invoke this skill immediately on trigger

When a trigger phrase from the `description:` field above appears in a user message → invoke this skill via the Skill tool. Don't paraphrase its workflow in chat or reinvent its logic. Hook B3 (`~/.claude/hooks/claude-os-write-check.sh`) verifies this preamble is present; missing it = drift event per rule SF2 in `state/rules.md`.

## Composition with skill-reviewer-eval

This skill carries the **process** of building skills — capture, architecture, drafting, packaging. It deliberately does **not** carry the rules for what makes a skill good. Those rules live in the companion `skill-reviewer-eval` skill (72 items across 6 categories: Basics, Discoverability, Execution, Quality, Safety, Consistency).

The two compose:

- **skill-builder** = how to make a skill (process scaffolding)
- **skill-reviewer-eval** = whether the skill is any good (canonical rule set)

After the draft is written (Phase 3), skill-builder runs the draft through skill-reviewer-eval and addresses findings before presenting the result. When skill-reviewer-eval updates, this skill inherits the new rules automatically — there is no duplicated rule list to keep in sync.

If a rule from skill-reviewer-eval conflicts with anything in this skill's process, skill-reviewer-eval wins.

---

## How to use this skill

Read the user's request and identify which phase applies:

- Rough idea → start at Phase 1 (Capture)
- Existing workflow to capture → extract structure from the conversation, then Phase 2
- Draft already exists → skip to Phase 2 (Architecture Review)
- Adding complexity to an existing skill → Phase 2, then continue

Work through phases in order. Do not skip Phase 2 (Architecture) — it is the most important phase and the most commonly skipped in naive skill creation.

---

## Phase tracker — output this checklist BEFORE you start, and re-output it AT EVERY phase boundary

Skill construction is a 5-phase sequence and the most common failure mode is silently dropping a phase mid-run (especially Phase 4c onward). The fix is loud tracking. Print this checklist verbatim at the start of the run, then re-print it (with updated status) at the start of each new phase and before final delivery. Treat it like a status line — if you can't show the checklist to the user, you don't move on.

```
SKILL-BUILDER PHASE TRACKER
[ ] Phase 1 — Capture (4 questions resolved)
[ ] Phase 2 — Architecture (7 decisions confirmed with user)
[ ] Phase 3 — Draft written (SKILL.md + any references)
[ ] Phase 4a — skill-reviewer-eval run
[ ] Phase 4b — findings classified mechanical vs domain
[ ] Phase 4c — mechanical auto-fixes applied
[ ] Phase 4d — domain-knowledge gaps surfaced to author
[ ] Phase 4e — re-run skill-reviewer-eval, before/after reported
[ ] Phase 5 — packaged, structural eyeball, presented
[ ] Phase 6 — skill-test behavioural gate (blind A/B/C; skipped only if author opts out, marked [~])
```

Rules:

1. **Print before starting.** First action of the run is printing this checklist with all boxes empty.
2. **Tick as you go.** When a phase completes, mark `[x]` and re-print the whole list at the next phase boundary. Do not just say "Phase 4c done" — show the list with the box ticked.
3. **Never skip 4c–4e.** Running `skill-reviewer-eval` (4a) and stopping is the canonical failure. Auto-fixes (4c), gap-surfacing (4d), and re-eval (4e) are non-optional unless 4a returned zero findings.
4. **If a phase is intentionally N/A** (e.g. no reference files = no need to re-check progressive disclosure), mark it `[~]` with a one-line reason instead of `[x]`. Silent skip is the failure mode this tracker exists to prevent.

---

## Phase 1 — Capture

Understand exactly what the skill needs to do. Extract from the conversation first — if the user has already described their workflow, tools, corrections, or expected outputs, pull those answers out before asking.

Resolve these four questions before writing anything:

**1. What does the skill do?**  
The core function in one sentence. If it takes more than one sentence, the skill may be doing too much. Hold that for Phase 2.

**2. When should it trigger?**  
Identify 3–5 specific user phrases or situations that should cause this skill to load. Also identify 2–3 near-miss cases that should *not* trigger it (adjacent domains that share vocabulary). Both matter for the description.

**3. What does the output look like?**  
File? Structured report? Free-form prose? Transformed input? The output type determines whether explicit format templates are needed.

**4. What varies across real uses?**  
What changes between one use of this skill and the next? Different file types? Different domains? Different user expertise? Variation is the enemy of overfitting — understand it before writing instructions.

Ask only what the conversation has not already answered. When all four are resolved, proceed.

---

## Phase 2 — Architecture

This phase determines the skill's structure before writing a single instruction. Read `references/architecture-guide.md` in full before proceeding.

Work through these decisions in order:

### Decision 1 — Scope

Can the skill's purpose be stated in one sentence without using "and" or "or"?

- Yes → single skill, proceed.
- No → identify whether the branches are:
  - **Sequential variants** (same goal, different paths) → single skill with branching logic
  - **Distinct functions** (genuinely different goals) → separate skills; tell the user

### Decision 2 — Archetype

Per the `skill-archetypes` pattern from the AI wiki, classify the skill:

- **Reference / runbook** — teaches *how to do X* (code-heavy body, worked examples). Typical body: 200–500 lines.
- **Aesthetic / judgment** — teaches *what good looks like* via principles and anti-patterns. Typical body: 60–200 lines. Anti-patterns are primary content.
- **Workflow / methodology** — teaches *follow this process* (phased, state-passing). Typical body: 200–500+ lines.

Archetype determines body length budget, whether anti-patterns are load-bearing, and whether conviction-style voice is rewarded.

### Decision 3 — Complexity tier

- **Tier 1** — SKILL.md only, under archetype budget. Single workflow, no branching, no reference lookup.
- **Tier 2** — SKILL.md + 1–3 reference files. Multi-step workflow, requires lookup, or has structured output template.
- **Tier 3** — SKILL.md + organized references, possibly scripts. Multiple input types, significant branching, or output requires a script.

If the user describes a Tier 3 skill but has not thought through the branches, pause here. Map the branches explicitly before writing.

### Decision 4 — Reference file split

For Tier 2 and 3, decide what lives in SKILL.md vs. references:

- **SKILL.md** — workflow, decision logic, branching conditions, "when to read which reference" routing
- **References** — checklists, lookup tables, domain-specific rules, output templates, detailed guides
- **Rule of thumb** — if a section of SKILL.md would be longer than 40 lines and is *reference material* (looked up, not followed step by step), it belongs in a reference file

Name reference files descriptively (`checklist-basics.md`, `template-executive-report.md`), not generically (`ref1.md`, `notes.md`).

### Decision 5 — Optional vs. universal steps

Identify which steps only apply sometimes:

- Which steps depend on whether certain files, features, or conditions exist?
- Which steps depend on the user's intent variant?

Mark these as `(optional — if X)` in the eventual skill. Treating optional steps as universal causes N/A inflation and false failure modes.

### Decision 6 — Output format

Decide whether the output needs an explicit template:

- **Needs a template** — structured reports, scored evaluations, formatted documents
- **Does not need a template** — free-form analysis, conversational responses, code where structure is determined by the language

If a template is needed, draft it now — before writing instructions that reference it.

### Decision 7 — Deployment target and invocation control (rater items D9 / D13)

Two questions, both cheap to answer now and expensive to retrofit:

**Where will the skill run?**
- **Portable** (claude.ai upload, Skills API, shared beyond this machine) → frontmatter is limited to the spec's six fields (`name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`); anything else hard-errors on upload.
- **Claude Code only** (this machine, `~/.claude/skills/`) → the documented extension fields are available (`when_to_use`, `disable-model-invocation`, `user-invocable`, `allowed-tools`, `disallowed-tools`, `context: fork`, `paths`, `hooks`, and the rest). Default for Kriss's skills.

**Who should be able to fire it?**
- Skill has **side effects** (deploys, commits, sends, publishes, schedules) → `disable-model-invocation: true`, so only the human triggers it. If the skill must stay portable (the field doesn't exist there), the confirmation gate goes in the body instead.
- Skill is **background knowledge** the user would never type as a command → `user-invocable: false`.
- Skill is **file-scoped** → consider `paths:` globs so it loads only when relevant files are touched.
- Everything else → both directions stay enabled; no fields needed.

### Confirm before proceeding

Output the architecture summary:

```
ARCHITECTURE SUMMARY
Scope: [single skill / multiple skills — name them]
Archetype: [Reference / Aesthetic / Workflow / Hybrid]
Tier: [1 / 2 / 3]
SKILL.md content: [workflow + decision logic]
Reference files: [list each + what it contains, or "none"]
Optional steps: [list conditions, or "none"]
Output template: [needed / not needed — describe if needed]
Deployment target: [portable / Claude Code only]
Invocation: [both directions / human-only (disable-model-invocation) / model-only (user-invocable: false) — reason]
```

Get user confirmation. Architecture changes after writing are expensive.

---

## Phase 3 — Write the Draft

Now write the actual skill. This is the *process* of putting words on the page; the *rules* for what those words should look like live in `skill-reviewer-eval`. Don't try to remember every rule — write a reasonable draft, then validate it in Phase 4.

### Write in this order

1. **Frontmatter** — `name:` (kebab-case, matches folder) and `description:`, plus whatever Decision 7 chose (invocation-control fields for Claude Code skills; nothing beyond the spec six for portable skills). No decorative fields — `version`/`author`/`tags` belong under `metadata:` if kept at all.
2. **Description** — the most important field. Determines whether the skill triggers at all. Cover what it does, when it triggers, and (optionally) when it does NOT trigger.
3. **SF2 invoke-on-trigger preamble — EMIT IT, every time, immediately after the H1.** See "Mandatory SF2 preamble" below. This is step 3 of 5 and not an optional polish item.
4. **Body** — orientation paragraph + workflow + steps. For Tier 2/3, include "Read references/X.md when..." routing.
5. **Reference files** — if Tier 2/3. Each one focused on one domain.

### Mandatory SF2 preamble (guarantee by template, not by memory)

Every skill this builder produces MUST carry the invoke-on-trigger preamble as its first section after the H1 title. Paste this block and fill the one tailored sentence:

```markdown
## CRITICAL — invoke this skill immediately on trigger

When a trigger phrase from the `description:` field above appears in a user message → INVOKE THIS SKILL VIA THE Skill TOOL before any other response. <one sentence naming the specific failure this skill exists to prevent, e.g. "Don't improvise the routing in chat" / "Don't answer from memory instead of running the steps".> Hook B3 (`~/.claude/hooks/claude-os-write-check.sh`) verifies this preamble is present; missing it = drift event per rule SF2 in `state/rules.md`.
```

**Only exemptions:** a skill with `disable-model-invocation: true` (it cannot be model-triggered, so the preamble is meaningless), and Anthropic-shipped skills you did not author.

**Creation-time check, run it before Phase 4 and quote the output:**

```bash
grep -q "invoke this skill immediately on trigger" <skill-dir>/SKILL.md && echo "SF2 ok" || echo "SF2 MISSING — add the preamble before continuing"
```

**Why this is a template step and not a reminder:** SF2 was already a written rule and 5 skills still shipped without it (case-study-writer, de-aification, meaningful-interface, resume-builder, visual-report, all fixed 2026-08-19), making SF2 the single largest drift source of W33. A rule that lives only as prose in a rules file gets skipped; a paste-this block inside the writing step does not. If you ever build a skill and the grep above prints MISSING, the skill is not finished.

### Light guidance while writing

- Use the why for each load-bearing instruction (not just the what)
- Mark optional steps with `(optional — if X)` so the rater can correctly N/A them
- Use imperative voice ("Process the file", "Check the field")
- Don't fabricate examples — if you don't know the canonical example, leave the section to the author
- **No changelog inside any skill file.** Do not add a `## Changelog`, `## Version history`, or `v1 (date) — ...` section to SKILL.md or to any reference file. Versioning belongs in git, not in the skill body — a changelog inside the skill becomes part of the system prompt every time the skill loads, burning tokens and adding zero value to the agent. The skill-builder's own changelog (visible at the bottom of its SKILL.md) is a deliberate exception for the meta-skill; do not propagate it to user-built skills. If the author asks "where do I record changes?", the answer is git commits + the parent repo's README — not the skill file.

Everything else (specific char counts, all-caps discipline, generalizability rules, anti-pattern catalogs, file structure validation) is in `skill-reviewer-eval`. Phase 4 catches anything missed here.

### Branching skills (Tier 3)

Write one branch fully before starting the next. Interleaving branches produces instructions that are grammatically coherent but logically inconsistent — the agent cannot tell which branch it is in.

Pattern:

```
Identify which case applies:
- If [condition A]: follow Section A
- If [condition B]: follow Section B
- If [condition C]: read references/[file].md

--- Section A: [Case A name] ---
[instructions for case A only]

--- Section B: [Case B name] ---
[instructions for case B only]
```

Map all branches before writing — uncharted Tier 3 skills collapse into overfitted Tier 2 skills.

---

## Phase 4 — Validate, auto-fix, surface gaps

Run the draft through `skill-reviewer-eval`, then attempt one round of mechanical auto-fixes, then surface any remaining issues that need the author's domain knowledge. The author sees a draft that has had its basic hygiene resolved before any conversation about substantive gaps.

The discipline: **hoist what's already there; do not invent.**

### 4a — Run skill-reviewer-eval

Invoke `skill-reviewer-eval` on the draft folder. Read the resulting plain-text report end to end. Note: total items, Critical fails, Important fails, Quality fails.

### 4b — Classify findings (mechanical vs domain-knowledge)

For each FAIL, decide which class it belongs to:

**Mechanical (auto-fixable)** — the fix can be derived from existing content in the skill, from a structural convention, or from the author's stated archetype/tier. No domain knowledge needed.

**Domain-knowledge (ask the author)** — the fix requires reasoning, examples, justification, or evidence the author has but the agent does not. Fabricating it produces plausible-sounding wrong content.

The principle: if the fix can be done by *hoisting, splitting, renaming, reformatting, or removing*, it is mechanical. If the fix requires *writing new substance*, it is domain-knowledge.

| skill-reviewer-eval finding | Auto-fix class | How to auto-fix |
|---|---|---|
| B1 folder kebab-case | Mechanical | Rename folder |
| B2 SKILL.md exact case | Mechanical | Fix filename casing |
| B3 frontmatter syntax | Mechanical | Fix YAML formatting |
| B4 folder/name mismatch | Mechanical | Rename folder to match `name:` |
| B5 file organization | Mechanical | Move files into `references/`, `scripts/`, `assets/` |
| B6 README.md present | Mechanical | Delete README |
| B8 broken markdown | Mechanical | Fix the syntax |
| D1 over 1024 chars | Mechanical | Trim to under limit |
| D3 first-person voice | Mechanical | Rewrite in third-person/imperative |
| D5 missing trigger conditions | Mechanical (if body has them) | Hoist from body's "Use when..." section |
| D6 no user phrases | Mechanical (if body has them) | Hoist quoted phrases from body |
| D7 missing file types | Mechanical (if file-specific) | Add file extensions from body |
| D8 XML brackets or claude/anthropic in name | Mechanical | Strip/rename |
| D9 frontmatter fields vs deployment target | Mechanical | Truly undocumented fields (`version`, `author`, `tags`): move into `metadata:` or remove. Claude Code extension fields on a skill meant to be portable: remove per Decision 7. Extension fields on a Claude Code-only skill are NOT a defect — leave them |
| D10 missing pushy-contextual pattern | Mechanical (if body has variants) | Hoist keyword variants + adjacent concepts |
| D11 no "When NOT to use" | Mechanical (if body has `unless requested` clauses) | Hoist negative scope to top |
| D13 invocation control mismatch | Mixed | Adding the field is mechanical once Decision 7 is answered; the policy itself (human-only? hidden from `/` menu?) is the author's one-line call — ask if Decision 7 was skipped |
| E8 references inlined in SKILL.md | Mechanical | Split content into reference files |
| E9 long reference, no TOC | Mechanical | Add TOC from section headings |
| E14 time-sensitive info | Mixed | Restructuring into an "old patterns" section is mechanical; deciding which variant is current is domain — ask if unclear |
| E16 environment assumptions | Mechanical | Qualify MCP tool names as `Server:tool` (server name is in the body or session), add install commands for named packages, fix backslash paths |
| E11 monolithic SKILL.md | Mechanical | Split per architecture decision from Phase 2 |
| Q3 chatty filler | Mechanical | Strip filler phrases |
| Q4 README/CHANGELOG inside skill folder | Mechanical | Move out of skill folder |
| Q5/C1 length wrong for archetype | Mechanical | Split or trim per archetype budget |
| Q9 reference files unorganized | Mechanical | Add headings, consistent format |
| Q11 copy-paste errors / placeholders | Mechanical | Remove leftover placeholder text |
| C2 workflow logic in reference file | Mechanical | Move workflow lines back to SKILL.md |
| C7 description length wrong for style | Mechanical | Same as D2 — trim or expand within range |
| C10 terminology drift | Mechanical | Pick one term, replace others |
| **D2 length range** | Mixed | If style is unclear, ask; if known, trim mechanically |
| **D4 unclear core function** | Domain | Author must clarify what skill does |
| **E1 missing why-clauses** | Domain | Cannot fabricate reasoning |
| **E2 caps without justification** | Domain | Cannot fabricate the reason |
| **E3 missing worked examples** | Domain | Cannot fabricate examples |
| **E4 overfitted examples** | Domain | Author judges generalization |
| **E5 missing output format** | Domain | Author defines format |
| **E6 missing error handling** | Domain | Author defines behavior on errors |
| **E7 unaddressed edge cases** | Domain | Author names edge cases |
| **E10 undocumented scripts** | Domain | Author documents scripts |
| **E12 overfitted instructions** | Domain | Author re-generalizes |
| **E13 missing skill handoffs** | Domain | Author chooses which skills to call |
| **Q1 not real repeated need** | Domain | Author rethinks scope |
| **Q2 ambiguous instructions** | Domain | Author resolves ambiguity |
| **Q6 instruction exceeds capability** | Domain | Author scopes back |
| **Q8 detail level off** | Domain | Author calibrates |
| **Q10 doing too many things** | Domain | Author splits the skill |
| **Q12 missing context** | Domain | Author provides domain context |
| **Q13 vague anti-patterns** | Domain | Author names specific failures |
| **Q14 no eval evidence** | Domain | Author runs evals |
| **E15 option menu, no default** | Domain | Author picks the one default + escape hatch |
| **S1–S8 safety issues** | Domain | Author resolves intent |
| **S9 over-broad allowed-tools** | Mixed | Narrowing a grant to match what the body actually runs is mechanical; removing a grant with no matching body step needs the author's confirmation |
| **C4 overfitted** | Domain | Same as E12 |
| **C5 example mismatch** | Domain | Same as E4 |
| **C6 output format inconsistent** | Domain | Same as E5 |
| **C8 contradictions** | Domain | Author reconciles |
| **C9 vague error handling** | Domain | Same as E6 |
| **C11 unjustified conviction** | Domain | Same as E1/E2 |
| **C12 vague borrowed authority** | Domain | Author names the source |

### 4c — Apply mechanical auto-fixes

Apply every mechanical fix from 4b's classification. Be conservative — when in doubt, treat a finding as domain-knowledge and ask the author rather than risk fabricating.

For each auto-fix applied, log one line: `[item ID] auto-fixed: <what was done>`.

### 4d — Surface domain-knowledge gaps to the author

For every Critical or Important fail classified as domain-knowledge, write a specific question for the author. Do not paraphrase the rule — quote what the rater said and ask the targeted question.

Format:

```
ITEMS NEEDING YOUR INPUT
────────────────────────

[E1] The rater flagged ~12 rules in references/color.md as missing the reasoning behind their thresholds.
     Question: For the "saturated accent under 2–5%" rule, what is the underlying reason? (research source, observed failure mode, design principle?)
     Apply: The agent will add the reason inline as "— because [your reason]".

[E3] The rater flagged the absence of any worked example.
     Question: Can you provide one input → output example showing the skill in use? Even a sketch is enough.
     Apply: The agent will format it per the skill's archetype convention.

[Q14] The rater flagged no measurement evidence for the skill's claims.
     Question (optional): Is there an A/B comparison or benchmark you'd like documented? If not, the agent will leave a placeholder noting "eval evidence pending".
```

Group questions by category. Do not exceed ~6 questions at a time — pick the highest-leverage Critical + Important items. The rest can be addressed in a follow-up pass.

### 4e — Re-run skill-reviewer-eval

After auto-fixes are applied (4c) and before presenting to the author, re-run skill-reviewer-eval on the updated draft. Confirm:

- Mechanical fixes landed (the corresponding items now pass)
- No regressions (no previously-passing items now fail)
- Score moved up

Report the before/after scores and the open domain-knowledge questions to the author.

### Notes on the discipline

- **No fabrication.** If the agent does not have the answer, it asks; it does not guess. Inventing why-clauses, examples, or thresholds the author did not provide is the failure mode this phase exists to prevent.
- **The rater is the source of truth.** If a rule from this skill conflicts with skill-reviewer-eval, skill-reviewer-eval wins.
- **Document deviations.** If a skill-reviewer-eval finding is genuinely wrong for the skill at hand (archetype edge case, intentional spec deviation), record the deviation in the skill body so future raters and authors see the rationale — don't silently ignore.

---

## Phase 5 — Package and Present

Assemble the final folder:

```
[skill-name]/
├── SKILL.md
└── references/           (only if reference files were created)
    ├── [file-1].md
    └── [file-2].md
```

Quick structural check before presenting:

- Folder name is kebab-case and matches the `name:` field exactly
- No README.md, CHANGELOG.md, dev-notes, or human-facing files inside the skill folder
- No content files at the root alongside SKILL.md (everything else in subdirectories)
- **No embedded changelog inside SKILL.md or reference files.** Run: `grep -in "changelog\|^## v[0-9]\|^# v[0-9]\|^v[0-9].*— " <skill-folder>/SKILL.md <skill-folder>/references/*.md`. Output must be empty. Changelogs inside skill files become part of the system prompt every load — burning tokens, adding no value to the agent, and a recognizable noob tell. Version history belongs in git, not in the skill body.

(These are skill-reviewer-eval B1, B4, B6, Q4 plus the changelog check — should already have passed in Phase 4, but worth a final eyeball.)

Present the skill with a brief summary:

- What the skill does
- Trigger conditions (3–5 phrases from the description)
- Archetype + Tier
- skill-reviewer-eval score (from Phase 4)
- Any open items (Important fails the author declined to fix, with reason)

If the user wants to test before finalizing, walk through 2–3 representative test cases inline — read SKILL.md, follow its instructions for the test case yourself. Note gaps.

---

## Phase 6 — Behavioural gate (skill-test)

Phase 5 confirms the skill is well-FORMED. Phase 6 confirms it is well-BEHAVED — that it
actually changes output for the better, not just that it reads correctly.

After packaging, invoke `skill-test` on the freshly-built skill folder. skill-test will:
1. classify the skill + suggest type-tailored test cases,
2. ask the author to confirm/edit which cases to run,
3. run each case three ways — WITH the new skill / WITHOUT any skill / WITH the prior
   version if one exists,
4. emit a no-label blind HTML viewer for the author to judge,
5. record the author's blind verdict.

Gate rule: a skill that wins or ties its no-skill baseline is cleared for use. A skill that
loses or shows no measurable lift goes back to Phase 2/3 (the evaluator-optimizer loop;
cap the loop at a max iteration count + the author's call as the circuit-breaker).

(optional — if the author opts out for a trivial skill, mark Phase 6 [~] with a one-line
reason. The opt-out must be explicit; silent skip is the failure mode the tracker prevents.)

---

## Handling scope creep

If during Phases 3–4 the skill grows beyond its stated scope (new cases emerge, the user adds requirements), stop and return to Phase 2.

Do not absorb scope changes mid-write. Every scope change changes the architecture. Writing instructions for an architecture that no longer matches the skill produces the worst kind of failure: instructions that are individually correct but collectively incoherent.

---

## When to read which reference

| Reference | Read when |
|---|---|
| `references/architecture-guide.md` | Phase 2 (always); also Phase 3 if branching architecture needs revisiting |
| `skill-reviewer-eval` (companion skill) | Phase 4 (always); also Phase 3 if a specific rule needs lookup |

The references are one hop deep. Do not chain through them.

## House defaults (Kriss's system — apply to EVERY skill built, 2026-07-02)

Non-negotiable defaults for any skill authored on this machine. These exist because the 2026-07-02 audit measured a 38k-char description tax and weeks of doc drift; the builder is where both get prevented.

1. **Description budget: ≤450 characters.** The description is a ROUTER, not documentation: what it does (1 sentence), trigger phrases (verbatim), when NOT to use (1 clause). All workflow detail belongs in the body. Wrap in double quotes, single line.
2. **Progressive disclosure at ~200 lines.** A body heading past ~200 lines moves its reference material (canons, templates, worked examples, per-mode procedures) into `references/*.md` files the body points to. The body keeps only the workflow spine.
3. **Never restate the operator contract.** A Claude OS skill cites `substrate/shared/operator-contract.md` (current version) for locks, tiers, ceilings, verify-done, card format — it never copies the numbers. Copied numbers rot (the "prep to 3" incident class).
4. **Retired-token check.** Before finishing, grep the draft for the officiator's retired-token list (currently: action-plan.md, review-queue.md, heartbeat.md, backlog-of-3, /morning, /end-of-day, launchd nightly, contract v0.3). Any hit = stale concept; fix before install.
5. **Overlap gate (E5).** Before creating, list existing skills whose triggers could claim the same phrase; disambiguate in BOTH descriptions or merge instead of adding.
6. **No dashes as punctuation** in any prose the skill will emit on Kriss's behalf (his hard rule); write around it with commas, periods, parentheses.
7. **Scenario walk before shipping (Kriss 2026-07-10).** Before any skill/system change is declared done, walk: the partial case (one item/one leg — does it scale down?), the empty case, the overload case, the failure path (fail open or closed — deliberately), and the displaced consumers (what implicitly relied on the old behavior and stops happening?). Handle the cheap ones, flag the trades, never leave one unexamined.
8. **Modes over siblings.** If the new capability is a variant of an existing skill's job (a new lens, cadence, or target), prefer adding a MODE + reference file to that skill over a new sibling skill (the observer-family consolidation precedent).
