import { ArrowRight } from 'lucide-react';
import type { ArchitectureStep } from '../../../types/project';

/** The project's real request/data flow as numbered steps, read left to right, top to bottom. */
export function ArchitectureFlow({ steps }: { steps: ArchitectureStep[] }) {
  return (
    <figure aria-label="How the system works, step by step" className="mt-8">
      <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.label} className="rounded-xl border border-line bg-surface p-4">
            <span className="flex items-center gap-2 font-mono text-[0.6875rem] text-accent">
              {String(index + 1).padStart(2, '0')}
              {index < steps.length - 1 && (
                <ArrowRight size={12} aria-hidden className="text-fg-muted" />
              )}
            </span>
            <p className="mt-1.5 text-sm font-medium">{step.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-fg-muted">{step.detail}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
