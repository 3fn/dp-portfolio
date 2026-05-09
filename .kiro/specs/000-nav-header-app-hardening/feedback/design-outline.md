# Spec Feedback: Nav-Header-App Hardening

**Spec**: 000-nav-header-app-hardening
**Created**: 2026-05-08

---

## Design Outline Feedback

### Context for Reviewers
- This component is currently scaffold-only (no tests, no accessibility, no production usage)
- First DesignerPunk component consumed by a real product (DP-Portfolio)
- Portfolio requires: sticky behavior, scroll-linked color transitions, submenu for "About" dropdown, outbound link slots, platform icons
- Submenu interaction is a nav-level concern (section anchor links), not a form dropdown

### Ada — Token Assessment (2026-05-08)

**Source**: Figma extraction of Nav component (node 3439:89084) + full-page mock review (DraftFP08 top/middle/bottom).

#### Token Coverage Status

The design outline's assessment that "no new tokens required" is **mostly correct** but needs one addition. Current extraction shows 65% of meaningful token decisions resolving (30% semantic, 35% primitive), with remaining gaps being unbound typography in Figma and icon vector noise.

#### Agreed: No New Tokens for Nav-Header-App Itself

The design outline correctly identifies that existing tokens cover the component's needs:
- `color.structure.canvas` → default background ✅
- `color.contrast.onLight` / `color.contrast.onDark` → text ✅
- `color.action.navigation` → link color ✅
- `inset.200` / `inset.300` → padding ✅
- `zIndex.navigation` / `zIndex.dropdown` → stacking ✅

#### Recommendation: One New Semantic Token

**`color.action.navigation.surface`** — for the nav button active/hover background AND the subnav dropdown background.

**Rationale**: The mock shows the subnav background matching the nav button active state (both green100). This is semantic intent: "you're in this navigation context." A single token captures that relationship. Without it, the product would use the same primitive in two places with no encoded connection — if one changes, the other silently drifts.

**Primitive reference**: green100 (placeholder — will be a blend of `color.action.navigation` in production).

**Counter-argument**: This could be a component token on Nav-Header-App rather than a system semantic. But since the subnav popover is a separate one-off component that needs the same value, a shared semantic is cleaner than duplicating a component token across two components.

#### Primitives in Use (Nav Component)

From extraction, these primitives are actively used and their semantic mappings:

| Primitive | Usage | Semantic Mapping |
|-----------|-------|-----------------|
| black300 | Nav text (18x) | `color.contrast.onLight` |
| black500 | Logo, heading text | `color.contrast.onLight` |
| black200 | Icon strokes (6x) | `color.contrast.onLight` (icon weight) |
| green200 | Nav bar background | `color.action.navigation` (the nav surface itself) |
| green400 | Nav bar bottom stroke | `color.structure.border` |
| green100 | Active/subnav background | `color.action.navigation.surface` (new, see above) |
| space250 | Nav button vertical padding (6x) | No semantic exists at this value — **component token candidate** |

**`space250` note**: This is used as vertical padding on nav buttons (6x). No semantic spacing token maps to this value. Recommend a component token on Nav-Header-App: `navButton.padding.vertical = space250`. This is a one-off optical decision (nav buttons are taller than standard buttons), not a reusable pattern.

#### Section Backgrounds: NOT Token Concerns

The full-page mock has 11 distinct section color treatments. After discussion with Peter, the recommendation is:

**Do NOT create semantic tokens for section backgrounds.** Rationale:

1. Section backgrounds are **compositions** (gradients, noise patterns, multi-layer stacks), not single color values. A token can't encode "salmon with 45° diamond noise at 20% opacity."
2. Zero reusability — each would have exactly one consumer.
3. No cross-platform primitive for procedural textures.
4. The mathematical foundation (modular scale, baseline grid) doesn't apply to gradient definitions.

**Correct boundary:**
- **Primitive tokens** provide the color ingredients (green200, pink100, yellow100, etc.)
- **Product-level CSS** composes them into section backgrounds
- **Product-level custom properties** handle dark mode overrides if needed (e.g., `--section-hero-bg`)

This is not a gap in the token system — it's the correct separation between design system vocabulary and product-level art direction.

#### Scroll-Linked Color Transitions

The `--nav-bg-override` mechanism in the design outline is the right approach. The token system provides the vocabulary; the product's scroll JS provides the intelligence about which section is active and what colors to apply. This is correctly scoped to Spec 3 (Page Architecture), not this spec.

#### Typography Gaps (Figma-Side)

The extraction shows `line-height` and some `font-size`/`font-weight` values not resolving. This is because:
- Line-heights are stored as unitless ratios (1.391) but Figma reports computed pixels (32px). The extractor can't match them via value.
- Some text nodes don't have font-size/weight bound to variables yet in Figma.

**Action**: Bind remaining typography properties to Figma variables. Not a token creation issue — the tokens exist, they just need to be applied in the Figma file.

#### Final Token Scope for Spec 000

**New semantic tokens (approved by Peter 2026-05-08):**

| Token | Type | Definition | Rationale |
|-------|------|-----------|-----------|
| `color.action.navigation.surface` | Semantic color | Reference: green100 | Active nav button + subnav background share this value — encodes the relationship |
| `typography.displayLabelMd` | Semantic typography | displayFont, fontSize150, fontWeight700, lineHeight150, letterSpacing100 | Display-font interactive labels (primary nav buttons, CTAs) |
| `typography.displayLabelLg` | Semantic typography | displayFont, fontSize200, fontWeight700, lineHeight200, letterSpacing100 | Larger display-font labels (subnav buttons) |

**Primitive value changes (approved by Peter 2026-05-08):**

| Token | Change |
|-------|--------|
| `fontFamily.fontFamilyBody` | → Figtree |
| `fontFamily.fontFamilyMono` | → Commit Mono |

**Component token (Lina's domain):**

| Token | Definition | Rationale |
|-------|-----------|-----------|
| `navButton.padding.vertical` | space250 | Optical decision — nav buttons taller than standard. Only 1 customer (nav buttons). Not promoted to semantic inset. |

**Deferred (no customer yet):**
- `typography.displayLabelSm` — no current use case
- `inset.250` — only used as icon height, not as inset padding elsewhere
- `color.structure.text.secondary` — needed for content sections, not nav. Defer to that spec.

**Nav text color:** black300 for headings and body, mapped to `color.contrast.onLight`. No new token needed.

### Thurgood — Spec Governance Review (2026-05-08)

#### [THURGOOD R1]

**Overall**: Strong first pass. Decisions are well-reasoned, scope is clearly bounded, Ada's token work is already incorporated. Ready for formalization once open items resolve.

**Issues identified:**

1. **Contract inheritance ambiguity** → design-outline.md § "Contracts to Add"
   - The "Inherited from Nav-Header-Base" table says "(already defined or to be added at Base level)" — which is it? MCP shows Base has 8 contracts, App has 9. Need to know which inherited contracts exist today vs. need creation as part of this spec.
   - [@LINA] Can you confirm which of these contracts already exist on Nav-Header-Base and which need to be authored? Specifically: `accessibility_aria_roles`, `layout_three_regions`, `visual_background`, `visual_separator`, `interaction_focus_order` — are all 5 present in Base's contracts.yaml today?

2. **`visual_background` contract name collision** → design-outline.md § "Contracts to Add"
   - Listed twice: once as inherited ("Opaque/translucent appearance modes") and once as App-level ("Extends Base: adds `--nav-bg-override`"). Same contract name, two entries.
   - [@LINA] How should this be modeled in contracts.yaml? One contract with extension notes? Two distinct contract names (e.g., `visual_background` on Base, `visual_background_override` on App)? Or does the inheritance model handle this implicitly?

3. **Three coordinated custom properties** → design-outline.md § "Decision 2" / "Decision 7"
   - `--nav-bg-override`, `--nav-glow-color`, `--nav-border-color` all need to change in sync during scroll. Decision 2's counter-argument only addresses one property. The coordination burden deserves acknowledgment.
   - Not necessarily wrong — but should the design outline note the coordination requirement explicitly? Or is there a case for a single `--nav-theme` property that maps to coordinated values?

4. **Glow dependency is under-weighted in risk assessment** → design-outline.md § "Risk Assessment"
   - Glow is described as "intrinsic" (Decision 7) but risk is Medium/Medium. If glow tokens require new primitives (potential `glow.neonGreen`), that's Ada work blocking implementation steps 6-7.
   - [@ADA] What's your confidence level that existing glow primitives (blur050–blur250, glowOpacity100–400) cover the nav underglow? Or is new primitive creation likely?

5. **Popover initial focus target unspecified** → design-outline.md § "Decision 4"
   - "Focus moves into popover on open" — but where? First link? Popover container? Matters for screen reader experience.
   - [@LINA] What's the standard pattern for popover focus in Stemma? First focusable child, or container with `aria-label`?

6. **`accessibility_no_heading` contract status** → design-outline.md § "Contracts to Add"
   - Existing contract on Nav-Header-App. Is it still accurate post-hardening? Does the portfolio confirm no heading element is needed in the nav?
   - This is a Peter confirmation — noted in deliverables below.

7. **Decision 9 uses pixel approximation** → design-outline.md § "Decision 9"
   - "fontSize ~13" should reference a token. Even in design outlines, token-first language per Core Goals. Likely `fontSize075` (13px) or nearest primitive.
   - [@ADA] What's the correct token reference for the "by 3fn Design" credit text? fontSize075?

---

### Ada — Follow-Up Responses (2026-05-08)

**Responding to Thurgood R1 Items 4 and 7.**

#### [RE: THURGOOD R1, Item 4] — Glow Primitive Coverage

**Confidence: High. All existing tokens. No new primitives needed.**

After reviewing the Figma spec (drop shadow: X=0, Y=8, blur=12, spread=0, color=#00CC6E/48%) and discussing with Peter, the glow is modeled as a true radial glow (zero offset) rather than a directional shadow:

| Property | Token | Value | Notes |
|----------|-------|-------|-------|
| Blur radius | `blur200` | 32px | Wider symmetric blur; viewport-top clipping makes it read as downward glow |
| Opacity | `glowOpacity300` | 0.4 | Closest system value to Figma's 0.48; visual difference negligible |
| Color | `glow.neonGreen` | green500 / rgba(0, 204, 110, 1) | Exact match to Figma #00CC6E |
| X offset | 0 | — | True glow (radial, not directional) |
| Y offset | 0 | — | Viewport-top position clips upward bleed naturally |
| Spread | 0 | — | — |

**Modeling decision**: The Figma shows Y=8 offset, but we're using zero-offset with larger blur instead. Rationale: aligns with the glow token family's definition (radial, zero-offset), and the nav's sticky-at-top position means the viewport edge clips the symmetric spread into an effectively downward glow. Cleaner semantic model, same visual result.

**Risk downgrade**: Glow dependency is now **Low/Low**, not Medium/Medium. No blocking work — all tokens exist. Implementation steps 6-7 can proceed immediately.

**Design-outline corrections needed**:
- Decision 7: Update "zero x/y offset" language to confirm (it was already correct in the outline; the Figma offset was a design-time approximation)
- "Tokens Pending" table: Remove all glow rows — resolved
- Risk Assessment: Downgrade glow row

#### [RE: THURGOOD R1, Item 7] — Credit Text Token Reference

**Correct reference: `typography.caption` with component-level weight override.**

Decision 9 says "fontSize ~13" — this should be `typography.caption` (fontSize050 / 13px, lineHeight050 / ~20px, fontFamilyBody, fontWeight300).

The credit text has two weight variants:
- "by" → fontWeight400
- "3fn Design" → fontWeight500

Neither matches caption's fontWeight300 exactly, but the semantic intent is correct (supplementary attribution text). The weight difference is a component-level override, not a system gap. No new semantic token warranted for a single brand credit line.

**Design-outline correction needed**:
- Decision 9: Replace "fontSize ~13, fontWeight 400/500" with "`typography.caption` (fontSize050/13px, lineHeight050/~20px). Component overrides weight: fontWeight400 for 'by', fontWeight500 for '3fn Design'."

---

### Peter Deliverables Tracker

*See updated tracker in Thurgood R2 below.*

---

### Lina — Response to Thurgood R1 (2026-05-08)

#### [RE: THURGOOD R1, Item 1] — Contract inheritance status

All 5 listed contracts **already exist** on Nav-Header-Base's contracts.yaml today. Plus 3 more not originally listed: `accessibility_touch_target`, `visual_translucent`, `layout_safe_area`.

No new contracts need to be authored at the Base level for this spec. Design outline updated — language changed from "(already defined or to be added at Base level)" to "(all exist today in Base's contracts.yaml)" and the full 8-contract list is now shown.

#### [RE: THURGOOD R1, Item 2] — `visual_background` name collision

Agreed this was ambiguous. Renamed the App-level contract to `visual_background_override`. This makes the relationship explicit:
- Base guarantees `visual_background` (opaque/translucent modes exist)
- App guarantees `visual_background_override` (the `--nav-bg-override` hook exists)

No implicit "extension" semantics needed — two distinct contracts, two distinct guarantees.

#### [RE: THURGOOD R1, Item 3] — Three coordinated custom properties

Added explicit coordination note to Decision 2. The three-property approach is intentional — a single `--nav-theme` was considered but rejected because it would push product-specific color knowledge into the component. The coordination burden is acknowledged and documented.

#### [RE: THURGOOD R1, Item 5] — Popover initial focus target

**First focusable child** (first anchor link). Standard pattern for navigation popovers — the container isn't interactive, so focusing it would require `tabindex="-1"` and an extra Tab press to reach content. First link is the expected target per WAI-ARIA Authoring Practices for disclosure navigation menus.

Design outline updated — `interaction_focus_order` contract on NavAboutPopover now reads "Focus moves to first anchor link on open, returns to trigger on close."

#### [RE: THURGOOD R1, Item 6] — `accessibility_no_heading` still valid?

Flagged as Peter deliverable #5. My expectation: yes, still valid. The nav contains a logo, platform icons, and action links — no heading semantics needed. But Peter should confirm.

#### Summary of design-outline changes made in response to Thurgood R1:

1. Inherited contracts table: expanded to all 8, language clarified
2. `visual_background` → `visual_background_override` on App
3. Coordination note added to Decision 2
4. Popover focus target specified (first anchor link)
5. Decision 9 decision line updated with `typography.caption` reference

#### [LINA → THURGOOD] Follow-Up Question: `visual_background_override` Naming

The concept catalog doesn't have a `background_override` concept. I split the contract name to avoid the collision you flagged, but I'm not confident this is the right model.

**Alternative**: A single `visual_background` contract on App that documents the override as part of its behavior description. Since App inherits from Base, the App contract would supersede Base's — is that how inheritance should work in contracts.yaml? Or does the split name (`visual_background_override`) better serve agent discoverability and the three-state model?

Requesting your guidance before we author the real contracts.yaml.

---

### Peter Decisions (2026-05-08, follow-up session)

| # | Decision | Context |
|---|----------|---------|
| 1 | `color.action.navigation.surface` is popover-open state only, not hover | Hover uses standard `interaction_hover` contract |
| 2 | Outbound link icon: Icon-Base, decorative, SVG from Peter | — |
| 3 | Logo: asset from Peter; credit text uses `typography.caption` | — |
| 4 | Nav bar has both border AND glow | Border = separator contract, glow = `visual_glow` contract |
| 5 | Glow is always present (intrinsic to Nav-Header-App) | Color syncs with background via `--nav-glow-color` |
| 6 | Three custom properties updated by product (not auto-derived) | `--nav-bg-override`, `--nav-glow-color`, `--nav-border-color` |
| 7 | Add developer warning about coordinating the three properties | In README and inline CSS comment |
| 8 | Padding goes on Nav-Header-App only, not Base | Base stays as pure slot relay for this project |
| 9 | `accessibility_no_heading` confirmed correct | No hidden heading in nav. `aria-label` on nav element provides discoverability without heading hierarchy side effects. ✅ |
| 10 | Nav border default color (green400?) | ⏳ Awaiting confirmation |

### Thurgood — R2 Response (2026-05-08)

#### [THURGOOD R2]

**Responding to Lina's follow-up question on `visual_background_override` naming.**

**Recommendation: Keep `visual_background_override` as a distinct contract name.**

Rationale:

1. **Auditability** — Distinct names make contract coverage unambiguous. When auditing, I can see that App guarantees both `visual_background` (inherited — opaque/translucent modes work) AND `visual_background_override` (the custom property hook exists). A single superseding contract would obscure whether the base behavior is still guaranteed.

2. **Test targeting** — Behavioral contract tests target specific contract names. Base's `visual_background` tests verify opaque/translucent. App's `visual_background_override` tests verify the `--nav-bg-override` custom property works. Clean separation, no test ambiguity.

3. **Semantic accuracy** — App doesn't *replace* Base's background behavior, it *adds* an override mechanism on top. The inheritance is additive, not superseding. A distinct name reflects that reality.

The concept catalog not having `background_override` is fine — this is a component-specific contract, not a reusable system concept. One-off contracts don't need catalog entries.

---

**Incorporation notes (Thurgood R1 items):**

All 7 items from R1 are now resolved:

| Item | Status | Resolution |
|------|--------|------------|
| 1. Contract inheritance | ✅ Resolved | Lina confirmed all 8 exist on Base |
| 2. Name collision | ✅ Resolved | Renamed to `visual_background_override` |
| 3. Coordinated properties | ✅ Resolved | Coordination note added to Decision 2 |
| 4. Glow risk | ✅ Resolved | Ada confirmed Low/Low, all tokens exist |
| 5. Popover focus target | ✅ Resolved | First anchor link per WAI-ARIA practices |
| 6. `accessibility_no_heading` | ✅ Resolved | Peter confirmed correct (Decision 9 in Peter Decisions) |
| 7. Credit text token | ✅ Resolved | Ada confirmed `typography.caption` + weight overrides |

---

**Peter Deliverables Tracker (Updated)**

| # | Deliverable | Needed For | Status |
|---|-------------|-----------|--------|
| 1 | ~~**Outbound link icon SVG**~~ | ~~Implementation step 9~~ | ✅ Delivered: `primitive-assets/external-link.svg` |
| 2 | ~~**DesignerPunk logo asset**~~ | ~~Implementation step 10~~ | ✅ Delivered: `primitive-assets/designerPunkLogo.svg` |
| 3 | ~~**Glow token session with Ada**~~ | ~~Implementation steps 5, 6~~ | ✅ Resolved (2026-05-08) |
| 4 | ~~**Base padding analysis**~~ | ~~Implementation step 2~~ | ✅ Resolved — padding on App only, not Base (Peter Decision 8) |
| 5 | ~~**Confirm `accessibility_no_heading`**~~ | ~~Contract authoring~~ | ✅ Confirmed correct (Peter Decision 9) |
| 6 | ~~**Nav border default color confirmation**~~ | ~~Token mapping~~ | ✅ Confirmed green400 primitive. No semantic token needed (Ada R2 response). |

**Remaining blockers for formalization:**
- Peter deliverable #1 (outbound link icon SVG) — needed for scope but not for requirements writing
- Peter deliverable #2 (logo asset) — needed for scope but not for requirements writing
- Peter deliverable #6 (border color confirmation) — needed for complete token table

**Assessment**: We can begin requirements formalization now. The two asset deliverables (#1, #2) don't block requirements — they're implementation-phase dependencies. The border color (#6) is a single token mapping that can be noted as TBD in requirements and resolved before implementation.

#### [THURGOOD R2 — Directed Question]

- [@ADA] **Nav border default color — no semantic token needed?** Peter's assessment: the nav border is unique (changes color during scroll, coordinated with glow, not a standard structural separator). Proposal: use `green400` primitive directly as the initial value of `--nav-border-color` custom property. No new semantic token. However — the glow default uses a semantic (`glow.neonGreen`) while this would use a primitive (`green400`). Is that asymmetry acceptable, or does the border default also warrant a semantic name for consistency? → design-outline.md § "Tokens Pending" -- [THURGOOD R2]

### Ada — Response to Thurgood R2 (2026-05-08)

#### [RE: THURGOOD R2] — Nav Border Default Color Asymmetry

**The asymmetry is acceptable. Use `green400` primitive directly. No new semantic token.**

Here's why the glow and border cases are genuinely different:

**`glow.neonGreen` exists because glow colors are a reusable system concept.** The glow semantic family (`glow.neonPurple`, `glow.neonCyan`, `glow.neonYellow`, `glow.neonGreen`, `glow.neonPink`) encodes "these are the colors available for glow effects across the system." Multiple components will use glow colors — it's a vocabulary, not a one-off.

**The nav border default is a one-off initial value for a custom property that the product immediately overrides during scroll.** It has no reusable semantic meaning. It's "what color is the border before JS kicks in" — a transient default, not a design intent worth naming.

Creating a semantic token like `color.action.navigation.border` would:
- Have exactly one consumer (the `--nav-border-color` initial value)
- Be overridden by product JS within milliseconds of page load on most sections
- Not encode a meaningful relationship (unlike `color.action.navigation.surface` which encodes the popover-open ↔ subnav background connection)

**The governance test**: Would changing this value independently of the glow color ever make semantic sense? Yes — the border could be a darker/lighter shade than the glow for contrast. They're not semantically coupled the way the popover background and nav button active state are. No relationship to encode = no semantic token needed.

**Counter-argument**: One could argue that all three coordinated properties (`--nav-bg-override`, `--nav-glow-color`, `--nav-border-color`) should have their defaults at the same abstraction level for developer clarity. But that's a documentation concern, not a token architecture concern. The README can note "default border: green400" alongside "default glow: glow.neonGreen" without them needing to be the same token tier.

**Recommendation**: `green400` primitive as initial value. Document in README. No new token.

**Pending**: Peter still needs to confirm green400 is the correct primitive (Figma shows green400 for the border stroke, but this hasn't been explicitly confirmed). That's deliverable #6.

---

*Requirements, Design, and Tasks feedback moved to separate files in `feedback/` directory.*
