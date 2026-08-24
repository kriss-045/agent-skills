# De-Aification: AI Detection Tools and Methodology

Understanding how AI-detection tools work helps you understand what markers are actually detectable.

---

## Overview

Most AI-detection tools use one of three approaches:
1. **Perplexity/burstiness metrics** (fast, unreliable for mixed text)
2. **Stylometric features** (linguistic fingerprinting, more reliable)
3. **Transformer-based classifiers** (neural networks trained on AI vs. human text)

No single detector is perfect. False positive rates vary, and effectiveness degrades when text is edited or paraphrased.

---

## Commercial Detectors and Their Accuracy

### GPTZero
**Approach:** Sentence-by-sentence classifier, 7-component detection.

**Accuracy:** 96.5% on mixed documents. False positive rate: 0.24% (one in 400 human documents incorrectly flagged). False negative rate: ~10%.

**Reliability:** High for clear AI text, lower for heavily edited or paraphrased content.

**Source:** https://gptzero.me/news/ai-accuracy-benchmarking/

---

### Originality AI
**Accuracy:** 99% on pure AI content, 99% on pure human content.

**False positive rate (Lite model):** 0.5%. (Turbo: 1.5%). In STEM essays, 2% false positive rate (1 in 50 essays incorrectly flagged).

**Failure conditions:** Short text (< 100 words) reduces accuracy. Formulaic content (5-paragraph essays, statistics-heavy articles, scientific journals) more likely flagged as AI. Light editing (grammar polish) increases false positives.

**Reliability:** Good for long-form text, less reliable for short social media posts or heavily edited work.

**Source:** https://originality.ai/blog/ai-content-detector-false-positives

---

## Detection Methodology: How Detectors Work

### Stylometric Feature Analysis (Most Reliable)

Detectors analyze these linguistic markers:

**Lexical Diversity Features (6):**
- Type-Token Ratio (unique words / total words)
- Hapax legomena rate (words appearing once)
- Word count, character count per word

**Syntactic Complexity (12):**
- Average sentence length, sentence length variance
- Punctuation frequency
- Complex verbs, adjectives, contractions

**Sentiment (4):**
- Polarity (positive/negative)
- Subjectivity
- Emotional word frequency

**Readability (2):**
- Flesch Reading Ease
- Gunning Fog Index

**Named Entities (4):**
- First-person pronouns (I, me, we)
- Direct address (you, your)
- Person/date/entity mentions

**Uniqueness (3):**
- Bigram uniqueness (2-word sequences)
- Trigram uniqueness (3-word sequences)
- Syntax variety

**Example:** A detector scores your text on all 31 features, then a classifier determines likelihood of AI origin based on the feature profile.

**Evidence:** EMPIRICAL (StyloAI methodology, published feature extraction framework)

**Source:** https://arxiv.org/html/2405.10129v1

---

### Token-Level Surprisal Analysis (DivEye)

**Approach:** Measure how "surprised" a language model is by each word. AI text shows low surprisal variance (predictable); human text shows high variance (more surprising word choices).

**Features:**
- Mean surprisal (average predictability)
- Variance of surprisal (fluctuation in predictability)
- Skewness and kurtosis (shape of surprisal distribution)
- First and second-order dynamics (changes in surprisal over time)

**Effectiveness:** Captures the "rhythm" of text. Human writing has unexpected word choices; AI text flows along the most predictable path.

**Evidence:** EMPIRICAL (DivEye detector design, arxiv publication)

**Source:** https://arxiv.org/html/2509.18880v1

---

## Detector Limitations and Failure Modes

### Perplexity and Burstiness Alone (Unreliable)
**Problem:** Perplexity fails on text that appears in training data (Declaration of Independence, Wikipedia articles) because the model optimized on those texts, making them indistinguishable from AI.

**Problem:** Burstiness unfairly penalizes non-native English speakers, who naturally produce lower burstiness and get flagged as AI.

**Solution:** Detectors now combine perplexity with other methods (stylometric features, transformer classifiers). Use perplexity as one signal, not the only signal.

**Evidence:** EMPIRICAL (documented failure cases)

**Source:** https://www.pangram.com/blog/why-perplexity-and-burstiness-fail-to-detect-ai

---

### False Positive Conditions

**Short text (< 100 words):** Reduces accuracy significantly. Detectors need sufficient sample size to extract reliable stylometric features.

**Formulaic content:** 5-paragraph essays, heavily structured articles, scientific abstracts (with statistics and technical language) trigger false positives. These resemble AI patterns (uniform structure, formal language) even when human-written.

**Edited/polished text:** Light grammar editing (using Grammarly or similar) increases false positive likelihood. The editing creates patterns similar to AI smoothing.

**Evidence:** EMPIRICAL (documented conditions from Originality AI and other vendors)

**Source:** https://originality.ai/blog/ai-content-detector-false-positives

---

### Human Accuracy Baseline

**Human detection accuracy without tools: 55%.** Essentially a coin flip. Humans cannot reliably detect AI text by reading alone.

This establishes why tools are needed, but also why tools must be used carefully. Tools are not perfect either, but they're better than human guessing.

**Evidence:** EMPIRICAL (University of Washington study)

**Source:** https://originality.ai/blog/can-humans-detect-chatgpt

---

## Code Detection Benchmark

### AICD Bench: Code Detection Across 77 Models

**Scale:** 2 million code examples, 77 models across 11 families, 9 programming languages.

**Tasks:**
1. Binary classification (AI vs. human) under distribution shift
2. Model family attribution (which LLM created this?)
3. Fine-grained classification (human, AI, hybrid, adversarial)

**Findings:**
- In-domain accuracy: ~95% (detecting AI code on the same dataset it was trained on)
- Out-of-distribution accuracy: ~67% (detecting AI code from a different language, domain, or LLM)

**Conclusion:** Code detection works well in controlled settings but fails on novel patterns. This mirrors the AI-detection field broadly.

**Evidence:** EMPIRICAL (benchmark evaluation on 2 million examples)

**Source:** https://arxiv.org/html/2602.02079v1

---

## Detection Performance: Counter Turing Test Results

**Binary classification (AI vs. human):** Near-perfect, F1 score 1.0 (some participants achieved 100% accuracy).

**Model attribution (which LLM?):** Harder. Best performer achieved F1 0.9531 (95.31%). Distinguishing Claude from GPT-4 from Llama is much harder than detecting "AI or human."

**Ensemble methods dominate:** Fine-tuned DeBERTa models (a transformer-based architecture) achieved the best results across benchmarks.

**Evidence:** EMPIRICAL (benchmark competition results)

**Source:** https://arxiv.org/html/2605.20761

---

## Advanced Detector: Pangram Approach

**Methodology:** Transformer-based classifier trained on diverse domains (10 domains, 8 LLM models, human text).

**Innovation:** Hard negative mining with synthetic mirrors. Creates adversarial examples to reduce false positives on borderline cases.

**Performance:** 38x lower error rates than commercial tools on their benchmarks.

**Limitations:** Requires careful dataset curation and is not widely available as a product.

**Evidence:** EMPIRICAL (published benchmark, 38x improvement metric)

**Source:** https://arxiv.org/abs/2402.14873

---

## Myth: Distinctive ChatGPT Words

**Claim:** ChatGPT overuses words like "delve," "embark," "tapestry."

**Reality:** Analysis of 10M+ words of ChatGPT output shows top words are generic: "which, such, more, create, their, example." Same as human text. "Delve" appears 146 times (not the thousands implied by viral claims).

**Lesson:** AI models don't have forbidden words; they have stylistic fingerprints (perplexity, burstiness, lexical diversity). Generic superlatives are a sign of marketing copy, not AI specifically.

**Evidence:** EMPIRICAL (corpus analysis contradicting viral myths)

**Source:** https://originality.ai/blog/can-humans-detect-chatgpt

---

## When Not to Trust Detectors

1. **Heavily edited text:** If you've rewritten, paraphrased, or hand-edited AI output, detectors struggle.
2. **Short text:** Under 100 words, accuracy drops significantly.
3. **Formulaic human text:** Professional writing, academic papers, technical documentation may resemble AI patterns even when human-written.
4. **Mixed content:** AI-edited human text or human-edited AI text confuses detectors.
5. **Non-English or ESL:** Detectors trained on English may over-flag non-native English writers.

---

## Detector As One Signal, Not The Signal

**Good practice:** Use a detector as one input, not the final arbiter. If a detector flags text as 70% AI, investigate manually:
- Is the structure formulaic?
- Are there specific details and examples?
- Is the voice consistent and distinctive?
- Do the citations check out?

**Manual inspection + detector confidence = stronger conclusion than detector alone.**

---

## Tools Mentioned (By Availability)

- **GPTZero** (gptzero.me): Widely available, web-based, free tier
- **Originality AI** (originality.ai): Subscription, good accuracy on long-form
- **Copyleaks** (copyleaks.com): Enterprise option, API available
- **Pangram** (transformer-based, limited availability): Referenced in research, not widely available as product
- **Local stylometric analysis**: Can write simple Python scripts to compute TTR, burstiness, hapax rate

---

## Conclusion

AI detection is improving but not perfect. The best approach to de-aification is:
1. Know the tells (perplexity, burstiness, lexical diversity, structural patterns)
2. Read manually for voice, specificity, and authenticity
3. Use a detector as a checkpoint, not a verdict
4. Focus on writing naturally, not on "fooling" detectors

The rules in the other reference files (writing, coding, visual, marketing) are the detectable tells. Follow them, and your work will be distinguishable from AI output.
