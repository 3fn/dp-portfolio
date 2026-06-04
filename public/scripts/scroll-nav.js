// src/scripts/scroll-nav.ts
var BG_MAP = {
  green100: "var(--green-100)",
  pink100: "var(--pink-100)",
  yellow300: "var(--yellow-300)",
  orange100: "var(--orange-100)",
  orange300: "var(--orange-300)",
  teal200: "var(--teal-200)",
  black300: "var(--black-300)",
  black500: "var(--black-500)"
};
var GLOW_MAP = {
  neonGreen: "var(--glow-neon-green)",
  neonPink: "var(--glow-neon-pink)",
  neonPurple: "var(--glow-neon-purple)",
  neonCyan: "var(--glow-neon-cyan)",
  neonYellow: "var(--glow-neon-yellow)"
};
var BORDER_MAP = {
  green400: "var(--green-400)",
  pink400: "var(--pink-400)",
  purple400: "var(--purple-400)",
  cyan400: "var(--cyan-400)"
};
function init() {
  const nav = document.querySelector("nav-header-app");
  if (!nav) return () => {
  };
  const sections = document.querySelectorAll("main > section, main > footer, footer");
  if (!sections.length) return () => {
  };
  const navHeight = nav.getBoundingClientRect().height || 64;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        const bg = el.dataset.navBg;
        const glow = el.dataset.navGlow;
        const border = el.dataset.navBorder;
        const textMode = el.dataset.navText;
        if (bg && BG_MAP[bg]) nav.style.setProperty("--nav-bg-override", BG_MAP[bg]);
        if (glow && GLOW_MAP[glow]) nav.style.setProperty("--nav-glow-color", GLOW_MAP[glow]);
        if (border && BORDER_MAP[border]) nav.style.setProperty("--nav-border-color", BORDER_MAP[border]);
        if (textMode === "light") {
          nav.classList.add("nav--light-text");
          nav.classList.remove("nav--dark-text");
        } else {
          nav.classList.add("nav--dark-text");
          nav.classList.remove("nav--light-text");
        }
      }
    },
    {
      rootMargin: `-${navHeight}px 0px 0px 0px`,
      threshold: 0
    }
  );
  sections.forEach((section) => observer.observe(section));
  return () => {
    observer.disconnect();
  };
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => init());
} else {
  init();
}
export {
  init
};
