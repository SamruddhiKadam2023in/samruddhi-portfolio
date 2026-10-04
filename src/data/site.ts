import type { NavItem, SiteInfo } from '../types';

export const site: SiteInfo = {
  name: 'Samruddhi Sanjay Kadam',
  shortName: 'Samruddhi Kadam',
  initials: 'SK',
  role: 'Software Developer',
  description:
    'Full-stack applications, developer tools, data-driven platforms, and intelligent systems.',
  // Provisional until the first Vercel deployment; update here, in index.html,
  // public/robots.txt and public/sitemap.xml once the real URL is known.
  url: 'https://samruddhi-portfolio.vercel.app',
  seoDescription:
    'Samruddhi Kadam builds full-stack apps, developer tools and intelligent systems like PropAI, TraceLayer and UrbanPuls, using React, TypeScript, Python and FastAPI.',
};

/** Section ids on the home page, in page order. */
export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
