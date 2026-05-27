# Typography Alignment Response — DP-Portfolio

**Date**: 2026-05-09
**From**: Ada
**For**: Leonardo
**Context**: Spec 001 (Portfolio Page Architecture) — typography token alignment

---

## 1. Semantic Token Mappings

### Direct Matches (existing semantic tokens cover these exactly)

| Element | Figma Values | Semantic Token | Primitives |
|---------|-------------|----------------|------------|
| Section headings ("// Why build...") | 33px / 700 / ~40px LH | `typography.h2` | fontSize500 (33) / lineHeight500 (1.212→40px) / fontFamilyDisplay / fontWeight700 |
| "//" prefix | 33px / 700 / ~40px LH | `typography.h2` | Same as above |
| Featured text ("DesignerPunk was built...") | 42px / 700 / ~48px LH | `typography.display` | fontSize700 (42) / lineHeight700 (1.143→48px) / fontFamilyDisplay / fontWeight700 |
| "Special thanks to:" heading | 42px / 700 / ~48px LH | `typography.display` | Same as above |
| Body copy (paragraphs) | 16px / 400 / 24px LH | `typography.bodyMd` | fontSize100 (16) / lineHeight100 (1.5→24px) / fontFamilyBody / fontWeight400 |
| Supporting body text | 18px / 400 / ~28px LH | `typography.bodyLg` | fontSize125 (18) / lineHeight125 (1.556→28px) / fontFamilyBody / fontWeight400 |
| Value props ("Problem solve...") | 37px / 700 / ~44px LH | `typography.h1` | fontSize600 (37) / lineHeight600 (1.19→44px) / fontFamilyDisplay / fontWeight700 |
| Footer text ("Peter Michaels Allen") | 20px / 700 / ~28px LH | `typography.h6` | fontSize150 (20) / lineHeight150 (1.4→28px) / fontFamilyDisplay / fontWeight700 |
| CTA section heading | 33px / 700 / ~40px LH | `typography.h2` | Same as section headings |

### Near Matches (existing primitives, weight mismatch on semantic)

| Element | Figma Values | Closest Semantic | Issue | Recommendation |
|---------|-------------|-----------------|-------|----------------|
| Stat numbers ("217", "193") | 29px / **600** / ~36px LH | `typography.h3` | **Exact match** — h3 uses fontSize400 (29px), lineHeight400 (1.241→36px), fontWeight**600** | ✅ Use `typography.h3` directly |
| Card headings ("Challenge", "Insight") | 29px / **700** / ~36px LH | `typography.h3` | Weight mismatch: h3 uses fontWeight600, Figma shows 700 | See analysis below |
| Stat labels ("Primitive tokens") | 14px / **500** / ~20px LH | `typography.bodySm` | Weight mismatch: bodySm uses fontWeight400, Figma shows 500 | See analysis below |
| "Human" stat label | 18px / **500** / ~28px LH | `typography.bodyLg` | Weight mismatch: bodyLg uses fontWeight400, Figma shows 500 | See analysis below |

### No Existing Match (new primitives needed)

| Element | Figma Values | Issue | Recommendation |
|---------|-------------|-------|----------------|
| Hero stat "1" | **128px** / 700 / 128px LH | Far beyond current scale max (42px) | New primitive required — see §2 |
| Easter egg "Hard $#@%ing work!" | **74px** / 700 / ? | Beyond current scale max | New primitive required — see §2 |
| Easter egg "Because why not!?" | **72px** / 700 / ? | Beyond current scale max | New primitive required — see §2 |

### Weight Mismatch Analysis

The Figma file shows card headings at 29px/700 while `typography.h3` uses fontWeight600. Two interpretations:

1. **Figma imprecision** — Rajdhani's 600 weight renders visually close to 700 at this size. The designer may have selected 700 in Figma but the semantic intent is "sub-heading" (h3 territory).
2. **Intentional distinction** — Card headings are meant to be bolder than standard h3 subsections.

**My recommendation**: Use `typography.h3` for stat numbers (which correctly show 600 weight in Figma). For card headings showing 700 weight, use `typography.h2` styling applied at h3 semantic level — or accept the 600→700 difference as a Figma approximation. **Peter's call.**

For stat labels (14px/500 and 18px/500): These use `fontWeight500` which exists as a primitive (`fontWeight500`). The semantic tokens `typography.bodySm` and `typography.bodyLg` use fontWeight400. This is a legitimate distinction — labels are medium-weight for visual hierarchy against their paired numbers. See §3 for component token recommendation.

---

## 2. New Primitive Tokens Needed

### Modular Scale Analysis (1.125 ratio, base 16)

The current scale tops out at `fontSize700` (42px). Continuing the 1.125 modular scale:

| Token Name | Scale Power | Raw Calculation | Rounded Value | 4pt Subgrid Adjusted |
|-----------|-------------|-----------------|---------------|---------------------|
| fontSize800 | 1.125⁹ | 16 × 2.887 = 46.2 | 46 | 47 |
| fontSize900 | 1.125¹⁰ | 16 × 3.247 = 51.9 | 52 | — |
| fontSize1000 | 1.125¹¹ | 16 × 3.653 = 58.5 | 58 | 59 |
| fontSize1100 | 1.125¹² | 16 × 4.110 = 65.8 | 66 | — |
| fontSize1200 | 1.125¹³ | 16 × 4.624 = 74.0 | 74 | — |
| fontSize1300 | 1.125¹⁴ | 16 × 5.202 = 83.2 | 83 | — |
| fontSize1400 | 1.125¹⁵ | 16 × 5.852 = 93.6 | 94 | — |
| fontSize1500 | 1.125¹⁶ | 16 × 6.584 = 105.3 | 105 | — |
| fontSize1600 | 1.125¹⁷ | 16 × 7.407 = 118.5 | 119 | — |
| fontSize1700 | 1.125¹⁸ | 16 × 8.333 = 133.3 | 133 | — |

### The 128px Problem

128px does **not** land on the modular scale. The closest scale values are:
- `fontSize1600` = 119px (7.0% below target)
- `fontSize1700` = 133px (3.9% above target)

**However**, 128px = 8 × 16 = exactly 8× the base value. This is a **baseline grid multiple** (128 ÷ 8 = 16 grid units). This makes it a legitimate `isStrategicFlexibility` or `baselineGridAlignment` token — it doesn't follow the modular scale but has mathematical justification through the 8px grid.

**Recommendation**: Create `fontSize1600` as a strategic flexibility token at **128px** with reasoning:
- `baselineGridAlignment: true` (128 = 8 × 16)
- `isStrategicFlexibility: true` (departs from modular scale for grid alignment)
- Mathematical relationship: `base × 8 = 16 × 8 = 128` (grid-aligned)

This is cleaner than forcing 119 or 133 and then needing a component token override. The value has clear mathematical justification.

**HOWEVER** — counter-argument: This sets a precedent for grid-aligned departures from the modular scale at display sizes. If we do this for 128, what stops 96 (8×12), 112 (8×14), etc.? The modular scale exists to prevent arbitrary values. Peter should weigh whether the "monumental hero number" use case justifies a strategic flexibility exception.

### Easter Egg Sizes (72px, 74px)

The modular scale produces `fontSize1200` = 74px. The Figma values are:
- "Hard $#@%ing work!" = 74px → **exact match** with `fontSize1200`
- "Because why not!?" = 72px → 2px off from fontSize1200

**Recommendation**: Both Easter eggs should use `fontSize1200` (74px). The 72px in Figma is likely a rounding artifact or manual adjustment. 74px is the mathematically correct scale value.

### Primitives Required (Pending Peter's Approval)

| Token | Value | Justification | Priority |
|-------|-------|---------------|----------|
| `fontSize1200` | 74px | Easter egg display text; exact modular scale value (1.125¹³) | Medium — Easter eggs are decorative |
| `fontSize1600` | 128px | Hero stat monumental number; grid-aligned strategic flexibility | High — hero section centerpiece |
| `lineHeight1200` | ~1.08 | Paired with fontSize1200 for display text (74 × 1.08 ≈ 80px, 8pt grid) | Medium |
| `lineHeight1600` | 1.0 | Paired with fontSize1600 for hero stat (128 × 1.0 = 128px, matching Figma) | High |

**Note on lineHeight1600 = 1.0**: The Figma shows line-height matching font-size (128px/128px). A 1.0 multiplier is appropriate for single-line monumental display text where vertical rhythm is irrelevant. This is consistent with display typography best practices.

### Already Existing Primitives (No Action Needed)

- `fontWeight500` ✅ Already exists
- `fontWeight600` ✅ Already exists
- `fontWeight700` ✅ Already exists

---

## 3. Component Token Recommendations

### Recommendation: NO component tokens for most elements

The majority of typography usage on this page maps cleanly to existing semantic tokens. Component tokens add governance overhead without benefit when semantics already cover the use case.

| Element | Use Semantic Token Directly | Reasoning |
|---------|---------------------------|-----------|
| Section headings | `typography.h2` | Exact match, reusable pattern |
| Featured text | `typography.display` | Exact match, reusable pattern |
| Body copy | `typography.bodyMd` | Exact match |
| Supporting text | `typography.bodyLg` | Exact match |
| Value props | `typography.h1` | Exact match |
| Footer text | `typography.h6` | Exact match |
| Card headings | `typography.h3` | Close enough (see weight discussion) |
| Stat numbers | `typography.h3` | Exact match (29px/600) |
| Credits names | `typography.bodyMd` | Exact match (16px/400) |

### Potential Component Tokens (Peter's Decision Required)

Two patterns emerge that *might* warrant component tokens:

#### A. Stat Label Typography (14px/500 and 18px/500)

The stat labels use medium weight (500) where body tokens use normal weight (400). This is a consistent pattern across 10+ stat label instances.

**Option 1 — No component token**: Use `typography.bodySm` / `typography.bodyLg` and override fontWeight to 500 at the component level. This is a single-property override, not a full typography composition.

**Option 2 — New semantic token**: Create `typography.labelMd` (already exists in the system for UI labels) — check if it matches. Looking at the source... `typography.labelMd` uses fontSize100 (16px) / fontWeight500. We'd need `typography.labelSm` for the 14px/500 case.

**My recommendation**: Option 1. The stat labels are a product-specific pattern. A single fontWeight override at the component level is simpler than creating component tokens for what amounts to "body text but medium weight." The existing `typography.labelSm` (if it exists at fontSize075/fontWeight500) or `typography.buttonSm` (14px/500) may already cover this.

**Actually** — checking the source: `typography.buttonSm` = fontSize075 (14px) / fontWeight500 / fontFamilyBody. This is semantically wrong for a stat label (it's not a button), but the values match. I'd recommend using the primitive references directly rather than misapplying a button token.

#### B. Hero Stat Typography (128px/700/128px LH)

If `fontSize1600` is approved, this would compose into a new semantic token:

```
'typography.displayHero': {
  fontSize: 'fontSize1600',      // 128px
  lineHeight: 'lineHeight1600',  // 1.0
  fontFamily: 'fontFamilyDisplay',
  fontWeight: 'fontWeight700',
  letterSpacing: 'letterSpacing100'
}
```

**Recommendation**: This should be a **semantic token** (`typography.displayHero`), not a component token. The "monumental single number" pattern could appear in other product contexts (dashboards, landing pages). It's a legitimate typography tier above `typography.display`.

#### C. Easter Egg Display Typography (74px/700)

```
'typography.displayLg': {
  fontSize: 'fontSize1200',      // 74px
  lineHeight: 'lineHeight1200',  // ~1.08
  fontFamily: 'fontFamilyDisplay',
  fontWeight: 'fontWeight700',
  letterSpacing: 'letterSpacing100'
}
```

**Recommendation**: Semantic token `typography.displayLg` — sits between `typography.display` (42px) and `typography.displayHero` (128px). Useful for large decorative text beyond standard display size.

### Summary: Token Creation Requests for Peter

| Token | Type | Value | Approval Needed |
|-------|------|-------|-----------------|
| `fontSize1200` | Primitive | 74px | Yes — new primitive |
| `fontSize1600` | Primitive | 128px (strategic flexibility) | Yes — new primitive, departs from scale |
| `lineHeight1200` | Primitive | ~1.08 (→80px with fontSize1200) | Yes — new primitive |
| `lineHeight1600` | Primitive | 1.0 (→128px with fontSize1600) | Yes — new primitive |
| `typography.displayLg` | Semantic | fontSize1200 / lineHeight1200 / display / 700 | Yes — new semantic |
| `typography.displayHero` | Semantic | fontSize1600 / lineHeight1600 / display / 700 | Yes — new semantic |

---

## 4. Font Family Confirmation

Based on the existing token system and Figma analysis:

| Font Family | Token | Elements on This Page |
|-------------|-------|----------------------|
| **Rajdhani** | `fontFamilyDisplay` | Section headings ("// Why build..."), stat numbers ("217"), hero stat ("1"), value props ("Problem solve..."), footer contact info, Easter egg text, card headings ("Challenge", "Insight") |
| **Figtree** | `fontFamilyBody` | Body paragraphs, supporting text, stat labels ("Primitive tokens", "Human"), credits names |
| **Commit Mono** | `fontFamilyMono` | **None identified** in current Figma analyses |

### Rationale

- **All bold/display text uses Rajdhani** — anything with fontWeight 600-700 at heading sizes uses the display font family. This includes the "//" decorative prefix.
- **All regular-weight body text uses Figtree** — paragraphs, labels, and secondary content.
- **Stat labels (14px/500, 18px/500)** — These are medium-weight body text. Despite being paired with display-font numbers, the labels themselves use **Figtree** (body font). The medium weight (500) provides hierarchy without switching to the display font.
- **Footer text** — 20px/700 maps to `typography.h6` which uses `fontFamilyDisplay` (Rajdhani). This is correct — the footer contact info is treated as a small heading, not body text.
- **No mono usage detected** — The portfolio page doesn't appear to use code blocks or technical content that would warrant Commit Mono.

### Confidence Level

High confidence on Rajdhani vs Figtree split. The Figma analysis doesn't explicitly name fonts (it reports sizes/weights), but the semantic token mappings make the family assignment clear:
- Anything mapping to `typography.h1`–`typography.h6`, `typography.display`, or `typography.displayLg`/`displayHero` → Rajdhani
- Anything mapping to `typography.body*`, `typography.label*`, `typography.button*` → Figtree

---

## Open Questions for Peter

1. **128px strategic flexibility**: Approve `fontSize1600` at 128px (grid-aligned, not modular-scale-aligned)?
2. **Card heading weight**: Accept `typography.h3` (fontWeight600) for card headings showing 700 in Figma, or create a variant?
3. **Stat label pattern**: Use primitive references directly (fontSize075 + fontWeight500 + fontFamilyBody) at the component level, or create a `typography.labelSm` semantic token?
4. **Easter egg priority**: Should `fontSize1200` / `typography.displayLg` be created now, or deferred since Easter eggs are non-critical?

---

*This response is grounded in the existing token source at `src/tokens/FontSizeTokens.ts`, `src/tokens/LineHeightTokens.ts`, `src/tokens/FontFamilyTokens.ts`, `src/tokens/FontWeightTokens.ts`, and `src/tokens/semantic/TypographyTokens.ts`.*
