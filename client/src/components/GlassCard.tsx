import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  onClick?: () => void;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

export function GlassCard({
  children,
  className,
  hover = false,
  padding = 'md',
  border = true,
  onClick,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass dark:glass light:glass rounded-2xl',
        border && 'border border-white/10 dark:border-white/10 light:border-slate-200/50',
        hover && 'glass-hover dark:glass-hover light:glass-hover cursor-pointer',
        paddingStyles[padding],
        onClick && 'select-none',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      {children}
    </div>
  );
}