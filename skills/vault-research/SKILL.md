---
name: vault-research
description: "Ingest research material into the active vault as practical concept notes (theory + strategy together, never just theory), following that vault's own CLAUDE.md conventions, full source fetches, then navigation updates. Triggers: ingest the data, synthesize the research, add this to the vault, process raw/ or inbox, start new research on X, or a topic/URL/path dropped while the cwd is a vault."
---

# Vault Research

The skill for ingesting new research material into a markdown vault as **enriched concept notes** — theory plus practical strategy, source-grounded, vault-convention-respecting.

This skill exists because the same workflow gets executed manually every time the user starts new research: identify candidate sources, fetch them at full depth, synthesize per a domain-specific strategy, decide what to write where, write the notes, update navigation. Codifying this prevents quality drift, re-derivation of the source-grounded discipline every cycle, and the "first 20 lines and synthesize" failure that occurs when sub-agents lack strict instructions.

## CRITICAL — invoke this skill immediately on trigger

When a trigger phrase from the `description:` field above appears in a user message → invoke this skill via the Skill tool. Don't paraphrase its workflow in chat or reinvent its logic. Hook B3 (`~/.claude/hooks/claude-os-write-check.sh`) verifies this preamble is present; missing it = drift event per rule SF2 in `state/rules.md`.

## Hard rules (always apply)

These are non-negotiable. They apply to the main agent and every sub-agent dispatched during the workflow.

1. **Theory + practical on every concept note.** A note that explains an idea without showing what it looks like in practice — file paths, code stubs, config keys, concrete strategies, named examples — does not ship. The vault is for building, not for literature reviews.
2. **Read full content end to end. Never scan.** Every source — file, URL, repo, transcript, book chapter — is read in its entirety. Reading the first 20 lines and synthesizing from them is the failure mode this skill exists to prevent. If a file is too long for one read, read it in chunks until you have covered all of it.
3. **Cite specific source locations** for every load-bearing claim — file:line, URL anchor, page number, timestamp. If a claim cannot be verified against the source, mark it `UNVERIFIED` rather than inventing or paraphrasing plausibly. Source-grounded gaps are honest; fabrications are the failure mode.
4. **Don't trim, don't rewrite source material in your own words.** Preserve actual research data verbatim where it is load-bearing. Summaries that "tighten" the source destroy the fidelity this workflow is built to preserve. Quote real code snippets, real file paths, real config values, real sentences from the source.
5. **Never compress quality to save tokens, context, or time.** If you feel context pressure or session-limit pressure mid-cycle, the correct response is to defer the remaining work via `HANDOFF.md`, not to truncate dossiers, shorten notes, or merge findings. A half-fidelity output is worse than a partial output with a clear handoff.
6. **Shared rules: `Claude OS/operator/VAULT-CONVENTION.md` is authoritative for cross-vault conventions** — philosophy, frontmatter spec, ingest workflow (10 steps), quality bar, filename + tagging conventions, MoC discipline, query/lint workflows. **The active vault's own `CLAUDE.md` is authoritative for vault-specific overrides** (domain scope, vault-specific entity types, vault-specific quirks). Read BOTH before writing anything; the vault CLAUDE.md references the convention as primary source. Do not assume conventions from another vault transfer if they're vault-specific.

7. **Default to extraction granularity, not summary compression** (added 2026-05-30 Phase 7 item 3.5). If a source-grounded augment mentions N distinct patterns each with theory + practical + generalization potential, that's **N notes, not one augment**. Compressed summary notes are the failure mode caught 2026-05-29 — 12 separate concept-extractable patterns got rolled into 2 augments. 3-question heuristic before deciding "one note vs N":
   - Is each pattern **one-sentence-describable** without losing meaning? → if yes, each is its own concept candidate
   - Does each pattern have an **analog elsewhere** in the field (or in the vault)? → if yes, atomic concept; cross-link
   - Does each pattern have **its own failure mode** distinct from the parent? → if yes, atomic concept; separate failure-mode discussion needed
   Default = extract. Compression is only allowed when ALL three checks fail for a candidate pattern.

8. **Pre-write practical-content gate** (added 2026-05-30 Phase 7 item 3.11). Before reaching Phase 6 (Decide write actions), every planned new concept note MUST have a verified concrete artifact attached — a code stub, config key, schema, dep name, command, file path, named-instance reference. **Binary check:**
   - If the dossier you built in Phase 4 contains at least one concrete artifact for this proposed note → proceed
   - If not → either (a) refetch source material to extract one, OR (b) demote the planned new note to an augment of an existing note. **Don't ship a concept note without a practical example.** Closes B6 from operator audit.

9. **Scope-recalibration on large sources** (added 2026-05-30 Phase 7 item 3.7 / via operator handoff). Between Phase 1 (Detect) and Phase 2 (Goal): if `discovered_sources_count > 2 × phase_b_sources_count` (the operator's planned set), auto-propose to Kriss: (a) expand scope this cycle, OR (b) multi-cycle plan splitting the agenda. Default = surface, never silently retreat to smallest-viable read. Caught 2026-05-25 ECC Topic 2 failure where a 200KB source produced 0-2 notes.

10. **DEFAULT to high concept volume via an orchestrator-plus-subagent-fleet** (added 2026-06-16 after the recurring "produces a handful of concepts, Kriss has to push for more, every time" failure, logged in `state/errors.md`). Kriss's standing goal is roughly 500 concepts per vault; a few-notes-per-run pace never reaches it. This rule gives the conservative-extraction failure mode quantitative teeth:
   - **Per-source floor.** A substantive source yields MULTIPLE atomic concepts, not one. Rough floor: a rich article or spec doc = **4 to 8 concepts**; a book chapter or large repo = more. If a rich source yields 1 to 2 notes, that is the failure, not restraint. Re-read and extract again.
   - **Per-session ambition.** A multi-source ingest targets **dozens** of concepts, not a handful. State the target concept count up front.
   - **Fan-out is the DEFAULT for any multi-source run** (not gated at >=8 docs, see Fanout discipline below). The main agent is the ORCHESTRATOR: assign one subagent per source or per theme, give each a STRICT per-source concept quota plus the full theory+practice (+how-it-works) depth contract, run them in parallel, then verify, dedupe, and wire navigation centrally. Subagents do the labor; each owns a disjoint slice so none can be lazy or compress. (The Workflow tool or parallel Agent dispatch both work; Workflow is preferred for >5 sources.)
   - **Empty/young-vault clause.** When the target vault is sparse, treat it as a HIGH-VOLUME opportunity: bias hard to breadth + depth. Low output on a near-empty vault is a defect.
   - **Exit self-check with teeth (generalizes the Phase 9 deep-dive floor to EVERY run).** Before wrapping, compare concepts produced against source richness. If a rich source under-produced, do another extraction pass or state the specific, concrete reason (e.g. "this doc genuinely has only N distinct in-scope concepts, here they are"). Never exit thin silently.
   - Do NOT wait to be told to go deeper or bigger. High volume + full depth is the DEFAULT expectation, not an upgrade Kriss has to request.

## When this skill activates

Activate when any of these signals are present:

- Direct phrasing: "ingest the data", "synthesize the research", "start new research on this topic", "let's research X", "I found out about Y", "add this to the vault", "process raw/", "process inbox"
- Source material is in `raw/`, `raw/research/`, `raw/inbox/`, or `inbox/` of the active vault and the user is asking to do something with it
- A URL, GitHub repo, book title, article, transcript, or topic name is dropped without further context while the cwd is a vault
- The user is comparing multiple projects/sources in a domain and asks for a written takeaway
- The user wants to capture a recently-read book, article, transcript, or codebase as notes

Do NOT activate for:

- Edits to existing notes the user is pointing at directly ("update this paragraph in `xyz.md`")
- Pure standalone questions ("what is X?") with no intent to capture
- Code-writing tasks unrelated to a vault
- Vault navigation/cleanup tasks (orphan audits, dead-link sweeps) — those have their own patterns

## Confirmation cadence

Before starting the workflow, ask once:

> *"Confirm at each phase gate, or run end-to-end?"*

Exception: if the user already said something like "go ahead and do the whole thing", "run end-to-end", "don't ask me between phases", "I'll be away", treat them as opted-in to end-to-end and skip this question.

Default behavior:

- **Confirm at each phase gate** (gates: phase 3 strategy, phase 6 write-action decisions). Other phases proceed automatically.
- **End-to-end mode**: skip per-phase confirmations. Still write `HANDOFF.md` if anything is incomplete at the end. Still surface the final result for review.

If the user changes their mind mid-cycle ("just keep going" or "wait, ask me before each phase"), adjust on the next phase.

## The workflow

### Phase 1 — Detect

Auto-detect (don't ask):

- **Which vault?** Walk up from the current working directory looking for `CLAUDE.md`. Read it. That's the active vault. If no `CLAUDE.md` is found, the user is not in a vault — ask them to point you to the vault root.
- **Entry point?** Identify where the source material lives or will come from:
  - Files in `raw/`, `raw/research/`, or `raw/inbox/` of the vault
  - Files in `inbox/` of the vault
  - URLs, GitHub repo names, file paths in the user's prompt
  - A topic name only (no source yet — user wants you to find candidate sources)
- **Prior coverage?** Grep the vault for the topic name and any obvious aliases. Note which existing notes are relevant, partially covered, or already cover the topic in depth.

Output a single short orientation: *"Looks like X for the [vault-name] vault — [entry point], [prior coverage status]."* No structured proposal yet, just orientation.

### Phase 2 — Goal

If the user has already stated a goal for this research, restate it back in your own words for confirmation. The restatement can be multi-sentence — capture the full intent, not a compressed summary.

If the user has not stated a goal, ask:

> *"What's the goal of this research? What should I be optimizing for?"*

Wait for the answer. Do not propose a strategy yet — the strategy in phase 3 is derived from the goal, and an incorrect goal silently invalidates the entire downstream workflow.

Common goal shapes (for reference, not a fixed taxonomy):

- "I want to build my own version of X — capture the patterns I'd reuse"
- "I want to understand the landscape of Y — surface what's common vs unique across approaches"
- "I want to capture this book's insights as reusable mental models for [domain]"
- "I want to extract concrete techniques I can apply to [problem]"
- "I want to update an existing concept note with what I just learned"

### Phase 3 — Strategy from first principles (HARD GATE)

Given the stated goal and the domain, derive a strategy for how to achieve the goal in the best possible way. **Do not copy-paste a strategy from a prior research cycle. Derive it from first principles for this specific goal in this specific domain.**

A strategy answers these questions:

- **What does "knowledge" look like for this domain, given the goal?** For multi-source OSS-project comparison aimed at a "build your own version" goal, knowledge takes the shape of *common foundations + per-project differentiators*. For a business book aimed at "capture reusable mental models", knowledge takes the shape of *frameworks + metaphors + concrete case studies*. For UX research aimed at "extract applicable principles", knowledge takes the shape of *principles + patterns + anti-patterns*. The shape is goal-and-domain-derived, not template-applied.
- **Where will source come from, specifically?** List actual repos, books, articles, files, URLs. If candidate sources need to be identified, list how you'll identify them and confirm the shortlist with the user.
- **What artifacts will the cycle produce?** Concept notes (how many roughly, what categories)? Entity notes? An MoC? Augments to existing notes? A new cluster? Be specific.
- **What's explicitly out of scope?** State what you are NOT capturing in this cycle.
- **What's the read depth?** For each source category, how thoroughly will you read it? "Read entire repo source" / "Read README + named load-bearing files + relevant directory listings" / "Read the entire book end to end" / "Read the article in full." The phase-4 fetch will enforce this — phase 3 commits to it.

Present the strategy in plain language. Let it breathe to whatever length it needs to be clear — there is no word limit. A bullet list with sub-bullets is usually right. Do not use a table unless the strategy genuinely has multiple parallel comparable dimensions.

**Wait for user confirmation.** This is the load-bearing gate. Common refinements to expect:

- "Don't derive differentiators from your prior synthesis — derive them only from the actual fetched sources"
- "Skip project X, not interesting"
- "Only capture the concrete examples, skip the frameworks"
- "I care most about angle Y — bias the synthesis there"
- "The shape is wrong — what we really want is [different shape]"

Apply the refinement. Either re-propose for re-confirmation, or proceed if the refinement is small enough.

### Phase 4 — Source-grounded fetch (the most important phase)

**This is the phase where quality is won or lost.** Every other phase depends on this being done correctly.

**Cheap-labor seam (2026-07-24, Kriss):** the MECHANICAL half of this phase (bulk-fetching public sources and caching them to disk inside the vault, plus first-pass condensing of very long raw material into working extracts) MAY be delegated to OpenCode Go via the sanctioned wrapper — contract, boundaries, and the tested parse pattern in `~/Kriss LLM/Claude OS/substrate/shared/oc-labor.md`. The JUDGMENT half never moves: Claude still verifies per-source coverage on disk (file exists, non-trivial length, spot-checked content; a missing/thin fetch is refetched by Claude, never papered over), still reads the fetched material for synthesis, and ALL concept-note authoring stays Claude.

**When sources must be DISCOVERED, not just fetched (2026-08-03).** If a topic's candidates are not yet named URLs (e.g. "find practitioner portfolios/case studies on X" rather than "fetch this known page"), do not default to `oc-labor`'s standard transport or to a Claude-side manual crawl — both hit dead keyless search backends or burn expensive tokens. Delegate with `"$HOME/Kriss LLM/Claude OS/bin/oc-labor" --transport cli --profile research --dir <cache_dir> "<discovery task>"`: the CLI transport carries a real Playwright browser on the OpenCode side and has proven live discovery (unguessable URLs navigated, verbatim page content spot-checked exact against the live site). See `oc-labor.md` §Transport and its web-discovery bullet. Verification is unchanged and mandatory: check the promised files landed on disk and spot-check content before treating any discovered source as real.

**PRE-PHASE-4 delegate decision (do this before fetching anything):** if this phase will fetch **3 or more PUBLIC URLs with no auth**, batch them to oc-labor in ONE call (list every URL, name an output dir inside the vault, size the timeout to the count per the contract's timeout guidance), then **VERIFY each cached file exists and has real content** (file present, non-trivial length, spot-checked) before reading any of it; if any file is missing or thin, refetch THAT one on Claude, never paper over it. A **single source, OR any private / paywalled / repo / behind-auth content**: fetch directly on Claude, no delegation. Wrapper syntax: `"$HOME/Kriss LLM/Claude OS/bin/oc-labor" --dir <output-dir> "<batched fetch task>"` (see `~/Kriss LLM/Claude OS/substrate/shared/oc-labor.md`).

**SPA-shell fallback (Kriss 2026-08-03 — folded in here rather than a standalone skill, since Phase 4 is the only place it's needed).** Client-side-rendered docs sites (Apple HIG `developer.apple.com/design`, Material 3 `m3.material.io`, Fluent, most modern docs SPAs) return only a ~200-byte JavaScript shell / bare `<title>` to WebFetch — a silent quality failure that caches a "successful" stub. When a fetch of a known-SPA URL (or any fetch returning suspiciously short content, ≤~500 chars after frontmatter strip) is hit, DON'T accept the stub — refetch via the Playwright MCP: `browser_navigate` to the URL, then `browser_evaluate` on `document.querySelector('main').innerText` **with the filename parameter set so the extracted text is written to a file instead of passing through model context** (it lands at `$HOME/<filename>`; move it into the raw dossier dir). Proven 2026-07-26: Apple HIG + M3 rendered 1.7–15.4 KB of real guidance each this way vs 195–202 bytes via WebFetch. Keep an **allowlist** of SPA hosts (a `spa-registry.md` beside the vault's `VAULT-CONVENTION.md`) rather than routing every URL through a browser — WebFetch stays the default (cheaper); the browser path is only for allowlisted SPA hosts or a detected short-shell.

For each source identified in phase 3:

- **Read end to end.** Full file, full article, full book, full repo's load-bearing files. Not previews. Not first 20 lines. Not "I'll skim the README." Read until you have actually covered the content.
- **For repositories:** read `README.md`, `AGENTS.md`/`CLAUDE.md` if present, top-level directory listings, then the named load-bearing files (entry points, agent loops, config schemas, the specific files the strategy in phase 3 demanded). Aim for whatever depth the strategy committed to.
- **For long sources (books, long articles, large repos):** read in sequential chunks until you have covered all of it. Do not stop after the first chunk and synthesize from there. Track which chunks you have read and which remain.
- **Save raw outputs verbatim** to `raw/research/YYYY-MM-DD-<topic-slug>/<source-name>.md` (or the vault's equivalent location — check its `CLAUDE.md`). Do not paraphrase, do not "clean up", do not "tighten" — save what you read with citations.
- **Each raw dossier has YAML frontmatter:** `tags: [raw, dossier, source-grounded, <topic>, <project-name-if-applicable>]`, `date`, `source_url` (or `source_path` for local files), and a count or list of files/chapters/sections actually read.
- **Mark UNVERIFIED explicitly** for any claim you could not verify from the source. Do not paper over gaps with plausible-sounding paraphrase.
- **Cite specific locations** — file:line, URL anchor, page, timestamp — for every load-bearing claim. Generic "according to the docs" is not a citation.

If the goal of the cycle is achievable in one source (single-source deep-dive), this phase produces one dossier. If the goal is comparison across multiple sources, this phase produces one dossier per source, and the next phase synthesizes across them.

### Phase 5 — Synthesize

Apply the strategy from phase 3 to the raw research from phase 4. The synthesis is wherever the strategy said the knowledge lives:

- If the strategy says "find common patterns and per-project differentiators": cross-tabulate the dossiers, identify common foundations (mention which projects share them, with citations), identify per-project unique patterns (with file-level citations to that project's dossier).
- If the strategy says "extract frameworks, metaphors, case studies from the book": list each, with chapter/page citations.
- If the strategy says something else: do that.

Save the synthesis to `raw/research/YYYY-MM-DD-<topic-slug>/synthesis.md` so the decisions in phase 6 are auditable.

Each finding gets:

- A short name (the eventual note title or augment subject)
- The category from the strategy (differentiator / framework / metaphor / principle / pattern / etc.)
- Source citations
- A one-paragraph plain-language description of what it is and why it matters for the goal

### Phase 6 — Decide write actions

For each finding from phase 5, decide one of:

- **New dedicated note** — the finding is a self-contained concept worth its own page in the vault. Specify the proposed filename and which folder (`concepts/`, `entities/`, `sources/`, per vault conventions).
- **Augment an existing note** — the finding extends an existing concept. Specify which note and roughly where the augment lands.
- **Mention in MoC / log only** — the finding is too narrow or too implicit elsewhere to deserve its own treatment.
- **Skip** — the finding doesn't pay rent in the vault's current state.

Produce a decisions table. If running in confirm-each-phase mode, present the table and wait for approval/edits. If running end-to-end, proceed.

**The decision logic is strategy-dependent**, which is why this phase exists as a separate gate. Example: the comparison-and-differentiator strategy (validated for OSS personal-agent research) maps to:

- Each surfaced differentiator → dedicated note with theory + concrete file-level practical example
- Each common foundation pattern → augment to the existing concept note where that pattern is already discussed
- New entity notes for any project / person / org not yet in the vault
- A cluster MoC if a coherent grouping emerged

Other strategies will have different decision logic. For now this skill ships only the comparison-and-differentiator mapping in detail; other shapes are left open-ended and will be refined as the user runs more cycles.

### Phase 7 — Write

For each new dedicated note:

- Follow the active vault's `CLAUDE.md` conventions exactly (frontmatter, wikilinks, file paths)
- Structure each note as: **theory** (what the concept is) + **strategic angle** (why it matters for the user's stated goal) + **at least one concrete practical example** (file path, code stub, config key, named real-world instance, actionable strategy). Verbatim source citations belong in a `Sources` section at the end.
- Wikilinks to related vault notes (use full filename without path; let Obsidian resolve)
- Mark `UNVERIFIED` for any claim that survived to write phase without verification

For each augment:

- Add one to three paragraphs to the named existing note
- Include source citation
- Cross-link to any new dedicated notes if relevant
- Do not rewrite the existing note's structure — augment in place, preserving the existing voice

### Phase 8 — Navigation

Update the active vault's navigation files (read its `CLAUDE.md` for which apply; common ones below):

- `index.md` — surface new notes / MoC entries under the appropriate cluster
- `overview.md` — add cluster entries if a new grouping emerged
- `log.md` — chronological entry describing what was added/changed, with wikilinks to the new notes and links to the raw dossiers
- Topic MoC for the cluster if one exists or was just created — link the new notes from it

The vault's `CLAUDE.md` may specify these updates are part of every research session, not afterthoughts. Respect that.

### Phase 9 — Wrap-up

- **Deep-dive pre-exit gate (added 2026-06-16).** If the wiki-operator flagged this cycle **DEEP-DIVE** (passed in via the Phase C handoff brief), the cycle may NOT exit with fewer than 10 distinct in-scope concept notes produced. If it's short, do another adjacent-depth expansion pass on the topic's real neighbouring sub-concepts (depth the topic genuinely implies, never invented filler), or log a concrete, specific reason (e.g. "the topic has only N real adjacent sub-concepts, and here they are") before exiting. Minimum 10, aim 15. A **routine / single-gap-close** cycle (or one with no deep-dive flag) keeps the soft target: an honest under-run is fine, and you never invent filler to hit a number. Quality still gates every note; a thin or out-of-scope note does not count toward the floor.
- **If anything is incomplete** (sub-agent dispatches didn't return, notes still pending, navigation not updated, source-grounded fetch was cut short), write `raw/research/YYYY-MM-DD-<topic-slug>/HANDOFF.md` with `[done] / [in-progress] / [pending]` items so a fresh session can resume at full fidelity. Never compress the remaining work to "finish" — defer instead.
- **Suggest `/retrospective`** if the cycle was substantial (more than ~1 hour, or more than ~5 notes written, or this was a multi-source comparison). Skip the suggestion for tiny cycles.
- **Surface the final result**: a short summary listing dedicated notes written, augments applied, navigation updates made, and any items deferred to handoff. Include direct file paths so the user can review without searching.

## Sub-agent dispatch rules

When this workflow needs parallel work — fetching multiple sources, reading multiple long files — dispatch sub-agents. **The main agent is responsible for ensuring sub-agents do not drift from the hard rules.** Sub-agents do not have this skill's full instructions loaded; they only have the prompt you give them. If your prompt is sloppy, the sub-agent will read the first 20 lines, synthesize plausibly, and return an output that looks correct but is not source-grounded.

### Fanout discipline (added 2026-05-30 Phase 7 item 3.2)

**Fan-out is the DEFAULT for any multi-source run (revised 2026-06-16, hard rule 10).** Assign one subagent per source or per theme, with a STRICT per-agent concept quota + the theory+practice (+how-it-works) depth contract, run them in parallel, then verify/dedupe/wire-nav centrally. The earlier "only when source list >= 8 docs" gate was the under-production cause: serial main-agent reads compress findings (caught 2026-05-25 in errors.md, the cycle-2026-05-25-2 Topic 3 dossier rolled multi-pattern findings into single notes; recurred 2026-06-16 on the Motion vault). Sizing: cap each subagent at 1 to 3 sources (4 to 6 docs max) so it can read fully and extract at its quota without compressing. Use the Workflow tool for >5 sources, parallel Agent dispatch for fewer. Single serial main-agent reads are reserved for a genuine one-source micro-ingest.

Examples:
- 12 docs across architecture + memory + agent-loop themes → 3 sub-agents, one per theme, 4 docs each
- 8 docs all on agent-architecture → 2 sub-agents, 4 docs each, split by sub-theme (e.g. loop-mechanics vs prompt-assembly)
- <8 docs → single sub-agent OR serial main-agent reads (single-agent default per rule SA1)

### Mandatory verbatim spot-check on every returned dossier (added 2026-05-30 Phase 7 item 3.2)

**After each sub-agent returns, BEFORE accepting the dossier, pick 2–3 random load-bearing quotes from the dossier and Read/WebFetch the cited source location to verify the quote is verbatim.** Surface to user as `spot-check: 3/3 verified` or `spot-check: 2/3 — re-dispatching with stricter prompt` (closing B9 from operator audit).

If spot-check fails: re-dispatch the same sub-agent with the failed citations called out + a stricter "verbatim quote, file:line required" instruction. Do not accept the dossier until spot-check passes 3/3. The 2026-05-25 sub-agent under-load failure was caught Kriss-side; this rule makes it operator-caught instead.

**Use the template below for every sub-agent dispatch in this workflow.** Fill in the `<...>` placeholders. Do not omit any rule. Do not soften the language.

```
You are fetching source material for a research dossier. Hard rules — follow them strictly.

GOAL: <one-sentence goal from phase 2, restated>
STRATEGY: <the relevant slice of phase-3 strategy for this source>
SOURCE: <repo URL, file path, book title, article URL, etc.>

HARD RULES — DO NOT VIOLATE:

1. Read the entire content of the source end to end. Not the first 20 lines. Not a preview.
   Not "I'll skim the README". Read until you have covered all of it. For repositories,
   that means README + AGENTS.md/CLAUDE.md + top-level directory listings + every named
   load-bearing file the strategy demands. For books and long articles, read in sequential
   chunks until covered.

2. Cite specific source locations for every load-bearing claim — file:line, URL anchor,
   page, timestamp. Generic "according to the docs" is NOT a citation. Every architectural
   claim, every named function, every config key must have a file:URL pointer.

3. Mark UNVERIFIED for any claim you cannot verify from the source. Do not invent.
   Do not paraphrase plausibly. Do not infer from your training data. If the source
   does not say it, mark UNVERIFIED or omit.

4. Do not rewrite source material in your own words where the source's exact wording
   is load-bearing. Preserve verbatim quotes for: code snippets, file paths, config keys,
   named functions/classes, command-line examples, key sentences. Paraphrase only the
   surrounding explanation.

5. Do not trim. Do not "tighten". Do not compress to save tokens. If the output is long
   because the source is rich, the output is long. Quality is the bar, not brevity.

6. Follow the strategy strictly. If the strategy says "extract X, Y, Z", do not also
   extract A, B, C from elsewhere. If the strategy says "compare against project Y",
   do not introduce projects you weren't asked about.

OUTPUT FORMAT:
- YAML frontmatter: tags: [raw, dossier, source-grounded, <topic>, <project>], date,
  source_url, files_read (count and/or list)
- Body: structured per the strategy
- Sources section at the end with full file/URL list

Save your output to: raw/research/<YYYY-MM-DD>-<topic-slug>/<source-name>.md
```

After sub-agents return: **verify the output is actually source-grounded before accepting it.** Spot-check 2-3 citations. If a citation is wrong or generic, the dossier likely drifted — re-dispatch with a stronger prompt or fetch the source yourself.

## Known strategies

### Comparison-and-differentiator (validated, source-grounded for OSS-project research)

**When to use:** the goal involves understanding multiple parallel sources in the same problem space, with the intent of building / picking / synthesizing the best across them.

**Shape:**
- Fetch each source as a separate dossier in phase 4 (one sub-agent per source typically)
- Phase 5 cross-tabulates the dossiers: common patterns across N≥3 sources = foundation; patterns unique to one source = differentiator
- Phase 6 maps: each differentiator → dedicated concept note; each foundation pattern → augment to the corresponding existing note (or new note if foundation isn't already covered); new entity notes for any project not yet captured
- Phase 7 writes: differentiator notes get the full theory + practical + source-citation treatment; augments get one to three paragraphs each with a source citation
- Phase 8 navigation: new cluster MoC if a coherent grouping emerged; index/overview/log updates

**Examples from prior cycles:**
- Tier 1 personal-agent research: OpenClaw, Hermes, Khoj, Letta, Goose, gstack → 5 dossiers → 24 dedicated differentiator notes + 12 augments
- Tier 2/3 personal-agent research: Aider, opencode, smolagents, crewAI, Mem0, Graphiti, Pipecat, LiveKit, Continue, Cline → 11 dossiers → 27 dedicated differentiator notes + ~30 augments

### Other strategy types

Open-ended for now. Strategies for single-source deep-dive, book ingestion, transcript synthesis, lecture capture, anti-pattern catalog, etc. will be added to this section as the user runs cycles that exercise them. The phase-3 first-principles derivation is the fallback: read the goal, derive the right shape, confirm with the user, proceed.

## What this skill is NOT

- **Not a fixed template** — the strategy in phase 3 is derived per-cycle from the goal and domain. The only fixed parts are the hard rules and the phase boundaries.
- **Not an autocomplete** — does not write notes without user goal confirmation and (in default mode) strategy + write-action confirmations.
- **Not vault-specific** — works in any vault by reading its `CLAUDE.md`. Conventions never travel between vaults.
- **Not a substitute for `/retrospective`** — that command surfaces *meta-patterns across a session, including workflow-conversion opportunities*. This skill *ingests a specific research topic*. They compose: run this skill to do the research, then run `/retrospective` afterward to capture anything about the research process itself worth codifying further.
- **Not a code-writing skill** — research outputs are markdown notes in the vault, not code changes.

## Related

- Manual trigger for the same workflow: `/vault-research` command at `~/.claude/commands/vault-research.md`
- After a substantial cycle: run `/retrospective` to capture any meta-patterns
- Per-vault conventions: that vault's own `CLAUDE.md`
- Memory entry on source-grounded synthesis discipline (the user's standing preference)
