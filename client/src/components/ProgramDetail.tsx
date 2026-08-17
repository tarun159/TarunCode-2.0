import { useParams, Navigate } from 'react-router-dom';
import { Terminal, Info } from 'lucide-react';
import { getProgram } from '@/data/programs';
import { BackButton } from './BackButton';
import { CodeViewer } from './CodeViewer';
import { getLabRoute } from '@/utils/cn';

export function ProgramDetail() {
  const { lab, number } = useParams<{ lab: string; number: string }>();

  if (lab !== 'pc' && lab !== 'iot') {
    return <Navigate to="/404" replace />;
  }

  const parsed = Number(number);

  const program = Number.isFinite(parsed) ? getProgram(lab, parsed) : undefined;

  if (!program) {
    return <Navigate to="/404" replace />;
  }

  const shikiLang = program.language === 'cpp' ? 'cpp' : 'c';
  const backTo = `/${getLabRoute(lab)}`;

  return (
    <div className="pt-8">
      <BackButton to={backTo} label={`Back to ${lab === 'iot' ? 'IoT' : 'PC'} Lab`} />
      <div className="mt-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 mb-2">
          <Info className="w-4 h-4" />
          <span>{program.language.toUpperCase()}</span>
          <span>•</span>
          <span>{lab.toUpperCase()} LAB #{String(program.number).padStart(2, '0')}</span>
        </div>
        <h1 className="text-4xl font-bold text-white dark:text-white light:text-slate-900 mb-3">{program.title}</h1>
        <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 text-lg">{program.description}</p>
      </div>

      <div className="grid gap-6">
        {/* COMMAND */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50 overflow-hidden">
          <div className="flex items-center px-4 py-3 border-b border-white/10 dark:border-white/10 light:border-slate-200/50 bg-white/5 dark:bg-white/5 light:bg-slate-100/50">
            <Terminal className="w-5 h-5 mr-2 text-primary-400 dark:text-primary-400 light:text-primary-600" />
            <h2 className="text-lg font-semibold text-white dark:text-white light:text-slate-900">Command</h2>
          </div>
          <div className="p-4">
            <div className="flex flex-col gap-2">
              {program.commands.map((cmd) => (
                <div
                  key={cmd}
                  className="flex items-center gap-3 rounded-lg bg-surface-950 dark:bg-surface-950 light:bg-slate-900 px-4 py-2.5 font-mono text-sm text-surface-100 dark:text-surface-100 light:text-slate-100"
                >
                  <span className="select-none text-primary-400 dark:text-primary-400 light:text-primary-300">$</span>
                  <code className="text-surface-100 dark:text-surface-100 light:text-slate-100">{cmd}</code>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PROGRAM CODE */}
        <div>
          <CodeViewer
            code={program.code || '// Code will be added here.\n// Paste the real program into client/src/data/programs.ts'}
            language={shikiLang}
          />
        </div>

        {/* OUTPUT */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50 overflow-hidden">
          <div className="flex items-center px-4 py-3 border-b border-white/10 dark:border-white/10 light:border-slate-200/50 bg-white/5 dark:bg-white/5 light:bg-slate-100/50">
            <Terminal className="w-5 h-5 mr-2 text-cyan-400 dark:text-cyan-400 light:text-cyan-600" />
            <h2 className="text-lg font-semibold text-white dark:text-white light:text-slate-900">Output</h2>
          </div>
          <div className="p-4">
            <pre className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 whitespace-pre-wrap bg-surface-950 dark:bg-surface-950 light:bg-slate-900 rounded-lg p-4 overflow-x-auto">
              {program.output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
