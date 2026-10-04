import { AnimatePresence, m } from 'framer-motion';
import { ArrowDown, X } from 'lucide-react';
import { projects } from '../../data/projects';
import { useSkillSelection } from '../../hooks/useSkillSelection';
import { SectionLink } from '../navigation/SectionLink';

/** Shows which projects use the selected skill. Announced politely to screen readers. */
export function SkillMatches() {
  const { selected, matching, clear } = useSkillSelection();
  const matched = matching ? projects.filter((p) => matching.has(p.id)) : [];

  return (
    <div
      aria-live="polite"
      className="min-h-[7.5rem] rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!selected ? (
          <m.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-sm leading-relaxed text-fg-secondary"
          >
            <span className="mb-2 block font-mono text-xs text-fg-muted">
              // select a technology
            </span>
            Pick any technology to see which projects below use it. The matching projects are
            highlighted in the Projects section too.
          </m.p>
        ) : (
          <m.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-fg-secondary">
                <span className="font-mono text-xs text-fg-muted">used in → </span>
                <span className="font-medium text-fg">{selected}</span>
              </p>
              <button
                type="button"
                onClick={clear}
                className="-mt-1 -mr-1 flex items-center gap-1 rounded-full px-2 py-1 font-mono text-xs text-fg-muted transition-colors hover:text-fg"
              >
                <X size={13} aria-hidden />
                clear
              </button>
            </div>

            {matched.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {matched.map((project) => (
                  <li key={project.id}>
                    <SectionLink
                      sectionId={`project-${project.id}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft py-1.5 pr-3 pl-2.5 text-sm text-fg transition-colors hover:border-accent/60"
                    >
                      <span className="font-mono text-xs text-accent">{project.number}</span>
                      {project.title}
                      <ArrowDown
                        size={13}
                        aria-hidden
                        className="text-fg-muted transition-transform group-hover:translate-y-0.5"
                      />
                    </SectionLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-fg-muted">
                Not used in the four projects featured here.
              </p>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
