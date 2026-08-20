import { useEffect, useRef, useState } from 'react';
import '@/styles/hero.css';

export type Lab = 'pc' | 'iot' | null;

/**
 * "Holographic Energy Field" — the Dashboard's living 3D background.
 *
 * Sits behind the Welcome content and PC Lab / IoT Lab cards at z-index:-1,
 * fully pointer-events:none, so the cards are never blocked.
 *
 * Composition (back → front):
 *   - ambient cyan + violet orbs (depth)
 *   - central holographic field: soft volume glow, concentric translucent
 *     rings (cyan/violet) and a luminous layered core
 *   - curved energy streams flowing from the field toward each lab card,
 *     with a few brighter dots travelling along them
 *   - data particles at two depths (parallax at different speeds)
 *   - a soft glow behind the heading
 *
 * `activeLab` (controlled by Dashboard's card hover/focus) intensifies the
 * matching stream, brightens the core toward that lab's colour, and leans
 * the whole field toward the card. On desktop, mouse movement drives
 * per-layer parallax. Touch / small screens and reduced-motion disable
 * parallax & most motion and reduce particle/stream counts.
 *
 * Pure CSS 3D + SVG — no WebGL, no new dependencies.
 */
export function LabBackground({ activeLab = null }: { activeLab?: Lab }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [simplified, setSimplified] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const simpleQuery = window.matchMedia('(max-width: 768px), (hover: none)');

    const sync = () => {
      setReducedMotion(motionQuery.matches);
      setSimplified(simpleQuery.matches || motionQuery.matches);
    };
    sync();

    motionQuery.addEventListener('change', sync);
    simpleQuery.addEventListener('change', sync);
    return () => {
      motionQuery.removeEventListener('change', sync);
      simpleQuery.removeEventListener('change', sync);
    };
  }, []);

  // Passive, rAF-throttled mouse parallax — writes --mx/--my on the stage.
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || simplified) return;
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1..1
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1..1
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      if (stageRef.current) {
        stageRef.current.style.setProperty('--mx', mx.toFixed(3));
        stageRef.current.style.setProperty('--my', my.toFixed(3));
      }
    });
  };

  const leanClass = activeLab === 'pc' ? 'lean-pc' : activeLab === 'iot' ? 'lean-iot' : '';
  const stateClass = activeLab === 'pc' ? 'state-pc' : activeLab === 'iot' ? 'state-iot' : '';
  const pcActive = activeLab === 'pc';
  const iotActive = activeLab === 'iot';

  // Concentric rings: size, depth (--z), and parallax factor (--pf).
  // Colour is driven by the shared palette variables (amber default →
  // cyan/violet via .state-pc / .state-iot), so the rings interpolate smoothly.
  const rings = [
    { size: '92%', z: '20px', pf: '0.9', delay: '0s', dur: '8.5s', td: '0s' },
    { size: '74%', z: '40px', pf: '1.3', delay: '1.1s', dur: '9.5s', td: '0.12s' },
    { size: '56%', z: '60px', pf: '1.7', delay: '2.2s', dur: '10.5s', td: '0.24s' },
  ];

  // Two depth tiers of particles.
  const farParticles = [
    { top: '20%', left: '14%', px: '10px', py: '-14px', d: '0s' },
    { top: '30%', left: '80%', px: '-12px', py: '-10px', d: '2.4s' },
    { top: '62%', left: '22%', px: '14px', py: '12px', d: '4.1s' },
    { top: '72%', left: '68%', px: '-10px', py: '16px', d: '1.7s' },
    { top: '50%', left: '88%', px: '-14px', py: '-12px', d: '5.5s' },
    { top: '80%', left: '40%', px: '12px', py: '14px', d: '3.2s' },
  ];
  const nearParticles = simplified
    ? [
        { top: '24%', left: '26%', px: '14px', py: '-18px', d: '0s' },
        { top: '70%', left: '74%', px: '-16px', py: '14px', d: '3.4s' },
        { top: '46%', left: '84%', px: '-12px', py: '-12px', d: '5.2s' },
      ]
    : [
        { top: '18%', left: '30%', px: '16px', py: '-20px', d: '0s' },
        { top: '28%', left: '70%', px: '-18px', py: '-14px', d: '2.2s' },
        { top: '64%', left: '16%', px: '18px', py: '16px', d: '4.6s' },
        { top: '70%', left: '74%', px: '-16px', py: '14px', d: '3.4s' },
        { top: '48%', left: '88%', px: '-14px', py: '-12px', d: '5.2s' },
        { top: '82%', left: '44%', px: '12px', py: '18px', d: '1.5s' },
        { top: '40%', left: '12%', px: '16px', py: '10px', d: '6.0s' },
      ];

  return (
    <div
      ref={stageRef}
      className={`lab-bg ${stateClass} ${simplified ? 'is-simplified' : ''} ${reducedMotion ? 'is-reduced' : ''}`}
      onPointerMove={handlePointerMove}
      aria-hidden="true"
    >
      {/* Ambient depth orbs */}
      <div className="lab-orb lab-orb-a" />
      <div className="lab-orb lab-orb-b" />

      {/* Central holographic energy field */}
      <div className={`lab-field ${leanClass}`}>
        <div className="lab-field-glow" />
        {rings.map((r, i) => (
          <div
            key={i}
            className="lab-ring"
            style={{
              width: r.size,
              height: r.size,
              ['--z' as string]: r.z,
              ['--pf' as string]: r.pf,
              animationDelay: r.delay,
              animationDuration: r.dur,
              transitionDelay: r.td,
            }}
          />
        ))}
        <div className="lab-core" />
      </div>

      {/* Curved energy streams toward each lab + travelling dots */}
      <svg className="lab-streams" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* PC Lab stream (cyan) — curves from field down to lower-left card */}
        <path
          className={`lab-stream-line to-pc ${pcActive ? 'is-active' : ''}`}
          d="M44 38 C 36 54, 26 70, 22 92"
        />
        <path
          className={`lab-stream-line to-pc ${pcActive ? 'is-active' : ''}`}
          d="M40 40 C 30 56, 20 72, 14 94"
        />
        {/* IoT Lab stream (violet) — curves from field down to lower-right card */}
        <path
          className={`lab-stream-line to-iot ${iotActive ? 'is-active' : ''}`}
          d="M56 38 C 64 54, 74 70, 78 92"
        />
        <path
          className={`lab-stream-line to-iot ${iotActive ? 'is-active' : ''}`}
          d="M60 40 C 70 56, 80 72, 86 94"
        />
        {/* Travelling dots */}
        <circle className={`lab-stream-dot to-pc ${pcActive ? 'is-active' : ''}`} cx="44" cy="38" r="0.9">
          <animateMotion dur="3.8s" repeatCount="indefinite" path="M44 38 C 36 54, 26 70, 22 92" />
        </circle>
        <circle className={`lab-stream-dot to-iot ${iotActive ? 'is-active' : ''}`} cx="56" cy="38" r="0.9">
          <animateMotion dur="4.2s" repeatCount="indefinite" path="M56 38 C 64 54, 74 70, 78 92" />
        </circle>
        <circle className={`lab-stream-dot to-pc ${pcActive ? 'is-active' : ''}`} cx="40" cy="40" r="0.7">
          <animateMotion dur="5.2s" repeatCount="indefinite" path="M40 40 C 30 56, 20 72, 14 94" />
        </circle>
        <circle className={`lab-stream-dot to-iot ${iotActive ? 'is-active' : ''}`} cx="60" cy="40" r="0.7">
          <animateMotion dur="4.7s" repeatCount="indefinite" path="M60 40 C 70 56, 80 72, 86 94" />
        </circle>
      </svg>

      {/* Far-depth particles */}
      <div className="lab-particles lab-particles-far">
        {farParticles.map((p, i) => (
          <span
            key={`far-${i}`}
            className="lab-particle"
            style={{ top: p.top, left: p.left, ['--px' as string]: p.px, ['--py' as string]: p.py, animationDelay: p.d }}
          />
        ))}
      </div>

      {/* Near-depth particles */}
      <div className="lab-particles lab-particles-near">
        {nearParticles.map((p, i) => (
          <span
            key={`near-${i}`}
            className="lab-particle"
            style={{ top: p.top, left: p.left, ['--px' as string]: p.px, ['--py' as string]: p.py, animationDelay: p.d }}
          />
        ))}
      </div>

      {/* Heading atmospheric glow */}
      <div className="lab-heading-glow" />
    </div>
  );
}
