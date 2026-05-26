# Design Document: Portfolio Page Implementation

**Date**: 2026-05-26
**Spec**: 004-portfolio-page-implementation
**Status**: Design Phase
**Dependencies**: Spec 002 (token compliance audit), Spec 003 (screen specification + product tokens)

---

## Overview

A single-page marketing site implemented as semantic HTML with a single combined CSS stylesheet consuming DesignerPunk system and product tokens. Interactive elements (chord diagram, career chart, ecosystem modal, agent portraits, easter eggs) are implemented as independent TypeScript modules bundled via esbuild. The only Web Component consumed is `<button-cta>`.

**Source of Truth Hierarchy**:
1. `portfolio.yaml` — semantic structure, token usage, accessibility
2. `hero-exploration.html` — visual appearance, interaction timing
3. `dist/tokens/*.css` — token values

---

## Architecture

### Page Structure

```
index.html
├── <head>
│   ├── <style> (critical CSS: nav + hero)
│   ├── <link> DesignTokens.web.css
│   ├── <link> ProductTokens.web.css
│   ├── <link> rajdhani.css, figtree.css, commit-mono.css
│   ├── <link> portfolio.css
│   └── <script defer> × 8 (components, scroll-nav, reveal, stats, chord, career, ecosystem, agents)
├── <body>
│   ├── <a> skip-to-content
│   ├── <nav> sticky navigation
│   ├── <main>
│   │   ├── <section#hero>
│   │   ├── <section#stats>
│   │   ├── <section#why-build>
│   │   ├── <section#ecosystem> (includes modal markup)
│   │   ├── <section#how-built>
│   │   ├── <section#enterprise> (includes code-shots div)
│   │   ├── <section#who-built> (includes agents + thanks divs)
│   │   └── <section#cta>
│   └── <footer>
```

### CSS Architecture

Single file (`portfolio.css`) with logical sections:

```
/* Reset & base */
/* Layout (grid, content-column, section pattern) */
/* Navigation */
/* Hero */
/* Stats */
/* Why-build */
/* Ecosystem (cards, modal, connectors) */
/* How-built */
/* Enterprise + code-shots */
/* Who-built + agents + thanks */
/* CTA */
/* Footer */
/* Interactions (easter eggs, hover states) */
/* Utilities (sr-only, reveal) */
/* Responsive (tablet, mobile) */
```

Critical CSS (nav + hero) is extracted and inlined in `<head>` for first paint performance.

### Script Architecture

Each script is an independent ES module with no shared state:

| Script | Scope | Lifecycle |
|--------|-------|-----------|
| `components.ts` | Global | Registers `<button-cta>` custom element |
| `scroll-nav.ts` | Page | IntersectionObserver on sections, updates nav appearance |
| `reveal.ts` | Page | IntersectionObserver on `.reveal-hidden` elements |
| `stats.ts` | Section | Counter animation on `#stats` visibility |
| `chord.ts` | Section | Canvas 2D, own IntersectionObserver (threshold 0.1) |
| `career.ts` | Section | Canvas 2D, own IntersectionObserver (threshold 1.0) |
| `ecosystem.ts` | Section | FLIP modal + SVG connector drawing |
| `agents.ts` | Section | Portrait SVG hover interaction |

---

## Components and Interfaces

### External Components Consumed

| Component | Usage | Props |
|-----------|-------|-------|
| `<button-cta>` | Hero CTAs, CTA section buttons | `variant`, `label`, `href`, `target`, `rel` |

### Internal Patterns

**Section pattern**: Full-bleed background, constrained content column centered at `product-layout-content-max-width`.

**Ecosystem card pattern**: Clickable card with noise texture, hover lift, FLIP-triggers modal.

**Canvas lifecycle pattern**: IntersectionObserver → start/pause/resume requestAnimationFrame loop. Check `prefers-reduced-motion` at init.

---

## Data Models

### Chord Diagram Data

```typescript
interface ChordNode {
  id: string;
  label: string;
  ck: string;        // color key into PAL object
  size: number;      // relative node size
  desc: string;      // tooltip description
  ring: 'outer' | 'inner';
  group: string;
}

type Connection = [sourceId: string, targetId: string, weight: number];
```

### Career Chart Data

```typescript
interface CareerSegment {
  id: string;
  label: string;
  short: string;     // abbreviated label for chart
  yearStart: number;
  yearEnd: number;
  design: number;    // percentage (0-100)
  eng: number;       // percentage (0-100)
  period: string;    // display string
  desc: string;      // tooltip description
  is3fn: boolean;    // independent consultancy segments
}
```

### Ecosystem Modal Data

```typescript
interface SystemData {
  header: string;           // SVG path
  desc: string;             // description text
  viz: string;              // HTML string for visualization block
  highlights: string[];     // bullet points
  stats: { value: string; label: string }[];
}
```

---

## Error Handling

### SVG Object Load Failures

- **Ecosystem connectors**: If illustration `<object>` fails to load or `contentDocument` is inaccessible, connector lines are not drawn. No error thrown — graceful degradation.
- **Agent portraits**: If any portrait `<object>` fails to load, the hover interaction is disabled entirely. Portraits remain in luminosity blend mode (still visually present, just not interactive).

### Canvas Initialization

- Both chord and career scripts check for canvas element existence before initializing.
- If `getContext('2d')` returns null, script exits silently.

### Reduced Motion

- All scripts check `window.matchMedia('(prefers-reduced-motion: reduce)')` at initialization.
- CSS uses `@media (prefers-reduced-motion: reduce)` to disable transitions and animations.

---

## Testing Strategy

### Manual Verification

- Visual comparison against prototype at all 3 breakpoints
- Token compliance audit (grep for hard-coded values)
- Accessibility audit (axe-core, manual keyboard navigation)
- Reduced-motion verification (toggle OS setting, verify all animations disabled)

### Automated Tests (Jest + jsdom)

- Ecosystem modal: open/close state management, focus trap, keyboard handling
- Canvas lifecycle: IntersectionObserver callback behavior (start/pause/resume)
- Stats counter: animation logic, final values
- Agent portraits: hover state management, graceful degradation on load failure

### Build Verification

- esbuild produces all expected output files in `dist/scripts/`
- No TypeScript compilation errors
- Dev server starts and serves the page

---

## Design Decisions

### Decision 1: Fresh Implementation vs Refactoring Existing Code

**Options Considered**:
- A) Refactor existing `index.html` and 11 CSS files into spec compliance
- B) Start fresh from the screen spec's ui-tree

**Decision**: B — Fresh implementation

**Rationale**: The existing implementation uses different content, different structure (wrong heading hierarchy, missing sections), different CSS architecture (multi-file vs single-file), and a different nav component (`<nav-header-app>` vs plain `<nav>`). Refactoring would require replacing virtually every line while working around existing structure — more cognitive overhead than starting clean.

**Trade-offs**: Lose any incidental correctness in the existing code. Mitigated by preserving the 4 working scripts (scroll-nav, reveal, stats, components) which are implementation-correct.

---

### Decision 2: Single CSS File vs Per-Section Files

**Options Considered**:
- A) Keep per-section CSS files (current: 11 files)
- B) Single combined `portfolio.css`
- C) CSS modules or scoped styles

**Decision**: B — Single combined file

**Rationale**: The spec explicitly recommends this: "Single combined stylesheet — one request, HTTP/2 makes splitting negligible for single-page site." Critical CSS is inlined separately for first paint. Internal organization maintains logical separation via comments.

**Trade-offs**: Larger single file is harder to navigate than small focused files. Mitigated by clear comment-based sections and the fact that this is a static page unlikely to grow significantly.

---

### Decision 3: Plain `<nav>` vs `<nav-header-app>` Web Component

**Options Considered**:
- A) Use existing `<nav-header-app>` Web Component (Shadow DOM, slots)
- B) Plain semantic `<nav>` element with page-level CSS

**Decision**: B — Plain `<nav>`

**Rationale**: The screen spec defines the nav as a simple sticky `<nav>` with logo + links. The `<nav-header-app>` component was designed for a different interaction pattern (scroll-color-change, about popover) that the spec doesn't call for. Using it would mean fighting the component's opinions rather than implementing the spec directly.

**Trade-offs**: Lose Shadow DOM encapsulation for nav styles. Acceptable — the nav is simple enough that style leakage isn't a concern on a single-page site.

---

### Decision 4: Canvas Technology Choices (Retained from Spec 003)

**Options Considered**:
- A) Canvas 2D for all visualizations
- B) SVG for all visualizations
- C) Mixed: Canvas 2D for chord/career, SVG for ecosystem connectors

**Decision**: C — Mixed approach (retained from screen spec)

**Rationale**: Chord diagram requires continuous rotation animation and pulse dots (frame-based rendering). Career chart uses noise texture compositing via canvas pattern fill. Both are better suited to Canvas 2D. Ecosystem connectors are simple lines + dots that benefit from DOM positioning — SVG is appropriate.

**Trade-offs**: Two rendering technologies to maintain. Mitigated by clear separation (each in its own script module).

---

### Decision 5: Font Delivery — Full WOFF2 vs Latin Subset

**Options Considered**:
- A) Latin-only subset (~30-40KB total for 3 weights)
- B) Full character set WOFF2 (~315KB total for 3 weights)

**Decision**: B — Full character set WOFF2 (for v1)

**Rationale**: Subsetting tooling wasn't immediately available. Full WOFF2 is still a major improvement over TTF (~1.9MB → 315KB). The page is a marketing site loaded once, not a frequently-revisited app. 315KB for display fonts is acceptable.

**Trade-offs**: ~275KB larger than optimal. Documented as future optimization opportunity if performance metrics warrant it.

---

### Decision 6: Script Extraction Strategy

**Options Considered**:
- A) Rewrite all interaction scripts from scratch based on spec
- B) Extract working scripts from prototype, add TypeScript types and lifecycle management

**Decision**: B — Extract and enhance

**Rationale**: The prototype scripts are the visual reference — they produce the exact behavior the spec was written from. Rewriting risks visual fidelity drift. Extracting and adding IntersectionObserver lifecycle + reduced-motion checks + TypeScript types is mechanical work that preserves proven behavior.

**Trade-offs**: Inherit any prototype code quality issues. Mitigated by TypeScript compilation catching type errors, and the addition of proper lifecycle management that the prototype lacks.
