# Implementation Plan: Portfolio Page Architecture

**Date**: 2026-05-10
**Spec**: 001 - Portfolio Page Architecture
**Status**: Implementation Planning
**Dependencies**: Spec 000 (Nav-Header-App Hardening) ✅ Complete

---

## Implementation Plan

This spec follows a phased implementation structure (A–J) with two prerequisites. Each phase is a parent task with clear acceptance criteria. Prerequisites (Ada token override + Lina Button-CTA modification) must complete before Phase A can fully deliver, though scaffolding can begin in parallel.

---

## Task List

- [x] 1. Token Override (Prerequisite)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Ada

  **Success Criteria:**
  - `color.action.primary` resolves to `pink300` in local product token source
  - All components consuming `color.action.primary` render pink
  - `@3fn/core` package default unchanged

  **Primary Artifacts:**
  - `src/tokens/semantic/ColorTokens.ts` (modified)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/001-portfolio-page-architecture/completion/task-1-completion.md`
  - Summary: `docs/specs/001-portfolio-page-architecture/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Token Override"`
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Update `color.action.primary` to `pink300`
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Edit `src/tokens/semantic/ColorTokens.ts`
    - Change `color.action.primary` reference from `cyan300` to `pink300`
    - Verify token resolves correctly in pipeline output
    - Verify change is local only (does not modify `node_modules/@3fn/core`)
    - _Requirements: 1_

---

- [x] 2. Button-CTA Polymorphic Rendering (Prerequisite)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Lina

  **Success Criteria:**
  - Button-CTA renders as `<a>` when `href` prop is set
  - Button-CTA renders as `<button>` when `href` is absent (no regression)
  - `rel="noopener noreferrer"` auto-applied when `target="_blank"`
  - Behavioral contract documents dual-render behavior
  - All existing tests pass unchanged
  - New tests cover `<a>` rendering path

  **Primary Artifacts:**
  - `src/components/core/Button-CTA/types.ts` (modified)
  - `src/components/core/Button-CTA/Button-CTA.schema.yaml` (modified)
  - `src/components/core/Button-CTA/platforms/web/ButtonCTA.web.ts` (modified)
  - `src/components/core/Button-CTA/contracts.yaml` (modified)
  - `src/components/core/Button-CTA/__tests__/` (new tests)
  - `src/components/core/Button-CTA/README.md` (modified)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/001-portfolio-page-architecture/completion/task-2-completion.md`
  - Summary: `docs/specs/001-portfolio-page-architecture/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Button-CTA Polymorphic Rendering"`
  - Verify: Check GitHub for committed changes

  - [x] 2.1 Add `href` prop to types and schema
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Add `href?: string`, `target?: string`, `rel?: string` to `ButtonCTAProps` in types.ts
    - Update `Button-CTA.schema.yaml` with new props (optional, documented)
    - _Requirements: 2_

  - [x] 2.2 Implement polymorphic rendering (web)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Modify `ButtonCTA.web.ts` to render `<a>` when `href` is set, `<button>` otherwise
    - Auto-apply `rel="noopener noreferrer"` when `target="_blank"`
    - Ignore `disabled` prop when rendering as `<a>` (links aren't disableable)
    - All visual styling identical regardless of rendered element
    - _Requirements: 2_
    - _Contracts: content_renders_link_

  - [x] 2.3 Add behavioral contract
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Add `content_renders_link` contract to `contracts.yaml`
    - Document dual-render behavior, keyboard differences, security attributes
    - Propose `content_renders` concept to catalog
    - _Requirements: 2_
    - _Contracts: content_renders_link_

  - [x] 2.4 Verify existing tests + write new tests
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Run existing Button-CTA test suite — all must pass unchanged
    - Write tests: renders `<a>` with href, correct href value, rel on target="_blank", Space does NOT activate, Enter activates, role is link
    - _Requirements: 2_

  - [x] 2.5 Update README
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Lina
    - Document `href` prop and polymorphic behavior
    - Document that `disabled` is ignored when `href` is set
    - Document explicit icon approach for outbound links
    - _Requirements: 2_

---

- [x] 3. Phase A: Foundation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Sparky

  **Success Criteria:**
  - Page layout renders with full-bleed sections and constrained content columns
  - Scrolling through sections triggers correct nav colors and text mode swap
  - Reveal classes toggle on intersection (elements animate into view)
  - `prefers-reduced-motion` disables all animation (elements immediately visible)
  - Hero and Ecosystem section scaffolds render with correct backgrounds

  **Primary Artifacts:**
  - `src/pages/index.html` (or equivalent page structure)
  - `src/styles/layout.css` — page layout, section containers
  - `src/styles/reveal.css` — reveal animation system
  - `src/styles/utilities.css` — hard shadow, text shadow, prefix utilities
  - `src/scripts/scroll-nav.ts` — scroll-linked nav color observer
  - `src/scripts/reveal.ts` — reveal animation observer

  **Completion Documentation:**
  - Detailed: `.kiro/specs/001-portfolio-page-architecture/completion/task-3-completion.md`
  - Summary: `docs/specs/001-portfolio-page-architecture/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Phase A Foundation"`
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Page layout scaffolding
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Create HTML structure: `<main>` with `<section>` elements for all sections + `<footer>`
    - Add data attributes for nav color config on each section
    - Apply full-bleed backgrounds with `breakpointLg` max-width content columns
    - Section padding per visual profiles (varies per section)
    - _Requirements: 3_

  - [x] 3.2 Scroll-linked nav color system
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Implement Intersection Observer reading section data attributes
    - Derive rootMargin from nav element computed height
    - Update `--nav-bg-override`, `--nav-glow-color`, `--nav-border-color` on intersection
    - Implement text mode snap (class toggle, no transition on text color)
    - Background transitions via CSS `transition` at `duration150`
    - _Requirements: 4_

  - [x] 3.3 Scroll-reveal animation system
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Implement `.reveal-hidden` / `.reveal-visible` CSS classes
    - Implement Intersection Observer toggling classes (one-shot, ~0.15 threshold)
    - Implement stagger delay (75ms between siblings via `transition-delay`)
    - Implement `prefers-reduced-motion` override (no animation, immediate visibility)
    - _Requirements: 5, 19_

  - [x] 3.4 CSS utilities (hard shadow, text shadow, prefix)
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Create `.hard-shadow` utility with `--hard-shadow-color` custom property
    - Create `.text-shadow-hard` utility with `--text-shadow-color` custom property
    - Create `.section-heading` / `.section-prefix` utility classes
    - _Requirements: 16, 20_

  - [x] 3.5 Hero + Ecosystem scaffolds
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Hero: container, `green100` background with angular gradient at `opacity008`, headline, subtext, placeholder for chord diagram, placeholder for CTAs (built in Task 10.1)
    - Ecosystem: container, `yellow300` background, section heading with `//` prefix, empty interior placeholder
    - _Requirements: 12, 13_

---

- [x] 4. Phase B: Stats Bar

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Sparky

  **Success Criteria:**
  - Stats section renders with correct layout, colors, and noise texture
  - Count-up animation triggers on scroll reveal
  - Text shadow applies to all text
  - `prefers-reduced-motion` shows final values immediately

  **Primary Artifacts:**
  - `src/sections/stats/` — section HTML, CSS, JS

  **Completion Documentation:**
  - Detailed: `.kiro/specs/001-portfolio-page-architecture/completion/task-4-completion.md`
  - Summary: `docs/specs/001-portfolio-page-architecture/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Phase B Stats Bar"`
  - Verify: Check GitHub for committed changes

  - [x] 4.1 Stats section layout and styling
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Build stats layout per visual profile #3 and grid column spec (3 + 9 cols)
    - Apply `pink100` background with noise texture SVG at `opacity024`
    - Apply text colors: display "1" → `pink300`, numbers → `color.contrast.onLight`, labels → `pink500`
    - Apply `.text-shadow-hard` with `--text-shadow-color: var(--pink-500)`
    - _Requirements: 6_

  - [x] 4.2 Stats count-up animation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Implement count-up via `requestAnimationFrame` interpolation
    - Trigger simultaneously with reveal animation
    - Handle suffixes (+, %, k+) and prefix (-)
    - `prefers-reduced-motion`: render final values immediately
    - _Requirements: 6, 19_

---

- [x] 5. Phase C: Why Build

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Sparky

  **Success Criteria:**
  - Four Container-Card-Base cards render with correct styling
  - Background gradient + exclusion texture displays correctly
  - Easter egg flickers on hover, respects reduced motion
  - Hard shadow applies to cards

  **Primary Artifacts:**
  - `src/sections/why-build/` — section HTML, CSS

  **Completion Documentation:**
  - Detailed: `.kiro/specs/001-portfolio-page-architecture/completion/task-5-completion.md`
  - Summary: `docs/specs/001-portfolio-page-architecture/task-5-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Phase C Why Build"`
  - Verify: Check GitHub for committed changes

  - [x] 5.1 Why Build section build
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Build four Container-Card-Base cards with `purple100` fill
    - Apply hard shadow: `--hard-shadow-color: var(--purple-300)`
    - Card padding: `inset.200` block, `inset.300` inline
    - Background: radial gradient (`pink300` → `pink500`) + exclusion texture (CSS-first, SVG fallback)
    - Section heading with `//` prefix, `color.contrast.onDark`
    - Card text: `color.text.default`
    - _Requirements: 7_

  - [x] 5.2 Easter egg: "Because why not!?"
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Create `green100` transition zone above section
    - Implement neon flicker keyframe animation on hover
    - `prefers-reduced-motion`: instant show, no flicker
    - Mobile: hidden (no hover capability)
    - _Requirements: 17_

---

- [x] 6. Phase D: Critical Features

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Sparky

  **Success Criteria:**
  - 2×3 feature card grid renders correctly
  - Diamond lattice background pattern displays
  - Hard shadow applies to cards
  - Feature descriptions use `color.text.muted`

  **Primary Artifacts:**
  - `src/sections/critical-features/` — section HTML, CSS

  **Completion Documentation:**
  - Detailed: `.kiro/specs/001-portfolio-page-architecture/completion/task-6-completion.md`
  - Summary: `docs/specs/001-portfolio-page-architecture/task-6-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 6 Complete: Phase D Critical Features"`
  - Verify: Check GitHub for committed changes

  - [x] 6.1 Critical Features section build
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Build 2×3 grid of feature cards
    - Cards: `color.structure.surface` @ `opacity080`, hard shadow `--hard-shadow-color: var(--pink-300)`
    - Background: `orange100` + angular gradient at `opacity024` + diamond lattice (CSS-first, SVG fallback)
    - Feature titles: `color.contrast.onLight`. Descriptions: `color.text.muted`.
    - Spacing per visual profile #7
    - _Requirements: 8_

---

- [x] 7. Phase E: Code Screenshots

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Sparky

  **Success Criteria:**
  - Code screenshot images render with blend-mode treatment
  - Halftone overlay displays
  - Section background is `orange300`

  **Primary Artifacts:**
  - `src/sections/code-screenshots/` — section HTML, CSS

  **Completion Documentation:**
  - Detailed: `.kiro/specs/001-portfolio-page-architecture/completion/task-7-completion.md`
  - Summary: `docs/specs/001-portfolio-page-architecture/task-7-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 7 Complete: Phase E Code Screenshots"`
  - Verify: Check GitHub for committed changes

  - [x] 7.1 Code Screenshots section build
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Apply `orange300` background
    - Composite code screenshot images with `mix-blend-mode`
    - Apply halftone pattern overlay
    - Scaffold with placeholder containers if assets not yet available
    - _Requirements: 9_

---

- [x] 8. Phase F: How Built + Special Thanks

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Sparky

  **Success Criteria:**
  - Frosted glass cards render with backdrop blur over gradient
  - Credits grid displays in 4-column layout (responsive)
  - Easter egg flickers on hover
  - Featured text renders at `fontSize700` / `fontWeight700`

  **Primary Artifacts:**
  - `src/sections/how-built/` — section HTML, CSS

  **Completion Documentation:**
  - Detailed: `.kiro/specs/001-portfolio-page-architecture/completion/task-8-completion.md`
  - Summary: `docs/specs/001-portfolio-page-architecture/task-8-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 8 Complete: Phase F How Built"`
  - Verify: Check GitHub for committed changes

  - [x] 8.1 How Built section build
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Background: radial gradient (`teal200` → `yellow300`) + halftone circles (`pink200` @ `opacity024`)
    - Content containers: `orange100` @ `opacity056` + `backdrop-filter: blur(var(--blur-100))` + hard shadow `--hard-shadow-color: var(--cyan-300)`
    - Featured text: `fontSize700` / `fontWeight700`
    - Two-column layout per grid spec (7 + 5 cols)
    - All text: `color.contrast.onLight`
    - _Requirements: 10_

  - [x] 8.2 Special Thanks sub-section
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Same frosted card treatment as How Built
    - Credits grid: 4-column CSS Grid (responsive: 2-col at sm, 1-col at xs)
    - _Requirements: 10_

  - [x] 8.3 Easter egg: "Hard $#@%ing work!"
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - `purple100` fill + `orange300` stroke text
    - Neon flicker animation on hover in transition zone above section
    - `prefers-reduced-motion`: instant show
    - _Requirements: 17_

---

- [x] 9. Phase G: Who Built This (Partial)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Sparky

  **Success Criteria:**
  - Section shell renders with `black300` background
  - Bio text, title, and employer badges display correctly
  - Placeholder area reserved for career timeline (Spec 004)
  - Accent text uses `color.action.navigation`

  **Primary Artifacts:**
  - `src/sections/who-built/` — section HTML, CSS

  **Completion Documentation:**
  - Detailed: `.kiro/specs/001-portfolio-page-architecture/completion/task-9-completion.md`
  - Summary: `docs/specs/001-portfolio-page-architecture/task-9-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 9 Complete: Phase G Who Built This"`
  - Verify: Check GitHub for committed changes

  - [x] 9.1 Who Built This partial build
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - `black300` background
    - Section heading with `//` prefix
    - Bio text + professional title: `color.contrast.onDark`
    - Accent text: `color.action.navigation`
    - Employer badges: Badge-Label-Base instances
    - Empty placeholder container for career timeline (Spec 004)
    - _Requirements: 14_

---

- [x] 10. Phase H: Hero CTAs + CTA Section + Footer

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Sparky

  **Success Criteria:**
  - Hero CTAs render with correct links and outbound icons
  - CTA section renders with value props, two outbound Button-CTAs, and photo
  - Footer renders with logo, name, and email
  - All outbound links open in new tab with correct rel attributes

  **Primary Artifacts:**
  - `src/sections/hero/` (CTAs added to scaffold)
  - `src/sections/cta/` — section HTML, CSS
  - `src/sections/footer/` — footer HTML, CSS

  **Completion Documentation:**
  - Detailed: `.kiro/specs/001-portfolio-page-architecture/completion/task-10-completion.md`
  - Summary: `docs/specs/001-portfolio-page-architecture/task-10-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 10 Complete: Phase H CTAs + Footer"`
  - Verify: Check GitHub for committed changes

  - [x] 10.1 Hero CTAs
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - "View the system": Button-CTA primary, `href="https://github.com/3fn/DesignerPunkv2"`, `target="_blank"`, `icon="external-link"`, `iconPosition="trailing"`
    - "Learn more": Button-CTA secondary, smooth-scroll to `#why-build` (internal, no outbound icon)
    - _Requirements: 12_

  - [x] 10.2 CTA section build
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - `green100` background, outer `white100` frame
    - Value proposition text at display weight
    - "Peter on LinkedIn": Button-CTA primary, `href`, `target="_blank"`, `icon="external-link"`, `iconPosition="trailing"`
    - "DesignerPunk on GitHub": Button-CTA secondary (`color.structure.surface` fill), `href`, `target="_blank"`, `icon="external-link"`, `iconPosition="trailing"`
    - Photo asset placement
    - _Requirements: 11_

  - [x] 10.3 Footer build
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - `black500` background
    - Logo, "Peter Michaels Allen", separator (◌), email
    - All text: `color.contrast.onDark`
    - Spacing: `inset.300` vertical, `related.normal` between items
    - _Requirements: 15_

---

- [x] 11. Phase J: Polish

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  **Agent**: Sparky

  **Success Criteria:**
  - All section headings render with `//` or `!!` prefix (aria-hidden)
  - All sections respond correctly to breakpoints (column reduction, stacking)
  - Easter egg timing feels right (tuned with Peter)
  - Hard shadow utility applied consistently across all sections

  **Primary Artifacts:**
  - `src/styles/responsive.css` — breakpoint media queries
  - Section files updated with prefix pattern and responsive adjustments

  **Completion Documentation:**
  - Detailed: `.kiro/specs/001-portfolio-page-architecture/completion/task-11-completion.md`
  - Summary: `docs/specs/001-portfolio-page-architecture/task-11-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 11 Complete: Phase J Polish"`
  - Verify: Check GitHub for committed changes

  - [x] 11.1 Section heading prefixes
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Apply `.section-heading` / `.section-prefix` utility to all section headings
    - Verify `aria-hidden="true"` on all prefix elements
    - Verify screen readers announce only heading text
    - _Requirements: 16_

  - [x] 11.2 Responsive breakpoints
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Implement column reduction at `sm` (768–1023px): 4→2, 2×3→2×2, side-by-side→stacked
    - Implement single-column stack at `xs` (<768px)
    - Use DesignerPunk grid tokens (`gridGutter*`, `gridMargin*`)
    - Document responsive decisions made for Phase 2 reference
    - _Requirements: 18_

  - [x] 11.3 Easter egg timing refinement
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Tune flicker keyframe timing with Peter
    - Verify both easter eggs feel consistent
    - Verify `prefers-reduced-motion` behavior
    - _Requirements: 17_

---
