import { useActiveSection } from '../../../hooks/useActiveSection';
import { cn } from '../../../utils/cn';
import { scrollToSection } from '../../../utils/scroll';

export interface CaseNavItem {
  id: string;
  label: string;
}

/** Sticky "on this page" list for large screens. */
export function CaseStudyNav({ items }: { items: CaseNavItem[] }) {
  const active = useActiveSection(
    items.map((item) => item.id),
    true,
  );

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="font-mono text-xs tracking-wider text-fg-muted uppercase">On this page</p>
      <ul className="mt-4 space-y-1 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(event) => {
                if (scrollToSection(item.id)) {
                  event.preventDefault();
                  window.history.replaceState(window.history.state, '', `#${item.id}`);
                }
              }}
              aria-current={active === item.id ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l py-1 pl-4 text-sm transition-colors',
                active === item.id
                  ? 'border-accent text-fg'
                  : 'border-transparent text-fg-muted hover:text-fg',
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
