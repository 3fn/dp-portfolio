// src/scripts/stats.ts
var DURATION = 500;
function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function formatValue(current, prefix, suffix) {
  return `${prefix}${current}${suffix}`;
}
function animateValue(el, target, prefix, suffix) {
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / DURATION, 1);
    const value = Math.round(easeOut(progress) * target);
    el.textContent = formatValue(value, prefix, suffix);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
function init() {
  const values = document.querySelectorAll(".stats__value");
  if (!values.length) return () => {
  };
  if (prefersReducedMotion()) {
    values.forEach((el) => {
      const target = parseInt(el.dataset.count || "0", 10);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      el.textContent = formatValue(target, prefix, suffix);
    });
    return () => {
    };
  }
  const section = document.getElementById("stats");
  if (!section) return () => {
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        values.forEach((el) => {
          const target = parseInt(el.dataset.count || "0", 10);
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          animateValue(el, target, prefix, suffix);
        });
        observer.disconnect();
      }
    },
    { threshold: 0 }
  );
  observer.observe(section);
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
