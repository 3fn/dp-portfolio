/**
 * Token Evolution — scroll-driven split-flap animation.
 * Transitions 16 token pills through 4 phases as user scrolls through Why Build section.
 * Exports init/cleanup for Astro island compatibility (Spec 006).
 */

interface TokenEl {
  el: HTMLElement;
  text: HTMLElement;
  states: [string, string, string, string];
}

function getPhase(anchor: HTMLElement): number {
  const rect = anchor.getBoundingClientRect();
  const vh = window.innerHeight;

  // Phase 1: anchor below viewport
  if (rect.top >= vh) return 0;
  // Phase 4: anchor above viewport
  if (rect.bottom <= 0) return 3;

  // Phases 1→4 mapped across anchor's travel through viewport
  const progress = 1 - (rect.top / vh);
  if (progress < 0.33) return 0;
  if (progress < 0.55) return 1;
  if (progress < 0.78) return 2;
  return 3;
}

function applyPhase(tokens: TokenEl[], phase: number): void {
  for (const token of tokens) {
    if (phase === 0) {
      token.el.classList.remove('resolved');
      // Re-apply random rotation if not already set
      if (!token.el.style.transform || token.el.style.transform === 'rotate(0deg)') {
        const rot = (Math.random() - 0.5) * 8;
        token.el.style.transform = `rotate(${rot}deg)`;
      }
    } else {
      token.el.classList.add('resolved');
      token.el.style.transform = '';
    }

    const newText = token.states[phase];
    if (token.text.textContent === newText) continue;

    // Capture current width, lock it
    const currentWidth = token.el.offsetWidth;
    token.el.style.inlineSize = currentWidth + 'px';

    // Split-flap: rotate out, swap text, rotate in
    token.text.style.transform = 'rotateX(90deg)';
    token.text.style.opacity = '0';

    setTimeout(() => {
      token.text.textContent = newText;
      // Measure new intrinsic width
      token.el.style.inlineSize = 'auto';
      const newWidth = token.el.offsetWidth;
      // Snap back to old width, then transition to new
      token.el.style.inlineSize = currentWidth + 'px';
      token.el.offsetHeight; // force reflow
      token.el.style.inlineSize = newWidth + 'px';
      token.text.style.transform = 'rotateX(0deg)';
      token.text.style.opacity = '1';
      // Clear explicit width after transition
      setTimeout(() => { token.el.style.inlineSize = ''; }, 350);
    }, 150);
  }
}

export function init(): () => void {
  const container = document.querySelector('.why-build__evolution');
  if (!container) return () => {};

  const anchor = document.querySelector('.why-build__beat:nth-child(2)') as HTMLElement | null;
  if (!anchor) return () => {};

  const tokenEls: TokenEl[] = [];
  container.querySelectorAll('.flap-token').forEach((el) => {
    const text = el.querySelector('.flap-text') as HTMLElement | null;
    const raw = el.getAttribute('data-states');
    if (!text || !raw) return;
    const states = raw.split('|') as [string, string, string, string];
    tokenEls.push({ el: el as HTMLElement, text, states });
  });

  if (!tokenEls.length) return () => {};

  // Reduced motion: show final state immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyPhase(tokenEls, 3);
    return () => {};
  }

  // Set initial random rotations for Phase 1
  tokenEls.forEach((token) => {
    const rot = (Math.random() - 0.5) * 8; // ±4deg
    token.el.style.transform = `rotate(${rot}deg)`;
  });

  let currentPhase = -1;

  function onScroll(): void {
    const phase = getPhase(anchor!);
    if (phase === currentPhase) return;
    currentPhase = phase;
    applyPhase(tokenEls, phase);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // set initial state

  return () => {
    window.removeEventListener('scroll', onScroll);
  };
}

// Auto-init with DOMContentLoaded for pre-Astro usage
let cleanup: (() => void) | null = null;

function boot(): void {
  cleanup = init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

export { cleanup };
