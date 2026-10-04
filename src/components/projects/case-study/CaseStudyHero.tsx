import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { Project } from '../../../types/project';
import { GithubIcon } from '../../common/BrandIcons';
import { ButtonLink } from '../../common/Button';
import { ProjectImage } from '../../common/ProjectImage';
import { Tag } from '../../common/Tag';
import { SectionLink } from '../../navigation/SectionLink';
import { ProjectTypeBadge } from '../ProjectTypeBadge';

const ease = [0.21, 0.6, 0.35, 1] as const;

export function CaseStudyHero({ project }: { project: Project }) {
  const cover = project.images[0];

  return (
    <header className="relative isolate overflow-hidden pt-10 pb-12 sm:pt-14">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]"
      />
      <div className="container-page">
        <SectionLink
          sectionId="projects"
          className="inline-flex items-center gap-2 rounded-full font-mono text-xs text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={14} aria-hidden />
          all projects
        </SectionLink>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="mt-8 max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-sm text-accent">{project.number}</span>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <ProjectTypeBadge type={project.projectType} />
            <span className="font-mono text-xs text-fg-muted">{project.category}</span>
          </div>

          <h1 id="case-title" className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-fg-secondary sm:text-xl">{project.tagline}</p>
          <p className="mt-5 leading-relaxed text-pretty text-fg-secondary">
            {project.shortDescription}
          </p>

          <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href={project.githubUrl}
              external
              icon={<GithubIcon size={16} />}
              iconPosition="start"
              aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
            >
              View on GitHub
            </ButtonLink>
            {project.liveUrl && (
              <ButtonLink
                href={project.liveUrl}
                external
                variant="secondary"
                icon={<ArrowUpRight size={16} aria-hidden />}
                aria-label={`${project.title} live demo (opens in a new tab)`}
              >
                Live demo
              </ButtonLink>
            )}
          </div>
        </motion.div>

        {cover && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
          >
            <ProjectImage image={cover} sizes="(min-width: 1152px) 1088px, 100vw" eager />
          </motion.div>
        )}
      </div>
    </header>
  );
}
