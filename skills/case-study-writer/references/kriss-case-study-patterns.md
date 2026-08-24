# Kriss's own case-study patterns (from the Connect2crypto trio)

Extracted 2026-08-10 by reading all three published C2C case studies in full
(`~/Kriss Playground/public/Posts/C2C casestudy 1|2|3/*.html`). These are his
REAL published patterns and they override generic craft guidance where they
conflict. Apply all of them to every case study draft.

## The patterns

1. **Opener = role + exact team + duration, one paragraph.** "I was the main
   designer working on this project, with a team of **one PM, five
   developers, and a Product Owner** ... done in approximately **6 weeks**."
   Team composition and timeline bolded. No preamble before it.

2. **Section titles are plain labels, 2 to 4 words.** Problem · Initial User
   Testing · The Design Process · First Version · Testing · Improvements ·
   Learnings. Descriptive, zero cleverness, zero marketing. A title may carry
   one specific ("Version one: a home for agreements") but never a slogan.

3. **Paragraphs are 1 to 3 sentences.** Never more. Complexity is handled by
   more small sections, not longer paragraphs (this also answers "should I
   split it in two": usually no, restructure smaller instead).

4. **Findings are bulleted, with the number AND the behavior bolded.**
   "**33%** of the users **joined/opened the community page**."

5. **Before/after deltas stated explicitly.** "82% compared to the previous
   33%, an increment of **248%**."

6. **Numbers live where they drive the story**, never collected in one
   outcome dump: baseline numbers in Problem/first testing, turn numbers at
   the pivot, improvement numbers in Improvements. When drafting with
   placeholders, sprinkle them at these points and describe exactly which
   number to fetch.

7. **An image every 1 to 3 paragraphs.** The visuals carry the design and the
   domain complexity; the text stays light. Captions on evidence shots
   ("Screenshot from the comparison of two attention heatmaps"). For complex
   flows, plan explainer ANIMATIONS, not just stills.

8. **Constraint tension told plainly and early.** "The sprint had already
   started ... so I had to be clever."

9. **A stated turn in the story.** "This proved our biggest assumption was
   wrong." The pivot is named, not implied.

10. **Links to relevant studies/articles where they're earned.** He cites the
    NN Group study behind the ad-blindness finding. One to three genuine
    links per piece (NN Group heuristics, real research), placed inline at
    the decision they justify. VERIFY every URL resolves before shipping.

11. **Learnings closes every piece.** Honest, includes what got cut or pushed
    to a next version, credits the team.

12. **Bold key phrases mid-sentence**, not only numbers. "I" for his moves,
    "we" for team work.

13. **Titles and descriptions are gerund + outcome + product context.**
    Titles: "Improving homepage for better user engagement of Crypto
    communication app" · "Helping Crypto investors find their next
    investment" · "Building a Design System for Growing Startup". Never a
    thesis or slogan title ("Five steps are simpler than two" was bounced for
    this). Descriptions: one line, same shape, outcome first ("Creating a
    scalable design system to support rapid growth and consistent UX").

## Restructure rule (hard, 2026-08-10)

When Kriss approves a draft's prose and then asks for a STRUCTURAL change
(reorder, chunk smaller, retitle), keep the approved sentences verbatim and
move them; do not rewrite them into new constructions. A restructure pass
that rewrote approved sentences got bounced for "started to look like written
by AI." Structure changes and sentence changes are separate passes.

Links inside a portfolio case study use the site's existing global link
styling; never add a local link style override.

## Review workflow (Kriss's preference, 2026-08-10)

Present drafts as a LIVE PAGE on his portfolio (Kriss Playground,
`~/Kriss Playground`), not only as chat markdown: add the entry as
`draft: true` in `src/data/entries.json` + a component in
`src/components/elements/` (registered in EntryPage.jsx), run the dev server,
and give him the local URL. He reviews in final form and gives much sharper
feedback there. Image slots = labeled plain-background blocks with export
sizes; metric placeholders = amber-highlighted spans he can spot instantly.
