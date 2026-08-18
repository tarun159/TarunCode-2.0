import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Target, Cpu, Image as ImageIcon, Settings, Code2, CheckCircle2, X, ZoomIn } from 'lucide-react';
import { getIoTProgram } from '@/data/programs';
import { BackButton } from '../BackButton';
import { CodeViewer } from '../CodeViewer';
import { getLabRoute } from '@/utils/cn';
import { cn } from '@/utils/cn';

const fallbacks = {
  title: 'Untitled Experiment',
  aim: 'Aim will be added here.',
  setup: 'Setup / procedure will be added here.',
  code: '// Program code will be added here.\n// Paste the real program into client/src/data/programs.ts',
  result: 'Result will be added here.',
};

function SectionHeader({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center px-4 py-3 border-b border-white/10 dark:border-white/10 light:border-slate-200/50 bg-white/5 dark:bg-white/5 light:bg-slate-100/50">
      <Icon className="w-5 h-5 mr-2 text-accent-400" />
      <h2 className="text-lg font-semibold text-white dark:text-white light:text-slate-900">{label}</h2>
    </div>
  );
}

function Lightbox({
  isOpen,
  onClose,
  src,
  alt,
}: {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Enlarged circuit diagram"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-[95vw] max-h-[95vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-accent-400"
            aria-label="Close enlarged image"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg border border-white/10 shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function IoTProgramDetail() {
  const { number } = useParams<{ number: string }>();
  const parsed = Number(number);
  const program = Number.isFinite(parsed) ? getIoTProgram(parsed) : undefined;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!program) {
    return <Navigate to="/404" replace />;
  }

  const title = program.title.trim() || `Experiment ${program.experimentNo}`;
  const backTo = `/${getLabRoute('iot')}`;

  const handleImageClick = () => {
    if (program.circuitDiagram) {
      setIsLightboxOpen(true);
    }
  };

  return (
    <div className="pt-8">
      <BackButton to={backTo} label="Back to IoT Lab" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-4 mb-6"
      >
        <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 mb-2">
          <Info className="w-4 h-4" />
          <span className="uppercase">IoT LAB</span>
          <span>•</span>
          <span>Experiment No. {program.experimentNo}</span>
        </div>
        <h1 className="text-4xl font-bold text-white dark:text-white light:text-slate-900 mb-3">{title}</h1>
      </motion.div>

      <div className="space-y-6">
        {/* Row 1: Aim (60%) + Components (40%) */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-[3fr_2fr] items-start">
          {/* Aim */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className={cn(
              'bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50 overflow-hidden',
              'hover:border-accent-500/30 transition-colors duration-300'
            )}
          >
            <SectionHeader icon={Target} label="Aim" />
            <div className="p-4 pt-3 pb-4">
              <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed whitespace-pre-wrap">
                {program.aim.trim() || fallbacks.aim}
              </p>
            </div>
          </motion.section>

          {/* Components table */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={cn(
              'bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50 overflow-hidden',
              'hover:border-accent-500/30 transition-colors duration-300'
            )}
          >
            <SectionHeader icon={Cpu} label="Components" />
            <div className="p-4 pt-3 pb-4 overflow-x-auto">
              {program.components.length > 0 ? (
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-slate-400 dark:text-slate-400 light:text-slate-500 uppercase tracking-wider text-xs border-b border-white/10 dark:border-white/10 light:border-slate-200/50">
                      <th className="py-2 pr-4 font-medium">Component</th>
                      <th className="py-2 pr-4 font-medium">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {program.components.map((c, i) => (
                      <tr key={`${c.name}-${i}`} className="border-b border-white/5 dark:border-white/5 light:border-slate-200/50 last:border-0 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-slate-100/60 transition-colors">
                        <td className="py-2 pr-4 text-white dark:text-white light:text-slate-900 font-medium">{c.name}</td>
                        <td className="py-2 pr-4 text-accent-300 dark:text-accent-300 light:text-accent-600 font-mono">{c.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-500 light:text-slate-400">Components will be added here.</p>
              )}
            </div>
          </motion.section>
        </div>

        {/* Row 2: Circuit Diagram (60%) + Setup/Procedure (40%) */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-[3fr_2fr] items-start">
          {/* Circuit Diagram */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className={cn(
              'bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50 overflow-hidden',
              'hover:border-accent-500/30 transition-colors duration-300'
            )}
          >
            <SectionHeader icon={ImageIcon} label="Circuit Diagram" />
            <div className="p-4 pt-3 pb-4">
              <div className="relative overflow-hidden rounded-lg border border-white/10 dark:border-white/10 light:border-slate-200/50 bg-surface-950 dark:bg-surface-950 light:bg-slate-100 group cursor-zoom-in"
                onClick={handleImageClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleImageClick(); }}
                aria-label="Click to enlarge circuit diagram"
              >
                <img
                  src={program.circuitDiagram}
                  alt={`Circuit diagram for Experiment ${program.experimentNo}`}
                  loading="lazy"
                  className={cn(
                    'w-full h-auto max-h-[520px] object-contain',
                    'transition-all duration-500 ease-out',
                    'group-hover:scale-[1.015] group-hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.3)]'
                  )}
                />
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/10 light:group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="transform transition-all duration-300 scale-90 group-hover:scale-100">
                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20">
                      <ZoomIn className="w-6 h-6 text-surface-900" />
                    </div>
                    <p className="mt-2 text-xs font-medium text-white/80 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                      Click to enlarge
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Setup / Procedure */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={cn(
              'bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50 overflow-hidden',
              'hover:border-accent-500/30 transition-colors duration-300'
            )}
          >
            <SectionHeader icon={Settings} label="Setup / Procedure" />
            <div className="p-4 pt-3 pb-4">
              <div className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed whitespace-pre-wrap prose-invert max-h-[520px] overflow-y-auto">
                {program.setup.trim() || fallbacks.setup}
              </div>
            </div>
          </motion.section>
        </div>

        {/* Program Code - Full Width */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="code-viewer bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50 overflow-hidden"
        >
          <div className="flex items-center px-4 py-3 border-b border-surface-800 dark:border-surface-800 light:border-slate-200 bg-surface-900/50 dark:bg-surface-900/50 light:bg-slate-100/50">
            <Code2 className="w-5 h-5 mr-2 text-accent-400" />
            <h2 className="text-lg font-semibold text-white dark:text-white light:text-slate-900">Program Code</h2>
          </div>
          {program.codeImage ? (
            <div className="overflow-x-auto p-4">
              <img
                src={program.codeImage}
                alt={`Program code for Experiment ${program.experimentNo}`}
                className="max-w-full w-auto h-auto object-contain mx-auto"
                style={{ minWidth: 0 }}
              />
            </div>
          ) : (
            <CodeViewer
              code={program.code.trim() || fallbacks.code}
              language="cpp"
            />
          )}
        </motion.section>

        {/* Result - Full Width (LAST) */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={cn(
            'bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200/50 overflow-hidden',
            'hover:border-accent-500/30 transition-colors duration-300'
          )}
        >
          <SectionHeader icon={CheckCircle2} label="Result" />
          <div className="p-4 pt-3 pb-4">
            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed whitespace-pre-wrap">
              {program.result.trim() || fallbacks.result}
            </p>
          </div>
        </motion.section>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={program.circuitDiagram}
        alt={`Circuit diagram for Experiment ${program.experimentNo}`}
      />
    </div>
  );
}