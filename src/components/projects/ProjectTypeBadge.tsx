import { User, Users } from 'lucide-react';
import type { ProjectType } from '../../types/project';
import { cn } from '../../utils/cn';

/** Ownership label. Uses an icon and text, never colour alone. */
export function ProjectTypeBadge({ type, className }: { type: ProjectType; className?: string }) {
  const group = type === 'group';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] leading-none',
        group
          ? 'border-warning/35 bg-warning/10 text-warning'
          : 'border-accent/30 bg-accent-soft text-accent',
        className,
      )}
    >
      {group ? <Users size={12} aria-hidden /> : <User size={12} aria-hidden />}
      {group ? 'Group Project' : 'Individual Project'}
    </span>
  );
}
