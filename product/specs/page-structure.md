# DP-Portfolio — Page Structure Spec

**Date**: 2026-05-07
**Author**: Leonardo
**Status**: Draft — pending Peter review, then Thurgood formalization
**Phase**: Phase 1 (Desktop Launch)

---

## Token Specification Status

> **Incomplete.** This spec references token names but does not yet map design values from the mock to specific tokens. Individual section specs will provide precise token-to-value mappings. Expect the following gaps to be resolved during section-level spec work:
>
> - **Typography**: Large display sizes (stats numbers, Easter egg text, hero headline) likely exceed the current scale. New primitive and/or semantic tokens may be needed.
> - **Color**: Section-specific backgrounds (mint green, lavender, coral, dark teal) need mapping to existing primitives or creation of new ones. Semantic tokens for section backgrounds may be warranted for future dark mode support.
> - **Component tokens**: Custom elements (stats bar, chord diagram container, career timeline) may need component-level tokens for consistent styling.
> - **Font overrides**: Blocked on Ada's primitive override mechanism (Figtree body, Commit Mono mono).
>
> Token gap identification and creation requests will be routed to Ada as section specs are written.

---

## Overview

Single-page scroll-based portfolio site showcasing the DesignerPunk ecosystem. Desktop-priority, light default theme, heavy use of scroll-reveal animation, blend modes, and interactive data visualizations.

**Layout foundation**: `full-width-page` template — single content region spanning full grid width. Each section is a full-bleed container with its own background treatment, containing a max-width content column.

**Target breakpoint**: Desktop (md+ / 1024px+). Mobile is "good enough" stacking.

---

## Section Inventory

| # | Section | Background | Key Components | Complexity |
|---|---------|-----------|----------------|------------|
| 1 | Sticky Nav | Scroll-linked (matches current section) | Nav-Header-App, Button-VerticalList-Set, Icon-Base | High |
| 2 | Hero | Mint green | Button-CTA ×2, Icon-Base, chord diagram (canvas) | High |
| 3 | Stats Bar | White/light | Custom (count-up numbers) | Medium |
| 4 | Why Build | Mint green → textured transition | Container-Card-Base ×4 | Medium |
| 5 | Ecosystem | Lavender/pink | Custom (diagram + descriptions) | Medium |
| 6 | Agent Grid | Lavender/pink | Container-Card-Base ×3 columns | Low |
| 7 | Critical Features | Coral/orange border treatment | Container-Card-Base ×6 | Low |
| 8 | Code Screenshots | Red/orange halftone texture | Custom (blend-mode imagery) | Medium |
| 9 | How Was It Built | Dark/teal | Custom (two-column text layout) | Low |
| 10 | Special Thanks | Dark/teal, cyan border | Custom (credits grid) | Low |
| 11 | Who Built This | Dark | Badge-Label-Base ×10, career timeline (canvas) | High |
| 12 | CTA | Dark with imagery | Button-CTA ×2 | Medium |
| 13 | Footer | Dark | Custom (minimal) | Low |

---

## Shared Behaviors

### 1. Sticky Nav with Scroll-Linked Color

**Behavior**: Nav remains fixed at top of viewport. Background color transitions to match the primary background of the section currently in view.

**Implementation approach**:
- Hidden anchor points placed between sections define color transition zones
- As scroll position moves between anchors, nav background interpolates between the two section colors
- Transition should be smooth (CSS transition on background-color, ~150-200ms) to avoid jarring snaps during fast scroll
- Nav content (text, icons) must maintain contrast against all possible background colors — may need to swap between light/dark text

**Section color map** (nav background targets):

| Section | Nav Background |
|---------|---------------|
| Hero | Mint green (matches section) |
| Stats Bar | White |
| Why Build | Mint green |
| Ecosystem | Lavender/pink |
| Agent Grid | Lavender/pink |
| Critical Features | Light/warm |
| Code Screenshots | Red/orange |
| How Was It Built | Dark teal |
| Special Thanks | Dark teal |
| Who Built This | Near-black |
| CTA | Near-black |

**Accessibility**: Nav must remain operable regardless of background color. Ensure minimum 4.5:1 contrast ratio for nav text at all color states.

### 2. Scroll-Reveal Animations

**Behavior**: Sections and elements within sections animate into view as they enter the viewport.

**Implementation approach**:
- Intersection Observer API with threshold (e.g., 0.15 — trigger when 15% visible)
- CSS classes toggled on intersection: `.reveal-hidden` → `.reveal-visible`
- Animation types per element:
  - Sections: fade-in + slight upward translate (20-30px)
  - Stats numbers: count-up from 0 to target value
  - Cards: staggered fade-in (50-100ms delay between siblings)
  - Chord diagram: begins animation loop on intersection
- `prefers-reduced-motion`: disable all motion, show content immediately (Phase 4 WCAG, but wire the media query now)
- One-shot: elements reveal once and stay visible (no re-hide on scroll up)

### 3. Parallax & Section Transitions

**Behavior**: Subtle depth effects on scroll, textural transitions between sections.

**Implementation approach**:
- CSS `transform: translateY()` driven by scroll position (via Intersection Observer or scroll event with requestAnimationFrame)
- Halftone/texture overlays as pseudo-elements on section boundaries
- Parallax limited to decorative elements (backgrounds, textures) — never on content
- Performance budget: parallax elements use `will-change: transform` and are GPU-composited layers

### 4. Responsive Strategy

**Target**: Desktop-first (1024px+). Mobile stacking as fallback.

**Breakpoint behavior**:
- **Desktop (md+, 1024px+)**: Full multi-column layouts, all interactions active, data viz at full size
- **Tablet (sm, 768-1023px)**: Reduced columns (4-col → 2-col for "Why Build"), data viz scaled
- **Mobile (xs, <768px)**: Single column stack, simplified nav (no dropdown — just links), data viz either simplified or scrollable

**Key responsive decisions**:
- Stats bar: wraps from single row to 2×5 grid on mobile
- Why Build: 4 columns → 2×2 → single stack
- Agent Grid: 3 columns → single stack
- Critical Features: 2×3 → 2×2 → single stack
- Career timeline: horizontal scroll or simplified view on mobile
- Chord diagram: likely hidden or replaced with static image on mobile (canvas interaction requires pointer)

### 5. Easter Egg Interactions

**"Because why not!?"** (Why Build section):
- Hidden by default in the textured transition area above the section
- Revealed on hover over the transition zone
- Bold display typography, likely with blend mode or color treatment
- Mobile: not applicable (no hover) — either always visible or hidden entirely

**"Hard $#@%ing work!"** (How Was It Built section):
- Same pattern — hidden in transition zone above section, revealed on hover
- Mobile: same consideration

### 6. Outbound Links

All links that leave the site include a trailing outbound-link icon (via Icon-Base or Button-Icon) to signal external navigation. Applies to:
- "View the GitHub" (hero)
- "GitHub" (nav)
- "LinkedIn" (nav)
- "Peter on LinkedIn" (CTA section)
- "DesignerPunk on GitHub" (CTA section)

---

## Component Usage

### DesignerPunk Components (direct usage)

| Component | Usage | Props/Notes |
|-----------|-------|-------------|
| `Nav-Header-App` | Sticky nav scaffold | Custom slots: logo, platform icons, dropdown, external links |
| `Button-CTA` | Hero CTAs, CTA section buttons | `variant: "primary"` for GitHub links, `variant: "secondary"` for Learn more |
| `Button-Icon` | Outbound link indicator | Trailing icon inside or adjacent to CTA buttons |
| `Icon-Base` | Platform icons (web/iOS/Android), outbound arrow | Various icon names |
| `Container-Base` | Section wrappers | Full-bleed with internal max-width constraint |
| `Container-Card-Base` | Feature cards, Why Build columns, Agent Grid columns | Elevated card styling |
| `Badge-Label-Base` | Employer badges (Reddit, Venmo, PayPal, etc.) | `size: "sm"`, various labels |
| `Button-VerticalList-Set` | About dropdown menu items | Section anchor links |

### Custom/One-Off Elements

| Element | Description | Implementation Notes |
|---------|-------------|---------------------|
| Stats Bar | Metric numbers with labels, count-up animation | Custom HTML + CSS + JS counter |
| Chord Diagram | Interactive system architecture visualization | Existing canvas demo, refactored to DP tokens |
| Career Timeline | Design/engineering gradient over career history | Existing canvas demo, refactored to DP tokens |
| Credits Grid | Multi-column name list | CSS grid, no component needed |
| Code Screenshots | Blend-mode treated imagery | `<img>` with `mix-blend-mode` + halftone overlay |
| Section Textures | Halftone dots, geometric patterns | CSS pseudo-elements or background images |
| Easter Egg Reveals | Hover-triggered bold text | CSS `:hover` on parent container + opacity transition |
| About Dropdown | Section navigation popover | Custom popover (no DP component exists) |

---

## Dependencies

### Blocking (must resolve before build)

| Dependency | Owner | Description |
|-----------|-------|-------------|
| Font primitive override | Ada | Pipeline mechanism to swap fontFamilyBody → Figtree, fontFamilyMono → Commit Mono |

### Non-Blocking (can work around)

| Dependency | Owner | Description |
|-----------|-------|-------------|
| Nav-Header-App scaffold → production | Lina | Currently scaffold status; acceptable for this project but no tests |
| Dropdown/popover component | Lina | No existing component; will build custom for About nav |
| Link component | Lina | No existing component; using Button-CTA + Icon-Base as workaround |

---

## Token Usage Plan

### Typography
- `typography.h1` — Hero headline
- `typography.h2` — Section headings ("// Why build this system?")
- `typography.h3` — Card headings (Challenge, Insight, etc.)
- `typography.bodyMd` — Paragraph text
- `typography.bodySm` — Secondary text, captions
- `fontFamilyDisplay` (Rajdhani) — Stats numbers, section markers
- `fontFamilyBody` (Figtree, pending override) — All body text
- `fontFamilyMono` (Commit Mono, pending override) — Code references

### Spacing
- Section vertical padding: `space600` - `space800` range
- Content max-width: constrained (~1100-1200px)
- Card internal padding: `space.inset.normal`
- Grid gaps: `space200` - `space300`

### Color
- `color.action.primary` — CTA buttons, interactive accents (cyan)
- `color.structure.surface` — Light section backgrounds
- `color.contrast.onLight` / `color.contrast.onDark` — Text on respective backgrounds
- Section-specific backgrounds will likely use primitive color tokens directly (mint, lavender, coral, teal, near-black)

---

## Accessibility Baseline (Phase 1)

- Semantic HTML: proper heading hierarchy (h1 → h2 → h3), landmark regions, nav element
- All images: meaningful alt text or `aria-hidden` for decorative
- Interactive elements: keyboard accessible, visible focus indicators
- Color contrast: 4.5:1 minimum for text, 3:1 for large text and UI components
- Outbound links: indicated visually (icon) and programmatically (`rel="noopener"`, consider `aria-label` noting external)
- Skip-to-content link for keyboard users
- Canvas elements (chord diagram, career timeline): provide text alternative or `aria-label` describing the content

---

## Next Steps

1. **Peter review** — this document
2. **Thurgood formalization** — requirements.md → design.md → tasks.md
3. **Ada** — resolve font primitive override mechanism
4. **Individual section specs** — Hero, Career Timeline, and other complex sections. These will include precise token-to-value mappings and identify token creation needs.
5. **Ada** — create any new primitive/semantic tokens identified during section spec work
6. **Sparky** — begin implementation once specs are formalized and token dependencies are resolved
