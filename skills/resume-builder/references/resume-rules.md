# Resume content and format rules (evidence-based)

Distilled from `~/Kriss LLM/UX/research/resume-research-designers.md`. Each rule is labelled by its evidence grade: **measured** (study/experiment/audit), **vendor-claim** (company self-report), **folklore** (widely repeated, no verifiable source). Build only from measured and defensible rules; the folklore list exists so those claims get rejected, not followed.

## Table of Contents

1. [How screening actually works now](#screening)
2. [Content rules](#content)
3. [Format rules (the two artifacts)](#format)
4. [Folklore to reject](#folklore)
5. [Bias and legal reality (why "checkable" matters)](#bias)

<a name="screening"></a>
## 1. How screening actually works now

The pipeline has two machine stages before a human: a **parse/keyword** stage (still literal, still gamed with hidden keywords, so parse-cleanliness matters) and a **semantic/LLM** stage that ranks by closeness to the job description (measured: semantic screening rescues far more qualified candidates than keyword matching, recall ~0.92 vs ~0.45). Then a human spends about **7.4 seconds** on the first pass (measured, Ladders 2018). Consequences: the document must parse cleanly AND read as a semantic match to the real posting AND be skimmable in seconds. No single "keyword match rate" number predicts anything; it is a vendor construct.

<a name="content"></a>
## 2. Content rules

- **Front-load and make it skimmable** (measured): simple layout, clear headers, bold job titles over bullets, an overview at the top of page one; F/E reading pattern. The 7.4-second read lands on the top of page one first.
- **Write in the posting's true vocabulary** (measured, semantic stage): use the JD's real terms, role-title variants, and acronyms where they are honestly true of the candidate. This clears the keyword stage and scores well semantically. Do not stuff; align.
- **Quantify only real outcomes** (discipline): specific numbers where they exist; a concrete qualitative result where they do not. Never invent a figure.
- **Two pages max for an experienced candidate** (measured source recommends a strict two-page limit; one-page-only is folklore, see below).
- **Every claim checkable** (bias-aware, see §5): state scope and outcome explicitly; models and humans both infer traits from implicit cues, so leave nothing load-bearing to inference.
- **Writing quality has a measured payoff** (measured, Wiles & Horton 2023): algorithmic writing assistance raised hires ~8% with no employer-satisfaction penalty. Clear, correct prose is a real lever, not a nicety.

<a name="format"></a>
## 3. Format rules (the two artifacts)

The two artifacts exist because the parse stage and the human want opposite things.

**ATS-safe version (clears the machine):**
- Single column. No tables, no multi-column layouts, no text boxes.
- No graphics, no icons carrying meaning, no text in headers/footers (parsers drop them).
- Standard section headings (Experience, Education, Skills, Summary), standard fonts, real selectable text (never text-as-image).
- This is the copy to submit through an application portal / ATS.

**Designed PDF (for the human):**
- Same facts, human-facing. Stronger type hierarchy, whitespace, and (gated) flair.
- Still real selectable text; still skimmable in seconds.
- Used when a human receives the resume directly (email, referral, portfolio link).

Format is NOT neutral even at the AI stage (measured, Rhea et al. 2022: layout and even a LinkedIn URL perturbed AI scoring), which is exactly why the machine copy stays plain.

<a name="folklore"></a>
## 4. Folklore to reject (named, so it is not followed)

- **"One page, always."** Rejected: the only measured source recommends a strict two-page limit for experienced candidates.
- **"75% of resumes are auto-rejected by an ATS."** Rejected: no traceable primary source.
- **"Keyword-stuff to beat the ATS."** Rejected: measured as a trait of the WORST-performing resumes, and hidden-keyword injection is now actively detected (USENIX 2026 found it in ~1% of real resumes and flags it) — a disqualifying red flag, not a hack.
- **"Exactly 6 seconds."** Superseded: 7.4 seconds (2018) updates the 2012 figure; treat as "seconds," not a magic number.
- **"A keyword match-rate score is what matters."** Rejected: vendor construct; LLM screeners score holistically and inconsistently.
- **"AI removes human bias."** Rejected: contradicted by audits (§5).

<a name="bias"></a>
## 5. Bias and legal reality (why "checkable" matters)

Measured across audits: AI/embedding screeners carry demographic bias from training data, its direction is model-vintage dependent (so "AI is fairer" is unverifiable without auditing the exact model), and humans in the loop tend to inherit the AI's preference rather than correct it. A candidate cannot optimize for the screener's fairness. What a candidate CAN do: keep every claim explicit and checkable so a model cannot narrow-read or invent from implicit cues (audits show models rationalize from thin signals). Legal floor (context, not a writing rule): EEOC adverse-impact doctrine, NYC Local Law 144 (bias-audit + notice for automated tools), EU AI Act (hiring = high-risk, right to explanation) — a candidate in those venues may legitimately ask whether an automated tool was used.
