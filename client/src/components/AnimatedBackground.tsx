import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export function AnimatedBackground() {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialize particles
  const initParticles = () => {
    if (!canvasRef.current) return;
    const count = Math.min(60, Math.floor((widthRef.current * heightRef.current) / 15000));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * widthRef.current,
        y: Math.random() * heightRef.current,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
    particlesRef.current = particles;
  };

  // Handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      widthRef.current = canvas.parentElement?.clientWidth || window.innerWidth;
      heightRef.current = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = widthRef.current * dpr;
      canvas.height = heightRef.current * dpr;
      canvas.style.width = `${widthRef.current}px`;
      canvas.style.height = `${heightRef.current}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      initParticles();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [canvasRef.current]);

  // Mouse tracking for subtle interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = 0;

    const animate = (time: number) => {
      if (!ctx) return;

      const dt = Math.min((time - lastTime) / 1000, 0.05); // Cap delta time
      lastTime = time;

      // Clear
      ctx.clearRect(0, 0, widthRef.current, heightRef.current);

      // Draw ambient glows first
      drawAmbientGlows(ctx);

      // Update and draw particles
      updateParticles(dt);
      drawParticles(ctx);
      drawConnections(ctx);

      animationRef.current = requestAnimationFrame(animate);
    };

    const drawAmbientGlows = (ctx: CanvasRenderingContext2D) => {
      const glowCount = 3;
      for (let i = 0; i < glowCount; i++) {
        const x = (i * widthRef.current) / glowCount + (widthRef.current / glowCount) * 0.5;
        const y = heightRef.current * (0.3 + i * 0.2);
        const radius = Math.max(widthRef.current, heightRef.current) * 0.4;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        if (isDark) {
          gradient.addColorStop(0, 'rgba(14, 165, 233, 0.04)');
          gradient.addColorStop(0.5, 'rgba(217, 70, 239, 0.02)');
          gradient.addColorStop(1, 'transparent');
        } else {
          gradient.addColorStop(0, 'rgba(14, 165, 233, 0.02)');
          gradient.addColorStop(0.5, 'rgba(217, 70, 239, 0.01)');
          gradient.addColorStop(1, 'transparent');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, widthRef.current, heightRef.current);
      }
    };

    const updateParticles = (dt: number) => {
      const particles = particlesRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const interactionRadius = 150;
      const interactionStrength = 0.02;

      for (const p of particles) {
        // Subtle mouse interaction
        if (!reducedMotion) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < interactionRadius && dist > 1) {
            const force = (interactionRadius - dist) / interactionRadius * interactionStrength;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Apply velocity with damping
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Wrap around edges
        if (p.x < -10) p.x = widthRef.current + 10;
        if (p.x > widthRef.current + 10) p.x = -10;
        if (p.y < -10) p.y = heightRef.current + 10;
        if (p.y > heightRef.current + 10) p.y = -10;

        // Keep velocity bounded
        const maxSpeed = 0.5;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }
      }
    };

    const drawParticles = (ctx: CanvasRenderingContext2D) => {
      const particles = particlesRef.current;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = `rgba(148, 163, 184, ${p.opacity})`;
        } else {
          ctx.fillStyle = `rgba(100, 116, 139, ${p.opacity})`;
        }
        ctx.fill();
      }
    };

    const drawConnections = (ctx: CanvasRenderingContext2D) => {
      if (reducedMotion) return;

      const particles = particlesRef.current;
      const maxDist = 120;
      const maxDistSq = maxDist * maxDist;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / maxDist) * 0.08;
            if (opacity > 0.01) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              if (isDark) {
                ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
              } else {
                ctx.strokeStyle = `rgba(14, 165, 233, ${opacity * 0.6})`;
              }
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none"
      aria-hidden="true"
    />
  );
}