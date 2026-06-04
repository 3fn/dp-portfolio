# Task 1.1 Completion: Create Product Token YAML Files

**Date**: 2026-06-01
**Task**: 1.1 Create product token YAML files
**Type**: Setup
**Status**: Complete

---

## Artifacts Created

| File | Action | Token Count |
|------|--------|-------------|
| `product/tokens/color.yaml` | Created | 10 tokens |
| `product/tokens/border.yaml` | Created | 3 tokens |
| `product/tokens/shadow.yaml` | Created | 1 token |
| `product/tokens/typography.yaml` | Created | 1 token |
| `product/tokens/layout.yaml` | Extended | +8 tokens |

**Total new tokens**: 23

---

## Implementation Notes

### Token Classification

Tokens were classified into ref (system primitive match) vs hard-value (no system equivalent):

**Ref tokens (13):**
- `vizSyntaxCyan` → cyan200, `vizSyntaxGreen` → green300, `vizSyntaxYellow` → yellow300, `vizSyntaxPink` → pink300
- `neonGlow` → green300
- `tooltipRadius` → radius025, `tooltipWidth` → borderWidth200
- `vizBranchGapColumn` → space150, `vizBranchGapRow` → space050, `vizBranchMarginTop` → space100
- `vizIndent` → space250

**Hard-value tokens (10):**
- Color: `vizArrowMuted`, `vizCommentMuted`, `backdropOverlay`, `tooltipBackground`, `footerTextMuted`
- Border: `quoteBorderWidth` (3px — between system 2px and 4px)
- Shadow: `cardHoverElevation`
- Layout: `tooltipMaxWidth` (270), `chordTipMaxWidth` (260), `sectionPrefixOffset` (-36), `modalHeaderMaxWidth` (200)
- Typography: `statsHeroSize` (8rem)

### Decisions Made

1. **vizSyntaxPink uses pink300** — Peter confirmed the original `#ff2d8f` is close enough to `pink300` (rgb 255, 42, 109) for syntax highlighting context. Eliminates a hard-value token.
2. **Neon glow uses green300 directly** — Peter confirmed alpha channel not needed; full opaque color works in text-shadow. Eliminates 3 separate opacity-variant tokens.
3. **Easter egg positions (80px, 155px, 64px) NOT tokenized** — classified as decorative coordinates per Product-Token-Governance "What NOT to Tokenize" guidance.
4. **`--font-size-1200` flagged but not created** — referenced in CSS for easter egg element but doesn't exist in system. Value unclear from experience map (64px vs 72px inconsistency). Not blocking — easter egg is hidden by default.

### Validation Corrections

During validation, 5 tokens initially written as hard values were corrected to refs after verifying system primitives:
- `tooltipRadius` (2) → ref radius025
- `tooltipWidth` (2) → ref borderWidth200
- `vizBranchGapColumn` (12) → ref space150
- `vizBranchGapRow` (4) → ref space050
- `vizBranchMarginTop` (8) → ref space100

Also corrected `quoteBorderWidth` rationale: referenced non-existent "borderWidth300" → corrected to "borderWidth400".

---

## Validation

- [x] All 6 YAML files pass `python3 yaml.safe_load()` — valid syntax
- [x] All token names confirmed camelCase (no kebab-case, no snake_case)
- [x] All hard-value tokens have `rationale` field
- [x] All ref tokens omit `rationale` (ref IS the rationale)
- [x] All tokens have `description` and `platforms` fields
- [x] Category names are lowercase ASCII
- [x] No system token matches missed (verified against MCP token search)
