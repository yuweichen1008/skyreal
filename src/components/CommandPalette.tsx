'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/lib/navigation';

// ── Types ────────────────────────────────────────────────────────
type CommandAction =
  | { type: 'navigate'; href: string }
  | { type: 'scroll'; section: string; href: string }
  | { type: 'locale'; locale: string };

interface Command {
  id: string;
  icon: string;
  labelKey: string;
  group: 'navigation' | 'language';
  action: CommandAction;
  keywords: string[];
}

// ── Static command definitions ───────────────────────────────────
const COMMANDS: Command[] = [
  { id: 'home',        icon: '🏠', labelKey: 'home',        group: 'navigation', action: { type: 'navigate', href: '/' },            keywords: ['home', '首頁', 'ホーム', 'start'] },
  { id: 'services',   icon: '🎬', labelKey: 'services',    group: 'navigation', action: { type: 'scroll', section: 'services', href: '/' },  keywords: ['services', '服務', 'サービス', 'work', 'video', 'social'] },
  { id: 'courses',    icon: '📚', labelKey: 'courses',     group: 'navigation', action: { type: 'navigate', href: '/courses' },       keywords: ['courses', '課程', 'コース', 'learn', 'education'] },
  { id: 'sponsorship',icon: '🤝', labelKey: 'sponsorship', group: 'navigation', action: { type: 'navigate', href: '/sponsorship' },   keywords: ['sponsor', 'partner', '合作', 'パートナー', 'brand'] },
  { id: 'about',      icon: '👤', labelKey: 'about',       group: 'navigation', action: { type: 'scroll', section: 'about', href: '/' },     keywords: ['about', 'founder', '創辦人', 'ファウンダー', 'team'] },
  { id: 'contact',    icon: '💬', labelKey: 'contact',     group: 'navigation', action: { type: 'scroll', section: 'contact', href: '/' },   keywords: ['contact', 'touch', '聯繫', 'お問い合わせ', 'email', 'hire'] },
  { id: 'lang-en',    icon: '🌐', labelKey: 'switchEn',    group: 'language',   action: { type: 'locale', locale: 'en' },             keywords: ['english', 'en', 'language'] },
  { id: 'lang-zh',    icon: '🌐', labelKey: 'switchZhTW',  group: 'language',   action: { type: 'locale', locale: 'zh-TW' },          keywords: ['chinese', '中文', '繁體', 'zh', 'traditional'] },
  { id: 'lang-ja',    icon: '🌐', labelKey: 'switchJa',    group: 'language',   action: { type: 'locale', locale: 'ja' },             keywords: ['japanese', '日本語', 'japan', 'ja'] },
];

// ── Floating trigger ─────────────────────────────────────────────
function Trigger({ onClick }: { onClick: () => void }) {
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-xl"
      style={{
        backgroundColor: 'var(--primary)',
        boxShadow: '0 8px 32px rgba(92,122,79,0.35)',
      }}
      aria-label="Open command palette"
    >
      <span className="text-base">⌘</span>
      <span>{isMac ? '⌘K' : 'Ctrl+K'}</span>
    </motion.button>
  );
}

// ── Main component ───────────────────────────────────────────────
export default function CommandPalette() {
  const t = useTranslations('palette');
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Current locale from html lang
  const [currentLocale, setCurrentLocale] = useState('en');
  useEffect(() => {
    setCurrentLocale(document.documentElement.lang || 'en');
  }, []);

  // Build translated command labels
  const commands = COMMANDS.map((cmd) => ({
    ...cmd,
    label: t(`commands.${cmd.labelKey}`),
  }));

  // Filter by query
  const filtered = query.trim()
    ? commands.filter((cmd) => {
        const q = query.toLowerCase();
        return (
          cmd.label.toLowerCase().includes(q) ||
          cmd.keywords.some((kw) => kw.toLowerCase().includes(q))
        );
      })
    : commands;

  // Group filtered results
  const navItems = filtered.filter((c) => c.group === 'navigation');
  const langItems = filtered.filter((c) => c.group === 'language');

  const executeCommand = useCallback(
    (cmd: (typeof commands)[number]) => {
      setOpen(false);
      setQuery('');
      setActiveIndex(0);

      const action = cmd.action;
      if (action.type === 'navigate') {
        router.push(action.href as '/');
      } else if (action.type === 'scroll') {
        if (pathname === '/') {
          setTimeout(() => {
            document.getElementById(action.section)?.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        } else {
          router.push(`${action.href}#${action.section}` as '/');
        }
      } else if (action.type === 'locale') {
        router.replace(pathname, { locale: action.locale });
      }
    },
    [router, pathname],
  );

  // Keyboard handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Toggle: ⌘K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;

      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
        setActiveIndex(0);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        executeCommand(filtered[activeIndex]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, activeIndex, executeCommand]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActiveIndex(0);
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  // Reset on query change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const GroupLabel = ({ label }: { label: string }) => (
    <li className="px-4 pt-4 pb-1 text-xs font-bold uppercase tracking-widest select-none" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
      {label}
    </li>
  );

  const CommandItem = ({ cmd, index }: { cmd: (typeof commands)[number]; index: number }) => {
    const isActive = activeIndex === index;
    const isCurrentLocale = cmd.action.type === 'locale' && cmd.action.locale === currentLocale;

    return (
      <li data-index={index}>
        <button
          onMouseEnter={() => setActiveIndex(index)}
          onClick={() => executeCommand(cmd)}
          className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors rounded-lg mx-1 my-0.5"
          style={{
            backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
            color: isCurrentLocale ? 'var(--accent)' : 'var(--text)',
            width: 'calc(100% - 8px)',
          }}
        >
          <span className="text-xl w-7 text-center flex-shrink-0">{cmd.icon}</span>
          <span className="flex-1 text-sm font-medium">{cmd.label}</span>
          {isCurrentLocale && (
            <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>✓</span>
          )}
          {isActive && (
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium border" style={{ borderColor: '#D8E0D4', color: 'var(--text-muted)' }}>
              ↵
            </kbd>
          )}
        </button>
      </li>
    );
  };

  // Build flat list with group headers for index tracking
  const renderItems = () => {
    const items: React.ReactNode[] = [];
    let globalIndex = 0;

    if (navItems.length > 0) {
      if (!query) items.push(<GroupLabel key="nav-label" label="Navigation" />);
      navItems.forEach((cmd) => {
        const idx = globalIndex++;
        items.push(<CommandItem key={cmd.id} cmd={cmd} index={idx} />);
      });
    }

    if (langItems.length > 0) {
      if (!query) items.push(<GroupLabel key="lang-label" label="Language" />);
      langItems.forEach((cmd) => {
        const idx = globalIndex++;
        items.push(<CommandItem key={cmd.id} cmd={cmd} index={idx} />);
      });
    }

    return items;
  };

  return (
    <>
      {/* Floating trigger */}
      {!open && <Trigger onClick={() => setOpen(true)} />}

      {/* Palette overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50"
              style={{ backgroundColor: 'rgba(42,48,34,0.45)', backdropFilter: 'blur(4px)' }}
              onClick={() => { setOpen(false); setQuery(''); }}
            />

            {/* Palette panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 z-50 w-full max-w-lg -translate-x-1/2 rounded-2xl shadow-2xl overflow-hidden"
              style={{
                top: 'clamp(80px, 15vh, 160px)',
                backgroundColor: 'var(--surface)',
                border: '1px solid #D8E0D4',
                boxShadow: '0 32px 80px rgba(42,48,34,0.18)',
              }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b" style={{ borderColor: '#E8EFE4' }}>
                <span className="text-xl opacity-50">🔍</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('placeholder')}
                  className="flex-1 bg-transparent text-base outline-none"
                  style={{ color: 'var(--text)' }}
                />
                <kbd
                  className="hidden sm:inline-flex items-center rounded px-1.5 py-0.5 text-xs border"
                  style={{ borderColor: '#D8E0D4', color: 'var(--text-muted)' }}
                >
                  esc
                </kbd>
              </div>

              {/* Results */}
              <ul
                ref={listRef}
                className="overflow-y-auto py-2"
                style={{ maxHeight: '360px' }}
              >
                {filtered.length === 0 ? (
                  <li className="px-6 py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                    {t('noResults')} &ldquo;<span style={{ color: 'var(--text)' }}>{query}</span>&rdquo;
                  </li>
                ) : (
                  renderItems()
                )}
              </ul>

              {/* Footer hint */}
              <div className="flex items-center gap-3 px-4 py-3 border-t text-xs" style={{ borderColor: '#E8EFE4', color: 'var(--text-muted)' }}>
                <span><kbd className="rounded border px-1 py-0.5" style={{ borderColor: '#D8E0D4' }}>↑</kbd> <kbd className="rounded border px-1 py-0.5" style={{ borderColor: '#D8E0D4' }}>↓</kbd> navigate</span>
                <span><kbd className="rounded border px-1 py-0.5" style={{ borderColor: '#D8E0D4' }}>↵</kbd> select</span>
                <span><kbd className="rounded border px-1 py-0.5" style={{ borderColor: '#D8E0D4' }}>esc</kbd> close</span>
                <span className="ml-auto opacity-60">SKYREAL</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
