import type { NavItem, SiteInfo } from '../types';

export const site: SiteInfo = {
  name: 'Samruddhi Sanjay Kadam',
  shortName: 'Samruddhi Kadam',
  initials: 'SK',
  role: 'Software Developer',
  description:
    'Full-stack applications, developer tools, data-driven platforms, and intelligent systems.',
};

/** Section ids on the home page, in page order. */
export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
