'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { submitInquiry } from '@/lib/appwrite';

// ── Animation helpers ────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  show: { transition: { staggerChildren: 0.11 } },
};

// ── Data ─────────────────────────────────────────────────────────
const services = [
  { icon: '🎬', title: 'Video Production', desc: 'Brand films, product demos, and testimonials your customers actually watch to the end.' },
  { icon: '📱', title: 'Social Media', desc: 'Content calendars, short-form video, and community management that keep your feed alive.' },
  { icon: '✍️', title: 'Copywriting & Voice', desc: 'Web copy, email campaigns, and messaging that sounds like you — only better.' },
  { icon: '🎨', title: 'Brand Identity', desc: 'Logos, style guides, and visual systems that make your brand instantly recognizable.' },
];

const whys = [
  { icon: '🌱', title: 'We get small brands.', desc: 'No bloated retainers, no templated decks. Just focused creative work built around what you actually need.' },
  { icon: '💬', title: 'Radically honest.', desc: 'We take your brand seriously. Ourselves? Not so much. Expect candid feedback and zero jargon.' },
  { icon: '🤝', title: 'Partners, not vendors.', desc: 'We show up invested — because your growth is how we measure ours.' },
];

const steps = [
  { number: '01', title: 'Discover', desc: 'We dig into your goals, audience, and what makes you different.' },
  { number: '02', title: 'Create', desc: 'Strategy meets craft. We make things that feel right and perform.' },
  { number: '03', title: 'Launch', desc: 'Ship, measure, refine. We stay in the game with you.' },
];

// ── Input shared style ───────────────────────────────────────────
const inputCls = 'rounded-xl border px-4 py-3 text-sm outline-none w-full transition-colors focus:border-[var(--accent)]';
const inputStyle = { borderColor: '#D8E0D4', color: 'var(--text)', backgroundColor: 'var(--bg)' };

export default function Home() {
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await submitInquiry(form.name, form.company, form.email, form.message);
      setSent(true);
      setForm({ name: '', company: '', email: '', message: '' });
    } catch {
      setError('Something went wrong. Email us directly at hello@skyreal.org');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-36 pb-32 text-center">
        {/* Soft background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full opacity-20 blur-3xl" style={{ backgroundColor: '#B8A044' }} />
          <div className="absolute top-1/2 right-0 h-64 w-64 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: '#5C7A4F' }} />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#B8A044' }} />
        </div>

        <motion.div className="relative mx-auto max-w-3xl" variants={stagger} initial="hidden" animate="show">
          <motion.span
            variants={fadeUp}
            className="mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ backgroundColor: '#E0EBD9', color: 'var(--primary)' }}
          >
            Creative Media Agency
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mb-6 text-5xl font-black leading-[1.08] tracking-tight md:text-[5.5rem]"
          >
            Content that{' '}
            <span className="gold-text">actually works.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mb-10 max-w-lg text-lg leading-relaxed md:text-xl"
            style={{ color: 'var(--text-muted)' }}
          >
            Full-stack media for brands that want to be remembered.
            Video, social, copy, and brand identity — all under one roof.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full px-8 py-4 text-base font-semibold transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: 'var(--primary)', color: '#fff', boxShadow: '0 8px 24px rgba(92,122,79,0.28)' }}
            >
              See Our Services
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border-2 px-8 py-4 text-base font-semibold transition-all hover:opacity-70"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              Let&apos;s Talk →
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────── */}
      <section id="services" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div className="mb-14 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-4xl font-bold">What we do</h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>End-to-end creative production, so you can focus on building.</p>
          </motion.div>

          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="sage-card gold-border-top flex flex-col gap-4 p-6 transition-shadow hover:shadow-md cursor-default"
              >
                <span className="text-3xl">{s.icon}</span>
                <h3 className="text-base font-bold">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY SKYREAL ─────────────────────────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="mx-auto max-w-5xl">
          <motion.div className="mb-14 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-4xl font-bold">Why Skyreal?</h2>
            <p style={{ color: 'var(--text-muted)' }}>We built the agency we always wished existed.</p>
          </motion.div>

          <motion.div className="grid gap-10 md:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {whys.map((w) => (
              <motion.div key={w.title} variants={fadeUp} className="flex flex-col gap-3">
                <span className="text-4xl">{w.icon}</span>
                <h3 className="text-xl font-bold">{w.title}</h3>
                <p className="leading-relaxed text-sm" style={{ color: 'var(--text-muted)' }}>{w.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW WE WORK ─────────────────────────────────────────── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div className="mb-14 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-4xl font-bold">How we work</h2>
            <p style={{ color: 'var(--text-muted)' }}>Simple by design — because your time is valuable.</p>
          </motion.div>

          <motion.div
            className="relative grid gap-10 md:grid-cols-3"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <div className="absolute top-8 left-[16.5%] right-[16.5%] hidden h-px md:block" style={{ backgroundColor: 'var(--accent)', opacity: 0.3 }} />
            {steps.map((step) => (
              <motion.div key={step.number} variants={fadeUp} className="relative text-center">
                <div
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-lg font-black text-white shadow-md"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  {step.number}
                </div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── COURSES + SPONSORSHIP TEASERS ───────────────────────── */}
      <section className="px-6 py-24" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="mx-auto max-w-5xl">
          <motion.div className="mb-12 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-4xl font-bold">More from Skyreal</h2>
            <p style={{ color: 'var(--text-muted)' }}>Learning and partnership opportunities.</p>
          </motion.div>

          <motion.div className="grid gap-6 md:grid-cols-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {/* Courses card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="sage-card flex flex-col gap-4 p-8 transition-shadow hover:shadow-md"
              style={{ borderTop: '3px solid var(--primary)' }}
            >
              <span className="text-4xl">📚</span>
              <div>
                <h3 className="mb-2 text-2xl font-bold">Online Courses</h3>
                <p className="leading-relaxed text-sm" style={{ color: 'var(--text-muted)' }}>
                  Learn content strategy, video production, and brand storytelling — taught by the Skyreal team.
                  Self-paced, practical, and made for busy builders.
                </p>
              </div>
              <Link
                href="/courses"
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: 'var(--primary)' }}
              >
                Browse courses →
              </Link>
            </motion.div>

            {/* Sponsorship card */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="sage-card flex flex-col gap-4 p-8 transition-shadow hover:shadow-md"
              style={{ borderTop: '3px solid var(--accent)' }}
            >
              <span className="text-4xl">🤝</span>
              <div>
                <h3 className="mb-2 text-2xl font-bold">Partner With Us</h3>
                <p className="leading-relaxed text-sm" style={{ color: 'var(--text-muted)' }}>
                  Get your brand woven into Skyreal content — video mentions, social integration, and co-branded
                  series that reach the right audience authentically.
                </p>
              </div>
              <Link
                href="/sponsorship"
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: 'var(--accent)' }}
              >
                View sponsorship options →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOUNDER CARD ────────────────────────────────────────── */}
      <section id="about" className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="sage-card overflow-hidden rounded-2xl"
          >
            <div className="h-2 w-full" style={{ backgroundColor: 'var(--primary)' }} />
            <div className="p-8 md:flex md:gap-10 md:items-center">
              <div
                className="mx-auto mb-6 flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full text-5xl md:mx-0 md:mb-0"
                style={{ backgroundColor: '#D8E8D2' }}
              >
                🌿
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Founder</p>
                <h3 className="mb-3 text-2xl font-bold">Yuwei Chen</h3>
                <p className="mb-5 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Media builder, storyteller, and firm believer that every brand has a story worth telling well.
                  Yuwei started Skyreal to bring warm, thoughtful creative work to companies that deserve better than generic.
                </p>
                <a
                  href="https://yuweichen1008.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: 'var(--primary)' }}
                >
                  Visit personal site →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────── */}
      <section id="contact" className="px-6 py-24" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="mx-auto max-w-2xl">
          <motion.div className="mb-10 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-4xl font-bold">Let&apos;s work together</h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Tell us what you&apos;re building. We&apos;ll tell you how we can help.
            </p>
          </motion.div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-14 text-center" style={{ backgroundColor: '#E0EBD9' }}
            >
              <div className="mb-4 text-5xl">🌿</div>
              <h3 className="mb-2 text-2xl font-bold" style={{ color: 'var(--primary)' }}>Message received!</h3>
              <p style={{ color: 'var(--text-muted)' }}>We&apos;ll be in touch within 1–2 business days.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="sage-card rounded-2xl p-8 flex flex-col gap-5"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Jane Smith" className={inputCls} style={inputStyle} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold">Company</label>
                  <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc." className={inputCls} style={inputStyle} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@acme.com" className={inputCls} style={inputStyle} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">What are you working on?</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className={`${inputCls} resize-none`} style={inputStyle}
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit" disabled={submitting}
                className="w-full rounded-full py-4 text-base font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 shadow-lg"
                style={{ backgroundColor: 'var(--accent)', boxShadow: '0 8px 24px rgba(184,160,68,0.28)' }}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="px-6 py-10 border-t" style={{ borderColor: '#D8E0D4' }}>
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <span className="text-lg font-black tracking-widest" style={{ color: 'var(--text)' }}>SKYREAL</span>
          <div className="flex gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
            <Link href="/courses" className="hover:opacity-100 opacity-70 transition-opacity">Courses</Link>
            <Link href="/sponsorship" className="hover:opacity-100 opacity-70 transition-opacity">Sponsorship</Link>
            <a href="mailto:hello@skyreal.org" className="hover:opacity-100 opacity-70 transition-opacity">hello@skyreal.org</a>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Skyreal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
