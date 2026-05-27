# Canvas Audit: Ecosystem Connectors

**Spec**: 002 - Portfolio Token Compliance
**Task**: 6.3 - Audit ecosystem connectors
**Agent**: Leonardo
**Date**: 2026-05-24

---

## Color Alignment

| System | Prototype Color | Nearest Primitive | Primitive Value | Recommendation |
|--------|----------------|-------------------|-----------------|----------------|
| Rosetta | #80F6FF | cyan200 | rgba(128, 246, 255) = #80F6FF | **ALIGN** — exact match |
| Stemma | #80FFBB | green200 | rgba(128, 255, 187) = #80FFBB | **ALIGN** — exact match |
| Civitas | #FCF680 | yellow200 | rgba(252, 246, 128) = #FCF680 | **ALIGN** — exact match |

All three connector colors are exact primitive matches — Rosetta (cyan200), Stemma (green200), Civitas (yellow200). Peter confirmed Civitas intent was yellow200; the prototype value #FCF680 = rgba(252,246,128,1) matches exactly.

---

## Line Weight

| Element | Value | Nearest Token | Token Value | Recommendation |
|---------|-------|---------------|-------------|----------------|
| Connector line | stroke-width: 2.5 | borderWidth200 | 2 | **EXCEPTION** — 2.5 is between border-width-200 (2) and border-width-400 (4). Snapping to either changes the visual weight. Canvas stroke-width is a different rendering context than CSS border-width. |

---

## Shadow Filter

| Property | Value | Token Comparison | Recommendation |
|----------|-------|-----------------|----------------|
| dx | 3 | — | **EXCEPTION** — SVG filter parameter |
| dy | 2 | — | **EXCEPTION** — SVG filter parameter |
| stdDeviation | 4 | — | **EXCEPTION** — SVG filter blur, no shadow blur token |
| flood-color | rgba(10,10,15,0.4) | — | **EXCEPTION** — shadow color, near-black with opacity |

Shadow filter values are SVG-specific rendering parameters. The system's shadow tokens (if any) are CSS box-shadow composites — fundamentally different from SVG `feDropShadow` filter attributes. Not token candidates.

---

## Dot Sizing

| Element | Property | Value | Nearest Token | Recommendation |
|---------|----------|-------|---------------|----------------|
| Shadow dot | radius | 7 | — | **EXCEPTION** — proportional to connector line weight |
| Color dot | radius | 5 | — | **EXCEPTION** — proportional to connector line weight |
| Shadow dot | fill | rgba(10,10,15,0.3) | — | **EXCEPTION** — manual shadow replacement (no filter) |

---

## Non-Aligning Values for Task 5

None. All connector colors align to primitives (cyan200, green200, yellow200). Non-color values are justified SVG/canvas exceptions.

---

## Summary

| Category | Align | Exception | Total |
|----------|-------|-----------|-------|
| Colors | 3 (cyan200, green200, yellow200 exact) | 0 | 3 |
| Line weight | 0 | 1 | 1 |
| Shadow filter | 0 | 4 | 4 |
| Dot sizing | 0 | 3 | 3 |
| **Total** | **3** | **8** | **11** |

The ecosystem connectors have the best alignment ratio of the three canvas audits — all 3 colors are exact primitive matches. Peter confirmed Civitas intent was yellow200 (the report initially missed the yellow family). Peter's manual color updates landed directly on system primitives, which is a strong signal that the design intent was system-aligned from the start.
