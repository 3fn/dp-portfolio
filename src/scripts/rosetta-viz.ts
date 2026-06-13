/**
 * Rosetta docs visualization — scroll-driven SVG state machine.
 * 11 nodes across 5 states, CSS transitions, tooltips, Beat 4 draw-on-scroll.
 * Exports init/cleanup for Astro compatibility.
 */

interface NodeState { x: number; y: number; r: number; color: string; label: string; tip: string }
interface BeatState { nodes: NodeState[]; connections: [number, number][] }

const STATES: Record<string, BeatState> = {
  'beat-problem': {
    nodes: [
      { x: 140, y: 130, r: 12, color: 'rgba(255,90,90,0.8)', label: '$space-md', tip: 'Was 16. Now 15. No validation caught it.\n→ In Rosetta: formula drift detected at build.' },
      { x: 210, y: 210, r: 10, color: 'rgba(255,90,90,0.8)', label: '--ds-pad', tip: '8px. No formula. No rationale required.\n→ In Rosetta: mathematicalRelationship mandatory.' },
      { x: 120, y: 300, r: 11, color: 'rgba(255,90,90,0.8)', label: '@gutter', tip: '1.5rem baked in. Can\'t generate Swift.\n→ In Rosetta: unitless source. Units at generation.' },
      { x: 250, y: 360, r: 9, color: 'rgba(255,90,90,0.8)', label: '$clr-1', tip: 'Changed last month. No record of who or why.\n→ In Rosetta: primitiveReferences chain.' },
      { x: 170, y: 440, r: 13, color: 'rgba(255,90,90,0.8)', label: '%rad-pill', tip: '999px. Platform unit on a token.\n→ In Rosetta: radiusMax = 9999. Unitless.' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
    ],
    connections: []
  },
  'beat-principle': {
    nodes: [
      { x: 80, y: 100, r: 8, color: '#80F6FF', label: '200', tip: 'space200: base × 2 = 16.\nFormula-based origin.' },
      { x: 160, y: 100, r: 8, color: '#80F6FF', label: '300', tip: 'space300: base × 3 = 24.\nFormula-based origin.' },
      { x: 270, y: 100, r: 8, color: '#ff2d8f', label: 'pink300', tip: 'oklch(0.65, 0.242, 10).\nPerceptual channel origin.' },
      { x: 350, y: 100, r: 8, color: '#80F6FF', label: 'cyan300', tip: 'oklch(0.76, 0.148, 202.5).\nHue 202.5 = cyan family.' },
      { x: 80, y: 270, r: 8, color: '#80FFBB', label: 'inset', tip: 'space.inset.200 → space200.\nSemantic reference.' },
      { x: 160, y: 270, r: 8, color: '#80FFBB', label: 'action', tip: 'color.action.primary → cyan300.\noklch(0.76 0.148 202.5).' },
      { x: 270, y: 270, r: 8, color: '#80FFBB', label: 'nav', tip: 'color.action.navigation.\nLevel 2: swaps reference in dark mode.' },
      { x: 200, y: 440, r: 10, color: '#FCF680', label: 'btnIcon', tip: 'buttonIcon.inset.medium → space125.\nRequires reasoning field.' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
    ],
    connections: [[0,4],[2,5],[3,6],[4,7]]
  },
  'beat-architecture': {
    nodes: [
      { x: 200, y: 60, r: 10, color: '#80F6FF', label: 'Define', tip: 'TypeScript interface requires mathematicalRelationship.\nPrevents: Arbitrariness.' },
      { x: 200, y: 150, r: 10, color: '#80F6FF', label: 'Validate', tip: '≤5% pass, 5-25% warn, >25% error.\nPrevents: Drift.' },
      { x: 200, y: 240, r: 10, color: '#80F6FF', label: 'Registry', tip: 'Queryable by family, layer, platform.\nPrevents: Missing audit trail.' },
      { x: 200, y: 330, r: 10, color: '#80F6FF', label: 'Resolve', tip: 'Two-level mode resolution. Color tokens only.\nPrevents: Platform divergence.' },
      { x: 200, y: 420, r: 10, color: '#80F6FF', label: 'Generate', tip: 'Unitless → platform units at build.\nPrevents: Platform divergence.' },
      { x: 200, y: 510, r: 10, color: '#80F6FF', label: 'Output', tip: 'CSS, Swift, Kotlin, DTCG, Figma.\nOne source, five outputs.' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
    ],
    connections: [[0,1],[1,2],[2,3],[3,4],[4,5]]
  },
  'beat-payoff': {
    nodes: [
      { x: 200, y: 80, r: 14, color: '#80F6FF', label: 'space200', tip: 'Unitless source: 16.\nFormula: base × 2.' },
      { x: 80, y: 250, r: 8, color: '#80F6FF', label: 'CSS', tip: '--space-200: 16px.\noklch() for colors.' },
      { x: 140, y: 330, r: 8, color: '#80FFBB', label: 'Swift', tip: 'static let space200: CGFloat = 16' },
      { x: 200, y: 380, r: 8, color: '#FCF680', label: 'Kotlin', tip: 'val space_200 = 16.dp' },
      { x: 260, y: 330, r: 8, color: 'rgba(255,255,255,0.6)', label: 'DTCG', tip: '"$value": 16.\nAliases resolve to primitives.' },
      { x: 320, y: 250, r: 8, color: 'rgba(255,255,255,0.4)', label: 'Figma', tip: 'space/200 → 16.\nVariable mode support.' },
      { x: 200, y: 520, r: 9, color: '#FCF680', label: 'config', tip: 'designerpunk.config.ts.\nnpx generate → full pipeline.' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
      { x: 0, y: 0, r: 0, color: 'transparent', label: '', tip: '' },
    ],
    connections: [[0,1],[0,2],[0,3],[0,4],[0,5]]
  },
};

const BEAT_IDS = ['beat-problem', 'beat-principle', 'beat-architecture', 'beat-payoff'];

export function init(): () => void {
  const svg = document.querySelector('.viz-svg') as SVGElement | null;
  const nodesG = svg?.querySelector('.viz-nodes') as SVGGElement | null;
  const connsG = svg?.querySelector('.viz-connections') as SVGGElement | null;
  const tooltip = document.getElementById('viz-tooltip') as HTMLElement | null;
  const tipTitle = document.getElementById('viz-tip-title');
  const tipProblem = document.getElementById('viz-tip-problem');
  const tipSolution = document.getElementById('viz-tip-solution');

  if (!svg || !nodesG || !connsG || !tooltip || !tipTitle || !tipProblem || !tipSolution) return () => {};

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Create 11 node elements
  const nodeEls = Array.from({ length: 11 }, () => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('r', '8');
    circle.setAttribute('fill', 'transparent');
    circle.setAttribute('stroke', '#80F6FF');
    circle.setAttribute('stroke-width', '1.5');
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('dy', '22');
    text.setAttribute('text-anchor', 'middle');
    g.appendChild(circle);
    g.appendChild(text);
    nodesG.appendChild(g);
    return { g, circle, text };
  });

  let currentBeat = '';

  function applyState(beatId: string): void {
    const state = STATES[beatId];
    if (!state || beatId === currentBeat) return;
    currentBeat = beatId;

    // Update nodes.
    // Drive animated values through CSS properties (style), NOT SVG presentation
    // attributes: Safari/WebKit only fires CSS transitions on property changes, not
    // on attribute changes. Firefox/Chrome bridge the attribute → property, Safari
    // does not — so attribute-based animation silently no-ops on Safari.
    state.nodes.forEach((n, i) => {
      const el = nodeEls[i];
      el.g.style.transform = `translate(${n.x}px, ${n.y}px)`;
      el.g.style.opacity = n.r > 0 ? '1' : '0';
      el.circle.style.setProperty('r', `${n.r}px`); // CSS `r` (Safari 15.4+)
      el.circle.setAttribute('r', String(n.r));      // attribute fallback for older engines
      el.circle.style.setProperty('stroke', n.color);
      el.text.textContent = n.label;
    });

    // Update connections
    connsG.innerHTML = '';
    state.connections.forEach(([a, b]) => {
      const na = state.nodes[a], nb = state.nodes[b];
      if (!na || !nb || na.r === 0 || nb.r === 0) return;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(na.x));
      line.setAttribute('y1', String(na.y));
      line.setAttribute('x2', String(nb.x));
      line.setAttribute('y2', String(nb.y));
      // Beat 4: draw-on-scroll via stroke-dashoffset.
      // Animate through the CSS property (style), not the attribute, so Safari
      // transitions it. Unitless values map to SVG user units (matches dasharray).
      if (beatId === 'beat-payoff') {
        const len = Math.hypot(nb.x - na.x, nb.y - na.y);
        line.setAttribute('stroke-dasharray', String(len));
        line.style.setProperty('stroke-dashoffset', String(len));
        line.style.transition = 'stroke-dashoffset 0.8s ease';
        requestAnimationFrame(() => line.style.setProperty('stroke-dashoffset', '0'));
      }
      connsG.appendChild(line);
    });

    // Dismiss tooltip on state change
    tooltip.style.display = 'none';
  }

  // Reduced motion: show final state immediately
  if (reducedMotion) {
    applyState('beat-payoff');
    return () => {};
  }

  // Set initial state
  applyState('beat-problem');

  // Scroll-driven state detection
  const sections = BEAT_IDS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) applyState(entry.target.id);
      }
    },
    { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach(s => observer.observe(s));

  // Tooltip interaction
  let activeNode: number | null = null;

  function showTooltip(index: number, x: number, y: number): void {
    const state = STATES[currentBeat];
    if (!state) return;
    const n = state.nodes[index];
    if (!n || !n.tip) return;

    const parts = n.tip.split('\n');
    tipTitle.textContent = n.label;
    tipProblem.textContent = parts[0] || '';
    tipSolution.textContent = parts[1] || '';
    tooltip.style.borderColor = n.color;
    tooltip.style.display = 'block';
    tooltip.style.left = (x + 16) + 'px';
    tooltip.style.top = (y - 8) + 'px';
    activeNode = index;
  }

  function hideTooltip(): void {
    tooltip.style.display = 'none';
    activeNode = null;
  }

  // Convert client (viewport) coordinates to SVG user units, accounting for
  // viewBox scaling AND preserveAspectRatio letterboxing. The previous manual
  // (clientX - rect.left) * (400 / rect.width) math ignored vertical letterboxing
  // (viewBox 400x560 rendered inside a 400 x 100vh box), so hit-testing never
  // aligned with the rendered nodes and tooltips effectively never triggered.
  function clientToSvg(clientX: number, clientY: number): { x: number; y: number } {
    const svgEl = svg as SVGSVGElement;
    const ctm = svgEl.getScreenCTM();
    if (!ctm) return { x: -1, y: -1 };
    const pt = svgEl.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }

  // Desktop hover
  svg.addEventListener('mousemove', (e: MouseEvent) => {
    const { x: sx, y: sy } = clientToSvg(e.clientX, e.clientY);
    const state = STATES[currentBeat];
    if (!state) return;

    let hit = -1;
    state.nodes.forEach((n, i) => {
      if (n.r > 0 && Math.hypot(sx - n.x, sy - n.y) < Math.max(n.r + 4, 12)) hit = i;
    });

    if (hit >= 0 && hit !== activeNode) {
      showTooltip(hit, e.clientX, e.clientY);
    } else if (hit < 0 && activeNode !== null) {
      hideTooltip();
    }
  });

  svg.addEventListener('mouseleave', hideTooltip);

  // Mobile tap
  svg.addEventListener('click', (e: MouseEvent) => {
    const { x: sx, y: sy } = clientToSvg(e.clientX, e.clientY);
    const state = STATES[currentBeat];
    if (!state) return;

    let hit = -1;
    state.nodes.forEach((n, i) => {
      if (n.r > 0 && Math.hypot(sx - n.x, sy - n.y) < Math.max(n.r + 4, 12)) hit = i;
    });

    if (hit >= 0) {
      if (hit === activeNode) hideTooltip();
      else showTooltip(hit, e.clientX, e.clientY);
    } else {
      hideTooltip();
    }
  });

  // Keyboard focus on SVG triggers tooltip for first visible node
  svg.setAttribute('tabindex', '0');
  svg.addEventListener('focus', () => {
    const state = STATES[currentBeat];
    if (!state) return;
    const first = state.nodes.findIndex(n => n.r > 0 && n.tip);
    if (first >= 0) {
      const rect = svg.getBoundingClientRect();
      showTooltip(first, rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  });
  svg.addEventListener('blur', hideTooltip);

  // Dismiss tooltip on scroll
  const onScroll = () => { if (activeNode !== null) hideTooltip(); };
  window.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    observer.disconnect();
    window.removeEventListener('scroll', onScroll);
  };
}

// DOMContentLoaded fallback boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => init());
} else {
  init();
}
