import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X, ChevronRight, Loader2 } from 'lucide-react';
import { NoteModule, NoteQuestion, NotesSectionConfig } from '@/data/pcNotes';
import { NotesPageRenderer } from './NotesPageRenderer';
import { cn } from '@/utils/cn';

interface AnimatedNotesViewerProps {
  config: NotesSectionConfig;
  module: NoteModule;
  question: NoteQuestion;
  onClose: () => void;
}

/**
 * Futuristic, premium answer viewer that slides down and fades in.
 *
 * Features:
 * - Glass-style panel with emerald accent.
 * - Slide-down + fade-in entrance (respects prefers-reduced-motion).
 * - Vertical scrollable page stack.
 * - Animated reading-progress line.
 * - Copy protection (no selection, right-click, drag).
 * - Subtle loading animation for pages.
 * - No download button, no new-tab button.
 */
export function AnimatedNotesViewer({ config, module, question, onClose }: AnimatedNotesViewerProps) {
  const reducedMotion = !!useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Close on Escape, lock body scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Animate reading progress as user scrolls.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const scrolled = scrollTop / (scrollHeight - clientHeight);
      setProgress(Math.min(Math.max(scrolled, 0), 1));
    };

    el.addEventListener('scroll', update, { passive: true });
    return () => el.removeEventListener('scroll', update);
  }, []);

  // Simulate page-loading delay (in real use the images load naturally).
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };
  const overlayTransition = reducedMotion ? { duration: 0 } : { duration: 0.2 };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={overlayTransition}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-6 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={question.question}
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -48, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -48, scale: 0.98 }}
        transition={transition}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative flex flex-col w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-[1080px]',
          'bg-surface-900/90 dark:bg-surface-900/90 light:bg-white sm:rounded-2xl overflow-hidden',
          'border border-white/10 dark:border-white/10 light:border-slate-200/60 shadow-2xl',
          'max-w-full'
        )}
      >
        {/* Header with glass styling */}
        <header className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-white/10 dark:border-white/10 light:border-slate-200/60 bg-surface-900/50 dark:bg-surface-900/50 light:bg-slate-100/60 shrink-0">
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 bg-gradient-to-br', config.gradient)}>
            <ChevronRight className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className={cn('text-xs font-medium uppercase tracking-wider truncate', config.accentText)}>
              {module.title} · {config.questionLabel} {question.id}
            </p>
            <h2 className="text-base sm:text-lg font-semibold text-white dark:text-white light:text-slate-900 leading-snug break-words line-clamp-2">
              {question.question}
            </h2>
          </div>

          {/* Animated progress line */}
          <div className="hidden sm:block w-24 h-1 rounded-full bg-surface-800/60 overflow-hidden shrink-0">
            <motion.div
              className={cn('h-full', config.hoverGradient.split(' ')[0])}
              style={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close answer"
            className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-surface-300 dark:text-surface-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 bg-surface-800/50 hover:bg-surface-800 dark:bg-surface-800/50 dark:hover:bg-surface-800 light:bg-slate-200 light:hover:bg-slate-300 border border-surface-700/60 dark:border-surface-700/60 light:border-slate-300 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Main content — vertical scrollable pages */}
        <div
          ref={containerRef}
          className="flex-1 min-h-0 overflow-y-auto bg-surface-950 dark:bg-surface-950 light:bg-slate-100 p-4 sm:p-8"
        >
          {!loaded && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-emerald-400" />
                <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-500">Preparing answer…</p>
              </div>
            </div>
          )}

          {loaded && question.pages.length === 0 && (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="text-center max-w-md">
                <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br', config.gradient)}>
                  <X className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">
                  No pages yet
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 mt-2">
                  This question is ready, but its answer pages haven't been added.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 light:text-slate-400 mt-3">
                  Export your Word answer as PDF, convert each page to WebP, and place them under
                  <span className="font-mono"> public/notes/pc/{module.id}/{question.id}/</span>
                </p>
              </div>
            </div>
          )}

          {loaded && question.pages.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <NotesPageRenderer pages={question.pages} />
              <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-slate-500 dark:text-slate-500 light:text-slate-400">
                Answer prepared with Microsoft Word · Preserved formatting
              </div>
            </div>
          )}
        </div>

        {/* Mobile progress indicator */}
        <div className="sm:hidden h-1 w-full bg-surface-800/60 overflow-hidden">
          <motion.div
            className={cn('h-full', config.hoverGradient.split(' ')[0])}
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
