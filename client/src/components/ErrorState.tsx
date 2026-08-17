import { AlertCircle, RefreshCw, Home, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { cn } from '@/utils/cn';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeLink?: boolean;
  showBackLink?: boolean;
  backPath?: string;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an unexpected error. Please try again.',
  onRetry,
  showHomeLink = true,
  showBackLink = false,
  backPath = '/dashboard',
  className,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex flex-col items-center justify-center text-center py-16 px-4', className)}
      role="alert"
    >
      <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>
      <h2 className="text-2xl font-bold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-2">{title}</h2>
      <p className="text-surface-400 dark:text-surface-400 light:text-slate-500 max-w-md mb-8">{message}</p>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        {onRetry && (
          <Button variant="primary" fullWidth onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
            Try Again
          </Button>
        )}
        {showBackLink && (
          <Link to={backPath}>
            <Button variant="secondary" fullWidth leftIcon={<ChevronLeft className="w-4 h-4" />}>
              Go Back
            </Button>
          </Link>
        )}
        {showHomeLink && (
          <Link to="/dashboard">
            <Button variant="ghost" fullWidth leftIcon={<Home className="w-4 h-4" />}>
              Dashboard
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}