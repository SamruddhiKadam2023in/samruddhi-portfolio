import { X } from 'lucide-react';
import { projects } from '../../data/projects';
import { useSkillSelection } from '../../hooks/useSkillSelection';
import { Reveal } from '../common/Reveal';
import { SectionHeading } from '../common/SectionHeading';
import { ProjectShowcase } from './ProjectShowcase';

export function Projects() {
  const { selected, matching, clear } = useSkillSelection();

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="border-t border-line py-24 sm:py-32"
    >
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              index="03"
              label="Projects"
              id="projects-title"
              title="Things I’ve built"
              description="Three individual projects I designed and built end to end, and one team project where I owned specific parts."
            />
          </Reveal>

          {selected && (
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface py-1.5 pr-1.5 pl-4 text-sm">
              <span className="text-fg-secondary">
                Highlighting <span className="font-medium text-fg">{selected}</span>
                <span className="text-fg-muted">
                  {' '}
                  · {matching?.size ?? 0} of {projects.length}
                </span>
              </span>
              <button
                type="button"
                onClick={clear}
                aria-label="Clear technology highlight"
                className="grid size-7 place-items-center rounded-full text-fg-muted transition-colors hover:bg-surface-elevated hover:text-fg"
              >
                <X size={14} aria-hidden />
              </button>
            </div>
          )}
        </div>

        <div className="mt-14 space-y-10 sm:space-y-14 lg:-mx-8 lg:space-y-16">
          {projects.map((project, index) => (
            <ProjectShowcase key={project.id} project={project} reversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
