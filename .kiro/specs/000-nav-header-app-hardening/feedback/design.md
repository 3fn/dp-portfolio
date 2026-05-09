# Spec Feedback: Nav-Header-App Hardening — Design

**Spec**: 000-nav-header-app-hardening
**Phase**: Design
**Created**: 2026-05-08
**Reviewers**: Ada, Lina

---

## Design Feedback

### Context for Reviewers

- Requirements approved by Peter (2026-05-08) — 16 requirements, all acceptance criteria finalized
- Requirements feedback from Ada and Lina incorporated (padding token, platform-agnostic glow language, border override explicitness, hover token, border test, dark-mode deferral note)
- Req 16 expanded to include contracts.yaml, schema.yaml, and MCP health check
- Design doc formalizes: architecture, TypeScript interfaces, behavioral contracts, visual specs, font updates, error handling, testing strategy, 5 design decisions with trade-offs, platform considerations

**Key decisions already settled (do not re-litigate)**:
- Three coordinated custom properties (not `--nav-theme`) → design-outline.md § "Decision 2"
- `visual_background_override` as distinct contract name → feedback/design-outline.md § "Thurgood R2"
- Underglow is intrinsic, not optional → design-outline.md § "Decision 7"
- NavAboutPopover is one-off, not Stemma → design-outline.md § "Decision 3"
- First anchor link as focus target → feedback/design-outline.md § "Lina RE: Item 5"
- Border default is `green400` primitive, no semantic → feedback/design-outline.md § "Ada RE: Thurgood R2"

**Focus your review on**:
- Are the TypeScript interfaces accurate and complete for your domain?
- Is the testing strategy sufficient? Missing test cases?
- Are the visual specifications (token references, values) correct?
- Are platform considerations (iOS/Android notes) reasonable?
- Any implementation concerns with the architecture as described?

---

[Agent feedback rounds here]

### Lina — Component Architecture & Implementation Review (2026-05-08)

#### Overall Assessment

Clean, well-structured design. The architecture is correct, interfaces are complete, contracts map accurately from requirements, and the testing strategy covers all behavioral guarantees. Ada caught the opacity issue (ADA-D1) which is the most important fix. I have two implementation concerns and a few minor items:

---

#### Issues

**[LINA-D1] Agrees with ADA-D1 — Opacity must be pre-baked into glow color**

Ada's right. The Error Handling CSS:
```css
box-shadow: 0 0 var(--blur200) var(--nav-glow-color, var(--glow-neonGreen));
```

...would produce a fully opaque glow. The fix (Option 3 — pre-baked rgba) is the correct approach. This has a downstream implication I want to flag:

The README documentation (Req 16) needs to explicitly state that `--nav-glow-color` expects an rgba value with opacity included. If a developer sets `--nav-glow-color: green` they'll get a fully opaque glow. The warning should include an example:

```css
/* ✅ Correct — opacity included */
--nav-glow-color: rgba(255, 42, 109, 0.4);

/* ❌ Wrong — fully opaque, too intense */
--nav-glow-color: rgb(255, 42, 109);
```

**[LINA-D2] Popover close on Tab-past-last-item — needs implementation detail**

The Error Handling table says:
> "Focus leaves popover via Tab past last item → Popover closes, focus continues to next element in DOM"

This requires a `focusout` event listener on the popover panel that checks whether the new `relatedTarget` is still inside the panel. If not, close. This is a common pattern but it's tricky:

- `focusout` fires before `focusin` on the new target — there's a timing issue
- The standard fix is `requestAnimationFrame` or `setTimeout(0)` to check after the new focus settles

This isn't a design *problem* — just flagging that the implementation needs the async check. The test for this ("Focus leaves popover via Tab past last item") should verify the timing works correctly.

**[LINA-D3] Animation duration — agrees with ADA-D2, but different recommendation**

Ada recommends `duration150` (150ms). I'd lean toward `duration250` (250ms) instead.

Rationale: The popover has a `translateY` component (spatial movement), not just opacity. Spatial animations that are too fast feel jarring — the eye needs time to track the movement. 150ms works for pure opacity fades or color transitions, but a panel sliding 8px while fading needs slightly more time to feel smooth.

Counter-argument: Ada's point about "snappy" is valid. 150ms is perceptible but quick. And the design says "~200ms" which is between the two options.

**This is a Peter call** — do you want snappy (150ms) or smooth (250ms)? Both are defensible.

**Peter decision**: `duration150` (150ms) — bias toward snappy. Can revisit if it feels wrong in practice.

**[LINA-D4] Minor — `NavAboutPopoverItem.href` should document fragment format**

The interface shows `href: string` with comment `"Target section anchor (e.g., '#why-build-this')"`. The items in the design outline use question-format labels ("Why build this system?") — the href anchors should be documented as kebab-case slugs derived from section headings. Not blocking, but helps implementation consistency.

---

#### Confirmations

| Area | Status | Notes |
|------|--------|-------|
| Component hierarchy | ✅ Correct | Base → App inheritance, one-off composition |
| TypeScript interfaces | ✅ Complete | Props, slots, custom properties, popover state all covered |
| Behavioral contracts (16 total) | ✅ Accurate | Maps 1:1 from requirements |
| Override mechanism | ✅ Sound | Unidirectional, Shadow DOM compatible, fallback defaults |
| Testing strategy | ✅ Comprehensive | All contracts have corresponding tests |
| Font family updates | ✅ Correct | Variable font for Figtree, static weights for Commit Mono |
| Design decisions 1–5 | ✅ Well-reasoned | Trade-offs documented, alternatives considered |
| Platform considerations | ✅ Reasonable | iOS shadow halving noted by Ada (ADA-D3), Android approach is correct |

---

#### No Issues (Clean)

- Shadow DOM boundary documentation
- Popover edge cases (rapid click, scroll, resize)
- Error handling / fallback strategy (aside from ADA-D1)
- Integration test coverage
- NavAboutPopover interfaces and state model

### Ada — Token & Implementation Review (2026-05-08)

#### Overall Assessment

Solid design doc. Architecture is clean, interfaces are well-typed, visual specs correctly reference tokens, and the testing strategy covers the right contracts. Three token-related issues and one implementation concern:

---

#### Issues

**[ADA-D1] Underglow CSS — opacity not applied in the `box-shadow` shorthand**

The Error Handling section shows:
```css
box-shadow: 0 0 var(--blur200) var(--nav-glow-color, var(--glow-neonGreen));
```

This is missing the opacity. `glow.neonGreen` resolves to `green500` which is `rgba(0, 204, 110, 1)` — fully opaque. The `glowOpacity300` (0.4) needs to be baked into the color value, not applied separately.

The Visual Specifications section correctly shows the platform example:
```
Web: box-shadow: 0 0 32px rgba(0, 204, 110, 0.4)
```

But the Error Handling CSS doesn't match — it would produce a fully opaque green glow (opacity 1.0), not the intended 0.4.

**Options**:
1. The component bakes opacity into the color at render time: `rgba(0, 204, 110, 0.4)` as the default
2. The component uses a separate opacity layer (not possible with `box-shadow` alone)
3. The `--nav-glow-color` custom property expects an rgba value *with* opacity pre-baked

**Recommendation**: Option 3. The default should be the pre-baked value, and the product's scroll handler should also provide pre-baked rgba values when overriding. The CSS becomes:

```css
box-shadow: 0 0 var(--blur200) var(--nav-glow-color, rgba(0, 204, 110, 0.4));
```

This means `--nav-glow-color` is "color with opacity included" — document that in the README. The `glowOpacity300` token informs the *default* value but isn't consumed at runtime as a separate property.

**Impact**: This affects how the product's scroll handler constructs the override value. It needs to provide `rgba(r, g, b, 0.4)` not just a color name.

**[ADA-D2] Animation duration uses approximate value instead of token**

The Animation section says:
```
Duration        ~200ms                   Standard micro-interaction
```

We don't have a 200ms token. The options are:
- `duration150` (150ms) — "fast interactions: hover, focus states, micro-interactions"
- `duration250` (250ms) — "standard transitions: float labels, state changes, most animations"

A popover open/close is a state change, not a hover. `duration150` is too fast for a panel appearing; `duration250` is the standard for this class of interaction.

**Recommendation**: Use `duration150` for the popover animation. Rationale: the popover is a small, lightweight disclosure — not a full panel transition. 150ms keeps it snappy. The "~200ms" approximation suggests the intent is "fast but perceptible," which is `duration150`'s purpose.

**Peter decision**: `duration150` confirmed.

**[ADA-D3] iOS shadow radius is halved — needs documentation**

The Visual Specifications show:
```
iOS: layer.shadowRadius = 16 (points), layer.shadowOpacity = 0.4
```

This is correct — iOS `shadowRadius` is half the CSS blur radius (CSS blur 32px → iOS radius 16pt). But this conversion isn't documented anywhere in the design. If Lina or Kenya implements this, they need to know the 2:1 relationship.

**Recommendation**: Add a note in the Platform Considerations section:
> iOS `layer.shadowRadius` is half the CSS `blur-radius` value (CSS 32px → iOS 16pt). This is a platform difference in how blur is measured, not a design deviation.

Minor — but prevents a future "why is iOS different?" question.

---

#### Confirmations (Token Accuracy)

All visual spec token references verified correct:

| Spec Item | Token | ✅ Verified |
|-----------|-------|------------|
| Underglow blur | `blur200` (32px) | Correct |
| Underglow opacity | `glowOpacity300` (0.4) | Correct |
| Underglow color | `glow.neonGreen` → green500 | Correct |
| Separator width | `borderWidth100` (1px) | Correct |
| Separator default | `green400` | Correct |
| Trigger hover | `blend.hoverDarker` (8%) | Correct — exists as `blend.hoverDarker` |
| Trigger/panel bg | `color.action.navigation.surface` | Correct |
| Trigger type | `typography.displayLabelMd` | Correct |
| Item type | `typography.displayLabelLg` | Correct |
| Panel padding | `inset.200` (16px) | Correct |
| Item padding | `space300` / `inset.100` | Correct |
| Item gap | `grouped.normal` (8px) | Correct |
| Prefix gap | `grouped.tight` (4px) | Correct |
| Panel z-index | `zIndex.dropdown` (300) | Correct |
| Component tokens | `navButton.padding.vertical` → space250, `navHeader.padding.inline` → space500 | Correct |

---

#### No Issues (Clean)

- Component hierarchy and inheritance model — correct
- Override mechanism architecture — correct
- Shadow DOM boundary notes — correct
- Behavioral contracts (all 16) — correctly mapped from requirements
- Error handling / fallback strategy — correct (aside from ADA-D1 opacity issue)
- Design decisions 1–5 — well-reasoned, trade-offs documented
- Font family updates and @font-face — correct
- Testing strategy — comprehensive, covers all contracts
- NavAboutPopover interfaces — complete
