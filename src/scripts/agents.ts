// Agent portrait interaction — extracted from prototype
const portraits = document.querySelectorAll('.agents__portraits object') as NodeListOf<HTMLObjectElement>;
const lists = document.querySelectorAll('.agents__list');

let loaded = 0;
portraits.forEach(obj => {
  obj.addEventListener('load', () => {
    loaded++;
    if (loaded === portraits.length) initHover();
  });
  // Already loaded (cached)
  if (obj.contentDocument?.querySelector('svg')) {
    loaded++;
    if (loaded === portraits.length) initHover();
  }
});

function initHover() {
  lists.forEach(list => {
    list.querySelectorAll('li').forEach(li => {
      li.addEventListener('mouseenter', () => {
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
      });

      li.addEventListener('mouseleave', () => {
        portraits.forEach(obj => {
          obj.style.mixBlendMode = '';
          const doc = obj.contentDocument;
          if (!doc) return;
          doc.querySelectorAll('[id^="portrait__"]').forEach(el => {
            (el as SVGElement).style.opacity = '1';
          });
        });
      });
    });
  });
}
