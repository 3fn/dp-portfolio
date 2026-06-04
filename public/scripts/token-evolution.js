// src/scripts/token-evolution.ts
function getPhase(anchor) {
  const rect = anchor.getBoundingClientRect();
  const vh = window.innerHeight;
  if (rect.top >= vh) return 0;
  if (rect.bottom <= 0) return 3;
  const progress = 1 - rect.top / vh;
  if (progress < 0.33) return 0;
  if (progress < 0.55) return 1;
  if (progress < 0.78) return 2;
  return 3;
}
function applyPhase(tokens, phase) {
  for (const token of tokens) {
    if (phase === 0) {
      token.el.classList.remove("resolved");
      if (!token.el.style.transform || token.el.style.transform === "rotate(0deg)") {
        const rot = (Math.random() - 0.5) * 8;
        token.el.style.transform = `rotate(${rot}deg)`;
      }
    } else {
      token.el.classList.add("resolved");
      token.el.style.transform = "";
    }
    const newText = token.states[phase];
    if (token.text.textContent === newText) continue;
    const currentWidth = token.el.offsetWidth;
    token.el.style.inlineSize = currentWidth + "px";
    token.text.style.transform = "rotateX(90deg)";
    token.text.style.opacity = "0";
    setTimeout(() => {
      token.text.textContent = newText;
      token.el.style.inlineSize = "auto";
      const newWidth = token.el.offsetWidth;
      token.el.style.inlineSize = currentWidth + "px";
      token.el.offsetHeight;
      token.el.style.inlineSize = newWidth + "px";
      token.text.style.transform = "rotateX(0deg)";
      token.text.style.opacity = "1";
      setTimeout(() => {
        token.el.style.inlineSize = "";
      }, 350);
    }, 150);
  }
}
function init() {
  const container = document.querySelector(".why-build__evolution");
  if (!container) return () => {
  };
  const anchor = document.querySelector(".why-build__beat:nth-child(2)");
  if (!anchor) return () => {
  };
  const tokenEls = [];
  container.querySelectorAll(".flap-token").forEach((el) => {
    const text = el.querySelector(".flap-text");
    const raw = el.getAttribute("data-states");
    if (!text || !raw) return;
    const states = raw.split("|");
    tokenEls.push({ el, text, states });
  });
  if (!tokenEls.length) return () => {
  };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    applyPhase(tokenEls, 3);
    return () => {
    };
  }
  tokenEls.forEach((token) => {
    const rot = (Math.random() - 0.5) * 8;
    token.el.style.transform = `rotate(${rot}deg)`;
  });
  let currentPhase = -1;
  function onScroll() {
    const phase = getPhase(anchor);
    if (phase === currentPhase) return;
    currentPhase = phase;
    applyPhase(tokenEls, phase);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}
var cleanup = null;
function boot() {
  cleanup = init();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
export {
  cleanup,
  init
};
