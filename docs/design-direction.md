# DesignerPunk Portfolio — Design Direction v4

**Date**: 2026-05-20
**Revised**: 2026-05-21
**Author**: Leonardo (drafted), Peter (final authority)
**Purpose**: Source of truth for aesthetic decisions, color strategy, typography, visual motifs, and layout philosophy. Feeds section briefs and Application MCP updates.
**Status**: DRAFT — in active refinement

---

## Design Philosophy

**Bold, direct, personal, and unapologetic.**

This is not a corporate design system showcase. It's a portfolio that demonstrates craft through its own execution — the site *is* the proof. The aesthetic communicates: "I built something serious, and I'm not afraid to have a personality while doing it."

Key principles:
- **Light-dominant canvas with dark, contrasting content** — the page lives on light backgrounds, with mid-tone sections used sparingly for contrast rhythm
- **Pink/magenta as brand signal** — `color.action.primary` (pink300) is the through-line across all interactive and accent elements
- **Confidence through scale** — large display type, bold stat numbers, generous whitespace between sections
- **Personality through voice** — easter eggs, casual profanity, first-person narrative, illustrated portraits
- **Craft through texture** — noise overlays, blend modes, halftone patterns, neon glows — the surface is never flat or sterile. Every section incorporates at least one of these elements.

---

## Color Strategy

### Dominant Mode: Light

The page defaults to light backgrounds. Most sections use `white100` through `white200` as their canvas. This creates:
- High contrast for dark text (`color.contrast.onLight`)
- Vibrant pop for accent colors (pink, cyan, purple)
- A "technical" / "white void" mood that aligns with the cyberpunk aesthetic counter to popular "AI startup" tropes

### Accent Hierarchy

| Role | Token | Primitive | Usage |
|------|-------|-----------|-------|
| Primary action / brand | `color.action.primary` | pink300 | CTAs, links, highlighted text, stat accents |
| Navigation accent | `color.action.navigation` | cyan500 | Nav links, name accent in bio |
| Easter egg / playful | — | neon glow tokens + flicker | "Because why not!?", "Hard $#@%ing work!" |
| Section differentiation | Primitive direct | varies | Noise texture, gradient treatments |

### Section Color Map

| Section | Background | Text | Accent |
|---------|-----------|------|--------|
| Navigation | Dark (black300) | onDark | — |
| Hero | Light (white100) | onLight | pink300 (CTA), illustration colors |
| Stats | Light (white100) with noise | onLight | pink300 (hero number), pink500 (hero label) |
| Why Build | Light (white100) | onLight/default | green100 (easter egg) |
| Ecosystem | Light (white100) | onLight/default | Illustration colors (purple, cyan, teal) |
| How Built | Light (white200) | onLight | pink300 (Opus/Kiro callouts) |
| Enterprise-grade | Light (white100) | onLight/default | — |
| Code Screenshots | Light (white100) | — | HTML/CSS panels on dark backgrounds |
| Who Built | Light (white100) | onLight | pink300 (name) |
| Agents | Light (white100) with noise | onLight | Illustrated portraits |
| CTA | Light (white100) with offset image (dark) | onLight with onDark over image section | pink300 (LinkedIn CTA) |
| Footer | Dark (black500) | onDark | — |

### Color Rules

1. **Never use pink on pink backgrounds** — pink is an accent on dark or neutral, not a fill-on-fill
2. **Dark sections get `color.contrast.onDark`** for all body text — no gray text on dark backgrounds
3. **Light sections use `color.text.default`** (black100) for body, `color.contrast.onLight` (black300) for headings
4. **Easter eggs use neon glow tokens** — `glow.neonGreen` for "Because why not!?", `glow.neonPink` for "Hard $#@%ing work!"
5. **Gradients are semantic** — purple300→pink200 for freelance design, pink300→purple200 for employer design, white200→black200 for freelance engineering, white300→black300 for employer engineering (career timeline bars)

---

## Typography

### Font Roles

| Role | Family | Token Family | Usage |
|------|--------|-------------|-------|
| Display / Headings | Rajdhani | `fontFamilyDisplay` | Section headings, hero headline, stat numbers, featured quotes |
| Body / UI | Figtree | `fontFamilyBody` | Paragraphs, card content, labels, buttons, nav links |
| Code | Commit Mono | `fontFamilyMono` | Code references (minimal in this page) |

### Type Scale Usage

| Element | Semantic Token | Notes |
|---------|---------------|-------|
| Hero headline | `typography.h1` | "The design system built for AI-Human collaboration" |
| Section headings | `typography.h2` | With `//` prefix pattern |
| Card headings | `typography.h4` | "Challenge", "Insight", etc. |
| Featured quote text | `typography.h3` or custom | "DesignerPunk was built using..." block |
| Body paragraphs | `typography.bodyMd` | Standard content |
| Stat numbers | `typography.display` | The large "217", "193" etc. |
| Stat labels | `typography.labelSm` | "Primitive tokens", "Semantic tokens" — uses gray300 for AA compliance at 14px |
| Nav links | `typography.labelMd` | "About", "GitHub", "LinkedIn" |
| Button labels | `typography.buttonMd` | CTA text |
| Footer text | `typography.bodySm` | Copyright, email |

### Typography Rules

1. **Section headings always use the `//` prefix** — rendered as a decorative span with `aria-hidden="true"`, absolutely positioned outside the title copy so all copy aligns to the same edge
2. **Display font (Rajdhani) is for headings and numbers only** — never for body text
3. **Bold (fontWeight700) is reserved for headings and featured text** — body stays at 400
4. **Pink-colored text uses `color.action.primary`** — for emphasis words within headings ("AI-Human collaboration", "Opus 4.7", "Kiro IDE and CLI")

---

## Visual Motifs

### Background Noise

Single noise variant used across the site. Applied to stats bar and agents sections.
- Type: Mono
- Size: 1×1
- Density: 70%
- Color: black (#000000) at 24% opacity
- Effect: creates a perceived mid-tone on white100 backgrounds without changing the actual background color
- Implementation: CSS or SVG-based pattern overlay

### Neon Flicker

CSS keyframe animation for easter egg text.
- "Because why not!?" — uses `glow.neonGreen`
- "Hard $#@%ing work!" — uses `glow.neonPink`
- Intermittent opacity flicker (simulates neon sign)
- Disabled under `prefers-reduced-motion`

### Blend Mode Compositions

- **Hero**: Chord diagram canvas layered over illustration with `mix-blend-mode: hard-light` — chord canvas must have transparent background for blend to work
- **Code screenshots**: If using image-based approach, `mix-blend-mode: multiply` for tinted integration

### Illustrated Portraits

Custom illustrated artwork (not generated, not stock).
- Hero: cyberpunk figure with pink/magenta burst (`systemIllustration.svg` or similar)
- Agents: three group portraits by tier — `agentPortrait-system-core.svg`, `agentPortrait-system-implementation.svg`, `agentPortrait-system-product.svg`
- These are **assets**, not something the system generates

### Gradient Treatments

- Career timeline bars: semantic gradients (see Color Rules #5)
- Career timeline bars also receive the background noise texture
- Never flat solid colors on large areas — always slight gradient or texture

---

## Layout Philosophy

### Page Structure

Single-page vertical scroll. Full-bleed sections with constrained content columns.

- **Full-bleed**: section backgrounds extend edge-to-edge
- **Content column**: max-width constrained (1336px), centered with auto margins
- **Grid**: CSS Grid with responsive column counts (4-col → 2-col → 1-col)

### Responsive Strategy

- **Desktop-first** design (this is a portfolio, not a mobile app)
- **sm (≤1023px)**: Multi-column grids reduce (4→2, 3→2)
- **xs (≤767px)**: Everything stacks single-column
- **Stats bar**: Wraps to 2-row grid on mobile
- **Career timeline**: Horizontal scroll or simplified view on mobile

### Spacing Between Sections

Generous vertical padding between sections, but **varied intentionally** to create rhythm:
- **128px** before major conceptual shifts (Ecosystem, How Built)
- **120px** before narrative openers (Why Build)
- **96px** for standard content sections
- **56px** for subordinate sections (Special Thanks)
- **20–32px** for data strips (Stats bar)

Start with these values during exploration. Formalize as semantic tokens if the pattern holds.

### Button Interaction

CTAs use a subtle lift on hover:
- `transform: translateY(-1px)` on hover
- `opacity: 0.9` on hover
- `transition: transform 0.1s, opacity 0.15s`

This gives buttons physicality without being distracting. Applies to both primary and secondary variants.

---

## Section-Level Guidance

### Navigation
- Dark background (black300)
- Logo lockup left, links right (About, GitHub, LinkedIn)
- Sticky/fixed positioning
- "About" links to existing About implementation (needs reskin to v4 direction)

### Hero
- Light background (white100)
- Split layout: text left, illustration right (roughly 50/50 at desktop)
- Two CTAs: primary (pink, "Explore the ideas") + secondary (outlined, "Investigate the code")
- Illustration is a placed SVG asset
- Chord diagram canvas layered over illustration with Hard Light blend mode — canvas background must be transparent
- Chord is interactive (drag-to-rotate, hover-to-pause with tooltips)

### Stats Bar
- Light background (white100) with background noise overlay (mono, 70% density, black at 24%)
- 1px gray300 border on top and bottom, extending to grid margins (not full-bleed)
- "1 Human" as oversized display number — pink300 number, pink500 label
- 10 stats: black300 numbers (`typography.display`), gray300 labels (`typography.labelSm`)
- Count-up animation on scroll-reveal

### Why Build
- Light background (white100)
- Easter egg above heading ("Because why not!?" with `glow.neonGreen` flicker)
- `//` prefix on section heading
- Four cards in a row: Challenge, Insight, Approach, Goals
- Card treatment: border under each card title + vertical dividers between cards. No backgrounds, no shadows.

### Ecosystem
- Light background (white100)
- 3D cube illustration (asset — `systemIllustration.svg` or similar) centered
- Three labeled callouts using `header-civitas.svg`, `header-rosetta.svg`, `header-stemma.svg`
- Each callout has styled name + brief description
- **Interaction (Option B)**: hovering a system highlights connection lines to other systems with relationship descriptions
- **Experiment (Option C)**: CSS 3D face-focus as side exploration — may replace B if viable

### How Built
- Light background (white200) — slightly differentiated from surrounding sections
- Easter egg ("Hard $#@%ing work!" with `glow.neonPink` flicker)
- `//` prefix on section heading
- Featured bold text block (left column, large type) — "DesignerPunk was built using multiple Claude models..."
- Supporting narrative text (right column, body type)
- Pink-colored emphasis on key terms ("Opus 4.7", "Kiro IDE and CLI")

### Enterprise-grade
- Light background (white100)
- `//` prefix on section heading
- 2×3 grid of capability descriptions
- Each: bold heading + body paragraph
- No card treatment — clean typographic layout

### Code Screenshots
- Light background (white100)
- 4 panels in a row showing directory structures / file listings
- **Built as HTML/CSS** (not SVG images) for maintainability and content updates
- Panels have dark backgrounds with colored syntax — self-contained visual elements
- Responsive: likely 2×2 at tablet, stacked at mobile

### Who Built
- Light background (white100)
- Peter's name in pink300, title in standard dark text
- Employer badges (pill-shaped, dark fill with light text)
- Career timeline: canvas-based, reskinned for light background, noise texture on gradient bars, interactive (hover tooltips preserved)
- Career timeline inlined as page script (not iframe)

### Agents
- Light background (white100) with background noise overlay
- Three group portrait SVGs displayed in a row
- Three-column layout below portraits: "Design system agents" / "Product system agents" / "Product implementation agents"
- Each column lists agent names with role and brief description

### CTA
- Light background (white100) with offset dark image element
- Value proposition text (left) + featured text block (right): "Problem solve with vision. Build with collaboration. Lead by example."
- Pink-colored emphasis on action words
- Two CTAs: LinkedIn (pink primary) + GitHub (outlined secondary)

### Footer
- Dark background (black500)
- Logo lockup + Peter's name + email
- Minimal — closes the page cleanly

---

## Interactive Elements Summary

| Element | Technology | Location | Key Behavior |
|---------|-----------|----------|--------------|
| Chord diagram | Canvas 2D | Hero (overlay) | Drag-rotate, hover-pause, tooltips, transparent bg + Hard Light blend |
| Career timeline | Canvas 2D | Who Built | Hover tooltips, animated entrance, noise-textured bars |
| Ecosystem cube | CSS/SVG | Ecosystem | Option B: hover highlights connections. Option C experiment: 3D face rotation |
| Stats count-up | JS + Intersection Observer | Stats | Numbers animate from 0 on scroll-reveal |
| Scroll-reveal | CSS + Intersection Observer | All sections | Fade/slide entrance, staggered, reduced-motion aware |
| Neon flicker | CSS keyframes | Easter eggs | Intermittent glow, reduced-motion disabled |

---

## Deliverable Format for Section Briefs

When we begin section-by-section work, each brief from Leonardo to Sparky will include:

1. **What's changing** from the current implementation
2. **Components** to use (from DesignerPunk library)
3. **Key tokens** (color, typography, spacing — semantic first)
4. **Layout** (grid structure, responsive behavior)
5. **Assets needed** (illustrations, images — what Peter provides)
6. **Accessibility notes** (aria attributes, reduced-motion, contrast)
7. **Watch-outs** (things that could go wrong or need special attention)

---

## Application MCP Updates Needed

Based on this direction, the following Application MCP content needs authoring:

| MCP Endpoint | Content to Author |
|-------------|-------------------|
| Design Philosophy | Bold, direct, personal, unapologetic — light-dominant with textured surfaces |
| Color Strategy | Light-dominant with pink accent hierarchy, section color map |
| Design Guidance (do/don't) | Pink usage rules, light section text rules, heading patterns, noise usage |
| Design Rules | Noise spec (70% density, 24% black), neon flicker constraints, blend mode usage |

These updates are a **system-level change** — they'd go through Ada (tokens) or the Application MCP content pipeline. Flagging for Peter's decision on timing.

---

## Token Updates Identified

| Token | Current Value | Proposed Update | Rationale |
|-------|--------------|-----------------|-----------|
| `white100` | `rgba(255, 255, 255, 1)` (#ffffff) | `rgba(254, 254, 254, 1)` (#fefefe) | Design intent per Peter |
| `typography.display` fontSize | `fontSize700` (42px) | ~48px | Hero headline needs more presence; current display size feels undersized at portfolio scale. Coordinate with Ada. |
| Section spacing | No semantic token | TBD after exploration | Patterns may emerge from section builds |

---

## Archive

Previous design direction (v3) archived at `docs/archive/design-direction-v3.md` for reference.
