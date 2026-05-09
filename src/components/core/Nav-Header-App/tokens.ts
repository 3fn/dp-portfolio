/**
 * Nav-Header-App Component Token Definitions
 *
 * Platform-agnostic token definitions for the Nav-Header-App component.
 * Uses the defineComponentTokens() API to register tokens with the global
 * ComponentTokenRegistry for pipeline integration.
 *
 * Token Relationships:
 * - navButton.padding.vertical (20px) references space250
 * - navHeader.padding.inline (40px) references space500
 *
 * @see .kiro/specs/000-nav-header-app-hardening/design.md
 */

import { defineComponentTokens } from '@3fn/core/build';
import { spacingTokens } from '../../../tokens/SpacingTokens';

export const NavHeaderAppTokens = defineComponentTokens({
  component: 'NavHeaderApp',
  family: 'spacing',
  tokens: {
    'navButton.padding.vertical': {
      reference: spacingTokens.space250,
      reasoning: 'Nav buttons are optically taller than standard buttons. 20px vertical padding (2.5× base) provides the distinctive nav button height without promoting to a semantic inset token — single consumer, one-off optical decision.',
    },
    'navHeader.padding.inline': {
      reference: spacingTokens.space500,
      reasoning: 'Nav content regions need 40px horizontal padding (5× base) to keep slotted content away from viewport edges. No semantic inset token exists at this value — inset scale tops at 32px (inset.400). Single consumer.',
    },
  },
});
