'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Services', type: 'scroll', target: 'services' },
  { label: 'Courses', type: 'route', href: '/courses' },
  { label: 'Sponsorship', type: 'route', href: '/sponsorship' },
  { label: 'About', type: 'scroll', target: 'about' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (link: typeof links[number]) => {
    setMenuOpen(false);
    if (link.type === 'scroll') {
      if (isHome) {
        document.getElementById(link.target!)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `/#${link.target}`;
      }
    }
  };

  const solid = scrolled || menuOpen || !isHome;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-widest hover:opacity-80 transition-opacity" style={{ color: 'var(--text)' }}>
          SKYREAL
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) =>
            link.type === 'route' ? (
              <Link
                key={link.label}
                href={link.href!}
                className={`text-sm font-medium transition-colors hover:opacity-100 ${
                  pathname === link.href ? 'opacity-100' : 'opacity-60'
                }`}
                style={{ color: 'var(--text)' }}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => handleLink(link)}
                className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--text)' }}
              >
                {link.label}
              </button>
            )
          )}

          <button
            onClick={() => {
              setMenuOpen(false);
              if (isHome) {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#contact';
              }
            }}
            className="text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:opacity-90 ml-2"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Work With Us
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text)' }} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: 'var(--text)' }} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text)' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-6 py-6 flex flex-col gap-4" style={{ borderColor: '#D8E0D4', backgroundColor: '#fff' }}>
          {links.map((link) =>
            link.type === 'route' ? (
              <Link
                key={link.label}
                href={link.href!}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium py-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => handleLink(link)}
                className="text-left text-base font-medium py-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </button>
            )
          )}
          <button
            onClick={() => {
              setMenuOpen(false);
              if (isHome) {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#contact';
              }
            }}
            className="mt-2 text-base font-semibold px-5 py-3 rounded-full text-center"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Work With Us
          </button>
        </div>
      )}
    </nav>
  );
}
