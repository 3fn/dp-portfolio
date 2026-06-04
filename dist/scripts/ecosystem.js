// src/scripts/ecosystem.ts
var MODAL_DATA = {
  "ecosystem__system--rosetta": {
    header: "/src/assets/illustration/header-rosetta.svg",
    desc: "Rosetta is a math-based token system that generates native code for iOS, Android, and Web from a single source. Rather than declaring static values (8, 16, 24), each token is a simple mathematical assertion (base * 1, base * 2, base * 3). This better enables AI agents to predict names, maintain proportions when base values change, and infinite scalability naming convernions.",
    viz: `<div class="ecosystem__modal-viz"><div class="viz-source">space200</div><div class="viz-indent"><span class="viz-keyword">formula:</span> <span class="viz-value">base \xD7 2 = 8 \xD7 2 = 16</span></div><div class="viz-indent"><span class="viz-keyword">value:</span> <span class="viz-value">16</span> <span class="viz-comment">// unitless</span></div><div style="margin:12px 0"><span class="viz-arrow">\u2500\u2500\u2500\u2500\u2500 generate \u2500\u2500\u2500\u2500\u2500\u25B6</span></div><div class="viz-branch"><span class="viz-output">CSS</span><span class="viz-comment">--space-200: 1rem;</span><span class="viz-output">Swift</span><span class="viz-comment">static let space200: CGFloat = 16</span><span class="viz-output">Kotlin</span><span class="viz-comment">val Space200 = 16.dp</span><span class="viz-output">DTCG</span><span class="viz-comment">"space.200": { "$value": 16 }</span><span class="viz-output">Figma</span><span class="viz-comment">space/200 \u2192 16</span></div></div>`,
    highlights: [
      "Tokens carry their own mathematical formulas, validated at build time \u2014 not key-value pairs, but auditable assertions",
      "Unitless throughout the entire pipeline; platform units (px, pt, dp) applied only at final generation",
      "Dark mode is a two-level resolver, not duplicated tokens \u2014 this expediates theming",
      "Three-tier governance tests catch drift and scale violations before visual QA"
    ],
    stats: [{ value: "410", label: "Source tokens" }, { value: "5", label: "Platform outputs" }, { value: "1,900", label: "Generated tokens" }]
  },
  "ecosystem__system--stemma": {
    header: "/src/assets/illustration/header-stemma.svg",
    desc: "Stemma is a component architecture that governs cross-platform development through behavioral contracts and a shared, property-based API. Components are defined by what they guarantee \u2014 not how they look \u2014 enabling true native implementations across platforms.",
    viz: `<div class="ecosystem__modal-viz"><div class="viz-source">Button-CTA</div><div class="viz-indent"><span class="viz-keyword">inherits:</span> <span class="viz-value">Button-Base</span></div><div style="margin:12px 0"><span class="viz-arrow">\u2500\u2500\u2500\u2500\u2500 contracts \u2500\u2500\u2500\u2500\u2500</span></div><div class="viz-indent"><span class="viz-output">\u2713</span> <span class="viz-comment">focusable \xB7 pressable \xB7 labeled \xB7 touch_target</span></div><div class="viz-indent"><span class="viz-output">\u2713</span> <span class="viz-comment">loading_state \xB7 screen_reader_announcement</span></div><div class="viz-indent"><span class="viz-value">\u2717</span> <span class="viz-comment">disabled</span> <span class="viz-keyword">// by design</span></div><div style="margin:12px 0"><span class="viz-arrow">\u2500\u2500\u2500\u2500\u2500 implementations \u2500\u2500\u2500\u2500\u2500</span></div><div class="viz-branch"><span class="viz-output">Web</span><span class="viz-comment">&lt;dp-button-cta&gt; \xB7 Shadow DOM</span><span class="viz-output">iOS</span><span class="viz-comment">ButtonCTA: View \xB7 scale + haptic</span><span class="viz-output">Android</span><span class="viz-comment">ButtonCta() \xB7 ripple + haptic</span></div></div>`,
    highlights: [
      "Components ship with structured behavioral contracts \u2014 documented behaviors (e.g. button hover, keyboard accessibility, etc.) that are reusable, queryable, with explicit exclusions and documented rationale",
      "True native implementations per platform (HTML/CSS, Swift, Kotlin), governed by shared contracts",
      "When searching for and identifying components, AI agents receive recommendations with props, direction, and assembly validation",
      `Explicit exclusion documentation \u2014 components formally declare what they "won't do" and "why"`
    ],
    stats: [{ value: "9", label: "Families" }, { value: "34", label: "Components" }, { value: "210", label: "Contracts" }]
  },
  "ecosystem__system--civitas": {
    header: "/src/assets/illustration/header-civitas.svg",
    desc: "Civitas is the governance infrastructure \u2014 MCP servers, specialized agents, and automated intelligence mechanisms that ensure accurate documentation and consistent implementation. Governance is a active system, not a passive reference library.",
    viz: `<div class="ecosystem__modal-viz"><div class="viz-indent"><span class="viz-keyword">agent:</span> <span class="viz-source">Leonardo</span> <span class="viz-comment">// product architect</span></div><div class="viz-indent"><span class="viz-keyword">query:</span> <span class="viz-value">"component for a promoted action?"</span></div><div style="margin:12px 0"><span class="viz-arrow">\u2500\u2500\u2500\u2500\u2500 Application MCP \u2500\u2500\u2500\u2500\u2500\u25B6</span></div><div class="viz-indent"><span class="viz-keyword">result:</span> <span class="viz-output">Button-CTA</span></div><div class="viz-indent"><span class="viz-keyword">props:</span> <span class="viz-comment">variant: "primary", size: "lg"</span></div><div style="margin:12px 0"><span class="viz-arrow">\u2500\u2500\u2500\u2500\u2500 counter-argument \u2500\u2500\u2500\u2500\u2500</span></div><div class="viz-indent"><span class="viz-value">\u26A0</span> <span class="viz-comment">"If multiple promoted actions exist, consider Button-Action"</span></div></div>`,
    highlights: [
      "Governance rules served via MCP at the point of decision \u2014 82% reduction in token costs through progressive disclosure",
      "Agents are structurally required to provide counter-arguments and flag their own biases",
      "8 domain-specialized agents with explicit boundaries, escalation paths, and areas of focus base on knowledge \u2014 not role",
      "Behavioral contracts validated through automated tests \u2014 governance that fails when violated, not hoped-to-be-read"
    ],
    stats: [{ value: "3", label: "MCP servers" }, { value: "8", label: "Agents" }, { value: "8k+", label: "Governance tests" }]
  }
};
var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var backdrop = document.getElementById("eco-backdrop");
var modal = document.getElementById("eco-modal");
var modalHeader = document.getElementById("eco-modal-header");
var modalDesc = document.getElementById("eco-modal-desc");
var modalHighlights = document.getElementById("eco-modal-highlights");
var modalStats = document.getElementById("eco-modal-stats");
var modalViz = document.getElementById("eco-modal-viz");
if (backdrop && modal) {
  let openModal = function(systemClass, card) {
    const data = MODAL_DATA[systemClass];
    if (!data) return;
    if (!modalHeader || !modalDesc || !modalHighlights || !modalStats || !modalViz) return;
    activeCard = card;
    modalHeader.setAttribute("data", data.header);
    modalDesc.textContent = data.desc;
    modalViz.innerHTML = data.viz;
    modalHighlights.innerHTML = data.highlights.map((h) => `<li>${h}</li>`).join("");
    modalStats.innerHTML = data.stats.map((s) => `<div class="ecosystem__modal-stat"><span class="ecosystem__modal-stat-value">${s.value}</span><span class="ecosystem__modal-stat-label">${s.label}</span></div>`).join("");
    const cardRect = card.getBoundingClientRect();
    const modalWidth = Math.min(window.innerWidth * 0.9, 1020);
    const finalLeft = (window.innerWidth - modalWidth) / 2;
    const finalTop = Math.max(20, (window.innerHeight - Math.min(modal.scrollHeight || 400, window.innerHeight * 0.8)) / 2);
    const scaleX = cardRect.width / modalWidth;
    const scaleY = cardRect.height / (modal.scrollHeight || cardRect.height);
    const translateX = cardRect.left - finalLeft;
    const translateY = cardRect.top - finalTop;
    modal.style.left = finalLeft + "px";
    modal.style.top = finalTop + "px";
    modal.style.width = modalWidth + "px";
    if (!reducedMotion) {
      modal.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
      modal.style.transition = "none";
      modal.offsetHeight;
      modal.style.transition = "";
    }
    backdrop.classList.add("active");
    modal.classList.add("active");
    if (!reducedMotion) modal.style.transform = "translate(0, 0) scale(1)";
    document.querySelectorAll("body > *:not(#eco-modal):not(#eco-backdrop)").forEach((el) => {
      if (!el.contains(modal)) {
        el.setAttribute("inert", "");
      }
    });
    const modalParent = modal.parentElement;
    if (modalParent) {
      Array.from(modalParent.children).forEach((el) => {
        if (el !== modal && el !== backdrop) el.setAttribute("inert", "");
      });
    }
    modal.focus();
  }, closeModal = function() {
    if (activeCard && !reducedMotion) {
      const cardRect = activeCard.getBoundingClientRect();
      const modalRect = modal.getBoundingClientRect();
      const scaleX = cardRect.width / modalRect.width;
      const scaleY = cardRect.height / modalRect.height;
      const translateX = cardRect.left - modalRect.left;
      const translateY = cardRect.top - modalRect.top;
      modal.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
      modal.style.opacity = "0";
    }
    backdrop.classList.remove("active");
    setTimeout(() => {
      modal.classList.remove("active");
      modal.style.transform = "";
      modal.style.opacity = "";
      document.querySelectorAll("[inert]").forEach((el) => el.removeAttribute("inert"));
      if (activeCard) activeCard.focus();
      activeCard = null;
    }, reducedMotion ? 0 : 300);
  };
  openModal2 = openModal, closeModal2 = closeModal;
  const closeBtn = modal.querySelector(".ecosystem__modal-close");
  let activeCard = null;
  document.querySelectorAll(".ecosystem__system").forEach((card) => {
    card.addEventListener("click", () => openModal(card.classList[1], card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.classList[1], card);
      }
    });
  });
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });
}
var openModal2;
var closeModal2;
var svg = document.querySelector(".ecosystem__connectors");
var layout = document.querySelector(".ecosystem__layout");
var illustration = document.querySelector(".ecosystem__illustration object");
if (svg && layout && illustration) {
  let drawConnectors = function() {
    const layoutRect = layout.getBoundingClientRect();
    const illusRect = illustration.getBoundingClientRect();
    const illusDoc = illustration.contentDocument;
    if (!illusDoc) return;
    const svgEl = illusDoc.querySelector("svg");
    if (!svgEl) return;
    const viewBox = svgEl.getAttribute("viewBox").split(" ").map(Number);
    const vbWidth = viewBox[2], vbHeight = viewBox[3];
    const scaleX = illusRect.width / vbWidth;
    const scaleY = illusRect.height / vbHeight;
    svg.setAttribute("viewBox", `0 0 ${layoutRect.width} ${layoutRect.height}`);
    let svgContent = `<defs><filter id="line-shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="3" dy="2" stdDeviation="4" flood-color="rgba(10,10,15,0.4)"/></filter></defs>`;
    document.querySelectorAll(".ecosystem__system").forEach((sys) => {
      const rect = sys.getBoundingClientRect();
      const cfg = CONFIG[sys.classList[1]];
      if (!cfg) return;
      let sx, sy = rect.top + rect.height / 2 - layoutRect.top;
      if (rect.left + rect.width / 2 < illusRect.left + illusRect.width / 2) {
        sx = rect.right - layoutRect.left;
      } else {
        sx = rect.left - layoutRect.left;
      }
      const target = illusDoc.getElementById(cfg.target);
      let tx, ty;
      if (target) {
        const cx = parseFloat(target.getAttribute("cx") || "0");
        const cy = parseFloat(target.getAttribute("cy") || "0");
        tx = illusRect.left - layoutRect.left + cx * scaleX;
        ty = illusRect.top - layoutRect.top + cy * scaleY;
      } else {
        return;
      }
      svgContent += `<line x1="${sx}" y1="${sy}" x2="${tx}" y2="${ty}" stroke="${cfg.color}" stroke-width="2.5" filter="url(#line-shadow)"/>`;
      svgContent += `<circle cx="${tx}" cy="${ty}" r="7" fill="rgba(10,10,15,0.3)"/>`;
      svgContent += `<circle cx="${tx}" cy="${ty}" r="5" fill="${cfg.color}"/>`;
    });
    svg.innerHTML = svgContent;
  };
  drawConnectors2 = drawConnectors;
  const CONFIG = {
    "ecosystem__system--rosetta": { color: "#80F6FF", target: "pointer-location__rosetta_2" },
    "ecosystem__system--stemma": { color: "#80FFBB", target: "pointer-location__stemma" },
    "ecosystem__system--civitas": { color: "#FCF680", target: "pointer-location__civitas_2" }
  };
  illustration.addEventListener("load", () => {
    requestAnimationFrame(() => requestAnimationFrame(drawConnectors));
  });
  if (illustration.contentDocument?.querySelector("svg")) {
    requestAnimationFrame(() => requestAnimationFrame(drawConnectors));
  }
  window.addEventListener("resize", drawConnectors);
}
var drawConnectors2;
