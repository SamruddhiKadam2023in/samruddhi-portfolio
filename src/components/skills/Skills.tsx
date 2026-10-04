import { skillCategories, skills } from '../../data/skills';
import { useSkillSelection } from '../../hooks/useSkillSelection';
import { cn } from '../../utils/cn';
import { Reveal } from '../common/Reveal';
import { SectionHeading } from '../common/SectionHeading';
import { SkillMatches } from './SkillMatches';
import { SkillMatchesBar } from './SkillMatchesBar';

export function Skills() {
  const { selected, toggle } = useSkillSelection();

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="border-t border-line bg-surface/30 py-24 sm:py-32"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionHeading
              index="02"
              label="Skills"
              id="skills-title"
              title="The tools behind the projects"
              description="Grouped by where they sit in the stack. Select one to see where I’ve used it."
            />
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5">
            <SkillMatches />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const items = skills.filter((skill) => skill.category === category.id);
            return (
              <Reveal key={category.id} delay={index * 0.04}>
                <div role="group" aria-labelledby={`skill-cat-${category.id}`}>
                  <h3
                    id={`skill-cat-${category.id}`}
                    className="flex items-center gap-3 border-b border-line pb-3 font-mono text-xs tracking-wider text-fg-muted uppercase"
                  >
                    <span className="text-accent">{category.number}</span>
                    {category.label}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {items.map((skill) => {
                      const active = selected === skill.name;
                      return (
                        <li key={skill.name}>
                          <button
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggle(skill.name)}
                            className={cn(
                              'rounded-lg border px-3 py-1.5 text-sm transition-colors duration-150',
                              active
                                ? 'border-accent bg-accent text-accent-contrast'
                                : 'border-line bg-bg text-fg-secondary hover:border-line-strong hover:text-fg',
                            )}
                          >
                            {skill.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <SkillMatchesBar />
      </div>
    </section>
  );
}
