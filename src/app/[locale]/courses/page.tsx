'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import { courses, type Course } from '@/lib/courses';
import { enrollCourse } from '@/lib/appwrite';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = { show: { transition: { staggerChildren: 0.1 } } };

const inputCls = 'rounded-xl border px-4 py-3 text-sm outline-none w-full transition-colors focus:border-[var(--accent)]';
const inputStyle = { borderColor: '#D8E0D4', color: 'var(--text)', backgroundColor: 'var(--bg)' };

const LEVEL_COLORS: Record<Course['level'], { bg: string; text: string }> = {
  Beginner:     { bg: '#E0EBD9', text: '#3A6B2E' },
  Intermediate: { bg: '#FFF3D4', text: '#8A6B00' },
  Advanced:     { bg: '#FBEAEA', text: '#8A2020' },
};

function EnrollModal({ course, onClose }: { course: Course; onClose: () => void }) {
  const t = useTranslations('courses');
  const [form, setForm] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const courseTitle = t(`catalogue.${course.catalogueKey}.title`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await enrollCourse(form.name, form.email, courseTitle);
      setSent(true);
    } catch {
      setError(t('modal.error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(42,48,34,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="sage-card w-full max-w-md rounded-2xl p-8"
      >
        {sent ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--primary)' }}>{t('modal.successTitle')}</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              {t('modal.successBody1')} <strong>{form.email}</strong>{' '}
              {t('modal.successBody2')} <strong>{courseTitle}</strong> {t('modal.successBody3')}
            </p>
            <button onClick={onClose} className="text-sm font-semibold opacity-60 hover:opacity-100" style={{ color: 'var(--text)' }}>
              {t('modal.close')}
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>{t('modal.label')}</p>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{courseTitle}</h3>
              </div>
              <button onClick={onClose} className="text-xl leading-none opacity-40 hover:opacity-80" style={{ color: 'var(--text)' }}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">{t('modal.yourName')}</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder={t('modal.namePlaceholder')} className={inputCls} style={inputStyle} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold">{t('modal.emailLabel')}</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder={t('modal.emailPlaceholder')} className={inputCls} style={inputStyle} />
              </div>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button type="submit" disabled={submitting} className="w-full rounded-full py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 mt-2" style={{ backgroundColor: 'var(--accent)' }}>
                {submitting ? t('modal.submitting') : t('modal.submit')}
              </button>
              <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>{t('modal.note')}</p>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

function CourseCard({ course, onEnroll }: { course: Course; onEnroll: (c: Course) => void }) {
  const t = useTranslations('courses');
  const lvl = LEVEL_COLORS[course.level];
  const topics = t.raw(`catalogue.${course.catalogueKey}.topics`) as string[];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="sage-card flex flex-col transition-shadow hover:shadow-md"
      style={{ borderTop: `3px solid ${course.color}` }}
    >
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="text-4xl">{course.emoji}</span>
          <span className="inline-block rounded-full px-3 py-0.5 text-xs font-semibold" style={{ backgroundColor: lvl.bg, color: lvl.text }}>
            {course.level}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-1">{t(`catalogue.${course.catalogueKey}.title`)}</h3>
        <p className="text-sm font-medium mb-3" style={{ color: course.color }}>{t(`catalogue.${course.catalogueKey}.tagline`)}</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t(`catalogue.${course.catalogueKey}.desc`)}</p>
      </div>
      <div className="px-6 pb-4 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span key={topic} className="rounded-full px-3 py-0.5 text-xs" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-muted)' }}>
            {topic}
          </span>
        ))}
      </div>
      <div className="mt-auto px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: '#E8EFE4' }}>
        <div className="flex gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>⏱ {course.duration}</span>
          <span>📖 {course.lessons} {t('lessons')}</span>
        </div>
        {course.available ? (
          <button onClick={() => onEnroll(course)} className="rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: course.color }}>
            {t('enroll')}
          </button>
        ) : (
          <span className="rounded-full px-4 py-2 text-xs font-semibold" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-muted)' }}>
            {t('comingSoon')}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function CoursesPage() {
  const t = useTranslations('courses');
  const [selected, setSelected] = useState<Course | null>(null);
  const available = courses.filter((c) => c.available);
  const coming = courses.filter((c) => !c.available);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-64 w-[600px] rounded-full opacity-15 blur-3xl" style={{ backgroundColor: '#5C7A4F' }} />
        </div>
        <motion.div className="relative mx-auto max-w-2xl" variants={stagger} initial="hidden" animate="show">
          <motion.span variants={fadeUp} className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: '#E0EBD9', color: 'var(--primary)' }}>
            {t('badge')}
          </motion.span>
          <motion.h1 variants={fadeUp} className="mb-5 text-5xl font-black leading-tight">
            {t('headline1')}<br />
            <span className="gold-text-animated font-display" style={{ fontStyle: 'italic' }}>{t('headline2')}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mb-6 text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t('subtitle')}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ backgroundColor: 'rgba(184,160,68,0.10)', border: '1px solid rgba(184,160,68,0.22)', color: 'var(--accent-dark)' }}
          >
            <span>✦</span>
            <span>Taught by {t('instructor')}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Available */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.h2 className="mb-8 text-2xl font-bold" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {t('availableTitle')}
          </motion.h2>
          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {available.map((c) => <CourseCard key={c.slug} course={c} onEnroll={setSelected} />)}
          </motion.div>
        </div>
      </section>

      {/* Coming soon */}
      {coming.length > 0 && (
        <section className="px-6 py-16" style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="mx-auto max-w-6xl">
            <motion.h2 className="mb-2 text-2xl font-bold" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {t('comingTitle')}
            </motion.h2>
            <motion.p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {t('comingSubtitle')}
            </motion.p>
            <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {coming.map((c) => <CourseCard key={c.slug} course={c} onEnroll={setSelected} />)}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <motion.div className="mx-auto max-w-xl" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-bold">{t('ctaTitle')}</motion.h2>
          <motion.p variants={fadeUp} className="mb-6 text-base" style={{ color: 'var(--text-muted)' }}>{t('ctaBody')}</motion.p>
          <motion.a variants={fadeUp} href="mailto:hello@skyreal.org?subject=Course idea" className="inline-block rounded-full px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: 'var(--primary)' }}>
            {t('ctaLink')}
          </motion.a>
        </motion.div>
      </section>

      <footer className="px-6 py-8 border-t text-center text-sm" style={{ borderColor: '#D8E0D4', color: 'var(--text-muted)' }}>
        &copy; {new Date().getFullYear()} Skyreal · <a href="mailto:hello@skyreal.org" className="hover:opacity-100 opacity-70">hello@skyreal.org</a>
      </footer>

      {selected && <EnrollModal course={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
