import { m } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { engineeringLoop } from '../../data/about';

const ease = [0.21, 0.6, 0.35, 1] as const;

/** Build → Test → Debug → Improve, drawn as a loop that feeds back into the next build. */
export function EngineeringLoop() {
  return (
    <figure
      aria-label="My engineering loop: build, test, debug, improve, then repeat"
      className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6"
    >
      <figcaption className="mb-5 flex items-center justify-between font-mono text-[0.6875rem] text-fg-muted">
        <span>workflow.loop</span>
        <span className="flex items-center gap-1.5">
          <RotateCcw size={12} aria-hidden />
          repeat
        </span>
      </figcaption>

      <ol className="relative space-y-0">
        {engineeringLoop.map((step, index) => (
          <m.li
            key={step.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 0.35, delay: index * 0.1, ease }}
            className="relative flex gap-4 pb-5 last:pb-0"
          >
            {/* Rail connecting the steps */}
            {index < engineeringLoop.length - 1 && (
              <span
                aria-hidden
                className="absolute top-8 bottom-0 left-[0.9375rem] w-px bg-line-strong"
              />
            )}
            <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-line-strong bg-bg font-mono text-[0.6875rem] text-accent">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="pt-1">
              <span className="block text-sm font-medium">{step.label}</span>
              <span className="block font-mono text-xs text-fg-muted">{step.note}</span>
            </span>
          </m.li>
        ))}
      </ol>

      <div
        aria-hidden
        className="mt-5 flex items-center gap-2 border-t border-line pt-4 font-mono text-[0.6875rem] text-fg-muted"
      >
        <RotateCcw size={12} className="text-accent" />
        back to 01 with what was learned
      </div>
    </figure>
  );
}
