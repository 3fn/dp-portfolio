# Design Document: Portfolio Page Architecture

**Date**: 2026-05-10
**Spec**: 001 - Portfolio Page Architecture
**Status**: Design Phase
**Dependencies**: Spec 000 (Nav-Header-App Hardening) ✅ Complete

---

## Overview

This spec delivers the page architecture for DP-Portfolio: shared scroll behaviors, section scaffolding, and full builds of 8 simple sections. The design is organized around three layers:

1. **Foundation layer** — Page layout, scroll-linked nav theming, reveal animation system, reduced motion, responsive grid
2. **Section layer** — Individual section builds with their backgrounds, content, and effects
3. **Component layer** — Button-CTA polymorphic rendering (Lina) and `color.action.primary` override (Ada)

Implementation follows Sparky's phased structure (A–J) with named checkpoints.

### Cross-References to Design Outline

This design document covers architecture, interfaces, and testing strategy. For detailed visual specifications, refer to the design outline:

| Detail | Location |
|--------|----------|
| Section color map (all nav colors per section) | `design-outline.md` § "Decision 2: Scroll-Linked Nav Color System" |
| Section visual profiles (backgrounds, textures, spacing, text colors) | `design-outline.md` § "Section Visual Profiles" (profiles #1–#12) |
| Grid column layouts per section at each breakpoint | `design-outline.md` § "Decision 5: Responsive Strategy" |
| Phased implementation sequence with scope boundaries | `design-outline.md` § "Implementation Sequence (Phased)" |
| Scope summary (full/partial/scaffold per section) | `design-outline.md` § "Scope Summary by Section" |
| Token needs and existing token inventory | `design-outline.md` § "Token Needs (Preliminary)" |

The design outline's section visual profiles are the authoritative source for per-section token references, opacity values, spacing tokens, and background treatments. This document does not duplicate those — it provides the architectural patterns that sections share.

---

## Architecture

### Page Structure

```html
<body>
  <nav-header-app appearance="opaque">
    <!-- Spec 000 output — sticky, scroll-linked theming via custom properties -->
  </nav-header-app>

  <main>
    <section id="hero" data-nav-bg="green100" data-nav-glow="neonGreen" data-nav-border="green400" data-nav-text="dark">
    <section id="stats" data-nav-bg="pink100" data-nav-glow="neonPink" data-nav-border="pink400" data-nav-text="dark">
    <section id="why-build" data-nav-bg="green100" data-nav-glow="neonGreen" data-nav-border="green400" data-nav-text="dark">
    <section id="ecosystem" data-nav-bg="yellow300" data-nav-glow="neonPurple" data-nav-border="purple400" data-nav-text="dark">
    <section id="critical-features" data-nav-bg="orange100" data-nav-glow="neonPink" data-nav-border="pink400" data-nav-text="dark">
    <section id="code-screenshots" data-nav-bg="orange300" data-nav-glow="neonCyan" data-nav-border="cyan400" data-nav-text="light">
    <section id="how-built" data-nav-bg="teal200" data-nav-glow="neonCyan" data-nav-border="cyan400" data-nav-text="light">
    <section id="who-built" data-nav-bg="black300" data-nav-glow="neonCyan" data-nav-border="cyan400" data-nav-text="light">
    <section id="cta" data-nav-bg="green100" data-nav-glow="neonGreen" data-nav-border="green400" data-nav-text="dark">
    <footer data-nav-bg="black500" data-nav-glow="neonCyan" data-nav-border="cyan400" data-nav-text="light">
  </main>
</body>
```

Each section carries its nav color configuration as data attributes. The scroll observer reads these to update Nav-Header-App's custom properties.

### Scroll-Linked Nav Color System

```typescript
interface NavColorConfig {
  bg: string;       // CSS custom property value for --nav-bg-override
  glow: string;     // CSS custom property value for --nav-glow-color
  border: string;   // CSS custom property value for --nav-border-color
  textMode: 'dark' | 'light';  // Determines nav text/icon color class
}

// Observer setup
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const config = readNavConfig(entry.target);
      applyNavColors(config);
    }
  });
}, {
  rootMargin: '-64px 0px 0px 0px', // Negative top margin = nav height
  threshold: 0
});
```

**Text mode snap**: When `textMode` changes, the nav element gets a class swap (`.nav--dark-text` / `.nav--light-text`) immediately — no CSS transition on text color. Background transitions smoothly via `duration150`; text snaps for readability.

### Scroll-Reveal System

```typescript
interface RevealConfig {
  threshold: number;    // ~0.15, tunable per section
  oneShot: boolean;     // Always true — no re-hide
  staggerDelay?: number; // 75ms between siblings (cards)
}
```

```css
/* Base reveal states */
.reveal-hidden {
  opacity: 0;
  transform: translateY(var(--space-200));
}

.reveal-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--duration-250) ease-out,
              transform var(--duration-250) ease-out;
}

/* Stagger delay for card siblings */
.reveal-stagger:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger:nth-child(2) { transition-delay: 75ms; }
.reveal-stagger:nth-child(3) { transition-delay: 150ms; }
.reveal-stagger:nth-child(4) { transition-delay: 225ms; }

/* Reduced motion: no animation, immediate visibility */
@media (prefers-reduced-motion: reduce) {
  .reveal-hidden { opacity: 1; transform: none; }
  .reveal-visible { transition: none; }
}
```

### Stats Count-Up

```typescript
interface CountUpConfig {
  target: number;       // Final value
  duration: number;     // duration500 (500ms)
  suffix?: string;      // e.g., "+", "%", "k+"
  prefix?: string;      // e.g., "-"
}

function countUp(element: HTMLElement, config: CountUpConfig): void {
  if (prefersReducedMotion()) {
    element.textContent = formatValue(config);
    return;
  }
  // requestAnimationFrame interpolation from 0 to target over duration
}
```

---

## Components and Interfaces

### Button-CTA (Modified)

```typescript
interface ButtonCTAProps {
  /** Existing props unchanged */
  variant: 'primary' | 'secondary';
  label: string;
  icon?: string;
  iconPosition?: 'leading' | 'trailing';
  disabled?: boolean;
  testID?: string;

  /** New: polymorphic rendering */
  href?: string;           // When set, renders as <a>
  target?: string;         // e.g., '_blank'
  rel?: string;            // Auto-set to 'noopener noreferrer' when target='_blank'
}
```

**Rendering logic**:
- `href` absent → `<button>` (existing behavior)
- `href` present → `<a href="..." target="..." rel="...">`
- All visual styling identical regardless of rendered element

### Hard Shadow Utility

```css
/* Card-level hard shadow (space100 offset) */
.hard-shadow {
  box-shadow: var(--space-100) var(--space-100) var(--blur-000) var(--hard-shadow-color, var(--purple-300));
}

/* Text-level hard shadow (space025 offset) — Stats section only */
.text-shadow-hard {
  text-shadow: var(--space-025) var(--space-025) var(--blur-000) var(--text-shadow-color, var(--pink-500));
}
```

Each section sets `--hard-shadow-color` via inline style or section-scoped CSS:
- Why Build: `--hard-shadow-color: var(--purple-300)`
- Critical Features: `--hard-shadow-color: var(--pink-300)`
- How Built: `--hard-shadow-color: var(--cyan-300)`
- Agent Grid: `--hard-shadow-color: var(--orange-300)`

### Section Heading Prefix

```html
<!-- Product CSS utility — same pattern as Spec 000 popover items -->
<h2 class="section-heading">
  <span class="section-prefix" aria-hidden="true">//</span>
  <span class="section-heading__text">Why build this system?</span>
</h2>
```

```css
.section-heading {
  display: flex;
  align-items: baseline;
  gap: var(--grouped-tight);
}

.section-prefix {
  flex-shrink: 0;
  /* Fixed width for alignment — matches Spec 000 prefix pattern */
}
```

### Easter Egg Neon Flicker

```css
@keyframes neon-flicker {
  0%   { opacity: 0; }
  15%  { opacity: 0.4; }
  25%  { opacity: 0; }
  45%  { opacity: 0.7; }
  55%  { opacity: 0; }
  70%  { opacity: 0.9; }
  80%  { opacity: 0.4; }
  100% { opacity: 1; }
}

.easter-egg {
  opacity: 0;
  pointer-events: none;
}

.easter-egg-zone:hover .easter-egg {
  animation: neon-flicker var(--duration-500) ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .easter-egg-zone:hover .easter-egg {
    animation: none;
    opacity: 1;
  }
}
```

---

## Section Builds — Key Implementation Details

### Stats Bar
- **Noise texture**: SVG data URI as `background-image`. Single noise tile at `opacity024`.
- **Count-up**: Triggered simultaneously with reveal animation. Numbers interpolate via `requestAnimationFrame`.
- **Text shadow**: `.text-shadow-hard` utility with `--text-shadow-color: var(--pink-500)`.

### Why Build
- **Background**: CSS `radial-gradient(circle at center, var(--pink-300), var(--pink-500))`.
- **Exclusion texture**: Tiled square SVG with `mix-blend-mode: exclusion`. Fallback: pre-rendered tile if browser inconsistencies.
- **Cards**: Container-Card-Base with `purple100` fill. Hard shadow via utility class.

### Critical Features
- **Diamond lattice**: CSS-first attempt (`repeating-linear-gradient` at 45°). Fallback: SVG tile asset.
- **Cards**: `color.structure.surface` @ `opacity080`. Hard shadow via utility class.
- **Angular gradient**: `linear-gradient(-115deg, var(--black-500), var(--white-100))` at `opacity024`.

### Code Screenshots
- **Blend mode**: `<img>` with `mix-blend-mode: multiply` (or `color-burn`) on `orange300` background.
- **Halftone**: SVG pattern overlay at reduced opacity.
- **Asset-dependent**: Scaffolds with placeholder containers until assets arrive.

### How Built + Special Thanks
- **Frosted glass**: `backdrop-filter: blur(var(--blur-100))` + `background: rgba(var(--orange-100-rgb), var(--opacity-056))`.
- **Radial gradient**: `radial-gradient(circle at center bottom, var(--teal-200), var(--yellow-300))`.
- **Halftone circles**: Tiled SVG circles at `opacity024`.
- **Credits grid**: CSS Grid, 4 columns at md, responsive reduction.

### CTA Section
- **Button-CTA usage**: Two instances with `href`, `target="_blank"`, `icon="external-link"`, `iconPosition="trailing"`.
- **Photo asset**: Pre-processed image, positioned via CSS Grid or absolute positioning.

---

## Error Handling

### Intersection Observer Fallback
If Intersection Observer is unavailable (extremely unlikely in modern browsers):
- Nav stays at default color (Hero section colors)
- Reveal elements render immediately visible (no animation)
- Count-up renders final values immediately

### Asset Loading Failures
- Section backgrounds are CSS (no external dependency)
- Image assets (code screenshots, portraits, photo) use `<img>` with appropriate `alt` text
- If images fail to load, section layout remains intact (images are supplementary, not structural)

### Reduced Motion Edge Cases
- Nav color transitions still occur (informational, not decorative)
- Scroll position detection still works (observer fires, just no animation)
- Easter eggs show on hover (just without flicker)

---

## Testing Strategy

### Button-CTA Tests (Lina)

| Test | Validates |
|------|-----------|
| Renders `<button>` without href | Existing behavior preserved |
| Renders `<a>` with href | Polymorphic rendering |
| `<a>` has correct href value | Prop passthrough |
| `<a>` with target="_blank" has rel="noopener noreferrer" | Security attributes |
| Space key does NOT activate `<a>` | Native link keyboard behavior |
| Enter key activates `<a>` | Native link keyboard behavior |
| Existing tests pass unchanged | No regression |
| Contract documented | Behavioral guarantee exists |

### Scroll System Tests (Sparky — integration)

| Test | Validates |
|------|-----------|
| Nav color updates on section intersection | Scroll-linked theming works |
| Nav text snaps (no transition) on mode change | Readability during transitions |
| Reveal elements start hidden | Initial state correct |
| Reveal elements become visible on intersection | Observer triggers correctly |
| Reveal is one-shot (no re-hide) | Elements stay visible |
| Stagger delay applies to card siblings | Timing correct |
| Reduced motion: elements immediately visible | Accessibility respected |
| Reduced motion: count-up shows final value | Accessibility respected |
| Reduced motion: easter egg shows without flicker | Accessibility respected |

### Visual Regression (Manual — with Peter)

Each phase completion includes visual review against the Figma mock. Not automated — iterative refinement with Peter during implementation.

---

## Design Decisions

### Decision 1: Data Attributes for Nav Color Configuration

**Options Considered**:
1. Data attributes on section elements (`data-nav-bg`, etc.)
2. JavaScript configuration object mapping section IDs to colors
3. CSS custom properties on sections read by JS

**Decision**: Data attributes (Option 1)

**Rationale**: Configuration lives in the HTML where sections are defined. Adding a new section means adding data attributes to the element — no separate config file to maintain. The observer reads attributes directly from the intersecting element.

**Trade-offs**:
- ✅ Gained: Configuration co-located with content, no separate mapping to maintain
- ❌ Lost: Slightly verbose HTML (4 data attributes per section)
- ⚠️ Risk: None significant

### Decision 2: CSS-First Textures Over Canvas/SVG Filters

**Options Considered**:
1. CSS patterns (`repeating-linear-gradient`, `background-image` with SVG data URIs)
2. SVG `<filter>` elements (`feTurbulence` for noise)
3. Canvas-generated textures

**Decision**: CSS patterns (Option 1)

**Rationale**: SVG data URIs as background-image are consistent across browsers. `feTurbulence` has rendering inconsistencies (Sparky confirmed). Canvas is overkill for static textures. CSS patterns are GPU-composited and performant.

**Trade-offs**:
- ✅ Gained: Cross-browser consistency, no JS dependency, GPU compositing
- ❌ Lost: Less dynamic (can't animate texture parameters)
- ⚠️ Risk: Some patterns (diamond lattice) may not be achievable in pure CSS — fallback to SVG asset

### Decision 3: Phased Implementation with Named Checkpoints

**Options Considered**:
1. Flat task list (all sections in one sequence)
2. Named phases with acceptance criteria (Sparky's recommendation)
3. Separate sub-specs per section

**Decision**: Named phases (Option 2)

**Rationale**: "Simple × 8 is still significant volume." Named phases provide natural review checkpoints without the overhead of separate specs. Each phase has clear "done when" criteria. Phases are checkpoints, not blockers — momentum isn't interrupted if things are flowing.

**Trade-offs**:
- ✅ Gained: Natural review points, clear progress markers, isolated feedback per section
- ❌ Lost: Slightly more structure than a flat list
- ⚠️ Risk: If phases are treated as hard gates, they slow momentum. Mitigation: explicitly documented as soft checkpoints.

### Decision 4: Explicit Icon Over Automatic

**Options Considered**:
1. Auto-render external-link icon when `target="_blank"` is set
2. Explicit `icon` + `iconPosition` props (existing API)

**Decision**: Explicit (Option 2)

**Rationale**: Uses existing Button-CTA API. No hidden behavior. Product controls exactly when the icon appears. Only 4 instances in the entire portfolio — repetition is minimal.

**Trade-offs**:
- ✅ Gained: No hidden behavior, uses existing API, easy to override
- ❌ Lost: Slightly more verbose per instance (4 instances total)
- ⚠️ Risk: None

---

## Platform Considerations

### Web (Primary — this spec)
- Shadow DOM: Not used for product-level sections (only for DesignerPunk components)
- CSS Grid for section layouts, Flexbox for component-level alignment
- `backdrop-filter` for frosted glass (How Built section) — Safari requires `-webkit-` prefix
- `mix-blend-mode` for code screenshots and textures — well-supported
- Intersection Observer: supported in all modern browsers (no polyfill needed)

### iOS / Android (Not in scope)
This is a web-only product (portfolio site). No native platform considerations.

---
