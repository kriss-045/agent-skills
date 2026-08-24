# Prediction contract: causal analysis instead of a score

Contents: 1. why not a score · 2. the annotation as lever, waste, or gap · 2c. the
reverse-engineering map · 3. grounding rules · 3b. the Pocock mechanisms · 4. the checklist ·
5. the three edits · 6. what not to do.

## 1. Why the X-ray does not score

A score answers "is this good", and `skill-reviewer-eval` already answers that with its 72-item
rubric. The X-ray answers the question a score cannot: **what does each part of this file CAUSE in
the final result, and what would change in that result if you pushed the part in a given
direction.** So the evaluation output is not category numbers; it is a causal map of the file,
one claim per region, each claim falsifiable. (Kriss, 2026-08-20: "what part of skill gives what
result, and changing that part in a certain direction will give what type of change in the final
result. Analysis and prediction, not a report.")

## 2. The annotation as a causal claim: lever, waste, or gap — never a description

**The banned annotation (Kriss 2026-08-21): anything the reader learns by reading the line
once.** "This is the trigger list" and "hovering this fires the skill" state the obvious; the
file is self-explanatory and the x-ray adds nothing by paraphrasing it. Test every tip and card
sentence: would it still be news AFTER the author has read the line? If not, cut it. Every
annotation must carry information NOT visible in the line: the mechanism, the blast radius, the
rival, the real cost, the drift risk, the predicted change.

Every annotation is exactly one of three kinds:

- **LEVER** — these exact words control this output behaviour, and here is the turn. Shape:
  quote the words, name the behaviour they control, give direction → predicted change with its
  mechanism. "surfaces.md 'radius equal to half their height' is why every chip is a pill; lower
  it and chips go rectangular across all screens." Rank levers by blast radius: a value many
  screens inherit outranks a rule one edge case reads. In a judgment skill the SPECIFIC
  anti-patterns are usually the biggest levers, because named failure modes are what pull output
  away from the training-data average; an abstract ban ("avoid clutter") is a no-op wearing a
  lever's clothes (vault: anti-patterns-as-content).
- **WASTE** — this text costs tokens without changing behaviour. Marked gray IN PLACE on the
  text itself: a rule stated twice or thrice (mark the extra copies, tip names the line where
  the surviving copy lives), a section that circles one idea in many sentences (mark the ramble,
  tip names the one sentence that would survive), a no-op the model obeys anyway, a bare
  restatement of an inherited contract.
- **GAP** — something missing whose ADDITION would change behaviour: no exclusion clause, a bare
  ALWAYS/NEVER with no "because" (it fails the first legitimate edge case), no output format for
  a structured deliverable, no error path, no worked example for a judgment call, everything
  inline with no reference tier, no eval/test cases. A gap attaches to the region where the
  missing thing belongs (as a dial: the question is the symptom, the edit is the addition), and
  ALSO renders in report mode under "what's missing".

At least one dial per region should be a bounded, testable edit: small enough to apply in one
sitting and check with `skill-test` (with vs without runs), because an x-ray PREDICTS and only a
run MEASURES (vault: text-space-optimization, eval-discipline-for-ai-instructions).

**Reference files get the same treatment as SKILL.md.** In a judgment skill the reference files
ARE the engine (the anti-pattern catalog, the token values); a reference pane with no levers
marked is an unfinished x-ray. Every reference pane carries at minimum its top levers and any
waste, with the same three-kind contract.

## 2c. Reverse-engineering map: from the behaviour you see to the words that cause it

The author arrives with a symptom. This is where the cause lives; annotate accordingly:

| behaviour observed | where the cause almost always is |
| --- | --- |
| never fires / fires on wrong asks | description wording only; the body is invisible at choosing time. Pushy-contextual pattern: name the artifact, keyword variants, intent words, "even if they don't ask explicitly" (vault: description-as-trigger) |
| fires alongside / instead of a sibling | no rival named in either description; exclusion clauses decide ties |
| right skill, wrong order of work | step position in the body; position reorders execution, caps and bold do not |
| a step keeps getting skipped | the step is bundled into another, or its finish line is vague (Pocock: premature completion) |
| output drifts toward generic AI look/tone | anti-pattern specificity too low; the named bans are the pressure away from average |
| output shape varies between runs | no output format spec, or no worked example; each run reinterprets |
| copies the example too literally | one example standing for a class; overfit |
| refuses a legitimate case | a bare cap with no "because"; the model cannot reason about whether the reason applies |
| answers from memory instead of the source | the read-the-source instruction sits inside a step instead of the preamble |
| expensive every run | load layers: some-branch material inline, examples in the body, duplicated rules |

## 3. Grounding rules

- **Every prediction names its mechanism.** The legitimate mechanisms are the ones this skill's
  own model rests on: the three-layer load model (what is paid when), decide-time competition
  (the description against every other installed description), file order as execution order,
  reference reachability, example overfitting, absolute rules blocking legitimate cases, plus
  every mechanism in §3b. A prediction that cannot name its mechanism is a guess wearing
  confidence.
- **Two grades of claim, kept visibly apart.** Mechanical claims come from `scripts/xray.mjs` and
  are certain: this file can never load because nothing names it; this description is paid in
  every session; this pointer is broken. Behavioural claims are expectations about what the model
  will do, and must read as predictions ("the model will tend to…", "expect…"), never as
  observed fact. Do not dress the second kind as the first.
- **Predictions are falsifiable.** Name the observable change: which phrase starts or stops
  firing, which step happens earlier, which tokens stop being paid, which output element changes.
  "Improves clarity" and "makes it more robust" are not predictions.
- **Every claim attaches to a line range from the script.** A claim that cannot be placed in the
  file is a claim the author cannot act on.
- **Brevity is part of the contract (Kriss, 2026-08-20: "simple and to the point, not this text
  heavy thing").** Section card: one cause sentence ≤ 20 words, then dial rows whose label is a
  context-driven QUESTION the section itself raises (≤ 8 words, "Want the phone check to actually
  run?", never an abstract noun) and whose revealed edit is the answer (≤ 15 words). Word tip:
  ≤ 18 words. The section level is the overview; the word level is where the specifics live
  ("this word is the one competing with kriss-hyperframe"). If a card reads like a paragraph,
  move its detail onto a marked word or cut it.
- **Tip specificity contract.** Every word tip states something only true of THIS skill at THIS
  word: the actual rival skill, the actual token figure, the actual consequence. No two tips in
  one x-ray share the same text. A tip you could paste into another skill's x-ray unchanged is
  too generic; rewrite it until it could not be.
- **Plain speech (hard, Kriss 2026-08-20).** Every tip, card sentence, knob line, and check row
  is a sentence you would say out loud while pointing at the line, naming real things (Claude,
  this file, the chat, tokens, the other skill). Banned: skill-engineering dialect and
  grammar-role labels ("load-bearing", "anchor", "surface", "blast radius", "the gate", "the
  failure this blocks"). The standard: "Without this line, Claude sometimes types the deck into
  the chat instead of building the file."

## 3b. The Pocock mechanisms (primary annotation authority)

Read first-hand 2026-08-20 from `github.com/mattpocock/skills` (files:
`skills/productivity/writing-for-agents/SKILL.md`, its `SKILL-MECHANICS.md`,
`.agents/invocation.md`). Kriss's standing instruction (2026-08-20): follow this guidance over
`skill-reviewer-eval`'s rubric when annotating. These are mechanisms predictions may name, and
each suggests the question a dial should ask:

- **The description is a pointer, and its WORDING is the lever.** "The pointer's wording, not its
  target, decides when the agent reaches the material, and how reliably." Front-load the
  triggering word; one trigger per branch (collapse synonyms for the same branch into the
  strongest one); cut identity prose the body restates. Predictions about firing behaviour should
  point at specific words, not at the clause as a blob.
- **Two budgets: context load vs cognitive load.** Always-loaded text costs every turn; text
  behind a pointer costs only the pointer's line; text with no pointer at all costs the human's
  memory instead. A skill that never needs to fire autonomously can set
  `disable-model-invocation: true` and pay zero context load, at the price of the human becoming
  its index. That trade is a legitimate dial on any description region.
- **Disclosure is decided by branch analysis, not length.** "Inline what every branch needs, and
  push behind a pointer what only some branches reach." A move-to-references prediction must say
  which branches stop paying, not just the token figure.
- **Negation is a failure mode.** "Steering by prohibition drags the forbidden behaviour into
  context and makes it more available, not less." A never-do list is a valid region, but a rule
  that could be a positive target behaviour is a dial: state the positive, keep the prohibition
  only as a hard guardrail paired with it.
- **No-op instructions.** "An instruction the model already obeys by default pays load to say
  nothing." The test is empirical, not stylistic; when a line fails it, the edit is deleting the
  whole sentence. A weak intensifier ("be thorough") is a no-op fixed by a stronger word, not by
  more sentences.
- **Leading words recruit priors.** A pretrained concept word ("seam", "red-green", "tight")
  carries meaning for free; a made-up term pays for itself in definition tokens every time. Used
  consistently in body AND description, the same word links prompts to the material reliably.
- **Every step needs a completion criterion** with clarity (the agent can tell done from
  not-done) and demand. A vague bound invites premature completion; the cheap fix is sharpening
  the bound, and hiding later steps is the expensive fix reserved for observed rushing.
- **Cross-skill calls name the Skill tool explicitly.** "Call the Skill tool with 'X'" fires; a
  bare `/name` in prose often does not. One skill per call. A user-invoked skill can never be
  reached by another skill at all; a dependency on one must become an instruction to the human.
- **Co-location, sprawl, sediment.** One meaning lives under one heading (scattering fragments
  it, duplication forks it); a document can fail purely by length ("attention thins across the
  excess"); stale layers settle because adding feels safe and removing feels risky. All three are
  nameable mechanisms for dead-weight and structure predictions.

## 4. The checklist — 20 yes/no verdicts, the page's only number

Renders in REPORT MODE as "N/20 checks pass" plus one row per check; each ✗ names its line and
click-jumps there. Deterministic: the same file gets the same verdicts on any run. Word every
row in plain speech (see §3); the canonical list, in order:

Hard gates (broken, not imperfect; a ✗ here also renders red on the offending lines):
1. There is a description, so the skill can be picked at all.
2. The description fits the 1,024 character limit (and carries no XML tags).
3. The folder name and the name inside the file match.
4. It says WHEN to use the skill, not just what it is.

Firing precision:
5. It says when NOT to use it.
6. The when-not part names the rival skill that should win instead.
7. The trigger phrases are words a person actually types.
8. No pile of lookalike trigger phrases for the same ask (one strongest phrase per branch).

Reachability and cost:
9. Every pointer to another file goes somewhere real.
10. Every file in the folder is named in SKILL.md, so all of it can load.
11. The body fits its budget (about 5,000 tokens, 500 lines).
12. Material only some runs need sits in reference files, not the body.

Behaviour under execution (the Pocock checks, §3b):
13. Every step has a finish line the model can check, done or not done.
14. Every ban says what to do instead.
15. No empty advice the model would follow anyway.
16. Handoffs to other skills say "call the Skill tool with X", one skill per call (pass if none
    are needed AND none are faked in prose).
17. Each rule lives in exactly one place.

Robustness under pressure (from skill-reviewer-eval's strongest execution items):
18. Every ALWAYS or NEVER says why, so the model can reason when an edge case pushes back.
19. A structured deliverable has its output format written down (pass if output is free-form on
    purpose).
20. Judgment calls have at least one worked example, and examples show the class, not one case
    (pass if the skill has no judgment calls).

Checks 1 to 4 and 9 to 11 come straight from `scripts/xray.mjs` output; the rest are read off
the file, and their verdicts must cite the line they rest on. Red on the page only ever means
broken: a ✗ row, a dead pointer. Never render red on anything that merely could be better.

## 5. The three edits

Close with the three changes that would move the skill's behaviour most, each carrying its
**predicted result** in one line. Order by size of predicted behaviour change, not by any notion
of severity. A missing exclusion clause outranks a body-length trim because it changes WHEN the
skill runs, and everything else is downstream of firing on the right task. **Their home is the
"fix first" list at the top of report mode** (settled by Kriss 2026-08-20), each row jumping to
its region; repeat them in the chat hand-off next to the file path.

## 6. What not to do

- No category scores, no /5, no PASS or FAIL verdicts, and no rubric item ids. A scored review is
  `skill-reviewer-eval`'s job; pointing there is the correct move when someone asks "is this skill
  good".
- No prediction without a named part, a line range, and a mechanism.
- No manufactured findings. If a region is doing its job and no direction would improve the
  result, say so in one line on its card and move on. Do not invent balance.
- No unverified external sources. If you cite guidance, you fetched it this session, or it is the
  Anthropic authoring-guidance URL already cited in SKILL.md, or it is a §3b rule (read
  first-hand from `github.com/mattpocock/skills` on 2026-08-20: `writing-for-agents/SKILL.md`,
  `writing-for-agents/SKILL-MECHANICS.md`, `.agents/invocation.md`). Nothing was found on
  `aihero.dev` beyond the skills index; do not cite it.
- No generic tips. A tip that would be equally true on another skill's x-ray fails the
  specificity contract in §3 and gets rewritten, not shipped.
