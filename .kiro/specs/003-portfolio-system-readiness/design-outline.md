# Design Outline: Portfolio System Readiness

**Date**: 2026-05-25
**Spec**: 003-portfolio-system-readiness
**Owner**: Leonardo (architecture) → Ada (token creation) → Sparky (product infrastructure)
**Status**: Design Outline — pending discussion and review
**Source material**: Spec 002 coverage assessment, lessons learned (2026-05-25)

---

## Context

Spec 002 (Token Compliance Audit) identified system extensions and a product-level infrastructure gap that must be resolved before the portfolio page can be implemented. This spec delivers those changes — making the system ready for Spec 004 (implementation).

Three layers of work:

1. **Token system extensions** — new primitives and semantics identified by the audit
2. **Product-level custom property architecture** — establishing the pattern for product values that live outside Rosetta
3. **Product MCP / screen spec updates** — updating product context to reflect the current page design

**Prerequisite**: Spec 002 (Portfolio Token Compliance) ✅ Complete

---

## Layer 1: Token System Extensions

### New Primitives (Ada)

| Token | Value | Formula | Family | Rationale |
|-------|-------|---------|--------|-----------|
| space900 | 72 | base × 9 = 8 × 9 | spacing | Fills gap between space800 (64) and space1200 (96) |
| space1200 | 96 | base × 12 = 8 × 12 | spacing | Section padding — high frequency (5×) |
| space1600 | 128 | base × 16 = 8 × 16 | spacing | Section padding — clean power-of-two multiple |
| shadowOffsetY.600 | 24 | base × 6 = 4 × 6 | shadow | Modal elevation offset |
| blur400 | 64 | base × 4 = 16 × 4 | shadow | Modal elevation blur |

### New Semantics (Ada)

| Token | Reference | Category | Rationale |
|-------|-----------|----------|-----------|
| color.text.heading | black300 | color | Primary heading text — intentional two-tier contrast hierarchy |
| space.sectioned.generous | space1200 | spacing | Page-level vertical rhythm — extends existing tier |
| space.sectioned.expansive | space1600 | spacing | Page-level vertical rhythm — extends existing tier |

### Updated Semantics (Ada)

| Token | Change | Rationale |
|-------|--------|-----------|
| shadow.modal | Update to use shadowOffsetY.600 + blur400 | Dramatic modal elevation per prototype |

### Documentation Requirements

- Token Quick Reference updates for new spacing entries
- Shadow family documentation update
- color.text.* hierarchy documentation (heading joins default, muted, subtle)

---

## Layer 2: Product Token Infrastructure

### Status: RESOLVED — @3fn/core v11.7.0 shipped (2026-05-25)

The product token architecture discussion that originated from this spec's planning has been implemented by the @3fn/core team in v11.7.0 (Specs 108 + 109). The open questions from our earlier design discussion are now answered by the shipped implementation.

### What Shipped

- **Source format**: `product/tokens/*.yaml` (one file per category)
- **MCP discoverability**: `get_product_tokens` tool on the Product MCP
- **Platform generation**: CSS custom properties, Swift constants, Kotlin objects from YAML source
- **Validation CLI**: `npx designerpunk validate --product-tokens`
- **Config integration**: `productTokens: './product/tokens'` in `designerpunk.config.ts`
- **Ref resolution**: Refs emit platform-native references (`var(--space-300)`, `DesignTokens.space300`)

### Tasks for This Spec

1. Add `productTokens: './product/tokens'` to `designerpunk.config.ts`
2. Author `product/tokens/layout.yaml` with the 9 layout values from Spec 002
3. Author `product/tokens/motion.yaml` with motion values from Spec 002
4. Run `npx designerpunk generate` to produce `dist/product/ProductTokens.web.css`
5. Run `npx designerpunk validate --product-tokens` to verify refs resolve
6. Verify generated CSS output matches expected naming (`--product-layout-content-max-width`, etc.)

### Previously Open Questions — Now Resolved

| Question | Resolution (v11.7.0) |
|----------|---------------------|
| Naming taxonomy | `--product-{category}-{tokenName}` (kebab-case from camelCase YAML) |
| File structure | `product/tokens/{category}.yaml` — one file per category |
| Governance level | Validation rules enforce rationale on hard values, ref existence checks |
| Agent discoverability | `get_product_tokens` MCP tool with category/name/platform filters |
| Relationship to Product MCP | Product tokens are Product MCP content, served by `get_product_tokens` |
| Promotion criteria | `promotionCandidate` flag + Stacy's Lessons Synthesis Reviews |

### Feedback Items — Resolved

| Item | Resolution |
|------|-----------|
| Leonardo Q1 (hyphen in category names) | Category names must be lowercase ASCII a-z only (validated) |
| Leonardo Q5 (author before tooling?) | Tooling shipped — author and generate now |
| Sparky F1 (canonical→CSS mapping) | Generator handles it — no manual mapping needed |
| Sparky F7 (file placement) | Output: `dist/product/ProductTokens.web.css` |
| Sparky F5 (responsive) | Confirmed: responsive application is a consumer concern, not a token concern |
| Sparky F6 (ch + non-web) | Validated at generation time — platform-limited unitTypes enforced |

---

## Layer 3: Product MCP / Screen Spec Updates

### Scope: Full Screen Specification

The portfolio.yaml screen spec will be a complete Leonardo screen specification — component tree, state model, interaction specs, accessibility requirements, and token references. The prototype (`docs/specs/staticReview/hero-exploration.html`) serves as the visual/behavioral reference but is NOT the implementation source. The screen spec is the implementation source.

### What the Screen Spec Covers

| Section | Content |
|---------|---------|
| Component tree | UI hierarchy with token references per node (from Spec 002 mapping) |
| State model | Data driving each section, interaction states, conditional rendering |
| Interaction specs | Ecosystem modal FLIP animation, chord diagram hover/drag, career chart scroll-trigger + hover, agent portrait highlighting, easter egg triggers |
| Accessibility | Landmarks, heading hierarchy (h1→h2→h3), focus management (modal trap), skip-to-content, reduced motion behavior, aria attributes |
| Token mapping | Per-element token references (system tokens + product tokens) from Spec 002 analysis |
| Platform notes | Web-specific implementation guidance (Shadow DOM decisions, script loading, asset optimization) |

### Updates Needed

| File | What Changes | Scope |
|------|-------------|-------|
| `product/experience-map/pages/portfolio/portfolio.yaml` | Full rewrite — complete screen spec with all sections, interactions, and token references | Substantial |
| `product/overview.yaml` | Verify product context is current (name, scope, status) | Light |
| `product/roadmap.md` | Update to reflect Spec 002 completion, 003/004 planning, v11.7.0 adoption | Light |

### Visual Reference Annotations

The screen spec will include annotations like:
```yaml
visual-reference: docs/specs/staticReview/hero-exploration.html § .ecosystem
notes: "Prototype demonstrates the FLIP modal animation and connector line behavior. Semantic structure differs from prototype — see ui-tree below for compliant implementation."
```

This preserves the link between spec and prototype without making the prototype authoritative for implementation decisions.

### Dependency on Layer 2

~~The portfolio.yaml screen spec should reference product-level custom properties by their canonical names. This means Layer 2's naming decisions must be resolved before Layer 3 can be finalized.~~

**Resolved**: v11.7.0 shipped the naming convention (`--product-{category}-{tokenName}`). Layer 3 can reference product tokens by their canonical YAML names; the generated CSS names are deterministic.

---

## Sequencing

```
Layer 1 (Token Creation, Ada) ──────────────→ Spec 004 (Implementation, Sparky)
Layer 2 (Product Token Authoring, Leonardo) ─→ Spec 004
Layer 3 (Product Updates, Leonardo) ─────────→ Spec 004
```

All three layers can execute in parallel. Layer 2 is no longer a blocking design discussion — the architecture shipped in v11.7.0. Layer 1 (Ada's token creation) is the only dependency that requires new system artifacts before Spec 004 can fully execute.

---

## Risks

1. **Token creation blocking implementation**: If Ada's token creation takes time, Sparky could be blocked. Mitigation: Sparky can begin Spec 004 scaffolding while tokens are being created, using fallback values temporarily.
2. **Screen spec drift**: The prototype has evolved significantly since the last portfolio.yaml update. The screen spec rewrite may be substantial. Mitigation: Use the prototype as source of truth; the screen spec documents what exists, not what was planned.
3. **Product token ref resolution**: If system tokens from Layer 1 (new primitives) don't exist yet when product tokens reference them, validation will warn. Mitigation: Author Layer 1 tokens first, then Layer 2 product tokens that reference them.

---

## Success Criteria

- All 9 new/updated tokens exist in the system and pass pipeline validation
- Product-level custom property architecture is documented and implemented
- Portfolio screen spec reflects the current prototype accurately
- Spec 004 (implementation) can begin without ambiguity about what tokens, properties, or screen structure to use
