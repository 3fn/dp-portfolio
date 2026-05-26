// Career chart — extracted from prototype, with IntersectionObserver lifecycle + reduced-motion
interface CareerSegment {
  id: string; label: string; short: string;
  yearStart: number; yearEnd: number; yearMid: number;
  design: number; eng: number;
  period: string; desc: string; is3fn: boolean;
}

const canvas = document.getElementById('career-chart') as HTMLCanvasElement | null;
if (canvas) {
  const ctx = canvas.getContext('2d')!;
  const tooltip = document.getElementById('career-tooltip')!;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W: number, H: number, DPR: number, hovered: CareerSegment | null = null;
  let animT = 0, lastTs: number | null = null, animDone = false;
  const PAD = { top: 40, bottom: 44, left: 16, right: 16 };
  const YEAR_START = 2005.6, YEAR_END = 2026.5, CAREER_START = 2006.0;

  const ALL_ROLES: CareerSegment[] = [
    { id: 'ea', label: 'Electronic Arts', short: 'EA', yearStart: 2010.58, yearEnd: 2010.83, design: 50, eng: 50, period: 'Aug – Oct 2010', desc: 'Led UI Design for FIFA on Nintendo 3DS.', is3fn: false, yearMid: 0 },
    { id: 'magi', label: 'Magi.com', short: 'Magi', yearStart: 2011.08, yearEnd: 2012.25, design: 100, eng: 0, period: 'Feb 2011 – Mar 2012', desc: 'Designed interfaces for next-gen social gaming.', is3fn: false, yearMid: 0 },
    { id: 'ehealth', label: 'eHealth', short: 'eHealth', yearStart: 2013.25, yearEnd: 2015.25, design: 99, eng: 1, period: 'Apr 2013 – Mar 2015', desc: 'Led design and user research for the first end-to-end ACA eCommerce product.', is3fn: false, yearMid: 0 },
    { id: 'fantalk', label: 'FanTalk', short: 'FanTalk', yearStart: 2015.33, yearEnd: 2016.08, design: 92, eng: 8, period: 'May 2015 – Feb 2016', desc: 'Championed the sports fan voice for iOS.', is3fn: false, yearMid: 0 },
    { id: 'reddit', label: 'Reddit', short: 'Reddit', yearStart: 2017.08, yearEnd: 2019.5, design: 100, eng: 0, period: 'Feb 2017 – Jun 2019', desc: 'Led design systems for Web and Native — Community Styling, token system, first DS practice.', is3fn: false, yearMid: 0 },
    { id: 'venmo', label: 'Venmo / PayPal', short: 'Venmo', yearStart: 2019.5, yearEnd: 2024.33, design: 100, eng: 0, period: 'Jul 2019 – Apr 2024', desc: 'Established and grew Venmo DS from 0-to-1. Led accessibility compliance and PayPal redesign.', is3fn: false, yearMid: 0 },
    { id: 'dp', label: 'DesignerPunk', short: 'DP', yearStart: 2025.0, yearEnd: 2026.3, design: 45, eng: 55, period: '2025 – Present', desc: 'True Native cross-platform design system. 310+ tokens, 30 components, 8k+ tests, MCP servers, 9 custom AI agents.', is3fn: false, yearMid: 0 },
  ];

  const TFN = 60, TFN_E = 40;
  function build3fn(): CareerSegment[] {
    const segs: CareerSegment[] = [];
    const sorted = [...ALL_ROLES].sort((a, b) => a.yearStart - b.yearStart);
    if (sorted[0].yearStart - CAREER_START > 0.25) segs.push({ yearStart: CAREER_START, yearEnd: sorted[0].yearStart, design: TFN, eng: TFN_E, is3fn: true, id: '3fn', label: '3fn Design', short: '3fn', period: 'Independent', desc: 'Independent design consultancy.', yearMid: 0 });
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i + 1].yearStart - sorted[i].yearEnd > 0.25) segs.push({ yearStart: sorted[i].yearEnd, yearEnd: sorted[i + 1].yearStart, design: TFN, eng: TFN_E, is3fn: true, id: '3fn', label: '3fn Design', short: '3fn', period: 'Independent', desc: 'Independent design consultancy.', yearMid: 0 });
    }
    return segs;
  }

  const ALL = [...build3fn(), ...ALL_ROLES].sort((a, b) => a.yearStart - b.yearStart);
  ALL.forEach(s => { s.yearMid = (s.yearStart + s.yearEnd) / 2; });

  // Noise pattern
  const NOISE_SIZE = 256, NOISE_DENSITY = 0.8, NOISE_ALPHA = 24;
  const noiseCanvas = document.createElement('canvas');
  noiseCanvas.width = NOISE_SIZE; noiseCanvas.height = NOISE_SIZE;
  const nCtx = noiseCanvas.getContext('2d')!;
  const imgData = nCtx.createImageData(NOISE_SIZE, NOISE_SIZE);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const v = Math.random() > NOISE_DENSITY ? 255 : 0;
    imgData.data[i] = v; imgData.data[i + 1] = v; imgData.data[i + 2] = v; imgData.data[i + 3] = NOISE_ALPHA;
  }
  nCtx.putImageData(imgData, 0, 0);
  const noisePattern = ctx.createPattern(noiseCanvas, 'repeat')!;

  function setup() {
    DPR = window.devicePixelRatio || 1;
    W = canvas!.parentElement!.offsetWidth;
    H = Math.round(W * 0.32);
    canvas!.width = W * DPR; canvas!.height = H * DPR;
    canvas!.style.width = W + 'px'; canvas!.style.height = H + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(DPR, DPR);
  }

  function xFor(y: number) { return PAD.left + (y - YEAR_START) / (YEAR_END - YEAR_START) * (W - PAD.left - PAD.right); }
  const MID = () => PAD.top + (H - PAD.top - PAD.bottom) * 0.5;
  const HALF = () => (H - PAD.top - PAD.bottom) * 0.46;
  function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

  function draw(ts: number) {
    if (lastTs === null) lastTs = ts;
    const dt = Math.min((ts - lastTs) / 1000, 0.05); lastTs = ts;
    if (!animDone) animT = Math.min(animT + dt * 0.5, 1);
    const prog = easeOut(animT), mid = MID(), half = HALF();
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(178,188,196,0.15)'; ctx.lineWidth = 0.5;
    for (let y = 2006; y <= 2026; y++) { const x = xFor(y); ctx.beginPath(); ctx.moveTo(x, PAD.top); ctx.lineTo(x, H - PAD.bottom); ctx.stroke(); }

    // Year labels
    ctx.fillStyle = 'rgba(38,50,58,0.5)'; ctx.font = '10px ui-monospace,monospace'; ctx.textAlign = 'center';
    for (let y = 2006; y <= 2026; y += 2) ctx.fillText(String(y), xFor(y), H - PAD.bottom + 16);

    // Axis labels
    ctx.fillStyle = 'rgba(38,50,58,0.35)'; ctx.font = '9px ui-monospace,monospace'; ctx.textAlign = 'left';
    ctx.fillText('Design', PAD.left, PAD.top - 12); ctx.fillText('Engineering', PAD.left, H - PAD.bottom - 6);

    // Bars
    for (const seg of ALL) {
      const segX1 = xFor(seg.yearStart), segX2 = xFor(seg.yearEnd), nx = xFor(seg.yearMid);
      const segW = Math.max(segX2 - segX1, 14);
      const is3fn = seg.is3fn;
      const dcTop = is3fn ? [176, 38, 255] : [255, 42, 109];
      const dcBot = is3fn ? [255, 130, 180] : [217, 138, 255];
      const ecTop = is3fn ? [245, 245, 250] : [232, 232, 240];
      const ecBot = is3fn ? [34, 34, 42] : [38, 50, 58];

      if (seg.design > 0) {
        const bh = (seg.design / 100) * half * prog;
        const g = ctx.createLinearGradient(0, mid - bh, 0, mid);
        g.addColorStop(0, `rgb(${dcTop[0]},${dcTop[1]},${dcTop[2]})`);
        g.addColorStop(1, `rgb(${dcBot[0]},${dcBot[1]},${dcBot[2]})`);
        ctx.fillStyle = g; ctx.fillRect(segX1, mid - bh, segW, bh);
        ctx.fillStyle = noisePattern; ctx.fillRect(segX1, mid - bh, segW, bh);
      }
      if (seg.eng > 0) {
        const bh = (seg.eng / 100) * half * prog;
        const g = ctx.createLinearGradient(0, mid, 0, mid + bh);
        g.addColorStop(0, `rgb(${ecTop[0]},${ecTop[1]},${ecTop[2]})`);
        g.addColorStop(1, `rgb(${ecBot[0]},${ecBot[1]},${ecBot[2]})`);
        ctx.fillStyle = g; ctx.fillRect(segX1, mid, segW, bh);
        ctx.fillStyle = noisePattern; ctx.fillRect(segX1, mid, segW, bh);
      }

      // Vertical lines + top borders
      const lineColorDesign = is3fn ? 'rgba(204,34,87,1)' : 'rgba(141,30,204,1)';
      const lineColorEng = 'rgba(24,34,40,1)';
      if (seg.design > 0) {
        const bh = (seg.design / 100) * half * prog;
        ctx.beginPath(); ctx.moveTo(nx, mid); ctx.lineTo(nx, mid - bh); ctx.strokeStyle = lineColorDesign; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(segX1, mid - bh); ctx.lineTo(segX1 + segW, mid - bh); ctx.strokeStyle = lineColorDesign; ctx.lineWidth = 2; ctx.stroke();
      }
      if (seg.eng > 0) {
        const bh = (seg.eng / 100) * half * prog;
        ctx.beginPath(); ctx.moveTo(nx, mid); ctx.lineTo(nx, mid + bh); ctx.strokeStyle = lineColorEng; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(segX1, mid + bh); ctx.lineTo(segX1 + segW, mid + bh); ctx.strokeStyle = lineColorEng; ctx.lineWidth = 2; ctx.stroke();
      }
    }

    // Baseline
    ctx.beginPath(); ctx.moveTo(PAD.left, mid); ctx.lineTo(W - PAD.right, mid); ctx.strokeStyle = 'rgba(34,34,42,1)'; ctx.lineWidth = 1.5; ctx.stroke();

    // Dots + labels
    for (const seg of ALL) {
      const nx = xFor(seg.yearMid);
      const isHov = hovered?.id === seg.id;
      ctx.beginPath(); ctx.arc(nx, mid, isHov ? 5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(38,50,58,1)'; ctx.fill();
      ctx.fillStyle = isHov ? (seg.is3fn ? 'rgba(176,38,255,1)' : 'rgba(38,50,58,0.9)') : (seg.is3fn ? 'rgba(176,38,255,0.4)' : 'rgba(38,50,58,0.6)');
      ctx.font = `${isHov ? 'bold ' : ''}9px ui-monospace,monospace`; ctx.textAlign = 'center';
      ctx.fillText(seg.short, nx, mid + half * 0.82);
    }

    if (animT < 1 || hovered !== null) requestAnimationFrame(draw); else animDone = true;
  }

  // Hover
  canvas.addEventListener('mousemove', e => {
    const rect = canvas!.getBoundingClientRect(), sx = W / rect.width, sy = H / rect.height;
    const mx2 = (e.clientX - rect.left) * sx, my2 = (e.clientY - rect.top) * sy, mid = MID(), half = HALF();
    let found: CareerSegment | null = null;
    for (const seg of ALL) {
      const sx1 = xFor(seg.yearStart), sx2 = xFor(seg.yearEnd), dh = (seg.design / 100) * half, eh = (seg.eng / 100) * half;
      if (mx2 > sx1 - 4 && mx2 < sx2 + 4 && my2 > mid - dh - 8 && my2 < mid + eh + 8) { found = seg; break; }
    }
    const prev = hovered; hovered = found;
    if (found) {
      canvas!.style.cursor = 'pointer'; tooltip.style.display = 'block';
      document.getElementById('ct-title')!.textContent = found.label;
      document.getElementById('ct-period')!.textContent = found.period;
      document.getElementById('ct-design')!.textContent = found.design + '%';
      document.getElementById('ct-eng')!.textContent = found.eng + '%';
      document.getElementById('ct-desc')!.textContent = found.desc;
      let tx = e.clientX + 18, ty = e.clientY - 12;
      if (tx + 270 > window.innerWidth) tx = e.clientX - 280;
      tooltip.style.left = tx + 'px'; tooltip.style.top = ty + 'px';
    } else { canvas!.style.cursor = 'default'; tooltip.style.display = 'none'; }
    if (prev !== found) { animDone = false; requestAnimationFrame(draw); }
  });
  canvas.addEventListener('mouseleave', () => { hovered = null; tooltip.style.display = 'none'; animDone = false; requestAnimationFrame(draw); });

  setup();
  window.addEventListener('resize', () => { setup(); animT = 0; lastTs = null; animDone = false; requestAnimationFrame(draw); });

  // Reduced motion: skip animation, render at full
  if (reducedMotion) { animT = 1; }

  // IntersectionObserver: start animation when fully visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(draw);
        observer.disconnect();
      }
    });
  }, { threshold: 1.0 });
  observer.observe(canvas);
}
