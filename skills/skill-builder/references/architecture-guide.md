# Architecture Guide

This guide covers the structural decisions that determine whether a skill will be reliable and maintainable. These decisions must be made before writing instructions — architecture changes after writing are expensive and produce inconsistency.

---

## Table of Contents

1. Scope: One skill or multiple?
2. Complexity tiers
3. SKILL.md vs. reference files: the split
4. Reference file naming and organization
5. Optional vs. universal steps
6. Output format decisions
7. Branching architecture for complex skills
8. Common architecture mistakes

---

## 1. Scope: One skill or multiple?

**The one-sentence test**: can the skill's purpose be stated in one sentence without using "and" or "or" to describe distinct functions?

- "Evaluates the quality of an Agent Skill and returns a report" → single purpose, single skill
- "Evaluates skills AND creates new skills AND tracks versions" → three purposes, likely three skills or at minimum a clear routing structure

**Sequential variants are not scope violations.** A skill that processes PDFs differently depending on whether they are text-based or scanned is one skill with two branches — not two skills. The goal is the same; the path varies.

**Distinct functions are scope violations.** A skill that both evaluates skills AND creates skills is doing two things. A user requesting "evaluate this skill" and a user requesting "create a new skill" have different needs, expect different outputs, and benefit from different trigger conditions. Combining them degrades both.

**When the user wants everything in one skill:**
Explain that a combined skill is triggered ambiguously (the description cannot be precise for two distinct functions) and maintained poorly (improving the evaluation logic risks breaking the creation logic). Offer to create both skills with a brief explanation of when to use each.

---

## 2. Complexity tiers

### Tier 1 — Simple
**Structure:** SKILL.md only, under 150 lines  
**Characteristics:** Single workflow, no branching, no reference lookup needed, output format is obvious from context  
**When to use:** The skill performs one well-defined operation on a consistent input type  
**Examples:** Commit message formatter, code comment generator, filename normalizer

### Tier 2 — Moderate
**Structure:** SKILL.md under archetype's length budget (60–200 for aesthetic, 200–500 for reference/workflow) + 1–3 reference files  
**Characteristics:** Multi-step workflow, requires reference lookup, or produces structured output that benefits from a template  
**When to use:** The skill follows a checklist or rubric, produces a report with defined sections, or needs a lookup table the agent consults mid-workflow  
**Examples:** Document quality reviewer, meeting notes formatter with defined sections, code review checklist runner

### Tier 3 — Complex
**Structure:** SKILL.md (under 500 lines) + organized reference files + possibly scripts  
**Characteristics:** Multiple input types or domains, significant branching logic, reference material that would bloat SKILL.md if inlined, output requires deterministic formatting  
**When to use:** The skill handles genuinely different cases that share a workflow entry point but diverge significantly  
**Examples:** Multi-format report generator, skill evaluator with per-category checklists, deployment automation that varies by cloud provider

**The Tier 3 trap:** Many skills that start as Tier 2 become Tier 3 mid-write as complexity is discovered. The correct response is to pause, re-run Phase 2, and reorganize — not to continue writing and absorb the complexity inline. An inline-absorbed Tier 3 skill is a monolith. Monoliths fail at scale.

---

## 3. SKILL.md vs. reference files: the split

**The rule:** SKILL.md contains logic. Reference files contain content.

| Belongs in SKILL.md | Belongs in reference files |
|---------------------|---------------------------|
| Workflow steps | Checklists |
| Decision logic | Lookup tables |
| Branching conditions | Output templates |
| Instructions for when to read reference files | Domain-specific rules |
| Error handling | Detailed guides (>40 lines) |
| Output format specification | Examples that don't fit inline |

**The 40-line threshold:** If a section of SKILL.md would be longer than 40 lines and is reference material (consulted, not followed step by step), it belongs in a reference file. This is a guideline, not a hard cutoff — use judgment.

**The inlining smell:** If you find yourself writing "here is the full checklist:" followed by more than 10 items directly in SKILL.md, that is a reference file. Extract it, name it, and replace the inline content with: "Read `references/[file-name].md` in full."

**Progressive disclosure in practice:**
```
## Step 2: Evaluate basics

Read `references/checklist-basics.md` in full.
Work through every item (B1–B8) against the skill content.
Output results using the format specified in that file.
Checkpoint: confirm all 8 items are evaluated before proceeding.
```
This pattern keeps SKILL.md as the authoritative workflow while reference files hold the detail. The agent knows what to do (evaluate basics) and where to find the how (the checklist file).

---

## 4. Reference file naming and organization

**Naming conventions:**
- `checklist-[category].md` — for evaluation checklists
- `template-[output-type].md` — for output format templates
- `rules-[domain].md` — for domain-specific rules the agent consults
- `guide-[topic].md` — for detailed instructional guides
- `lookup-[table-name].md` — for reference tables

**Do not use:** `ref1.md`, `notes.md`, `extra.md`, `misc.md` — these names are meaningless to an agent and to future maintainers.

**Internal organization for long reference files (>100 lines, per Anthropic's authoring best practices):**
Always open with a table of contents:
```markdown
## Table of Contents

1. [Section Name](#anchor)
2. [Section Name](#anchor)
3. [Section Name](#anchor)
```

Use consistent heading levels throughout. An agent navigating a long reference file without a TOC will miss content in later sections.

**Cross-file references:**
If SKILL.md points to a reference file, and that reference file points to another reference file, document this chain explicitly in SKILL.md. Hidden dependencies between reference files cause the agent to miss context.

---

## 5. Optional vs. universal steps

**Definition:** A step is optional if its applicability depends on a condition that may or may not be true for any given skill use.

**Common optional conditions:**
- `(optional — if scripts exist)`: script-related checks
- `(optional — if reference files exist)`: TOC, organization checks
- `(optional — if file-specific)`: file type mentions
- `(optional — if structured output expected)`: template requirements
- `(optional — if destructive operations exist)`: safety warnings

**How to mark optional steps in instructions:**
```
OPTIONAL — only if [condition]:
[instruction]
Skip this step entirely if [condition is not met].
```

**Why this matters:**
Universal instructions applied to cases where they do not apply produce false failures, agent confusion, and inconsistent output. A skill that instructs the agent to "check script safety" when no scripts exist causes the agent to either invent scripts to evaluate or skip the step silently — both are worse than marking it optional.

**The N/A scoring rule:**
When scoring evaluations, N/A items are excluded from the denominator. A skill with 3 applicable items and 5 N/A items scores as X/3, not X/8. This means optional items do not penalize simple skills unfairly.

---

## 6. Output format decisions

**When an explicit template is required:**
- The output has named sections that must appear in a specific order
- Downstream consumers (scripts, other agents, users) depend on consistent field names
- The skill is evaluated against a rubric that references specific output sections
- Multiple input types converge on the same output format

**When a template is not required:**
- The output is free-form prose where structure adapts to content
- The output is code where structure is determined by the language
- The output is a simple response where format would be over-specified

**Template format in SKILL.md:**
Define templates using literal format blocks, not prose descriptions:
```
Use this exact output structure:

=== EVALUATION REPORT: [skill-name] ===

CATEGORY: [name]
Score: X/Y passed

[ITEM-ID] PASS/FAIL/N/A — [finding]
...

SUMMARY: [2–3 sentence overall assessment]
```

Prose descriptions of output format ("include a section about the score, then list findings") produce variable structure across runs. Literal templates produce consistent structure.

**Templates in reference files:**
For complex output templates (more than 20 lines), put the template in a reference file: `template-evaluation-report.md`. Reference it from SKILL.md: "Use the output template in `references/template-evaluation-report.md` exactly."

---

## 7. Branching architecture for complex skills

Complex skills (Tier 3) require explicit branch mapping before writing instructions.

**Branch mapping table:**

| Input type / condition | Entry point | Divergence point | Reference file | Output format |
|------------------------|-------------|-----------------|----------------|---------------|
| [Case A description]   | Step 1      | Step 3          | rules-caseA.md | Template A    |
| [Case B description]   | Step 1      | Step 3          | rules-caseB.md | Template B    |
| [Case C description]   | Step 1      | Step 2          | none           | Template A    |

Present this table to the user and confirm before writing instructions. An unconfirmed branch map is an assumption, and assumptions in Tier 3 skills produce exactly the wrong behavior on the cases they get wrong.

**Instruction pattern for branching:**
```markdown
## Identify which case applies

Examine the input and determine the case:
- If [condition A]: proceed to Section A
- If [condition B]: proceed to Section B  
- If [condition C]: proceed to Section C
- If none of the above: [fallback instruction, not silence]

---

## Section A: [Case A Name]

[All instructions for Case A. Do not reference Case B here.]

---

## Section B: [Case B Name]

[All instructions for Case B. Do not reference Case A here.]
```

Never interleave Case A and Case B instructions in the same section. The agent cannot reliably track which branch it is in across mixed instructions.

---

## 8. Common architecture mistakes

**Mistake 1: The monolith**
Symptom: SKILL.md is 600+ lines with everything inlined.  
Cause: Complexity was absorbed mid-write rather than planned.  
Fix: Identify which sections are reference material (checklists, templates, rules) and extract them to reference files.

**Mistake 2: The hollow skeleton**
Symptom: SKILL.md has good structure but reference files are empty or missing.  
Cause: Structure was planned but content was not written.  
Fix: Complete the reference files. An instruction that says "read references/guide.md" that does not exist is worse than no instruction.

**Mistake 3: The overfitted example**
Symptom: Instructions work correctly for the test case used during development but fail on other inputs.  
Cause: Instructions were written to pass the example, not to generalize.  
Fix: After writing each instruction, ask: "Would this work if [one specific detail] changed?" If no, generalize it.

**Mistake 4: The optional universal**
Symptom: Every run produces N/A for several items, or the agent invents content to evaluate for items that don't apply.  
Cause: Optional steps were written as universal instructions.  
Fix: Identify which steps depend on conditions. Mark them explicitly optional with a skip instruction.

**Mistake 5: The description afterthought**
Symptom: The description accurately describes what the skill does but uses no language a user would actually say when requesting it.  
Cause: Description was written to describe, not to trigger.  
Fix: Add 3–5 user-facing trigger phrases. The description must speak in user language, not skill language.

**Mistake 6: The silent branch**
Symptom: The skill works for documented cases and produces unexpected output for undocumented cases.  
Cause: Branch mapping was incomplete. Some inputs fall through without hitting a defined branch.  
Fix: Add an explicit fallback for unmatched inputs. Never leave an input without a defined path.
