---
name: case-study-writer
description: "Write a design portfolio case study for Kriss's job search: pick a format from a 9-type researched taxonomy, gather it by interview or pasted notes, draft at the type's length in his voice with a professional register, then self-audit for senior craft. Triggers: write a case study, turn this project into a case study, write up my portfolio project. Not Medium/LinkedIn articles (kriss-article-writer) or voice rewrites (kriss-writing-style)."
---

# Case Study Writer

## CRITICAL — invoke this skill immediately on trigger

When a trigger phrase from the `description:` field above appears in a user message ("write a case study", "turn this project into a case study", "write up my portfolio project") → INVOKE THIS SKILL VIA THE Skill TOOL before any other response about the project. Do not improvise the interview questions or the format choice from memory in chat; that exact failure is what the 2026-08-12 regression was, and this file already contained the fix at the time. Hook B3 (`~/.claude/hooks/claude-os-write-check.sh`) verifies this preamble is present; missing it = drift event per rule SF2 in `state/rules.md`.

Turn one of Kriss's design projects into a portfolio case study that survives a real hiring read. The format is not fixed: it follows the project's own evidence, chosen from a 9-type taxonomy that was dissected off real designers' live pages (not invented). The whole workflow optimizes for one reader: a screener who spends 2 to 3 minutes and often runs an AI pass first, and who reads seniority through trade-offs, not through a tidy process diary.

**The core bet (from the research):** what reads as senior is a traced decision with its trade-offs and one honest hard part, sections named after the decision rather than the process phase, and evidence sitting inside the decision it justifies. A "Discover / Define / Ideate / Deliver" spine reads as junior and is the default anti-pattern to avoid.

## Run the steps, do not recall them (mandatory first action)

This skill regressed on 2026-08-12 for one reason, and it was not missing content: the steps below were skipped and the work was improvised from memory instead ("I jumped ahead, I improvised that question batch from memory instead of running the skill's actual steps"). Both craft fixes added on 08-10 were in this file at the time and still got missed. So the gate is procedural, not more prose.

**Before writing a single line of the case study, post this in chat, in four short lines:**
1. intake mode chosen (interview / notes) and why;
2. the type chosen from the taxonomy, named exactly as it appears in `references/type-taxonomy.md`, plus its target length in words;
3. which reference files you have ACTUALLY read this run (`type-taxonomy.md`, `kriss-case-study-patterns.md`, `craft-principles.md`, `interview-guide.md` if interviewing) — reading them is required, naming one you did not open is a lie; for `kriss-case-study-patterns.md` and `craft-principles.md` specifically, quote one verbatim phrase from each (not a paraphrase) as proof you opened the file this run, not from memory of a past run;
4. the senior-signal items you still do not have (role, constraints, what was tried first, what failed, trade-offs, one real number).

If you cannot fill those four lines, you have not run Steps 1 to 3 and you are not ready to draft. Skipping this post is itself the failure mode; do not skip it because the project "seems obvious."

**Evidence base.** The two reference files distill Kriss's own vetted research. Provenance, if a claim needs checking, lives in `~/Kriss LLM/UX/research/` (`case-study-types-and-storytelling.md`, `portfolio-case-study-structures.md`, `portfolio-case-studies-target-companies.md`, `portfolio-case-studies-playwright-pass.md`) and `~/Kriss LLM/KrissOS/Design/Career/Job-Search/Case Study Format Research.md`. Do not re-derive the taxonomy from memory; read the references.

---

## Workflow

### Step 1 — Pick the intake mode (branch, choose per run)

Ask Kriss which mode, or infer from what he supplied:

- **Interview mode** — no written material yet, or he wants to talk it out. Read `references/interview-guide.md` and run the question bank in Step 3a.
- **Notes mode** — he pasted a brief, notes, an old write-up, or a doc path. Parse it in Step 3b and only ask follow-ups for the senior-signal gaps that are missing.

If he named a mode, honor it. If he pasted substantial material, default to Notes mode and confirm.

### Step 2 — Choose the type

Read `references/type-taxonomy.md` in full. Recommend the single best-fit type from the project's evidence, and say why in one line, then let Kriss override with any of the 9 (or a variant).

Recommendation logic (fast heuristics; the reference has the full entries):
- Hard post-launch metrics exist → **results/impact-first**.
- A famous or narrative-worthy product decision with a clear frame-shift → **story/reframing-led**.
- The deliverable is a system/component/tool, or Kriss already has public standing → **artifact-led** (caution: proves standing, not competence, so weak as the only asset when the name is unknown).
- His own side project → **passion-project**.
- Agency/client engagement where the outcome is a relationship or press → **agency/client**.
- A team story where the employer is the audience → **company-blog team narrative**.
- Coursework/mock/no shipped work → **double-diamond**, **mock-project**, or **STAR** (the reference marks these as junior-tier and flags the process-spine risk).
- One long engagement with several shipped pieces → **per-feature/modular** container.

(optional — if Kriss names the type up front, skip the recommendation and go to Step 3.)

### Step 3 — Gather the material

The target is the senior-signal set for every case study, whatever the type: **role (early and specific), the constraints, what was tried first, what did not work, the trade-offs made, and one hard specific number** (if any real one exists).

**3a — Interview mode.** Work the question bank in `references/interview-guide.md`: the universal questions first, then the per-type extras for the chosen type. Ask in small batches, not one megablock. Stop when the senior-signal set is covered; do not pad.

**3b — Notes mode.** Extract the senior-signal set from what Kriss pasted. Then ask ONLY for the gaps, and name them ("your notes cover the outcome and role but not what you tried first or what you traded away, which is the senior signal, so those two I need").

Never invent a metric, a constraint, or a trade-off Kriss did not give. A fabricated number in a portfolio is a firing-on-sight error for a screener; if there is no real number, say so and use a qualitative outcome instead.

### Step 4 — Draft to the type's spine and length

From the chosen type's entry in `references/type-taxonomy.md`, take its **section order** and its **target length** (each type's length is justified by what that format needs; do not retarget a 700-word agency piece to 2,800 words). Draft the sections in order.

Also read `references/kriss-case-study-patterns.md` (his real published patterns, extracted from the Connect2crypto trio) and apply all of them: role+team+duration opener, plain 2-to-4-word section labels, 1-to-3-sentence paragraphs, bulleted findings with bold data, numbers sprinkled where they drive the story, an image/animation slot every few paragraphs, 1 to 3 verified research links, a Learnings close.

Enforce while drafting (full rationale + sources in `references/craft-principles.md`):
- Role in the first sentence or first section, stated specifically.
- Sections named after the **decision**, sized by how much the decision mattered (the hardest decision gets the most words).
- Evidence (a quote, a number, a screen) placed **inside** the decision it justifies, never collected into a separate research chapter.
- Numbers rare and specific, never a KPI wall.
- No process-phase spine unless the chosen type is explicitly a junior-tier process type.
- **Story, not setup (Kriss feedback 2026-08-10).** No context-dump section up front ("what an agreement is"); open on the tension and weave domain explanation into the narrative at the exact point the reader needs it. Each section should end by raising the next problem, not by closing flat, so the read carries forward. Section titles say what happened in that chapter, specific over thematic ("The recipients step: turning tribal rules into interface", never "Research" or "The challenge").

### Step 5 — Voice pass (sentence layer only, professional register throughout)

A case study is a hiring document, not an article. Draft in the professional register from the first line, and take from `kriss-writing-style` ONLY the sentence layer: contractions, spoken openers (So / But / And), plain words over formal ones, sentence lengths that vary hard (long additive runs snapped by an occasional short one), and Kriss's own phrasings mined from the interview or notes, kept nearly verbatim.

Do NOT apply the article-voice moves (each of these got a draft rejected on 2026-08-10):
- No sustained metaphor family and no everyday-life analogies or examples (a "closing table" metaphor was the rejection trigger; "this is a professional case study").
- No bait-and-switch opens, self-puncturing jokes, or reader hand-off closes.
- No every-paragraph-lands-a-punchline pacing; most paragraphs just end.

Then run a **de-AI hunt** over the full draft (second rejection trigger: "zero AI hints"): kill not-X-but-Y symmetry patterns, evenly sized sentences, formal-register words ("precisely", "consistently", "furthermore", "utilize"), clever compressed constructions ("compounds three decisions"), and engineered quotable lines. Read it aloud; if a sentence sounds like an assistant summarizing, rewrite it as Kriss talking.

### Step 6 — Ending beat

Close on results/impact when a real outcome exists. Regardless of type, include one honest **"what was hard / what I'd change"** beat, because seniority reads through trade-offs and the research found the honest-hard-part section is the one that reads as senior. Do not manufacture a triumphant ending; an unresolved-but-honest close beats a hollow win.

### Step 6b — Rework rules (they govern every round after the first)

A case study converges over rounds, so most of the real work happens in revision. These are hard (Kriss, 2026-08-12, after a 6-round loop):

- **Never rewrite a sentence he already approved in an earlier round.** An approved sentence is frozen. Touching it silently is the single fastest way to lose his trust in the draft, because he then has to re-read what he had already signed off. Change only what the current note asks for, and if a nearby approved line genuinely has to move, say so and ask first.
- **Mine the reference patterns, do not merely obey the literal instruction.** When a note says "make it more like my other case studies," go READ the three Connect2Crypto studies in `references/kriss-case-study-patterns.md` and copy the observable pattern (title and description as gerund plus outcome, short paragraphs, bolded key data, image slots), rather than applying a minimal literal edit and calling it done.
- **Match the existing portfolio's link styling.** External and internal links in the draft follow whatever treatment his live portfolio entries already use; do not invent a link style.
- **Cite an external study or article when it is earned** (an industry benchmark, a standard, a piece of research that backs a claim he actually made) and never when it is not. One or two real citations read as senior; decorative citations read as padding.
- **The review surface is the live local page, not chat.** Deliver every round on the running dev server (Step 8) so he reads it in final form.

### Step 7 — Self-audit before presenting

Read the **red-flag audit** in `references/craft-principles.md` and check the draft against every flag. Fix each hit before showing Kriss. Report the audit result in one line ("audit: clean" or "audit: fixed process-spine creep in the middle section").

### Step 8 — Present

Deliver:
1. The case study draft (markdown), in the chosen type's section order.
2. A 2 to 3 line rationale: the type chosen, its target length, and why it fits this project.
3. Any open provenance gap flagged plainly. For work done under your employer specifically, confirm with Kriss what is publicly showable before publishing; if unconfirmed, mark the draft as internal-only and note which details need his clearance.

**Preferred delivery (Kriss, 2026-08-10): a live page on his portfolio, not chat markdown.** Add the case study to Kriss Playground (`~/Kriss Playground`) as a `draft: true` entry (component in `src/components/elements/` + registration in EntryPage.jsx + row in `src/data/entries.json`), start the dev server, and give him the local URL; he reviews in final form. Use labeled plain-background image/animation slots (with export sizes) and amber-highlighted metric placeholders. `draft: true` keeps it out of production builds. Work on a branch/worktree; never merge or remove the draft flag without his say. Full recipe in `references/kriss-case-study-patterns.md`.

---

## Worked example (generic illustration)

Shows the transform, not a real project. Interview answer (Step 3a):

> "I was lead on a checkout redesign. Everyone framed it as 'the button is confusing.' The real issue was people abandoned before they trusted the total. I tried a clearer button first, it did nothing. Reframing it as a trust problem changed everything. Cart abandonment dropped, I don't have the exact number cleared for sharing."

Recommended type (Step 2): **reframing-led** (a clear frame-shift, a famous-shaped decision). Drafted opening + section names (Step 4), role first, sections named after the frame-shift, the failed first attempt kept:

> **Checkout, reframed from a button problem to a trust problem.** As lead designer I owned the checkout redesign. The team's frame was "the button is confusing"; a clearer button shipped first and moved nothing. [section] **From "confusing button" to "unearned trust"** ... [section] **Showing the total before asking for the tap** ... [ending] cart abandonment fell (figure pending clearance); what I'd change: I'd have tested the trust hypothesis before rebuilding the button.

Note how the metric is left as "pending clearance" rather than invented, and the honest failure (the button that did nothing) is kept as the senior signal.

## Handoffs

- **`kriss-writing-style`** — chained in Step 5 for the sentence layer only (cadence, plain words, his phrasings). Its article moves (metaphor families, analogies, jokes, hand-off closes) are explicitly OFF for case studies. This skill owns structure and the hiring register.
- **`capture`** — if a reusable insight about Kriss's work or a portfolio decision surfaces, offer to file it, do not auto-write.

## When NOT to use

- A Medium/LinkedIn/newsletter article or essay → `kriss-article-writer`.
- A voice-only rewrite of finished prose → `kriss-writing-style`.
- Resume/CV writing → the resume skill (separate).
- A rough draft Kriss explicitly wants approximate/unpolished → skip the audit and voice passes on request.
