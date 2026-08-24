# Draft QA Checklist

The audit pass. Run this against a *complete* first draft, fix every failure in place, then deliver only the polished result. This is silent: Kriss sees the polished version, not the checklist or the diff.

This is not a light semantic pass. Work through every item the way a rater works through an eval: state the verdict to yourself, and where it fails, rewrite until it passes. Do not skip an item because the draft "seems fine." Many of these can only be judged now, on the whole draft, which is the entire reason this pass exists.

Each item ends with the rule file that defines the standard, so this checklist enforces, it does not redefine.

## How to run it
1. Read the whole draft once, top to bottom, as a reader would.
2. Run **Part A (whole-article checks)** first. These catch the failures that killed the earlier drafts and often force the biggest rewrites.
3. Run **Part B (per-section checks)** on every section, including the opening and the close.
4. Apply fixes as you go. After fixing, re-read any section you changed.
5. Finish on the **final gate**. If it fails, the draft is not done.

---

## Part A: Whole-article checks (run once, across the full draft)

These are impossible to judge section by section. They are the heart of this pass.

**A1. One sustained metaphor family.** Scan every analogy in the piece. Do they all come from ONE domain (one object, one world), extended and called back? Or is it a different unrelated metaphor per section (apartment, then kitchen, then car)?
  - Fix: pick the single best-fitting family for the article's subject, rewrite the others into that family, and call it back in the close. If the piece has almost no metaphor, that is also a fail, add a sustained one. (rule: `kriss-writing-style/references/signature-moves.md` #7; cardinal rule 6)

**A2. Metaphor presence.** Is there at least one strong, operated metaphor at all? A draft with zero is a fail, this is the element most missing when his writing reads like AI. (rule: signature-moves #7)

**A3. The story actually progresses.** Read the section openings in sequence. Does the piece move forward (each section advances the argument/arc), or does it restate the same point in new words? Cut or merge anything that doesn't advance. (rule: `anti-patterns.md` #10)

**A4. No cross-section repetition.** Is any single point made in two or three places? Keep the best instance, cut the rest. (rule: anti-patterns #10)

**A5. Length tracks importance, not the brain dump.** Does each section's length match how important the point is, rather than how long Kriss rambled about it in the notes? Tighten the bloated ones; a long rambling thought does not earn proportional space. Watch for one section ballooning while another is starved. (rule: voice-tone "earn its place"; anti-patterns #10)

**A6. Article title matches the whole piece.** Does the title relate to what the article actually says, its theme and its arc, not just a catchy line from the outline? Does the body pay off whatever the title promises (if the title implies a framing like "one word," the body must use it)? Rewrite the title from the finished content if not. (rule: `structure-patterns.md` titles; anti-patterns #8)

**A7. Metaphor theme appears in the close.** Does the ending call back the one metaphor family? If not, weave it in. (rule: signature-moves #7, #9)

**A8. The differentiation gate (also the final gate below).** Read it as a stranger. Could a generic AI have produced this? If yes, find what's generic (even paragraphs, no opinion, no sustained image, hedged transitions) and fix it. (rule: cardinal rule "the one test that matters"; anti-patterns #9)

**A9. The tagline audit (count them, do not eyeball this).** Physically count every short verdict line, one-line dramatic paragraph, and punchy button at the end of a section or list item. **The budget for the whole article is two or three.** If you find eight, or one at the end of every list item, the draft reads as marketing copy and Kriss will reject it on sight.
  - Fix: fold the reveals back into the sentences that carry them, move the jokes inside sentences instead of ending on them, and keep only the two or three snaps that fall at real peaks. Then check the headings: is any section heading engineered to sound quotable? Rewrite it plain. (rule: `anti-patterns.md` #11; voice-tone "ration them")

**A10. The register audit (sentence length + his own words).** Two mechanical checks:
  - **Length variance.** Scan a few paragraphs. Are the sentences all roughly the same medium length? If yes, the draft is in essay/reportage voice and it will read robotic no matter how good the content is. Rewrite toward long additive run-ons joined with and/but/so/which, with the occasional short one.
  - **Dump phrasings present.** Search the draft for phrasings lifted from Kriss's raw input. If none of his own language survived, the draft has been laundered into a stranger's summary of him. Go back to the dump, pull his live lines, and put them in. (rule: `anti-patterns.md` #12; voice-tone "mine his own words first")

**A11. No heading directly under the article title.** Does the first section carry its own heading? It should not. The opening runs straight from the article title into prose; a title stacked under a title is a tell Kriss calls out immediately. Delete it. (rule: `structure-patterns.md` titles)

---

## Part B: Per-section checks (run on EVERY section: opening, each body section, close)

For each section, top to bottom:

**B1. Strong hook on the first line.** Does the section open on a real hook (scene, concrete image, sharp claim, question, bait), or on a meta-transition / throat-clear ("This is the second thought, and it's connected" / "Let's explore" / "Building on that")? A weak first line is a fail even if the rest is good, it's the section's first impression. Rewrite the opening line. (rule: cardinal rule 10; anti-patterns #1, #2, #9)

**B2. No hype-tail or meta-narration.** Scan for sentences that state a thought then bolt on a hype/connector clause ("...and it's connected"), or narrate the structure of his thinking ("which brings me to," "as I mentioned"). Cut the tail; state the thought and go. (rule: anti-patterns #1, #2)

**B3. No cutesy-vague transitions.** Any phrase that sounds clever but doesn't parse on second read ("the thought that fell out of this one")? Rewrite it plain. (rule: anti-patterns #3)

**B4. Energy stays up.** Does the section open or turn on negative energy ("the thought I least wanted to have")? Reframe to raw-but-energetic ("I'd rather be honest"). Hot-take substance is fine; low-energy framing is not. (rule: cardinal rule 7; anti-patterns #4)

**B5. Every framing is paid off.** Does any label, promise, or emotional tag in this section get delivered by the content under it? Kill fabricated labels ("the uncomfortable part" over a non-uncomfortable take). (rule: cardinal rule 8; anti-patterns #5)

**B6. Section title (if any) passes all four.** The title relates to: (a) this section's actual content, (b) the article's overall theme, (c) where the story/argument has progressed to at this point, and (d) the article title. It states a belief, not a command ("What I'm actually telling myself" over "So pick your word"), and is concrete over vague-emotional ("What this does to your salary" over "The uncomfortable part: money"). Rewrite from content if any fail. (rule: structure-patterns titles; anti-patterns #8)

**B6b. Section title is a derivation, not a restatement, and carries a curiosity word.** Read the heading and ask: does it just announce what the section says? If a reader has no question after reading it, it is a stale label and it fails, even though it is accurate. Write the plain description, then change ONE word so there is something to wonder about ("using" → "overusing"; "The three ceilings I hit" → "I have already outgrown three setups"). Check the opposite failure too: a heading engineered to sound quotable is a marketing tagline and fails the other way (`anti-patterns.md` #11). Plain register, one curious word. Numbered list items inside a listicle are exempt; those stay plain advice labels. If Kriss supplied a title or a title direction himself, use his. (rule: `structure-patterns.md` "derive, then make them curious")

**B7. Point then example, no circling.** Does the section make its point, then ground it in one concrete example, and move on? Or does it state, example, then circle back and re-state? Straighten it: point → example → next. (rule: anti-patterns #10; voice-tone)

**B8. Concrete over abstract.** Is there at least one thing the reader can picture or do here, not just abstraction? If the section is all concept, add the concrete beat (ideally from the article's one metaphor family). (rule: cardinal rule 5; signature-moves #7)

**B9. Reader left room.** Does the section tell the reader what to conclude/feel, or state Kriss's belief and let them decide? Pull back any forcing. (rule: cardinal rule 9; anti-patterns #6)

---

## Part C: Formatting and rhythm (across the draft)

**C1. Bullets / numbered lists where they help.** Is there a spot presenting a set of parallel items, or a "here are N things" moment, where a numbered or bulleted list would help the reader hold it in their head? Use one there (bullet-as-title then a line of explanation, optionally grouped into categories, like his 12-mistakes article). Don't force a list where prose flows better. (rule: voice-tone formatting)

**C2. Sentence rhythm varies.** At least one long run-of-thought snapped shut by a short verdict line ("It is definitely possible."). Not every sentence the same medium length. (rule: signature-moves #10; voice-tone)

**C3. A few signature moves, not a pile.** Two or three moves deployed where the material invited them, not every move stacked (try-hard) and not zero (generic). (rule: signature-moves intro)

**C4. Dashes: zero.** Search the text for em or en dashes used as punctuation or asides. There must be none. (rule: cardinal rule 1)

**C5. Clean grammar, spoken cadence.** Correct English (no imitated ESL slips or typos), but it still reads like Kriss talking, not an essay. (rule: cardinal rules 2, 3; voice-tone)

---

## Part D: Story and flow (judgment, read it as a story, not a rule)

The deeper version of A3 (progression) and A5 (length), judged with taste, not a formula. Three blind reads confirmed a model can do this reliably, so do it properly instead of rubber-stamping.

First, read the whole draft straight through as a reader, not an auditor. Mark the one spot where your attention dipped, where you wanted to skim or skip ahead. That dip is the highest-priority fix; the checks below name why and what to do.

**D1. The skim spot.** Quote the section where attention most dips. Usual cause: it over-elaborates a point whose stakes don't justify the space, often the thread that rambled most in the brain dump (uncertainty inflated it, not importance). Compress it to its single strongest beat.

**D2. Arc, not a flat march.** Does the piece build: setup, rising stakes, a turn or peak, a landing? Graph the intensity beat by beat in your head; it should rise, peak, and release, not be a straight line of equal-weight points. A piece that lists points at one energy level is flat even if every point is good. Adapt to the chosen structure (the bait-and-switch's turn IS its peak, etc.).

**D3. Elaboration tracks dramatic weight, both directions.** Fix both failures: (a) a low-stakes section that DRAGS, compress it; (b) the real peak or turn that is RUSHED, give it room. A long section is correct ONLY when it is the peak. The pattern to hunt: the weakest section is the longest and the strongest is the shortest. Rebalance toward the peak. Do NOT equalize section lengths, a big section surrounded by small ones is right when the big one earns it.

**D4. Flow.** Does each beat hand off and build, or stall, repeat, or wander into a sidetrack? Cut the sidetracks, they are usually where you over-thought it in the notes.

**D5. Landing.** Does it resolve (a turn, a payoff, a reader hand-off), or just stop?

Fix the specific weak beat you found and move that space to the peak. Apply taste. Do NOT churn the sections that already work.

---

## Final gate (must pass to deliver)

Read the polished draft once more, cold, as someone who knows Kriss. Ask the one question: **does this read distinctly like him, or could a competent AI have written it?** If there is any doubt, it is not done, return to A1 (metaphor) and B1 (section hooks), which are the two highest-leverage fixes. Only deliver when the answer is clearly "this is him."
