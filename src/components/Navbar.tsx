'use client';

import { useState } from 'react';
import Link from 'next/link';
import { subscribeEmail } from '@/lib/appwrite';

export default function Navbar() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await subscribeEmail(email);
      setSubscriptionStatus('success');
      setEmail('');
    } catch (error) {
      setSubscriptionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-white text-2xl font-bold">
            52Hertz
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/episodes" className="text-white hover:text-gray-300 transition-colors">
              Episodes
            </Link>
            <a 
              href="https://www.youtube.com/@52Hertz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              YouTube
            </a>
          </div>

          {/* Subscribe Form */}
          <form onSubmit={handleSubscribe} className="hidden md:flex items-center space-x-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 rounded-full text-black text-sm"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Subscription Status Message */}
      {subscriptionStatus !== 'idle' && (
        <div className={`text-center py-2 ${subscriptionStatus === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {subscriptionStatus === 'success' 
            ? 'Thank you for subscribing!' 
            : 'Failed to subscribe. Please try again.'}
        </div>
      )}
    </nav>
  );
} 