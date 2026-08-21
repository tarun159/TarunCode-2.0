import { cn } from '@/utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClass: Record<NonNullable<LoadingSpinnerProps['size']>, string> = {
  sm: 'tsp-loader--sm',
  md: 'tsp-loader--md',
  lg: 'tsp-loader--lg',
};

/**
 * TarunCode Premium Energy Orb Loader.
 *
 * A compact, volumetric holographic sphere — deep blue core with electric
 * blue, cyan and subtle violet tones at the outer surface. Slow internal
 * energy movement and a gentle atmospheric glow. Pure CSS animation; the
 * component mounts/unmounts with the real loading state, so there is no
 * artificial delay.
 */
export function LoadingSpinner({ size = 'lg', className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn('tsp-loader', sizeClass[size], className)}
      role="status"
      aria-live="polite"
      aria-label="TARUNCODE is loading"
    >
      <div className="tsp-loader__sphere">
        <div className="tsp-loader__energy-surface">
          <div className="tsp-loader__energy-ring" />
        </div>
        <div className="tsp-loader__bloom" />
        <div className="tsp-loader__center">
          <span className="tsp-loader__brand">TARUNCODE</span>
          <span className="tsp-loader__status">Loading</span>
        </div>
      </div>
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
    <div
      className={cn(
        'skeleton dark:from-surface-800 dark:via-surface-700 dark:to-surface-800 light:from-slate-200 light:via-slate-300 light:to-slate-200',
        className,
      )}
      aria-hidden="true"
    />
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