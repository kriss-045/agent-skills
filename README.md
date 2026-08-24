# Agent Skills

These are the Agent Skills I run with Claude Code. A skill is a folder of markdown files that tells an AI agent how I want a particular job done: what to check, what good looks like, when to stop.

I use them daily. Some build other skills, some hold my writing voice, some run reviews I got tired of running by hand.

Browsable version with a file viewer: https://www.krisspatel.com/skill-repo

## Using one

Copy a skill folder into `~/.claude/skills/` and Claude Code picks it up. Each SKILL.md carries its own trigger description, so the agent knows when to reach for it.

Everything here is scrubbed of employer and client references before publishing. The publishing pipeline refuses any file that leaks one.

## Skills

### Skill Craft

- **skill-builder**: Builds high-quality Agent Skills with a structured process: trigger design, branching logic, progressive disclosure, reference-file architecture; validated by skill-reviewer-eval and blind-tested via skill-test. Triggers: create/build/au…
- **skill-reviewer-eval**: Evaluates an Agent Skill and returns a structured scored report with findings and prioritized fixes. Triggers: review/score/grade/evaluate/rate this skill, or a skill folder/zip shared for feedback, thoughts, or is-this-good. Not for pro…
- **skill-test**: Behavioural blind test proving a skill actually improves output: runs real tasks WITH the new skill, WITHOUT any, and WITH the prior version, then emits a no-label blind HTML viewer so the author judges blind. Triggers: test/blind-test/A…
- **skill-xray**: X-ray one Agent Skill: a dark console-style viewer of the skill's real folder (IDE file tree with real nesting, the selected file whole and verbatim), clean until touched; hovering a section floats a card beside the cursor with what that…

### Writing

- **kriss-writing-style**: Kriss Patel's personal writing voice, reverse-engineered from his real published articles. Use
- **kriss-article-writer**: End-to-end article writing in Kriss's voice: gather inputs, outline on one of his seven structures, PAUSE for sign-off, research, draft via kriss-writing-style, silent QA polish. Triggers: write an article about, I have an idea for a pos…
- **de-aification**: Detect and strip the tells that make writing, code, UI/visual design, or marketing copy read as AI-generated, and list concrete fixes. Use when Kriss says "de-aify this", "make this not sound like AI", "does this look AI", "remove the AI…
- **explain**: Explains code structure, logic, states, and dependencies in simple non-technical language for designers, PMs, and anyone who isn't an engineer. Use when someone wants to understand a page, component, or workflow without engineering jargon.

### Knowledge

- **vault-research**: Ingest research material into the active vault as practical concept notes (theory + strategy together, never just theory), following that vault's own CLAUDE.md conventions, full source fetches, then navigation updates. Triggers: ingest t…
- **trial-review**: Quarterly / event-driven trial review: scores the active trial against its decisions.md criteria and recommends continue / simplify / graduate / abandon. Triggers: trial review, review the trial, graduation check, trial close-out, /trial…

### Career

- **case-study-writer**: Write a design portfolio case study for Kriss's job search: pick a format from a 9-type researched taxonomy, gather it by interview or pasted notes, draft at the type's length in his voice with a professional register, then self-audit fo…
- **resume-builder**: Build a tailored, ATS-aware resume: from an old resume plus optional LinkedIn export and a target role, research the profile and company, ask only the gap questions, then produce two artifacts, a plain ATS-safe version and a designed PDF…
