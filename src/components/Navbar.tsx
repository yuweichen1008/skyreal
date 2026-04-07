'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname, Link } from '@/lib/navigation';
import { routing } from '@/i18n/routing';

const LOCALE_LABELS: Record<string, { short: string; label: string }> = {
  en:    { short: 'EN', label: 'English' },
  'zh-TW': { short: '繁中', label: '繁體中文' },
  ja:    { short: '日本語', label: '日本語' },
};

export default function Navbar() {
  const t = useTranslations('nav');
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Detect current locale from document lang attribute (set by locale layout)
  const [currentLocale, setCurrentLocale] = useState('en');
  useEffect(() => {
    setCurrentLocale(document.documentElement.lang || 'en');
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const switchLocale = (locale: string) => {
    setLangOpen(false);
    setMenuOpen(false);
    router.replace(pathname, { locale });
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${id}`);
    }
  };

  const solid = scrolled || menuOpen || pathname !== '/';

  const navLinks = [
    { label: t('services'), type: 'scroll', target: 'services' },
    { label: t('courses'),  type: 'route',  href: '/courses' },
    { label: t('sponsorship'), type: 'route', href: '/sponsorship' },
    { label: t('about'),   type: 'scroll', target: 'about' },
  ] as const;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-widest hover:opacity-80 transition-opacity" style={{ color: 'var(--text)' }}>
          SKYREAL
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.type === 'route' ? (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-opacity ${pathname === link.href ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                style={{ color: 'var(--text)' }}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--text)' }}
              >
                {link.label}
              </button>
            )
          )}

          {/* Language switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-all hover:opacity-80"
              style={{ borderColor: '#D8E0D4', color: 'var(--text-muted)' }}
            >
              <span>🌐</span>
              <span>{LOCALE_LABELS[currentLocale]?.short ?? 'EN'}</span>
              <span className="text-xs opacity-50">{langOpen ? '▲' : '▼'}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 rounded-xl border bg-white shadow-lg overflow-hidden" style={{ borderColor: '#D8E0D4' }}>
                {routing.locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => switchLocale(locale)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[var(--bg-card)] flex items-center justify-between ${locale === currentLocale ? 'font-semibold' : ''}`}
                    style={{ color: 'var(--text)' }}
                  >
                    <span>{LOCALE_LABELS[locale].label}</span>
                    {locale === currentLocale && <span style={{ color: 'var(--accent)' }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            {t('cta')}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text)' }} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: 'var(--text)' }} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text)' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-6 py-5 flex flex-col gap-4 bg-white" style={{ borderColor: '#D8E0D4' }}>
          {navLinks.map((link) =>
            link.type === 'route' ? (
              <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="text-base font-medium py-1" style={{ color: 'var(--text-muted)' }}>
                {link.label}
              </Link>
            ) : (
              <button key={link.label} onClick={() => scrollTo(link.target)} className="text-left text-base font-medium py-1" style={{ color: 'var(--text-muted)' }}>
                {link.label}
              </button>
            )
          )}

          {/* Mobile language switcher */}
          <div className="pt-2 border-t" style={{ borderColor: '#E8EFE4' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3 opacity-50" style={{ color: 'var(--text)' }}>Language</p>
            <div className="flex gap-2 flex-wrap">
              {routing.locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => switchLocale(locale)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${locale === currentLocale ? 'border-transparent text-white' : 'border-[#D8E0D4]'}`}
                  style={locale === currentLocale ? { backgroundColor: 'var(--accent)', color: '#fff' } : { color: 'var(--text-muted)' }}
                >
                  {LOCALE_LABELS[locale].short}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => scrollTo('contact')} className="mt-2 text-base font-semibold px-5 py-3 rounded-full text-center" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
            {t('cta')}
          </button>
        </div>
      )}
    </nav>
  );
}
