'use client';

import { useState } from 'react';
import Link from 'next/link';
import { subscribeEmail } from '@/lib/appwrite';
import { episodes } from '@/lib/episodes';
import Navbar from '@/components/Navbar';

const SPOTIFY_URL = 'https://open.spotify.com/show/0JcB27aIGgVEvdvfrBPaLw?si=672eafe9be59472e';

const hosts = [
  {
    name: 'Tata',
    nameZh: '塔塔',
    role: '主持人',
    tagline: '溫柔而犀利',
    description: 'Warm, sharp, and always asks the question you were afraid to ask yourself.',
    emoji: '🌸',
    accent: 'from-pink-500 to-rose-500',
    isMain: true,
  },
  {
    name: 'Host 2',
    nameZh: '主持人 2',
    role: '共同主持',
    tagline: 'Coming soon',
    description: 'Personality description coming soon.',
    emoji: '✨',
    accent: 'from-purple-500 to-violet-500',
    isMain: false,
  },
  {
    name: 'Host 3',
    nameZh: '主持人 3',
    role: '共同主持',
    tagline: 'Coming soon',
    description: 'Personality description coming soon.',
    emoji: '💫',
    accent: 'from-blue-500 to-cyan-500',
    isMain: false,
  },
  {
    name: 'Host 4',
    nameZh: '主持人 4',
    role: '共同主持',
    tagline: 'Coming soon',
    description: 'Personality description coming soon.',
    emoji: '🎯',
    accent: 'from-orange-500 to-amber-500',
    isMain: false,
  },
];

// Simple soundwave bars visual
function SoundWave() {
  const heights = [3, 6, 10, 14, 10, 6, 3, 5, 9, 13, 9, 5, 3, 7, 12, 7, 3];
  return (
    <div className="flex items-center justify-center gap-1 h-16 opacity-60">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-full bg-gradient-to-t from-pink-500 to-purple-400"
          style={{ height: `${h * 4}px` }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      await subscribeEmail(email);
      setMessage('成功訂閱！感謝你加入我們 · Successfully subscribed!');
      setEmail('');
    } catch {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="px-6 pt-20 pb-24 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-gray-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            矽谷華人愛情播客 · Silicon Valley Romance Podcast
          </div>

          <h1 className="text-7xl md:text-9xl font-black text-white mb-3 tracking-tighter leading-none">
            520<span className="gradient-text">赫茲</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/70 font-light mb-3 tracking-wide">
            共鳴
          </p>

          <SoundWave />

          <p className="text-xl md:text-2xl text-gray-300 font-light mt-6 mb-3">
            Love, Life &amp; Silicon Valley
          </p>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            聊愛情、聊孤獨、聊那些在矽谷打拼卻找不到另一半的故事。<br />
            <span className="text-gray-500 text-sm">Honest conversations on love and dating for Chinese-speaking singles in the Bay Area.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold text-lg rounded-full transition-colors shadow-lg shadow-green-900/40"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              在 Spotify 收聽
            </a>
            <Link
              href="/episodes"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-card border border-white/20 text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-colors"
            >
              瀏覽所有集數 →
            </Link>
          </div>
        </div>
      </section>

      {/* Hosts — All-In style */}
      <section className="px-6 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-3">
              認識<span className="gradient-text">主持群</span>
            </h2>
            <p className="text-gray-400">The Hosts — 四個截然不同的靈魂</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {hosts.map((host) => (
              <div
                key={host.name}
                className={`glass-card rounded-2xl p-5 md:p-6 flex flex-col items-center text-center gap-3 ${host.isMain ? 'ring-2 ring-pink-500/40' : ''}`}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${host.accent} flex items-center justify-center text-2xl md:text-3xl shadow-lg`}>
                  {host.emoji}
                </div>
                <div>
                  <div className="text-lg md:text-xl font-bold text-white leading-tight">{host.nameZh}</div>
                  <div className="text-xs text-gray-500">{host.name}</div>
                </div>
                <div className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${host.accent} text-white whitespace-nowrap`}>
                  {host.tagline}
                </div>
                <p className="text-gray-400 text-xs leading-relaxed hidden md:block">{host.description}</p>
                {host.isMain && (
                  <Link
                    href="/ask-tata"
                    className="text-pink-400 hover:text-pink-300 text-xs font-semibold transition-colors"
                  >
                    問問塔塔 →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Episodes */}
      <section className="px-6 py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                最新<span className="gradient-text">集數</span>
              </h2>
              <p className="text-gray-400 text-sm">Latest Episodes</p>
            </div>
            <Link href="/episodes" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors text-sm">
              全部集數 →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {episodes.map((episode, i) => (
              <Link
                key={episode.id}
                href={`/episodes/${episode.id}`}
                className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-200 group"
              >
                <div className="h-40 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center relative">
                  <div className="text-center text-white">
                    <div className="text-3xl mb-1">🎙️</div>
                    <div className="text-xs font-medium opacity-80">{episode.duration}</div>
                  </div>
                  <div className="absolute top-3 left-3 bg-black/40 text-white text-xs font-bold px-2 py-1 rounded-md">
                    EP {episodes.length - i}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">{episode.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">{episode.description}</p>
                  <div className="flex gap-2">
                    {episode.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            關於 <span className="gradient-text">520赫茲</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            我們是一群在矽谷生活的華人，用普通話聊感情、聊孤獨、聊那些在科技泡泡裡找尋真實連結的故事。
          </p>
          <p className="text-gray-400 leading-relaxed">
            520 Hertz is a Mandarin-language podcast made for Chinese-speaking singles of Silicon Valley. We talk honestly about love, relationships, dating culture, and what it means to build a life — and maybe find a partner — in one of the world&apos;s most competitive places.
          </p>
        </div>
      </section>

      {/* Email Subscribe */}
      <section className="px-6 py-20 border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">訂閱最新集數</h2>
          <p className="text-gray-400 mb-8 text-sm">Subscribe for new episodes &amp; show updates</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {isSubmitting ? '訂閱中...' : '訂閱'}
            </button>
          </form>
          {message && (
            <p className="mt-4 text-sm text-purple-300">{message}</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold text-white">
            520<span className="gradient-text">赫茲共鳴</span>
          </div>
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">Spotify</a>
            <a href="mailto:contact@skyreal.co" className="hover:text-purple-400 transition-colors">contact@skyreal.co</a>
          </div>
          <p className="text-gray-500 text-sm">&copy; 2025 520赫茲共鳴 · SkyReal</p>
        </div>
      </footer>
    </div>
  );
}
