import { NotepadText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ---------------------------------------------------------------------------
// PC Notes — data-driven study notes with page-image rendering.
//
// Each question's answer is exported from Microsoft Word as a PDF, then each
// PDF page is converted to a high-quality WebP/PNG image. No answer text is
// stored here; the answer is rendered as a vertical stack of page images.
//
// To keep the website rendering the answer you only edit this file:
//
//   - Add a new module  → push a new NoteModule into `pcNotesModules`
//   - Add a new question → push a new NoteQuestion into a module's `questions`
//   - Add/change pages   → edit that question's `pages` array
//
// Page images live under public/notes/pc/<module-folder>/<question-id>/
// and are served at the root, e.g.:
//   public/notes/pc/module-1/simd/page-1.webp
//   → /notes/pc/module-1/simd/page-1.webp
//
// See public/notes-page-conversion.md for Word→PDF→WebP conversion steps.
// ---------------------------------------------------------------------------

export interface NoteQuestion {
  /** Unique route/metadata id, e.g. 'simd'. */
  id: string;
  /** The question shown on the module's question list. */
  question: string;
  /** Public paths to each page image, ordered from page-1 to page-N. */
  pages: string[];
  /** Optional one-line description shown under the question. */
  description?: string;
  /** Optional estimated reading time, e.g. '5 min'. */
  readingTime?: string;
  /** Optional tags shown as small chips, e.g. ['Architecture', 'Parallel']. */
  tags?: string[];
}

export interface NoteModule {
  /** Route segment, e.g. 'module-1' (used in /pc-notes/:moduleId). */
  id: string;
  /** Display order + badge number, e.g. 1. */
  number: number;
  /** Module title shown on the card and detail header. */
  title: string;
  /** Short one-liner shown on the card. */
  subtitle: string;
  questions: NoteQuestion[];
}

/**
 * Presentation config for a notes section. Kept separate from the data so the
 * reusable components stay generic — swap these for another section's values
 * (title, icon, colours, route) without touching component code.
 */
export interface NotesSectionConfig {
  title: string;
  subtitle: string;
  /** Route prefix, e.g. '/pc-notes' (list) used for navigation. */
  basePath: string;
  /** Label for a module, e.g. 'Module'. */
  moduleLabel: string;
  /** Label for a question, e.g. 'Question'. */
  questionLabel: string;
  icon: LucideIcon;
  /** Icon badge gradient, e.g. 'from-emerald-500 to-teal-600'. */
  gradient: string;
  /** Accent text colour, e.g. 'text-emerald-400'. */
  accentText: string;
  /** Hover overlay gradient, e.g. 'from-emerald-500/10 via-transparent to-accent-500/10'. */
  hoverGradient: string;
}

/** PC Notes section — the only concrete instantiation right now. */
export const pcNotesSection: NotesSectionConfig = {
  title: 'PC Notes',
  subtitle: 'Module-wise study notes. Click a question to view its complete answer.',
  basePath: '/pc-notes',
  moduleLabel: 'Module',
  questionLabel: 'Question',
  icon: NotepadText,
  gradient: 'from-green-500 to-teal-600',
  accentText: 'text-green-400',
  hoverGradient: 'from-green-500/10 via-transparent to-teal-600/10',
};

/**
 * The five study modules. Module 1 is seeded with one sample question whose
 * page images live at public/notes/pc/module-1/simd/. Modules 2–5 are ready
 * for future content — add questions as you add page images.
 */
export const pcNotesModules: NoteModule[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'Module 1',
    subtitle: 'Introduction and foundational concepts.',
    questions: [

  {
    id: 'flynns-taxonomy',
    question: 'Explain in detail the classification of parallel computers according to Flynns Taxonomy. Compare SIMD and MIMD systems. (10 Marks)',
    pages: [
      '/notes/pc/module-1/flynns-taxonomy/page-1.webp',
    '/notes/pc/module-1/flynns-taxonomy/page-2.webp',
    '/notes/pc/module-1/flynns-taxonomy/page-3.webp',
    '/notes/pc/module-1/flynns-taxonomy/page-4.webp'
    ],
    description: 'Flynns Taxonomy',
    readingTime: '2 min',
    tags: ['Module 1'],
  }],
  },
  {
    id: 'module-2',
    number: 2,
    title: 'Module 2',
    subtitle: 'Second module of study notes.',
    questions: [
    {
      id: 'gpu-programming',
      question: 'Explain GPU Programming in detail.',
      pages: [
        '/notes/pc/module-2/gpu-programming/page-1.webp',
        '/notes/pc/module-2/gpu-programming/page-2.webp'
      ],
      description: 'Gpu Programming',
      readingTime: '1 min',
      tags: ['Module 2'],
    },
  ],
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Module 3',
    subtitle: 'Third module of study notes.',
    questions: [],
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Module 4',
    subtitle: 'Fourth module of study notes.',
    questions: [],
  },
  {
    id: 'module-5',
    number: 5,
    title: 'Module 5',
    subtitle: 'Fifth module of study notes.',
    questions: [],
  },
];

export function getNotesModule(id: string): NoteModule | undefined {
  return pcNotesModules.find((m) => m.id === id);
}
