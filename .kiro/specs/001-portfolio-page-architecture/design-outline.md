# Design Outline: Portfolio Page Architecture

**Date**: 2026-05-09
**Spec**: 001-portfolio-page-architecture
**Owner**: Leonardo → Sparky (page architecture), Lina (Button-CTA modification)
**Status**: Design Outline — pending Peter review
**Source material**: DraftFP08 full-page mock (top/middle/bottom), page-structure.md, Spec 000 completion

---

## Context

This is the "glue" spec — shared behaviors and section scaffolding that all subsequent section specs (Hero, Ecosystem, Career Timeline) depend on. It establishes the scroll-linked nav integration, reveal animation system, parallax infrastructure, responsive strategy, and builds out the simpler page sections that don't warrant their own specs.

**Prerequisite**: Spec 000 (Nav-Header-App Hardening) ✅ Complete — provides the hardened nav with `--nav-bg-override`, `--nav-glow-color`, `--nav-border-color` custom properties.

**What this spec does NOT include**: Hero chord diagram, Ecosystem 3D cube, Career Timeline canvas — those are Specs 002–004.

---

## Design Decisions

### Decision 1: Button-CTA Polymorphic Rendering

**Decision**: Add `href` prop to Button-CTA. When set, the component renders as `<a>` instead of `<button>`, preserving all visual styling.

**Rationale**:
- "Peter on LinkedIn" and "DesignerPunk on GitHub" CTAs navigate to external URLs — they must be `<a>` elements for correct semantics
- Screen readers announce links and buttons differently; keyboard behavior differs (Enter only vs Enter+Space)
- The visual treatment is identical to a button — same padding, typography, radius, colors
- No separate Link component needed; the portfolio has zero traditional inline text links

**Accessibility implications**:
- `<a>` with `href` gets link role automatically
- External links get `target="_blank"` + `rel="noopener noreferrer"`
- External links get trailing Icon-Base (external-link.svg) as visual affordance
- `aria-label` or visible text must indicate external navigation

**Counter-argument**: Polymorphic rendering adds complexity to Button-CTA's implementation and testing surface. Every existing test needs to verify both `<button>` and `<a>` rendering. Acceptable trade-off — the alternative (a separate Link component) is worse for a single visual pattern.

### Decision 2: Scroll-Linked Nav Color System

**Decision**: Product-level JavaScript uses Intersection Observer to detect which section is in view, then updates Nav-Header-App's three custom properties (`--nav-bg-override`, `--nav-glow-color`, `--nav-border-color`) to match the section's color palette.

**Rationale**:
- Nav-Header-App provides the hooks (Spec 000); this spec provides the intelligence
- Intersection Observer is performant (no scroll event listeners, no requestAnimationFrame polling)
- Color transitions use CSS `transition` on the nav element (~150ms) for smooth interpolation
- Each section defines its nav color set (background, glow, border)

**Section color map** (confirmed from Figma analysis `analysis/analysis-desktop-110`):

| Section | Nav Background | Primitive Token | Nav Glow | Nav Border | Text Mode |
|---------|---------------|-----------------|----------|------------|-----------|
| Hero | mint green | `green100` | `glow.neonGreen` | green400 | dark text |
| Stats Bar | light pink | `pink100` | `glow.neonPink` | pink400 | dark text |
| Why Build | mint green | `green100` | `glow.neonGreen` | green400 | dark text |
| Ecosystem | warm yellow | `yellow300` | `glow.neonPurple` | purple400 | dark text |
| Critical Features | coral/orange | `orange100` | `glow.neonPink` | pink400 | dark text |
| Code Screenshots | coral/orange | `orange300` | `glow.neonCyan` | cyan400 | light text |
| How Was It Built | dark teal | `teal200` | `glow.neonCyan` | cyan400 | light text |
| Who Built This | near-black | `black300` | `glow.neonCyan` | cyan400 | light text |
| CTA | mint green | `green100` | `glow.neonGreen` | green400 | dark text |
| Footer | black | `black500` | `glow.neonCyan` | cyan400 | light text |

**Glow rule**: Light sections → glow matches section color family. Dark sections (where section color would be invisible against itself) → `glow.neonCyan` as contrast accent. Threshold aligns with text mode swap.

**Open**: Exact border colors are preliminary — may need tuning during implementation.

### Decision 3: Scroll-Reveal Animation System

**Decision**: CSS-first reveal system using Intersection Observer to toggle classes. Elements start hidden (opacity 0, translateY 20px) and animate to visible on intersection.

**Rationale**:
- CSS transitions are GPU-composited and performant
- Intersection Observer fires once per element (one-shot — no re-hide on scroll up)
- Staggered reveals use CSS `transition-delay` on sibling elements
- `prefers-reduced-motion` disables all animation — elements render immediately visible

**Animation patterns**:
- **Section reveal**: fade-in + translateY(20px → 0), `duration250` (250ms), ease-out
- **Card stagger**: same animation, 75ms delay between siblings
- **Stats count-up**: JS-driven number interpolation from 0 to target, `duration500` (500ms)
- **One-shot**: `.reveal-hidden` → `.reveal-visible` class toggle, never reversed

### Decision 4: Page Layout Architecture

**Decision**: Full-bleed sections with internal max-width content columns. Each section is a full-viewport-width container with its own background treatment.

**Rationale**:
- Section backgrounds (mint, lavender, coral, dark) need to span full width
- Content within sections is constrained to `breakpointLg` (1440px) max-width with `space500` inline padding, centered
- This matches the `full-width-page` layout template pattern
- Sections stack vertically with no gap between them (backgrounds touch)

**Structure**:
```html
<body>
  <nav-header-app>...</nav-header-app>  <!-- sticky, z-index: navigation -->
  <main>
    <section class="hero">...</section>
    <section class="stats-bar">...</section>
    <section class="why-build">...</section>
    <section class="ecosystem">...</section>
    <!-- ... -->
    <footer>...</footer>
  </main>
</body>
```

**Content width**: `breakpointLg` (1440px) frame. Section padding varies — most content areas use `semanticSpace.inset.300` (space300) inline padding; some sections (Hero, Accomplish header) use `space800` (64px). The nav uses `navHeader.padding.inline` (space500). No single padding value applies universally.
```css
--content-max-width: var(--breakpoint-lg); /* 1440px */
/* Section padding varies — see individual visual profiles */
```

### Decision 5: Responsive Strategy (Desktop-First)

**Decision**: Build for 1024px+ first. Tablet and mobile use CSS-only column reduction and stacking. No separate mobile components or JS behavior changes.

**Rationale**:
- Portfolio is a hiring tool — desktop is the primary viewing context
- CSS Grid/Flexbox handles column reduction naturally with media queries
- Complex interactions (chord diagram, career timeline) are deferred to their own specs where mobile strategy is addressed
- Phase 2 (Mobile Refinement) handles the full mobile experience

**Grid system**: DesignerPunk defaults (12-col at md):

| Breakpoint | Columns | Gutter | Margin |
|-----------|---------|--------|--------|
| xs (<768px) | 4 | `gridGutterXs` (space200 / 16px) | `gridMarginXs` (space300 / 24px) |
| sm (768-1023px) | 8 | `gridGutterSm` (space250 / 20px) | `gridMarginSm` (space300 / 24px) |
| md (1024px+) | 12 | `gridGutterMd` (space300 / 24px) | `gridMarginMd` (space400 / 32px) |
| lg (1440px+) | 16 | `gridGutterLg` (space400 / 32px) | `gridMarginLg` (space500 / 40px) |

**Section column layouts at md (12-col)**:

| Section | Column Layout | Notes |
|---------|--------------|-------|
| Sticky Nav | 12 full | Space-between: logo left, links right |
| Hero | TBD | Deferred to Spec 002 |
| Stats | 3 + 9 | "1 Human" (3 cols) + stats grid (9 cols, 5×2 within) |
| Why Build | 4 × 3 cols | Four equal cards spanning full 12 |
| Ecosystem | TBD | Deferred to Spec 003 |
| Critical Features | 2 × 6 cols | Two cards per row, 3 rows |
| Code Screenshots | 2 × 6 cols | Two images per row |
| How Built (content) | 7 + 5 | Featured bold text (7) + supporting paragraphs (5) |
| How Built (credits) | 2 + 10 | "Special thanks to:" (2 cols) + names container (10 cols, internal flex with 4 fluid-width groups, min/max constrained) |
| Who Built This | TBD | Deferred to Spec 004 |
| Accomplish | 6 + 6 | Body text (left) + image/value props/CTAs (right) |
| Footer | 12 full | Space-between: logo left, contact right |

**Responsive reduction (preliminary)**:
- **sm (8-col)**: 4×3 → 2×4, 2×6 → stacked 8, 7+5 → stacked 8, 6+6 → stacked 8
- **xs (4-col)**: Everything single-column stack

### Decision 6: Easter Egg Reveals

**Decision**: CSS `:hover` on transition zone containers reveals hidden bold text with a neon flicker animation — like an old neon sign struggling to turn on before settling to full brightness.

**Rationale**:
- "Because why not!?" and "Hard $#@%ing work!" are decorative flourishes
- The flicker effect adds personality and reinforces the neon/glow visual motif
- CSS keyframe animation: irregular opacity flickers (0 → 0.4 → 0 → 0.7 → 0 → 1) over `duration500`, then holds at full
- Mobile: hidden entirely (no hover capability) — acceptable for decorative content
- `prefers-reduced-motion`: instant show at full opacity (no flicker, no transition)

### Decision 7: Section Prefix Pattern (Reuse from Spec 000)

**Decision**: Section headings use the same `//` and `!!` prefix pattern established in Spec 000's submenu items, but at larger scale. Given recurring use across the page, consider formalizing as part of a heading typography pattern or lightweight component.

**Rationale**:
- Visual consistency between nav submenu and page section headings
- Same implementation: prefix as decorative `aria-hidden` element, label as heading
- Larger typography (section heading scale vs submenu item scale)
- Prefix is decorative — screen readers get clean heading text

**Formalization question (for Ada + Lina)**: The `//` prefix appears on every section heading (H2-level). Options:
1. **Typography token** — `typography.sectionHeading` that includes prefix rendering behavior (Ada's domain)
2. **Lightweight component** — A heading component that accepts a prefix prop (Lina's domain)
3. **Product CSS pattern** — Reuse the Spec 000 implementation manually each time (Sparky's domain)

Recommendation: Option 2 or 3. A typography token can't encode "render a decorative prefix element" — that's structural, not typographic. A lightweight component or a documented CSS pattern is more appropriate. Defer decision to feedback round.

---

## Scope

### In Scope

| Deliverable | Description |
|-------------|-------------|
| `color.action.primary` override | Local semantic token update → `pink300` |
| Button-CTA `href` prop | Polymorphic rendering + contract + schema + tests (Lina) |
| Scroll-linked nav color system | Intersection Observer + custom property updates + text mode snap |
| Scroll-reveal animation system | CSS classes + Intersection Observer, one-shot, `prefers-reduced-motion` |
| Stats bar (full) | Count-up animation, text shadow, noise texture, layout |
| Why Build (full) | Four cards, hard shadow, gradient + exclusion texture, easter egg |
| Critical Features (full) | 2×3 card grid, diamond lattice, angular gradient, hard shadow |
| Code Screenshots (full) | Blend-mode imagery, halftone overlay |
| How Built + Special Thanks (full) | Frosted glass cards, gradient, halftone, credits grid, easter egg |
| CTA section (full) | Value props, two Button-CTA with `href` + outbound icon, photo |
| Footer (full) | Logo, name, email |
| Hero (partial — scaffold) | Container, background, headline, subtext, CTA buttons only |
| Ecosystem (scaffold only) | Container, background, section heading only |
| Who Built This (partial) | Bio text, employer badges, section heading. Timeline placeholder. |
| Section heading prefix pattern | `//` and `!!` at heading scale (product CSS utility) |
| Easter egg neon flicker | CSS keyframe animation on hover, `prefers-reduced-motion` respected |
| Responsive foundation | Desktop-first with column reduction breakpoints |
| `prefers-reduced-motion` wiring | Disable all animation when preference set |
| Contrast management | Text color snap (dark ↔ light) based on section background |

### Out of Scope

| Item | Reason | Where It Lives |
|------|--------|----------------|
| Hero chord diagram (canvas interaction) | Complex canvas application | Spec 002 |
| Ecosystem 3D cube + descriptions + portraits + agent directory | Complex illustration/interaction section | Spec 003 |
| Career timeline canvas | Complex canvas interaction | Spec 004 |
| Button-CTA visual redesign (padding, radius, colors) | Portfolio-specific styling refinements | Spec 005 |
| Dark mode | Phase 3 | Future |
| Mobile-specific nav (hamburger) | Phase 2 | Future |
| WCAG theme | Phase 4 | Future |

---

## Component Usage

### DesignerPunk Components

| Component | Where | Notes |
|-----------|-------|-------|
| Nav-Header-App | Sticky nav | Consumes Spec 000 output. Product JS drives custom properties. |
| Button-CTA | Hero CTAs, CTA section | Primary: "View the system" / "Peter on LinkedIn". Secondary: "Learn more" / "DesignerPunk on GitHub". |
| Icon-Base | Outbound icon on CTAs, platform icons | `external-link.svg` trailing on outbound links |
| Container-Card-Base | Why Build (×4), Critical Features (×6) | Elevated card styling |
| Badge-Label-Base | Employer badges (Who Built This) | Reddit, Venmo, PayPal, etc. |

### Product-Level Elements (No DP Component)

| Element | Section | Implementation |
|---------|---------|----------------|
| Stats counter | Stats Bar | Custom JS counter + display typography |
| Credits grid | Special Thanks | CSS Grid, plain text |
| Code screenshots | Code Screenshots | `<img>` + `mix-blend-mode` + halftone overlay |
| Section textures | Transitions | CSS pseudo-elements / background images |
| Easter egg text | Why Build / How Built transitions | CSS hover + opacity |
| Agent directory | Ecosystem | CSS Grid, plain text |

---

## Token Needs (Preliminary)

### Likely New Tokens Needed

| Need | Context | Notes |
|------|---------|-------|
| `color.action.primary` → `pink300` (local override) | Portfolio's primary action color is pink, not system default cyan | Local edit to `src/tokens/semantic/ColorTokens.ts`. All Button-CTA renders pink. |
| Typography: display scale (128px) | Stats "1" display number | Product CSS — single decorative instance, far exceeds scale |
| Typography: easter egg scale (72–74px) | Easter egg text | Product CSS — decorative, two instances |
| Stats text shadow | Hard shadow on all stats text | Product CSS utility. `pink500`, `opacity100`, `blur000`, offset `space025`. |
| Hard shadow pattern | Cards across multiple sections | Product CSS utility class with `--hard-shadow-color` custom property. |

### Existing Tokens (Confirmed Usable)

| Token | Usage |
|-------|-------|
| `color.structure.canvas` | White sections |
| `color.contrast.onLight` | Primary text on light backgrounds (headings, numbers) |
| `color.contrast.onDark` | Primary text on dark backgrounds |
| `color.text.default` | Body text |
| `color.text.muted` | Secondary/de-emphasized text |
| `color.action.primary` | CTA button fills (→ `pink300` after local override) |
| `color.action.navigation` | Accent text on dark backgrounds (`cyan500`) |
| `typography.displayLabelMd/Lg` | Section heading prefixes (from Spec 000) |
| `fontSize500` (33px) | Section headings (H2) |
| `fontSize400` (29px) | Sub-headings (H3) |
| `fontSize600` (37px) | Value props / H1 |
| `fontSize700` (42px) | Featured display text |
| `grouped.tight` | Prefix–label gap (from Spec 000) |
| All glow/blur tokens | Nav underglow (from Spec 000) |
| `duration150`, `duration250` | Animation durations |
| `opacity024` | Low opacity overlays (~20-24%) |
| `opacity056` | Medium opacity (frosted glass ~60%) |
| `opacity080` | High opacity (~80%) |
| `opacity100` | Full opacity (shadows) |

**Token creation will be handled during implementation** — Ada creates tokens as section builds surface specific needs. No upfront token spec required.

---

## Open Questions

1. ~~**Section background exact colors**~~ — **Resolved**: All map to existing primitives (Ada confirmed via Figma analysis). green100, pink100, yellow300, orange100, orange300, teal200, black300, black500. No new color tokens needed.

2. ~~**Stats bar numbers**~~ — **Resolved**: Static. Hardcoded values. Live stats is Phase 5+.

3. ~~**Hero CTAs destination**~~ — **Resolved**: "View the system" → github.com/3fn/DesignerPunkv2 (external). "Learn more" → smooth-scroll to Why Build section (internal).

4. ~~**CTA section destinations**~~ — **Resolved**: "Peter on LinkedIn" → linkedin.com/in/petermichaelsallen (external). "DesignerPunk on GitHub" → github.com/3fn/DesignerPunkv2 (external).

5. ~~**Code screenshots**~~ — **Resolved**: Peter has assets available.

6. ~~**Agent portraits**~~ — **Resolved**: Peter has assets available. Blend-mode composited.

7. ~~**Max-width value**~~ — **Resolved**: `breakpointLg` (1440px) frame with `space500` inline padding per side. Matches nav padding from Spec 000.

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Scroll color transitions feel jarring | Medium | Medium | CSS transition smoothing (150ms). Can tune duration. |
| Contrast fails during color transitions | Medium | High | Define explicit text color per section. No interpolation on text — snap at threshold. |
| Stats count-up performance on low-end devices | Low | Low | requestAnimationFrame + will-change. Fallback: show final number immediately. |
| Section background tokens don't exist yet | Medium | Low | Use primitives directly. Create semantics later if reuse emerges. |
| Button-CTA href change breaks existing consumers | Low | Medium | Additive prop — no breaking change. Existing usage without href unchanged. |

---

## Implementation Sequence (Phased)

Structured as named phases with acceptance criteria. Each phase is a natural checkpoint for review. Phases are checkpoints, not blockers — if momentum is good, move on without ceremony.

### Prerequisites (Lina + Ada)

**0. `color.action.primary` local override** (Ada)
- Update `src/tokens/semantic/ColorTokens.ts`: `color.action.primary` → `pink300`
- Local product override — does not affect `@3fn/core` package default

**1. Button-CTA `href` prop** (Lina)
- a. Add `href` prop to `types.ts` (optional string)
- b. Update `Button-CTA.schema.yaml` with `href` prop documentation
- c. Implement polymorphic rendering in web platform (`<a>` when href set, `<button>` otherwise)
- d. Add contract documenting dual-render behavior (propose `content_renders` concept)
- e. Verify all existing tests still pass (no breaking change)
- f. Write new tests for `<a>` rendering path (keyboard behavior, role, target/rel attributes)
- g. Update Button-CTA README
- **Icon approach**: Explicit — product sets `icon="external-link" iconPosition="trailing"` on outbound CTAs. No automatic icon rendering.

---

### Phase A: Foundation
**Deliverables**: Page layout scaffolding, scroll-linked nav color system, contrast management (text snap), scroll-reveal animation system, `prefers-reduced-motion` wiring
**Done when**: Scrolling through empty section containers triggers correct nav colors and text mode swap. Reveal classes toggle on intersection. Reduced motion disables all animation.

### Phase B: Stats Bar
**Deliverables**: Full section build — layout, count-up animation, text shadow, noise texture
**Scope**: Everything in Section Visual Profile #3. This section is fully owned by Spec 001.
**Done when**: Section renders with animated count-up numbers, correct text colors, noise texture, and text shadow.

### Phase C: Why Build
**Deliverables**: Four Container-Card-Base cards, hard shadow, background gradient + exclusion texture, easter egg neon flicker
**Scope**: Everything in Section Visual Profile #4. Fully owned by Spec 001.
**Done when**: Cards render with correct styling on gradient background. Easter egg flickers on hover. `prefers-reduced-motion` shows instantly.

### Phase D: Critical Features
**Deliverables**: 2×3 feature card grid, diamond lattice background, angular gradient, hard shadow
**Scope**: Everything in Section Visual Profile #7. Fully owned by Spec 001.
**Done when**: Cards render in grid with background pattern. Feature descriptions use `color.text.muted`.

### Phase E: Code Screenshots
**Deliverables**: Blend-mode imagery, halftone overlay, asset composition
**Scope**: Everything in Section Visual Profile #8. Fully owned by Spec 001. Depends on assets from Peter.
**Done when**: Images render with correct tint/blend treatment and halftone overlay.

### Phase F: How Built + Special Thanks
**Deliverables**: Frosted glass cards, radial gradient background, halftone circles, featured text, credits grid, easter egg neon flicker
**Scope**: Everything in Section Visual Profile #9. Fully owned by Spec 001.
**Done when**: Both sub-sections render. Frosted glass effect works. Credits grid displays. Easter egg flickers.

### Phase G: Who Built This (partial)
**Deliverables**: Section shell, bio text, employer badges (Badge-Label-Base), section heading. Placeholder area for timeline.
**Scope**: Section Visual Profile #10 — PARTIAL. Bio, badges, heading only. Career timeline canvas is **Spec 004**.
**NOT in scope**: Career timeline canvas, career data visualization, timeline interaction.
**Done when**: Section shell renders with bio content and badges. Empty placeholder area reserved for timeline.

### Phase H: Hero (partial) + CTA + Footer
**Deliverables**:
- Hero: Container, background, headline, subtext, two Button-CTA (with `href` + external-link icon). Section Visual Profile #2 — PARTIAL.
- CTA: Full section build — value props, two Button-CTA (with `href` + external-link icon), photo. Section Visual Profile #11 — FULL.
- Footer: Full build — logo, name, email. Section Visual Profile #12 — FULL.
**NOT in scope (Hero)**: Chord diagram canvas interaction — that's **Spec 002**.
**Done when**: Hero renders with headline and working CTA links. CTA section renders with outbound buttons. Footer renders.

### Phase I: Ecosystem (scaffold only)
**Deliverables**: Section container, background (`yellow300`), section heading only.
**Scope**: Section Visual Profile #5 — SCAFFOLD ONLY. Container and background treatment.
**NOT in scope**: 3D cube/diagram, Rosetta/Stemma/Civitas descriptions, connector lines, agent portraits, agent directory — all **Spec 003**.
**Done when**: Section container renders with correct background. Heading displays. Interior is empty placeholder.

### Phase J: Polish
**Deliverables**: Section heading prefix pattern (`//` / `!!`), responsive breakpoints (column reduction), easter egg timing refinement
**Scope**: Cross-cutting concerns that touch all sections.
**Done when**: All sections respond to breakpoints. Prefixes render correctly with `aria-hidden`. Layout stacks appropriately at sm/xs.

---

### Scope Summary by Section

| Section | Spec 001 Scope | Deferred To |
|---------|---------------|-------------|
| Sticky Nav | Full (scroll-linked colors, text snap) | — |
| Hero | Partial (container, bg, headline, CTAs) | Spec 002 (chord diagram) |
| Stats Bar | Full | — |
| Why Build | Full | — |
| Ecosystem | Scaffold only (container + bg + heading) | Spec 003 (cube, descriptions, portraits, directory) |
| Agent Grid | Scaffold only (part of Ecosystem) | Spec 003 |
| Critical Features | Full | — |
| Code Screenshots | Full | — |
| How Built + Thanks | Full | — |
| Who Built This | Partial (bio, badges, heading) | Spec 004 (career timeline canvas) |
| CTA | Full | — |
| Footer | Full | — |

---

## Section Visual Profiles

Each section's background treatment, text mode, and build scope. Sections marked "scaffold only" get their container/background built in this spec; content is deferred to their own spec.

### 1. Sticky Nav
- **Background**: Scroll-linked — transitions between section dominant colors (see Decision 2)
- **Text mode**: Swaps dark ↔ light based on background luminance
- **Build scope**: Full (this spec)

### 2. Hero
- **Background**: `green100` base fill. Angular gradient layer (`black500` → `white100`) at `opacity008`, rotated ~-102°, center origin positioned under the illustration center. Creates subtle directional light wash.
- **Dominant color**: `green100`
- **Text mode**: Dark text on light background
- **Texture**: None on background itself; visual complexity comes from the illustration + chord diagram overlay
- **Build scope**: Scaffold only — container, background, CTA buttons, headline/subtext. Chord diagram interaction deferred to Spec 002.

### 3. Stats Bar
- **Background**: `pink100` base. Noise effect (Mono, 1×1, 48% density, `black500` @ `opacity024`). Stroke: `pink500` (inside).
- **Dominant color**: `pink100`
- **Text colors**: Display "1" → `pink300`. Stat numbers (217, 193, etc.) → `color.contrast.onLight`. Labels (Human, Primitive tokens, etc.) → `pink500`.
- **Text shadow**: All text has hard shadow — `pink500` @ `opacity100`, `blur000`, offset `space025` x / `space025` y. Product CSS utility.
- **Texture**: Fine grain noise (implemented as tiled noise PNG/SVG at `opacity024`, or CSS filter)
- **Spacing**: Content padding `inset.300` block. Item spacing `related.loose` (space300). Stat group spacing `grouped.normal` (space100).
- **Build scope**: Full (this spec) — count-up numbers, labels, layout, text shadow

### 4. Why Build This System
- **Background**: Radial gradient — center-center origin outward. `pink300` at center → `pink500` toward center-bottom.
- **Dominant color**: `pink300`
- **Text mode**: Mixed — section heading uses `color.contrast.onDark` (light on gradient). Card body text uses `color.text.default` (dark on `purple100` cards).
- **Texture**: Tiled square pattern with `pink500` fill, composited using `exclusion` blend mode over the gradient. CSS `mix-blend-mode: exclusion` is viable; fallback to pre-rendered tile image if color space differences produce unacceptable results.
- **Easter egg**: "Because why not!?" — `green100` background zone above section, neon flicker reveal on hover
- **Spacing**: Content item-spacing `sectioned.loose` (space600). Content padding `sectioned.normal` (40px) all sides. Card padding asymmetric: `inset.200` block, `inset.300` inline. Card item-spacing `space200`.
- **Build scope**: Full (this spec) — four Container-Card-Base cards (`purple100` fill, hard shadow: `purple300` @ `opacity100`, offset `space100` x / `space100` y, `blur000`)

### 5. Ecosystem ("What is this ecosystem?")
- **Background**: `yellow300` container — rgba(255, 200, 0, 1). Warm yellow/gold base.
- **Dominant color**: `yellow300`
- **Text mode**: Dark text on light/warm background
- **Texture**: Possible noise or grain overlay. Purple connectors (`purple300`) for Rosetta/Stemma/Civitas diagram lines.
- **Build scope**: Scaffold only — container, background, section heading. 3D cube/diagram deferred to Spec 003.
- **Note**: Subsystem descriptions use `color.text.muted`

### 6. Agent Grid (part of Ecosystem section)
- **Background**: `green100` base with noise texture applied. Hard drop shadow: `orange300` @ `opacity100`, offset `space100` x / `space100` y, `blur000` (offset block shadow effect).
- **Dominant color**: `green100` — rgba(230, 255, 245, 1)
- **Text mode**: Dark text
- **Texture**: Noise effect on background. Historical figure portraits composited with blend mode.
- **Build scope**: Scaffold only — deferred to Spec 003 with the rest of the Ecosystem section.
- **Note**: The hard shadow creates a layered/stacked card aesthetic — not a soft elevation shadow.

### 7. Critical System Features
- **Background**: `orange100` base fill. Angular gradient layer (`black500` → `white100`) at `opacity024`, rotated ~-115°. Diamond lattice vector pattern (rotated 45° square grid) overlaid — implemented as tiled SVG background.
- **Dominant color**: `orange100`
- **Text mode**: Dark text. Feature titles `color.contrast.onLight`. Feature descriptions `color.text.muted`.
- **Texture**: Diamond/square lattice vector pattern. Feature cards: `color.structure.surface` @ `opacity080` with hard shadow (`pink300`, offset `space100` x / `space100` y, `blur000`)
- **Spacing**: Content item-spacing `sectioned.loose` (space600). Card padding `inset.300` all sides. Feature item-spacing `grouped.normal` (space100). List spacing `related.loose` (space300).
- **Build scope**: Full (this spec) — 2×3 grid of feature cards. Vector pattern asset needed (export from Figma as SVG tile).

### 8. Code Screenshots
- **Background**: `orange300` — rgba(255, 107, 53, 1). Warm/hot orange.
- **Dominant color**: `orange300`
- **Text mode**: Light text (if any text overlays)
- **Texture**: Heavy halftone pattern. Code screenshot images composited with blend mode (red/orange tint).
- **Build scope**: Full (this spec) — blend-mode imagery, halftone overlay
- **Note**: Historical figure portraits also composited here

### 9. How Was It Built (includes Special Thanks)
- **Background**: Radial gradient — center-bottom origin. `teal200` at center → `yellow300` at edges/top. Second layer: tiled `pink200` circles at `opacity024`.
- **Dominant color**: `teal200` (perceived dark teal due to gradient center being the focal point)
- **Text mode**: Dark text on frosted cards (`color.contrast.onLight` for all text)
- **Texture**: Tiled halftone circles (`pink200` @ `opacity024`) over the gradient
- **Content containers**: `orange100` @ `opacity056` + background blur (`blur100`). Hard shadow: `cyan300` offset `space100` x / `space100` y, `blur000`. Creates frosted glass effect over the gradient.
- **Featured text**: `fontSize700` / `fontWeight700`
- **Special Thanks**: Sub-section within this container. Same frosted card treatment. Credits in 4-column text grid.
- **Easter egg**: "Hard $#@%ing work!" — `purple100` fill + `orange300` stroke, neon flicker reveal on hover in transition zone above
- **Spacing**: Content item-spacing `sectioned.loose` (space600). Container padding `inset.300` block, `separated.normal` (space300) inline.
- **Build scope**: Full (this spec) — two-column text layout, frosted content cards, credits grid

### 10. Who Built This System
- **Background**: Flat `black300`. Near-black.
- **Dominant color**: `black300`
- **Text mode**: Light text (`color.contrast.onDark` for primary, `color.action.navigation` for accents)
- **Texture**: Subtle dot/grid pattern visible in mock
- **Build scope**: Partial — bio text, employer badges (Badge-Label-Base), section heading. Career timeline canvas deferred to Spec 004.

### 11. CTA ("What can I accomplish with your team?")
- **Background**: `green100` base. Outer frame `white100`. Contains halftone element and photo asset (pre-processed with noise).
- **Dominant color**: `green100`
- **Text mode**: Dark text (`color.contrast.onLight` for heading and body). Value props use display weight.
- **CTA buttons**: Primary (`color.action.primary` fill, `color.contrast.onDark` text, `radius050`). Secondary (`white200` fill, `color.contrast.onLight` stroke + text, `radius050`). Both get trailing Icon-Base (external-link) for outbound.
- **Texture**: Halftone element + photo asset composited
- **Spacing**: Content item-spacing `sectioned.loose` (space600). Body padding `inset.300` block/inline. CTA button spacing `grouped.normal` (space100). Header padding `space800` inline.
- **Build scope**: Full (this spec) — value props text, two Button-CTA components (with `href`), photo placement

### 12. Footer
- **Background**: Flat `black500`.
- **Dominant color**: `black500`
- **Text mode**: Light text (`color.contrast.onDark` for all text and logo)
- **Spacing**: `inset.300` vertical padding, `related.normal` between contact items
- **Build scope**: Full (this spec) — logo, name, separator (◌), email. Minimal.

---

### Items Needing Peter Input

All section visual profiles resolved. No outstanding questions.

---

*This design outline establishes the page architecture that all subsequent section specs build upon. Ready for review before formalizing into requirements.md.*