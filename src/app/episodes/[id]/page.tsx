'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { getEpisodeById } from '@/lib/episodes';
import Navbar from '@/components/Navbar';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

export default function EpisodePage({ params }: { params: { id: string } }) {
  const episode = getEpisodeById(params.id);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Sarah Chen',
      content: '這集真的很有共鳴！動物系戀人的比喻太貼切了 🐱',
      timestamp: '2 hours ago',
      likes: 12
    },
    {
      id: '2',
      author: 'Mike Wang',
      content: '矽谷的愛情故事聽起來很真實，科技人的感情生活確實不容易',
      timestamp: '1 day ago',
      likes: 8
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [outlineOpen, setOutlineOpen] = useState(true);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  if (!episode) {
    notFound();
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !authorName.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      author: authorName,
      content: newComment,
      timestamp: 'Just now',
      likes: 0
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <main className="px-6 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Episode Header */}
          <div className="glass-card rounded-xl p-8 mb-8">
            <div className="flex items-start gap-6 flex-col sm:flex-row">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-white text-center">
                  <div className="text-3xl mb-1">🎙️</div>
                  <div className="text-sm font-medium">{episode.duration}</div>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-4">{episode.title}</h1>
                <p className="text-gray-300 mb-4 leading-relaxed">{episode.description}</p>
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <span className="text-sm text-gray-400">{episode.date}</span>
                  {episode.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={episode.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  在 Spotify 收聽
                </a>
              </div>
            </div>
          </div>

          {/* Episode Outline */}
          <div className="glass-card rounded-xl mb-6 overflow-hidden">
            <button
              onClick={() => setOutlineOpen(!outlineOpen)}
              className="w-full flex justify-between items-center px-8 py-5 text-left hover:bg-white/5 transition-colors"
            >
              <span className="text-xl font-bold text-white">📋 本集大綱 · Episode Outline</span>
              <span className="text-gray-400 text-xl">{outlineOpen ? '−' : '+'}</span>
            </button>
            {outlineOpen && (
              <div className="px-8 pb-8">
                {episode.outline && episode.outline.length > 0 ? (
                  <ul className="space-y-3">
                    {episode.outline.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-purple-400 font-bold mt-0.5">{i + 1}.</span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg mb-1">📝 大綱即將上線</p>
                    <p className="text-gray-600 text-sm">Episode outline coming soon</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Transcript */}
          <div className="glass-card rounded-xl mb-8 overflow-hidden">
            <button
              onClick={() => setTranscriptOpen(!transcriptOpen)}
              className="w-full flex justify-between items-center px-8 py-5 text-left hover:bg-white/5 transition-colors"
            >
              <span className="text-xl font-bold text-white">📜 完整逐字稿 · Full Transcript</span>
              <span className="text-gray-400 text-xl">{transcriptOpen ? '−' : '+'}</span>
            </button>
            {transcriptOpen && (
              <div className="px-8 pb-8">
                {episode.transcript ? (
                  <div className="max-h-96 overflow-y-auto pr-2">
                    <pre className="text-gray-300 leading-relaxed whitespace-pre-wrap font-sans text-sm">
                      {episode.transcript}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-lg mb-1">🎙️ 逐字稿即將上線</p>
                    <p className="text-gray-600 text-sm">Full transcript coming soon</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="glass-card rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">💬 留言討論 · Comments</h2>

            <div className="mb-8 p-6 bg-white/5 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">分享你的想法</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="你的名字 · Your name"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="這集你有什麼感想？· What did you think?"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || !authorName.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  發表留言 · Post Comment
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="p-6 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{comment.author}</h4>
                      <p className="text-sm text-gray-400">{comment.timestamp}</p>
                    </div>
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full hover:bg-purple-500/30 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {comment.likes}
                    </button>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
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
