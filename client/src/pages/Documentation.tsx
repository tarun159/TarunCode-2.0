import { Link } from 'react-router-dom';
import { Cpu, Wifi, BookOpen } from 'lucide-react';
import { LegalLayout, LegalSection } from '@/components/LegalLayout';

export function Documentation() {
  return (
    <LegalLayout
      title="Documentation"
      subtitle="Where to find program references and lab materials on TarunCode 2.0."
      lastUpdated="Last updated: August 2026"
    >
      <LegalSection heading="Program References">
        <p>
          TarunCode 2.0 organizes its learning material into two dedicated lab sections. Each program
          is presented with syntax-highlighted source code, compilation and execution commands, and
          sample output.
        </p>
      </LegalSection>

      <LegalSection heading="Browse the Labs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <Link
            to="/pc-lab"
            className="flex items-start gap-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-900/40 px-4 py-4 border border-white/10 dark:border-white/10 light:border-slate-200/60 hover:border-primary-500/50 transition-all min-w-0"
          >
            <Cpu className="w-6 h-6 text-primary-400 dark:text-primary-400 light:text-primary-600 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900">
                PC Lab
              </p>
              <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 break-words">
                Core C and OpenMP programming exercises with commands and outputs.
              </p>
            </div>
          </Link>
          <Link
            to="/iot-lab"
            className="flex items-start gap-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-900/40 px-4 py-4 border border-white/10 dark:border-white/10 light:border-slate-200/60 hover:border-accent-500/50 transition-all min-w-0"
          >
            <Wifi className="w-6 h-6 text-accent-400 dark:text-accent-400 light:text-accent-600 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900">
                IoT Lab
              </p>
              <p className="text-sm text-surface-400 dark:text-surface-400 light:text-slate-500 break-words">
                Embedded and IoT programs covering GPIO, sensors, WiFi, and MQTT.
              </p>
            </div>
          </Link>
        </div>
      </LegalSection>

      <LegalSection heading="Reading a Program">
        <p className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-primary-400 dark:text-primary-400 light:text-primary-600 mt-0.5 shrink-0" />
          Open any program to view its code, the commands needed to compile and run it, and a sample
          of the expected output. Use the copy button to copy code for your own practice.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default Documentation;
