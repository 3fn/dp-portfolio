// Chord diagram — extracted from prototype, with IntersectionObserver lifecycle + reduced-motion
interface ChordNode { id: string; label: string; ck: string; size: number; desc: string; ring: 'outer' | 'inner'; group: string; angle: number; x: number; y: number; R: number; }
interface ChordGroup { id: string; label: string; color: string; nodes: ChordNode[]; startAngle: number; endAngle: number; }
type Connection = [string, string, number];

const canvas = document.getElementById('chord') as HTMLCanvasElement | null;
if (canvas) {
  const ctx = canvas.getContext('2d')!;
  const tip = document.getElementById('chord-tip')!;
  const dpr = window.devicePixelRatio || 1;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    const rect = canvas!.parentElement!.getBoundingClientRect();
    canvas!.width = rect.width * dpr;
    canvas!.height = rect.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  const W = () => canvas!.offsetWidth, H = () => canvas!.offsetHeight;
  const CX = () => W() / 2, CY = () => H() / 2;

  let mx = -999, my = -999;
  canvas.addEventListener('mousemove', e => {
    const r = canvas!.getBoundingClientRect();
    mx = e.clientX - r.left; my = e.clientY - r.top;
    tip.style.left = (e.clientX + 16) + 'px';
    tip.style.top = (e.clientY - 8) + 'px';
  });
  canvas.addEventListener('mouseleave', () => { mx = -999; my = -999; tip.style.display = 'none'; });

  const PAL: Record<string, string> = {
    root: '#ff2d8f', mcp: '#00aabb', figma: '#e0006a',
    rosetta: '#1a5fff', stemma: '#7a00cc', release: '#009955',
    a2ui: '#009ab0', agent: '#cc0058',
  };
  function hexA(h: string, a: number) {
    const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }
  function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

  const OUTER_GROUPS: ChordGroup[] = [
    { id: 'mcp', label: 'MCP SERVERS', color: '#00aabb', startAngle: 0, endAngle: 0, nodes: [
      { id: 'docs-mcp', label: 'Docs MCP', ck: 'mcp', size: 2, desc: '82% token reduction · progressive disclosure', ring: 'outer', group: 'mcp', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'app-mcp', label: 'Application MCP', ck: 'mcp', size: 2, desc: '10 query tools · agent-driven component selection', ring: 'outer', group: 'mcp', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'product-mcp', label: 'Product MCP', ck: 'mcp', size: 2, desc: 'YAML context layer · directs agents toward goals', ring: 'outer', group: 'mcp', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'figma-mcp', label: 'Figma Console MCP', ck: 'figma', size: 1.5, desc: 'Bidirectional Figma · token push', ring: 'outer', group: 'mcp', angle: 0, x: 0, y: 0, R: 0 },
    ] },
    { id: 'agents', label: 'AGENTS', color: '#ff2d8f', startAngle: 0, endAngle: 0, nodes: [
      { id: 'ada', label: 'Ada', ck: 'agent', size: 1.2, desc: 'Token development · Rosetta compliance', ring: 'outer', group: 'agents', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'lina', label: 'Lina', ck: 'agent', size: 1.2, desc: 'Component development · Stemma compliance', ring: 'outer', group: 'agents', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'thurgood', label: 'Thurgood', ck: 'agent', size: 1.2, desc: 'System auditing · governance', ring: 'outer', group: 'agents', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'leonardo', label: 'Leonardo', ck: 'agent', size: 1.5, desc: 'Product technical architecture', ring: 'outer', group: 'agents', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'stacy', label: 'Stacy', ck: 'agent', size: 1.2, desc: 'Product governance · lessons-learned', ring: 'outer', group: 'agents', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'sparky', label: 'Sparky', ck: 'agent', size: 1.2, desc: 'Web product development', ring: 'outer', group: 'agents', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'kenya', label: 'Kenya', ck: 'agent', size: 1.2, desc: 'iOS product development', ring: 'outer', group: 'agents', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'data', label: 'Data', ck: 'agent', size: 1.2, desc: 'Android product development', ring: 'outer', group: 'agents', angle: 0, x: 0, y: 0, R: 0 },
    ] },
    { id: 'systems', label: 'SYSTEMS', color: '#7a00cc', startAngle: 0, endAngle: 0, nodes: [
      { id: 'rosetta', label: 'Rosetta', ck: 'rosetta', size: 2.5, desc: 'Mathematical token system', ring: 'outer', group: 'systems', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'stemma', label: 'Stemma', ck: 'stemma', size: 2.5, desc: 'Component architecture · contracts', ring: 'outer', group: 'systems', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'release', label: 'Release Manager', ck: 'release', size: 1.5, desc: 'Semantic versioning', ring: 'outer', group: 'systems', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'a2ui', label: 'A2UI', ck: 'a2ui', size: 1.5, desc: 'Agent-to-UI language', ring: 'outer', group: 'systems', angle: 0, x: 0, y: 0, R: 0 },
    ] },
  ];

  const INNER_GROUPS: ChordGroup[] = [
    { id: 'tokens', label: 'TOKENS', color: '#1a5fff', startAngle: 0, endAngle: 0, nodes: [
      { id: 'primitive', label: 'Primitive tokens', ck: 'rosetta', size: 1.2, desc: 'space · color · typography', ring: 'inner', group: 'tokens', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'semantic', label: 'Semantic tokens', ck: 'rosetta', size: 1.2, desc: 'color.primary · space.inset.*', ring: 'inner', group: 'tokens', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'dtcg', label: 'DTCG output', ck: 'rosetta', size: 1, desc: 'Design Token Community Group JSON', ring: 'inner', group: 'tokens', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'figma-out', label: 'Figma output', ck: 'figma', size: 1, desc: 'DesignTokens.figma.json', ring: 'inner', group: 'tokens', angle: 0, x: 0, y: 0, R: 0 },
    ] },
    { id: 'components', label: 'COMPONENTS', color: '#9933ff', startAngle: 0, endAngle: 0, nodes: [
      { id: 'prim-comp', label: 'Primitive components', ck: 'stemma', size: 1.2, desc: '[Family]-[Type]-Base', ring: 'inner', group: 'components', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'sem-comp', label: 'Semantic components', ck: 'stemma', size: 1.2, desc: '[Family]-[Type]-Variant', ring: 'inner', group: 'components', angle: 0, x: 0, y: 0, R: 0 },
      { id: 'contracts', label: 'Contracts', ck: 'stemma', size: 1.5, desc: '210 concepts · 10 categories', ring: 'inner', group: 'components', angle: 0, x: 0, y: 0, R: 0 },
    ] },
  ];

  const nodeMap: Record<string, ChordNode> = {};
  OUTER_GROUPS.forEach(g => g.nodes.forEach(n => { nodeMap[n.id] = n; }));
  INNER_GROUPS.forEach(g => g.nodes.forEach(n => { nodeMap[n.id] = n; }));

  const CONNECTIONS: Connection[] = [
    ['docs-mcp', 'rosetta', 0.8], ['docs-mcp', 'stemma', 0.5], ['docs-mcp', 'ada', 0.7], ['docs-mcp', 'lina', 0.7],
    ['app-mcp', 'stemma', 0.9], ['app-mcp', 'sparky', 0.6], ['app-mcp', 'leonardo', 0.5],
    ['product-mcp', 'leonardo', 0.8], ['product-mcp', 'stacy', 0.7], ['product-mcp', 'sparky', 0.5],
    ['figma-mcp', 'dtcg', 0.8], ['figma-mcp', 'figma-out', 0.9],
    ['rosetta', 'primitive', 0.9], ['rosetta', 'semantic', 0.9], ['rosetta', 'dtcg', 0.7],
    ['stemma', 'prim-comp', 0.9], ['stemma', 'sem-comp', 0.9], ['stemma', 'contracts', 0.9],
    ['primitive', 'semantic', 0.6], ['prim-comp', 'sem-comp', 0.6],
    ['ada', 'rosetta', 0.7], ['lina', 'stemma', 0.7], ['a2ui', 'rosetta', 0.5],
    ['semantic', 'prim-comp', 0.4], ['stacy', 'product-mcp', 0.5],
  ];

  const pulses = CONNECTIONS.map(() => ({ t: Math.random(), speed: 0.0018 + Math.random() * 0.002 }));
  let rotOffset = 0, hoverFade = 0, hoveredNode: ChordNode | null = null;
  let dragging = false, lastDragAngle = 0, spinVelocity = 0.0004;
  const IDLE_SPEED = 0.0004, HOVER_DECEL = 0.07, RESUME_ACCEL = 0.03, GROUP_GAP = 0.10;

  // Drag interaction
  canvas.addEventListener('mousedown', e => {
    const r = canvas!.getBoundingClientRect();
    const lx = e.clientX - r.left, ly = e.clientY - r.top;
    const rootR = Math.min(W(), H()) * 0.075 * 0.75;
    if (Math.hypot(lx - CX(), ly - CY()) < rootR + 8) {
      dragging = true; lastDragAngle = Math.atan2(ly - CY(), lx - CX());
      canvas!.style.cursor = 'grabbing';
    }
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const r = canvas!.getBoundingClientRect();
    const angle = Math.atan2(e.clientY - r.top - CY(), e.clientX - r.left - CX());
    spinVelocity = (angle - lastDragAngle) * 0.8;
    rotOffset += angle - lastDragAngle;
    lastDragAngle = angle;
  });
  window.addEventListener('mouseup', () => { dragging = false; canvas!.style.cursor = ''; });

  function buildLayout(rot: number) {
    const shortSide = Math.min(W(), H());
    const outerR = shortSide * 0.40, innerR = shortSide * 0.245;
    const outerTotal = OUTER_GROUPS.reduce((a, g) => a + g.nodes.length, 0);
    const outerAvail = Math.PI * 2 - GROUP_GAP * OUTER_GROUPS.length;
    let cursor = rot - Math.PI / 2 - 0.05;
    OUTER_GROUPS.forEach(g => {
      const span = (g.nodes.length / outerTotal) * outerAvail;
      const step = span / g.nodes.length;
      g.startAngle = cursor; g.endAngle = cursor + span;
      g.nodes.forEach((n, i) => { n.angle = cursor + step * (i + 0.5); n.x = CX() + Math.cos(n.angle) * outerR; n.y = CY() + Math.sin(n.angle) * outerR; n.R = outerR; });
      cursor += span + GROUP_GAP;
    });
    const innerTotal = INNER_GROUPS.reduce((a, g) => a + g.nodes.length, 0);
    const innerAvail = Math.PI * 2 - GROUP_GAP * INNER_GROUPS.length;
    cursor = rot - Math.PI / 2 + 0.15;
    INNER_GROUPS.forEach(g => {
      const span = (g.nodes.length / innerTotal) * innerAvail;
      const step = span / g.nodes.length;
      g.startAngle = cursor; g.endAngle = cursor + span;
      g.nodes.forEach((n, i) => { n.angle = cursor + step * (i + 0.5); n.x = CX() + Math.cos(n.angle) * innerR; n.y = CY() + Math.sin(n.angle) * innerR; n.R = innerR; });
      cursor += span + GROUP_GAP;
    });
  }

  function drawArcBand(startA: number, endA: number, R: number, color: string, label: string, isInner: boolean) {
    const thick = isInner ? 7 : 11;
    ctx.beginPath(); ctx.arc(CX(), CY(), R + thick / 2, startA, endA);
    ctx.strokeStyle = color; ctx.lineWidth = thick; ctx.globalAlpha = isInner ? 0.12 : 0.15; ctx.stroke(); ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.arc(CX(), CY(), R + thick, startA, endA);
    ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.globalAlpha = 0.6; ctx.stroke(); ctx.globalAlpha = 1;
    const midA = (startA + endA) / 2;
    const lr = R + thick + 18;
    const lx = CX() + Math.cos(midA) * lr, ly = CY() + Math.sin(midA) * lr;
    ctx.save(); ctx.translate(lx, ly);
    let rot2 = midA + Math.PI / 2;
    if (midA > Math.PI / 2 && midA < Math.PI * 1.5) rot2 += Math.PI;
    ctx.rotate(rot2);
    ctx.font = `bold ${isInner ? 7 : 8}px ui-monospace,monospace`;
    ctx.fillStyle = color; ctx.globalAlpha = 0.7; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(label, 0, 0); ctx.restore();
  }

  function drawChord(a: ChordNode, b: ChordNode, w: number, col: string, alpha: number, pulse: { t: number }) {
    const pull = a.ring === 'inner' && b.ring === 'inner' ? 0.5 : 0.3;
    const cpx = CX() + (a.x + b.x) / 2 * pull - CX() * pull;
    const cpy = CY() + (a.y + b.y) / 2 * pull - CY() * pull;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(cpx, cpy, b.x, b.y);
    ctx.strokeStyle = col; ctx.lineWidth = w * 1.5; ctx.globalAlpha = alpha; ctx.stroke(); ctx.globalAlpha = 1;
    if (!reducedMotion) {
      const pt = pulse.t, fade = Math.sin(pt * Math.PI);
      const qx = (1 - pt) * (1 - pt) * a.x + 2 * (1 - pt) * pt * cpx + pt * pt * b.x;
      const qy = (1 - pt) * (1 - pt) * a.y + 2 * (1 - pt) * pt * cpy + pt * pt * b.y;
      ctx.beginPath(); ctx.arc(qx, qy, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = col; ctx.globalAlpha = fade * 0.9; ctx.fill(); ctx.globalAlpha = 1;
    }
  }

  function drawNode(n: ChordNode, isHover: boolean) {
    const color = PAL[n.ck] || '#333';
    const r = 3 + (n.size || 1) * 1.8 + (isHover ? 2.5 : 0);
    if (isHover) { ctx.beginPath(); ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2); ctx.fillStyle = hexA(color, 0.1); ctx.fill(); }
    ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fill();
    ctx.strokeStyle = color; ctx.lineWidth = isHover ? 2 : 1.5; ctx.globalAlpha = 0.88; ctx.stroke(); ctx.globalAlpha = 1;
    if (n.size >= 2) { ctx.beginPath(); ctx.arc(n.x, n.y, r * 0.42, 0, Math.PI * 2); ctx.fillStyle = color; ctx.globalAlpha = 0.65; ctx.fill(); ctx.globalAlpha = 1; }
    const isOuter = n.ring === 'outer';
    const lr = isOuter ? n.R + 22 : n.R + 18;
    const lx = CX() + Math.cos(n.angle) * lr, ly = CY() + Math.sin(n.angle) * lr;
    ctx.save(); ctx.translate(lx, ly);
    let rot = n.angle + Math.PI / 2;
    if (n.angle > Math.PI / 2 && n.angle < Math.PI * 1.5) rot += Math.PI;
    ctx.rotate(rot);
    const fs = isOuter ? (n.size >= 2 ? 10 : 9) : 8.5;
    ctx.font = `${n.size >= 2 ? '600' : '400'} ${fs}px CommitMono-Bold, ui-monospace,SFMono-Regular,monospace`;
    ctx.fillStyle = isHover ? color : '#1a1a1a';
    ctx.globalAlpha = isHover ? 1 : (n.size >= 2 ? 0.8 : 0.55);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(n.label, 0, 0);
    ctx.restore();
  }

  function drawRoot() {
    const shortSide = Math.min(W(), H());
    const r = shortSide * 0.075;
    ctx.beginPath(); ctx.arc(CX(), CY(), r * 0.75, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fill();
    ctx.strokeStyle = PAL.root; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.85; ctx.stroke(); ctx.globalAlpha = 1;
    ctx.font = 'bold 10px ui-monospace,monospace';
    ctx.fillStyle = PAL.root; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('DESIGNER', CX(), CY() - 7); ctx.fillText('PUNK', CX(), CY() + 7);
  }

  // Animation loop with IntersectionObserver lifecycle
  let rafId: number | null = null;

  function frame(ts: number) {
    if (!reducedMotion) {
      pulses.forEach(p => { p.t += p.speed; if (p.t > 1) p.t = 0; });
    }
    const allNodes = [...OUTER_GROUPS.flatMap(g => g.nodes), ...INNER_GROUPS.flatMap(g => g.nodes)];
    let nodeUnderMouse: ChordNode | null = null;
    allNodes.forEach(n => { if (n.x && Math.hypot(mx - n.x, my - n.y) < 16) nodeUnderMouse = n; });

    hoverFade = nodeUnderMouse ? lerp(hoverFade, 1, HOVER_DECEL) : lerp(hoverFade, 0, RESUME_ACCEL);

    if (!dragging && !reducedMotion) {
      spinVelocity = lerp(spinVelocity, IDLE_SPEED, 0.04);
      rotOffset += spinVelocity * (1 - hoverFade);
    } else if (dragging) { spinVelocity *= 0.9; hoverFade = 0; }

    buildLayout(rotOffset);
    hoveredNode = null;
    allNodes.forEach(n => { if (n.x && Math.hypot(mx - n.x, my - n.y) < 16) hoveredNode = n; });

    ctx.clearRect(0, 0, W(), H());
    const outerR = Math.min(W(), H()) * 0.40;
    const innerR = Math.min(W(), H()) * 0.245;
    OUTER_GROUPS.forEach(g => drawArcBand(g.startAngle, g.endAngle, outerR, g.color, g.label, false));
    INNER_GROUPS.forEach(g => drawArcBand(g.startAngle, g.endAngle, innerR, g.color, g.label, true));

    CONNECTIONS.forEach(([aid, bid, w], i) => {
      const a = nodeMap[aid], b = nodeMap[bid];
      if (!a?.x || !b?.x) return;
      const col = PAL[a.ck] || '#333';
      const active = hoveredNode && (hoveredNode.id === aid || hoveredNode.id === bid);
      drawChord(a, b, w, col, active ? 0.62 : 0.10, pulses[i]);
    });

    allNodes.forEach(n => { if (n.x) drawNode(n, hoveredNode?.id === n.id); });
    drawRoot();

    if (hoveredNode && hoverFade > 0.6) {
      tip.style.display = 'block';
      tip.style.borderColor = PAL[hoveredNode.ck] || '#333';
      tip.innerHTML = `<span style="font-weight:bold;color:${PAL[hoveredNode.ck]}">${hoveredNode.label}</span><br>${hoveredNode.desc}`;
    } else { tip.style.display = 'none'; }

    rafId = requestAnimationFrame(frame);
  }

  // Reduced motion: render once statically
  if (reducedMotion) {
    buildLayout(0);
    frame(0);
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  // IntersectionObserver lifecycle: start/pause/resume
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!rafId && !reducedMotion) rafId = requestAnimationFrame(frame);
      } else {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      }
    });
  }, { threshold: 0.1 });
  observer.observe(canvas);
}
