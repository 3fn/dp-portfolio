# Typography Alignment Request — DP-Portfolio

**Date**: 2026-05-09
**From**: Leonardo
**For**: Ada
**Context**: Spec 001 (Portfolio Page Architecture) — need semantic token mappings and component token recommendations for typography used across the page.

---

## Raw Typography Usage (from Figma analyses)

| Element | Font Size | Weight | Line Height | Context | Section |
|---------|-----------|--------|-------------|---------|---------|
| "1" (hero stat) | 128px | 700 | 128px | Single monumental number | Stats |
| "217", "193", etc. (stat numbers) | 29px | 600 | ~36px | Metric values | Stats |
| "Primitive tokens" (stat labels) | 18px | 500 | ~28px | Metric labels | Stats |
| "Human" (stat label) | 18px | 500 | ~28px | Metric label | Stats |
| Section headings ("// Why build...") | 33px | 700 | 40px | Section titles | All |
| "//" prefix | 33px | 700 | 40px | Decorative prefix | All |
| Featured text ("DesignerPunk was built...") | 42px | 700 | ~48px | Bold statement | How Built |
| Card headings ("Challenge", "Insight") | ? | 700 | ? | Card titles | Why Build |
| Body copy (paragraphs) | ? | 400 | ? | Long-form text | Multiple |
| Credits names | ? | 400 | ? | Name list | Special Thanks |
| Footer text | 20px | 700 | 28px | Contact info | Footer |
| CTA section heading | 33px | 700 | 40px | Section title | Accomplish |
| "Hard $#@%ing work!" (Easter egg) | ? | ? | ? | Display decorative | How Built |
| "Because why not!?" (Easter egg) | ? | ? | ? | Display decorative | Why Build |
| Value props ("Problem solve...") | ? | ? | ? | Bold taglines | Accomplish |

---

## Questions for Ada

### 1. Semantic Mappings

Which existing semantic typography tokens map to these usages?

- 33px/700 section headings → `typography.h2`? `typography.h3`?
- 42px/700 featured text → `typography.h1`?
- 29px/600 stat numbers → `typography.h3`? Or needs a new semantic?
- 18px/500 stat labels → `typography.bodyMd` with different weight? Or new semantic?
- 20px/700 footer text → existing semantic?
- 128px/700 hero stat → definitely new — what primitive(s) needed?

### 2. New Primitives Needed

- `fontSize` above 700 (42px) — what does the modular scale produce for the next steps up toward 128px?
- Corresponding `lineHeight` primitives for large display sizes?
- Is `fontWeight500` already a primitive? (used for stat labels)

### 3. Component Tokens

Given the page's typography patterns, do you see component-level tokens that should be created? Potential candidates:

- **Stats component tokens**: `stats.number.fontSize`, `stats.label.fontSize`, `stats.hero.fontSize` (the "1")
- **Section heading tokens**: `section.heading.fontSize`, `section.prefix.fontSize`
- **Card heading tokens**: `card.heading.fontSize`
- **Easter egg display tokens**: `display.decorative.fontSize`

Or should these just reference existing semantics directly without a component token layer?

### 4. Font Family Confirmation

Spec 000 resolved font primitives (Figtree body, Commit Mono mono, Rajdhani display). Can you confirm:
- Which elements use display font (Rajdhani)? Likely: section headings, stat numbers, Easter egg text
- Which use body font (Figtree)? Likely: paragraphs, card content, labels
- Any mono (Commit Mono) usage on this page?

---

## Source Data

Full Figma extraction data available at:
- `analysis/analysis-stats/stats-analysis.md`
- `analysis/analysis-whybuild/whybuild-analysis.md`
- `analysis/analysis-howbuilt/howbuilt-analysis.md`
- `analysis/analysis-accomplish/accomplish-analysis.md`
- `analysis/analysis-footer/footer-analysis.md`
- `analysis/analysis-criticalfeatures/criticalfeatures-analysis.md`

---

*This request is non-blocking for Spec 001 scaffold work. Sparky can use raw values temporarily. But we need Ada's alignment before final token-compliant implementation.*
