# Editing Kriss's own drafts (de-aification mode)

Read this **whenever the source text is already Kriss's** — de-aifying an old post, tightening a case study, cleaning a component writeup. It is a different job from writing fresh, and it has its own failure mode.

Derived from the 2026-08-15 portfolio de-aification pass, where a first attempt was rejected on five separate counts. Every rule below is his verbatim correction, with the reasoning he gave.

---

## THE GOVERNING RULE

**When the text is already his, a generic anti-AI heuristic must never override his established voice.**

The first pass failed because it ran the standard de-aification checklist over writing that was already his, and stripped three things as "AI tells" that are actually his signature: parallel labelled sections, a repeated header family, and his personal writeup opener. All three came out. He wanted all three back.

**The test before you remove anything:** *is this an AI tell, or is this him?* If the pattern shows up across his real published pieces, it is him, and removing it makes the piece sound less like him, not more. A uniform structure written by a person on purpose and a uniform structure produced by a model look identical on the page. Only the corpus tells you which one you are holding.

**Preserve his SIGNATURES, not his TEXT.** This distinction is the whole rule, and getting it backwards is a separate, equally bad failure. In this mode you are removing tells, not improving prose, so if you cannot name the specific tell a change removes, do not make the change. He said it plainly about a rewrite that changed too much: *"I like my version better."*

---

## THE SECOND GOVERNING RULE: revisions start from the REWRITE, never from his original

When he reviews a de-aified draft and asks for changes, **the draft is the base.** Apply his named edits on top of it. Do not go back to his original and rebuild.

This is not a subtlety, it is the other way this job fails, and it failed exactly this way one round after the first failure above:

> **Pass 1** de-aified his portfolio. He replied: *"1 is solid I will keep most of it, only few changes"* and named five specific edits.
> **Pass 2** rebuilt from his originals while restoring those five things. The result put most of the AI tells back.
> His verdict: *"I don't like this, this is way too close to my writing and has not much of a change in ai tells. Previous version was better and I asked for specific changes and you overdid it."*

**Why it happens:** "restore my section titles" and "keep my phrasing" sound like *be more faithful to my original*, so the natural overcorrection is to start from the original again. That is wrong. He wants the rewrite, with named parts of his voice put back into it. Two or three surgical swaps, not a new draft.

**The test before a revision:** open his feedback and count the changes he named. That number is how many edits the next version should contain. If your diff against the previous pass is bigger than his list, you have overdone it, no matter how good the result reads.

**Corollary for the whole loop:** each pass should get SMALLER. Pass 1 is the big move; every pass after it is a shrinking set of surgical edits. A later pass that touches more than the one before it is a signal you have lost the thread, not that you are being thorough.

---

## What is HIS, and must survive an edit

### 1. Parallel labelled sections are how he forks an argument
`### Scenario 1: …` / `### Scenario 2: …` with real headers, each as its own section.

Pass 1 melted these into two prose paragraphs, on the grounds that parallel labelling reads as structural predictability. **Wrong here.** A fork in the argument is easier to follow when it is labelled and separated than when it is dissolved into running text.

> Kriss: *"I don't like how it removed the section titles and kept scenario 1 and 2 as just one paragraph, I liked my version better."*

### 2. A repeated header family is his humour
> "The beginning" → "The middle" → "The middle, where it feels kinda good" → "The middle, where you look back and reflect"

Pass 1 replaced these with distinct descriptive titles, calling the repeated prefix a listicle tell. It is a running joke, and the joke is the voice.

> Kriss: *"I like my titles for section as it felt humany and has a touch of humor."*

### 3. The personal opener on a component / exploration writeup
> "This is my take on…" · "For this error button, I explored…" · "With this exploration, my goal was…"

Pass 1 rewrote all three at different lengths and structures, because three same-shaped paragraphs looked like the uniform-complexity tell. He found the result robotic. The parallel shape is how he presents three variants of one component, and the first-person framing is what makes it a designer talking rather than a spec.

> Kriss: *"I don't like this too much, it feel very robotic to me. I like how I started with 'this is my take on' rather than yours in all three paragraph."*

### 4. Descriptive use cases, not clipped directness
> HIS: "It's useful in flows where retries are time-bound, like payments, sync, or rate-limited actions."
> PASS 1: "Anywhere a retry is genuinely time-bound, a payment, a sync, a rate limit…"

Tightening cost the information that made the writeup worth reading. Concision is not the goal when the specifics *are* the value.

> Kriss: *"I like how mine is more descriptive about actual usecase… and not too direct like yours."*

### 5. His plain phrasing over an elevated synonym
Do not upgrade his vocabulary. If his word works, it stays. Pass 1 swapped "much more relaxed pace" and similar plain constructions for smarter-sounding alternatives; he asked for his back.

> Kriss: *"I like more authentic wordings."*

---

## What he wants MORE of

### 6. Surprising, verifiable facts — and keep the external link
The petrol-engine fact (best ever built is 48% efficient; most road cars run 20 to 40, linked to Wikipedia) survived a rewrite that demoted it to a passing aside. He wanted it restored as a real moment.

**Two separate reasons, both his:** a fact most people do not know is genuinely interesting and keeps them reading; and an external link *supports the point* rather than asking the reader to take his word for it. This makes external links a feature of his articles, not clutter to strip.

> Kriss: *"I liked the petrol engine example because it has a link and it has a surprise fact that most people won't know. This type of things we want to keep because this feel genuinely interesting to people and can keep them engaged. Also it has a link to actual wikipedia link, which is another good thing to keep in articles, external links because it support your point."*

### 7. Paragraphs of 2 to 3 sentences
Bite-sized, so the reader keeps moving. A correct, well-argued eight-sentence block still fails this. Break it.

> Kriss: *"I like to have 2-3 sentence long paragraph so it is bite sized and easy to keep going."*

### 8. An open-ended question as a header near the end
> "So what actually decides the winners?"

Placed late, just before the closing section. It hands the thinking to the reader at the point they are ready to do it, and it pairs with the existing rule about leaving the reader room.

> Kriss: *"I like a lot to have question as title near end in articles where it is open ended."*

### 9. Simple words, simple structure
Plain language by default. Variation in rhythm is welcome; complexity in vocabulary and syntax is not. Reaching for a more sophisticated construction is one of the clearest ways to stop sounding like him.

> Kriss: *"The words and grammar you have used in this new version is too complex. I would prefer to keep it simple and use simple language and structure, you can have variation and all."*

### 10. Concrete numbers, shown
"10+ years", "48%", "five years", "six months". Do not smooth a figure into "over a decade" or "a while back". The number is the specificity.

---

---

## NEVER-USE ZONE: constructions that are instant tells

These are banned outright in his prose. They are not judgement calls.

### `…than X ever was` / `…than X ever did`
> BANNED: *"glitch" is closer to what actually happened than a red exclamation mark **ever was**.*
> INSTEAD: *"glitch" feels like the machine's version of a human error.*

He flagged this one himself, unprompted, in an otherwise-approved draft: *"that ever was is so bad tale."* The construction inflates an ordinary comparison into a rhetorical flourish, and the flourish is doing no work. It is the written equivalent of a mic drop nobody asked for. Kill the comparison entirely and state the thing plainly, rather than swapping in a different comparative.

**The wider family, all banned for the same reason** — a superlative-by-comparison that adds emphasis instead of information:
- `more X than it has any right to be`
- `X, and then some`
- `if there ever was one`
- `in the best possible way`
- `and that's putting it mildly`

If a sentence needs a comparison, make it a real one with a real second term. If it does not, delete the flourish and say the thing.

---

## Do not strip qualifiers that carry meaning

Tightening is not the goal in this mode. A modifier that changes the meaning stays, even though a generic "cut every adverb" edit would remove it.

> HIS: *an error state **intentionally** framed as a glitch*
> OVER-TRIMMED: *an error state framed as a glitch*

He asked for "intentionally" back: *"in certain place I think it make sense to use extra verb like intentionally framed rather then framed."* The word is load-bearing. Without it the glitch could be a bug he is describing; with it, it is a deliberate design decision he made. That is the entire point of the writeup.

**The test:** remove the word and read the sentence again. If the meaning is unchanged, it was padding and should go. If the meaning shifts even slightly, it was carrying weight and stays. Do not cut on word count.

## Procedure for a de-aification pass

1. **Read his real published pieces first** (`article-fingerprints.md`) so you can tell a tell from a habit. Skipping this is what caused the failure.
2. **List the candidate changes before making any**, each naming the specific tell it removes. Anything you cannot justify that way, drop.
3. **Check each candidate against sections 1 to 5 above.** If it is one of his patterns, keep it, even if a generic checklist flags it.
4. **Apply the additions in 6 to 10** where the piece invites them.
5. **Never touch source files.** Produce a review artifact and let him approve first.
6. **Label the size of each change honestly** — full rewrite / heavy edit / light touch / no change. He needs to know when a "de-aification" has quietly become a rewrite so he can judge it as one. A piece that already reads like him should come back marked *no change*, and that is a good outcome, not a lazy one.

## Presenting the result

Show **old and new side by side with a word-level diff**, one section per piece, with the reasoning per change and a toggle to read either version clean. He reviews by comparison, not by reading a description of what changed.

Working implementation from the 2026-08-15 pass, reusable:
`~/Kriss LLM/Claude OS/operator/operator-personal/drafts/portfolio-deaify-review.html`
