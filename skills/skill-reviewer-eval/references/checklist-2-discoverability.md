# Checklist 2: DISCOVERABILITY (13 items)

Focus: Will Claude actually find and trigger this skill at the right moments?

---

### D1: Description exists and is under 1,024 characters
Check: The `description:` field exists in frontmatter and its value is no longer than 1,024 characters (including spaces).
- ✅ Description is present and within character limit
- ❌ Description field is missing entirely, or exceeds 1,024 characters
Evidence: State the character count of the description.
**Severity: Critical** — The Agent Skills spec requires a non-empty description of at most 1,024 characters; claude.ai uploads and the Skills API validate this. (Claude Code alone is more forgiving: a missing description falls back to the first paragraph of the body, so note the reduced portability rather than claiming the skill can never trigger.) An over-limit description may be truncated, destroying the trigger logic. Claude Code also appends the optional `when_to_use` field to the description in the skill listing and truncates the combined text at 1,536 characters.

---

### D2: Description length matches description style
Check: Length is style-dependent — both extremes fail, but the upper bound depends on whether the description enumerates triggers.

**Single-purpose style** (one primary action, one clear trigger): **120–600 characters** sweet spot. (v7 correction: the v6 floor of 200 failed Anthropic's own exemplary descriptions. The official Git Commit Helper example is ~150 chars: "Generate descriptive commit messages by analyzing git diffs. Use when the user asks for help writing commit messages or reviewing staged changes." Judge the floor by content, not count: what it does + when to use it + concrete keywords all present. A description under ~120 chars almost never fits all three.)
- ✅ "Processes PDF files and extracts tables into structured data. Use when given a PDF and asked to extract tabular content." (~150 chars — slightly under)
- ✅ "Evaluates the quality of an Agent Skill and returns a structured plain text report with scores, findings, and prioritized fixes. Use when asked to review, score, grade, evaluate, or rate it." (~250 chars — in range)

**Keyword-enumerating style** (lists 5+ specific actions, file types, or use cases): **200–1024 characters** acceptable. This is the pattern Anthropic's `pdf` skill uses (~700 chars) and is a legitimate optimization.
- ✅ "Use whenever the user wants to do anything with PDF files. This includes reading or extracting text/tables, combining or merging PDFs, splitting them, rotating pages, adding watermarks, creating new PDFs, filling PDF forms, encrypting/decrypting, extracting images, and OCR." (~700 chars — exemplary)

Failure cases:
- ❌ Missing any of the three content elements (what / when / keywords), regardless of length ("Helps with PDFs.")
- ❌ Over 600 chars without 5+ specific enumerations: bloat without signal
- ❌ Over 1024 chars: violates hard limit (covered by D1)

Evidence: State the exact character count, classify which style (single-purpose vs keyword-enumerating), and confirm it falls in the right range for that style AND contains all three content elements. If keyword-enumerating, count the specific triggers (must be 5+). If a Claude Code `when_to_use` field is present, evaluate the combined description + when_to_use text (cap: 1,536 chars combined in the listing).
**Severity: Important** — Style mismatch produces under- or over-triggering. Reference D1 for the hard limit; D2 is the quality target.

---

### D3: Description written in third person / imperative
Check: The description uses third-person ("Processes...", "Creates...") or imperative addressed to the agent ("Use when...", "Apply to..."). It does *not* use first-person ("I process...", "I can help you...").
- ✅ "Processes PDF files and extracts tables into structured data"
- ✅ "Use this skill whenever the user wants to do anything with PDF files." (imperative)
- ❌ "I process PDF files and can extract tables for you"
Evidence: Quote the first sentence or two and note the voice used.
**Severity: Critical** — First-person descriptions break how the skill is injected into the system prompt. The agent reads first-person as its own statement, not as a skill descriptor, causing trigger failures.

---

### D4: Description states what the skill does
Check: A reader unfamiliar with the skill can understand its core function from the description alone — without needing to open SKILL.md.
- ✅ "Evaluates the quality of an Agent Skill and returns a structured plain text report with scores, findings, and prioritized fixes"
- ❌ "A skill for reviewing things and giving feedback"
Evidence: Quote the description and assess whether the core function is clear.
**Severity: Critical** — The description is the primary signal Claude uses to decide whether to load this skill. If the function is unclear, the skill is not loaded when it should be.

---

### D5: Description includes when to use it (trigger conditions)
Check: The description includes 2–4 specific conditions or user actions that should trigger the skill. These are phrases or situations that signal the skill is needed — not an exhaustive list, but enough to match the most common trigger cases.
- ✅ "Use when given a parsed skill object... and asked to review, score, grade, evaluate, or rate it."
- ❌ Description only says what the skill does, with no guidance on when to use it
Evidence: Identify the trigger phrases or conditions in the description, or note their absence.
**Severity: Critical** — Without explicit trigger conditions, the skill is under-triggered (missed when it should run) or over-triggered (runs when it shouldn't).

---

### D6: Description includes specific user phrases **(optional — if user-triggered)**
Check: If the skill is intended to be triggered by natural language requests from users, the description includes example phrases a user might say that should cause the skill to load.
- ✅ Description references phrases like "asked to review, score, grade, evaluate, or rate"
- ❌ Description describes the skill but gives no examples of how a user would request it
**Mark N/A if the skill is triggered programmatically or by system context rather than user language.**
Evidence: Quote example phrases if present, or state N/A.
**Severity: Important (if applicable)** — Without example phrases, Claude may fail to trigger the skill when users ask in natural, varied language.

---

### D7: Description mentions file types **(optional — if file-specific)**
Check: If the skill operates on or produces specific file types (.pdf, .docx, .xlsx, .zip, etc.), the description names those file types explicitly.
- ✅ "Generates Word documents (.docx) from user content"
- ❌ "Generates documents from user content" (file type unstated when skill is file-specific)
**Mark N/A if the skill is not file-specific.**
Evidence: Note which file types the skill uses, and whether they appear in the description.
**Severity: Important (if applicable)** — Omitting file types causes the skill to be missed when users mention specific file formats in their requests.

---

### D8: No security issues in frontmatter
Check: The frontmatter does not contain XML angle brackets (`<`, `>`) in any field value, and the `name` field does not contain "claude" or "anthropic" (case-insensitive).
- ✅ Frontmatter values are plain text; name is `pdf-processor` or similar
- ❌ Description contains `<skill>`, `<instructions>`, or similar tags; name is `claude-helper` or `anthropic-tool`
Evidence: Confirm both checks pass, or quote the offending content.
**Severity: Critical** — XML tags in frontmatter can cause prompt injection or parsing failures. Names referencing Claude or Anthropic can create impersonation or trust boundary violations.

---

### D9: Frontmatter fields are documented and match the deployment target
Check: Every frontmatter field is documented for where the skill will run. Two tiers (per code.claude.com/docs/en/skills, "Using skill frontmatter outside Claude Code"):

**Agent Skills spec (portable — claude.ai uploads, Skills API, package_skill.py):** exactly six fields are allowed: `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`. Any other field causes a HARD ERROR on packaging or upload ("Unexpected key(s) in SKILL.md frontmatter"), not a silent ignore.

**Claude Code extensions (valid in Claude Code only):** `when_to_use`, `argument-hint`, `arguments`, `disable-model-invocation`, `user-invocable`, `disallowed-tools`, `model`, `effort`, `context`, `agent`, `background`, `hooks`, `paths`, `shell`. These are fully documented for Claude Code but break portability to the spec paths above.

Truly undocumented fields (`version`, `author`, `tags`, `priority`, `enabled`, `category` at top level) belong inside `metadata:` instead.

- ✅ Portable skill using only the spec six; or a Claude Code skill using `disable-model-invocation: true` with no claim of portability
- ❌ `version: 1.2`, `author: Jane`, `tags: [...]` at top level (put them under `metadata:`)
- ❌ A skill intended for claude.ai upload that uses `context: fork` or `argument-hint` (upload will hard-fail)
Evidence: List all frontmatter fields, classify each as spec / Claude Code extension / undocumented, and state whether the mix matches where the skill is meant to run.
**Severity: Important** — Undocumented fields either do nothing or, on the spec validation paths, block packaging and upload outright. Claude Code extension fields are legitimate in Claude Code; flag them only when the skill is meant to be portable.

---

### D10: Uses "pushy contextual" pattern (imperative voice + keyword variants + adjacent concepts)
Check: The description doesn't just state what the skill does — it actively pushes the agent toward invocation using three reinforcing signals:
1. **Imperative voice** addressed to the agent ("Use this skill whenever...", "Apply when..."). Not third-person description ("This skill helps with...").
2. **Keyword variants** — 2+ near-synonyms or vocabulary alternates ("dashboard, data visualization, internal metrics, company data") so the trigger fires on user vocabulary, not just the technical term.
3. **Adjacent concepts** — names use cases the user might intend even without using the skill's primary keyword ("even if they don't explicitly ask for a 'dashboard'").

Canonical example (Anthropic skill-creator's good vs bad pair):

> ❌ Bad: "How to build a simple fast dashboard to display internal Anthropic data."
>
> ✅ Good: "How to build a simple fast dashboard to display internal Anthropic data. Make sure to use this skill whenever the user mentions dashboards, data visualization, internal metrics, or wants to display any company data, even if they don't explicitly ask for a 'dashboard.'"

The good version: names the artifact, lists keyword variants, names adjacent concepts, instructs the agent to invoke on indirect mentions, uses imperative voice.

Evidence: For each of the three signals (imperative voice / keyword variants / adjacent concepts), state whether the description contains it and quote the relevant span.
**Severity: Important** — The single highest-ROI lever for trigger reliability. Vague descriptions undertrigger reliably even when the skill body is excellent. The "pushy contextual" pattern is documented in Anthropic's `skill-creator`.

---

### D11: Has explicit "When NOT to use" clause **(optional — if overlapping skills likely)**
Check: The description or top of SKILL.md body includes an explicit negative-scope statement — when the skill should *not* fire.
- ✅ "When NOT to use: Single-file, single-function changes where the scope is already minimal." (`addyosmani/incremental-implementation`)
- ✅ "Does not evaluate prompt quality, system prompts, or non-skill AI configurations." (this skill's own description)
- ❌ Description lists only positive triggers, no negative scope
**Mark N/A if the skill operates in a clearly unique niche with no plausible overlap.**
Evidence: Quote the negative-scope clause if present, or state N/A.
**Severity: Important (if overlap is plausible)** — Negative scope is the disambiguator when multiple installed skills could match the same trigger. Without it, two skills both claim "data analysis" without resolution.

---

### D12: Proactive triggers based on agent state **(optional — if applicable)**
Check: The description includes triggers based on what the *agent* is about to produce (not just what the *user* said). Format: "Use proactively when [observable agent-internal state]."
- ✅ "Use proactively when you are about to render a complex ASCII table (4+ rows or 3+ columns) — present it as a styled HTML page instead." (`nicobailon/visual-explainer`)
- ✅ "Use proactively when about to output factual claims without citations."
- ❌ "Use proactively when output would be confusing." (too vague — no checkable condition)
**Mark N/A if the skill is purely user-invoked and proactive triggers do not apply.**
Evidence: Quote the proactive trigger if present, and confirm the trigger condition is checkable (specific threshold or state), or state N/A.
**Severity: Quality (if applicable)** — Proactive triggers expand the skill's invocation surface to include cases the user wouldn't explicitly request. Useful for skills that intercept agent output (formatting, code-quality, citation, slop-detection).

---

### D13: Invocation control matches the skill's nature **(optional — Claude Code only)**
Check: For skills running in Claude Code, the invocation-control frontmatter matches what the skill does:
1. **Side-effect workflows** (deploy, commit, send, publish, schedule) set `disable-model-invocation: true` so only the human can fire them. A deploy skill Claude can auto-invoke is a hazard.
2. **Background-knowledge skills** (conventions, style guides the user would never type as a command) set `user-invocable: false` to stay out of the `/` menu.
3. **File-scoped skills** may use `paths:` globs so they load only when relevant files are touched.
- ✅ A `/deploy` skill with `disable-model-invocation: true`
- ✅ A coding-conventions skill with `user-invocable: false`
- ❌ A skill whose body sends messages or deploys, with model invocation left enabled and no confirmation gate in the body
**Mark N/A if the skill has no side effects and both invocation directions make sense, or if the skill targets the portable spec (these fields do not exist there — then the confirmation gate must live in the body, see S7).**
Evidence: State which invocation-control fields are present, what the skill's side-effect profile is, and whether they match, or state N/A.
**Severity: Important (if applicable)** — Invocation control is the structural version of "confirm before destructive actions": the harness enforces it, the body can only request it.
