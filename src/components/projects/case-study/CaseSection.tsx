import type { ReactNode } from 'react';
import { Reveal } from '../../common/Reveal';

interface CaseSectionProps {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}

/** A numbered case-study section; ids double as in-page anchors. */
export function CaseSection({ id, index, title, children }: CaseSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <Reveal>
        <h2
          id={`${id}-title`}
          className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          <span className="font-mono text-sm font-normal text-accent">{index}</span>
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </Reveal>
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-3xl space-y-4 text-base leading-relaxed text-pretty text-fg-secondary sm:text-lg">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
      ))}
    </div>
  );
}
