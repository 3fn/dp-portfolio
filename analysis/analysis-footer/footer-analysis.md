# Component Analysis: Footer

**Component Type**: COMPONENT
**Figma ID**: 3492:3267
**File Key**: yU7908VXR1khQN5hZXC6Cy
**Extracted**: 2026-05-10T03:18:57.955Z
**Extractor Version**: 6.3.0

---

## Classification Summary

| Tier | Count | Percentage |
| --- | --- | --- |
| ✅ Semantic Identified | 3 | 7% |
| ⚠️ Primitive Identified | 5 | 12% |
| ❌ Unidentified | 33 | 80% |
| **Total** | **41** | **100%** |

## Node Tree

- **Footer** (FRAME, depth 0) [S:2 P:1 U:4]
  - **Logo Container** (FRAME, depth 1) [S:0 P:0 U:6]
    - **Frame 331** (FRAME, depth 2) [S:0 P:0 U:6]
      - **Union** (FRAME, depth 3) [S:0 P:1 U:0]
  - **Contact Container** (FRAME, depth 1) [S:1 P:0 U:5]
    - **Peter Michaels Allen** (TEXT, depth 2) [S:0 P:1 U:4]
    - **◌** (TEXT, depth 2) [S:0 P:1 U:4]
    - **peter[at]designerpunk.ai** (TEXT, depth 2) [S:0 P:1 U:4]

## Token Usage by Node

### Footer (FRAME, depth 0)

- ✅ `padding-top`: semanticSpace.inset.300 → space.space300 (binding, exact)
- ✅ `padding-bottom`: semanticSpace.inset.300 → space.space300 (binding, exact)
- ⚠️ `fill`: color.black500 (binding, exact)
- ❌ `padding-right`: 64 (value-match)
- ❌ `padding-left`: 64 (value-match)
- ❌ `item-spacing`: 0 (value-match)
- ❌ `border-width`: 1 (value-match)

### Logo Container (FRAME, depth 1)

- ❌ `padding-top`: 0 (value-match)
- ❌ `padding-right`: 0 (value-match)
- ❌ `padding-bottom`: 0 (value-match)
- ❌ `padding-left`: 0 (value-match)
- ❌ `item-spacing`: 0 (value-match)
- ❌ `border-width`: 1 (value-match)

### Frame 331 (FRAME, depth 2)

- ❌ `padding-top`: 0 (value-match)
- ❌ `padding-right`: 0 (value-match)
- ❌ `padding-bottom`: 0 (value-match)
- ❌ `padding-left`: 0 (value-match)
- ❌ `item-spacing`: 8 (value-match)
- ❌ `border-width`: 1 (value-match)

### Union (FRAME, depth 3)

- ⚠️ `fill`: color.white300 (binding, exact)

### Contact Container (FRAME, depth 1)

- ✅ `item-spacing`: semanticSpace.related.normal → space.space200 (binding, exact)
- ❌ `padding-top`: 0 (value-match)
- ❌ `padding-right`: 0 (value-match)
- ❌ `padding-bottom`: 0 (value-match)
- ❌ `padding-left`: 0 (value-match)
- ❌ `border-width`: 1 (value-match)

### Peter Michaels Allen (TEXT, depth 2)

- ⚠️ `fill`: color.white300 (binding, exact)
- ❌ `border-width`: 1 (value-match)
- ❌ `font-size`: 20 (value-match)
- ❌ `font-weight`: 700 (value-match)
- ❌ `line-height`: 28 (out-of-tolerance — closest: lineHeight.lineHeight125 (±26.444px))

### ◌ (TEXT, depth 2)

- ⚠️ `fill`: color.white300 (binding, exact)
- ❌ `border-width`: 1 (value-match)
- ❌ `font-size`: 20 (value-match)
- ❌ `font-weight`: 700 (value-match)
- ❌ `line-height`: 28 (out-of-tolerance — closest: lineHeight.lineHeight125 (±26.444px))

### peter[at]designerpunk.ai (TEXT, depth 2)

- ⚠️ `fill`: color.white300 (binding, exact)
- ❌ `border-width`: 1 (value-match)
- ❌ `font-size`: 20 (value-match)
- ❌ `font-weight`: 700 (value-match)
- ❌ `line-height`: 28 (out-of-tolerance — closest: lineHeight.lineHeight125 (±26.444px))


## Recommendations

### Variant Mapping

⚠️ **Validation Required**: This analysis is based on Figma component structure. The optimal code structure may differ.

**Component**: Footer
**Classification**: styling

**A** ✅ Recommended
- Single component with a variant prop
- Rationale: Variants differ only in visual styling, making a single component with a variant prop the simplest API surface.
- Aligns with: Behavioral analysis: variants are styling-only
- Trade-offs: Simpler consumer API — one import, one tag., Internal complexity grows if behavioral differences emerge later., Harder to tree-shake unused variants.

**B** 
- Primitive + semantic component structure (Stemma pattern)
- Rationale: A split structure future-proofs the component for behavioral divergence, though current variants are styling-only.
- Trade-offs: Clean separation of behavioral contracts per component., Aligns with Stemma inheritance pattern used across DesignerPunk., More components to maintain and document.


**Domain Specialist Validation**:
- **Ada** (Token Specialist): Are token classifications correct? Should new semantic tokens be created?
- **Lina** (Component Specialist): Does the component architecture match Stemma patterns?
- **Thurgood** (Governance): Does this meet spec standards and test coverage requirements?

### Component Token Suggestions

⚠️ **Validation Required**: This analysis is based on Figma component structure. The optimal code structure may differ.

- **footer.item-spacing = space.space000** ← `space.space000` (used 5× in item-spacing, padding-top, padding-right, padding-bottom, padding-left)
  - space.space000 is used across 5 properties (item-spacing, padding-top, padding-right, padding-bottom, padding-left). Consistent usage suggests semantic intent that could be encoded as a component token.


**Domain Specialist Validation**:
- **Ada** (Token Specialist): Are token classifications correct? Should new semantic tokens be created?
- **Lina** (Component Specialist): Does the component architecture match Stemma patterns?
- **Thurgood** (Governance): Does this meet spec standards and test coverage requirements?

## Unidentified Values

- **Footer** → `padding-right`: 64 (value-match — suggested: `space.space800`)
- **Footer** → `padding-left`: 64 (value-match — suggested: `space.space800`)
- **Footer** → `item-spacing`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Footer** → `border-width`: 1 (value-match — suggested: `semanticBorderWidth.default`)
- **Logo Container** → `padding-top`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Logo Container** → `padding-right`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Logo Container** → `padding-bottom`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Logo Container** → `padding-left`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Logo Container** → `item-spacing`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Logo Container** → `border-width`: 1 (value-match — suggested: `semanticBorderWidth.default`)
- **Frame 331** → `padding-top`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Frame 331** → `padding-right`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Frame 331** → `padding-bottom`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Frame 331** → `padding-left`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Frame 331** → `item-spacing`: 8 (value-match — suggested: `semanticSpace.grouped.normal`)
- **Frame 331** → `border-width`: 1 (value-match — suggested: `semanticBorderWidth.default`)
- **Contact Container** → `padding-top`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Contact Container** → `padding-right`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Contact Container** → `padding-bottom`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Contact Container** → `padding-left`: 0 (value-match — suggested: `semanticSpace.grouped.none`)
- **Contact Container** → `border-width`: 1 (value-match — suggested: `semanticBorderWidth.default`)
- **Peter Michaels Allen** → `border-width`: 1 (value-match — suggested: `semanticBorderWidth.default`)
- **Peter Michaels Allen** → `font-size`: 20 (value-match — suggested: `icon.icon.size150`)
- **Peter Michaels Allen** → `font-weight`: 700 (value-match — suggested: `fontWeight.fontWeight700`)
- **Peter Michaels Allen** → `line-height`: 28 (out-of-tolerance — closest: lineHeight.lineHeight125 (±26.444px))
- **◌** → `border-width`: 1 (value-match — suggested: `semanticBorderWidth.default`)
- **◌** → `font-size`: 20 (value-match — suggested: `icon.icon.size150`)
- **◌** → `font-weight`: 700 (value-match — suggested: `fontWeight.fontWeight700`)
- **◌** → `line-height`: 28 (out-of-tolerance — closest: lineHeight.lineHeight125 (±26.444px))
- **peter[at]designerpunk.ai** → `border-width`: 1 (value-match — suggested: `semanticBorderWidth.default`)
- **peter[at]designerpunk.ai** → `font-size`: 20 (value-match — suggested: `icon.icon.size150`)
- **peter[at]designerpunk.ai** → `font-weight`: 700 (value-match — suggested: `fontWeight.fontWeight700`)
- **peter[at]designerpunk.ai** → `line-height`: 28 (out-of-tolerance — closest: lineHeight.lineHeight125 (±26.444px))

## Screenshots

![Component screenshot (png, 2x, captured 2026-05-10T03:18:57.950Z)](./images/footer.png)
*Component screenshot (png, 2x, captured 2026-05-10T03:18:57.950Z)*
