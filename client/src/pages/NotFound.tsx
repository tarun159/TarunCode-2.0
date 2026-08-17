import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';

export function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center pt-10">
      <p className="text-6xl font-extrabold text-gradient mb-3">404</p>
      <h1 className="text-2xl font-semibold text-surface-50 dark:text-surface-50 light:text-slate-900 mb-2">Page not found</h1>
      <p className="text-surface-400 dark:text-surface-400 light:text-slate-500 mb-6">That route does not exist.</p>
      <Link to="/dashboard">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
}
