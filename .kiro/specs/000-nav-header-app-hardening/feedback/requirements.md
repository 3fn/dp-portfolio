# Spec Feedback: Nav-Header-App Hardening — Requirements

**Spec**: 000-nav-header-app-hardening
**Phase**: Requirements
**Created**: 2026-05-08
**Reviewers**: Ada, Lina

---

## Requirements Feedback

### Context for Reviewers

- Design outline approved by Peter (2026-05-08) — all open questions resolved
- Ada's token assessment already incorporated (color.action.navigation.surface, typography.displayLabelMd/Lg, navButton.padding.vertical)
- Glow tokens resolved — all existing primitives (blur200, glowOpacity300, glow.neonGreen)
- Border default color: green400 primitive, no semantic token (Ada confirmed asymmetry acceptable)
- Padding on App only, not Base (Peter Decision 8)
- Font family swap pulled into this spec as step 0 (Figtree body, Commit Mono mono, Rajdhani display unchanged)
- NavAboutPopover is a one-off, not a Stemma family component
- `visual_background_override` is the distinct contract name (not overloading `visual_background`)
- Popover focus target: first anchor link (Lina confirmed per WAI-ARIA practices)

**Key decisions already settled (do not re-litigate)**:
- Three coordinated custom properties (not a single `--nav-theme`) → design-outline.md § "Decision 2"
- Glow is intrinsic, not optional → design-outline.md § "Decision 7"
- No semantic token for border default color → feedback.md § "Ada R2 Response"

**Focus your review on**:
- Are acceptance criteria accurate and implementable?
- Are any criteria missing for your domain?
- Are any criteria over-specified (constraining implementation unnecessarily)?

---

[Agent feedback rounds here]

### Lina — Component & Implementation Review (2026-05-08)

#### Overall Assessment

Requirements are solid. Acceptance criteria are specific and implementable. Token references are accurate (confirmed against Ada's verification table). A few gaps and one structural concern:

---

#### Issues

**[LINA-R1] Requirement 6 — Padding token unspecified (agrees with ADA-R3)**

Ada's right — Req 6 says "SHALL apply `padding-inline`" but doesn't say *what value*. The Figma shows `space500` (40px). This needs a component token (`navHeader.padding.inline = space500`) and an acceptance criterion specifying it.

Proposed AC addition:
> "The `padding-inline` value SHALL use component token `navHeader.padding.inline` (resolves to `space500` / 40px)."

And Req 2 needs an AC5:
> "The system SHALL provide a component token `navHeader.padding.inline` that resolves to space500."

**[LINA-R2] ADA-R2 — Separator visibility: I can answer this**

The Figma extraction shows `stroke: green400` on the NavBar — the separator IS present in the design. The `show-separator="false"` in the design outline's example markup was incorrect. The portfolio uses the separator (with the green400 border that changes color during scroll).

**Recommendation**: Update the component architecture example in the design outline to `show-separator="true"` (or just remove the attribute since `true` is the default per the Base contract). No requirements change needed — Req 5 correctly assumes the separator exists.

**[LINA-R3] Requirement 5, AC3 — Border default color vs Base contract**

Nav-Header-Base's `visual_separator` contract specifies `color.structure.border.subtle` as the separator color. But Req 5 AC3 says the default is `green400`. This means Nav-Header-App is *overriding* the Base default.

This is fine architecturally (App can override Base defaults), but it should be explicit:
> "Nav-Header-App SHALL override the inherited separator color from `color.structure.border.subtle` to `green400` as its default."

Otherwise a developer reading Base's contract and App's requirement will see a contradiction.

**[LINA-R4] Requirement 4, AC1 — Box-shadow implementation detail**

The AC specifies "box-shadow with zero x/y offset" — this is correct for web, but on iOS/Android the glow would be implemented differently (layer shadow on iOS, elevation/shadow on Android). The requirement should be platform-agnostic:

Suggest rewording:
> "Nav-Header-App SHALL render an underglow effect with zero x/y offset, `blur200` (32px) blur radius, and `glowOpacity300` (0.4) opacity."

The "box-shadow" implementation detail belongs in the platform implementation, not the requirement.

**[LINA-R5] Requirement 10, AC2 — Hover contract ~~underspecified~~ RESOLVED**

Peter confirmed: nav buttons use the standard `blend.hoverDarker` (8% darker) hover treatment. This works correctly regardless of current nav background color (blend is relative). No concern — the AC should reference `blend.hoverDarker` explicitly:

> "The trigger button hover state SHALL use `blend.hoverDarker` (8% darker) as the hover feedback."

Note: hover does not apply when popover is open (button is in active/open state with `color.action.navigation.surface` background).

**[LINA-R6] Requirement 12, AC3 — Asset path assumed**

Same as Ada's R5 — `primitive-assets/external-link.svg` is assumed. Peter hasn't provided this yet. Fine as a placeholder, just flagging.

**[LINA-R7] Requirement 15 — Missing test for border override**

The test list covers `visual_background_override` and `visual_glow` but not the border color override (`--nav-border-color`). Should add:
> "The system SHALL have tests verifying that `--nav-border-color` overrides the separator border color."

---

#### Confirmations (Implementation Feasibility)

All other requirements are implementable as written. Specific confirmations:

| Requirement | Feasibility | Notes |
|-------------|-------------|-------|
| Req 1 (Font families) | ✅ Straightforward | Primitive token value swap + @font-face declarations |
| Req 3 (Background override) | ✅ Clean | CSS custom property with fallback — standard pattern |
| Req 4 (Underglow) | ✅ Clean | box-shadow on web, layer shadow on iOS, elevation on Android |
| Req 6 (Padding) | ✅ Once token specified | Needs value (space500) per LINA-R1 |
| Req 7 (Toggle) | ✅ Standard | Click-toggle popover, well-understood pattern |
| Req 8 (A11y) | ✅ Standard | aria-expanded, aria-controls, focus management |
| Req 9 (Animation) | ✅ Standard | CSS transitions + prefers-reduced-motion media query |
| Req 11 (Prefix) | ✅ Clean | aria-hidden span + fixed-width container |
| Req 13 (Logo) | ✅ Once asset provided | SVG embed + text with token typography |
| Req 14 (Nav a11y) | ✅ Inherited | Most comes from Base contracts already |
| Req 16 (Docs) | ✅ Standard | README + component-meta.yaml updates |

---

#### Questions for Peter — RESOLVED

1. ~~**[RE: LINA-R5]** What does hover look like on nav buttons?~~ → `blend.hoverDarker` (8% darker). Confirmed.
2. ~~**[RE: LINA-R2]** Can you confirm the separator is visible in the portfolio nav?~~ → Yes, confirmed. Design outline example markup needs correction (`show-separator="false"` → remove attribute or set `true`).

### Ada — Token & Architecture Review (2026-05-08)

#### Overall Assessment

Requirements are well-structured and accurately reflect the design-outline decisions. Token references are correct throughout. A few gaps and one concern:

---

#### Issues

**[ADA-R1] Requirement 5, AC3 — Border default value needs token-first language**

> "WHEN `--nav-border-color` is not set THEN the separator border SHALL use green400 as the default color."

This is correct (we agreed: primitive, no semantic token), but the acceptance criterion should reference the token name consistently with how other requirements reference tokens. Suggest:

> "WHEN `--nav-border-color` is not set THEN the separator border SHALL use `green400` as the default color."

Minor formatting nit — just adding backticks for consistency with how Req 4 AC2 references `glow.neonGreen`. Not a real issue.

**[ADA-R2] Requirement 5 — Separator visibility interaction unspecified**

The design outline's component architecture shows `show-separator="false"` in the example markup, yet Requirement 5 assumes the separator exists and has a color. There's no requirement specifying:
- What `show-separator` does (show/hide the border)
- Whether `--nav-border-color` is ignored when `show-separator="false"`
- Whether the portfolio actually uses the separator (the example says `false`)

This might be Lina's domain (it's a Base-level prop), but the requirements should be internally consistent. If the portfolio sets `show-separator="false"`, then Requirement 5's border color override is dead code for this product.

**Question for Peter/Lina**: Does the portfolio use the separator? The Figma extraction shows `stroke: color.green400` on the NavBar frame, which suggests yes. But the design outline example says `show-separator="false"`. Which is it?

**[ADA-R3] Requirement 6 — Padding value unspecified**

Requirement 6 says Nav-Header-App SHALL apply `padding-inline` but doesn't specify *which token*. The Figma extraction shows `padding-left: space500` (40px) on the NavBar frame. The acceptance criteria should include:

> "The `padding-inline` value SHALL use component token `navHeader.padding.inline` (resolves to `space500` / 40px)."

No new semantic inset token warranted — the current inset scale tops out at `inset.400` (32px) and 40px has only one consumer. This is a component token, same pattern as `navButton.padding.vertical = space250`.

**Requirement 2 update needed**: Add AC5:

> "The system SHALL provide a component token `navHeader.padding.inline` that resolves to space500."

**[ADA-R4] Requirement 2, AC1 — `color.action.navigation.surface` dark mode behavior**

The requirement says it "resolves to green100" but doesn't specify mode behavior. Per the design-outline discussion, this token is used for the popover background and active nav button state. Questions:

- Is this token mode-invariant? (Same value in light and dark mode)
- Does it need a dark-mode override? (Level 2 — different primitive in dark)
- Or does green100's own light/dark values handle it? (Level 1)

This doesn't need to be in the acceptance criteria necessarily, but I need to know the answer before I create the token. If it's mode-invariant (portfolio is light-mode only for now), I'll note that in the token definition and defer dark-mode work.

**Recommendation**: Add a note that `color.action.navigation.surface` is initially light-mode only; dark-mode behavior deferred to a future spec.

**[ADA-R5] Requirement 13, AC1 — Logo asset path**

References `primitive-assets/designerPunkLogo.svg`. This is a Peter deliverable that doesn't exist yet (Deliverable #2). The requirement is fine — just flagging that this path is assumed, not confirmed. If Peter provides the asset under a different name/path, the requirement needs updating.

---

#### Confirmations (Token Accuracy)

These are all correct as written — no changes needed:

| Requirement | Token Reference | ✅ Verified |
|-------------|----------------|------------|
| Req 2, AC1 | `color.action.navigation.surface` → green100 | Correct |
| Req 2, AC2 | `typography.displayLabelMd` composition | Correct |
| Req 2, AC3 | `typography.displayLabelLg` composition | Correct |
| Req 2, AC4 | `navButton.padding.vertical` → space250 | Correct |
| Req 3, AC2-3 | Default: `color.structure.canvas` | Correct |
| Req 4, AC1 | `blur200` (32px), `glowOpacity300` (0.4) | Correct |
| Req 4, AC2 | `glow.neonGreen` (green500) | Correct |
| Req 10, AC1 | `color.action.navigation.surface` for open state | Correct |
| Req 10, AC3 | `typography.displayLabelMd` for trigger | Correct |
| Req 10, AC4 | `color.action.navigation.surface` for panel bg | Correct |
| Req 10, AC5 | `inset.200` (16px) panel padding | Correct |
| Req 10, AC6 | `space300` (24px) / `inset.100` (8px) item padding | Correct |
| Req 10, AC7 | `typography.displayLabelLg` for items | Correct |
| Req 10, AC8 | `zIndex.dropdown` (300) | Correct |
| Req 11, AC2 | `grouped.tight` (4px) prefix-label gap | Correct |
| Req 13, AC2-4 | `typography.caption` + weight overrides | Correct |
| Req 14, AC5 | `tapAreaRecommended` (44px) | Correct |

---

#### No Issues (Clean)

Requirements 1, 7, 8, 9, 11, 12, 14, 15, 16 — no token concerns. Well-specified.
