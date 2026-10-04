import type { MouseEvent, ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { scrollToSection, sectionHref } from '../../utils/scroll';

interface SectionLinkProps {
  sectionId: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  'aria-current'?: 'location' | undefined;
}

/**
 * Link to a home-page section. On the home page it scrolls in place;
 * from any other page it routes to `/#section` and the layout scrolls after render.
 */
export function SectionLink({
  sectionId,
  className,
  children,
  onNavigate,
  ...rest
}: SectionLinkProps) {
  const { pathname } = useLocation();
  const href = sectionHref(sectionId);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (pathname !== '/' || event.metaKey || event.ctrlKey || event.shiftKey) return;
    if (scrollToSection(sectionId)) {
      event.preventDefault();
      window.history.replaceState(window.history.state, '', href);
    }
  };

  return (
    <Link to={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
