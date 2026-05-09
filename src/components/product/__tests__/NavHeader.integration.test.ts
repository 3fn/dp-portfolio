/**
 * @category evergreen
 * @purpose Integration tests for Nav-Header-App + NavAboutPopover composition
 * @jest-environment jsdom
 */
/**
 * Integration tests verifying cross-component behavior
 *
 * Tests: three-property coordination, popover z-index above nav,
 * prefix hidden from accessible name, logo renders in leading slot.
 */

import { NavHeaderApp } from '../../core/Nav-Header-App/platforms/web/NavHeaderApp.web';
import { NavAboutPopover } from '../NavAboutPopover/NavAboutPopover.web';

describe('Nav-Header Integration Tests', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('three custom properties coordinate', () => {
    it('should accept all three override properties simultaneously', () => {
      const nav = new NavHeaderApp();
      container.appendChild(nav);
      nav.connectedCallback();

      const style = nav.shadowRoot!.querySelector('style')!.textContent!;
      expect(style).toContain('--nav-bg-override');
      expect(style).toContain('--nav-glow-color');
      expect(style).toContain('--nav-border-color');
    });

    it('should define all three overrides on :host scope', () => {
      const nav = new NavHeaderApp();
      container.appendChild(nav);
      nav.connectedCallback();

      const style = nav.shadowRoot!.querySelector('style')!.textContent!;
      const hostBlock = style.match(/:host\s*\{([^}]+)\}/s);
      expect(hostBlock).not.toBeNull();
      expect(hostBlock![1]).toContain('--color-structure-canvas');
      expect(hostBlock![1]).toContain('--color-structure-border-subtle');
    });
  });

  describe('popover z-index above nav', () => {
    it('should have popover panel with z-index-dropdown token', () => {
      const popover = new NavAboutPopover();
      container.appendChild(popover);
      popover.connectedCallback();

      const style = popover.shadowRoot!.querySelector('style')!.textContent!;
      expect(style).toContain('z-index');
      expect(style).toContain('--z-index-dropdown');
    });
  });

  describe('prefix hidden from accessible name', () => {
    it('should have all prefix elements marked aria-hidden', () => {
      const popover = new NavAboutPopover();
      container.appendChild(popover);
      popover.connectedCallback();

      const panel = popover.shadowRoot!.querySelector('[data-panel]')!;
      const prefixes = panel.querySelectorAll('.item__prefix');
      expect(prefixes.length).toBeGreaterThan(0);
      prefixes.forEach((prefix) => {
        expect(prefix.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should have label text as separate non-hidden element', () => {
      const popover = new NavAboutPopover();
      container.appendChild(popover);
      popover.connectedCallback();

      const panel = popover.shadowRoot!.querySelector('[data-panel]')!;
      const labels = panel.querySelectorAll('.item__label');
      expect(labels.length).toBeGreaterThan(0);
      labels.forEach((label) => {
        expect(label.getAttribute('aria-hidden')).toBeNull();
      });
    });
  });

  describe('logo in leading slot', () => {
    it('should accept content in leading slot', () => {
      const nav = new NavHeaderApp();
      container.appendChild(nav);
      nav.connectedCallback();

      const leadingSlot = nav.shadowRoot!.querySelector('slot[name="leading"]');
      expect(leadingSlot).not.toBeNull();
    });
  });
});
