// src/scripts/reveal.ts
function init() {
  const elements = document.querySelectorAll(".reveal-hidden");
  if (!elements.length) return () => {
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove("reveal-hidden");
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15 }
  );
  elements.forEach((el) => observer.observe(el));
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
