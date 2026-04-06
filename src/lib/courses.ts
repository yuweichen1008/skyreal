export interface Course {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;       // e.g. "4 hours"
  lessons: number;
  topics: string[];
  emoji: string;
  color: string;          // CSS color for accent
  available: boolean;     // false = "coming soon"
}

export const courses: Course[] = [
  {
    slug: 'content-strategy-101',
    title: 'Content Strategy 101',
    tagline: 'Build a content engine that grows your brand on autopilot.',
    description:
      'Learn how to research your audience, build a sustainable content calendar, repurpose assets across channels, and measure what actually matters. Perfect for founders and marketing leads who are tired of guessing.',
    level: 'Beginner',
    duration: '3 hours',
    lessons: 8,
    topics: ['Audience research', 'Content calendar', 'Channel selection', 'Repurposing', 'Analytics basics'],
    emoji: '🗺️',
    color: '#5C7A4F',
    available: true,
  },
  {
    slug: 'video-production-basics',
    title: 'Video Production Basics',
    tagline: 'Create scroll-stopping video with gear you already own.',
    description:
      'From shot composition to lighting on a budget, to editing a clean final cut — this course walks you through the full video production workflow. No expensive gear required; a smartphone and good ideas are enough.',
    level: 'Beginner',
    duration: '5 hours',
    lessons: 12,
    topics: ['Composition', 'Lighting', 'Audio', 'Editing in CapCut / Premiere', 'Thumbnail design'],
    emoji: '🎬',
    color: '#B8A044',
    available: true,
  },
  {
    slug: 'brand-voice-copywriting',
    title: 'Brand Voice & Copywriting',
    tagline: 'Write words your customers actually want to read.',
    description:
      'Discover your brand voice, craft a messaging framework, and write copy that converts — for websites, social media, email, and ads. You\'ll finish with a full voice & tone guide for your brand.',
    level: 'Intermediate',
    duration: '4 hours',
    lessons: 10,
    topics: ['Voice & tone', 'Messaging hierarchy', 'Headlines', 'Email copy', 'Social captions'],
    emoji: '✍️',
    color: '#7A6A9A',
    available: true,
  },
  {
    slug: 'social-media-mastery',
    title: 'Social Media Mastery',
    tagline: 'Turn your social channels into a consistent growth engine.',
    description:
      'Short-form video strategy, hook formulas, posting cadence, community engagement, and how to analyze what\'s working. Covers Instagram, TikTok, LinkedIn, and YouTube Shorts.',
    level: 'Intermediate',
    duration: '4.5 hours',
    lessons: 11,
    topics: ['Short-form hooks', 'Algorithm basics', 'Posting rhythm', 'Community building', 'Analytics'],
    emoji: '📱',
    color: '#B8A044',
    available: false,
  },
  {
    slug: 'brand-identity-design',
    title: 'Brand Identity Design',
    tagline: 'Design a brand that looks premium — even on a startup budget.',
    description:
      'Logo design principles, color psychology, typography pairing, and how to build a visual identity system that scales. Uses Figma (free tier) — no design background needed.',
    level: 'Beginner',
    duration: '6 hours',
    lessons: 14,
    topics: ['Logo design', 'Color theory', 'Typography', 'Style guide', 'Figma basics'],
    emoji: '🎨',
    color: '#5C7A4F',
    available: false,
  },
];
