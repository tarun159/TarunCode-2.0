import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950 dark:focus-visible:ring-offset-surface-950 light:focus-visible:ring-offset-slate-50 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus-visible:ring-primary-500 shadow-lg shadow-primary-500/25',
      secondary: 'bg-surface-800/50 text-surface-100 border border-surface-700 hover:bg-surface-800 hover:border-surface-600 focus-visible:ring-surface-600 dark:bg-surface-800/50 dark:text-surface-100 dark:border-surface-700 dark:hover:bg-surface-800 dark:hover:border-surface-600 light:bg-slate-200 light:text-slate-900 light:border-slate-300 light:hover:bg-slate-300 light:hover:border-slate-400',
      ghost: 'bg-transparent text-surface-300 hover:bg-surface-800/50 hover:text-surface-100 focus-visible:ring-surface-600 dark:text-surface-300 dark:hover:bg-surface-800/50 dark:hover:text-surface-100 light:text-slate-600 light:hover:bg-slate-200 light:hover:text-slate-900',
      accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 focus-visible:ring-accent-500 shadow-lg shadow-accent-500/25',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 rounded-lg text-xs',
      md: 'px-5 py-2.5 rounded-xl text-sm',
      lg: 'px-7 py-3.5 rounded-2xl text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';