// src/scripts/reveal.ts
function initReveal() {
  const elements = document.querySelectorAll(".reveal-hidden");
  if (!elements.length) return;
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
}
document.addEventListener("DOMContentLoaded", initReveal);
