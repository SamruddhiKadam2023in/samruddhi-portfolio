import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface TagProps {
  children: ReactNode;
  tone?: 'default' | 'accent';
  className?: string;
}

/** Small monospace label for technologies and metadata. */
export function Tag({ children, tone = 'default', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[0.75rem] leading-5 whitespace-nowrap',
        tone === 'accent'
          ? 'border-accent/30 bg-accent-soft text-accent'
          : 'border-line bg-surface text-fg-secondary',
        className,
      )}
    >
      {children}
    </span>
  );
}
