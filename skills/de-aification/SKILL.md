---
name: de-aification
description: Detect and strip the tells that make writing, code, UI/visual design, or marketing copy read as AI-generated, and list concrete fixes. Use when Kriss says "de-aify this", "make this not sound like AI", "does this look AI", "remove the AI tells", "spot the AI fingerprints", or hands over a draft whose AI-slop markers need removing. Routes to a per-domain checklist (writing / coding / visual-ui / marketing) plus the cross-domain tells. Not for detecting whether text is AI for a verdict only — this is for REMOVING the tells.
---

# De-Aification Skill

## CRITICAL — invoke this skill immediately on trigger

When a trigger phrase from the `description:` field above appears in a user message ("de-aify this", "make this not sound like AI", "does this look AI", "remove the AI tells") → INVOKE THIS SKILL VIA THE Skill TOOL before editing anything. Do not list AI tells from memory and start rewriting; route to the domain checklist first, because the per-domain reference is what makes the pass concrete instead of generic. Hook B3 (`~/.claude/hooks/claude-os-write-check.sh`) verifies this preamble is present; missing it = drift event per rule SF2 in `state/rules.md`.

Given a piece of work in any domain, detect the linguistic, stylistic, structural, and visual tells that make it read as AI-generated, and apply concrete fixes to remove them.

## Route to your domain

1. **Writing (prose, articles, emails, web copy)** → `references/writing.md`
2. **Code (any language)** → `references/coding.md`
3. **Visual / UI design** → `references/visual-ui.md`
4. **Marketing / social / brand voice** → `references/marketing.md`
5. **How AI-detection tools work (methodology + why they fail)** → `references/detectors.md`

Open the matching file, walk its tells against the work, apply each listed fix. Then re-check against the cross-domain tells below.

> **STOP if the text is Kriss's own writing.** Read `~/.claude/skills/kriss-writing-style/references/editing-his-own-drafts.md` BEFORE applying anything below. The tells in this skill are written for generic text; run against an author with an established voice, they strip the voice along with the slop. Measured cost (2026-08-15, his portfolio): tell #3 "uniform complexity" flagged three same-shaped component writeups, which are how he presents three variants of one component; the same reasoning removed his parallel `Scenario 1 / Scenario 2` sections and his repeated header family. He rejected all three removals and asked for his originals back. **A uniform structure a person wrote on purpose and one a model produced look identical on the page** — only the author's real corpus tells you which you are holding. When there is a corpus, read it first and default to preservation.

## Cross-domain tells (all domains)

### 1. Excessive perfection / flawlessness
**Tell:** everything sits exactly where an algorithm would place it — no rough edges, no personal quirks, no small asymmetries.
- Writing: every sentence perfectly structured, every transition smooth, no voice variation.
- Code: every function the same length, every convention perfect, no idiosyncrasy.
- Design: mathematically precise symmetry, everything aligned, no deliberate break.

**Fix:** introduce intentional imperfection. Vary rhythm and sentence structure in prose; allow natural variation in function length; add deliberate asymmetry and one off-grid element in design.

### 2. Absence of specific detail
**Tell:** generalized statements with no timestamps, named sources, firsthand observation, or sensory grounding.
- Writing: "studies show benefits" with no researcher, date, or citation; "many people agree" with no names.
- Code: generic loop logic, placeholder comments ("TODO: implement this"), context-free variable names.
- Design: generic personas ("User", "Admin"), lorem ipsum instead of real content.

**Fix:** add specificity everywhere. Name sources, cite dates, use real URLs; use real domain variable names; replace placeholder text with actual content; ground every claim in observable detail.

### 3. Uniform complexity / consistency
**Tell:** suspiciously even complexity, length, and structure across all elements — no variance from the human constraint of context.
- Writing: all paragraphs the same length, all sentences medium, all sections equally developed.
- Code: all functions 15-20 lines, all names two words, all nesting identical.
- Design: all cards the same height, all columns equal, all spacing uniform.

**Fix:** vary based on actual need. Some paragraphs two sentences, some ten; functions 3 lines when simple, 50 when complex; let design sections breathe unevenly.

## How to use

1. Route to the domain file. 2. For each applicable tell, apply the fix. 3. Re-check cross-domain tells. 4. Each tell carries an evidence tag — **EMPIRICAL** (measured across corpora / peer-reviewed / benchmark) or **OPINION** (practitioner observation, consistently reported but unmeasured). Writing and code tells are mostly EMPIRICAL; visual/UI is mostly OPINION (the design space lacks measurement research); marketing is OPINION (drawn from the writing tells + platform conventions, not a dedicated sourced study — flagged honestly).

## Files

- `references/writing.md` — AI tells in prose + fixes
- `references/coding.md` — AI tells in code + fixes
- `references/visual-ui.md` — AI tells in design/UI + fixes
- `references/marketing.md` — AI tells in marketing + fixes (OPINION, unsourced)
- `references/detectors.md` — detection tools, accuracy, failure modes

Sourced from `~/Kriss LLM/Claude OS/operator/operator-personal/drafts/de-aification-research.md` (evidence-tagged research).
