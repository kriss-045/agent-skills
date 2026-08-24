# Checklist 4: QUALITY (14 items)

Focus: Is this GOOD, not just working?

---

### Q1: Built for real, repeated need
Check: The skill addresses a task that will genuinely recur — not a one-off task that should have been a direct prompt or a task so narrow it applies to one project.
- ✅ Task happens regularly across different users, contexts, or inputs
- ❌ Skill was built for a single project's specific setup and is unlikely to be reused
Evidence: Assess whether the skill's purpose suggests repeated, varied use or a one-time task.
**Severity: Important** — Skills built for one-time tasks create maintenance burden and catalog noise without delivering recurring value.

---

### Q2: Instructions are clear and unambiguous
Check: Every instruction has one obvious interpretation. There are no phrases that a reasonable person could interpret in two different ways.
- ✅ "If the description exceeds 600 characters, mark D2 as FAIL" — one interpretation
- ❌ "Make sure the description is a good length" — completely ambiguous
Evidence: Identify any ambiguous instructions, or confirm clarity.
**Severity: Important** — Ambiguous instructions produce inconsistent results across runs.

---

### Q3: Voice is direct (conviction OK, chatty not OK)
Check: Distinguish two cases — both can appear in skill writing, only one is a problem.

**Conviction voice (acceptable / strength for judgment skills):** direct, opinionated, signal-dense, sometimes confrontational. Conviction with reasoning is documented in top judgment skills.
- ✅ "Test-Driven Development — Write tests first, always. Systematic over ad-hoc — Process over guessing." (`superpowers`)
- ✅ "why use many token when few token do trick" (`caveman`)
- ✅ "Thinking 'skip TDD just this once'? Stop. That's rationalization." (`superpowers/tdd`)

**Chatty filler (always a weakness):** verbose, encouragement-padded, conversational asides that dilute signal.
- ❌ "Great! Now let's move on to the next step, which is really important — you'll want to make sure you carefully..."
- ❌ "Awesome work so far! In this next section, we're going to be looking at..."

The distinction: conviction has a position and gets to the point in fewer words. Chatty has no position and uses more words to say less.

This **replaces** v5's strict "professional tone" check, which would have flagged `caveman` (a top-of-leaderboard skill) as too casual.

Evidence: Quote any chatty / filler phrases found. Also note whether the skill uses conviction-voice (and whether that fits the archetype — see Step 0.5).
**Severity: Quality** — Chatty padding always dilutes signal. Conviction with reasoning is a strength for judgment archetype.

---

### Q4: No human-facing docs inside the skill folder
Check: The skill folder itself (the directory containing SKILL.md) does not contain files intended for human readers that serve no function for the agent — README.md, CHANGELOG.md, CONTRIBUTING.md, dev-notes, roadmap files.
- ✅ skill-name/ contains only SKILL.md, references/, scripts/, assets/
- ❌ skill-name/README.md, skill-name/CHANGELOG.md, skill-name/CONTRIBUTING.md, skill-name/TODO.md, skill-name/dev-notes.txt

**Scope:** This check applies *inside the skill folder*. A README.md in the *parent repo* (describing a collection of skills, install instructions, etc.) is fine and even expected — that's normal repo hygiene.

Evidence: List files inside the skill folder (one level deep) and flag any that appear human-facing. Do not flag files in the parent repo.
**Severity: Quality** — Human-facing files inside the skill folder add noise to the agent's view of the skill. The agent may attempt to read them as instructions, producing unexpected behavior. Files in the parent repo are out of the agent's load path and don't count.

---

### Q5: SKILL.md length is appropriate (archetype-conditional)
Check: SKILL.md length should match archetype expectations.

| Archetype | Typical body length | Notes |
|---|---|---|
| Aesthetic / judgment | 60–200 lines | Voice + anti-patterns + examples; depth in companions |
| Reference / runbook | 200–500 lines | Code examples take space; depth in `REFERENCE.md` |
| Workflow / methodology | 200–500+ lines | Phased structure + artifact specs; depth in templates / mode files |

The Agent Skills spec recommends <500 lines generally. Outliers exist (`skill-creator` is ~2,500 because it bundles eval framework). A 2,500-line aesthetic skill, by contrast, is a bloat signal.

- ✅ Length matches archetype expectations
- ❌ 800-line aesthetic skill, or 50-line workflow skill that's clearly underspecified
Evidence: State the line count, the archetype, and whether the length is in the expected range for that archetype.
**Severity: Important** — Length mismatch signals structural problems: too long for aesthetic = unfocused / bloated; too short for workflow = under-specified.

---

### Q6: Instructions match actual capability
Check: The skill does not instruct the agent to do things that are impossible or unreliable — such as accessing URLs that weren't provided, calling APIs without credentials, or performing real-time lookups from memory.
- ✅ All instructions are within the agent's actual capability given the context and tools available
- ❌ "Search the web for the latest version" (if web search is not enabled); "Remember what the user said last session" (impossible)
Evidence: Identify any instructions that exceed the agent's realistic capability, or confirm alignment.
**Severity: Important** — Instructions that exceed capability will either be silently skipped or result in hallucinated output as the agent improvises.

---

### Q7: Terminology is consistent throughout
Check: The skill uses the same term for the same concept throughout — it does not alternate between "skill", "agent skill", and "plugin" to mean the same thing, or use "evaluate" and "assess" interchangeably without defining a distinction.
- ✅ Key terms are used consistently from first mention to last
- ❌ "Document" in section 1 becomes "file" in section 2 and "artifact" in section 3, referring to the same thing
Evidence: Note any terminology inconsistencies found, or confirm consistency.
**Severity: Quality** — Inconsistent terminology causes the agent to treat the same concept as distinct.

---

### Q8: Instructions are appropriately detailed
Check: Instructions provide enough detail to execute correctly without requiring the agent to make significant judgment calls — but not so detailed that they become rigid scripts that break on variation.
- ✅ Enough detail to produce consistent output; enough flexibility to handle input variation
- ❌ Too sparse: "Evaluate the skill and produce a report." Too rigid: every micro-decision is prescribed, leaving no room for the input to vary.
Evidence: Assess the level of detail and whether it strikes the right balance.
**Severity: Important** — Under-detailed skills produce wildly inconsistent output. Over-detailed skills fail on any input that differs from the exact scenario they describe.

---

### Q9: Reference files are well-organized **(optional — if reference files exist)**
Check: Reference files use clear headings, consistent formatting, and logical section order. A reader can navigate them without reading every word.
- ✅ Clear headings, logical flow, consistent formatting across files
- ❌ Reference file is a wall of text, or uses inconsistent heading levels and formatting
**Mark N/A if no reference files exist.**
Evidence: Describe the organization of reference files, or state N/A.
**Severity: Quality (if applicable)** — Poorly organized reference files slow down the agent and increase the chance that relevant content is missed.

---

### Q10: Skill solves one clear problem (not multiple unrelated tasks)
Check: The skill has a single, clearly defined purpose. If the skill description requires "and also" to explain its scope, it may be doing too much.
- ✅ Skill evaluates agent skills — one clear function
- ❌ Skill evaluates agent skills AND generates new skills AND updates existing ones AND tracks versions
Evidence: Assess whether the skill's purpose is singular and coherent.
**Severity: Important** — Skills with multiple unrelated functions are harder to trigger correctly, harder to maintain, and produce less consistent output.

---

### Q11: No obvious copy-paste errors or inconsistencies
Check: The skill does not contain leftover placeholder text, instructions from a different skill, mismatched examples, or references to concepts not defined in this skill.
- ✅ All content is coherent and relevant to this skill's purpose
- ❌ "Replace this with your checklist items", outdated item IDs, examples referencing a different skill's domain
Evidence: Note any copy-paste artifacts or inconsistencies found, or confirm clean.
**Severity: Quality** — Copy-paste errors undermine trust and confuse the agent about actual requirements.

---

### Q12: House-specific context provided; general knowledge NOT re-explained
Check: Two-sided (rescoped in v7 to match Anthropic's "Claude is already very smart" principle):
1. **House-specific context IS provided** — project conventions, internal term meanings, org-specific rules, and anything the agent could not know from training ("'active client' means status=2 AND last_visit within 90 days") are defined on first use.
2. **General knowledge is NOT re-explained** — the skill does not define what a PDF is, what an API does, or other things any capable model already knows. Per Anthropic's best practices, every such paragraph is pure token cost ("Does Claude really need this explanation?").
- ✅ Defines the org's own acronyms and thresholds; assumes the agent knows standard tools and formats
- ❌ Uses an internal codename with no definition; OR opens with "PDF (Portable Document Format) files are a common file format that contains text, images..."
Evidence: Identify any house-specific concept used without definition, AND any general-knowledge explanation that should be cut.
**Severity: Quality** — Missing house context forces the agent to guess from training data; re-explained general knowledge dilutes the instructions that actually matter.

---

### Q13: Anti-patterns name specific failures **(judgment archetype only)**
Check: For judgment / aesthetic skills, anti-patterns are primary content, not asides. They must name *specific* observable failures — exact font names, exact library names, exact technique names — not vague categories. Specifics are checkable; categories are rationalizable.

- ✅ Specific (checkable):
  - "Don't use Inter, Roboto, or Arial." (`frontend-design`)
  - "Inter font + violet accents + gradient text — banned." (`visual-explainer`)
  - "NEVER add Chain of Thought to reasoning-native models (o3, o4-mini, DeepSeek-R1, Qwen3)." (`prompt-master`)
  - "29 named AI-writing patterns: em-dash overuse, rule of three, AI vocabulary, vague attributions..." (`humanizer`)

- ❌ Vague (rationalizable):
  - "Avoid generic AI aesthetics."
  - "Don't use overused fonts."
  - "Use fewer techniques that cause fabrication."

Additionally for judgment skills: anti-patterns should appear in **substantial proportion** to positive guidance — often 40–60% of body content. A judgment skill with only positive guidance and no anti-pattern catalog is missing the load-bearing half.

**Mark N/A if archetype is Reference or Workflow.** For procedure skills, code examples carry the load; anti-patterns are secondary.

Evidence: For judgment skills, count the anti-patterns and assess specificity. Quote at least 2 to confirm they name observable features. If the skill is judgment archetype but has no anti-pattern catalog, FAIL.
**Severity: Important (judgment archetype only)** — Vague anti-patterns get rationalized around; specific ones produce reliable compliance. This is *the* differentiator between average and top-tier judgment skills.

---

### Q14: Eval discipline / measurement evidence **(quality bonus)**
Check: The skill or its companion README publishes evidence that the instruction actually changes agent behavior — A/B numbers, benchmark scores, with-skill vs without-skill comparisons, or a documented eval set.

- ✅ "96.7% benchmark pass rate (29/30 assertions) with the skill, 6.7% pass rate without. 3/3 blind A/B wins." (`OthmanAdi/planning-with-files`)
- ✅ Skill ships with `evals/` directory containing test queries and expected behaviors
- ✅ README documents the eval methodology and shows results
- ❌ No measurement evidence; quality is asserted, not demonstrated

**Mark N/A only if the skill is genuinely small enough that formal evals would be overkill** (e.g., a single-step lookup skill). Most non-trivial skills warrant at least a minimal eval set.

Evidence: Quote eval numbers or describe the eval methodology if present, or note the absence.
**Severity: Quality (bonus)** — Per Anthropic's `skill-creator`, eval discipline is "the largest gap between Anthropic's own skills and the most starred community ones." Skills with eval evidence are calibrated; skills without are intuition-only. Don't fail a skill just for lacking evals, but reward those that have them — and flag the absence in the report.
