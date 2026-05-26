# Design Outline: Portfolio Page Implementation

**Date**: 2026-05-26
**Spec**: 004-portfolio-page-implementation
**Owner**: Leonardo (specification) → Sparky (implementation)
**Status**: Design Outline — approved by Leonardo + Thurgood. Ready to formalize.
**Source material**: Spec 003 screen spec (portfolio.yaml), Spec 002 token mapping, hero-exploration.html (visual reference)

---

## Context

All prerequisites are complete. The system is ready for implementation:

- **Spec 002** ✅ — Token compliance audit with complete value→token mapping
- **Spec 003** ✅ — 9 system tokens created, 12 product tokens authored, full screen specification (~1400 lines)
- **@3fn/core v11.7.1** — Product token pipeline operational
- **Screen spec** — `product/experience-map/pages/portfolio/portfolio.yaml` is the implementation source of truth
- **Prototype** — `docs/specs/staticReview/hero-exploration.html` is the visual reference (preserved, not modified)

---

## Implementation Source of Truth

| Concern | Source |
|---------|--------|
| Semantic structure, token usage, accessibility | `portfolio.yaml` (screen spec) |
| Visual appearance, spacing feel, interaction timing | `hero-exploration.html` (prototype) |
| Token values and naming | `dist/tokens/DesignTokens.web.css` + `dist/tokens/product/ProductTokens.web.css` |
| Value→token mapping decisions | `.kiro/specs/002-portfolio-token-compliance/analysis/` |
| Optimization decisions | `portfolio.yaml` § `page-architecture.optimizations` |

Where screen spec and prototype conflict, the screen spec takes precedence for implementation decisions.

---

## Scope

### In Scope
- Semantic HTML implementation per screen spec ui-tree
- Full token compliance (system + product tokens, zero hard-coded values except documented exceptions)
- Responsive behavior at 3 breakpoints (desktop ≥1024, tablet 768-1023, mobile <768)
- All 5 interactions (ecosystem modal FLIP, chord diagram, career chart, agent portraits, easter eggs)
- Accessibility compliance (skip-to-content, focus trap, aria-hidden, reduced-motion, text alternatives)
- Asset optimization (image compression, font subsetting, lazy loading)
- Performance (critical CSS inlining, script splitting, IntersectionObserver lifecycle)
- CSS architecture (single combined stylesheet, token cascade)

### Out of Scope
- Content changes (copy is locked)
- Visual design changes (prototype is the reference)
- New component creation (confirmed: no new Stemma components needed)
- Token creation (all tokens exist from Spec 003)
- Mobile-specific interactions beyond responsive layout

---

## Key Implementation Decisions (Sparky's proposals — pending Leonardo review)

### 1. Shadow DOM boundaries

**Decision**: Minimal Web Component usage. `<button-cta>` consumed as Web Component (already exists, encapsulated). Everything else is page-level semantic HTML.

**Rationale**: The nav in the spec is a simple sticky `<nav>` with logo + links — no need for `<nav-header-app>` (which was the old design's component). Buttons benefit from Shadow DOM encapsulation and the existing implementation. Sections, layout, and content are plain HTML — no component overhead for static content.

**What changes from existing code**: The old `index.html` uses `<nav-header-app>` — we drop that in favor of a plain `<nav>` per the screen spec's ui-tree.

### 2. State management

**Decision**: Section-scoped scripts with no global coordinator.

**Pattern**:
- `scroll-nav.ts` — page-level IntersectionObserver (already works, keep as-is)
- `reveal.ts` — page-level scroll-reveal (already works, keep as-is)
- `stats.ts` — section-scoped counter animation (already works, keep as-is)
- `chord.ts` — self-contained, own IntersectionObserver lifecycle
- `career.ts` — self-contained, own IntersectionObserver lifecycle
- `ecosystem.ts` — section-scoped (modal FLIP + connector lines)
- `agents.ts` — section-scoped (portrait hover)

**Rationale**: No shared state between sections. Each script manages its own DOM scope and lifecycle. This matches the spec's `script-architecture.strategy: per-concern splitting` and keeps scripts independently testable.

### 3. Build output

**Decision**: Extend the existing esbuild config with new entry points.

**Config update**:
```
entry points: scroll-nav.ts, reveal.ts, stats.ts, chord.ts, career.ts, ecosystem.ts, agents.ts
output: dist/scripts/
format: esm, target: es2022
```

**Rationale**: The existing esbuild setup already does exactly what we need — per-concern bundling to ES modules. Just add the new entry points. No reason to replace what works.

**Loading strategy**: All scripts use `defer`. Canvas scripts (`chord.ts`, `career.ts`) additionally use IntersectionObserver internally for lazy initialization.

### 4. Component consumption

**Decision**: Consume `<button-cta>` as the Web Component.

**Rationale**: It already exists, is already registered in the current codebase (`src/scripts/components.ts`), and the spec explicitly references Button-CTA with variant/label props. Using the component gives us encapsulated styles, consistent behavior, and zero maintenance burden. The overhead of registering one custom element is negligible for a page with 5 canvas interactions.

**Implementation**: Keep `components.ts` entry point that registers `<button-cta>`. Use it in HTML as `<button-cta variant="primary" label="..." href="...">`.

### 5. Font subsetting workflow

**Decision**: Subset Rajdhani to WOFF2, weights 500/600/700, Latin characters only. Self-hosted at `src/assets/fonts/rajdhani/`.

**Current state**: Full TTF files for all 5 weights (~380KB each) are present. Only Medium (500), SemiBold (600), and Bold (700) are needed per the spec.

**Action needed**: Convert the 3 required weights to WOFF2 subsets (Latin only). Target ~30-40KB total. Create `src/assets/fonts/rajdhani/rajdhani.css` with @font-face declarations following the existing figtree.css pattern.

**Tool**: glyphhanger or pyftsubset — Peter to provide subsetted WOFF2 files, or Sparky can run subsetting if tooling is available.

### 6. Image optimization workflow

**Decision**: Manual optimization, stored in-place. ✅ Complete.

**Current state**: `bkgrnd-peter.jpg` optimized from 808KB → 120KB. Well within the spec's 150-200KB target. Lives at `src/assets/background/bkgrnd-peter.jpg`.

**Implementation**: Lazy-load via IntersectionObserver — apply a class that sets `background-image` when CTA section enters viewport. No WebP conversion needed at this file size.

---

## Task Structure (start fresh — informed by prototype)

**Approach**: New implementation from the screen spec's ui-tree. Existing `index.html` and per-section CSS files are replaced, not refactored. Working scripts (scroll-nav, reveal, stats) are preserved. Canvas/interaction scripts are extracted from the prototype into TypeScript modules.

### Phase 1: Foundation

1. **Asset preparation**: Subset Rajdhani to WOFF2 (500/600/700, Latin). Create `rajdhani.css` @font-face file. Remove unused TTF weights.
2. **Build config**: Update `package.json` esbuild entry points to include chord, career, ecosystem, agents. Update `build:page` and `dev` scripts.
3. **HTML structure**: New `index.html` from spec ui-tree — landmarks, heading hierarchy, skip-to-content, all 11 sections with correct semantic elements. Token stylesheet load order per spec. Script tags with defer.
4. **CSS architecture**: Single `portfolio.css` with full token-compliant styles. Critical CSS (nav + hero) extracted to inline `<style>` in `<head>`. Token cascade: DesignTokens.web.css → ProductTokens.web.css → fonts → portfolio.css.

### Phase 2: Sections (static content)

5. **Simple sections**: Nav, hero, stats, enterprise, code-shots, footer — layout, typography, spacing all via tokens. Responsive at 3 breakpoints.
6. **Content sections**: Why-build (cards, blockquote, easter egg markup), how-built (grid layout, ordered list), who-built/agents/thanks (badges, career chart placeholder, agent directory grid, thanks grid), CTA (background image lazy-load markup, featured text, buttons).

### Phase 3: Interactions

7. **Script extraction**: Extract chord diagram, career chart, ecosystem modal/connectors, and agent portrait scripts from prototype → TypeScript modules. Add IntersectionObserver lifecycle, `prefers-reduced-motion` checks, and proper typing.
8. **Ecosystem section**: FLIP modal interaction, connector line drawing (SVG), card click → modal open/close with focus trap and inert.
9. **Easter eggs**: CSS-only neon flicker via adjacent sibling selector on heading hover. Reduced-motion: instant reveal.

### Phase 4: Polish

10. **Accessibility**: Focus trap verification, aria attributes audit, visually-hidden text alternatives (chord description, career data table), external link labels, ecosystem card keyboard activation (role="button", Enter/Space).
11. **Performance**: IntersectionObserver lazy-loading for CTA background image, canvas lifecycle (pause/resume on visibility), font-display swap verification.
12. **Validation**: Token compliance check (zero hard-coded values except documented exceptions), responsive behavior at all 3 breakpoints, reduced-motion behavior for all animations.

### What's preserved from existing code
- `src/scripts/scroll-nav.ts` — works, matches spec
- `src/scripts/reveal.ts` — works, matches spec
- `src/scripts/stats.ts` — works, matches spec
- `src/scripts/components.ts` — registers button-cta, keep as-is

### What's replaced
- `src/pages/index.html` — new from spec ui-tree
- `src/styles/*.css` (11 files) — replaced by single `src/styles/portfolio.css` + inline critical CSS
- Old `<nav-header-app>` usage — replaced by plain `<nav>`

---

## Risks

1. **Canvas reimplementation scope**: The chord diagram and career chart are ~400 lines of JS each. Refactoring them for token compliance (color references, lifecycle management) while preserving visual fidelity is non-trivial.
2. **FLIP animation edge cases**: The modal FLIP pattern depends on accurate bounding rect measurement. Scroll position, sticky nav offset, and dynamic content height can all affect calculations.
3. **Responsive complexity**: 13 sections × 3 breakpoints = 39 layout states. Some sections (ecosystem 3-column, enterprise 2-column) need significant restructuring at mobile.
4. **Font subsetting**: If Rajdhani subset is too aggressive (missing glyphs), text rendering breaks silently. Need to verify all characters used on the page are included.
5. **SVG `<object>` load timing**: Ecosystem connectors and agent portrait interactions depend on accessing SVG `contentDocument` after load. CSP headers, incorrect file paths, or race conditions can cause silent failures. The agent portrait spec explicitly falls back to disabled interaction if load fails — ecosystem connectors should handle this gracefully too.

---

## Asset Status

| Asset | Status | Notes |
|-------|--------|-------|
| `bkgrnd-peter.jpg` | ✅ Optimized | 808KB → 120KB. Ready for use. |
| `bkgrnd-halftone.png` | ✅ Ready | 4.7KB. No optimization needed. |
| Rajdhani font | ✅ Ready | WOFF2 files present. `rajdhani.css` created with weights 500/600/700. |
| Figtree font | ✅ Ready | Already self-hosted with CSS. |
| Commit Mono font | ✅ Ready | Already self-hosted with CSS. |
| Hero illustration SVG | ✅ Ready | 417KB. Loaded via `<object>`. |
| System illustration SVG | ✅ Ready | 253KB. Loaded via `<object>`. |
| Agent portrait SVGs | ✅ Ready | 1-2.5MB each (3 files). Large but loaded below fold. |
| Code-shot SVGs | ✅ Ready | 326-559KB each (4 files). Decorative, below fold. |
| Header SVGs (Rosetta/Stemma/Civitas) | ✅ Ready | ~10KB each. |
| DesignerPunk logo | ✅ Ready | `primitive-assets/designerPunkLogo.svg` |
| DesignTokens.web.css | ✅ Generated | System tokens available. |
| ProductTokens.web.css | ✅ Generated | 12 product tokens available. |

### Font Subsetting Action Item — ✅ Resolved

WOFF2 files provided by Peter. `rajdhani.css` created with @font-face declarations for weights 500/600/700 only. All font files (including unused weights and TTFs) retained in directory for other purposes. Only the 3 declared weights will be loaded by the browser.

Delivery size: ~315KB for 3 weights (full character set WOFF2, not Latin-subsetted). Acceptable for v1 — Latin subsetting is a future optimization if needed.

**Blocking question**: ~~Does Peter have subsetting tooling available, or should Sparky attempt to run `pyftsubset` / `fonttools` if installed?~~ Resolved — WOFF2 provided directly.

---

## Next Steps

1. ~~Sparky reviews the screen spec (`portfolio.yaml`) and proposes answers to the 6 implementation decisions~~ ✅ Done
2. ~~Leonardo + Sparky align on the approach~~ ✅ All 6 decisions approved
3. ~~Resolve font subsetting (Peter provides WOFF2 or Sparky runs tooling)~~ ✅ Done — `rajdhani.css` created
4. ~~Thurgood reviews for spec quality~~ ✅ Ready to formalize (minor items addressed during formalization)
5. Formalize into requirements → design → tasks
