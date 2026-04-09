'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import Navbar from '@/components/Navbar';
import { submitInquiry, subscribeEmail } from '@/lib/appwrite';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = { show: { transition: { staggerChildren: 0.12 } } };

export default function Home() {
  const t = useTranslations('home');
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const [podcastEmail, setPodcastEmail] = useState('');
  const [podcastSent, setPodcastSent] = useState(false);
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
      setError(t('contact.error'));
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    { icon: '🎬', key: 'video' as const, borderClass: 'green-border-top' },
    { icon: '📱', key: 'social' as const, borderClass: 'gold-border-top' },
    { icon: '✍️', key: 'copy' as const, borderClass: 'green-border-top' },
    { icon: '🎨', key: 'brand' as const, borderClass: 'gold-border-top' },
  ];
  const whyKeys = ['small', 'honest', 'partners'] as const;
  const whyIcons = ['🌱', '💬', '🤝'];
  const steps = [
    { number: '01', key: 'discover' as const },
    { number: '02', key: 'create' as const },
    { number: '03', key: 'launch' as const },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="grain-overlay relative overflow-hidden px-6 pt-36 pb-32 text-center">
        {/* Animated blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="blob-gold absolute -top-32 left-1/2 -translate-x-1/2"
            style={{ width: 720, height: 480 }}
          />
          <div
            className="blob-green absolute top-1/2 -right-24"
            style={{ width: 360, height: 360 }}
          />
          <div
            className="blob-gold absolute -bottom-16 -left-16"
            style={{ width: 280, height: 280, opacity: 0.6 }}
          />
        </div>

        <motion.div className="relative mx-auto max-w-3xl" variants={stagger} initial="hidden" animate="show">
          {/* Badge */}
          <motion.span
            variants={fadeUp}
            className="mb-8 inline-block rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.18em]"
            style={{ backgroundColor: 'rgba(184,160,68,0.12)', color: 'var(--accent)', border: '1px solid rgba(184,160,68,0.25)' }}
          >
            {t('hero.badge')}
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mb-7 text-5xl font-black leading-[1.06] tracking-tight md:text-[5.5rem]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {t('hero.headline1')}{' '}
            <span
              className="gold-text-animated font-display"
              style={{ fontStyle: 'italic' }}
            >
              {t('hero.headline2')}
            </span>
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mb-10 max-w-lg text-lg leading-relaxed md:text-xl"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('hero.body')}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              {t('hero.cta1')}
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline"
            >
              {t('hero.cta2')}
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex items-center justify-center gap-4 text-xs font-medium tracking-wide"
            style={{ color: 'var(--text-light)' }}
          >
            <span>50+ brands</span>
            <span style={{ color: 'var(--accent)', opacity: 0.5 }}>·</span>
            <span>3 languages</span>
            <span style={{ color: 'var(--accent)', opacity: 0.5 }}>·</span>
            <span>∞ stories</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION DIVIDER ── */}
      <div className="section-divider" />

      {/* ── SERVICES ── */}
      <section id="services" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-14 text-center"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>
              What We Do
            </p>
            <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">{t('services.title')}</h2>
            <p className="mx-auto max-w-md text-lg" style={{ color: 'var(--text-muted)' }}>{t('services.subtitle')}</p>
          </motion.div>

          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {services.map((s) => (
              <motion.div
                key={s.key}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className={`sage-card-hover ${s.borderClass} flex flex-col gap-5 p-7`}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{ backgroundColor: 'var(--bg)', boxShadow: 'var(--shadow-sm)' }}
                >
                  {s.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-base font-bold">{t(`services.${s.key}.title`)}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {t(`services.${s.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WHY SKYREAL — dark section ── */}
      <section className="section-dark relative overflow-hidden px-6 py-28">
        {/* Subtle blobs on dark */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="blob-gold absolute -top-24 right-1/4" style={{ width: 400, height: 400, opacity: 0.35 }} />
          <div className="blob-green absolute bottom-0 left-1/3" style={{ width: 300, height: 300, opacity: 0.25 }} />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            className="mb-16 text-center"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--accent-light)' }}>
              Our Philosophy
            </p>
            <h2
              className="mb-4 text-4xl font-black tracking-tight md:text-5xl"
              style={{ color: '#F4F6F0' }}
            >
              {t('why.title')}
            </h2>
            <p style={{ color: 'rgba(244,246,240,0.6)' }}>{t('why.subtitle')}</p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {whyKeys.map((key, i) => (
              <motion.div
                key={key}
                variants={fadeUp}
                className="flex flex-col gap-5 rounded-2xl p-7"
                style={{
                  backgroundColor: 'rgba(244,246,240,0.04)',
                  border: '1px solid rgba(244,246,240,0.08)',
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{ backgroundColor: 'rgba(184,160,68,0.15)', border: '1px solid rgba(184,160,68,0.2)' }}
                >
                  {whyIcons[i]}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold" style={{ color: '#F4F6F0' }}>
                    {t(`why.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(244,246,240,0.55)' }}>
                    {t(`why.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-16 text-center"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--primary)' }}>
              Our Process
            </p>
            <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">{t('howWeWork.title')}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{t('howWeWork.subtitle')}</p>
          </motion.div>

          <motion.div
            className="relative grid gap-10 md:grid-cols-3"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {/* Connector line */}
            <div
              className="absolute top-8 left-[16.5%] right-[16.5%] hidden h-px md:block"
              style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.35 }}
            />
            {steps.map((step) => (
              <motion.div key={step.number} variants={fadeUp} className="relative text-center">
                <div
                  className="stat-number mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-xl shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                    color: '#fff',
                    boxShadow: 'var(--shadow-gold)',
                  }}
                >
                  {step.number}
                </div>
                <h3 className="mb-2 text-xl font-bold">{t(`howWeWork.${step.key}.title`)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {t(`howWeWork.${step.key}.desc`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── COURSES + SPONSORSHIP TEASERS ── */}
      <section className="px-6 py-24" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-12 text-center"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <h2 className="mb-3 text-4xl font-black tracking-tight md:text-5xl">{t('more.title')}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{t('more.subtitle')}</p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {/* Courses teaser */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
              className="sage-card-hover green-border-top flex flex-col gap-5 p-8"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl text-3xl"
                style={{ backgroundColor: '#E0EBD9', boxShadow: 'var(--shadow-sm)' }}
              >
                📚
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-2xl font-bold">{t('more.courses.title')}</h3>
                <p className="leading-relaxed text-sm" style={{ color: 'var(--text-muted)' }}>
                  {t('more.courses.desc')}
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: 'var(--primary)' }}
              >
                {t('more.courses.cta')}
              </Link>
            </motion.div>

            {/* Sponsorship teaser */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
              className="sage-card-hover gold-border-top flex flex-col gap-5 p-8"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl text-3xl"
                style={{ backgroundColor: 'rgba(184,160,68,0.12)', boxShadow: 'var(--shadow-sm)' }}
              >
                🤝
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-2xl font-bold">{t('more.sponsorship.title')}</h3>
                <p className="leading-relaxed text-sm" style={{ color: 'var(--text-muted)' }}>
                  {t('more.sponsorship.desc')}
                </p>
              </div>
              <Link
                href="/sponsorship"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: 'var(--accent)' }}
              >
                {t('more.sponsorship.cta')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── PODCAST ── */}
      <section className="grain-overlay section-dark relative overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="blob-gold absolute -top-20 left-1/2 -translate-x-1/2" style={{ width: 560, height: 360, opacity: 0.3 }} />
          <div className="blob-green absolute bottom-0 right-0" style={{ width: 300, height: 300, opacity: 0.2 }} />
        </div>
        <div className="relative mx-auto max-w-2xl text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.span
              variants={fadeUp}
              className="mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ backgroundColor: 'rgba(184,160,68,0.15)', color: 'var(--accent-light)', border: '1px solid rgba(184,160,68,0.25)' }}
            >
              {t('podcast.badge')}
            </motion.span>
            <motion.div variants={fadeUp} className="mb-2 text-4xl">🎙️</motion.div>
            <motion.h2
              variants={fadeUp}
              className="gold-text-animated font-display mb-5 text-4xl font-black tracking-tight md:text-5xl"
              style={{ fontStyle: 'italic' }}
            >
              {t('podcast.title')}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mb-8 max-w-md text-lg leading-relaxed"
              style={{ color: 'rgba(244,246,240,0.6)' }}
            >
              {t('podcast.desc')}
            </motion.p>
            {podcastSent ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="font-semibold"
                style={{ color: 'var(--accent-light)' }}
              >
                {t('podcast.sent')}
              </motion.p>
            ) : (
              <motion.form
                variants={fadeUp}
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!podcastEmail) return;
                  try { await subscribeEmail(podcastEmail); } catch { /* silent */ }
                  setPodcastSent(true);
                }}
                className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <input
                  type="email"
                  required
                  value={podcastEmail}
                  onChange={(e) => setPodcastEmail(e.target.value)}
                  placeholder={t('podcast.emailPlaceholder')}
                  className="input-field max-w-xs"
                  style={{ backgroundColor: 'rgba(244,246,240,0.06)', border: '1.5px solid rgba(244,246,240,0.12)', color: '#F4F6F0' }}
                />
                <button type="submit" className="btn-outline whitespace-nowrap">
                  {t('podcast.cta')}
                </button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FOUNDER CARD ── */}
      <section id="about" className="px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="overflow-hidden rounded-2xl"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {/* Top accent bar */}
            <div
              className="h-1.5 w-full"
              style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent), var(--primary-light))' }}
            />

            <div className="p-8 md:flex md:gap-10 md:items-center md:p-10">
              {/* Avatar */}
              <div className="mx-auto mb-8 flex-shrink-0 md:mx-0 md:mb-0">
                <div
                  className="relative flex h-32 w-32 items-center justify-center rounded-full text-5xl"
                  style={{
                    background: 'linear-gradient(135deg, #D8E8D2, #E8F0E4)',
                    boxShadow: 'var(--shadow-green)',
                  }}
                >
                  🌿
                  {/* Pulse ring */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ animation: 'pulse-ring 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite' }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="text-center md:text-left">
                <p
                  className="mb-2 text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ color: 'var(--accent)' }}
                >
                  {t('founder.label')}
                </p>
                {/* Primary name — Chinese */}
                <h3
                  className="font-display mb-0.5 text-3xl"
                  style={{ fontStyle: 'italic', color: 'var(--text)' }}
                >
                  {t('founder.nameCn')}
                </h3>
                {/* Secondary name — English */}
                <p className="mb-5 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  {t('founder.name')}
                </p>
                <p className="mb-6 leading-relaxed text-sm" style={{ color: 'var(--text-muted)' }}>
                  {t('founder.bio')}
                </p>
                <a
                  href="https://yuweichen1008.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-gold inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: 'var(--primary)' }}
                >
                  {t('founder.link')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative overflow-hidden px-6 py-28" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="blob-gold absolute -bottom-24 right-1/4" style={{ width: 400, height: 300, opacity: 0.4 }} />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <motion.div
            className="mb-12 text-center"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>
              Get In Touch
            </p>
            <h2 className="mb-4 text-4xl font-black tracking-tight md:text-5xl">{t('contact.title')}</h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>{t('contact.subtitle')}</p>
          </motion.div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-16 text-center"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div className="mb-4 text-5xl">🌿</div>
              <h3 className="mb-2 text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                {t('contact.successTitle')}
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>{t('contact.successBody')}</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-2xl p-8"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-md)',
              }}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">{t('contact.name')}</label>
                  <input
                    name="name" value={form.name} onChange={handleChange} required
                    placeholder={t('contact.namePlaceholder')} className="input-field"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">{t('contact.company')}</label>
                  <input
                    name="company" value={form.company} onChange={handleChange}
                    placeholder={t('contact.companyPlaceholder')} className="input-field"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">{t('contact.email')}</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder={t('contact.emailPlaceholder')} className="input-field"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">{t('contact.message')}</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder={t('contact.messagePlaceholder')}
                  className="input-field resize-none"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit" disabled={submitting}
                className="btn-primary w-full disabled:opacity-50"
                style={{ backgroundColor: 'var(--accent)', boxShadow: 'var(--shadow-gold)' }}
              >
                {submitting ? t('contact.submitting') : t('contact.submit')}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      {/* ── FOOTER — dark ── */}
      <footer className="section-dark relative overflow-hidden px-6 py-14">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="blob-green absolute -bottom-12 left-0" style={{ width: 280, height: 200, opacity: 0.3 }} />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
            {/* Wordmark */}
            <div>
              <span
                className="font-display block text-2xl tracking-wider"
                style={{ color: '#F4F6F0', fontStyle: 'italic' }}
              >
                Skyreal
              </span>
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'rgba(244,246,240,0.4)' }}>
                Creative Media Agency
              </span>
            </div>

            {/* Nav links */}
            <div className="flex gap-6 text-sm" style={{ color: 'rgba(244,246,240,0.55)' }}>
              <Link href="/courses" className="hover:text-white transition-colors">{tNav('courses')}</Link>
              <Link href="/sponsorship" className="hover:text-white transition-colors">{tNav('sponsorship')}</Link>
              <a href="mailto:hello@skyreal.org" className="hover:text-white transition-colors">
                {tFooter('email')}
              </a>
            </div>
          </div>

          {/* Bottom rule */}
          <div className="mb-6 h-px" style={{ background: 'rgba(244,246,240,0.08)' }} />

          <p className="text-center text-xs" style={{ color: 'rgba(244,246,240,0.3)' }}>
            &copy; {new Date().getFullYear()} Skyreal. {tFooter('rights')}
          </p>
        </div>
      </footer>
    </div>
  );
}
