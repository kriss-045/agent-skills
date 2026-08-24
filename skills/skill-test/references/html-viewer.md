# The no-label blind HTML viewer

How to build the viewer in Phase 4. The viewer is the load-bearing artifact: it is what lets the author judge without knowing which output is his skill. If a label leaks, the verdict is worthless, so the build rules below are not cosmetic.

## Table of contents

1. Build steps
2. Build rules (non-negotiable)
3. The template
4. The reveal record

---

## 1. Build steps

1. Make the run folder: `~/.claude/skill-test-runs/<skill-name>-<YYYY-MM-DD>/`.
2. For each body-eval case, collect the verbatim outputs from each applicable arm (A: new skill, B: no skill, C: prior version if present).
3. Shuffle the arm order independently per case, so column position carries no signal. Record the true mapping (which column was which arm) in a place the page does not display until reveal.
4. Render the outputs into the template below: one row (or section) per case, columns side by side, labelled only "Output 1 / Output 2 / Output 3".
5. Write `index.html` into the run folder and open it with `open <path>`.
6. Keep the reveal mapping in a separate `mapping.json` in the same folder, or embedded in the page but hidden behind the reveal control. Do not print the mapping into the conversation before the author records his picks.

## 2. Build rules (non-negotiable)

- **No arm labels anywhere visible.** No "Arm A", "with skill", "candidate", "prior version", "baseline". The only column labels are neutral ("Output 1", "Output 2", "Output 3"). Why: the author built the skill; any hint of which output is "his" biases the pick toward it, which is the exact bias the harness removes.
- **Shuffle per case, not once.** If Arm A is always column 1, the author learns the position after the first case. Shuffle independently per case so position is noise. Why: a fixed position is itself a leaked label.
- **Reveal is gated.** The mapping stays hidden until the author has recorded a pick for that case (or all cases). The page may hold the mapping, but it must not show it before the pick. Why: seeing the answer mid-judgement contaminates the remaining cases too.
- **Render output faithfully.** If outputs are HTML or markup, render them (in sandboxed iframes or rendered blocks) so the author judges the real thing. If they are prose or code, show them in readable, equally-styled panels so styling does not favour one column. Why: unequal presentation is a hidden label.

## 3. The template

A minimal, self-contained starting point. Adapt the panel rendering to the output type (rendered HTML in an iframe, prose in a styled block, code in a monospace block). Keep all panels visually identical so presentation never hints at the arm.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>skill-test — blind review</title>
<style>
  :root { color-scheme: light dark; }
  body { font: 15px/1.5 system-ui, sans-serif; margin: 0; padding: 24px; }
  h1 { font-size: 18px; margin: 0 0 4px; }
  .sub { opacity: .65; margin: 0 0 24px; }
  .case { border-top: 1px solid color-mix(in srgb, currentColor 15%, transparent); padding: 24px 0; }
  .case h2 { font-size: 15px; margin: 0 0 12px; }
  .cols { display: grid; gap: 16px; grid-template-columns: repeat(var(--n,3), 1fr); }
  .panel { border: 1px solid color-mix(in srgb, currentColor 18%, transparent); border-radius: 8px; padding: 14px; }
  .panel h3 { font-size: 13px; margin: 0 0 10px; opacity: .8; }
  .panel pre { white-space: pre-wrap; word-break: break-word; margin: 0; font: 13px/1.5 ui-monospace, monospace; }
  .panel iframe { width: 100%; height: 360px; border: 0; }
  .pick { margin-top: 10px; display: flex; gap: 8px; align-items: center; }
  .reveal { margin-top: 14px; }
  .reveal-map { display: none; opacity: .7; font-size: 13px; margin-top: 8px; }
  .reveal-map.shown { display: block; }
  button { font: inherit; padding: 6px 12px; border-radius: 6px; cursor: pointer; }
</style>
</head>
<body>
  <h1>skill-test — blind review: SKILL_NAME</h1>
  <p class="sub">Pick the better output per case before revealing. Column order is shuffled per case.</p>

  <!-- Repeat one .case block per test case. Set --n to the number of arms shown. -->
  <section class="case" data-case="1">
    <h2>Case 1: CASE_DESCRIPTION</h2>
    <div class="cols" style="--n:3">
      <div class="panel"><h3>Output 1</h3><pre>OUTPUT_1</pre></div>
      <div class="panel"><h3>Output 2</h3><pre>OUTPUT_2</pre></div>
      <div class="panel"><h3>Output 3</h3><pre>OUTPUT_3</pre></div>
    </div>
    <div class="pick">
      <span>My pick:</span>
      <label><input type="radio" name="pick1" value="1"> Output 1</label>
      <label><input type="radio" name="pick1" value="2"> Output 2</label>
      <label><input type="radio" name="pick1" value="3"> Output 3</label>
    </div>
    <div class="reveal">
      <button type="button" data-reveal="1">Reveal mapping (only after picking)</button>
      <!-- Fill the data-* with the true mapping for this case. Hidden until reveal. -->
      <p class="reveal-map" id="map1" data-1="ARM_FOR_OUTPUT_1" data-2="ARM_FOR_OUTPUT_2" data-3="ARM_FOR_OUTPUT_3"></p>
    </div>
  </section>

<script>
  document.querySelectorAll('button[data-reveal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var n = btn.getAttribute('data-reveal');
      var picked = document.querySelector('input[name="pick' + n + '"]:checked');
      if (!picked) { alert('Record your pick for this case before revealing.'); return; }
      var map = document.getElementById('map' + n);
      map.textContent = 'Output 1 = ' + map.dataset['1'] + '  |  Output 2 = ' + map.dataset['2'] + '  |  Output 3 = ' + map.dataset['3'];
      map.classList.add('shown');
      btn.disabled = true;
    });
  });
</script>
</body>
</html>
```

Notes on adapting the template:

- For a two-arm run (new skill versus no skill, no prior version), drop the third column and set `--n:2`.
- For rendered output (HTML / markup), replace the `<pre>` with a sandboxed `<iframe srcdoc="...">` so the author sees the rendered result, not the source. Use `sandbox` to keep arbitrary output from running with page privileges. Why: untrusted generated markup should not execute against the viewer.
- The reveal button refuses to reveal until a pick is recorded for that case, enforcing the gate from the page itself.

## 4. The reveal record

After the author records picks and reveals, capture the result for the run folder: per-case pick, which arm it was, and the overall verdict. This feeds Phase 5's gate decision and becomes the seed of the regression floor. Save it as `verdict.md` next to `index.html`.
