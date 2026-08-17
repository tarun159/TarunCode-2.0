import { motion } from 'framer-motion';
import { ChevronRight, Wifi } from 'lucide-react';
import { cn } from '@/utils/cn';
import { IoTProgram } from '@/data/programs';

interface IoTProgramCardProps {
  program: IoTProgram;
  index: number;
  onClick: () => void;
}

export const IoTProgramCard = ({ program, index, onClick }: IoTProgramCardProps) => {
  const hasContent = program.title.trim().length > 0;
  const displayTitle = program.title.trim() || `Experiment ${program.experimentNo}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'glass-card border-gradient group relative overflow-hidden',
        'transform-gpu transition-all duration-300',
        !hasContent && 'opacity-50'
      )}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      role="button"
      tabIndex={0}
      aria-label={hasContent ? `View ${program.title}` : `Experiment ${program.experimentNo} - not yet configured`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-accent-500 to-accent-600">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-surface-400 dark:text-surface-400 light:text-slate-500 uppercase tracking-wider">
                IOT LAB
              </p>
              <p className="text-sm font-mono text-accent-400 dark:text-accent-400 light:text-accent-600">
                Experiment {program.experimentNo.toString().padStart(2, '0')}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-surface-500 dark:text-surface-500 light:text-slate-400 group-hover:text-accent-400 dark:group-hover:text-accent-400 light:group-hover:text-accent-600 transition-colors opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0" />
        </div>
        <h3 className="text-lg font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-2 line-clamp-1">
          {displayTitle}
        </h3>
        <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 line-clamp-2 mb-4">
          {hasContent
            ? program.aim.slice(0, 120) + (program.aim.length > 120 ? '…' : '')
            : 'Add experiment details in programs.ts'}
        </p>
        <div className="flex items-center gap-3 pt-4 border-t border-white/5 dark:border-white/5 light:border-slate-200/50">
          <span className="px-2 py-1 text-xs font-mono rounded-lg bg-surface-800/50 dark:bg-surface-800/50 light:bg-slate-200/50 text-surface-300 dark:text-surface-300 light:text-slate-700 border border-surface-700 dark:border-surface-700 light:border-slate-300">
            C++
          </span>
          <span className="text-xs text-surface-500 dark:text-surface-500 light:text-slate-400 flex-1 text-right">
            {hasContent ? 'Click to view' : 'Not configured'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

IoTProgramCard.displayName = 'IoTProgramCard';