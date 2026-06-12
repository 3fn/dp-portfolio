// src/scripts/rosetta-nav.ts
function init() {
  const nav = document.querySelector(".docs-nav");
  if (!nav) return () => {
  };
  const links = nav.querySelectorAll(".docs-nav__link");
  const sections = document.querySelectorAll('[id^="beat-"]');
  if (!links.length || !sections.length) return () => {
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        links.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${id}`;
          link.setAttribute("aria-current", isCurrent ? "true" : "false");
        });
      }
    },
    { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView());
    }
  }
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
