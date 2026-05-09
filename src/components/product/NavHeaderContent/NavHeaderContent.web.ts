/**
 * NavHeaderContent — Product-Level Nav Content
 *
 * Provides the slotted content for Nav-Header-App's three regions:
 * - Leading: Logo lockup (DesignerPunk logo + "by 3fn Design" credit)
 * - Center: Platform icons (web, Apple, Android) — decorative
 * - Trailing: NavAboutPopover + GitHub link + LinkedIn link
 *
 * @see .kiro/specs/000-nav-header-app-hardening/design.md
 */

/// <reference lib="dom" />

import '../../core/Icon-Base/platforms/web/IconBase.web';
import '../NavAboutPopover/NavAboutPopover.web';

export class NavHeaderContent extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = `
      <nav-header-app>
        <div slot="leading" class="logo-lockup">
          <div class="logo-lockup__logo" aria-hidden="true">
            <img src="./primitive-assets/designerPunkLogo.svg" alt="" />
          </div>
          <div class="logo-lockup__credit">
            <span class="credit__by">by</span>
            <span class="credit__name">3fn Design</span>
          </div>
        </div>

        <div slot="center" class="platform-icons" aria-hidden="true">
          <icon-base name="globe" size="icon050" aria-hidden="true"></icon-base>
          <svg class="platform-icon" aria-hidden="true" viewBox="0 0 14 17" width="14" height="17"><path d="M11.182.32c.862 1.024 1.444 2.453 1.284 3.882-1.244.08-2.728-.72-3.59-1.744C8.034 1.434 7.372.085 7.572-1.264c1.364-.04 2.768.64 3.61 1.584z" fill="currentColor" transform="translate(0 1.264)"/><path d="M12.466 4.202c-1.984-.12-3.67 1.124-4.612 1.124-.962 0-2.408-1.064-3.99-1.044-2.044.04-3.95 1.204-4.992 3.03-2.148 3.69-.562 9.15 1.504 12.16 1.024 1.484 2.228 3.13 3.81 3.07 1.544-.06 2.108-1 3.97-1 1.844 0 2.368 1 3.99.98 1.644-.04 2.688-1.504 3.71-2.99 1.164-1.704 1.624-3.35 1.664-3.43-.04-.02-3.21-1.244-3.25-4.914-.02-3.07 2.508-4.534 2.628-4.614-1.444-2.13-3.69-2.372-4.472-2.412l.04.04z" fill="currentColor" transform="translate(0 -3)"/></svg>
          <svg class="platform-icon" aria-hidden="true" viewBox="0 0 14 16" width="14" height="16"><path d="M2.5 1h9L14 3.5v2L12.5 7h-2l-1 1.5h-5L3.5 7h-2L0 5.5v-2L2.5 1zm2 2a1 1 0 100 2 1 1 0 000-2zm5 0a1 1 0 100 2 1 1 0 000-2z" fill="currentColor"/><path d="M3 9l1.5 6h5L11 9" fill="none" stroke="currentColor" stroke-width="1"/></svg>
        </div>

        <div slot="trailing" class="nav-actions">
          <nav-about-popover>
            <span slot="trigger">About</span>
          </nav-about-popover>
          <a href="https://github.com/3fn/DesignerPunkv2" class="nav-link" target="_blank" rel="noopener">
            GitHub
            <icon-base name="external-link" size="icon050" aria-hidden="true"></icon-base>
          </a>
          <a href="https://linkedin.com/in/petermichaelsallen" class="nav-link" target="_blank" rel="noopener">
            LinkedIn
            <icon-base name="external-link" size="icon050" aria-hidden="true"></icon-base>
          </a>
        </div>
      </nav-header-app>
    `;
  }
}

if (!customElements.get('nav-header-content')) {
  customElements.define('nav-header-content', NavHeaderContent);
}
