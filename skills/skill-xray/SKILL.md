---
name: skill-xray
description: "X-ray one Agent Skill: a dark console-style viewer of the skill's real folder (IDE file tree with real nesting, the selected file whole and verbatim), clean until touched; hovering a section floats a card beside the cursor with what that part causes plus dial knobs that turn to reveal the exact edit, and hovering a highlighted word swaps in that word's detail. A Report toggle shows the 20-point checklist verdicts, the three fix-first edits, and what's missing. Triggers: x-ray this skill, inspect/dissect/break down this skill, why does my skill not fire, what does this part of my SKILL.md do, how do I configure this skill to X, annotate my skill, run the skill checklist. Not for authoring a new skill (skill-builder), a graded quality review (skill-reviewer-eval), or behavioural A/B proof (skill-test)."
---

# skill-xray

## CRITICAL — invoke immediately on trigger, and read this whole file before running anything

An X-ray is not a review and not a report. `skill-reviewer-eval` already answers "is this good"
with a score. This skill answers the two questions a score cannot:

1. **Which part of this file is doing which job**, shown ON the file itself, and
2. **What would change in the final result if you pushed a given part in a given direction.**

The deliverable is the skill's OWN TEXT, whole, given back as an interactive reading experience
with one lens layered on top: hover a region and its learning appears; the words each learning
hangs on are highlighted in place. It should feel like reading your SKILL.md, not like reading a
document ABOUT your SKILL.md. If the reader has to hold the page next to the file to know what you
mean, you built a report, and that is the failure mode.

---

## The one idea underneath everything

A skill author cannot see the thing that actually governs their skill: **when each part of it is
paid for.** Three layers, and they cost wildly different amounts:

| layer | what is in it | when it is loaded | so a bloated one costs |
| --- | --- | --- | --- |
| ALWAYS | the frontmatter `description`, nothing else | every session, whether the skill fires or not | every conversation the user ever has |
| ON TRIGGER | the SKILL.md body | once, only when the skill fires | that one session |
| ON DEMAND | each `references/` file | only if the body routes to it | nothing until used |

That table is why "move the detail into references/" is not tidying: it moves cost from certain to
conditional. It is why the description is the highest-leverage 400 characters in the whole skill,
and why a file sitting in `references/` that the body never names is dead weight the model can
never reach. It is also the mechanism behind most predictions the X-ray makes. On the page it
lives in the FILE TREE: each file's row carries a badge saying when its tokens are paid (SKILL.md
when it fires, description every session, each reference only if opened). No header panel.

Anthropic's own authoring guidance states the same three-stage load model and puts numbers on it
(metadata always loaded, instructions loaded on trigger and kept under ~5k tokens, resources
loaded as needed, SKILL.md body under 500 lines):
<https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices>.

---

## Procedure

### 1. Get the facts mechanically. Do not count anything by hand.

```
node ~/.claude/skills/skill-xray/scripts/xray.mjs <path to the skill dir or its SKILL.md> --pretty
```

It returns real line numbers per heading, the three load layers with token estimates, the trigger
clause and the exclusion clause pulled out of the description, which files on disk are reachable
from the body, which pointers in the body do not exist, and a list of mechanical flags.

**Every number and every line reference in the X-ray comes from this output.** If you find
yourself estimating a token count or guessing a line number, stop: it is in the JSON. A remembered
number in a document that looks this precise is worse than no number.

If the script errors, say so plainly and continue with the parts you can establish by reading.
Never fabricate the load-layer figures.

### 2. Read the target skill in full, including every reference file.

Both of them: the file as prose, and the file as a program the model executes. You are about to
claim what each region CAUSES, and that claim is only worth something if you read what it routes
to.

### 3. Annotate every region — the whole file, no sampling. And the reference files too.

**Lever, waste, or gap — never a description (Kriss 2026-08-21).** The file is self-explanatory;
an annotation that paraphrases what a line says adds nothing. Every annotation is one of: a
LEVER (these exact words control this behaviour; turn them this way → this predicted change,
widest blast radius first), WASTE (costs tokens, changes nothing: repeats, rambles, no-ops,
marked gray in place, tip naming where the surviving copy lives), or a GAP (something missing
whose addition would change behaviour: an exclusion clause, a bare NEVER without its because, an
output format, a worked example, test asks; it becomes a dial in its region plus a row under
"what's missing" in report mode). Two files disagreeing on the same rule (two different numbers)
is a CONTRADICTION, marked red on both sites. The full contract and the behaviour →
cause reverse-engineering map are in `references/prediction.md` §2 and §2c; read them first.

**Reference files are not passengers.** In a judgment skill they are the engine: annotate each
reference pane's top levers and waste with the same contract. Mining lever candidates across
many reference files is delegable labor; judging which are real is not.

Walk the regions in file order. Every line of the target SKILL.md appears in the output inside
exactly one region; nothing is summarised away. Two levels of annotation, both SHORT:

- **The section card** (on hovering a region): one plain sentence for what this part CAUSES
  (≤ 20 words), then one to three dial rows. Each dial's label is a QUESTION the section itself
  raises, context-driven, ≤ 8 words: "Want the phone check to actually run?", "Same bad output
  keeps coming back?", "Want it to fire more often?". The revealed edit is the answer (≤ 15
  words). Never an abstract noun ("Discoverability"), never jargon; write the question the
  author would actually ask while reading that section.
- **The word tip** (on hovering a highlighted word): one line (≤ 18 words) of detail for that
  exact word. **Specificity contract:** every tip says something only true of THIS skill at THIS
  word (the actual rival skill, the actual token cost, the actual consequence). No two tips in
  one x-ray share the same text; a tip you could paste into another skill's x-ray unchanged is
  too generic, rewrite it.

**Plain speech (hard, Kriss 2026-08-20).** Every tip, card sentence, knob line, and check row is
a sentence you would say out loud to a friend while pointing at the line, naming real things
(Claude, this file, the chat, tokens, the other skill). Banned: skill-engineering dialect and
grammar-role labels ("load-bearing", "anchor", "surface", "blast radius", "the gate", "the
failure this blocks"). The standard: "Without this line, Claude sometimes types the deck into
the chat instead of building the file." If the author would have to ask what a phrase means,
rewrite it.

Mark the words each learning hangs on directly in the text: trigger phrases, the exclusion
clause, reference pointers (broken ones struck red), the hot words. Every mark gets a
`data-tip`. The goal of the whole page is: the author can put a finger on the exact words
causing a behaviour, and read off the edit that changes it.

`references/anatomy.md` carries the region taxonomy, the standard knob per region type, and the
causal mechanisms predictions may rest on. Read it before annotating; do not re-derive it.
`references/prediction.md` is the contract for what counts as a valid claim: current effect
observable, predictions falsifiable and mechanism-named, mechanical certainty kept visibly apart
from behavioural expectation. Read it before writing a single card.

### 4. Run the checklist. Verdicts, not grades.

Walk the 20-point checklist in `references/prediction.md` §4 (the hard gates, the Pocock rules,
and the robustness checks as yes/no items) and give each a verdict against THIS file, worded in
plain speech. The only number the x-ray ever shows is that count, deterministic: the same
file gets the same verdicts on any run. No judgment grades, no /5, no rubric ids; a scored
review stays `skill-reviewer-eval`'s job. Each failed check names the offending line, and red on
the page only ever means broken (a failed check, a pointer to nowhere).

### 5. Build the page.

Copy `references/xray.html` and fill it in; write the FILLED copy to the output path and never
overwrite the template itself. It is self-contained on purpose: one file, no network, opens by
double-click, survives being emailed. Its shape: a centered container, dark console tokens, and a
page that is CLEAN until touched: no header text, no standing captions, no summary blocks. Two
modes via a sidebar toggle: X-RAY (the file, the hover cards) and REPORT (the checklist score,
the three fix-first edits, every check as a row, the what's-missing gaps, the color legend;
every failed or gap row click-jumps to its region). The Report toggle carries a small red fail-count badge only while checks fail.
Colors mean one thing each, everywhere: blue starts it, orange stops it, yellow is the work,
purple is a door to another file, red only ever means broken, gray means wasted.

1. **The file tree (left)** — IDE-style like VS Code or Cursor: the skill's REAL folder with true
   nesting, chevrons, folder and file icons, indent guides. A file row shows only its name and a
   right-aligned token figure; WHEN that cost is paid lives in the figure's hover tip, never as
   visible caption text. An unreachable file renders struck through, its tip saying "never named,
   can never load". Clicking a row shows that file; SKILL.md opens selected. Files over ~15 KB
   get a stub pane instead of an embed.
2. **The reader** — the selected file, whole and verbatim, line-numbered from the script's
   ranges. Hover = vivid OUTLINE only (no tint, no left border); marked words light up when
   hovered. One color per role everywhere.
3. **The floating card** — the one annotation surface, appearing only on interaction. Hover a
   section → a card floats beside it and follows the cursor vertically (it freezes while the
   pointer is inside it). Inside: role, line range, the one "what it does" sentence, then the
   DIAL ROWS, one per knob: a small dial plus an outcome label; hovering a row turns the needle
   and reveals the exact edit. No tabs, no "Knobs" label; the dial is the metaphor. Hover a
   marked word → the same card swaps to that word (colored chip + one line); leave → back. Click
   pins, Esc unpins; on mobile tap shows the card inline and tapping a dial turns it. The
   template's JS and CSS wire all of this; supply regions (`data-role`, `data-ln`, a `.card`
   with `.word`, `.sec`, `.does`, and `.knob` rows) and `data-tip` marks in the documented shape
   and do not modify the script or the palette.

**The three edits live in report mode** as the "fix first" list, ranked by size of predicted
behavior change (settled by Kriss 2026-08-20). Repeat them in the chat hand-off next to the file
path.

Write the file to `~/.claude/skills/<target>/xray-<target>.html` if the author wants it kept
beside the skill, otherwise `/tmp/xray-<target>.html`, and give them the path. **Then open it in
the browser yourself (`open <output path>`), every run, without being asked.** Say the load-layer
numbers are estimates (~4 chars per token) and that the RATIO between layers is the reliable part.

---

## Hard rules

- **Show the file, do not describe it.** The whole file, every region, verbatim. Every annotation
  attaches to real text at a real line.
- **Every prediction names its direction, its result, and its mechanism.** "Consider tightening
  the description" is not a prediction. "Add `Not for figma.com URLs (figma-kriss)` → stops firing
  on pasted Figma links" is.
- **Short is the contract, not a style choice.** Card sentence ≤ 20 words, knob lines ≤ 15, word
  tips ≤ 18, plain words. A card that needs scrolling has failed. Detail lives at the word level.
- **Never dress an expectation as a fact.** Script output is certain; model behaviour is a
  prediction and reads like one.
- **Verdicts, never grades.** The checklist count ("14/20 checks pass") is the only number; each
  check is a plain yes/no fact about the file. No /5, no quality grade, no rubric ids. If the
  user wants a graded review, hand off to `skill-reviewer-eval`.
- **Never claim a source you did not open.** If you cite external guidance, you fetched it in this
  session or it is the authoring-guidance URL above.
- **No network in the output.** No CDN scripts, no web fonts, no remote images. It has to open in
  five years.
- **One skill per X-ray.** Two skills is two pages. A comparison is a different job.

## When NOT to use this

- Authoring a new skill from scratch → `skill-builder`.
- A scored review, a grade, is-this-good → `skill-reviewer-eval`.
- Proving a skill actually improves output → `skill-test`, which runs the task with and without it.
  An X-ray predicts from reading the file; only `skill-test` can measure.
