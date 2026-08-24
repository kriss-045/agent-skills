#!/usr/bin/env node
// xray.mjs — the MECHANICAL half of /skill-xray. Emits a JSON facts pack about a skill folder.
//
// Why a script and not just reading the file: every number in an X-ray (token cost per load
// layer, which reference files are reachable, which line a region starts on) is countable, and
// a counted number in a report is trustworthy while a remembered one is not. The skill reads
// this output and spends its judgment on the ANNOTATIONS, never on the arithmetic.
//
// Usage:  node xray.mjs <path to skill dir or SKILL.md>  [--pretty]
// Output: JSON on stdout. Exit 1 with {"error": ...} if the target is not a skill.

import fs from "node:fs";
import path from "node:path";

const argTarget = process.argv.slice(2).find((a) => !a.startsWith("--"));
const pretty = process.argv.includes("--pretty");
const die = (msg) => { console.log(JSON.stringify({ error: msg })); process.exit(1); };
if (!argTarget) die("usage: node xray.mjs <skill dir or SKILL.md> [--pretty]");

let dir = path.resolve(argTarget.replace(/^~/, process.env.HOME || "~"));
if (fs.existsSync(dir) && fs.statSync(dir).isFile()) dir = path.dirname(dir);
const skillPath = path.join(dir, "SKILL.md");
if (!fs.existsSync(skillPath)) die(`no SKILL.md at ${skillPath}`);

const raw = fs.readFileSync(skillPath, "utf8");
const lines = raw.split("\n");
// Token cost is an ESTIMATE and is labelled as one everywhere it is shown. ~4 chars per token is
// the standard rule of thumb for English prose; the point of the figure is the RATIO between the
// three load layers, which is robust to the constant, not the absolute count.
const tokens = (s) => Math.round((s || "").length / 4);

// ── frontmatter ──────────────────────────────────────────────────────────────
let fm = null, fmEndLine = 0, body = raw;
if (lines[0]?.trim() === "---") {
  const end = lines.findIndex((l, i) => i > 0 && l.trim() === "---");
  if (end > 0) {
    fm = lines.slice(1, end).join("\n");
    fmEndLine = end + 1;
    body = lines.slice(end + 1).join("\n");
  }
}
const fmField = (name) => {
  if (!fm) return null;
  // handles `name: value`, quoted values, and folded multi-line values
  const re = new RegExp(`^${name}:[ \\t]*(.*)$`, "m");
  const m = fm.match(re);
  if (!m) return null;
  let v = m[1].trim();
  // YAML block scalars (`description: >-`, `|`, `>+`) and plain continuations both put the real
  // value on the FOLLOWING indented lines. Missing this made the script report visual-report's
  // description as the two characters ">-" and then flag it for "never states when to use the
  // skill", which is a tool that lies rather than a tool that is silent. Take the indented block.
  if (!v || /^[|>][-+]?\d*$/.test(v)) {
    const after = fm.slice(fm.indexOf(m[0]) + m[0].length).split("\n");
    const block = [];
    for (const l of after) {
      if (/^\s+\S/.test(l)) block.push(l.trim());
      else if (l.trim() === "") continue;
      else break; // a new top-level key ends the block
    }
    v = block.join(" ").trim();
  }
  return v.replace(/^["']|["']$/g, "");
};
const description = fmField("description");
const name = fmField("name");
const allowedTools = fmField("allowed-tools") || fmField("allowedTools");
const fmKeys = fm ? [...fm.matchAll(/^([a-zA-Z][\w-]*):/gm)].map((m) => m[1]) : [];

// ── the trigger surface, which is the description and nothing else ───────────
// Everything the model has when it decides whether to invoke lives in the description. Splitting
// it into what it CLAIMS to fire on and what it EXCLUDES is the single most useful cut in an
// X-ray, because an unstated exclusion is the commonest cause of a skill firing on the wrong task.
// Sentence-anchored and CASE-SENSITIVE on purpose. A first pass matched `\bNot\b` anywhere and
// split this skill's own description in half at "why does my skill not fire", reporting "not fire,
// what does this part of my SKILL." as the exclusion clause. The clause boundary is a sentence
// start ("Not for X", "Skip when Y"), never the word "not" mid-sentence.
// Exclusion clauses come in more phrasings than "Not for": "When NOT to use:", "Do not use",
// "Don't use". Missing them flags a healthy description as exclusion-less (7th false-positive
// class, found on kriss-writing-style 2026-08-21).
const EXCL_AT = /(?:^|(?<=[.!?]\s))(?:Not\b|Skip\b|Never\b|(?:When\s+)?NOT\s+to\s+use\b|When\s+not\s+to\s+use\b|Do(?:es)?\s?n[o']t\s+use\b|Do\s+not\s+use\b)[^]*/;
const notClause = description ? ((description.match(EXCL_AT) || [])[0] || null) : null;
const triggerClause = (() => {
  if (!description) return null;
  const m = description.match(/Triggers?:\s*/i);
  if (!m) return null;
  const from = description.slice(m.index + m[0].length);
  const cut = from.search(EXCL_AT);
  return (cut === -1 ? from : from.slice(0, cut)).trim().replace(/\.$/, "") || null;
})();
const triggerPhrases = triggerClause
  ? triggerClause.split(/[,;]| or /i).map((s) => s.trim().replace(/^["'“”]|["'“”]$/g, "")).filter((s) => s.length > 2)
  : [];

// ── heading tree of the body, with real line numbers ─────────────────────────
const headings = [];
lines.forEach((l, i) => {
  const m = l.match(/^(#{1,6})\s+(.*)$/);
  if (m && i >= fmEndLine) headings.push({ line: i + 1, depth: m[1].length, text: m[2].trim() });
});
// section spans, so an annotation can point at a real line range
headings.forEach((h, i) => {
  const next = headings.slice(i + 1).find((x) => x.depth <= h.depth);
  h.endLine = next ? next.line - 1 : lines.length;
  h.chars = lines.slice(h.line - 1, h.endLine).join("\n").length;
});

// ── the CRITICAL / invocation preamble: body text before the first heading ───
const firstHeadingLine = headings.length ? headings[0].line : lines.length + 1;
const preamble = lines.slice(fmEndLine, firstHeadingLine - 1).join("\n").trim();

// ── reference files: what exists on disk vs what the body points at ──────────
const walk = (d, acc = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
};
// Not every file in a skill folder is progressive-disclosure material. Eval corpora, recorded runs,
// generated decks and binary assets are workshop output the body is not supposed to route to, and
// counting them as unreachable buries the finding that matters: kriss-ui reported 110 unreachable
// files on the first pass, 106 of which were eval responses and generated HTML. They are reported
// separately as `notDisclosure` and never as dead weight.
// `xray-*.html` is this skill's OWN output, saved beside the target skill on request; without the
// exclusion the tool accuses every previously x-rayed skill of one orphan (the fifth false-positive
// class, found 2026-08-20 when re-running on visual-report after its X-ray was kept next to it).
const NOT_DISCLOSURE = /(^|\/)(evals?|runs?|assets|fixtures|__tests__|node_modules|[\w-]*fonts?)(\/|$)|(^|\/)(LICENSE|LICENCE|NOTICE)[\w.-]*$|-OFL\.txt$|(^|\/)xray-[\w.-]*\.html$/i;
const TEXTUAL_EXT = /\.(md|txt|json|ya?ml|mjs|js|ts|py|sh|html?)$/i;
const onDisk = walk(dir).filter((p) => p !== skillPath).map((p) => ({
  rel: path.relative(dir, p),
  bytes: fs.statSync(p).size,
  tokens: /\.(md|txt|json|ya?ml|mjs|js|ts|py|sh)$/i.test(p) ? tokens(fs.readFileSync(p, "utf8")) : null,
}));
// A pointer counts as a mention if the body names the file by its relative path or basename.
const mentions = (rel) => {
  const base = path.basename(rel);
  return body.includes(rel) || body.includes(base);
};
// Skills routinely point at a FAMILY of files with a template rather than by name:
// `references/chapter-*.md`, `references/observer-<worker>.md`,
// `references/observer-{gap-miner,pattern-watch}.md`. Those files ARE reachable, just via a
// directory listing rather than a direct pointer, and calling them dead weight was this script's
// first false alarm (it accused observer and kriss-ui of four orphans each, all of them templated).
// They get their own bucket: reachable, but through a weaker pointer worth annotating.
const patternPrefixes = [...new Set([...body.matchAll(/(?:references|scripts|assets)\/[A-Za-z0-9._{}<>*?,/-]*[{<*?][A-Za-z0-9._{}<>*?,/-]*/g)].map((m) => m[0]))]
  .map((tok) => {
    const stem = tok.slice(0, tok.search(/[{<*?]/));
    const ext = (tok.match(/\.([A-Za-z0-9]+)$/) || [])[0] || "";
    return { stem, ext, tok };
  })
  .filter((p) => p.stem.length > 4);
const matchesPattern = (rel) => patternPrefixes.some((p) => rel.startsWith(p.stem) && (!p.ext || rel.endsWith(p.ext)));

// Only TEXTUAL files can be progressive-disclosure material, so only they can be dead weight.
// Fonts, images and binaries are payload a script consumes; they are not meant to be named in
// SKILL.md and never will be. canvas-design ships 82 .ttf/.txt font files and the first pass
// accused it of 82 orphans, which is a tool nobody would believe twice.
const disclosure = onDisk.filter((f) => !NOT_DISCLOSURE.test(f.rel) && TEXTUAL_EXT.test(f.rel));
const notDisclosure = onDisk.filter((f) => NOT_DISCLOSURE.test(f.rel) || !TEXTUAL_EXT.test(f.rel));
const referenced = disclosure.filter((f) => mentions(f.rel));
const byPattern = disclosure.filter((f) => !mentions(f.rel) && matchesPattern(f.rel));
const unreachable = disclosure.filter((f) => !mentions(f.rel) && !matchesPattern(f.rel));
// Pointers in the text that do NOT exist on disk. Must end in a real file extension: a bare
// `references/chapter-` harvested out of prose describing a FAMILY of files was the other false
// positive of the first pass, reported as a broken pointer when nothing was broken.
// Cross-skill pointers like ../other-skill/references/x.md must keep their ../ prefix, or the
// existsSync below checks the wrong folder and reports a healthy sibling file as broken (the
// sixth false-positive class, found on a brand-specific UI skill 2026-08-21).
const pointerLike = [...new Set([...body.matchAll(/(?:(?:\.\.\/)+[A-Za-z0-9._-]+\/)?(?:references|scripts|assets)\/[A-Za-z0-9._/-]+/g)].map((m) => m[0]))]
  .filter((p) => TEXTUAL_EXT.test(p) && !/[*?]/.test(p) && !/[-_/]$/.test(p));
const brokenPointers = pointerLike.filter((p) => !fs.existsSync(path.join(dir, p)));

// ── the three load layers, which is the whole point of the picture ───────────
// ALWAYS: the description is in the model's context in every single session, whether or not the
// skill is ever used, so a bloated description is a tax on everything.
// ON TRIGGER: the SKILL.md body, paid once, only when the skill fires.
// ON DEMAND: each reference file, paid only if the body actually routes to it. This is why moving
// bulk out of SKILL.md into references/ is not cosmetic, it moves cost from certain to conditional.
const layers = {
  always: { what: "frontmatter description (the entire trigger surface)", tokensEst: tokens(description) },
  onTrigger: { what: "SKILL.md body", tokensEst: tokens(body) },
  onDemand: [...referenced, ...byPattern].map((f) => ({ what: f.rel, tokensEst: f.tokens, viaPattern: !referenced.includes(f) })),
};

const out = {
  target: { dir, name, hasFrontmatter: !!fm, frontmatterKeys: fmKeys, allowedTools },
  description: description ? { text: description, chars: description.length, tokensEst: tokens(description), triggerClause, triggerPhrases, notClause } : null,
  body: { lines: lines.length, chars: body.length, tokensEst: tokens(body), preamble: preamble ? { lines: [fmEndLine + 1, firstHeadingLine - 1], chars: preamble.length, text: preamble.slice(0, 600) } : null },
  headings,
  files: {
    count: onDisk.length,
    referenced: referenced.map((f) => f.rel),
    // reachable, but only via a templated pointer (`references/chapter-*.md`) — the model has to
    // list the directory to find them, so the pointer is weaker than a named one
    reachableByPattern: byPattern.map((f) => f.rel),
    unreachable: unreachable.map((f) => f.rel),
    // present on disk, not meant to be loaded (evals/, runs/, assets/) — never dead weight
    notDisclosure: { count: notDisclosure.length, sample: notDisclosure.slice(0, 5).map((f) => f.rel) },
    brokenPointers,
  },
  layers,
  // Mechanical flags only. Each one is a COUNT or a presence test, never a judgment; the skill
  // turns these into findings and the model's own reading supplies everything else.
  flags: [
    !fm && "no frontmatter at all",
    fm && !name && "frontmatter has no name",
    fm && !description && "frontmatter has no description, so the model has no trigger surface",
    description && description.length > 1024 && `description is ${description.length} chars, long enough to be paying rent in every session`,
    description && !/Trigger|when |use this|Use when/i.test(description) && "description never states WHEN to use the skill",
    description && !notClause && "description states no exclusion, so nothing tells the model when NOT to fire",
    !headings.length && "body has no headings, so there is no structure to route through",
    unreachable.length && `${unreachable.length} file(s) on disk are never mentioned in SKILL.md, so they can never be loaded`,
    byPattern.length && `${byPattern.length} file(s) are reachable only through a templated pointer, so the model must list the directory to find them`,
    brokenPointers.length && `${brokenPointers.length} pointer(s) in the text do not exist on disk`,
    tokens(body) > 2500 && `body is ~${tokens(body)} tokens; candidate for moving detail into references/`,
  ].filter(Boolean),
};

console.log(JSON.stringify(out, null, pretty ? 2 : 0));
