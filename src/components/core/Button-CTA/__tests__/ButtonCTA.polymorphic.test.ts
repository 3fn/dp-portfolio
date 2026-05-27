/**
 * @category evergreen
 * @purpose Verify Button-CTA polymorphic rendering and iconPosition contracts
 * @jest-environment jsdom
 */

import { ButtonCTA } from '../platforms/web/ButtonCTA.web';

describe('Button-CTA Polymorphic Rendering (content_renders_link)', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  function createButton(attrs: Record<string, string> = {}): ButtonCTA {
    const el = new ButtonCTA();
    el.setAttribute('label', attrs.label || 'Test');
    for (const [key, value] of Object.entries(attrs)) {
      if (key !== 'label') el.setAttribute(key, value);
    }
    container.appendChild(el);
    el.connectedCallback();
    return el;
  }

  describe('renders <a> when href is set', () => {
    it('should render an <a> element when href is provided', () => {
      const btn = createButton({ href: 'https://example.com' });
      const root = btn.shadowRoot!.querySelector('a');
      expect(root).not.toBeNull();
    });

    it('should have the correct href attribute', () => {
      const btn = createButton({ href: 'https://example.com/path' });
      const link = btn.shadowRoot!.querySelector('a')!;
      expect(link.getAttribute('href')).toBe('https://example.com/path');
    });

    it('should NOT render a <button> element when href is set', () => {
      const btn = createButton({ href: 'https://example.com' });
      const button = btn.shadowRoot!.querySelector('button');
      expect(button).toBeNull();
    });
  });

  describe('renders <button> when href is absent', () => {
    it('should render a <button> element without href', () => {
      const btn = createButton({});
      const button = btn.shadowRoot!.querySelector('button');
      expect(button).not.toBeNull();
    });

    it('should NOT render an <a> element without href', () => {
      const btn = createButton({});
      const link = btn.shadowRoot!.querySelector('a');
      expect(link).toBeNull();
    });
  });

  describe('rel auto-applied with target="_blank"', () => {
    it('should auto-set rel="noopener noreferrer" when target="_blank"', () => {
      const btn = createButton({ href: 'https://example.com', target: '_blank' });
      const link = btn.shadowRoot!.querySelector('a')!;
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should use explicit rel when provided', () => {
      const btn = createButton({ href: 'https://example.com', target: '_blank', rel: 'noopener' });
      const link = btn.shadowRoot!.querySelector('a')!;
      expect(link.getAttribute('rel')).toBe('noopener');
    });

    it('should not set rel when target is not _blank', () => {
      const btn = createButton({ href: 'https://example.com' });
      const link = btn.shadowRoot!.querySelector('a')!;
      expect(link.getAttribute('rel')).toBeNull();
    });
  });

  describe('keyboard behavior', () => {
    it('should not have type="button" on <a> element', () => {
      const btn = createButton({ href: 'https://example.com' });
      const link = btn.shadowRoot!.querySelector('a')!;
      expect(link.getAttribute('type')).toBeNull();
    });

    it('should not have role="button" on <a> element', () => {
      const btn = createButton({ href: 'https://example.com' });
      const link = btn.shadowRoot!.querySelector('a')!;
      expect(link.getAttribute('role')).toBeNull();
    });
  });

  describe('disabled ignored on links', () => {
    it('should not have disabled attribute on <a> element', () => {
      const btn = createButton({ href: 'https://example.com', disabled: '' });
      const link = btn.shadowRoot!.querySelector('a')!;
      expect(link.hasAttribute('disabled')).toBe(false);
    });

    it('should not have aria-disabled on <a> element', () => {
      const btn = createButton({ href: 'https://example.com', disabled: '' });
      const link = btn.shadowRoot!.querySelector('a')!;
      expect(link.hasAttribute('aria-disabled')).toBe(false);
    });
  });
});

describe('Button-CTA Icon Position (layout_icon_position)', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  function createButton(attrs: Record<string, string> = {}): ButtonCTA {
    const el = new ButtonCTA();
    el.setAttribute('label', attrs.label || 'Test');
    for (const [key, value] of Object.entries(attrs)) {
      if (key !== 'label') el.setAttribute(key, value);
    }
    container.appendChild(el);
    el.connectedCallback();
    return el;
  }

  it('should render icon before label by default (leading)', () => {
    const btn = createButton({ icon: 'arrow-right' });
    const root = btn.shadowRoot!.querySelector('button')!;
    const children = Array.from(root.children);
    const iconIdx = children.findIndex(el => el.classList.contains('button-cta__icon'));
    const labelIdx = children.findIndex(el => el.className.includes('button-cta__label'));
    expect(iconIdx).toBeLessThan(labelIdx);
  });

  it('should render icon after label when iconPosition="trailing"', () => {
    const btn = createButton({ icon: 'external-link', 'icon-position': 'trailing' });
    const root = btn.shadowRoot!.querySelector('button')!;
    const children = Array.from(root.children);
    const iconIdx = children.findIndex(el => el.classList.contains('button-cta__icon'));
    const labelIdx = children.findIndex(el => el.className.includes('button-cta__label'));
    expect(labelIdx).toBeLessThan(iconIdx);
  });

  it('should work with href (trailing icon on outbound link)', () => {
    const btn = createButton({ href: 'https://example.com', icon: 'external-link', 'icon-position': 'trailing', target: '_blank' });
    const link = btn.shadowRoot!.querySelector('a')!;
    const children = Array.from(link.children);
    const iconIdx = children.findIndex(el => el.classList.contains('button-cta__icon'));
    const labelIdx = children.findIndex(el => el.className.includes('button-cta__label'));
    expect(labelIdx).toBeLessThan(iconIdx);
  });
});
