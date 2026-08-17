import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { GlassCard } from '@/components/GlassCard';

export function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      showToast('Welcome back', 'success');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-10">
      <GlassCard>
        <h1 className="text-2xl font-bold text-surface-50 dark:text-surface-50 light:text-slate-900 mb-1">Login</h1>
        <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 mb-6">Access your lab programs.</p>
        <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
          />
          <Button type="submit" fullWidth loading={loading}>
            Login
          </Button>
        </form>
        <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 mt-4">
          No account?{' '}
          <Link to="/signup" className="text-primary-400 dark:text-primary-400 light:text-primary-600 hover:text-primary-300 dark:hover:text-primary-300 light:hover:text-primary-700">
            Sign up
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
