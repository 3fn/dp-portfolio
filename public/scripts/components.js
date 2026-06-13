// src/components/core/Nav-Header-Base/platforms/web/NavHeaderBase.styles.css
var NavHeaderBase_styles_default = "/**\n * Nav-Header-Base Styles for Web Platform\n *\n * Token-based styling using CSS custom properties. All values reference\n * semantic or primitive tokens.\n *\n * Stemma System: Navigation Family, Primitive (Base)\n *\n * @see .kiro/specs/088-top-bar-component/design.md\n * @see contracts: visual_background, visual_translucent, visual_separator,\n *      layout_three_regions, accessibility_aria_roles\n */\n\n/* ==========================================================================\n   Host \u2014 Fixed top bar\n   ========================================================================== */\n\n:host {\n  display: block;\n  position: sticky;\n  inset-block-start: 0;\n  z-index: 1000;\n}\n\n/* ==========================================================================\n   Container (header landmark)\n   ========================================================================== */\n\n.nav-header {\n  display: flex;\n  align-items: center;\n  min-block-size: var(--tap-area-recommended);\n  background-color: var(--color-structure-canvas);\n}\n\n.nav-header--translucent {\n  background-color: transparent;\n  backdrop-filter: blur(var(--blur-100));\n  -webkit-backdrop-filter: blur(var(--blur-100));\n}\n\n/* ==========================================================================\n   Separator\n   ========================================================================== */\n\n.nav-header__separator {\n  position: absolute;\n  inset-block-end: 0;\n  inset-inline: 0;\n  block-size: var(--border-width-100);\n  background-color: var(--color-structure-border-subtle);\n}\n\n/* ==========================================================================\n   Layout Regions\n   ========================================================================== */\n\n.nav-header__leading {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n\n.nav-header__title {\n  display: flex;\n  align-items: center;\n  flex: 1;\n  min-inline-size: 0;\n}\n\n.nav-header__trailing {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n";

// src/components/core/Nav-Header-Base/platforms/web/NavHeaderBase.web.ts
var OBSERVED_ATTRIBUTES = [
  "appearance",
  "show-separator",
  "test-id"
];
var NavHeaderBase = class extends HTMLElement {
  _shadowRoot;
  _domCreated = false;
  // --- Lifecycle ---
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    if (!this._domCreated) {
      this._createDOM();
      this._domCreated = true;
    }
    this._updateAppearance();
    this._updateSeparator();
  }
  static get observedAttributes() {
    return OBSERVED_ATTRIBUTES;
  }
  attributeChangedCallback(_name) {
    if (!this._domCreated) return;
    this._updateAppearance();
    this._updateSeparator();
  }
  // --- DOM Creation ---
  _createDOM() {
    const style = document.createElement("style");
    style.textContent = NavHeaderBase_styles_default;
    const header = document.createElement("header");
    header.setAttribute("role", "banner");
    header.classList.add("nav-header");
    if (this.getAttribute("test-id")) {
      header.setAttribute("data-testid", this.getAttribute("test-id"));
    }
    const leading = document.createElement("div");
    leading.classList.add("nav-header__leading");
    leading.innerHTML = '<slot name="leading"></slot>';
    const title = document.createElement("div");
    title.classList.add("nav-header__title");
    title.innerHTML = '<slot name="title"></slot>';
    const trailing = document.createElement("div");
    trailing.classList.add("nav-header__trailing");
    trailing.innerHTML = '<slot name="trailing"></slot>';
    header.appendChild(leading);
    header.appendChild(title);
    header.appendChild(trailing);
    const separator = document.createElement("div");
    separator.classList.add("nav-header__separator");
    separator.setAttribute("aria-hidden", "true");
    header.appendChild(separator);
    this._shadowRoot.appendChild(style);
    this._shadowRoot.appendChild(header);
  }
  // --- Updates ---
  _updateAppearance() {
    const header = this._shadowRoot.querySelector(".nav-header");
    if (!header) return;
    const translucent = this.getAttribute("appearance") === "translucent";
    header.classList.toggle("nav-header--translucent", translucent);
  }
  _updateSeparator() {
    const separator = this._shadowRoot.querySelector(".nav-header__separator");
    if (!separator) return;
    const show = this.getAttribute("show-separator") !== "false";
    separator.style.display = show ? "block" : "none";
  }
};
if (!customElements.get("nav-header")) {
  customElements.define("nav-header", NavHeaderBase);
}

// src/components/core/Nav-Header-App/platforms/web/NavHeaderApp.web.ts
var NavHeaderApp = class extends HTMLElement {
  _shadowRoot;
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const header = document.createElement("nav-header");
    header.setAttribute("appearance", this.getAttribute("appearance") || "opaque");
    header.setAttribute("show-separator", this.getAttribute("show-separator") ?? "true");
    if (this.getAttribute("test-id")) header.setAttribute("test-id", this.getAttribute("test-id"));
    header.innerHTML = `
      <slot name="leading" slot="leading"></slot>
      <slot name="center" slot="title"></slot>
      <slot name="trailing" slot="trailing"></slot>
    `;
    this._shadowRoot.appendChild(header);
  }
};
if (!customElements.get("nav-header-app")) {
  customElements.define("nav-header-app", NavHeaderApp);
}

// node_modules/@3fn/core/src/blend/ColorSpaceUtils.ts
function rgbToHsl(rgb) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / delta + 2) / 6;
        break;
      case b:
        h = ((r - g) / delta + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Number(s.toFixed(4)),
    l: Number(l.toFixed(4))
  };
}
function hslToRgb(hsl) {
  const h = hsl.h / 360;
  const s = hsl.s;
  const l = hsl.l;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p2, q2, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
      if (t < 1 / 2) return q2;
      if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
      return p2;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
function hexToRgb(hex) {
  const rgbaMatch = hex.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbaMatch) {
    return { r: parseInt(rgbaMatch[1]), g: parseInt(rgbaMatch[2]), b: parseInt(rgbaMatch[3]) };
  }
  const cleanHex = hex.replace(/^#/, "");
  if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const fullHex = cleanHex.length === 3 ? cleanHex.split("").map((char) => char + char).join("") : cleanHex;
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);
  return { r, g, b };
}
function rgbToHex(rgb) {
  const toHex = (value) => {
    const hex = Math.round(Math.max(0, Math.min(255, value))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
}
function calculateDarkerBlend(baseColor, blendValue) {
  const black = { r: 0, g: 0, b: 0 };
  const r = baseColor.r * (1 - blendValue) + black.r * blendValue;
  const g = baseColor.g * (1 - blendValue) + black.g * blendValue;
  const b = baseColor.b * (1 - blendValue) + black.b * blendValue;
  return {
    r: Math.round(Math.max(0, Math.min(255, r))),
    g: Math.round(Math.max(0, Math.min(255, g))),
    b: Math.round(Math.max(0, Math.min(255, b)))
  };
}
function calculateLighterBlend(baseColor, blendValue) {
  const white = { r: 255, g: 255, b: 255 };
  const r = baseColor.r * (1 - blendValue) + white.r * blendValue;
  const g = baseColor.g * (1 - blendValue) + white.g * blendValue;
  const b = baseColor.b * (1 - blendValue) + white.b * blendValue;
  return {
    r: Math.round(Math.max(0, Math.min(255, r))),
    g: Math.round(Math.max(0, Math.min(255, g))),
    b: Math.round(Math.max(0, Math.min(255, b)))
  };
}
function calculateSaturateBlend(baseColor, blendValue) {
  const hsl = rgbToHsl(baseColor);
  hsl.s = Math.max(0, Math.min(1, hsl.s + blendValue));
  return hslToRgb(hsl);
}
function calculateDesaturateBlend(baseColor, blendValue) {
  const hsl = rgbToHsl(baseColor);
  hsl.s = Math.max(0, Math.min(1, hsl.s - blendValue));
  return hslToRgb(hsl);
}

// node_modules/@3fn/core/src/tokens/BlendTokens.ts
var BLEND_BASE_VALUE = 0.04;
function generateBlendPlatformValues(baseValue) {
  return {
    web: { value: baseValue, unit: "unitless" },
    ios: { value: baseValue, unit: "unitless" },
    android: { value: baseValue, unit: "unitless" }
  };
}
var blendTokens = {
  blend100: {
    name: "blend100",
    category: "blend" /* BLEND */,
    baseValue: BLEND_BASE_VALUE,
    familyBaseValue: BLEND_BASE_VALUE,
    description: "Subtle modification - gentle feedback, container hover",
    mathematicalRelationship: "base \xD7 1 = 0.04 \xD7 1 = 0.04",
    baselineGridAlignment: false,
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateBlendPlatformValues(BLEND_BASE_VALUE)
  },
  blend200: {
    name: "blend200",
    category: "blend" /* BLEND */,
    baseValue: BLEND_BASE_VALUE * 2,
    familyBaseValue: BLEND_BASE_VALUE,
    description: "Standard modification - noticeable feedback, button hover",
    mathematicalRelationship: "base \xD7 2 = 0.04 \xD7 2 = 0.08",
    baselineGridAlignment: false,
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateBlendPlatformValues(BLEND_BASE_VALUE * 2)
  },
  blend300: {
    name: "blend300",
    category: "blend" /* BLEND */,
    baseValue: BLEND_BASE_VALUE * 3,
    familyBaseValue: BLEND_BASE_VALUE,
    description: "Strong modification - clear feedback, pressed state",
    mathematicalRelationship: "base \xD7 3 = 0.04 \xD7 3 = 0.12",
    baselineGridAlignment: false,
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateBlendPlatformValues(BLEND_BASE_VALUE * 3)
  },
  blend400: {
    name: "blend400",
    category: "blend" /* BLEND */,
    baseValue: BLEND_BASE_VALUE * 4,
    familyBaseValue: BLEND_BASE_VALUE,
    description: "Very strong modification - emphasized feedback",
    mathematicalRelationship: "base \xD7 4 = 0.04 \xD7 4 = 0.16",
    baselineGridAlignment: false,
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateBlendPlatformValues(BLEND_BASE_VALUE * 4)
  },
  blend500: {
    name: "blend500",
    category: "blend" /* BLEND */,
    baseValue: BLEND_BASE_VALUE * 5,
    familyBaseValue: BLEND_BASE_VALUE,
    description: "Maximum modification - dramatic feedback",
    mathematicalRelationship: "base \xD7 5 = 0.04 \xD7 5 = 0.20",
    baselineGridAlignment: false,
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateBlendPlatformValues(BLEND_BASE_VALUE * 5)
  }
};
var blendTokenNames = Object.keys(blendTokens);

// node_modules/@3fn/core/src/blend/ThemeAwareBlendUtilities.web.ts
var BlendTokenValues = {
  /** Hover state darkening - blend200 (8%) */
  hoverDarker: 0.08,
  /** Pressed state darkening - blend300 (12%) */
  pressedDarker: 0.12,
  /** Focus state saturation increase - blend200 (8%) */
  focusSaturate: 0.08,
  /** Disabled state desaturation - blend300 (12%) */
  disabledDesaturate: 0.12,
  /** Icon optical balance lightening - blend200 (8%) */
  iconLighter: 0.08
};
function darkerBlend(color, amount) {
  try {
    const rgb = hexToRgb(color);
    const blended = calculateDarkerBlend(rgb, amount);
    return rgbToHex(blended);
  } catch {
    return color;
  }
}
function lighterBlend(color, amount) {
  try {
    const rgb = hexToRgb(color);
    const blended = calculateLighterBlend(rgb, amount);
    return rgbToHex(blended);
  } catch {
    return color;
  }
}
function saturate(color, amount) {
  try {
    const rgb = hexToRgb(color);
    const blended = calculateSaturateBlend(rgb, amount);
    return rgbToHex(blended);
  } catch {
    return color;
  }
}
function desaturate(color, amount) {
  try {
    const rgb = hexToRgb(color);
    const blended = calculateDesaturateBlend(rgb, amount);
    return rgbToHex(blended);
  } catch {
    return color;
  }
}
function createBlendUtilities() {
  return {
    // Semantic convenience functions using blend token values
    hoverColor: (baseColor) => darkerBlend(baseColor, BlendTokenValues.hoverDarker),
    pressedColor: (baseColor) => darkerBlend(baseColor, BlendTokenValues.pressedDarker),
    focusColor: (baseColor) => saturate(baseColor, BlendTokenValues.focusSaturate),
    disabledColor: (baseColor) => desaturate(baseColor, BlendTokenValues.disabledDesaturate),
    iconColor: (baseColor) => lighterBlend(baseColor, BlendTokenValues.iconLighter),
    // Generic blend functions for custom usage
    darkerBlend,
    lighterBlend,
    saturate,
    desaturate
  };
}
function getBlendUtilities() {
  return createBlendUtilities();
}

// src/components/core/Icon-Base/platforms/web/IconBase.web.ts
var blendUtils = getBlendUtilities();
function loadIconSVG(name) {
  const iconContent = {
    "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>',
    "arrow-left": '<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>',
    "arrow-up": '<line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>',
    "arrow-down": '<line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline>',
    "chevron-right": '<polyline points="9 18 15 12 9 6"></polyline>',
    "chevron-left": '<polyline points="15 18 9 12 15 6"></polyline>',
    "chevron-down": '<polyline points="6 9 12 15 18 9"></polyline>',
    "external-link": '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>',
    "check": '<polyline points="20 6 9 17 4 12"></polyline>',
    "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
    "x": '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',
    "x-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',
    "plus": '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>',
    "minus": '<line x1="5" y1="12" x2="19" y2="12"></line>',
    "save": '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>',
    "search": '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',
    "filter": '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>',
    "refresh-cw": '<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>',
    "share": '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line>',
    "share-2": '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>',
    "more-horizontal": '<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>',
    "more-vertical": '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>',
    "info": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
    "alert-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
    "shield": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
    "eye": '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>',
    "eye-off": '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>',
    "circle": '<circle cx="12" cy="12" r="10"></circle>',
    "heart": '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
    "star": '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',
    "smile": '<circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>',
    "bell": '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>',
    "user": '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
    "users": '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
    "user-check": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>',
    "user-x": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line>',
    "settings": '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
    "mail": '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',
    "calendar": '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
    "clock": '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
    "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
    "smartphone": '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',
    "globe": '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
    "map-pin": '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',
    "briefcase": '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
    "credit-card": '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>',
    "dollar-sign": '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
    "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
    "award": '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>',
    "trending-up": '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
    "wifi": '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>'
  };
  return iconContent[name] || iconContent["circle"];
}
var IconBaseElement = class extends HTMLElement {
  _shadowRoot;
  /**
   * Observed attributes for automatic re-rendering on change.
   */
  static get observedAttributes() {
    return ["name", "size", "color", "test-id", "optical-balance"];
  }
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }
  /**
   * Called when the element is added to the DOM.
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Called when an observed attribute changes.
   * 
   * @param _name - Attribute name (unused, prefixed with underscore)
   * @param oldValue - Previous attribute value
   * @param newValue - New attribute value
   */
  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }
  // Property getters/setters
  get name() {
    return this.getAttribute("name") || "circle";
  }
  set name(value) {
    this.setAttribute("name", value);
  }
  get size() {
    const sizeAttr = this.getAttribute("size");
    if (!sizeAttr) {
      throw new Error(
        `Missing required "size" attribute on <icon-base>. Valid sizes are: 13, 18, 24, 28, 32, 36, 40, 44, 48.`
      );
    }
    const size = parseInt(sizeAttr, 10);
    const validSizes = [13, 20, 24, 28, 32, 36, 40, 44, 48];
    if (!validSizes.includes(size)) {
      throw new Error(
        `Invalid icon size: ${size}. Valid sizes are: ${validSizes.join(", ")}. Ensure you're using a valid IconBaseSize value.`
      );
    }
    return size;
  }
  set size(value) {
    this.setAttribute("size", value.toString());
  }
  get color() {
    return this.getAttribute("color") || "inherit";
  }
  set color(value) {
    this.setAttribute("color", value);
  }
  get testID() {
    return this.getAttribute("test-id");
  }
  set testID(value) {
    if (value) {
      this.setAttribute("test-id", value);
    } else {
      this.removeAttribute("test-id");
    }
  }
  /**
   * Get the optical balance state.
   * 
   * When true, applies lighterBlend to the color for optical weight compensation.
   */
  get opticalBalance() {
    return this.getAttribute("optical-balance") === "true";
  }
  /**
   * Set the optical balance state.
   */
  set opticalBalance(value) {
    if (value) {
      this.setAttribute("optical-balance", "true");
    } else {
      this.removeAttribute("optical-balance");
    }
  }
  /**
   * Render the component into shadow DOM.
   * 
   * Generates SVG markup with currentColor inheritance and injects it into
   * the shadow DOM. The SVG uses CSS classes for token-based sizing
   * and CSS custom properties for token-based color and stroke width.
   */
  render() {
    const name = this.name;
    const size = this.size;
    const color = this.color;
    const testID = this.testID;
    const opticalBalance = this.opticalBalance;
    const svgContent = loadIconSVG(name);
    const sizeClassMap = {
      13: "icon-base--size-050",
      20: "icon-base--size-075",
      24: "icon-base--size-100",
      28: "icon-base--size-125",
      // Note: size125 and size150 both = 28px
      32: "icon-base--size-200",
      // Note: size125, size200, size300 all = 32px
      36: "icon-base--size-400",
      40: "icon-base--size-500",
      44: "icon-base--size-600",
      48: "icon-base--size-700"
    };
    const sizeClass = sizeClassMap[size];
    let strokeColor;
    if (color === "inherit") {
      strokeColor = "currentColor";
    } else if (opticalBalance && color.startsWith("#")) {
      strokeColor = blendUtils.iconColor(color);
    } else if (color.startsWith("#")) {
      strokeColor = color;
    } else {
      strokeColor = `var(--${color})`;
    }
    const strokeWidth = "var(--icon-stroke-width)";
    const testIDAttr = testID ? ` data-testid="${testID}"` : "";
    const styles = `
      <style>
        .icon-base {
          display: inline-block;
          vertical-align: middle;
          flex-shrink: 0;
          color: inherit;
        }
        
        .icon-base--size-050 { width: var(--icon-size-050); height: var(--icon-size-050); }
        .icon-base--size-075 { width: var(--icon-size-075); height: var(--icon-size-075); }
        .icon-base--size-100 { width: var(--icon-size-100); height: var(--icon-size-100); }
        .icon-base--size-125 { width: var(--icon-size-125); height: var(--icon-size-125); }
        .icon-base--size-150 { width: var(--icon-size-150); height: var(--icon-size-150); }
        .icon-base--size-200 { width: var(--icon-size-200); height: var(--icon-size-200); }
        .icon-base--size-300 { width: var(--icon-size-300); height: var(--icon-size-300); }
        .icon-base--size-400 { width: var(--icon-size-400); height: var(--icon-size-400); }
        .icon-base--size-500 { width: var(--icon-size-500); height: var(--icon-size-500); }
        .icon-base--size-600 { width: var(--icon-size-600); height: var(--icon-size-600); }
        .icon-base--size-700 { width: var(--icon-size-700); height: var(--icon-size-700); }
        
        @media print {
          .icon-base { color: var(--color-print-default) !important; }
        }
        
        @media (prefers-contrast: high) {
          .icon-base { stroke: currentColor !important; }
        }
      </style>
    `;
    this._shadowRoot.innerHTML = `
      ${styles}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="${strokeColor}"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon-base ${sizeClass} icon-base-${name}"
        aria-hidden="true"${testIDAttr}
      >
        ${svgContent}
      </svg>
    `;
  }
};
if (!customElements.get("icon-base")) {
  customElements.define("icon-base", IconBaseElement);
}

// src/components/core/Icon-Base/types.ts
var iconBaseSizes = {
  size050: 13,
  // icon.size050 - caption, legal, labelXs
  size075: 20,
  // icon.size075 - bodySm, buttonSm, labelSm (14px × 1.429 = 20px)
  size100: 24,
  // icon.size100 - bodyMd, buttonMd, labelMd, input (standard)
  size125: 32,
  // icon.size125 - bodyLg, buttonLg, labelLg
  size150: 28,
  // icon.size150 - h6
  size200: 32,
  // icon.size200 - h5
  size300: 32,
  // icon.size300 - h4
  size400: 36,
  // icon.size400 - h3
  size500: 40,
  // icon.size500 - h2
  size600: 44,
  // icon.size600 - h1
  size700: 48
  // icon.size700 - display
};

// src/components/core/Button-CTA/platforms/web/ButtonCTA.web.css
var ButtonCTA_web_default = "/**\n * Button-CTA Component Styles for Web Platform\n * \n * Token-based styling using CSS custom properties from the mathematical token system.\n * All values reference semantic or primitive tokens - zero hard-coded values.\n * \n * Stemma System Naming: [Family]-[Type] = Button-CTA\n * Component Type: Standalone (no behavioral variants)\n * \n * @module Button-CTA/platforms/web/styles\n */\n\n/* ==========================================================================\n   Base Button Styles\n   ========================================================================== */\n\n/**\n * Base button element styling.\n * \n * - Flexbox layout for icon-text composition\n * - Token-based typography, spacing, and colors\n * - Semantic button element with proper cursor\n * - Smooth transitions for interaction states\n */\n.button-cta {\n  /* Layout */\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-grouped-normal); /* Default icon-text spacing: 8px */\n  \n  /* Typography - Default to medium size (labelMd for UI controls) */\n  font-family: var(--typography-label-md-font-family);\n  font-size: var(--typography-label-md-font-size);\n  font-weight: var(--typography-label-md-font-weight);\n  line-height: var(--typography-label-md-line-height);\n  letter-spacing: var(--typography-label-md-letter-spacing);\n  \n  /* Text alignment */\n  text-align: center;\n  text-decoration: none;\n  \n  /* Interaction */\n  cursor: pointer;\n  user-select: none;\n  \n  /* Transitions - Uses motion.buttonPress semantic token for consistent button feedback */\n  /* @see Requirements: 3.1, 3.3, 3.4 - Semantic motion token usage */\n  transition: background-color var(--motion-button-press-duration) var(--motion-button-press-easing),\n              border-color var(--motion-button-press-duration) var(--motion-button-press-easing),\n              color var(--motion-button-press-duration) var(--motion-button-press-easing),\n              opacity var(--motion-button-press-duration) var(--motion-button-press-easing),\n              box-shadow var(--motion-button-press-duration) var(--motion-button-press-easing);\n  \n  /* Remove default button styles */\n  border: none;\n  outline: none;\n  background: none;\n  \n  /* Ensure button doesn't shrink in flex containers */\n  flex-shrink: 0;\n}\n\n/* ==========================================================================\n   Size Variants\n   ========================================================================== */\n\n/**\n * Small button (40px calculated height)\n * \n * - Min height: tapAreaMinimum (44px) for accessibility\n * - Calculated height: ~40px (padding + lineHeight)\n * - Horizontal padding: space.inset.200 (16px)\n * - Vertical padding: space.inset.100 (8px)\n * - Border radius: radius100 (8px)\n * - Typography: typography.labelMd (medium weight for UI controls)\n * - Icon size: icon.size100 (24px)\n * - Icon spacing: space.grouped.tight (4px)\n * - Min width: buttonCTA.minWidth.small (56px)\n */\n.button-cta--small {\n  min-height: var(--tap-area-minimum); /* 44px for accessibility */\n  min-width: 56px; /* buttonCTA.minWidth.small */\n  padding: var(--space-inset-100) var(--space-inset-200); /* 8px 16px */\n  border-radius: var(--radius-100); /* 8px */\n  gap: var(--space-grouped-tight); /* 4px for icon-text spacing */\n  \n  /* Typography: labelMd (medium weight for UI controls) */\n  font-family: var(--typography-label-md-font-family);\n  font-size: var(--typography-label-md-font-size);\n  font-weight: var(--typography-label-md-font-weight);\n  line-height: var(--typography-label-md-line-height);\n  letter-spacing: var(--typography-label-md-letter-spacing);\n}\n\n/**\n * Medium button (48px calculated height) - Default size\n * \n * - Min height: tapAreaRecommended (48px) for better usability\n * - Calculated height: ~48px (padding + lineHeight)\n * - Horizontal padding: space.inset.300 (24px)\n * - Vertical padding: space.inset.150 (12px)\n * - Border radius: radius150 (12px)\n * - Typography: typography.labelMd (medium weight for UI controls)\n * - Icon size: icon.size100 (24px)\n * - Icon spacing: space.grouped.normal (8px)\n * - Min width: buttonCTA.minWidth.medium (72px)\n */\n.button-cta--medium {\n  min-height: var(--tap-area-recommended); /* 48px for better usability */\n  min-width: 72px; /* buttonCTA.minWidth.medium */\n  padding: var(--space-inset-150) var(--space-inset-300); /* 12px 24px */\n  border-radius: var(--radius-150); /* 12px */\n  gap: var(--space-grouped-normal); /* 8px for icon-text spacing */\n  \n  /* Typography: labelMd (medium weight for UI controls) */\n  font-family: var(--typography-label-md-font-family);\n  font-size: var(--typography-label-md-font-size);\n  font-weight: var(--typography-label-md-font-weight);\n  line-height: var(--typography-label-md-line-height);\n  letter-spacing: var(--typography-label-md-letter-spacing);\n}\n\n/**\n * Large button (56px calculated height)\n * \n * - Min height: tapAreaComfortable (56px) for comfortable interaction\n * - Calculated height: ~56px (padding + lineHeight)\n * - Horizontal padding: space.inset.400 (32px)\n * - Vertical padding: space.inset.150 (12px)\n * - Border radius: radius200 (16px)\n * - Typography: typography.labelLg (medium weight for UI controls)\n * - Icon size: icon.size125 (32px)\n * - Icon spacing: space.grouped.normal (8px)\n * - Min width: buttonCTA.minWidth.large (80px)\n */\n.button-cta--large {\n  min-height: var(--tap-area-comfortable); /* 56px for comfortable interaction */\n  min-width: 80px; /* buttonCTA.minWidth.large */\n  padding: var(--space-inset-150) var(--space-inset-400); /* 12px 32px */\n  border-radius: var(--radius-200); /* 16px */\n  gap: var(--space-grouped-normal); /* 8px for icon-text spacing */\n  \n  /* Typography: labelLg (medium weight for UI controls) */\n  font-family: var(--typography-label-lg-font-family);\n  font-size: var(--typography-label-lg-font-size);\n  font-weight: var(--typography-label-lg-font-weight);\n  line-height: var(--typography-label-lg-line-height);\n  letter-spacing: var(--typography-label-lg-letter-spacing);\n}\n\n/* ==========================================================================\n   Style Variants\n   ========================================================================== */\n\n/**\n * Primary button style (filled background)\n * \n * - Background: color.action.primary\n * - Text: color.contrast.onAction (black500 Standard / white100 WCAG)\n * - Border: none\n * - Highest visual emphasis\n */\n.button-cta--primary {\n  background-color: var(--color-action-primary);\n  color: var(--color-contrast-on-action);\n  border: none;\n}\n\n/**\n * Secondary button style (outlined)\n * \n * - Background: color.background\n * - Text: color.action.primary\n * - Border: border.borderDefault solid color.action.primary\n * - Medium visual emphasis\n */\n.button-cta--secondary {\n  background-color: var(--color-structure-canvas);\n  color: var(--color-action-primary);\n  border: var(--border-default) solid var(--color-action-primary);\n}\n\n/**\n * Tertiary button style (text-only)\n * \n * - Background: transparent\n * - Text: color.action.primary\n * - Border: none\n * - Lowest visual emphasis\n */\n.button-cta--tertiary {\n  background-color: transparent;\n  color: var(--color-action-primary);\n  border: none;\n}\n\n/* ==========================================================================\n   Icon Styling\n   ========================================================================== */\n\n/**\n * Icon container styling.\n * \n * - Flexbox for centering\n * - Inherits color from button\n * - Marked as decorative (aria-hidden)\n */\n.button-cta__icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  color: inherit;\n}\n\n/**\n * Icon optical balance for secondary and tertiary buttons.\n * \n * Icons appear heavier than text at the same color due to stroke density.\n * Uses blend utility calculated color (lighterBlend with blend.iconLighter)\n * instead of filter workaround for cross-platform consistency.\n * \n * The --_cta-icon-optical custom property is set by the component\n * using lighterBlend(color.primary, blend.iconLighter) = 8% lighter.\n */\n.button-cta--secondary .button-cta__icon,\n.button-cta--tertiary .button-cta__icon {\n  color: var(--_cta-icon-optical);\n}\n\n/* ==========================================================================\n   Text Label Styling\n   ========================================================================== */\n\n/**\n * Text label with default wrapping behavior.\n * \n * - Allows multi-line text (accessibility-first)\n * - Button height grows to accommodate wrapped text\n * - Maintains minimum height for all text lengths\n */\n.button-cta__label {\n  display: inline-block;\n  white-space: normal;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n}\n\n/**\n * Text label with no-wrap behavior (opt-in).\n * \n * - Single-line text with ellipsis truncation\n * - Use for constrained spaces (toolbars, navigation)\n * - Accessibility trade-off: may hide content\n */\n.button-cta__label--no-wrap {\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n}\n\n/* ==========================================================================\n   Interaction States\n   ========================================================================== */\n\n/**\n * Hover state (web only).\n * \n * Uses blend utility calculated color (darkerBlend with blend.hoverDarker)\n * instead of opacity workaround for cross-platform consistency.\n * \n * The --_cta-hover-bg custom property is set by the component\n * using darkerBlend(color.primary, blend.hoverDarker) = 8% darker.\n */\n.button-cta--primary:hover:not(:disabled) {\n  background-color: var(--_cta-hover-bg);\n}\n\n/**\n * Pressed/Active state.\n * \n * Uses blend utility calculated color (darkerBlend with blend.pressedDarker)\n * instead of opacity workaround for cross-platform consistency.\n * \n * The --_cta-pressed-bg custom property is set by the component\n * using darkerBlend(color.primary, blend.pressedDarker) = 12% darker.\n */\n.button-cta--primary:active:not(:disabled) {\n  background-color: var(--_cta-pressed-bg);\n}\n\n/**\n * Focus state (keyboard navigation only).\n * \n * - Uses :focus-visible for keyboard-only focus indicators\n * - Outline: accessibility.focus.width (2px)\n * - Color: accessibility.focus.color (primary)\n * - Offset: accessibility.focus.offset (2px)\n * - Shadow: shadow.hover for elevation\n * - Meets WCAG 2.1 AA contrast requirements (3:1 minimum)\n */\n.button-cta:focus-visible {\n  outline: var(--accessibility-focus-width) solid var(--accessibility-focus-color);\n  outline-offset: var(--accessibility-focus-offset);\n  box-shadow: var(--shadow-hover);\n}\n\n/**\n * Remove focus outline on mouse click.\n * \n * :focus-visible handles this automatically in modern browsers,\n * but this provides fallback for older browsers.\n */\n.button-cta:focus:not(:focus-visible) {\n  outline: none;\n}\n\n/**\n * Disabled state.\n * \n * Uses blend utility calculated color (desaturate with blend.disabledDesaturate)\n * instead of opacity workaround for cross-platform consistency.\n * \n * The --button-disabled-color custom property is set by the component\n * using desaturate(color.primary, blend.disabledDesaturate) = 12% less saturated.\n * \n * - Cursor changes to not-allowed\n * - Prevents interaction\n * - Maintains color contrast for accessibility\n */\n.button-cta:disabled,\n.button-cta--disabled {\n  cursor: not-allowed;\n  pointer-events: none;\n}\n\n.button-cta--primary:disabled,\n.button-cta--primary.button-cta--disabled {\n  background-color: var(--_cta-disabled-bg);\n}\n\n/* ==========================================================================\n   Responsive Behavior\n   ========================================================================== */\n\n/**\n * Ensure buttons adapt to container width when needed.\n * \n * By default, buttons are inline-flex and size to content.\n * For full-width buttons, apply width: 100% via utility class or inline style.\n */\n.button-cta--full-width {\n  width: 100%;\n}\n\n/* ==========================================================================\n   Print Styles\n   ========================================================================== */\n\n/**\n * Optimize button appearance for print.\n * \n * - Remove interactive states\n * - Ensure text is visible\n * - Simplify visual styling\n * - Use color.print.default token for print media\n */\n@media print {\n  .button-cta {\n    background-color: transparent !important;\n    color: var(--color-print-default) !important;\n    border: var(--border-default) solid var(--color-print-default) !important;\n    box-shadow: none !important;\n  }\n  \n  .button-cta__icon {\n    display: none;\n  }\n}\n\n/* ==========================================================================\n   High Contrast Mode Support\n   ========================================================================== */\n\n/**\n * Ensure buttons remain visible in Windows High Contrast Mode.\n * \n * - Force borders for all button styles\n * - Ensure focus indicators are visible\n * - Use border.borderEmphasis (2px) and border.borderHeavy (4px) tokens\n */\n@media (prefers-contrast: high) {\n  .button-cta {\n    border: var(--border-emphasis) solid currentColor; /* 2px */\n  }\n  \n  .button-cta:focus-visible {\n    outline-width: var(--border-heavy); /* 4px */\n  }\n}\n\n/* ==========================================================================\n   Reduced Motion Support\n   ========================================================================== */\n\n/**\n * Respect user preference for reduced motion.\n * \n * - Remove transitions and animations\n * - Maintain functionality without motion\n */\n@media (prefers-reduced-motion: reduce) {\n  .button-cta {\n    transition: none;\n  }\n}\n";

// src/components/core/Button-CTA/platforms/web/ButtonCTA.web.ts
function getIconSizeForButton(buttonSize) {
  let iconSize;
  switch (buttonSize) {
    case "small":
    case "medium":
      iconSize = iconBaseSizes.size100;
      if (!iconSize) {
        throw new Error("ButtonCTA: iconBaseSizes.size100 token is missing");
      }
      break;
    case "large":
      iconSize = iconBaseSizes.size125;
      if (!iconSize) {
        throw new Error("ButtonCTA: iconBaseSizes.size125 token is missing");
      }
      break;
    default:
      throw new Error(`ButtonCTA: Invalid button size "${buttonSize}"`);
  }
  return iconSize;
}
var ButtonCTA = class extends HTMLElement {
  _shadowRoot;
  // Incremental DOM update tracking
  // @see Requirements: 2.1, 2.2, 2.3, 2.4, 2.5 - Incremental DOM update strategy
  _domCreated = false;
  // Cached DOM element references for incremental updates
  // @see Requirements: 2.4 - Cache references to DOM elements that will be updated
  _button = null;
  _labelEl = null;
  _iconEl = null;
  _iconContainer = null;
  // Theme-aware blend utilities instance
  // Uses getBlendUtilities() factory for consistent state styling
  // @see Requirements: 11.1, 11.2, 11.3 - Theme-aware utilities
  _blendUtils;
  // Cached blend colors for state styling
  _hoverColor = "";
  _pressedColor = "";
  _disabledColor = "";
  _iconColor = "";
  _iconOpticalBalanceColor = "";
  /**
   * Observed attributes for automatic re-rendering on change.
   * 
   * When these attributes change, attributeChangedCallback is invoked.
   */
  static get observedAttributes() {
    return ["label", "size", "variant", "icon", "no-wrap", "disabled", "test-id"];
  }
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._blendUtils = getBlendUtilities();
  }
  /**
   * Called when the element is added to the DOM.
   * 
   * Performs initial render and sets up event listeners.
   * Calculates blend colors from CSS custom properties.
   * 
   * Defers blend color calculation until document is ready to ensure
   * CSS custom properties are available from parsed stylesheets.
   */
  connectedCallback() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this._calculateBlendColorsWithRetry();
        this.render();
      }, { once: true });
    } else {
      this._calculateBlendColorsWithRetry();
      this.render();
    }
    this._attachEventListeners();
  }
  /**
   * Calculate blend colors with retry logic for CSS loading race conditions.
   * 
   * Uses requestAnimationFrame to ensure CSS is fully applied before reading
   * custom properties. Falls back to default colors if tokens are still unavailable.
   */
  _calculateBlendColorsWithRetry() {
    try {
      this._calculateBlendColors();
    } catch (error) {
      requestAnimationFrame(() => {
        try {
          this._calculateBlendColors();
          this.render();
        } catch (retryError) {
          console.warn("ButtonCTA: Could not calculate blend colors, using CSS fallbacks", retryError);
        }
      });
    }
  }
  /**
   * Calculate blend colors from CSS custom properties.
   * 
   * Reads base colors from CSS custom properties and applies theme-aware blend
   * utilities to generate state colors (hover, pressed, disabled, icon).
   * 
   * Uses getBlendUtilities() factory functions instead of direct blend calculations
   * for cross-platform consistency with iOS and Android implementations.
   * 
   * State color mappings:
   * - Hover: darkerBlend(color.action.primary, blend.hoverDarker) - 8% darker
   * - Pressed: darkerBlend(color.action.primary, blend.pressedDarker) - 12% darker
   * - Disabled: desaturate(color.action.primary, blend.disabledDesaturate) - 12% less saturated
   * - Icon: lighterBlend(color.contrast.onAction, blend.iconLighter) - 8% lighter
   * 
   * @see Requirements: 7.1, 7.2, 7.3, 7.4 - Button-CTA state colors
   * @see Requirements: 11.1, 11.2, 11.3 - Theme-aware utilities
   * @throws Error if required color tokens are missing from CSS custom properties
   */
  _calculateBlendColors() {
    const computedStyle = getComputedStyle(document.documentElement);
    const primaryColor = computedStyle.getPropertyValue("--color-action-primary").trim();
    const onActionColor = computedStyle.getPropertyValue("--color-contrast-on-action").trim();
    if (!primaryColor) {
      throw new Error("ButtonCTA: Required token --color-action-primary is missing from CSS custom properties");
    }
    if (!onActionColor) {
      throw new Error("ButtonCTA: Required token --color-contrast-on-action is missing from CSS custom properties");
    }
    this._hoverColor = this._blendUtils.hoverColor(primaryColor);
    this._pressedColor = this._blendUtils.pressedColor(primaryColor);
    this._disabledColor = this._blendUtils.disabledColor(primaryColor);
    this._iconColor = this._blendUtils.iconColor(onActionColor);
    this._iconOpticalBalanceColor = this._blendUtils.iconColor(primaryColor);
  }
  /**
   * Called when the element is removed from the DOM.
   * 
   * Cleans up event listeners to prevent memory leaks.
   */
  disconnectedCallback() {
    this._detachEventListeners();
  }
  /**
   * Called when an observed attribute changes.
   * 
   * Triggers incremental DOM update to reflect the new attribute value.
   * Uses _updateDOM() instead of full render to preserve element identity
   * for CSS transitions.
   * 
   * @see Requirements: 2.2, 2.3 - Update existing DOM elements via _updateDOM()
   */
  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected && this._domCreated) {
      this._updateDOM();
    }
  }
  /**
   * Get the button label text.
   */
  get label() {
    return this.getAttribute("label") || "";
  }
  /**
   * Set the button label text.
   */
  set label(value) {
    this.setAttribute("label", value);
  }
  /**
   * Get the button size variant.
   */
  get size() {
    const size = this.getAttribute("size");
    return size === "small" || size === "medium" || size === "large" ? size : "medium";
  }
  /**
   * Set the button size variant.
   */
  set size(value) {
    this.setAttribute("size", value);
  }
  /**
   * Get the button visual variant.
   */
  get buttonVariant() {
    const variant = this.getAttribute("variant");
    return variant === "primary" || variant === "secondary" || variant === "tertiary" ? variant : "primary";
  }
  /**
   * Set the button visual variant.
   */
  set buttonVariant(value) {
    this.setAttribute("variant", value);
  }
  /**
   * Get the icon name.
   */
  get icon() {
    return this.getAttribute("icon");
  }
  /**
   * Set the icon name.
   */
  set icon(value) {
    if (value) {
      this.setAttribute("icon", value);
    } else {
      this.removeAttribute("icon");
    }
  }
  /**
   * Get the no-wrap state.
   */
  get noWrap() {
    return this.getAttribute("no-wrap") === "true";
  }
  /**
   * Set the no-wrap state.
   */
  set noWrap(value) {
    this.setAttribute("no-wrap", value.toString());
  }
  /**
   * Get the disabled state.
   */
  get disabled() {
    return this.hasAttribute("disabled");
  }
  /**
   * Set the disabled state.
   */
  set disabled(value) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
  /**
   * Get the test ID.
   */
  get testID() {
    return this.getAttribute("test-id");
  }
  /**
   * Set the test ID.
   */
  set testID(value) {
    if (value) {
      this.setAttribute("test-id", value);
    } else {
      this.removeAttribute("test-id");
    }
  }
  // ============================================================================
  // Rendering (Incremental Update Architecture)
  // ============================================================================
  /**
   * Main render entry point.
   * 
   * Routes to _createDOM() for first render or _updateDOM() for subsequent updates.
   * This architecture enables CSS transitions by preserving DOM element identity.
   * 
   * @see Requirements: 2.1, 2.2, 2.3, 2.4, 2.5 - Incremental DOM update strategy
   */
  render() {
    if (!this._domCreated) {
      this._createDOM();
      this._domCreated = true;
      this._attachEventListeners();
    } else {
      this._updateDOM();
    }
  }
  /**
   * Create the initial DOM structure (called once).
   * 
   * Creates all elements and caches references for incremental updates.
   * This ensures DOM elements exist for CSS transitions to work.
   * 
   * CSS is imported as a string and injected into shadow DOM via <style> tag
   * for browser bundle compatibility.
   * 
   * Uses <icon-base> web component for icon rendering, following the same
   * component composition pattern as iOS and Android platforms.
   * 
   * @see Requirements: 2.1 - Create initial DOM structure via _createDOM()
   * @see Requirements: 2.4 - Cache references to DOM elements
   * @see Requirements: 8.2, 8.3 (components render correctly in browser bundles)
   */
  _createDOM() {
    const label = this.label;
    const size = this.size;
    const variant = this.buttonVariant;
    const icon = this.icon;
    const noWrap = this.noWrap;
    const disabled = this.disabled;
    const testID = this.testID;
    const buttonClasses = [
      "button-cta",
      `button-cta--${size}`,
      `button-cta--${variant}`,
      disabled ? "button-cta--disabled" : ""
    ].filter(Boolean).join(" ");
    const iconSize = getIconSizeForButton(size);
    const labelClass = noWrap ? "button-cta__label--no-wrap" : "button-cta__label";
    const testIDAttr = testID ? ` data-testid="${testID}"` : "";
    const blendColorStyles = `
      --_cta-hover-bg: ${this._hoverColor};
      --_cta-pressed-bg: ${this._pressedColor};
      --_cta-disabled-bg: ${this._disabledColor};
      --_cta-icon-color: ${this._iconColor};
      --_cta-icon-optical: ${this._iconOpticalBalanceColor};
    `;
    this._shadowRoot.innerHTML = `
      <style>${ButtonCTA_web_default}</style>
      <button 
        class="${buttonClasses}"
        type="button"
        role="button"
        ${disabled ? 'disabled aria-disabled="true"' : 'aria-disabled="false"'}
        ${testIDAttr}
        aria-label="${label}"
        style="${blendColorStyles}"
      >
        <span class="button-cta__icon" aria-hidden="true" style="${icon ? "" : "display: none;"}">
          <icon-base name="${icon || ""}" size="${iconSize}" color="inherit"></icon-base>
        </span>
        <span class="${labelClass}">${label}</span>
      </button>
    `;
    this._button = this._shadowRoot.querySelector("button");
    this._labelEl = this._shadowRoot.querySelector(".button-cta__label, .button-cta__label--no-wrap");
    this._iconContainer = this._shadowRoot.querySelector(".button-cta__icon");
    this._iconEl = this._iconContainer?.querySelector("icon-base") || null;
  }
  /**
   * Update existing DOM elements (called on attribute changes).
   * 
   * Only updates properties that need to change, preserving DOM element identity.
   * This enables CSS transitions to animate smoothly between states.
   * 
   * Uses direct DOM APIs (element.setAttribute, element.className, element.style)
   * instead of innerHTML replacement.
   * 
   * @see Requirements: 2.2 - Update existing DOM elements via _updateDOM()
   * @see Requirements: 2.3 - SHALL NOT replace innerHTML of the shadow root
   * @see Requirements: 2.5 - Use direct DOM APIs for updates
   */
  _updateDOM() {
    if (!this._button || !this._labelEl) return;
    const label = this.label;
    const size = this.size;
    const variant = this.buttonVariant;
    const icon = this.icon;
    const noWrap = this.noWrap;
    const disabled = this.disabled;
    const testID = this.testID;
    const iconSize = getIconSizeForButton(size);
    const buttonClasses = [
      "button-cta",
      `button-cta--${size}`,
      `button-cta--${variant}`,
      disabled ? "button-cta--disabled" : ""
    ].filter(Boolean).join(" ");
    this._button.className = buttonClasses;
    if (disabled) {
      this._button.setAttribute("disabled", "");
      this._button.setAttribute("aria-disabled", "true");
    } else {
      this._button.removeAttribute("disabled");
      this._button.setAttribute("aria-disabled", "false");
    }
    this._button.setAttribute("aria-label", label);
    if (testID) {
      this._button.setAttribute("data-testid", testID);
    } else {
      this._button.removeAttribute("data-testid");
    }
    this._button.style.setProperty("--_cta-hover-bg", this._hoverColor);
    this._button.style.setProperty("--_cta-pressed-bg", this._pressedColor);
    this._button.style.setProperty("--_cta-disabled-bg", this._disabledColor);
    this._button.style.setProperty("--_cta-icon-color", this._iconColor);
    this._button.style.setProperty("--_cta-icon-optical", this._iconOpticalBalanceColor);
    this._labelEl.textContent = label;
    this._labelEl.className = noWrap ? "button-cta__label--no-wrap" : "button-cta__label";
    if (this._iconContainer && this._iconEl) {
      if (icon) {
        this._iconContainer.style.display = "";
        this._iconEl.setAttribute("name", icon);
        this._iconEl.setAttribute("size", String(iconSize));
      } else {
        this._iconContainer.style.display = "none";
      }
    }
  }
  /**
   * Attach event listeners to the button.
   * 
   * Listens for click and keyboard events and dispatches custom 'press' event.
   * Ensures keyboard navigation (Tab, Enter, Space) works correctly.
   */
  _attachEventListeners() {
    if (this._button) {
      this._button.addEventListener("click", this._handleClick);
      this._button.addEventListener("keydown", this._handleKeyDown);
    }
  }
  /**
   * Detach event listeners from the button.
   * 
   * Cleans up to prevent memory leaks.
   */
  _detachEventListeners() {
    if (this._button) {
      this._button.removeEventListener("click", this._handleClick);
      this._button.removeEventListener("keydown", this._handleKeyDown);
    }
  }
  /**
   * Handle button click events.
   * 
   * Dispatches a custom 'press' event that bubbles up to parent elements.
   */
  _handleClick = (event) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent("press", {
      bubbles: true,
      composed: true,
      detail: { originalEvent: event }
    }));
  };
  /**
   * Handle keyboard events for accessibility.
   * 
   * Ensures Enter and Space keys activate the button (WCAG 2.1 AA requirement).
   * Native button elements handle this automatically, but we make it explicit
   * for clarity and to ensure consistent behavior across all browsers.
   * 
   * @param event - The keyboard event
   */
  _handleKeyDown = (event) => {
    if (this.disabled) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.dispatchEvent(new CustomEvent("press", {
        bubbles: true,
        composed: true,
        detail: { originalEvent: event }
      }));
    }
  };
};
if (!customElements.get("button-cta")) {
  customElements.define("button-cta", ButtonCTA);
}

// src/components/core/Button-Icon/types.ts
var BUTTON_ICON_DEFAULTS = {
  /** Default size variant */
  size: "medium",
  /** Default visual style variant */
  variant: "primary"
};

// src/components/core/Button-Icon/platforms/web/ButtonIcon.web.css
var ButtonIcon_web_default = "/**\n * Button-Icon Component Styles for Web Platform\n * \n * Token-based styling using CSS custom properties from the mathematical token system.\n * All values reference semantic or primitive tokens - zero hard-coded values.\n * \n * Stemma System Naming: [Family]-[Type] = Button-Icon\n * Component Type: Primitive (foundational component)\n * \n * Key Design Decisions:\n * - Circular shape via radiusCircle token (border-radius: 50%)\n * - Self-contained focus ring buffer (4px on all sides)\n * - No disabled state by design (see Requirement 11.1)\n * - Secondary border shift prevention via box-shadow technique\n * \n * @module Button-Icon/platforms/web/styles\n * @see Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 3.2, 4\n */\n\n/* ==========================================================================\n   CSS Custom Properties (Token References)\n   ========================================================================== */\n\n/**\n * Component-level custom properties for token consumption.\n * These map semantic tokens to component-specific usage.\n * \n * Inset tokens are consumed from generated ComponentTokens.web.css:\n * - --buttonicon-inset-large: var(--space-150)\n * - --buttonicon-inset-medium: var(--space-125)\n * - --buttonicon-inset-small: var(--space-100)\n * \n * Size and inset tokens use component-scoped naming (--_bi-*):\n * - --_bi-size-large: 48px (icon 24px + padding 12px \xD7 2)\n * - --_bi-size-medium: 40px (icon 18px + padding 10px \xD7 2, rounded for grid)\n * - --_bi-size-small: 32px (icon 13px + padding 8px \xD7 2, rounded for grid)\n * \n * @see Requirements 6.1, 6.2, 6.3 - Hard-coded value elimination\n */\n:host {\n  /* Focus ring tokens */\n  --_bi-focus-offset: var(--accessibility-focus-offset);\n  --_bi-focus-width: var(--accessibility-focus-width);\n  --_bi-focus-color: var(--accessibility-focus-color);\n  \n  /* Focus buffer calculation: offset + width = 4px total per side */\n  --_bi-focus-buffer: 4px;\n  \n  /* Circular shape token */\n  --_bi-radius: 50%;\n  \n  /* Semantic motion tokens for button press feedback */\n  /* Uses motion.buttonPress semantic token (150ms, accelerate easing) */\n  --_bi-transition-duration: var(--motion-button-press-duration);\n  --_bi-transition-easing: var(--motion-button-press-easing);\n  \n  /* Border tokens */\n  --_bi-border-default: var(--border-default);\n  --_bi-border-emphasis: var(--border-emphasis);\n  \n  /* Color tokens */\n  --_bi-color-primary: var(--color-action-primary);\n  --_bi-color-contrast: var(--color-contrast-on-action);\n  --_bi-color-bg-subtle: var(--color-background-primary-subtle);\n  \n  /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   * Size and Inset Tokens (Task 1.6 - Token-referenced sizing)\n   * \n   * These use --_bi-* naming convention per task requirements.\n   * References generated component tokens from ComponentTokens.web.css.\n   * @see Requirements 6.1, 6.2, 6.3\n   * \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n  \n  /* Inset (padding) tokens - reference generated component tokens */\n  --_bi-inset-large: var(--buttonicon-inset-large);\n  --_bi-inset-medium: var(--buttonicon-inset-medium);\n  --_bi-inset-small: var(--buttonicon-inset-small);\n  \n  /* Size (width/height) tokens - reference generated component tokens */\n  /* These will be generated by the component token pipeline in future */\n  --_bi-size-large: var(--buttonicon-size-large);\n  --_bi-size-medium: var(--buttonicon-size-medium);\n  --_bi-size-small: var(--buttonicon-size-small);\n  \n  /* Touch target token reference */\n  --_bi-touch-target: var(--tap-area-recommended);\n}\n\n/* ==========================================================================\n   Base Button Styles\n   ========================================================================== */\n\n/**\n * Base button element styling.\n * \n * - Flexbox layout for icon centering\n * - Token-based circular shape\n * - Semantic button element with proper cursor\n * - Smooth transitions for interaction states\n * - Self-contained focus buffer margin\n * \n * @see Requirements 3.2, 4\n */\n.button-icon {\n  /* Reset browser defaults */\n  appearance: none;\n  border: none;\n  background: transparent;\n  padding: 0;\n  font: inherit;\n  \n  /* Interaction */\n  cursor: pointer;\n  user-select: none;\n  \n  /* Flexbox centering for icon */\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  \n  /* Circular shape via radiusCircle token (50%) */\n  /* @see Requirement 3.2 */\n  border-radius: var(--_bi-radius);\n  \n  /* Focus buffer margin on all sides (4px = focus.offset + focus.width) */\n  /* This ensures focus ring is contained within component bounds */\n  /* @see Requirement 1.4 */\n  margin: var(--_bi-focus-buffer);\n  \n  /* Transitions for smooth state changes */\n  /* Uses semantic motion.buttonPress token for consistent button feedback */\n  /* @see Requirement 12.1, Requirements 3.2, 3.3, 3.4 */\n  transition: background-color var(--_bi-transition-duration) var(--_bi-transition-easing),\n              border-color var(--_bi-transition-duration) var(--_bi-transition-easing),\n              color var(--_bi-transition-duration) var(--_bi-transition-easing),\n              box-shadow var(--_bi-transition-duration) var(--_bi-transition-easing),\n              transform var(--_bi-transition-duration) var(--_bi-transition-easing);\n  \n  /* Focus outline reset (custom focus ring implemented below) */\n  outline: none;\n  \n  /* Ensure button doesn't shrink in flex containers */\n  flex-shrink: 0;\n  \n  /* Position relative for pseudo-element touch target extension */\n  position: relative;\n}\n\n\n/* ==========================================================================\n   Size Variants\n   ========================================================================== */\n\n/**\n * Small button (32px visual circle, 40px total with buffer)\n * \n * - Icon size: icon.size050 (13px) - handled by icon-base component\n * - Padding: buttonIcon.inset.small (8px)\n * - Visual circle: 13 + (8 \xD7 2) = 29px (rounded to 32px for grid alignment)\n * - Total box: 32 + 8 = 40px (with focus buffer)\n * - Touch target: Extended to tapAreaRecommended (48px) via ::after pseudo-element\n * \n * Note: Small size requires touch target extension because the total box (40px)\n * is less than tapAreaRecommended (48px). The ::after pseudo-element creates\n * an invisible 48px hit area centered on the 32px visual button.\n * \n * @see Requirements 1.1, 5.3, 5.4, 5.5\n * @see Requirements 6.1, 6.2, 6.3 - Token-referenced sizing\n */\n.button-icon--small {\n  /* Padding using token reference */\n  /* @see Requirement 6.2 */\n  padding: var(--_bi-inset-small);\n  \n  /* Explicit sizing using token references for consistent circular shape */\n  /* @see Requirements 6.1, 6.3 */\n  width: var(--_bi-size-small);\n  height: var(--_bi-size-small);\n  min-width: var(--_bi-size-small);\n  min-height: var(--_bi-size-small);\n}\n\n/**\n * Medium button (40px visual circle, 48px total with buffer) - Default size\n * \n * - Icon size: icon.size075 (18px) - handled by icon-base component\n * - Padding: buttonIcon.inset.medium (10px)\n * - Visual circle: 18 + (10 \xD7 2) = 38px (rounded to 40px for grid alignment)\n * - Total box: 40 + 8 = 48px (with focus buffer)\n * - Touch target: Meets tapAreaRecommended (48px) exactly\n * \n * Note: Medium size meets the 48px touch target requirement without extension\n * because the visual button (40px) plus focus buffer margin (4px each side)\n * equals exactly 48px total interactive area.\n * \n * @see Requirements 1.2, 5.2\n * @see Requirements 6.1, 6.2, 6.3 - Token-referenced sizing\n */\n.button-icon--medium {\n  /* Padding using token reference */\n  /* @see Requirement 6.2 */\n  padding: var(--_bi-inset-medium);\n  \n  /* Explicit sizing using token references for consistent circular shape */\n  /* @see Requirements 6.1, 6.3 */\n  width: var(--_bi-size-medium);\n  height: var(--_bi-size-medium);\n  min-width: var(--_bi-size-medium);\n  min-height: var(--_bi-size-medium);\n}\n\n/**\n * Large button (48px visual circle, 56px total with buffer)\n * \n * - Icon size: icon.size100 (24px) - handled by icon-base component\n * - Padding: buttonIcon.inset.large (12px)\n * - Visual circle: 24 + (12 \xD7 2) = 48px\n * - Total box: 48 + 8 = 56px (with focus buffer)\n * - Touch target: Exceeds tapAreaRecommended (48px)\n * \n * Note: Large size exceeds the 48px touch target requirement without extension\n * because the visual button alone (48px) already meets the minimum, and the\n * focus buffer margin adds an additional 8px (4px each side) for 56px total.\n * \n * @see Requirements 1.3, 5.1\n * @see Requirements 6.1, 6.2, 6.3 - Token-referenced sizing\n */\n.button-icon--large {\n  /* Padding using token reference */\n  /* @see Requirement 6.2 */\n  padding: var(--_bi-inset-large);\n  \n  /* Explicit sizing using token references for consistent circular shape */\n  /* @see Requirements 6.1, 6.3 */\n  width: var(--_bi-size-large);\n  height: var(--_bi-size-large);\n  min-width: var(--_bi-size-large);\n  min-height: var(--_bi-size-large);\n}\n\n/* ==========================================================================\n   Style Variants\n   ========================================================================== */\n\n/**\n * Primary button style (filled background)\n * \n * - Background: color.action.primary (cyan300 Standard / teal300 WCAG)\n * - Icon: color.contrast.onAction (black500 Standard / white100 WCAG)\n * - Border: none\n * - Highest visual emphasis\n * \n * @see Requirement 2.1\n */\n.button-icon--primary {\n  background-color: var(--_bi-color-primary);\n  color: var(--_bi-color-contrast);\n  border: none;\n}\n\n/**\n * Secondary button style (outlined)\n * \n * - Background: transparent\n * - Icon: color.primary (purple300)\n * - Border: borderDefault (1px) solid color.primary\n * - Medium visual emphasis\n * \n * Border shift prevention technique:\n * - Reserve borderEmphasis (2px) space with transparent border\n * - Simulate borderDefault (1px) with inset box-shadow\n * - On hover/pressed, transition to actual border (no layout shift)\n * \n * @see Requirements 2.2, 9.1, 9.2, 9.3\n */\n.button-icon--secondary {\n  background-color: transparent;\n  color: var(--_bi-color-primary);\n  \n  /* Reserve 2px border space (borderEmphasis) with transparent border */\n  border: var(--_bi-border-emphasis) solid transparent;\n  \n  /* Simulate 1px border (borderDefault) with inset box-shadow */\n  /* This prevents layout shift when border changes to 2px on hover */\n  box-shadow: inset 0 0 0 var(--_bi-border-default) var(--_bi-color-primary);\n}\n\n/**\n * Tertiary button style (text-only / ghost)\n * \n * - Background: transparent\n * - Icon: color.primary (purple300)\n * - Border: none\n * - Lowest visual emphasis\n * \n * @see Requirement 2.3\n */\n.button-icon--tertiary {\n  background-color: transparent;\n  color: var(--_bi-color-primary);\n  border: none;\n}\n\n/* ==========================================================================\n   Icon Container Styling\n   ========================================================================== */\n\n/**\n * Icon container styling.\n * \n * - Flexbox for centering\n * - Inherits color from button variant\n * - Marked as decorative (aria-hidden) in HTML\n * \n * @see Requirement 4.5\n */\n.button-icon__icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  color: inherit;\n  \n  /* Ensure icon doesn't affect button sizing - use inherit to avoid typography detection */\n  line-height: inherit;\n}\n\n/* ==========================================================================\n   Interaction States - Hover\n   ========================================================================== */\n\n/**\n * Primary variant hover state.\n * \n * Uses blend utility calculated color via CSS custom property.\n * Applies blend.hoverDarker (8% darker) to background.\n * \n * @see Requirement 7.1\n * @see Requirements 1.1, 1.5, 1.6 - Blend utility adoption\n */\n.button-icon--primary:hover {\n  /* Apply blend utility calculated hover color */\n  /* Uses --_bi-hover-bg set by JavaScript blend utilities */\n  background-color: var(--_bi-hover-bg);\n}\n\n/**\n * Secondary variant hover state.\n * \n * - Background: color.background.primary.subtle (purple100)\n * - Border: borderEmphasis (2px) with blend utility calculated color\n * - Icon: Uses blend utility calculated color\n * \n * @see Requirement 7.2\n * @see Requirements 1.1, 1.5, 1.6 - Blend utility adoption\n */\n.button-icon--secondary:hover {\n  background-color: var(--_bi-color-bg-subtle);\n  \n  /* Transition from box-shadow to actual border (no layout shift) */\n  /* Use blend utility calculated color for border */\n  border-color: var(--_bi-hover-bg);\n  box-shadow: none;\n  \n  /* Apply blend utility calculated color to icon */\n  color: var(--_bi-hover-bg);\n}\n\n/**\n * Tertiary variant hover state.\n * \n * Uses blend utility calculated color for icon.\n * Background remains transparent.\n * \n * @see Requirement 7.3\n * @see Requirements 1.1, 1.5, 1.6 - Blend utility adoption\n */\n.button-icon--tertiary:hover {\n  /* Apply blend utility calculated color to icon */\n  color: var(--_bi-hover-bg);\n}\n\n/* ==========================================================================\n   Interaction States - Pressed/Active\n   ========================================================================== */\n\n/**\n * Primary variant pressed state.\n * \n * Uses blend utility calculated color via CSS custom property.\n * Applies blend.pressedDarker (12% darker) to background.\n * \n * @see Requirement 8.1\n * @see Requirements 1.2, 1.5, 1.6 - Blend utility adoption\n */\n.button-icon--primary:active {\n  /* Apply blend utility calculated pressed color */\n  /* Uses --_bi-pressed-bg set by JavaScript blend utilities */\n  background-color: var(--_bi-pressed-bg);\n}\n\n/**\n * Secondary variant pressed state.\n * \n * - Background: color.background.primary.subtle (purple100)\n * - Border: borderEmphasis (2px) with blend utility calculated color\n * - Icon: Uses blend utility calculated color\n * \n * @see Requirement 8.2\n * @see Requirements 1.2, 1.5, 1.6 - Blend utility adoption\n */\n.button-icon--secondary:active {\n  background-color: var(--_bi-color-bg-subtle);\n  \n  /* Maintain actual border (no box-shadow) */\n  /* Use blend utility calculated color for border */\n  border-color: var(--_bi-pressed-bg);\n  box-shadow: none;\n  \n  /* Apply blend utility calculated color to icon */\n  color: var(--_bi-pressed-bg);\n}\n\n/**\n * Tertiary variant pressed state.\n * \n * Uses blend utility calculated color for icon.\n * Background remains transparent.\n * \n * @see Requirement 8.3\n * @see Requirements 1.2, 1.5, 1.6 - Blend utility adoption\n */\n.button-icon--tertiary:active {\n  /* Apply blend utility calculated color to icon */\n  color: var(--_bi-pressed-bg);\n}\n\n/* ==========================================================================\n   Focus State\n   ========================================================================== */\n\n/**\n * Focus state (keyboard navigation only).\n * \n * - Uses :focus-visible for keyboard-only focus indicators\n * - Outline: accessibility.focus.width (2px)\n * - Color: accessibility.focus.color (primary/purple300)\n * - Offset: accessibility.focus.offset (2px)\n * - Focus ring contained within focus buffer (no overflow)\n * - Meets WCAG 2.1 AA contrast requirements (3:1 minimum)\n * \n * @see Requirements 6.1, 6.2, 6.3, 6.4, 6.5\n */\n.button-icon:focus-visible {\n  outline: var(--_bi-focus-width) solid var(--_bi-focus-color);\n  outline-offset: var(--_bi-focus-offset);\n}\n\n/**\n * Remove focus outline on mouse click.\n * \n * :focus-visible handles this automatically in modern browsers,\n * but this provides fallback for older browsers.\n * \n * @see Requirement 6.4\n */\n.button-icon:focus:not(:focus-visible) {\n  outline: none;\n}\n\n/* ==========================================================================\n   Touch Target Extension (Small Size)\n   ========================================================================== */\n\n/**\n * Touch target extension for small size.\n * \n * Small size (32px visual + 8px buffer = 40px total) needs touch target\n * extended to tapAreaRecommended (48px) using invisible hit area.\n * \n * Uses ::after pseudo-element to create transparent clickable area\n * that extends beyond the visual button bounds.\n * \n * Calculation:\n * - Small visual button: 32px \xD7 32px\n * - Focus buffer margin: 4px on each side (not part of button element)\n * - Total component box: 32px + 8px = 40px\n * - Required touch target: 48px (tapAreaRecommended)\n * - Extension needed: (48 - 32) / 2 = 8px per side beyond visual button\n * \n * The pseudo-element is positioned relative to the button element (32px),\n * not the total component box, so we center a 48px area on the 32px button.\n * \n * @see Requirements 5.3, 5.4, 5.5\n * @see Requirements 6.1, 6.3 - Token-referenced sizing\n */\n.button-icon--small::after {\n  content: '';\n  position: absolute;\n  \n  /* Center the touch target extension on the visual button */\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  \n  /* Extend to tapAreaRecommended using token reference */\n  /* This creates an invisible 48px \xD7 48px hit area centered on the 32px button */\n  /* @see Requirements 6.1, 6.3 */\n  width: var(--_bi-touch-target);\n  height: var(--_bi-touch-target);\n  \n  /* Invisible but clickable - transparent background */\n  background: transparent;\n  \n  /* Circular shape to match button */\n  border-radius: 50%;\n  \n  /* Pointer events pass through to button - the pseudo-element extends */\n  /* the clickable area by being part of the button's box model */\n  /* No z-index needed as it's part of the button element */\n}\n\n/* ==========================================================================\n   Circular Shape Maintenance\n   ========================================================================== */\n\n/**\n * Ensure circular shape is maintained during all interaction states.\n * \n * The border-radius: 50% creates a perfect circle when width equals height.\n * This rule ensures the circular shape is preserved during hover, pressed,\n * and focus states.\n * \n * @see Requirements 7.4, 8.6\n */\n.button-icon:hover,\n.button-icon:active,\n.button-icon:focus,\n.button-icon:focus-visible {\n  border-radius: var(--_bi-radius);\n}\n\n/* ==========================================================================\n   High Contrast Mode Support\n   ========================================================================== */\n\n/**\n * Ensure buttons remain visible in Windows High Contrast Mode.\n * \n * - Force borders for all button styles\n * - Ensure focus indicators are visible\n * - Use border.borderEmphasis (2px) and border.borderHeavy (4px) tokens\n */\n@media (prefers-contrast: high) {\n  .button-icon {\n    border: var(--_bi-border-emphasis) solid currentColor;\n  }\n  \n  .button-icon:focus-visible {\n    outline-width: 4px; /* border.borderHeavy equivalent */\n  }\n}\n\n/* ==========================================================================\n   Reduced Motion Support\n   ========================================================================== */\n\n/**\n * Respect user preference for reduced motion.\n * \n * - Remove transitions and animations\n * - Maintain functionality without motion\n * \n * @see Requirement 12.2\n */\n@media (prefers-reduced-motion: reduce) {\n  .button-icon {\n    transition: none;\n  }\n}\n\n/* ==========================================================================\n   Print Styles\n   ========================================================================== */\n\n/**\n * Optimize button appearance for print.\n * \n * - Remove interactive states\n * - Ensure visibility with border\n * - Simplify visual styling\n */\n@media print {\n  .button-icon {\n    background-color: transparent !important;\n    color: var(--color-print-default) !important;\n    border: var(--_bi-border-default) solid var(--color-print-default) !important;\n    box-shadow: none !important;\n  }\n}\n";

// src/components/core/Button-Icon/platforms/web/ButtonIcon.web.ts
function getIconSizeForButton2(buttonSize) {
  let iconSize;
  switch (buttonSize) {
    case "small":
      iconSize = iconBaseSizes.size050;
      if (!iconSize) {
        throw new Error("ButtonIcon: iconBaseSizes.size050 token is missing");
      }
      break;
    case "medium":
      iconSize = iconBaseSizes.size075;
      if (!iconSize) {
        throw new Error("ButtonIcon: iconBaseSizes.size075 token is missing");
      }
      break;
    case "large":
      iconSize = iconBaseSizes.size100;
      if (!iconSize) {
        throw new Error("ButtonIcon: iconBaseSizes.size100 token is missing");
      }
      break;
    default:
      throw new Error(`ButtonIcon: Invalid button size "${buttonSize}"`);
  }
  return iconSize;
}
var ButtonIcon = class extends HTMLElement {
  _shadowRoot;
  // Incremental DOM update tracking
  // @see Requirements: 2.1, 2.2, 2.3, 2.4, 2.5 - Incremental DOM update strategy
  _domCreated = false;
  // Cached DOM element references for incremental updates
  // @see Requirements: 2.4 - Cache references to DOM elements that will be updated
  _button = null;
  _iconEl = null;
  _iconContainer = null;
  // Theme-aware blend utilities instance
  // Uses getBlendUtilities() factory for consistent state styling
  // @see Requirements: 1.1, 1.2, 1.5, 1.6 - Blend utility adoption
  _blendUtils;
  // Cached blend colors for state styling
  _hoverColor = "";
  _pressedColor = "";
  /**
   * Observed attributes for automatic re-rendering on change.
   * 
   * When these attributes change, attributeChangedCallback is invoked.
   * 
   * @see Requirements 4.2 - aria-label attribute for accessibility
   */
  static get observedAttributes() {
    return ["icon", "aria-label", "size", "variant", "test-id"];
  }
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._blendUtils = getBlendUtilities();
  }
  /**
   * Called when the element is added to the DOM.
   * 
   * Performs initial render and sets up event listeners.
   * Calculates blend colors from CSS custom properties.
   * 
   * Defers blend color calculation until document is ready to ensure
   * CSS custom properties are available from parsed stylesheets.
   */
  connectedCallback() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this._calculateBlendColorsWithRetry();
        this.render();
      }, { once: true });
    } else {
      this._calculateBlendColorsWithRetry();
      this.render();
    }
    if (!this.ariaLabel) {
      console.warn(
        'ButtonIcon: Missing required "aria-label" attribute. Icon-only buttons require aria-label for screen reader accessibility.'
      );
    }
  }
  /**
   * Calculate blend colors with retry logic for CSS loading race conditions.
   * 
   * Uses requestAnimationFrame to ensure CSS is fully applied before reading
   * custom properties. Falls back to default colors if tokens are still unavailable.
   * 
   * @see Requirements: 1.1, 1.2, 1.5, 1.6 - Blend utility adoption
   */
  _calculateBlendColorsWithRetry() {
    try {
      this._calculateBlendColors();
    } catch (error) {
      requestAnimationFrame(() => {
        try {
          this._calculateBlendColors();
          this.render();
        } catch (retryError) {
          console.warn("ButtonIcon: Could not calculate blend colors, using CSS fallbacks", retryError);
        }
      });
    }
  }
  /**
   * Calculate blend colors from CSS custom properties.
   * 
   * Reads base colors from CSS custom properties and applies theme-aware blend
   * utilities to generate state colors (hover, pressed).
   * 
   * Uses getBlendUtilities() factory functions instead of direct blend calculations
   * for cross-platform consistency with iOS and Android implementations.
   * 
   * State color mappings:
   * - Hover: darkerBlend(color.primary, blend.hoverDarker) - 8% darker
   * - Pressed: darkerBlend(color.primary, blend.pressedDarker) - 12% darker
   * 
   * @see Requirements: 1.1, 1.2, 1.5, 1.6 - Blend utility adoption
   * @throws Error if required color tokens are missing from CSS custom properties
   */
  _calculateBlendColors() {
    const computedStyle = getComputedStyle(document.documentElement);
    const primaryColor = computedStyle.getPropertyValue("--color-action-primary").trim();
    if (!primaryColor) {
      throw new Error("ButtonIcon: Required token --color-action-primary is missing from CSS custom properties");
    }
    this._hoverColor = this._blendUtils.hoverColor(primaryColor);
    this._pressedColor = this._blendUtils.pressedColor(primaryColor);
  }
  /**
   * Called when the element is removed from the DOM.
   * 
   * Cleans up event listeners to prevent memory leaks.
   */
  disconnectedCallback() {
    this._detachEventListeners();
  }
  /**
   * Called when an observed attribute changes.
   * 
   * Triggers incremental DOM update to reflect the new attribute value.
   * Uses _updateDOM() instead of full render to preserve element identity
   * for CSS transitions.
   * 
   * @see Requirements: 2.2, 2.3 - Update existing DOM elements via _updateDOM()
   */
  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected && this._domCreated) {
      this._updateDOM();
    }
  }
  // ============================================================================
  // Property Getters/Setters
  // ============================================================================
  /**
   * Get the icon name.
   */
  get icon() {
    return this.getAttribute("icon") || "";
  }
  /**
   * Set the icon name.
   */
  set icon(value) {
    this.setAttribute("icon", value);
  }
  /**
   * Get the accessible label.
   * 
   * @see Requirements 4.1, 4.2
   */
  get ariaLabel() {
    return this.getAttribute("aria-label") || "";
  }
  /**
   * Set the accessible label.
   * 
   * @see Requirements 4.1, 4.2
   */
  set ariaLabel(value) {
    this.setAttribute("aria-label", value);
  }
  /**
   * Get the button size variant.
   * 
   * @see Requirements 1.1, 1.2, 1.3, 1.5
   */
  get size() {
    const size = this.getAttribute("size");
    return size === "small" || size === "medium" || size === "large" ? size : BUTTON_ICON_DEFAULTS.size;
  }
  /**
   * Set the button size variant.
   */
  set size(value) {
    this.setAttribute("size", value);
  }
  /**
   * Get the button visual variant.
   * 
   * @see Requirements 2.1, 2.2, 2.3, 2.4
   */
  get buttonVariant() {
    const variant = this.getAttribute("variant");
    return variant === "primary" || variant === "secondary" || variant === "tertiary" ? variant : BUTTON_ICON_DEFAULTS.variant;
  }
  /**
   * Set the button visual variant.
   */
  set buttonVariant(value) {
    this.setAttribute("variant", value);
  }
  /**
   * Get the test ID.
   */
  get testID() {
    return this.getAttribute("test-id");
  }
  /**
   * Set the test ID.
   */
  set testID(value) {
    if (value) {
      this.setAttribute("test-id", value);
    } else {
      this.removeAttribute("test-id");
    }
  }
  // ============================================================================
  // Rendering (Incremental Update Architecture)
  // ============================================================================
  /**
   * Main render entry point.
   * 
   * Routes to _createDOM() for first render or _updateDOM() for subsequent updates.
   * This architecture enables CSS transitions by preserving DOM element identity.
   * 
   * @see Requirements: 2.1, 2.2, 2.3, 2.4, 2.5 - Incremental DOM update strategy
   */
  render() {
    if (!this._domCreated) {
      this._createDOM();
      this._domCreated = true;
      this._attachEventListeners();
    } else {
      this._updateDOM();
    }
  }
  /**
   * Create the initial DOM structure (called once).
   * 
   * Creates all elements and caches references for incremental updates.
   * This ensures DOM elements exist for CSS transitions to work.
   * 
   * CSS is imported as a string and injected into shadow DOM via <style> tag
   * for browser bundle compatibility.
   * 
   * @see Requirements: 2.1 - Create initial DOM structure via _createDOM()
   * @see Requirements: 2.4 - Cache references to DOM elements
   * @see Requirements: 5.1, 5.3, 5.4 - External CSS file with esbuild plugin pattern
   */
  _createDOM() {
    const icon = this.icon;
    const ariaLabel = this.ariaLabel;
    const size = this.size;
    const variant = this.buttonVariant;
    const testID = this.testID;
    const iconSize = getIconSizeForButton2(size);
    const buttonClasses = [
      "button-icon",
      `button-icon--${size}`,
      `button-icon--${variant}`
    ].filter(Boolean).join(" ");
    const testIDAttr = testID ? ` data-testid="${testID}"` : "";
    const blendColorStyles = `
      --_bi-hover-bg: ${this._hoverColor};
      --_bi-pressed-bg: ${this._pressedColor};
    `;
    this._shadowRoot.innerHTML = `
      <style>${ButtonIcon_web_default}</style>
      <button 
        class="${buttonClasses}"
        type="button"
        role="button"
        aria-label="${ariaLabel}"
        ${testIDAttr}
        style="${blendColorStyles}"
      >
        <span class="button-icon__icon" aria-hidden="true">
          <icon-base name="${icon}" size="${iconSize}" color="inherit"></icon-base>
        </span>
      </button>
    `;
    this._button = this._shadowRoot.querySelector("button");
    this._iconContainer = this._shadowRoot.querySelector(".button-icon__icon");
    this._iconEl = this._iconContainer?.querySelector("icon-base") || null;
  }
  /**
   * Update existing DOM elements (called on attribute changes).
   * 
   * Only updates properties that need to change, preserving DOM element identity.
   * This enables CSS transitions to animate smoothly between states.
   * 
   * Uses direct DOM APIs (element.setAttribute, element.className, element.style)
   * instead of innerHTML replacement.
   * 
   * @see Requirements: 2.2 - Update existing DOM elements via _updateDOM()
   * @see Requirements: 2.3 - SHALL NOT replace innerHTML of the shadow root
   * @see Requirements: 2.5 - Use direct DOM APIs for updates
   */
  _updateDOM() {
    if (!this._button || !this._iconEl) return;
    const icon = this.icon;
    const ariaLabel = this.ariaLabel;
    const size = this.size;
    const variant = this.buttonVariant;
    const testID = this.testID;
    const iconSize = getIconSizeForButton2(size);
    const buttonClasses = [
      "button-icon",
      `button-icon--${size}`,
      `button-icon--${variant}`
    ].filter(Boolean).join(" ");
    this._button.className = buttonClasses;
    this._button.setAttribute("aria-label", ariaLabel);
    if (testID) {
      this._button.setAttribute("data-testid", testID);
    } else {
      this._button.removeAttribute("data-testid");
    }
    this._button.style.setProperty("--_bi-hover-bg", this._hoverColor);
    this._button.style.setProperty("--_bi-pressed-bg", this._pressedColor);
    this._iconEl.setAttribute("name", icon);
    this._iconEl.setAttribute("size", String(iconSize));
  }
  // ============================================================================
  // Event Handling
  // ============================================================================
  /**
   * Attach event listeners to the button.
   * 
   * Listens for click and keyboard events and dispatches custom 'press' event.
   * Ensures keyboard navigation (Tab, Enter, Space) works correctly.
   */
  _attachEventListeners() {
    if (this._button) {
      this._button.addEventListener("click", this._handleClick);
      this._button.addEventListener("keydown", this._handleKeyDown);
    }
  }
  /**
   * Detach event listeners from the button.
   * 
   * Cleans up to prevent memory leaks.
   */
  _detachEventListeners() {
    if (this._button) {
      this._button.removeEventListener("click", this._handleClick);
      this._button.removeEventListener("keydown", this._handleKeyDown);
    }
  }
  /**
   * Handle button click events.
   * 
   * Dispatches a custom 'press' event that bubbles up to parent elements.
   */
  _handleClick = (event) => {
    this.dispatchEvent(new CustomEvent("press", {
      bubbles: true,
      composed: true,
      detail: { originalEvent: event }
    }));
  };
  /**
   * Handle keyboard events for accessibility.
   * 
   * Ensures Enter and Space keys activate the button (WCAG 2.1 AA requirement).
   * Native button elements handle this automatically, but we make it explicit
   * for clarity and to ensure consistent behavior across all browsers.
   * 
   * @param event - The keyboard event
   */
  _handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.dispatchEvent(new CustomEvent("press", {
        bubbles: true,
        composed: true,
        detail: { originalEvent: event }
      }));
    }
  };
};
if (!customElements.get("button-icon")) {
  customElements.define("button-icon", ButtonIcon);
}

// src/components/core/Badge-Label-Base/types.ts
var BADGE_LABEL_DEFAULTS = {
  /** Default size variant */
  size: "md",
  /** Default truncation behavior */
  truncate: false
};
var BADGE_LABEL_SIZE_TOKENS = {
  sm: {
    typography: "typography.labelXs",
    paddingVertical: "space.inset.none",
    paddingHorizontal: "space.inset.050",
    iconSize: 13,
    // icon.size050
    iconGap: "space.grouped.minimal"
  },
  md: {
    typography: "typography.labelSm",
    paddingVertical: "space.inset.050",
    paddingHorizontal: "space.inset.100",
    iconSize: 20,
    // icon.size075
    iconGap: "space.grouped.tight"
  },
  lg: {
    typography: "typography.labelMd",
    paddingVertical: "space.inset.100",
    paddingHorizontal: "space.inset.150",
    iconSize: 24,
    // icon.size100
    iconGap: "space.grouped.tight"
  }
};

// node_modules/@3fn/core/src/registries/ComponentTokenRegistry.ts
var ComponentTokenRegistryImpl = class {
  /**
   * Registry name for identification
   */
  name = "ComponentTokenRegistry";
  /** Primary token storage by name */
  tokens = /* @__PURE__ */ new Map();
  /** Index by component name */
  byComponent = /* @__PURE__ */ new Map();
  /** Index by token family */
  byFamily = /* @__PURE__ */ new Map();
  /** Default allowOverwrite for register calls that don't specify it */
  defaultAllowOverwrite = false;
  /**
   * Set the default allowOverwrite flag for subsequent register/registerBatch calls.
   * Used by loadComponentTokens in local mode to prevent double-registration conflicts.
   */
  setDefaultAllowOverwrite(allow) {
    this.defaultAllowOverwrite = allow;
  }
  /**
   * Register a single component token
   * 
   * Implements IRegistry.register() interface.
   * 
   * @param token - The component token to register
   * @param options - Registration options
   * @throws Error if token with same name already exists (unless allowOverwrite is true)
   */
  register(token, options = {}) {
    const { allowOverwrite = this.defaultAllowOverwrite } = options;
    if (this.tokens.has(token.name) && !allowOverwrite) {
      const existing = this.tokens.get(token.name);
      throw new Error(
        `Component token conflict: "${token.name}" already registered by ${existing.component}. Attempted registration by ${token.component}.`
      );
    }
    if (this.tokens.has(token.name)) {
      this.removeFromIndexes(token.name);
    }
    this.tokens.set(token.name, token);
    if (!this.byComponent.has(token.component)) {
      this.byComponent.set(token.component, []);
    }
    this.byComponent.get(token.component).push(token);
    if (!this.byFamily.has(token.family)) {
      this.byFamily.set(token.family, []);
    }
    this.byFamily.get(token.family).push(token);
  }
  /**
   * Register a batch of component tokens for a component
   * 
   * This is the primary method called by defineComponentTokens().
   * 
   * @param component - Component name (for error messages)
   * @param tokens - Array of tokens to register
   * @throws Error if any token conflicts with existing tokens
   */
  registerBatch(component, tokens) {
    for (const token of tokens) {
      this.register(token);
    }
  }
  /**
   * Get all registered component tokens
   * 
   * Implements IRegistry.query() interface.
   * 
   * @returns Array of all registered tokens
   */
  query() {
    return Array.from(this.tokens.values());
  }
  /**
   * Get all registered component tokens (alias for query)
   * 
   * @returns Array of all registered tokens
   */
  getAll() {
    return this.query();
  }
  /**
   * Get tokens for a specific component
   * 
   * @param componentName - Component name to filter by
   * @returns Array of tokens for the component
   */
  getByComponent(componentName) {
    return this.byComponent.get(componentName) || [];
  }
  /**
   * Get tokens by token family
   * 
   * @param familyName - Family name to filter by (e.g., 'spacing', 'fontSize')
   * @returns Array of tokens in the family
   */
  getByFamily(familyName) {
    return this.byFamily.get(familyName) || [];
  }
  /**
   * Get a specific token by name
   * 
   * Implements IRegistry.get() interface.
   * 
   * @param tokenName - Full token name (e.g., 'buttonicon.inset.large')
   * @returns Token if found, undefined otherwise
   */
  get(tokenName) {
    return this.tokens.get(tokenName);
  }
  /**
   * Check if a token exists
   * 
   * Implements IRegistry.has() interface.
   * 
   * @param tokenName - Full token name to check
   * @returns True if token exists, false otherwise
   */
  has(tokenName) {
    return this.tokens.has(tokenName);
  }
  /**
   * Get registry statistics
   * 
   * @returns Statistics about registered tokens
   */
  getStats() {
    const componentStats = {};
    for (const [component, tokens] of this.byComponent) {
      componentStats[component] = tokens.length;
    }
    const familyStats = {};
    for (const [family, tokens] of this.byFamily) {
      familyStats[family] = tokens.length;
    }
    return {
      totalTokens: this.tokens.size,
      componentCount: this.byComponent.size,
      familyCount: this.byFamily.size,
      componentStats,
      familyStats
    };
  }
  /**
   * Remove a token from the registry
   * 
   * @param tokenName - Full token name to remove
   * @returns True if token was removed, false if not found
   */
  remove(tokenName) {
    if (!this.tokens.has(tokenName)) {
      return false;
    }
    this.removeFromIndexes(tokenName);
    this.tokens.delete(tokenName);
    return true;
  }
  /**
   * Clear all tokens from the registry
   * 
   * Useful for testing to reset state between tests.
   */
  clear() {
    this.tokens.clear();
    this.byComponent.clear();
    this.byFamily.clear();
  }
  /**
   * Remove a token from component and family indexes
   * 
   * @param tokenName - Token name to remove from indexes
   */
  removeFromIndexes(tokenName) {
    const token = this.tokens.get(tokenName);
    if (!token) return;
    const componentTokens = this.byComponent.get(token.component);
    if (componentTokens) {
      const index = componentTokens.findIndex((t) => t.name === tokenName);
      if (index !== -1) {
        componentTokens.splice(index, 1);
      }
      if (componentTokens.length === 0) {
        this.byComponent.delete(token.component);
      }
    }
    const familyTokens = this.byFamily.get(token.family);
    if (familyTokens) {
      const index = familyTokens.findIndex((t) => t.name === tokenName);
      if (index !== -1) {
        familyTokens.splice(index, 1);
      }
      if (familyTokens.length === 0) {
        this.byFamily.delete(token.family);
      }
    }
  }
};
var ComponentTokenRegistry = new ComponentTokenRegistryImpl();

// node_modules/@3fn/core/src/build/tokens/defineComponentTokens.ts
function isTokenWithReference(definition) {
  return "reference" in definition;
}
function defineComponentTokens(config) {
  const { component, family, tokens } = config;
  if (!component || component.trim() === "") {
    throw new Error("Component name is required for defineComponentTokens()");
  }
  if (!family || family.trim() === "") {
    throw new Error("Token family is required for defineComponentTokens()");
  }
  if (!tokens || Object.keys(tokens).length === 0) {
    throw new Error("At least one token definition is required for defineComponentTokens()");
  }
  const values = {};
  const registeredTokens = [];
  for (const [key, definition] of Object.entries(tokens)) {
    const tokenName = `${component.toLowerCase()}.${key}`;
    if (isTokenWithReference(definition)) {
      const primitiveToken = definition.reference;
      const value = primitiveToken.baseValue;
      values[key] = value;
      registeredTokens.push({
        name: tokenName,
        component,
        family,
        value,
        primitiveReference: primitiveToken.name,
        reasoning: definition.reasoning
      });
    } else {
      values[key] = definition.value;
      registeredTokens.push({
        name: tokenName,
        component,
        family,
        value: definition.value,
        reasoning: definition.reasoning
      });
    }
  }
  ComponentTokenRegistry.registerBatch(component, registeredTokens);
  return values;
}

// node_modules/@3fn/core/src/build/tokens/UnitConverter.ts
var UnitConverter = class {
  defaultWebBaseFontSize = 16;
  defaultPrecision = 2;
  /**
   * Convert unitless baseValue to all platform-specific units
   */
  convertToAllPlatforms(baseValue, tokenName, options = {}) {
    const ios = this.convertToiOS(baseValue, tokenName, options);
    const android = this.convertToAndroid(baseValue, tokenName, options);
    const web = this.convertToWeb(baseValue, tokenName, options);
    const validation = this.validateMathematicalConsistency(
      baseValue,
      ios,
      android,
      web,
      options
    );
    return {
      ios,
      android,
      web,
      mathematicallyConsistent: validation.consistent,
      reasoning: validation.reasoning
    };
  }
  /**
   * Convert to iOS pt units
   * 
   * iOS uses points (pt) which are density-independent.
   * Direct 1:1 conversion from baseValue to pt.
   */
  convertToiOS(baseValue, tokenName, options = {}) {
    const precision = options.precision ?? this.defaultPrecision;
    const value = this.roundToPrecision(baseValue, precision);
    return {
      value,
      unit: "pt",
      token: tokenName
    };
  }
  /**
   * Convert to Android dp/sp units
   * 
   * Android uses:
   * - dp (density-independent pixels) for spacing, sizing
   * - sp (scalable pixels) for typography
   * 
   * Direct 1:1 conversion from baseValue to dp/sp.
   */
  convertToAndroid(baseValue, tokenName, options = {}) {
    const precision = options.precision ?? this.defaultPrecision;
    const value = this.roundToPrecision(baseValue, precision);
    const unit = this.isTypographyToken(tokenName, options.category) ? "sp" : "dp";
    return {
      value,
      unit,
      token: tokenName
    };
  }
  /**
   * Convert to Web px/rem units
   * 
   * Web uses:
   * - px (pixels) for most values
   * - rem (root em) for typography and responsive spacing
   * 
   * Direct 1:1 conversion from baseValue to px.
   * For rem: baseValue / webBaseFontSize (default 16)
   */
  convertToWeb(baseValue, tokenName, options = {}) {
    const precision = options.precision ?? this.defaultPrecision;
    const webBaseFontSize = options.webBaseFontSize ?? this.defaultWebBaseFontSize;
    const useRem = this.isTypographyToken(tokenName, options.category);
    if (useRem) {
      const remValue = baseValue / webBaseFontSize;
      return {
        value: this.roundToPrecision(remValue, precision),
        unit: "rem",
        token: tokenName
      };
    }
    return {
      value: this.roundToPrecision(baseValue, precision),
      unit: "px",
      token: tokenName
    };
  }
  /**
   * Validate mathematical consistency across platforms
   * 
   * Ensures that the same baseValue produces equivalent visual results
   * across all platforms, accounting for unit differences.
   */
  validateMathematicalConsistency(baseValue, ios, android, web, options) {
    const webBaseFontSize = options.webBaseFontSize ?? this.defaultWebBaseFontSize;
    const iosConsistent = ios.value === baseValue;
    const androidConsistent = android.value === baseValue;
    let webConsistent = false;
    if (web.unit === "px") {
      webConsistent = web.value === baseValue;
    } else if (web.unit === "rem") {
      const expectedRem = baseValue / webBaseFontSize;
      webConsistent = Math.abs(web.value - expectedRem) < 1e-3;
    }
    const allConsistent = iosConsistent && androidConsistent && webConsistent;
    if (allConsistent) {
      return {
        consistent: true,
        reasoning: `All platforms maintain mathematical consistency: baseValue ${baseValue} \u2192 iOS ${ios.value}${ios.unit}, Android ${android.value}${android.unit}, Web ${web.value}${web.unit}`
      };
    }
    const issues = [];
    if (!iosConsistent) {
      issues.push(`iOS: expected ${baseValue}pt, got ${ios.value}pt`);
    }
    if (!androidConsistent) {
      issues.push(`Android: expected ${baseValue}${android.unit}, got ${android.value}${android.unit}`);
    }
    if (!webConsistent) {
      if (web.unit === "rem") {
        const expectedRem = baseValue / webBaseFontSize;
        issues.push(`Web: expected ${expectedRem}rem, got ${web.value}rem`);
      } else {
        issues.push(`Web: expected ${baseValue}px, got ${web.value}px`);
      }
    }
    return {
      consistent: false,
      reasoning: `Mathematical inconsistency detected: ${issues.join("; ")}`
    };
  }
  /**
   * Check if token is typography-related
   */
  isTypographyToken(tokenName, category) {
    if (category === "typography") {
      return true;
    }
    const typographyPatterns = [
      /font/i,
      /text/i,
      /typography/i,
      /lineHeight/i,
      /letterSpacing/i
    ];
    return typographyPatterns.some((pattern) => pattern.test(tokenName));
  }
  /**
   * Round value to specified precision
   */
  roundToPrecision(value, precision) {
    const multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
  }
  /**
   * Apply scale factor with rounding to whole pixel values
   * 
   * This method is used for scale tokens (e.g., scale088 = 0.88) to ensure
   * that scaled values produce whole pixel values for consistent rendering.
   * 
   * Example: 16px × 0.88 = 14.08px → rounds to 14px
   * 
   * @param baseValue - The base value to scale (e.g., 16)
   * @param scaleFactor - The scale factor to apply (e.g., 0.88)
   * @returns Rounded whole pixel value
   * 
   * Logs warning if precision loss exceeds 0.5px threshold
   */
  applyScaleWithRounding(baseValue, scaleFactor) {
    const scaledValue = baseValue * scaleFactor;
    const roundedValue = Math.round(scaledValue);
    const precisionLoss = Math.abs(scaledValue - roundedValue);
    if (precisionLoss > 0.5) {
      console.warn(
        `Rounding precision loss: ${baseValue}px \xD7 ${scaleFactor} = ${scaledValue}px \u2192 ${roundedValue}px (loss: ${precisionLoss.toFixed(2)}px)`
      );
    }
    return roundedValue;
  }
  /**
   * Convert single platform value
   */
  convertToPlatform(baseValue, tokenName, platform, options = {}) {
    switch (platform) {
      case "ios":
        return this.convertToiOS(baseValue, tokenName, options);
      case "android":
        return this.convertToAndroid(baseValue, tokenName, options);
      case "web":
        return this.convertToWeb(baseValue, tokenName, options);
      default:
        throw new Error(`Unknown platform: ${platform}`);
    }
  }
};
var unitConverter = new UnitConverter();

// src/tokens/SpacingTokens.ts
var STRATEGIC_FLEXIBILITY_TOKENS = {
  space075: { value: 6, derivation: "space100 \xD7 0.75" },
  space125: { value: 10, derivation: "space100 \xD7 1.25" },
  space250: { value: 20, derivation: "space100 \xD7 2.5" }
};
var SPACING_BASE_VALUE = 8;
function generateSpacingPlatformValues(baseValue) {
  return {
    web: { value: baseValue, unit: "px" },
    ios: { value: baseValue, unit: "pt" },
    android: { value: baseValue, unit: "dp" }
  };
}
var spacingTokens = {
  space000: {
    name: "space000",
    category: "spacing" /* SPACING */,
    baseValue: 0,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Zero spacing - explicit no spacing value",
    mathematicalRelationship: "base \xD7 0 = 8 \xD7 0 = 0",
    baselineGridAlignment: true,
    // 0 is baseline grid aligned
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(0)
  },
  space025: {
    name: "space025",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 0.25,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Extra tight spacing - 0.25x base value",
    mathematicalRelationship: "base \xD7 0.25 = 8 \xD7 0.25 = 2",
    baselineGridAlignment: false,
    // 2 is not 8-unit aligned
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 0.25)
  },
  space050: {
    name: "space050",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 0.5,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Tight spacing - 0.5x base value",
    mathematicalRelationship: "base \xD7 0.5 = 8 \xD7 0.5 = 4",
    baselineGridAlignment: false,
    // 4 is not 8-unit aligned
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 0.5)
  },
  space075: {
    name: "space075",
    category: "spacing" /* SPACING */,
    baseValue: STRATEGIC_FLEXIBILITY_TOKENS.space075.value,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Strategic flexibility spacing - 0.75x base value",
    mathematicalRelationship: STRATEGIC_FLEXIBILITY_TOKENS.space075.derivation,
    baselineGridAlignment: false,
    // Strategic flexibility exception
    isStrategicFlexibility: true,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(STRATEGIC_FLEXIBILITY_TOKENS.space075.value)
  },
  space100: {
    name: "space100",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Base spacing - 1x base value",
    mathematicalRelationship: "base \xD7 1 = 8 \xD7 1 = 8",
    baselineGridAlignment: true,
    // 8 is baseline grid aligned
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE)
  },
  space125: {
    name: "space125",
    category: "spacing" /* SPACING */,
    baseValue: STRATEGIC_FLEXIBILITY_TOKENS.space125.value,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Strategic flexibility spacing - 1.25x base value",
    mathematicalRelationship: STRATEGIC_FLEXIBILITY_TOKENS.space125.derivation,
    baselineGridAlignment: false,
    // Strategic flexibility exception
    isStrategicFlexibility: true,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(STRATEGIC_FLEXIBILITY_TOKENS.space125.value)
  },
  space150: {
    name: "space150",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 1.5,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Loose spacing - 1.5x base value",
    mathematicalRelationship: "base \xD7 1.5 = 8 \xD7 1.5 = 12",
    baselineGridAlignment: false,
    // 12 is not 8-unit aligned
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 1.5)
  },
  space200: {
    name: "space200",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 2,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Wide spacing - 2x base value",
    mathematicalRelationship: "base \xD7 2 = 8 \xD7 2 = 16",
    baselineGridAlignment: true,
    // 16 is baseline grid aligned (8 × 2)
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 2)
  },
  space250: {
    name: "space250",
    category: "spacing" /* SPACING */,
    baseValue: STRATEGIC_FLEXIBILITY_TOKENS.space250.value,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Strategic flexibility spacing - 2.5x base value",
    mathematicalRelationship: STRATEGIC_FLEXIBILITY_TOKENS.space250.derivation,
    baselineGridAlignment: false,
    // Strategic flexibility exception
    isStrategicFlexibility: true,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(STRATEGIC_FLEXIBILITY_TOKENS.space250.value)
  },
  space300: {
    name: "space300",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 3,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Extra wide spacing - 3x base value",
    mathematicalRelationship: "base \xD7 3 = 8 \xD7 3 = 24",
    baselineGridAlignment: true,
    // 24 is baseline grid aligned (8 × 3)
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 3)
  },
  space400: {
    name: "space400",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 4,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Large spacing - 4x base value",
    mathematicalRelationship: "base \xD7 4 = 8 \xD7 4 = 32",
    baselineGridAlignment: true,
    // 32 is baseline grid aligned (8 × 4)
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 4)
  },
  space500: {
    name: "space500",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 5,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Extra large spacing - 5x base value",
    mathematicalRelationship: "base \xD7 5 = 8 \xD7 5 = 40",
    baselineGridAlignment: true,
    // 40 is baseline grid aligned (8 × 5)
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 5)
  },
  space600: {
    name: "space600",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 6,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Huge spacing - 6x base value",
    mathematicalRelationship: "base \xD7 6 = 8 \xD7 6 = 48",
    baselineGridAlignment: true,
    // 48 is baseline grid aligned (8 × 6)
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 6)
  },
  space700: {
    name: "space700",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 7,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Extra huge spacing - 7x base value",
    mathematicalRelationship: "base \xD7 7 = 8 \xD7 7 = 56",
    baselineGridAlignment: true,
    // 56 is baseline grid aligned (8 × 7)
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 7)
  },
  space800: {
    name: "space800",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 8,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Maximum spacing - 8x base value",
    mathematicalRelationship: "base \xD7 8 = 8 \xD7 8 = 64",
    baselineGridAlignment: true,
    // 64 is baseline grid aligned (8 × 8)
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 8)
  },
  space900: {
    name: "space900",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 9,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Section spacing - 9x base value",
    mathematicalRelationship: "base \xD7 9 = 8 \xD7 9 = 72",
    baselineGridAlignment: true,
    // 72 is baseline grid aligned (8 × 9)
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 9)
  },
  space1200: {
    name: "space1200",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 12,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Page section spacing - 12x base value",
    mathematicalRelationship: "base \xD7 12 = 8 \xD7 12 = 96",
    baselineGridAlignment: true,
    // 96 is baseline grid aligned (8 × 12)
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 12)
  },
  space1600: {
    name: "space1600",
    category: "spacing" /* SPACING */,
    baseValue: SPACING_BASE_VALUE * 16,
    familyBaseValue: SPACING_BASE_VALUE,
    description: "Page section spacing - 16x base value",
    mathematicalRelationship: "base \xD7 16 = 8 \xD7 16 = 128",
    baselineGridAlignment: true,
    // 128 is baseline grid aligned (8 × 16)
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: generateSpacingPlatformValues(SPACING_BASE_VALUE * 16)
  }
};
var spacingTokenNames = Object.keys(spacingTokens);

// src/components/core/Badge-Label-Base/tokens.ts
var BadgeLabelBaseTokens = defineComponentTokens({
  component: "BadgeLabelBase",
  family: "spacing",
  tokens: {
    "maxWidth": {
      value: SPACING_BASE_VALUE * 15,
      // 8 × 15 = 120px
      reasoning: "Maximum width for truncated badges; allows ~12-15 characters before ellipsis while maintaining compact badge appearance. Value follows spacing family pattern (8 \xD7 15 = 120px) but exceeds standard spacing scale, requiring component-level definition."
    }
  }
});
function getBadgeLabelMaxWidth() {
  return BadgeLabelBaseTokens["maxWidth"];
}

// src/components/core/Badge-Label-Base/platforms/web/BadgeLabelBase.styles.css
var BadgeLabelBase_styles_default = "/**\n * Badge-Label-Base Styles for Web Platform\n * \n * Stemma System: Badge Family\n * Component Type: Type Primitive (Label)\n * \n * Token-based styling using CSS custom properties.\n * All values reference design tokens for consistency and theming support.\n * \n * @see .kiro/specs/044-badge-base/design.md for design specification\n * @see Requirements 1.1-1.10, 4.1-4.8 in .kiro/specs/044-badge-base/requirements.md\n */\n\n/* ============================================================================\n * Base Badge Styles\n * ============================================================================ */\n\n.badge-label {\n  /* Layout */\n  display: inline-flex;\n  align-items: center;\n  box-sizing: border-box;\n  \n  /* Shape - radiusSubtle (2px) */\n  border-radius: var(--radius-subtle);\n  \n  /* Colors - default surface/text */\n  background-color: var(--color-structure-surface);\n  color: var(--color-text-default);\n  \n  /* Non-interactive */\n  pointer-events: none;\n  user-select: none;\n  \n  /* Prevent focus */\n  outline: none;\n}\n\n/* ============================================================================\n * Size Variants\n * ============================================================================ */\n\n/* Small (sm) */\n.badge-label--sm {\n  /* Typography: typography.labelXs - using composite token references */\n  font-family: var(--typography-label-xs-font-family);\n  font-size: var(--typography-label-xs-font-size);\n  line-height: var(--typography-label-xs-line-height);\n  font-weight: var(--typography-label-xs-font-weight);\n  letter-spacing: var(--typography-label-xs-letter-spacing);\n  \n  /* Padding: space.inset.none (v), space.inset.050 (h) */\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: var(--space-050);\n  padding-right: var(--space-050);\n  \n  /* Icon gap: space.grouped.minimal */\n  gap: var(--space-025);\n}\n\n/* Medium (md) - default */\n.badge-label--md {\n  /* Typography: typography.labelSm - using composite token references */\n  font-family: var(--typography-label-sm-font-family);\n  font-size: var(--typography-label-sm-font-size);\n  line-height: var(--typography-label-sm-line-height);\n  font-weight: var(--typography-label-sm-font-weight);\n  letter-spacing: var(--typography-label-sm-letter-spacing);\n  \n  /* Padding: space.inset.050 (v), space.inset.100 (h) */\n  padding-top: var(--space-050);\n  padding-bottom: var(--space-050);\n  padding-left: var(--space-100);\n  padding-right: var(--space-100);\n  \n  /* Icon gap: space.grouped.tight */\n  gap: var(--space-050);\n}\n\n/* Large (lg) */\n.badge-label--lg {\n  /* Typography: typography.labelMd - using composite token references */\n  font-family: var(--typography-label-md-font-family);\n  font-size: var(--typography-label-md-font-size);\n  line-height: var(--typography-label-md-line-height);\n  font-weight: var(--typography-label-md-font-weight);\n  letter-spacing: var(--typography-label-md-letter-spacing);\n  \n  /* Padding: space.inset.100 (v), space.inset.150 (h) */\n  padding-top: var(--space-100);\n  padding-bottom: var(--space-100);\n  padding-left: var(--space-150);\n  padding-right: var(--space-150);\n  \n  /* Icon gap: space.grouped.tight */\n  gap: var(--space-050);\n}\n\n/* ============================================================================\n * Label Text\n * ============================================================================ */\n\n.badge-label__text {\n  /* Inherit typography from parent */\n  font: inherit;\n  color: inherit;\n  \n  /* Prevent text selection */\n  user-select: none;\n}\n\n/* Truncation modifier */\n.badge-label__text--truncate {\n  /* Truncation with ellipsis */\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  \n  /* Max-width from component token: badgelabelbase.maxWidth (120px)\n   * Uses generated token name with fallback for compatibility */\n  max-width: var(--badgelabelbase-max-width, 120px);\n}\n\n/* ============================================================================\n * Icon Container\n * ============================================================================ */\n\n.badge-label__icon {\n  /* Flex shrink prevention */\n  flex-shrink: 0;\n  \n  /* Inherit color for icon */\n  color: inherit;\n  \n  /* Vertical alignment */\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n/* ============================================================================\n * Accessibility\n * ============================================================================ */\n\n/* High contrast mode support */\n@media (prefers-contrast: high) {\n  .badge-label {\n    border: 1px solid currentColor;\n  }\n}\n\n/* Reduced motion - no animations to reduce */\n@media (prefers-reduced-motion: reduce) {\n  .badge-label {\n    transition: none;\n  }\n}\n\n/* Print styles */\n@media print {\n  .badge-label {\n    background-color: transparent;\n    border: 1px solid currentColor;\n  }\n}\n";

// src/components/core/Badge-Label-Base/platforms/web/BadgeLabelBase.web.ts
var BadgeLabelBase = class extends HTMLElement {
  _shadowRoot;
  /**
   * Observed attributes for automatic re-rendering on change.
   * 
   * When these attributes change, attributeChangedCallback is invoked.
   */
  static get observedAttributes() {
    return ["label", "size", "icon", "truncate", "test-id"];
  }
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }
  /**
   * Called when the element is added to the DOM.
   * 
   * Performs initial render of the badge component.
   */
  connectedCallback() {
    this.render();
  }
  /**
   * Called when an observed attribute changes.
   * 
   * Triggers re-render to reflect the new attribute value.
   * Only re-renders if the element is connected to the DOM.
   * 
   * @param _name - Attribute name (unused, prefixed with underscore)
   * @param oldValue - Previous attribute value
   * @param newValue - New attribute value
   */
  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.render();
    }
  }
  // ============================================================================
  // Property Getters/Setters
  // ============================================================================
  /**
   * Get the badge label text.
   * 
   * @returns Label text or empty string
   * @see Requirement 1.1 - label prop renders text content
   */
  get label() {
    return this.getAttribute("label") || "";
  }
  /**
   * Set the badge label text.
   */
  set label(value) {
    this.setAttribute("label", value);
  }
  /**
   * Get the badge size variant.
   * 
   * @returns Size variant (defaults to 'md')
   * @see Requirements 1.2, 1.3 - size prop with default
   */
  get size() {
    const size = this.getAttribute("size");
    return size === "sm" || size === "md" || size === "lg" ? size : BADGE_LABEL_DEFAULTS.size;
  }
  /**
   * Set the badge size variant.
   */
  set size(value) {
    this.setAttribute("size", value);
  }
  /**
   * Get the icon name.
   * 
   * @returns Icon name or null
   * @see Requirement 1.4 - optional leading icon
   */
  get icon() {
    return this.getAttribute("icon");
  }
  /**
   * Set the icon name.
   */
  set icon(value) {
    if (value) {
      this.setAttribute("icon", value);
    } else {
      this.removeAttribute("icon");
    }
  }
  /**
   * Get the truncation state.
   * 
   * @returns true if truncation enabled, false otherwise
   * @see Requirements 1.5, 1.7 - truncate prop with default
   */
  get truncate() {
    return this.getAttribute("truncate") === "true";
  }
  /**
   * Set the truncation state.
   */
  set truncate(value) {
    if (value) {
      this.setAttribute("truncate", "true");
    } else {
      this.removeAttribute("truncate");
    }
  }
  /**
   * Get the test ID.
   * 
   * @returns Test ID or null
   */
  get testID() {
    return this.getAttribute("test-id");
  }
  /**
   * Set the test ID.
   */
  set testID(value) {
    if (value) {
      this.setAttribute("test-id", value);
    } else {
      this.removeAttribute("test-id");
    }
  }
  // ============================================================================
  // Rendering
  // ============================================================================
  /**
   * Render the component into shadow DOM.
   * 
   * Generates the badge structure with appropriate size, icon, and truncation.
   * Uses external CSS file for token-based styling.
   * 
   * @see Requirements: 1.1-1.10, 4.1, 4.2, 4.4, 4.5, 4.6, 4.8, 5.1
   */
  render() {
    const label = this.label;
    const size = this.size;
    const icon = this.icon;
    const truncate = this.truncate;
    const testID = this.testID;
    const sizeTokens = BADGE_LABEL_SIZE_TOKENS[size];
    const iconSize = sizeTokens.iconSize;
    const badgeClasses = [
      "badge-label",
      `badge-label--${size}`
    ].join(" ");
    const textClasses = [
      "badge-label__text",
      truncate ? "badge-label__text--truncate" : ""
    ].filter(Boolean).join(" ");
    const testIDAttr = testID ? ` data-testid="${this.escapeHtml(testID)}"` : "";
    const titleAttr = truncate ? ` title="${this.escapeHtml(label)}"` : "";
    const iconHTML = icon ? `
      <span class="badge-label__icon" aria-hidden="true">
        <icon-base name="${icon}" size="${iconSize}" color="inherit"></icon-base>
      </span>
    ` : "";
    const maxWidth = getBadgeLabelMaxWidth();
    this._shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        /* Override max-width with component token value */
        .badge-label__text--truncate {
          max-width: ${maxWidth}px;
        }
        ${BadgeLabelBase_styles_default}
      </style>
      <span class="${badgeClasses}"${testIDAttr}${titleAttr}>
        ${iconHTML}
        <span class="${textClasses}">${this.escapeHtml(label)}</span>
      </span>
    `;
  }
  /**
   * Escape HTML entities to prevent XSS attacks.
   * 
   * @param str - String to escape
   * @returns Escaped string safe for HTML insertion
   */
  escapeHtml(str) {
    const htmlEntities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return str.replace(/[&<>"']/g, (char) => htmlEntities[char]);
  }
};
if (!customElements.get("badge-label-base")) {
  customElements.define("badge-label-base", BadgeLabelBase);
}

// src/components/product/NavAboutPopover/NavAboutPopover.web.ts
var PANEL_ID = "about-menu";
var NavAboutPopover = class _NavAboutPopover extends HTMLElement {
  _shadowRoot;
  _isOpen = false;
  _trigger;
  _panel;
  _outsideClickHandler = this._handleOutsideClick.bind(this);
  _keydownHandler = this._handleKeydown.bind(this);
  _hideTimeout = null;
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this._render();
    this._trigger = this._shadowRoot.querySelector("[data-trigger]");
    this._panel = this._shadowRoot.querySelector("[data-panel]");
    this._trigger.addEventListener("click", () => this._toggle());
  }
  disconnectedCallback() {
    this._removeGlobalListeners();
  }
  // --- Toggle ---
  _toggle() {
    this._isOpen ? this._close() : this._open();
  }
  _open() {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
    this._isOpen = true;
    this._trigger.setAttribute("aria-expanded", "true");
    this._panel.hidden = false;
    this._panel.offsetHeight;
    this._panel.classList.add("is-open");
    this._addGlobalListeners();
    requestAnimationFrame(() => {
      const firstLink = this._panel.querySelector("a");
      firstLink?.focus();
    });
  }
  _close(returnFocus = false) {
    this._isOpen = false;
    this._trigger.setAttribute("aria-expanded", "false");
    this._panel.classList.remove("is-open");
    this._removeGlobalListeners();
    const onEnd = () => {
      this._panel.hidden = true;
      this._panel.removeEventListener("transitionend", onEnd);
    };
    this._panel.addEventListener("transitionend", onEnd);
    if (getComputedStyle(this._panel).transitionDuration === "0s") {
      this._panel.hidden = true;
    } else {
      this._hideTimeout = setTimeout(() => {
        if (!this._isOpen) {
          this._panel.hidden = true;
          this._panel.removeEventListener("transitionend", onEnd);
        }
        this._hideTimeout = null;
      }, 200);
    }
    if (returnFocus) {
      this._trigger.focus();
    }
  }
  // --- Dismiss handlers ---
  _handleOutsideClick(e) {
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._close();
    }
  }
  _handleKeydown(e) {
    if (e.key === "Escape") {
      this._close(true);
    }
  }
  _handleFocusOut = (e) => {
    requestAnimationFrame(() => {
      const active = this._shadowRoot.activeElement ?? document.activeElement;
      const stillInside = this._panel.contains(active) || this._trigger === active;
      if (!stillInside && this._isOpen) {
        this._close();
      }
    });
  };
  // --- Global listener management ---
  _addGlobalListeners() {
    document.addEventListener("click", this._outsideClickHandler, true);
    document.addEventListener("keydown", this._keydownHandler);
    this._shadowRoot.addEventListener("focusout", this._handleFocusOut);
  }
  _removeGlobalListeners() {
    document.removeEventListener("click", this._outsideClickHandler, true);
    document.removeEventListener("keydown", this._keydownHandler);
    this._shadowRoot.removeEventListener("focusout", this._handleFocusOut);
  }
  // --- Render ---
  static ITEMS = [
    { prefix: "//", label: "Why build this system?", href: "#why-build" },
    { prefix: "//", label: "What is this ecosystem?", href: "#ecosystem" },
    { prefix: "//", label: "How was this system built?", href: "#how-built" },
    { prefix: "//", label: "Who is this system built for?", href: "#audience" },
    { prefix: "//", label: "Humans + Agents of this system", href: "#who-built" },
    { prefix: "//", label: "Let's build together", href: "#cta" }
  ];
  _render() {
    const items = _NavAboutPopover.ITEMS.map(({ prefix, label, href }) => `
      <li>
        <a href="${href}" class="item">
          <span class="item__prefix" aria-hidden="true">${prefix}</span>
          <span class="item__label">${label}</span>
        </a>
       </li>
    `).join("");
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
          transition: background var(--duration-150) var(--easing-standard), color var(--duration-150) var(--easing-standard);
        }
        .item:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--color-action-primary);
        }
        .item:active {
          background: rgba(255, 255, 255, 0.12);
        }
        .item:focus-visible {
          outline: 2px solid var(--color-action-primary);
          outline-offset: -2px;
        }

        /* Prefix \u2014 fixed width for consistent label alignment */
        .item__prefix {
          display: inline-block;
          inline-size: var(--space-inset-300);
          flex-shrink: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          [data-panel] { transition: none; }
        }

        @media (forced-colors: active) {
          [data-trigger] {
            border: 1px solid ButtonText;
          }
          [data-trigger]:focus-visible {
            outline: 2px solid Highlight;
          }
          .item {
            border: 1px solid transparent;
          }
          .item:focus-visible {
            outline: 2px solid Highlight;
          }
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
};
if (!customElements.get("nav-about-popover")) {
  customElements.define("nav-about-popover", NavAboutPopover);
}

// src/components/product/NavHeaderContent/NavHeaderContent.web.ts
var NavHeaderContent = class extends HTMLElement {
  connectedCallback() {
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
};
if (!customElements.get("nav-header-content")) {
  customElements.define("nav-header-content", NavHeaderContent);
}
