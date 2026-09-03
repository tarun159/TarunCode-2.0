import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Layers } from 'lucide-react';
import { NoteModule, NotesSectionConfig } from '@/data/pcNotes';
import { NotesModuleCard } from './NotesModuleCard';
import { CanvasParticleField } from '../CanvasParticleField';
import { cn } from '@/utils/cn';

interface NotesModuleListProps {
  config: NotesSectionConfig;
  modules: NoteModule[];
}

/** Generic module grid for a notes section. Driven entirely by props. */
export function NotesModuleList({ config, modules }: NotesModuleListProps) {
  const navigate = useNavigate();
  const title = config.title;
  const Icon = config.icon;
  const questionCount = modules.reduce((sum, m) => sum + m.questions.length, 0);

  return (
    <div className="pt-8">
      <CanvasParticleField densityDesktop={[60, 90]} densityMobile={[25, 45]} />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white dark:text-white light:text-slate-900 mb-2 flex items-center gap-2">
            <Icon className={cn('w-8 h-8', config.accentText)} />
            {title}
          </h1>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 mt-2">{config.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className={cn('w-5 h-5', config.accentText)} />
              <span className="text-white dark:text-white light:text-slate-900 font-medium">{config.moduleLabel}s:</span>
            </div>
            <div className="text-slate-300 dark:text-slate-300 light:text-slate-600">
              <span className="text-2xl font-bold text-white dark:text-white light:text-slate-900">{modules.length}</span>
              <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 ml-2">modules</span>
              <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 mx-2">•</span>
              <span className="text-2xl font-bold text-white dark:text-white light:text-slate-900">{questionCount}</span>
              <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 ml-2">questions</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {modules.map((module, index) => (
            <NotesModuleCard
              key={module.id}
              config={config}
              module={module}
              index={index}
              onClick={() => navigate(`${config.basePath}/${module.id}`)}
            />
          ))}
        </motion.div>

        {modules.length === 0 && (
          <div className="flex items-center justify-center min-h-[30vh] mt-8">
            <div className="text-center text-slate-300 dark:text-slate-300 light:text-slate-600">
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl dark:text-slate-300 light:text-slate-900">No modules yet</p>
              <p className="text-sm mt-2 text-slate-400 dark:text-slate-400 light:text-slate-500">
                Add modules to {config.title} in src/data/pcNotes.ts
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
