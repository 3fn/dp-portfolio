# Task 1.1 Completion: Update Font Family Primitives

**Date**: 2026-05-09
**Task**: 1.1 Update font family primitives
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `src/tokens/FontFamilyTokens.ts` — Updated fontFamilyBody and fontFamilyMono values (canonical source)
- `node_modules/@3fn/core/src/tokens/FontFamilyTokens.ts` — Same updates (pipeline runtime copy)
- `src/assets/fonts/figtree/figtree.css` — @font-face declarations for Figtree variable font
- `src/assets/fonts/commit-mono/commit-mono.css` — @font-face declarations for Commit Mono

## Implementation Details

### Approach

Updated two font family primitive tokens and created @font-face registration CSS following the existing pattern established by Inter and Rajdhani in `@3fn/core`.

### Changes

| Token | Before | After |
|-------|--------|-------|
| `fontFamilyBody` | `Inter, -apple-system, ...` | `Figtree, -apple-system, ...` |
| `fontFamilyMono` | `SF Mono, Monaco, ...` | `"Commit Mono", SF Mono, Monaco, ...` |
| `fontFamilyDisplay` | `Rajdhani, ...` | Unchanged |

### Key Decisions

1. **Commit Mono prepended to existing stack** — rather than replacing the entire mono stack, Commit Mono was added as the primary with existing system monospace fonts as fallbacks.
2. **Font files remain in `primitive-assets/`** — @font-face CSS references them via relative path (`../../../../primitive-assets/`) rather than moving files. Follows the principle that `primitive-assets/` is the asset source directory.
3. **Dual-edit required** — Pipeline reads from `node_modules/@3fn/core/src/tokens/`, not local `src/tokens/`. Both locations updated. See lessons learned: `product/lessons-learned/2026-05-09-pipeline-source-resolution.md`.

### Integration Points

- All semantic typography tokens (`bodySm`, `bodyMd`, `bodyLg`, `caption`, `labelXs`, etc.) reference `fontFamilyBody` — they now resolve to Figtree automatically.
- All semantic typography tokens using `fontFamilyDisplay` (headings, displayLabel) still resolve to Rajdhani.
- Pipeline generates correct values across all three platforms (Web CSS, iOS Swift, Android Kotlin).

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ Pipeline runs without errors (`npx designerpunk generate` exits 0)
- ✅ Semantic token validation passes
- ✅ Cross-platform consistency check passes

### Functional Validation
- ✅ Web output: `--font-family-body: Figtree, -apple-system, ...`
- ✅ Web output: `--font-family-mono: "Commit Mono", SF Mono, ...`
- ✅ Web output: `--font-family-display: Rajdhani, ...` (unchanged)
- ✅ iOS output: `fontFamilyBody = "Figtree, ..."`
- ✅ Android output: `font_family_body = "Figtree, ..."`
- ✅ 217 tokens generated per platform (count unchanged)

### Requirements Compliance
- ✅ Requirement 1, AC1: fontFamilyBody resolves to "Figtree"
- ✅ Requirement 1, AC2: fontFamilyMono resolves to "Commit Mono"
- ✅ Requirement 1, AC3: Web platform loads Figtree variable font via @font-face
- ✅ Requirement 1, AC4: Web platform loads Commit Mono via @font-face (400/700, regular/italic)
- ✅ Requirement 1, AC5: fontFamilyDisplay (Rajdhani) unchanged

### Validation Limitation

Unit tests for font family tokens (`FontFamilyTokens.test.ts`) exist in `@3fn/core` but cannot be run from this product repo — Jest ignores `node_modules/` by default and the product repo has no test runner configured. Validation relied on the pipeline's built-in checks (semantic validation, cross-platform consistency) and manual output verification. See `@3fn/core` feedback: `.kiro/agents/@3fn-core-feedback/ada-2026-05-09.md`.
