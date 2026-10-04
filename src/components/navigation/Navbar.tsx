import { AnimatePresence, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router';
import { navItems } from '../../data/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollLock } from '../../hooks/useScrollLock';
import { cn } from '../../utils/cn';
import { ThemeToggle } from '../common/ThemeToggle';
import { Logo } from './Logo';
import { SectionLink } from './SectionLink';

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const active = useActiveSection(sectionIds, isHome);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu on route change (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Escape closes the menu; focus moves into the panel when it opens.
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 48rem)');
    const onChange = (event: MediaQueryListEvent) => event.matches && setOpen(false);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const close = () => setOpen(false);
  const isCurrent = (id: string) => (isHome ? active === id : false);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors duration-200',
        scrolled || open
          ? 'border-line bg-bg/85 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <Logo onNavigate={close} />

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <SectionLink
                sectionId={item.id}
                aria-current={isCurrent(item.id) ? 'location' : undefined}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm transition-colors duration-200',
                  isCurrent(item.id)
                    ? 'bg-surface-elevated text-fg'
                    : 'text-fg-secondary hover:text-fg',
                )}
              >
                {item.label}
              </SectionLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-full border border-line text-fg-secondary transition-colors hover:border-line-strong hover:text-fg md:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Portalled to <body>: the header's backdrop-filter would otherwise contain the fixed panel. */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <m.nav
              ref={panel}
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              // Fixed overlay: it must not take up space in the page, or the page would shift
              // when it closes and section links would land in the wrong place.
              className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg md:hidden"
            >
              <ul className="container-page flex flex-col gap-1 py-6">
                {navItems.map((item, index) => (
                  <li key={item.id}>
                    <SectionLink
                      sectionId={item.id}
                      onNavigate={close}
                      aria-current={isCurrent(item.id) ? 'location' : undefined}
                      className={cn(
                        'flex items-baseline gap-4 rounded-lg px-2 py-3 text-2xl font-medium tracking-tight transition-colors',
                        isCurrent(item.id) ? 'text-fg' : 'text-fg-secondary hover:text-fg',
                      )}
                    >
                      <span className="font-mono text-xs text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </m.nav>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  );
}
