# Task 3.2 Completion: Map Typography Values to Tokens

**Spec**: 002 - Portfolio Token Compliance
**Task**: 3.2 - Map typography values to tokens
**Agent**: Ada
**Date**: 2026-05-24
**Status**: ✅ Complete

---

## What Was Done

Mapped all hard-coded typography values (font-size, font-weight, line-height, letter-spacing, font-family) from the value inventory to existing typography tokens. Applied exact-match-only methodology per design spec.

## Token Scale Used

- **Font size primitives**: fontSize050(13px) through fontSize700(42px) — 11 tokens on 1.125 modular scale
- **Font weight primitives**: fontWeight100 through fontWeight900 — 9 tokens
- **Line height primitives**: lineHeight050(1.538) through lineHeight700(1.143) — 11 tokens
- **Letter spacing primitives**: letterSpacing025(-0.025) through letterSpacing150(0.05) — 5 tokens
- **Font family primitives**: fontFamilyBody, fontFamilyDisplay, fontFamilyMono, fontFamilySystem
- **Composite tokens**: 24 semantic typography tokens (display, h1-h6, body, label, button, code, caption, legal)

## Results

| Category | Exact Match | No Match |
|----------|-------------|----------|
| Font size (individual) | 14 values | 32 values |
| Font weight | All (34 values) | 0 |
| Font family | 2 (body, display) | 1 (mono stack) |
| Line height | 2 (1.5, 1.4) | 10 distinct values |
| Letter spacing | 0 | 4 distinct values |
| Composite token | 1 (typography.bodyMd) | All others |

## Key Findings

1. **34px section heading (7×)** — the most impactful no-match. Falls between fontSize500(33) and fontSize600(37). Strong candidate for scale evaluation.

2. **12px (10×)** — below scale minimum of 13px. Used for small labels, badges, code. Evaluate as fontSize025 candidate or application-level exception.

3. **Only 1 composite match** — prototype uses bespoke line-heights extensively, preventing composite token alignment. The typography system's line-heights are mathematically derived; the prototype's are hand-tuned.

4. **Font weights fully covered** — no gaps in the weight scale.

5. **Mono font family mismatch** — prototype uses system mono (`ui-monospace`), token uses branded (`Commit Mono`). Likely intentional for code visualization context.

## Escalations to Phase 4

- Font sizes above scale: 48px, 64px, 72px (decorative), 36px
- Font sizes between steps: 34px (7×), 22px (3×), 30px, 15px (3×), 17px
- Font sizes below minimum: 12px (10×), 11px (2×), 10px (1×)
- Line heights: 10 distinct values with no token match
- Letter spacing: 4 distinct values with no token match
- Font family: mono stack mismatch (1×)

## Primary Artifact

- `.kiro/specs/002-portfolio-token-compliance/analysis/token-mapping.md` § "3.2 Typography Values"
