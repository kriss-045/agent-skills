# Region taxonomy: what each part of a SKILL.md does, and the knob that changes it

Contents: 1. frontmatter name · 2. description · 3. allowed-tools · 4. CRITICAL preamble ·
5. the one idea / rationale · 6. procedure steps · 7. branch tables · 8. reference pointers ·
9. hard rules · 10. when-NOT-to-use · 11. examples · 12. anti-pattern lists · 13. stop rules ·
14. scripts · 15. regions that are dead weight

Use this as the vocabulary for annotations. Each entry gives the ROLE (what the region does in
execution), WHAT THE MODEL DOES with it, and the KNOB (the shape of the concrete edit an author
makes to change that behaviour). Fill the knob in with the target skill's own words; never paste
the generic form.

On the page, each region's card renders per `references/prediction.md`: role, then "what it
produces today" (the WHAT-THE-MODEL-DOES entry, made observable in the target's own terms), then
"change → result" predictions, where the KNOB entry becomes the primary prediction: the direction
of the edit plus the concrete change it would cause in the final result. The italic lead-ins on
the knobs below ("*Fires too rarely*", "*The skill blends two modes*") are the result side of that
arrow; keep them paired.

---

## 1. `name:` in the frontmatter

- **Role.** The skill's address. It is what a user types as `/name` and what other skills name in a
  handoff.
- **What the model does with it.** Almost nothing at decide-time. Selection is driven by the
  description, not the name. Its real job is that the folder name and this field must agree, or the
  skill fails to load in some deployment targets.
- **Knob.** Renaming is a breaking change: grep for the old name across `~/.claude/skills/` and
  any operator or substrate file that hands off to it, or the handoff silently stops resolving.

## 2. `description:` — the trigger surface, and the only always-loaded text

- **Role.** The entire basis on which the model decides to fire the skill, plus the entire basis on
  which it decides NOT to.
- **What the model does with it.** It sits in context in every session whether or not the skill is
  ever used, alongside the description of every other installed skill. So it is competing: the
  question is not "does this describe my skill" but "does this win against the fifty others when
  the user says the thing they actually say".
- **Knobs, in order of effect.**
  - *Fires too rarely* → add the user's LITERAL phrasing to the trigger clause. Not the concept,
    the words they type. "feels janky" beats "animation quality concerns".
  - *Fires on the wrong tasks* → add or sharpen the exclusion clause, naming the skill that should
    have won instead: `Not for X (other-skill)`. A description with no exclusion clause is the
    single commonest cause of a skill hijacking a neighbour's work.
  - *Fires but on the wrong assumption* → the description states WHAT but not WHEN. Add the
    condition, not more capability.
  - *Costing too much* → it is prose that repeats the body. The description's job is selection,
    not instruction. Cut anything the model does not need in order to CHOOSE.
  - *Trigger list long but hit rate flat* → several entries are synonyms for the same branch.
    Collapse each branch to its single strongest word and put that word first (Pocock: the
    pointer's WORDING, not its target, decides when the material is reached).
  - *Only ever typed as /name, never needs to self-fire* → `disable-model-invocation: true` and a
    stripped human-facing description drops its context cost to zero; the human becomes the index.

## 3. `allowed-tools:` / other frontmatter keys

- **Role.** A capability grant, and in some deployments a hard sandbox.
- **What the model does with it.** It cannot call what is not granted, so an over-narrow grant
  presents as a skill that reads correct and then cannot do its own step 3.
- **Knob.** Grant the minimum the body actually uses. Cross-check the body's commands against the
  list; a body that shells out while the grant omits Bash is a broken skill, not a cautious one.

## 4. The CRITICAL / invocation preamble (body text before the first heading)

- **Role.** The gate. It runs before any branch and is where a skill states the thing that must
  hold no matter which path is taken.
- **What the model does with it.** Reads it first, and in practice weights it heavily because it is
  unconditioned by any heading. This is where "read X before answering", "never answer from
  training knowledge", and "this is a consumer of contract Y, do not restate it" belong.
- **Knob.** *The skill answers from memory instead of the source* → the instruction to read the
  source is inside a step, so it is reachable only if the model gets to that step. Move it here.

## 5. The one-idea / rationale section

- **Role.** Tells the model WHY, which is what lets it generalise correctly to a case the author
  never wrote down.
- **What the model does with it.** Uses it to resolve the cases the procedure does not cover, which
  is most real cases. A procedure with no stated reason gets followed literally and wrongly at the
  first novel input.
- **Knob.** *Output is technically compliant and misses the point* → the intent is missing or
  buried. State the point once, plainly, above the procedure.

## 6. Procedure steps

- **Role.** The execution order.
- **What the model does with it.** Runs it roughly in file order. Order is semantics: a confirm step
  below a write step is a confirm step that happens after the damage.
- **Knobs.**
  - *Wrong thing happens before the right thing* → move the step, do not add emphasis. Caps and
    "IMPORTANT" do not reorder execution; position does.
  - *A step gets skimmed or declared done early* → its completion criterion is vague. Give the
    step a bound the model can CHECK (done vs not-done), and make it demand enough; sharpening
    the bound is the cheap fix, restructuring is the expensive one (Pocock: premature completion).

## 7. Branch tables and mode lists

- **Role.** Routing.
- **What the model does with it.** Scans for the row matching the situation. A branch buried in a
  paragraph does not get scanned, it gets read as prose and averaged.
- **Knob.** *The skill blends two modes instead of picking one* → the branch is prose. Make it a
  table with one row per case and an explicit "pick exactly one".

## 8. Reference pointers

- **Role.** The progressive-disclosure hinge: this is where on-demand cost is either spent or not.
- **What the model does with it.** Loads the pointed-at file only if the pointer is reachable in the
  path it actually took. A pointer inside a branch the run did not enter is never followed. Keep
  pointers one level deep from SKILL.md; a reference that only points at another reference is
  frequently read partially or not at all.
- **Knobs.**
  - *A reference file is never used* → it is unmentioned, or mentioned only inside a rarely-taken
    branch. Name it in the step that needs it.
  - *SKILL.md is too big* → move the bulk out and leave the pointer, which converts certain cost
    into conditional cost. Decide WHAT moves by branch, not by length: inline what every branch
    needs, disclose what only some branches reach (Pocock's test), and say which branches stop
    paying.
  - *Deep nesting* → flatten it to one hop.

## 9. Hard rules / never-do lists

- **Role.** Constraints that survive every branch.
- **What the model does with it.** Treats them as absolute, which is why a rule that is really a
  default belongs in the procedure instead. Over-stating a preference as a hard rule is how a skill
  becomes unusable in the one case that needed the exception.
- **Knobs.**
  - *The skill refuses a legitimate case* → the rule is too absolute. Add the scoped exception in
    the rule itself, where it cannot be missed.
  - *The forbidden thing still shows up* → the rule steers by prohibition alone, which drags the
    forbidden behaviour INTO context and makes it more available (Pocock: "don't think of an
    elephant"). Rewrite as the positive target behaviour; keep the prohibition only as a hard
    guardrail paired with that positive.

## 10. "When NOT to use this"

- **Role.** The body-side twin of the description's exclusion clause. It stops a skill that has
  already fired from doing a neighbour's job.
- **What the model does with it.** Hands off. This is what makes a family of skills behave like a
  system instead of five overlapping generalists.
- **Knobs.**
  - *Two skills do the same work differently* → name the boundary in BOTH, and name the winner. A
    one-sided exclusion is a coin flip.
  - *The handoff never actually fires* → it is a bare `/name` in prose. Write "call the Skill
    tool with 'x'", one skill per call (Pocock: naming the tool is what gets it fired). A
    user-invoked skill can never be reached this way at all; that dependency must become an
    instruction to the human.

## 11. Examples

- **Role.** Calibration.
- **What the model does with it.** Generalises from them, and over-fits to them. One example
  becomes the template; three varied examples become a class.
- **Knob.** *Output copies the example too literally* → vary the examples, or state the invariant
  the examples share and label the rest as incidental.

## 12. Anti-pattern lists

- **Role.** Negative calibration, and in a taste skill it does more work than the positive rules.
- **What the model does with it.** Avoids the named shape. Vague anti-patterns ("avoid clutter") do
  nothing; a named, previously-rejected instance changes behaviour.
- **Knob.** *The same bad output keeps coming back* → the anti-pattern is abstract. Replace it with
  the concrete rejected instance and, if possible, what shipped instead.

## 13. Stop rules

- **Role.** The escape hatch that ends a guess loop.
- **What the model does with it.** Asks instead of trying a third variation. Without one, a skill
  will iterate forever on a criterion it does not have.
- **Knob.** *The skill keeps guessing at a taste call* → add "two rejected passes at the same
  element means a rule is missing, ask", and say where the answer gets written down.

## 14. Scripts

- **Role.** Moves the mechanical part out of the model, where it stops being a guess.
- **What the model does with it.** Runs it and trusts the output, so anything a script CAN compute
  should never be left to the model to estimate.
- **Knob.** *Numbers in the output drift between runs* → the number is being estimated. Compute it
  in the script and forbid hand-counting in the body.

## 15. Regions that are dead weight

Name these explicitly in an X-ray; they are the highest-value finding because they are pure cost.

- Text restating a contract the skill already says it inherits.
- Prose explaining something the model already knows (what JSON is, what a PDF is).
- A no-op instruction: one the model already obeys by default ("be accurate", "be thorough" on an
  already-thorough agent). It pays load to say nothing; the edit is deleting the sentence, or
  replacing a weak leading word with a stronger one (Pocock).
- A made-up term used once. It recruits no priors, so it costs its own definition every time; a
  pretrained concept word ("seam", "red-green") does the same job free, IF used consistently in
  body and description.
- A section no branch reaches.
- A file in the folder that SKILL.md never names.
- Dated status notes and time-sensitive claims, which age into active misinformation.
- Duplicated rules that will drift apart, so the reader cannot tell which one is live.
