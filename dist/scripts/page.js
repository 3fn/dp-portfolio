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

// src/components/product/NavAboutPopover/NavAboutPopover.web.ts
var PANEL_ID = "about-menu";
var NavAboutPopover = class _NavAboutPopover extends HTMLElement {
  _shadowRoot;
  _isOpen = false;
  _trigger;
  _panel;
  _outsideClickHandler = this._handleOutsideClick.bind(this);
  _keydownHandler = this._handleKeydown.bind(this);
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
    { prefix: "//", label: "Why build this system?", href: "#why-build-this" },
    { prefix: "//", label: "What is this ecosystem?", href: "#what-is-this-ecosystem" },
    { prefix: "!!", label: "Critical system features", href: "#critical-system-features" },
    { prefix: "//", label: "How was this built?", href: "#how-was-this-built" },
    { prefix: "//", label: "Who built this system?", href: "#who-built-this" },
    { prefix: "//", label: "What can I accomplish with your team?", href: "#what-can-i-accomplish" }
  ];
  _render() {
    const items = _NavAboutPopover.ITEMS.map(({ prefix, label, href }) => `
      <a href="${href}" class="item">
        <span class="item__prefix" aria-hidden="true">${prefix}</span>
        <span class="item__label">${label}</span>
      </a>
    `).join("");
    this._shadowRoot.innerHTML = `
      <style>
        :host { position: relative; display: inline-block; }

        /* Trigger button */
        [data-trigger] {
          all: unset;
          cursor: pointer;
          padding-block: var(--navheaderapp-nav-button-padding-vertical, var(--space-250, 20px));
          padding-inline: var(--space-inset-200, 16px);
          font-family: var(--font-family-display);
          font-size: var(--font-size-150, 16px);
          font-weight: var(--font-weight-700, 700);
          line-height: var(--line-height-150, 1.5);
          letter-spacing: var(--letter-spacing-100, 0);
          color: inherit;
          background: transparent;
          border-radius: 0;
        }
        [data-trigger]:hover {
          background: rgba(0, 0, 0, var(--blend-hover-darker, 0.08));
        }
        [data-trigger][aria-expanded="true"] {
          background: var(--color-action-navigation-surface);
        }
        [data-trigger][aria-expanded="true"]:hover {
          background: var(--color-action-navigation-surface);
        }

        /* Panel */
        [data-panel] {
          position: absolute;
          inset-block-start: 100%;
          inset-inline-end: 0;
          background: var(--color-action-navigation-surface);
          padding-block: var(--space-inset-200, 16px);
          z-index: var(--z-index-dropdown, 300);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity var(--duration-150, 150ms) ease-in,
                      transform var(--duration-150, 150ms) ease-in;
        }
        [data-panel].is-open {
          opacity: 1;
          transform: translateY(0);
          transition-timing-function: ease-out;
        }
        [data-panel][hidden] { display: none; }

        /* Items */
        .item {
          display: flex;
          align-items: center;
          padding-block: var(--space-inset-100, 8px);
          padding-inline: var(--space-300, 24px);
          font-family: var(--font-family-display);
          font-size: var(--font-size-200, 18px);
          font-weight: var(--font-weight-700, 700);
          line-height: var(--line-height-200, 1.5);
          letter-spacing: var(--letter-spacing-100, 0);
          color: inherit;
          text-decoration: none;
          gap: var(--space-grouped-tight, 4px);
        }

        /* Prefix \u2014 fixed width for consistent label alignment */
        .item__prefix {
          display: inline-block;
          inline-size: 1.5em;
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
        ${items}
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
      <nav-header-app>
        <div slot="leading" class="logo-lockup">
          <div class="logo-lockup__logo" aria-hidden="true">
            <img src="/primitive-assets/designerPunkLogo.svg" alt="" />
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
};
if (!customElements.get("nav-header-content")) {
  customElements.define("nav-header-content", NavHeaderContent);
}
