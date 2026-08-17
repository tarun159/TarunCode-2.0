import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import { GlassCard } from '@/components/GlassCard';

/** Tasteful scroll-reveal matching the existing reveal pattern (fade/slide-up). */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative glow + floating orbs (mirrors the rest of the site) */}
      <div className="floating-orb w-72 h-72 bg-primary-500 top-0 -left-24 pointer-events-none" />
      <div className="floating-orb-delayed w-80 h-80 bg-accent-500 bottom-0 -right-20 pointer-events-none" />
      <div className="pointer-events-none absolute left-1/2 -top-10 -translate-x-1/2 h-56 w-56 rounded-full bg-primary-500/20 blur-3xl light:bg-primary-500/15" />
      <div className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 h-44 w-72 rounded-full bg-accent-500/15 blur-3xl light:bg-accent-500/10" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center pt-6 pb-10">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-surface-50 dark:text-surface-50 light:text-slate-900 mb-4 text-balance break-words">
            {title}
          </h1>
          <p className="text-lg text-surface-300 dark:text-surface-300 light:text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <p className="mt-4 text-sm text-surface-400 dark:text-surface-400 light:text-slate-500">
            {lastUpdated}
          </p>
        </Reveal>

        <div className="space-y-8 pb-16">{children}</div>
      </div>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
  delay = 0,
}: {
  heading: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <GlassCard padding="lg">
        <h2 className="text-xl sm:text-2xl font-bold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-4 break-words">
          {heading}
        </h2>
        <div className="space-y-3 text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed">
          {children}
        </div>
      </GlassCard>
    </Reveal>
  );
}

/** A simple bulleted list styled for legal/info pages. */
export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2">
      {items.map((item) => (
        <li key={item} className="break-words">
          {item}
        </li>
      ))}
    </ul>
  );
}
