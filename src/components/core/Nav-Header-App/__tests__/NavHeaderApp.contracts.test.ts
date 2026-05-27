/**
 * @category evergreen
 * @purpose Verify Nav-Header-App behavioral contracts
 * @jest-environment jsdom
 */
/**
 * Contract tests for Nav-Header-App component
 *
 * Tests: visual_background_override, visual_shadow, accessibility_no_heading,
 * border removal (App-level separator hidden).
 *
 * Stemma System: Navigation Family, Semantic (App)
 * Contracts tested: 3 own + 1 inherited override behavior
 */

import { NavHeaderApp } from '../platforms/web/NavHeaderApp.web';
import { readComponentCSS } from '@3fn/core/testing';

const cssSource = readComponentCSS(__dirname, '../platforms/web/NavHeaderApp.styles.css');

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
    it('should expose --nav-bg-override custom property', () => {
      expect(cssSource).toContain('--nav-bg-override');
    });

    it('should use black-300 as default background', () => {
      expect(cssSource).toContain('var(--nav-bg-override, var(--black-300))');
    });

    it('should redefine --color-structure-canvas on :host', () => {
      expect(cssSource).toMatch(/:host\s*\{[^}]*--color-structure-canvas/);
    });
  });

  // ==========================================================================
  // visual_shadow contract
  // ==========================================================================

  describe('visual_shadow', () => {
    it('should always render a box-shadow (shadow is intrinsic)', () => {
      expect(cssSource).toContain('box-shadow');
    });

    it('should use shadow.navigation semantic token', () => {
      expect(cssSource).toContain('var(--shadow-navigation)');
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
  // Border removal (App-level separator hidden)
  // ==========================================================================

  describe('border removal', () => {
    it('should set --color-structure-border-subtle to transparent', () => {
      expect(cssSource).toContain('--color-structure-border-subtle: transparent');
    });

    it('should redefine --color-structure-border-subtle on :host', () => {
      expect(cssSource).toMatch(/:host\s*\{[^}]*--color-structure-border-subtle/);
    });
  });
});
