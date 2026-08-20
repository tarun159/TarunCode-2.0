import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Users, Mail, Calendar, Clock, MonitorSmartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { BackButton } from '@/components/BackButton';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorState } from '@/components/ErrorState';
import { AdminRain } from '@/components/AdminRain';

interface UserRow {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
  lastLoginAt?: string;
  lastUserAgent?: string;
}

// Parse the stored user-agent into a short "OS / Browser" label.
// Only reports values we can actually derive from the UA string — never invents
// device information that isn't present. Returns '—' when nothing is readable.
function parseDevice(uastring?: string): string {
  if (!uastring) return '—';
  const ua = uastring;

  let os = '';
  if (/Windows NT 10/.test(ua)) os = 'Windows';
  else if (/Windows/.test(ua)) os = 'Windows';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/(iPhone|iPad|iPod)/.test(ua)) os = 'iOS';
  else if (/Mac OS X/.test(ua)) os = 'macOS';
  else if (/Linux/.test(ua)) os = 'Linux';

  let browser = '';
  if (/Edg\//.test(ua)) browser = 'Edge';
  else if (/OPR\/|Opera/.test(ua)) browser = 'Opera';
  else if (/Firefox\//.test(ua)) browser = 'Firefox';
  else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) browser = 'Chrome';
  else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = 'Safari';

  if (!os && !browser) return '—';
  return [os, browser].filter(Boolean).join(' / ') || '—';
}

function formatDate(iso?: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function AdminUserActivity() {
  const [rows, setRows] = useState<UserRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        if (cancelled) return;
        const data: UserRow[] = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            username: typeof d.username === 'string' ? d.username : '',
            email: typeof d.email === 'string' ? d.email : '',
            createdAt: typeof d.createdAt === 'string' ? d.createdAt : undefined,
            lastLoginAt: typeof d.lastLoginAt === 'string' ? d.lastLoginAt : undefined,
            lastUserAgent: typeof d.lastUserAgent === 'string' ? d.lastUserAgent : undefined,
          };
        });
        data.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
        setRows(data);
        setError(false);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="pt-8 min-w-0">
      {/* Admin-only decorative "Digital Rain" — atmospheric, behind all content. */}
      <AdminRain />
      <BackButton to="/dashboard" label="Back to Dashboard" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-4 mb-6"
      >
        <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 mb-2">
          <Users className="w-4 h-4" />
          <span className="uppercase">Admin</span>
          <span>•</span>
          <span>User Activity</span>
        </div>
        <h1 className="text-4xl font-bold text-white dark:text-white light:text-slate-900 mb-2">
          User Activity
        </h1>
        <p className="text-surface-400 dark:text-surface-400 light:text-slate-500">
          Accounts registered in TarunCode 2.0 and their recent activity.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <ErrorState
            title="Couldn't load user activity"
            message="There was a problem reading user records. Please try again."
            onRetry={() => {
              setIsLoading(true);
              setError(false);
              void (async () => {
                try {
                  const snapshot = await getDocs(collection(db, 'users'));
                  const data: UserRow[] = snapshot.docs.map((doc) => {
                    const d = doc.data();
                    return {
                      id: doc.id,
                      username: typeof d.username === 'string' ? d.username : '',
                      email: typeof d.email === 'string' ? d.email : '',
                      createdAt: typeof d.createdAt === 'string' ? d.createdAt : undefined,
                      lastLoginAt: typeof d.lastLoginAt === 'string' ? d.lastLoginAt : undefined,
                      lastUserAgent:
                        typeof d.lastUserAgent === 'string' ? d.lastUserAgent : undefined,
                    };
                  });
                  data.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
                  setRows(data);
                  setError(false);
                } catch {
                  setError(true);
                } finally {
                  setIsLoading(false);
                }
              })();
            }}
          />
        </div>
      ) : rows.length === 0 ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center text-slate-300 dark:text-slate-300 light:text-slate-600">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl light:text-slate-900">No user records yet</p>
            <p className="text-sm mt-2 text-slate-400 light:text-slate-500">
              Accounts will appear here once users sign up.
            </p>
          </div>
        </div>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50 overflow-hidden"
        >
          <div className="flex items-center px-4 py-3 border-b border-white/10 dark:border-white/10 light:border-slate-200/50 bg-white/5 dark:bg-white/5 light:bg-slate-100/50">
            <Users className="w-5 h-5 mr-2 text-accent-400" />
            <h2 className="text-lg font-semibold text-white dark:text-white light:text-slate-900">
              Registered Users ({rows.length})
            </h2>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[640px]">
              <thead>
                <tr className="text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase tracking-wider text-xs border-b border-white/10 dark:border-white/10 light:border-slate-200/50">
                  <th className="py-2 pr-4 font-medium">Username</th>
                  <th className="py-2 pr-4 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </span>
                  </th>
                  <th className="py-2 pr-4 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Account Created
                    </span>
                  </th>
                  <th className="py-2 pr-4 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Last Login
                    </span>
                  </th>
                  <th className="py-2 pr-4 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <MonitorSmartphone className="w-3.5 h-3.5" /> Device / Browser
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/5 dark:border-white/5 light:border-slate-200/50 last:border-0 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-slate-100/60 transition-colors"
                  >
                    <td className="py-3 pr-4 text-white dark:text-white light:text-slate-900 font-medium">
                      {row.username || '—'}
                    </td>
                    <td className="py-3 pr-4 text-slate-300 dark:text-slate-300 light:text-slate-600">
                      {row.email || '—'}
                    </td>
                    <td className="py-3 pr-4 text-slate-300 dark:text-slate-300 light:text-slate-600 whitespace-nowrap">
                      {formatDate(row.createdAt)}
                    </td>
                    <td className="py-3 pr-4 text-slate-300 dark:text-slate-300 light:text-slate-600 whitespace-nowrap">
                      {row.lastLoginAt ? formatDate(row.lastLoginAt) : 'Never'}
                    </td>
                    <td className="py-3 pr-4 text-slate-300 dark:text-slate-300 light:text-slate-600 whitespace-nowrap">
                      {parseDevice(row.lastUserAgent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      )}
    </div>
  );
}
