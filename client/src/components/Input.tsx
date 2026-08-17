import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-surface-300 dark:text-surface-300 light:text-slate-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 dark:text-surface-500 light:text-slate-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 py-3.5 rounded-xl border text-surface-50 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200',
              'dark:bg-surface-900/50 dark:border-surface-700 dark:focus:border-primary-500 dark:text-surface-50 dark:placeholder-surface-500',
              'light:bg-white light:border-slate-300 light:focus:border-primary-500 light:text-slate-900 light:placeholder-slate-400',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              error ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' : '',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 dark:text-surface-500 light:text-slate-400 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-400 dark:text-red-400 light:text-red-600" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-surface-500 dark:text-surface-500 light:text-slate-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';