# Value Inventory: Spacing

**Spec**: 002 - Portfolio Token Compliance
**Category**: Spacing (padding, margin, gap, width, height, max-width, min-height)
**Source**: `docs/specs/staticReview/hero-exploration.html` `<style>` block

---

## Padding Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| *, *::before, *::after | padding | 0 | — | Reset (exempt) |
| .nav | padding-inline | var(--space-500) | space500 | Token ✓ |
| .hero | padding-inline | var(--space-500) | space500 | Token ✓ |
| .hero | padding-bottom | 0 | — | Reset (exempt) |
| .hero__content | padding-top | var(--space-800) | space800 | Token ✓ |
| .hero__headline | padding-left | var(--space-300) | space300 | Token ✓ |
| .hero__description | padding-left | var(--space-300) | space300 | Token ✓ |
| .btn | padding | var(--space-150) var(--space-300) | space150, space300 | Token ✓ |
| .stats | padding | 20px 0 | — | Hard-coded |
| .stats__grid | padding-inline | var(--space-500) | space500 | Token ✓ |
| .stats__hero | padding-right | var(--space-500) | space500 | Token ✓ |
| .why-build | padding | 120px 0 96px | — | Hard-coded |
| .why-build | padding-inline | var(--space-500) | space500 | Token ✓ |
| .why-build__quote | padding-left | 24px | — | Hard-coded |
| .why-build__card | padding | 36px 28px | — | Hard-coded |
| .why-build__card h3 | padding-bottom | 14px | — | Hard-coded |
| .ecosystem | padding | 128px 0 | — | Hard-coded |
| .ecosystem | padding-inline | var(--space-500) | space500 | Token ✓ |
| .ecosystem__system | padding | 20px 24px | — | Hard-coded |
| .ecosystem__modal | padding | 40px | — | Hard-coded |
| .ecosystem__modal-close | padding | 4px 8px | — | Hard-coded |
| .ecosystem__modal-viz | padding | 24px | — | Hard-coded |
| .ecosystem__modal-stats | padding-top | 20px | — | Hard-coded |
| .ecosystem__modal-highlights li | padding-left | 14px | — | Hard-coded |
| .ecosystem__system-highlights li | padding-left | 10px | — | Hard-coded |
| .viz-indent | padding-left | 20px | — | Hard-coded |
| .how-built | padding | 128px 0 | — | Hard-coded |
| .how-built | padding-inline | var(--space-500) | space500 | Token ✓ |
| .how-built__grid | padding | 0 24px | — | Hard-coded |
| .how-built__body ol | padding | 8px 16px | — | Hard-coded |
| .enterprise | padding | 96px 0 | — | Hard-coded |
| .enterprise | padding-inline | var(--space-500) | space500 | Token ✓ |
| .enterprise__grid | padding | 0 24px | — | Hard-coded |
| .code-shots | padding | 32px 0 96px | — | Hard-coded |
| .who-built | padding | 96px 0 0 0 | — | Hard-coded |
| .who-built | padding-inline | var(--space-500) | space500 | Token ✓ |
| .agents | padding | 96px 0 56px 0 | — | Hard-coded |
| .agents__inner | padding-inline | var(--space-500) | space500 | Token ✓ |
| .agents__directory | padding | 16px 24px 4px 24px | — | Hard-coded |
| .agents__list li | padding-left | 24px | — | Hard-coded |
| .thanks | padding | 0 64px 56px | — | Hard-coded |
| .thanks__title | padding-bottom | 6px | — | Hard-coded |
| .cta | padding | 56px 128px 224px 48px | — | Hard-coded |
| .cta | padding-inline | var(--space-500) | space500 | Token ✓ |
| .cta__body | padding | 12px 16px 12px 0px | — | Hard-coded |
| .footer | padding | 22px 0 | — | Hard-coded |
| .footer__inner | padding-inline | var(--space-500) | space500 | Token ✓ |
| @media ≤1023px .hero | padding-block | var(--space-800) | space800 | Token ✓ |
| @media ≤767px .nav | padding-inline | var(--space-300) | space300 | Token ✓ |
| @media ≤767px .hero | padding-inline | var(--space-300) | space300 | Token ✓ |
| @media ≤767px .hero | padding-block | var(--space-600) | space600 | Token ✓ |

## Margin Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| *, *::before, *::after | margin | 0 | — | Reset (exempt) |
| .hero | margin | 0 auto | — | Layout centering (exempt) |
| .hero__content | margin-top | 88px | — | Hard-coded |
| .hero__ctas | margin-top | var(--space-200) | space200 | Token ✓ |
| .hero__ctas | margin-left | var(--space-300) | space300 | Token ✓ |
| .stats__grid | margin | 0 auto | — | Layout centering (exempt) |
| .stats__hero-label | margin-top | 2px | — | Hard-coded |
| .stats__label | margin-top | 2px | — | Hard-coded |
| .why-build | margin | 0 auto | — | Layout centering (exempt) |
| .why-build__heading | margin-bottom | 56px | — | Hard-coded |
| .why-build__heading | margin-left | 24px | — | Hard-coded |
| .why-build__quote | margin | 0 0 56px 24px | — | Hard-coded |
| .why-build__card h3 | margin-bottom | 16px | — | Hard-coded |
| .why-build__card p + p | margin-top | 12px | — | Hard-coded |
| .ecosystem | margin | 0 auto | — | Layout centering (exempt) |
| .ecosystem__heading | margin-bottom | 56px | — | Hard-coded |
| .ecosystem__heading | margin-left | 24px | — | Hard-coded |
| .ecosystem__system-header | margin-bottom | 12px | — | Hard-coded |
| .ecosystem__system-desc | margin-bottom | 14px | — | Hard-coded |
| .ecosystem__system-highlights li | margin-bottom | 8px | — | Hard-coded |
| .ecosystem__modal-header | margin-bottom | 16px | — | Hard-coded |
| .ecosystem__modal-desc | margin-bottom | 20px | — | Hard-coded |
| .ecosystem__modal-highlights | margin | 0 0 24px | — | Hard-coded |
| .ecosystem__modal-highlights li | margin-bottom | 12px | — | Hard-coded |
| .ecosystem__modal-stat-label | margin-top | 2px | — | Hard-coded |
| .ecosystem__modal-viz-label | margin-bottom | 12px | — | Hard-coded |
| .viz-branch | margin-top | 8px | — | Hard-coded |
| .how-built | margin | 0 auto | — | Layout centering (exempt) |
| .how-built__heading | margin-bottom | 56px | — | Hard-coded |
| .how-built__heading | margin-left | 24px | — | Hard-coded |
| .how-built__body | margin-top | 12px | — | Hard-coded |
| .how-built__body ol li | margin | 8px | — | Hard-coded |
| .how-built__featured p + p | margin-top | 28px | — | Hard-coded |
| .how-built__body p + p | margin-top | 16px | — | Hard-coded |
| .enterprise | margin | 0 auto | — | Layout centering (exempt) |
| .enterprise__heading | margin-bottom | 56px | — | Hard-coded |
| .enterprise__heading | margin-left | 24px | — | Hard-coded |
| .enterprise__item h3 | margin-bottom | 6px | — | Hard-coded |
| .code-shots__grid object:nth-child(2,4) | margin-top | 32px | — | Hard-coded |
| .who-built | margin | 0 auto | — | Layout centering (exempt) |
| .who-built__heading | margin-bottom | 48px | — | Hard-coded |
| .who-built__heading | margin-left | 24px | — | Hard-coded |
| .who-built__name | margin-top | 6px | — | Hard-coded |
| .who-built__title | margin-top | 4px | — | Hard-coded |
| .who-built__copy | margin | 0 24px | — | Hard-coded |
| .who-built__employers-label | margin-top | 24px | — | Hard-coded |
| .who-built__badges | margin-top | 12px | — | Hard-coded |
| .who-built__timeline | margin-top | 48px | — | Hard-coded |
| .agents__title | margin | 24px 0 8px 24px | — | Hard-coded |
| .agents__role-header | margin-bottom | 20px | — | Hard-coded |
| .agents__list li | margin-bottom | 20px | — | Hard-coded |
| .agents__agent-system | margin-top | 2px | — | Hard-coded |
| .agents__agent-desc | margin-top | 2px | — | Hard-coded |
| .thanks | margin | 0 auto 128px | — | Hard-coded |
| .thanks__title | margin-bottom | 24px | — | Hard-coded |
| .cta | margin | 0 auto | — | Layout centering (exempt) |
| .cta__heading | margin-bottom | 56px | — | Hard-coded |
| .cta__heading | margin-left | 24px | — | Hard-coded |
| .cta__grid | margin | 0 24px | — | Hard-coded |
| .cta__body p + p | margin-top | 14px | — | Hard-coded |
| .cta__featured p + p | margin-top | 10px | — | Hard-coded |
| .cta__actions | margin-top | 36px | — | Hard-coded |
| .footer__inner | margin | 0 auto | — | Layout centering (exempt) |

## Gap Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| .nav__logo | gap | var(--space-100) | space100 | Token ✓ |
| .nav__links | gap | var(--space-400) | space400 | Token ✓ |
| .hero | gap | var(--space-400) | space400 | Token ✓ |
| .hero__content | gap | var(--space-300) | space300 | Token ✓ |
| .hero__ctas | gap | var(--space-200) | space200 | Token ✓ |
| .stats__grid | gap | var(--space-500) | space500 | Token ✓ |
| .stats__items | row-gap | 12px | — | Hard-coded |
| .ecosystem__layout | gap | 32px 0 | — | Hard-coded |
| .ecosystem__modal-body | gap | 32px | — | Hard-coded |
| .ecosystem__modal-stats | gap | 24px | — | Hard-coded |
| .viz-branch | gap | 4px 12px | — | Hard-coded |
| .how-built__grid | gap | 72px | — | Hard-coded |
| .enterprise__grid | gap | 40px 72px | — | Hard-coded |
| .agents__roles | gap | 56px | — | Hard-coded |
| .thanks__grid | gap | 24px | — | Hard-coded |
| .cta__actions | gap | 12px | — | Hard-coded |
| .who-built__badges | gap | 8px | — | Hard-coded |
| .footer__info | gap | 14px | — | Hard-coded |

## Width / Height / Max-Width / Min-Height Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| .nav | min-height | var(--tap-area-recommended, 48px) | tap-area-recommended | Fallback |
| .nav__logo img | height | 16px | — | Hard-coded |
| .hero | max-width | 1336px | — | Hard-coded |
| .hero__illustration | width | 100% | — | Layout (exempt) |
| .hero__chord | width | 100% | — | Layout (exempt) |
| .hero__chord | aspect-ratio | 1 / 1 | — | Layout (exempt) |
| .stats__grid | max-width | 1336px | — | Hard-coded |
| .why-build | max-width | 1336px | — | Hard-coded |
| .why-build__quote | max-width | 640px | — | Hard-coded |
| .ecosystem | max-width | 1336px | — | Hard-coded |
| .ecosystem__illustration object | max-width | 380px | — | Hard-coded |
| .ecosystem__system-header | max-width | 180px | — | Hard-coded |
| .ecosystem__modal | width | 90% | — | Layout (exempt) |
| .ecosystem__modal | max-width | 1020px | — | Hard-coded |
| .ecosystem__modal | max-height | 80vh | — | Layout (exempt) |
| .ecosystem__modal-header | max-width | 200px | — | Hard-coded |
| .how-built | max-width | 1336px | — | Hard-coded |
| .enterprise | max-width | 1336px | — | Hard-coded |
| .who-built | max-width | 1336px | — | Hard-coded |
| .agents__inner | max-width | 1336px | — | Hard-coded |
| .thanks | max-width | 1336px | — | Hard-coded |
| .cta | max-width | 1336px | — | Hard-coded |
| .cta__heading | max-width | calc((6/12 * 100%) - 24px) | — | Hard-coded |
| .cta__actions | max-width | 280px | — | Hard-coded |
| .footer__inner | max-width | 1336px | — | Hard-coded |
| .footer__logo img | height | 13px | — | Hard-coded |
| .hero__description | max-width | 48ch | — | Hard-coded |
| @media ≤1023px .hero__illustration | max-width | 400px | — | Hard-coded |
| @media ≤767px .hero__illustration | max-width | 300px | — | Hard-coded |

---

# Value Inventory: Typography

**Category**: Typography (font-family, font-size, font-weight, line-height, letter-spacing)

---

## Font Family Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| body | font-family | var(--font-family-body) | font-family-body | Token ✓ |
| .nav__links a | font-family | var(--font-family-body) | font-family-body | Token ✓ |
| .hero__headline | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .btn | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .stats__hero-number | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .stats__value | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .why-build__easter | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .why-build__heading | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .why-build__quote | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .why-build__card h3 | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .ecosystem__heading | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .ecosystem__modal-stat-value | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .ecosystem__modal-viz | font-family | ui-monospace, SFMono-Regular, monospace | — | Hard-coded |
| .how-built__easter | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .how-built__heading | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .how-built__featured | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .enterprise__heading | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .enterprise__item h3 | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .who-built__heading | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .who-built__human-label | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .who-built__name | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .agents__title | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .agents__role-header | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .thanks__title | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .cta__heading | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .cta__featured p | font-family | var(--font-family-display) | font-family-display | Token ✓ |
| .ecosystem__modal-viz-label | font-family | (inherits from .ecosystem__modal-viz) | — | Inherited |

## Font Size Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| .nav__logo-credit | font-size | 11px | — | Hard-coded |
| .nav__links a | font-size | var(--typography-label-md-font-size, 16px) | typography-label-md-font-size | Fallback |
| .hero__headline | font-size | 48px | — | Hard-coded |
| .hero__description | font-size | var(--typography-body-md-font-size, 16px) | typography-body-md-font-size | Fallback |
| .btn | font-size | var(--typography-button-md-font-size, 16px) | typography-button-md-font-size | Fallback |
| .stats__hero-number | font-size | 64px | — | Hard-coded |
| .stats__hero-label | font-size | 13px | — | Hard-coded |
| .stats__value | font-size | 22px | — | Hard-coded |
| .stats__label | font-size | 12px | — | Hard-coded |
| .why-build__easter | font-size | 72px | — | Hard-coded |
| .why-build__heading | font-size | 34px | — | Hard-coded |
| .why-build__quote | font-size | 22px | — | Hard-coded |
| .why-build__card h3 | font-size | 20px | — | Hard-coded |
| .why-build__card p | font-size | 14px | — | Hard-coded |
| .ecosystem__heading | font-size | 34px | — | Hard-coded |
| .ecosystem__system-desc | font-size | 13px | — | Hard-coded |
| .ecosystem__system-highlights li | font-size | 12px | — | Hard-coded |
| .ecosystem__modal-close | font-size | 24px | — | Hard-coded |
| .ecosystem__modal-desc | font-size | 15px | — | Hard-coded |
| .ecosystem__modal-highlights li | font-size | 14px | — | Hard-coded |
| .ecosystem__modal-viz | font-size | 12px | — | Hard-coded |
| .ecosystem__modal-viz-label | font-size | 10px | — | Hard-coded |
| .ecosystem__modal-stat-value | font-size | 22px | — | Hard-coded |
| .ecosystem__modal-stat-label | font-size | 11px | — | Hard-coded |
| .how-built__easter | font-size | 72px | — | Hard-coded |
| .how-built__heading | font-size | 34px | — | Hard-coded |
| .how-built__featured | font-size | 42px | — | Hard-coded |
| .how-built__body p | font-size | 16px | — | Hard-coded |
| .enterprise__heading | font-size | 34px | — | Hard-coded |
| .enterprise__item h3 | font-size | 17px | — | Hard-coded |
| .enterprise__item p | font-size | 18px | — | Hard-coded |
| .who-built__heading | font-size | 34px | — | Hard-coded |
| .who-built__human-label | font-size | 13px | — | Hard-coded |
| .who-built__name | font-size | 30px | — | Hard-coded |
| .who-built__title | font-size | 15px | — | Hard-coded |
| .who-built__employers-label | font-size | 13px | — | Hard-coded |
| .badge | font-size | 12px | — | Hard-coded |
| .agents__title | font-size | 13px | — | Hard-coded |
| .agents__agent-name | font-size | 15px | — | Hard-coded |
| .agents__agent-system | font-size | 12px | — | Hard-coded |
| .agents__agent-desc | font-size | 12px | — | Hard-coded |
| .thanks__title | font-size | 20px | — | Hard-coded |
| .thanks__grid | font-size | 16px | — | Hard-coded |
| .cta__heading | font-size | 34px | — | Hard-coded |
| .cta__body p | font-size | 16px | — | Hard-coded |
| .cta__featured p | font-size | 36px | — | Hard-coded |
| .footer__info | font-size | 12px | — | Hard-coded |

## Font Weight Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| .nav__logo-credit span | font-weight | 300 | — | Hard-coded |
| .nav__links a | font-weight | var(--typography-label-md-font-weight, 500) | typography-label-md-font-weight | Fallback |
| .hero__headline | font-weight | var(--typography-display-font-weight) | typography-display-font-weight | Token ✓ |
| .hero__description strong | font-weight | 400 | — | Hard-coded |
| .btn | font-weight | var(--typography-button-lg-font-weight) | typography-button-lg-font-weight | Token ✓ |
| .stats__hero-number | font-weight | 700 | — | Hard-coded |
| .stats__hero-label | font-weight | 600 | — | Hard-coded |
| .stats__value | font-weight | 700 | — | Hard-coded |
| .stats__label | font-weight | 500 | — | Hard-coded |
| .why-build__easter | font-weight | 700 | — | Hard-coded |
| .why-build__heading | font-weight | 700 | — | Hard-coded |
| .why-build__quote | font-weight | 500 | — | Hard-coded |
| .why-build__quote em | font-weight | 700 | — | Hard-coded |
| .why-build__card h3 | font-weight | 700 | — | Hard-coded |
| .ecosystem__heading | font-weight | 700 | — | Hard-coded |
| .ecosystem__modal-viz-label | font-weight | 600 | — | Hard-coded |
| .ecosystem__modal-stat-value | font-weight | 700 | — | Hard-coded |
| .how-built__easter | font-weight | 700 | — | Hard-coded |
| .how-built__heading | font-weight | 700 | — | Hard-coded |
| .how-built__featured | font-weight | 700 | — | Hard-coded |
| .how-built__body ol li | font-weight | 700 | — | Hard-coded |
| .enterprise__heading | font-weight | 700 | — | Hard-coded |
| .enterprise__item h3 | font-weight | 700 | — | Hard-coded |
| .who-built__heading | font-weight | 700 | — | Hard-coded |
| .who-built__human-label | font-weight | 700 | — | Hard-coded |
| .who-built__name | font-weight | 700 | — | Hard-coded |
| .who-built__employers-label | font-weight | 500 | — | Hard-coded |
| .badge | font-weight | 500 | — | Hard-coded |
| .agents__title | font-weight | 700 | — | Hard-coded |
| .agents__agent-name | font-weight | 600 | — | Hard-coded |
| .agents__agent-system | font-weight | 600 | — | Hard-coded |
| .thanks__title | font-weight | 700 | — | Hard-coded |
| .cta__heading | font-weight | 700 | — | Hard-coded |
| .cta__featured p | font-weight | 700 | — | Hard-coded |

## Line Height Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| .nav__logo-credit | line-height | 1 | — | Hard-coded |
| .hero__headline | line-height | 1.1 | — | Hard-coded |
| .hero__description | line-height | var(--typography-body-md-line-height, 1.5) | typography-body-md-line-height | Fallback |
| .stats__hero-number | line-height | 1 | — | Hard-coded |
| .why-build__quote | line-height | 1.4 | — | Hard-coded |
| .why-build__card p | line-height | 1.65 | — | Hard-coded |
| .ecosystem__system-desc | line-height | 1.55 | — | Hard-coded |
| .ecosystem__system-highlights li | line-height | 1.5 | — | Hard-coded |
| .ecosystem__modal-close | line-height | 1 | — | Hard-coded |
| .ecosystem__modal-desc | line-height | 1.6 | — | Hard-coded |
| .ecosystem__modal-highlights li | line-height | 1.55 | — | Hard-coded |
| .ecosystem__modal-viz | line-height | 1.7 | — | Hard-coded |
| .how-built__featured | line-height | 1.24 | — | Hard-coded |
| .how-built__body p | line-height | 1.5 | — | Hard-coded |
| .enterprise__item p | line-height | 1.52 | — | Hard-coded |
| .thanks__grid | line-height | 1.8 | — | Hard-coded |
| .cta__body p | line-height | 1.6 | — | Hard-coded |
| .cta__featured p | line-height | 1.25 | — | Hard-coded |

## Letter Spacing Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| .stats__hero-label | letter-spacing | 0.04em | — | Hard-coded |
| .who-built__human-label | letter-spacing | 0.08em | — | Hard-coded |
| .agents__title | letter-spacing | 0.08em | — | Hard-coded |
| .agents__role-header | letter-spacing | 0.02em | — | Hard-coded |
| .ecosystem__modal-viz-label | letter-spacing | 0.08em | — | Hard-coded |

---

# Value Inventory: Color

**Category**: Color (color, background, border-color, box-shadow colors, text-shadow colors)

---

## Text Color Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| body | color | var(--color-contrast-on-light) | color.contrast.onLight | Token ✓ |
| .nav__logo-credit | color | var(--color-contrast-on-dark) | color.contrast.onDark | Token ✓ |
| .nav__links a | color | var(--color-contrast-on-dark) | color.contrast.onDark | Token ✓ |
| .hero__headline | color | var(--color-contrast-on-light) | color.contrast.onLight | Token ✓ |
| .hero__headline em | color | var(--color-action-primary) | color.action.primary | Token ✓ |
| .hero__description | color | var(--color-text-default) | color.text.default | Token ✓ |
| .hero__description strong | color | var(--color-action-primary) | color.action.primary | Token ✓ |
| .btn--primary | color | var(--color-contrast-on-action) | color.contrast.onAction | Token ✓ |
| .btn--primary | color | var(--white-200) | white-200 | Hard-coded (duplicate declaration) |
| .btn--secondary | color | var(--color-contrast-on-light) | color.contrast.onLight | Token ✓ |
| .stats__hero-number | color | var(--color-action-primary) | color.action.primary | Token ✓ |
| .stats__hero-label | color | var(--pink-500) | pink-500 | Hard-coded (primitive) |
| .stats__value | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .stats__label | color | var(--gray-300) | gray-300 | Hard-coded (primitive) |
| .why-build__easter | color | var(--green-100) | green-100 | Hard-coded (primitive) |
| .why-build__heading | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .why-build__heading .section-prefix | color | var(--gray-200) | gray-200 | Hard-coded (primitive) |
| .why-build__quote | color | var(--black-100) | black-100 | Hard-coded (primitive) |
| .why-build__quote em | color | var(--color-action-primary) | color.action.primary | Token ✓ |
| .why-build__card h3 | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .why-build__card p | color | var(--black-100) | black-100 | Hard-coded (primitive) |
| .ecosystem__heading | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .ecosystem__heading .section-prefix | color | var(--gray-200) | gray-200 | Hard-coded (primitive) |
| .ecosystem__system-desc | color | var(--black-100) | black-100 | Hard-coded (primitive) |
| .ecosystem__system-highlights li | color | var(--gray-300) | gray-300 | Hard-coded (primitive) |
| .ecosystem__modal-close | color | var(--gray-300) | gray-300 | Hard-coded (primitive) |
| .ecosystem__modal-close:hover | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .ecosystem__modal-desc | color | var(--black-100) | black-100 | Hard-coded (primitive) |
| .ecosystem__modal-highlights li | color | var(--black-100) | black-100 | Hard-coded (primitive) |
| .ecosystem__modal-stat-value | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .ecosystem__modal-stat-label | color | var(--gray-300) | gray-300 | Hard-coded (primitive) |
| .ecosystem__modal-viz-label | color | rgba(255,255,255,0.4) | — | Hard-coded |
| .viz-source | color | #80F6FF | — | Hard-coded |
| .viz-arrow | color | rgba(255,255,255,0.55) | — | Hard-coded |
| .viz-output | color | #33FF99 | — | Hard-coded |
| .viz-comment | color | rgba(255,255,255,0.72) | — | Hard-coded |
| .viz-keyword | color | #F9F002 | — | Hard-coded |
| .viz-value | color | #ff2d8f | — | Hard-coded |
| .how-built__easter | color | var(--pink-100) | pink-100 | Hard-coded (primitive) |
| .how-built__heading | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .how-built__heading .section-prefix | color | var(--gray-200) | gray-200 | Hard-coded (primitive) |
| .how-built__featured | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .how-built__featured span | color | var(--color-action-primary) | color.action.primary | Token ✓ |
| .how-built__body ol li | color | var(--color-text-default) | color.text.default | Token ✓ |
| .enterprise__heading | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .enterprise__heading .section-prefix | color | var(--gray-200) | gray-200 | Hard-coded (primitive) |
| .enterprise__item h3 | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .enterprise__item p | color | var(--gray-300) | gray-300 | Hard-coded (primitive) |
| .who-built__heading | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .who-built__heading .section-prefix | color | var(--gray-200) | gray-200 | Hard-coded (primitive) |
| .who-built__human-label | color | var(--gray-200) | gray-200 | Hard-coded (primitive) |
| .who-built__name | color | var(--color-action-primary) | color.action.primary | Token ✓ |
| .who-built__title | color | var(--black-100) | black-100 | Hard-coded (primitive) |
| .who-built__employers-label | color | var(--gray-200) | gray-200 | Hard-coded (primitive) |
| .badge | color | #fff | — | Hard-coded |
| .agents__title | color | var(--gray-200) | gray-200 | Hard-coded (primitive) |
| .agents__agent-name | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .agents__agent-system | color | var(--black-100) | black-100 | Hard-coded (primitive) |
| .agents__agent-desc | color | var(--gray-300) | gray-300 | Hard-coded (primitive) |
| .thanks__title | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .thanks__grid | color | var(--black-100) | black-100 | Hard-coded (primitive) |
| .cta__heading | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .cta__heading .section-prefix | color | var(--gray-200) | gray-200 | Hard-coded (primitive) |
| .cta__body p | color | var(--black-100) | black-100 | Hard-coded (primitive) |
| .cta__featured p | color | var(--white-300) | white-300 | Hard-coded (primitive) |
| .cta__featured span | color | var(--color-action-primary) | color.action.primary | Token ✓ |
| .footer__info | color | rgba(255,255,255,0.6) | — | Hard-coded |

## Background Color Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| body | background | var(--white-100) | white-100 | Hard-coded (primitive) |
| .nav | background | var(--black-300) | black-300 | Hard-coded (primitive) |
| .btn--primary | background | var(--color-action-primary) | color.action.primary | Token ✓ |
| .btn--secondary | background | var(--white-200) | white-200 | Hard-coded (primitive) |
| .why-build__card:hover | background-color | var(--green-300) | green-300 | Hard-coded (primitive) |
| .ecosystem__system | background | var(--white-200) | white-200 | Hard-coded (primitive) |
| .ecosystem__modal-backdrop | background | rgba(10, 10, 15, 0.6) | — | Hard-coded |
| .ecosystem__modal | background | var(--white-100) | white-100 | Hard-coded (primitive) |
| .ecosystem__modal-viz | background | var(--black-500) | black-500 | Hard-coded (primitive) |
| .how-built | background | var(--white-200) | white-200 | Hard-coded (primitive) |
| .agents__directory | background | var(--white-200) | white-200 | Hard-coded (primitive) |
| .badge--pink | background | var(--color-action-primary) | color.action.primary | Token ✓ |
| .badge--dark | background | var(--black-300) | black-300 | Hard-coded (primitive) |
| .cta__heading | background-color | #fefefe | — | Hard-coded |
| .cta__body | background-color | #fefefe | — | Hard-coded |
| .footer | background | var(--black-500) | black-500 | Hard-coded (primitive) |
| .ecosystem__modal-close | background | none | — | Reset (exempt) |

## Border Color Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| .nav | border-bottom-color | var(--color-structure-border-subtle) | color.structure.border.subtle | Token ✓ |
| .btn--secondary | border-color | var(--color-contrast-on-light) | color.contrast.onLight | Token ✓ |
| .stats | border-top-color | var(--gray-300) | gray-300 | Hard-coded (primitive) |
| .stats | border-bottom-color | var(--gray-300) | gray-300 | Hard-coded (primitive) |
| .stats__hero | border-right-color | var(--gray-100) | gray-100 | Hard-coded (primitive) |
| .why-build__quote | border-left-color | var(--color-action-primary) | color.action.primary | Token ✓ |
| .why-build__card | border-left-color | var(--gray-100) | gray-100 | Hard-coded (primitive) |
| .why-build__card h3 | border-bottom-color | var(--black-300) | black-300 | Hard-coded (primitive) |
| .why-build__card:hover | border-left-color | var(--green-500) | green-500 | Hard-coded (primitive) |
| .why-build__card:hover | border-right-color | var(--green-500) | green-500 | Hard-coded (primitive) |
| .ecosystem__system-highlights li | border-left-color | var(--color-action-primary) | color.action.primary | Token ✓ |
| .ecosystem__modal-highlights li | border-left-color | var(--color-action-primary) | color.action.primary | Token ✓ |
| .ecosystem__modal-stats | border-top-color | var(--gray-100) | gray-100 | Hard-coded (primitive) |
| .agents__portraits | border-bottom-color | var(--color-structure-border-subtle) | color.structure.border.subtle | Token ✓ |
| .agents__list li | border-left-color | var(--color-structure-border-subtle) | color.structure.border.subtle | Token ✓ |
| .thanks__title | border-bottom-color | var(--black-300) | black-300 | Hard-coded (primitive) |

## Box Shadow Values (color component)

| Selector | Property | Full Value | Color Component | Status |
|----------|----------|-----------|-----------------|--------|
| .nav | box-shadow | 0 4px 24px rgba(0,0,0,0.3) | rgba(0,0,0,0.3) | Hard-coded |
| .ecosystem__system | box-shadow | 0 4px 24px rgba(0,0,0,0.3) | rgba(0,0,0,0.3) | Hard-coded |
| .ecosystem__modal | box-shadow | 0 24px 64px rgba(0,0,0,0.4) | rgba(0,0,0,0.4) | Hard-coded |
| .ecosystem__system:hover | box-shadow | 0 6px 32px rgba(0,0,0,0.35) | rgba(0,0,0,0.35) | Hard-coded |
| .code-shots__grid object | box-shadow | 0 2px 12px rgba(0,0,0,0.08) | rgba(0,0,0,0.08) | Hard-coded |

## Text Shadow Values (neon effects)

| Selector | Context | Colors Used | Status |
|----------|---------|-------------|--------|
| .why-build__easter (neon-flicker) | Keyframe animation | rgba(51,255,153,0.3–1.0) | Hard-coded (decorative) |
| .how-built__easter (neon-flicker-pink) | Keyframe animation | rgba(255,42,109,0.3–1.0) | Hard-coded (decorative) |

---

# Value Inventory: Radius, Border, Shadow, Motion

**Category**: Radius, border-width, box-shadow (full), transitions, animations, opacity

---

## Border Radius Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| .btn | border-radius | var(--radius-050,) | radius-050 | Fallback (trailing comma) |
| .ecosystem__system | border-radius | var(--radius-100, 4px) | radius-100 | Fallback |
| .ecosystem__system::before | border-radius | var(--radius-100, 4px) | radius-100 | Fallback |
| .ecosystem__modal | border-radius | var(--radius-100, 4px) | radius-100 | Fallback |
| .ecosystem__modal-viz | border-radius | 4px | — | Hard-coded |
| .code-shots__grid object | border-radius | 6px | — | Hard-coded |
| .badge | border-radius | 14px | — | Hard-coded |
| .agents__directory | border-radius | 4px | — | Hard-coded |

## Border Width Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| .nav | border-bottom-width | var(--border-width-100, 1px) | border-width-100 | Fallback |
| .btn--secondary | border-width | var(--border-width-100, 1px) | border-width-100 | Fallback |
| .stats | border-top-width | 1px | — | Hard-coded |
| .stats | border-bottom-width | 1px | — | Hard-coded |
| .stats__hero | border-right-width | 1px | — | Hard-coded |
| .why-build__quote | border-left-width | 3px | — | Hard-coded |
| .why-build__card | border-left-width | 1px | — | Hard-coded |
| .why-build__card h3 | border-bottom-width | 2px | — | Hard-coded |
| .why-build__card:hover | border-left/right-width | 1px | — | Hard-coded |
| .ecosystem__system-highlights li | border-left-width | 2px | — | Hard-coded |
| .ecosystem__modal-highlights li | border-left-width | 2px | — | Hard-coded |
| .ecosystem__modal-stats | border-top-width | 1px | — | Hard-coded |
| .agents__portraits | border-bottom-width | var(--border-width-100) | border-width-100 | Token ✓ |
| .agents__list li | border-left-width | var(--border-width-100) | border-width-100 | Token ✓ |
| .thanks__title | border-bottom-width | 2px | — | Hard-coded |

## Box Shadow Values (full declaration)

| Selector | Property | Value | Status |
|----------|----------|-------|--------|
| .nav | box-shadow | 0 4px 24px rgba(0,0,0,0.3) | Hard-coded |
| .ecosystem__system | box-shadow | 0 4px 24px rgba(0,0,0,0.3) | Hard-coded |
| .ecosystem__system:hover | box-shadow | 0 6px 32px rgba(0,0,0,0.35) | Hard-coded |
| .ecosystem__modal | box-shadow | 0 24px 64px rgba(0,0,0,0.4) | Hard-coded |
| .code-shots__grid object | box-shadow | 0 2px 12px rgba(0,0,0,0.08) | Hard-coded |

## Transition Values

| Selector | Property | Value | Status |
|----------|----------|-------|--------|
| .nav__links a | transition | opacity 0.15s ease | Hard-coded |
| .btn | transition | opacity 0.15s ease | Hard-coded |
| .hero__illustration | transition | opacity 250ms ease | Hard-coded |
| .hero__chord:hover | transition | filter 250ms ease | Hard-coded |
| .why-build__card:hover | transition | background-color 150ms, border-left 200ms, border-right 200ms ease | Hard-coded |
| .ecosystem__modal-backdrop | transition | opacity 200ms ease | Hard-coded |
| .ecosystem__modal | transition | opacity 300ms ease, transform 300ms cubic-bezier(0.4, 0, 0.2, 1) | Hard-coded |
| .ecosystem__system | transition | transform 150ms ease, box-shadow 150ms ease | Hard-coded |

## Animation Values

| Selector | Property | Value | Status |
|----------|----------|-------|--------|
| .why-build__heading:hover ~ .why-build__easter | animation | neon-flicker 0.8s ease-out forwards | Hard-coded |
| .how-built__heading:hover ~ .how-built__easter | animation | neon-flicker-pink 0.8s ease-out forwards | Hard-coded |

## Opacity Values

| Selector | Property | Value | Token Reference | Status |
|----------|----------|-------|-----------------|--------|
| .nav__logo-credit | opacity | 0.6 | — | Hard-coded |
| .nav__links a | opacity | 0.85 | — | Hard-coded |
| .nav__links a:hover | opacity | 1 | — | Hard-coded |
| .btn:hover | opacity | 0.9 | — | Hard-coded |
| .hero__chord:hover ~ .hero__illustration | opacity | 0.16 | — | Hard-coded |
| .stats::before (noise) | opacity | 0.56 | — | Hard-coded |
| .why-build__easter | opacity | 0 | — | Hard-coded (initial state) |
| .ecosystem__system::before (noise) | opacity | 0.40 | — | Hard-coded |
| .ecosystem__modal-backdrop | opacity | 0 / 1 | — | Hard-coded (state toggle) |
| .ecosystem__modal | opacity | 0 / 1 | — | Hard-coded (state toggle) |
| .how-built__easter | opacity | 0 | — | Hard-coded (initial state) |

---

# Value Inventory: JavaScript / Canvas

**Category**: JavaScript-defined colors, font sizes, opacities, timing, and sizing values

---

## Canvas: Chord Diagram

### Color Palette (PAL object)

| Key | Value | Purpose | Status |
|-----|-------|---------|--------|
| root | #ff2d8f | DesignerPunk brand / center node | Hard-coded |
| mcp | #00aabb | MCP server nodes | Hard-coded |
| figma | #e0006a | Figma-related nodes | Hard-coded |
| rosetta | #1a5fff | Rosetta system nodes | Hard-coded |
| stemma | #7a00cc | Stemma system nodes | Hard-coded |
| release | #009955 | Release manager node | Hard-coded |
| a2ui | #009ab0 | A2UI node | Hard-coded |
| agent | #cc0058 | Agent nodes | Hard-coded |

### Group Colors

| Group | Value | Purpose | Status |
|-------|-------|---------|--------|
| MCP SERVERS | #00aabb | Arc band color | Hard-coded |
| AGENTS | #ff2d8f | Arc band color | Hard-coded |
| SYSTEMS | #7a00cc | Arc band color | Hard-coded |
| TOKENS | #1a5fff | Inner arc band color | Hard-coded |
| COMPONENTS | #9933ff | Inner arc band color | Hard-coded |

### Font Sizes

| Context | Value | Status |
|---------|-------|--------|
| Arc band labels (outer) | 8px | Hard-coded |
| Arc band labels (inner) | 7px | Hard-coded |
| Node labels (large) | 10px | Hard-coded |
| Node labels (small) | 9px | Hard-coded |
| Node labels (inner) | 8.5px | Hard-coded |
| Root label | 10px | Hard-coded |

### Font Family

| Context | Value | Status |
|---------|-------|--------|
| Arc band labels | ui-monospace, monospace | Hard-coded |
| Node labels | CommitMono-Bold, ui-monospace, SFMono-Regular, monospace | Hard-coded |
| Root label | ui-monospace, monospace | Hard-coded |

### Opacity / Alpha Values

| Context | Value | Status |
|---------|-------|--------|
| Arc band (outer) | 0.15 | Hard-coded |
| Arc band (inner) | 0.12 | Hard-coded |
| Arc band outline | 0.6 | Hard-coded |
| Arc band label | 0.7 | Hard-coded |
| Chord (active) | 0.62 | Hard-coded |
| Chord (inactive) | 0.10 | Hard-coded |
| Pulse dot | 0.9 | Hard-coded |
| Node fill | rgba(255,255,255,0.9) | Hard-coded |
| Node stroke | 0.88 | Hard-coded |
| Node inner dot | 0.65 | Hard-coded |
| Node hover halo | 0.1 | Hard-coded |
| Node label (large) | 0.8 | Hard-coded |
| Node label (small) | 0.55 | Hard-coded |
| Root fill | rgba(255,255,255,0.85) | Hard-coded |
| Root stroke | 0.85 | Hard-coded |

### Sizing / Layout

| Context | Value | Status |
|---------|-------|--------|
| Outer ring radius | shortSide × 0.40 | Hard-coded (proportional) |
| Inner ring radius | shortSide × 0.245 | Hard-coded (proportional) |
| Root radius | shortSide × 0.075 | Hard-coded (proportional) |
| Group gap | 0.10 radians | Hard-coded |
| Node base radius | 3 + size × 1.8 | Hard-coded (formula) |
| Pulse dot radius | 2.2px | Hard-coded |
| Line width (chord) | weight × 1.5 | Hard-coded (formula) |
| Line width (node stroke) | 1.5 / 2 (hover) | Hard-coded |

### Animation Timing

| Context | Value | Status |
|---------|-------|--------|
| Idle spin speed | 0.0004 | Hard-coded |
| Hover deceleration | 0.07 | Hard-coded |
| Resume acceleration | 0.03 | Hard-coded |
| Pulse speed | 0.0018 + random × 0.002 | Hard-coded |

---

## Canvas: Career Chart

### Gradient Colors (Design bars)

| Context | Condition | Value (RGB) | Hex Equivalent | Status |
|---------|-----------|-------------|----------------|--------|
| Design bar top | 3fn | 176, 38, 255 | #B026FF | Hard-coded |
| Design bar bottom | 3fn | 255, 130, 180 | #FF82B4 | Hard-coded |
| Design bar top | Employment | 255, 42, 109 | #FF2A6D | Hard-coded |
| Design bar bottom | Employment | 217, 138, 255 | #D98AFF | Hard-coded |

### Gradient Colors (Engineering bars)

| Context | Condition | Value (RGB) | Hex Equivalent | Status |
|---------|-----------|-------------|----------------|--------|
| Eng bar top | 3fn | 245, 245, 250 | #F5F5FA | Hard-coded |
| Eng bar bottom | 3fn | 34, 34, 42 | #22222A | Hard-coded |
| Eng bar top | Employment | 232, 232, 240 | #E8E8F0 | Hard-coded |
| Eng bar bottom | Employment | 38, 50, 58 | #26323A | Hard-coded |

### Line Colors

| Context | Value | Status |
|---------|-------|--------|
| Design line (3fn) | rgba(204,34,87,1) | Hard-coded |
| Design line (employment) | rgba(141,30,204,1) | Hard-coded |
| Engineering line | rgba(24,34,40,1) | Hard-coded |
| Baseline | rgba(34,34,42,1) | Hard-coded |
| Grid lines | rgba(178,188,196,0.15) | Hard-coded |
| Dot fill | rgba(38,50,58,1) | Hard-coded |

### Label Colors

| Context | Value | Status |
|---------|-------|--------|
| Year labels | rgba(38,50,58,0.5) | Hard-coded |
| Axis labels | rgba(38,50,58,0.35) | Hard-coded |
| Segment label (hover, 3fn) | rgba(176,38,255,1) | Hard-coded |
| Segment label (hover, employment) | rgba(38,50,58,0.9) | Hard-coded |
| Segment label (idle, 3fn) | rgba(176,38,255,0.4) | Hard-coded |
| Segment label (idle, employment) | rgba(38,50,58,0.6) | Hard-coded |

### Font Sizes

| Context | Value | Status |
|---------|-------|--------|
| Year labels | 10px | Hard-coded |
| Axis labels | 9px | Hard-coded |
| Segment labels | 9px | Hard-coded |

### Noise Pattern Config

| Property | Value | Status |
|----------|-------|--------|
| NOISE_SIZE | 256 | Hard-coded |
| NOISE_DENSITY | 0.8 | Hard-coded |
| NOISE_ALPHA | 24 (of 255) | Hard-coded |

### Line Widths

| Context | Value | Status |
|---------|-------|--------|
| Grid lines | 0.5px | Hard-coded |
| Vertical center lines | 1.5px | Hard-coded |
| Horizontal cap lines | 2px | Hard-coded |
| Baseline | 1.5px | Hard-coded |

---

## Canvas: Ecosystem Connectors

### Colors

| System | Value | Status |
|--------|-------|--------|
| Rosetta | #80F6FF | Hard-coded |
| Stemma | #80FFBB | Hard-coded |
| Civitas | #FCF680 | Hard-coded |

### Shadow Filter

| Property | Value | Status |
|----------|-------|--------|
| dx | 3 | Hard-coded |
| dy | 2 | Hard-coded |
| stdDeviation | 4 | Hard-coded |
| flood-color | rgba(10,10,15,0.4) | Hard-coded |

### Line / Dot Sizing

| Element | Property | Value | Status |
|---------|----------|-------|--------|
| Connector line | stroke-width | 2.5 | Hard-coded |
| Shadow dot | radius | 7 | Hard-coded |
| Shadow dot | fill | rgba(10,10,15,0.3) | Hard-coded |
| Color dot | radius | 5 | Hard-coded |

---

# Value Inventory: Inline Styles

**Category**: Values defined in HTML inline `style` attributes

---

## Career Tooltip (#career-tooltip)

| Property | Value | Token Reference | Status |
|----------|-------|-----------------|--------|
| background | rgba(255,255,255,0.97) | — | Hard-coded |
| border | 1px solid var(--gray-100) | gray-100 (color), 1px (width) | Partial token |
| padding | 16px 20px | — | Hard-coded |
| font-family | ui-monospace, monospace | — | Hard-coded |
| font-size | 13px | — | Hard-coded |
| color | var(--black-300) | black-300 | Hard-coded (primitive) |
| max-width | 270px | — | Hard-coded |
| line-height | 1.6 | — | Hard-coded |
| border-radius | 4px | — | Hard-coded |
| box-shadow | 0 4px 12px rgba(0,0,0,0.1) | — | Hard-coded |

## Career Tooltip Children

| Element | Property | Value | Token Reference | Status |
|---------|----------|-------|-----------------|--------|
| #ct-title | font-size | 12px | — | Hard-coded |
| #ct-title | font-weight | bold | — | Hard-coded |
| #ct-title | margin-bottom | 4px | — | Hard-coded |
| #ct-period | color | var(--gray-200) | gray-200 | Hard-coded (primitive) |
| #ct-period | font-size | 12px | — | Hard-coded |
| #ct-period | margin-bottom | 10px | — | Hard-coded |
| Design/Eng rows | gap | 20px | — | Hard-coded |
| Design/Eng rows | margin-bottom | 4px | — | Hard-coded |
| "Design" label | color | var(--gray-300) | gray-300 | Hard-coded (primitive) |
| "Engineering" label | color | var(--gray-300) | gray-300 | Hard-coded (primitive) |
| #ct-design value | color | #e8006a | — | Hard-coded |
| #ct-eng value | color | var(--black-300) | black-300 | Hard-coded (primitive) |
| #ct-desc | color | var(--gray-300) | gray-300 | Hard-coded (primitive) |
| #ct-desc | font-size | 12px | — | Hard-coded |
| #ct-desc | line-height | 1.6 | — | Hard-coded |
| #ct-desc | margin-top | 8px | — | Hard-coded |
| #ct-desc | border-top | 1px solid var(--gray-100) | gray-100 | Partial token |
| #ct-desc | padding-top | 8px | — | Hard-coded |

## Chord Tooltip (#chord-tip)

| Property | Value | Token Reference | Status |
|----------|-------|-----------------|--------|
| background | rgba(255,255,255,0.97) | — | Hard-coded |
| border | 2px solid #ff2d8f | — | Hard-coded |
| border-radius | 2px | — | Hard-coded |
| padding | 6px 12px | — | Hard-coded |
| font-family | ui-monospace, monospace | — | Hard-coded |
| font-size | 12px | — | Hard-coded |
| color | #111 | — | Hard-coded |
| max-width | 260px | — | Hard-coded |
| line-height | 1.6 | — | Hard-coded |
| letter-spacing | 0.01em | — | Hard-coded |

## Other Inline Styles

| Element | Property | Value | Status |
|---------|----------|-------|--------|
| .nav__logo img | filter | invert(1) | Hard-coded (functional) |
| .how-built section | position | relative | Hard-coded (layout) |
