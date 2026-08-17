import { useEffect, useState } from 'react';
import { getHighlighter, Highlighter } from 'shiki';
import { Check, Clipboard } from 'lucide-react';
import { cn } from '@/utils/cn';

interface CodeViewerProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

// Cache one highlighter (both themes + the bundled languages we use) across
// all mounts. Shiki 1.x only bundles a fixed set of languages, so we map
// `arduino` onto `cpp` (Arduino is C++) and never request a non-bundled lang.
let cachedHighlighter: Promise<Highlighter> | null = null;
function getSharedHighlighter(): Promise<Highlighter> {
  if (!cachedHighlighter) {
    cachedHighlighter = getHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['c', 'cpp'],
    }).catch((err) => {
      // Never let a broken promise stay cached — reset so a later mount retries.
      cachedHighlighter = null;
      throw err;
    });
  }
  return cachedHighlighter;
}

const LANG_MAP: Record<string, string> = {
  c: 'c',
  cpp: 'cpp',
  'c++': 'cpp',
  arduino: 'cpp',
  h: 'c',
  hpp: 'cpp',
};

export function CodeViewer({
  code,
  language,
  showLineNumbers = true,
  maxHeight = '500px',
}: CodeViewerProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    const lang = LANG_MAP[language] ?? 'c';
    getSharedHighlighter()
      .then((hl) => {
        if (!active) return;
        setHighlightedHtml(
          hl.codeToHtml(code, {
            lang,
            themes: { light: 'github-light', dark: 'github-dark' },
          }),
        );
      })
      .catch(() => {
        // On any Shiki failure, fall back to a plain read-only display rather
        // than staying stuck on "Loading…".
        if (active) setHighlightedHtml(null);
      });
    return () => {
      active = false;
    };
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be unavailable
    }
  };

  const lines = code.split('\n');

  return (
    <div className="code-viewer">
      <div className="flex items-center justify-between p-4 bg-surface-900/50 dark:bg-surface-900/50 light:bg-slate-100/50 border-b border-surface-800 dark:border-surface-800 light:border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-surface-400 dark:text-surface-400 light:text-slate-600 uppercase tracking-wider">
            {language.toUpperCase()}
          </span>
          {showLineNumbers && (
            <span className="text-xs text-surface-500 dark:text-surface-500 light:text-slate-500 px-2 py-0.5 rounded bg-surface-800 dark:bg-surface-800 light:bg-slate-200">
              {lines.length} lines
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => void handleCopy()}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
            copied
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-surface-800/50 text-surface-300 hover:bg-surface-800 hover:text-surface-100 border border-surface-700 dark:bg-surface-800/50 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-surface-100 dark:border-surface-700 light:bg-slate-200 light:text-slate-700 light:hover:bg-slate-300 light:border-slate-300',
          )}
          aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied ✓</span>
            </>
          ) : (
            <>
              <Clipboard className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
      <div className="code-scroll" style={{ maxHeight }}>
        {highlightedHtml ? (
          <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        ) : (
          <pre className="m-0 p-6 overflow-x-auto font-mono text-sm leading-relaxed text-surface-200 dark:text-surface-200 light:text-slate-800">
            {code}
          </pre>
        )}
      </div>
    </div>
  );
}
