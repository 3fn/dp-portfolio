# Hard Value → Token Mapping

**Spec**: 002 - Portfolio Token Compliance
**Task**: 3 - Hard Value → Token Mapping
**Agent**: Ada
**Date**: 2026-05-24

---

## Methodology

- **Spacing/Sizing**: 1-2px tolerance applied (design intent likely targeted the token)
- **Typography**: Exact match only
- **Color**: Exact match only
- **Radius/Border/Shadow/Motion**: Exact match only
- **Pre-resolved values**: Applied directly per design-outline § "Resolved Questions"

**Confidence levels**:
- `Exact` — value matches token precisely
- `Nearest (±Npx)` — within 1-2px tolerance (spacing/sizing only)
- `No match` — escalate to Phase 4

---

## 3.1 Spacing Values

### Padding — Hard-coded Values

| Selector | Property | Value | Target Token | Confidence |
|----------|----------|-------|--------------|------------|
| .stats | padding | 20px 0 | space250 (20), space000 (0) | Exact |
| .why-build | padding | 120px 0 96px | No match (120), space000 (0), No match (96) | No match |
| .why-build__quote | padding-left | 24px | space300 (24) | Exact |
| .why-build__card | padding | 36px 28px | No match (36), space350 N/A — No match (28) | No match (36), Nearest ±4 to space300(24) or space400(32) |
| .why-build__card h3 | padding-bottom | 14px | No match (14) | No match |
| .ecosystem | padding | 128px 0 | No match (128), space000 (0) | No match |
| .ecosystem__system | padding | 20px 24px | space250 (20), space300 (24) | Exact |
| .ecosystem__modal | padding | 40px | space500 (40) | Exact |
| .ecosystem__modal-close | padding | 4px 8px | space050 (4), space100 (8) | Exact |
| .ecosystem__modal-viz | padding | 24px | space300 (24) | Exact |
| .ecosystem__modal-stats | padding-top | 20px | space250 (20) | Exact |
| .ecosystem__modal-highlights li | padding-left | 14px | No match (14) | No match |
| .ecosystem__system-highlights li | padding-left | 10px | space125 (10) | Exact |
| .viz-indent | padding-left | 20px | space250 (20) | Exact |
| .how-built | padding | 128px 0 | No match (128), space000 (0) | No match |
| .how-built__grid | padding | 0 24px | space000 (0), space300 (24) | Exact |
| .how-built__body ol | padding | 8px 16px | space100 (8), space200 (16) | Exact |
| .enterprise | padding | 96px 0 | No match (96), space000 (0) | No match |
| .enterprise__grid | padding | 0 24px | space000 (0), space300 (24) | Exact |
| .code-shots | padding | 32px 0 96px | space400 (32), space000 (0), No match (96) | Exact (32), No match (96) |
| .who-built | padding | 96px 0 0 0 | No match (96), space000 (0) | No match |
| .agents | padding | 96px 0 56px 0 | No match (96), space000 (0), space700 (56), space000 (0) | No match (96), Exact (56) |
| .agents__inner | padding-inline | (already token ✓) | — | — |
| .agents__directory | padding | 16px 24px 4px 24px | space200 (16), space300 (24), space050 (4), space300 (24) | Exact |
| .agents__list li | padding-left | 24px | space300 (24) | Exact |
| .thanks | padding | 0 64px 56px | space000 (0), space800 (64), space700 (56) | Exact |
| .thanks__title | padding-bottom | 6px | space075 (6) | Exact |
| .cta | padding | 56px 128px 224px 48px | space700 (56), No match (128), No match (224), space600 (48) | Exact (56, 48), No match (128, 224) |
| .cta__body | padding | 12px 16px 12px 0px | space150 (12), space200 (16), space150 (12), space000 (0) | Exact |
| .footer | padding | 22px 0 | No match (22) | Nearest ±2 to space250 (20) |
| .footer__inner | padding-inline | (already token ✓) | — | — |

### Margin — Hard-coded Values

| Selector | Property | Value | Target Token | Confidence |
|----------|----------|-------|--------------|------------|
| .hero__content | margin-top | 88px | No match (88) | No match |
| .stats__hero-label | margin-top | 2px | space025 (2) | Exact |
| .stats__label | margin-top | 2px | space025 (2) | Exact |
| .why-build__heading | margin-bottom | 56px | space700 (56) | Exact |
| .why-build__heading | margin-left | 24px | space300 (24) | Exact |
| .why-build__quote | margin | 0 0 56px 24px | space000, space000, space700 (56), space300 (24) | Exact |
| .why-build__card h3 | margin-bottom | 16px | space200 (16) | Exact |
| .why-build__card p + p | margin-top | 12px | space150 (12) | Exact |
| .ecosystem__heading | margin-bottom | 56px | space700 (56) | Exact |
| .ecosystem__heading | margin-left | 24px | space300 (24) | Exact |
| .ecosystem__system-header | margin-bottom | 12px | space150 (12) | Exact |
| .ecosystem__system-desc | margin-bottom | 14px | No match (14) | No match |
| .ecosystem__system-highlights li | margin-bottom | 8px | space100 (8) | Exact |
| .ecosystem__modal-header | margin-bottom | 16px | space200 (16) | Exact |
| .ecosystem__modal-desc | margin-bottom | 20px | space250 (20) | Exact |
| .ecosystem__modal-highlights | margin | 0 0 24px | space000, space000, space300 (24) | Exact |
| .ecosystem__modal-highlights li | margin-bottom | 12px | space150 (12) | Exact |
| .ecosystem__modal-stat-label | margin-top | 2px | space025 (2) | Exact |
| .ecosystem__modal-viz-label | margin-bottom | 12px | space150 (12) | Exact |
| .viz-branch | margin-top | 8px | space100 (8) | Exact |
| .how-built__heading | margin-bottom | 56px | space700 (56) | Exact |
| .how-built__heading | margin-left | 24px | space300 (24) | Exact |
| .how-built__body | margin-top | 12px | space150 (12) | Exact |
| .how-built__body ol li | margin | 8px | space100 (8) | Exact |
| .how-built__featured p + p | margin-top | 28px | No match (28) | Nearest ±4 to space300(24) or space400(32) |
| .how-built__body p + p | margin-top | 16px | space200 (16) | Exact |
| .enterprise__heading | margin-bottom | 56px | space700 (56) | Exact |
| .enterprise__heading | margin-left | 24px | space300 (24) | Exact |
| .enterprise__item h3 | margin-bottom | 6px | space075 (6) | Exact |
| .code-shots__grid object:nth-child(2,4) | margin-top | 32px | space400 (32) | Exact |
| .who-built__heading | margin-bottom | 48px | space600 (48) | Exact |
| .who-built__heading | margin-left | 24px | space300 (24) | Exact |
| .who-built__name | margin-top | 6px | space075 (6) | Exact |
| .who-built__title | margin-top | 4px | space050 (4) | Exact |
| .who-built__copy | margin | 0 24px | space000, space300 (24) | Exact |
| .who-built__employers-label | margin-top | 24px | space300 (24) | Exact |
| .who-built__badges | margin-top | 12px | space150 (12) | Exact |
| .who-built__timeline | margin-top | 48px | space600 (48) | Exact |
| .agents__title | margin | 24px 0 8px 24px | space300 (24), space000, space100 (8), space300 (24) | Exact |
| .agents__role-header | margin-bottom | 20px | space250 (20) | Exact |
| .agents__list li | margin-bottom | 20px | space250 (20) | Exact |
| .agents__agent-system | margin-top | 2px | space025 (2) | Exact |
| .agents__agent-desc | margin-top | 2px | space025 (2) | Exact |
| .thanks | margin | 0 auto 128px | space000, auto (exempt), No match (128) | No match (128) |
| .thanks__title | margin-bottom | 24px | space300 (24) | Exact |
| .cta__heading | margin-bottom | 56px | space700 (56) | Exact |
| .cta__heading | margin-left | 24px | space300 (24) | Exact |
| .cta__grid | margin | 0 24px | space000, space300 (24) | Exact |
| .cta__body p + p | margin-top | 14px | No match (14) | No match |
| .cta__featured p + p | margin-top | 10px | space125 (10) | Exact |
| .cta__actions | margin-top | 36px | No match (36) | No match |

### Gap — Hard-coded Values

| Selector | Property | Value | Target Token | Confidence |
|----------|----------|-------|--------------|------------|
| .stats__items | row-gap | 12px | space150 (12) | Exact |
| .ecosystem__layout | gap | 32px 0 | space400 (32), space000 (0) | Exact |
| .ecosystem__modal-body | gap | 32px | space400 (32) | Exact |
| .ecosystem__modal-stats | gap | 24px | space300 (24) | Exact |
| .viz-branch | gap | 4px 12px | space050 (4), space150 (12) | Exact |
| .how-built__grid | gap | 72px | No match (72) | No match |
| .enterprise__grid | gap | 40px 72px | space500 (40), No match (72) | Exact (40), No match (72) |
| .agents__roles | gap | 56px | space700 (56) | Exact |
| .thanks__grid | gap | 24px | space300 (24) | Exact |
| .cta__actions | gap | 12px | space150 (12) | Exact |
| .who-built__badges | gap | 8px | space100 (8) | Exact |
| .footer__info | gap | 14px | No match (14) | No match |

### Width / Height / Max-Width — Hard-coded Values

| Selector | Property | Value | Target Token | Confidence |
|----------|----------|-------|--------------|------------|
| .nav__logo img | height | 16px | size200 (16) | Exact |
| .hero | max-width | 1336px | No match (1336) | No match — pre-resolved: product CSS custom property |
| .stats__grid | max-width | 1336px | No match (1336) | No match — pre-resolved: product CSS custom property |
| .why-build | max-width | 1336px | No match (1336) | No match — pre-resolved: product CSS custom property |
| .why-build__quote | max-width | 640px | No match (640) | No match |
| .ecosystem | max-width | 1336px | No match (1336) | No match — pre-resolved: product CSS custom property |
| .ecosystem__illustration object | max-width | 380px | No match (380) | No match |
| .ecosystem__system-header | max-width | 180px | No match (180) | No match |
| .ecosystem__modal | max-width | 1020px | No match (1020) | No match |
| .ecosystem__modal-header | max-width | 200px | No match (200) | No match |
| .how-built | max-width | 1336px | No match (1336) | No match — pre-resolved: product CSS custom property |
| .enterprise | max-width | 1336px | No match (1336) | No match — pre-resolved: product CSS custom property |
| .who-built | max-width | 1336px | No match (1336) | No match — pre-resolved: product CSS custom property |
| .agents__inner | max-width | 1336px | No match (1336) | No match — pre-resolved: product CSS custom property |
| .thanks | max-width | 1336px | No match (1336) | No match — pre-resolved: product CSS custom property |
| .cta | max-width | 1336px | No match (1336) | No match — pre-resolved: product CSS custom property |
| .cta__heading | max-width | calc((6/12 * 100%) - 24px) | No match (calc) | No match — layout calc |
| .cta__actions | max-width | 280px | No match (280) | No match |
| .footer__inner | max-width | 1336px | No match (1336) | No match — pre-resolved: product CSS custom property |
| .footer__logo img | height | 13px | No match (13) | Nearest ±1 to size150 (12) |
| .hero__description | max-width | 48ch | No match (ch unit) | No match — typographic constraint |
| @media ≤1023px .hero__illustration | max-width | 400px | No match (400) | No match |
| @media ≤767px .hero__illustration | max-width | 300px | No match (300) | No match |

### Inline Style Spacing Values

| Element | Property | Value | Target Token | Confidence |
|---------|----------|-------|--------------|------------|
| #career-tooltip | padding | 16px 20px | space200 (16), space250 (20) | Exact |
| #ct-title | margin-bottom | 4px | space050 (4) | Exact |
| #ct-period | margin-bottom | 10px | space125 (10) | Exact |
| Design/Eng rows | gap | 20px | space250 (20) | Exact |
| Design/Eng rows | margin-bottom | 4px | space050 (4) | Exact |
| #ct-desc | margin-top | 8px | space100 (8) | Exact |
| #ct-desc | padding-top | 8px | space100 (8) | Exact |
| #chord-tip | padding | 6px 12px | space075 (6), space150 (12) | Exact |

---

### 3.1 Summary — Spacing

| Confidence | Count |
|------------|-------|
| Exact match | ~95 individual values |
| Nearest (±1-2px) | 2 (footer padding 22px, footer logo 13px) |
| No match → Phase 4 | See below |

### No-Match Values for Phase 4 Escalation

| Value | Occurrences | Context | Notes |
|-------|-------------|---------|-------|
| 120px | 1 | .why-build padding-top | Pre-resolved: section padding, evaluate as space1500 candidate (8×15) |
| 96px | 5 | Section padding (.enterprise, .who-built, .agents, .code-shots, .why-build) | Pre-resolved: primitive candidate space1200 (8×12) |
| 128px | 4 | Section padding (.ecosystem, .how-built, .cta, .thanks margin) | Pre-resolved: primitive candidate space1600 (8×16) — note: size1600=128 exists in sizing family |
| 88px | 1 | .hero__content margin-top | Pre-resolved: ambiguous — snap to 80px or 96px? Peter decides |
| 72px | 2 | .how-built__grid gap, .enterprise__grid gap | Pre-resolved: primitive candidate space900 (8×9) — note: size900=72 exists in sizing family |
| 224px | 1 | .cta padding-bottom | No match (8×28) — large decorative spacing |
| 36px | 2 | .why-build__card padding-block, .cta__actions margin-top | No match (8×4.5) — half-step |
| 28px | 1 | .why-build__card padding-inline | No match (8×3.5) — half-step |
| 14px | 4 | Various padding-left, margin-bottom, gap | No match (8×1.75) — half-step |
| 22px | 1 | .footer padding | Nearest ±2 to space250 (20) — recommend snap |
| 640px | 1 | .why-build__quote max-width | Layout constraint |
| 380px | 1 | .ecosystem__illustration max-width | Layout constraint |
| 180px | 1 | .ecosystem__system-header max-width | Layout constraint |
| 1020px | 1 | .ecosystem__modal max-width | Layout constraint |
| 200px | 1 | .ecosystem__modal-header max-width | Layout constraint |
| 280px | 1 | .cta__actions max-width | Layout constraint |
| 400px | 1 | @media .hero__illustration max-width | Responsive layout constraint |
| 300px | 1 | @media .hero__illustration max-width | Responsive layout constraint |
| 48ch | 1 | .hero__description max-width | Typographic constraint (ch unit) |

### Pre-Resolved Confirmations

| Value | Resolution | Confirmed |
|-------|-----------|-----------|
| 56px = space700 | ✅ space700 exists (value=56) | ✅ |
| 72px → space900 candidate | size900=72 exists in sizing; spacing scale stops at space800=64 | ⚠️ Spacing gap — needs space900 |
| 96px → space1200 candidate | No existing token at 96 in either family | ⚠️ Needs new primitive |
| 128px → space1600 candidate | size1600=128 exists in sizing; not in spacing | ⚠️ Spacing gap — needs space1600 |
| 1336px → product CSS custom property | No token — correct disposition | ✅ |

---

## 3.2 Typography Values

### Reference: Font Size Scale (px equivalents at 16px base)

| Token | rem | px |
|-------|-----|-----|
| fontSize050 | 0.8125 | 13 |
| fontSize075 | 0.875 | 14 |
| fontSize100 | 1.0 | 16 |
| fontSize125 | 1.125 | 18 |
| fontSize150 | 1.25 | 20 |
| fontSize200 | 1.4375 | 23 |
| fontSize300 | 1.625 | 26 |
| fontSize400 | 1.8125 | 29 |
| fontSize500 | 2.0625 | 33 |
| fontSize600 | 2.3125 | 37 |
| fontSize700 | 2.625 | 42 |

### Reference: Composite Typography Tokens (resolved values)

| Token | fontSize (px) | lineHeight | fontFamily | fontWeight |
|-------|---------------|------------|------------|------------|
| typography.display | 42 | 1.143 | display | 700 |
| typography.h1 | 37 | 1.19 | display | 700 |
| typography.h2 | 33 | 1.212 | display | 700 |
| typography.h3 | 29 | 1.241 | display | 600 |
| typography.h4 | 26 | 1.231 | display | 600 |
| typography.h5 | 23 | 1.391 | display | 600 |
| typography.h6 | 20 | 1.4 | display | 700 |
| typography.bodyLg | 18 | 1.556 | body | 400 |
| typography.bodyMd | 16 | 1.5 | body | 400 |
| typography.bodySm | 14 | 1.429 | body | 400 |
| typography.caption | 13 | 1.538 | body | 300 |
| typography.legal | 13 | 1.538 | body | 400 |
| typography.labelXs | 13 | 1.538 | body | 500 |
| typography.labelSm | 14 | 1.429 | body | 500 |
| typography.labelMd | 16 | 1.5 | body | 500 |
| typography.labelLg | 18 | 1.556 | body | 500 |
| typography.buttonSm | 14 | 1.429 | body | 500 |
| typography.buttonMd | 16 | 1.5 | body | 500 |
| typography.buttonLg | 18 | 1.556 | body | 500 |
| typography.codeSm | 14 | 1.429 | mono | 400 |
| typography.codeMd | 16 | 1.5 | mono | 400 |
| typography.codeLg | 18 | 1.556 | mono | 400 |

### Font Size Mapping

| Selector | Value (px) | Nearest fontSize Token | Match? | Notes |
|----------|-----------|------------------------|--------|-------|
| .nav__logo-credit | 11px | — | No match | Below scale minimum (13px) |
| .hero__headline | 48px | — | No match | Above scale maximum (42px) |
| .stats__hero-number | 64px | — | No match | Above scale maximum |
| .stats__hero-label | 13px | fontSize050 (13) | Exact | |
| .stats__value | 22px | — | No match | Between fontSize150(20) and fontSize200(23) |
| .stats__label | 12px | — | No match | Below scale minimum (13px) |
| .why-build__easter | 72px | — | No match | Decorative — above scale maximum |
| .why-build__heading | 34px | — | No match | Between fontSize500(33) and fontSize600(37) |
| .why-build__quote | 22px | — | No match | Between fontSize150(20) and fontSize200(23) |
| .why-build__card h3 | 20px | fontSize150 (20) | Exact | |
| .why-build__card p | 14px | fontSize075 (14) | Exact | |
| .ecosystem__heading | 34px | — | No match | Between fontSize500(33) and fontSize600(37) |
| .ecosystem__system-desc | 13px | fontSize050 (13) | Exact | |
| .ecosystem__system-highlights li | 12px | — | No match | Below scale minimum |
| .ecosystem__modal-close | 24px | — | No match | Between fontSize200(23) and fontSize300(26) |
| .ecosystem__modal-desc | 15px | — | No match | Between fontSize075(14) and fontSize100(16) |
| .ecosystem__modal-highlights li | 14px | fontSize075 (14) | Exact | |
| .ecosystem__modal-viz | 12px | — | No match | Below scale minimum |
| .ecosystem__modal-viz-label | 10px | — | No match | Below scale minimum |
| .ecosystem__modal-stat-value | 22px | — | No match | Between fontSize150(20) and fontSize200(23) |
| .ecosystem__modal-stat-label | 11px | — | No match | Below scale minimum |
| .how-built__easter | 72px | — | No match | Decorative — above scale maximum |
| .how-built__heading | 34px | — | No match | Between fontSize500(33) and fontSize600(37) |
| .how-built__featured | 42px | fontSize700 (42) | Exact | |
| .how-built__body p | 16px | fontSize100 (16) | Exact | |
| .enterprise__heading | 34px | — | No match | Between fontSize500(33) and fontSize600(37) |
| .enterprise__item h3 | 17px | — | No match | Between fontSize100(16) and fontSize125(18) |
| .enterprise__item p | 18px | fontSize125 (18) | Exact | |
| .who-built__heading | 34px | — | No match | Between fontSize500(33) and fontSize600(37) |
| .who-built__human-label | 13px | fontSize050 (13) | Exact | |
| .who-built__name | 30px | — | No match | Between fontSize400(29) and fontSize500(33) |
| .who-built__title | 15px | — | No match | Between fontSize075(14) and fontSize100(16) |
| .who-built__employers-label | 13px | fontSize050 (13) | Exact | |
| .badge | 12px | — | No match | Below scale minimum |
| .agents__title | 13px | fontSize050 (13) | Exact | |
| .agents__agent-name | 15px | — | No match | Between fontSize075(14) and fontSize100(16) |
| .agents__agent-system | 12px | — | No match | Below scale minimum |
| .agents__agent-desc | 12px | — | No match | Below scale minimum |
| .thanks__title | 20px | fontSize150 (20) | Exact | |
| .thanks__grid | 16px | fontSize100 (16) | Exact | |
| .cta__heading | 34px | — | No match | Between fontSize500(33) and fontSize600(37) |
| .cta__body p | 16px | fontSize100 (16) | Exact | |
| .cta__featured p | 36px | — | No match | Between fontSize500(33) and fontSize600(37) |
| .footer__info | 12px | — | No match | Below scale minimum |

### Font Weight Mapping

All font-weight values in the prototype have exact token matches:

| Value | Token | Occurrences |
|-------|-------|-------------|
| 300 | fontWeight300 | 1 (.nav__logo-credit span) |
| 400 | fontWeight400 | 1 (.hero__description strong) |
| 500 | fontWeight500 | 4 (.stats__label, .why-build__quote, .who-built__employers-label, .badge) |
| 600 | fontWeight600 | 4 (.stats__hero-label, .ecosystem__modal-viz-label, .agents__agent-name, .agents__agent-system) |
| 700 | fontWeight700 | 24 (majority of headings and display text) |

### Font Family Mapping

| Prototype Value | Token | Match? |
|-----------------|-------|--------|
| var(--font-family-body) | fontFamilyBody | Token ✓ (already referenced) |
| var(--font-family-display) | fontFamilyDisplay | Token ✓ (already referenced) |
| ui-monospace, SFMono-Regular, monospace | fontFamilyMono | No match — prototype uses system mono stack, token uses Commit Mono stack |

### Line Height Mapping

| Prototype Value | Nearest Token | Match? |
|-----------------|---------------|--------|
| 1 | — | No match (display/stat numbers — intentional tight) |
| 1.1 | lineHeight700 (1.143) | No match |
| 1.4 | lineHeight150 (1.4) | Exact |
| 1.65 | — | No match |
| 1.55 | lineHeight125 (1.556) | No match (close but exact-only for typography) |
| 1.5 | lineHeight100 (1.5) | Exact |
| 1.6 | — | No match |
| 1.7 | — | No match |
| 1.24 | lineHeight300 (1.231) or lineHeight400 (1.241) | No match |
| 1.52 | lineHeight100 (1.5) | No match |
| 1.8 | — | No match |
| 1.25 | — | No match |

### Letter Spacing Mapping

| Prototype Value | Token Equivalent | Match? |
|-----------------|------------------|--------|
| 0.04em | — | No match (between letterSpacing125=0.025 and letterSpacing150=0.05) |
| 0.08em | — | No match (above letterSpacing150=0.05) |
| 0.02em | letterSpacing125 (0.025em) | No match (close but exact-only) |
| 0.01em | — | No match |

### Composite Typography Token Matching

For a composite match, ALL properties (fontSize, lineHeight, fontFamily, fontWeight) must match simultaneously.

| Selector | fontSize | lineHeight | fontFamily | fontWeight | Composite Match? |
|----------|----------|------------|------------|------------|-----------------|
| .how-built__body p | 16px ✓ | 1.5 ✓ | body (inherited) ✓ | 400 (inherited) ✓ | **typography.bodyMd** ✓ |
| .cta__body p | 16px ✓ | 1.6 ✗ | body (inherited) ✓ | 400 (inherited) ✓ | No — lineHeight mismatch |
| .thanks__grid | 16px ✓ | 1.8 ✗ | body (inherited) ✓ | 400 (inherited) ✓ | No — lineHeight mismatch |
| .why-build__card p | 14px ✓ | 1.65 ✗ | body (inherited) ✓ | 400 (inherited) ✓ | No — lineHeight mismatch |
| .enterprise__item p | 18px ✓ | 1.52 ✗ | body (inherited) ✓ | 400 (inherited) ✓ | No — lineHeight mismatch |
| .how-built__featured | 42px ✓ | 1.24 ✗ | display ✓ | 700 ✓ | No — lineHeight mismatch (token has 1.143) |
| .ecosystem__modal-viz | 12px ✗ | 1.7 ✗ | mono ✓ | 400 ✓ | No — fontSize below scale |

### Inline Style Typography

| Element | font-size | Token Match | Notes |
|---------|-----------|-------------|-------|
| #career-tooltip | 13px | fontSize050 (13) | Exact |
| #ct-title | 12px | — | No match — below scale |
| #ct-period | 12px | — | No match — below scale |
| #ct-desc | 12px | — | No match — below scale |
| #chord-tip | 12px | — | No match — below scale |

---

### 3.2 Summary — Typography

| Category | Exact Match | No Match |
|----------|-------------|----------|
| Font size (individual) | 14 values | 32 values |
| Font weight | All (34 values) | 0 |
| Font family | 2 (body, display) | 1 (mono stack mismatch) |
| Line height | 2 (1.5, 1.4) | 10 distinct values |
| Letter spacing | 0 | 4 distinct values |
| Composite token | 1 (typography.bodyMd) | All others |

### No-Match Values for Phase 4 Escalation

**Font sizes above scale maximum:**
| Value | Occurrences | Context |
|-------|-------------|---------|
| 48px | 1 | .hero__headline — hero display size |
| 64px | 1 | .stats__hero-number — stat display |
| 72px | 2 | .why-build__easter, .how-built__easter — decorative neon text |
| 36px | 1 | .cta__featured p — featured quote |

**Font sizes between scale steps:**
| Value | Occurrences | Context | Nearest tokens |
|-------|-------------|---------|----------------|
| 34px | 7 | Section headings (why-build, ecosystem, how-built, enterprise, who-built, cta) | fontSize500(33) or fontSize600(37) |
| 22px | 3 | .stats__value, .why-build__quote, .ecosystem__modal-stat-value | fontSize150(20) or fontSize200(23) |
| 30px | 1 | .who-built__name | fontSize400(29) or fontSize500(33) |
| 15px | 3 | .ecosystem__modal-desc, .who-built__title, .agents__agent-name | fontSize075(14) or fontSize100(16) |
| 17px | 1 | .enterprise__item h3 | fontSize100(16) or fontSize125(18) |

**Font sizes below scale minimum (13px):**
| Value | Occurrences | Context |
|-------|-------------|---------|
| 12px | 10 | Labels, badges, footer, code viz, tooltips |
| 11px | 2 | .nav__logo-credit, .ecosystem__modal-stat-label |
| 10px | 1 | .ecosystem__modal-viz-label |

**Line heights with no token match:**
| Value | Occurrences | Context |
|-------|-------------|---------|
| 1 | 3 | Display numbers, close button |
| 1.1 | 1 | .hero__headline |
| 1.24-1.25 | 2 | .how-built__featured, .cta__featured |
| 1.52-1.556 | 2 | .enterprise__item p, .ecosystem__system-desc |
| 1.6 | 3 | .ecosystem__modal-desc, .cta__body, #ct-desc |
| 1.65 | 1 | .why-build__card p |
| 1.7 | 1 | .ecosystem__modal-viz |
| 1.8 | 1 | .thanks__grid |

**Letter spacing with no token match:**
| Value | Occurrences | Context |
|-------|-------------|---------|
| 0.04em | 1 | .stats__hero-label |
| 0.08em | 3 | .who-built__human-label, .agents__title, .ecosystem__modal-viz-label |
| 0.02em | 1 | .agents__role-header |
| 0.01em | 1 | #chord-tip |

**Font family mismatch:**
| Value | Context | Notes |
|-------|---------|-------|
| ui-monospace, SFMono-Regular, monospace | .ecosystem__modal-viz, tooltips | System mono stack — token uses Commit Mono. Evaluate whether to align or keep as application-level exception. |

### Key Observations

1. **34px is the dominant no-match** — used 7× for section headings. It falls between fontSize500(33px) and fontSize600(37px). This is a strong candidate for either snapping to 33px or adding a scale step.

2. **12px appears 10×** — below the scale minimum of 13px. Used for small labels, badges, and code. Evaluate whether to add fontSize025 (12px) or treat as application-level exception.

3. **Only 1 full composite match** (typography.bodyMd) — the prototype uses custom line-heights extensively, preventing composite token matches. Most line-heights are bespoke values.

4. **Font weights all match** — the weight scale is fully sufficient.

5. **Mono font family mismatch** — prototype uses system mono stack (`ui-monospace`) while token uses branded stack (`Commit Mono`). This is likely intentional for the code visualization context.

---

## 3.3 Color Values

### Approach

The color inventory contains three categories:
1. **Already using semantic tokens** (Token ✓) — no action needed
2. **Using primitive tokens by name** (e.g., `var(--black-300)`) — already mapped to primitives, Phase 3 evaluates semantic promotion
3. **Truly hard-coded values** (hex, rgba without token reference) — need exact-match mapping here

This section maps category 3 (truly hard-coded) to existing tokens. Category 2 (primitive usage) is documented for completeness but the mapping is already established — Phase 3 (semantic promotion) will evaluate whether those primitives should become semantics.

### CSS Hard-Coded Colors (no token reference)

| Selector | Property | Value | Token Match | Confidence |
|----------|----------|-------|-------------|------------|
| .ecosystem__modal-backdrop | background | rgba(10, 10, 15, 0.6) | black300 + opacity (baked alpha) | Partial — base color matches black300 rgba(10,10,15,1), alpha=0.6 needs opacity token |
| .ecosystem__modal-viz-label | color | rgba(255,255,255,0.4) | white100 + opacity | Partial — base=white100, alpha=0.4 |
| .viz-source | color | #80F6FF | cyan200 rgba(128,246,255,1) | Exact |
| .viz-arrow | color | rgba(255,255,255,0.55) | white100 + opacity | Partial — base=white100, alpha=0.55 |
| .viz-output | color | #33FF99 | green300 rgba(51,255,153,1) | Exact |
| .viz-comment | color | rgba(255,255,255,0.72) | white100 + opacity | Partial — base=white100, alpha=0.72 |
| .viz-keyword | color | #F9F002 | yellow300 rgba(249,240,2,1) | Exact |
| .viz-value | color | #ff2d8f | No match | No match — #ff2d8f = rgba(255,45,143,1), pink300 = rgba(255,42,109,1) — different hue |
| .badge | color | #fff | white100 rgba(255,255,255,1) | Exact |
| .footer__info | color | rgba(255,255,255,0.6) | white100 + opacity | Partial — base=white100, alpha=0.6 |
| .cta__heading | background-color | #fefefe | No match | No match — rgba(254,254,254,1), white100=rgba(255,255,255,1) — near-miss but exact-only for color |
| .cta__body | background-color | #fefefe | No match | No match — same as above |
| .btn--primary (duplicate) | color | var(--white-200) | white200 | Primitive ✓ (already mapped) |

### Primitive Token Usage (already mapped — documented for Phase 3)

These values already reference primitives by name. No mapping needed — Phase 3 evaluates semantic promotion.

| Primitive | Occurrences | Contexts |
|-----------|-------------|----------|
| black-300 | 14 | Heading text (7×), nav background, card h3 border, badge-dark bg, modal close hover, stat values, thanks title border |
| black-100 | 8 | Body/description text, card body text, modal descriptions |
| black-500 | 2 | Modal viz background, footer background |
| gray-300 | 7 | Labels, descriptions, modal close, enterprise item p, agent desc |
| gray-200 | 7 | Section prefixes, human-label, employers-label, agents title |
| gray-100 | 4 | Stats hero border, card border-left, modal stats border, tooltip border |
| white-100 | 2 | Body background, modal background |
| white-200 | 5 | Btn-secondary bg, ecosystem system bg, how-built bg, agents directory bg |
| white-300 | 1 | .cta__featured p text |
| pink-500 | 1 | .stats__hero-label text |
| pink-100 | 1 | .how-built__easter text |
| green-100 | 1 | .why-build__easter text |
| green-300 | 1 | .why-build__card:hover background |
| green-500 | 2 | .why-build__card:hover border-left/right |

### Box Shadow Colors

| Selector | Shadow Color | Token Match | Confidence |
|----------|-------------|-------------|------------|
| .nav | rgba(0,0,0,0.3) | shadowBlack100 + opacity | Partial — base=shadowBlack100 rgba(0,0,0,1), alpha=0.3 |
| .ecosystem__system | rgba(0,0,0,0.3) | shadowBlack100 + opacity | Partial — same as above |
| .ecosystem__system:hover | rgba(0,0,0,0.35) | shadowBlack100 + opacity | Partial — alpha=0.35 |
| .ecosystem__modal | rgba(0,0,0,0.4) | shadowBlack100 + opacity | Partial — alpha=0.4 |
| .code-shots__grid object | rgba(0,0,0,0.08) | shadowBlack100 + opacity | Partial — alpha=0.08 |

### Neon Text Shadow Colors (decorative keyframes)

| Animation | Colors | Token Match | Confidence |
|-----------|--------|-------------|------------|
| neon-flicker (green) | rgba(51,255,153, 0.3–1.0) | green300 + varying opacity | Partial — base=green300 |
| neon-flicker-pink | rgba(255,42,109, 0.3–1.0) | pink300 + varying opacity | Partial — base=pink300 |

### Inline Style Colors

| Element | Property | Value | Token Match | Confidence |
|---------|----------|-------|-------------|------------|
| #career-tooltip | background | rgba(255,255,255,0.97) | white100 + opacity | Partial — near-opaque white |
| #career-tooltip | border-color | var(--gray-100) | gray-100 | Primitive ✓ |
| #career-tooltip | color | var(--black-300) | black-300 | Primitive ✓ |
| #ct-period | color | var(--gray-200) | gray-200 | Primitive ✓ |
| Design/Eng labels | color | var(--gray-300) | gray-300 | Primitive ✓ |
| #ct-design value | color | #e8006a | No match | No match — rgba(232,0,106,1), pink300=rgba(255,42,109,1) — different |
| #ct-eng value | color | var(--black-300) | black-300 | Primitive ✓ |
| #ct-desc | color | var(--gray-300) | gray-300 | Primitive ✓ |
| #ct-desc | border-color | var(--gray-100) | gray-100 | Primitive ✓ |
| #chord-tip | border-color | #ff2d8f | No match | Same as .viz-value — no exact primitive match |
| #chord-tip | color | #111 | No match | rgba(17,17,17,1) — near black300 rgba(10,10,15,1) but not exact |

### Canvas/JS Colors (documented for canvas audit — Task 6)

Per design-outline § "Resolved Questions" #4: visualization colors are application-level values, not tokenized. Documented here for completeness but not mapped to tokens.

**Chord Diagram PAL**: #ff2d8f, #00aabb, #e0006a, #1a5fff, #7a00cc, #009955, #009ab0, #cc0058
**Career Chart**: Multiple gradient and line colors (see inventory)
**Ecosystem Connectors**: #80F6FF, #80FFBB, #FCF680

Quick cross-reference to primitives:
- #80F6FF → cyan200 rgba(128,246,255,1) ✅ Exact
- #80FFBB → green200 rgba(128,255,187,1) ✅ Exact
- #FCF680 → yellow200 rgba(252,246,128,1) ✅ Exact
- #7a00cc → No match (purple400=rgba(141,30,204,1) is different)
- #00aabb → No match (no blue family; cyan500=rgba(0,136,143,1) is different)
- #1a5fff → No match (no blue family)
- #009955 → No match (green500=rgba(0,204,110,1) is different)

---

### 3.3 Summary — Color

| Category | Count |
|----------|-------|
| Already using semantic tokens (Token ✓) | 16 declarations |
| Using primitives by name (mapped, Phase 3 evaluates) | 55 declarations |
| Hard-coded → Exact token match | 6 values (cyan200, green300, yellow300, white100/#fff, green200, yellow200) |
| Hard-coded → Partial match (base color + opacity) | 12 values |
| Hard-coded → No match | 5 distinct values (#ff2d8f, #fefefe, #e8006a, #111, canvas-specific) |
| Canvas/JS colors (application-level, pre-resolved as exceptions) | ~25 values |

### No-Match Values for Phase 4 Escalation

| Value | Occurrences | Context | Notes |
|-------|-------------|---------|-------|
| #ff2d8f | 2 | .viz-value color, #chord-tip border | rgba(255,45,143,1) — near pink300 rgba(255,42,109,1) but hue differs. Chord diagram brand color. |
| #fefefe | 2 | .cta__heading bg, .cta__body bg | rgba(254,254,254,1) — 1 unit off white100. Likely prototype approximation. |
| #e8006a | 1 | #ct-design value color | rgba(232,0,106,1) — design-track accent in career tooltip. Near pink300 but different. |
| #111 | 1 | #chord-tip color | rgba(17,17,17,1) — near black300 rgba(10,10,15,1) but not exact. |
| rgba(10,10,15,0.6) | 1 | Modal backdrop | Base=black300, needs scrim/opacity composition |

### Partial Matches Requiring Opacity Composition

These values have a base color that matches a primitive but include a baked-in alpha channel. They need evaluation for whether to use the primitive + an opacity token, or whether a composed semantic (like `color.structure.border.subtle`) already handles the pattern.

| Base Color | Alpha | Occurrences | Existing Composed Token? |
|------------|-------|-------------|--------------------------|
| white100 (255,255,255) | 0.4, 0.55, 0.6, 0.72, 0.97 | 5 | No |
| black300/shadowBlack100 (0,0,0 or 10,10,15) | 0.08, 0.3, 0.35, 0.4, 0.6 | 6 | color.structure.border.subtle uses gray100+opacity048 |
| green300 (51,255,153) | 0.3–1.0 (keyframe) | 1 | No (decorative) |
| pink300 (255,42,109) | 0.3–1.0 (keyframe) | 1 | No (decorative) |

---

## 3.4 Radius, Border, Shadow, and Motion Values

### Radius Mapping (exact match only)

| Selector | Value | Token Match | Confidence |
|----------|-------|-------------|------------|
| .ecosystem__modal-viz | 4px | radius050 (4) | Exact |
| .code-shots__grid object | 6px | radius075 (6) | Exact |
| .badge | 14px | No match | No match — between radius150(12) and radius200(16) |
| .agents__directory | 4px | radius050 (4) | Exact |
| #career-tooltip | 4px | radius050 (4) | Exact |
| #chord-tip | 2px | radius025 (2) | Exact |

**Note**: Fallback-resolved values (entries #10-12 from Task 2) confirmed: design intent is 4px = radius050 for .ecosystem__system, .ecosystem__system::before, .ecosystem__modal.

### Border Width Mapping (exact match only)

| Selector | Value | Token Match | Confidence |
|----------|-------|-------------|------------|
| .stats | border-top/bottom | 1px | borderWidth100 (1) | Exact |
| .stats__hero | border-right | 1px | borderWidth100 (1) | Exact |
| .why-build__quote | border-left | 3px | No match | No match — between borderWidth200(2) and borderWidth400(4) |
| .why-build__card | border-left | 1px | borderWidth100 (1) | Exact |
| .why-build__card h3 | border-bottom | 2px | borderWidth200 (2) | Exact |
| .why-build__card:hover | border-left/right | 1px | borderWidth100 (1) | Exact |
| .ecosystem__system-highlights li | border-left | 2px | borderWidth200 (2) | Exact |
| .ecosystem__modal-highlights li | border-left | 2px | borderWidth200 (2) | Exact |
| .ecosystem__modal-stats | border-top | 1px | borderWidth100 (1) | Exact |
| .thanks__title | border-bottom | 2px | borderWidth200 (2) | Exact |
| #career-tooltip | border | 1px | borderWidth100 (1) | Exact |
| #chord-tip | border | 2px | borderWidth200 (2) | Exact |
| #ct-desc | border-top | 1px | borderWidth100 (1) | Exact |

### Box Shadow Mapping (compositional — compare to semantic shadow tokens)

The shadow system uses compositional tokens: offsetX + offsetY + blur + opacity + color. Let me decompose each prototype shadow and compare:

| Selector | Shadow | offsetX | offsetY | blur | opacity | Nearest Semantic Token | Match? |
|----------|--------|---------|---------|------|---------|----------------------|--------|
| .nav | 0 4px 24px rgba(0,0,0,0.3) | 0 ✓ | 4 ✓ | 24 ✓ (blur150) | 0.3 ✓ (moderate) | shadow.container: 0, 4, 12, 0.3 | No — blur mismatch (24 vs 12) |
| .ecosystem__system | 0 4px 24px rgba(0,0,0,0.3) | 0 ✓ | 4 ✓ | 24 ✓ (blur150) | 0.3 ✓ (moderate) | shadow.container: 0, 4, 12, 0.3 | No — blur mismatch |
| .ecosystem__system:hover | 0 6px 32px rgba(0,0,0,0.35) | 0 ✓ | 6 (no token) | 32 ✓ (blur200) | 0.35 ✓ (depth200) | No semantic match | No — offsetY=6 not in scale |
| .ecosystem__modal | 0 24px 64px rgba(0,0,0,0.4) | 0 ✓ | 24 (no token) | 64 (no token) | 0.4 ✓ (hard) | shadow.modal: 0, 8, 16, 0.35 | No — all values differ |
| .code-shots__grid object | 0 2px 12px rgba(0,0,0,0.08) | 0 ✓ | 2 (no token) | 12 ✓ (blur075) | 0.08 (no shadow opacity) | No semantic match | No — offsetY=2 not in scale, opacity too low |
| #career-tooltip | 0 4px 12px rgba(0,0,0,0.1) | 0 ✓ | 4 ✓ | 12 ✓ (blur075) | 0.1 (no shadow opacity) | shadow.container: 0, 4, 12, 0.3 | No — opacity mismatch (0.1 vs 0.3) |

**Summary**: Zero exact semantic shadow matches. The prototype uses larger blur radii and different opacity values than the token system's shadow composites.

**Primitive decomposition** (partial matches):
- offsetX=0: matches shadowOffsetX.000 ✓ (all shadows)
- offsetY=4: matches shadowOffsetY.100 ✓ (3 shadows)
- blur=24: matches blur150 ✓ (2 shadows)
- blur=12: matches blur075 ✓ (2 shadows)
- blur=32: matches blur200 ✓ (1 shadow)
- opacity=0.3: matches shadowOpacityModerate ✓ (2 shadows)
- opacity=0.35: matches shadowOpacityDepth200 ✓ (1 shadow)
- opacity=0.4: matches shadowOpacityHard ✓ (1 shadow)
- offsetY=6, 24, 2: No token match
- blur=64: No token match
- opacity=0.08, 0.1: No shadow opacity token match (general opacity008 exists)

### Opacity Mapping (CSS opacity property)

| Selector | Value | Token Match | Confidence |
|----------|-------|-------------|------------|
| .nav__logo-credit | 0.6 | No match | No match — between opacity056(0.56) and opacity064(0.64) |
| .nav__links a | 0.85 | No match | No match — between opacity080(0.80) and opacity088(0.88) |
| .btn:hover | 0.9 | No match | No match — between opacity088(0.88) and opacity096(0.96) |
| .hero__chord:hover ~ .hero__illustration | 0.16 | opacity016 (0.16) | Exact |
| .stats::before (noise) | 0.56 | opacity056 (0.56) | Exact — pre-resolved ✓ |
| .ecosystem__system::before (noise) | 0.40 | opacity040 (0.40) | Exact |

**Pre-resolved confirmation**: opacity 0.56 → opacity056 ✅. Noise texture: NOISE_ALPHA=24 is on a 0-255 Canvas ImageData scale (24/255≈0.094 actual rendered opacity). Per Peter's decision (2026-05-24): align to opacity024 token (0.24) — this increases noise visibility from ~9.4% to 24%. Can adjust later if too prominent.

> **Implementation Note — Canvas Alpha vs Token Scale**
> 
> The HTML Canvas `ImageData.data` array uses 0-255 for ALL channels including alpha (it's a `Uint8ClampedArray`). This differs from CSS `rgba()` where alpha is 0-1, and from our opacity token naming where values represent the 0-1 decimal (e.g., `opacity024` = 0.24, not 24/255).
> 
> When implementing the noise texture with token alignment, the Canvas code should use `NOISE_ALPHA = Math.round(0.24 * 255)` = 61 (not 24) to achieve the opacity024 token's intended 24% transparency. The original `NOISE_ALPHA = 24` produced ~9.4% opacity.

### Transition/Animation Mapping

| Selector | Duration | Easing | Duration Token | Easing Token | Match? |
|----------|----------|--------|----------------|--------------|--------|
| .nav__links a | 150ms | ease | duration150 (150) ✓ | No match (ease ≠ standard) | Partial — duration matches |
| .btn | 150ms | ease | duration150 (150) ✓ | No match | Partial |
| .hero__illustration | 250ms | ease | duration250 (250) ✓ | No match | Partial |
| .hero__chord:hover | 250ms | ease | duration250 (250) ✓ | No match | Partial |
| .why-build__card:hover | 150ms/200ms | ease | duration150 ✓ / No match (200ms) | No match | Partial |
| .ecosystem__modal-backdrop | 200ms | ease | No match (200ms) | No match | No match |
| .ecosystem__modal | 300ms | cubic-bezier(0.4, 0, 0.2, 1) | No match (300ms) | easingStandard ✓ | Partial — easing matches |
| .ecosystem__system | 150ms | ease | duration150 (150) ✓ | No match | Partial |
| neon-flicker animations | 0.8s (800ms) | ease-out | No match | No match | No match |

**CSS `ease` vs token `easingStandard`**: CSS `ease` = `cubic-bezier(0.25, 0.1, 0.25, 1.0)`. Token `easingStandard` = `cubic-bezier(0.4, 0, 0.2, 1)`. These are different curves. The prototype uses CSS `ease` throughout (except the modal which uses the standard Material curve).

---

### 3.4 Summary — Radius, Border, Shadow, Motion

| Category | Exact Match | No Match |
|----------|-------------|----------|
| Radius | 5 values (4px×3, 6px, 2px) | 1 value (14px badge) |
| Border width | 12 values (1px×7, 2px×5) | 1 value (3px quote border) |
| Box shadow (semantic composite) | 0 | 5 shadows — all differ from token composites |
| Box shadow (primitive decomposition) | Partial — offsetX, some blur, some opacity | offsetY, large blur, low opacity |
| Opacity (CSS property) | 3 values (0.16, 0.56, 0.40) | 3 values (0.6, 0.85, 0.9) |
| Duration | 4 values (150ms×4, 250ms×2) | 3 values (200ms×2, 300ms, 800ms) |
| Easing | 1 value (modal cubic-bezier = easingStandard) | 7 values (CSS `ease` throughout) |

### No-Match Values for Phase 4 Escalation

| Value | Category | Occurrences | Notes |
|-------|----------|-------------|-------|
| 14px | radius | 1 (.badge) | Between radius150(12) and radius200(16). Pill-shape intent — evaluate radiusMax |
| 3px | border-width | 1 (.why-build__quote) | Between borderWidth200(2) and borderWidth400(4). Accent border. |
| All 5 box shadows | shadow | 5 | None match semantic composites. Prototype uses larger blur radii. Evaluate whether to use existing semantics (shadow.container, shadow.modal) or document as product-level. |
| 0.6, 0.85, 0.9 | opacity | 3 | Between scale steps. 0.6 near opacity064, 0.85 near opacity088, 0.9 near opacity088/096. |
| 200ms, 300ms, 800ms | duration | 4 | 200ms between duration150 and duration250. 300ms between duration250 and duration350. 800ms decorative. |
| CSS `ease` | easing | 7 | Prototype uses CSS ease; token system uses Material curves. Evaluate whether to add `easingEase` or align to `easingStandard`. |
| NOISE_ALPHA 24/255 | opacity | 1 | Resolved: align to opacity024 (0.24) per Peter (2026-05-24). Canvas ImageData uses 0-255 scale; current rendered value is ~9.4%. Aligning to token increases visibility — can adjust later. |
