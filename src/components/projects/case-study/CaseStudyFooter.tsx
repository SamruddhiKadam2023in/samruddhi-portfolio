import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { projects } from '../../../data/projects';
import type { Project } from '../../../types/project';
import { GithubIcon } from '../../common/BrandIcons';
import { ButtonLink } from '../../common/Button';

/** Closing links: the repository, an optional demo, and the next case study. */
export function CaseStudyFooter({ project }: { project: Project }) {
  const withCaseStudy = projects.filter((p) => p.hasCaseStudy);
  const position = withCaseStudy.findIndex((p) => p.id === project.id);
  const next = withCaseStudy[(position + 1) % withCaseStudy.length];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <p className="font-mono text-xs text-fg-muted">source</p>
        <p className="mt-2 text-xl font-semibold tracking-tight">Explore the code</p>
        <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
          The repository has the full source, setup instructions and documentation.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink
            href={project.githubUrl}
            external
            icon={<GithubIcon size={16} />}
            iconPosition="start"
            aria-label={`${project.title} on GitHub (opens in a new tab)`}
          >
            GitHub
          </ButtonLink>
          {project.liveUrl && (
            <ButtonLink href={project.liveUrl} external variant="secondary">
              Live demo
            </ButtonLink>
          )}
        </div>
      </div>

      {next && next.id !== project.id && (
        <Link
          to={`/projects/${next.slug}`}
          className="group flex flex-col justify-between rounded-2xl border border-line p-6 transition-colors hover:border-line-strong hover:bg-surface sm:p-8"
        >
          <p className="font-mono text-xs text-fg-muted">next case study</p>
          <div className="mt-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-sm text-accent">{next.number}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">{next.title}</p>
              <p className="mt-1 text-sm text-fg-secondary">{next.tagline}</p>
            </div>
            <ArrowRight
              size={22}
              aria-hidden
              className="shrink-0 text-fg-muted transition-transform group-hover:translate-x-1 group-hover:text-fg"
            />
          </div>
        </Link>
      )}
    </div>
  );
}
