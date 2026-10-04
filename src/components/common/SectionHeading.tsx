import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn('max-w-2xl', className)}>
      <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-wider text-fg-muted uppercase">
        <span className="text-accent">{index}</span>
        <ArrowRight size={14} aria-hidden className="shrink-0 text-fg-muted" />
        <span>{label}</span>
      </p>
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-pretty text-fg-secondary sm:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
