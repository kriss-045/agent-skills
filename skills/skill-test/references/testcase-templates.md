# Test-case templates by archetype

Per-archetype starting menus for Phase 1. Classify the skill first, then pull the matching block. These are suggestions for the author to confirm or edit in Phase 2, not a fixed script. Every block carries both trigger cases (does it fire?) and body cases (is the output better once it fires?).

## Table of contents

1. The anti-trivial gate (applies to all archetypes)
2. UI / aesthetic skills
3. Writing skills
4. Code / workflow skills
5. Reference / runbook skills
6. Trigger-case patterns (shared across archetypes)

---

## 1. The anti-trivial gate (applies to all archetypes)

Before suggesting any case, reject ones that are too easy to discriminate. A case where every arm produces the same output proves nothing: there is no delta to judge. Reject cases like "format this list", "extract the text from this", "rename these files". Why: a skill earns its place by changing output on tasks where output could plausibly go wrong. A case that any baseline nails is a case that cannot show lift. Prefer fewer hard cases over many easy ones.

A good case is one where you genuinely cannot predict in advance whether the skill helps.

---

## 2. UI / aesthetic skills

Body cases (vary the component type so the skill cannot overfit to one shape). This mirrors the kriss-ui A/B matrix.

- A metrics dashboard card (number, label, trend).
- An empty state for a list view.
- A full SaaS dashboard screen.
- A marketing one-pager hero section.
- A dense data table with filters.

For each, the task prompt is identical across arms ("design X"); only the loaded skill differs. Judge blind on visual quality, hierarchy, and polish.

---

## 3. Writing skills

Body cases (vary topic, length, and tone so the skill is tested across registers, not one comfortable lane).

- A short punchy announcement.
- A long-form explainer on a technical topic.
- A persuasive piece with a clear stance.
- A piece in a constrained voice (formal, or deliberately plain).

Judge blind on clarity, voice, and whether the piece reads as written by a person rather than generic model output.

---

## 4. Code / workflow skills

Body cases (vary the scenario, and include at least one seeded defect to see whether the skill surfaces it).

- A routine task in the skill's domain (the happy path).
- A task with a subtle planted bug or smell the skill should catch.
- A task that overlaps an adjacent concern, to see whether the skill stays in scope.
- An edge-case input (empty, malformed, or unusually large).

Judge blind on correctness, whether the planted defect was caught, and whether the steps were sound.

For genuinely action-shaped workflow skills (the output is a branch, a deploy, a sent artifact rather than a comparable surface), this is where Phase 0 likely flags blind-prose A/B/C as N/A. Compare the trace and use a checklist verdict instead.

---

## 5. Reference / runbook skills

Body cases (retrieval-accuracy and how-to fidelity).

- A question whose answer is in the reference material (does the skill retrieve it accurately?).
- A how-to task the runbook covers (does the agent follow it correctly?).
- A question adjacent to but outside the reference (does the skill avoid fabricating an answer?).

Judge blind on factual accuracy and faithfulness to the source material.

---

## 6. Trigger-case patterns (shared across archetypes)

Trigger cases test the description, not the body. Build three groups for any skill:

- **Positive.** 3 to 5 phrasings a user would actually say that should fire the skill. Vary the vocabulary; do not just paraphrase the description back.
- **Negative near-miss.** 2 to 3 phrasings that are superficially similar but should NOT fire (an adjacent skill's territory, shared vocabulary). This is where over-triggering surfaces.
- **Edge.** Indirect mentions, requests where two skills could both plausibly fire, and proactive-state triggers if the skill has them.

Verdict per trigger case is pass/fail (fired correctly / stayed silent correctly), recorded separately from the body-eval blind picks.
