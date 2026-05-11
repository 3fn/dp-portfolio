/**
 * Stats count-up animation.
 * Triggers simultaneously with reveal. Respects prefers-reduced-motion.
 */

const DURATION = 500; // duration500

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function formatValue(current: number, prefix: string, suffix: string): string {
  return `${prefix}${current}${suffix}`;
}

function animateValue(el: HTMLElement, target: number, prefix: string, suffix: string): void {
  const start = performance.now();

  function tick(now: number): void {
    const elapsed = now - start;
    const progress = Math.min(elapsed / DURATION, 1);
    const value = Math.round(easeOut(progress) * target);
    el.textContent = formatValue(value, prefix, suffix);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initStats(): void {
  const values = document.querySelectorAll<HTMLElement>('.stats-value');
  if (!values.length) return;

  if (prefersReducedMotion()) {
    values.forEach((el) => {
      const target = parseInt(el.dataset.count || '0', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      el.textContent = formatValue(target, prefix, suffix);
    });
    return;
  }

  // Trigger count-up when stats section enters viewport (simultaneous with reveal)
  const section = document.getElementById('stats');
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        values.forEach((el) => {
          const target = parseInt(el.dataset.count || '0', 10);
          const prefix = el.dataset.prefix || '';
          const suffix = el.dataset.suffix || '';
          animateValue(el, target, prefix, suffix);
        });
        observer.disconnect();
      }
    },
    { threshold: 0.15 }
  );

  observer.observe(section);
}

document.addEventListener('DOMContentLoaded', initStats);
