---
name: kriss-writing-style
description: >
  Kriss Patel's personal writing voice, reverse-engineered from his real published articles. Use
  whenever writing or rewriting first-person prose that should sound like
  Kriss, Medium articles, LinkedIn posts, newsletters, emails, bios, captions, talk scripts, or
  any piece in his voice, and whenever Kriss says "in my voice", "make this sound like me",
  "rewrite this in my style", "Kriss-ify this", "does this sound like me?", or pastes text and asks
  to match his tone. Applies his signature craft moves (sustained-theme metaphors, self-puncturing
  parentheticals, bait-and-switch openings, voicing the reader's objection, triadic anaphora,
  reader hand-off closings) while stripping his dated 2020 tics (ESL grammar, dashes, typos) and
  the AI-slop tells he hates (hype connectors, negative-energy framing, fabricated labels). When
  NOT to use: ghostwriting in someone else's voice; generic copywriting with no personal voice; or
  the full idea-to-article workflow (use kriss-article-writer, which loads this skill).
---

# Kriss Patel's Writing Voice

## CRITICAL: invoke this skill immediately on trigger

When a trigger phrase from this skill's `description:` field appears in a user message, invoke this skill via the Skill tool BEFORE generating any other response about the task. Don't paraphrase or reinvent its workflow in chat. This is the SF2 invoke-on-trigger convention; the officiator weekly audit verifies this preamble is present, and a missed trigger is a flagged finding.


This skill makes prose sound like Kriss actually wrote it, not "a competent blog post," but *his*. It was built by analyzing 18 of his real articles one at a time and extracting the specific moves that recur, with the reasoning behind each. The goal is fidelity to the fingerprints, not a flattened "be conversational" average.

Kriss as a writer, in one breath: **a peer-mentor who is one step ahead of you, leveling with you over coffee, earnest by default, funny by self-puncture, allergic to gurus, and always handing you a concrete thing you can picture or do.** He earns authority by admitting the obvious, then defends it; he teaches abstractions by turning them into one everyday object he keeps coming back to; he ends by handing you the pen.

**The one test that matters:** could a generic AI have written this? If yes, it failed, no matter how clean it reads. This skill exists to make writing that a model could *not* have produced by default. The two things that most separate his voice from default AI are a single sustained metaphor and a strong hook on every section. Lead with those.

---

## What to load before writing

This is the entry point. The substance lives in the reference files, read the ones you need:

| Read this | When |
|---|---|
| `references/signature-moves.md` | **Always.** The 16 named craft moves with real examples and how to deploy each. |
| `references/voice-tone-and-rhythm.md` | **Always.** Persona, humor, sentence rhythm, word choice, formatting (incl. bullets), and the carry-forward-vs-leave-behind table. |
| `references/anti-patterns.md` | **Always.** The banned list: AI-slop connectors, negative-energy framing, fabricated labels, scattered metaphors, forcing the reader, unearned titles. This is what made the early drafts feel like AI. |
| `references/structure-patterns.md` | When shaping a whole piece. Kriss's 7 real structures, how to pick one, and his title rules. |
| `references/golden-nuggets.md` | When you want gold-standard lines to calibrate against, or to seed an opening/closing. |
| `references/article-fingerprints.md` | When you want a fast per-article reminder of what each real piece does differently. |
| `references/editing-his-own-drafts.md` | **Always, when the source text is already Kriss's** (de-aifying an old post, tightening a case study or writeup). Different job from writing fresh, with its own failure mode: generic anti-AI heuristics stripping things that are actually his voice. |

Do not write from this SKILL.md alone. At minimum read `signature-moves.md`, `voice-tone-and-rhythm.md`, and `anti-patterns.md` first. Writing from memory produces the generic average this skill exists to prevent.

---

## Cardinal rules (non-negotiable)

These override everything else, including any single example in the references.

1. **No dashes. Ever.** No em dash, no en dash, no hyphen used as punctuation or for asides, anywhere. This is Kriss's hard standing rule. Use a comma, a period, parentheses, or rewrite. (Ordinary hyphenated words like "first-time" are fine.)

2. **Replicate the craft, not the errors.** The source articles are ESL-inflected and full of grammar slips, typos, and mid-sentence capitals. Those are *period markers*, not how to write now. Produce clean, correct English that still *sounds* like him.

3. **Never write in AI-summary voice.** If a sentence sounds like an assistant neutrally summarizing ("In conclusion, there are several key factors to consider"), it is wrong. Rewrite it in first person with a stake.

4. **Earnest first, funny by puncture.** Sincere by default. The humor comes from undercutting himself, naming the obvious, or deadpan compression, not jokes-for-jokes. Let it come from self-deprecation and the deflating aside.

5. **Show the concrete thing.** Every abstraction earns its place by becoming something the reader can picture or do. If a paragraph is all abstraction, it isn't done.

6. **One metaphor family per piece, sustained.** Pick a single metaphor domain that fits the subject and draw every analogy from it, extended and called back. Never a fresh unrelated metaphor per section. See signature move #7. This is the highest-leverage rule for sounding like him.

7. **Keep the energy up.** Realistic, raw, even pessimistic in *substance* is good. Negative-energy *framing* is not. Never open a section on a downer like "the thought I least wanted to have." The model is "I'd rather be honest": authentic and raw with the energy intact.

8. **Pay off every promise.** A title, a label, or a framing must be delivered by the body. No fabricated emotional labels ("(the uncomfortable part)") the content does not earn. If you call something "the uncomfortable part," it had better be uncomfortable; if it's a hot take, frame it as one.

9. **Leave the reader room.** State what you believe and do; let the reader draw the conclusion. Don't command the takeaway, don't narrate the structure of your own thinking ("and this connects to..."), don't force a feeling. Trust them.

10. **Strong hook on every section, not just the article.** The first line of each section is its own first impression. No section may open on a meta-transition or a throat-clear. See `anti-patterns.md`.

---

## How to use this skill

### The order of operations (do not skip to the moves)

1. **Read** `signature-moves.md`, `voice-tone-and-rhythm.md`, `anti-patterns.md` in full. For a full piece, also `structure-patterns.md`.
2. **Structure first.** For a full piece, pick the structure the material actually wants (don't force one).
3. **Pick the one metaphor family** for the whole piece (cardinal rule 6). Decide roughly where it lands.
4. **Draft**, opening the article and *every section* with a real hook. The load-bearing layer is structure + sustained metaphor + strong openings + every point earning its place. Then add two or three signature moves where the material invites them. Do not chase a quota of moves; stacking them reads as try-hard, which is its own failure mode.
5. **Title last, from the content.** Write or finalize titles after the draft exists so they match what was actually written, not an outline. See the title rules in `structure-patterns.md`.
6. Run the **voice-fidelity check** below.

### Editing existing text *(optional, only if source text is provided)*

**If the source text is Kriss's own, read `references/editing-his-own-drafts.md` FIRST.** Editing his writing is a different job with the opposite failure mode from writing fresh: the risk is not sounding generic, it is *stripping his voice while trying to remove AI tells*. A 2026-08-15 pass over his portfolio removed his parallel `Scenario 1 / Scenario 2` sections, his repeated header family, and his "This is my take on…" opener as AI tells. All three are his signature, and he asked for all three back. Default to preservation, and never remove anything you cannot name the specific tell for.

For text that is not his, diagnose against the fidelity check and `anti-patterns.md`: generic opening? all abstraction, no sustained image? scattered metaphors? AI-slop connectors? negative-energy framing? title that doesn't match the body? Then rewrite to inject the voice (don't just swap synonyms), and preserve any of Kriss's own phrasing that already lands. Don't overwrite a line that is already his.

### Voice-fidelity check (run every time, before delivering)

- [ ] **Zero dashes** used as punctuation or asides. (Search the text.)
- [ ] **The differentiation gate:** could a generic AI have written this? If yes, it failed. Fix it.
- [ ] **One metaphor family**, sustained and called back, not a different metaphor per section.
- [ ] The article AND **every section** opens on a real hook (scene, image, sharp line, question, bait), never a meta-transition or throat-clear.
- [ ] No AI-slop connectors or meta-narration of your thinking (see `anti-patterns.md`).
- [ ] No negative-energy openings; every framing/label is paid off by the content.
- [ ] At least one abstraction cashed out as a concrete image or a do-this action.
- [ ] At least one self-aware / self-puncturing or deadpan beat, not a forced joke.
- [ ] Reader addressed directly ("you"), joined at least once ("you and me"), and left room to decide, not commanded.
- [ ] The close hands the reader something (a question back, a blank, an action, a warm line), it does not summarize.
- [ ] Bullet or numbered list used where it genuinely helps the reader hold a set in their head (don't force it).
- [ ] Sentence rhythm varies: at least one long run-of-thought snapped shut by a short verdict line.
- [ ] Every title (article and section) matches its actual content, states a belief rather than a command, and is concrete over vague-emotional.
- [ ] Grammar clean and correct, but the cadence still sounds spoken.

For a standalone piece you may end with one short line naming the structure and the few moves you used, so Kriss can calibrate. For the full article workflow, `kriss-article-writer` tells you to skip that line.
