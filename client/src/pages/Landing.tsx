import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Wifi, Code } from 'lucide-react';
import { Button } from '@/components/Button';

export function Landing() {
  return (
    <div className="relative overflow-hidden pt-8 pb-16">
      <div className="floating-orb w-72 h-72 bg-primary-500 top-10 -left-20" />
      <div className="floating-orb-delayed w-80 h-80 bg-accent-500 bottom-0 -right-16" />

      <div className="relative max-w-4xl mx-auto text-center px-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm text-surface-300 dark:text-surface-300 light:text-slate-600 mb-6"
        >
          <Code className="w-4 h-4 text-primary-400" />
          TarunCode 2.0
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl sm:text-6xl font-extrabold text-surface-50 dark:text-surface-50 light:text-slate-900 mb-5 text-balance"
        >
          Lab programs, <span className="text-gradient">beautifully presented</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-surface-400 dark:text-surface-400 light:text-slate-500 max-w-2xl mx-auto mb-10"
        >
          View and copy PC Lab and IoT Lab programs. Read-only, syntax-highlighted, and built for students.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link to="/signup">
            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="secondary">
              Login
            </Button>
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 mt-16 text-left">
          <div className="glass-card dark:glass-card light:glass-card">
            <Cpu className="w-8 h-8 text-primary-400 dark:text-primary-400 light:text-primary-600 mb-3" />
            <h2 className="text-xl font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-1">PC Lab</h2>
            <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500">10 C program slots covering core programming concepts.</p>
          </div>
          <div className="glass-card dark:glass-card light:glass-card">
            <Wifi className="w-8 h-8 text-accent-400 dark:text-accent-400 light:text-accent-600 mb-3" />
            <h2 className="text-xl font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-1">IoT Lab</h2>
            <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500">10 embedded/IoT slots for GPIO, sensors, WiFi, and MQTT.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
