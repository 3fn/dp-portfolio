# Lessons Learned: Portfolio CSS Authoring Cleanup

**Date**: 2026-06-01
**Spec**: 005-portfolio-css-authoring-cleanup
**Audience**: Spec 006 (Astro migration) planning

---

## Script Organization — Restructuring Needed for Astro Islands

### Current Pattern (problematic for Astro)

Scripts execute at module parse time with no exported entry point:

```ts
// chord.ts — executes immediately on import
const canvas = document.getElementById('chord');
// ... setup and animation logic runs immediately
```

### Required Pattern for Astro Islands

Each script should export an `init()` function that returns a cleanup function:

```ts
export function init(): () => void {
  const canvas = document.getElementById('chord');
  // ... setup
  return () => { /* cleanup listeners, cancel frames */ };
}
```

This enables Astro's `client:visible` directive to mount/unmount islands correctly.

### Scripts Needing Restructuring

| Script | Current | Astro Requirement |
|--------|---------|-------------------|
| `chord.ts` | Executes at parse | Export init, return cleanup (resize listener, animation frame) |
| `career.ts` | Executes at parse | Export init, return cleanup (resize listener, animation frame) |
| `ecosystem.ts` | Executes at parse | Export init, return cleanup (resize listener, click/keydown listeners) |
| `agents.ts` | Executes at parse | Export init, return cleanup (portrait hover listeners) |
| `stats.ts` | DOMContentLoaded | Export init, return cleanup (observer disconnect) |
| `reveal.ts` | DOMContentLoaded | Export init, return cleanup (observer disconnect) |
| `scroll-nav.ts` | DOMContentLoaded | Export init, return cleanup (observer disconnect) |

---

## Event Listener Cleanup Gaps

These listeners are added but never removed. Fine for SPA, problematic for Astro islands:

| Script | Listener | Risk |
|--------|----------|------|
| `chord.ts` | `window.addEventListener('resize', resize)` | Memory leak on island unmount |
| `ecosystem.ts` | `window.addEventListener('resize', drawConnectors)` | Memory leak on island unmount |
| `agents.ts` | Portrait hover listeners (multiple elements) | Memory leak on island unmount |

**Recommendation**: Each init function should store listener references and return a cleanup that calls `removeEventListener`.

---

## Shared Utility Extraction Candidates

These patterns are duplicated across scripts and should be extracted to a `utils/` module:

| Utility | Used In | Signature |
|---------|---------|-----------|
| `easeOut(t)` | `career.ts`, `stats.ts` | `(t: number) => number` — cubic ease-out |
| `prefersReducedMotion()` | `chord.ts`, `career.ts`, `ecosystem.ts`, `stats.ts` | `() => boolean` |

**Recommendation**: Create `src/scripts/utils/motion.ts` with shared motion utilities.

---

## Product Token Decisions

### Tokens Created (30 total)

| Category | Count | Key Decisions |
|----------|-------|---------------|
| color | 10 | Viz syntax colors ref system primitives (cyan200, green300, yellow300, pink300). Neon glow refs green300 — no alpha needed. |
| layout | 10 | Easter egg positions NOT tokenized (decorative coordinates). Responsive hero constraints tokenized. |
| typography | 6 | `easterEggDisplay` (4.5rem) replaces broken --font-size-1200 ref. Letter-spacing values outside system scale. |
| border | 3 | tooltipRadius/Width ref system primitives. quoteBorderWidth (3px) is genuinely between system values. |
| shadow | 1 | cardHoverElevation — dramatic hover shadow beyond system tokens. |

### Key Governance Insight

During token creation, 8 values initially assumed to be hard-value tokens turned out to be exact matches to system primitives (cyan200, green300, yellow300, pink300, radius025, borderWidth200, space050, space100, space150, space250). **Always verify against system tokens before creating hard-value product tokens.**

---

## Easter Egg Positioning — Documented Exception Pattern

Easter egg elements (`.why-build__easter`, `.how-built__easter`) use hard-coded pixel coordinates for decorative positioning. These are classified as exceptions per Product-Token-Governance "What NOT to Tokenize" — decorative coordinates with no semantic meaning beyond visual placement.

**Pattern for Spec 006**: If these elements move to Astro components, the positioning values stay as hard-coded CSS with exception comments. Don't tokenize them.

---

## Neon Keyframe Consolidation Opportunity

After this cleanup, `@keyframes neon-flicker` and `@keyframes neon-flicker-green` are structurally identical (both use `var(--product-color-neon-glow)`, differ only in timing percentages). Spec 006 could consolidate to a single keyframe.

---

## CSS Compliance Patterns for Spec 006

### What Stays Physical (documented exceptions)

- `@media (max-width: ...)` — media queries don't support logical properties
- `width`/`height` on replaced elements (img, canvas, object, SVG)
- `.sr-only` pattern (clip-rect technique)
- Viewport units (`100vw`, `80vh`)
- `translateY()` animation offsets
- Text-shadow blur radii in keyframes

### What Must Be Logical

Everything else — margins, paddings, positioning, borders, max-width on layout elements. Astro components should use logical properties from the start.

---

## Build System Notes

- TypeScript compiles cleanly with `npx tsc --noEmit`
- Product token YAML files validate with `python3 yaml.safe_load()`
- No test framework currently configured for portfolio scripts (unit tests would need setup in Spec 006)
