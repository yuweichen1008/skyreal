'use client';

import { useEffect, useState } from 'react';

const clips = [
  {
    id: 1,
    title: "AI's Impact on Society",
    videoUrl: "/clips/clip1.mp4",
    description: "Exploring the future of artificial intelligence"
  },
  {
    id: 2,
    title: "Future of Technology",
    videoUrl: "/clips/clip2.mp4",
    description: "The next wave of innovation"
  },
  {
    id: 3,
    title: "Business Insights",
    videoUrl: "/clips/clip3.mp4",
    description: "Strategic thinking for modern business"
  }
];

export default function Hero() {
  const [currentClip, setCurrentClip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClip((prev) => (prev + 1) % clips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <video
        key={clips[currentClip].id}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={clips[currentClip].videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50">
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl font-bold mb-4">
              {clips[currentClip].title}
            </h1>
            <p className="text-xl mb-8">
              {clips[currentClip].description}
            </p>
            <button className="bg-white text-black px-6 py-2 rounded">
              Watch Latest Episode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 