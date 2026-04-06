'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { submitInquiry } from '@/lib/appwrite';

import type { Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
};

const services = [
  {
    icon: '🎬',
    title: 'Video Production',
    desc: 'Brand films, product spotlights, testimonials — video your customers actually watch to the end.',
  },
  {
    icon: '📱',
    title: 'Social Media',
    desc: 'Content calendars, short-form video, and community management that keep your feed alive.',
  },
  {
    icon: '✍️',
    title: 'Copywriting & Brand Voice',
    desc: 'Web copy, email campaigns, and messaging that sounds like you — only better.',
  },
  {
    icon: '🎨',
    title: 'Brand Identity & Design',
    desc: 'Logos, style guides, and visual systems that make your brand instantly recognizable.',
  },
];

const whys = [
  {
    icon: '🌱',
    title: 'We get small brands.',
    desc: 'No bloated retainers. No templated decks. Just focused work built around what you actually need.',
  },
  {
    icon: '💬',
    title: 'Honest conversations.',
    desc: 'We take your brand seriously. Ourselves? Not so much. Expect candid feedback and zero jargon.',
  },
  {
    icon: '🤝',
    title: 'Partners, not vendors.',
    desc: 'You get a creative team that shows up invested — because your growth is how we measure ours.',
  },
];

const steps = [
  { number: '01', title: 'Discover', desc: 'We dig into your goals, audience, and what makes you different.' },
  { number: '02', title: 'Create', desc: 'Strategy meets craft. We make things that feel right and perform.' },
  { number: '03', title: 'Launch', desc: 'Ship it, measure it, refine it. We stay in the game with you.' },
];

export default function Home() {
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await submitInquiry(form.name, form.company, form.email, form.message);
      setSent(true);
      setForm({ name: '', company: '', email: '', message: '' });
    } catch {
      setError('Something went wrong. Please email us directly at hello@skyreal.org');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-6 pt-32 pb-28 text-center">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/3 h-80 w-80 rounded-full opacity-30 blur-3xl" style={{ backgroundColor: '#B8A044' }} />
          <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: '#5C7A4F' }} />
        </div>

        <motion.div
          className="relative mx-auto max-w-4xl"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium"
            style={{ backgroundColor: '#E8F0E4', color: 'var(--primary)' }}
          >
            Full-stack creative media — made with heart
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mb-6 text-5xl font-black leading-tight tracking-tight md:text-7xl"
            style={{ color: 'var(--text)' }}
          >
            Content that{' '}
            <span className="gold-text">actually works.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mb-10 max-w-xl text-xl leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            Full-stack media for brands that want to be remembered — video, social, copy, and brand identity, all under one roof.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full px-8 py-4 text-lg font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)', color: '#fff' }}
            >
              See Our Work
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border px-8 py-4 text-lg font-semibold transition-all hover:opacity-70"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              Let&apos;s Talk →
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-14 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-4xl font-bold" style={{ color: 'var(--text)' }}>What we do</h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>End-to-end creative production, so you can focus on building.</p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="sage-card gold-border-top flex flex-col gap-4 p-6 transition-shadow hover:shadow-lg"
              >
                <span className="text-4xl">{s.icon}</span>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY SKYREAL ── */}
      <section className="px-6 py-24" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-14 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-4xl font-bold" style={{ color: 'var(--text)' }}>Why Skyreal?</h2>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {whys.map((w) => (
              <motion.div key={w.title} variants={fadeUp} className="text-center">
                <div className="mb-4 text-5xl">{w.icon}</div>
                <h3 className="mb-2 text-xl font-bold" style={{ color: 'var(--text)' }}>{w.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>{w.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-14 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-4xl font-bold" style={{ color: 'var(--text)' }}>How we work</h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Simple by design — because your time is valuable.</p>
          </motion.div>

          <motion.div
            className="relative grid gap-10 md:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Connecting line (desktop) */}
            <div
              className="absolute top-8 left-[16.5%] right-[16.5%] hidden h-0.5 md:block"
              style={{ backgroundColor: 'var(--accent)', opacity: 0.35 }}
            />

            {steps.map((step) => (
              <motion.div key={step.number} variants={fadeUp} className="relative text-center">
                <div
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-lg font-black text-white shadow-md"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  {step.number}
                </div>
                <h3 className="mb-2 text-xl font-bold" style={{ color: 'var(--text)' }}>{step.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FOUNDER CARD ── */}
      <section id="about" className="px-6 py-24" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="mx-auto max-w-3xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="sage-card overflow-hidden rounded-2xl p-8 md:flex md:gap-10 md:items-center"
            style={{ borderColor: '#C5D4BF' }}
          >
            {/* Avatar placeholder */}
            <div
              className="mx-auto mb-6 flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full text-4xl md:mx-0 md:mb-0"
              style={{ backgroundColor: '#D8E8D2' }}
            >
              🌿
            </div>

            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Founder
              </p>
              <h3 className="mb-3 text-2xl font-bold" style={{ color: 'var(--text)' }}>Yuwei Chen</h3>
              <p className="mb-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Media builder, storyteller, and firm believer that every brand has a story worth telling well.
                Yuwei started Skyreal to bring warm, thoughtful creative work to companies that deserve better than generic.
              </p>
              <a
                href="https://yuweichen1008.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: 'var(--primary)' }}
              >
                Visit personal site →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="mb-10 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-4xl font-bold" style={{ color: 'var(--text)' }}>Let&apos;s work together</h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Tell us what you&apos;re building. We&apos;ll tell you how we can help.
            </p>
          </motion.div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-12 text-center"
              style={{ backgroundColor: '#E8F0E4' }}
            >
              <div className="mb-4 text-5xl">🌿</div>
              <h3 className="mb-2 text-2xl font-bold" style={{ color: 'var(--primary)' }}>Message received!</h3>
              <p style={{ color: 'var(--text-muted)' }}>We&apos;ll be in touch within 1–2 business days. Can&apos;t wait to hear more.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="sage-card rounded-2xl p-8 flex flex-col gap-5"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" style={{ color: 'var(--text)' }}>Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Smith"
                    className="rounded-lg border px-4 py-3 text-sm outline-none transition-all focus:ring-2"
                    style={{
                      borderColor: '#D8E0D4',
                      color: 'var(--text)',
                      backgroundColor: 'var(--bg)',
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" style={{ color: 'var(--text)' }}>Company</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    className="rounded-lg border px-4 py-3 text-sm outline-none transition-all focus:ring-2"
                    style={{
                      borderColor: '#D8E0D4',
                      color: 'var(--text)',
                      backgroundColor: 'var(--bg)',
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text)' }}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="jane@acme.com"
                  className="rounded-lg border px-4 py-3 text-sm outline-none transition-all focus:ring-2"
                  style={{
                    borderColor: '#D8E0D4',
                    color: 'var(--text)',
                    backgroundColor: 'var(--bg)',
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: 'var(--text)' }}>What are you working on?</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="rounded-lg border px-4 py-3 text-sm outline-none transition-all focus:ring-2 resize-none"
                  style={{
                    borderColor: '#D8E0D4',
                    color: 'var(--text)',
                    backgroundColor: 'var(--bg)',
                  }}
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full py-4 text-base font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-10 border-t" style={{ borderColor: '#D8E0D4' }}>
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <span className="text-xl font-bold tracking-widest" style={{ color: 'var(--text)' }}>SKYREAL</span>
          <a
            href="mailto:hello@skyreal.org"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
          >
            hello@skyreal.org
          </a>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Skyreal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
