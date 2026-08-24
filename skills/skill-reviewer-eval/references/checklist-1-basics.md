# Checklist 1: BASICS (8 items)

Focus: File structure, naming, syntax — showstoppers if they fail.

---

### B1: Folder name is kebab-case
Check: The skill folder name uses only lowercase letters, numbers, and hyphens. No underscores, spaces, or capital letters. Per the Agent Skills spec, also: max 64 characters, must not start or end with a hyphen, and no consecutive hyphens (`--`).
- ✅ `pdf-processor`, `email-summarizer`, `skill-reviewer-eval`
- ❌ `PDF_Processor`, `EmailSummarizer`, `Skill Reviewer`, `-pdf`, `pdf--processing`
Evidence: State the exact folder name and whether it passes.
**Severity: Critical** — Folder name is used for routing and discovery. Non-kebab names cause silent failures.

---

### B2: SKILL.md exists (exact case)
Check: A file named exactly `SKILL.md` (uppercase SKILL, lowercase .md) exists at the root of the skill folder.
- ✅ `skill-name/SKILL.md`
- ❌ `skill-name/skill.md`, `skill-name/Skill.MD`, `skill-name/README.md`
Evidence: Confirm file exists with exact casing, or state what was found instead.
**Severity: Critical (showstopper)** — Without SKILL.md, the skill cannot be loaded. No other file name is accepted.

---

### B3: Valid YAML frontmatter
Check: SKILL.md begins with a valid YAML block between triple-dash delimiters (`---`). The block must include at minimum a `name` field and a `description` field. No syntax errors.
- ✅ Properly opens with `---`, contains `name:` and `description:`, closes with `---`
- ❌ Missing opening or closing `---`, malformed YAML (unescaped colons, tabs instead of spaces), missing required fields
Evidence: Quote the frontmatter block and note any issues.
**Severity: Critical (showstopper)** — Malformed frontmatter prevents the skill from being parsed. The agent will never see the skill. (Field requirements are spec-level: the Agent Skills spec requires both `name` and `description`. Claude Code alone treats all frontmatter fields as optional, defaulting `name` to the directory name and falling back to the body's first paragraph for the description; note the portability cost rather than a hard parse failure if only the fields are missing but the YAML itself is well-formed.)

---

### B4: Folder name matches frontmatter name field
Check: The skill folder name exactly matches the value of the `name:` field in YAML frontmatter.
- ✅ Folder: `pdf-processor` → `name: pdf-processor`
- ❌ Folder: `pdf-processor` → `name: PDFProcessor` or `name: pdf_processor`
Evidence: State the folder name and the frontmatter name value side by side.
**Severity: Critical (for portable skills)** — The Agent Skills spec explicitly requires the name to match the parent directory name, and spec validators (skills-ref, claude.ai upload, Skills API) reject mismatches. (Claude Code alone tolerates it: there, `name` is only a display label and the directory name is the command. Downgrade to Important for a skill that will only ever run in Claude Code.)

---

### B5: File organization follows conventions **(optional — if scripts/, references/, or assets/ exist)**
Check: If the skill contains supporting files, they are organized into the correct subdirectories:
- Scripts go in `scripts/`
- Reference documents go in `references/`
- Assets (images, data files) go in `assets/`
- No supporting files are dumped at the root level alongside SKILL.md
- ✅ `skill-name/references/guide.md`, `skill-name/scripts/process.py`
- ❌ `skill-name/guide.md`, `skill-name/process.py` (files at root alongside SKILL.md)
**Mark N/A if no supporting files exist (skill is self-contained in SKILL.md).**
Evidence: List all files and their locations, or state N/A.
**Severity: Quality (if applicable)** — Disorganized file structure makes maintenance harder and can cause path reference failures in instructions.

---

### B6: No README.md in skill folder
Check: There is no `README.md` file anywhere in the skill folder.
- ✅ No README.md present
- ❌ `skill-name/README.md` exists
Evidence: Confirm absence, or state that README.md was found.
**Severity: Important** — README.md is for humans browsing repositories, not for agent consumption. Its presence adds noise and may confuse the agent about which file contains instructions. (Note: this is a convention, not a spec rule. The Agent Skills spec permits any additional files in the skill directory; the finding is about agent-attention hygiene, so report it as a convention violation, not a spec violation.)

---

### B7: SKILL.md body has content
Check: Below the closing `---` of the frontmatter, SKILL.md contains meaningful instruction content — not just a title or placeholder text. Minimum threshold: more than 10 lines of substantive content.
- ✅ Body contains workflow steps, instructions, or structured guidance
- ❌ Body is empty, contains only a heading, or has fewer than 10 lines of content
Evidence: Quote the first few lines of the body, or state it is empty/minimal.
**Severity: Important** — A skill with no body provides no guidance. The agent is triggered but has nothing to follow.

---

### B8: No broken markdown syntax
Check: SKILL.md does not contain markdown that will render incorrectly and confuse the agent. Look for: unclosed code fences (` ``` `), mismatched brackets in links, or clearly garbled formatting that breaks readability.
- ✅ All code fences open and close, links are well-formed, formatting is consistent
- ❌ Unclosed ` ``` ` block causes everything after to be treated as code; broken link syntax `[text](` with no closing paren
Evidence: Note any specific broken syntax found, or confirm clean.
**Severity: Quality** — Broken markdown can cause the agent to misread instruction boundaries or skip sections entirely.
