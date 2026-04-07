'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import { submitSponsorshipInquiry } from '@/lib/appwrite';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = { show: { transition: { staggerChildren: 0.1 } } };

const inputCls = 'rounded-xl border px-4 py-3 text-sm outline-none w-full transition-colors focus:border-[var(--accent)]';
const inputStyle = { borderColor: '#D8E0D4', color: 'var(--text)', backgroundColor: 'var(--bg)' };

const FORMAT_ICONS: Record<string, string> = { video: '🎬', social: '📱', series: '📖', email: '✉️' };
const WHY_ICONS: Record<string, string> = { targeted: '🎯', authentic: '🌿', creative: '🤝' };
const IDEAL_EMOJIS = ['🚀', '🏪', '🎓', '🎨', '🌿', '💼'];

export default function SponsorshipPage() {
  const t = useTranslations('sponsorship');
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
      setError(t('error'));
    } finally {
      setSubmitting(false);
    }
  };

  const formats = ['video', 'social', 'series', 'email'] as const;
  const whys = ['targeted', 'authentic', 'creative'] as const;
  const idealFor = t.raw('idealFor') as string[];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-64 w-[600px] rounded-full opacity-15 blur-3xl" style={{ backgroundColor: '#B8A044' }} />
        </div>
        <motion.div className="relative mx-auto max-w-2xl" variants={stagger} initial="hidden" animate="show">
          <motion.span variants={fadeUp} className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: '#FFF3D4', color: '#8A6B00' }}>
            {t('badge')}
          </motion.span>
          <motion.h1 variants={fadeUp} className="mb-5 text-5xl font-black leading-tight">
            {t('headline1')}<br />
            <span className="gold-text">{t('headline2')}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t('subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Integration formats */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div className="mb-12 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-4xl font-bold">{t('formatsTitle')}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{t('formatsSubtitle')}</p>
          </motion.div>
          <motion.div className="grid gap-5 sm:grid-cols-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {formats.map((key) => (
              <motion.div key={key} variants={fadeUp} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="sage-card flex gap-5 p-6 transition-shadow hover:shadow-md" style={{ borderLeft: '3px solid var(--accent)' }}>
                <span className="text-3xl flex-shrink-0">{FORMAT_ICONS[key]}</span>
                <div>
                  <h3 className="text-base font-bold mb-1">{t(`formats.${key}.title`)}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t(`formats.${key}.desc`)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why sponsor */}
      <section className="px-6 py-20" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="mx-auto max-w-4xl">
          <motion.div className="mb-12 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-4xl font-bold">{t('whyTitle')}</h2>
          </motion.div>
          <motion.div className="grid gap-8 md:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {whys.map((key) => (
              <motion.div key={key} variants={fadeUp} className="text-center">
                <div className="text-4xl mb-4">{WHY_ICONS[key]}</div>
                <h3 className="text-xl font-bold mb-2">{t(`whys.${key}.title`)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t(`whys.${key}.desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ideal for */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div className="mb-10 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-3xl font-bold">{t('idealTitle')}</h2>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center gap-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {idealFor.map((label, i) => (
              <motion.div key={label} variants={fadeUp} className="sage-card flex items-center gap-3 px-5 py-3 rounded-full">
                <span className="text-xl">{IDEAL_EMOJIS[i]}</span>
                <span className="text-sm font-medium">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-24" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="mx-auto max-w-2xl">
          <motion.div className="mb-10 text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="mb-3 text-4xl font-bold">{t('formTitle')}</h2>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>{t('formSubtitle')}</p>
          </motion.div>

          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl p-14 text-center" style={{ backgroundColor: '#FFF8E6' }}>
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--accent)' }}>{t('successTitle')}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{t('successBody')}</p>
            </motion.div>
          ) : (
            <motion.form onSubmit={handleSubmit} className="sage-card rounded-2xl p-8 flex flex-col gap-5" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold">{t('brandName')}</label>
                  <input name="brandName" value={form.brandName} onChange={handleChange} required placeholder={t('brandPlaceholder')} className={inputCls} style={inputStyle} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold">{t('contactEmail')}</label>
                  <input name="contactEmail" type="email" value={form.contactEmail} onChange={handleChange} required placeholder={t('emailPlaceholder')} className={inputCls} style={inputStyle} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">
                  {t('website')} <span className="font-normal opacity-60">{t('websiteOptional')}</span>
                </label>
                <input name="website" value={form.website} onChange={handleChange} placeholder={t('websitePlaceholder')} className={inputCls} style={inputStyle} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">{t('goal')}</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={t('goalPlaceholder')} className={`${inputCls} resize-none`} style={inputStyle} />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={submitting} className="w-full rounded-full py-4 text-base font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 shadow-lg" style={{ backgroundColor: 'var(--accent)', boxShadow: '0 8px 24px rgba(184,160,68,0.28)' }}>
                {submitting ? t('submitting') : t('submit')}
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
