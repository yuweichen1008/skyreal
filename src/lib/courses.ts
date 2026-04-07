export interface Course {
  slug: string;
  /** Key inside messages.courses.catalogue (e.g. "strategy") */
  catalogueKey: "strategy" | "video" | "copy" | "social" | "brandDesign";
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessons: number;
  emoji: string;
  color: string;
  available: boolean;
}

export const courses: Course[] = [
  {
    slug: "content-strategy-101",
    catalogueKey: "strategy",
    level: "Beginner",
    duration: "3h",
    lessons: 8,
    emoji: "🗺️",
    color: "#5C7A4F",
    available: true,
  },
  {
    slug: "video-production-basics",
    catalogueKey: "video",
    level: "Beginner",
    duration: "5h",
    lessons: 12,
    emoji: "🎬",
    color: "#B8A044",
    available: true,
  },
  {
    slug: "brand-voice-copywriting",
    catalogueKey: "copy",
    level: "Intermediate",
    duration: "4h",
    lessons: 10,
    emoji: "✍️",
    color: "#7A6A9A",
    available: true,
  },
  {
    slug: "social-media-mastery",
    catalogueKey: "social",
    level: "Intermediate",
    duration: "4.5h",
    lessons: 11,
    emoji: "📱",
    color: "#B8A044",
    available: false,
  },
  {
    slug: "brand-identity-design",
    catalogueKey: "brandDesign",
    level: "Beginner",
    duration: "6h",
    lessons: 14,
    emoji: "🎨",
    color: "#5C7A4F",
    available: false,
  },
];
