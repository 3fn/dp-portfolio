# Design Document: Portfolio Audience Repositioning

**Date**: 2026-06-04
**Spec**: 007 - Portfolio Audience Repositioning
**Status**: Design Phase
**Dependencies**: Spec 005 ✅; before Spec 006

---

## Overview

This spec is a content repositioning with one new engineering artifact (scroll-driven token animation). The audience section is a content swap on an existing grid. The Why Build enhancement adds a sticky column with scroll-driven state transitions. The stats bar gets a structural CSS change for full-bleed. Enterprise language is swept from the entire page.

---

## Architecture

No new architectural patterns. The existing portfolio structure is preserved:

```
src/pages/index.html          — Content updates + class renames
src/styles/portfolio.css      — Section styles (rename + stats full-bleed)
src/scripts/token-evolution.ts — NEW: scroll-driven token animation
product/overview.yaml          — Positioning language update
README.md                      — Audience section addition
```

---

## Implementation Strategy

### Phase 1: Content & Structure (HTML + CSS)

**Audience section** (replaces enterprise):
- Rename `.enterprise__*` → `.audience__*` in CSS
- Rename `#enterprise` → `#audience` in HTML (update any nav links pointing to this anchor)
- Replace content: hook, sub, 6 grid cards, personas, closer
- Typography: hook uses `--typography-display-font-size`, sub/personas use `--typography-body-lg-font-size`
- Grid structure unchanged: `grid-template-columns: 1fr 1fr`, `gap: var(--space-500) var(--space-900)`

**Why Build enhancement**:
- Restructure left column into three subsections (Challenge, Insight & Thesis, Goals)
- Add sticky right column with token cluster HTML (16 `<div class="flap-token">` elements)
- Each token has `data-states` attribute with pipe-separated phase values
- Goal #1 updated to remove "enterprise-tier" language

**Stats bar full-bleed**:
- Remove `max-inline-size` constraint from `.stats` container
- Keep `max-inline-size: var(--product-layout-content-max-width)` on `.stats__grid` inner element
- Background/borders extend to viewport edge

### Phase 2: Enterprise Language Sweep

Systematic find-and-replace across:
- Hero `<p>` description — remove "enterprise-ready"
- CTA body copy — rephrase "enterprise-grade design system"
- Why Build Goal #1 — remove "enterprise-tier"
- CSS class names (`.enterprise__*` → `.audience__*`)
- Verify no JS references to `.enterprise` selectors

### Phase 3: Token Animation Script

New file: `src/scripts/token-evolution.ts`

```typescript
interface TokenPhaseData {
  states: [string, string, string, string]; // [chaos, straightened, primitive, semantic]
}

export function init(): () => void {
  // 1. Query DOM elements
  // 2. Parse phase data from data-states attributes
  // 3. Set up scroll listener (passive) + IntersectionObserver
  // 4. Calculate phase based on scroll position relative to anchor beat
  // 5. Apply rotateX transition on text swap
  // 6. Toggle .resolved class for rotation flatten (Phase 1→2)
  // 7. Return cleanup function (removeEventListener, disconnect observer)
}
```

**Scroll timing logic:**
- Anchor element: `.why-build__beat:nth-child(2)` (Insight & Thesis)
- Phase 1 → 2: When anchor enters viewport bottom
- Phase 2 → 3: When anchor is centered in viewport
- Phase 3 → 4: When anchor exits viewport top
- Fully reversible on scroll-up

**Reduced motion path:**
- Check `window.matchMedia('(prefers-reduced-motion: reduce)')` at init
- If true: set all tokens to Phase 4 text, add `.resolved` class, skip scroll listener entirely

### Phase 4: Product MCP & README

**product/overview.yaml** (Leonardo):
- Update `description` field
- Update `domain` field
- Update `principles` list
- Remove any "enterprise" references

**README.md**:
- Add "Who is this for?" section with 4 persona statements
- Brief — link to portfolio for full context
- Remove any "enterprise" framing if present

---

## Token Animation Phase Data

### Phase 1 (Chaos) — 16 unique values:

Each must be unique, representing diverse bad naming conventions:

```
$space-1, --ds-pad-sm, @color-blue-1, %radius-pill,
--dp-space-min, $clr-primary, _fontSize_h1, --icon-lg,
$color-dp-yellow5, @media-break-1, %btn-radius, --dp-rad-lg,
$lh-body, @gutter-default, --ds-shadow-1, _motion_fast
```

### Phase 2 (Straightened):
Same text as Phase 1, CSS rotation removed (`.resolved` class applied).

### Phase 3 (Primitive):
```
--space-100, --space-150, --pink-500, --radius-050,
--space-200, --space-300, --font-size-075, --radius-100,
--font-size-100, --font-size-500, --font-weight-700, --radius-max,
--black-300, --white-200, --duration-150, --border-width-100
```

### Phase 4 (Semantic):
```
--space-grouped-normal, --space-grouped-loose, --color-action-primary, --radius-050,
--space-inset-200, --space-separated-normal, --typography-label-md-font-size, --radius-100,
--typography-body-md-font-size, --typography-display-font-size, --typography-display-font-weight, --radius-max,
--color-contrast-on-light, --color-structure-surface, --motion-button-press, --border-width-100
```

**Mapping accuracy**: Each Phase 3→4 pair represents a real primitive→semantic relationship in the system.

---

## CSS Changes Summary

### New/Modified Selectors

| Selector | Change |
|----------|--------|
| `.enterprise__*` | Rename to `.audience__*` |
| `.stats` | Remove `max-inline-size`, add full-bleed background |
| `.stats__grid` | Add `max-inline-size: var(--product-layout-content-max-width)` + `margin: 0 auto` |
| `.audience__hook` | New — `font-size: var(--typography-display-font-size)` |
| `.audience__sub`, `.audience__personas p` | `font-size: var(--typography-body-lg-font-size)` |
| `.why-build__narrative` | Update to `grid-template-columns: 5fr 4fr` |
| `.why-build__evolution` | New — `position: sticky; inset-block-start: [product token]` |
| `.flap-token`, `.flap-text` | Existing pattern from prototype, translated to logical properties + tokens |

### Product Tokens Needed

| Token | Value | Category | Rationale |
|-------|-------|----------|-----------|
| `tokenEvolutionStickyOffset` | 120 | layout | Nav height (48px) + section heading clearance. No system spacing token at 120px. |

All other values snap to existing system or product tokens.

---

## Error Handling

Not applicable — content and presentational changes with no runtime error scenarios beyond standard DOM queries. Null guards on script DOM queries per Spec 005 patterns.

---

## Testing Strategy

### Visual Verification

- Dev server comparison: all sections render correctly
- Scroll through Why Build section: phases transition correctly
- Resize viewport: responsive behavior matches existing page
- Forced-colors mode: section remains legible
- Reduced motion: final state shown immediately

### Automated Checks

- Build passes (TypeScript compiles cleanly)
- No `enterprise` string in visible HTML content (grep check)
- CSS has no physical directional properties in new code

### Manual Verification Checklist

- [ ] Audience section renders with correct content
- [ ] Token animation transitions through 4 phases on scroll
- [ ] Animation reverses on scroll-up
- [ ] Reduced motion shows Phase 4 immediately
- [ ] Stats bar extends full viewport width
- [ ] Stats content stays at max-width
- [ ] No "enterprise" text visible anywhere on page
- [ ] `.enterprise` CSS classes all renamed to `.audience`
- [ ] product/overview.yaml updated
- [ ] README has "Who is this for?" section

---

## Design Decisions

### Decision 1: Implement Before Spec 006 (Astro)

**Options Considered**:
1. Wait for Astro migration, implement as Astro components
2. Implement now in current architecture

**Decision**: Option 2 — implement now.

**Rationale**: The audience section is a content swap on existing grid structure — minimal CSS delta. The token animation script exports init/cleanup, so Spec 006 just re-wires the import. Waiting would delay the positioning update unnecessarily. Per Sparky's assessment: low risk of Astro conflict.

**Trade-offs**: Script will need minor lifecycle rewiring in Spec 006 (wrapping in island component). Acceptable.

### Decision 2: Flat Cards (Not Ecosystem Card Style)

**Options Considered**:
1. Match ecosystem card pattern (noise texture, box-shadow, hover elevation)
2. Flat text items in a grid (simpler)

**Decision**: Option 2 — flat cards.

**Rationale**: Leonardo's explicit design decision. The audience section communicates through text, not interactivity. Ecosystem cards are interactive (clickable, open modals). Audience cards are informational. Different treatment signals different behavior expectations.

### Decision 3: Single New Product Token Only

**Options Considered**:
1. Create product tokens for all prototype values
2. Snap to system tokens wherever possible, product tokens only for genuine gaps

**Decision**: Option 2 — one new product token (`tokenEvolutionStickyOffset`).

**Rationale**: System-First Value Selection rule. Sparky's audit showed all prototype values except the sticky offset map to existing system/product tokens. The grid gaps are `space500`/`space900` (already in use), typography maps to system semantics, spacing maps to system primitives.
