/**
 * Nav-Header-App — Web Implementation
 * Thin wrapper composing nav-header (Nav-Header-Base) with permissive slots.
 * @module Nav-Header-App/platforms/web
 */

/// <reference lib="dom" />

import '../../../Nav-Header-Base/platforms/web/NavHeaderBase.web'; // composes: nav-header-base
import styles from './NavHeaderApp.styles.css';

export class NavHeaderApp extends HTMLElement {
  private _shadowRoot: ShadowRoot;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    const style = document.createElement('style');
    style.textContent = styles;
    this._shadowRoot.appendChild(style);

    const header = document.createElement('nav-header') as HTMLElement;
    header.setAttribute('appearance', this.getAttribute('appearance') || 'opaque');
    header.setAttribute('show-separator', this.getAttribute('show-separator') ?? 'true');
    header.setAttribute('aria-label', 'Site navigation');
    if (this.getAttribute('test-id')) header.setAttribute('test-id', this.getAttribute('test-id')!);

    header.innerHTML = `
      <div slot="title" style="display:flex;align-items:center;justify-content:space-between;width:100%;max-width:var(--product-layout-content-max-width);margin-inline:auto;">
        <slot name="leading"></slot>
        <slot name="trailing"></slot>
      </div>
    `;

    this._shadowRoot.appendChild(header);
  }
}

if (!customElements.get('nav-header-app')) {
  customElements.define('nav-header-app', NavHeaderApp);
}
