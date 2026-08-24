---
name: skill-test
description: "Behavioural blind test proving a skill actually improves output: runs real tasks WITH the new skill, WITHOUT any, and WITH the prior version, then emits a no-label blind HTML viewer so the author judges blind. Triggers: test/blind-test/A-B/taste-test a skill, does this skill actually work, measure its lift. Also the final behavioural gate of skill-builder. Not static structure scoring (skill-reviewer-eval)."
---

# Skill Test

## CRITICAL — invoke this skill immediately on trigger

When a trigger phrase from the `description:` field appears in a user message → invoke this skill via the Skill tool BEFORE any other response about the skill test. Don't paraphrase its workflow in chat or reinvent its logic. This is the SF2 invoke-on-trigger convention (same shape as `/claude-os` and `/operators`); the officiator weekly audit verifies this preamble is present, and a missed trigger is a flagged finding.

A skill can score 9 out of 10 on the static rubric and still produce zero measurable lift over no skill at all. Pure placebo passes a structure review. This skill answers the question the static review cannot: does the skill actually change behaviour for the better, on real tasks, judged blind.

It does that by running the same real task three ways, stripping the labels, and making the author pick the better output without knowing which arm produced it. The author cannot fool himself if he cannot see which one is "his" skill.

## Where this sits in the skill pipeline

Three skills, three different questions. This is the third leg:

| Skill | Question it answers |
|---|---|
| `skill-builder` | How do I build a skill? (process) |
| `skill-reviewer-eval` | Is this skill well-formed? (static 67-item rubric) |
| `skill-test` (this) | Does this skill actually work better? (live blind A/B/C) |

`skill-reviewer-eval` reads the skill's text and rates its structure. `skill-test` runs the skill on real tasks and measures the output delta. They are complementary and neither replaces the other. Run the static rubric first (cheap, catches malformed skills before you waste a test run), then run this.

## Inputs this skill needs

Resolve these before running. Pull from the conversation first, ask only what is missing:

1. **The candidate skill folder** (path to the skill being tested, the freshly-built or freshly-changed one).
2. **Does a prior version exist?** If this is a change to an existing skill, the prior version is Arm C. If brand-new, there is no Arm C. Check git history or ask the author for the prior text. Why this matters: a new skill is tested against "no skill at all" (is it load-bearing?); a changed skill is also tested against its own prior version (is the change an improvement?). These are different baselines and you must not conflate them.
3. **The author as judge.** The win call is always the author's, made blind. This skill never lets an automated judge override the human verdict.

---

## Phase tracker: output this checklist BEFORE you start, and re-output it AT EVERY phase boundary

A blind test loses all its value the moment a label leaks, an arm is skipped, or the author sees which output is "his" before he picks. The failure mode is silent: a step gets dropped and the run still produces a plausible-looking result. The fix is loud tracking. Print this checklist verbatim at the start, then re-print it with updated status at each phase boundary.

```
SKILL-TEST PHASE TRACKER
[ ] Phase 0: Fit check (is blind-prose A/B/C valid for this skill, or N/A?)
[ ] Phase 1: Classify + suggest type-tailored test cases
[ ] Phase 2: Author confirms / edits the cases to run
[ ] Phase 3: Run each case three ways (A: new / B: none / C: prior), trigger eval + body eval kept separate
[ ] Phase 4: Emit no-label blind HTML viewer
[ ] Phase 5: Record author's blind verdict, reveal, then loop + save regression floor
```

Rules:

1. **Print before starting.** First action is printing this checklist with all boxes empty.
2. **Tick as you go.** Mark `[x]` and re-print the whole list at each phase boundary. Do not just say "Phase 3 done"; show the list.
3. **Never skip the blind step.** Emitting a labelled comparison, or telling the author which arm is which before he picks, voids the test. If Phase 0 marks blind-HTML N/A, that is the one allowed exception and it must be explicit, marked `[~]` with the adapted method named.
4. **If a phase is intentionally N/A** (for example, no prior version means Arm C is N/A, not skipped silently), mark it `[~]` with a one-line reason instead of `[x]`.

---

## Phase 0: Fit check

Not every skill produces output that fits a blind side-by-side prose comparison. Decide the method before running, because forcing the wrong method produces a confident but meaningless verdict.

Decide which case applies:

- **Blind-prose-A/B/C fits.** The skill's output is text, markup, a document, code, a design, or anything renderable that a human can compare side by side. Proceed to Phase 1 with the full blind-HTML protocol. This is the default and the common case (UI skills, writing skills, code-review skills, reference skills).
- **Blind-prose-A/B/C does NOT fit.** The skill's primary output is an action or artifact that is not a single comparable surface: a git workflow whose output is a branch plus screenshots, a skill that sends messages, a skill that orchestrates a multi-file deploy, a skill whose value is "it did the thing" rather than "it produced this text". For these, mark the blind-HTML phase `[~]` and adapt:
  - Compare the *trace* (what the skill did, step by step) across arms instead of a final rendered surface.
  - Use a checklist verdict (did the skill produce the branch / take the right steps / avoid the named failure) rather than a blind aesthetic pick.
  - Be honest with the author: say "blind-prose tasting is N/A for this skill type because its output is X; here is the adapted comparison instead." Do not fake a blind HTML page for output that cannot meaningfully be judged blind.

Read `references/methodology.md` before proceeding. It covers the baseline logic, the trigger-vs-body split, and the pyramid levels that ground every later phase.

State the fit decision, then continue.

---

## Phase 1: Classify the skill and suggest type-tailored test cases

The test cases must be tailored to what kind of skill this is. A test case good for a UI skill is useless for a reference skill. Classify first, then suggest.

Classify the skill using the same archetypes `skill-reviewer-eval` uses (read its Step 0.5 if unsure): Reference / runbook, Aesthetic / judgment, Workflow / methodology, or Hybrid.

Then read `references/testcase-templates.md` and propose type-appropriate cases from it. The templates cover UI skills, writing skills, code/workflow skills, and reference skills.

Two rules when suggesting:

- **Split trigger cases from body cases.** These have independent failure modes and get separate test sets and separate verdicts. Why: a skill can have a perfect body that never fires (description problem) or fire perfectly but add no lift once it does (body problem). Conflating them hides which half is broken.
  - **Trigger eval.** Does the skill fire when it should and stay silent when it should not? Test set = positive cases (should fire) + near-miss negative cases (superficially similar, should NOT fire) + edge cases (indirect or multi-skill-overlap). This is a function of the description only.
  - **Body eval.** Once fired, is the output actually better? This is the blind A/B/C quality comparison. A function of the body.
- **Reject trivial cases.** Do not suggest cases so simple that any skill or no skill produces the same output ("format this list", "extract the text"). A useful case is substantive enough that a skill could plausibly fail it. Why: a trivial case shows no delta between arms, so it cannot discriminate, so it wastes the run. Even a small suite of hard cases beats a large suite of easy ones.

Present the suggested cases grouped as trigger cases and body cases.

---

## Phase 2: Author confirms or edits the cases

The author picks. Present the suggested cases and let the author add, cut, or rewrite them before anything runs. Why the author and not the skill: the author knows which real tasks matter and which would embarrass the skill; the suggestion is a starting menu, not the final set.

Lock the confirmed case list before running. Do not add cases mid-run; a moving test set makes the verdict unattributable.

---

## Phase 3: Run each case three ways

For each confirmed body-eval case, run it through all applicable arms:

- **Arm A, WITH the new skill** (the candidate).
- **Arm B, WITHOUT any skill** (the universal baseline; isolates "is the skill load-bearing at all?"). Always present.
- **Arm C, WITH the prior version** (only if a prior version exists; isolates "is the *change* an improvement?"). Mark `[~]` N/A for a brand-new skill.

Hold one variable per arm. Why: changing both the description and the body in one iteration and then comparing leaves you unable to say which change caused the delta. When evaluating a change, Arm C holds everything else constant so the only difference is the version.

Run mechanics:

- Spawn a sub-agent per arm per case (use the Task tool, in the same session, no API key required). Give each sub-agent the identical task prompt; the only difference between arms is which skill text (if any) is loaded into that agent's context.
- Collect each arm's raw output verbatim. Do not edit, summarize, or "clean up" outputs; the comparison must be of what the skill actually produced.
- Run the trigger-eval cases separately: for each, record whether the skill fired (or correctly stayed silent), a pass/fail per case, not a blind aesthetic pick.

If an arm errors or a sub-agent fails to produce output, record the failure for that cell and continue with the arms that succeeded. Note the gap in the viewer rather than silently dropping the case.

---

## Phase 4: Emit the no-label blind HTML viewer

Read `references/html-viewer.md` and build the viewer from the template there.

The viewer must:

- Show, per case, all applicable arms side by side.
- **Strip every arm label.** No "Arm A", no "with skill", no "prior version", no ordering that hints (shuffle arm order independently per case so position carries no signal). Why: any leaked label biases the judge toward the skill he built; the entire value of the harness is removing that bias.
- Keep the reveal mapping (which column was which arm) hidden until after the author records a pick. The mapping lives in the page but is not shown until the author clicks reveal or records the verdict.
- Save to `~/.claude/skill-test-runs/<skill-name>-<date>/index.html` and open it with `open`.

Optionally, run a Level-3 LLM-as-judge pre-pass that flags interesting or divergent traces for the author's attention. This only surfaces traces worth a closer look; it never produces the verdict. The win call stays with the author.

---

## Phase 5: Record the verdict, reveal, then loop and save the floor

1. **Author judges blind.** The author picks the better output per case and an overall winner, before any reveal. Record the picks.
2. **Reveal.** Only now show which column was which arm. Report the result plainly: did Arm A (the new skill) win, tie, or lose against Arm B (no skill) and Arm C (prior version)?
3. **Gate rule.** A skill that wins or ties its no-skill baseline (Arm B) is cleared. A skill that loses to no-skill, or shows no measurable lift, goes back to `skill-builder` Phase 2 or 3 (the evaluator-optimizer loop: `skill-builder` is the optimizer, this skill is the evaluator). Cap the loop at a small max iteration count plus the author's call as the circuit-breaker. Why the cap: an uncapped optimize-and-re-test loop is the most dangerous failure mode in eval work; it can churn indefinitely chasing a verdict that will not move.
4. **Save the regression floor.** Save the winning cases and their outputs as the skill's regression suite under the run folder. Why: a future edit that silently breaks what worked is caught by re-running this skill against the saved floor. This is what makes the test re-runnable on every later change rather than a one-shot.

Report to the author: the per-case picks, the overall verdict, the gate decision (cleared / send back to skill-builder), and where the regression floor was saved.

---

## When to read which reference

| Reference | Read when |
|---|---|
| `references/methodology.md` | Phase 0 (always): baseline logic, trigger-vs-body split, pyramid levels |
| `references/testcase-templates.md` | Phase 1 (always): per-archetype case sets |
| `references/html-viewer.md` | Phase 4 (always): the no-label viewer template and build steps |

The references are one hop from this file. Do not chain through them.
