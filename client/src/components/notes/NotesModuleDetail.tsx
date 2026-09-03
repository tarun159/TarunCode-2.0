import { useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import { NoteModule, NoteQuestion, NotesSectionConfig } from '@/data/pcNotes';
import { BackButton } from '../BackButton';
import { NotesQuestionList } from './NotesQuestionList';
import { AnimatedNotesViewer } from './AnimatedNotesViewer';
import { cn } from '@/utils/cn';

interface NotesModuleDetailProps {
  config: NotesSectionConfig;
  modules: NoteModule[];
}

/**
 * Study-notes page for one module. Renders the module header + a list of its
 * questions. Selecting a question opens the animated PDF answer viewer.
 */
export function NotesModuleDetail({ config, modules }: NotesModuleDetailProps) {
  const { moduleId } = useParams<{ moduleId: string }>();
  const Icon = config.icon;
  const module = modules.find((m) => m.id === moduleId);
  const [active, setActive] = useState<NoteQuestion | null>(null);

  if (!module) {
    return <Navigate to="/404" replace />;
  }

  const questionCount = module.questions.length;

  return (
    <div className="pt-8">
      <BackButton to={config.basePath} label={`Back to ${config.title}`} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-4 mb-8"
      >
        <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 mb-2">
          <Info className="w-4 h-4" />
          <span className="uppercase">{config.title}</span>
          <span>•</span>
          <span>
            {config.moduleLabel} {String(module.number).padStart(2, '0')}
          </span>
          <span>•</span>
          <span>
            {questionCount} {questionCount === 1 ? 'question' : 'questions'}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white dark:text-white light:text-slate-900 mb-3 flex items-center gap-3 break-words">
          <Icon className={cn('w-8 h-8 shrink-0', config.accentText)} />
          {module.title}
        </h1>
        <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 text-lg">{module.subtitle}</p>
      </motion.div>

      <NotesQuestionList config={config} questions={module.questions} onSelect={setActive} />

      <AnimatePresence>
        {active && (
          <AnimatedNotesViewer
            config={config}
            module={module}
            question={active}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
