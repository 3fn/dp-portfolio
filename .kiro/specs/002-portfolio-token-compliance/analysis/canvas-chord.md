# Canvas Audit: Chord Diagram

**Spec**: 002 - Portfolio Token Compliance
**Task**: 6.1 - Audit chord diagram
**Agent**: Leonardo
**Date**: 2026-05-24

---

## Color Alignment

| PAL Key | Prototype Color | Nearest Primitive | Primitive Value | Delta | Recommendation |
|---------|----------------|-------------------|-----------------|-------|----------------|
| root | #ff2d8f | pink300 | #ff2a6d (rgba 255,42,109) | Hue shift ~5°, slightly more magenta | **EXCEPTION** — brand identifier, perceptual distinctness matters |
| mcp | #00aabb | cyan400 | #00c0cc (rgba 0,192,204) | Darker/less saturated | **EXCEPTION** — categorical distinctness from cyan300/400 |
| figma | #e0006a | pink400 | #cc2257 (rgba 204,34,87) | Brighter, more saturated | **EXCEPTION** — represents Figma brand, not DP pink |
| rosetta | #1a5fff | [no blue family] | N/A | No match possible | **EXCEPTION** — no blue primitives exist |
| stemma | #7a00cc | purple400 | #8d1ecc (rgba 141,30,204) | Similar range, slightly different hue | **EVALUATE** — could adapt to purple400 |
| release | #009955 | green500 | #00cc6e (rgba 0,204,110) | Darker, less saturated | **EXCEPTION** — categorical distinctness from green family |
| a2ui | #009ab0 | cyan500 | #00888f (rgba 0,136,143) | Similar range | **EVALUATE** — could adapt to cyan500 |
| agent | #cc0058 | pink400 | #cc2257 (rgba 204,34,87) | Very close — same red channel, slight hue shift | **EVALUATE** — could adapt to pink400 |

### Group Arc Colors

| Group | Color | Same as PAL key | Recommendation |
|-------|-------|-----------------|----------------|
| MCP SERVERS | #00aabb | PAL.mcp | Same disposition as above |
| AGENTS | #ff2d8f | PAL.root | Same disposition as above |
| SYSTEMS | #7a00cc | PAL.stemma | Same disposition as above |
| TOKENS (inner) | #1a5fff | PAL.rosetta | Same disposition as above |
| COMPONENTS (inner) | #9933ff | — | **EXCEPTION** — between purple300 (#b026ff) and purple400 (#8d1ecc), categorical variant |

---

## Alignment Evaluation for "EVALUATE" Items

### PAL.stemma (#7a00cc) → purple400 (#8d1ecc)?

- Delta: prototype is darker/more blue-shifted than purple400
- Impact on readability: minimal — both are deep purple, distinguishable from other categories
- Impact on categorical distinctness: purple400 is also used by SYSTEMS group — if stemma adapts to purple400, it becomes identical to the SYSTEMS arc color. **This breaks categorical distinctness.**
- **Decision: EXCEPTION** — must remain distinct from SYSTEMS group color

### PAL.a2ui (#009ab0) → cyan500 (#00888f)?

- Delta: prototype is slightly brighter/more blue
- Impact on readability: minimal
- Impact on categorical distinctness: cyan500 is not used elsewhere in the chord diagram
- **Decision: ALIGN** — adapt to cyan500. The perceptual difference is negligible and doesn't affect category identification.

### PAL.agent (#cc0058) → pink400 (#cc2257)?

- Delta: very close — same darkness, slight hue shift toward red
- Impact on readability: none
- Impact on categorical distinctness: pink400 is not used elsewhere in the chord diagram (PAL.root uses a brighter pink)
- **Decision: ALIGN** — adapt to pink400. Maintains distinctness from PAL.root (which is brighter/more magenta).

---

## Typography Exception Documentation

| Size | Context | Font Stack | Rationale |
|------|---------|-----------|-----------|
| 7px | Inner arc band labels | ui-monospace, monospace | Canvas context; not DOM text; data viz convention; supplementary annotation |
| 8px | Outer arc band labels | ui-monospace, monospace | Canvas context; not DOM text; data viz convention; supplementary annotation |
| 8.5px | Inner node labels | CommitMono-Bold, ui-monospace | Canvas context; not DOM text; proportional to node size |
| 9px | Small node labels | CommitMono-Bold, ui-monospace | Canvas context; not DOM text; data viz convention |
| 10px | Large node labels, root label | CommitMono-Bold / ui-monospace | Canvas context; not DOM text; primary identification labels |

All canvas font sizes are below the typography scale minimum (13px). Documented as legitimate exceptions per pre-resolved decision (Ada consultation, 2026-05-24).

**Font family note**: `CommitMono-Bold, ui-monospace, SFMono-Regular, monospace` — the `CommitMono-Bold` reference should be evaluated. If the system has a mono font token (`font-family-mono`), the JS should reference the same font stack for consistency.

---

## Animation Timing Comparison

| Context | Value | Nearest Motion Token | Recommendation |
|---------|-------|---------------------|----------------|
| Idle spin speed | 0.0004 rad/frame | N/A | **EXCEPTION** — continuous animation, not a transition |
| Hover deceleration | 0.07 | N/A | **EXCEPTION** — physics-based interpolation, not a duration |
| Resume acceleration | 0.03 | N/A | **EXCEPTION** — physics-based interpolation |
| Pulse speed | 0.0018 + random × 0.002 | N/A | **EXCEPTION** — randomized continuous animation |

All animation values are physics-based interpolation constants or continuous animation speeds — fundamentally different from CSS transition durations. Not token candidates.

---

## Non-Aligning Values for Task 5

| Value | Context | Recommendation |
|-------|---------|----------------|
| #ff2d8f (PAL.root) | Brand/root node color | Application-level exception — visualization brand identifier |
| #00aabb (PAL.mcp) | MCP category color | Application-level exception — categorical distinctness |
| #e0006a (PAL.figma) | Figma brand representation | Application-level exception — external brand color |
| #1a5fff (PAL.rosetta) | Rosetta category color | Application-level exception — no blue family exists |
| #7a00cc (PAL.stemma) | Stemma category color | Application-level exception — must be distinct from SYSTEMS |
| #009955 (PAL.release) | Release category color | Application-level exception — categorical distinctness |
| #9933ff (COMPONENTS group) | Inner arc color | Application-level exception — categorical variant |

---

## Summary

| Category | Align | Exception | Total |
|----------|-------|-----------|-------|
| Colors (PAL + groups) | 2 (a2ui→cyan500, agent→pink400) | 11 | 13 |
| Font sizes | 0 | 5 (all below scale) | 5 |
| Animation timing | 0 | 4 (physics-based) | 4 |
| **Total** | **2** | **20** | **22** |

The chord diagram is overwhelmingly application-level. Only 2 of 22 audited values can align to existing tokens. This is expected — the visualization serves categorical data representation with perceptual distinctness requirements that are orthogonal to the UI token system.
