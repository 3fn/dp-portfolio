# Lessons Learned — Visual Implementation Requires Analysis + Spec + Dev Environment

**Date**: 2026-05-10
**Phase**: Spec 001 implementation (Tasks 3–11)
**Captured by**: Sparky
**For**: All product agents (Sparky, Kenya, Data)

---

## What Happened

During Spec 001 implementation, Sparky built all page sections using the design outline and design doc as the sole implementation reference. The result rendered structurally correct but typographically wrong — browser defaults instead of token-driven typography, incorrect font sizes, piecemeal CSS properties instead of composite typography tokens. Multiple correction rounds were needed.

Additionally, the dev server wasn't set up until after several sections were already built, meaning visual validation couldn't happen until late in the process. CORS errors from `file://` protocol blocked all CSS and JS loading when Peter tried to review.

## Root Cause

1. **Spec docs treated as sufficient for implementation.** They govern architecture and token governance decisions, but don't contain element-level precision (exact font-size, weight, line-height per text node).
2. **Analysis files not used as implementation reference.** The Figma analysis (`analysis/analysis-{section}/`) contains exact values per node — the ground truth for what was designed. Sparky read them for content extraction but not for styling values.
3. **Dev environment treated as optional.** Building without visual feedback meant errors accumulated across all sections before any were caught.
4. **Typography tokens applied piecemeal.** Individual `font-size` / `font-weight` primitives were used instead of the composite typography tokens (`typography-h3`, `typography-label-sm`, etc.) that encode the full type specification.

## Lessons

### 1. Dev environment before implementation

If you can't see what you're building, you're guessing. Dev server, fonts loaded, tokens rendering — that's step zero, not an afterthought.

### 2. Analysis files are the implementation reference

Spec docs govern decisions and architecture. Analysis files govern pixel-level execution. Both get read before writing CSS for a section — not one or the other.

### 3. One section at a time, validated visually

Build it, look at it, compare to reference, fix it, *then* move on. Phased structure exists for visual checkpoints, not just task-completion checkpoints.

### 4. Typography tokens are composites, not à la carte

Never reach for individual `font-size` / `font-weight` / `font-family` primitives. Find the typography token that matches the role, apply the full composite. The only exception is explicitly documented product CSS (e.g., 128px decorative display number that exceeds the token scale).

### 5. Map analysis values to tokens before writing code

When the analysis shows `font-size: 29, weight: 600` — look that up first: it's `typography-h3`. Do the mapping, then write the CSS. Don't write CSS and hope the token is right.

## Process Change

For future section builds:
1. Ensure dev server is running and page is viewable
2. Open the section's analysis file (`analysis/analysis-{section}/`)
3. Open the section's visual profile in the design outline
4. Map analysis values → typography/spacing/color tokens
5. Write CSS using token composites
6. Visually compare to reference image before moving to next section

## Applies To

- All product platform agents implementing from design specs
- Any visual implementation work (not just web — iOS and Android will have equivalent analysis-to-token mapping needs)
