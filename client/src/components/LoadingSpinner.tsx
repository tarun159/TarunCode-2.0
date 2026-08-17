import { cn } from '@/utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <svg className={cn('animate-spin text-primary-500', sizeClasses[size])} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-surface-950/80 light:bg-slate-50/80 backdrop-blur-sm">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('skeleton dark:from-surface-800 dark:via-surface-700 dark:to-surface-800 light:from-slate-200 light:via-slate-300 light:to-slate-200', className)} aria-hidden="true" />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card dark:glass-card light:glass-card space-y-4 animate-pulse">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <Skeleton className="h-6 w-3/4 rounded" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-2/3 rounded" />
      <Skeleton className="h-8 w-24 rounded-lg mt-4" />
    </div>
  );
}