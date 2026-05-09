# Phase 1 Spec Breakdown — DRAFT

**Date**: 2026-05-07
**Updated**: 2026-05-08
**Status**: Draft — pending Peter's decision
**Context**: First discussion on how to decompose Phase 1 (Desktop Launch) into formal specs

---

## Architecture Clarification (2026-05-08)

Products consuming `@3fn/core` have two consumption modes:
- **A. Use as-is**: Consume compiled tokens/components from the package directly
- **B. Modify locally**: `npx designerpunk init` scaffolds editable token and component source into the product repo. Products own their token definitions; the package provides the pipeline tooling (generators, validators, CLI).

DP-Portfolio uses mode B — it has a full `src/tokens/` directory with editable source. **Font swaps and token additions are direct edits to local files, not pipeline configuration changes.** This eliminates the previously-identified "primitive override mechanism" blocker.

---

## Proposed Specs

| # | Spec | Domain | Owner | Status |
|---|------|--------|-------|--------|
| 1 | Nav-Header-App Hardening | Stemma | Lina | Includes submenu interaction |
| 2 | Link Component | Stemma | Lina | Needs design from Peter |
| 3 | Portfolio Page Architecture | Product | Leonardo → Sparky | Shared behaviors, section scaffolding |
| 4 | Hero Section | Product | Leonardo → Sparky | Queued — chord diagram (canvas) |
| 5 | Ecosystem Section | Product | Leonardo → Sparky | Queued — 3D cube (CSS MVP, canvas stretch) |
| 6 | Career Timeline Section | Product | Leonardo → Sparky | Queued — career arc (canvas) |

Token work (fonts, new colors, shadows, gradients) is folded into whichever section spec surfaces the need. No standalone token spec required.

---

## ~~Spec: Primitive Override Mechanism~~ — REMOVED

**Reason**: Not needed. Products in mode B own their token source directly. Font swaps are a direct edit to `src/tokens/FontFamilyTokens.ts` — no pipeline architecture change required. Font swap becomes a task within Spec 3 (Page Architecture).

---

## Spec 1: Nav-Header-App Hardening

**Owner**: Lina
**Why it's separate**: This is a DesignerPunk component being consumed in production for the first time. It's currently scaffold-only (no tests, no accessibility). The portfolio nav requires real functionality: sticky behavior support, slot architecture for external links, platform icons, and submenu interaction.

**Scope**:
- Promote from scaffold to production-ready
- Behavioral contract tests
- Accessibility (keyboard nav, ARIA, focus management)
- Slot architecture review (does it support what the portfolio needs?)
- **Submenu/popover interaction** for the "About" dropdown (section anchor links)

---

## Spec 2: Link Component

**Owner**: Lina
**Why it's separate**: Outbound links appear throughout the page (nav, hero, CTA section, footer). Using Button-CTA as a link is semantically incorrect — `<a>` and `<button>` have different roles, keyboard behavior, and screen reader announcements. A proper Link component is needed.

**Scope**:
- Link component with outbound-link icon variant
- Proper `<a>` semantics (not button)
- Accessibility (focus, visited state, external link announcement)
- Behavioral contracts

**Blocked on**: Design from Peter (link visual treatment, outbound icon pattern)

---

## Spec 3: Portfolio Page Architecture

**Owner**: Leonardo → Sparky
**Why it's the core spec**: The "glue" spec — shared behaviors and section scaffolding that all sections depend on.

**Scope**:
- **Font swap task**: Edit `src/tokens/FontFamilyTokens.ts` (fontFamilyBody → Figtree, fontFamilyMono → Commit Mono)
- Sticky nav integration (consuming hardened Nav-Header-App)
- Scroll-linked nav color transitions
- Scroll-reveal animation system (Intersection Observer + CSS transitions)
- Parallax infrastructure
- Easter egg hover reveals
- Outbound link pattern (consuming Link component)
- Responsive strategy (desktop-first, mobile stacking)
- Section scaffolding for simpler sections:
  - Stats Bar (count-up animation)
  - Why Build (4-column cards)
  - Agent Grid (3-column cards)
  - Critical Features (2×3 cards)
  - Code Screenshots (blend-mode imagery)
  - How Was It Built (two-column text)
  - Special Thanks (credits grid)
  - CTA (buttons + imagery)
  - Footer
- Token additions as needed (new colors, spacing, etc. — folded in)
- `prefers-reduced-motion` wiring (Phase 4 WCAG, but infrastructure now)

**Dependencies**: Spec 1 (nav component), Spec 2 (link component)

**Explicitly deferred**: Hero, Ecosystem, Career Timeline (separate specs)

---

## Spec 4: Hero Section (Queued)

**Owner**: Leonardo → Sparky
**Why it's separate**: The chord diagram is an embedded interactive canvas application with drag rotation, hover deceleration, tooltip positioning, pulse animations, and responsive sizing.

**Scope** (preliminary):
- Chord diagram refactored to DesignerPunk tokens
- Integration with scroll-reveal system
- Hero layout (headline, subtext, CTAs, diagram positioning)
- Accessibility (canvas alt text, keyboard interaction TBD)
- Responsive behavior (canvas on mobile — simplified or static?)
- Token additions as needed (diagram-specific colors, etc.)

**Depends on**: Spec 3 (page scaffolding exists)

---

## Spec 5: Ecosystem Section (Queued)

**Owner**: Leonardo → Sparky
**Why it's separate**: The Rosetta/Stemma/Civitas conceptual diagram with connector lines, agent portrait grid, and agent directory layout has enough visual complexity to warrant its own spec.

**Scope** (preliminary):
- 3D cube illustration (MVP: well-styled CSS/SVG with hover states; stretch goal: canvas interaction)
- Connector lines from cube vertices to system descriptions
- Agent portrait grid with blend-mode imagery
- Agent directory layout (3-column categorized list)
- Token additions as needed
- Responsive behavior

**Design note**: Canvas interaction is a stretch goal. Spec should be designed so the data model supports upgrade to canvas later, but MVP ships as static/CSS-animated.

**Depends on**: Spec 3 (page scaffolding exists)

---

## Spec 6: Career Timeline Section (Queued)

**Owner**: Leonardo → Sparky
**Why it's separate**: Another embedded canvas application with hover interaction, animated bars, tooltip system, and career data model.

**Scope** (preliminary):
- Career arc refactored to DesignerPunk tokens
- Integration with scroll-reveal system
- Badge grid (employer badges above timeline)
- "Who built this" section layout
- Accessibility (canvas alt text, data table alternative?)
- Responsive behavior
- Token additions as needed (timeline-specific colors, etc.)

**Depends on**: Spec 3 (page scaffolding exists)

---

## Open Questions

1. **Link component design**: Peter to provide visual treatment for links (inline, outbound icon, hover/focus states)
2. **Sequencing**: Build nav first (Spec 1), then page architecture wires scroll behavior to real sections
3. **Ecosystem canvas**: Stretch goal — revisit after Phase 1 core sections ship

---

## Dependency Graph

```
Spec 1 (Nav Hardening) ────┐
                            ├──→ Spec 3 (Page Architecture) ──┬──→ Spec 4 (Hero)
Spec 2 (Link Component) ──┘                                   ├──→ Spec 5 (Ecosystem)
                                                               └──→ Spec 6 (Career Timeline)

Token work folded into specs 3/4/5/6 as needed
```

---

*Draft captured 2026-05-07. Updated 2026-05-08 after architecture clarification and planning session.*
*Peter to review and decide on structure.*
