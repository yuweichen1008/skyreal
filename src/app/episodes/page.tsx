'use client';

const episodes = [
  {
    id: 1,
    title: "Episode 1: Introduction to 52Hertz",
    description: "Welcome to our podcast where we explore the depths of technology and innovation.",
    youtubeId: "YOUR_YOUTUBE_ID_1",
    date: "March 1, 2024"
  },
  {
    id: 2,
    title: "Episode 2: The Future of AI",
    description: "Diving deep into artificial intelligence and its impact on our daily lives.",
    youtubeId: "YOUR_YOUTUBE_ID_2",
    date: "March 8, 2024"
  },
  // Add more episodes as needed
];

export default function EpisodesPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center">Latest Episodes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {episodes.map((episode) => (
            <div key={episode.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative pb-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${episode.youtubeId}`}
                  title={episode.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{episode.title}</h2>
                <p className="text-gray-600 mb-4">{episode.date}</p>
                <p className="text-gray-700 mb-4">{episode.description}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${episode.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 