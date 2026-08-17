import { Cpu, Wifi, Activity, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Program } from '@/data/programs';
import { ProgramCard } from './ProgramCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorState } from './ErrorState';

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
