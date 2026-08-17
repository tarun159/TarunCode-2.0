import { motion } from 'framer-motion';
import { ChevronRight, Monitor, Wifi } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Program } from '@/data/programs';

interface ProgramCardProps {
  program: Program;
  index: number;
  onClick: () => void;
}

const labIcons = {
  pc: Monitor,
  iot: Wifi,
};

const labColors = {
  pc: 'from-primary-500 to-primary-600',
  iot: 'from-accent-500 to-accent-600',
};

export const ProgramCard = ({ program, index, onClick }: ProgramCardProps) => {
  const LabIcon = labIcons[program.lab];
  const gradient = labColors[program.lab];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'glass-card border-gradient group relative overflow-hidden min-w-0 max-w-full',
        'transform-gpu transition-all duration-300'
      )}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      role="button"
      tabIndex={0}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-4 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0',
              `bg-gradient-to-br ${gradient}`
            )}>
              <LabIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-surface-400 dark:text-surface-400 light:text-slate-500 uppercase tracking-wider">
                {program.lab.toUpperCase()} LAB
              </p>
              <p className="text-sm font-mono text-primary-400 dark:text-primary-400 light:text-primary-600">
                Program {program.number.toString().padStart(2, '0')}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-surface-500 dark:text-surface-500 light:text-slate-400 group-hover:text-primary-400 dark:group-hover:text-primary-400 light:group-hover:text-primary-600 transition-colors opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0" />
        </div>
        <h3 className="text-lg font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-2 line-clamp-1">
          {program.title}
        </h3>
        <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 line-clamp-2 mb-4">
          {program.description}
        </p>
        <div className="flex items-center gap-3 pt-4 border-t border-white/5 dark:border-white/5 light:border-slate-200/50 min-w-0">
          <span className="px-2 py-1 text-xs font-mono rounded-lg bg-surface-800/50 dark:bg-surface-800/50 light:bg-slate-200/50 text-surface-300 dark:text-surface-300 light:text-slate-700 border border-surface-700 dark:border-surface-700 light:border-slate-300 shrink-0">
            {program.language.toUpperCase()}
          </span>
          <span className="text-xs text-surface-500 dark:text-surface-500 light:text-slate-400 flex-1 text-right min-w-0">
            Click to view
          </span>
        </div>
      </div>
    </motion.div>
  );
};

ProgramCard.displayName = 'ProgramCard';