/**
 * @category evergreen
 * @purpose Verify Nav-Header-App behavioral contracts
 * @jest-environment jsdom
 */
/**
 * Contract tests for Nav-Header-App component
 *
 * Tests: visual_background_override, visual_glow, accessibility_no_heading,
 * border color override (separator behavior at App level).
 *
 * Stemma System: Navigation Family, Semantic (App)
 * Contracts tested: 3 own + 1 inherited override behavior
 */

import { NavHeaderApp } from '../platforms/web/NavHeaderApp.web';

describe('Nav-Header-App Contract Tests', () => {
  let container: HTMLElement;
  let element: NavHeaderApp;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    element = new NavHeaderApp();
    container.appendChild(element);
    element.connectedCallback();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  // ==========================================================================
  // visual_background_override contract
  // ==========================================================================

  describe('visual_background_override', () => {
    it('should expose --nav-bg-override custom property via :host style', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toContain('--nav-bg-override');
    });

    it('should reference --color-structure-canvas as fallback', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toContain('var(--nav-bg-override, var(--color-structure-canvas))');
    });

    it('should redefine --color-structure-canvas on :host', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toMatch(/:host\s*\{[^}]*--color-structure-canvas/);
    });
  });

  // ==========================================================================
  // visual_glow contract
  // ==========================================================================

  describe('visual_glow', () => {
    it('should always render a box-shadow (underglow is intrinsic)', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toContain('box-shadow');
    });

    it('should use blur-200 token for glow blur radius', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toContain('--blur-200');
    });

    it('should use pre-baked rgba default with 0.4 opacity', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toContain('rgba(0, 204, 110, 0.4)');
    });

    it('should expose --nav-glow-color custom property', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toContain('--nav-glow-color');
    });
  });

  // ==========================================================================
  // accessibility_no_heading contract
  // ==========================================================================

  describe('accessibility_no_heading', () => {
    it('should not render any heading elements in shadow DOM', () => {
      const headings = element.shadowRoot!.querySelectorAll('h1, h2, h3, h4, h5, h6');
      expect(headings.length).toBe(0);
    });
  });

  // ==========================================================================
  // Border color override (App-level separator default)
  // ==========================================================================

  describe('border color override', () => {
    it('should expose --nav-border-color custom property', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toContain('--nav-border-color');
    });

    it('should override --color-structure-border-subtle with green-400 default', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toContain('var(--nav-border-color, var(--green-400))');
    });

    it('should redefine --color-structure-border-subtle on :host', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toMatch(/:host\s*\{[^}]*--color-structure-border-subtle/);
    });
  });
});
