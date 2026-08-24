# De-Aification: Visual / UI Design Tells

Detect and remove AI-generation markers from web interfaces, mobile screens, landing pages, and dashboards.

**Important note:** This space has 23 documented tells, but 22 are opinion-based practitioner observations without empirical corpus studies or controlled experiments. Only one tell (low contrast ratio) is measurable. The rules below are pattern observations consistently reported across design communities, but not proven via research.

---

## Measurable Tells

### 1. Low Contrast Text (WCAG Failure)
**Tell:** Body text that fails WCAG AA accessibility standards in dark themes. Contrast ratio < 4.5:1 fails AA standard.

**Concrete example:**
`#777777` text on `#1a1a1a` background = contrast ratio ~3.2:1 (fails WCAG AA).

**Fix:** Use WCAG AA contrast ratio minimum (4.5:1 for normal text, 3:1 for large text). Test with a contrast checker (WebAIM, Color Contrast Analyzer, browser DevTools). Light text on dark background: aim for #e0e0e0 or lighter on #1a1a1a.

**Evidence:** EMPIRICAL (measurable via WCAG contrast ratio calculator)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

## Visual Patterns (Opinion-Based, Consistent)

### 2. Colored Left-Border Cards
**Tell:** Colored left border on card containers (often 4-6px left border in vibrant accent color). Described as "almost as reliable a sign of AI-generated design as em-dashes for text."

**Concrete example:**
Feature card with bright teal/purple/pink left border, grey background, white text.

**Fix:** Remove left borders or use them sparingly and deliberately. If borders are needed, use subtle full borders (1px, low-saturation color) instead of thick accent left borders. Borders should serve a functional purpose (grouping, hierarchy) not decoration.

**Evidence:** OPINION (practitioner observation; described as "most specific tell")

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 3. Perfect Bilateral Symmetry
**Tell:** Mathematically perfect bilateral symmetry and grid alignment; zero deliberate asymmetry. All hero sections centered, all feature cards identical height, all columns exactly equal width.

**Fix:** Introduce deliberate asymmetry. One section left-aligned. One column slightly narrower. One card taller. One element offset. Asymmetry is a signature of human design choice.

**Evidence:** OPINION (design analysis)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 4. Over-Symmetric Repeated Elements
**Tell:** Decorative elements (icons, flourishes, background textures) repeated with unnatural precision; zero intentional variation.

**Concrete example:**
Six feature cards with identically-sized icons, identical spacing, identical corner radius, identical shadow blur.

**Fix:** Vary element sizing and spacing. One card's icon is 40px, another 48px. Spacing between cards varies (24px, 32px, 24px) rather than uniform. This creates visual rhythm while maintaining order.

**Evidence:** OPINION (practitioner observation)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 5. "VibeCode Purple" (Specific Color)
**Tell:** Specific lavender-purple shade (approximately #7C3AED or similar) appearing across AI-generated interfaces with non-random frequency.

**Concrete example:**
Hero section background, accent buttons, and card borders all use the same specific shade of purple.

**Fix:** Use a diverse, intentional color palette. If purple is in your palette, use 2-3 purple shades (light, medium, dark), not just one. Include other colors (blues, teals, greys). Build a palette that reflects actual brand or design system, not a default algorithm.

**Evidence:** OPINION (practitioner color palette observation)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 6. Decorative Gradient Overlays
**Tell:** Decorative gradients applied throughout the design (often dark-to-transparent overlays, color gradients on text/buttons) for visual flourish without functional purpose.

**Concrete example:**
Hero image with dark-to-transparent gradient overlay. Buttons with subtle color gradients. Background with multi-color gradient.

**Fix:** Limit gradients to cases where they serve a purpose (readability overlay on images, color transition for brand hierarchy). Avoid "flourish gradients" that exist only for decoration. Use solid colors as default; add gradient only for intentional effect.

**Evidence:** OPINION (visual effect observation)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 7. Colored Glows and Shadows
**Tell:** Large colored glows and box-shadow effects (often neon blue, pink, or purple) on elements; excessive drop shadows and glow effects.

**Concrete example:**
Button with 20px blur radius shadow in bright blue. Card with colored glow effect around edges.

**Fix:** Use minimal, subtle shadows (2px blur, 0.1 opacity) for depth. Remove colored glows unless they serve interaction feedback (hover state). Shadows should be dark and soft, not colored and bright.

**Evidence:** OPINION (visual effect observation)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 8. Centered Hero Layout (Generic)
**Tell:** Generic sans-serif centered hero section with centered headline, centered subheadline, centered CTA button, centered image.

**Concrete example:**
"Welcome to Our Platform" centered. "Start your free trial" centered. Button centered.

**Fix:** Use varied layouts. Left-aligned hero with image on the right. Asymmetrical text placement. Headline offset from center. Vary the hero structure section-to-section instead of repeating the same centered layout throughout.

**Evidence:** OPINION (layout pattern)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 9. Badge Above Headline (Formulaic)
**Tell:** Badge or small label positioned directly above the main H1 heading; formulaic section structure.

**Concrete example:**
"NEW FEATURE" badge above "Introducing X" headline.

**Fix:** Use badges sparingly and only where they add information. Vary placement: badge beside headline, inline with text, or omitted entirely. Don't use badges as a structural formula.

**Evidence:** OPINION (structural pattern)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 10. Icon-Topped Feature Cards
**Tell:** Identical feature cards with icons positioned on top of each card, same size, same spacing, same alignment.

**Concrete example:**
Six identical cards: icon centered above title, title below icon, description text below title.

**Fix:** Vary card layout. Some cards: icon left, content right. Some cards: icon on background. Some cards: no icon. Vary icon sizes and spacing to create visual rhythm while maintaining consistency in brand feel.

**Evidence:** OPINION (component repetition pattern)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 11. Numbered Step Sequences
**Tell:** Process flows visualized as "1, 2, 3" numbered steps with identical styling and spacing.

**Concrete example:**
Three circles numbered 1, 2, 3 with connecting line. Each circle identical size, color, spacing.

**Fix:** Use varied visual representations. One step as a circle, one as a rectangle, one as a hexagon. Vary connecting elements (lines, arrows, connectors with labels). Vary step heights to show progression.

**Evidence:** OPINION (process diagram pattern)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 12. Stat Banners (Identical Tiles)
**Tell:** Rows displaying statistics or metrics in a grid format (often four columns); "47% faster," "200k users," "99.9% uptime." All tiles identical height, spacing, typography.

**Concrete example:**
Four equal-width stat tiles showing metric + value. All tiles identical height, spacing, typography.

**Fix:** Vary stat tile layout. Use 3 columns on one section, 2 on another. Vary tile heights based on content. Different typography hierarchy (one stat larger, one smaller). Introduce white space variation.

**Evidence:** OPINION (layout pattern)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 13. Emoji-Based Navigation
**Tell:** Navigation using emoji icons instead of text or illustration-based icons.

**Concrete example:**
Sidebar with emoji: home icon, search icon, settings icon (vs. proper UI icons).

**Fix:** Use professional icons (SVG, icon fonts) instead of emoji. If using emoji, use sparingly and only where appropriate (cultural context, brand identity). Default to custom icons or established icon libraries.

**Evidence:** OPINION (visual element choice)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 14. All-Caps Section Labels
**Tell:** Section headings and labels rendered in uppercase (all-caps) with no lowercase variation throughout the page.

**Concrete example:**
"FEATURES," "PRICING," "TESTIMONIALS" throughout the page.

**Fix:** Use sentence case or title case for headings. All-caps should be reserved for emphasis (a single headline) or UI labels (small, specific uses). Mix cases throughout.

**Evidence:** OPINION (typographic pattern)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 15. Inter Font as Default
**Tell:** Using Inter typeface (open-source, universally available) exclusively, particularly for centered hero headlines.

**Concrete example:**
All typography uses Inter. No serif fonts. No display typefaces.

**Fix:** Introduce a secondary typeface for hierarchy or emphasis. Use a serif for body copy (readability), a display font for headlines. Vary typography to create visual interest and distinction.

**Evidence:** OPINION (font choice pattern)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 16. Repetitive Font Combinations
**Tell:** Overusing the same typeface pairings across different projects (Space Grotesk + Instrument Serif, Geist + others).

**Concrete example:**
Heading: Space Grotesk. Body: Open Sans. (Same pairing across multiple sites.)

**Fix:** Develop unique font pairings per project. Combine unexpected faces: a modern sans with a classic serif, a condensed font with a loose one. Reflect brand personality in typography choices.

**Evidence:** OPINION (font pairing pattern)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 17. Serif Italic Accents
**Tell:** Adding italic serifs to highlight single words in otherwise sans-serif layouts.

**Concrete example:**
"Build something *italic-serif-here*" with one word in italic serif font.

**Fix:** If highlighting a word, use consistent methods: bold, color, scale, or weight. Don't switch font families mid-sentence unless it's a deliberate stylistic choice with purpose, and do it consistently.

**Evidence:** OPINION (typographic accent pattern)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 18. Permanent Dark Mode
**Tell:** Dark backgrounds with medium-grey body text and all-caps section headers; limited color variation.

**Concrete example:**
Black background (#000 or #111), medium grey body text (#888), white headlines, consistent throughout.

**Fix:** Introduce light and dark variants (or vice versa). Vary the color palette: not just black, white, and grey. Add accent colors deliberately. Use contrast to guide hierarchy, not just dark/light.

**Evidence:** OPINION (color scheme pattern)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 19. Glassmorphism UI
**Tell:** Frosted glass effect (backdrop blur, semi-transparent backgrounds) used heavily; CSS fingerprint of glassmorphism libraries (often shadcn/ui variants).

**Concrete example:**
Card with `backdrop-filter: blur(10px)` and `rgba(255,255,255,0.1)` background.

**Fix:** Use glassmorphism sparingly, only where it solves a layering or hierarchy problem. Default to solid backgrounds or subtle gradients. If using glassmorphism, ensure contrast and readability are maintained.

**Evidence:** OPINION (visual effect and CSS fingerprint)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 20. shadcn/ui Default Styling
**Tell:** Visual fingerprint of shadcn/ui component library defaults (rounded corners, specific spacing, specific color tokens) without customization.

**Concrete example:**
Standard shadcn button styling, card styling, input styling replicated exactly without customization.

**Fix:** Customize components to match your design system. Adjust rounded corners (some sharp, some soft). Vary padding and spacing from defaults. Override color tokens. Components should feel like yours, not pulled from a template.

**Evidence:** OPINION (library-specific default detection)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 21. Flawlessness as a Detection Signal
**Tell:** Perfect design with every element exactly where an algorithm would place it is increasingly identifiable as machine design; flawlessness itself is the tell.

**Concrete example:**
No single element is out of place. All spacing exact. All alignment perfect. All colors consistent. No happy accidents.

**Fix:** Introduce intentional imperfections. One image slightly offset. One element slightly misaligned. One color slightly different shade. One spacing wider. These breaks signal human judgment and craft.

**Evidence:** OPINION (meta-observation about perfection as artificial)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

### 22. Deliberate Human Asymmetry
**Tell:** Human designers intentionally introduce small asymmetries, slightly misaligned elements, imperfect choices reflecting taste and constraint.

**Concrete example:**
One hero image slightly offset. One column slightly narrower. One card height different. One color slightly different shade.

**Fix:** When designing, make intentional asymmetric choices. Don't aim for perfection; aim for "designed." Let one section break the grid. Let one color deviate from the palette. These breaks are signatures of human curation, not algorithmic placement.

**Evidence:** OPINION (design theory observation)

**Source:** https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it

---

## Quick Checklist

Before launching:
- [ ] Contrast ratio >= 4.5:1 for normal text (test with WCAG checker)
- [ ] No prominent colored left borders on cards
- [ ] Asymmetry present somewhere (one offset section, one misaligned element)
- [ ] Repeated elements vary (different icon sizes, different spacing, different colors)
- [ ] Color palette includes 3+ colors and 2+ shades per color
- [ ] Gradients serve a purpose (readability, brand hierarchy), not just decoration
- [ ] Shadows are subtle (2-4px blur, not colored)
- [ ] Layouts vary section-to-section (not all centered)
- [ ] Typography includes 2+ typefaces with distinct purposes
- [ ] Section headers vary in case and styling
- [ ] No formulaic badge-above-headline pattern on every section
- [ ] Components customized, not stock library styling
- [ ] "Designed" feeling present (intended imperfection, taste)
