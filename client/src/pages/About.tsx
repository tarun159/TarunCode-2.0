import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Code,
  Cpu,
  Wifi,
  ArrowRight,
  Check,
  Atom,
  FileCode,
  Zap,
  Wind,
  Flame,
  Highlighter,
  Search,
  BookOpen,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { GlassCard } from '@/components/GlassCard';

type IconType = typeof Code;

/** Tasteful scroll-reveal matching the Landing fade/slide-up pattern. */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  kicker,
  title,
  icon: Icon,
}: {
  kicker?: string;
  title: string;
  icon?: IconType;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {Icon && (
        <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/20">
          <Icon className="w-5 h-5 text-primary-400 dark:text-primary-400 light:text-primary-600" />
        </div>
      )}
      <div className="min-w-0">
        {kicker && (
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-400 dark:text-primary-400 light:text-primary-600 mb-1">
            {kicker}
          </p>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold text-surface-100 dark:text-surface-100 light:text-slate-900 break-words">
          {title}
        </h2>
      </div>
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-900/40 px-4 py-3 border border-white/10 dark:border-white/10 light:border-slate-200/60 min-w-0"
        >
          <Check className="w-5 h-5 text-primary-400 dark:text-primary-400 light:text-primary-600 mt-0.5 shrink-0" />
          <span className="text-sm text-surface-300 dark:text-surface-300 light:text-slate-600 break-words">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

const pcFeatures = [
  'C programming exercises',
  'OpenMP programs',
  'Compilation and execution commands',
  'Syntax-highlighted code',
  'Sample outputs',
  'Easy copy-to-clipboard functionality',
];

const iotFeatures = [
  'Embedded programming',
  'Arduino / C++ programs',
  'GPIO and sensor programs',
  'WiFi and IoT concepts',
  'MQTT experiments',
  'Circuit references and program resources',
];

const techStack = [
  { name: 'React', icon: Atom },
  { name: 'TypeScript', icon: FileCode },
  { name: 'Vite', icon: Zap },
  { name: 'Tailwind CSS', icon: Wind },
  { name: 'Firebase', icon: Flame },
  { name: 'Shiki', icon: Highlighter },
];

const learnSteps = [
  {
    icon: Search,
    title: 'Find',
    body: 'Browse organized lab programs without searching through scattered files.',
  },
  {
    icon: BookOpen,
    title: 'Understand',
    body: 'Read clean, syntax-highlighted code together with commands and sample output.',
  },
  {
    icon: PlayCircle,
    title: 'Practice',
    body: 'Copy the code, compile it, run it, and use it as a starting point for practical learning.',
  },
];

export function About() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero glow + floating orbs (mirrors Landing) */}
      <div className="floating-orb w-72 h-72 bg-primary-500 top-0 -left-24 pointer-events-none" />
      <div className="floating-orb-delayed w-80 h-80 bg-accent-500 bottom-0 -right-20 pointer-events-none" />
      <div className="pointer-events-none absolute left-1/2 -top-10 -translate-x-1/2 h-56 w-56 rounded-full bg-primary-500/20 blur-3xl light:bg-primary-500/15" />
      <div className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 h-44 w-72 rounded-full bg-accent-500/15 blur-3xl light:bg-accent-500/10" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* HERO */}
        <Reveal className="text-center pt-6 pb-12 sm:pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-surface-300 dark:text-surface-300 light:text-slate-600 mb-8">
            <Code className="w-4 h-4 text-primary-400" />
            TarunCode 2.0
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-surface-50 dark:text-surface-50 light:text-slate-900 mb-5 text-balance break-words">
            About <span className="text-gradient">TarunCode 2.0</span>
          </h1>
          <p className="text-lg sm:text-xl text-surface-300 dark:text-surface-300 light:text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A focused lab-program platform built to make practical programming easier to learn,
            understand, and revise.
          </p>
        </Reveal>

        {/* MAIN INTRODUCTION */}
        <Reveal delay={0.05} className="mb-16">
          <GlassCard padding="lg" className="max-w-3xl mx-auto">
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed mb-4">
              TarunCode 2.0 is a student-focused programming lab platform designed to bring important
              laboratory programs into one clean, organized, and easy-to-use place.
            </p>
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed">
              Instead of searching through scattered notes, screenshots, PDFs, and old programs,
              students can browse their lab programs, read the code, understand the expected output,
              and copy the programs when needed.
            </p>
          </GlassCard>
        </Reveal>

        {/* SECTION 1 — What is TarunCode 2.0? */}
        <Reveal className="mb-16">
          <SectionHeading kicker="Overview" title="What is TarunCode 2.0?" icon={Sparkles} />
          <GlassCard padding="lg">
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed mb-4">
              TarunCode 2.0 is built around a simple idea: lab programs should be easy to find, easy
              to read, and easy to practice.
            </p>
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed">
              The platform organizes practical programming exercises into dedicated lab sections
              while presenting each program with its code, commands, and expected output in a clear
              format.
            </p>
          </GlassCard>
        </Reveal>

        {/* SECTION 2 — Why I Created It */}
        <Reveal className="mb-16">
          <SectionHeading kicker="Purpose" title="Why I Created It" icon={Sparkles} />
          <GlassCard padding="lg">
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed mb-4">
              Programming lab preparation often involves searching through multiple sources just to
              find the correct program, compiler commands, or expected output.
            </p>
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed mb-4">
              TarunCode 2.0 was created to make that process simpler.
            </p>
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed">
              The goal is to provide a personal, organized lab reference where students can quickly
              access the programs they need during learning, practice, revision, and lab
              preparation.
            </p>
          </GlassCard>
        </Reveal>

        {/* SECTION 3 — PC Lab */}
        <Reveal className="mb-16">
          <SectionHeading title="PC Lab" icon={Cpu} />
          <GlassCard padding="lg">
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed mb-6">
              The PC Lab contains core programming and parallel programming laboratory exercises.
              Programs are presented with syntax-highlighted source code, compilation and execution
              commands, and sample output so students can understand the complete workflow from
              writing the program to running it.
            </p>
            <FeatureList items={pcFeatures} />
          </GlassCard>
        </Reveal>

        {/* SECTION 4 — IoT Lab */}
        <Reveal className="mb-16">
          <SectionHeading title="IoT Lab" icon={Wifi} />
          <GlassCard padding="lg">
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed mb-6">
              The IoT Lab brings embedded and IoT-oriented laboratory programs together in one place.
              Programs cover practical concepts such as GPIO, sensors, WiFi, MQTT, and other embedded
              programming exercises.
            </p>
            <FeatureList items={iotFeatures} />
          </GlassCard>
        </Reveal>

        {/* SECTION 5 — Built for Students */}
        <Reveal className="mb-16">
          <SectionHeading kicker="Practical Learning" title="Built for Students" icon={BookOpen} />
          <GlassCard padding="lg" className="mb-6">
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed">
              TarunCode 2.0 is designed around the way students actually prepare for laboratory work.
            </p>
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed mt-3">
              Every program is presented in a simple format so you can focus on understanding the
              program instead of spending time searching for it.
            </p>
          </GlassCard>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {learnSteps.map(({ icon: Icon, title, body }) => (
              <GlassCard key={title} padding="lg" hover className="flex flex-col">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/20 mb-4">
                  <Icon className="w-5 h-5 text-primary-400 dark:text-primary-400 light:text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed">
                  {body}
                </p>
              </GlassCard>
            ))}
          </div>
        </Reveal>

        {/* SECTION 6 — Built With */}
        <Reveal className="mb-16">
          <SectionHeading kicker="Technology" title="Built With" icon={Code} />
          <GlassCard padding="lg">
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed mb-6">
              TarunCode 2.0 is built using modern web technologies chosen for speed, reliability, and
              a polished developer experience.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {techStack.map(({ name, icon: Icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-900/40 px-4 py-3 border border-white/10 dark:border-white/10 light:border-slate-200/60 min-w-0"
                >
                  <Icon className="w-5 h-5 text-primary-400 dark:text-primary-400 light:text-primary-600 shrink-0" />
                  <span className="text-sm font-medium text-surface-200 dark:text-surface-200 light:text-slate-700 break-words">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        {/* SECTION 7 — The Goal */}
        <Reveal className="mb-16">
          <SectionHeading kicker="Vision" title="The Goal" icon={Sparkles} />
          <GlassCard padding="lg">
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed mb-4">
              The goal of TarunCode 2.0 is simple: make laboratory learning less frustrating and more
              accessible.
            </p>
            <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 leading-relaxed">
              It is not meant to replace understanding. It is meant to make the right resources easier
              to find, so students can spend more time learning, practicing, and building confidence
              with code.
            </p>
          </GlassCard>
        </Reveal>

        {/* FINAL CTA */}
        <Reveal className="mb-12">
          <div className="relative border-gradient rounded-3xl">
            <GlassCard padding="xl" className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-surface-100 dark:text-surface-100 light:text-slate-900 mb-3 break-words">
                Ready to explore the labs?
              </h2>
              <p className="text-surface-300 dark:text-surface-300 light:text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
                Browse the PC and IoT lab programs and start practicing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/pc-lab" className="min-w-0">
                  <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto">
                    Explore PC Lab
                  </Button>
                </Link>
                <Link to="/iot-lab" className="min-w-0">
                  <Button size="lg" variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto">
                    Explore IoT Lab
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default About;
