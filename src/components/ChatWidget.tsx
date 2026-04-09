'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitQuestion, getAnsweredQuestions, type QAItem } from '@/lib/appwrite';

const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const QA_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_QA_COLLECTION_ID;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [qas, setQas] = useState<QAItem[]>([]);
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Load existing answered Q&As
  useEffect(() => {
    getAnsweredQuestions().then((items) => setQas(items)).catch(() => {});
  }, []);

  // Appwrite Realtime subscription
  useEffect(() => {
    if (!ENDPOINT || !PROJECT_ID || !DATABASE_ID || !QA_COLLECTION_ID) return;

    let unsubscribe: (() => void) | null = null;

    (async () => {
      try {
        const { Client } = await import('appwrite');
        const client = new Client().setEndpoint(ENDPOINT!).setProject(PROJECT_ID!);
        const channel = `databases.${DATABASE_ID}.collections.${QA_COLLECTION_ID}.documents`;
        unsubscribe = client.subscribe(channel, (response) => {
          const events = response.events as string[];
          const isCreate = events.some((e) => e.includes('.create') || e.includes('.update'));
          if (!isCreate) return;
          const doc = response.payload as QAItem & { isAnswered?: boolean };
          if (doc.isAnswered) {
            setQas((prev) => {
              const exists = prev.find((q) => q.$id === doc.$id);
              if (exists) return prev.map((q) => (q.$id === doc.$id ? doc : q));
              return [doc, ...prev];
            });
          }
        });
      } catch {
        // Realtime unavailable — graceful degradation
      }
    })();

    return () => { unsubscribe?.(); };
  }, []);

  // Auto-scroll list on new items
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [qas, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !question.trim()) return;
    setSubmitting(true);
    try {
      await submitQuestion(name.trim(), question.trim());
      setSubmitted(true);
      setQuestion('');
    } catch {
      // silent — user can retry
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Q&A chat"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #B8A044, #D4C06A)', boxShadow: '0 8px 32px rgba(184,160,68,0.45)' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="#1E2318" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="#1E2318" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 flex w-[340px] flex-col overflow-hidden rounded-2xl shadow-2xl sm:w-[380px]"
            style={{ backgroundColor: '#1A1F16', border: '1px solid rgba(244,246,240,0.08)', maxHeight: '70vh' }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: '1px solid rgba(244,246,240,0.07)' }}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-base"
                style={{ backgroundColor: 'rgba(184,160,68,0.15)', border: '1px solid rgba(184,160,68,0.25)' }}
              >
                💬
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: '#F4F6F0' }}>Ask Skyreal</p>
                <p className="text-xs" style={{ color: 'rgba(244,246,240,0.4)' }}>Questions answered live by the team</p>
              </div>
            </div>

            {/* Q&A list */}
            <div
              ref={listRef}
              className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4"
              style={{ minHeight: 0 }}
            >
              {qas.length === 0 ? (
                <p className="py-6 text-center text-sm" style={{ color: 'rgba(244,246,240,0.35)' }}>
                  No questions answered yet. Be the first!
                </p>
              ) : (
                qas.map((qa) => (
                  <div key={qa.$id} className="flex flex-col gap-2">
                    {/* Question bubble */}
                    <div className="self-end">
                      <div
                        className="max-w-[260px] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm"
                        style={{ backgroundColor: 'rgba(244,246,240,0.08)', color: '#F4F6F0' }}
                      >
                        <p className="mb-0.5 text-xs font-semibold" style={{ color: 'rgba(244,246,240,0.5)' }}>
                          {qa.name}
                        </p>
                        {qa.question}
                      </div>
                    </div>
                    {/* Answer bubble */}
                    <div className="self-start">
                      <div
                        className="max-w-[260px] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm"
                        style={{ backgroundColor: 'rgba(184,160,68,0.12)', border: '1px solid rgba(184,160,68,0.18)', color: '#F4F6F0' }}
                      >
                        <p className="mb-0.5 text-xs font-semibold" style={{ color: 'var(--accent-light)' } as React.CSSProperties}>
                          Skyreal
                        </p>
                        {qa.answer}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Submit form */}
            <div style={{ borderTop: '1px solid rgba(244,246,240,0.07)' }} className="px-5 py-4">
              {submitted ? (
                <p className="text-center text-sm" style={{ color: 'rgba(244,246,240,0.55)' }}>
                  Your question was received — we&apos;ll answer it live. ✦
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="rounded-lg px-3 py-2 text-sm outline-none"
                    style={{
                      backgroundColor: 'rgba(244,246,240,0.06)',
                      border: '1px solid rgba(244,246,240,0.1)',
                      color: '#F4F6F0',
                    }}
                  />
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    required
                    rows={3}
                    className="resize-none rounded-lg px-3 py-2 text-sm outline-none"
                    style={{
                      backgroundColor: 'rgba(244,246,240,0.06)',
                      border: '1px solid rgba(244,246,240,0.1)',
                      color: '#F4F6F0',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full py-2 text-sm font-semibold transition-opacity disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #B8A044, #D4C06A)', color: '#1E2318' }}
                  >
                    {submitting ? 'Sending...' : 'Submit question'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
