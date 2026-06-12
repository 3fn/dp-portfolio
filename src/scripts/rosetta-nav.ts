/**
 * Rosetta docs nav rail — scroll-tracked active state + URL hash handling.
 * Exports init/cleanup for Astro island compatibility.
 */

export function init(): () => void {
  const nav = document.querySelector('.docs-nav') as HTMLElement | null;
  if (!nav) return () => {};

  const links = nav.querySelectorAll<HTMLAnchorElement>('.docs-nav__link');
  const sections = document.querySelectorAll<HTMLElement>('[id^="beat-"]');
  if (!links.length || !sections.length) return () => {};

  // Scroll-tracked active state
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        links.forEach(link => {
          const isCurrent = link.getAttribute('href') === `#${id}`;
          link.setAttribute('aria-current', isCurrent ? 'true' : 'false');
        });
      }
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));

  // URL hash on load — scroll to beat + set state
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash) as HTMLElement | null;
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView());
    }
  }

  return () => { observer.disconnect(); };
}

// DOMContentLoaded fallback boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => init());
} else {
  init();
}
