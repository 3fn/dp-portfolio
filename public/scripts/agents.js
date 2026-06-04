// src/scripts/agents.ts
function init() {
  const portraits = document.querySelectorAll(".agents__portraits object");
  const lists = document.querySelectorAll(".agents__list");
  if (!portraits.length || !lists.length) return () => {
  };
  const cleanupFns = [];
  function setupHover() {
    lists.forEach((list) => {
      list.querySelectorAll("li").forEach((li) => {
        const onEnter = () => {
          const nameEl = li.querySelector(".agents__agent-name");
          if (!nameEl) return;
          const agentName = nameEl.id.replace("directory__", "");
          const portraitId = "portrait__" + agentName;
          portraits.forEach((obj) => {
            const doc = obj.contentDocument;
            if (!doc) return;
            const hasMatch = !!doc.getElementById(portraitId);
            if (hasMatch) obj.style.mixBlendMode = "normal";
            doc.querySelectorAll('[id^="portrait__"]').forEach((el) => {
              el.style.transition = "opacity 0.2s ease";
              el.style.opacity = el.id === portraitId ? "1" : "0.3";
            });
          });
        };
        const onLeave = () => {
          portraits.forEach((obj) => {
            obj.style.mixBlendMode = "";
            const doc = obj.contentDocument;
            if (!doc) return;
            doc.querySelectorAll('[id^="portrait__"]').forEach((el) => {
              el.style.opacity = "1";
            });
          });
        };
        li.addEventListener("mouseenter", onEnter);
        li.addEventListener("mouseleave", onLeave);
        cleanupFns.push(() => {
          li.removeEventListener("mouseenter", onEnter);
          li.removeEventListener("mouseleave", onLeave);
        });
      });
    });
  }
  let loaded = 0;
  portraits.forEach((obj) => {
    const onLoad = () => {
      loaded++;
      if (loaded === portraits.length) setupHover();
    };
    obj.addEventListener("load", onLoad);
    cleanupFns.push(() => obj.removeEventListener("load", onLoad));
    if (obj.contentDocument?.querySelector("svg")) {
      loaded++;
      if (loaded === portraits.length) setupHover();
    }
  });
  return () => {
    cleanupFns.forEach((fn) => fn());
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
