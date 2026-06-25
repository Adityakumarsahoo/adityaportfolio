export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  challengesSolved: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string; // Style visual theme
  category: "Full Stack" | "Frontend" | "AI & Other";
}

export interface Skill {
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "Databases" | "Tools & DevOps" | "AI & Security";
  level: number; // 0-100 for progress bar
  color: string; // Tailwind color class e.g., 'from-blue-500 to-indigo-600'
  iconName: string; // Lucide icon mapping name
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  isInternship: boolean;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
  badgeColor: string;
}

export interface Achievement {
  title: string;
  description: string;
  category: string;
  metric?: string;
}

export interface Service {
  title: string;
  description: string;
  iconName: string;
  skillsCovered: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  replied: boolean;
  createdAt: string;
}
