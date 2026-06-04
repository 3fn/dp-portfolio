/**
 * NavHeaderContent — Product-Level Nav Content
 *
 * Provides the slotted content for Nav-Header-App's two regions:
 * - Leading: Logo lockup (DesignerPunk logo + "by 3fn Design" credit)
 * - Trailing: NavAboutPopover + GitHub link + LinkedIn link
 *
 * Applies max-width constraint to nav content while keeping background full-bleed.
 *
 * @see .kiro/specs/000-nav-header-app-hardening/design.md
 */

/// <reference lib="dom" />

import '../../core/Icon-Base/platforms/web/IconBase.web';
import '../NavAboutPopover/NavAboutPopover.web';

export class NavHeaderContent extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <style>
        /* Light-DOM styles for nav-header-app slotted content */
        .logo-lockup {
          align-items: center;
          gap: var(--space-100);
          padding-inline-start: var(--space-500)
        }
        .logo-lockup__logo img {
          height: var(--size-300);
          width: auto;
          display: block;
        }
        .logo-lockup__credit {
          font-size: var(--font-size-050);
          color: var(--color-contrast-on-dark);
          line-height: 1;
          padding-inline-start: var(--space-250);
        }
        .credit__by { font-weight: 300; }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: var(--space-400);
          padding-inline-end: var(--space-500)
        }
        .nav-link {
          font-family: var(--font-family-display);
          font-size: var(--font-size-150);
          font-weight: var(--font-weight-700);
          color: var(--color-contrast-on-dark);
          text-decoration: none;
          opacity: var(--opacity-088);
          transition: opacity var(--duration-150) var(--easing-standard);
          display: inline-flex;
          align-items: center;
          gap: var(--space-grouped-tight);
        }
        .nav-link:hover { opacity: 1; }
        .nav-link:focus-visible {
          outline: 2px solid var(--color-action-primary);
          outline-offset: 2px;
        }
        .nav-link icon-base {
          margin-block-end: var(--space-050);
        }

        @media (forced-colors: active) {
          .nav-link {
            border: 1px solid LinkText;
          }
          .nav-link:focus-visible {
            outline: 2px solid Highlight;
          }
        }
      </style>
      <nav-header-app>
        <div slot="leading" class="logo-lockup">
          <div class="logo-lockup__logo" aria-hidden="true">
            <img src="/logo/logo-designerPunk.svg" alt="Designer Punk logo" />
          </div>
          <div class="logo-lockup__credit">
            <span class="credit__by">by</span>
            <span class="credit__name">3fn Design</span>
          </div>
        </div>

        <div slot="trailing" class="nav-actions">
          <nav-about-popover>
            <span slot="trigger">About</span>
          </nav-about-popover>
          <a href="https://github.com/3fn/DesignerPunkv2" class="nav-link" target="_blank" rel="noopener">
            GitHub
            <icon-base name="external-link" size="13" aria-hidden="true"></icon-base>
          </a>
          <a href="https://linkedin.com/in/petermichaelsallen" class="nav-link" target="_blank" rel="noopener">
            LinkedIn
            <icon-base name="external-link" size="13" aria-hidden="true"></icon-base>
          </a>
        </div>
      </nav-header-app>
    `;
  }
}

if (!customElements.get('nav-header-content')) {
  customElements.define('nav-header-content', NavHeaderContent);
}
