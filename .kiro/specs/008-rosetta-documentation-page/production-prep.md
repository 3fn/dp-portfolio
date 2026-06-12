# Production Prep: Spec 008 — Rosetta Documentation Page

**Date**: 2026-06-12
**Author**: Leonardo (Product Architect)
**Status**: Ready for Peter Review
**Prototype**: `docs/specs/staticReview/rosetta-docs-prototype.html`
**Color Strategy**: Committed (cyan carries 30-60% of color weight — this is Rosetta's page)

---

## 1. Experience Map Entry

File: `product/experience-map/pages/docs/rosetta.yaml`

```yaml
name: rosetta-documentation
type: documentation-page
tags: [documentation, rosetta, token-system, architecture, scroll-driven, visualization]
status:
  spec: requirements-phase
  web: not-started
  ios: not-applicable
  android: not-applicable

ux-direction: |
  Deep-dive documentation page for the Rosetta token system. Tells the story of
  why the architecture exists, what problems it solves, and what it enables.
  Three-column scroll-driven layout: nav rail (left), narrative (center), sticky visualization (right).
  Narrative progresses through 4 beats: Problem → Principle → Architecture → Payoff.
  Desktop-priority with single-column collapse at tablet/mobile.

audience:
  primary: Design systems practitioners and technical evaluators assessing architectural rigor
  secondary: Hiring managers / technical leads evaluating Peter's systems thinking
  assumes: Baseline design systems literacy (knows what tokens are)

visual-reference: docs/specs/staticReview/rosetta-docs-prototype.html
visual-reference-note: |
  The prototype is the visual/behavioral source of truth for appearance and interaction feel.
  Production implementation rebuilds with system tokens, semantic HTML, and accessibility layer.
  Where prototype and spec conflict, spec takes precedence.

sections:
  - id: intro
    name: Introduction
    beat: 0
    description: Context-setting — AI challenges, naming convention instincts, Rosetta's response
    min-height: 80vh
    
  - id: beat-problem
    name: The Problem
    beat: 1
    description: Four failure modes without deliberate architecture (drift, arbitrariness, platform divergence, missing audit trail)
    min-height: 80vh
    viz-state: Scattered red nodes — chaos/failure visualization

  - id: beat-principle
    name: The Principle
    beat: 2
    description: "Every value declares why it exists" — formula-based, perceptual, categorical, compositional, referential origins
    min-height: 80vh
    viz-state: Tiered nodes showing primitive → semantic → component layers

  - id: beat-architecture
    name: The Architecture
    beat: 3
    description: Six-stage pipeline — Define → Validate → Registry → Resolve → Generate → Output
    min-height: 80vh
    viz-state: Vertical pipeline nodes with sequential connections

  - id: beat-payoff
    name: The Payoff
    beat: 4
    description: Portable pipeline, theme architecture, governance, AI queryability. Data narrative (768 → 3,000+).
    min-height: 80vh
    viz-state: Fan-out from single source to 5 platform outputs

interaction-specs:
  scroll-driven: true
  nav-rail-expand: "80px → 260px on hover, 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
  viz-transitions: "Node position 0.6s, radius 0.5s, stroke color 0.5s"
  tooltips: "Hover (desktop), tap-toggle (mobile), keyboard-focusable"
  url-hash: "Deep links to each beat, sets viz state on load"
  responsive-collapse: "≤1023px → single-column, nav hidden, viz static or hidden"
```

---

## 2. Component Selection

This page is predominantly **custom layout** — it does not consume DesignerPunk Web Components for its primary content. The page's unique three-column scroll-driven architecture, custom nav rail, and SVG visualization are all bespoke implementations.

### System Components Consumed

| Element | Component | Rationale |
|---------|-----------|-----------|
| **None directly** | — | Nav rail is custom (not Nav-TabBar or Nav-SegmentedChoice — it's a vertical scroll-position-tracking rail specific to this page) |

### System Tokens Consumed (Not Components)

The page consumes DesignerPunk tokens extensively:
- **Typography**: `--font-family-body`, `--font-family-display`, `--font-family-mono`
- **Colors**: `--black-100` through `--black-300`, `--gray-100`, `--gray-300`, `--white-100`, `--cyan-200` (accent)
- **Spacing**: Various `--space-*` tokens for padding, gaps, margins

### Why No Nav Components

The nav rail is NOT a standard navigation pattern. It's:
- Vertical (not horizontal)
- Collapse/expand on hover (not tap)
- Scroll-position-tracked (not route-based)
- Specific to this page's beat structure

No existing component (Nav-Header-App, Nav-TabBar-Base, Nav-SegmentedChoice-Base) fits this use case. This is correctly a custom implementation.

### Shared Portfolio Patterns

- **Back link** (`← designerpunk.ai`) — same pattern as would be used across docs pages. Candidate for extraction once Stemma/Civitas pages exist.
- **Skip link** — standard accessibility pattern, not component-wrapped.

---

## 3. Visual Reference Resolution — Decisions for Peter

Each row is a visual decision from the prototype. **Confirm** = keep as-is and map to tokens. **Correct** = change direction.

### Colors

| # | Decision | Prototype Value | Token Resolution | Status |
|---|----------|----------------|------------------|--------|
| 1 | Rosetta accent color | `#80F6FF` | `cyan200` (exact match — system primitive) | ✅ Confirm — ref to system |
| 2 | Viz panel background | `#0d0d1a` | Needs product token — `rgba(13,13,26,1)` is darker than `black400` (rgba 6,6,10) but with blue tint. Not in system. | ⚠️ **Decision needed**: Use `black400` (close) or keep novel value with OKLCH equivalent? |
| 3 | Node glow shadow | `rgba(128,246,255,0.4)` | Product token referencing `cyan200` at `opacity040` — composition | ✅ Confirm — product token (composite) |
| 4 | Tooltip background | `rgba(13,13,26,0.97)` | Same base as viz panel + near-opaque. Product token. | ✅ Confirm — product token |
| 5 | Connection line color | `rgba(128,246,255,0.2)` | Product token: `cyan200` at `opacity020` | ✅ Confirm — product token (composite) |
| 6 | Error/problem node color | `rgba(255,90,90,0.8)` | No system red at this value. Product token for viz-specific color. | ✅ Confirm — product token with rationale |
| 7 | Stemma reference (green) | `#80FFBB` | `green300` — verify against system. Used only in Beat 2 cross-reference nodes. | ⚠️ **Verify**: Is this `green300` exact? |
| 8 | Civitas reference (yellow) | `#FCF680` | `yellow300` — verify against system. Used only for governance cross-references. | ⚠️ **Verify**: Is this `yellow300` exact? |

### Spacing

| # | Decision | Prototype Value | Token Resolution | Status |
|---|----------|----------------|------------------|--------|
| 9 | Nav rail collapsed width | `80px` | `space800` × 1.25 = 80. Exactly `base × 10`. Product token (no primitive at 80). | ✅ Confirm — product token |
| 10 | Nav rail expanded width | `260px` | No system token. Product token with rationale (content width). | ✅ Confirm — product token |
| 11 | Narrative padding (inline) | `64px` | `space800` = 64. System primitive. | ✅ Confirm — use `space800` |
| 12 | Narrative padding (block-start) | `80px` | Same as nav rail width. Product token (or `base × 10`). | ✅ Confirm — product token (reuse navRailWidth) |
| 13 | Beat vertical spacing | `160px` | `space800` × 2.5 = 160. `base × 20`. Product token. | ✅ Confirm — product token |
| 14 | Narrative max-width | `680px` | Product token — optimized for readable prose width. | ✅ Confirm — product token |

### Typography

| # | Decision | Prototype Value | Token Resolution | Status |
|---|----------|----------------|------------------|--------|
| 15 | Beat label (uppercase mono) | `11px / 0.08em tracking` | System `fontSize050` (11px) + existing product token `letterSpacingWide` (0.08em) | ✅ Confirm — system + existing product |
| 16 | Beat title | `32px / Rajdhani 700` | System `fontSize500` (28px) or `fontSize600` (35px). 32px is between them. | ⚠️ **Decision needed**: Snap to `fontSize600` (35px) or keep 32px as product token? |
| 17 | Body text | `16px / 1.7 line-height` | System `fontSize200` (16px). Line-height 1.7 may need product token (system `lineHeight200` = 1.5). | ⚠️ **Decision needed**: Is 1.7 intentional (more generous for long-form reading)? |
| 18 | Page title (h1) | `48px / Rajdhani 700` | System `fontSize700` (42px). 48px exceeds system ceiling. | ⚠️ **Decision needed**: Snap to `fontSize700` or product token? |
| 19 | Viz node labels | `9px / monospace` | Below system minimum (`fontSize050` = 11px). Context: SVG labels, not body text. | ✅ Confirm — SVG-internal, not governed by text scale |

### Motion

| # | Decision | Prototype Value | Token Resolution | Status |
|---|----------|----------------|------------------|--------|
| 20 | Nav rail expand | `0.2s cubic-bezier(0.4, 0, 0.2, 1)` | Duration: between `duration150` (150ms) and `duration250` (250ms). Easing: same as `flipEasing`. | ⚠️ **Decision needed**: Snap to `duration150` or `duration250`? (200ms tolerance ±20ms → duration150 too low, duration250 within tolerance) |
| 21 | Node position transition | `0.6s ease` | 600ms exceeds `duration350` (350ms). Product token needed — longer for visual drama. | ✅ Confirm — product token |
| 22 | Node radius/stroke | `0.5s ease` | 500ms exceeds `duration350`. Product token needed. | ✅ Confirm — product token |
| 23 | Label fade in/out | `scroll-driven (not time-based)` | N/A — opacity interpolated from scroll position, not CSS transition duration. | ✅ N/A — scroll-driven |

### Dark Viz Panel

| # | Decision | Prototype Value | Token Resolution | Status |
|---|----------|----------------|------------------|--------|
| 24 | Panel takes full grid column | `1fr` of three-column grid | Structural — no token needed. | ✅ Confirm |
| 25 | Panel is sticky full viewport height | `position: sticky; height: 100vh` | Structural — no token needed. | ✅ Confirm |
| 26 | SVG viewBox | `400 × 600` | Content-specific. Not tokenized. | ✅ Confirm |

---

## 4. Interaction Specs

### 4.1 Scroll Behavior

```yaml
scroll-tracking:
  mechanism: IntersectionObserver or getBoundingClientRect on rAF
  threshold: "Beat is 'active' when its top < 50vh AND bottom > 30vh"
  effects:
    - Nav rail active state updates
    - Visualization transitions to corresponding state
    - Label opacity interpolation (20% → full → fade at 80%)
  
  performance-budget:
    target: "≥30 FPS on baseline devices"
    degradation: "Skip label opacity interpolation first, then reduce transition durations"

url-hash:
  on-load: "Parse hash → scroll to beat → set viz state"
  on-scroll: "Do NOT update hash during scroll (noisy history)"
  on-nav-click: "Update hash via pushState"
```

### 4.2 Hover / Focus States

```yaml
nav-rail:
  collapsed:
    width: 80px (product token: navRailCollapsed)
    shows: dots + numbers only
  expanded:
    trigger: ":hover on .nav-rail container"
    width: 260px (product token: navRailExpanded)
    transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
    shows: dots + numbers + beat labels (labels opacity 0→1, 0.15s)
    shadow: "4px 0 24px rgba(0,0,0,0.08)"
  active-item:
    color: cyan200
    dot: "filled cyan200 + 8px glow (box-shadow)"
  focus:
    style: "Standard focus ring on nav links"
    keyboard: "Tab to reach nav, arrow keys between items, Enter/Space to activate"
    aria: "aria-current='true' on active beat link"

viz-nodes:
  hover:
    trigger: "mousemove proximity detection (24px minimum hit target)"
    effect: "circle.active class — glow filter + thicker stroke (2.5px)"
    tooltip: "Appears at cursor position + 16px offset"
  focus:
    trigger: "Tab to focusable nodes (tabindex='0' on circles)"
    effect: Same as hover
    tooltip: Same as hover (sighted keyboard support)
  tap-mobile:
    first-tap: Show tooltip
    same-node-tap: Dismiss
    different-node-tap: Switch tooltip
    empty-tap: Dismiss

tooltip:
  position: "Fixed, cursor-following (desktop). Centered below node (mobile)."
  border-color: "Inherits from hovered node's stroke color"
  dismiss-on-scroll: true
  max-width: 300px (product token candidate or reuse existing)
  content-structure: "title (mono bold cyan) | problem (muted + separator) | solution (emphasized)"
```

### 4.3 Transitions

```yaml
viz-state-change:
  trigger: "Scroll crosses beat boundary"
  node-position: "transform: translate(x, y) — 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
  node-radius: "r attribute — 0.5s ease"
  node-stroke: "stroke attribute — 0.5s ease"
  node-opacity: "0→1 for appearing, 1→0 for disappearing — 0.4s ease"
  connections: "Redrawn immediately (no transition — lines are replaced, not morphed)"
  beat4-draw-on: "stroke-dashoffset animation on connection lines"
  
  reduced-motion:
    all-transitions: "duration: 0s"
    viz-shows: "Final state of current beat immediately"
    labels: "Full opacity always"
    nav-rail: "Instant width change (no transition)"
```

### 4.4 Responsive Breakpoints

```yaml
breakpoints:
  desktop:
    range: "≥1024px"
    layout: "grid-template-columns: 80px 1fr 1fr"
    nav-rail: visible, sticky, expandable
    visualization: sticky, full-height, interactive
    narrative: "padding 80px 64px 120px 64px, max-width 680px"

  tablet-and-below:
    range: "<1024px"
    layout: "grid-template-columns: 1fr (single column)"
    nav-rail: hidden (display: none)
    visualization: "position: relative, height: 50vh, order: -1 (above narrative), static SVG"
    narrative: "padding 48px 32px, max-width: none"
    beat-spacing: "margin-bottom: 80px (reduced from 160px)"
    tooltips: "tap-toggle only"

  print:
    nav-rail: hidden
    visualization: hidden
    narrative: "single readable column, no max-width constraint"
    
  ultra-wide:
    range: ">2000px"
    svg: "preserveAspectRatio='xMidYMid meet' prevents stretching"
```

---

## 5. Product Token Candidates

Based on the prototype audit, ~14 tokens needed. Organized by category per Product-Token-Governance format.

### Layout Tokens (`product/tokens/layout.yaml` — additions)

| Token Name | Type | Value/Ref | Rationale |
|-----------|------|-----------|-----------|
| `navRailCollapsed` | value | 80 | `base × 10 = 80`. Accommodates dot (8px) + number (18px) + padding. No system token at 80. Exceeds space800 (64). |
| `navRailExpanded` | value | 260 | Content-driven: fits "The Architecture" label + dot + number + padding. No system token in range. |
| `docsNarrativeMaxWidth` | value | 680 | Optimized for 70-80 characters per line at 16px body in Figtree. Distinct from portfolio's `contentMaxWidth` (1336) — this is a prose column, not a full-width content area. |
| `docsBeatSpacing` | value | 160 | `base × 20`. Creates dramatic sectioning between beats for scroll-driven pacing. No system token at 160 (space800 = 64 is highest primitive). |
| `docsNarrativePaddingBlock` | ref | space800 | 64px block-start padding for narrative column. Matches nav rail clearance. |
| `docsVizTooltipMaxWidth` | value | 300 | Wider than portfolio tooltips (270px, 260px) — viz tooltips have denser content (problem + solution format). |

### Motion Tokens (`product/tokens/motion.yaml` — additions)

| Token Name | Type | Value/Ref | Rationale |
|-----------|------|-----------|-----------|
| `vizNodeTransition` | value | 600 | Longer than system max (duration350 = 350ms). Visual drama for scroll-driven scene changes — decorative, not functional UI. |
| `vizNodePropertyTransition` | value | 500 | Radius/stroke changes slightly faster than position for choreographic stagger. Beyond system max. |
| `navRailExpandDuration` | ref | duration250 | 200ms in prototype; duration250 (250ms) within ±50ms tolerance for >300ms rule — actually ≤300ms so ±20ms applies. 200ms is 50ms below duration250. **Decision**: snap to duration150 (150ms) which is within 50ms, or accept 250ms? |

### Color Tokens (`product/tokens/color.yaml` — additions)

| Token Name | Type | Value/Ref | Rationale |
|-----------|------|-----------|-----------|
| `vizPanelBg` | value | `oklch(0.09 0.02 270)` | Dark blue-tinted background for visualization panel. Closest system token is `black400` (rgba 6,6,10 → nearly pure dark). Prototype uses `#0d0d1a` which has a deliberate blue undertone (hue 240°) for depth against pure black text areas. Two-gate: (1) No system dark with blue tint. (2) Not a brand color — visualization-specific. |
| `vizTooltipBg` | value | `oklch(0.09 0.02 270 / 0.97)` | Same base as panel at 97% opacity. Near-opaque for readability over SVG content. Separate token for semantic clarity (tooltip vs panel). |
| `vizProblemNode` | value | `oklch(0.65 0.2 25)` | Warm red for "problem" nodes in Beat 1. No system red exists in primitives. Visualization-specific — not error state (which would use `color.feedback.error`). Two-gate: (1) No system red primitive. (2) Not a brand color — narrative-specific. |
| `vizConnectionLine` | ref | cyan200 | Connection line color at 20% opacity. Applied via CSS as `oklch(from var(--cyan-200) l c h / 0.2)`. |
| `vizNodeGlow` | ref | cyan200 | Glow effect color at 40% opacity. Applied via CSS filter. |

### Typography Tokens (`product/tokens/typography.yaml` — potential additions)

| Token Name | Type | Value/Ref | Rationale |
|-----------|------|-----------|-----------|
| `docsLineHeightProse` | value | 1.7 | More generous than system `lineHeight200` (1.5). Intentional for long-form documentation reading comfort — validated typographic practice for extended prose. |

**Total: 14 tokens** (6 layout + 3 motion + 4 color + 1 typography)

---

## 6. Product MCP Update

### Additions to `product/overview.yaml`

```yaml
# Under "Active Specs" — add:
- Spec 008: Rosetta Documentation Page — requirements-phase

# Under "Key Characteristics" — add:
- Deep-dive documentation pages with scroll-driven visualization (Rosetta first, Stemma/Civitas future)

# Under "type" — update:
type: Multi-page site (portfolio index + documentation deep-dives)
```

### Structural Changes Needed

The `overview.yaml` currently says `type: Single-page scroll-based website`. With Spec 008, DP-Portfolio becomes multi-page. The overview should reflect:

1. **Type update**: `Single-page scroll-based website` → `Multi-page site with scroll-based portfolio index and documentation deep-dives`
2. **Pages list**: Add a `pages` section listing active URLs:
   ```yaml
   pages:
     - path: /
       name: Portfolio Index
       status: implementation-active (Spec 007)
     - path: /docs/rosetta
       name: Rosetta Documentation
       status: requirements-phase (Spec 008)
   ```
3. **Spec 008 entry** in Active Specs section
4. **Nav note**: Currently no shared nav between pages (standalone pages linked from index). This will change when Stemma/Civitas pages exist.

---

## Decisions Requiring Peter's Input

Summarized from Section 3 for quick review:

| # | Question | Options | Leonardo's Recommendation |
|---|----------|---------|--------------------------|
| 2 | Viz panel background | (A) Snap to `black400` (B) Keep `#0d0d1a` as product token | **B** — the blue tint is intentional design. Cyan accent on pure black is harsher than cyan on blue-dark. |
| 16 | Beat title font size | (A) `fontSize600` = 35px (B) Keep 32px as product token | **A** — snap to system. 35px vs 32px is within tolerance for heading scale. Less token debt. |
| 17 | Body line-height | (A) System `lineHeight200` = 1.5 (B) Product token at 1.7 | **B** — 1.7 is correct for long-form documentation. Prose reading comfort > consistency with short-form UI text. |
| 18 | Page title (h1) | (A) `fontSize700` = 42px (B) Product token at 48px | **Lean A** — 42px is substantial. But 48px matches portfolio hero sub-heading scale. Either works. |
| 20 | Nav rail duration | (A) `duration150` = 150ms (B) `duration250` = 250ms (C) Product token at 200ms | **B** — 250ms feels natural for a reveal. 150ms might feel abrupt for a width expansion. |
| 7-8 | Green/Yellow system colors | Verify `#80FFBB` = `green300` and `#FCF680` = `yellow300` | Need Ada verification — these are system color associations, should use exact system primitives. |

---

## Counter-Argument

This prep assumes the page stays as a three-column layout with sticky viz. The strongest argument against: **the visualization adds significant implementation complexity for what is ultimately decorative reinforcement** (the narrative stands alone per Req 5). A simpler two-column (nav + narrative) page with inline static illustrations per beat would ship faster and be more maintainable.

**Why I still recommend the full approach**: This page is a portfolio artifact. The scroll-driven visualization demonstrates the kind of considered, detail-oriented engineering that the page's *content* describes. The medium is the message. But if timeline pressure emerges, the viz column can be descoped to static SVGs without touching the narrative or nav rail.
