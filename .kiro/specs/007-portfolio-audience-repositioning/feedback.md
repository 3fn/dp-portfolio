# Spec Feedback: Portfolio Audience Repositioning

**Spec**: 007-portfolio-audience-repositioning
**Created**: 2026-06-04

---

## Design Outline Feedback

### Context for Reviewers
- Leonardo authored the prototype (`docs/specs/staticReview/hero-explorationv2.html`) and confirmed content direction
- The prototype is vision, NOT implementation — implementation must go through DesignerPunk (tokens, Web-Authoring-Standards, System-First Value Selection)
- Spec 005 (CSS cleanup) is complete — the portfolio is now Web-Authoring-Standards compliant
- Typography decision confirmed: use system `typography.display` for the hook, snap other sizes to nearest system styles
- Product MCP update is in scope (Leonardo ownership)
- "Enterprise" language removal spans the entire page, not just the replaced section

### Stakeholders
- **Leonardo** — Prototype author, content direction, Product MCP update, visual decisions
- **Sparky** — Implementation owner, Web-Authoring-Standards compliance, token audit
- **Thurgood** — Spec formalization (after feedback incorporated)

---

#### [THURGOOD R1]

**Incorporation notes:**

- LEONARDO R1 + SPARKY R1: Content accuracy confirmed, outline captures prototype intent. ✅
- Product MCP update: Added to scope with Leonardo ownership.
- Typography: `typography.display` for hook, `typography.bodyLg` for 18px sub/persona text, snap-to-system for all others. No new product tokens needed.
- Audience grid cards: Intentionally simpler than ecosystem cards (flat text, no noise/shadow). Documented.
- CSS class rename (`.enterprise__*` → `.audience__*`): Added as explicit scope item.
- Stats full-bleed: Confirmed as real structural change. Documented.
- Reduced motion: Show Phase 4 immediately, no transitions. Documented.
- Phase 1 token diversity: Added requirement for 16 unique chaos values (no duplicates). Per Peter.
- Sequencing: Implement before Spec 006. Per Sparky recommendation + Peter confirmation.
- `aria-labelledby`: Noted for implementation. Per Sparky.
- Font-size 18px resolved: `typography.bodyLg` (`fontSize125` = 18px exactly). Per Peter + system verification.

---

## Requirements Feedback

### Context for Reviewers
- [Populated after requirements.md is written]

---

## Design Feedback

### Context for Reviewers
- [Populated after design.md is written]

---

## Tasks Feedback

### Context for Reviewers
- [Populated after tasks.md is written]
