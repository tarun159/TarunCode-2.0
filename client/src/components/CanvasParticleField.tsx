import { useEffect, useRef } from 'react';
import '@/styles/canvasParticleField.css';

/**
 * Reusable HTML5 Canvas particle field — a premium, deep 3D digital snowfall /
 * energy environment.
 *
 * The SAME visual system is used across the Admin User Activity page, the PC Lab
 * page and the IoT Lab page (no per-page colour themes — every page uses the
 * one TarunCode palette: soft white / light-cyan / subtle-blue majority, with
 * violet occasional and amber very occasional). Each instance configures only
 * its particle density; the look, depth layers, motion and fade are identical.
 *
 * Hundreds of small flakes fall slowly from the top, layered into background /
 * midground / foreground depths so the field reads as a deep space. Each flake
 * has its own size, opacity, speed, gentle sinusoidal wind, and phase; a small
 * number twinkle softly brighter on independent timers. Flakes fade in near the
 * top and fade out before the bottom (no trails, no pile-up) then respawn.
 *
 * Plain browser canvas + one requestAnimationFrame loop. DPR-aware, pauses when
 * the tab is hidden, rebuilds only on breakpoint/resize crossing, cleans up all
 * listeners + the frame on unmount. Respects prefers-reduced-motion (one faint
 * static frame, no loop). No WebGL, no libraries, no new dependencies. The
 * canvas is fixed, behind all page content, and pointer-events:none.
 */

type Layer = 'bg' | 'mid' | 'fg';

interface P {
  layer: Layer;
  x: number;
  y: number;
  r: number;
  vy: number; // px / second (fall)
  vx: number; // base horizontal drift px / second
  windAmp: number; // sway amplitude px / second
  windFreq: number; // sway angular speed
  windPhase: number;
  peak: number; // max opacity (kept low)
  color: string; // "r,g,b"
  glow: boolean;
  twinkle: boolean;
  twFreq: number;
  twPhase: number;
}

// TarunCode language, kept faint: white / light-cyan / subtle-blue majority,
// violet occasional, amber very occasional. Weighted, never a rainbow.
const PALETTE: { c: string; w: number }[] = [
  { c: '248,250,252', w: 0.34 }, // soft white
  { c: '186,230,253', w: 0.30 }, // light cyan
  { c: '125,211,252', w: 0.20 }, // subtle blue
  { c: '167,139,250', w: 0.11 }, // violet (occasional)
  { c: '245,158,11', w: 0.05 }, // amber (very occasional)
];

function pickColor(): string {
  let t = Math.random();
  for (const p of PALETTE) {
    t -= p.w;
    if (t <= 0) return p.c;
  }
  return PALETTE[0].c;
}

function makeParticle(W: number, H: number, layer: Layer, atTop: boolean): P {
  const r =
    layer === 'bg' ? 0.6 + Math.random() * 0.8 : layer === 'mid' ? 1.0 + Math.random() * 1.2 : 1.6 + Math.random() * 1.6;
  const speed =
    layer === 'bg' ? 6 + Math.random() * 8 : layer === 'mid' ? 12 + Math.random() * 12 : 20 + Math.random() * 16;
  const peak =
    layer === 'bg' ? 0.1 + Math.random() * 0.12 : layer === 'mid' ? 0.18 + Math.random() * 0.16 : 0.26 + Math.random() * 0.18;
  return {
    layer,
    x: Math.random() * W,
    y: atTop ? -Math.random() * 30 : Math.random() * H,
    r,
    vy: speed,
    vx: (Math.random() - 0.5) * (layer === 'fg' ? 10 : layer === 'mid' ? 7 : 5),
    windAmp: (layer === 'fg' ? 8 : layer === 'mid' ? 6 : 4) + Math.random() * 8,
    windFreq: 0.2 + Math.random() * 0.5,
    windPhase: Math.random() * Math.PI * 2,
    peak,
    color: pickColor(),
    glow: Math.random() < (layer === 'fg' ? 0.22 : 0.07),
    twinkle: Math.random() < 0.06,
    twFreq: 0.15 + Math.random() * 0.4,
    twPhase: Math.random() * Math.PI * 2,
  };
}

function buildParticles(W: number, H: number, mobile: boolean, desktop: [number, number], mobileRange: [number, number]): P[] {
  const range = mobile ? mobileRange : desktop;
  const total = range[0] + Math.floor(Math.random() * (range[1] - range[0] + 1));
  const arr: P[] = new Array(total);
  for (let i = 0; i < total; i++) {
    const roll = Math.random();
    const layer: Layer = roll < 0.45 ? 'bg' : roll < 0.85 ? 'mid' : 'fg';
    arr[i] = makeParticle(W, H, layer, false);
  }
  return arr;
}

interface CanvasParticleFieldProps {
  /** Desktop particle count range [min, max]. */
  densityDesktop?: [number, number];
  /** Mobile particle count range [min, max]. */
  densityMobile?: [number, number];
  className?: string;
}

export function CanvasParticleField({
  densityDesktop = [120, 180],
  densityMobile = [50, 90],
  className = '',
}: CanvasParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;
    // Rebind to non-null locals so narrowing survives inside the rAF closures.
    const cv: HTMLCanvasElement = canvasEl;
    const g: CanvasRenderingContext2D = ctx;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let particles: P[] = [];
    let isMobile = false;
    let glowScale = 1;
    let raf = 0;
    let running = false;
    let last = performance.now();

    const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobMQ = window.matchMedia('(max-width: 768px), (hover: none)');

    function drawStatic() {
      g.clearRect(0, 0, W, H);
      g.shadowBlur = 0;
      for (const p of particles) {
        g.beginPath();
        g.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        g.fillStyle = `rgba(${p.color}, ${(p.peak * 0.7).toFixed(3)})`;
        g.fill();
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = Math.floor(W * dpr);
      cv.height = Math.floor(H * dpr);
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);

      const nowMobile = mobMQ.matches;
      if (nowMobile !== isMobile || particles.length === 0) {
        isMobile = nowMobile;
        glowScale = isMobile ? 0.7 : 1;
        particles = buildParticles(W, H, isMobile, densityDesktop, densityMobile);
      }
      if (reduceMQ.matches) drawStatic();
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05); // clamp big gaps (tab refocus)
      last = now;
      const t = now / 1000;
      g.clearRect(0, 0, W, H);

      const topFade = H * 0.06;
      const botStart = H * 0.82;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const sway = Math.sin(t * p.windFreq + p.windPhase) * p.windAmp;
        p.x += (p.vx + sway) * dt;
        p.y += p.vy * dt;

        if (p.x < -12) p.x = W + 12;
        else if (p.x > W + 12) p.x = -12;

        let a = p.peak;
        if (p.y < topFade) a = p.peak * ((p.y + 24) / (topFade + 24));
        else if (p.y > botStart) a = p.peak * (1 - (p.y - botStart) / (H - botStart));
        if (a < 0) a = 0;

        if (p.twinkle) {
          a *= 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * p.twFreq + p.twPhase));
        }

        if (p.y > H + 12) {
          // Respawn at the top, reusing the same object (no allocation churn).
          Object.assign(p, makeParticle(W, H, p.layer, true));
          continue;
        }

        g.beginPath();
        g.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        g.fillStyle = `rgba(${p.color}, ${a.toFixed(3)})`;
        if (p.glow) {
          g.shadowBlur = glowScale * p.r * 2.4;
          g.shadowColor = `rgba(${p.color}, ${Math.min(a * 1.5, 0.9).toFixed(3)})`;
        } else {
          g.shadowBlur = 0;
        }
        g.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMQ.matches) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    resize();
    if (reduceMQ.matches) {
      // One faint static field, no continuous animation work.
      drawStatic();
    } else {
      start();
    }

    const onResize = () => resize();
    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };
    const onReduce = () => {
      if (reduceMQ.matches) {
        stop();
        drawStatic();
      } else {
        start();
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    document.addEventListener('visibilitychange', onVis);
    reduceMQ.addEventListener('change', onReduce);

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      document.removeEventListener('visibilitychange', onVis);
      reduceMQ.removeEventListener('change', onReduce);
    };
    // Re-create the field when the density configuration changes.
  }, [densityDesktop, densityMobile]);

  return <canvas ref={canvasRef} className={`canvas-particle-field ${className}`.trim()} aria-hidden="true" />;
}
