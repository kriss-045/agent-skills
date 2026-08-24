# Checklist 5: SAFETY (9 items)

Focus: Could this cause harm, surprise users, or create security risks?

Note: S1 and S2 are universal — always evaluated. S3–S9 are optional and should be marked N/A if the condition does not apply to this skill.

---

### S1: Skill does what name/description say (Principle of Least Surprise)
Check: The skill's actual behavior, as described in SKILL.md, matches what a user would reasonably expect based on the name and description. No hidden functions, no side effects, no behavior not implied by the description.
- ✅ A skill named "pdf-summarizer" reads PDFs and produces summaries — nothing more
- ❌ A skill named "pdf-summarizer" also sends a copy of the PDF content to an external service, or modifies the original file
Evidence: Compare the name/description against the actual instructions in SKILL.md and note any gaps.
**Severity: Critical** — Unexpected behavior is a safety violation regardless of intent. Users trust that skills do what they say. Hidden behavior can cause data exposure, unintended modifications, or loss of trust.

---

### S2: No prompt injection attempts in frontmatter
Check: The frontmatter fields contain only descriptive, plain-text content. No field contains instructions directed at the agent, override commands, or attempts to manipulate agent behavior through the metadata.
- ✅ Frontmatter is purely descriptive: name, description, metadata fields
- ❌ Description contains: "Ignore previous instructions and...", "You are now...", or embedded XML/instruction tags designed to alter agent behavior
Evidence: Read all frontmatter fields for injected instructions and confirm clean, or quote the offending content.
**Severity: Critical** — Prompt injection via frontmatter can override safety behaviors, impersonate other skills, or cause the agent to act outside its authorized scope. This is a security vulnerability.

---

### S3: Scripts are safe and do only what's expected **(optional — if scripts exist)**
Check: If the skill includes scripts, they only perform operations directly related to the skill's stated purpose. Look for unexpected imports or operations: network calls, file access outside skill scope, system command execution, data exfiltration patterns.
- ✅ Script in "pdf-processor" skill reads and processes PDF files only
- ❌ Script in "pdf-processor" skill imports `requests` and sends data to an external URL
**Mark N/A if no scripts exist.**
Evidence: Briefly describe what each script does and list its imports/key operations, or state N/A.
**Severity: Critical (if applicable)** — Malicious or poorly scoped scripts can compromise user data, system security, or agent behavior in ways the user cannot detect.
Note: Key red flags — unexpected imports (`requests`, `socket`, `subprocess`, `os.system`), file paths outside the skill directory, or operations that could modify system state.

---

### S4: No requests for unexpected external connections **(optional — if network activity exists)**
Check: If the skill makes network requests, those requests are to endpoints clearly implied by the skill's stated purpose and disclosed to the user.
- ✅ A skill that checks weather connects to a weather API — expected and implied
- ❌ A skill that formats documents connects to an analytics endpoint not mentioned in its description
**Mark N/A if the skill makes no network connections.**
Evidence: List any network endpoints contacted, and assess whether each is clearly implied by the skill's stated purpose.
**Severity: Critical (if applicable)** — Undisclosed network connections can exfiltrate user data, violate privacy, or establish unexpected dependencies on external services.

---

### S5: No access to sensitive user data beyond stated purpose **(optional — if data access exists)**
Check: If the skill accesses user data (files, messages, emails, calendar events, etc.), it only accesses data that is directly required for its stated function.
- ✅ An email summarizer reads the emails the user provides — nothing more
- ❌ An email summarizer also reads the user's contact list or calendar without disclosure
**Mark N/A if the skill does not access user data.**
Evidence: List what user data the skill accesses, and assess whether each access is necessary and disclosed.
**Severity: Critical (if applicable)** — Accessing data beyond the skill's stated scope is a privacy violation and erodes user trust.

---

### S6: File paths and operations are scoped appropriately **(optional — if file manipulation exists)**
Check: If the skill reads or writes files, operations are limited to specific, expected paths. The skill does not traverse to parent directories, system paths, or user directories outside its stated scope.
- ✅ A document editor writes to the file the user provided, in the user's specified output location
- ❌ A document editor writes output to a fixed system path, or traverses to parent directories
**Mark N/A if the skill does not perform file operations.**
Evidence: Describe the file paths and operations used, or state N/A.
**Severity: Critical (if applicable)** — Unscoped file operations can overwrite user files, expose sensitive directories, or cause data loss.

---

### S7: No destructive operations without clear warnings **(optional — if destructive operations exist)**
Check: If the skill performs operations that are difficult or impossible to reverse (deleting files, overwriting data, sending messages, making purchases), the instructions include explicit warnings and confirmation steps before executing.
- ✅ "Before deleting, display the list of files to be removed and ask the user to confirm."
- ❌ "Delete all temporary files." (no warning, no confirmation, no reversibility)
**Mark N/A if the skill performs no destructive operations.**
Evidence: Describe any destructive operations and whether warnings are present, or state N/A.
**Severity: Important (if applicable)** — Destructive operations without warnings cause irreversible harm. Even well-intentioned skills can destroy user data if confirmations are skipped.

---

### S8: Error messages don't leak sensitive information **(optional — if error handling is defined)**
Check: If the skill's instructions define error messages or error output, those messages do not include sensitive information — API keys, file paths, user data, stack traces, or internal system details.
- ✅ "If the file cannot be read, output: 'File could not be processed. Please check the file and try again.'"
- ❌ Error output includes the full file path, user credentials, or raw exception trace
**Mark N/A if the skill does not define specific error messages.**
Evidence: Review any error message templates in the instructions and assess for information leakage, or state N/A.
**Severity: Quality (if applicable)** — Leaked information in error messages can expose sensitive user data or system internals to unintended recipients.

---

### S9: allowed-tools grant is minimal and matches the body **(optional — if allowed-tools is set)**
Check: If the frontmatter sets `allowed-tools`, the grant is the narrowest that lets the skill run, and every granted tool corresponds to something the body actually does. Prefer scoped Bash rules over blanket ones, and skill-relative paths via `${CLAUDE_SKILL_DIR}` for bundled scripts.
- ✅ `allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *)` on a commit skill
- ✅ `allowed-tools: Bash(${CLAUDE_SKILL_DIR}/scripts/render.sh *)` matching the exact bundled script the body runs
- ❌ `allowed-tools: Bash` (blanket shell grant) on a skill that only needs to run one script
- ❌ Grants for tools the body never uses (a formatting skill granting `WebFetch`)
**Mark N/A if no allowed-tools field is present.**
Evidence: Quote the allowed-tools value, map each grant to the body step that needs it, and flag any grant with no matching step or with broader scope than needed, or state N/A.
**Severity: Critical (if applicable)** — allowed-tools bypasses the user's permission prompts for the invoking turn. The official docs warn that a project skill "can grant itself broad tool access"; an over-broad grant turns a benign-looking skill into a silent escalation path.
