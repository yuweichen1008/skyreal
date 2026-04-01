'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { submitQuestion, getAnsweredQuestions, QAItem } from '@/lib/appwrite';

export default function AskTataPage() {
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [answeredQAs, setAnsweredQAs] = useState<QAItem[]>([]);
  const [loadingQAs, setLoadingQAs] = useState(true);

  useEffect(() => {
    getAnsweredQuestions()
      .then(setAnsweredQAs)
      .catch(() => setAnsweredQAs([]))
      .finally(() => setLoadingQAs(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !question.trim()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await submitQuestion(name.trim(), question.trim());
      setSubmitStatus('success');
      setName('');
      setQuestion('');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <main className="px-6 py-16">
        <div className="max-w-3xl mx-auto">

          {/* Tata intro card */}
          <div className="glass-card rounded-2xl p-8 mb-12 text-center">
            <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-5xl mb-6">
              🌸
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              問問 <span className="gradient-text">塔塔</span>
            </h1>
            <p className="text-xl text-gray-300 mb-1">Ask Tata</p>
            <p className="text-gray-400 mt-4 leading-relaxed max-w-lg mx-auto">
              無論是感情困惑、還是對生活的迷茫，塔塔都會用她溫柔而犀利的方式，給你一個誠實的回答。
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Warm, sharp, and always honest — Tata answers your questions about love and life.
            </p>
            <div className="mt-4 inline-block px-4 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm font-semibold">
              溫柔而犀利 · Warm &amp; Keen
            </div>
          </div>

          {/* Submit question form */}
          <div className="glass-card rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">提交你的問題</h2>
            <p className="text-gray-400 mb-6 text-sm">Submit your question — Tata may answer it in a future episode or on this page.</p>

            {submitStatus === 'success' ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">💌</div>
                <p className="text-xl font-semibold text-white mb-2">問題已送出！</p>
                <p className="text-gray-400">Your question has been submitted. Tata will get back to you soon.</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-6 px-6 py-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
                >
                  再問一個問題 · Ask another question
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">你的名字 · Your name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="小美 / Alex..."
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">你的問題 · Your question</label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="塔塔，我想問關於感情的事... / Tata, I've been wondering about..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  />
                </div>
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm">送出失敗，請再試一次 · Submission failed, please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !question.trim()}
                  className="w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '送出中...' : '送出問題 · Submit Question'}
                </button>
              </form>
            )}
          </div>

          {/* Answered Q&As */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              塔塔的回答 <span className="gradient-text">· Tata Replies</span>
            </h2>
            <p className="text-gray-400 mb-8 text-sm">Questions Tata has answered from listeners</p>

            {loadingQAs ? (
              <div className="text-center py-12 text-gray-500">載入中 · Loading...</div>
            ) : answeredQAs.length === 0 ? (
              <div className="glass-card rounded-2xl p-10 text-center">
                <div className="text-4xl mb-4">✉️</div>
                <p className="text-gray-400 text-lg mb-1">還沒有回答</p>
                <p className="text-gray-500 text-sm">No answered questions yet — be the first to ask!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {answeredQAs.map((qa) => (
                  <div key={qa.$id} className="glass-card rounded-2xl p-8">
                    {/* Question */}
                    <div className="flex items-start gap-3 mb-6">
                      <div className="w-9 h-9 rounded-full bg-purple-500/30 flex items-center justify-center text-lg flex-shrink-0">
                        💬
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Question · {qa.name}</span>
                        <p className="text-white mt-1 leading-relaxed">{qa.question}</p>
                      </div>
                    </div>
                    {/* Tata's answer */}
                    <div className="flex items-start gap-3 pl-4 border-l-2 border-pink-500/40">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-lg flex-shrink-0">
                        🌸
                      </div>
                      <div>
                        <span className="text-xs text-pink-400 font-semibold uppercase tracking-wide">Tata says</span>
                        <p className="text-gray-300 mt-1 leading-relaxed">{qa.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2025 520赫茲共鳴 · SkyReal</p>
        </div>
      </footer>
    </div>
  );
}
