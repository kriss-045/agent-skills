---
name: resume-builder
description: "Build a tailored, ATS-aware resume: from an old resume plus optional LinkedIn export and a target role, research the profile and company, ask only the gap questions, then produce two artifacts, a plain ATS-safe version and a designed PDF (restrained flair for creative roles). Triggers: build my resume, make a resume, update my resume, tailor my resume for this job. Not case studies (case-study-writer) or articles (kriss-article-writer)."
---

# Resume Builder

## CRITICAL — invoke this skill immediately on trigger

When a trigger phrase from the `description:` field above appears in a user message ("build my resume", "make a resume", "update my resume", "tailor my resume for this job") → INVOKE THIS SKILL VIA THE Skill TOOL before writing any resume content. Do not draft from resume folklore or from memory of what a good resume looks like; `references/resume-rules.md` exists because most of that folklore is measurably wrong. Hook B3 (`~/.claude/hooks/claude-os-write-check.sh`) verifies this preamble is present; missing it = drift event per rule SF2 in `state/rules.md`.

Turn a candidate's existing material into a resume tuned for how hiring actually screens now: a two-stage pipeline where an AI/semantic pass and an ATS parser see the document before any human does, and where a human then spends seconds, not minutes. The skill produces **two artifacts on purpose** (a plain ATS-safe version and a designed human-facing PDF) because those two readers want opposite things, and the research is blunt that trying to satisfy both in one file compromises both.

**The core discipline:** build from evidence, never from resume folklore, and never from invented facts. Every content and format choice traces to `references/resume-rules.md`, which distills the measured findings (and names the folklore it rejects). A fabricated metric, date, or title is a fire-on-sight error for a screener and a lie in a hiring document; if a real number does not exist, use a concrete qualitative outcome instead.

**Evidence base.** The rules reference distills the candidate-vetted research at `~/Kriss LLM/UX/research/resume-research-designers.md` (round 1: recruiter eye-tracking, ATS parse rules, folklore table; round 2: the keyword-to-LLM screening shift, bias audits, the EEOC/NYC/EU legal layer, the AI-application flood). Read the reference, do not re-derive from memory.

---

## Workflow

### Step 1 — Gather inputs

Read `references/intake-questions.md`. Collect:
- **Old resume (required)** — a PDF, docx, or pasted text. This is the factual spine; do not proceed without it (or without enough pasted history to stand in for it).
- **LinkedIn (optional)** — invite it, but state up front: a LinkedIn URL will almost certainly be blocked to automated fetch (login wall), so if the candidate wants LinkedIn included they should provide the exported "Save to PDF" copy or paste the profile text. Never block on LinkedIn; it is a bonus source.
- **Target role / company / job description (optional)** — improves tailoring a lot. If none is given, ask whether to tailor to a specific posting or build a strong general resume, and proceed either way.

### Step 2 — Extract and research

Parse the old resume (+ any LinkedIn export) into a structured profile: roles, dates, scope, achievements, skills, education. Reason: everything downstream is tailoring and formatting of THIS factual set, so it must be extracted cleanly first.

If a target company/role/JD was given, research it (WebFetch the posting or company site; WebSearch for role norms) to capture the posting's real vocabulary and priorities. Reason: the semantic screening stage rewards a resume written in the job's own true vocabulary, and the human reader rewards evident fit.

### Step 3 — Ask only the gap questions

Ask targeted questions ONLY for what extraction and research cannot supply: target role and seniority framing, which achievements to foreground, missing metrics or dates, and any ambiguity in scope. This is not an interview; keep it to the gaps. Reason: the candidate's time is the scarce input, and over-asking is the known failure. Never fill a gap with an invented fact; leave it flagged.

### Step 4 — Build the content

Apply `references/resume-rules.md`: front-loaded and skimmable for the 7-second human read; single hard section set with standard headings; the candidate's real vocabulary aligned to the JD where it is honestly true; quantified impact only where a real number exists; two pages max for an experienced candidate; every claim checkable (bias-aware, because screeners and humans both infer traits from implicit cues, so make scope and outcome explicit rather than inferable).

### Step 5 — Produce TWO artifacts

Read `references/rendering-guide.md` and generate both, same content, different form:
- **ATS-safe version** — single column, standard section headings, real selectable text, NO tables/columns/graphics/text-in-headers-footers. This is the copy that clears the parse and semantic stages.
- **Designed PDF** — the human-facing copy, where any visual craft lives.

Render each to PDF via the rendering guide's HTML-to-PDF pipeline.

### Step 6 — Flair gate (decision, default is restraint)

Add design flair (color accents, cards with a subtle drop shadow, stronger type hierarchy) to the DESIGNED PDF only, and only when ALL hold:
- the target role is design/creative (flair signals craft there; on a non-design role it signals noise), AND
- the flair strengthens scanning rather than clutters it, AND
- it never touches the ATS-safe version.

If any fails, ship a clean, restrained designed PDF. Reason: the research shows heavy layout measurably degrades AI parsing and perturbs AI scoring, so flair is a deliberate, role-gated choice, never a default.

### Step 7 — Present

Deliver both files with a short rationale: what was tailored to the target, the flair decision and why, and any gaps or assumptions made (especially anything the candidate must confirm or a metric left qualitative because no real figure existed). Draft-only: never submit or send an application anywhere; the candidate does that.

---

## Worked example (generic illustration)

Shows the transform, not a real person. Inputs: an old resume PDF (a product designer, 6 years, one metric present), no LinkedIn export, target JD pasted for a "Senior Product Designer, fintech" role.

- Step 2 research pulls the JD's real vocabulary ("design systems", "0-to-1", "experimentation") and the company's product area.
- Step 3 asks only the gaps: "Lead with the design-system rebuild or the 0-to-1 launch? Any real number for the launch besides the one already on file?" (candidate: lead with the system; no launch number) -> the launch bullet stays qualitative, not invented.
- Step 4 content: role in the summary line, experience bullets rewritten in the JD's true terms where honest, the one real metric kept specific, two pages.
- Step 5/6 output: `resume-ats.pdf` (single column, standard headings, no color) AND `resume-designed.pdf` (the target IS a design role, so the flair gate passes: one accent color on section rules, role entries in subtle drop-shadow cards, stronger hierarchy). Both real selectable text.
- Step 7 rationale: "tailored to the fintech JD's system/experimentation language; flair on the designed copy because the role is design; launch impact left qualitative, no real figure was available, confirm before sending."

## Handoffs

- **`capture`** — if a durable fact about the candidate's history surfaces that is worth keeping, offer to file it; do not auto-write.

## When NOT to use

- A portfolio design case study → `case-study-writer`.
- A Medium/LinkedIn article or essay → `kriss-article-writer`.
- A cover letter → not this skill unless the candidate explicitly asks for one alongside.
