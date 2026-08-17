import { Terminal, Code2, BookOpen } from 'lucide-react';
import { BackButton } from './BackButton';
import { CodeViewer } from './CodeViewer';
import { getLabRoute } from '@/utils/cn';
import { basicPrograms, compileRunGuide } from '@/data/programs';

export function BasicProgramsCollection() {
  const backTo = `/${getLabRoute('pc')}`;

  return (
    <div className="pt-8">
      <BackButton to={backTo} label="Back to PC Lab" />
      <div className="mt-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 mb-2">
          <BookOpen className="w-4 h-4" />
          <span>C</span>
          <span>•</span>
          <span>REFERENCE</span>
        </div>
        <h1 className="text-4xl font-bold text-white dark:text-white light:text-slate-900 mb-3">Basic Programs</h1>
        <p className="text-slate-400 dark:text-slate-400 light:text-slate-500 text-lg">
          A starter collection of beginner C programs with runnable code and sample output.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Compile & Run guide card — appears first on desktop, stacks on mobile */}
        <section className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50 overflow-hidden">
          <div className="flex items-center px-4 py-3 border-b border-white/10 dark:border-white/10 light:border-slate-200/50 bg-white/5 dark:bg-white/5 light:bg-slate-100/50">
            <Terminal className="w-5 h-5 mr-2 text-primary-400 dark:text-primary-400 light:text-primary-600" />
            <h2 className="text-lg font-semibold text-white dark:text-white light:text-slate-900">{compileRunGuide.title}</h2>
          </div>
          <div className="p-4">
            <div className="flex flex-col gap-2">
              {compileRunGuide.commands.map((cmd) => (
                <div
                  key={cmd}
                  className="flex items-center gap-3 rounded-lg bg-surface-950 dark:bg-surface-950 light:bg-slate-900 px-4 py-2.5 font-mono text-sm text-surface-100 dark:text-surface-100 light:text-slate-100"
                >
                  <span className="select-none text-primary-400 dark:text-primary-400 light:text-primary-300">$</span>
                  <code className="text-surface-100 dark:text-surface-100 light:text-slate-100">{cmd}</code>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-400 dark:text-slate-400 light:text-slate-500">
              {compileRunGuide.note}
            </p>
          </div>
        </section>

        {/* Three beginner programs */}
        {basicPrograms.map((basic) => (
          <section
            key={basic.id}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50 overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-white/10 dark:border-white/10 light:border-slate-200/50 bg-white/5 dark:bg-white/5 light:bg-slate-100/50">
              <Code2 className="w-5 h-5 mr-2 text-purple-400 dark:text-purple-400 light:text-purple-600" />
              <h2 className="text-lg font-semibold text-white dark:text-white light:text-slate-900">{basic.title}</h2>
            </div>
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="border-b border-white/10 dark:border-white/10 light:border-slate-200/50 lg:border-b-0 lg:border-r">
                <div className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 border-b border-white/10 dark:border-white/10 light:border-slate-200/50">
                  Code
                </div>
                <div className="p-4">
                  <CodeViewer code={basic.code} language="c" showLineNumbers maxHeight="360px" />
                </div>
              </div>
              <div>
                <div className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-500 border-b border-white/10 dark:border-white/10 light:border-slate-200/50">
                  Output
                </div>
                <div className="p-4">
                  <pre className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 whitespace-pre-wrap bg-surface-950 dark:bg-surface-950 light:bg-slate-900 rounded-lg p-4 overflow-x-auto">
                    {basic.output}
                  </pre>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
