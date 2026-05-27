# Non-Aligning Value Evaluation

**Spec**: 002 - Portfolio Token Compliance
**Task**: 5 - Non-Aligning Value Evaluation
**Agent**: Ada (Leonardo provides product context, Peter approves dispositions)
**Date**: 2026-05-24
**Status**: Draft — canvas values pending Task 6, ambiguous values pending Peter review

---

## Methodology

Each non-aligning value receives a disposition:
- **Create primitive token** (requires Ada review)
- **Create semantic token** (requires Ada review + Peter approval)
- **Adjust design to use existing token** (requires Peter approval)
- **Document as justified hard value** (requires Peter acknowledgment)
- **Define as product-level CSS custom property** (requires Leonardo + Peter)

Pre-resolved decisions from design-outline are applied directly.

---

## Section 1: Pre-Resolved Decisions (Applied Directly)

These were resolved during design-outline review (Ada consultation, 2026-05-24). No re-evaluation needed.

| Value | Occurrences | Disposition | Rationale |
|-------|-------------|-------------|-----------|
| 1336px (max-width) | 10× | **Product CSS custom property**: `--layout-content-max-width` | Layout constraint, not mathematically grounded. Not a token. |
| 96px (section padding) | 5× | **Create primitive**: space1200 (8×12) | Clean base-8 multiple, fills obvious scale gap between space800(64) and proposed space1600(128). |
| 72px (section gap) | 2× | **Create primitive**: space900 (8×9) | Clean base-8 multiple, fills gap. Note: size900=72 exists in sizing family already. |
| 128px (section padding) | 4× | **Create primitive**: space1600 (8×16) | Clean base-8 multiple. Note: size1600=128 exists in sizing family already. |
| Canvas font sizes (9-10px) | Canvas | **Documented exception** | Canvas context, not DOM text, data visualization convention. Below WCAG readability but legitimate in canvas. |
| Visualization colors | Canvas | **Application-level values** | Visualization palettes have different requirements (perceptual distinctness, colorblind safety) than UI palettes. |
| Noise opacity → opacity024 | 1× | **Align to existing token**: opacity024 (0.24) | Per Peter decision (2026-05-24). Canvas NOISE_ALPHA will change from 24 to 61 (Math.round(0.24×255)). |
| Noise opacity 0.56 → opacity056 | 1× | **Align to existing token**: opacity056 (0.56) | Exact match confirmed. |

---

## Section 2: Confident Dispositions (Ada + Leonardo agreement)

These values have clear dispositions based on analysis. Listed for Peter's acknowledgment.

### Snap to Nearest Token (design adjustments)

| Value | Occurrences | Context | Snap To | Rationale | Approval |
|-------|-------------|---------|---------|-----------|----------|
| 34px font-size | 7× | Section headings | **fontSize500 (33px)** | 1px imperceptible at this size. Prototype approximation — Peter likely typed "34" without referencing scale. | Peter |
| 22px font-size | 3× | Stats, quotes, modal stats | **fontSize200 (23px)** | 1px imperceptible. Aligns to modular scale. | Peter |
| 36px spacing | 2× | Card padding-block, CTA margin | **space400 (32px)** or **space500 (40px)** | Half-step (8×4.5). Card padding → 32px; CTA margin → 40px. | Peter |
| 28px spacing | 1× | Card padding-inline | **space400 (32px)** | Half-step (8×3.5). Equal padding is fine; asymmetry not needed. | Peter |
| 14px spacing | 4× | Various tight gaps | **space200 (16px)** | Half-step (8×1.75). 16px is the natural "comfortable related" value. Where tighter needed, use space150 (12px). | Peter |
| 22px (footer padding) | 1× | .footer padding | **space250 (20px)** | ±2px tolerance. Nearest token. | Peter |
| #fefefe | 2× | CTA heading/body bg | **white100 (#ffffff)** | 1 unit off in all channels. Prototype approximation. | Peter |
| #111 | 1× | Chord tooltip text | **black300** (rgba(10,10,15,1)) | Near-black, same intent. Tooltip text should match system dark text. | Peter |
| 120px | 1× | .why-build padding-top | **space1600 (128px)** | Prototype approximation. Sections are meant to feel expansive — round up to 128px. | Peter |
| CSS `ease` easing | 7× | All transitions | **easingStandard** (Material curve) | CSS default, not deliberate. System curves produce more natural motion. | Peter |

### Replace with Existing Token (easing already resolved)

| Value | Context | Token | Rationale |
|-------|---------|-------|-----------|
| 0.16 opacity | .hero__chord hover | opacity016 | Already confirmed exact match |
| 0.40 opacity | .ecosystem noise | opacity040 | Already confirmed exact match |

### Keep as Primitive (below threshold, decorative, or unique)

| Value | Occurrences | Context | Rationale |
|-------|-------------|---------|-----------|
| 224px | 1× | .cta padding-bottom | Decorative one-off. Large bottom padding for CTA section visual weight. Product CSS custom property candidate. |
| 3px border-width | 1× | .why-build__quote border-left | Accent border — between borderWidth200(2) and borderWidth400(4). Single decorative use. |
| 800ms animation | 2× | Neon flicker keyframes | Decorative easter egg timing. Not a UI transition. |

### Product-Level CSS Custom Properties

| Value | Occurrences | Context | Property Name | Rationale |
|-------|-------------|---------|---------------|-----------|
| 1336px | 10× | Content max-width | `--layout-content-max-width` | Pre-resolved. Layout constraint. |
| 640px | 1× | Quote max-width | `--layout-quote-max-width` | Content-width constraint. |
| 1020px | 1× | Modal max-width | `--layout-modal-max-width` | Modal sizing constraint. |
| 280px | 1× | CTA actions max-width | `--layout-cta-actions-max-width` | Button group constraint. |
| 380px | 1× | Illustration max-width | `--layout-illustration-max-width` | Asset sizing. |
| 180px, 200px | 2× | System/modal header max-width | `--layout-card-header-max-width` | Card header constraint. |
| 400px, 300px | 2× | Responsive illustration max-width | Responsive breakpoint values | Media query constraints. |
| 48ch | 1× | Description max-width | `--layout-prose-max-width` | Typographic measure constraint. |
| 224px | 1× | CTA padding-bottom | `--layout-cta-bottom-padding` | Decorative section weight. |

---

## Section 3: Proposed New Tokens (require Ada review + Peter approval)

### 3a. Primitive Token Candidates

| Token | Value | Formula | Occurrences | Rationale |
|-------|-------|---------|-------------|-----------|
| space900 | 72 | base × 9 = 8 × 9 | 2× | Fills gap between space800(64) and proposed space1200. Clean multiple. Pre-resolved. |
| space1200 | 96 | base × 12 = 8 × 12 | 5× | Section padding. High frequency. Pre-resolved. |
| space1600 | 128 | base × 16 = 8 × 16 | 4× | Section padding. Pre-resolved. Note: size1600=128 already exists in sizing. |

**Ada's assessment**: All three are clean base-8 multiples that fill obvious gaps in the spacing scale. The sizing family already has size900(72) and size1600(128), confirming these values are mathematically sound. Creating spacing equivalents is straightforward.

**Counter-argument**: Do we need both spacing AND sizing tokens at the same values? The distinction is semantic (spacing = between things, sizing = dimensions of things). These section padding values are clearly spacing, not sizing. The overlap is acceptable — different families serve different purposes.

### 3b. Semantic Token Candidates

| Token | Primitive Reference | Occurrences | Rationale |
|-------|--------------------:|-------------|-----------|
| color.text.heading | black300 | 9× | Primary heading text. Intentional two-tier contrast: headings=near-black (black300), maximum-contrast=pure-black (black500 via color.contrast.onLight). See Task 4 analysis. |

**Ada's assessment**: Strong candidate. The prototype demonstrates deliberate usage — `color.contrast.onLight` is used correctly for hero/button text while section headings consistently use the softer `black300`. This isn't accidental; it's a readable hierarchy.

**Counter-argument**: Adding `color.text.heading` creates a 4th text-color semantic (alongside `.default`, `.muted`, `.subtle`). Is the distinction between "heading" (black300=near-black) and "onLight" (black500=pure-black) meaningful enough to warrant a separate token? The visual difference between rgba(10,10,15,1) and rgba(0,0,0,1) is subtle. HOWEVER, the semantic distinction is clear — "heading text" vs "maximum contrast text" — and the 9× occurrence count is strong.

---

## Section 4: Ambiguous Values — Peter Decision Required

### 4a. 88px (.hero__content margin-top) — ✅ RESOLVED

**Peter's decision (2026-05-24)**: Snap to **80px (size1000)**. 

**Disposition**: Adjust design to use existing token — `size1000` (80px).

---

### 4b. 12px font-size (10×) — ✅ RESOLVED

**Peter's decision (2026-05-24)**: Snap up to **13px (fontSize050)**. Accessibility wins over the 1px distinction.

**Disposition**: Adjust design to use existing token — `fontSize050` (13px). Affects 10 declarations (labels, badges, footer, code viz, tooltips).

---

### 4c. Box Shadows (5 declarations) — ✅ RESOLVED

**Peter's decisions (2026-05-24)**:

| Shadow | Disposition | Token |
|--------|------------|-------|
| Nav (0 4px 24px, 0.3) | Align to existing | **shadow.container** (accept tighter blur) |
| Ecosystem cards (0 4px 24px, 0.3) | Align to existing | **shadow.container** |
| Ecosystem card hover (0 6px 32px, 0.35) | Align to existing | **shadow.hover** |
| Modal (0 24px 64px, 0.4) | **Update shadow.modal** to match prototype | Requires new primitives: shadowOffsetY.600 (24), blur400 (64) |
| Code shots (0 2px 12px, 0.08) | Align to existing | **shadow.container** (accept heavier shadow) |

**Token changes required (downstream spec)**:
- Create primitive: `shadowOffsetY.600` (value=24, formula: base×6 = 4×6)
- Create primitive: `blur400` (value=64, formula: base×4 = 16×4)
- Update semantic: `shadow.modal` → offsetX.000, offsetY.600, blur400, shadowOpacityHard, shadowBlack100

**Rationale for shadow.modal update**: Site will expand beyond single page. Dramatic modal elevation is reusable across future pages. Primitives fill obvious scale gaps with clean multiples.

---

### 4d. Opacity Values (0.6, 0.85, 0.9) — ✅ RESOLVED

**Peter's decision (2026-05-24)**: Snap to nearest tokens.

| Prototype | Snap To | Context |
|-----------|---------|---------|
| 0.6 | **opacity064** (0.64) | Nav logo credit |
| 0.85 | **opacity088** (0.88) | Nav links default |
| 0.9 | **opacity088** (0.88) | Button hover |

---

### 4e. Duration Values (200ms × 2, 300ms × 1) — ✅ RESOLVED

**Peter's decision (2026-05-24)**: Snap up.

| Prototype | Snap To | Context |
|-----------|---------|---------|
| 200ms | **duration250** (250ms) | Modal backdrop fade, card hover |
| 300ms | **duration350** (350ms) | Modal open animation |

---

## Section 5: Canvas Non-Aligning Values — RESOLVED (Task 6 Complete)

Task 6 (Canvas Audits) completed 2026-05-24. **No canvas values escalated to Task 5.** All 47 non-aligning canvas values are justified as application-level exceptions per the design-outline principle: "align where possible, preserve readability above all."

**Summary from Task 6:**
- 58 total canvas values audited across 3 visualizations
- 11 values align to existing tokens (will reference tokens in implementation)
- 47 values documented as justified exceptions (categorical distinctness, physics-based animation, canvas rendering context, missing color families)
- One system gap confirmed: no yellow primitive family (Civitas connector). Non-blocking.

No additional dispositions needed in this document.

---

## Section 6: Summary of Dispositions

| Disposition | Count | Status |
|-------------|-------|--------|
| Pre-resolved (applied directly) | 8 | ✅ Final |
| Snap to existing token | 10 values | ✅ Peter approved (2026-05-24) |
| Product CSS custom property | 11 values | ✅ Peter acknowledged |
| Keep as primitive (decorative/one-off) | 3 values | ✅ Peter acknowledged |
| Create primitive token | 5 tokens (space900, space1200, space1600, shadowOffsetY.600, blur400) | ✅ Peter approved (2026-05-24) |
| Create/update semantic token | 1 new (color.text.heading) + 1 update (shadow.modal) | ✅ Peter approved (2026-05-24) |
| Ambiguous — Peter decides | 5 decisions (88px, 12px, shadows, opacity, duration) | ✅ All resolved (2026-05-24) |
| Canvas values | 47 exceptions (justified) + 3 aligned (incl. yellow200 correction) | ✅ Final |
