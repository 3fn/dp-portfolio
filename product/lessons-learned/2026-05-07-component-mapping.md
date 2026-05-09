# Lessons Learned — DP-Portfolio Component Mapping

**Date**: 2026-05-07
**Phase**: Phase 1 spec planning
**Captured by**: Leonardo
**For**: Stacy (Lessons Synthesis Review)

---

## 1. Application MCP: Context Search Gap

**What happened**: Queried `find_components({ context: "navigation" })` expecting to find Nav-Header-App. Returned empty.

**Expected**: Nav-Header-App should surface — its annotations list contexts: `["app-bars", "dashboards", "content-feeds"]`.

**Root cause hypothesis**: The context parameter likely requires exact match against the `contexts` array. "navigation" ≠ "app-bars". The search doesn't appear to do semantic matching or keyword expansion.

**Impact**: Architect had to know the component name already and query directly. For discovery-based workflows (which is the primary use case for product architects), this is a friction point.

**Recommendation**: Either expand context matching to include synonyms/related terms, or add "navigation" as an explicit context to Nav-Header-App's annotations.

**Route to**: Lina (component annotation update) or Ada (MCP tool behavior)

---

## 2. Experience Patterns: No Marketing/Content Page Coverage

**What happened**: Reviewed all 9 experience patterns. All are app-screen patterns (forms, settings, dashboards, onboarding). None apply to content-driven, scroll-based marketing pages.

**What was needed**: Patterns for hero sections, stats bars, feature grids, testimonial/credits layouts, scroll-reveal page structures.

**Assessment**: This is not a bug — the system was built for product apps. But it's a coverage gap now that DesignerPunk is being used to build a marketing site.

**Impact**: Low for this project (we'll build custom). Higher if more marketing/portfolio sites are built with DesignerPunk in the future.

**Recommendation**: Consider adding 2-3 content-page patterns post-Phase 1, informed by what we actually build here. Candidates:
- `hero-section` (headline + subtext + CTAs + media)
- `stats-bar` (metric grid with labels)
- `feature-grid` (card-based feature showcase)

**Route to**: Lina (pattern creation) after Phase 1 ships

---

## 3. Component Catalog: App-UI Weighted

**What happened**: Of 34 components, approximately 7 are relevant to a content-heavy marketing page (Nav-Header-App, Container-Base, Container-Card-Base, Badge-Label-Base, Button-CTA, Button-Icon, Icon-Base). The remaining 27 are form inputs, progress indicators, chips, and app navigation.

**Assessment**: Expected and correct for the system's current maturity. The catalog was built for product apps first. Marketing pages are a secondary use case that relies more on the token layer and structural primitives than on the component library.

**Impact**: The page will be ~70% custom compositions using DesignerPunk tokens for consistency, ~30% direct component usage. This is a valid consumption pattern, not a failure.

**Lesson**: The system's value for marketing pages is primarily: tokens (spacing, color, typography consistency), structural primitives (Container-Base, Container-Card-Base), and action components (buttons, badges, icons). The experience patterns and specialized components don't apply.

**Route to**: No action needed — this is an observation about the system's current scope, not a deficiency.

---

## 4. Product Config: Primitive Override Gap

**What happened**: Product needs to swap body font (Inter → Figtree) and mono font (SF Mono → Commit Mono). The `SemanticOverrideMap` only targets semantic tokens. No mechanism exists to override primitive tokens from product config.

**What was tried**: Reviewed `defineConfig`, `ConfigLoader`, `generateTokenFiles`, `SemanticOverrideResolver`. Primitives are loaded from `getAllPrimitiveTokens()` with no product-level injection point.

**Workaround**: Override every typography semantic token individually (verbose, fragile, maintenance burden on package upgrades).

**Correct solution**: A `primitiveOverrides` mechanism in `defineConfig` that lets products swap primitive token values before semantic resolution runs.

**Impact**: Blocking for font customization. This is the first thing any product will want to do — swap fonts — and the system doesn't support it cleanly.

**Route to**: Ada (Rosetta pipeline architecture)

---

## Summary

| # | Category | Severity | Route To |
|---|----------|----------|----------|
| 1 | MCP tool behavior | Low | Lina or Ada |
| 2 | Pattern coverage gap | Low (future) | Lina (post-Phase 1) |
| 3 | Catalog scope observation | Informational | None |
| 4 | Pipeline architecture gap | Blocking | Ada |
