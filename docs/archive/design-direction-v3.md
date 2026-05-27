---
name: design-direction
keywords: [dark-theme, typography, blend-modes, scroll-animation, bold-color, portfolio, narrative]
---

# Design Direction — DP-Portfolio

## Visual Identity

The site uses a dark foundation with high-saturation accent colors — primarily cyan, hot pink, and electric green. The palette is intentionally bold and energetic, reflecting the system's personality ("Because why not!?") while maintaining readability through strong contrast ratios.

## Color Strategy

- **Light default theme**: The site operates in light mode with contextual dark sections achieved through section-level styling, not theme switching
- **Saturated section backgrounds**: Mint green (hero/stats), lavender/pink (ecosystem), dark teal (career) — each major section has a distinct color identity
- **Accent colors**: Cyan for interactive elements and headings, hot pink for emphasis and CTAs, green for data/stats
- **Contrast**: Light text on dark sections, dark text on light sections — no ambiguous middle ground

## Typography

- **Display** (Rajdhani): Section headings, hero title, stats numbers — bold, condensed, technical feel
- **Body** (Figtree): Paragraph text, descriptions, card content — clean, high x-height, readable at small sizes
- **Mono** (Commit Mono): Code references, technical labels — used sparingly for system credibility

## Imagery & Blend Modes

- Historical figure portraits composited into section backgrounds using CSS blend modes (multiply/screen depending on background lightness)
- The hero illustration (cyberpunk head) is a layered composition — likely absolute-positioned with blend
- Code screenshots with overlay treatment (red/orange tint with halftone texture)
- Halftone dot patterns as textural elements in transitions between sections

## Motion & Interaction

- Scroll-reveal animations: sections fade/slide in as they enter viewport
- CSS-first approach (Intersection Observer + transitions)
- Stats numbers may count up on reveal
- No autoplay, no motion that competes with content

## Layout Philosophy

- Full-width sections with contained content columns
- Alternating visual density: spacious hero → dense stats → breathing room → dense grid → spacious CTA
- Section transitions use color shifts and textural elements (halftone, geometric patterns) rather than hard lines
- Mobile-first content structure that expands into multi-column at wider viewports

## Voice & Tone

- First person, conversational, confident
- Profanity-adjacent humor ("Hard $#@%ing work!")
- Technical credibility balanced with approachability
- Not corporate — this is a personal portfolio, not a product landing page
