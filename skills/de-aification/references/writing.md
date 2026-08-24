# De-Aification: Writing Tells

Detect and remove AI-generation markers from prose, articles, emails, essays, and web copy.

---

## Linguistic Metrics (Measurable Tells)

### 1. Low Perplexity (Predictable Vocabulary)
**Tell:** Uniform word predictability throughout. Text flows along the path the language model expected, with no surprising vocabulary or structural choices.

**Fix:** Insert unexpected word choices within natural context. Use domain-specific jargon, uncommon verbs, concrete nouns that feel justified by the topic. Add phrases that could only come from observation.

**Evidence:** EMPIRICAL | **Source:** https://www.tryleap.ai/learn/perplexity-vs-burstiness

---

### 2. Low Burstiness (Uniform Sentence Length)
**Tell:** Consistent sentence length throughout; no rhythmic variation between short punchy statements and longer flowing ones.

**Fix:** Deliberately alternate sentence length. Write one short sentence. Then a longer, complex one. Then another short one. Vary within each paragraph.

**Evidence:** EMPIRICAL | **Source:** https://www.tryleap.ai/learn/perplexity-vs-burstiness

---

### 3. Low Lexical Diversity (Repetitive Vocabulary)
**Tell:** Type-Token Ratio (unique words / total words) clusters around 0.45-0.55. Human writing averages 0.60+; a 500-word AI passage uses 225 unique words while humans use 300+.

**Fix:** Replace repeated words with synonyms or restructure to use different vocabulary. Expand your word palette deliberately. If you've used "significant" twice, use "substantial," "notable," "considerable" the next times.

**Evidence:** EMPIRICAL | **Source:** https://arxiv.org/html/2509.18880v1

---

### 4. Low Hapax Legomenon Rate (Few One-Off Words)
**Tell:** Fewer words appearing only once compared to human text. Humans use more single-occurrence words (unique observations, specific details). AI reuses vocabulary more evenly.

**Concrete example:**
Human: "The dilapidated storefront, once teeming with commerce, now stood as a monument to obsolescence." (dilapidated, teeming, obsolescence each appear once)
AI: Reuses common words repeatedly

**Fix:** Use specific, unusual words when appropriate; don't fear one-off vocabulary. If a word describes something perfectly once, use it once and move on. Embrace specificity over repetition.

**Evidence:** EMPIRICAL | **Source:** https://arxiv.org/pdf/2606.04177

---

### 5. Distinctive POS Bigram Patterns
**Tell:** Function word sequences (DETERMINER-NOUN, ADJECTIVE-NOUN) appear with non-random, machine-predictable frequency. Statistical signature betrays LLM origin.

**Fix:** This is difficult to fix manually. Instead: read work aloud and listen for naturalness. Rephrase sentences that sound formulaic. Break up patterns by moving words or restructuring clauses.

**Evidence:** EMPIRICAL | **Source:** https://arxiv.org/pdf/2606.04177

---

### 6. High N-gram Repetition
**Tell:** Multi-word sequences (3+ words) repeating 3+ times across sections. Phrases like "As mentioned earlier," "It is important to note," "In conclusion" appear multiple times. AI shows high n-gram repetition; humans vary phrasing.

**Fix:** Delete repetitive multi-word phrases. Create a list of phrases you've used > once; replace alternates with different constructions. "As mentioned earlier" → "Earlier, I noted..." → "Recall that..." etc.

**Evidence:** EMPIRICAL | **Source:** https://searchatlas.com/blog/ai-patterns-in-writing/

---

## Stylistic Patterns (Opinion-Based but Consistent)

### 7. Formal Discourse Markers (Overuse)
**Tell:** Frequency of formal connectors (furthermore, moreover, consequently, additionally) exceeds 20% of sentences, appearing at paragraph boundaries with formulaic consistency.

**Concrete example:**
"Furthermore, this approach has merit. Moreover, the evidence supports this. Additionally, research confirms this. Consequently, we proceed forward."

**Fix:** Delete 50% of formal connectors. Replace with natural transitions: short sentences connecting ideas, or no connector at all. Use connectors only when genuinely needed.

**Evidence:** OPINION | **Source:** https://searchatlas.com/blog/ai-patterns-in-writing/

---

### 8. Excessive Hedging Language
**Tell:** Elevated frequency of uncertainty markers (may, might, could, seem, suggest, appear) softening claims throughout unrelated sections, creating confidence-eroding phrasing.

**Concrete example:**
"This may possibly indicate that research suggests we could consider that it might appear that..."

**Fix:** Delete hedging language except where genuine uncertainty exists. "This indicates" instead of "This may suggest." Assert. If you're unsure, restructure: "We don't yet know whether..." rather than "It might seem that..."

**Evidence:** OPINION | **Source:** https://searchatlas.com/blog/ai-patterns-in-writing/

---

### 9. Structural Predictability (Symmetrical Sections)
**Tell:** Symmetrical paragraph lengths, formulaic organization. Sections mirror each other; conclusions restate introductions with predictable structure. Five 4-paragraph sections each concluding with "In summary, X is important."

**Fix:** Vary section length deliberately. Some sections 1 paragraph, others 5. Vary conclusion style. Kill the formula.

**Evidence:** OPINION | **Source:** https://searchatlas.com/blog/ai-patterns-in-writing/

---

### 10. Uniform Paragraph Structure (Predictable SVO)
**Tell:** Every sentence follows subject-verb-object construction across consecutive sentences; no abrupt structural shifts.

**Concrete example:**
"The study examined X. Researchers found Y. This indicates Z. Evidence shows A."

**Fix:** Vary sentence structure. Invert: "Found by researchers: Y." Use fragments: "Evidence? A." Lead with object or modifier: "Throughout this analysis, X emerges as central."

**Evidence:** OPINION | **Source:** https://searchatlas.com/blog/ai-patterns-in-writing/

---

### 11. Absence of Specific Detail
**Tell:** Generalized statements lacking timestamps, named sources, personal observation, sensory description, or firsthand reference. "Studies show benefits" without researchers, dates, citations. No "I noticed," "On March 3rd," "The smell of..."

**Fix:** Add verifiable specifics everywhere. Name researchers, include dates and URLs, cite DOIs. Include personal observation: "When I tested this in April, the response time dropped 40%." Use sensory language: colors, textures, sounds, smells when relevant.

**Evidence:** OPINION | **Source:** https://searchatlas.com/blog/ai-patterns-in-writing/

---

### 12. Fabricated or Vague Sourcing
**Tell:** References formatted correctly but lacking verifiable existence when checked (titles, authors, DOIs, URLs). "Smith et al. (2023) in their landmark study..." — format looks academic but the authors and publication don't exist.

**Fix:** Every citation must be verifiable. If you cite something, confirm it exists before submitting. Use only real sources. If you're unsure, rewrite without the citation.

**Evidence:** OPINION | **Source:** https://searchatlas.com/blog/ai-patterns-in-writing/

---

### 13. Token Surprisal Variance (High Predictability)
**Tell:** Low variance and entropy in token-level surprisal. Human text exhibits significantly higher variance and extreme fluctuations; AI text is smooth and predictable.

**Fix:** Read aloud. Where you hear smoothness, introduce a rougher word or structure. Create moments of surprise: unusual word choices, short sentences interrupting longer ones, tonal shifts.

**Evidence:** EMPIRICAL | **Source:** https://arxiv.org/html/2509.18880v1

---

## Quick Checklist

Before submitting:
- [ ] Sentence lengths vary (some 5 words, some 25+)
- [ ] Vocabulary includes rare words and synonyms (not repeated "important")
- [ ] Specific details: dates, names, URLs, citations verified
- [ ] Formal connectors used sparingly (< 10% of sentences)
- [ ] Hedging language removed where confidence is warranted
- [ ] Paragraph lengths vary
- [ ] Section conclusions don't restate structure
- [ ] At least one sentence breaks SVO pattern
- [ ] Read aloud; listen for rhythm and surprise
