import { motion } from 'framer-motion';
import { ChevronRight, Clock, FileText } from 'lucide-react';
import { NoteQuestion, NotesSectionConfig } from '@/data/pcNotes';
import { cn } from '@/utils/cn';

interface NotesQuestionCardProps {
  config: NotesSectionConfig;
  question: NoteQuestion;
  index: number;
  onClick: () => void;
}

/**
 * A single clickable question row. Shows the question, optional description,
 * reading time and tags. Clicking opens the answer PDF (handled by the parent).
 */
export function NotesQuestionCard({ config, question, index, onClick }: NotesQuestionCardProps) {
  const Icon = config.icon;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.995 }}
      onClick={onClick}
      className={cn(
        'group w-full text-left glass-card border-gradient relative overflow-hidden',
        'flex items-center gap-4 px-5 py-4 min-w-0 transition-all duration-300'
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500',
          config.hoverGradient
        )}
      />
      <div className="relative z-10 flex items-center gap-4 min-w-0 w-full">
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 bg-gradient-to-br', config.gradient)}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('text-xs font-mono', config.accentText)}>
              {config.questionLabel} {String(index + 1).padStart(2, '0')}
            </span>
            {question.readingTime && (
              <span className="inline-flex items-center gap-1 text-xs text-surface-500 dark:text-surface-500 light:text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                {question.readingTime}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-surface-500 dark:text-surface-500 light:text-slate-500">
              <FileText className="w-3.5 h-3.5" />
              {question.pages.length} {question.pages.length === 1 ? 'page' : 'pages'}
            </span>
          </div>

          <h3 className="text-base font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900 mt-1 leading-snug break-words">
            {question.question}
          </h3>

          {question.description && (
            <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 mt-1 line-clamp-1">
              {question.description}
            </p>
          )}

          {question.tags && question.tags.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-surface-800/50 dark:bg-surface-800/50 light:bg-slate-200/60 text-surface-300 dark:text-surface-300 light:text-slate-600 border border-surface-700 dark:border-surface-700 light:border-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <ChevronRight
          className={cn(
            'shrink-0 w-5 h-5 transition-all duration-300',
            'text-surface-500 dark:text-surface-500 light:text-slate-400',
            'group-hover:text-primary-400 dark:group-hover:text-primary-400 light:group-hover:text-primary-600',
            'group-hover:translate-x-1'
          )}
        />
      </div>
    </motion.button>
  );
}

NotesQuestionCard.displayName = 'NotesQuestionCard';
