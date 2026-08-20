import { Cpu, Wifi, Activity, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, ChevronRight } from 'lucide-react';
import { Program } from '@/data/programs';
import { ProgramCard } from './ProgramCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorState } from './ErrorState';
import { CanvasParticleField } from './CanvasParticleField';

interface ProgramListProps {
  programs: Program[];
  isLoading: boolean;
  error: string | null;
  lab?: 'pc' | 'iot';
}

export function ProgramList({ programs, isLoading, error, lab }: ProgramListProps) {
  const navigate = useNavigate();
  const isIoT = lab ? lab === 'iot' : programs[0]?.lab === 'iot';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ErrorState title="Error Loading Programs" message={error} showHomeLink showBackLink backPath="/dashboard" />
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center text-slate-300 dark:text-slate-300 light:text-slate-600">
          <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-xl dark:text-slate-300 light:text-slate-900">No programs available</p>
          <p className="text-sm mt-2 text-slate-400 dark:text-slate-400 light:text-slate-500">Check back later for new additions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8">
      {/* Shared TarunCode digital particle environment — same system as the Admin
         page. Sits behind the glass cards (fixed, z-index:-1, pointer-events:none)
         so the PC Lab and IoT Lab pages feel like the same futuristic space.
         Desktop 60–90 particles, mobile 25–45. Colors/depth motion are identical
         across all pages; no per-lab colour theme. */}
      <CanvasParticleField densityDesktop={[60, 90]} densityMobile={[25, 45]} />
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white dark:text-white light:text-slate-900 mb-2">
          {isIoT ? (
            <>
              <Wifi className="inline-block mr-2 w-8 h-8 text-cyan-400" />
              IoT Lab Programs
            </>
          ) : (
            <>
              <Cpu className="inline-block mr-2 w-8 h-8 text-purple-400" />
              PC Lab Programs
            </>
          )}
        </h1>
        <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 mt-2">
          {isIoT
            ? 'Explore Internet of Things programming with hardware component integration'
            : 'Master core programming concepts with practical exercises'}
        </p>
      </div>

      <div className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-white dark:text-white light:text-slate-900 font-medium">Program slots:</span>
          </div>
          <div className="text-slate-300 dark:text-slate-300 light:text-slate-600">
            <span className="text-2xl font-bold text-white dark:text-white light:text-slate-900">{programs.length}</span>
            <span className="text-slate-400 dark:text-slate-400 light:text-slate-500 ml-2">programs</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Standalone "Basic Programs" reference card — NOT a numbered experiment */}
        {!isIoT && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card border-gradient group relative overflow-hidden transform-gpu transition-all duration-300"
            onClick={() => navigate('/pc-lab/basic-programs')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/pc-lab/basic-programs'); }}
            role="button"
            tabIndex={0}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-primary-500 to-primary-600">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-surface-400 dark:text-surface-400 light:text-slate-500 uppercase tracking-wider">
                      Reference
                    </p>
                    <p className="text-sm font-mono text-primary-400 dark:text-primary-400 light:text-primary-600">
                      Beginner C
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-surface-500 dark:text-surface-500 light:text-slate-400 group-hover:text-primary-400 dark:group-hover:text-primary-400 light:group-hover:text-primary-600 transition-colors opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0" />
              </div>
              <h3 className="text-lg font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-2 line-clamp-1">
                Basic Programs
              </h3>
              <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 line-clamp-2 mb-4">
                A starter collection of beginner C programs with runnable code and sample output.
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5 dark:border-white/5 light:border-slate-200/50">
                <span className="px-2 py-1 text-xs font-mono rounded-lg bg-surface-800/50 dark:bg-surface-800/50 light:bg-slate-200/50 text-surface-300 dark:text-surface-300 light:text-slate-700 border border-surface-700 dark:border-surface-700 light:border-slate-300">
                  C
                </span>
                <span className="text-xs text-surface-500 dark:text-surface-500 light:text-slate-400 flex-1 text-right">
                  Click to view
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {programs.map((program, index) => (
          <ProgramCard
            key={`${program.lab}-${program.number}`}
            program={program}
            index={index}
            onClick={() => navigate(`/program/${program.lab}/${program.number}`)}
          />
        ))}
      </div>
    </div>
  );
}
