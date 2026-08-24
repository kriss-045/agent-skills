# Methodology

The reasoning behind the harness: why three arms, why the trigger/body split, and where this sits on the eval pyramid. Read this in Phase 0 before running anything.

## Table of contents

1. The three arms and what each isolates
2. One variable per arm
3. Trigger eval versus body eval
4. The eval pyramid and who judges
5. The loop and the regression floor
6. Why this is the missing third leg

---

## 1. The three arms and what each isolates

Source: the AI wiki note `eval-discipline-for-ai-instructions.md` ("Baseline selection"), plus Kriss's own kriss-ui A/B run (decisions log, 2026-06-03), which compared kriss-ui against no-skill against a sibling skill.

- **Arm A, WITH the new skill.** The candidate under test.
- **Arm B, WITHOUT any skill.** The universal baseline for a new skill. It isolates one question: is the skill load-bearing at all, or would the model produce the same output unaided? A skill that cannot beat Arm B is a placebo no matter how good its static rubric score.
- **Arm C, WITH the prior version.** Only present when the skill is a *change* to an existing skill. It isolates a different question: is the change an improvement over what was already there? A new skill has no Arm C.

The two baselines answer two different questions. Do not collapse them. "Beats no skill" and "beats the previous version" are independent verdicts, and a change can pass one while failing the other (for example, a rewrite that still beats no-skill but is worse than the version it replaced).

## 2. One variable per arm

The named mistake in the source note: changing both the description and the body in one iteration, then having no way to tell which change caused the difference in output. Hold everything constant except the one thing under test.

- When testing a brand-new skill, the variable is "skill present versus absent" (A versus B).
- When testing a change, Arm C holds the rest of the world constant so the only difference between A and C is the version. That is what lets you attribute the delta to the change rather than to noise.

## 3. Trigger eval versus body eval

These are separate evals with separate test sets and separate verdicts, because they have independent failure modes.

- **Trigger eval** is a function of the `description` field only. Question: does the skill fire when it should, and stay silent when it should not? Test set:
  - **Positive cases.** Phrasings that should fire the skill.
  - **Negative near-miss cases.** Phrasings that are superficially similar but should NOT fire (adjacent skills that share vocabulary). This is where over-triggering shows up.
  - **Edge cases.** Indirect mentions, multi-skill overlap, proactive-state triggers.
  Verdict is pass/fail per case, not an aesthetic comparison.

- **Body eval** is a function of the body. Question: once the skill has fired, is the output actually better? This is the blind A/B/C comparison.

Why separate them: a skill can have an excellent body that never fires (the description is too narrow or too vague), or fire reliably but add nothing once it does (a bloated body with no lift). One combined verdict hides which half is broken, so you cannot fix the right thing.

## 4. The eval pyramid and who judges

Source: `eval-pyramid.md`. The relevant levels here:

- **Level 3, LLM-as-judge.** An automated model can pre-score outputs to surface interesting or divergent traces for the author's attention. Useful as a spotlight, never as the verdict. It is cheap and it scales, but it inherits the same blind spots as the skill being tested.
- **Level 4, human judgment.** The gold standard for the subjective quality dimension. For this harness the win call is always the author's, made blind. The Level-3 pre-pass may point him at traces worth a closer look; it does not decide.

The blind condition is the load-bearing part. A non-blind human judge will favour the output he knows is "his" skill. Stripping the labels is what turns "it seems to work" into a verdict he can trust.

## 5. The loop and the regression floor

Sources: `evaluator-optimizer-loop.md`, `regression-eval.md`.

- **The loop.** A skill that loses to or ties no-skill goes back to `skill-builder` to be improved, then re-tested. `skill-builder` is the optimizer; this skill is the evaluator. The loop must be capped at a small max iteration count plus the author's explicit call to stop. An uncapped optimize-and-re-test loop is the most dangerous failure mode named in the source notes: it can churn indefinitely, chasing a verdict that will not move, burning runs.
- **The regression floor.** The winning cases and their outputs are saved as the skill's regression suite. A later edit that silently breaks what previously worked is caught by re-running this harness against the saved floor. This is what makes `skill-test` a re-runnable gate on every future change, not a one-time ceremony.

## 6. Why this is the missing third leg

`eval-discipline-for-ai-instructions.md` names the single largest gap in community skills: most skills, including the most-starred ones, never run an eval. They stop at "it seems to work in the cases I tried." `skill-builder` builds the skill and `skill-reviewer-eval` confirms it is well-formed, but neither proves it changes behaviour. This harness closes that gap with a measured, blind A/B/C verdict.
