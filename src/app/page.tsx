import Hero from '@/components/Hero';
import Events from '@/components/Events';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-white text-center">Upcoming Events</h2>
          <Events />
        </div>
      </section>
      
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-white text-center">Latest Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Episode cards will go here */}
          </div>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Stay Updated</h2>
          <p className="text-xl mb-8 text-gray-300">
            Subscribe to our newsletter for the latest episodes, events, and insights.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded text-black w-full"
              />
              <button className="bg-white text-black px-6 py-2 rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
