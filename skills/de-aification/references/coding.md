# De-Aification: Coding Tells

Detect and remove AI-generation markers from code across all programming languages.

---

## Structural Metrics (Measurable Tells)

### 1. Excessive Comment-to-Code Ratio
**Tell:** Comments constitute 30-35% of code. AI maintains systematic, repetitive documentation; humans write comments inconsistently (5-20% with high variance).

**Concrete example:**
```python
# Initialize the list
my_list = []
# Loop through numbers 1 to 10
for i in range(1, 11):
    # Add the number to the list
    my_list.append(i)
# Return the list
return my_list
```

**Fix:** Delete 50-70% of comments. Keep only comments explaining "why," not "what." If the code is self-explanatory (descriptive variable names, clear logic), remove the comment. Ratio target: 5-15%.

**Evidence:** EMPIRICAL (ANOVA analysis across C, C++, Java, Python shows highest statistical significance for model identification)

**Source:** https://arxiv.org/html/2502.17749v2

---

### 2. Perfect Indentation Uniformity
**Tell:** Nearly 100% adherence to consistent indentation (e.g., exactly 2 spaces per level throughout). Human code occasionally has 2 spaces, 4 spaces, or tabs due to copying from different files.

**Fix:** Introduce minor indentation inconsistencies. Edit sections from other files that may have different indentation. Allow natural variation. Aim for 90%+ consistency, not 100%.

**Evidence:** EMPIRICAL (measured as ratio of most-common indentation pattern)

**Source:** https://arxiv.org/html/2502.17749v2

---

### 3. Uniform Function Length
**Tell:** Functions remarkably consistent in length (average 15-20 lines, tight variance). Human code ranges 3-100+ lines depending on purpose.

**Fix:** Write some one-liner utility functions, some 5-line helpers, some 50-line complex logic. Let function length be driven by actual need, not by a formula.

**Evidence:** EMPIRICAL (measured as average lines per function)

**Source:** https://arxiv.org/html/2502.17749v2

---

### 4. Consistent Nesting Depth
**Tell:** Average nesting depth remains consistently shallow (max 3 levels across all functions). Human code uses varied nesting (1 level for simple logic, 5+ levels for error handling and complex conditions).

**Fix:** Some functions should have 1 nesting level, others 5+. Use nested conditions where they fit the problem, not for consistency.

**Evidence:** EMPIRICAL (measured as average nesting depth per function)

**Source:** https://arxiv.org/html/2502.17749v2

---

### 5. Consistent Function Name Length
**Tell:** Function names maintain consistent word length (average 2.3 words). Human code uses `get`, `getUserById`, `getUserIDFromDatabaseAndTransformToJSON` interchangeably (high variance).

**Fix:** Write some single-word function names (`process`, `run`, `filter`), some longer descriptive ones. Variance is natural.

**Evidence:** EMPIRICAL (measured as average function name length)

**Source:** https://arxiv.org/html/2502.17749v2

---

### 6. Consistent Variable Name Length
**Tell:** Variable names maintain consistent length (average 2.1 words): `userData`, `userId`, `userEmail`. Humans use `u`, `user`, `userInformation`, `x` interchangeably.

**Fix:** Use variable names of varying length based on scope and context. Loop counters can be `i` or `x`. Important module-level variables should be descriptive. Mix short and long.

**Evidence:** EMPIRICAL (measured as average variable name length)

**Source:** https://arxiv.org/html/2502.17749v2

---

### 7. Perfect Naming Convention Consistency
**Tell:** 95%+ adherence to one naming convention (camelCase or snake_case). AI maintains one pattern consistently when it occurs; humans switch between conventions naturally.

**Fix:** Introduce deliberate naming variation. Use both `userData` and `user_data` where appropriate. If the codebase has mixed conventions, use that naturally rather than forcing consistency.

**Evidence:** EMPIRICAL (10 quantitative metrics including 4 naming-consistency metrics)

**Source:** https://arxiv.org/html/2502.17749v2

---

## Stylistic Patterns (Opinion-Based but Consistent)

### 8. Over-Commenting (Redundant Explanations)
**Tell:** Tutorial-style comments explaining basic syntax and self-evident logic.

**Concrete example:**
```python
# Check if x is greater than 5
if x > 5:
    # Print the message
    print("x is large")
```

**Fix:** Delete comments on straightforward logic. Add comments only where the "why" is non-obvious. For complex algorithms or counterintuitive logic, explain the reasoning, not the mechanics.

**Evidence:** OPINION (practitioner observation from code review)

**Source:** https://medium.com/according-to-context/llms-have-revived-these-5-anti-patterns-in-software-engineering-e685159fc4d8

---

### 9. Excessive Print/Debug Statements
**Tell:** Debugging print or log statements left in code without removal, cluttering production output.

**Concrete example:**
```python
def process_data(data):
    print("Starting process_data")
    result = transform(data)
    print(f"Result is: {result}")
    return result
```

**Fix:** Remove all debug print statements. If logging is needed, use a proper logging framework (Python: logging module, JavaScript: winston, etc.) at appropriate levels, not console.log or print.

**Evidence:** OPINION (practitioner observation)

**Source:** https://medium.com/according-to-context/llms-have-revived-these-5-anti-patterns-in-software-engineering-e685159fc4d8

---

### 10. Single-Use Helper Functions
**Tell:** Functions created and called only once, adding unnecessary abstraction layers.

**Concrete example:**
```python
def format_user_name(name):
    return name.upper()

user = format_user_name("alice")  # Called once
```

**Fix:** Inline one-off helpers. Replace with `user = "alice".upper()`. Create a function only if it's called 2+ times or solves a genuinely complex problem.

**Evidence:** OPINION (practitioner observation)

**Source:** https://medium.com/according-to-context/llms-have-revived-these-5-anti-patterns-in-software-engineering-e685159fc4d8

---

### 11. Duplicate Code (No Consolidation)
**Tell:** Identical or nearly identical code blocks solving the same problem in multiple locations; failure to consolidate into reusable functions.

**Concrete example:**
```python
# In method A
total = sum([x for x in data if x > 0])

# In method B (same logic, not extracted)
total = sum([x for x in data if x > 0])
```

**Fix:** Extract to a helper function. `total = sum_positive(data)`. If you notice identical logic in two places, refactor immediately.

**Evidence:** OPINION (practitioner observation)

**Source:** https://medium.com/according-to-context/llms-have-revived-these-5-anti-patterns-in-software-engineering-e685159fc4d8

---

### 12. Insufficient Test Coverage
**Tell:** Generated code ships with no unit tests. Test cases only added when explicitly prompted.

**Fix:** Write tests from the start. At minimum: one test for the happy path, one for an edge case or error condition. Many AI models default to skipping tests; intentionally include them.

**Evidence:** OPINION (practitioner pattern from code review)

**Source:** https://medium.com/according-to-context/llms-have-revived-these-5-anti-patterns-in-software-engineering-e685159fc4d8

---

### 13. Generic Variable Names
**Tell:** Overly generic names (data, temp, result, temp_var_1) or random sequences when context is unclear.

**Concrete example:**
`temp_var_1`, `x`, `data_holder_42` vs. meaningful names reflecting domain: `userInputBuffer`, `responsePayload`.

**Fix:** Name every variable after what it holds. `temp` is never acceptable. `user_id`, `parsed_response`, `error_code` are better. When you're tempted to use `data`, ask yourself: "data of what?"

**Evidence:** OPINION (practitioner observation)

**Source:** https://www.clrn.org/how-can-you-tell-if-code-is-ai-generated/

---

### 14. Invented Abstractions (Unnecessary Layers)
**Tell:** Extra layers of indirection, wrapper functions, or classes that don't solve the immediate problem; rigid abstractions that don't fit the specific use case.

**Concrete example:**
```python
class DataProcessor:
    def process(self, data):
        return self._transform(data)
    def _transform(self, data):
        return self._filter(data)
    def _filter(self, data):
        return [x for x in data if x > 0]
```
Simpler: `[x for x in data if x > 0]`

**Fix:** Use the simplest structure that solves the problem. If a one-liner works, use it. If you need a function, write a function. Don't add a class wrapper unless it genuinely organizes state or behavior.

**Evidence:** OPINION (practitioner observation)

**Source:** https://medium.com/according-to-context/llms-have-revived-these-5-anti-patterns-in-software-engineering-e685159fc4d8

---

### 15. Variable Error Handling (Model-Dependent)
**Tell:** Error handling varies wildly by AI model and context. GPT-4o-Mini: 3.3% defensive checks. Gemini 2.5 Flash: 21.3%. Claude 3.5 Haiku: 23.3%.

**Fix:** Include error handling deliberately and proportionally. For critical functions (network calls, file I/O, parsing), add try-catch or input validation. For simple logic, skip unnecessary checks. Consistency within *your* codebase matters more than matching a reference model.

**Evidence:** EMPIRICAL (measured defensive coding practice frequency per model)

**Source:** https://www.augmentcode.com/guides/debugging-ai-generated-code-8-failure-patterns-and-fixes

---

### 16. LPcodedec Detection (Stylometric Signature)
**Tell:** LLM-paraphrased code can be detected via stylometric analysis even when logic is unchanged, achieving 87-93% F1 score.

**Fix:** This is automatically addressed by writing naturally (varying function length, naming, indentation, comments). If you're rewriting someone else's code, add your own style (variable names, function size, comment density).

**Evidence:** EMPIRICAL (F1 score and performance benchmark from LPcodedec detection study)

**Source:** https://arxiv.org/html/2502.17749v2

---

## Quick Checklist

Before submitting:
- [ ] Comment ratio < 20% (only explain "why," not "what")
- [ ] Delete debug print statements and console.log calls
- [ ] Indentation varies slightly (not perfectly uniform)
- [ ] Function lengths vary (some 1-5 lines, some 40+ lines)
- [ ] Nesting depth varies (some functions have 1 level, others 4+)
- [ ] Function and variable names vary in length
- [ ] No single-use helper functions
- [ ] Duplicate logic extracted to shared functions
- [ ] Test coverage present (at minimum, happy path + one edge case)
- [ ] No generic variable names (no `data`, `temp`, `x` except loop counters)
- [ ] No unnecessary wrapper classes or abstraction layers
- [ ] Error handling proportional to risk (not everywhere, not nowhere)
