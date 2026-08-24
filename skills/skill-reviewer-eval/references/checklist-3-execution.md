# Checklist 3: EXECUTION (16 items)

Focus: Will it work correctly once triggered?

---

### E1: Instructions explain WHY, not just WHAT
Check: The skill body does not only list steps or rules — it explains the reasoning behind key decisions. An agent following this skill should understand why a step is taken, not just that it is required.
- ✅ "Check for missing fields before processing — if fields are absent, later steps will fail silently and produce incorrect output."
- ❌ "Check for missing fields. Then process the input. Then generate output." (no reasoning provided)
Evidence: Quote one rule or step that includes reasoning, and one (if any) that is bare instruction.
**Severity: Important** — Instructions without reasoning are brittle. When the agent encounters an edge case the instruction does not cover, it has no basis for judgment and will guess or fail.

---

### E2: Caps directives have inline justification
Check: Every ALWAYS / NEVER / MUST / DO NOT / CRITICAL directive is followed by a "Why:" or "because" clause within 1 line, explaining the underlying reason. Bare caps without justification produce brittle dogma; caps with reasoning produce transferable judgment.
- ✅ "NEVER use Inter font. Every LLM converges on it; using it makes output indistinguishable from generic AI."
- ✅ "MUST disable triggers during bulk UPDATEs — per-row audit logs slow the migration and impact the live app."
- ❌ "NEVER use Inter font." (no reason — agent has nothing to reason about under pressure)
- ❌ "ALWAYS validate input." (no reason — applied dogmatically)

This **replaces** the v5 rule that counted caps directives (≤5–7). Anthropic's `frontend-design` and many top judgment skills (`impeccable`, `taste-skill`, `humanizer`) use caps liberally and are excellent — because every cap has an inline why-clause.

Evidence: Count caps directives. For each, state whether a justification appears within 1 line. Flag bare caps specifically.
**Severity: Important** — Bare caps fail under edge cases ("but the user explicitly asked for Inter"). Justified caps transfer — the agent can reason about whether the underlying reason applies.

---

### E3: Includes examples (if instructions are non-trivial) **(optional — if instructions are complex)**
Check: If the skill performs a non-trivial task (judgment calls, structured output, multi-step workflows), it includes at least one worked example that shows input → process → output.
- ✅ Shows a sample input and the expected output format, or walks through a step with a concrete case
- ❌ Instructions describe a complex process but provide no examples of what correct output looks like
**Mark N/A if the skill is simple enough that examples would be redundant (e.g., a single-step lookup).**
Evidence: Describe any examples present, or state N/A.
**Severity: Important (if applicable)** — Without examples, agents interpret ambiguous instructions differently on each run, producing inconsistent output.

---

### E4: Examples match instructions (not overfitted)
Check: If examples are present, they accurately illustrate the instructions without being so specific that the agent treats only those exact cases as valid inputs.
- ✅ Example shows the pattern, not just one specific instance; other inputs would clearly be handled the same way
- ❌ Example is so narrow (one specific file name, one specific user name) that the agent treats only that case correctly
Evidence: Assess whether examples generalize to typical real inputs.
**Severity: Important** — Overfitted examples cause the agent to fail on inputs that differ even slightly from the example, which is most real inputs.

---

### E5: Clear output format specified **(optional — if structured output expected)**
Check: If the skill is expected to produce structured output (a report, a table, a JSON object, a specific document format), the output format is explicitly defined in the instructions.
- ✅ Provides a template or describes the exact fields, sections, and order of the output
- ❌ Instructions say "generate a report" but do not define what sections a report must contain
**Mark N/A if the skill's output is free-form prose where format is intentionally flexible.**
Evidence: Describe the output format specification, or state N/A.
**Severity: Important (if applicable)** — Undefined output format leads to inconsistent structure across runs, making output hard to use downstream.

---

### E6: Error handling guidance provided
Check: The instructions tell the agent what to do when something goes wrong — missing input, unexpected values, tool failures, ambiguous cases.
- ✅ "If the input file cannot be read, note the error in findings and continue with what is available."
- ❌ Instructions assume all inputs arrive correctly and provide no guidance on failures
Evidence: Describe the error handling instructions present, or note their absence.
**Severity: Important** — Skills without error handling silently fail, guess, or halt on edge cases that occur regularly in real use.

---

### E7: Edge cases addressed
Check: The instructions anticipate at least the most common edge cases for this skill's domain. These are inputs or conditions that differ from the happy path but are not rare.
- ✅ "If the skill has no reference files, assess whether the SKILL.md body is appropriately self-contained or bloated."
- ❌ Instructions only describe the ideal-case flow; no mention of what happens when inputs vary
Evidence: List edge cases addressed, or note their absence.
**Severity: Important** — Unaddressed edge cases are gaps the agent will fill with guesswork, producing inconsistent or incorrect results.

---

### E8: Progressive disclosure implemented **(optional — if reference files exist)**
Check: If the skill has reference files, SKILL.md does not reproduce their content inline. Instead, SKILL.md directs the agent to read specific reference files at the appropriate point in the workflow. References should be one hop from SKILL.md — avoid nested chains.
- ✅ "Read references/checklist-1-basics.md in full before evaluating basics."
- ❌ Reference file content is copy-pasted into SKILL.md, making the main file bloated
- ❌ SKILL.md → REFERENCE.md → DETAILED.md → SPECIFIC.md (nested chain costs tokens at every hop)
**Mark N/A if the skill has no reference files.**
Evidence: Confirm that reference files are referenced (not reproduced) in SKILL.md, and that the chain is one hop deep, or state N/A.
**Severity: Important (if applicable)** — Reproducing reference content in SKILL.md degrades agent attention. Nested reference chains burn tokens and reasoning steps.

---

### E9: Reference files have TOCs (if >100 lines) **(optional — if long reference files exist)**
Check: If any reference file exceeds 100 lines, it begins with a table of contents that allows the agent to navigate to relevant sections. (Threshold per Anthropic's skill authoring best practices: "For reference files longer than 100 lines, include a table of contents at the top." The Agent Skills spec itself sets no TOC threshold. v6 claimed 300 citing the spec; that was wrong, corrected in v7.)
- ✅ Long reference file opens with a list of sections and their heading names
- ❌ 200-line reference file begins immediately with content, no navigation aid
**Mark N/A if no reference files exist, or if all reference files are under 100 lines.**
Evidence: Check length of each reference file and whether TOCs are present where needed.
**Severity: Quality (if applicable)** — Without a TOC, agents reading long reference files may miss later sections or lose track of structure.

---

### E10: Scripts are documented **(optional — if scripts exist)**
Check: If the skill includes scripts, each script has inline comments or an accompanying description explaining what it does, what inputs it expects, and what it outputs.
- ✅ Script opens with a comment block describing purpose, inputs, and outputs; key logic blocks are annotated
- ❌ Script file contains bare code with no comments
**Mark N/A if no scripts exist.**
Evidence: Describe the documentation level of scripts present, or state N/A.
**Severity: Important (if applicable)** — Undocumented scripts cannot be safely maintained, modified, or verified by the agent or human reviewers.

---

### E11: Not everything embedded in SKILL.md
Check: SKILL.md is not a monolithic file containing all content — long reference material, lookup tables, and detailed guides are in separate reference files, not inlined.
- ✅ SKILL.md is focused on orchestration and workflow; detailed content is in references/
- ❌ SKILL.md contains full lookup tables, multi-page guides, or content that would naturally belong in a reference file
Evidence: Assess whether SKILL.md length and content suggest inappropriate monolithic structure.
**Severity: Important** — An overstuffed SKILL.md degrades agent performance. The agent's attention window is finite; burying workflow instructions in long documents causes instructions to be missed or deprioritized.

---

### E12: Instructions are generalizable (not overfitted)
Check: The instructions work correctly for the full range of inputs the skill is intended to handle — not just the specific examples used during development.
- ✅ Instructions describe patterns and principles that apply across varied inputs
- ❌ Instructions reference specific file names, user names, or scenarios that only apply to test cases
Evidence: Identify any instructions that appear tied to specific test cases rather than general patterns.
**Severity: Critical** — Overfitted instructions produce correct results only for the examples they were written around. Real inputs will fail in non-obvious ways.

---

### E13: Workflow skills compose via named handoffs **(workflow archetype only)**
Check: For workflow / orchestrator skills, the body invokes other named skills via explicit `@skill-name` references or named handoff. The skill's value is sequence + orchestration; per-step expertise lives in the called skills.
- ✅ "Phase 3: Run @code-reviewer. Phase 4: Hand off to @qa-plan." (`sickn33/antigravity-awesome-skills/security-audit`)
- ✅ "Depends on @parallel-web, @scientific-schematics, @gget, @bioservices." (`K-Dense-AI/literature-review`)
- ❌ Workflow skill that re-implements adjacent functionality inline rather than calling a focused skill
**Mark N/A for reference and aesthetic archetypes.**
Evidence: List named handoffs or skill invocations present, or state N/A.
**Severity: Important (workflow archetype only)** — Composition over generalization. A workflow skill that does everything itself is fragile and hard to maintain; one that orchestrates focused sub-skills compounds across the whole catalog.

---

### E14: No time-sensitive information
Check: The body contains no instructions that will silently become wrong as time passes: date-conditional guidance ("before August 2025 use the old API"), "latest version" claims, or references to current events. Deprecated approaches, if kept, live in a clearly labeled "old patterns" section separated from the current method.
- ✅ "Use the v2 endpoint: api.example.com/v2/messages" with legacy v1 in a collapsed "Old patterns" block
- ❌ "If you're doing this before August 2025, use the old API. After August 2025, use the new API."
Evidence: Quote any time-conditional or freshness-dependent instruction found, or confirm none.
**Severity: Important** — Time-sensitive content fails silently: the skill keeps loading but starts giving wrong guidance, and nothing flags the moment it went stale. (Per Anthropic's skill authoring best practices, "Avoid time-sensitive information.")

---

### E15: One default, not an option menu
Check: Where a tool, library, or approach must be chosen, the skill names ONE default and, at most, a specific escape hatch for a named condition. It does not present multiple equivalent options and leave the agent to choose.
- ✅ "Use pdfplumber for text extraction. For scanned PDFs requiring OCR, use pdf2image with pytesseract instead."
- ❌ "You can use pypdf, or pdfplumber, or PyMuPDF, or pdf2image, or..."
Evidence: Quote any unresolved multi-option passages, or confirm each choice point has a single default.
**Severity: Important** — Option menus reintroduce the variance the skill exists to remove: each run picks differently, and output stops being reproducible. (Anthropic best practices lists "offering too many options" as a named anti-pattern.)

---

### E16: Environment assumptions are explicit **(optional — if the skill calls tools, MCP servers, or packages)**
Check: The skill does not assume its environment. Specifically:
1. **MCP tools use fully qualified names** in `ServerName:tool_name` format ("Use the GitHub:create_issue tool"), because a bare tool name can fail to resolve when multiple servers are connected.
2. **Package dependencies are declared** with install commands ("pip install pypdf"), never assumed present. Note the runtime split: claude.ai can install from npm/PyPI; the Claude API code-execution environment has no network access and no runtime installation.
3. **Paths use forward slashes** everywhere; backslash paths break on Unix systems.
- ✅ "Install required package: pip install pypdf" then the import; "Use the BigQuery:bigquery_schema tool"
- ❌ "Use the pdf library to process the file."; "Use the create_issue tool"; `scripts\helper.py`
**Mark N/A if the skill invokes no MCP tools, installs no packages, and references no scripts.**
Evidence: List each MCP tool reference, dependency, and path style found, and whether each is explicit, or state N/A.
**Severity: Important (if applicable)** — Implicit environment assumptions produce "tool not found" and import errors that surface as flaky skill behavior rather than as a clear defect.
