/**
 * NavAboutPopover — One-Off Product Component
 *
 * Click-toggle popover with section anchor links for the DP-Portfolio nav.
 * Not a Stemma family component — product-level one-off.
 *
 * Contracts: interaction_pressable, interaction_dismiss, interaction_focus_order,
 *            accessibility_aria_controls, animation_coordination
 *
 * @see .kiro/specs/000-nav-header-app-hardening/design.md
 */

/// <reference lib="dom" />

const PANEL_ID = 'about-menu';

export class NavAboutPopover extends HTMLElement {
  private _shadowRoot: ShadowRoot;
  private _isOpen = false;
  private _trigger!: HTMLButtonElement;
  private _panel!: HTMLElement;
  private _outsideClickHandler = this._handleOutsideClick.bind(this);
  private _keydownHandler = this._handleKeydown.bind(this);
  private _hideTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this._render();
    this._trigger = this._shadowRoot.querySelector('[data-trigger]') as HTMLButtonElement;
    this._panel = this._shadowRoot.querySelector('[data-panel]') as HTMLElement;
    this._trigger.addEventListener('click', () => this._toggle());
  }

  disconnectedCallback(): void {
    this._removeGlobalListeners();
  }

  // --- Toggle ---

  private _toggle(): void {
    this._isOpen ? this._close() : this._open();
  }

  private _open(): void {
    if (this._hideTimeout) { clearTimeout(this._hideTimeout); this._hideTimeout = null; }
    this._isOpen = true;
    this._trigger.setAttribute('aria-expanded', 'true');
    this._panel.hidden = false;
    // Trigger reflow before adding open class for transition
    this._panel.offsetHeight;
    this._panel.classList.add('is-open');
    this._addGlobalListeners();

    // Focus first anchor link (interaction_focus_order contract)
    requestAnimationFrame(() => {
      const firstLink = this._panel.querySelector('a') as HTMLAnchorElement | null;
      firstLink?.focus();
    });
  }

  private _close(returnFocus = false): void {
    this._isOpen = false;
    this._trigger.setAttribute('aria-expanded', 'false');
    this._panel.classList.remove('is-open');
    this._removeGlobalListeners();

    // Use transitionend to hide, with a timeout fallback
    const onEnd = () => {
      this._panel.hidden = true;
      this._panel.removeEventListener('transitionend', onEnd);
    };
    this._panel.addEventListener('transitionend', onEnd);
    // Fallback if transitions are disabled (reduced motion) or event doesn't fire
    if (getComputedStyle(this._panel).transitionDuration === '0s') {
      this._panel.hidden = true;
    } else {
      this._hideTimeout = setTimeout(() => { if (!this._isOpen) { this._panel.hidden = true; this._panel.removeEventListener('transitionend', onEnd); } this._hideTimeout = null; }, 200);
    }

    if (returnFocus) {
      this._trigger.focus();
    }
  }

  // --- Dismiss handlers ---

  private _handleOutsideClick(e: MouseEvent): void {
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._close();
    }
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this._close(true);
    }
  }

  private _handleFocusOut = (e: Event): void => {
    // Tab-past-last-item dismiss: async check if focus left the panel
    requestAnimationFrame(() => {
      const active = this._shadowRoot.activeElement ?? document.activeElement;
      const stillInside = this._panel.contains(active as Node) || this._trigger === active;
      if (!stillInside && this._isOpen) {
        this._close();
      }
    });
  };

  // --- Global listener management ---

  private _addGlobalListeners(): void {
    document.addEventListener('click', this._outsideClickHandler, true);
    document.addEventListener('keydown', this._keydownHandler);
    this._shadowRoot.addEventListener('focusout', this._handleFocusOut);
  }

  private _removeGlobalListeners(): void {
    document.removeEventListener('click', this._outsideClickHandler, true);
    document.removeEventListener('keydown', this._keydownHandler);
    this._shadowRoot.removeEventListener('focusout', this._handleFocusOut);
  }

  // --- Render ---

  private static readonly ITEMS: Array<{ prefix: string; label: string; href: string }> = [
    { prefix: '//', label: 'Why build this system?', href: '#why-build' },
    { prefix: '//', label: 'What is this ecosystem?', href: '#ecosystem' },
    { prefix: '//', label: 'How was this system built?', href: '#how-built' },
    { prefix: '//', label: 'What makes this enterprise-grade?', href: '#enterprise' },
    { prefix: '//', label: 'Who built this system?', href: '#who-built' },
    { prefix: '//', label: 'What can I accomplish with your team?', href: '#cta' },
  ];

  private _render(): void {
    const items = NavAboutPopover.ITEMS.map(({ prefix, label, href }) => `
      <li>
        <a href="${href}" class="item">
          <span class="item__prefix" aria-hidden="true">${prefix}</span>
          <span class="item__label">${label}</span>
        </a>
       </li>
    `).join('');

    this._shadowRoot.innerHTML = `
      <style>
        :host { position: relative; display: inline-block; }

        /* Trigger button */
        [data-trigger] {
          all: unset;
          cursor: pointer;
          padding-block: var(--space-250);
          padding-inline: var(--space-inset-200);
          font-family: var(--font-family-display);
          font-size: var(--font-size-150);
          font-weight: var(--font-weight-700);
          line-height: var(--line-height-150);
          letter-spacing: var(--letter-spacing-100);
          color: var(--color-contrast-on-dark);
          opacity: var(--opacity-088);
          background: transparent;
          border-radius: 0;
          transition: opacity var(--duration-150) var(--easing-standard);
        }
        [data-trigger]:hover {
          opacity: 1;
          background: rgba(0, 0, 0, var(--blend-hover-darker, 0.08));
        }
        [data-trigger][aria-expanded="true"] {
          opacity: 1;
          background: var(--color-action-navigation-surface);
        }
        [data-trigger][aria-expanded="true"]:hover {
          opacity: 1;
          background: var(--color-action-navigation-surface);
        }

        /* Panel */
        [data-panel] {
          position: absolute;
          inset-block-start: 100%;
          inset-inline-end: 0;
          background: var(--color-action-navigation-surface);
          padding-block: var(--space-inset-200);
          z-index: var(--z-index-dropdown);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity var(--duration-150) ease-in,
                      transform var(--duration-150) ease-in;
          white-space: nowrap;
        }
        [data-panel].is-open {
          opacity: 1;
          transform: translateY(0);
          transition-timing-function: ease-out;
        }
        [data-panel][hidden] { display: none; }
        [data-panel] ol {
          margin: 0;
          padding: 0;
          list-style: none;
          position: relative;
        }

        /* Items */
        .item {
          display: flex;
          padding-block: var(--space-inset-100);
          padding-inline: var(--space-200) var(--space-300);
          font-family: var(--font-family-display);
          font-size: var(--font-size-200);
          font-weight: var(--font-weight-700);
          line-height: var(--line-height-200);
          letter-spacing: var(--letter-spacing-100);
          color: inherit;
          text-decoration: none;
          gap: var(--space-grouped-tight);
        }

        /* Prefix — fixed width for consistent label alignment */
        .item__prefix {
          display: inline-block;
          inline-size: var(--space-inset-300);
          flex-shrink: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          [data-panel] { transition: none; }
        }
      </style>
      <button data-trigger aria-expanded="false" aria-controls="${PANEL_ID}">
        <slot name="trigger"></slot>
      </button>
      <div data-panel id="${PANEL_ID}" role="navigation" aria-label="Page sections" hidden>
        <ol>
        ${items}
        </ol>
      </div>
    `;
  }
}

if (!customElements.get('nav-about-popover')) {
  customElements.define('nav-about-popover', NavAboutPopover);
}
