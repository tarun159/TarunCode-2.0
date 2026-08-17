import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface BackButtonProps {
  to: string;
  label?: string;
  className?: string;
}

export function BackButton({ to, label = 'Back', className }: BackButtonProps) {
  return (
    <Link to={to}>
      <motion.button
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-surface-300 dark:text-surface-300 light:text-slate-700 hover:text-surface-100 dark:hover:text-surface-100 light:hover:text-slate-900 bg-surface-800/50 hover:bg-surface-800 border border-surface-700 dark:bg-surface-800/50 dark:hover:bg-surface-800 dark:border-surface-700 light:bg-slate-200 light:hover:bg-slate-300 light:border-slate-300 transition-all duration-200',
          className
        )}
        type="button"
      >
        <ChevronLeft className="w-4 h-4" />
        {label}
      </motion.button>
    </Link>
  );
}