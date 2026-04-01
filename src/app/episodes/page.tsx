'use client';

import Link from 'next/link';
import { episodes } from '@/lib/episodes';
import Navbar from '@/components/Navbar';

export default function Episodes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <main className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-white text-center mb-4">
            所有<span className="gradient-text">集數</span>
          </h1>
          <p className="text-gray-400 text-center mb-16 text-lg">All Episodes</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((episode) => (
              <Link
                key={episode.id}
                href={`/episodes/${episode.id}`}
                className="glass-card rounded-xl p-6 hover:scale-105 transition-transform duration-200"
              >
                <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">🎙️</div>
                    <div className="text-sm font-medium">{episode.duration}</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{episode.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{episode.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{episode.date}</span>
                  <div className="flex gap-2">
                    {episode.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {episode.transcript && (
                  <div className="mt-3 flex items-center gap-1 text-xs text-green-400">
                    <span>✓</span> Transcript available
                  </div>
                )}
              </Link>
            ))}
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
