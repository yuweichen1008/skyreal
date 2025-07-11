'use client';

import { useState } from 'react';
import { subscribeEmail } from '@/lib/appwrite';

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
      setMessage('Successfully subscribed! Thank you for joining us.');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white">SkyReal Foundations</div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="/episodes" className="text-gray-300 hover:text-white transition-colors">Episodes</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Why Choose SkyReal Foundations?</h2>
          <p className="text-xl text-gray-300">
            Secure & Private. Innovative.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">About SkyReal Foundations</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            SkyReal is a platform where the Asian American and Asian community can speak freely, share their stories, and celebrate the hard-earned achievements of generations of immigrants. We are dedicated to documenting and honoring the journeys, resilience, and successes that shape our vibrant community.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Get in Touch</h2>
          <p className="text-xl text-gray-300 mb-8">
            Ready to explore the future? We'd love to hear from you.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="mailto:contact@skyreal.co" className="text-purple-400 hover:text-purple-300 transition-colors">
              contact@skyreal.co
            </a>
            <a href="tel:+1234567890" className="text-purple-400 hover:text-purple-300 transition-colors">
              +1 (234) 567-890
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2025 SkyReal Fundation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
