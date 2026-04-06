'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { submitSponsorshipInquiry } from '@/lib/appwrite';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = { show: { transition: { staggerChildren: 0.1 } } };

const inputCls = 'rounded-xl border px-4 py-3 text-sm outline-none w-full transition-colors focus:border-[var(--accent)]';
const inputStyle = { borderColor: '#D8E0D4', color: 'var(--text)', backgroundColor: 'var(--bg)' };

const integrations = [
  {
    icon: '🎬',
    title: 'Video Mentions',
    desc: 'Your brand naturally woven into our video content — product demos, tutorials, or branded segments. Authentic, never pushy.',
  },
  {
    icon: '📱',
    title: 'Social Integration',
    desc: 'Dedicated or co-branded posts across our social channels. Designed to feel native, not like an ad.',
  },
  {
    icon: '📖',
    title: 'Content Series',
    desc: 'Sponsor an entire content series — multi-episode video or social campaigns where your brand leads the narrative.',
  },
  {
    icon: '✉️',
    title: 'Email Features',
    desc: 'Reach our subscriber list with a dedicated mention or sponsored section in our newsletters.',
  },
];

const idealFor = [
  { emoji: '🚀', label: 'Startups & scale-ups' },
  { emoji: '🏪', label: 'B2B software & tools' },
  { emoji: '🎓', label: 'EdTech platforms' },
  { emoji: '🎨', label: 'Creative tools & services' },
  { emoji: '🌿', label: 'Sustainable brands' },
  { emoji: '💼', label: 'Professional services' },
];

export default function SponsorshipPage() {
  const [form, setForm] = useState({ brandName: '', contactEmail: '', website: '', message: '' });
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
      await submitSponsorshipInquiry(form.brandName, form.contactEmail, form.website, form.message);
      setSent(true);
      setForm({ brandName: '', contactEmail: '', website: '', message: '' });
    } catch {
      setError('Something went wrong. Email us directly at hello@skyreal.org');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-64 w-[600px] rounded-full opacity-15 blur-3xl" style={{ backgroundColor: '#B8A044' }} />
        </div>
        <motion.div className="relative mx-auto max-w-2xl" variants={stagger} initial="hidden" animate="show">
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ backgroundColor: '#FFF3D4', color: '#8A6B00' }}
          >
            Brand Partnerships
          </motion.span>
          <motion.h1 variants={fadeUp} className="mb-5 text-5xl font-black leading-tight">
            Get your brand in front of<br />
            <span className="gold-text">the right audience.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            We create content that people actually want to watch and share.
            Partner with Skyreal and your brand becomes part of that story — naturally, authentically, memorably.
          </motion.p>
        </motion.div>
      </section>

      {/* ── What we offer ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div className="mb-12 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-4xl font-bold">Integration formats</h2>
            <p style={{ color: 'var(--text-muted)' }}>We meet your brand where the audience already is.</p>
          </motion.div>

          <motion.div
            className="grid gap-5 sm:grid-cols-2"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {integrations.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="sage-card flex gap-5 p-6 transition-shadow hover:shadow-md"
                style={{ borderLeft: '3px solid var(--accent)' }}
              >
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-base font-bold mb-1">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── What makes it different ── */}
      <section className="px-6 py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="mx-auto max-w-4xl">
          <motion.div className="mb-12 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-4xl font-bold">Why sponsor Skyreal?</h2>
          </motion.div>
          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {[
              { icon: '🎯', title: 'Targeted reach', desc: 'Our audience is builders, founders, and brand-curious professionals — not casual scrollers.' },
              { icon: '🌿', title: 'Authentic fit', desc: 'We only partner with brands we\'d actually use and recommend. No random placements.' },
              { icon: '🤝', title: 'Creative collaboration', desc: 'You get input on how your brand is presented. No cookie-cutter scripts.' },
            ].map((w) => (
              <motion.div key={w.title} variants={fadeUp} className="text-center">
                <div className="text-4xl mb-4">{w.icon}</div>
                <h3 className="text-xl font-bold mb-2">{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{w.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Ideal sponsors ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div className="mb-10 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-3xl font-bold">Ideal for</h2>
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {idealFor.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="sage-card flex items-center gap-3 px-5 py-3 rounded-full"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Inquiry form ── */}
      <section className="px-6 py-24" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="mx-auto max-w-2xl">
          <motion.div className="mb-10 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-4xl font-bold">Start the conversation</h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Tell us about your brand and what you&apos;re looking to achieve.
              We&apos;ll come back with ideas.
            </p>
          </motion.div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-14 text-center" style={{ backgroundColor: '#FFF8E6' }}
            >
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--accent)' }}>Great to meet you!</h3>
              <p style={{ color: 'var(--text-muted)' }}>We&apos;ll review your inquiry and reach out within 2 business days.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="sage-card rounded-2xl p-8 flex flex-col gap-5"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold">Brand / Company name</label>
                  <input name="brandName" value={form.brandName} onChange={handleChange} required placeholder="Acme Co." className={inputCls} style={inputStyle} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold">Contact email</label>
                  <input name="contactEmail" type="email" value={form.contactEmail} onChange={handleChange} required placeholder="you@brand.com" className={inputCls} style={inputStyle} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">Website <span className="font-normal opacity-60">(optional)</span></label>
                <input name="website" value={form.website} onChange={handleChange} placeholder="https://yourbrand.com" className={inputCls} style={inputStyle} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">What would you like to achieve?</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Tell us about your audience, goals, and the kind of partnership you have in mind..."
                  className={`${inputCls} resize-none`} style={inputStyle}
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit" disabled={submitting}
                className="w-full rounded-full py-4 text-base font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 shadow-lg"
                style={{ backgroundColor: 'var(--accent)', boxShadow: '0 8px 24px rgba(184,160,68,0.28)' }}
              >
                {submitting ? 'Sending...' : 'Send Partnership Inquiry'}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <footer className="px-6 py-8 border-t text-center text-sm" style={{ borderColor: '#D8E0D4', color: 'var(--text-muted)' }}>
        &copy; {new Date().getFullYear()} Skyreal · <a href="mailto:hello@skyreal.org" className="hover:opacity-100 opacity-70">hello@skyreal.org</a>
      </footer>
    </div>
  );
}
