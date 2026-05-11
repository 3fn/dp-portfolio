/**
 * Scroll-reveal animation system.
 * Intersection Observer toggles .reveal-hidden → .reveal-visible (one-shot).
 */

function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('.reveal-hidden');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove('reveal-hidden');
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target); // One-shot
      }
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);
