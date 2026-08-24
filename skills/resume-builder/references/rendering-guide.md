# Rendering guide: the two artifacts and the flair gate

How to turn the built content into the two PDF artifacts, and exactly when design flair is allowed.

## Table of Contents

1. [Pipeline: content to HTML to PDF](#pipeline)
2. [ATS-safe artifact spec](#ats)
3. [Designed artifact spec + flair gate](#designed)
4. [Rendering commands (with fallback)](#commands)

<a name="pipeline"></a>
## 1. Pipeline: content to HTML to PDF

Author each artifact as a self-contained HTML file (inline CSS, no external assets), then render it to PDF. HTML is the intermediate because it gives full control over the designed version's layout and flair while keeping the ATS version trivially plain, and it renders to selectable-text PDF (never text-as-image). Produce two HTML files: `resume-ats.html` and `resume-designed.html`, then render both.

<a name="ats"></a>
## 2. ATS-safe artifact spec

- One `<div>` column, max-width for print, standard system font stack (e.g. Arial/Helvetica/Calibri equivalents), black text on white.
- Headings are real `<h2>` text: Summary, Experience, Skills, Education. No icons, no columns, no tables, no background shapes, nothing in a running header/footer.
- Bullets are real `<ul><li>`. Dates and titles as plain text.
- Goal: a parser extracts every field in reading order with zero loss. When in doubt, make it plainer.

<a name="designed"></a>
## 3. Designed artifact spec + flair gate

Same content, human-facing. Always keep real selectable text and second-scan skimmability. Then apply the **flair gate** (default OFF):

Add flair ONLY when ALL are true:
1. the target role is design/creative (flair reads as craft there; on a non-design role it reads as noise), AND
2. it improves scanning (clearer hierarchy, faster to read), not just decoration, AND
3. it is on the designed artifact only, never the ATS one.

Allowed flair when the gate passes (restrained): a single accent color used sparingly for section rules or the name; cards with a subtle drop shadow to group roles; a stronger but standard type hierarchy; generous whitespace. Banned even when the gate passes: multi-column body text that breaks reading order, text baked into images, decorative fonts that hurt legibility, so much color/shadow that the page reads as a poster rather than a resume. If the gate fails, ship a clean, restrained single-column designed PDF (better typography than the ATS copy, no ornament).

<a name="commands"></a>
## 4. Rendering commands (with fallback)

Render each HTML to PDF with headless Chrome/Chromium (produces selectable-text PDF, honors print CSS):

```
# macOS Chrome example; adjust the binary path to what is installed
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="resume-ats.pdf" "resume-ats.html"
```

Fallbacks, in order, if no Chrome/Chromium binary is available:
1. Chromium via `chromium --headless --print-to-pdf=...`.
2. A Node one-liner using Playwright if installed (`page.pdf({path, printBackground:true})`).
3. If no headless renderer exists, write the HTML files and tell the candidate to open each in a browser and use Print to PDF (choose "Save as PDF", margins default). Do not silently skip: state that manual print is required and why.

Verify each PDF exists and is non-empty before presenting. Name outputs clearly (`<name>-ats.pdf`, `<name>-designed.pdf`).
