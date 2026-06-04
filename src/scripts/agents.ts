/**
 * Agent portrait interaction — hover highlights matching portrait in SVG.
 */

export function init(): () => void {
  const portraits = document.querySelectorAll('.agents__portraits object') as NodeListOf<HTMLObjectElement>;
  const lists = document.querySelectorAll('.agents__list');
  if (!portraits.length || !lists.length) return () => {};

  const cleanupFns: Array<() => void> = [];

  function setupHover() {
    lists.forEach(list => {
      list.querySelectorAll('li').forEach(li => {
        const onEnter = () => {
          const nameEl = li.querySelector('.agents__agent-name') as HTMLElement | null;
          if (!nameEl) return;
          const agentName = nameEl.id.replace('directory__', '');
          const portraitId = 'portrait__' + agentName;

          portraits.forEach(obj => {
            const doc = obj.contentDocument;
            if (!doc) return;
            const hasMatch = !!doc.getElementById(portraitId);
            if (hasMatch) obj.style.mixBlendMode = 'normal';
            doc.querySelectorAll('[id^="portrait__"]').forEach(el => {
              (el as SVGElement).style.transition = 'opacity 0.2s ease';
              (el as SVGElement).style.opacity = el.id === portraitId ? '1' : '0.3';
            });
          });
        };

        const onLeave = () => {
          portraits.forEach(obj => {
            obj.style.mixBlendMode = '';
            const doc = obj.contentDocument;
            if (!doc) return;
            doc.querySelectorAll('[id^="portrait__"]').forEach(el => {
              (el as SVGElement).style.opacity = '1';
            });
          });
        };

        li.addEventListener('mouseenter', onEnter);
        li.addEventListener('mouseleave', onLeave);
        cleanupFns.push(() => {
          li.removeEventListener('mouseenter', onEnter);
          li.removeEventListener('mouseleave', onLeave);
        });
      });
    });
  }

  // Wait for SVG objects to load
  let loaded = 0;
  portraits.forEach(obj => {
    const onLoad = () => { loaded++; if (loaded === portraits.length) setupHover(); };
    obj.addEventListener('load', onLoad);
    cleanupFns.push(() => obj.removeEventListener('load', onLoad));
    if (obj.contentDocument?.querySelector('svg')) {
      loaded++;
      if (loaded === portraits.length) setupHover();
    }
  });

  return () => { cleanupFns.forEach(fn => fn()); };
}

// DOMContentLoaded fallback boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => init());
} else {
  init();
}
