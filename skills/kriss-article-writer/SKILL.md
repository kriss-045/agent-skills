---
name: kriss-article-writer
description: "End-to-end article writing in Kriss's voice: gather inputs, outline on one of his seven structures, PAUSE for sign-off, research, draft via kriss-writing-style, silent QA polish. Triggers: write an article about, I have an idea for a post/piece, turn my notes/brain dump into an article, draft an article. Not for polishing a finished article, short voice rewrites (kriss-writing-style), or design portfolio case studies (case-study-writer)."
---

# Kriss's Article Writing Workflow

## CRITICAL: invoke this skill immediately on trigger

When a trigger phrase from this skill's `description:` field appears in a user message, invoke this skill via the Skill tool BEFORE generating any other response about the task. Don't paraphrase or reinvent its workflow in chat. This is the SF2 invoke-on-trigger convention; the officiator weekly audit verifies this preamble is present, and a missed trigger is a flagged finding.


This skill drives the full process from raw idea to polished draft. Follow the steps **in order**, pausing only where Step 1b says to. Voice, structure, anti-patterns, and the QA checklist are not duplicated here, they live in the **`kriss-writing-style`** skill and in `references/draft-qa-checklist.md`. Keep this file about *process*; let those own *how Kriss sounds* and *how to audit a draft*.

The two non-obvious things this workflow gets right, both learned from a failed draft: it commits to **one sustained metaphor family** and it runs a real **second pass** (draft, then silently revise and polish) instead of shipping the first draft.

---

## Quick routing

| Kriss provides... | Start at... |
|---|---|
| A raw idea or brain dump | Step 0 (normal entry) |
| A brain dump + a pre-written outline | Step 1, confirm the structure, then the pause |
| An outline + sources already gathered | Step 2 |
| A finished draft needing polish | Wrong tool. Offer to edit directly with `kriss-writing-style`. |

---

## Step 0: Gather inputs

You need: **the idea/spark** and **the brain dump** (his raw thoughts). If either is missing, ask before proceeding. Also ask: **"What's the target length and where's it going?"** (short ~600w, medium ~1200w, long ~2000w+; Medium, LinkedIn, newsletter). Length sets how many sections, but remember: length tracks importance, not how long the brain dump rambled.

**Thin brain dump check:** if the dump is under ~150 words or has fewer than 2 to 3 distinct points, don't proceed. Say: "Your brain dump is pretty sparse and I want the outline to reflect your actual thinking. Can you expand on 2 to 3 points? A concrete example, a strong opinion, or something you've noticed that makes this interesting to you." Wait for the expansion.

---

## Step 1: Build the outline (and privately pick the metaphor)

Read the brain dump. Pull the core argument, the key points, the examples and opinions he already has.

**1a. Pick the structure.** Read `kriss-writing-style/references/structure-patterns.md` and choose the one of his seven structures the material is already leaning toward (Anecdote-Listicle, Question-Ladder, Named-Character Parable, Bait-and-Switch Essay, Stat-Shock Case Breakdown, Single-Insight Reframe, Mood-Arc Pep Talk). Don't force one. If two fit, pick the signal that appears earliest in the dump. If unsure, default to Anecdote-Listicle (a set of points) or Single-Insight Reframe (one idea).

**1b. Privately pick the metaphor family.** Decide the single metaphor domain that fits the whole piece (cardinal rule 6) and roughly where it lands. This is **internal**, do NOT put it in the outline or mention it at the pause; it only makes sense once Kriss reads the finished article, and the QA pass verifies it later.

Present the outline in the format at the end of `structure-patterns.md`: structure chosen + why, a placeholder working title (the real title is written after the draft), sections with the signature move that carries each, and the one-sentence core takeaway. Do not list the metaphor family.

---

## Step 1b PAUSE: get sign-off on the outline

After presenting the outline, say:

> "Here's the shape I'm thinking. Does this feel right? Anything to cut, add, or reorder? Once you're happy with it, I'll write the draft."

**Wait for Kriss's response.** Never skip this pause. Incorporate his changes, then confirm you're moving on. (Do not surface the metaphor choice here.)

---

## Step 2: Research and place the metaphor *(optional, scale to the piece)*

Skip or shrink this for short personal/opinion pieces that don't need external sources; say so rather than padding.

- **Research (if the piece needs it):** find 3 to 6 strong sources that genuinely strengthen a point. Don't pad to a number. If web search is unavailable, tell Kriss immediately and ask if he has sources, or proceed and flag where citations would help. Never invent citations.
- **Metaphor placement:** the family is already chosen (Step 1b). Map which section draws from it where, so every analogy in the piece comes from that one domain (signature move #7). If you genuinely can't find one family that covers the piece, the structure is too scattered, tighten it before drafting.

Hold this as an internal section map (structure + sources + where the one metaphor lands). Don't make placement decisions at draft time.

---

## Step 3: Write the draft

**Load the `kriss-writing-style` skill now and follow it.** At minimum read its `references/signature-moves.md`, `references/voice-tone-and-rhythm.md`, and `references/anti-patterns.md` in full before writing a sentence. The cardinal rules (no dashes, one metaphor family, keep the energy up, pay off every promise, leave the reader room, strong hook on every section, the "could a generic AI have written this" gate) all live there.

Then:
- Open the article AND **every section** on a real hook, never a meta-transition.
- Run the one metaphor family throughout, extended and called back in the close.
- Make each point, ground it in one example, move on. Don't circle back or pad; length tracks importance.
- Use a bullet or numbered list wherever the reader has to hold a set of parallel items (bullet-as-title plus a line each).
- Add two or three signature moves where the material invites them. Don't chase a quota; stacking them reads as try-hard.
- **Leave the title for Step 4.** Don't lock a title onto an unfinished draft.

---

## Step 4: Silent draft-QA and polish (the second pass)

This is the rewrite-and-polish pass real writing always needs. It is **silent**: Kriss sees only the polished result, not this pass or the diff.

1. Read `references/draft-qa-checklist.md` in full.
2. Work through **every** item against the draft: the whole-article checks (metaphor unity, no repetition, length tracks importance, story progresses, differentiation gate), then the per-section checks on every section (hook, no AI-slop connectors, energy, framing paid off, point-then-example), then formatting (bullets, rhythm, zero dashes). Do not skip items because the draft "seems fine".
3. **Fix every failure in place.** Rewrite weak section openings, unify scattered metaphors, cut repetition and bloat, strip hype-tail connectors and negative-energy framing.
4. **Write the real title now**, from the finished content, against the four title rules in `structure-patterns.md`. Do the same for every section title.
5. Pass the **final gate**: read it cold as someone who knows Kriss, "could a generic AI have written this?" If there's doubt, return to metaphor and section hooks. Only continue when the answer is clearly "this is him."

---

## Step 5: Deliver and wait

Present the full polished draft as clean markdown. End with:

> "Here's the draft. Take a read and let me know your notes. I'll wait for your feedback before changing anything."

**Do not preemptively suggest edits, and do not append the "structure and moves used" callout** (it leaks the method and clutters the read). Deliver and wait.

---

## Step 6: Revise on feedback

1. **Assess scope.** Line edits, or structural? If structural (moving sections, changing the argument or opening), confirm first: "That shifts the structure, want me to revise the outline first, or rewrite the draft with that direction?"
2. **Reload `kriss-writing-style`** before rewriting any voice-heavy section. Don't rewrite from memory.
3. **Re-run the relevant parts of the draft-QA checklist** on anything you change, especially metaphor unity and section openings.
4. Present the revised draft as in Step 5, clean, no commentary unless he asks. End with: "Here's the revised draft. Let me know if there's anything else to adjust." Then wait.

**On rounds:** after 3+ full rewrites with still-substantial feedback, flag it: "We've done a few full passes. Want to revisit the outline before the next draft, or are we close and just refining?"

---

## Why the rules that matter, matter
- **Never skip the outline pause.** Cheapest place to redirect.
- **One metaphor family, chosen before drafting and verified after.** Scattered one-off metaphors are the top reason a draft reads like AI.
- **The silent second pass is not optional.** The first draft is never the deliverable. The QA pass is where weak openings, repetition, slop connectors, and title mismatches get caught, the exact failures that sank the earlier attempt.
- **Voice lives in the style skill, not your memory.** Reload it at every drafting and rewriting step.
