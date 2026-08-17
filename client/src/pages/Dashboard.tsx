import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Wifi, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function Dashboard() {
  const { user } = useAuth();

  const labs = [
    {
      to: '/pc-lab',
      title: 'PC Lab',
      description: '10 core C lab programs with ready-to-use code for practical learning.',
      icon: Cpu,
      accent: 'from-primary-500 to-primary-700',
    },
    {
      to: '/iot-lab',
      title: 'IoT Lab',
      description: '10 practical IoT programs covering Arduino, GPIO, sensors, and connectivity.',
      icon: Wifi,
      accent: 'from-accent-500 to-accent-700',
    },
  ];

  return (
    <div className="pt-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-surface-50 dark:text-surface-50 light:text-slate-900 mb-2">
        Welcome{user ? `, ${user.username}` : ''}
      </h1>
      <p className="text-surface-400 dark:text-surface-400 light:text-slate-500 mb-10">Choose a lab to browse programs.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {labs.map((lab, i) => {
          const Icon = lab.icon;
          return (
            <Link key={lab.to} to={lab.to}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                className="glass-card border-gradient h-full perspective-1000"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lab.accent} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-surface-50 dark:text-surface-50 light:text-slate-900 mb-2">{lab.title}</h2>
                <p className="text-surface-400 dark:text-surface-400 light:text-slate-500 mb-6">{lab.description}</p>
                <span className="inline-flex items-center gap-2 text-primary-300 dark:text-primary-300 light:text-primary-600 text-sm font-medium">
                  Open lab <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
