'use client';

import { useState } from 'react';
import Link from 'next/link';
import { subscribeEmail } from '@/lib/appwrite';

export default function Navbar() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    try {
      await subscribeEmail(email);
      setShowPopup(false);
      setEmail('');
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-black">
      <div className="flex items-center justify-between h-20 px-8">
        {/* Left side - Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-white">
            52Hertz
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/episodes" className="text-white">
              Episodes
            </Link>
            <Link href="/events" className="text-white">
              Events
            </Link>
            <Link href="/meetups" className="text-white">
              Meetups
            </Link>
            <Link href="/summit" className="text-white">
              Summit
            </Link>
            <Link href="/about" className="text-white">
              About
            </Link>
          </div>
        </div>

        {/* Right side - Subscribe button */}
        <button
          onClick={() => setShowPopup(true)}
          className="bg-white text-black px-6 py-2 rounded-full"
        >
          Subscribe
        </button>
      </div>

      {/* Basic Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Subscribe to 52Hertz</h3>
              <button onClick={() => setShowPopup(false)}>×</button>
            </div>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border mb-4"
                required
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full bg-black text-white px-6 py-2"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 