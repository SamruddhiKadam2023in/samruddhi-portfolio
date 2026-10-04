import { Mail } from 'lucide-react';
import { social } from '../../data/social';
import { cn } from '../../utils/cn';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const links = [
  { label: 'GitHub', href: social.github, icon: <GithubIcon size={17} />, external: true },
  { label: 'LinkedIn', href: social.linkedin, icon: <LinkedinIcon size={16} />, external: true },
  {
    label: 'Email',
    href: `mailto:${social.email}`,
    icon: <Mail size={17} aria-hidden />,
    external: false,
  },
];

/** Icon-only links to GitHub, LinkedIn and email, each with an accessible name. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            aria-label={link.external ? `${link.label} (opens in a new tab)` : link.label}
            title={link.label}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="grid size-10 place-items-center rounded-full border border-line text-fg-secondary transition-colors hover:border-line-strong hover:text-fg"
          >
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
