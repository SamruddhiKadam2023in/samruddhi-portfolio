import { Reveal } from '../common/Reveal';

const technologies = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Express',
  'Python',
  'FastAPI',
  'PostgreSQL',
];

export function TechStrip() {
  return (
    <div className="border-y border-line bg-surface/40">
      <Reveal className="container-page flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-8">
        <p className="shrink-0 font-mono text-xs text-fg-muted">// daily stack</p>
        <ul
          aria-label="Technologies I use most"
          className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-fg-secondary"
        >
          {technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
