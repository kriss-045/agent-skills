# Checklist 6: CONSISTENCY (12 items)

Focus: What causes execution variance and unreliability across runs?

---

### C1: SKILL.md length is reasonable (<500 lines ideal, archetype-conditional)
Check: SKILL.md is under 500 lines unless archetype justifies more (workflow with embedded phase artifacts). If it exceeds 500, assess whether the additional length is genuine complexity or content that should be in reference files.
- ✅ SKILL.md is focused and self-contained; long content is in reference files
- ❌ SKILL.md is 800+ lines with content that should be in references/
Evidence: State the line count and whether excess length is justified or a structural problem.
**Severity: Important** — Long SKILL.md files cause the agent to lose track of instructions. Key workflow steps buried deep are more frequently skipped or misread.

---

### C2: Reference files are used appropriately
Check: Reference files contain reference material (checklists, lookup tables, detailed guides) — not workflow instructions. Workflow logic lives in SKILL.md; content lives in reference files.
- ✅ SKILL.md has the workflow; references/ has detailed content the workflow points to
- ❌ Reference file contains "Step 1: Do X, Step 2: Do Y" workflow logic that belongs in SKILL.md
Evidence: Assess whether the split between SKILL.md and reference files respects the workflow/content boundary.
**Severity: Important** — When workflow logic is scattered, the agent loses the thread of execution.

---

### C3: Caps directives are justified (consistency view)
Check: Same condition as E2 — every ALWAYS/NEVER/MUST/CRITICAL has a "Why:" or "because" clause within 1 line. From the consistency angle: bare caps cause the agent to apply them dogmatically across runs even when input would warrant exception, while justified caps let the agent reason consistently about whether the underlying reason applies.

- ✅ "NEVER use Inter font. Every LLM converges on it..." — across runs, the agent applies the rule consistently because it understands the criterion (convergence-on-baseline).
- ❌ "NEVER use Inter font." — across runs, the agent may waffle when pushed; consistency is brittle.

This **replaces** the v5 rule that counted caps directives (≤5–7). The number is not the problem; un-justified caps are the problem.

Reference E2 if already evaluated — no need to re-analyze. State the consistency impact.
**Severity: Important** — Bare caps produce inconsistent compliance under edge cases; justified caps produce consistent reasoned compliance.

---

### C4: Instructions are generalizable (not overfitted to examples)
Check: Instructions describe general patterns, not specific instances. If the skill's instructions would only work correctly for the exact examples used during development, they are overfitted.
- ✅ "For each checklist item, record PASS, FAIL, or N/A based on whether the condition is met."
- ❌ "For item B1, check if the folder is named 'pdf-processor' — if so, mark PASS."
Evidence: Identify any instructions that appear to describe specific test cases rather than general rules.
**Severity: Critical** — Overfitted instructions produce correct results only for the examples they were written around. This is the most common source of poor skill generalization.

---

### C5: Examples match the generalized instructions
Check: Any examples in the skill accurately illustrate what the instructions say — they are not edge cases, exceptions, or the only cases where the instructions happen to work.
- ✅ Example shows the standard case; the instructions clearly generalize from it
- ❌ Example is an unusual case that required special handling; typical inputs would not be handled by the same logic
Evidence: For each example, assess whether a typical input would be handled correctly by the same instructions.
**Severity: Important** — Mismatched examples and instructions cause the agent to follow the example rather than the instruction.

---

### C6: Output format is consistently specified
Check: If the skill produces structured output, the output format is defined once and applied consistently. The skill does not describe one format in the instructions and show a different format in examples.
- ✅ Output template is defined clearly and examples follow it exactly
- ❌ Instructions say "produce a numbered list" but examples show a bulleted list
Evidence: Compare the specified output format against any examples to confirm they match.
**Severity: Important** — Output format inconsistency causes the agent to alternate between formats across runs.

---

### C7: Description length matches description style (consistency view)
Check: Same condition as D2 — single-purpose descriptions in 120–600 chars, keyword-enumerating descriptions in 200–1024 chars, and all three content elements present (what / when / keywords). From the consistency angle: descriptions outside their style's range cause inconsistent triggering — sometimes the skill fires on a variant phrasing, sometimes it doesn't.

- ✅ Description is in the right range for its style → consistent triggering
- ❌ Missing a content element (what / when / keywords): skill is missed on variant trigger phrases. Over 600 without 5+ enumerated triggers: key trigger signals are diluted by noise.

Reference D2 if already evaluated — no need to re-analyze, just note the consistency impact.
**Severity: Important** — Inconsistent triggering means the skill runs on some inputs that should trigger it but not others.

---

### C8: No contradictory instructions
Check: No two instructions in the skill contradict each other. If a later instruction overrides an earlier one, the override is explicit and clear.
- ✅ Instructions are internally coherent; no two rules require opposite actions in the same situation
- ❌ "Always include an executive summary" in section 2, "Do not include a summary if the report is short" in section 4, with no definition of "short"
Evidence: Identify any contradictions found, or confirm internal consistency.
**Severity: Critical** — Contradictory instructions cause the agent to pick whichever it encountered last (or most recently in context), producing different behavior across runs.

---

### C9: Error handling is defined (not left to agent judgment)
Check: When errors or unexpected conditions occur, the instructions tell the agent exactly what to do — not "handle appropriately" or "use your judgment." Consistent error handling requires explicit instructions.
- ✅ "If the input file is missing, output: 'No skill files found to evaluate.' and stop."
- ❌ "Handle any errors that come up gracefully." (agent defines 'graceful' differently each time)
Evidence: Describe the error handling instructions present, and assess their specificity.
**Severity: Important** — Vague error handling is one of the primary sources of inconsistency.

---

### C10: Terminology is consistent throughout
Check: Same check as Q7, evaluated here for its impact on consistency. Key terms are used identically across SKILL.md and all reference files. No alternation between synonyms for the same concept.
- ✅ "checklist item" is always "checklist item" — never "check", "criterion", "rule", or "evaluation point"
- ❌ "checklist item" in SKILL.md becomes "criterion" in one reference file and "check" in another
Evidence: Identify any terminology inconsistencies across files, or confirm consistency.
**Severity: Quality** — Terminology drift causes the agent to treat the same concept as distinct.

---

### C11: Conviction has inline justification (cross-cutting check)
Check: Beyond individual caps directives (E2), the skill's overall conviction pattern is justified. Every strong claim, opinion, or directive — whether in caps or in regular prose — should have a reason within proximity. This is the broader form of E2.

- ✅ "Prefer fewer, focused skills that compose. Reason: monolithic skills are harder to trigger correctly, harder to maintain, and produce less consistent output." (`addyosmani/agent-skills`)
- ❌ "Prefer fewer, focused skills that compose." (asserts a position with no reasoning)
- ❌ Numbered rules without why clauses: "Rule 3: Test before deploying. Rule 4: Document edge cases." (dogma)

Conviction without justification produces brittle compliance; conviction with justification produces transferable judgment that survives edge cases consistently across runs.

Evidence: Identify any strong claims, numbered rules, or opinionated assertions that lack inline reasoning. Quote 1–2 examples of each kind found.
**Severity: Important** — Across runs, unjustified conviction collapses under pressure differently each time. Justified conviction holds consistently because the agent has the underlying logic.

---

### C12: Borrowed authority cited specifically **(optional)**
Check: If the skill references external authority (a standard, a researcher, an organization, a published guide), the source is named and ideally linkable.

- ✅ "Based on Wikipedia's 'Signs of AI writing' guide, maintained by WikiProject AI Cleanup." (`humanizer`)
- ✅ "Citation styles follow APA, Nature, or Vancouver conventions." (`K-Dense-AI/literature-review`)
- ✅ "Maintained by Vercel." (`vercel-labs/agent-skills/react-best-practices`)
- ❌ "Based on industry standards." (no specific source — can't be audited)
- ❌ "Following best practices from major tech companies." (vague appeal to authority)

**Mark N/A if the skill does not lean on external authority** — many skills assert their own opinions without borrowing authority, which is fine.

Evidence: Quote any borrowed-authority claims if present, and confirm the source is named specifically. State N/A if the skill stands on its own opinions.
**Severity: Quality (if applicable)** — Specific borrowed authority gives the agent calibrated compliance. Vague appeals to authority are rationalized away inconsistently across runs.
