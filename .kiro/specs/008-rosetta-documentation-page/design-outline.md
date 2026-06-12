# Design Outline: Rosetta Documentation Page

**Date**: 2026-06-05
**Spec**: 008-rosetta-documentation-page
**Owner**: Leonardo (visual direction + story structure) → Sparky (implementation)
**Status**: Design Outline — Direction Confirmed via Prototype + Ada Review
**Depends on**: Spec 006 ✅ (Astro multi-page support)
**Prototype**: `docs/specs/staticReview/rosetta-docs-prototype.html`

---

## Context

DesignerPunk needs to legitimize itself through surfaced documentation. Rosetta (the token system) is the most mature and architecturally impressive subsystem — the strongest candidate for a first deep-dive documentation page.

This page lives at `/docs/rosetta` (or similar), linked from the ecosystem section's Rosetta card on the portfolio index. It's documentation *and* a portfolio artifact — honest about complexity, designed as an experience, serving both practitioners evaluating the architecture and evaluators assessing Peter's systems thinking.

**Key framing**: This page tells the story of *Rosetta as a named system* — why the architecture exists, what problems it solves, and what it encompasses. It does NOT follow a single token from start to finish (that story belongs in token family documentation for practitioners already using the system).

---

## Audience

**Primary**: Design systems practitioners and technical evaluators assessing DesignerPunk's architectural rigor. People who understand what tokens are and want to know what makes this system different.

**Secondary**: Hiring managers / technical leads evaluating Peter's systems thinking. They'll skim the structure and read the parts that demonstrate depth.

**Not the audience**: People who need to learn what a design token is. First-timers. This page assumes baseline design systems literacy.

---

## Format

**Three-column scroll-driven layout** (nav rail + written narrative + sticky visualization).

- **Nav rail** (left): Expandable (80px → 260px on hover), scroll-tracked active state, beat labels
- **Narrative column** (center): Written content, 4 beats progressing top to bottom
- **Visualization column** (right): Sticky, dark-treated panel with SVG node diagram that transforms across scroll states

Similar to the "Why Build" section pattern but deeper and with navigation. The right column isn't a single animation — it's an 11-node SVG diagram with 5 distinct states, connection lines redrawn per state, and hover/tap tooltips for depth-on-demand.

**Key distinction from the portfolio index**: The index hits broad strokes. This page goes into intimate architectural detail. The narrative column stands alone as documentation; the visualization reinforces through progressive reveal.

---

## Story Structure: Why → How → What Enables

The narrative progresses through four beats, moving from problems to architecture to capabilities. This structure was chosen because:
- The audience already knows what tokens are — they need to understand what makes this *system* different
- Each architectural decision is a response to a specific failure mode, which is a more compelling story than describing features in isolation
- The "Why name it?" question is answered implicitly: by the end, it's clear that Rosetta is a bounded system with a philosophy, not a folder of token files

### Beat 1: Why Rosetta Exists (The Problem)

**Narrative**: What goes wrong in token systems without deliberate architecture.

Four failure modes, verified against actual source:
1. **Drift** — Token values diverge from their intended mathematical relationships without detection. A spacing value gets tweaked from 16 to 15, nobody notices, the grid breaks silently.
2. **Arbitrariness** — Values exist without explanation. `$spacing-md: 12px` — why 12? Nobody remembers. New values get added without justification because there's no mechanism requiring it.
3. **Platform divergence** — Authors add platform units at the token level. `16.dp.dp` bugs. iOS and Android get different values for the same concept because nobody enforces a single source.
4. **Missing audit trail** — No way to trace a platform output back to a design decision. Changes happen without attribution. Theme overrides break things silently.

**Right column scene**: Could visualize "token chaos" — arbitrary values, inconsistent naming patterns, orphaned references. Or: the same value drifting across three platforms without detection.

### Beat 2: The Unifying Principle (Explicit, Traceable Origin)

**Narrative**: Rosetta's answer isn't "math" — it's that every value declares why it exists.

The principle manifests differently across token types (all verified from source):
- **Formula-based** (spacing, sizing): `mathematicalRelationship: 'base × 2 = 8 × 2 = 16'`
- **Categorical** (font families): `mathematicalRelationship: 'N/A - Categorical value'` — explicitly declares it's NOT formula-driven
- **Special cases** (radiusMax): `mathematicalRelationship: 'special case = 9999 (effectively infinite)'`
- **Compositional** (shadows): `primitiveReferences: { offsetX, offsetY, blur, opacity, color }` — origin is the composition
- **Referential** (semantic colors): `primitiveReferences: { value: 'green400' }` — origin is the reference chain
- **Component** (progress nodes): `reference: sizingTokens.size200` + mandatory `reasoning` field

**Key insight**: The `mathematicalRelationship` field exists on EVERY primitive token definition — the TypeScript interface requires it. Categorical tokens still have the field — they just say "N/A." The architecture makes it structurally impossible to add a value without declaring its origin.

**Right column scene**: Token anatomy — a single real token (e.g., `space200`) expanded to show ALL its fields. Then morph to show how the same structure looks for a categorical token (fontFamilyBody) and a compositional token (shadow.container). Same architecture, different expressions.

### Beat 3: The Architecture (Pipeline as Response to Failure Modes)

**Narrative**: Why Rosetta is named — it's not just tokens, it's a complete system with a defined boundary.

The six-stage pipeline, with each stage mapped to the failure mode it prevents:

| Stage | What It Does | Failure Mode Addressed |
|-------|-------------|----------------------|
| **Definition** | Tokens authored in TypeScript with mandatory metadata fields | Arbitrariness (can't add a value without declaring origin) |
| **Validation** | Mathematical relationships verified against declared formulas (≤5% tolerance = pass, >25% = error) | Drift (relationships can't silently break) |
| **Registry** | Tokens stored in queryable registries by family, layer, platform | Missing audit trail (everything is introspectable) |
| **Mode Resolution** | Light/dark resolved from two-level system (primitive values + semantic overrides) | Platform divergence (same resolution logic everywhere) |
| **Generation** | Unitless values transformed to platform-specific formats | Platform divergence (units applied at build, not authoring) |
| **Output** | CSS, Swift, Kotlin, DTCG, Figma variables produced from single source | Platform divergence (one source, five outputs) |

**Why "Rosetta"**: The name signals that definition + validation + registry + resolution + generation + tooling belong together under one architectural intent. It's not a token library — it's a token *system*.

**Right column scene**: The pipeline diagram from the Figma architecture illustration, progressively revealed via D3 as scroll advances. Each stage draws in as the narrative reaches it. Connections between stages appear. The isometric cube aesthetic from existing diagrams, with D3 handling positioning and transitions.

### Beat 4: What This Enables (The Payoff)

**Narrative**: What becomes possible when the architecture is in place. This isn't "generated tokens" (table stakes) — it's the capabilities the system creates:

- **Portable pipeline**: Any project installs `@3fn/core`, runs `npx designerpunk generate`, gets the full pipeline. Products configure via `designerpunk.config.ts`.
- **Theme architecture**: Register themes in config, overrides validated at registration time. Theme-varying tokens detected automatically. Non-theme-varying tokens stay as static constants.
- **Governance without overhead**: Component tokens require a `reasoning` field. Audit tools (`npm run audit:mode-parity`, `npm run audit:theme-drift`) catch problems in CI. Human review gates prevent ungoverned token creation.
- **AI agent queryability**: Token registries serve data to MCP — agents ask questions about tokens at the point of decision rather than loading entire reference docs.

**Breadcrumb to deeper content**: "Each token family has its own relationship with this pipeline — spacing follows a different formula than color, which composes differently than typography. Those stories live in the token family documentation." One sentence, drops a path without derailing.

**Right column scene**: Platform fan-out visualization — the unitless source value splitting into CSS `var(--space-200)`, Swift `DesignTokens.space200`, Kotlin `DesignTokens.space_200`, DTCG JSON, Figma variable. Real output names from the token-index. Could also show the portable config pattern.

---

## Visualization Approach (Right Column — From Prototype)

### Concrete Implementation (Proven in Prototype)

The prototype demonstrates the visualization as:
- **11-node SVG diagram** transforming across 5 scroll states (one per beat + intro state)
- **CSS transitions** on node position (0.6s), radius (0.5s), stroke color (0.5s)
- **Scroll-position-driven label opacity** (fade in at 20%, full 20-80%, fade out 80-100%)
- **Styled tooltip** (hover on desktop, tap-to-toggle on mobile) — dark background, cyan border, three-zone typography: title (bold cyan mono), problem (muted, separator), solution (emphasized with → prefix)
- **Active node state** — cyan glow + thicker stroke on hovered/tapped node
- **24px minimum hit targets** on all nodes regardless of visual radius
- **Connection lines redrawn per state** — relationships change as the narrative progresses
- **Per-state node labels and tooltip content** updated on beat change
- **Tooltip auto-dismisses** on scroll to new beat

### Tooltip Content Narrative (Per Beat)

Tooltips follow a consistent two-part format across all beats:

- **Beat 1 (Intro/Problem)**: `[What's wrong] → [What Rosetta does instead]` — paired contrast showing the failure and its fix
- **Beat 2 (Principle)**: `[Origin declaration method] — [What this means]` — showing diversity of "declared origin" expressions (formula, perceptual channel, reference, conditional reference, reasoning)
- **Beat 3 (Architecture)**: `[What this stage prevents] — [How]` — each pipeline node maps back to a Beat 1 failure mode
- **Beat 4 (Payoff)**: `[What you get] — [The capability unlocked]` — each output is a capability, not just a format

### Interaction Pattern

- **Desktop**: hover reveals tooltip at cursor position, mouseleave dismisses
- **Mobile**: tap toggles tooltip (first tap shows, tap same node dismisses, tap different node switches, tap empty dismisses)
- **Future consideration (parked)**: NASA Solar System-style navigable space for the *index page* ecosystem section — depth/zoom interaction to convey system relationships. Not for this documentation page.

### Discarded Approaches

- **Option B (expanding inline card)**: SVG-to-HTML transformation too complex for the value; clutters diagram when open
- **Option C (persistent panel below SVG)**: tested; felt disconnected from the nodes; lost spatial proximity that makes the tooltip feel connected to its source
- **D3.js**: not needed — vanilla SVG + CSS transitions proven sufficient for all scenes

### Technology: Vanilla SVG + CSS Transitions (Confirmed)

D3 is **not needed**. The prototype proves all scenes with vanilla SVG + CSS transitions + ~120 lines of JS. The pipeline scene (Beat 3) has a fixed number of nodes in a known arrangement — no layout intelligence required.

Beat 4 connection lines use CSS `stroke-dashoffset` animation (draw-on-scroll effect) — no D3 path interpolation needed.

**Counter-argument**: D3 was evaluated and rejected. The 11-node diagram has static topology; only positions, colors, and labels change per state. CSS transitions handle this natively.

### Scene Constraints:

- Must work at reduced motion (show final state, no transitions)
- Must be readable without the visualization (left column stands alone as documentation)
- Must not require interaction to understand (scroll-driven, not click-driven)
- Uses real system data: real token names, real values, real formulas, real platform output names
- Data is curated but genuine — real token names chosen for narrative clarity, hardcoded into the page (not live MCP queries that could break on rename)

---

## Content Tone

- **Honest about complexity**: Don't pretend everything is a formula. Show the diversity of token types and name the unifying principle that accommodates all of them.
- **Technical but readable**: Assume design systems literacy, don't assume Rosetta-specific knowledge.
- **Opinionated**: Explain *why* decisions were made. Each architectural element is a response to a specific problem — say so.
- **Concrete**: Real examples, real token names, real values. `space200` not "a spacing token." `mathematicalRelationship: 'base × 2 = 8 × 2 = 16'` not "tokens have formulas."

---

## Data Narrative (Confirmed)

A single leverage stat surfaced early (likely Beat 4 payoff or as an introductory anchor):

> **768 source tokens produce 3,000+ platform-ready outputs for web, iOS, Android, and canvas-based tools.**

Keeps the story simple — communicates scale without requiring the reader to understand the token tier distinctions (that's what Beat 2 teaches). Exact placement TBD during implementation.

---

## Prototype Exploration Candidates (Resolved)

All candidates explored in the prototype and incorporated:

1. ~~**OKLCH color narrative**~~ ✅ Added pink300/cyan300 nodes to Beat 2 with perceptual channel tooltips + narrative paragraph
2. ~~**Graduated validation tolerance**~~ ✅ In Validate pipeline node tooltip
3. ~~**Two-level mode resolution**~~ ✅ In nav semantic node tooltip (Beat 2) + Resolve pipeline node tooltip (Beat 3)
4. ~~**Structural enforcement at type level**~~ ✅ In left column copy (Beat 2) + Define pipeline node tooltip
5. ~~**Component tokens require reasoning**~~ ✅ In btnIcon node tooltip (Beat 2)

---

## Scope

### In Scope

- New Astro page at `/docs/rosetta`
- Three-column layout (nav rail + narrative + sticky visualization)
- Written narrative covering 4 beats (why → principle → architecture → payoff)
- SVG visualization with 5 scroll-driven states + CSS transitions (no D3)
- Beat 4 draw-on-scroll connection lines (CSS `stroke-dashoffset`)
- Data narrative stat in Beat 4: "768 source tokens produce 3,000+ platform-ready outputs"
- Hover/tap tooltips with keyboard focus for sighted keyboard users
- Nav rail: expandable (80px → 260px), scroll-tracked, keyboard-navigable
- Link from ecosystem section Rosetta card to this page
- Reduced motion handling (final state, no transitions)
- Mobile responsive (single-column collapse, nav hidden, static viz)
- Print styles (hide nav + viz, single-column narrative only)
- URL hash deep links (load at beat, set viz state)
- Forced colors handling
- ~14 new product tokens (per System-First Value Selection)
- SVG `preserveAspectRatio="xMidYMid meet"` for wide viewport stability
- Scroll performance budget (degrade gracefully if FPS < 30 on baseline device)

### Out of Scope

- Stemma documentation page (future spec)
- Civitas documentation page (future spec)
- Full token reference/lookup (that's what the MCP is for)
- Interactive token playground/editor
- "Follow a token" onboarding content (future: token family docs or getting-started page)
- Content that duplicates steering docs verbatim
- Live MCP data queries (use curated real data instead)

---

## Verified Claims (Source Audit 2026-06-05)

These narrative claims have been verified against actual source code and can be stated confidently:

| Claim | Status | Evidence |
|-------|--------|----------|
| Six-stage pipeline flow | ✅ Verified | Architecture doc + types confirm full flow; pipeline lives in @3fn/core |
| "Explicit traceable origin" as unifying principle | ✅ Verified | Every primitive token definition requires `mathematicalRelationship` field; TypeScript interface enforces at compile time |
| Four failure modes genuinely addressed | ✅ Verified | Each has specific architectural response (mathematicalRelationship, platforms field, primitiveReferences, validation thresholds) |
| Rosetta boundary includes tokens + validation + registry + generation + tooling | ✅ Verified | Systems Overview and Architecture doc both confirm; distinct from Stemma and Civitas |
| -82% context load reduction | ✅ Correct number | Mechanism verified (MCP progressive disclosure); site corrected from erroneous -87% |

---

## Open Questions (For Leo)

1. ~~**Visual language**: Do pipeline scenes use the isometric cube style from existing Figma diagrams, or something new that D3 enables?~~ → See Art Direction below.
2. ~~**Beat 1 visualization**: Abstract "chaos" vs concrete "drift detection"?~~ → Concrete drift: show platform outputs diverging for the same token.
3. **URL structure**: `/docs/rosetta`? `/architecture/rosetta`? `/systems/rosetta`? → Proposed: `/docs/rosetta`
4. **Navigation**: Shared docs nav, or standalone page linked from the index? → Standalone for now; shared nav when Stemma/Civitas pages exist.
5. **Mobile treatment**: Visualizations as simplified static SVG, or hidden entirely on mobile? → Static SVG (final state, no scroll-driven transitions).

---

## Art Direction

### System Color Associations (Established)

| System | Color | Hex | Usage on this page |
|--------|-------|-----|-------------------|
| **Rosetta** | Cyan | #80F6FF | Primary accent — dominant throughout. This is Rosetta's page. |
| **Stemma** | Green | #80FFBB | Secondary — appears only when referencing component token boundary |
| **Civitas** | Yellow | #FCF680 | Secondary — appears only when referencing governance/audit tools |

These colors establish wayfinding across future documentation pages: Stemma's page would lead with green, Civitas with yellow.

### Visual Vocabulary (From Chord Diagram + Career Chart)

- **Outlined nodes, not filled** — thin stroke in system color, white/transparent interior
- **Thin connecting lines** (1.5–2.5px) with directional indicators (arrows or animated pulse dots)
- **Monospace labels** at small sizes (9–12px) — dense, technical, trustworthy
- **Noise texture** for materiality on surfaces (feTurbulence or canvas pattern)
- **Color is semantic** — cyan means Rosetta/tokens, never decorative variety
- **Progressive reveal feels like drawing** — strokes extending, nodes fading in, not blocks sliding from off-screen
- **Dark treatment for complex scenes** (pipeline DAG) — #0d0d1a to #1a1a2e range
- **Lighter/transparent treatment for simpler scenes** — prevents visual fatigue over long scroll

### D3 Recommendation (Refined)

- **Beat 3 (Pipeline)**: D3 — DAG layout, progressive reveal on scroll. Earns its complexity.
- **Beats 1, 2, 4**: CSS/SVG with scroll-triggered class changes. 80% of impact at 20% of cost.

---

## Prototype Status: Complete

The prototype at `docs/specs/staticReview/rosetta-docs-prototype.html` proved:

- Three-column scroll-driven layout works at this depth ✅
- Evolving SVG node diagram is engaging without overwhelming ✅
- Cyan-dominant color scheme sustains over a full page ✅
- Vanilla SVG + CSS transitions sufficient (D3 not required) ✅
- Scroll-to-scene ratio feels natural at 80vh minimum per beat ✅
- Nav rail (80px → 260px on hover) provides orientation ✅
- Styled tooltip with typography hierarchy provides depth-on-demand ✅
- OKLCH, graduated validation, mode resolution, structural enforcement, and reasoning field all explored and incorporated ✅
- Paired-contrast tooltip format (problem → Rosetta equivalent) tells coherent per-beat narratives ✅

**Next step**: Formalize into requirements and tasks for production Astro implementation.

---

## Dependencies

- Spec 006 ✅ (Astro infrastructure — multi-page routing works)
- ~~Leonardo's input on visual direction and D3 scene design~~ ✅ Confirmed via prototype
- ~~D3.js integration with Astro (Sparky to confirm compatibility)~~ → Deferred: prototype uses vanilla SVG + JS; D3 only if pipeline scene needs it
- ~~Real token data curated for narrative (Ada to provide representative examples per beat)~~ ✅ Ada reviewed; corrections applied

---

## Ada's Review (2026-06-05)

### Validated
- Narrative structure and four failure modes: accurate
- Six pipeline stages: correctly named and sequenced
- "Every value declares why it exists" as unifying principle: correct framing
- AI challenges intro: matches her lived experience

### Corrections Applied to Prototype
- "668 instances" → removed specific number; reframed as "every primitive token definition — TypeScript interface requires it"
- CSS tooltip `1rem` → `16px`
- `radMax` → `radiusMax`
- `buttonCTA.paddingInline` (doesn't exist) → `buttonIcon.inset.medium → space125`
- Kotlin `Space200` → `space_200`

### Undersold Aspects (Addressed via Tooltips)
- Two-level mode resolution (Level 1: 85% primitive, Level 2: semantic reference swap)
- Structural enforcement at type level (can't compile without declaring origin)
- Compositional tokens (typography/shadow bundle multiple primitives)
- MCP queryability as the real AI power (not just naming)
- Graduated validation tolerance (≤5% pass, 5-25% warn, >25% error)
- Resolution scoped to color tokens only

### Not Yet Addressed (Future Polish)
- Strategic flexibility tokens (principled 8px grid exceptions)
- Density scaling (functional vs aesthetic token distinction)
- ~~OKLCH color model (perceptually uniform — replaces RGB/RGBA as of latest @3fn/core)~~ ✅ Migration complete in 12.0.4 — end-to-end OKLCH confirmed. Ada's "mid-migration" caveats no longer apply.

---

## Implementation Concerns (Prototype → Production)

**The prototype demonstrates content, layout, and interaction — it is NOT implementation-ready.** Same pattern as Spec 007.

### 1. Styling Alignment

The prototype uses its own CSS (hard-coded values, ad-hoc typography, custom spacing). Production must:
- Use system tokens for all values (spacing, color, typography, radius, motion)
- Use product tokens where system tokens don't cover the need (per System-First Value Selection)
- Match the portfolio's established visual patterns (section heading style, card patterns, font usage)
- Follow Web-Authoring-Standards (logical properties, token-only values, focus patterns, forced-colors)

**Resolution**: Leonardo confirms which prototype styles are intentional design decisions vs. quick approximations. Sparky translates to token-compliant CSS.

### 2. Accessibility & Semantic Markup

The prototype lacks proper accessibility implementation. Production must:
- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<section>` with `aria-labelledby`)
- Ensure nav rail is keyboard-navigable with proper `aria-current` tracking
- Ensure tooltips are accessible (not hover-only — keyboard/tap accessible, `aria-describedby`)
- Ensure scroll-driven visualization has `aria-hidden="true"` (decorative reinforcement — left column stands alone)
- Respect `prefers-reduced-motion` (show final state, no transitions)
- Meet WCAG 2.1 AA contrast on all text (especially light text on dark visualization panel)
- Provide skip-link to bypass nav rail if present

**Resolution**: Sparky implements full accessibility layer. Leonardo confirms any visual impact of accessibility requirements doesn't compromise design intent.

---

### Architecture Decision: Production-Grade (Not Another Prototype)

The prototype proved the concept. Moving directly to production implementation within Astro for these reasons:
- Layout, visualization approach, and narrative structure are locked
- Further prototype iteration would be thrown-away work
- Production constraints (tokens, logical properties, a11y, responsive) surface decisions that can't be prototyped
- Astro multi-page infrastructure is ready (Spec 006)

### Color System Update

As of @3fn/core 12.0.4, Rosetta's color system uses **OKLCH end-to-end** — from authoring through every platform output:

- **Authoring**: Color primitives defined as independent OKLCH channels (hue, lightness, chroma)
- **CSS output**: `oklch(L C H)` for primitives; `light-dark(oklch(...), oklch(...))` for mode-varying semantics
- **Swift output**: `Color.oklch(L, C, H)`
- **Kotlin output**: `Oklch(L, C, H).toComposeColor()`
- **DTCG output**: alias references (`{color.cyan300}`) resolving to OKLCH primitives

**For the documentation narrative**: OKLCH is a strong Beat 2 example of the "explicit traceable origin" principle. Every color decomposes into three perceptual channels — hue identifies the family, lightness controls the step, chroma controls saturation. All pinks share `hue: 10`; all cyans share `hue: 202.5`. The system's decisions are transparent and auditable.

**Honest framing**: Colors don't have mathematical formulas like spacing (`base × 2 = 16`). They have perceptual channel compositions — three named values that produce a color. Same principle (declared origin), different expression.

### Implementation Tasks (Proposed)

| Task | Owner | Description |
|------|-------|-------------|
| Experience map entry | Leonardo | Add `/docs/rosetta` page to product experience map |
| Astro page scaffold | Sparky | Create `src/pages/docs/rosetta.astro` with layout |
| Three-column layout | Sparky | Nav rail + narrative + sticky visualization |
| Narrative content | Sparky (from outline) | Left column copy — 4 beats + intro |
| SVG visualization | Sparky | Evolving node diagram, scroll-driven states |
| Tooltip interaction | Sparky | Hover/tap reveals context per node |
| Scroll-driven labels | Sparky | Label opacity tied to beat progress |
| Nav rail | Sparky | Sticky, expandable on hover, active state tracking |
| Ecosystem link | Sparky | Rosetta card on index links to `/docs/rosetta` |
| Responsive | Sparky | Single-column collapse, nav hidden, static viz |
| Reduced motion | Sparky | Final state shown immediately, no transitions |
| Product token audit | Sparky | New values → product tokens per governance |

### Product MCP Needs

Before implementation:
- `product/experience-map/pages/docs/rosetta.yaml` — page definition (sections, audience, visual reference, interaction specs)
- `product/overview.yaml` — add docs page to active pages list

### What the Prototype Proves (Reference for Sparky)

The prototype at `docs/specs/staticReview/rosetta-docs-prototype.html` demonstrates:
- Two-column scroll-driven layout with sticky dark visualization panel
- Expanding nav rail (80px → 260px on hover) with scroll-tracked active state
- SVG node diagram with 11 nodes transforming across 5 scroll states
- CSS transitions on node position (0.6s), radius (0.5s), stroke color (0.5s)
- Scroll-position-driven label opacity (fade in at 20%, full 20-80%, fade out 80-100%)
- Hover tooltip with cursor-following position and node-color border
- Per-state node labels and tooltip content (updated on beat change)
- Connection lines redrawn per state

The visualization JS can be extracted nearly as-is into the production page. Layout and styling will be rebuilt with tokens and logical properties.
