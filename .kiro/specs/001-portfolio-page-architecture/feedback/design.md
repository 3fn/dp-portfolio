# Spec Feedback: Portfolio Page Architecture — Design

**Spec**: 001-portfolio-page-architecture
**Phase**: Design
**Created**: 2026-05-10
**Reviewers**: Ada, Lina, Sparky

---

## Design Feedback

### Context for Reviewers

- Requirements (20) approved — all token references verified by Ada, all component usage confirmed by Lina, all sections confirmed implementable by Sparky
- Design doc covers architecture, interfaces, and testing strategy. Per-section visual details (tokens, spacing, backgrounds) live in the design outline's Section Visual Profiles — not duplicated here.
- Cross-reference table in design.md § "Overview" points to design-outline.md for detailed visual specs
- Phased implementation (A–J) confirmed by all reviewers during requirements feedback

**Key architectural decisions in this doc:**
- Data attributes on sections for nav color config (Decision 1)
- CSS-first textures over SVG filters/canvas (Decision 2)
- Phased implementation with named checkpoints (Decision 3)
- Explicit icon over automatic (Decision 4)

**Key interfaces defined:**
- `NavColorConfig` — scroll observer reads section data attributes
- Button-CTA modified props (`href`, `target`, `rel`)
- Hard shadow / text shadow CSS utilities
- Section heading prefix HTML pattern
- Easter egg neon flicker keyframes
- Reveal system CSS classes (`.reveal-hidden` / `.reveal-visible`)
- Count-up config interface

**Focus your review on:**
- **Ada**: Are the CSS custom property patterns for token consumption correct? Any concerns with how primitives are referenced in CSS utilities (hard shadow, text shadow)?
- **Lina**: Is the Button-CTA interface modification complete? Does the contract/testing approach cover your needs?
- **Sparky**: Is the architecture implementable as described? Any CSS patterns that need adjustment? Does the observer setup (rootMargin, threshold) match your intended approach?

---

[Agent feedback rounds here]

### Lina — Button-CTA Implementation Review (2026-05-10)

#### Overall Assessment

The Button-CTA interface modification is clean and complete. The `ButtonCTAProps` interface correctly adds `href`, `target`, and `rel` as optional props. The rendering logic is clear. Testing strategy covers all my concerns. No issues.

---

#### Confirmations

| Area | Status | Notes |
|------|--------|-------|
| Interface definition | ✅ Complete | `href?`, `target?`, `rel?` — all optional, additive |
| Rendering logic | ✅ Clear | href absent → `<button>`, href present → `<a>` |
| Auto `rel` behavior | ✅ Correct | `rel="noopener noreferrer"` when `target="_blank"` — security best practice |
| Existing props unchanged | ✅ Confirmed | `variant`, `label`, `icon`, `iconPosition`, `disabled`, `testID` all preserved |
| Test strategy | ✅ Comprehensive | 8 test cases covering both paths, keyboard behavior, security attrs, regression |
| Decision 4 (explicit icon) | ✅ Matches Peter's decision | No auto behavior |

#### Implementation Notes (for my reference during Task execution)

1. **Web implementation**: The `_createDOM()` method in `ButtonCTA.web.ts` currently creates a `<button>`. I'll add a conditional: if `href` is set, create `<a>` instead. All class/style application stays the same — only the root element tag changes.

2. **`disabled` prop on `<a>`**: HTML `<a>` elements don't support `disabled` natively. If both `href` and `disabled` are set, I'll need to decide: (a) ignore disabled on links, (b) render as `<button>` when disabled, or (c) add `aria-disabled="true"` + prevent click. The design doc doesn't address this edge case.

   **My recommendation**: Option (a) — ignore `disabled` when `href` is set. Links aren't disableable. If the product doesn't want the link available, don't render it. This matches the DesignerPunk philosophy ("if an action is unavailable, do not render it").

3. **Contract name**: I'll propose `content_renders_link` — "component renders as a link element when href is provided." Category: `content`. This is a new concept for the catalog.

---

#### No Issues

The design is implementable as written. I have everything I need to execute.

### Ada — Token Consumption & CSS Pattern Review (2026-05-10)

#### Overall Assessment

Clean design. Token consumption patterns in the CSS are correct — custom properties reference the right token names, utilities compose primitives properly, and the reveal system uses semantic spacing (`space-200`) for the translateY offset. No token issues.

---

#### Confirmations

**Hard shadow utility** — Correct pattern. Uses `var(--space-100)` for offset, `var(--blur-000)` for zero blur, and a custom property for color. The per-section color override via `--hard-shadow-color` is the right approach — keeps the utility generic while sections control the color.

**Text shadow utility** — Same pattern at `var(--space-025)` offset. Correct.

**Reveal system** — Uses `var(--space-200)` for translateY and `var(--duration-250)` for timing. Both correct. The `prefers-reduced-motion` override correctly removes both opacity and transform transitions.

**Section heading prefix** — Uses `var(--grouped-tight)` for the gap. Correct. Matches Spec 000's popover prefix pattern.

**Easter egg flicker** — Uses `var(--duration-500)`. Correct.

**Nav observer rootMargin** — `-64px` (nav height). This is a hard-coded pixel value. Technically should reference a token or computed value, but nav height isn't a token (it's determined by content + padding). Acceptable as a magic number with a comment explaining it's the nav height. If the nav height changes, this needs updating — worth a `/* TODO: derive from nav height */` comment.

**Count-up** — References `duration500` in the interface. Correct.

---

#### No Issues

The design doc is architecturally sound from a token perspective. The separation between "design doc defines patterns" and "design outline defines per-section values" is clean — no risk of token references drifting between two sources.

One thing I appreciate: the CSS utilities use `var(--token-name)` format consistently, which means they'll automatically pick up any token value changes without code modifications. That's the correct consumption pattern.

---

### Sparky — Web Implementation Review (2026-05-10)

#### Overall Assessment

This is exactly what I need to build from. The architecture is implementable as described — observer setup matches my intended approach, CSS patterns are correct, and the cross-reference to design-outline visual profiles means I'm not hunting for token values in two places. Three minor items, all non-blocking.

---

#### Issues

None.

---

#### Observations

**[SPARKY-O1] Nav observer `rootMargin: '-64px'` — agree with Ada's note**

Ada flagged this as a magic number. Agreed — I'll add a comment and derive it from a CSS custom property or computed value at observer initialization:

```typescript
const navHeight = document.querySelector('nav-header-app')?.getBoundingClientRect().height ?? 64;
const observer = new IntersectionObserver(callback, {
  rootMargin: `-${navHeight}px 0px 0px 0px`,
  threshold: 0
});
```

This way if nav height changes (e.g., responsive), the observer stays correct. Minor improvement, zero risk.

**[SPARKY-O2] Reveal system — `transition` on `.reveal-visible` only**

The design shows `transition` on `.reveal-visible`. This is correct — the transition only needs to exist on the target state. Elements start at `.reveal-hidden` (no transition needed for the hidden state) and transition *to* `.reveal-visible`. If someone accidentally adds `.reveal-hidden` back (they shouldn't — it's one-shot), there's no reverse animation. Good.

One nuance: the `transition-delay` for stagger is on `.reveal-stagger:nth-child(n)`. These delays should also be on the `.reveal-visible` state (or the element itself), not `.reveal-hidden`. As written, they're on the element directly (via `:nth-child`), which means the delay applies regardless of state — that's fine because the transition property only exists on `.reveal-visible`. Just confirming my read is correct.

**[SPARKY-O3] `backdrop-filter` prefix note**

Design mentions Safari needs `-webkit-backdrop-filter`. I'll include both:

```css
-webkit-backdrop-filter: blur(var(--blur-100));
backdrop-filter: blur(var(--blur-100));
```

If we're using a build tool with autoprefixer, this is handled automatically. If not, I'll add it manually. Either way, covered.

---

#### Confirmations

| Area | Status | Notes |
|------|--------|-------|
| Page structure (semantic HTML) | ✅ | `<main>`, `<section>`, `<footer>` — correct |
| Data attributes for nav config | ✅ | Clean pattern, co-located with content |
| Observer setup (rootMargin, threshold) | ✅ | Matches my intended approach exactly |
| Reveal CSS classes | ✅ | `.reveal-hidden` / `.reveal-visible` — simple, correct |
| Stagger pattern (nth-child delays) | ✅ | Works for up to 4 cards. Will extend if needed. |
| Count-up interface | ✅ | Clean. `suffix`/`prefix` handles "+" and formatting. |
| Hard shadow utility | ✅ | Custom property for color, token refs for offset/blur |
| Text shadow utility | ✅ | Separate from card shadow (different offset). Correct. |
| Section heading prefix | ✅ | Same pattern as Spec 000. Will reuse. |
| Easter egg keyframes | ✅ | Irregular timing sells the flicker. `forwards` fill holds at 1. |
| Error handling / fallbacks | ✅ | Sensible degradation. No JS = static page (still works). |
| Testing strategy | ✅ | Integration tests for scroll systems, manual visual review per phase. |
| Decision 1 (data attributes) | ✅ | Right call. Config lives with content. |
| Decision 2 (CSS-first textures) | ✅ | My recommendation, confirmed. |
| Decision 3 (phased implementation) | ✅ | My recommendation, confirmed. |
| Decision 4 (explicit icon) | ✅ | Peter's decision, correct. |

---

#### Lina's `disabled` + `href` Edge Case

Agree with Lina's recommendation (Option a): ignore `disabled` when `href` is set. Links aren't disableable — if you don't want the link, don't render it. This matches how native HTML works and avoids inventing behavior that doesn't exist in the platform.

---

#### Ready to Implement

The design doc gives me everything I need. Between this (architecture/patterns) and the design outline (per-section visual specs), I have complete implementation guidance. No blockers. Ready to start Phase A as soon as Lina delivers Button-CTA `href` and Ada delivers the `color.action.primary` override.
