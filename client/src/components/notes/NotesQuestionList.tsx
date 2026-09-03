import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { NoteQuestion, NotesSectionConfig } from '@/data/pcNotes';
import { NotesQuestionCard } from './NotesQuestionCard';
import { cn } from '@/utils/cn';

interface NotesQuestionListProps {
  config: NotesSectionConfig;
  questions: NoteQuestion[];
  onSelect: (question: NoteQuestion) => void;
}

/**
 * The list of questions inside a module. Clicking a question calls onSelect so
 * the parent can open the answer PDF. Fully generic and data-driven.
 */
export function NotesQuestionList({ config, questions, onSelect }: NotesQuestionListProps) {
  return (
    <div>
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <HelpCircle className={cn('w-5 h-5', config.accentText)} />
          <h2 className="text-xl font-semibold text-white dark:text-white light:text-slate-900">
            {config.questionLabel}s
          </h2>
          <span className="px-2 py-0.5 text-xs font-mono rounded-lg bg-surface-800/60 dark:bg-surface-800/60 light:bg-slate-200/70 text-surface-300 dark:text-surface-300 light:text-slate-600 border border-surface-700 dark:border-surface-700 light:border-slate-300">
            {questions.length}
          </span>
        </div>
        <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 mt-1">
          Click any {config.questionLabel.toLowerCase()} to open its complete answer.
        </p>
      </div>

      {questions.length === 0 ? (
        <div className="flex items-center justify-center min-h-[30vh] rounded-2xl border border-dashed border-white/10 dark:border-white/10 light:border-slate-300 bg-white/5 dark:bg-white/5 light:bg-slate-100/40">
          <div className="text-center p-8">
            <HelpCircle className="w-14 h-14 mx-auto mb-4 opacity-40" />
            <p className="text-lg text-slate-300 dark:text-slate-300 light:text-slate-700">
              No questions in this {config.moduleLabel.toLowerCase()} yet
            </p>
            <p className="text-sm mt-2 text-slate-400 dark:text-slate-400 light:text-slate-500 max-w-sm">
              Add questions (and their answer PDFs) in src/data/pcNotes.ts
            </p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {questions.map((question, index) => (
            <NotesQuestionCard
              key={question.id}
              config={config}
              question={question}
              index={index}
              onClick={() => onSelect(question)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
