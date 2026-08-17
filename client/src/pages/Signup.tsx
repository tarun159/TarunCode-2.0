import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { GlassCard } from '@/components/GlassCard';

export function Signup() {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(username, email, password);
      showToast('Account created', 'success');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Signup failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-10">
      <GlassCard>
        <h1 className="text-2xl font-bold text-surface-50 dark:text-surface-50 light:text-slate-900 mb-1">Create account</h1>
        <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 mb-6">Join TarunCode 2.0 to browse lab programs.</p>
        <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
          <Input
            label="Username"
            required
            minLength={2}
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
          />
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
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            hint="At least 6 characters"
          />
          <Button type="submit" fullWidth loading={loading}>
            Sign up
          </Button>
        </form>
        <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-400 dark:text-primary-400 light:text-primary-600 hover:text-primary-300 dark:hover:text-primary-300 light:hover:text-primary-700">
            Login
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
