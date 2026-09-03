import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

interface NotesPageRendererProps {
  pages: string[];
}

/**
 * Renders a vertical stack of answer page images with copy-protection.
 * - Disables text selection, right-click, image dragging.
 * - Adds a subtle watermark overlay.
 * - Fades pages in as they become visible.
 * - Respects prefers-reduced-motion.
 *
 * The pages are rendered with glass-like borders and a centered layout.
 */
export function NotesPageRenderer({ pages }: NotesPageRendererProps) {
  const reducedMotion = !!useReducedMotion();
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Disable text selection inside the whole container
    const style = document.createElement('style');
    style.textContent = `
      .no-select {
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleImageLoad = (i: number) => {
    setLoaded((prev) => ({ ...prev, [i]: true }));
  };

  return (
    <div
      className="no-select space-y-6"
      onContextMenu={(e) => e.preventDefault()}
    >
      {pages.map((src, i) => (
        <motion.figure
          key={`page-${i}`}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: i * 0.07 }}
          className="relative rounded-xl overflow-hidden glass"
        >
          {/* Watermark overlay (subtle, non-interfering) */}
          <div className="absolute inset-0 pointer-events-none z-10 watermark-overlay opacity-10" />

          {/* Page image */}
          <img
            src={src}
            alt={`Answer page ${i + 1}`}
            draggable="false"
            loading={i < 2 ? 'eager' : 'lazy'}
            onLoad={() => handleImageLoad(i)}
            className={cn(
              'block w-full h-auto bg-white shadow-lg',
              !loaded[i] && 'opacity-0 transition-opacity duration-500',
              loaded[i] && 'opacity-100'
            )}
            style={{
              imageRendering: 'auto',
              maxWidth: 'min(100%, 800px)',
              margin: '0 auto',
            }}
          />

          {/* Page label (bottom-right corner, subtle) */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 text-xs text-slate-200 font-mono backdrop-blur-sm">
            Page {i + 1} / {pages.length}
          </div>
        </motion.figure>
      ))}
    </div>
  );
}
