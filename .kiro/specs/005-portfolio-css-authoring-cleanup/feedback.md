# Spec Feedback: Portfolio CSS Authoring Compliance Audit & Cleanup

**Spec**: 005-portfolio-css-authoring-cleanup
**Created**: 2026-06-01

---

## Design Outline Feedback

### Context for Reviewers
- This is a pre-Astro-migration cleanup spec. Findings here inform Spec 006 approach.
- Web-Authoring-Standards.md is the governing document for all CSS violations.
- Product components (NavAboutPopover, NavHeaderContent) are product-level, not Stemma-governed.

---

#### [SPARKY R1]

### 1. CSS Violations Table — Missed Items

Leonardo's table is a good start but incomplete. Additional violations found:

**Physical properties missed:**

| Location | Violation | Fix |
|----------|-----------|-----|
| `.skip-to-content` (L38) | `top: -100%`, `left: var(--space-100)` | `inset-block-start: -100%`, `inset-inline-start: var(--space-100)` |
| `.skip-to-content:focus` (L44) | `top: var(--space-100)` | `inset-block-start: var(--space-100)` |
| `.hero__chord` (L93) | `bottom: 0`, `left: 0` | `inset-block-end: 0`, `inset-inline-start: 0` |
| `.ecosystem__modal-close` (L175) | `top: var(--space-200)`, `right: var(--space-200)` | `inset-block-start: var(--space-200)`, `inset-inline-end: var(--space-200)` |
| `.why-build__easter` (L119) | `top: 80px`, `right: 155px` | `inset-block-start: 80px`, `inset-inline-end: 155px` |
| `.ecosystem__modal-stat-label` (L199) | `margin-top: var(--space-025)` | `margin-block-start: var(--space-025)` |
| `.who-built__name` (L268) | `margin-top: var(--space-075)` | `margin-block-start: var(--space-075)` |
| `.who-built__title` (L273) | `margin-top: var(--space-050)` | `margin-block-start: var(--space-050)` |
| `.who-built__employers-label` (L278) | `margin-top: var(--space-300)` | `margin-block-start: var(--space-300)` |
| `.who-built__badges` (L283) | `margin-top: var(--space-150)` | `margin-block-start: var(--space-150)` |
| `.who-built__timeline` (L291) | `margin-top: var(--space-600)` | `margin-block-start: var(--space-600)` |
| `.how-built__body p + p` (L237) | `margin-top: var(--space-200)` | `margin-block-start: var(--space-200)` |
| `.how-built__body` (L234) | `margin-top: var(--space-150)` | `margin-block-start: var(--space-150)` |
| `.cta__featured p + p` (L345) | `margin-top: var(--space-125)` | `margin-block-start: var(--space-125)` |
| `.cta__actions` (L349) | `margin-top: var(--space-400)` | `margin-block-start: var(--space-400)` |
| `#career-tooltip` (L296) | `max-width: 270px` | `max-inline-size: 270px` (or product token) |
| `.career-tooltip__title` (L305) | `margin-bottom: var(--space-050)` | `margin-block-end: var(--space-050)` |
| `.career-tooltip__period` (L306) | `margin-bottom: var(--space-125)` | `margin-block-end: var(--space-125)` |
| `.career-tooltip__row` (L307) | `margin-bottom: var(--space-050)` | `margin-block-end: var(--space-050)` |
| `.career-tooltip__desc` (L308) | `margin-top: var(--space-100)`, `padding-top: var(--space-100)`, `border-top` | `margin-block-start`, `padding-block-start`, `border-block-start` |
| `.ecosystem__system-header` (L163) | `margin-bottom: var(--space-150)` | `margin-block-end: var(--space-150)` |
| `.ecosystem__system-highlights li` (L172) | `margin-bottom: var(--space-100)` | `margin-block-end: var(--space-100)` |
| `.ecosystem__modal-header` (L189) | `margin-bottom: var(--space-200)` | `margin-block-end: var(--space-200)` |
| `.ecosystem__modal-desc` (L195) | `margin-bottom: var(--space-250)` | `margin-block-end: var(--space-250)` |
| `.section-heading` (L57) | `margin-bottom: var(--space-700)` | `margin-block-end: var(--space-700)` |
| `.why-build__card h3` (L133) | `padding-bottom`, `margin-bottom` | `padding-block-end`, `margin-block-end` |
| `.thanks__title` (L325) | `padding-bottom: var(--space-075)`, `margin-bottom: var(--space-300)` | `padding-block-end`, `margin-block-end` |
| `.ecosystem__modal-stats` (L201) | `padding-top`, `border-top` | `padding-block-start`, `border-block-start` |

**Hard-coded values missed:**

| Location | Value | Issue |
|----------|-------|-------|
| `.viz-branch` (L210) | `gap: 4px 12px`, `margin-top: 8px` | Hard-coded px values — need product tokens or system token refs |
| `.ecosystem__system:hover` (L158) | `box-shadow: 0 6px 32px rgba(0, 0, 0, 0.35)` | Hard-coded shadow — should be product token or system shadow token |
| `#chord-tip` (L360) | `border: 2px solid`, `border-radius: 2px` | Hard-coded border-radius (should be token), border-width (should be token) |
| `.footer__info` (L377) | `color: rgba(255, 255, 255, 0.6)` | Hard-coded color — should use token (e.g., `--color-contrast-on-dark` + opacity token) |
| `.ecosystem__modal-backdrop` (L176) | `background: rgba(10, 10, 15, 0.6)` | Hard-coded backdrop color — product token candidate |
| `.how-built__easter` (L225) | `box-shadow` with trailing comma (syntax error!) and hard-coded values | Fix syntax error + tokenize |
| Neon animation keyframes (L365+) | `rgba(51, 255, 153, 0.8)` etc. | Hard-coded colors — these are decorative animation values. Acceptable exception? Need documented rationale per Web-Authoring-Standards. |
| `.viz-*` color classes (L207-211) | `color: #80F6FF`, `#33FF99`, `#F9F002`, `#ff2d8f` | Hard-coded hex colors for code visualization. These are content-specific — likely acceptable as decorative, but should be documented. |

**Focus pattern violations:**

| Location | Violation |
|----------|-----------|
| `.skip-to-content:focus` (L44) | Uses bare `:focus` — should be `:focus-visible` |

**Missing `forced-colors` handling:**

The entire `portfolio.css` has zero `@media (forced-colors: active)` declarations. Per Web-Authoring-Standards Hard Rule 6, all interactive elements need this. Affected elements:
- `.ecosystem__system` (role="button")
- `.why-build__card` (hover interactive)
- `.skip-to-content` link
- `.nav-link` elements (in NavHeaderContent)
- `#chord-tip` and `#career-tooltip` (informational, lower priority)

**Critical CSS in `<head>` violations (index.html):**

| Location | Violation |
|----------|-----------|
| `<style>` block, `.nav__inner` | `max-width: var(--product-layout-content-max-width)` | Should be `max-inline-size` |
| `<style>` block, `#hero` | `max-width: var(--product-layout-content-max-width)` | Should be `max-inline-size` |
| `<style>` block, `.hero__visual` | `align-items: flex-start; justify-content: flex-end` | These are fine (not directional in the physical sense) |

---

### 2. HTML Audit Findings

**Major concerns in `src/pages/index.html`:**

1. **Heading hierarchy is correct** — h1 → h2 → h3 → h4 progression is clean. No skipped levels. ✅

2. **Landmark structure is good** — `<main>`, `<nav>` (via component), `<footer>` all present. Sections use `<section>` with headings. ✅

3. **Missing `aria-labelledby` on sections** — Sections have `id` attributes and headings, but no explicit `aria-labelledby`. This is acceptable since headings are direct children, but worth noting for screen reader clarity on complex sections like `#who-built` which contains subsections.

4. **`<footer>` logo image** (line ~188): `<img src="..." alt="DesignerPunk" style="filter: invert(1);">` — inline style is a minor concern but acceptable for a one-off filter. The `alt` text is appropriate.

5. **Double slash in favicon path** (line 11): `href="/src//assets/images/image-dp-favicon.svg"` — double slash, likely a typo.

6. **Ecosystem cards use `role="button"` with `tabindex="0"`** — This is correct for div-as-button pattern, but the outline should note these need `forced-colors` treatment AND keyboard activation is handled in JS (confirmed in ecosystem.ts). ✅ for semantics.

7. **`#career-tooltip` and `#chord-tip` are outside `<main>`** — `#chord-tip` is after `</footer>`, which is semantically fine (it's a positioned tooltip). `#career-tooltip` is inside `#who-built` section, which is correct.

8. **Stats section lacks accessible labeling** — The stats values use `data-count` attributes but the section has no `aria-label` or description explaining what these numbers represent collectively. Minor concern.

9. **`<object>` SVG elements** — All decorative ones have `aria-hidden="true"`. ✅

10. **Script loading** — Both `type="module"` and `defer` are used together. `defer` is redundant on module scripts (modules are deferred by default). Not a bug, but unnecessary.

---

### 3. TypeScript Audit Findings

**Patterns worth fixing:**

1. **`ecosystem.ts` — Non-null assertions everywhere** (`modal!`, `backdrop!`, `modalDesc!`). The outer `if (backdrop && modal)` guard is good, but inner elements like `modalDesc`, `modalHighlights`, `modalStats`, `modalViz` are asserted without null checks. If any of these DOM elements are missing, it'll throw. **Fix**: Add null guards or early-return pattern.

2. **`ecosystem.ts` — innerHTML for SVG connector updates** (line ~140+): `svg!.innerHTML += ...` in a loop is a performance concern — each `+=` triggers a full reparse. Should build string then assign once. **Fix**: Build SVG content string, assign once.

3. **`career.ts` — Variable shadowing**: `easeOut` is defined in both `career.ts` and `stats.ts`. Since these are separate modules this isn't a runtime issue, but it signals these could share a utility. **Note for Spec 006**: Extract shared utilities.

4. **`chord.ts` — Variable name collision**: `const canvas = document.getElementById('chord')` — same variable name as `career.ts`'s `const canvas`. Again, separate modules so no runtime issue, but both scripts query the DOM at module level. **Note for Spec 006**: Astro islands will naturally scope this.

5. **`stats.ts` — Wrong class selector**: Line queries `.stats-value` but the HTML uses class `stats__value`. This means the count-up animation **never fires**. This is a bug. **Fix**: Change selector to `.stats__value`.

6. **`agents.ts` — No cleanup on disconnect**: Portrait hover listeners are added but never removed. For a single-page site this is fine, but for Astro with client:visible islands, this would leak. **Note for Spec 006**.

7. **`chord.ts` — resize listener never removed**: `window.addEventListener('resize', resize)` with no cleanup. Same as above — fine for SPA, problematic for Astro islands. **Note for Spec 006**.

8. **`ecosystem.ts` — resize listener never removed**: Same pattern.

**Patterns that are fine:**

1. **IntersectionObserver lifecycle** in `chord.ts` and `career.ts` — properly starts/stops animation frames. Good pattern. ✅
2. **`reveal.ts`** — Clean, minimal, one-shot observer with proper unobserve. ✅
3. **`scroll-nav.ts`** — Clean observer pattern with DOMContentLoaded guard. ✅
4. **`ecosystem.ts` — Focus trap via `inert`** — Modern, correct approach. ✅
5. **`ecosystem.ts` — Escape key handling** — Proper keyboard dismiss. ✅
6. **Reduced motion checks** — Present in `chord.ts`, `career.ts`, `ecosystem.ts`. ✅
7. **`components.ts`** — Clean import barrel. ✅

---

### 4. Product Components — Scope Assessment

**NavAboutPopover**: Shadow DOM CSS is already well-authored — uses logical properties (`inset-block-start`, `inset-inline-end`, `padding-inline`, `padding-block`), tokens for all values, `:focus-visible` pattern, and `prefers-reduced-motion` handling. **Missing**: `forced-colors` media query for the trigger button and panel items. This is a small addition and should be in scope.

**NavHeaderContent**: Uses light-DOM `<style>` injection (not Shadow DOM). CSS is mostly compliant — uses `padding-inline-start`, logical properties. **Missing**: No `forced-colors` handling for `.nav-link` elements. Also missing `:focus-visible` styles for links. Should be in scope but is a small fix.

**Recommendation**: Yes, include both in scope. The work is minimal — primarily adding `forced-colors` media queries. Estimate: 15-20 minutes combined.

---

### 5. Astro Readiness — Script Organization

**Current state**: 8 separate script files loaded via `<script>` tags in `<head>`. Each queries the DOM at module top-level and self-initializes.

**What would make Spec 006 easier:**

1. **Export initialization functions** — Instead of auto-executing at module level, each script should export an `init()` function. This lets Astro islands call them at the right lifecycle moment. Currently `reveal.ts`, `scroll-nav.ts`, and `stats.ts` use `DOMContentLoaded` listeners (good), but `chord.ts`, `career.ts`, `ecosystem.ts`, and `agents.ts` execute immediately at module parse time.

2. **Return cleanup functions** — For Astro `client:visible` islands that may mount/unmount, each script should return a cleanup function that removes event listeners and cancels animation frames. Pattern:
   ```ts
   export function init(): () => void {
     // setup...
     return () => { /* cleanup */ };
   }
   ```

3. **Eliminate `page.ts`** — It duplicates the NavHeaderContent import already in `components.ts`. Dead code.

4. **Group by island boundary** — In Astro, each `<section>` could be its own island. Scripts should map 1:1 to sections: `hero-chord.ts`, `stats.ts`, `career-chart.ts`, `ecosystem.ts`, `agents.ts`. The current organization is already close to this.

5. **Extract shared utilities** — `easeOut`, `prefersReducedMotion()`, noise pattern generation could live in a `utils/` module.

**Recommendation for this spec**: Don't restructure scripts now — that's Spec 006's job. But DO fix the `stats.ts` selector bug and document the cleanup/export patterns in the lessons-learned deliverable.

---

### 6. Scope Feasibility

**Assessment: This is feasible as a single spec, but it's on the larger side.**

Breakdown estimate:
- CSS logical property sweep: ~40 violations × 1 min each = ~40 min
- Hard-coded value audit + product token creation: ~60 min (need to create several product tokens)
- Focus pattern fix (skip-to-content): 5 min
- `forced-colors` additions: ~30 min (5-6 interactive element groups)
- Critical CSS in `<head>` fixes: 10 min
- HTML minor fixes (double-slash path, redundant defer): 5 min
- TypeScript bug fix (stats selector): 5 min
- Product component `forced-colors` additions: 20 min
- Lessons learned document: 30 min
- Verification (visual regression check): 20 min

**Total estimate: ~3.5-4 hours of implementation work.**

This is reasonable for a single spec. The work is mechanical and low-risk (no behavioral changes, just property swaps and additions). The `forced-colors` work is the only part that requires design judgment (choosing appropriate system color keywords).

**Risk**: The product token creation could expand scope if we discover many values that need tokenization. I'd suggest a pragmatic approach: tokenize values that are clearly reusable (tooltip max-width, backdrop color), but document decorative one-offs (neon animation colors, viz syntax colors) as acceptable exceptions with rationale comments in the CSS.

---

### 7. Disagreements / Concerns

1. **Success criterion "Zero hard-coded tokenizable values without product token or documented exception"** — I agree with this in principle, but the neon animation keyframe colors (`rgba(51, 255, 153, 0.8)` etc.) and the code visualization colors (`#80F6FF`, `#33FF99`, etc.) are decorative/content-specific. Creating product tokens for these would be over-engineering. I'd prefer the success criterion to explicitly allow documented exceptions for: (a) decorative animation values, (b) content-specific syntax highlighting colors. A CSS comment explaining the exception is sufficient.

2. **"All interactive elements have `forced-colors` handling"** — The `.why-build__card` hover effect is decorative enhancement, not functional interaction. It doesn't have `role="button"` or keyboard activation. I'd argue it doesn't need `forced-colors` treatment. The ecosystem cards DO need it (they have `role="button"` and open modals).

3. **The `stats.ts` bug** — The selector mismatch (`.stats-value` vs `.stats__value`) means the count-up animation has been broken. This is a functional bug, not just a cleanup item. It should be called out explicitly in the outline as a known bug fix, not discovered during implementation.

4. **`page.ts` is dead code** — It imports `NavHeaderContent.web` which is already imported in `components.ts`. This file serves no purpose and should be deleted. The outline doesn't mention dead code removal — suggest adding it.

5. **The `.how-built__easter` trailing comma in box-shadow** (line ~225 of portfolio.css) — This is a CSS syntax error that may cause the entire declaration to be ignored in some browsers. Should be flagged as a bug fix, not just a compliance item.

6. **[@LEONARDO]** The outline says "site renders identically (no visual regressions)" as success criteria. Adding `forced-colors` handling and fixing the stats bug will produce *visible* changes (in forced-colors mode and in the stats animation). Suggest rewording to: "No unintended visual regressions in standard display modes. Forced-colors mode gains proper visibility. Stats animation functions correctly."

---

### Summary

The outline is solid and well-scoped. My main additions are:
- ~25 additional physical property violations Leonardo missed (mostly `margin-top`/`margin-bottom` → `margin-block-start`/`margin-block-end`)
- The complete absence of `forced-colors` handling (not just individual elements — zero declarations exist)
- A functional bug in `stats.ts` (wrong selector)
- Dead code in `page.ts`
- A CSS syntax error in `.how-built__easter`
- Clarification on what counts as "hard-coded value requiring tokenization" vs. documented decorative exception

Ready to implement once Leonardo incorporates feedback and we get Peter's sign-off.

---

#### [THURGOOD R1]

**Incorporation notes:**

- SPARKY R1 items 1-5 (CSS violations, HTML findings, TS findings, product components, Astro readiness): Incorporated into design outline.
- SPARKY R1 item 6 (scope feasibility): Confirmed — single spec is appropriate.
- SPARKY R1 item 7.1 (decorative colors as exceptions): **Overruled by Peter.** Product tokens required for all color values including decorative animation colors and viz syntax colors. Web-Authoring-Standards is clear: "There is no 'hard-code and move on' path for tokenizable value categories." No exceptions for decorative intent.
- SPARKY R1 item 7.2 (`.why-build__card` forced-colors): Accepted — no `forced-colors` needed since it lacks role/keyboard activation.
- SPARKY R1 item 7.3 (stats bug): Accepted — called out explicitly as bug fix.
- SPARKY R1 item 7.4 (dead code `page.ts`): Accepted — added to scope.
- SPARKY R1 item 7.5 (CSS syntax error): Accepted — called out as bug fix.
- SPARKY R1 item 7.6 (success criteria wording): Accepted — reworded to acknowledge intentional visual changes.
