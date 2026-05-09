/**
 * @category evergreen
 * @purpose Verify NavAboutPopover behavioral contracts
 * @jest-environment jsdom
 */
/**
 * Contract tests for NavAboutPopover component
 *
 * Tests: interaction_pressable, interaction_dismiss, interaction_focus_order,
 * accessibility_aria_controls, animation_coordination
 *
 * One-off product component — not a Stemma family component.
 */

import { NavAboutPopover } from '../NavAboutPopover.web';

describe('NavAboutPopover Contract Tests', () => {
  let container: HTMLElement;
  let element: NavAboutPopover;
  let trigger: HTMLButtonElement;
  let panel: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    element = new NavAboutPopover();
    container.appendChild(element);
    element.connectedCallback();
    trigger = element.shadowRoot!.querySelector('[data-trigger]') as HTMLButtonElement;
    panel = element.shadowRoot!.querySelector('[data-panel]') as HTMLElement;
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  // ==========================================================================
  // interaction_pressable contract
  // ==========================================================================

  describe('interaction_pressable', () => {
    it('should open popover on trigger click', () => {
      trigger.click();
      expect(panel.hidden).toBe(false);
    });

    it('should close popover on second trigger click', () => {
      trigger.click(); // open
      trigger.click(); // close
      expect(panel.classList.contains('is-open')).toBe(false);
    });
  });

  // ==========================================================================
  // interaction_dismiss contract
  // ==========================================================================

  describe('interaction_dismiss', () => {
    it('should close on outside click', () => {
      trigger.click(); // open
      const outsideClick = new MouseEvent('click', { bubbles: true, composed: true });
      Object.defineProperty(outsideClick, 'composedPath', {
        value: () => [document.body, document],
      });
      document.dispatchEvent(outsideClick);
      expect(panel.classList.contains('is-open')).toBe(false);
    });

    it('should close on Escape key', () => {
      trigger.click(); // open
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      document.dispatchEvent(escapeEvent);
      expect(panel.classList.contains('is-open')).toBe(false);
    });
  });

  // ==========================================================================
  // interaction_focus_order contract
  // ==========================================================================

  describe('interaction_focus_order', () => {
    it('should have anchor links in the panel for focus targeting', () => {
      const links = panel.querySelectorAll('a');
      expect(links.length).toBeGreaterThan(0);
    });

    it('should return focus to trigger on Escape close', () => {
      trigger.click(); // open
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      document.dispatchEvent(escapeEvent);
      expect(element.shadowRoot!.activeElement).toBe(trigger);
    });
  });

  // ==========================================================================
  // accessibility_aria_controls contract
  // ==========================================================================

  describe('accessibility_aria_controls', () => {
    it('should have aria-expanded="false" when closed', () => {
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have aria-expanded="true" when open', () => {
      trigger.click();
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-controls matching panel ID', () => {
      const controlsId = trigger.getAttribute('aria-controls');
      expect(controlsId).toBe(panel.id);
    });

    it('should have panel with role="navigation"', () => {
      expect(panel.getAttribute('role')).toBe('navigation');
    });

    it('should have panel with aria-label', () => {
      expect(panel.getAttribute('aria-label')).toBe('Page sections');
    });
  });

  // ==========================================================================
  // animation_coordination contract
  // ==========================================================================

  describe('animation_coordination', () => {
    it('should have transition CSS on panel', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toContain('transition');
      expect(style!.textContent).toContain('opacity');
      expect(style!.textContent).toContain('transform');
    });

    it('should use duration-150 token', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toContain('--duration-150');
    });

    it('should respect prefers-reduced-motion', () => {
      const style = element.shadowRoot!.querySelector('style');
      expect(style!.textContent).toContain('prefers-reduced-motion');
      expect(style!.textContent).toMatch(/prefers-reduced-motion.*transition:\s*none/s);
    });

    it('should add is-open class when opened', () => {
      trigger.click();
      expect(panel.classList.contains('is-open')).toBe(true);
    });

    it('should remove is-open class when closed', () => {
      trigger.click(); // open
      trigger.click(); // close
      expect(panel.classList.contains('is-open')).toBe(false);
    });
  });

  // ==========================================================================
  // Prefix pattern (accessibility)
  // ==========================================================================

  describe('prefix pattern accessibility', () => {
    it('should render prefixes with aria-hidden="true"', () => {
      const prefixes = panel.querySelectorAll('[aria-hidden="true"]');
      expect(prefixes.length).toBeGreaterThan(0);
    });

    it('should not include prefix text in accessible link names', () => {
      const links = panel.querySelectorAll('a');
      links.forEach((link) => {
        const label = link.querySelector('.item__label');
        const prefix = link.querySelector('.item__prefix');
        expect(prefix!.getAttribute('aria-hidden')).toBe('true');
        expect(label).not.toBeNull();
      });
    });
  });
});
