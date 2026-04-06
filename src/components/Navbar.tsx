'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-widest" style={{ color: 'var(--text)' }}>
          SKYREAL
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollTo('services')}
            className="text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
          >
            Services
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="text-sm font-medium transition-colors hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
          >
            About
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="text-sm font-medium px-5 py-2 rounded-full transition-all hover:opacity-90"
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
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            style={{ backgroundColor: 'var(--text)' }}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            style={{ backgroundColor: 'var(--text)' }}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            style={{ backgroundColor: 'var(--text)' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-white/95 backdrop-blur-md border-t px-6 py-6 flex flex-col gap-5"
          style={{ borderColor: '#D8E0D4' }}
        >
          <button
            onClick={() => scrollTo('services')}
            className="text-left text-base font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            Services
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="text-left text-base font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            About
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="text-base font-medium px-5 py-2.5 rounded-full w-full text-center"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Work With Us
          </button>
        </div>
      )}
    </nav>
  );
}
