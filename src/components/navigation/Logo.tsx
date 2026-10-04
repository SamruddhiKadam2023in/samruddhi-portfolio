import { site } from '../../data/site';
import { SectionLink } from './SectionLink';

export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <SectionLink
      sectionId="home"
      onNavigate={onNavigate}
      className="group flex items-center gap-2.5 rounded-md"
    >
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-lg border border-line-strong bg-surface font-mono text-xs font-semibold text-accent transition-colors group-hover:border-accent/50"
      >
        {site.initials}
      </span>
      <span className="text-[0.9375rem] font-semibold tracking-tight">
        {site.shortName}
        <span className="sr-only">, home</span>
      </span>
    </SectionLink>
  );
}
