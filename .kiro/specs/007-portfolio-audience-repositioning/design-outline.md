# Design Outline: Portfolio "Who Is This Built For?" Repositioning

**Date**: 2026-06-02
**Updated**: 2026-06-04
**Spec**: 007-portfolio-audience-repositioning
**Owner**: Leonardo (content direction + visual), Sparky (implementation)
**Status**: Design Outline — Direction Confirmed via Prototype
**Depends on**: Spec 005 ✅; optionally sequenced after Spec 006 (Astro migration)
**Prototype**: `docs/specs/staticReview/hero-explorationv2.html`

---

## Prototype vs Implementation

**The prototype demonstrates content direction and visual layout — it is NOT implementation-ready.**

The prototype was built outside the system (raw CSS, hard-coded values, physical properties, no tokens, no components). The implementation must:

1. **Comply with Web-Authoring-Standards** — logical properties, token-only values, focus patterns, reduced motion, forced-colors
2. **Use the System-First Value Selection workflow** — all new values checked against system primitives before creating product tokens
3. **Reconcile with existing page patterns** — spacing, type scale, grid gaps must be consistent with the rest of the portfolio (now Spec 005 compliant)
4. **Create product tokens** for any values the prototype introduces that don't exist in the system or current product tokens
5. **Remove all "enterprise" language** across the entire page, not just the replaced section

The prototype answers "what do we say and how is it arranged?" — the implementation answers "how do we build this within the system?"

---

## Context

The portfolio currently has a section titled "What makes this system enterprise-grade?" This positioning is being replaced. External feedback identified three problems:

1. **"Punk" contradicts "enterprise"** — the brand name creates friction with enterprise positioning. It's a deterrent in that context.
2. **"Enterprise" carries baggage** — bloated, slow, committee-driven. Not aspirational for DesignerPunk's audience.
3. **Enterprise operates in brownfield** — they don't want unproven greenfield systems. They have existing infrastructure.

Additional feedback on the "Why build this system?" section: "Hard to feel the story when it's just four blocks of text." Visual artifacts needed.

---

## Confirmed Direction

### Section 1: "Who is this system built for?" (replaces Enterprise)

**Layout**: 2×3 grid (same format as original enterprise section)

**Hook**: "Headcount isn't destiny."
**Sub**: "DesignerPunk gives small teams the infrastructure to compete with their largest competition. By making Human-AI collaboration the architecture itself, your team ships quality and scale from Day One."

**Grid items** (6 cards, benefit-for-small-teams framing):

1. **Accessibility from Day One** — WCAG 2.1 AA built into every component. Minimize risk and enable +20% of customers you would otherwise exclude.
2. **Three platforms, one source** — Web, iOS, and Android tokens and components generated from a single architecture as you need them. Scales to new platforms at your own demand.
3. **Consistency without the overhead** — Mathematical token foundations and behavioral contracts maintain quality across every surface, optimized for AI agent development.
4. **Governance that enforces itself** — Rules served via MCP at the point of decision. Process without overhead, documentation without hunting.
5. **AI that ships quality** — Agents guided by queryable architecture and validatable contracts — structured knowledge, not guesswork.
6. **Code-Design sync** — Tokens flow from code to canvas-based tools like Figma, and back to code. One change propagates everywhere.

**Personas** (below grid):
- Teams of 1–10 who refuse to choose between speed and quality.
- Founders who want Day One infrastructure that scales to Day 1,000.
- Builders who pair human creative direction with AI precision.
- Creators who need opinionated architecture without opinionated design direction.

**Closer**: "A small team builds great things. DesignerPunk makes sure they scale."

---

### Section 2: "Why build this system?" (visual enhancement)

**Layout**: Two-column grid — copy on left (5fr), sticky token cluster on right (4fr)

**Left column** (vertical subsections):

1. **Challenge** — "AI enables creation at hilarious speed, but the outcomes of each prompt can be wildly unpredictable..." + "On websites, we call this 'not ideal'; in Slack channels, we use more four-letter words."

2. **Insight & Thesis** — "Design systems are shared working agreements between Humans and AI Agents." + three principles:
   1. Institutionalized context must persist across sessions
   2. Every decision must be queryable
   3. Every decision must be validatable

3. **Goals** — Three numbered goals for the v4 iteration (DesignerPunk). NOTE: Goal #1 in the prototype still reads "enterprise-tier" — this must be updated to match the new positioning (e.g., "production-grade" or remove the modifier entirely).

**Right column** (scroll-driven token animation):

A sticky cluster of 16 tokens in bordered pill format (left-to-right, wrapping). As the user scrolls through the section, the token text transforms through four phases via a split-flap (rotateX) animation:

| Phase | Visual state | Token example |
|-------|-------------|---------------|
| 1 | Chaos — rotated, mixed naming conventions | `$space-1`, `@color-blue-1`, `%radius-pill` |
| 2 | Straightened — rotations flatten, still chaos names | `$space-1`, `@color-blue-1`, `%radius-pill` |
| 3 | Primitive naming — mathematical scale | `--space-100`, `--pink-500`, `--radius-050` |
| 4 | Semantic naming — intent-driven | `--space-grouped-tight`, `--color-action-primary`, `--typography-body-md-font-size` |

**Phase 1 diversity requirement**: All 16 tokens must have *unique* Phase 1 values — no duplicates. The prototype repeats several (`$space-1`, `@color-blue-1`, `%radius-pill` appear twice). Phase 1 should feel like 5 different developers named things independently across different eras/tools. Mix prefixes (`$`, `@`, `%`, `--dp-`, `--ds-`, `_`), conventions (camelCase, kebab-case, abbreviated, verbose), and categories (spacing, color, type, radius, motion, icons). The diversity sells the chaos; repetition undermines it.

**Scroll timing**:
- Phase 1 completes when entire Insight & Thesis beat is in viewport
- Phase 4 starts when Insight & Thesis beat exits viewport top
- Phases 2 and 3 split evenly between those anchor points
- Fully reversible on scroll-up

**Primitive → Semantic mappings are accurate** (each primitive correctly resolves to its actual semantic reference in the system).

---

## Tone Principles (Confirmed)

- **Punch up, not down.** Target the *system* that gatekeeps — not the humans stuck in it, and never the user's situation.
- **Empower, don't sympathize.** The user is already capable and already building. DesignerPunk removes the structural ceiling.
- **Adversarial without being combative.** Let the punk flex. Point the middle finger at the building, not the person.
- **No "AI replaces jobs" framing.** DesignerPunk provides *access to capabilities*, not elimination of roles.
- **Human-AI collaboration, not "AI does it for you."** The capability expansion comes from pairing human strengths (vision, judgment) with AI strengths (speed, consistency).

---

## Scope

### In Scope

- Replace "What makes this system enterprise-grade?" section with "Who is this system built for?"
- Enhance "Why build this system?" with subsection layout + scroll-driven token animation
- Stats bar: expand to full viewport width (full-bleed, content contained at max-width — matching prototype)
- **Remove all residual "enterprise" language** from other sections (Hero description, CTA copy, Goal #1)
- **Update Product MCP context** — Leonardo updates `product/overview.yaml` and relevant experience map entries to reflect 0-to-1 positioning (agents must receive correct framing)
- Create product tokens for any new values introduced by this section's design
- Update GitHub README to reflect the 0-to-1 positioning

### Out of Scope

- Other page sections beyond "enterprise" language removal (CTA structure, How Built structure, Ecosystem, Who Built)
- Astro migration (Spec 006)
- CSS cleanup (Spec 005 — already complete ✅)
- Visual redesign of sections not covered by this spec

---

## Implementation Alignment

### Confirmed Decisions:

- **`.audience__hook` ("Headcount isn't destiny.")** — Use `typography.display` system semantic. No product token needed.
- **`.audience__sub` and `.audience__personas` (18px text)** — Use `typography.bodyLg` system semantic (`fontSize125` = 18px). No product token needed.
- **`.why-build__thesis-statement`** — Keep as-is (existing page pattern, already in portfolio.css).
- **Other font-size values** (34px headings, 22px quotes, 17px card headers, etc.) — Snap to nearest system type style. No new typography product tokens needed per Leonardo/Sparky audit.
- **Stats bar full-bleed** — Confirmed structural change: remove `max-inline-size` from `.stats` parent, keep `contentMaxWidth` on `.stats__grid` inner container.
- **Reduced motion** — Users with `prefers-reduced-motion: reduce` see Phase 4 (semantic token names) immediately, no transitions, no scroll-driven changes. Animation exists for all other users.
- **CSS class rename** — `.enterprise__*` → `.audience__*` is explicit scope (HTML classes, CSS selectors, verify no JS queries).
- **Audience grid cards** — Intentionally simpler than ecosystem cards (no noise texture, no box-shadow). Flat text items in a grid — same structure as current enterprise section.
- **Sequencing** — Implement before Spec 006 (Astro migration).

### What the prototype introduces that needs system translation:

**Spacing values to audit:**
- Grid gaps (40px × 72px in audience grid, 64px in narrative grid) — do product layout tokens cover these?
- Section padding (120px top, 96px bottom) — consistent with existing sections?
- Card internal spacing — consistent with existing `.ecosystem__system` cards?

**Layout patterns to audit:**
- Is the 2×3 audience grid structurally different from the existing ecosystem 3-column grid, or can they share a pattern?
- The sticky right column in "Why Build" — new pattern or existing?
- Stats bar full-bleed: background expands to viewport edge, content stays at `contentMaxWidth`

**Script to audit:**
- Token animation (split-flap, scroll-driven) — does this need to follow the lessons-learned patterns from Spec 005 (export init, return cleanup) even pre-Astro?
- If implementing before Spec 006: standalone script file, DOMContentLoaded pattern
- If implementing after Spec 006: Astro island with proper lifecycle

**Product MCP update:**
- Leonardo updates `product/overview.yaml` to replace enterprise framing with 0-to-1 positioning
- Experience map entries referencing "enterprise" context need review
- Agents consuming Product MCP must receive the updated framing

### What existing DesignerPunk patterns apply:

- Section heading pattern (`.section-prefix` + heading) — reuse existing
- Card pattern (bordered, noise texture background) — audit if audience grid cards should match ecosystem cards
- Responsive breakpoints — same breakpoints as existing responsive rules
- Reduced motion handling — all animation must have `prefers-reduced-motion` coverage
- System typography semantics — use before creating product tokens

---

## Open Questions (Remaining)

1. ~~**Tone**~~ ✅ Confirmed
2. ~~**Visual treatment**~~ ✅ Confirmed (2×3 grid + scroll-driven token animation)
3. ~~**Heading**~~ ✅ "Who is this system built for?"
4. ~~**README**~~ ✅ Complement, don't duplicate — specifics TBD during design phase
5. ~~**Enterprise angle**~~ ✅ Not budget positioning — capability expansion
6. **Token audit** — Which prototype values snap to existing system/product tokens, which need new product tokens?
7. **Sequencing** — Implement before or after Spec 006? (Determines script architecture)

---

## Dependencies

- Spec 005 (CSS cleanup) ✅ Complete
- Spec 006 (Astro migration) — optionally before or after; affects script architecture choice
- System-First Value Selection rule (Product-Token-Governance.md) — governs all new product token creation
- Token animation JS will need to follow either pre-Astro (standalone, DOMContentLoaded) or post-Astro (island, export init/cleanup) pattern
